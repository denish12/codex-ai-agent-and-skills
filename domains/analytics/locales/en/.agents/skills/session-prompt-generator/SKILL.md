---
name: session-prompt-generator
description: Next session prompt generation — context collection, prompt formation, progress preservation
---
# Session Prompt Generator — Next Session Prompt Generation

## When to Use
- At **session completion** in Full Pipeline (`/analyze`) — before the inter-session `$handoff`.
- When **handing off the project** to another operator — forming a self-contained prompt.
- Upon **user request** "generate a continuation prompt" — at any point.
- During **emergency session termination** — preserving maximum context for recovery.

> **Key principle:** the next session starts with **ZERO** context. The prompt must contain everything needed for the new session to continue without any loss.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| `$board` state | ✅ | Current task board with all statuses |
| Completed deliverables | ✅ | Full artifacts from the current and previous sessions |
| Current gate | ✅ | Where we stopped (gate ID from `$board`) |
| Next gate | ✅ | Where we are heading (next gate ID) |
| Open questions | ⬚ | Blockers, unresolved conflicts, questions for the user |
| Current session number | ✅ | Which session is ending (1-5) |
| Project name | ✅ | Name of the analytics project |

## Protocol

### Step 0 — State Collection
1. Read the current `$board` state — all gates, statuses, deliverables.
2. Collect all completed artifacts from the current session.
3. Load the cumulative index from previous sessions (if available).
4. Determine the next gate and its requirements from `$gates`.

### Step 1 — Identify Critical Data
1. Identify data that **cannot be recovered** without prior context:
   - User interview responses (from INT-01).
   - Collected research data (from RES-xx).
   - Analysis results (from AN-xx).
   - Strategic recommendations (from ST-xx).
   - Mediator verdict (from MED-01).
2. Identify data needed by the next agent to proceed.
3. Flag data that could be recovered through re-search (but is better to pass along).

### Step 2 — Determine Agents and Skills for the Next Session
1. Use the `$board` to determine which gates are upcoming in the next session.
2. For each gate, identify the agent and their skills (from AGENTS.md).
3. Compile a list: which agents to load, which skills to use.

### Step 3 — Prompt Formation
1. Fill in the prompt template (see below).
2. Include the FULL TEXT of critical data (not references, not summaries).
3. Formulate a specific task for the next session.
4. Specify which agents and skills to activate.

### Step 4 — Prompt Validation
1. Verify: is it possible to start work with ONLY this prompt?
2. Ensure there are no references to "previous context" or "as discussed earlier."
3. Ensure all critical data is included as full text.
4. Verify that the next session's task is specific and actionable.

### Step 5 — Saving
1. Include the prompt in the `$handoff` file: `docs/analytics/session-N-handoff.md`.
2. Show the prompt to the user for saving / copying.
3. Warn: "This prompt — paste it at the beginning of the next session."

## Generated Prompt Structure

The next session prompt must consist of the following blocks:

### Block 1 — Project Identification
- Project name.
- Pipeline mode (Full / Quick).
- Next session number.
- Which sessions are completed.

### Block 2 — Loading Instructions
- Read the analytics domain AGENTS.md.
- Load the agents needed for this session.
- Load skills: `$board`, `$handoff`, `$gates` + gate-specific ones.

### Block 3 — Completed Work (Summary)
- What was done in previous sessions (2-3 sentences per session).
- Key decisions and their rationale.

### Block 4 — Critical Data
- FULL TEXT of key artifacts needed to continue.
- Research data, analysis conclusions, recommendations.
- User interview responses (if any).

### Block 5 — Current State
- Task board (`$board`) in its current state.
- Which gate is next.
- Open questions and blockers.

### Block 6 — Session Task
- Specific formulation: what needs to be done in this session.
- Expected outcome (deliverables).
- Constraints and specifics.

## Prompt Formation Rules

### Mandatory Rules
1. **Self-sufficiency** — the prompt must work without ANY prior context.
2. **Data completeness** — include FULL text, not references or summaries.
3. **Task specificity** — not "continue the analysis," but "execute RES-02: research [topic] from the Critics' perspective, Analysts' data: [data]."
4. **Structure** — clear blocks marked with headings.
5. **Skill loading** — explicitly specify which agents and skills to load.

### Prohibited Elements
1. References to a "previous session" without full content.
2. "As we discussed" — there is no context, nothing was discussed.
3. "See results above" — there is no "above," everything must be in the prompt.
4. Abbreviated data — "key findings: ..." All findings are required.
5. Context assumptions — "you already know that..."

## Validation (Quality Gate)

The prompt is considered correct if:

- [ ] The prompt is self-sufficient — work can begin without external context
- [ ] Project name and mode are specified
- [ ] Session number and session history are specified
- [ ] All critical data is included as full text
- [ ] Task board (`$board`) is included in its current state
- [ ] Next gate and task are formulated specifically
- [ ] Agents and skills for loading are listed
- [ ] Open questions and blockers are documented
- [ ] No prohibited elements (references, abbreviations, assumptions)
- [ ] The prompt has been checked for readability — understandable without additional context

## Handoff
The `$session-prompt-generator` result serves as input for: the next session (via prompt copy), the `$handoff` file (`docs/analytics/session-N-handoff.md`).

## Anti-patterns

| Mistake | Why It's Bad | How to Do It Right |
|---------|-------------|-------------------|
| Prompt without research data | The next session will lose all collected facts | Include the FULL TEXT of data |
| "Continue the work" | No context for what to continue | Specific task: gate, action, expected result |
| References to files without content | Files may be inaccessible | Include content directly in the prompt |
| Prompt without task board | Unclear where we are in the pipeline | Always include `$board` |
| Abbreviated artifacts | Loss of critical details | Full text of each artifact |
| Skipping open questions | Problems will resurface | Document all blockers and questions |
| No loading instructions | The session won't load the required agents | Explicitly specify agents and skills |
| Prompt with >50% filler | Dilution of critical data | Structure: blocks, tables, specifics |

## Output Template

```
---
## Prompt for Session [N+1] — [Project Name]

### 1. Project
- **Name:** [Name]
- **Mode:** Full Pipeline (/analyze)
- **Session:** [N+1] of 5
- **Previous sessions:** 1-[N] completed

### 2. Loading
Read:
- `domains/analytics/AGENTS.md`
- `domains/analytics/.agents/skills/board/SKILL.md`
- `domains/analytics/.agents/skills/handoff/SKILL.md`
- `domains/analytics/.agents/skills/gates/SKILL.md`
- [Session-specific skills]

Activate agents: [List of agents for this session]

### 3. Completed Work
**Session 1:** [Summary, 2-3 sentences]
**Session [N]:** [Summary, 2-3 sentences]

### 4. Data (full text)

#### Research Brief (from INT-01)
[FULL TEXT of research brief]

#### Research Data (from RES-xx)
[FULL TEXT of data with sources and URLs]

#### Analysis Results (from AN-xx)
[FULL TEXT of frameworks and conclusions]

#### [Other artifacts as needed]
[FULL TEXT]

### 5. Current State

#### Task Board
[Full board from $board]

#### Open Questions
- [Question 1]
- [Question 2 or "None"]

### 6. Task for Session [N+1]
**Gates:** [ID list]
**What to do:** [Specific description]
**Expected result:** [Deliverables]
**Constraints:** [If any]

-> Start as Conductor (COND-xx). Load the board, verify data, hand off control to [next agent].
---
```
