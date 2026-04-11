---
name: session-prompt-generator
description: Generating a prompt for the next session — gathering context, framing the prompt, saving progress
---
# Session Prompt Generator — Generating a Prompt for the Next Session

## When to Use
- When **completing a session** in the Full Pipeline (`/analyze`) — before the inter-session `$handoff`.
- When **needing to hand off the project** to another operator — forming a self-sufficient prompt.
- Upon **user request** "generate a prompt to continue" — at any point.
- During an **abnormal termination** of a session — saving maximum context for recovery.

> **Key Principle:** The next session starts with **ZERO** context. The prompt must contain everything necessary for the new session to continue work without losses.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| `$board` state | ✅ | Current task board with all statuses |
| Completed deliverables | ✅ | Full artifacts of the current and previous sessions |
| Current gate | ✅ | Where we stopped (gate ID from `$board`) |
| Next gate | ✅ | Where we are moving (next gate ID) |
| Open questions | ⬚ | Blockers, unresolved conflicts, questions for the user |
| Current session number | ✅ | Which session is ending (1-5) |
| Project name | ✅ | Name of the analytical project |

### Relationship with Other Skills
| Skill | Interaction | When |
|------|----------------|-------|
| `$board` | Source: the current board state is included in the prompt (block 5) | Step 0 |
| `$handoff` | The prompt is included in the inter-session handoff file | Step 5 |
| `$gates` | Source: requirements for the next gate define the task (block 6) | Step 0 |
| Framework skills | Completed frameworks are included as full text in block 4 | Step 1 |

## Mapping "Session → Gates → Agents → Skills"

### Full Pipeline (`/analyze`)

| Session | Gates | Agents | Required Skills | Framework Skills |
|:------:|-------|--------|-------------------|-----------------|
| **1** | COND-01, INT-01 | Conductor, Interviewer | `$board`, `$gates`, `$handoff` | — |
| **2** | COND-02, RES-01, AN-01, ST-01 | Conductor, Researcher, Data Analyst, Strategist | `$board`, `$gates`, `$handoff`, `$web-research` | By AN-01 choice (min 2) |
| **3** | COND-03, RES-02, AN-02, ST-02 | Conductor, Researcher, Data Analyst, Strategist | `$board`, `$gates`, `$handoff`, `$web-research` | By AN-02 choice (counter-frameworks) |
| **4** | COND-04, MED-01 | Conductor, Mediator | `$board`, `$gates`, `$handoff` | — |
| **5** | COND-05, DS-01, LY-01, RG-01 | Conductor, Designer, Layouter, Conductor (RG) | `$board`, `$gates`, `$handoff`, `$report-design`, `$html-pdf-report` | — |

### Quick Pipeline (`/quick-insight`)
One session — no prompt needed (all gates are within a single session).

## Protocol

### Step 0 — Gathering State
1. Read the current `$board` state — all gates, statuses, deliverables.
2. Collect all completed artifacts of the current session.
3. Load the cumulative index from previous sessions (if any).
4. Determine the next gate and its requirements from `$gates`.
5. Use the "Session → Gates → Agents → Skills" mapping to determine what to output.

### Step 1 — Identifying Critical Data
1. Highlight data that is **irrecoverable** without previous context:

   | Category | Examples | Priority |
   |-----------|---------|:---------:|
   | User responses | Interview (INT-01), clarifications, decisions | 🔴 Critical |
   | Collected data | RES-xx data with URLs and sources | 🔴 Critical |
   | Analysis results | AN-xx frameworks, scoring, findings | 🔴 Critical |
   | Strategic recommendations | ST-xx strategy, action plan | 🔴 Critical |
   | Mediator's verdict | MED-01 conclusion, reasoning | 🔴 Critical |
   | User decisions | Approved, rejections, scope changes | 🟡 Important |
   | Progress metrics | Time per gate, blockers | 🟢 Nice-to-have |

2. **Rule:** All 🔴 Critical data is included **as full text**. No exceptions.

### Step 2 — Determining Agents and Skills
1. Use the mapping to determine: which agents and skills are needed in the next session.
2. Form a list of files to load (specific paths).
3. For framework skills: specify concrete skills if already known (from AN-01 or research brief).

