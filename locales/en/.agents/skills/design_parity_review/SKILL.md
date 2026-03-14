---
name: design_parity_review
description: Compare design artifacts with UX Spec or implemented UI. Issue a discrepancy report (Design Parity Report) with P0/P1/P2 priorities and specific recommendations.
---

# Skill: Design Parity Review

Reconciliation of design with UX Spec and/or implemented UI.

**Sections:**
1. [Workflow](#1-workflow)
2. [Review Modes](#2-review-modes)
3. [Comparison Table](#3-comparison-table)
4. [Severity Guide](#4-severity-guide)
5. [Example: Settings Screen](#5-example-settings-screen)
6. [Output Template](#6-output-template)

---

## 1. Workflow

```
1. Input:
   ├── Design Reference Map + Design Rules (from $design_intake)
   ├── UX Spec (from $ux_spec) — for Mode A
   └── Implemented UI (screenshots/browser) — for Mode B

2. For each screen in Design Reference Map:
   a. Open design source (file/frame)
   b. Open comparison target (UX Spec or implemented UI)
   c. Fill comparison table (section 3)
   d. Classify each discrepancy (section 4)

3. Summarize: pass / discrepancies by severity

4. Generate recommendations (DEV-xx / UX-xx tasks)
```

---

## 2. Review Modes

### Mode A: Design ↔ UX Spec (before development)

**Purpose:** Ensure UX Spec accurately reflects design intent before dev starts.

| Check | What to compare | Look for |
|-------|----------------|---------|
| Layout | Design layout → UX Spec layout description | Missing/wrong columns, ordering |
| Sections | Design sections → UX Spec "Sections & Components" | Missing sections, wrong hierarchy |
| Actions | Design CTAs → UX Spec "Primary Actions" | Missing actions, wrong labels |
| Forms | Design fields → UX Spec "Forms & Validation" | Missing fields, wrong types |
| States | Design state screens → UX Spec "States" | Missing states (loading/empty/error) |
| Content | Design labels/copy → UX Spec content | Wrong text, missing copy |
| Components | Design components → UI Inventory | Unmapped components |

### Mode B: Design ↔ Implemented UI (after development)

**Purpose:** Ensure implementation matches design.

| Check | What to compare | How to verify |
|-------|----------------|--------------|
| Visual layout | Design → screenshot | Side-by-side comparison |
| Colors | Design palette → CSS variables | Inspect computed styles |
| Typography | Design fonts → computed styles | Inspect font-family, size, weight |
| Spacing | Design padding/margins → computed | Inspect box model |
| Components | Design variants → rendered components | Visual + props check |
| States | Design states → trigger each state | Navigate through states |
| Responsiveness | Design breakpoints → resize browser | Test at each breakpoint |
| Icons | Design icon set → rendered icons | Visual comparison |

---

## 3. Comparison Table

### Per-screen comparison template

```markdown
### Screen: <Name>

| # | Aspect | Design (Expected) | Actual (Spec/UI) | Match? | Severity | Notes |
|---|--------|-------------------|------------------|:------:|:--------:|-------|
| 1 | Layout | 2-column: 60/40 | 2-column: 60/40 | ✅ | — | — |
| 2 | Header | Title + breadcrumbs | Title only | ❌ | P2 | Breadcrumbs not in design |
| 3 | Save button | Blue primary, bottom-right | Blue primary, bottom-right | ✅ | — | — |
| 4 | Error state | Inline red text under field | Toast only | ❌ | P1 | Missing inline errors |
| 5 | Loading | Skeleton | Spinner | ❌ | P1 | Should be skeleton |
| 6 | Tab active | Underline | Background fill | ❌ | P1 | Wrong tab style |
| 7 | Color picker | 4-token picker | 4-token picker | ✅ | — | — |
```

### Design Rules verification

```markdown
| Rule | Expected | Actual | Status |
|------|----------|--------|:------:|
| DR-01: Primary CTA is blue #116DFF | Blue filled button | ✅ Blue filled | ✅ |
| DR-03: Timer digits monospace | Monospace font | Serif font | ❌ P1 |
| DR-05: 2-column layout 60/40 | 60/40 split | 50/50 split | ❌ P1 |
```

---

## 4. Severity Guide

| Severity | Criteria | Examples |
|----------|---------|---------|
| 🔴 **P0 (Blocker)** | Breaks critical flow, misleads user, data loss risk, contradicts PRD | Wrong form field type, missing required validation, CTA leads to wrong action |
| 🟠 **P1 (Important)** | Breaks consistency, degrades UX, noticeable deviation | Wrong loading pattern (spinner vs skeleton), missing error state, wrong colors |
| 🟡 **P2 (Nice-to-have)** | Cosmetic, polish, minor spacing/alignment | 2px alignment off, slightly wrong border-radius, extra whitespace |

### Decision tree

```
Discrepancy found:
├── Does it break a user flow? → P0
├── Does it break consistency or UX quality? → P1
├── Is it visual polish only? → P2
└── Is it subjective / taste? → Not a finding (skip)
```

---

## 5. Example: Settings Screen

```markdown
### Screen: Settings — Design Tab

**Design source:** UX Spec + Glassmorphism Spec
**Compared with:** Implemented UI (screenshot)

| # | Aspect | Design | Implemented | Match? | Sev |
|---|--------|--------|------------|:------:|:---:|
| 1 | Layout | 2-column: config + preview | ✅ 2-column | ✅ | — |
| 2 | Color pickers | 4 tokens (bg, text, accent, overlay) | 3 pickers (missing overlay) | ❌ | P0 |
| 3 | Font select | Dropdown with preview | Plain dropdown | ❌ | P1 |
| 4 | Live preview | Updates on change | Updates on save only | ❌ | P1 |
| 5 | Tab underline | 2px underline accent color | Background highlight | ❌ | P2 |
| 6 | Save button | Bottom of panel, primary | ✅ Bottom, primary | ✅ | — |

### Design Rules Check
| Rule | Status |
|------|:------:|
| DR-01: 4-color token system | ❌ Missing overlay picker |
| DR-02: Timer monospace | ✅ |
| DR-05: 60/40 layout | ✅ |

### Findings: 1× P0, 2× P1, 1× P2
```

---

## 6. Output Template

```markdown
# Design Parity Report

**Mode:** A (Design ↔ UX Spec) / B (Design ↔ Implemented UI)
**Date:** YYYY-MM-DD
**Reviewer:** UX/UI Designer Agent
**Design source:** <reference>
**Compared with:** <UX Spec / Implemented UI>

## Summary
| Status | Screens | Findings |
|--------|:-------:|:--------:|
| ✅ Match | X | — |
| ❌ Discrepancies | Y | Z total |

## Per-Screen Comparison
<section 3 tables × N screens>

## Design Rules Verification
<section 3 rules table>

## Findings Summary

| # | Severity | Screen | Aspect | Expected | Actual | Fix |
|---|----------|--------|--------|----------|--------|-----|
| 1 | 🔴 P0 | Design tab | Color pickers | 4 tokens | 3 tokens | Add overlay picker |
| 2 | 🟠 P1 | Design tab | Font select | Preview dropdown | Plain dropdown | Add font preview |
| 3 | 🟠 P1 | Design tab | Live preview | Update on change | Update on save | Wire onChange handlers |
| 4 | 🟡 P2 | Design tab | Tab style | Underline | Background | CSS change |

## ✅ What Matches
- Layout structure (2-column, 60/40)
- Save button placement and style
- Timer digit formatting
- Color picker component for 3/4 tokens

## Recommendations
| ID | Type | Action | Priority |
|----|------|--------|:--------:|
| DEV-01 | Code | Add overlay color picker to Design tab | P0 |
| DEV-02 | Code | Wire live preview onChange | P1 |
| UX-01 | Spec | Update UX Spec with font preview requirement | P1 |
| DEV-03 | CSS | Change tab active style to underline | P2 |

## Conflicts
| # | Design says | PRD/Architecture says | Recommendation |
|---|-----------|----------------------|----------------|
| — | _(none)_ | — | — |

## Verdict
- ✅ **PARITY** — all screens match design
- ⚠️ **DEVIATIONS** — P0/P1 findings to fix
- ❌ **SIGNIFICANT MISMATCH** — redesign or major rework needed
```

---

## See also
- `$design_intake` — design sources inventory (input)
- `$ux_spec` — UX Spec (comparison target)
- `$ui_inventory` — component inventory
- `$qa_browser_testing` — capture screenshots for comparison
