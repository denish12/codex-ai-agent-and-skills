---
description: Template for launching a task through the 8-agent pipeline. Use at the start of EVERY session.
---

# /start-task — Launch a task through the pipeline

## Step 0: Select pipeline mode

Determine the task type and choose the workflow:
- 🔵 **New feature / refactoring** → continue with `/start-task` (this file)
- 🟢 **Bugfix** (> 2 files, non-trivial) → switch to `/bugfix`
- 🟡 **Hotfix** (1–2 files, blast radius ≈ 0) → switch to `/hotfix`

> If you selected `/bugfix` or `/hotfix` — stop reading this file and follow the chosen workflow.

## Step 1: Load pipeline rules

Execute `/pipeline-rules` — read and acknowledge ALL rules BEFORE starting work.

## Step 2: Initialize agents
Execute `view_file` on `AGENTS.md` — confirm the list of agents and skills.

## Step 3: Launch the Conductor
Execute `view_file` on `agents/conductor.md` — read the protocol and create the Master Checklist in `task.md`.

## Step 4: Pass each gate STRICTLY by protocol

On EVERY gate, mandatory steps:
1. `view_file` on `agents/<role>.md` — read the agent protocol
2. Pass EACH section of the protocol in order (no "collapsing")
3. Use the **full** "Agent Response Format (strict)" from the agent file
4. If a section is not applicable — explicitly write: "N/A — [reason]"
5. Produce deliverable + Handoff Envelope with ALL mandatory fields
6. Present the result via `notify_user`
7. **Wait for explicit "Approved"** before moving to the next gate

## Step 5: Code — ONLY after DEV gate + Approved

- First, the DEV agent passes ALL sections of the protocol (§0–§7)
- Then proposes the change plan
- User approves
- ONLY THEN the agent applies code

## Step 6: Fix Cycle (on FAIL)

If the tester or reviewer finds a bug:
1. Current agent produces FAIL Report + HANDOFF Envelope → DEV
2. User approves FAIL HANDOFF
3. DEV reads `agents/senior_full_stack.md` and passes the FULL protocol
4. DEV HANDOFF → REV → OPS → TEST (each gate with full protocol)
5. No "quick fixes" without passing through agents

---

## First prompt template (copy and fill)

```
@AGENTS.md /pipeline-rules

Task: [what to do, 1-2 sentences].
Files: [specific files, if known].

Rules:
1. Start with the Conductor (agents/conductor.md)
2. Each gate: view_file → ALL protocol sections → full format → Approved
3. Do not apply code until DEV gate + my Approved
4. Fix Cycle = full pass through agents
```

---

## Session recommendations

- **One session = 3-4 gates maximum** (context is preserved)
- **Approved is given on EACH gate**, not per session
- **Session 1:** Conductor → Approved → PM → Approved → UX → Approved
- **Session 2:** ARCH → Approved → DEV → Approved → REV → Approved
- **Session 3:** OPS → Approved → TEST → Approved → RG → Approved
- Each new session — start with `/start-task`

## Mandatory questions from agents

Each agent that has a Clarification/Questions section in their protocol MUST:
1. Ask questions to the user BEFORE performing work
2. Minimum questions (from agent protocol): PM — 5+, ARCH — 5-10, DEV — as needed, Tester — 5+
3. If the task seems "obvious" — still ask at minimum 2-3 clarifying questions
4. Wait for user answers BEFORE continuing
5. The only exception: the user explicitly wrote "no questions"

## When "cutting corners" — one phrase

If the model shortcuts, say:
> "Stop. Section [X] of protocol agents/<role>.md. Re-read and execute."

---

## Feedback protocol (mandatory)

The model MUST provide feedback to the user at every stage:

### 1. Warning when tempted to shortcut
If the task looks "trivial", the model MUST write:
```
⚠️ Task looks trivial. My instinct is to do it quickly.
But following the protocol, I'm going through the full cycle. Sections: [list].
```

### 2. User prompt assessment
At the start of each task the model assesses the prompt:
```
📊 Prompt assessment:
- Clarity: [high/medium/low]
- What helped: [what was useful]
- What's missing: [what to add for effectiveness]
```

### 3. Tips in Handoff Envelope
In each Handoff add a section:
```
💡 Feedback: [tip for the user, if any]
```

### 4. Retrospective at session end
Before finishing work:
```
🔄 Retrospective:
- Gates passed: X
- Protocol violations: X
- What to improve in the next session: [recommendation]
```
