---
name: threat-model-baseline
description: Базовая модель угроз (threat baseline) для MVP — активы, векторы атак, меры. Учитывает OWASP-риски и роли/права.
---

# Skill: Threat Model Baseline

Встроить безопасность в дизайн до кода.

**Разделы:**
1. [Принципы](#1-принципы)
2. [Assets](#2-assets)
3. [Attack Surfaces](#3-attack-surfaces)
4. [Threat Table](#4-threat-table)
5. [Risk Matrix](#5-risk-matrix)
6. [OWASP Top 10 Checklist](#6-owasp)
7. [Security Requirements](#7-requirements)
8. [Пример](#8-пример)
9. [Output Template](#9-output)

---

## 1. Принципы

| Принцип | Описание | Пример |
|---------|---------|--------|
| **Defense in depth** | Несколько слоёв защиты | Validation + auth + sanitization |
| **Least privilege** | Минимальные права | DB user: readWrite only, no admin |
| **Input validation at boundaries** | Не доверяй никакому input | Zod schema на каждый endpoint |
| **Secure by default** | Безопасно "из коробки" | CORS whitelist, Helmet on, strict CSP |
| **Fail securely** | Ошибка → безопасное состояние | Don't expose stack/DB errors |
| **Audit trail** | Логируй критичные операции | Install, settings change, content create |

---

## 2. Assets

Что мы защищаем:

| Asset | Sensitivity | Impact if compromised |
|-------|-----------|----------------------|
| **App settings** | Medium | Widget shows incorrect data |
| **Sensitive content** | Medium | Unauthorized access to business data |
| **appInstanceId/tokens** | High | Unauthorized access to any installation |
| **Wix OAuth tokens** | High | Full API access to user's Wix site |
| **DB credentials** | Critical | Full data access + modification |
| **Webhook secrets** | High | Spoofed install/uninstall events |
| **User PII (email)** | High (GDPR) | Compliance violation, reputation damage |
| **Admin access** | Critical | Full system control |

---

## 3. Attack Surfaces

| Surface | Endpoints/Components | Risk Level |
|---------|---------------------|-----------|
| **Public API** | Widget endpoint (no auth) | Medium |
| **Dashboard API** | Settings/Content CRUD | High |
| **Webhooks** | Install/Uninstall | High |
| **Embedded Script** | JS on Wix sites | Medium |
| **Dashboard UI** | Wix iframe | Medium |
| **Database** | MongoDB connection | High |
| **Docker/Infra** | Ports, volumes, certs | Medium |

---

## 4. Threat Table

Для каждой угрозы: описание, impact, likelihood, severity, mitigation.

| # | Threat | Surface | Impact | Likelihood | Severity | Mitigation | Status |
|---|--------|---------|--------|-----------|----------|-----------|--------|
| T-01 | **NoSQL Injection** | Dashboard API | High | Medium | 🔴 P0 | Safe filter builder, Zod validation, `strictQuery: true` | ☐ |
| T-02 | **XSS via settings** | Embedded Script | High | Medium | 🔴 P0 | Sanitize all user input before rendering, CSP headers | ☐ |
| T-03 | **Webhook spoofing** | Webhook endpoint | High | Low | 🟠 P1 | Verify JWT signature, validate payload structure | ☐ |
| T-04 | **IDOR (Insecure Direct Object Reference)** | Dashboard API | High | Medium | 🔴 P0 | Verify appInstanceId belongs to authenticated user | ☐ |
| T-05 | **Secrets in code/logs** | All | Critical | Medium | 🔴 P0 | Env vars only, pino redact, .gitignore | ☐ |
| T-06 | **Brute force enumeration** | Widget endpoint | Medium | Low | 🟡 P2 | Rate limiting on widget endpoint | ☐ |
| T-07 | **CSRF** | Dashboard API | Medium | Low | 🟠 P1 | SameSite cookies, origin check | ☐ |
| T-08 | **Dependency supply chain** | npm packages | High | Low | 🟠 P1 | `npm audit`, lockfile, minimal deps | ☐ |
| T-09 | **Man-in-the-middle** | All HTTP | High | Low | 🟠 P1 | HTTPS everywhere (Caddy), HSTS | ☐ |
| T-10 | **Embed script injection** | Wix site | High | Low | 🟠 P1 | Script src from trusted origin only, no eval() | ☐ |

---

## 5. Risk Matrix

### Impact × Likelihood

```
              │ Low Likelihood │ Medium │ High
──────────────┼────────────────┼────────┼──────
High Impact   │ 🟠 P1          │ 🔴 P0  │ 🔴 P0
Medium Impact │ 🟡 P2          │ 🟠 P1  │ 🔴 P0
Low Impact    │ 🟡 P2          │ 🟡 P2  │ 🟠 P1
```

### Severity actions

| Severity | Action | Timeline |
|----------|--------|----------|
| 🔴 **P0** | Must fix before release | This sprint |
| 🟠 **P1** | Fix in current iteration | Next 2 sprints |
| 🟡 **P2** | Track in backlog | When resources allow |

---

## 6. OWASP Top 10 Checklist

| # | OWASP Category | Relevant? | Mitigation | Status |
|---|---------------|:---------:|-----------|--------|
| A01 | **Broken Access Control** | ✅ | Auth middleware, IDOR check, role validation | ☐ |
| A02 | **Cryptographic Failures** | ✅ | HTTPS, bcrypt for passwords, no secrets in logs | ☐ |
| A03 | **Injection** | ✅ | Zod validation, safe filter builder, no eval() | ☐ |
| A04 | **Insecure Design** | ✅ | Threat model (this doc), defense in depth | ☐ |
| A05 | **Security Misconfiguration** | ✅ | Helmet, CORS whitelist, strict CSP, no debug in prod | ☐ |
| A06 | **Vulnerable Components** | ✅ | npm audit, lockfile, minimal dependencies | ☐ |
| A07 | **Auth Failures** | ⬜ | Wix handles auth (OAuth flow) | N/A |
| A08 | **Data Integrity Failures** | ✅ | Webhook signature verification, input validation | ☐ |
| A09 | **Logging Failures** | ✅ | Structured logs, request correlation, no PII in logs | ☐ |
| A10 | **SSRF** | ⬜ | No user-controlled URL fetching | N/A |

---

## 7. Security Requirements

### For implementation (DEV gate)

| Requirement | Where | How to verify |
|------------|-------|--------------|
| Input validation on every endpoint | API middleware | Unit test: invalid input → 400 |
| Auth check on protected endpoints | Auth middleware | Test: no token → 401 |
| IDOR prevention | Controllers | Test: wrong appInstanceId → 403 |
| Secure error responses | Error handler | Test: 500 → no stack in response |
| Secrets via env only | Config module | grep: no hardcoded secrets |
| Helmet + CORS | Express setup | Integration test: check headers |
| PII redaction in logs | Pino config | Log output: no passwords/tokens |

### For review (REV gate)

| Requirement | How to verify |
|------------|--------------|
| No `eval()`, `Function()`, `dangerouslySetInnerHTML` without sanitize | grep |
| No `eslint-disable-next-line` for security rules | grep |
| `npm audit` clean (no high/critical) | `npm audit --audit-level=high` |
| No TODO/FIXME related to security | grep `TODO.*secur\|FIXME.*auth` |

---

## 8. Пример

```markdown
# Threat Model: SaaS Admin Panel

## Key Assets
- Admin credentials (sessions, API tokens)
- Product/content data, user settings
- DB credentials, external API keys

## Top Threats (prioritized)
1. 🔴 T-01: NoSQL injection via admin API → Zod + safe filter
2. 🔴 T-04: IDOR on resources → verify ownership middleware
3. 🔴 T-05: Secrets in code/logs → env vars + pino redact
4. 🟠 T-03: CSRF on state-changing endpoints → SameSite + tokens
5. 🟠 T-10: XSS in public content → sanitize user input

## OWASP Coverage: 8/10 categories addressed (A07, A10 N/A)
```

---

## 9. Output Template

```markdown
# Threat Model Baseline: <project-name>

**Date:** YYYY-MM-DD
**Scope:** <what's covered>

## Assets
<section 2 table>

## Attack Surfaces
<section 3 table>

## Threats
<section 4 table — prioritized by severity>

## Risk Matrix
<section 5>

## OWASP Top 10
<section 6 checklist>

## Security Requirements
<section 7 tables>

## Summary
- P0 threats: X (must fix before release)
- P1 threats: Y (fix in current iteration)
- P2 threats: Z (backlog)
```

---

## См. также
- `$security-baseline-dev` — implementation patterns (Zod, Helmet, bcrypt)
- `$security-review` — AppSec review checklist
- `$api-contracts` — auth/error conventions
- `$observability-logging` — PII redaction, audit logging
