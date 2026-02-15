---
title: "AWS Architecture Patterns Every Developer Should Know"
slug: "aws-architecture-patterns"
date: "2026-02-18"
description: "Practical AWS architecture patterns for real-world applications — from simple deployments to event-driven architectures. Lambda, ECS, SQS, DynamoDB, and the trade-offs nobody tells you about."
tags: ["AWS", "Architecture", "Backend", "DevOps"]
published: true
---

Every time I spin up a new project on AWS, I'm faced with the same questions: Lambda or ECS? DynamoDB or RDS? Do I need a queue here, or am I overengineering? The AWS console has hundreds of services, and the documentation is excellent at explaining *what* each service does but terrible at explaining *when* you should actually use it.

After building and shipping several production systems on AWS — from scrappy MVPs to platforms handling millions of requests — I've developed strong opinions about which patterns work and which ones create more problems than they solve. This post is the guide I wish I'd had when I started.

## The Compute Decision: EC2 vs ECS vs Lambda

This is the first fork in the road for any AWS project, and it shapes everything else. Here's the decision matrix I use:

| Factor | EC2 | ECS (Fargate) | Lambda |
|--------|-----|---------------|--------|
| Startup time | Minutes (AMI) | 30-60 seconds | 100ms-2s (cold start) |
| Max execution time | Unlimited | Unlimited | 15 minutes |
| Pricing model | Per hour (reserved/on-demand) | Per second (vCPU + memory) | Per invocation + duration |
| Scaling speed | Minutes | Seconds | Milliseconds |
| Ops overhead | High (patching, monitoring) | Medium (container management) | Low (just code) |
| Best for | Long-running, stateful workloads | Microservices, APIs | Event handlers, glue code |

**My default decision process:**

1. If the workload runs for more than 15 minutes continuously or needs persistent connections (WebSockets, MQTT), go **ECS**.
2. If the workload is event-driven and completes in under a few minutes, go **Lambda**.
3. If you need full OS-level control, GPU access, or are running legacy software, go **EC2**.
4. If you're not sure, start with **Lambda**. You can always migrate to ECS later. Going the other direction is harder.

```
Request comes in
       │
       ▼
  Duration > 15 min?  ──── Yes ───▶  EC2 or ECS
       │
       No
       │
       ▼
  Needs persistent      ──── Yes ───▶  ECS (Fargate)
  connections?
       │
       No
       │
       ▼
  Steady high traffic   ──── Yes ───▶  ECS (Fargate)
  (>1M req/hour)?                      (cheaper at scale)
       │
       No
       │
       ▼
  Lambda  ◀──── Default choice
```

**The trade-off nobody tells you:** Lambda is incredibly cheap at low traffic, but the cost curve inverts at high traffic. I've seen teams happily running Lambda at $50/month suddenly hit $2,000/month when traffic grew 20x. At that point, a few ECS Fargate tasks running 24/7 would cost a fraction. Always model your costs at 10x your current traffic before committing to a pattern.

## Event-Driven Architecture with SQS and Lambda

This is the pattern I reach for most often. It decouples your producers from your consumers, handles traffic spikes gracefully, and gives you automatic retry behavior for free.

```
┌──────────┐     ┌─────────┐     ┌──────────┐     ┌──────────┐
│  API GW  │────▶│  Lambda  │────▶│   SQS    │────▶│  Lambda  │
│ (intake) │     │(validate)│     │ (buffer) │     │(process) │
└──────────┘     └─────────┘     └──────────┘     └──────────┘
                                       │               │
                                       │               ▼
                                  ┌─────────┐    ┌──────────┐
                                  │   DLQ   │    │ DynamoDB  │
                                  │(failures)│    │ (store)  │
                                  └─────────┘    └──────────┘
```

Here's a real-world example: processing user uploads. The API receives the upload, validates it, drops a message onto SQS, and returns immediately. A separate Lambda picks up the message, processes the file, and stores the result.

