---
title: "From Monolith to Microservices: Lessons Learned"
slug: "from-monolith-to-microservices"
date: "2026-01-25"
description: "Real-world lessons from migrating a Django monolith to a microservices architecture using Docker, Kubernetes, and event-driven communication."
tags: ["Microservices", "Docker", "Kubernetes", "Architecture"]
published: true
---

Last year, I led the migration of a large Django monolith into a set of microservices. Here's what I wish I knew before starting.

## When to Migrate

Not every monolith needs to be broken apart. Migrate when:

- **Teams are stepping on each other** — deployments are blocked by unrelated changes
- **Scaling is uneven** — one feature needs 10x the resources while others sit idle
- **The codebase is too large** for any single developer to reason about

If none of these apply, a well-structured monolith is perfectly fine.

## The Strangler Fig Pattern

We didn't rewrite everything at once. Instead, we used the **strangler fig pattern** — gradually extracting services while the monolith continued running:

```yaml
# docker-compose.yml - Running both during migration
services:
  monolith:
    build: ./legacy
    ports:
      - "8000:8000"

  user-service:
    build: ./services/users
    ports:
      - "8001:8000"
    depends_on:
      - rabbitmq

  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"
```

An API gateway routed traffic to either the monolith or the new service based on the endpoint.

## Event-Driven Communication

The biggest mistake teams make with microservices is building a **distributed monolith** — services that call each other synchronously. Instead, use events:

```python
# Publishing an event when a user is created
import pika
import json

def publish_user_created(user_data):
    connection = pika.BlockingConnection(
        pika.ConnectionParameters('rabbitmq')
    )
    channel = connection.channel()
    channel.exchange_declare(exchange='users', exchange_type='fanout')
    channel.basic_publish(
        exchange='users',
        routing_key='',
        body=json.dumps({
            'event': 'user.created',
            'data': user_data
        })
    )
    connection.close()
```

Services that need user data subscribe to the `users` exchange and maintain their own local copy. This makes services **independently deployable** and **resilient to failures**.

## Kubernetes Deployment

Each service gets its own Helm chart with standardized templates:

```yaml
# values.yaml
replicaCount: 3
image:
  repository: registry.example.com/user-service
  tag: "1.2.0"
resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 500m
    memory: 512Mi
autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilization: 70
```

## Key Takeaways

1. **Start with the boundaries** — identify clear domain boundaries before splitting
2. **Invest in observability** — distributed tracing (Jaeger), centralized logging (ELK), metrics (Prometheus)
3. **Automate everything** — CI/CD per service, infrastructure as code
4. **Accept eventual consistency** — not everything needs to be real-time
5. **Keep shared libraries minimal** — coupling through shared code defeats the purpose

The migration took 6 months and was worth it. Deployment frequency went from weekly to multiple times per day, and teams could move independently. But it came with operational complexity that required significant investment in tooling.

Choose your trade-offs wisely.
