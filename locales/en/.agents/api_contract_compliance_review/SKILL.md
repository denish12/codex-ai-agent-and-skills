---
name: api_contract_compliance_review
description: Checking the compliance of the API implementation with contracts: schemes, error codes, validation, authorization, idempotency, pagination.
---

# Skill: API Contract Compliance Review

## Check
- Endpoints correspond to API Contracts (method/path/request/response)
- Errors: status + error_code + safe message
- Border Validation (422 or accepted policy)
- 401 vs 403 correct
- Pagination/filters/sorting are implemented if UX is required
- Idempotency for risky operations (if it was in the contract/ADR)

## Exit
- Inconsistencies for each endpoint
- Recommendations (pointwise)