---
name: security_review
description: AppSec review for endpoints/authorization/input/secrets/sensitive features. Checklist + patterns (OWASP baseline).
---

# Skill: Security Review (AppSec)

## When to activate
- New API endpoints
- AuthN/AuthZ
- User input / file uploads
- Secrets/credentials
- Payments/PII/sensitive data
- Third-party integrations

## Checklist (minimum)
1) Secrets management
- No hardcode, no secrets in logs/errors
- Secrets live in env/secret manager, there is a check for availability

2) Input validation
- Border schemes (whitelist validation)
- Bugs don't reveal the insides

3) Injection
- SQL/NoSQL/command: no concatenations, only parameterization/ORM

4) AuthN/AuthZ
- Tokens not in localStorage (if applicable), preferably httpOnly cookies
- AuthZ checks before critical operations
- RLS/data policies (if you use Supabase/analogue)

5) XSS/CSP
- Sanitize custom HTML (if any)
- CSP/headers if required by the architecture

6) CSRF (if cookie-based sessions)
- CSRF tokens / SameSite=Strict, double-submit pattern if necessary

7) Rate limiting
- Basic limits on API, stricter for expensive endpoints

8) Sensitive data exposure
- No PII/secrets in logs
- No stack trace for user

9) Dependency security
- audit/lockfile/reproducible install

## Exit
- Findings P0/P1/P2 + specific fixes
- What to add to security tests (auth/authz/validation/rate limiting)

## See also
- Examples and anti-examples: $review_reference_snippets