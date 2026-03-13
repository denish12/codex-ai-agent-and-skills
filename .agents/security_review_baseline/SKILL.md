---
name: security_review_baseline
description: Security ревью по baseline — OWASP-риски, authz, валидация, SSRF/XSS/CSRF, секреты, безопасные логи/ошибки, least privilege.
---

# Skill: Security Review Baseline

Быстрый security-ревью по базовому чек-листу. Для глубокого ревью → `$security_review`.

> **Когда использовать:** Быстрый baseline при каждом ревью (5-10 мин).
> **Для глубокого ревью** конкретных областей → `$security_review`.

**Разделы:**
1. [Quick Checklist](#1-checklist)
2. [Automated Scan](#2-scan)
3. [Quick Reference](#3-reference)
4. [Output Template](#4-output)

---

## 1. Quick Checklist

| # | Category | Check | Severity | Status |
|---|----------|-------|----------|--------|
| SB-01 | **Secrets** | No hardcoded passwords/tokens/API keys in code | 🔴 P0 | ☐ |
| SB-02 | **Secrets** | No secrets in logs or error responses | 🔴 P0 | ☐ |
| SB-03 | **Secrets** | `.env` in `.gitignore`, `.env.example` committed | 🔴 P0 | ☐ |
| SB-04 | **Validation** | Zod/schema validation on every API endpoint | 🔴 P0 | ☐ |
| SB-05 | **Validation** | Error responses don't expose internals (no stack, no DB errors) | 🔴 P0 | ☐ |
| SB-06 | **Auth** | Server-side auth check on protected endpoints | 🔴 P0 | ☐ |
| SB-07 | **Auth** | IDOR prevention (ownership verification before data access) | 🔴 P0 | ☐ |
| SB-08 | **Injection** | No `eval()`, `Function()`, `child_process.exec(userInput)` | 🔴 P0 | ☐ |
| SB-09 | **Injection** | No raw user input in DB queries (NoSQL injection) | 🔴 P0 | ☐ |
| SB-10 | **XSS** | No `dangerouslySetInnerHTML` without sanitize | 🔴 P0 | ☐ |
| SB-11 | **CSRF** | Cookie auth → `SameSite=Strict/Lax` + CSRF token | 🟠 P1 | ☐ |
| SB-12 | **SSRF** | User-controlled URL fetch → allowlist + block internal ranges | 🔴 P0 | ☐ |
| SB-13 | **Rate Limit** | Rate limiting on public/expensive endpoints | 🟠 P1 | ☐ |
| SB-14 | **Logging** | No PII in logs (email masked, no passwords/tokens) | 🔴 P0 | ☐ |
| SB-15 | **Logging** | Audit trail for critical operations | 🟠 P1 | ☐ |
| SB-16 | **Deps** | `npm audit` — no high/critical vulnerabilities | 🟠 P1 | ☐ |
| SB-17 | **Headers** | Helmet configured (or security headers set) | 🟠 P1 | ☐ |

---

## 2. Automated Scan

Run these during every review:

```bash
# 🔴 P0 checks
grep_search: Query="eval("                          → Code injection
grep_search: Query="dangerouslySetInnerHTML"         → XSS risk
grep_search: Query="password.*=.*['\"]"              → Hardcoded secret
grep_search: Query="apiKey.*=.*['\"]"                → Hardcoded secret
grep_search: Query="token.*=.*['\"]"                 → Hardcoded secret
grep_search: Query="Model.find(req."                → NoSQL injection
grep_search: Query="child_process"                   → Command injection
grep_search: Query="\\$where"                        → MongoDB injection

# 🟠 P1 checks
grep_search: Query="console.log"                     → Replace with pino
grep_search: Query="cors({ origin: '*'"              → Open CORS
grep_search: Query="eslint-disable"                  → Rule bypass

# CLI
npm audit --audit-level=high
```

---

## 3. Quick Reference

For DO/DON'T examples → see `$review_reference_snippets`:
- Secrets: sections A, B
- Validation: section C
- Errors: section D
- Injection: sections E, E2
- Auth: section G
- XSS: section I
- SSRF: section J
- CSRF: section H

---

## 4. Output Template

```markdown
# Security Baseline Check

**Scope:** <PR/module>
**Date:** YYYY-MM-DD

## Quick Scan Results
| Check | Result |
|-------|--------|
| Hardcoded secrets | ✅ Clean |
| eval/exec | ✅ Clean |
| npm audit | ⚠️ 1 moderate |
| XSS risk | ✅ Clean |

## Findings
| # | Severity | Check | File:Line | Finding | Fix |
|---|----------|-------|-----------|---------|-----|
| 1 | 🔴 P0 | SB-07 | `routes/settings.js:25` | No ownership check | Add appInstanceId verification |

## Summary
- P0: X findings → must fix
- P1: Y findings → should fix

## Need deeper review?
→ Activate `$security_review` for: [auth / injection / SSRF / etc.]
```

---

## См. также
- `$security_review` — deep AppSec review (29 checks)
- `$review_reference_snippets` — DO/DON'T code examples (A-V)
- `$threat_model_baseline` — architecture-level threats