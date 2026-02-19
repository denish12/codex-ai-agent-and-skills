---
name: api_contracts
description: API contracts for UX flows: endpoints, schemas, errors, validation, authorization, perf/scalability considerations, idempotency and integration patterns.
---

# Skill: API Contracts

## Goal
Make the API predictable, safe and efficient for the client and tests.

## Inputs
- UX Spec (screens/actions/states)
- PRD (acceptance criteria)
- Roles/permissions

## Exit
### General rules
- Unified error format (error_code, message, details)
- 401 vs 403 distinguish
- Validation at boundaries
- Pagination/filters/sorting - if the UI requires
- Idempotency for create/risk operations (where needed)
- Versioning (if the public API is expected to grow)

### For each endpoint
- Method + Path
- AuthN/AuthZ: required? roles?
- Request schema (types + restrictions)
- Response schema
- Errors:
  - status
  - error_code
  - safe message
- Perf/scalability notes:
  - limits, pagination, batch, round-trips minimization

### Integrations
- Webhooks/external APIs: retry/backoff, signature/verification, idempotency
- Async if justified (event-driven)

## Trade-offs
If there are controversial areas (for example, CQRS/async), record them as ADR.