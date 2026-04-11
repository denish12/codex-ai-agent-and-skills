---
name: board
description: Analytics pipeline task board management — initialization, statuses, event log, blocker escalation
---
# Board — Analytics Pipeline Task Board Management

## When to use
- Upon pipeline **initialization** — Conductor creates the board as the first action.
- At **every transition** between gates — together with `$handoff`.
- At **transitions between sessions** — the board captures current progress and is passed via `$handoff`.
- Upon a **blocker** — escalation to the user via the escalation protocol.
- Upon a **status request** — the user asks "where are we now?".

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Pipeline mode | ✅ | Full (`/analyze`, 5 sessions) / Quick (`/quick-insight`, 1 session) |
| Task name | ✅ | Brief name of the analytical request |
| Task ID | ⬚ | External ID (Linear, Notion, etc.), if any |
| Assignee | ⬚ | Who initiated the request |
| Session number | ⬚ | Current session (1-5 for Full Pipeline) |

> If the mode is undefined — Conductor determines it via Decision Tree prior to creating the board.

## Gate Identifiers

Each gate receives a unique ID according to the scheme `[ROLE]-[NN]`:

| Prefix | Role | Example |
|----------|------|--------|
| `COND` | Conductor | COND-01 |
| `INT` | Interviewer | INT-01 |
| `RES` | Researcher | RES-01, RES-02 |
| `AN` | Data Analyst | AN-01, AN-02 |
| `ST` | Strategist | ST-01, ST-02 |
| `MED` | Mediator | MED-01 |
| `DS` | Designer | DS-01 |
| `LY` | Layouter | LY-01 |

> The suffix `-01` / `-02` is used to distinguish gates of the same type (e.g., Researcher of Analysts vs Researcher of Critics).

## Statuses and State Machine

### Allowed statuses

| Icon | Status | Meaning |
|--------|--------|----------|
| `[ ]` | Pending | Gate has not started yet |
| `[→]` | In progress | Agent is actively working on this gate |
| `[✓]` | Completed | Gate is passed, deliverable is captured, user sign-off is received |
| `[!]` | Blocker | Work is stopped, escalation required |
| `[↩]` | Return | Gate is sent for rework (after review or user feedback) |
| `[⊘]` | Skipped | Gate is skipped by user's decision (only via skip protocol) |

### Allowed transitions

```
[ ] Pending ──→ [→] In progress   (agent started working)
[ ] Pending ──→ [⊘] Skipped       (user skip — only via protocol)
[→] In progress ──→ [✓] Completed (deliverable ready + user "Approved")
[→] In progress ──→ [!] Blocker   (blocker detected)
[→] In progress ──→ [↩] Return    (user requested rework)
[!] Blocker ────→ [→] In progress (blocker resolved)
[↩] Return ───→ [→] In progress   (rework started)
[✓] Completed ──→ [↩] Return      (late feedback, revision)
```

> **Forbidden transitions:**
> - `[ ] Pending` → `[✓] Completed` (cannot skip a gate without work)
> - `[!] Blocker` → `[✓] Completed` (blocker must be resolved first)
> - `[⊘] Skipped` → any status (skip is irreversible)
> - Any transition backwards across multiple gates (return — only to the current or previous one)

## Protocol

### Step 0 — Determining mode and session
1. Get request type from the user: `/analyze` (Full) or `/quick-insight` (Quick).
2. For Full Pipeline — determine current session (1-5).
3. If continuing a previous session — load the board from the `$handoff` file.

### Step 1 — Board Initialization
1. Get input data (mode, name, ID, session).
2. Determine the set of gates by mode and session (see templates below).
3. Create a board with all gates in `[ ] Pending` status.
4. Move the first gate (Conductor) to `[→] In progress`.
5. Add a "Session" column for cross-session progress tracking.
6. Record start time.
7. Show the board to the user.

### Step 2 — Update upon transition
On every `$handoff`:
1. Current gate → `[✓] Completed`, fill in deliverable and date.
2. Next gate → `[→] In progress`.
3. Calculate progress metrics (see "Metrics" section).
4. Add a record to the event log.
5. Show the updated board to the user.

