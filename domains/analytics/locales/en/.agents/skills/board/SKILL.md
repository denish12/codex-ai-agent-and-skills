---
name: board
description: Analytics pipeline task board management — initialization, statuses, event log, blocker escalation
---
# Board — Analytics Pipeline Task Board Management

## When to Use
- At **pipeline initialization** — Conductor creates the board as the first action.
- At **every transition** between gates — together with `$handoff`.
- At **session transitions** — the board captures current progress and is passed via `$handoff`.
- At a **blocker** — escalation to the user through the escalation protocol.
- At a **status request** — the user asks "where are we now?".

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Pipeline mode | ✅ | Full (`/analyze`, 5 sessions) / Quick (`/quick-insight`, 1 session) |
| Task name | ✅ | Brief name of the analytical request |
| Task ID | ⬚ | External ID (Linear, Notion, etc.), if available |
| Owner | ⬚ | Who initiated the request |
| Session number | ⬚ | Current session (1-5 for Full Pipeline) |

> If the mode is not defined — Conductor determines it via Decision Tree before creating the board.

## Gate Identifiers

Each gate receives a unique ID following the scheme `[ROLE]-[NN]`:

| Prefix | Role | Example |
|--------|------|---------|
| `COND` | Conductor | COND-01 |
| `INT` | Interviewer | INT-01 |
| `RES` | Researcher | RES-01, RES-02 |
| `AN` | Data Analyst | AN-01, AN-02 |
| `ST` | Strategist | ST-01, ST-02 |
| `MED` | Mediator | MED-01 |
| `DS` | Designer | DS-01 |
| `LY` | Layouter | LY-01 |

> Suffix `-01` / `-02` is used to distinguish gates of the same type (e.g., Analyst Researcher vs Critic Researcher).

## Statuses and State Machine

### Allowed Statuses

| Icon | Status | Meaning |
|------|--------|---------|
| `[ ]` | Pending | Gate has not started yet |
| `[→]` | In Progress | Agent is actively working on this gate |
| `[✓]` | Completed | Gate passed, deliverable recorded, user sign-off obtained |
| `[!]` | Blocker | Work stopped, escalation required |
| `[↩]` | Returned | Gate sent back for rework (after review or user feedback) |

### Allowed Transitions

```
[ ] Pending ───→ [→] In Progress    (agent started work)
[→] In Progress ─→ [✓] Completed   (deliverable ready + user "Approved")
[→] In Progress ─→ [!] Blocker     (blocker discovered)
[→] In Progress ─→ [↩] Returned    (user requested rework)
[!] Blocker ─────→ [→] In Progress  (blocker resolved)
[↩] Returned ────→ [→] In Progress  (rework started)
[✓] Completed ──→ [↩] Returned     (late feedback, revision)
```

> **Forbidden transitions:**
> - `[ ] Pending` → `[✓] Completed` (cannot skip a gate)
> - `[!] Blocker` → `[✓] Completed` (blocker must be resolved first)
> - Any backward transition across multiple gates (return — only to the current or previous gate)

## Protocol

### Step 0 — Determine Mode and Session
1. Get the request type from the user: `/analyze` (Full) or `/quick-insight` (Quick).
2. For Full Pipeline — determine the current session (1-5).
3. If continuing a previous session — load the board from the `$handoff` file.

### Step 1 — Board Initialization
1. Receive input data (mode, name, ID, session).
2. Determine the gate set by mode and session (see templates below).
3. Create the board with all gates in `[ ] Pending` status.
4. Move the first gate (Conductor) to `[→] In Progress`.
5. Add a "Session" column for cross-session progress tracking.
6. Display the board to the user.

### Step 2 — Update on Transition
On each `$handoff`:
1. Current gate → `[✓] Completed`, fill in deliverable and date.
2. Next gate → `[→] In Progress`.
3. Add an entry to the event log.
4. Display the updated board to the user.

### Step 3 — Blocker Handling
1. Current gate → `[!] Blocker`.
2. Record the blocker description in the event log.
3. Execute the escalation protocol (see below).
4. After resolution: gate → `[→] In Progress`, add log entry.

### Step 4 — Return Handling
1. Gate receiving the return → `[↩] Returned`.
2. All subsequent gates → `[ ] Pending` (reset).
3. Record the return reason in the event log.
4. After rework: gate → `[→] In Progress`.

### Step 5 — Session Completion (cross-session handoff)
1. Record the current board state.
2. Pass the board via `$handoff` to the file `docs/analytics/session-N-handoff.md`.
3. Generate a prompt for the next session via `$session-prompt-generator`.

### Step 6 — Board Closure
1. Ensure all gates are in `[✓] Completed`.
2. Add the final entry to the log.
3. Display the final board + complete log.

## Escalation Protocol

When moving a gate to `[!] Blocker` — compose the following message:

```
### ⚠️ Blocker — [Gate ID] [Gate]

**Task:** [Task name]
**Session:** [N of M]
**Gate:** [ID] [Gate name]
**Blocker description:** [What exactly is blocked and why]
**Impact:** [Which subsequent gates are affected]
**Resolution options:**
1. [Option A] — [pros / cons]
2. [Option B] — [pros / cons]

→ Awaiting decision from the user.
```