```python
import json
import boto3
from datetime import datetime

sqs = boto3.client('sqs')
QUEUE_URL = 'https://sqs.us-east-1.amazonaws.com/123456789/upload-processing'

def intake_handler(event, context):
    """API Gateway Lambda — validates and enqueues work."""
    body = json.loads(event['body'])

    # Validate the request
    if 'file_key' not in body or 'user_id' not in body:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'file_key and user_id are required'})
        }

    # Enqueue for async processing
    message = {
        'file_key': body['file_key'],
        'user_id': body['user_id'],
        'submitted_at': datetime.utcnow().isoformat(),
        'priority': body.get('priority', 'normal')
    }

    sqs.send_message(
        QueueUrl=QUEUE_URL,
        MessageBody=json.dumps(message),
        MessageAttributes={
            'Priority': {
                'DataType': 'String',
                'StringValue': message['priority']
            }
        }
    )

    return {
        'statusCode': 202,
        'body': json.dumps({
            'message': 'Upload queued for processing',
            'file_key': body['file_key']
        })
    }


def processor_handler(event, context):
    """SQS-triggered Lambda — processes each message."""
    for record in event['Records']:
        message = json.loads(record['body'])

        try:
            result = process_upload(
                file_key=message['file_key'],
                user_id=message['user_id']
            )
            store_result(message['user_id'], result)

        except TransientError as e:
            # Let SQS retry by raising the exception
            # Message goes back to queue with exponential backoff
            print(f"Transient error, will retry: {e}")
            raise

        except PermanentError as e:
            # Don't retry — log and move on
            # Message will go to DLQ after max retries
            print(f"Permanent error, skipping: {e}")
            # Explicitly delete message to prevent retry
            sqs.delete_message(
                QueueUrl=QUEUE_URL,
                ReceiptHandle=record['receiptHandle']
            )
```

**Critical SQS settings I always configure:**

```python
# CloudFormation / CDK snippet
upload_queue = sqs.Queue(
    self, 'UploadQueue',
    visibility_timeout=Duration.seconds(300),  # 6x your Lambda timeout
    retention_period=Duration.days(7),
    dead_letter_queue=sqs.DeadLetterQueue(
        max_receive_count=3,  # Retry 3 times, then DLQ
        queue=dead_letter_queue
    )
)
```

**The visibility timeout rule:** Always set your SQS visibility timeout to at least 6x your Lambda function's timeout. If your Lambda times out at 60 seconds but the visibility timeout is only 30 seconds, SQS will hand the same message to another Lambda while the first one is still running. You'll process the same message multiple times.

## API Gateway + Lambda for Serverless APIs

For REST APIs that don't need persistent connections, API Gateway + Lambda is hard to beat. Zero servers to manage, automatic scaling, and you pay per request.

```python
# handler.py — a clean serverless API structure
import json
import boto3
from functools import wraps

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Projects')


def cors_response(status_code, body):
    """Standardized response with CORS headers."""
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
        'body': json.dumps(body, default=str)
    }


def error_handler(func):
    """Decorator for consistent error handling across all endpoints."""
    @wraps(func)
    def wrapper(event, context):
        try:
            return func(event, context)
        except KeyError as e:
            return cors_response(400, {'error': f'Missing field: {e}'})
        except ValueError as e:
            return cors_response(422, {'error': str(e)})
        except Exception as e:
            print(f"Unhandled error: {e}")
            return cors_response(500, {'error': 'Internal server error'})
    return wrapper


@error_handler
def get_projects(event, context):
    """GET /projects — list all projects with optional filtering."""
    params = event.get('queryStringParameters') or {}
    limit = int(params.get('limit', 20))

    scan_kwargs = {'Limit': limit}

    if 'status' in params:
        scan_kwargs['FilterExpression'] = 'project_status = :status'
        scan_kwargs['ExpressionAttributeValues'] = {
            ':status': params['status']
        }

    response = table.scan(**scan_kwargs)

    return cors_response(200, {
        'projects': response['Items'],
        'count': response['Count']
    })


@error_handler
def create_project(event, context):
    """POST /projects — create a new project."""
    body = json.loads(event['body'])
    project_id = str(uuid.uuid4())

    item = {
        'project_id': project_id,
        'name': body['name'],
        'description': body.get('description', ''),
        'status': 'active',
        'created_at': datetime.utcnow().isoformat()
    }

    table.put_item(Item=item)

    return cors_response(201, item)


def router(event, context):
    """Main handler — routes requests to the right function."""
    method = event['httpMethod']
    path = event['resource']

    routes = {
        ('GET', '/projects'): get_projects,
        ('POST', '/projects'): create_project,
    }

    handler = routes.get((method, path))
    if not handler:
        return cors_response(404, {'error': 'Not found'})

    return handler(event, context)
```

**Pro tips from production:**

