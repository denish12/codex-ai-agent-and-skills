---
name: security_review_baseline
description: Security review based on baseline: OWASP risks, authz, validation, SSRF/XSS/CSRF, secrets, secure logs/errors, least privilege.
---

# Skill: Security Review Baseline

## Check (minimum)
- Input validation on boundaries (API/forms)
- AuthN/AuthZ: server checks rights, client is not trusted
- Errors: no leak stacktrace/SQL/configs/PII
- Secrets: no keys/tokens in repo and logs
- SSRF: if there is a fetch of external URLs → allowlist/block of internal addresses
- XSS: escaping/sanitizing (if there is custom HTML)
- CSRF: if cookie-based sessions → protection (tokens/sameSite)
- Rate limiting / brute force for sensitive endpoints (if needed)
- Audit trail for critical operations (if threat model is required)

## Exit
- P0 security blockers
- P1 security issues
- Recommended measures (specifically)

## See also
- Examples and anti-examples: $review_reference_snippets