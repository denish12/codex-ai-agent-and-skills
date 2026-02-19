---
name: threat_model_baseline
description: Threat baseline for MVP: assets, attack vectors, measures. Considers OWASP risks and roles/permissions.
---

# Skill: Threat Model Baseline

## Target
Build security into the design before the code.

## Principles
- Defense in depth
- Least privilege
- Input validation at boundaries
- Secure by default
- Audit trail for critical operations (if applicable)

## Inputs
- PRD (PII/payments/critical operations)
- Roles/permissions
- Integrations
- API Contracts

## Output (structure)
- Assets
- Attack surfaces
- Threats → mitigations
- Security requirements for implementation and tests

## 1) Assets (what we protect)
- accounts/sessions
- user data (PII)
- payments/orders (if any)
- admin access

## 2) Attack surfaces
- public endpoints
- uploading files
- webhooks
- auth flows

## 3) Main threats → measures (minimum)
- Injection (SQL/NoSQL/command) → validation/parameterization
- XSS → escaping/sanitization/Content Security Policy (if applicable)
- CSRF → CSRF tokens / sameSite cookies (if applicable)
- Auth bypass → strict Authz check on the server
- SSRF → allowlist/prohibition of internal addresses (if there is a fetch of external URLs)
- Secrets leakage → secret storage + logging prohibited
- Rate limiting / brute force → limits/blocking/captcha (if necessary)

## 4) Security requirements for implementation
- where audit logging is required
- requirements for passwords/sessions/tokens
- data storage/deletion policy

## Note
If there is compliance (GDPR, etc.) - fix mandatory measures and retention periods.
