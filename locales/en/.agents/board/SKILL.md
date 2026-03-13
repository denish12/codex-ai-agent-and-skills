---
name: board
description: Project Board management — creating tasks with ID, statuses ☐/⏳/☑/⚠️, updates after each step, a visible checklist in each conductor message.
---

# Skill: Project Board (conductor's checklist)

Transparent progress control.

**Sections:**
1. [Workflow](#1-workflow)
2. [Task Format](#2-format)
3. [Status Rules](#3-statuses)
4. [Board Template](#4-template)
5. [Progress Summary](#5-summary)
6. [Blocker Escalation](#6-blockers)
7. [Example: Smart Cart Rescue](#7-example)
8. [Output Template](#8-output)

---

## 1. Workflow

```
1. Kickoff → create a Board from the Backlog ($pm_backlog)
   └── 1-3 tasks per role for the current iteration

2. At each pipeline step:
   a. Update statuses tasks
   b. Add new tasks (if they appeared)
   c. Mark blockers
   d. Show the Board at the start of the message

3. When blocked → escalation (section 6)

4. When the iteration is finished → Progress Summary (section 5)
```

---

## 2. Task Format

### ID Convention

| Prefix | Owner | Example |
|--------|-------|---------|
| `PM-xx` | Product Manager | PM-01: Write PRD |
| `UX-xx` | UX/UI Designer | UX-01: Create UX Spec |
| `ARCH-xx` | Architect | ARCH-01: System design |
| `DEV-xx` | Senior Full Stack | DEV-01: Implement settings API |
| `REV-xx` | Reviewer | REV-01: Security review |
| `OPS-xx` | DevOps | OPS-01: Docker setup |
| `TEST-xx` | Tester | TEST-01: Test plan |
| `RG-xx` | Release Gate | RG-01: Release checklist |

### Task line format

```
- [status] (ID) Description — Owner: XX — Deps: YY — Notes: ZZ
```

### Rules

| Rule | Explanation |
|------|------------|
| One task = one checkable result | Artifact, check, or decision |
| Max 3 tasks per role per iteration | Keep focus |
| New scope → new task (never modify existing scope) | Traceability |
| Dependencies explicit | List what blocks and what's blocked |

---

## 3. Status Rules

| Status | Meaning | When to set |
|--------|---------|-------------|
| `☐` | Not started | Task created, not yet in progress |
| `⏳` | In progress | Agent started working on this |
| `☑` | Done | Artifact delivered + accepted by user |
| `⚠️` | Blocked | Cannot proceed — with explicit reason + owner |

### Transition rules

```
☐ → ⏳   Agent starts working
⏳ → ☑   Artifact delivered + user approved
⏳ → ⚠️  Blocker discovered
⚠️ → ⏳  Blocker resolved
☑ → ☐    Requirement changed → new task (don't revert ☑)
```

### Status never goes backward

- `☑ → ⏳` is **forbidden** — if rework needed, create a new task
- `☑ → ☐` is **forbidden** — done is done

---

## 4. Board Template

```markdown
## 📋 Project Board — Iteration N

### PM Gate
- [☑] (PM-01) PRD v1.0 — Owner: PM
- [☑] (PM-02) Backlog decomposition — Owner: PM

### UX Gate
- [⏳] (UX-01) UX Discovery — Owner: UX
- [☐] (UX-02) UX Spec — Owner: UX — Deps: UX-01

### ARCH Gate
- [☐] (ARCH-01) Architecture doc — Owner: ARCH — Deps: UX-02
- [☐] (ARCH-02) API contracts — Owner: ARCH — Deps: ARCH-01

### DEV Gate
- [☐] (DEV-01) Settings API — Owner: DEV — Deps: ARCH-02
- [☐] (DEV-02) Settings UI — Owner: DEV — Deps: DEV-01, UX-02

### REV Gate
- [☐] (REV-01) Code review — Owner: REV — Deps: DEV-01, DEV-02
- [☐] (REV-02) Security review — Owner: REV — Deps: DEV-01

### OPS Gate
- [☐] (OPS-01) Docker setup — Owner: OPS — Deps: DEV-01

### TEST Gate
- [☐] (TEST-01) Test plan — Owner: TEST — Deps: UX-02
- [☐] (TEST-02) Manual test run — Owner: TEST — Deps: DEV-02

### Release Gate
- [☐] (RG-01) Release checklist — Owner: Conductor — Deps: ALL
```

---

## 5. Progress Summary

Add to every board update:

```markdown
## 📊 Progress
| Gate | Total | Done | In Progress | Blocked |
|------|:-----:|:----:|:-----------:|:-------:|
| PM | 2 | 2 | 0 | 0 |
| UX | 2 | 0 | 1 | 0 |
| ARCH | 2 | 0 | 0 | 0 |
| DEV | 2 | 0 | 0 | 0 |
| REV | 2 | 0 | 0 | 0 |
| OPS | 1 | 0 | 0 | 0 |
| TEST | 2 | 0 | 0 | 0 |
| RG | 1 | 0 | 0 | 0 |
| **Total** | **14** | **2** | **1** | **0** |

**Progress: 2/14 (14%) — On Track / At Risk / Blocked**
```

---

## 6. Blocker Escalation

When `⚠️` appears:

```markdown
### ⚠️ Blocker Report
| Task | Blocked by | Owner of resolution | Impact | ETA |
|------|-----------|:-------------------:|--------|-----|
| DEV-01 | ARCH-02 not ready | ARCH | P0: all DEV work blocked | Today |
| TEST-02 | Staging env down | OPS | P1: testing delayed | Tomorrow |
```

### Escalation rules

| Severity | When | Action |
|----------|------|--------|
| 🔴 **Critical** | P0 task blocked, blocks others | Immediately notify user |
| 🟠 **High** | P1 task blocked | Report in next board update |
| 🟡 **Low** | P2 task blocked | Track, resolve when possible |

---

## 7. Example: Smart Cart Rescue

```markdown
## 📋 Project Board — Iteration 1 (MVP Foundation)

### PM Gate
- [☑] (PM-01) PRD: Smart Cart Rescue v1.0 — Owner: PM
- [☑] (PM-02) Backlog: 3 epics, 21 tasks — Owner: PM

### UX Gate
- [☑] (UX-01) UX Discovery completed — Owner: UX
- [⏳] (UX-02) UX Spec: Settings + Coupons screens — Owner: UX

### ARCH Gate
- [☐] (ARCH-01) Architecture Doc — Owner: ARCH — Deps: UX-02
- [☐] (ARCH-02) API Contracts (Settings, Coupons, Widget) — Owner: ARCH

### DEV Gate
- [☐] (DEV-01) Settings API (CRUD + validation) — Owner: DEV — Deps: ARCH-02
- [☐] (DEV-02) Settings Dashboard UI — Owner: DEV — Deps: DEV-01, UX-02

### 📊 Progress: 3/8 (38%) — On Track
```

---

## 8. Output Template

```markdown
## 📋 Project Board — Iteration <N>

<section 4 format — all tasks with statuses>

## 📊 Progress
<section 5 format>

## ⚠️ Blockers
<section 6 format — or "None">

## 🔜 Next Steps
1. <What happens next>
2. <Next agent to activate>
```

---

## See also
- `$pm_backlog` — backlog (source of tasks)
- `$handoff` — gate transitions between agents
- `$gates` — pipeline gate definitions
- `$release_gate` — final release checklist