1. **Use Lambda Layers** for shared dependencies. Uploading boto3 and your utility code with every function is wasteful. A shared layer keeps deployments fast.
2. **Enable API Gateway caching** for read-heavy endpoints. A 60-second cache on `GET /projects` eliminates most Lambda invocations.
3. **Use provisioned concurrency** for latency-sensitive endpoints. Cold starts add 1-2 seconds. Provisioned concurrency keeps Lambdas warm, but you pay whether they're invoked or not.

## Database Choices: RDS vs DynamoDB vs Aurora

This is where I see teams make the most expensive mistakes. They either use DynamoDB for everything (then fight its access patterns forever) or default to RDS for everything (then struggle to scale).

```
                 ┌─────────────────────────────────────────┐
                 │        Do you know your access          │
                 │        patterns up front?                │
                 └──────────────┬────────────┬─────────────┘
                           Yes  │            │  No
                                ▼            ▼
                          ┌──────────┐  ┌──────────┐
                          │ DynamoDB │  │   RDS    │
                          │          │  │(Postgres)│
                          └──────────┘  └──────────┘

                 Need both? Use Aurora for relational +
                 DynamoDB for hot-path key-value lookups.
```

| Factor | RDS (PostgreSQL) | DynamoDB | Aurora Serverless |
|--------|-----------------|----------|-------------------|
| Data model | Relational (SQL) | Key-value / document | Relational (SQL) |
| Scaling | Vertical + read replicas | Automatic, infinite | Auto-scales compute |
| Pricing | Per instance hour | Per request + storage | Per ACU-second |
| Query flexibility | Any query (SQL) | Primary key + indexes only | Any query (SQL) |
| Best for | Complex queries, joins, reports | High-throughput, known access patterns | Variable traffic, relational needs |
| Worst for | Massive write scaling | Ad-hoc queries, complex joins | Predictable, steady traffic (expensive) |

**My rules of thumb:**

- **User profiles, settings, sessions** -> DynamoDB. Simple key-value lookups, high read volume, access patterns are known.
- **Transactional data, orders, financial records** -> RDS (PostgreSQL). You need ACID, joins, and the ability to run ad-hoc queries.
- **High-write event streams, IoT data, logs** -> DynamoDB with TTL. Handles massive write throughput without breaking a sweat.
- **Analytics and reporting** -> RDS or Aurora. You'll need SQL joins and aggregations. Trying to do analytics on DynamoDB is painful.

**The DynamoDB single-table trap:** Single-table design in DynamoDB is powerful but dangerous. It optimizes for read/write performance at the cost of queryability and developer experience. I use it for high-throughput services where I've fully mapped every access pattern. For everything else, separate tables (or just use Postgres) save hours of debugging overloaded GSIs.

## Caching Strategies with ElastiCache

A well-placed Redis cache is often the difference between a 500ms response and a 20ms response. Here are the patterns I use most.

### Pattern 1: API Response Cache

```python
import json
import redis
import hashlib

redis_client = redis.Redis(host='my-cluster.cache.amazonaws.com', port=6379)

def get_cached_response(cache_key: str, ttl: int, fetch_fn):
    """Generic cache-aside pattern for API responses."""
    cached = redis_client.get(cache_key)
    if cached:
        return json.loads(cached)

    # Cache miss — fetch from source
    data = fetch_fn()
    redis_client.setex(cache_key, ttl, json.dumps(data, default=str))
    return data


def get_user_profile(user_id: str):
    """Cached user profile lookup."""
    cache_key = f"user:profile:{user_id}"
    return get_cached_response(
        cache_key=cache_key,
        ttl=300,  # 5 minutes
        fetch_fn=lambda: fetch_user_from_db(user_id)
    )


def invalidate_user_cache(user_id: str):
    """Call this whenever user data changes."""
    # Delete all user-related cache keys
    keys = redis_client.keys(f"user:*:{user_id}")
    if keys:
        redis_client.delete(*keys)
```

### Pattern 2: Rate Limiting with Sliding Window

```python
import time

def is_rate_limited(user_id: str, max_requests: int = 100, window_seconds: int = 60) -> bool:
    """Sliding window rate limiter using Redis sorted sets."""
    key = f"ratelimit:{user_id}"
    now = time.time()
    window_start = now - window_seconds

    pipe = redis_client.pipeline()
    # Remove old entries outside the window
    pipe.zremrangebyscore(key, 0, window_start)
    # Add current request
    pipe.zadd(key, {f"{now}": now})
    # Count requests in window
    pipe.zcard(key)
    # Set TTL so keys don't linger forever
    pipe.expire(key, window_seconds)
    results = pipe.execute()

    request_count = results[2]
    return request_count > max_requests
```

