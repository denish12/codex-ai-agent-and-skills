---
name: qa_test_plan
description: Create a test plan and coverage matrix based on PRD/UX — roles, critical user flows, UI states, negative cases, acceptance criteria.
---

# Skill: QA Test Plan

Test plan with coverage matrix based on PRD/UX flows.

**Sections:**
1. [Workflow](#1-workflow)
2. [Test Plan Structure](#2-structure)
3. [Coverage Matrix](#3-matrix)
4. [Risk-Based Prioritization](#4-priority)
5. [Entry/Exit Criteria](#5-criteria)
6. [Example](#6-example)
7. [Output Template](#7-output)

---

## 1. Workflow

```
1. Read PRD / UX Spec / Architecture Doc
   └── Extract user flows and acceptance criteria

2. Determine scope:
   ├── What we test (in scope)
   └── What we DO NOT test (out of scope + why)

3. Break down into test suites by categories:
   ├── Functional (happy + edge + error paths)
   ├── API contracts
   ├── Security smoke
   ├── UI/a11y smoke
   └── Performance baseline

4. For each flow → test cases (section 3)

5. Prioritization (section 4)

6. Determine entry/exit criteria (section 5)
```

---

## 2. Test Plan Structure

| Section | Content |
|---------|---------|
| **Scope** | What's included, what's excluded (with rationale) |
| **Assumptions** | Prerequisites, test environment conditions |
| **Test suites** | Groups of test cases by feature/area |
| **Coverage matrix** | Flow → test cases mapping |
| **Test data** | Required data setup / seed / fixtures |
| **Environment** | URLs, credentials, infra requirements |
| **Blockers/Risks** | What could prevent testing |
| **Schedule** | When each suite runs (CI / manual / release) |

---

## 3. Coverage Matrix

### Test case format

| Field | Description | Example |
|-------|-------------|---------|
| **TC-ID** | Unique ID | TC-COUPON-01 |
| **Flow** | User flow being tested | Create coupon |
| **Type** | happy / edge / error / security | happy |
| **Preconditions** | Required state | User logged in, app installed |
| **Steps** | Numbered actions | 1. Open settings 2. Fill form 3. Click Save |
| **Expected Result** | What should happen | Coupon saved, toast shown |
| **Priority** | P0 / P1 / P2 | P0 |
| **Automation** | Unit / Integration / E2E / Manual | Integration |

### Coverage matrix example

| Flow | Happy | Edge | Error | Security | Total |
|------|:-----:|:----:|:-----:|:--------:|:-----:|
| Install webhook | TC-01 | TC-02 | TC-03, TC-04 | TC-05 | 5 |
| Settings CRUD | TC-06 | TC-07, TC-08 | TC-09, TC-10 | TC-11 | 6 |
| Coupon create | TC-12 | TC-13, TC-14 | TC-15, TC-16, TC-17 | TC-18 | 7 |
| Widget render | TC-19 | TC-20 | TC-21 | TC-22 | 4 |
| **Total** | 4 | 6 | 7 | 4 | **22** |

---

## 4. Risk-Based Prioritization

| Priority | Criteria | Example |
|----------|---------|---------|
| 🔴 **P0** | Core functionality, data loss, security | Auth flow, payment, CRUD on main entities |
| 🟠 **P1** | Important but recoverable, edge cases | Duplicate handling, pagination, error states |
| 🟡 **P2** | Nice-to-have, cosmetic, rare paths | Tooltip text, animation timing, unusual screen sizes |

### Priority distribution guideline

| Priority | % of total test cases |
|----------|:-----:|
| P0 | 40-50% |
| P1 | 30-40% |
| P2 | 10-20% |

---

## 5. Entry/Exit Criteria

### Entry criteria (start testing when)

| # | Criterion | Status |
|---|----------|--------|
| 1 | Build successful | ☐ |
| 2 | CI lint + unit tests pass | ☐ |
| 3 | Environment accessible (dev/staging) | ☐ |
| 4 | Test data seeded | ☐ |
| 5 | All P0 dev tasks completed | ☐ |

### Exit criteria (release when)

| # | Criterion | Status |
|---|----------|--------|
| 1 | All P0 test cases PASS | ☐ |
| 2 | All P1 test cases PASS (or waiver) | ☐ |
| 3 | No open P0 bugs | ☐ |
| 4 | Security smoke PASS | ☐ |
| 5 | API contract compliance PASS | ☐ |

---

## 6. Example

```markdown
# Test Plan: SaaS Admin Panel — v1

## Scope
- IN: Settings CRUD, Product CRUD, Public content rendering
- OUT: Analytics, multi-language (not in MVP)

## Test Suites
1. API Contract Tests (8 cases) → $qa_api_contract_tests
2. Manual Functional (12 cases) → $qa_manual_run
3. Security Smoke (6 cases) → $qa_security_smoke_tests
4. UI/a11y Smoke (4 cases) → $qa_ui_a11y_smoke

## Coverage: 30 test cases (P0: 12, P1: 13, P2: 5)
## Entry: CI green, staging up, test data seeded
## Exit: All P0 pass, no open P0 bugs
```

---

## 7. Output Template

```markdown
# QA Test Plan: <feature/sprint>

**Date:** YYYY-MM-DD
**PRD:** <reference>
**UX Spec:** <reference>

## Scope
- **In scope:** <list>
- **Out of scope:** <list + rationale>

## Assumptions
- <list>

## Test Suites
| Suite | Cases | Priority mix | Method |
|-------|:-----:|-------------|--------|
| Functional | 15 | 6×P0, 6×P1, 3×P2 | Manual + Unit |
| API Contract | 8 | 4×P0, 4×P1 | Integration |
| Security Smoke | 6 | 4×P0, 2×P1 | Manual + Grep |
| UI/a11y | 4 | 1×P0, 2×P1, 1×P2 | Manual |

## Coverage Matrix
<section 3 table>

## Test Data
- <required fixtures/seed data>

## Environment
- URL: <staging URL>
- Credentials: <how to get>

## Entry/Exit Criteria
<section 5 tables>

## Risks & Blockers
| Risk | Impact | Mitigation |
|------|--------|-----------|
| Wix API down | P0: Install flow blocked | Skip, retest later |
```

---

## See also
- `$qa_manual_run` — execute manual test cases
- `$qa_api_contract_tests` — API contract test execution
- `$qa_security_smoke_tests` — security smoke execution
- `$qa_ui_a11y_smoke` — UI/a11y smoke execution
- `$qa_browser_testing` — browser-based visual testing
