---
name: qa_api_contract_tests
description: Check the API for compliance with contracts: schemes, codes, errors, validation, pagination; smoke via Postman/curl/scripts.
---

# Skill: QA API Contract Tests

## Check
- Endpoints match method/path
- Status codes (200/201/204/400/401/403/404/409/422/500) under contract
- Unified error format (error_code/message)
- Validation (422/400) on incorrect data
- Pagination/filters/sorting (if in UX/contract)

## Exit
- Check table: endpoint → PASS/FAIL → notes