### Pattern 3: Distributed Locking

```python
import uuid

def acquire_lock(resource_id: str, ttl: int = 30) -> str | None:
    """
    Acquire a distributed lock. Returns lock_id if acquired, None if not.
    Use this to prevent duplicate processing of the same resource.
    """
    lock_id = str(uuid.uuid4())
    lock_key = f"lock:{resource_id}"

    acquired = redis_client.set(lock_key, lock_id, nx=True, ex=ttl)
    return lock_id if acquired else None


def release_lock(resource_id: str, lock_id: str):
    """Release a lock only if we still own it (prevents releasing someone else's lock)."""
    lock_key = f"lock:{resource_id}"
    # Lua script for atomic check-and-delete
    script = """
    if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
    else
        return 0
    end
    """
    redis_client.eval(script, 1, lock_key, lock_id)
```

**ElastiCache sizing tip:** Start with a `cache.t3.medium` (3 GB). Monitor the `CurrConnections`, `EngineCPUUtilization`, and `DatabaseMemoryUsagePercentage` metrics. Only scale up when you're consistently above 70% memory usage. Over-provisioning Redis is one of the most common wastes I see on AWS bills.

## Monitoring and Observability

You can't fix what you can't see. Here's the minimum viable observability setup I deploy on every project.

### CloudWatch Metrics That Actually Matter

Forget the default dashboards. These are the metrics that tell you if your system is healthy:

```
Production Health Dashboard
├── API Gateway
│   ├── 4xx Error Rate   (alert > 5%)
│   ├── 5xx Error Rate   (alert > 1%)
│   ├── p50 Latency      (target < 100ms)
│   └── p99 Latency      (alert > 2s)
├── Lambda
│   ├── Error Count       (alert > 0 for critical functions)
│   ├── Throttles         (alert > 0)
│   ├── Duration p99      (alert > 80% of timeout)
│   └── Concurrent Executions  (watch trend)
├── SQS
│   ├── ApproximateAgeOfOldestMessage  (alert > 5 min)
│   ├── NumberOfMessagesVisible        (watch trend)
│   └── DLQ MessageCount               (alert > 0)
├── DynamoDB
│   ├── ThrottledRequests              (alert > 0)
│   ├── ConsumedReadCapacity           (watch trend)
│   └── SuccessfulRequestLatency       (alert > 20ms)
└── ElastiCache
    ├── EngineCPUUtilization           (alert > 80%)
    ├── DatabaseMemoryUsagePercentage  (alert > 70%)
    └── CacheHitRate                   (alert < 80%)
```

### Structured Logging

Unstructured logs are useless at scale. Every Lambda function should log structured JSON:

```python
import json
import logging
import os

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def structured_log(level: str, message: str, **kwargs):
    """Emit structured JSON logs for CloudWatch Insights queries."""
    log_entry = {
        'level': level,
        'message': message,
        'function_name': os.environ.get('AWS_LAMBDA_FUNCTION_NAME'),
        'request_id': kwargs.pop('request_id', 'unknown'),
        **kwargs
    }
    logger.log(getattr(logging, level.upper()), json.dumps(log_entry))


# Usage
def handler(event, context):
    structured_log('info', 'Processing request',
        request_id=context.aws_request_id,
        user_id=event.get('user_id'),
        action='create_project'
    )

    # ... process request ...

    structured_log('info', 'Request completed',
        request_id=context.aws_request_id,
        duration_ms=elapsed,
        status='success'
    )
```

Then query with CloudWatch Insights:

```sql
fields @timestamp, message, user_id, duration_ms
| filter level = "ERROR"
| sort @timestamp desc
| limit 50
```

### X-Ray Tracing

For distributed systems, X-Ray is non-negotiable. It shows you where time is spent across service boundaries:

```python
from aws_xray_sdk.core import xray_recorder
from aws_xray_sdk.core import patch_all

# Patch all supported libraries (boto3, requests, etc.)
patch_all()

@xray_recorder.capture('process_order')
def process_order(order_id: str):
    # X-Ray automatically traces this function and all
    # downstream AWS SDK calls (DynamoDB, SQS, etc.)

    # Add custom annotations for filtering in X-Ray console
    xray_recorder.current_subsegment().put_annotation('order_id', order_id)

    order = get_order(order_id)        # DynamoDB call — traced
    validate_inventory(order)          # Another Lambda — traced
    charge_payment(order)              # External API — traced
    send_confirmation(order)           # SQS message — traced
```

