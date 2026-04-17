---
name: board
description: Pipeline board management — gate statuses, transitions, blockers, escalation
---
# Board — Product Pipeline Task Board Management

## When to Use
- When **initializing** the pipeline — Conductor creates the board as the first action.
- At **every transition** between gates — together with `$handoff`.
- At **session handoff** — the board captures current progress and is passed via `$handoff`.
- On a **blocker** — escalation to the user via the escalation protocol.
- On a **status request** — user asks "where are we now?".

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Pipeline mode | ✅ | Full A (`/ship-right-thing`, 6 sessions) / Full B (`/shape-prioritize`, 6 sessions) / Quick (`/quick-pm`, 1 session) / Spec (`/spec`, 1 session) |
| Task name | ✅ | Short name of the product initiative |
| Task ID | ⬚ | External ID (Linear, Jira, Notion), if available |
| Owner | ⬚ | PM owner |
| Session number | ⬚ | Current session (1-6 for Full A/B) |
| Adversarial camp | ⬚ | For Full A: `alpha` (Customer-Champion) / `beta` (Business-Champion). For Full B: `alpha` (Build-Camp) / `beta` (Cut-Camp) |

> If mode is not determined — Conductor determines it via the Decision Tree (see `product-pipeline-rules.md`) before creating the board.

## Gate Identifiers

Each gate receives a unique ID under the scheme `[ROLE]-[NN][α|β]?`:

| Prefix | Role | Example |
|--------|------|---------|
| `COND` | Conductor | COND-01 |
| `DISC` | Discovery | DISC-01 |
| `STRAT` | Product Strategist | STRAT-01α (Customer), STRAT-02β (Business) |
| `PM` | Product Manager | PM-01α (Build), PM-02β (Cut), PM-SPEC (final PRD) |
| `UX` | UX Designer | UX-01 |
| `TECH` | Tech Lead | TECH-01α, TECH-02β |
| `DATA` | Data Analyst | DATA-01 |
| `MED` | Mediator | MED-01 |
| `DS` | Designer (visual) | DS-01 |
| `LY` | Layouter | LY-01 |
| `RG` | Release Gate | RG-01 |

> Suffix `α` / `β` marks adversarial camps:
> - Full A: `α` = Customer-Champion, `β` = Business-Champion
> - Full B: `α` = Build-Camp, `β` = Cut-Camp

## Statuses and State Machine

### Allowed Statuses

| Icon | Status | Meaning |
|------|--------|---------|
| `[ ]` | Waiting | Gate has not started yet |
| `[→]` | In Progress | Agent is actively working on this gate |
| `[✓]` | Done | Gate passed, deliverable recorded, user sign-off received |
| `[!]` | Blocker | Work stopped, escalation required |
| `[↩]` | Returned | Gate sent back for rework (after review or user feedback) |
| `[⊘]` | Skipped | Gate skipped by user decision (only via skip protocol) |

### Allowed Transitions

```
[ ] Waiting  ──→ [→] In Progress   (agent started work)
[ ] Waiting  ──→ [⊘] Skipped      (user skip — only via protocol)
[→] In Progress ──→ [✓] Done       (deliverable ready + user "Approved")
[→] In Progress ──→ [!] Blocker    (blocker discovered)
[→] In Progress ──→ [↩] Returned   (user requested rework)
[!] Blocker ────→ [→] In Progress   (blocker resolved)
[↩] Returned ───→ [→] In Progress   (rework started)
[✓] Done ──→ [↩] Returned          (late feedback, revision)
```

> **Forbidden transitions:**
> - `[ ] Waiting` → `[✓] Done` (cannot skip a gate without work)
> - `[!] Blocker` → `[✓] Done` (blocker must be resolved first)
> - `[⊘] Skipped` → any status (skip is irreversible)
> - Any backward transition across multiple gates (return — only to current or previous)

## Protocol

### Step 0 — Determine Mode and Session
1. Get the request type from the user: `/ship-right-thing`, `/shape-prioritize`, `/quick-pm`, or `/spec`.
2. For Full A/B — determine the current session (1-6).
3. If continuing a previous session — load the board from the `$handoff` file (`docs/product/session-N-handoff.md`).
4. For Full A determine current camp (alpha/beta) if S2 or S3.
5. For Full B determine current camp (alpha/beta) if S2 or S3.