### Step 3 — Forming the Prompt
1. Fill out the prompt template (6 blocks — see below).
2. Include the FULL text of critical data (no links, no summaries).
3. Formulate a specific task for the next session.
4. Specify which agents and skills to activate (specific file paths).

### Step 4 — Prompt Validation
Self-sufficiency test — for each point, answer "is it possible without external context?":

| # | Check | Result |
|---|----------|:---------:|
| 1 | Can work start with ONLY this prompt? | Yes / No |
| 2 | Are there no references to "previous context" / "as discussed"? | Yes / No |
| 3 | Is all 🔴 Critical data included as full text? | Yes / No |
| 4 | Is the task for the session specific (gate, action, deliverable)? | Yes / No |
| 5 | Are agents and skills listed with file paths? | Yes / No |
| 6 | Is the task board included? | Yes / No |
| 7 | Are open questions noted? | Yes / No |

**If at least one = No — refine the prompt.**

### Step 5 — Saving
1. Include the prompt in the `$handoff` file: `docs/analytics/session-N-handoff.md`.
2. Present the prompt to the user to save / copy.
3. Warn: "This is the prompt — insert it at the beginning of the next session."

### Step 6 — Emergency Mode
If the session ends abruptly (timeout, error, context loss):

1. **Immediately** save everything available: the board, the latest deliverable, open questions.
2. Form an **emergency prompt** (minimal version):
   - Block 1 (identification) — mandatory.
   - Block 5 (board state) — mandatory.
   - Block 4 (data) — everything that could be collected.
   - Block 6 (task) — "Restore context from session-N-handoff.md, check data integrity, continue from gate [ID]."
3. Mark the prompt as **⚠️ EMERGENCY — possible data loss**.
4. Indicate what data might have been lost and how to recover it (repeated `$web-research`, asking the user).

## Generated Prompt Structure

### Block 1 — Project Identification
- Project name.
- Pipeline mode (Full / Quick).
- Next session number.
- Which sessions are completed.

### Block 2 — Loading Instruction
- Read AGENTS.md of the analytics domain.
- Load agents needed in this session (from mapping).
- Load skills: `$board`, `$handoff`, `$gates` + gate-specific.
- Specific file paths.

### Block 3 — Completed Work (Summary)
- What was done in previous sessions (2-3 sentences per session).
- Key decisions and their reasoning.

### Block 4 — Critical Data
- FULL TEXT of key artifacts needed to continue.
- Research data, analysis findings, recommendations.
- User responses to the interview (if any).

### Block 5 — Current State
- Task board (`$board`) in its current state.
- What the next gate is.
- Open questions and blockers.

### Block 6 — Task for the Session
- Specific formulation: what needs to be done in this session.
- Expected result (deliverables).
- Constraints and specifics.

## Prompt Generation Rules

### Mandatory Rules
1. **Self-sufficiency** — the prompt must work without ANY previous context.
2. **Data completeness** — include FULL text, not links and not summaries.
3. **Task specificity** — not "continue analysis", but "execute RES-02: research [topic] from the Critics' perspective, Analysts' data: [data]".
4. **Structure** — clear blocks, marked with headings.
5. **Skill loading** — explicitly state which agents and skills to load with file paths.

### Forbidden Elements
1. Links to "previous session" without full content.
2. "As we discussed" — there is no context, nothing to discuss.
3. "See results above" — there is no "above", everything must be in the prompt.
4. Abbreviated data — "main findings: ...". ALL findings are needed.
5. Assumptions about context — "you already know that...".

## Example — Prompt for Session 3 (Team Beta: Critics)

