---
name: qa_security_smoke_tests
description: Basic security smoke tests: auth/authz, validation, leaks in errors/logs, rate limiting (if enabled), SSRF/XSS where relevant.
---

# Skill: QA Security Smoke Tests

## Check minimum
- 401 without token/session
- 403 for insufficient rights
- 422/400 for invalid input
- Errors do not contain stack/SQL/secrets
- Logs do not contain PII/secrets (check sample if possible)
- 429 when the limit is exceeded (if rate limit is enabled)