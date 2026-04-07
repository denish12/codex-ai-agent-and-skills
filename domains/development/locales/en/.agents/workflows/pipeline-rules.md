---
description: Absolute development pipeline rules. MUST NOT be violated.
---

# 🔴 ABSOLUTE RULE: Pipeline must not be skipped

**This rule has no exceptions. Violation = blocker.**

## Pipeline — 3 Modes

### 🔵 Full Pipeline (8 gates) — `/start-task`
CONDUCTOR → PM → UX → ARCH → DEV → REV → OPS → TEST → RG

### 🟢 Bugfix Pipeline (4 gates) — `/bugfix`
CONDUCTOR → DEV → REV → TEST

### 🟡 Hotfix Pipeline (2 gates) — `/hotfix`
CONDUCTOR → DEV+TEST

### Decision Tree (mode selection)
```
User task
  │
  ├─ New feature / refactoring / new API / new screen?
  │    └─ 🔵 Full Pipeline
  │
  ├─ Bug in existing functionality?
  │    ├─ Affects > 2 files or changes API contract?
  │    │    └─ 🟢 Bugfix (4 gates)
  │    ├─ Affects 1–2 files, blast radius ≈ 0?
  │    │    └─ 🟡 Hotfix (2 gates)
  │    └─ Unsure → ask the user
  │
  └─ User explicitly specified mode (/bugfix, /hotfix)?
       └─ Use the specified mode
```

> Conductor **does not receive new skills** — uses existing `$board`, `$handoff`, `$gates`.

## Mandatory actions on EVERY gate (all modes)

1. `view_file` on `agents/<role>.md` — read the agent protocol
2. Follow **its** instructions, use **its** skills
3. Produce deliverable + Handoff Envelope
4. Present the result to the user via `notify_user`
5. **Wait for explicit "Approved" from the user** before moving to the next gate

---

## 🛑 STOP RULES (before any code action)

### Rule 1: Agent protocol — step by step, no collapsing
Each paragraph (§) in the agent file = **a separate step**.
- Agent MUST pass ALL paragraphs in the order specified in the file
- Collapsing multiple §§ into a single response is forbidden
- If agent skips a §, it MUST state the reason: "§X skipped: [reason]"

### Rule 2: Code is applied ONLY after full protocol pass
- ❌ Must not: write code first → then write the report
- ✅ Must: pass all §§ of the protocol → present plan → Approved → apply code

### Rule 3: Full response format — no shortcuts
- Use **"Agent Response Format (strict)"** from the agent file
- Every section of the format is MANDATORY — skipping = violation
- If a section is not applicable, explicitly write: "N/A — [reason]"

### Rule 4: Fix Cycle — full pass through agents
On FAIL at any gate:
1. Current agent (e.g. Tester) produces FAIL Report + HANDOFF Envelope → DEV
2. DEV reads `agents/senior_full_stack.md` and passes FULL protocol (§0–§7)
3. DEV HANDOFF → REV → OPS → TEST (each gate with view_file + protocol + Approved)
4. No "quick fixes" without passing through agents

### Rule 5: Self-check before notify_user
Before each `notify_user` the agent MUST internally verify:
- [ ] Did I read the agent file (`view_file` on `agents/<role>.md`)?
- [ ] Did I pass ALL paragraphs of the protocol?
- [ ] Am I using the FULL response format?
- [ ] Is there a HANDOFF Envelope with ALL mandatory fields?
- [ ] Did I NOT apply code before receiving Approved?

---

## Prohibited

- ❌ "Fast-tracking" gates (skipping multiple gates at once)
- ❌ Interpreting "Confirmed" as permission to skip gates
- ❌ Starting the pipeline without explicit user permission
- ❌ Moving to the next gate without "Approved" from the user
- ❌ Writing code (DEV gate) before passing prior gates
- ❌ Applying code before completing the full agent protocol
- ❌ Shortening the response format (every section is mandatory)
- ❌ Ignoring protocol paragraphs, considering the task "trivial"
- ❌ Lying about reading the protocol (if no `view_file` — it was not read)

---

## 🔒 MECHANICAL BLOCKS

> These rules were introduced after an incident where the agent ignored the pipeline,
> auto-approved the ARCH gate, ignored an open user question,
> wrote code without TDD, and delivered a broken preview.

### Block 1: ShouldAutoProceed = false ALWAYS
```
notify_user → ShouldAutoProceed: false
```
No exceptions. On EVERY notify_user. Even on "trivial" gates.
Even if the agent is "confident". The user ALWAYS decides.

### Block 2: Pre-flight check before ANY write_to_file / replace_file_content
Before every code-writing tool call the agent MUST:
1. Quote the LAST user message containing the word "Approved"
2. If there is no quote — CODE MUST NOT BE WRITTEN
3. System-generated messages are NOT considered "Approved"
4. Auto-proceeded artifacts are NOT considered "Approved"

### Block 3: Answering a question — quoting is mandatory
If the agent asked the user a question:
1. The agent's next response MUST start with: `> Your answer: [exact quote]`
2. If there is no quote — no answer was given — STOP, repeat the question
3. Guessing the answer for the user is forbidden
4. Accepting a system-generated message as an answer is forbidden

### Block 4: Strict TDD (DEV gate)
1. RED: write FAILING tests FIRST
2. GREEN: minimal code to make tests pass
3. REFACTOR: improve code without changing behavior
4. Writing code before tests = violation = blocker

### Block 5: Skills — mandatory reading via view_file
Each agent (`agents/<role>.md`) references skills in `.agents/skills/`.
1. Agent MUST execute `view_file` on `SKILL.md` of EVERY skill referenced in the agent protocol
2. If there was no `view_file` — the skill is NOT considered applied
3. Patterns, anti-patterns, code examples, best practices from skills — mandatory for application
4. In the deliverable the agent MUST state: `Skills applied: [list]` with `view_file` confirmation
5. Formal checkmarks without actual reading = violation = blocker

---

## Mandatory artifacts

### task.md (Antigravity brain — automatic)
- **Created by:** Conductor at Gate 0
- **Updated by:** EVERY agent after completing their gate
- **Contains:** Master Checklist + Handoff Envelopes Status + Fix Cycle tracking
- **Rule:** If task.md is not updated after a gate — the gate is not considered complete

### implementation_plan.md
- **Created by:** Architect at Gate 3 (ARCH) — or Conductor, if the task does not require ARCH
- **Saved to:** `docs/reports/architect/plan-<task-name>.md` (in the project)
- **Contains:** Proposed Changes + files + Verification Plan
- **Rule:** DEV must read the plan before starting implementation. Reviewer references it during code review.

### walkthrough.md (Antigravity brain — automatic)
- **Created by:** Tester at Gate 7 (TEST) — or Release Gate
- **Contains:** what was done, what was verified, validation results
- **Rule:** update on each Fix Cycle and before Release Gate

### docs/architecture.md + docs/ADR-log.md (in the project)
- **Updated by:** Architect on any architectural decision
- **Referenced by:** Reviewer and Architect on each gate
- **Rule:** New ADRs are added to ADR-log.md. Architecture.md is updated when the stack, patterns, or constraints change
