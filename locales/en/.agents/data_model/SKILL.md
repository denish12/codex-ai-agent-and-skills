---
name: data_model
description: Data model and storage strategy: normalization/denormalization, indexes, transactions, cache, (optional) event sourcing/eventual consistency - with trade-offs and binding to UX flows.
---

# Skill: Data Model

## Goal
Support product scenarios and prepare the base for growth.

## Exit
## 1) Entities
For each entity:
- fields (type/required)
- restrictions (unique/not null/range)
- communications
- indexes for UX queries

## 2) Data patterns (conscious choice)
- Default normalization
- Denormalization for read perf (if really needed)
- Cache layers (Redis) - if there are hot reads
- Eventual consistency - if there are distributed parts
- Event sourcing - only if you need a strict audit/replay

For each selected pattern: Pros/Cons/Alternatives (ADR if necessary).

## 3) Migrations strategy
- versioning
- reversibility (if necessary)
- Seeds/fixtures

## 4) Transaction boundaries
- where transactions are needed
- competition and integrity (constraints/locking)

## 5) Query patterns
- typical requests for screens
- risks of N+1 / heavy joins
- optimizations: indexes, prefetch, denormalization (if necessary)