With X-Ray, when a user reports "my order took 10 seconds," you can trace the exact request and see that 8 seconds were spent waiting for the payment API. That's the kind of insight that turns hours of debugging into minutes.

## Cost Optimization Patterns

AWS will happily take your money if you let it. These are the patterns that have saved me (and my clients) the most.

### 1. Right-Size Lambda Memory

Lambda CPU scales linearly with memory. A function with 128MB gets 1/8th of a vCPU, while 1792MB gets a full vCPU. Sometimes **increasing** memory **reduces** cost because the function runs so much faster.

```python
# Use AWS Lambda Power Tuning (open-source tool) to find the sweet spot
# Typical results for a CPU-bound function:

#  Memory  |  Duration  |  Cost per invocation
#  128 MB  |  3200 ms   |  $0.0000066
#  512 MB  |  800 ms    |  $0.0000067   <-- same cost, 4x faster
#  1024 MB |  400 ms    |  $0.0000067   <-- same cost, 8x faster
#  1792 MB |  250 ms    |  $0.0000073   <-- slightly more, but way faster
```

For most functions, 512MB-1024MB is the sweet spot. The default 128MB is almost never optimal.

### 2. DynamoDB On-Demand vs Provisioned

```
Monthly cost comparison (assuming 10M reads + 2M writes per month):

On-Demand:
  Reads:  10,000,000 x $0.25/million  = $2.50
  Writes:  2,000,000 x $1.25/million  = $2.50
  Total: $5.00/month

Provisioned (with auto-scaling):
  Reads:  ~20 RCU x $0.00013/hour x 730 hours  = $1.90
  Writes: ~2 WCU x $0.00065/hour x 730 hours    = $0.95
  Total: $2.85/month

At 100M reads + 20M writes:
  On-Demand: $50/month
  Provisioned: $28.50/month
```

**My rule:** Start with on-demand. It's simpler and handles unpredictable traffic. Switch to provisioned with auto-scaling once your traffic patterns are predictable and you're spending more than $50/month on a single table.

### 3. Use S3 Intelligent-Tiering

Stop manually managing S3 storage classes. Intelligent-Tiering automatically moves objects between tiers based on access patterns. The monitoring fee ($0.0025 per 1,000 objects/month) pays for itself almost immediately.

### 4. Reserved Instances and Savings Plans

If you're running ECS or EC2 workloads 24/7, you're leaving 30-60% savings on the table by not using Savings Plans.

```
On-Demand EC2 m6i.large:   $0.096/hour  = $70/month
1-year Savings Plan:        $0.060/hour  = $44/month  (37% savings)
3-year Savings Plan:        $0.037/hour  = $27/month  (61% savings)
```

Commit to 1-year Compute Savings Plans first. They're flexible across instance families, regions, and even between EC2 and Fargate. Only use 3-year terms for workloads you're certain about.

### 5. The NAT Gateway Tax

NAT Gateways cost $0.045/hour ($32/month) plus $0.045/GB of data processed. If your Lambda functions in a VPC are making external API calls, NAT Gateway data processing charges can silently become your biggest cost.

**Solutions:**
- Use VPC endpoints for AWS services (S3, DynamoDB, SQS) -- free for Gateway endpoints, cheap for Interface endpoints
- Move Lambdas outside the VPC if they don't need VPC resources
- Use a single NAT Gateway for non-production environments (accept the single-AZ risk)

## Conclusion

AWS architecture isn't about memorizing services. It's about understanding trade-offs and picking the simplest pattern that meets your requirements. The patterns in this post cover probably 80% of the applications I've built or helped build:

1. **Lambda for event-driven work, ECS for long-running services.** Don't overthink compute.
2. **SQS between services.** Decoupling is almost always worth it.
3. **DynamoDB for known access patterns, PostgreSQL for everything else.** Stop fighting the wrong database.
4. **Cache aggressively with Redis.** It's the cheapest performance improvement you can make.
5. **Monitor the metrics that matter.** p99 latency, error rates, queue depth, DLQ count.
6. **Optimize costs from day one.** Right-size Lambda memory, use Savings Plans, watch NAT Gateway charges.

The best architecture is one you can reason about, debug at 2 AM, and hand off to another developer without a two-hour walkthrough. Start simple, measure everything, and add complexity only when the data tells you to.
