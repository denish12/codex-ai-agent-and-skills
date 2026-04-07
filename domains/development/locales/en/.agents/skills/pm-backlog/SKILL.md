---
name: pm-backlog
description: Decomposition of PRD into an initial backlog — epics, features, and tasks with priorities, dependencies, and iteration proposals (MVP → v1).
---

# Skill: Backlog (epics/features/tasks)

Turning PRD into planned work.

**Sections:**
1. [Workflow](#1-workflow)
2. [Hierarchy](#2-hierarchy)
3. [Task Card Template](#3-task-card)
4. [Decomposition Rules](#4-rules)
5. [Iteration Planning](#5-iterations)
6. [Example](#6-example)
7. [Output Template](#7-output)

---

## 1. Workflow

```
1. Input: PRD (from $pm-prd) — user stories + AC
2. Group stories into Epics (business domain areas)
3. Break each story into Features (deliverable chunks)
4. Break each feature into Tasks (implementable units)
5. Assign priorities (P0/P1/P2)
6. Map dependencies
7. Propose iterations (section 5)
8. Submit for review → $board
```

---

## 2. Hierarchy

```
Epic (E-xx) — business domain area
├── Feature (F-xx) — deliverable user-facing chunk
│   ├── Task (T-xx) — implementable unit (1-4h of work)
│   ├── Task (T-xx)
│   └── Task (T-xx)
├── Feature (F-xx)
│   └── ...
└── Spike (SP-xx) — research / time-boxed exploration
```

### Level definitions

| Level | What | Size | Example |
|-------|------|------|---------|
| **Epic** | Business domain area | 1-3 weeks | E-01: Settings Management |
| **Feature** | User-facing deliverable | 2-5 days | F-01: Settings CRUD API |
| **Task** | Implementable unit | 1-4 hours | T-01: Create settings schema |
| **Spike** | Research / exploration | Time-boxed (2-8h) | SP-01: Evaluate external API integration |

---

## 3. Task Card Template

```markdown
### T-XX: <Title>

**Feature:** F-XX
**Owner:** DEV / UX / ARCH / TEST
**Priority:** P0 / P1 / P2
**Estimate:** XS (1h) / S (2h) / M (4h) / L (8h) / XL (16h)

**Description:**
<What needs to be done, concretely>

**Acceptance Criteria:**
- [ ] <Measurable, checkable criterion>
- [ ] <Measurable, checkable criterion>

**Dependencies:**
- Requires: T-XX (schema), F-XX (API)
- Blocks: T-XX (UI integration)

**DoD (Definition of Done):**
- [ ] Code complete
- [ ] Unit tests pass
- [ ] Code review passed
- [ ] No P0 bugs
```

### Estimation guide

| Size | Hours | Complexity | Example |
|------|:-----:|-----------|---------|
| **XS** | ~1h | Trivial change | Add field to schema |
| **S** | ~2h | Simple, well-understood | CRUD endpoint |
| **M** | ~4h | Moderate, some decisions | Form with validation |
| **L** | ~8h | Complex, multiple parts | Full settings page |
| **XL** | ~16h | Large, risky → split if possible | Template system |

---

## 4. Decomposition Rules

| Rule | Explanation |
|------|------------|
| **Vertical slices** | End-to-end features (API + UI + tests), not layer-by-layer |
| **MVP first** | P0 = product doesn't work without it |
| **One task = one result** | Each task produces a checkable artifact |
| **Max 4h per task** | If larger → split into subtasks |
| **Spike for unknowns** | Uncertainty → create time-boxed Spike task |
| **Dependencies explicit** | State what's required before and what this blocks |
| **Cross-cutting last** | Polish, a11y, perf → P1/P2 after core works |

### Priority rules

| Priority | Criteria | % of MVP |
|----------|---------|:--------:|
| 🔴 **P0** | Core functionality, must ship | 60-70% |
| 🟠 **P1** | Important UX, error handling, polish | 20-30% |
| 🟡 **P2** | Nice-to-have, future iteration | 5-10% |

---

## 5. Iteration Planning

### Iteration format

```markdown
### Iteration N: <Name> (<duration>)

**Goal:** <One-sentence goal>
**Scope:** <Features/tasks included>
**Entry criteria:** <What must be ready>
**Exit criteria:** <What must be done>

| Task | Priority | Estimate | Owner | Status |
|------|:--------:|:--------:|:-----:|:------:|
| T-01 | P0 | S | DEV | ☐ |
| T-02 | P0 | M | DEV | ☐ |
```

### Typical MVP breakdown

| Iteration | Focus | Content |
|-----------|-------|---------|
| **Iter 1** | Foundation | Schema, API, basic CRUD, install flow |
| **Iter 2** | Core UI | Dashboard, settings, config panel |
| **Iter 3** | Integration | Widget, live preview, templates |
| **Iter 4** | Hardening | Error handling, edge cases, testing |

---

## 6. Example

```markdown
## E-01: Settings Management
### F-01: Settings CRUD API (P0)
- T-01: Create Settings schema — S — DEV
- T-02: POST /settings endpoint (create) — S — DEV
- T-03: PUT /settings/:id endpoint (update) — S — DEV
- T-04: GET /settings/:id endpoint (read) — XS — DEV
- T-05: Settings validation (Zod schema) — S — DEV

### F-02: Settings Dashboard UI (P0)
- T-06: Settings page layout (2-column: config + preview) — M — DEV
- T-07: General tab (title, subtitle, CTA fields) — M — DEV
- T-08: Appearance tab (color pickers, font select) — L — DEV
- T-09: Notifications tab (enable switch, config inputs) — S — DEV
- T-10: Save flow (button → API → toast) — S — DEV

## E-02: Product Management
### F-03: Product CRUD API (P0)
- T-11: Product schema — S — DEV
- T-12: POST /products endpoint — S — DEV
- T-13: GET /products (list) endpoint — S — DEV
- T-14: DELETE /products/:id endpoint — XS — DEV

### F-04: Product Dashboard UI (P0)
- T-15: Products list (table + empty state) — M — DEV
- T-16: Create product form (modal) — M — DEV
- T-17: Delete product (confirm → delete → toast) — S — DEV

## E-03: Public Content
### F-05: Content Rendering (P0)
- T-18: Public content endpoint (GET /content/:id) — S — DEV
- T-19: Content template renderer — L — DEV
- T-20: Token replacement engine (title, subtitle, colors) — M — DEV

### SP-01: Evaluate External API Integration (P0, time-box: 4h)
- Research: How to handle external webhook events
- Output: ADR with chosen approach
```

---

## 7. Output Template

```markdown
# Product Backlog: <Project Name>

**PRD:** <reference>
**Date:** YYYY-MM-DD
**Author:** Product Manager Agent

## Summary
| Metric | Count |
|--------|:-----:|
| Epics | X |
| Features | Y |
| Tasks | Z |
| Spikes | W |
| P0 tasks | A |
| P1 tasks | B |
| P2 tasks | C |

## Backlog

### E-01: <Epic Name>
#### F-01: <Feature Name> (P0)
| Task | Priority | Estimate | Owner | Deps | Status |
|------|:--------:|:--------:|:-----:|------|:------:|
| T-01: ... | P0 | S | DEV | — | ☐ |
| T-02: ... | P0 | M | DEV | T-01 | ☐ |

#### F-02: <Feature Name> (P0)
...

### E-02: <Epic Name>
...

## Iterations
<section 5 format>

## Dependencies Graph
<list critical path dependencies>

## Spikes
| ID | Question | Time box | Output | Status |
|----|---------|:--------:|--------|:------:|
| SP-01 | ... | 4h | ADR | ☐ |

## Next Step
→ Transfer to $board for tracking
```

---

## See also
- `$pm-prd` — PRD (input)
- `$board` — project board (tracks execution)
- `$handoff` — gate transitions
