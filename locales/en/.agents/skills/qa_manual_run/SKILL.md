---
name: qa_manual_run
description: Manual execution of critical scenarios and regression — happy/edge/error paths based on UX Spec; documenting bugs with steps and evidence.
---

# Skill: QA Manual Run

Manual execution of test cases with documented results.

**Sections:**
1. [Workflow](#1-workflow)
2. [Test Case Template](#2-test-case)
3. [Bug Report Template](#3-bug-report)
4. [Evidence Requirements](#4-evidence)
5. [Output Template](#5-output)

---

## 1. Workflow

```
1. Preparation
   ├── Read Test Plan (from $qa_test_plan)
   ├── Check entry criteria (CI green, env up, data seeded)
   └── Prepare test data / fixtures

2. Execution
   ├── Go through each test case by priority (P0 → P1 → P2)
   ├── For each: perform steps, check expected result
   ├── Record: PASS / FAIL / BLOCKED / SKIPPED
   └── For FAIL → create bug report (section 3)

3. Regression
   └── Re-verify previously closed bugs (check fix didn't break)

4. Report
   └── Fill output template (section 5)
```

---

## 2. Test Case Template

### Format for one test case

```markdown
### TC-SETTINGS-01: Update popup title

**Priority:** P0
**Type:** Happy path
**Preconditions:**
- User logged in to dashboard
- App installed on test site

**Steps:**
1. Open Settings → General tab
2. Change title to "New Sale!"
3. Click "Save"
4. Open Live Preview

**Expected Result:**
- Toast "Settings saved" appears
- Live Preview shows "New Sale!" as popup title
- API returns 200 with updated settings

**Actual Result:** _<fill during run>_
**Status:** PASS / FAIL / BLOCKED / SKIPPED
**Evidence:** _<screenshot or link>_
**Notes:** _<any observations>_
```

### What to test per category

| Category | What to verify | Examples |
|----------|---------------|---------|
| **Happy path** | Core flow works as expected | Create coupon → saved, widget renders |
| **Edge cases** | Boundary values, empty states | Empty list, max length input, 0 discount |
| **Error paths** | Invalid input, server errors | Missing required fields → error message |
| **UI states** | Loading, empty, error, success | Spinner while saving, empty coupon list |
| **Roles/permissions** | Access control in UI + API | Uninstalled app → correct handling |
| **Regression** | Previously fixed bugs still fixed | Check bugs from previous iterations |

---

## 3. Bug Report Template

```markdown
## BUG-XXX: <Short descriptive title>

**Severity:** 🔴 P0 / 🟠 P1 / 🟡 P2
**Found in:** TC-<id> / Exploratory
**Environment:** local / staging / production
**Date:** YYYY-MM-DD

### Steps to Reproduce
1. Open dashboard → Settings
2. Change title to empty string
3. Click Save
4. Error: _blank title saved without validation_

### Expected Behavior
- Validation error shown: "Title is required"
- Save button disabled when title is empty

### Actual Behavior
- Empty title saved successfully
- Widget shows blank title area

### Evidence
- Screenshot: <link or embedded>
- Console errors: <if any>
- Network: <relevant request/response>

### Notes
- Regression from: BUG-003 (fixed in v0.9)
- Related test case: TC-SETTINGS-03
```

---

## 4. Evidence Requirements

| Test Result | Required Evidence |
|------------|-------------------|
| **PASS** | Not required (optional screenshot) |
| **FAIL** | **Required:** screenshot + steps + expected vs actual |
| **BLOCKED** | Reason + what's needed to unblock |
| **SKIPPED** | Rationale for skip |

### For browser testing (Antigravity)

Use `$qa_browser_testing` workflow:
1. `browser_subagent` → navigate to page
2. Capture screenshot for evidence
3. Verify visual elements match UX Spec
4. Save evidence to artifacts

---

## 5. Output Template

```markdown
# Manual Test Run Report

**Sprint/Feature:** <name>
**Tester:** Tester Agent
**Date:** YYYY-MM-DD
**Environment:** <staging URL>
**Test Plan:** <reference>

## Summary

| Status | Count | % |
|--------|:-----:|:---:|
| ✅ PASS | 18 | 75% |
| ❌ FAIL | 3 | 12.5% |
| 🚫 BLOCKED | 2 | 8.3% |
| ⏭️ SKIPPED | 1 | 4.2% |
| **Total** | **24** | **100%** |

## Results by Priority

| Priority | Total | Pass | Fail | Blocked |
|----------|:-----:|:----:|:----:|:-------:|
| P0 | 10 | 9 | 1 | 0 |
| P1 | 10 | 7 | 2 | 1 |
| P2 | 4 | 2 | 0 | 2 |

## Detailed Results

| TC-ID | Flow | Priority | Status | Notes |
|-------|------|:--------:|:------:|-------|
| TC-01 | Install webhook | P0 | ✅ | — |
| TC-06 | Update settings | P0 | ❌ | BUG-012: empty title saved |
| TC-12 | Create coupon | P0 | ✅ | — |
| TC-20 | Widget empty state | P1 | 🚫 | Widget endpoint down |

## New Bugs Found

| Bug ID | Severity | Title | TC | Status |
|--------|----------|-------|----|--------|
| BUG-012 | 🔴 P0 | Empty title saved without validation | TC-06 | Open |
| BUG-013 | 🟠 P1 | Timer shows NaN for 0 seconds | TC-14 | Open |
| BUG-014 | 🟠 P1 | Coupon code not trimmed | TC-13 | Open |

## Regression Check
| Previous Bug | Fixed in | Still fixed? |
|-------------|---------|:------------:|
| BUG-003 | v0.9 | ✅ |
| BUG-007 | v0.9.2 | ❌ Regressed! → BUG-012 |

## Exit Criteria Status
- [x] All P0 test cases executed
- [ ] All P0 test cases PASS ← 1 failure (BUG-012)
- [x] No open P0 bugs from previous ← except regression

## Verdict
- ✅ **RELEASE** — all P0 pass, no open P0 bugs
- ⚠️ **CONDITIONAL** — P0 bugs must be fixed first
- ❌ **BLOCKED** — critical failures, not ready
```

---

## See also
- `$qa_test_plan` — create test plan before running
- `$qa_browser_testing` — browser-based visual testing with Antigravity
- `$qa_api_contract_tests` — API-level testing
- `$qa_security_smoke_tests` — security smoke tests