### Step 1 — Initialize Board
1. Gather input data (mode, name, ID, session, camp).
2. Determine the set of gates by mode and session (see templates below).
3. Create the board with all gates in `[ ] Waiting` status.
4. Move the first gate (Conductor) to `[→] In Progress`.
5. Add a "Session" column for tracking cross-session progress.
6. For Full A/B — a "Camp" column (α/β/—).
7. Record start time.
8. Show the board to the user.

### Step 2 — Update on Transition
At each `$handoff`:
1. Current gate → `[✓] Done`, fill in deliverable and date.
2. Next gate → `[→] In Progress`.
3. Calculate progress metrics (see "Metrics" section).
4. Add entry to event log.
5. Show updated board to user.

### Step 3 — Handle Blocker
1. Current gate → `[!] Blocker`.
2. Determine blocker severity (see "Escalation Protocol" section).
3. Fill in blocker description in event log.
4. Execute escalation protocol.
5. After resolution: gate → `[→] In Progress`, add log entry with resolution.

### Step 4 — Handle Return
1. The gate being returned to → `[↩] Returned`.
2. All subsequent gates → `[ ] Waiting` (reset).
3. Record reason for return in event log.
4. After rework: gate → `[→] In Progress`.

### Step 5 — Skip Protocol (gate skip)
Used when the user requests a gate skip.

1. **Request confirmation:**
   ```
   ⚠️ Gate skip request [ID] [Name]

   **Impact:** [Which subsequent gates will be affected by missing this gate's deliverable]
   **Risk:** [What can go wrong without this gate]

   Confirm skip? (Yes / No)
   ```
2. Only on explicit "Yes" from the user → gate moves to `[⊘] Skipped`.
3. Add to event log: skip reason + user confirmation.
4. Next gate → `[→] In Progress`.

> **Cannot skip:** COND-01 (initialization), DISC-01 (discovery — foundation), MED-01 (adversarial synthesis in Full A/B), PM-SPEC (final PRD), RG-01 (release gate).

### Step 6 — Add Protocol (adding a gate)
Used when work reveals that an additional gate is needed.

1. Conductor determines: which gate, after which existing one, justification.
2. **Request confirmation:**
   ```
   ➕ Adding gate

   **New gate:** [ID] [Name]
   **Position:** after [ID of existing gate]
   **Justification:** [Why it is needed]
   **Timeline impact:** +[time estimate]

   Confirm addition? (Yes / No)
   ```
3. On "Yes" — insert gate into board with `[ ] Waiting` status, update numbering.
4. Record in event log.

### Step 7 — Session End (cross-session handoff)
1. Record current state of the board.
2. Assemble the handoff package:

   | Component | Description |
   |-----------|-------------|
   | Board (full) | All gates with statuses, deliverables, dates |
   | Event log | Full history of transitions, blockers, decisions |
   | Metrics | Progress, time per gate, blockers |
   | Context | Key decisions, open questions, dependencies |
   | Artifacts | Links to all created deliverables (PRD, JTBD canvas, wireframes) |
   | Camp context (Full A/B) | Which camp is being played, what it recorded |

3. Save the package via `$handoff` to file `docs/product/session-N-handoff.md`.
4. Generate prompt for next session via `$session-prompt-generator`.

### Step 8 — Close Board
1. Ensure all gates are `[✓] Done` or `[⊘] Skipped`.
2. Calculate final metrics.
3. Add final entry to log.
4. Show final board + full log + metrics.

## Progress Metrics

At each board update, calculate:

| Metric | Formula | Example |
|--------|---------|---------|
| Progress (%) | `completed / total × 100` | 7/17 = 41% |
| Current session | `N of M` | 3 of 6 |
| Time on current gate | `now - gate_start_time` | 18 min |
| Average time per gate | `Σ gate_times / completed_count` | 12 min |
| Blockers (total) | `count of [!] over all time` | 1 |
| Returns (total) | `count of [↩] over all time` | 0 |
| ETA | `remaining_gates × avg_time` | ~120 min |

Display in a progress bar below the board header:
```
📊 Progress: 41% (7/17) | Session: 3/6 | Avg time/gate: 12 min | ETA: ~120 min | Blockers: 1 | Returns: 0
```

## Escalation Protocol

### Blocker Severity

| Severity | Description | Example | Action |
|:--------:|-------------|---------|--------|
| 🔴 Critical | Pipeline cannot continue, no workaround | Missing key data (ARR, segment), compliance block, legal review required | Immediate escalation, pipeline stop |
| 🟡 Major | Gate is blocked, but can work in parallel | Beta-camp cannot get evidence for one position, but others are ready | Escalation + offer to continue with caveat |
| 🟢 Minor | Deliverable quality is reduced, but gate is passable | Evidence thinner than desired, but sufficient for directional recommendation | Warning in log, ⚠️ tag in deliverable |

