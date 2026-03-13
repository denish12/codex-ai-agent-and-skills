---
name: code_review_checklist
description: Universal review checklist — code quality, readability, testability, security, contracts, DoD.
---

# Skill: Code Review Checklist

Systematic PR/code review for compliance with project standards.

**Sections:**
1. [Workflow](#1-workflow)
2. [Checklist](#2-checklist)
3. [Automated Checks](#3-automated)
4. [Severity](#4-severity)
5. [Output Template](#5-output)

---

## 1. Workflow

```
1. Read PR description / task
   └── What should change? Which acceptance criteria?

2. Automatic checks (section 3)
   └── grep patterns, lint, tests, audit

3. Go through by checklist (section 2)
   └── For each item: PASS / FINDING (P0/P1/P2)

4. Form review report (section 5)
   └── Summary + findings + verdict
```

---

## 2. Checklist

### 2.1 Code Quality

| # | Check | Guidance | Status |
|---|-------|---------|--------|
| Q1 | Clear names | Functions = verb+object (`createCoupon`), variables = existing (`activeCount`). No `data`, `temp`, `x` | ☐ |
| Q2 | Small functions | One responsibility, < 40 lines. If > 60 → split | ☐ |
| Q3 | No duplication | DRY without fanaticism. 3+ repetitions = extract into a helper | ☐ |
| Q4 | No magic | No implicit side effects, hidden globals, undocumented hooks with business logic | ☐ |
| Q5 | JSDoc on functions | `@param`, `@returns`, description. Mandatory for public API | ☐ |
| Q6 | No `console.log` | Replace on pino logger. Exception: tests | ☐ |
| Q7 | No `any` / `@ts-ignore` | Each usage = intentional exception with a comment | ☐ |

### 2.2 Architecture

| # | Check | Guidance | Status |
|---|-------|---------|--------|
| A1 | Matches Architecture Doc / ADR | New module → check what it in diagram | ☐ |
| A2 | No tight coupling | Module A not imports internals module B. Only public API | ☐ |
| A3 | No God Object | File < 500 lines, class < 10 public methods | ☐ |
| A4 | Layer boundaries | Router → Controller → Service → Repository. No DB calls in router | ☐ |
| A5 | New decisions → ADR | If introduced a new pattern, library, or strategy → ADR required | ☐ |

### 2.3 API & Data

| # | Check | Guidance | Status |
|---|-------|---------|--------|
| D1 | API contracts | Request/Response match `$api_contracts` spec. New endpoints documented | ☐ |
| D2 | Validation on boundary | Zod schema in middleware, to business logic | ☐ |
| D3 | Error format | Unified `{ error: { code, message, details } }`. No stack/DB errors in response | ☐ |
| D4 | Status codes | 201 for create, 204 for delete, 409 for duplicate. Not everything 200 | ☐ |
| D5 | Data model consistent | Schema changes + migration present. Indexes added for new queries | ☐ |

### 2.4 Tests

| # | Check | Guidance | Status |
|---|-------|---------|--------|
| T1 | Tests added/updated | New code = new tests. Changed code = updated tests | ☐ |
| T2 | Happy path covered | Main scenario works | ☐ |
| T3 | Edge cases | Empty input, max values, boundary conditions | ☐ |
| T4 | Error paths | Invalid input → 400, not found → 404, auth → 401 | ☐ |
| T5 | No flaky tests | No `setTimeout`, no order dependency, stable tests | ☐ |
| T6 | AAA pattern | Arrange → Act → Assert. One assert per concept | ☐ |
| T7 | No test magic | No hardcoded IDs, no shared mutable state between tests | ☐ |

### 2.5 Security

| # | Check | Guidance | Status |
|---|-------|---------|--------|
| S1 | AuthZ on server | `req.appInstanceId` verified before data access. No IDOR | ☐ |
| S2 | No secrets in code | No hardcoded passwords, API keys, tokens | ☐ |
| S3 | Safe error messages | No stack trace, no DB error, no PII in response | ☐ |
| S4 | Input sanitization | No `eval()`, no `dangerouslySetInnerHTML` without sanitize | ☐ |
| S5 | Dependency audit | No known high/critical vulnerabilities | ☐ |

### 2.6 Observability & Ops

| # | Check | Guidance | Status |
|---|-------|---------|--------|
| O1 | Structured logging | pino with level, message, context fields | ☐ |
| O2 | requestId correlation | All logs in request chainclude requestId | ☐ |
| O3 | No PII in logs | No email, password, token, creditCard logged | ☐ |
| O4 | Health endpoints | `/health/live` and `/health/ready` working | ☐ |
| O5 | Build/run instructions | README or comments explain how to run changed code | ☐ |

---

## 3. Automated Checks

### Grep patterns (run during review)

```bash
# Security
grep_search: Query="console.log"              → P1: replace with pino
grep_search: Query="eval("                    → P0: code injection risk
grep_search: Query="dangerouslySetInnerHTML"   → P0: XSS risk
grep_search: Query="password.*=.*\""          → P0: hardcoded secret
grep_search: Query="@ts-ignore"               → P1: type safety bypass
grep_search: Query="any"  Includes=["*.ts"]   → P1: weak typing
grep_search: Query="eslint-disable"           → P1: rule bypass
grep_search: Query="TODO|FIXME|HACK|XXX"      → P2: track tech debt

# Architecture
grep_search: Query="mongoose" Includes=["*/routes/*","*/controllers/*"]  → P1: DB in wrong layer
grep_search: Query="req.body" Includes=["*/services/*"]                  → P1: HTTP in service layer

# Tests
find_by_name: Pattern="*.test.*" → count test files vs source files
find_by_name: Pattern="*.spec.*" → same
```

---

## 4. Severity

| Level | Description | Action |
|-------|-----------|--------|
| 🔴 **P0** | Security vulnerability, data loss, broken core flow | Block merge. Fix immediately |
| 🟠 **P1** | Tech debt, missing validation, no tests, architecture violation | Request fix before merge |
| 🟡 **P2** | Style, naming, minor optimization, nice-to-have | Optional. Note for future |

---

## 5. Output Template

```markdown
# Code Review Report

**PR/Task:** <title>
**Reviewer:** Reviewer Agent
**Date:** YYYY-MM-DD
**Files reviewed:** <count>

## Summary
<1-2 sentences: what this PR does, overall quality assessment>

## Automated Checks
| Check | Result |
|-------|--------|
| Lint (biome) | ✅ Pass |
| Tests (vitest) | ✅ Pass (42/42) |
| npm audit | ⚠️ 1 moderate |
| Secret scan | ✅ Clean |

## Findings

| # | Severity | Category | File | Finding | Recommendation |
|---|----------|----------|------|---------|----------------|
| 1 | 🔴 P0 | Security | `api/routes/settings.js:32` | No authZ check — any user can update any settings | Add appInstanceId ownership check |
| 2 | 🟠 P1 | Tests | `api/services/coupon.test.js` | No error path test for duplicate coupon | Add test: POST with duplicate code → 409 |
| 3 | 🟡 P2 | Quality | `dashboard/components/Timer.jsx:15` | Magic number `60` | Extract to constant `SECONDS_PER_MINUTE` |

## Checklist Summary

| Section | Pass | Findings | Total |
|---------|:----:|:--------:|:-----:|
| Code Quality | 6 | 1 | 7 |
| Architecture | 5 | 0 | 5 |
| API & Data | 4 | 1 | 5 |
| Tests | 5 | 2 | 7 |
| Security | 4 | 1 | 5 |
| Observability | 5 | 0 | 5 |
| **Total** | **29** | **5** | **34** |

## Verdict
- ✅ **APPROVED** — no P0/P1, minor P2 notes
- ⚠️ **CHANGES REQUESTED** — P0/P1 must be fixed before merge
- ❌ **REJECTED** — fundamental issues, needs redesign

## DoD Verification
- [x] CI green (lint + tests + audit)
- [x] Acceptance criteria met
- [ ] P0/P1 findings resolved ← blocking
- [x] Documentation updated
```

---

## See also
- `$security_review` — deep security review (when S1-S5 need more depth)
- `$tests_quality_review` — deep test quality review
- `$api_contract_compliance_review` — API contract verification
- `$review_reference_snippets` — DO/DON'T code examples
