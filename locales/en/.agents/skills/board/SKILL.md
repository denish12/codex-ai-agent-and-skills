---
name: board
description: Project Board Management — creation of tasks with IDs, statuses ☐/⏳/☑/⚠️, updates after each step, visible checklist in every Conductor's message.
---

# Skill: Board & Task Management

How the Conductor (Main Agent) manages the task board and tracks progress.

**Sections:**
1. [Core Principles](#1-principles)
2. [Task Statuses](#2-statuses)
3. [Board Structure](#3-structure)
4. [Updating the Board](#4-updating)
5. [Conductor's Message Format](#5-message-format)
6. [Anti-patterns](#6-anti-patterns)

---

## 1. Core Principles

- **Visibility:** The board MUST be visible in every message from the Conductor.
- **Traceability:** Every task has a unique ID (e.g., `T-01`, `BUG-42`).
- **Granularity:** Tasks should be small enough to complete in 1-2 agent interactions.
- **Single Source of Truth:** If it's not on the board, it doesn't exist.
- **Handoff Linking:** When handing off to an agent, reference the Task ID.

---

## 2. Task Statuses

Use exactly these symbols for quick visual parsing:

| Symbol | Status | Meaning |
|:---:|---|---|
| `☐` | **TODO** | Task identified, not started yet. |
| `⏳` | **IN PROGRESS** | Agent is currently working on it. |
| `☑` | **DONE** | Validated and completed (DoD met). |
| `⚠️` | **BLOCKED** | Needs user input, clarification, or depends on another blocked task. |
| `❌` | **CANCELED** | Won't do, out of scope, or obsolete. |

---

## 3. Board Structure

The board is a markdown checklist grouped by Epic or Phase.

### Typical Layout

```markdown
## 📋 Project Board

### Phase 1: Planning & Design (Gate 1 & 2)
- ☑ [T-01] Gather Requirements (PM)
- ☑ [T-02] Draft PRD (PM)
- ⏳ [T-03] Create UX Spec (UX Designer) - *Waiting for review*
- ☐ [T-04] Architecture Document (Architect)
- ☐ [T-05] API Contracts (Architect)

### Phase 2: Implementation (Gate 3)
- ☐ [T-06] DB Schema Setup (Senior Full Stack)
- ☐ [T-07] Build Login Flow (Senior Full Stack)
...
```

---

## 4. Updating the Board

### When to update

1. **New Request:** Parse user request into `T-xx` items. Add them as `☐`.
2. **Before Handoff:** Change target task to `⏳`.
3. **After Handoff (Success):** Change task to `☑`.
4. **After Handoff (Failure/Bug):** Change to `⚠️` or spawn a new `[BUG-xx]` item.
5. **Phase Complete:** Collapse completed phases or summarize them if the board gets too long.

### Spawning subtasks

If a task `T-06 (Build Login Flow)` turns out to be complex, break it down:

```markdown
- ⏳ [T-06] Build Login Flow
  - ☑ [T-06.1] Setup JWT middleware
  - ⏳ [T-06.2] Create `/login` endpoint
  - ☐ [T-06.3] Frontend Login form
```

---

## 5. Conductor's Message Format

Every response from the Conductor to the User MUST follow this structure:

```markdown
# 🎭 Conductor

**Status Update:** <1-2 sentences summarizing what just happened>

<Answer to user / Recommendations / Next Steps>

---
## 📋 Current Board
- ☑ [T-01] Initial setup
- ⏳ [T-02] Implementing Feature X (Full Stack doing this now)
- ☐ [T-03] Testing
- ⚠️ [T-04] Clarify API rate limits (need User input)

**Next action:** Handoff T-02 to Senior Full Stack. Do you approve?
```

---

## 6. Anti-patterns

| ❌ Anti-pattern | ✅ Solution |
|----------------|-----------|
| **Forgetting the board** | Conductor replies with just text. The user loses context. ALWAYS include the board. |
| **Tasks without IDs** | "Fix login bug". Hard to reference. Use `[BUG-01] Fix login bug`. |
| **Vague statuses** | Using "Pending" or mixed symbols. Stick to `☐, ⏳, ☑, ⚠️, ❌`. |
| **Silent updates** | Changing a task from `⏳` to `☑` without explaining *how* it was validated. |
| **Mega-tasks** | `☐ [T-01] Build the entire app`. Break it down. |

---

## See also
- `$handoff` — How to pass a task to another agent.
- `$gates` — How phases map to pipeline gates.
- `$pm_backlog` — How the PM originally creates the list of tasks.