### Escalation Template

```
### ⚠️ Blocker — [Gate ID] [Gate]

**Task:** [Task name]
**Session:** [N of M]
**Gate:** [ID] [Gate name]
**Severity:** [🔴 Critical / 🟡 Major / 🟢 Minor]
**Blocker description:** [What exactly is blocked and why]
**Impact:** [Which subsequent gates are affected]
**Resolution options:**
1. [Option A] — [pros / cons]
2. [Option B] — [pros / cons]

→ Awaiting decision from user.
```

## Integration with Other Skills

| Skill | Interaction |
|-------|------------|
| `$handoff` | At each handoff — update board (step 2). At cross-session handoff — save full package to file (step 7) |
| `$gates` | Board reflects gates defined in `$gates`. Adding gates (step 6) — coordinate with `$gates` |
| `$session-prompt-generator` | Board state + metrics + log — input data for generating next session prompt |
| `$problem-statement` / `$jtbd-canvas` | Artifacts from Discovery referenced in board log |

## Validation (Quality Gate)

The board is considered correct if:

- [ ] Gate set matches chosen pipeline mode and session
- [ ] Exactly one gate in `[→] In Progress` status (or zero, if all done / blocker exists)
- [ ] No skipped gates (`[✓]` / `[⊘]` go consecutively from the beginning)
- [ ] All `[✓]` gates have a filled deliverable and date
- [ ] All `[⊘]` gates have a skip reason and user confirmation in the log
- [ ] Event log contains an entry for each transition
- [ ] No forbidden transitions
- [ ] "Session" column filled for all gates
- [ ] For Full A/B — "Camp" column filled (α/β/—)
- [ ] Gate IDs match the naming scheme
- [ ] Progress metrics calculated and displayed
- [ ] Blockers have severity and resolution recorded in the log

## Handoff
The result of `$board` is input data for: `$handoff`, `$gates`, `$session-prompt-generator`.

Transfer format at cross-session handoff: board + log + metrics + context + artifacts (see step 7).

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|-------------------|
| Skip board update | Loss of tracking, unclear where we are | Update at each `$handoff` |
| Multiple gates `[→]` simultaneously | Parallel work without control | Only one `[→]` at any moment (except S5 Full A/B where UX + TECH + DATA run in parallel) |
| `[✓]` without deliverable | Unclear what was done | Always fill the "Deliverable" column |
| Blocker without escalation | User unaware of the problem | Always use escalation protocol with severity |
| Board not shown to user | User out of context | Show board at each update |
| Manual editing of past statuses | History distortion | Only `[↩] Returned`, no overwriting |
| Board lost between sessions | Next session starts from scratch | Save full package via `$handoff` (step 7) |
| Missing gate IDs | Cannot reference a specific gate | Always use IDs: COND-01, DISC-01, STRAT-01α etc. |
| Skip gate without protocol | Pipeline integrity violation | Only via skip protocol (step 5) with confirmation |
| Blockers without severity | All blockers look the same, no prioritization | Always determine 🔴/🟡/🟢 severity |
| Camp contamination (Full A/B) | Alpha sees Beta artifacts before Mediator | Separation by camp column + physical separation of handoff files |

## Example — TeamFlow, session 3 `/ship-right-thing` (Business-Champion active, Alpha done)

**Context:** TeamFlow (B2B SaaS, HR-tech, 200 customers, $8M ARR). Question: "Should we build AI-powered 1:1 note summarization?". Full Pipeline A launched.