```markdown
---
## Prompt for Session 3 — Analysis of EdTech Market RU

### 1. Project
- **Name:** Analysis of EdTech Market RU for corporate training
- **Mode:** Full Pipeline (/analyze)
- **Session:** 3 of 5
- **Previous Sessions:** 1 (Interview + Brief), 2 (Team Alpha: Research + Analysis + Strategy)

### 2. Loading
Read:
- `domains/analytics/AGENTS.md`
- `domains/analytics/.agents/skills/board/SKILL.md`
- `domains/analytics/.agents/skills/handoff/SKILL.md`
- `domains/analytics/.agents/skills/gates/SKILL.md`
- `domains/analytics/.agents/skills/web-research/SKILL.md`
- `domains/analytics/.agents/skills/competitive-analysis/SKILL.md`
- `domains/analytics/.agents/skills/porters-five-forces/SKILL.md`

Activate agents: Conductor (COND-03), Researcher (RES-02), Data Analyst (AN-02), Strategist (ST-02).
Role: **Team Beta (Critics)** — task: critique and alternative analysis of Team Alpha's results.

### 3. What is Completed
**Session 1:** Conducted interview, formed research brief (12 questions), defined scope: corporate training, B2B SaaS, RU, 3-year horizon. Evaluation mode: scoring.
**Session 2:** Team Alpha (Analysts) conducted research (28 sources), applied TAM/SAM/SOM + Competitive Analysis + PEST. Strategic recommendation: "AI-first corporate training platform, focus on 50-500 headcount companies."

### 4. Data (full text)

#### Research Brief (from INT-01)
1. What is the size of EdTech Market RU (TAM/SAM/SOM) for corporate training?
2. Who are the key competitors and what are their shares?
3. What technological trends are changing the market?
4. What regulatory factors affect EdTech?
[... all 12 questions ...]

#### Team Alpha Research Data (from RES-01)
**TAM:** $4.2B (EdTech RU, 2026). Source: Smart Ranking, Jan 2026 ✅
**SAM:** $1.8B (corporate training). Source: HSE, Mar 2026 ✅
**SOM:** $180M (B2B SaaS platforms). Source: calculation ⚠️ (2 sources instead of 3)

**Competitors:**
| Competitor | Share | Threat Score | Key Strength |
|-----------|------|-------------|---------------|
| Skillbox (B2B) | 15% | 7.2 | Brand, content |
| Netology | 12% | 6.8 | Corp. programs |
| Yandex Praktikum | 18% | 7.6 | Yandex Ecosystem |
[... full data ...]

#### Team Alpha Analysis Results (from AN-01, ST-01)
[FULL TEXT: TAM/SAM/SOM framework, Competitive Analysis, PEST, strategic recommendations]

### 5. Current State

#### Task Board
📊 Progress: 40% (6/15) | Session: 3/5 | Blockers: 0

| # | ID | Gate | Session | Status | Deliverable |
|---|----|------|:------:|:------:|-------------|
| 1 | COND-01 | Conductor | 1 | [✓] | Full Pipeline |
| 2 | INT-01 | Interviewer | 1 | [✓] | Brief: 12 questions |
| 3 | COND-02 | Conductor (s.2) | 2 | [✓] | Context loaded |
| 4 | RES-01 | Researcher (Alpha) | 2 | [✓] | 28 sources |
| 5 | AN-01 | Data Analyst (Alpha) | 2 | [✓] | 3 frameworks |
| 6 | ST-01 | Strategist (Alpha) | 2 | [✓] | AI-first strategy |
| 7 | COND-03 | Conductor (s.3) | 3 | [→] | — |
| 8 | RES-02 | Researcher (Beta) | 3 | [ ] | — |
| 9 | AN-02 | Data Analyst (Beta) | 3 | [ ] | — |
| 10 | ST-02 | Strategist (Beta) | 3 | [ ] | — |
[... remaining gates ...]

#### Open Questions
- ⚠️ SOM is calculated based on 2 sources (Alpha recommended verifying)

### 6. Task for Session 3
**Gates:** COND-03 → RES-02 → AN-02 → ST-02
**What to do:** Team Beta (Critics) must:
1. **RES-02:** Investigate the EdTech market from alternative perspectives. Check Alpha's data. Find counter-arguments. Verify SOM (find 3rd source).
2. **AN-02:** Apply alternative frameworks (Porter's 5 Forces, Blue Ocean). Find weaknesses in Alpha's analysis.
3. **ST-02:** Formulate an alternative strategy. Critique Alpha's strategy with reasoning.
**Expected Result:** Alternative package (data + analysis + strategy) for handoff to Mediator in session 4.

→ Start as Conductor (COND-03). Load the board, check Alpha's data, pass control to Researcher (RES-02).
---
```

## Validation (Quality Gate)

A prompt is considered correct if:

