---
name: code-review-checklist
description: Универсальный чек-лист ревью — качество кода, читаемость, тестируемость, безопасность, контракты, DoD.
---

# Skill: Code Review Checklist

Систематическое ревью PR/кода на соответствие стандартам проекта.

**Разделы:**
1. [Workflow](#1-workflow)
2. [Checklist](#2-checklist)
3. [Automated Checks](#3-automated)
4. [Severity](#4-severity)
5. [Output Template](#5-output)

---

## 1. Workflow

```
1. Прочитай PR description / задачу
   └── Что должно измениться? Какие acceptance criteria?

2. Автоматические проверки (section 3)
   └── grep patterns, lint, tests, audit

3. Пройди по checklist (section 2)
   └── Для каждого пункта: PASS / FINDING (P0/P1/P2)

4. Сформируй review report (section 5)
   └── Summary + findings + verdict
```

---

## 2. Checklist

### 2.1 Code Quality

| # | Check | Guidance | Status |
|---|-------|---------|--------|
| Q1 | Ясные имена | Функции = глагол+объект (`createCoupon`), переменные = существительное (`activeCount`). Нет `data`, `temp`, `x` | ☐ |
| Q2 | Маленькие функции | Одна ответственность, < 40 строк. Если > 60 → split | ☐ |
| Q3 | Нет дублирования | DRY без фанатизма. 3+ повторения = extract to helper | ☐ |
| Q4 | Нет магии | Никаких implicit side effects, hidden globals, undocumented hooks с бизнес-логикой | ☐ |
| Q5 | JSDoc на функциях | `@param`, `@returns`, описание. Обязательно для public API | ☐ |
| Q6 | Нет `console.log` | Заменить на pino logger. Исключение: тесты | ☐ |
| Q7 | Нет `any` / `@ts-ignore` | Каждое использование = осознанное исключение с комментарием | ☐ |

### 2.2 Architecture

| # | Check | Guidance | Status |
|---|-------|---------|--------|
| A1 | Соответствует Architecture Doc / ADR | Новый модуль → проверь что он в диаграмме | ☐ |
| A2 | Нет tight coupling | Модуль A не импортирует internals модуля B. Только public API | ☐ |
| A3 | Нет God Object | Файл < 500 строк, класс < 10 public methods | ☐ |
| A4 | Layer boundaries | Router → Controller → Service → Repository. Нет DB calls в router | ☐ |
| A5 | Новые решения → ADR | Если ввёл новый паттерн, библиотеку, стратегию → ADR required | ☐ |

### 2.3 API & Data

| # | Check | Guidance | Status |
|---|-------|---------|--------|
| D1 | API контракты | Request/Response match `$api-contracts` spec. Новые endpoints documented | ☐ |
| D2 | Validation на границе | Zod schema в middleware, до бизнес-логики | ☐ |
| D3 | Error format | Единый `{ error: { code, message, details } }`. Нет stack/DB errors in response | ☐ |
| D4 | Status codes | 201 для create, 204 для delete, 409 для duplicate. Не всё 200 | ☐ |
| D5 | Data model consistent | Schema changes + migration present. Indexes added for new queries | ☐ |

### 2.4 Tests

| # | Check | Guidance | Status |
|---|-------|---------|--------|
| T1 | Tests added/updated | Новый код = новые тесты. Changed code = updated tests | ☐ |
| T2 | Happy path covered | Основной сценарий работает | ☐ |
| T3 | Edge cases | Empty input, max values, boundary conditions | ☐ |
| T4 | Error paths | Invalid input → 400, not found → 404, auth → 401 | ☐ |
| T5 | No flaky tests | Нет `setTimeout`, нет order dependency, стабильные тесты | ☐ |
| T6 | AAA pattern | Arrange → Act → Assert. Один assert per concept | ☐ |
| T7 | No test magic | Нет hardcoded IDs, no shared mutable state between tests | ☐ |

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
| O2 | requestId correlation | All logs in request chain include requestId | ☐ |
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

## См. также
- `$security-review` — deep security review (when S1-S5 need more depth)
- `$tests-quality-review` — deep test quality review
- `$api-contract-compliance-review` — API contract verification
- `$review-reference-snippets` — DO/DON'T code examples
