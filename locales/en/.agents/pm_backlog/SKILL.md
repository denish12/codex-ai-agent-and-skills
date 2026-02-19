---
name: pm_backlog
description: Decomposition of PRD into the primary backlog: epics, features and tasks with priorities, dependencies and iteration proposal (MVP → v1).
---

# Skill: Backlog (epics/features/tasks)

## Goal
Turn PRD into planned work: what to do and in what order.

## Exit
Backlog format:

### Epics (E-xx)
- E-01: ...
  - Feature (F-xx): ...
    - Task (T-xx): ... (short, verifiable)

For each Feature:
- Priority (P0/P1/P2)
- Dependencies (for example: UX Spec, architecture, integrations)
- Risk/ambiguity (if any)

## Decomposition rules
- Make “vertical” features (end-to-end), and not layer by layer.
- MVP first: P0 is only something without which the product does not work.
- If there is uncertainty, create a Spike task (time-box) as a separate item.

## Suggesting iterations
- Iteration 1 (MVP slice 1): ...
- Iteration 2 (MVP slice 2): ...
- Iteration 3 (hardening / v1): ...