### Step 3 — Blocker Handling
1. Current gate → `[!] Blocker`.
2. Determine blocker severity (see "Escalation protocol" section).
3. Fill in blocker description in the event log.
4. Execute escalation protocol.
5. After resolution: gate → `[→] In progress`, add record to log with solution.

### Step 4 — Return Handling
1. Gate being returned to → `[↩] Return`.
2. All subsequent gates → `[ ] Pending` (reset).
3. Record reason for return in event log.
4. After rework: gate → `[→] In progress`.

### Step 5 — Skip Protocol (gate skip)
Used when the user requests to skip a gate.

1. **Request confirmation:**
   ```
   ⚠️ Request to skip gate [ID] [Name]

   **Impact:** [Which subsequent gates will be affected by the absence of this gate's deliverable]
   **Risk:** [What could go wrong without this gate]

   Confirm skip? (Yes / No)
   ```
2. Only upon an explicit "Yes" from the user → gate is moved to `[⊘] Skipped`.
3. Add to event log: reason for skip + user confirmation.
4. Next gate → `[→] In progress`.

> **Cannot be skipped:** COND-01 (initialization), MED-01 (mediation — pipeline core), LY-01 (final deliverable).

### Step 6 — Add Protocol (adding a gate)
Used when during the work it turns out that an additional gate is needed.

1. Conductor determines: which gate, after which existing one, justification.
2. **Request confirmation:**
   ```
   ➕ Adding a gate

   **New gate:** [ID] [Name]
   **Position:** after [existing gate ID]
   **Justification:** [Why it is necessary]
   **Impact on timeline:** +[time estimate]

   Confirm addition? (Yes / No)
   ```
3. If "Yes" — insert the gate into the board with `[ ] Pending` status, update numbering.
4. Record in the event log.

### Step 7 — Session Completion (cross-session handoff)
1. Record the current state of the board.
2. Form the handoff package:

   | Component | Description |
   |-----------|----------|
   | Board (full) | All gates with statuses, deliverables, dates |
   | Event log | Full history of transitions, blockers, resolutions |
   | Metrics | Progress, time per gate, blockers |
   | Context | Key decisions, open questions, dependencies |
   | Artifacts | Links to all created deliverables |

3. Save the package via `$handoff` into the file `docs/analytics/session-N-handoff.md`.
4. Generate a prompt for the next session via `$session-prompt-generator`.

### Step 8 — Board Closure
1. Verify that all gates are in `[✓] Completed` or `[⊘] Skipped`.
2. Calculate final metrics.
3. Add a final record to the log.
4. Show the final board + full log + metrics.

## Progress Metrics

Upon every board update calculate:

| Metric | Formula | Example |
|---------|---------|--------|
| Progress (%) | `completed / total × 100` | 6/15 = 40% |
| Current session | `N out of M` | 2 out of 5 |
| Time on current gate | `now - gate_start_time` | 12 min |
| Average time per gate | `Σ gate_times / completed_count` | 8 min |
| Blockers (total) | `count of [!] overall` | 1 |
| Returns (total) | `count of [↩] overall` | 0 |
| ETA | `remaining_gates × average_time` | ~72 min |

Display in the progress bar under the board header:
```
📊 Progress: 40% (6/15) | Session: 2/5 | Avg. time/gate: 8 min | ETA: ~72 min | Blockers: 1 | Returns: 0
```

## Escalation Protocol

### Blocker Severity

| Severity | Description | Example | Action |
|:--------:|----------|--------|----------|
| 🔴 Critical | Pipeline cannot continue, no workaround | Missing key data, user input required | Immediate escalation, pipeline halt |
| 🟡 Major | Gate is blocked, but can work on next in parallel | One source is unavailable, but there are alternative ones | Escalation + proposal to continue with a disclaimer |
| 🟢 Minor | Deliverable quality drops, but gate is passable | Data is approximate, no second confirming source | Warning in log, ⚠️ mark in deliverable |