```
### Task Board — Full Pipeline A (/ship-right-thing)
**Task:** AI-powered 1:1 note summarization for TeamFlow
**ID:** JIRA-PM-2847
**Current session:** 3 of 6
**PM owner:** Alex K.

📊 Progress: 41% (7/17) | Session: 3/6 | Avg time/gate: 14 min | ETA: ~140 min | Blockers: 1 | Returns: 0

| # | ID | Gate | Session | Camp | Status | Deliverable | Date |
|---|-----|------|:-------:|:----:|:------:|-------------|------|
| 1 | COND-01 | Conductor | 1 | — | [✓] | Decision Tree → Full A: stakes high, strategy open | 10:00 |
| 2 | DISC-01 | Discovery | 1 | — | [✓] | JTBD canvas, 8 interviews, assumption map | 10:45 |
| 3 | COND-02 | Conductor (session 2) | 2 | — | [✓] | Camp Alpha assigned, brief delivered | 11:00 |
| 4 | STRAT-01α | Customer-Champion | 2 | α | [✓] | Strategy brief Alpha: NSM = "weekly 1:1s with AI summaries used" | 11:30 |
| 5 | COND-03 | Conductor (session 3) | 3 | — | [✓] | Camp Beta assigned, same brief (independence enforced) | 11:45 |
| 6 | STRAT-02β | Business-Champion | 3 | β | [→] | — | 11:50 |
| 7 | COND-04 | Conductor (session 4) | 4 | — | [ ] | — | — |
| 8 | MED-01 | Mediator | 4 | — | [ ] | — | — |
| 9 | COND-05 | Conductor (session 5) | 5 | — | [ ] | — | — |
| 10 | PM-SPEC | PM (PRD) | 5 | — | [ ] | — | — |
| 11 | UX-01 | UX Designer | 5 | — | [ ] | — | — |
| 12 | TECH-01 | Tech Lead | 5 | — | [ ] | — | — |
| 13 | DATA-01 | Data Analyst | 5 | — | [ ] | — | — |
| 14 | COND-06 | Conductor (session 6) | 6 | — | [ ] | — | — |
| 15 | DS-01 | Designer | 6 | — | [ ] | — | — |
| 16 | LY-01 | Layouter | 6 | — | [ ] | — | — |
| 17 | RG-01 | Release Gate | 6 | — | [ ] | — | — |

#### Event Log
| Time | Session | Gate | Event | Details |
|------|:-------:|------|-------|---------|
| 10:00 | 1 | COND-01 | [ ] → [→] | Pipeline initialized, `/ship-right-thing` |
| 10:05 | 1 | COND-01 | [→] → [!] | 🟡 Major: segment not defined (SMB/mid/enterprise) |
| 10:10 | 1 | COND-01 | [!] → [→] | Resolved: focus mid-market + enterprise |
| 10:15 | 1 | COND-01 | [→] → [✓] | Decision Tree → Full A, 6 sessions |
| 10:15 | 1 | DISC-01 | [ ] → [→] | Discovery started: JTBD, interviews, assumptions |
| 10:45 | 1 | DISC-01 | [→] → [✓] | JTBD canvas ready: buyer (VP HR) + end-user (manager). 8 interviews completed |
| 11:00 | 2 | COND-02 | [ ] → [→] → [✓] | Camp Alpha (Customer) assigned, brief delivered |
| 11:05 | 2 | STRAT-01α | [ ] → [→] | Customer-Champion strategy started |
| 11:30 | 2 | STRAT-01α | [→] → [✓] | Strategy Alpha: vision = "empower managers to have transformative 1:1s". NSM = weekly 1:1s using AI summaries |
| 11:40 | 3 | COND-03 | [ ] → [→] → [✓] | Camp Beta (Business) assigned. Independence check: Alpha artifacts isolated |
| 11:50 | 3 | STRAT-02β | [ ] → [→] | Business-Champion strategy started (parallel to Alpha but independent) |
```

## Output Templates

### Full Pipeline A (`/ship-right-thing`, 6 sessions, Customer-vs-Business)

```
### Task Board — Full Pipeline A (/ship-right-thing)
**Task:** [Name]
**ID:** [ID or —]
**Current session:** [N of 6]
**PM owner:** [PM]

📊 Progress: X% (N/17) | Session: N/6 | Avg time/gate: X min | ETA: ~X min | Blockers: N | Returns: N

| # | ID | Gate | Session | Camp | Status | Deliverable | Date |
|---|-----|------|---------|:----:|--------|-------------|------|
| 1 | COND-01 | Conductor | 1 | — | [→] In Progress | — | [date] |
| 2 | DISC-01 | Discovery | 1 | — | [ ] Waiting | — | — |
| 3 | COND-02 | Conductor (session 2) | 2 | — | [ ] Waiting | — | — |
| 4 | STRAT-01α | Customer-Champion | 2 | α | [ ] Waiting | — | — |
| 5 | COND-03 | Conductor (session 3) | 3 | — | [ ] Waiting | — | — |
| 6 | STRAT-02β | Business-Champion | 3 | β | [ ] Waiting | — | — |
| 7 | COND-04 | Conductor (session 4) | 4 | — | [ ] Waiting | — | — |
| 8 | MED-01 | Mediator | 4 | — | [ ] Waiting | — | — |
| 9 | COND-05 | Conductor (session 5) | 5 | — | [ ] Waiting | — | — |
| 10 | PM-SPEC | PM (PRD) | 5 | — | [ ] Waiting | — | — |
| 11 | UX-01 | UX Designer | 5 | — | [ ] Waiting | — | — |
| 12 | TECH-01 | Tech Lead | 5 | — | [ ] Waiting | — | — |
| 13 | DATA-01 | Data Analyst | 5 | — | [ ] Waiting | — | — |
| 14 | COND-06 | Conductor (session 6) | 6 | — | [ ] Waiting | — | — |
| 15 | DS-01 | Designer | 6 | — | [ ] Waiting | — | — |
| 16 | LY-01 | Layouter | 6 | — | [ ] Waiting | — | — |
| 17 | RG-01 | Release Gate | 6 | — | [ ] Waiting | — | — |

#### Event Log
| Time | Session | Gate | Event | Details |
|------|---------|------|-------|---------|
| [timestamp] | 1 | COND-01 | [ ] → [→] | Pipeline initialized |
```

