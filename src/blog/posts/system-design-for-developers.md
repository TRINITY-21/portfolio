---
title: "System Design Fundamentals Every Developer Should Know"
slug: "system-design-for-developers"
date: "2026-01-22"
description: "The system design concepts that matter most in real-world engineering — load balancing, caching, database scaling, message queues, and how to think about trade-offs. No whiteboard interview fluff."
tags: ["System Design", "Backend", "Architecture", "DevOps"]
published: true
---

System design isn't just for interviews. Every decision you make as a developer — which database to use, whether to add a cache, how to handle background jobs — is a system design decision. The difference between senior and junior engineers often comes down to how well they reason about these trade-offs.

Here are the fundamentals that have shaped how I build systems.

## Think in Trade-Offs, Not Best Practices

There is no universally "best" architecture. There are only trade-offs. The CAP theorem is the most famous example, but trade-offs are everywhere:

| You want... | You sacrifice... |
|-------------|-----------------|
| Consistency | Availability or latency |
| Low latency | Consistency or simplicity |
| Simplicity | Scalability or flexibility |
| Cost efficiency | Performance or reliability |

Every architectural decision is choosing which side of a trade-off you're on. The right answer depends on your specific requirements.

## Load Balancing: Distributing Work

When one server isn't enough, you put multiple servers behind a load balancer. Simple concept, nuanced execution.

```
                    ┌──────────┐
                    │   Load   │
            ┌───────│ Balancer │───────┐
            │       └──────────┘       │
            ▼            ▼             ▼
      ┌──────────┐ ┌──────────┐ ┌──────────┐
      │ Server 1 │ │ Server 2 │ │ Server 3 │
      └──────────┘ └──────────┘ └──────────┘
```

**Strategies that matter:**

- **Round Robin** — simplest, works when all requests are roughly equal cost
- **Least Connections** — route to the server handling the fewest requests. Better for varying request complexity
- **IP Hash** — same client always hits same server. Useful for session affinity but hurts distribution
- **Weighted** — send more traffic to beefier servers

**The sticky session trap:** Using IP hash or cookies to keep users on the same server seems convenient for session state, but it creates hotspots and complicates scaling. **Store session state externally** (Redis, database) and let any server handle any request.

## Caching: The Biggest Performance Win

A well-placed cache is usually the single biggest performance improvement you can make. But caching introduces complexity — you're trading consistency for speed.

### The Caching Pyramid

```
Browser Cache       → Fastest, least control
CDN Cache           → Great for static assets
Application Cache   → Redis/Memcached, most flexible
Database Cache      → Query cache, materialized views
```

### Cache Invalidation Strategies

```python
# Strategy 1: Cache-Aside (Lazy Loading)
# App checks cache first, loads from DB on miss
def get_user(user_id: str) -> User:
    cached = redis.get(f"user:{user_id}")
    if cached:
        return deserialize(cached)

    user = db.query(User).get(user_id)
    redis.setex(f"user:{user_id}", 3600, serialize(user))
    return user

# Strategy 2: Write-Through
# Every write updates both DB and cache
def update_user(user_id: str, data: dict) -> User:
    user = db.query(User).get(user_id)
    user.update(**data)
    db.commit()

    # Immediately update cache
    redis.setex(f"user:{user_id}", 3600, serialize(user))
    return user

# Strategy 3: Write-Behind (most complex)
# Writes go to cache first, async flush to DB
# Higher performance, risk of data loss
```

**My default:** Cache-Aside for reads + explicit invalidation on writes. It's simple, predictable, and good enough for 90% of cases.

### Cache Stampede Prevention

When a popular cache key expires, thousands of requests simultaneously hit the database. This is a **cache stampede** and it can take down your database.

```python
import time
import random

def get_with_stampede_protection(key: str, ttl: int, fetch_fn):
    cached = redis.get(key)

    if cached:
        data, expires_at = deserialize(cached)
        # Return cached data, but refresh proactively if near expiry
        if time.time() > expires_at - ttl * 0.1:  # Within 10% of expiry
            if redis.setnx(f"lock:{key}", 1, ex=30):  # Only one refresher
                refresh_in_background(key, ttl, fetch_fn)
        return data

    # Cache miss — use lock to prevent stampede
    if redis.setnx(f"lock:{key}", 1, ex=30):
        data = fetch_fn()
        redis.setex(key, ttl, serialize((data, time.time() + ttl)))
        redis.delete(f"lock:{key}")
        return data

    # Another process is fetching — wait briefly and retry
    time.sleep(0.1 + random.uniform(0, 0.1))
    return get_with_stampede_protection(key, ttl, fetch_fn)
```

## Database Scaling: Read Replicas and Sharding

### Read Replicas

Most applications are read-heavy (90%+ reads). Read replicas handle this:

