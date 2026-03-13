---
name: ui_a11y_smoke_review
description: Быстрый UI/a11y smoke review дизайнера — состояния loading/empty/error, фокус, клавиатура, aria/labels, соответствие UX Spec. Выполняется ДО передачи в QA.
---

# Skill: UI & A11y Smoke Review (Designer-Level)

Быстрая designer-level проверка UI на соответствие UX Spec + a11y baseline **до передачи в QA**.

> **Отличие от `$qa_ui_a11y_smoke`:** Этот скилл — дизайнерский quick check (5-10 мин, по UX Spec).
> `$qa_ui_a11y_smoke` — формальный QA тест (25 WCAG checks, tools, report).

**Разделы:**
1. [Workflow](#1-workflow)
2. [Checklist](#2-checklist)
3. [UX Spec Compliance](#3-ux-compliance)
4. [Quick A11y Scan](#4-a11y-scan)
5. [Output Template](#5-output)

---

## 1. Workflow

```
1. Input:
   ├── Implemented UI (browser / screenshots)
   ├── UX Spec (из $ux_spec) — source of truth
   └── A11y Baseline (из $a11y_baseline) — requirements

2. Visual walkthrough per screen:
   a. Does layout match UX Spec?
   b. Are all components/sections present?
   c. Are all 4 states implemented (loading/empty/error/success)?
   d. Quick keyboard pass (Tab through interactive elements)

3. Classify issues:
   ├── P0: Missing critical states, broken flow, inaccessible
   ├── P1: Wrong component, missing state, inconsistency
   └── P2: Polish, spacing, cosmetic

4. Report → DEV fixes before formal QA

Note: This is a QUICK check. For formal testing → $qa_ui_a11y_smoke
```

---

## 2. Checklist

### 2.1 Visual & Layout

| # | Check | UX Spec ref | Severity | Status |
|---|-------|------------|----------|--------|
| UI-01 | Layout matches UX Spec (columns, sections, order) | Screen Spec → Layout | 🟠 P1 | ☐ |
| UI-02 | All sections present (no missing panels/cards) | Screen Spec → Sections | 🟠 P1 | ☐ |
| UI-03 | Primary CTA visible and correctly styled | Screen Spec → Actions | 🔴 P0 | ☐ |
| UI-04 | Typography hierarchy matches (h1 > h2 > body) | UI Inventory → Tokens | 🟡 P2 | ☐ |
| UI-05 | Colors match design tokens | Design Rules → DR-xx | 🟠 P1 | ☐ |

### 2.2 UI States

| # | Check | Against | Severity | Status |
|---|-------|---------|----------|--------|
| UI-06 | **Loading** state present (skeleton or spinner per UX Spec) | Screen Spec → States | 🟠 P1 | ☐ |
| UI-07 | **Empty** state present (illustration + text + CTA) | Screen Spec → States | 🟠 P1 | ☐ |
| UI-08 | **Error** state present (message + retry/action) | Screen Spec → States | 🔴 P0 | ☐ |
| UI-09 | **Success** feedback (toast/message after action) | Screen Spec → Notifications | 🟠 P1 | ☐ |
| UI-10 | **Disabled** state clear (visual + non-clickable) | Screen Spec → States | 🟡 P2 | ☐ |
| UI-11 | **Saving/In-flight** state (button spinner, disabled) | Screen Spec → Actions | 🟠 P1 | ☐ |

### 2.3 Forms

| # | Check | Against | Severity | Status |
|---|-------|---------|----------|--------|
| UI-12 | All form fields have visible labels | A11y Baseline A-10 | 🔴 P0 | ☐ |
| UI-13 | Required fields marked (asterisk or text) | A11y Baseline A-11 | 🟠 P1 | ☐ |
| UI-14 | Error messages visible and descriptive | Screen Spec → Validation | 🟠 P1 | ☐ |
| UI-15 | Submit button feedback (loading/disabled during save) | Screen Spec → Actions | 🟠 P1 | ☐ |

### 2.4 Quick A11y

| # | Check | Against | Severity | Status |
|---|-------|---------|----------|--------|
| UI-16 | Can Tab to all interactive elements | A11y Baseline A-01 | 🔴 P0 | ☐ |
| UI-17 | Focus ring visible on focused elements | A11y Baseline A-05 | 🔴 P0 | ☐ |
| UI-18 | Modal traps focus + Escape closes | A11y Baseline A-07 | 🟠 P1 | ☐ |
| UI-19 | No obvious contrast issues (text readable) | A11y Baseline A-19 | 🟠 P1 | ☐ |
| UI-20 | Content/buttons not cut off or overlapping | — | 🟠 P1 | ☐ |

---

## 3. UX Spec Compliance

### Per-screen verification

For each screen in UX Spec, verify implementation matches:

```markdown
### Screen: <Name>

| UX Spec Element | Expected | Implemented? | Notes |
|----------------|----------|:------------:|-------|
| Layout: 2-column 60/40 | Config + Preview | ✅ | — |
| Tab: General | Title, Subtitle, CTA fields | ✅ | — |
| Tab: Design | ColorPicker × 4, FontSelect | ⚠️ | Missing overlay picker |
| Tab: Timer | Switch + NumberInputs | ✅ | — |
| State: Loading | Skeleton | ❌ | Shows blank page |
| State: Error (save) | Toast + inline errors | ⚠️ | Toast only, no inline |
| Notification: Save success | Toast, 3s auto-dismiss | ✅ | — |
```

---

## 4. Quick A11y Scan

### 60-second keyboard test

| Step | Action | Expected | Status |
|------|--------|----------|:------:|
| 1 | Press Tab from page top | Focus on first interactive element | ☐ |
| 2 | Tab through all controls | Each gets visible focus ring | ☐ |
| 3 | Enter on buttons | Action fires | ☐ |
| 4 | Open modal/dropdown | Focus moves inside | ☐ |
| 5 | Escape on modal | Modal closes, focus returns | ☐ |

### Quick visual checks

| Check | How | Expected |
|-------|-----|---------|
| Contrast | Squint test — can you read all text? | All text readable |
| Hierarchy | Scan page — is structure clear? | Clear h1 > h2 > body |
| CTA | Is the primary action obvious? | One clear primary button |
| Errors | Trigger an error — is it clear? | Visible, descriptive, near the field |

---

## 5. Output Template

```markdown
# UI & A11y Smoke Review

**Date:** YYYY-MM-DD
**Reviewer:** UX/UI Designer Agent
**Screen(s):** <list>
**UX Spec:** <reference>

## Checklist Results
| Section | Pass | Fail | Total |
|---------|:----:|:----:|:-----:|
| Visual & Layout (UI-01..05) | 4 | 1 | 5 |
| UI States (UI-06..11) | 4 | 2 | 6 |
| Forms (UI-12..15) | 3 | 1 | 4 |
| Quick A11y (UI-16..20) | 4 | 1 | 5 |
| **Total** | **15** | **5** | **20** |

## UX Spec Compliance
| Screen | Elements checked | Match | Mismatch |
|--------|:---------------:|:-----:|:--------:|
| Settings | 7 | 5 | 2 |
| Coupons | 5 | 5 | 0 |

## Findings
| # | Severity | Check | Screen | Finding | Fix |
|---|----------|-------|--------|---------|-----|
| 1 | 🔴 P0 | UI-08 | Settings | No error state for failed save | Add error toast + inline errors |
| 2 | 🟠 P1 | UI-06 | Settings | Blank page instead of skeleton | Add skeleton loader |
| 3 | 🟠 P1 | UI-05 | Design tab | Missing overlay color picker | Add 4th ColorPicker |
| 4 | 🟡 P2 | UI-04 | Settings | Section titles not bold enough | Increase font-weight |

## Keyboard Test
| Step | Status |
|------|:------:|
| Tab navigation | ✅ |
| Focus visible | ✅ |
| Enter activates | ✅ |
| Modal focus trap | ⚠️ Focus escapes |
| Escape closes | ✅ |

## Verdict
- ✅ **READY FOR QA** — no P0, minor issues tracked
- ⚠️ **FIX FIRST** — P0/P1 issues must be fixed before QA
- ❌ **NOT READY** — critical UX/a11y issues block QA

## Next
- If READY → pass to $qa_ui_a11y_smoke for formal testing
- If FIX FIRST → create DEV-xx tasks, re-review after fix
```

---

## См. также
- `$qa_ui_a11y_smoke` — formal QA a11y testing (25 WCAG checks)
- `$ux_spec` — UX Spec (source of truth)
- `$a11y_baseline` — a11y requirements
- `$design_parity_review` — full design comparison