### Full Pipeline B (`/shape-prioritize`, 6 sessions, Build-vs-Cut)

```
### Task Board — Full Pipeline B (/shape-prioritize)
**Task:** [Name]
**Current session:** [N of 6]

| # | ID | Gate | Session | Camp | Status | Deliverable |
| 1 | COND-01 | Conductor | 1 | — | [→] | — |
| 2 | DISC-01 | Discovery (scope intake) | 1 | — | [ ] | — |
| 3 | COND-02 | Conductor (session 2) | 2 | — | [ ] | — |
| 4 | PM-01α | PM Build-Camp | 2 | α | [ ] | — |
| 5 | TECH-01α | Tech Lead Build-Camp | 2 | α | [ ] | — |
| 6 | COND-03 | Conductor (session 3) | 3 | — | [ ] | — |
| 7 | PM-02β | PM Cut-Camp | 3 | β | [ ] | — |
| 8 | TECH-02β | Tech Lead Cut-Camp | 3 | β | [ ] | — |
| 9 | COND-04 | Conductor (session 4) | 4 | — | [ ] | — |
| 10 | MED-01 | Mediator | 4 | — | [ ] | — |
| 11 | COND-05 | Conductor (session 5) | 5 | — | [ ] | — |
| 12 | PM-SPEC | PM (final PRD) | 5 | — | [ ] | — |
| 13 | UX-01 | UX Designer | 5 | — | [ ] | — |
| 14 | DATA-01 | Data Analyst | 5 | — | [ ] | — |
| 15 | COND-06 | Conductor (session 6) | 6 | — | [ ] | — |
| 16 | DS-01 | Designer | 6 | — | [ ] | — |
| 17 | LY-01 | Layouter | 6 | — | [ ] | — |
| 18 | RG-01 | Release Gate | 6 | — | [ ] | — |
```

### Quick Pipeline (`/quick-pm`, 1 session)

```
### Task Board — Quick Pipeline (/quick-pm)
**Task:** [Name]
**Session:** 1 (single)

📊 Progress: X% (N/6) | Avg time/gate: X min | ETA: ~X min | Blockers: N | Returns: N

| # | ID | Gate | Status | Deliverable | Date |
|---|-----|------|--------|-------------|------|
| 1 | COND-01 | Conductor | [→] In Progress | — | [date] |
| 2 | DISC-01 | Discovery (light) | [ ] Waiting | — | — |
| 3 | STRAT-01 | Product Strategist | [ ] Waiting | — | — |
| 4 | PM-01 | PM (rough RICE + MVP sketch) | [ ] Waiting | — | — |
| 5 | TECH-01 | Tech Lead (feasibility) | [ ] Waiting | — | — |
| 6 | DATA-01 | Data Analyst (metric sketch) | [ ] Waiting | — | — |
```

### Spec Pipeline (`/spec`, 1 session)

```
### Task Board — Spec Pipeline (/spec)
**Task:** [Name]

| # | ID | Gate | Status | Deliverable |
| 1 | COND-01 | Conductor | [→] | — |
| 2 | PM-SPEC | PM (PRD) | [ ] | — |
| 3 | UX-01 | UX Designer (parallel with TECH) | [ ] | — |
| 4 | TECH-01 | Tech Lead (parallel with UX) | [ ] | — |
| 5 | PM-FINAL | PM (merged PRD) | [ ] | — |
```