### Escalation Template

```
### ⚠️ Blocker — [Gate ID] [Gate]

**Task:** [Task name]
**Session:** [N out of M]
**Gate:** [ID] [Gate name]
**Severity:** [🔴 Critical / 🟡 Major / 🟢 Minor]
**Blocker description:** [What exactly is blocked and why]
**Impact:** [Which subsequent gates are impacted]
**Resolution options:**
1. [Option A] — [pros / cons]
2. [Option B] — [pros / cons]

→ Awaiting decision from the user.
```

## Integration with other skills

| Skill | Interaction |
|------|----------------|
| `$handoff` | On every handoff — update the board (step 2). On cross-session handoff — save the full package to a file (step 7) |
| `$gates` | Board reflects gates defined in `$gates`. Gate additions (step 6) — align with `$gates` |
| `$session-prompt-generator` | Board state + metrics + log — input data for generating the next session prompt |
| `$web-research` | Researcher gates include mandatory web search |

## Validation (Quality Gate)

The board is considered valid if:

- [ ] The set of gates matches the selected pipeline mode and session
- [ ] Exactly one gate is in `[→] In progress` status (or zero if all completed / there is a blocker)
- [ ] No skipped gates (`[✓]` / `[⊘]` follow consecutively from the start)
- [ ] All `[✓]` gates have a filled deliverable and date
- [ ] All `[⊘]` gates have a skip reason and user confirmation in the log
- [ ] Event log contains an entry for every transition
- [ ] No forbidden transitions
- [ ] "Session" column is filled for all gates
- [ ] Gate IDs correspond to the naming scheme
- [ ] Progress metrics are calculated and displayed
- [ ] Blockers have a severity and resolution is recorded in the log

## Handoff
The result of `$board` acts as input data for: `$handoff`, `$gates`, `$session-prompt-generator`.

Handover format for cross-session handoff: board + log + metrics + context + artifacts (see step 7).

## Anti-patterns

| Error | Why it falls short | How to do it right |
|--------|-------------|---------------|
| Skipping board updates | Loss of tracking, unclear where we are | Update on every `$handoff` |
| Multiple `[→]` gates concurrently | Parallel work without oversight | Only one `[→]` at any given moment |
| `[✓]` with no deliverable | Unclear what was done | Always populate the "Deliverable" column |
| Blocker without escalation | User is unaware of the problem | Always leverage the escalation protocol with severity |
| Board not shown to user | User is out of context | Show the board upon every update |
| Manual edit of past statuses | Altering history | Only `[↩] Return`, no overwriting |
| Loss of board between sessions | Next session starts from scratch | Save the full package via `$handoff` (step 7) |
| Absence of gate IDs | Unable to reference a specific gate | Always employ IDs: COND-01, INT-01, etc. |
| Skipping a gate without protocol | Violates pipeline integrity | Only via the skip protocol (step 5) with confirmation |
| Blockers with no severity | All blockers seem alike, lacks prioritization | Always determine 🔴/🟡/🟢 severity |

## Example — Board mid-flight (session 2, RES-01 gate in progress, there was a blocker on INT-01)

