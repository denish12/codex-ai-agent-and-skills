---
name: board
description: Managing the content pipeline task board — initialization, statuses, event log, blocker escalation
---
# Board — Task Board Management

## When to use
- At pipeline **initialization** — Conductor creates the board as the first action.
- At **each transition** between gates — in conjunction with `$handoff`.
- On **blocker** — escalation to the user via the escalation protocol.
- On **status request** — when the user asks "where are we now?".

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Pipeline mode | ✅ | Full / Bugfix / Hotfix |
| Task name | ✅ | Brief name (feature, bug, content campaign) |
| Task ID | ⬚ | External ID (Linear, Notion, etc.), if available |
| Assignee | ⬚ | Who initiated the task |

> If the mode is not determined — Conductor determines it by the Decision Tree prior to creating the board.

## Statuses and State Machine

### Allowed statuses

| Icon | Status | Meaning |
|--------|--------|----------|
| `[ ]` | Pending | Gate has not started yet |
| `[→]` | In progress | Agent is actively working on this gate |
| `[✓]` | Completed | Gate passed, deliverable finalized, user sign-off received |
| `[!]` | Blocker | Work halted, escalation required |
| `[↩]` | Return | Gate sent back for revision (after review or user feedback) |

### Allowed transitions

```
[ ] Pending ──→ [→] In progress      (agent started work)
[→] In progress ──→ [✓] Completed     (deliverable ready + user "Approved")
[→] In progress ──→ [!] Blocker       (blocker found)
[→] In progress ──→ [↩] Return        (user requested revision)
[!] Blocker ────→ [→] In progress      (blocker resolved)
[↩] Return ───→ [→] In progress      (revision started)
[✓] Completed ──→ [↩] Return          (late feedback, review)
```

> **Forbidden transitions:**
> - `[ ] Pending` → `[✓] Completed` (skipping a gate is not allowed)
> - `[!] Blocker` → `[✓] Completed` (blocker must be resolved first)
> - Any backward transition across multiple gates (return — only to the current or previous)

## Protocol

### Step 1 — Board Initialization
1. Obtain input data (mode, name, ID).
2. Determine the set of gates based on the mode (see templates below).
3. Create a board with all gates in status `[ ] Pending`.
4. Transition the first gate (Conductor) to `[→] In progress`.
5. Show the board to the user.

### Step 2 — Update on transition
On each `$handoff`:
1. Current gate → `[✓] Completed`, record deliverable and date.
2. Next gate → `[→] In progress`.
3. Add a record to the event log.
4. Show the updated board to the user.

### Step 3 — Blocker handling
1. Current gate → `[!] Blocker`.
2. Add a description of the blocker in the event log.
3. Execute the escalation protocol (see below).
4. Upon resolution: gate → `[→] In progress`, add a record to the log.

### Step 4 — Return handling
1. Gate to which it returns → `[↩] Return`.
2. All subsequent gates → `[ ] Pending` (reset).
3. Document the reason for return in the event log.
4. After revision: gate → `[→] In progress`.

### Step 5 — Closing the board
1. Ensure all gates are in `[✓] Completed`.
2. Add a final record to the log.
3. Show the final board + complete log.

## Escalation Protocol

Upon changing a gate to `[!] Blocker` — form a message:

```
### ⚠️ Blocker — [Gate]

**Task:** [Task name]
**Gate:** [Gate name]
**Blocker description:** [What exactly is blocked and why]
**Impact:** [Which subsequent gates it affects]
**Solution options:**
1. [Option A] — [pros / cons]
2. [Option B] — [pros / cons]

→ Awaiting decision from the user.
```

## Integration with other skills

| Skill | Interaction |
|------|----------------|
| `$handoff` | On every handoff — update the board (step 2) |
| `$gates` | Board reflects the gates defined in `$gates` |
| `$content-release-gate` | Final gate of the board — Release Gate |

## Validation (Quality Gate)

The board is considered correct if:

- [ ] Support for gates corresponds to the selected pipeline mode
- [ ] Exactly one gate is in status `[→] In progress` (or zero, if all completed / blocker present)
- [ ] No skipped gates (`[✓]` go sequentially from the beginning)
- [ ] All `[✓]` gates have a populated deliverable and date
- [ ] Event log contains a record for each transition
- [ ] No forbidden transitions

## Anti-patterns

| Error | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Skipping board update | Tracking is lost, unclear where we are | Update upon every `$handoff` |
| Multiple `[→]` gates concurrently | Parallel work without control | Only one `[→]` at any given time |
| `[✓]` without deliverable | Unclear what was done | Always fill in the "Deliverable" column |
| Blocker without escalation | User is unaware of the problem | Always use the escalation protocol |
| Board not shown to the user | User is out of context | Show the board upon each update |
| Manual editing of past statuses | Distorting history | Only `[↩] Return`, no overwriting |

## Output Templates

### Full Pipeline

```
### Task Board — Full Pipeline
**Task:** [Name]
**ID:** [ID or —]

| # | Gate | Status | Deliverable | Date |
|---|------|--------|-------------|------|
| 1 | Conductor | [→] In progress | — | [date] |
| 2 | Strategist | [ ] Pending | — | — |
| 3 | Researcher | [ ] Pending | — | — |
| 4 | Copywriter | [ ] Pending | — | — |
| 5 | Visual Concept | [ ] Pending | — | — |
| 6 | Reviewer | [ ] Pending | — | — |
| 7 | Release Gate | [ ] Pending | — | — |

#### Event Log
| Time | Gate | Event | Details |
|-------|------|---------|--------|
| [timestamp] | Conductor | [ ] → [→] | Pipeline initialized |
```

### Bugfix Pipeline

```
### Task Board — Bugfix Pipeline
**Task:** [Name]
**ID:** [ID or —]

| # | Gate | Status | Deliverable | Date |
|---|------|--------|-------------|------|
| 1 | Conductor | [→] In progress | — | [date] |
| 2 | Researcher | [ ] Pending | — | — |
| 3 | Copywriter | [ ] Pending | — | — |
| 4 | Reviewer | [ ] Pending | — | — |

#### Event Log
| Time | Gate | Event | Details |
|-------|------|---------|--------|
| [timestamp] | Conductor | [ ] → [→] | Pipeline initialized |
```

### Hotfix Pipeline

```
### Task Board — Hotfix Pipeline
**Task:** [Name]
**ID:** [ID or —]

| # | Gate | Status | Deliverable | Date |
|---|------|--------|-------------|------|
| 1 | Conductor | [→] In progress | — | [date] |
| 2 | Copywriter + Reviewer | [ ] Pending | — | — |

#### Event Log
| Time | Gate | Event | Details |
|-------|------|---------|--------|
| [timestamp] | Conductor | [ ] → [→] | Pipeline initialized |
```
