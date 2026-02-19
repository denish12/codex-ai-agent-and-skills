---
name:adr_log
description: Record key architectural decisions (ADR) with trade-offs: Pros/Cons/Alternatives/Decision, status and date.
---

#Skill: ADR Log

## Goal
Don’t lose track of “why we did this” and simplify review/support.

## When to use
- For every non-trivial choice: database, auth, cache, module structure, API format, error strategy, queues, search, deployment, integrations, etc.

## ADR format (required)
# ADR-XXX: <Name>

## Context
<why is this necessary, what are the limitations, what hurts>

##Decision
<what you chose and how exactly>

## Consequences
### Positive
- ...
###Negative
- ...

## Alternatives Considered
- **A**: ...
- **B**: ...

##Status
Proposed / Accepted / Deprecated

##Date
YYYY-MM-DD

## Requirements (strict)
- For each ADR there must be explicit Pros/Cons/Alternatives and rationale of choice.
- If the decision affects security/data/cost, be sure to describe the consequences.
- ADR should be short and specific: without water, but with key arguments.

## Example (short)
# ADR-001: Selecting the main database

##Context
You need to store users/sessions/orders. Transactions and complex queries are needed. Expected growth to 100K users.

##Decision
We use PostgreSQL as the main database.

## Consequences
### Positive
- ACID transactions
- Rich queries and indexing
###Negative
- Possible need for scaling during growth
- Operational costs for administration

## Alternatives Considered
- **MongoDB**: weaker in transactional/complex join scenarios
- **DynamoDB**: vendor lock-in, more difficult to test locally

##Status
Accepted

##Date
2025-01-15