```
### Task Board — Full Pipeline (Analytics)
**Task:** Analysis of EdTech market in RF
**ID:** LIN-2847
**Current session:** 2 out of 5

📊 Progress: 27% (4/15) | Session: 2/5 | Avg. time/gate: 11 min | ETA: ~121 min | Blockers: 1 | Returns: 0

| # | ID | Gate | Session | Status | Deliverable | Date |
|---|----|------|:------:|:------:|-------------|------|
| 1 | COND-01 | Conductor | 1 | [✓] | Decision Tree → Full Pipeline | 10:00 |
| 2 | INT-01 | Interviewer | 1 | [✓] | Brief: 12 questions, goals, scope | 10:15 |
| 3 | COND-02 | Conductor (session 2) | 2 | [✓] | Context loaded, skills assigned | 10:22 |
| 4 | RES-01 | Researcher (Analysts) | 2 | [→] | — | 10:25 |
| 5 | AN-01 | Data Analyst (Analysts) | 2 | [ ] | — | — |
| 6 | ST-01 | Strategist (Analysts) | 2 | [ ] | — | — |
| 7 | COND-03 | Conductor (session 3) | 3 | [ ] | — | — |
| 8 | RES-02 | Researcher (Critics) | 3 | [ ] | — | — |
| 9 | AN-02 | Data Analyst (Critics) | 3 | [ ] | — | — |
| 10 | ST-02 | Strategist (Critics) | 3 | [ ] | — | — |
| 11 | COND-04 | Conductor (session 4) | 4 | [ ] | — | — |
| 12 | MED-01 | Mediator | 4 | [ ] | — | — |
| 13 | COND-05 | Conductor (session 5) | 5 | [ ] | — | — |
| 14 | DS-01 | Designer | 5 | [ ] | — | — |
| 15 | LY-01 | Layouter | 5 | [ ] | — | — |

#### Event log
| Time | Session | Gate | Event | Details |
|-------|:------:|------|---------|--------|
| 10:00 | 1 | COND-01 | [ ] → [→] | Pipeline initialized. Mode: Full |
| 10:08 | 1 | COND-01 | [→] → [✓] | Decision Tree → Full Pipeline, 5 sessions |
| 10:08 | 1 | INT-01 | [ ] → [→] | Handoff: task context passed |
| 10:12 | 1 | INT-01 | [→] → [!] | 🟡 Major: user did not provide budget and timeline |
| 10:14 | 1 | INT-01 | [!] → [→] | Resolved: budget ≤$50K, horizon 12 mo |
| 10:15 | 1 | INT-01 | [→] → [✓] | Brief: 12 questions, scope locked |
| 10:22 | 2 | COND-02 | [ ] → [→] | Session 2 started, context loaded |
| 10:22 | 2 | COND-02 | [→] → [✓] | Skills assigned: tam-sam-som, competitive-analysis |
| 10:25 | 2 | RES-01 | [ ] → [→] | Web-research: RF EdTech market 2025-2026 |
```

## Output Templates

### Full Pipeline (`/analyze`, 5 sessions)

```
### Task Board — Full Pipeline (Analytics)
**Task:** [Name]
**ID:** [ID or —]
**Current session:** [N out of 5]

📊 Progress: X% (N/15) | Session: N/5 | Avg. time/gate: X min | ETA: ~X min | Blockers: N | Returns: N

| # | ID | Gate | Session | Status | Deliverable | Date |
|---|----|------|--------|--------|-------------|------|
| 1 | COND-01 | Conductor | 1 | [→] In progress | — | [date] |
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

#### Event log
| Time | Session | Gate | Event | Details |
|-------|--------|------|---------|--------|
| [timestamp] | 1 | COND-01 | [ ] → [→] | Pipeline initialized |
```

### Quick Pipeline (`/quick-insight`, 1 session)

```
### Task Board — Quick Pipeline (Analytics)
**Task:** [Name]
**ID:** [ID or —]
**Session:** 1 (single)

📊 Progress: X% (N/8) | Avg. time/gate: X min | ETA: ~X min | Blockers: N | Returns: N

| # | ID | Gate | Status | Deliverable | Date |
|---|----|------|--------|-------------|------|
| 1 | COND-01 | Conductor | [→] In progress | — | [date] |
| 2 | INT-01 | Interviewer | [ ] Pending | — | — |
| 3 | RES-01 | Researcher | [ ] Pending | — | — |
| 4 | AN-01 | Data Analyst | [ ] Pending | — | — |
| 5 | ST-01 | Strategist | [ ] Pending | — | — |
| 6 | MED-01 | Mediator | [ ] Pending | — | — |
| 7 | DS-01 | Designer | [ ] Pending | — | — |
| 8 | LY-01 | Layouter | [ ] Pending | — | — |

#### Event log
| Time | Gate | Event | Details |
|-------|------|---------|--------|
| [timestamp] | COND-01 | [ ] → [→] | Pipeline initialized |
```