- [ ] The prompt is self-sufficient — work can start without external context
- [ ] Project name and mode are specified
- [ ] Session number and session history are specified
- [ ] Agents and skills to load are listed with file paths (from mapping)
- [ ] All 🔴 Critical data is included as full text
- [ ] Task board (`$board`) is included in its current state with metrics
- [ ] The next gate and task are formulated specifically (gate, action, deliverable)
- [ ] Open questions and blockers are noted
- [ ] No forbidden elements (links without content, abbreviations, assumptions)
- [ ] Validation test (7 points, step 4) — all "Yes"
- [ ] In emergency mode — prompt is marked ⚠️, lost data is indicated

## Handoff
The output of `$session-prompt-generator` is an input for:
- **Next session** — via user copying the prompt.
- **`$handoff`** — the prompt is included in the `docs/analytics/session-N-handoff.md` file.
- **`$board`** — the board state is saved in the prompt.

Handoff format: prompt in markdown, ready to be pasted at the beginning of the new session.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Prompt without research data | The next session will lose all collected facts | Include FULL text of data (🔴 Critical) |
| "Continue work" | No context on what to continue | Specific task: gate, action, deliverable |
| File links without content | Files might be inaccessible | Include content directly in the prompt |
| Prompt without task board | Unclear where we are in the pipeline | Always include `$board` with metrics |
| Abbreviated artifacts | Critical details are lost | Full text of every 🔴 Critical artifact |
| Skipping open questions | Problems will resurface | Note all blockers and questions |
| No loading instructions | The session will not load the needed agents | Mapping → specific file paths |
| Prompt > 50% "fluff" | Dilution of critical data | Structure: blocks, tables, specifics |
| Abnormal termination without prompt | Total loss of context | Emergency mode: minimal prompt + ⚠️ mark |

## Output Template

```markdown
---
## Prompt for Session [N+1] — [Project Name]

### 1. Project
- **Name:** [Name]
- **Mode:** Full Pipeline (/analyze)
- **Session:** [N+1] of 5
- **Previous Sessions:** 1-[N] completed

### 2. Loading
Read:
- `domains/analytics/AGENTS.md`
- `domains/analytics/.agents/skills/board/SKILL.md`
- `domains/analytics/.agents/skills/handoff/SKILL.md`
- `domains/analytics/.agents/skills/gates/SKILL.md`
- [Specific skills: file paths]

Activate agents: [List of agents with Gate IDs]

### 3. What is Completed
**Session 1:** [Summary 2-3 sentences]
**Session [N]:** [Summary 2-3 sentences]

**Key decisions:**
| # | Decision | Reasoning | Adopted by |
|---|---------|-------------|------------|
| 1 | [Decision] | [Why] | [User / Conductor] |

### 4. Data (full text)

#### Research Brief (from INT-01)
[FULL TEXT research brief]

#### Research Data (from RES-xx)
[FULL TEXT data with sources and URLs]

#### Analysis Results (from AN-xx)
[FULL TEXT frameworks and findings]

#### [Other artifacts as needed]
[FULL TEXT]

### 5. Current State

#### Task Board
[Full board from $board with progress metrics]

#### Open Questions
| # | Question / Blocker | Severity | For which gate |
|---|-----------------|:--------:|:----------------:|
| 1 | [Description] | 🔴/🟡/🟢 | [ID] |

### 6. Task for Session [N+1]
**Gates:** [ID list]
**What to do:** [Specific description per gate]
**Expected Result:** [Deliverables]
**Constraints:** [If any]

→ Start as Conductor (COND-xx). Load the board, check the data, pass control to [next agent].
---
```

### Emergency Prompt (minimal version)

```markdown
---
## ⚠️ EMERGENCY PROMPT — Session [N+1] — [Project Name]

**Status:** Session [N] terminated abnormally. Possible data loss.

### What is Saved
[Everything collected: board, latest deliverable, questions]

### What might be lost
| # | Data | Recovery Method |
|---|--------|-----------------------|
| 1 | [Lost data] | [Repeated web-research / ask user / recover from handoff] |

### Task
Restore context from `docs/analytics/session-[N]-handoff.md`. Check data integrity. Continue from gate [ID].

→ Start as Conductor (COND-xx). Priority: verify data integrity before continuing.
---
```
