---
name: design_parity_review
description: Compare design artifacts with the UX Spec or with the implemented UI. Produce a Design Parity Report with P0/P1/P2 priorities and specific recommendations.
---

# Skill: Design Parity Review (design verification)

## Goal
Check whether the UX Spec and/or implemented UI match the provided design materials and record the discrepancies.

## When to use
- After preparing the UX Spec (Design ↔ UX Spec)
- After implementing the UI (Design ↔ Implemented UI)
- Before closing a release increment when design exists

## Inputs
- Design Reference Map and Rules (from `$design_intake`)
- UX Spec
- UI implementation, screenshots, Storybook, or visual results when available

## Check modes
### Mode A: Design ↔ UX Spec
Check screen composition, CTAs, forms, validation, states, and component consistency.
Output: changes for UX Spec plus open questions/conflicts.

### Mode B: Design ↔ Implemented UI
Check layout, hierarchy, component variants, copy, UI states, and baseline a11y according to `$a11y_baseline`.

## Discrepancy classification
- **P0 (Blocker)**: breaks a critical flow, misleads the user, violates accessibility, causes data loss, or contradicts PRD.
- **P1 (Important)**: hurts consistency or UX, but does not fully block usage.
- **P2 (Nice-to-have)**: polish/cosmetic gap.

## Output: Design Parity Report
### Matches
- ...

### Discrepancies
#### P0 (Blockers)
- [ ] <issue> — Screen/Component: ... — Expected: ... — Actual: ... — Fix: ...

#### P1 (Important)
- [ ] ...

#### P2 (Nice-to-have)
- [ ] ...

### Recommendations
- DEV-xx: ...
- UX-xx: ...

### Conflicts
- Conflict: <design vs PRD/architecture> -> solution options

## Response format
### Summary
### Deliverables (Design Parity Report)
### Findings (P0/P1/P2)
### Risks/Blockers
### Next Actions (IDs: UX-xx / DEV-xx)
