---
name: gates
description: Process gates control and Definition of Done — do not skip stages, verify the presence of artifacts and verification criteria, organize return loops (Dev↔Reviewer↔Tester).
---

# Skill: Gates & DoD (conductor's quality control)

Prevent "pseudo-readiness": every stage → artifact + verification.

**Sections:**
1. [Gate Flow](#1-gate-flow)
2. [Per-Gate Entry/Exit Criteria](#2-per-gate-entryexit-criteria)
3. [Approval Matrix](#3-approval-matrix)
4. [Return Loop](#4-return-loop)
5. [Universal DoD](#5-universal-dod)
6. [Bypass Rules](#6-bypass-rules)

---

## 1. Gate Flow

```
PM ──→ UX ──→ ARCH ──→ DEV ──→ REV ──→ OPS ──→ TEST ──→ RG
 │      │       │       │       │       │        │       │
PRD   UX Spec  Arch   Code    Review  Build   Test    Release
      +a11y    +ADR   +Tests  Report  +Deploy  Report  Decision
              +API
```

### Rule: No gate can start until the previous gate's exit criteria are met.

---

## 2. Per-Gate Entry/Exit Criteria

| Gate | Entry Criteria | Deliverable(s) | Exit Criteria | Approver |
|------|---------------|----------------|---------------|----------|
| **PM** | User brief / idea | PRD + Backlog | PRD approved by user, AC verifiable | User |
| **UX** | Approved PRD | UX Spec + UI Inventory + A11y Baseline | All PRD flows covered, states defined, handoff complete | User |
| **ARCH** | Approved UX Spec | Architecture Doc + ADR + API Contracts + Data Model | System design reviewed, API contracts finalized | User |
| **DEV** | Approved Architecture | Code + Unit/Integration Tests + Runbook | Tests pass, no P0 bugs in self-review, code committed | Self + CI |
| **REV** | DEV deliverables complete | Review Report (P0/P1/P2) | 0 P0 findings, P1 tracked | Reviewer Agent |
| **OPS** | Code reviewed + approved | Docker build + Deploy + Health check | Build success, services healthy, containers restarted | DevOps Agent |
| **TEST** | Deployed + healthy | Test Plan + Test Report + Bug List | All P0 tests pass, 0 open P0 bugs | Tester Agent |
| **RG** | All gates complete | Release Gate Checklist + Release Report | GO decision from user | User |

---

## 3. Approval Matrix

| Gate | Who Creates | Who Reviews | Who Approves (sign-off) |
|------|-----------|-----------|----------------------|
| PM | PM Agent | Conductor | **User** |
| UX | UX Agent | Conductor | **User** |
| ARCH | Architect Agent | Conductor | **User** |
| DEV | Dev Agent | Conductor | **Conductor** (self-check) |
| REV | Reviewer Agent | Conductor | **Reviewer Agent** (verdict) |
| OPS | DevOps Agent | Conductor | **DevOps Agent** (health proof) |
| TEST | Tester Agent | Conductor | **Tester Agent** (test report) |
| RG | Conductor | — | **User** |

---

## 4. Return Loop

### When Reviewer/Tester finds issues

```
Reviewer finds P0 → REV gate = ⚠️
  └── Conductor creates DEV-xx Fix task
      └── DEV fixes → self-tests
          └── REV re-reviews
              └── If P0=0 → REV gate = ☑

Tester finds P0 → TEST gate = ⚠️
  └── Conductor creates DEV-xx Fix task
      └── DEV fixes → REV re-reviews (if needed)
          └── OPS restarts containers
              └── TEST re-tests
                  └── If P0=0 → TEST gate = ☑
```

### Loop limits

| Loop | Max iterations | If exceeded |
|------|:-------------:|------------|
| DEV ↔ REV | 3 | Escalate to user: architecture issue? |
| DEV ↔ TEST | 3 | Escalate to user: scope issue? |
| REV ↔ TEST | 2 | Re-review approach with Architect |

---

## 5. Universal DoD

Check before marking any gate `☑`:

| # | Check | Status |
|---|-------|--------|
| DoD-01 | Deliverable artifact exists (not empty, not placeholder) | ☐ |
| DoD-02 | Deliverable follows skill template/format | ☐ |
| DoD-03 | No P0 issues open for this gate | ☐ |
| DoD-04 | Entry criteria of next gate are now satisfiable | ☐ |
| DoD-05 | Board updated (task status = ☑) | ☐ |
| DoD-06 | HANDOFF envelope created ($handoff) | ☐ |

### Gate-specific DoD additions

| Gate | Additional DoD |
|------|---------------|
| DEV | Tests pass (unit + integration), no secrets in code/logs |
| REV | 0 P0, P1 tracked with tasks |
| OPS | Containers built + healthy, services responding |
| TEST | All P0 test cases PASS, 0 open P0 bugs |
| RG | Release checklist complete, GO decision |

---

## 6. Bypass Rules

| Situation | Can bypass? | Rule |
|-----------|:-----------:|------|
| Bugfix / hotfix (< 5 files) | Partial | Skip PM + UX, do DEV → REV → OPS → TEST → RG |
| Config-only change (.env, Docker) | Partial | Skip PM + UX + ARCH, do OPS → TEST → RG |
| Documentation-only | Yes | No gates needed |
| User explicitly says "skip gate X" | Yes | Log decision as ASSUMPTION, proceed |
| Agent says "this gate is unnecessary" | **No** | Only user can authorize gate skip |

---

## See also
- `$handoff` — context pack for gate transitions
- `$board` — project board tracking
- `$release_gate` — final release decision
- `$release_gate_checklist_template` — RG checklist
