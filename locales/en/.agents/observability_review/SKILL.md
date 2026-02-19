---
name: observability_review
description: Observability review: structured logs, request_id/trace_id, log levels, prohibition of PII/secrets leaks, compliance with the Observability Plan.
---

#Skill: Observability Review

## Check
- Structured logs (keys, not bare strings)
- request_id/trace_id correlation (if provided)
- Logging levels are correct (error only for real errors)
- PII/secrets are not logged
- Key events (audit) are logged if necessary

## Exit
- Inconsistencies with the plan
- Specific recommendations

## See also
- Examples and anti-examples: $review_reference_snippets