```
        Writes               Reads
          │            ┌───────┼───────┐
          ▼            ▼       ▼       ▼
    ┌──────────┐  ┌────────┐┌────────┐┌────────┐
    │ Primary  │──│Replica ││Replica ││Replica │
    │   (RW)   │  │  (RO)  ││  (RO)  ││  (RO)  │
    └──────────┘  └────────┘└────────┘└────────┘
                  ← Replication (async) ─
```

**The replication lag trap:** Replicas are slightly behind the primary. If a user creates a post and immediately sees their profile, the post might not appear yet. Solutions:

1. **Read-your-writes consistency** — route reads to primary for the user who just wrote
2. **Causal consistency** — track write timestamps and only read from replicas that are caught up

### Sharding

When one database can't hold all your data, you split it across multiple databases:

```python
def get_shard(user_id: str, num_shards: int = 4) -> int:
    """Consistent hashing to determine which shard holds this user's data."""
    return hash(user_id) % num_shards

# User 123 → shard 3, always
# User 456 → shard 0, always
```

**Sharding is a last resort.** It adds enormous complexity: cross-shard queries, rebalancing, referential integrity loss. Exhaust these options first:

1. Optimize queries (indexes, query plans)
2. Vertical scaling (bigger database server)
3. Read replicas
4. Caching layer
5. Archive old data
6. *Then* consider sharding

## Message Queues: Decoupling Systems

When System A needs to tell System B something happened, you have two choices:

**Synchronous (direct call):**
```
User → API → Payment Service → Email Service → Response
         (If email is slow, the whole request is slow)
```

**Asynchronous (queue):**
```
User → API → Payment Service → Response (fast!)
                    ↓
              Message Queue
                    ↓
             Email Service (processes independently)
```

```python
# Producer: Payment service publishes event
import json

def process_payment(order_id: str):
    charge = stripe.charge(order.total)

    # Publish event — don't wait for downstream processing
    queue.publish("order.paid", json.dumps({
        "order_id": order_id,
        "amount": str(order.total),
        "customer_email": order.customer.email,
    }))

    return {"status": "paid", "charge_id": charge.id}

# Consumer: Email service processes asynchronously
def handle_order_paid(message):
    data = json.loads(message.body)
    send_receipt_email(data["customer_email"], data["order_id"])
    message.ack()
```

**When to use queues:**
- Sending emails/notifications (non-critical path)
- Processing uploads (video encoding, image resizing)
- Cross-service communication in microservices
- Rate limiting external API calls
- Any task where the user doesn't need to wait for the result

## Rate Limiting: Protecting Your System

Every public API needs rate limiting. Without it, one misbehaving client can overwhelm your system.

**Token bucket** is the most common algorithm:

```python
class TokenBucket:
    def __init__(self, capacity: int, refill_rate: float):
        self.capacity = capacity
        self.tokens = capacity
        self.refill_rate = refill_rate  # tokens per second
        self.last_refill = time.time()

    def allow_request(self) -> bool:
        now = time.time()
        elapsed = now - self.last_refill

        # Refill tokens based on elapsed time
        self.tokens = min(
            self.capacity,
            self.tokens + elapsed * self.refill_rate
        )
        self.last_refill = now

        if self.tokens >= 1:
            self.tokens -= 1
            return True
        return False
```

## The Architecture Decision Record

For every significant design decision, write a short ADR:

```markdown
# ADR-007: Use Redis for Session Storage

## Status: Accepted

## Context
We currently store sessions in PostgreSQL. With 5000 concurrent
users, session reads account for 40% of database queries.

## Decision
Move session storage to Redis with 24-hour TTL.

## Consequences
- Positive: ~40% reduction in database load
- Positive: Session reads drop from ~5ms to <1ms
- Negative: Redis becomes a critical dependency
- Negative: Sessions lost if Redis restarts (acceptable for our use case)

## Alternatives Considered
- Database read replicas (more complex, overkill for this)
- JWT tokens (stateless but can't revoke individual sessions)
```

This is the most underrated practice in software engineering. Six months from now, when someone asks "why do we use Redis for sessions?", the answer is documented with full context.

## The Scaling Playbook

When you need to scale, work through this list in order:

1. **Measure first.** Profile before optimizing. The bottleneck is rarely where you think.
2. **Optimize the code.** Fix N+1 queries, add indexes, reduce payload sizes.
3. **Add caching.** Usually the biggest bang for buck.
4. **Scale vertically.** Bigger server. Boring but effective.
5. **Add read replicas.** Separate read and write traffic.
6. **Introduce queues.** Move non-critical work off the hot path.
7. **Scale horizontally.** Multiple app servers behind a load balancer.
8. **Shard if necessary.** Last resort for data that won't fit on one server.

Most applications never need to go past step 5. Don't architect for Google-scale unless you have Google-scale traffic.
