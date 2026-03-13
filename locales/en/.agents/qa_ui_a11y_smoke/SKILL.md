---
name: qa_ui_a11y_smoke
description: UI/a11y smoke — keyboard/focus, labels/aria, basic contrast, states forms and lists, compliance UX Spec.
---

#Skill: QA UI & A11y Smoke

Baseline check UI accessibility and usability.

**Sections:**
1. [Workflow](#1-workflow)
2. [Checklist](#2-checklist)
3. [Keyboard Navigation](#3-keyboard)
4. [Automated Tools](#4-tools)
5. [Output Template](#5-output)

---

## 1. Workflow

```
1. Automatic check
   ├── axe DevTools / Lighthouse a11y audit
   └── Record score and critical issues

2. Keyboard navigation (section 3)
   └── Go through all interactive elements with Tab

3. Visual check
   ├── UI states (loading, empty, error, success)
   ├── Responsive (if in scope)
   └── Match UX Spec

4. ARIA / Forms check (section 2)
   └── Labels, roles, error messages

5. Fill in output template
```

---

## 2. Checklist

### 2.1 Keyboard Navigation

| # | Check | WCAG | Severity | Status |
|---|-------|------|----------|--------|
| A11Y-01 | All interactive elements reachable via Tab | 2.1.1 (A) | 🔴 P0 | ☐ |
| A11Y-02 | Focus order is logical (top→bottom, left→right) | 2.4.3 (A) | 🟠 P1 | ☐ |
| A11Y-03 | Focus visible on all elements | 2.4.7 (AA) | 🔴 P0 | ☐ |
| A11Y-04 | Escape closes modals/dropdowns | — (UX) | 🟠 P1 | ☐ |
| A11Y-05 | Enter activates buttons/links | 2.1.1 (A) | 🔴 P0 | ☐ |
| A11Y-06 | No keyboard traps (can always Tab out) | 2.1.2 (A) | 🔴 P0 | ☐ |

### 2.2 Forms & Labels

| # | Check | WCAG | Severity | Status |
|---|-------|------|----------|--------|
| A11Y-07 | All inputs have visible label or `aria-label` | 1.3.1 (A) | 🔴 P0 | ☐ |
| A11Y-08 | Required fields marked (`aria-required` or visual) | 1.3.1 (A) | 🟠 P1 | ☐ |
| A11Y-09 | Error messages associated with fields (`aria-describedby`) | 1.3.1 (A) | 🟠 P1 | ☐ |
| A11Y-10 | Error messages visible and descriptive | 3.3.1 (A) | 🟠 P1 | ☐ |
| A11Y-11 | Form submission feedback (toast/message) | — (UX) | 🟠 P1 | ☐ |

### 2.3 Content & Structure

| # | Check | WCAG | Severity | Status |
|---|-------|------|----------|--------|
| A11Y-12 | Page has one `<h1>` | 1.3.1 (A) | 🟠 P1 | ☐ |
| A11Y-13 | Heading hierarchy is logical (h1→h2→h3, no skips) | 1.3.1 (A) | 🟡 P2 | ☐ |
| A11Y-14 | Images have `alt` text (or `alt=""` for decorative) | 1.1.1 (A) | 🟠 P1 | ☐ |
| A11Y-15 | Links have descriptive text (no "click here") | 2.4.4 (A) | 🟡 P2 | ☐ |
| A11Y-16 | Language attribute set (`<html lang="...">`) | 3.1.1 (A) | 🟡 P2 | ☐ |

### 2.4 Visual & Contrast

| # | Check | WCAG | Severity | Status |
|---|-------|------|----------|--------|
| A11Y-17 | Text contrast ≥ 4.5:1 (normal) / 3:1 (large) | 1.4.3 (AA) | 🟠 P1 | ☐ |
| A11Y-18 | UI works with `prefers-reduced-motion` | 2.3.3 (AAA) | 🟡 P2 | ☐ |
| A11Y-19 | No content requires color alone to convey meaning | 1.4.1 (A) | 🟠 P1 | ☐ |
| A11Y-20 | Interactive elements have minimum 44×44px touch target | 2.5.5 (AAA) | 🟡 P2 | ☐ |

### 2.5 UI States

| # | Check | Where | Severity | Status |
|---|-------|-------|----------|--------|
| A11Y-21 | Loading state shown (spinner/skeleton) | All async actions | 🟠 P1 | ☐ |
| A11Y-22 | Empty state shown (illustration + message) | Lists, tables | 🟠 P1 | ☐ |
| A11Y-23 | Error state shown (icon + message + retry) | Failed fetches | 🟠 P1 | ☐ |
| A11Y-24 | Success state shown (toast/message) | Create, update, delete | 🟠 P1 | ☐ |
| A11Y-25 | Disabled state clear (visual + `disabled` attribute) | Forms, buttons | 🟡 P2 | ☐ |

---

## 3. Keyboard Navigation Test

### Test procedure

| Step | Action | Expected | Status |
|------|--------|----------|--------|
| 1 | Press Tab from page start | Focus moves to first interactive element | ☐ |
| 2 | Continue Tab through all elements | Each interactive element receives visible focus | ☐ |
| 3 | Press Shift+Tab | Focus moves backward in logical order | ☐ |
| 4 | Press Enter on buttons | Button action fires | ☐ |
| 5 | Press Enter on links | Link navigates | ☐ |
| 6 | Open modal/dialog | Focus trapped inside modal | ☐ |
| 7 | Press Escape on modal | Modal closes, focus returns to trigger | ☐ |
| 8 | Tab through form | All inputs, selects, buttons reachable | ☐ |
| 9 | Submit form with Enter | Form submits | ☐ |
| 10 | Tab out of last element | Focus wraps or exits predictably | ☐ |

### Common keyboard failures

| Failure | Severity | Fix |
|---------|----------|-----|
| Custom button (`<div onClick>`) not focusable | P0 | Use `<button>` or add `tabIndex="0"` + `role="button"` |
| Focus outline removed (`outline: none`) | P0 | Use `:focus-visible` instead |
| Modal doesn't trap focus | P1 | Add focus trap (FocusTrap component) |
| Dropdown opens but items not navigable | P1 | Add keyboard arrows + Enter support |
| Tab order follows DOM, not visual order | P1 | Fix DOM order or use `tabIndex` |

---

## 4. Automated Tools

### axe DevTools (browser extension)

```
1. Open page in Chrome
2. DevTools → axe DevTools tab → Scan
3. Review: Critical / Serious / Moderate issues
4. Export results
```

### Lighthouse a11y

```
1. DevTools → Lighthouse → Check "Accessibility"
2. Run audit
3. Target score: ≥ 90
4. Review flagged issues
```

### Grep patterns for code review

```bash
# Missing alt on images
grep_search: Query="<img" Includes=["*.jsx","*.tsx"]
→ Check: has alt attribute?

# Custom interactive without role
grep_search: Query="onClick" Includes=["*.jsx","*.tsx"]
→ Check: is it on <button>, <a>, or has role="button"?

# Outline removal
grep_search: Query="outline.*none" Includes=["*.css"]
→ P0: needs :focus-visible alternative

# Missing htmlFor on labels
grep_search: Query="<label" Includes=["*.jsx","*.tsx"]
→ Check: has htmlFor or wraps input?
```

---

## 5. Output Template

```markdown
# UI & Accessibility Smoke Report

**Date:** YYYY-MM-DD
**Tester:** Tester Agent
**Page/Component:** <name>
**UX Spec reference:** <link>

## Automated Scan
| Tool | Score | Critical | Serious | Moderate |
|------|:-----:|:--------:|:-------:|:--------:|
| axe DevTools | — | 0 | 2 | 3 |
| Lighthouse A11y | 87 | — | — | — |

## Keyboard Navigation
| Step | Action | Expected | Status |
|------|--------|----------|:------:|
| 1 | Tab through all | Focus visible | ✅ |
| 6 | Open modal | Focus trapped | ❌ |
| 7 | Escape modal | Focus returns | ❌ |

## Checklist Results

| Section | Pass | Fail | Total |
|---------|:----:|:----:|:-----:|
| Keyboard (A11Y-01..06) | 4 | 2 | 6 |
| Forms (A11Y-07..11) | 4 | 1 | 5 |
| Content (A11Y-12..16) | 5 | 0 | 5 |
| Visual (A11Y-17..20) | 3 | 1 | 4 |
| UI States (A11Y-21..25) | 4 | 1 | 5 |
| **Total** | **20** | **5** | **25** |

## Findings

| # | Severity | Check | Element | Finding | Fix |
|---|----------|-------|---------|---------|-----|
| 1 | 🔴 P0 | A11Y-03 | Save button | No focus outline | Add `:focus-visible` style |
| 2 | 🟠 P1 | A11Y-09 | Coupon code input | Error not linked to field | Add `aria-describedby` |
| 3 | 🟠 P1 | A11Y-17 | Timer text | Contrast 2.8:1 (need 4.5:1) | Darken text color |

## UI States Check
| State | Page | Present? | Matches UX Spec? |
|-------|------|:--------:|:----------------:|
| Loading | Settings | ✅ | ✅ |
| Empty | Coupons list | ✅ | ⚠️ No illustration |
| Error | Settings save | ❌ Missing | ❌ |
| Success | Settings save | ✅ (toast) | ✅ |

## Verdict
- ✅ ACCESSIBLE — Lighthouse ≥ 90, no P0
- ⚠️ ISSUES — P0/P1 a11y issues found
- ❌ NON-ACCESSIBLE — critical keyboard/focus failures
```

---

## See also
- `$a11y_baseline` — a11y baseline requirements
- `$ui_a11y_smoke_review` — designer-level a11y review
- `$qa_manual_run` — general manual testing
- `$qa_browser_testing` — browser-based visual testing
- `$styling_css_stack` — CSS a11y patterns (focus-visible, prefers-reduced-motion)
