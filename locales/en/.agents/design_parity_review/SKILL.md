---
name: design_parity_review
description: Compare design artifacts with the UX Spec or with the implemented UI. Issue a Design Parity Report with P0/P1/P2 priorities and specific recommendations.
---

# Skill: Design Parity Review (design verification)

## Goal
Check the compliance of the UX Spec and/or implemented UI with the provided design materials and record any discrepancies.

## When to use
- After preparing the UX Spec (Design ↔ UX Spec)
- After implementing the UI (Design ↔ Implemented UI)
- Before closing the release increment (as part of the DoD if there is a design)

## Inputs
- Design Reference Map and Rules (from `$design_intake`)
- UX Spec (if we check the spec)
- UI implementation (if we check the code):
  - links/routes, how to reproduce states
  - screenshots/videos/Storybook (if available)
  - e2e/visual results (if available)

## Mandatory decision before parity review
Before planning parity verification, the designer must ask this mandatory question:
- `Can Playwright be used?`

Decision logic:
- If `Yes`: use the automated scenario (Playwright screenshot tests + visual diff + agreed threshold + CI artifacts).
- If `No`: use the restricted-infrastructure scenario:
  - manual parity verification via Design Audit Mode/overlay (or approved equivalent),
  - evidence package: reference/actual screenshots + environment params (browser/viewport/DPR/zoom) + checklist,
  - mandatory designer sign-off with `PASS/FAIL`.
- If there is no answer: record `P0 / BLOCKER: Parity verification mode is not approved`.

Execution cadence (mandatory when design files exist):
- run parity after every `DEV-xx` slice (`UX-PARITY-xx`);
- run final parity before `RG`;
- if final parity is not `PASS`, release must be blocked as `P0 / BLOCKER`.

## Check modes
### Mode A: Design ↔ UX Spec (no code yet)
Check each screen:
- composition of sections and their order
- main actions/CTAs
- forms: fields, mandatory, validation, error texts
- states: loading/empty/error/success
- matching components with inventory/guides
Output: list of edits to UX Spec + questions/conflicts.

### Mode B: Design ↔ Implemented UI (UI has already been implemented)
Check for each key screen and status:
- layout/hierarchy (what is located where, what is visible first)
- availability and options for components (buttons, inputs, tables, modals)
- texts/labels/placeholders/error messages (if the design specifies them)
- UI status (loading/empty/error/success)
- basic a11y (keyboard/focus/labels/ARIA) by `$a11y_baseline`

## Classification of discrepancies
- **P0 (Blocker)**: breaks critical flow, is misleading, violates accessibility, leads to errors/data loss, contradicts PRD.
- **P1 (Important)**: breaks consistency, degrades UX, but does not block use.
- **P2 (Nice-to-have)**: cosmetics/polish.

## Output: Design Parity Report (required structure)
### ✅ Matches
- ...

### ⚠️ Discrepancies
#### P0 (Blockers)
- [ ] <what's wrong> - Screen/Component: ... - Expected: ... - Actual: ... - Fix: ...

#### P1 (Important)
- [ ] ...

#### P2 (Nice-to-have)
- [ ] ...

### Recommendations for correction
- DEV-xx: ...
- UX-xx: ...

### Conflicts (if any)
- Conflict: <design vs PRD/architecture> → solution options

## Response format
### Summary
### Deliverables (Design Parity Report)
### Findings (P0/P1/P2)
###Risks/Blockers
### Next Actions (IDs: UX-xx / DEV-xx)