## Integration with Other Skills

| Skill | Interaction |
|-------|-------------|
| `$handoff` | On each handoff — update the board (step 2). On cross-session handoff — save the board to file |
| `$gates` | The board reflects gates defined in `$gates` |
| `$session-prompt-generator` | Board state — input data for generating the next session's prompt |
| `$web-research` | Researcher gates include mandatory web search |

## Validation (Quality Gate)

The board is considered correct if:

- [ ] Gate set matches the selected pipeline mode and session
- [ ] Exactly one gate is in `[→] In Progress` status (or zero, if all completed / blocker exists)
- [ ] No skipped gates (`[✓]` are consecutive from the beginning)
- [ ] All `[✓]` gates have a filled deliverable and date
- [ ] Event log contains an entry for each transition
- [ ] No forbidden transitions
- [ ] "Session" column is filled for all gates
- [ ] Gate IDs follow the naming scheme

## Handoff
The `$board` result is input for: `$handoff`, `$gates`, `$session-prompt-generator`.

## Anti-patterns

| Mistake | Why It's Bad | How to Do It Right |
|---------|-------------|-------------------|
| Skipping board update | Loss of tracking, unclear where we are | Update on every `$handoff` |
| Multiple `[→]` gates simultaneously | Parallel work without control | Only one `[→]` at any time |
| `[✓]` without deliverable | Unclear what was done | Always fill the "Deliverable" column |
| Blocker without escalation | User doesn't know about the problem | Always use the escalation protocol |
| Board not shown to user | User is out of context | Show the board on every update |
| Manual editing of past statuses | History distortion | Only `[↩] Return`, no overwriting |
| Board lost between sessions | Next session starts from scratch | Save the board via `$handoff` to file |
| Missing gate IDs | Impossible to reference a specific gate | Always use IDs: COND-01, INT-01, etc. |

## Output Templates

### Full Pipeline (`/analyze`, 5 sessions)

```
### Task Board — Full Pipeline (Analytics)
**Task:** [Name]
**ID:** [ID or —]
**Current Session:** [N of 5]

| # | ID | Gate | Session | Status | Deliverable | Date |
|---|----|------|---------|--------|-------------|------|
| 1 | COND-01 | Conductor | 1 | [→] In Progress | — | [date] |
| 2 | INT-01 | Interviewer | 1 | [ ] Pending | — | — |
| 3 | COND-02 | Conductor (session 2) | 2 | [ ] Pending | — | — |
| 4 | RES-01 | Researcher (Analysts) | 2 | [ ] Pending | — | — |
| 5 | AN-01 | Data Analyst (Analysts) | 2 | [ ] Pending | — | — |
| 6 | ST-01 | Strategist (Analysts) | 2 | [ ] Pending | — | — |
| 7 | COND-03 | Conductor (session 3) | 3 | [ ] Pending | — | — |
| 8 | RES-02 | Researcher (Critics) | 3 | [ ] Pending | — | — |
| 9 | AN-02 | Data Analyst (Critics) | 3 | [ ] Pending | — | — |
| 10 | ST-02 | Strategist (Critics) | 3 | [ ] Pending | — | — |
| 11 | COND-04 | Conductor (session 4) | 4 | [ ] Pending | — | — |
| 12 | MED-01 | Mediator | 4 | [ ] Pending | — | — |
| 13 | COND-05 | Conductor (session 5) | 5 | [ ] Pending | — | — |
| 14 | DS-01 | Designer | 5 | [ ] Pending | — | — |
| 15 | LY-01 | Layouter | 5 | [ ] Pending | — | — |

#### Event Log
| Time | Session | Gate | Event | Details |
|------|---------|------|-------|---------|
| [timestamp] | 1 | COND-01 | [ ] → [→] | Pipeline initialized |
```

### Quick Pipeline (`/quick-insight`, 1 session)

```
### Task Board — Quick Pipeline (Analytics)
**Task:** [Name]
**ID:** [ID or —]
**Session:** 1 (single)

| # | ID | Gate | Status | Deliverable | Date |
|---|----|------|--------|-------------|------|
| 1 | COND-01 | Conductor | [→] In Progress | — | [date] |
| 2 | INT-01 | Interviewer | [ ] Pending | — | — |
| 3 | RES-01 | Researcher | [ ] Pending | — | — |
| 4 | AN-01 | Data Analyst | [ ] Pending | — | — |
| 5 | ST-01 | Strategist | [ ] Pending | — | — |
| 6 | MED-01 | Mediator | [ ] Pending | — | — |
| 7 | DS-01 | Designer | [ ] Pending | — | — |
| 8 | LY-01 | Layouter | [ ] Pending | — | — |

#### Event Log
| Time | Gate | Event | Details |
|------|------|-------|---------|
| [timestamp] | COND-01 | [ ] → [→] | Pipeline initialized |
```
