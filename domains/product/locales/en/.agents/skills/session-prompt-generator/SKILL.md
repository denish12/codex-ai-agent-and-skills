---
name: session-prompt-generator
description: Generating a ready-to-paste prompt for the next session — context, role, tasks, inputs, expected outputs
---
# Session Prompt Generator — Generating a Prompt for the Next Session

## When to Use
- At the **end of a session** in Full Pipeline A (`/ship-right-thing`) or Full Pipeline B (`/shape-prioritize`) — before an inter-session `$handoff`.
- When **handing the project to another operator** — forming a self-contained prompt.
- When the **user requests** «generate a prompt to continue» — at any point.
- During **emergency session termination** — preserving maximum context for recovery.

> **Key principle:** the next session starts from **ZERO** context. The prompt must contain everything necessary for a new session to continue without loss.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| `$board` state | ✅ | Current task board with all statuses |
| Completed deliverables | ✅ | Complete artifacts from current and previous sessions |
| Current gate | ✅ | Where we stopped (gate ID from `$board`) |
| Next gate | ✅ | Where we are going (next gate ID) |
| Adversarial camp | ⬚ | For Full A: Customer-Champion (α) / Business-Champion (β). For Full B: Build-Camp (α) / Cut-Camp (β). Determines artifact filtering |
| Open questions | ⬚ | Blockers, unresolved conflicts, questions for the user |
| Current session number | ✅ | Which session is ending (1-6) |
| Initiative name | ✅ | Name of the product initiative |

### Related Skills
| Skill | Interaction | When |
|-------|-------------|------|
| `$board` | Source: current board state is included in the prompt (block 5) | Step 0 |
| `$handoff` | Prompt is included in the inter-session handoff file | Step 5 |
| `$gates` | Source: next gate requirements define the task (block 6) | Step 0 |
| Framework skills | Completed frameworks ($prd-template, $rice-scoring etc.) included in full text in block 4 | Step 1 |

## Session → Gates → Agents → Skills Mapping

### Full Pipeline A (`/ship-right-thing`, Customer-vs-Business)

| Session | Gates | Agents | Required Skills | Framework Skills |
|:-------:|-------|--------|----------------|-----------------|
| **1** | COND-01, DISC-01 | Conductor, Discovery | `$board`, `$gates`, `$handoff` | `$jtbd-canvas`, `$problem-statement`, `$assumption-mapping`, `$user-interview-script` |
| **2** | COND-02, STRAT-01α | Conductor, Product Strategist (Customer-Champion) | `$board`, `$gates`, `$handoff` | `$product-vision`, `$okr-framework`, `$north-star-metric`, `$product-roadmap` |
| **3** | COND-03, STRAT-02β | Conductor, Product Strategist (Business-Champion) | `$board`, `$gates`, `$handoff` | (same skills, business lens) |
| **4** | COND-04, MED-01 | Conductor, Mediator | `$board`, `$gates`, `$handoff` | — |
| **5** | COND-05, PM-SPEC, UX-01, TECH-01, DATA-01 | Conductor, PM, UX Designer, Tech Lead, Data Analyst | `$board`, `$gates`, `$handoff` | `$prd-template`, `$user-story`, `$acceptance-criteria`, `$user-flow`, `$design-brief`, `$epic-breakdown`, `$hypothesis-template`, `$saas-metrics`, `$ab-test-design` |
| **6** | COND-06, DS-01, LY-01, RG-01 | Conductor, Designer, Layouter | `$board`, `$gates`, `$handoff`, `$report-design`, `$html-pdf-report`, `$launch-checklist` | — |

### Full Pipeline B (`/shape-prioritize`, Build-vs-Cut)

| Session | Gates | Agents | Required Skills | Framework Skills |
|:-------:|-------|--------|----------------|-----------------|
| **1** | COND-01, DISC-01 | Conductor, Discovery | `$board`, `$gates`, `$handoff` | `$problem-statement`, `$assumption-mapping` |
| **2** | COND-02, PM-01α, TECH-01α | Conductor, PM (Build-Camp), Tech Lead (Build-Camp) | `$board`, `$gates`, `$handoff` | `$rice-scoring`, `$kano-model`, `$epic-breakdown` |
| **3** | COND-03, PM-02β, TECH-02β | Conductor, PM (Cut-Camp), Tech Lead (Cut-Camp) | `$board`, `$gates`, `$handoff` | `$moscow-prioritization`, `$wsjf-scoring`, `$epic-breakdown` |
| **4** | COND-04, MED-01 | Conductor, Mediator | `$board`, `$gates`, `$handoff` | — |
| **5** | COND-05, PM-SPEC, UX-01, DATA-01 | Conductor, PM, UX Designer, Data Analyst | `$board`, `$gates`, `$handoff` | `$prd-template`, `$user-story`, `$acceptance-criteria`, `$saas-metrics` |
| **6** | COND-06, DS-01, LY-01, RG-01 | Conductor, Designer, Layouter | `$board`, `$gates`, `$handoff`, `$report-design`, `$html-pdf-report` | — |

### Quick Pipeline (`/quick-pm`) and Spec (`/spec`)
Single session — prompt not needed (all gates within one session).

## Protocol

### Step 0 — State Collection
1. Read the current `$board` state — all gates, statuses, deliverables.
2. Collect all completed artifacts from the current session.
3. Load the cumulative index from previous sessions (if available).
4. Determine the next gate and its requirements from `$gates`.
5. For Full A/B — determine the next session's camp (α / β / Mediator-neutral).
6. Using the «Session → Gates → Agents → Skills» mapping determine what to load.

### Step 1 — Identifying Critical Data
1. Identify data that is **unrecoverable** without previous context:

   | Category | Examples | Priority |
   |----------|---------|:--------:|
   | User responses | Discovery interviews (DISC-01), clarifications, decisions | 🔴 Critical |
   | JTBD canvas / problems | Canvas, top 3 problem statements | 🔴 Critical |
   | Evidence quotes | Verbatim customer quotes | 🔴 Critical |
   | Strategy Briefs (Full A) | Alpha + Beta strategy | 🔴 Critical |
   | Scope proposals (Full B) | Build + Cut proposals | 🔴 Critical |
   | Mediator synthesis | Unified strategy / scope + rationale | 🔴 Critical |
   | PRD content | User stories + AC | 🔴 Critical |
   | User decisions | Approved, rejections, scope changes | 🟡 Important |
   | Progress metrics | Time on gates, blockers | 🟢 Nice-to-have |

2. **Rule:** all 🔴 Critical data is included in **full text**. No exceptions.
3. **Adversarial filter (Full A/B):** if the next session is the opposing camp (Beta after Alpha, before Mediator), opposing camp artifacts are **EXCLUDED** from the prompt. This is a direct consequence of the camp independence rule.

### Step 2 — Identifying Agents and Skills
1. Using the mapping determine: which agents and skills are needed in the next session.
2. Form a list of files to load (specific paths).
3. For framework skills: specify the concrete skills if already known (from Strategy Brief or PRD).

### Step 3 — Forming the Prompt
1. Fill in the prompt template (6 blocks — see below).
2. Include FULL TEXT of critical data (not links, not summaries).
3. Formulate a specific task for the next session.
4. Specify which agents and skills to activate (specific file paths).
5. For Full A/B — explicitly state the camp (Alpha / Beta / neutral).

### Step 4 — Prompt Validation
Self-sufficiency test — for each point answer «can this be done without external context?»:

| # | Check | Result |
|---|-------|:------:|
| 1 | Can work begin having ONLY this prompt? | Yes / No |
| 2 | No references to «previous context» / «as discussed»? | Yes / No |
| 3 | All 🔴 Critical data included in full text? | Yes / No |
| 4 | Session task is specific (gate, action, deliverable)? | Yes / No |
| 5 | Agents and skills listed with file paths? | Yes / No |
| 6 | Task board included? | Yes / No |
| 7 | Open questions recorded? | Yes / No |
| 8 | Camp explicitly stated (Full A/B)? | Yes / No |
| 9 | Opposing camp artifacts excluded (Full A/B)? | Yes / No |

**If even one = No — revise the prompt.**

### Step 5 — Saving
1. Include the prompt in the `$handoff` file: `docs/product/session-N-handoff.md`.
2. Show the prompt to the user for saving / copying.
3. Warn: «This prompt — paste it at the start of the next session».

### Step 6 — Emergency Mode
If the session terminates unexpectedly (timeout, error, context loss):

1. **Immediately** save everything available: board, last deliverable, open questions.
2. Form an **emergency prompt** (minimum version):
   - Block 1 (identification) — required.
   - Block 5 (board state) — required.
   - Block 4 (data) — everything that could be collected.
   - Block 6 (task) — «Restore context from session-N-handoff.md, verify data integrity, continue from gate [ID]».
3. Mark the prompt as **⚠️ EMERGENCY — possible data loss**.
4. Indicate which data might have been lost and how to recover (repeat user interview, request from user).

## Generated Prompt Structure

### Block 1 — Initiative Identification
- Initiative name.
- Pipeline mode (/ship-right-thing / /shape-prioritize).
- Next session number.
- Which sessions are complete.
- Next session camp (Alpha / Beta / Mediator-neutral / —).

### Block 2 — Loading Instructions
- Read `domains/product/AGENTS.md`.
- Load agents needed in this session (from mapping).
- Load skills: `$board`, `$handoff`, `$gates` + gate-specific ones.
- Specific file paths.

### Block 3 — Work Completed (summary)
- What was done in previous sessions (2-3 sentences per session).
- Key decisions and their rationale.

### Block 4 — Critical Data
- FULL TEXT of key artifacts needed to continue.
- Discovery Brief, JTBD canvas, Strategy Briefs, Mediator synthesis.
- User responses to interviews (if any).
- **Camp filter:** opposing camp artifacts excluded (Full A/B, before Mediator).

### Block 5 — Current State
- Task board (`$board`) in current state.
- Which gate is next.
- Open questions and blockers.

### Block 6 — Session Task
- Specific formulation: what needs to be done in this session.
- Expected outcome (deliverables).
- Constraints and specifics (camp lens for Full A/B).

## Prompt Formation Rules

### Required Rules
1. **Self-sufficiency** — the prompt must work without ANY previous context.
2. **Data completeness** — include FULL text, not links and not summaries.
3. **Task specificity** — not «continue work», but «execute STRAT-02β: form Business-Champion Strategy Brief based on Discovery Brief, ignore Camp Alpha artifacts».
4. **Structure** — clear blocks, marked with headings.
5. **Skills loading** — explicitly state which agents and skills to load with file paths.
6. **Adversarial independence** — for Full A/B when handing off to opposing camp: explicitly record artifact exclusion.

### Prohibited Elements
1. References to «previous session» without full content.
2. «As we discussed» — no context, nothing was discussed.
3. «See results above» — there is no «above», everything must be in the prompt.
4. Abbreviated data — «key conclusions: ...». ALL conclusions are needed.
5. Assumptions about context — «you already know that...».
6. In Full A/B: mixing artifacts from different camps before Mediator.

## Example — Prompt for Session 3 (TeamFlow, `/ship-right-thing`, Beta Camp: Business-Champion)

**Context:** TeamFlow (B2B SaaS HR-tech, $8M ARR). Initiative: AI-powered 1:1 summarization. Session 2 complete — Camp Alpha (Customer-Champion) formed their Strategy Brief. Session 3: Camp Beta (Business-Champion). KEY: Alpha artifacts are EXCLUDED.

```
---
## Prompt for Session 3 — AI-powered 1:1 Summarization (TeamFlow)

### 1. Initiative
- **Name:** AI-powered 1:1 note summarization for TeamFlow
- **Mode:** Full Pipeline A (/ship-right-thing)
- **Session:** 3 of 6
- **Camp:** **Beta — Business-Champion**
- **Previous sessions:** 1 (Discovery Brief), 2 (Strategy Brief Alpha: Customer-Champion, EXCLUDED from this prompt)

### 2. Loading
Read:
- `domains/product/AGENTS.md`
- `domains/product/.agents/skills/board/SKILL.md`
- `domains/product/.agents/skills/handoff/SKILL.md`
- `domains/product/.agents/skills/gates/SKILL.md`
- `domains/product/.agents/skills/product-vision/SKILL.md`
- `domains/product/.agents/skills/okr-framework/SKILL.md`
- `domains/product/.agents/skills/north-star-metric/SKILL.md`
- `domains/product/.agents/skills/product-roadmap/SKILL.md`
- `domains/product/agents/product_strategist.md`
- `domains/product/agents/conductor.md`

Activate: Conductor (COND-03), Product Strategist (STRAT-02β).
Role: **Business-Champion (β)** — focus on revenue, margin, competitive moat, strategic positioning. Do NOT play Customer-Champion.

### 3. What Was Done
**Session 1:** Discovery. Conducted 8 customer interviews (4 buyer VP HR + 4 end-user managers). JTBD canvas (buyer + end-user separately). Top 3 problem statements. Assumption map (12 assumptions, 4 high-risk).
**Session 2:** Camp Alpha (Customer-Champion) formed their Strategy Brief. **IMPORTANT:** this brief is NOT passed to you until MED-01 (Step 4). You work independently, based on Discovery Brief ONLY.

**Key decisions:**
| # | Decision | Rationale | Who decided |
|---|---------|-----------|-------------|
| 1 | Focus on mid-market + enterprise (not SMB) | SMB pays less + higher churn | User, Session 1 |
| 2 | Adversarial: Customer vs Business | High-stakes initiative, two perspectives insufficient | User, Session 1 |

### 4. Data (full text, with camp filtering)

#### Discovery Brief (from DISC-01 / session-1-handoff.md)

**ICP:**
- Firmographic: B2B SaaS / Tech companies, 100-500 employees, $5M-$50M ARR
- Buyer persona: VP People/HR, 5-10 years experience, reports to CEO/COO
- End-user persona: People managers (5-15 direct reports), some ICs in structured programs
- Geographic: US (60%) + EU (30%) + APAC (10%)

**JTBD (buyer = VP HR):**
- **Functional:** «Ensure every manager runs consistently high-quality 1:1s across org»
- **Emotional:** «Feel confident that people development does not depend on individual manager skill»
- **Social:** «Be seen as data-driven People leader by CEO»

**JTBD (end-user = manager):**
- **Functional:** «Capture 1:1 discussion and not lose action items between meetings»
- **Emotional:** «Feel prepared without spending 30 min before each 1:1»
- **Social:** «Be seen as supportive manager by reports»

**Top 3 Problem Statements:**
1. Managers with 5+ reports spend 45-60 min/week on prep + note-taking, 30% of them acknowledge burnout from admin overhead. Evidence: 6 of 8 interviews + 120 support tickets Q1 2026.
2. VP HR has no visibility into 1:1 quality/frequency across org — relying on self-report + anecdote. Evidence: 3 of 4 buyer interviews.
3. Action items from 1:1s are not completed in 40% of cases (by self-report), often forgotten. Evidence: 5 of 8 end-user interviews + internal product analytics (action items marked completed vs total created).

**Top 4 High-Risk Assumptions:**
- **Value (V1):** Customers will pay $5-15/seat/month premium for AI summarization feature. Uncertainty 4, Impact 5, Risk 20.
- **Feasibility (F1):** LLM summarization quality acceptable (no hallucinations) for sensitive HR conversations. Uncertainty 4, Impact 5, Risk 20.
- **Viability (Vi1):** Privacy / GDPR / SOC2 compliance implications manageable for HR data ingestion. Uncertainty 3, Impact 5, Risk 15.
- **Usability (U1):** Managers will trust AI summaries enough to use them instead of manual notes. Uncertainty 4, Impact 4, Risk 16.

**Evidence Inventory:** 8 interviews (verbatim quotes attached in session-1-handoff.md), 120 support tickets Q1 2026, internal product analytics, competitor feature comparison (Lattice, 15Five, Culture Amp).

**Open Questions:**
- Pricing model: per-seat premium vs bundled vs usage-based?
- Build vs Buy for LLM (OpenAI vs fine-tuned open-source)?
- Scope: just 1:1s or all meetings (team meetings, reviews)?

**🚫 Camp Alpha Strategy Brief — EXCLUDED from prompt (independence rule).**

### 5. Current State

#### Task Board
📊 Progress: 29% (5/17) | Session: 3/6 | Blockers: 0

| # | ID | Gate | Session | Camp | Status | Deliverable |
|---|-----|------|:-------:|:----:|:------:|-------------|
| 1 | COND-01 | Conductor | 1 | — | [✓] | Mode /ship-right-thing |
| 2 | DISC-01 | Discovery | 1 | — | [✓] | Discovery Brief |
| 3 | COND-02 | Conductor (s.2) | 2 | — | [✓] | Camp Alpha assigned |
| 4 | STRAT-01α | Customer-Champion | 2 | α | [✓] | Strategy Brief Alpha (EXCLUDED) |
| 5 | COND-03 | Conductor (s.3) | 3 | — | [→] | — |
| 6 | STRAT-02β | Business-Champion | 3 | β | [ ] | — |
| 7-17 | ... | ... | 4-6 | ... | [ ] | — |

#### Open Questions
- Pricing model (buyer interview gave no clear signal)
- LLM build vs buy

### 6. Session 3 Task (Beta Camp)

**Gates:** COND-03 → STRAT-02β

**What to do (Business-Champion lens):**
1. **COND-03 (Conductor):** Load Discovery Brief, assign Camp Beta role explicitly. Verify Camp Alpha artifacts EXCLUDED (independence check).
2. **STRAT-02β (Product Strategist):** Form Business-Champion Strategy Brief:
   - **Vision** — business outcome frame («help companies measurably improve manager effectiveness and retain talent»)
   - **NSM** — business-value metric (example: «ARR from accounts with AI summarization enabled on >60% teams»)
   - **OKR** — quarterly goals with revenue / NRR / competitive moat emphasis
   - **Roadmap** — themes with business ROI rationale
   - **Pricing hypothesis** — specific model (per-seat premium? usage-based?)

**Expected outcome:**
`strategy-brief-beta.md` (~800-1200 words) with explicit business-lens argument. Include:
- Why now (market timing)
- Revenue impact model (3-year forecast scenarios)
- Competitive moat angle
- NRR / expansion story

**Constraints:**
- **DO NOT** pretend to play Customer-Champion lens
- **DO NOT** request Camp Alpha artifacts (they're held by Conductor until MED-01)
- Mediator (MED-01, Session 4) synthesizes — your task is to present the sharpest business case

→ Start as Conductor (COND-03). Verify camp isolation, activate Product Strategist (β). Pass Discovery Brief (ONLY) as input.
---
```

## Validation (Quality Gate)

A prompt is considered correct if:

- [ ] Prompt is self-contained — work can begin without external context
- [ ] Initiative name and mode stated
- [ ] Session number and session history stated
- [ ] Camp explicitly stated (Full A/B)
- [ ] Agents and skills for loading listed with file paths (from mapping)
- [ ] All 🔴 Critical data included in full text
- [ ] Task board (`$board`) included in current state with metrics
- [ ] Next gate and task formulated specifically (gate, action, deliverable)
- [ ] Camp filter applied: opposing camp artifacts explicitly excluded (Full A/B, before Mediator)
- [ ] Open questions and blockers recorded
- [ ] No prohibited elements (references without content, abbreviations, assumptions)
- [ ] Validation test (9 points, step 4) — all «Yes»
- [ ] In emergency mode — prompt marked ⚠️, lost data indicated

## Handoff
The result of `$session-prompt-generator` is input for:
- **Next session** — via user copying the prompt.
- **`$handoff`** — prompt included in `docs/product/session-N-handoff.md` file.
- **`$board`** — board state saved in the prompt.

Transfer format: prompt in markdown, ready to paste at the start of a new session.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|-------------------|
| Prompt without Discovery data | Next session loses customer-centric foundation | Include FULL text of Discovery Brief |
| «Continue work» | No context, nothing to continue from | Specific task: gate, action, deliverable |
| File references without content | Files may be unavailable | Include content directly in the prompt |
| Prompt without task board | Unclear where we are in the pipeline | Always include `$board` with metrics |
| Abbreviated artifacts | Loss of critical details | Full text of each 🔴 Critical artifact |
| Skipping open questions | Problems will resurface | Record all blockers and questions |
| No loading instructions | Session won't load needed agents | Mapping → specific file paths |
| Prompt > 50% «filler» | Dilutes critical data | Structure: blocks, tables, specifics |
| Emergency termination without prompt | Total context loss | Emergency mode: minimal prompt + ⚠️ mark |
| Camp contamination in prompt | Opposing camp artifacts enter prompt → independence violated | Explicit filter + note «EXCLUDED» for missing artifacts |

## Output Template

```
---
## Prompt for Session [N+1] — [Initiative Name]

### 1. Initiative
- **Name:** [Name]
- **Mode:** [/ship-right-thing | /shape-prioritize]
- **Session:** [N+1] of 6
- **Camp:** [Alpha (Customer/Build) | Beta (Business/Cut) | Mediator-neutral | —]
- **Previous sessions:** 1-[N] complete

### 2. Loading
Read:
- `domains/product/AGENTS.md`
- `domains/product/.agents/skills/board/SKILL.md`
- `domains/product/.agents/skills/handoff/SKILL.md`
- `domains/product/.agents/skills/gates/SKILL.md`
- [Specific skills: file paths]

Activate agents: [List of agents with gate IDs]

Role: **[Camp]** — [description of lens: focus on X, do not do Y]

### 3. What Was Done
**Session 1:** [Summary 2-3 sentences]
**Session [N]:** [Summary 2-3 sentences]

**Key decisions:**
| # | Decision | Rationale | Who decided |
|---|---------|-----------|-------------|
| 1 | [Decision] | [Why] | [User / Conductor] |

### 4. Data (full text, with camp filtering)

#### Discovery Brief (from DISC-01)
[FULL TEXT]

#### Strategy Briefs (if Mediator Session)
#### Alpha: [FULL TEXT]
#### Beta: [FULL TEXT]

#### [Other artifacts as needed]
[FULL TEXT]

**🚫 Excluded (camp filter):**
- [Opposing camp artifacts, if applicable]

### 5. Current State

#### Task Board
[Full board from $board with progress metrics]

#### Open Questions
| # | Question / Blocker | Severity | For which gate |
|---|-------------------|:--------:|:--------------:|
| 1 | [Description] | 🔴/🟡/🟢 | [ID] |

### 6. Session [N+1] Task
**Gates:** [ID list]
**What to do:** [Specific description per gate + camp lens]
**Expected outcome:** [Deliverables]
**Constraints:** [Camp independence rules, DO NOT do, DO NOT request]

→ Start as Conductor (COND-xx). Load board, verify camp isolation, pass control to [next agent].
---
```

### Emergency Prompt (minimum version)

```
---
## ⚠️ EMERGENCY PROMPT — Session [N+1] — [Initiative Name]

**Status:** Session [N] terminated abnormally. Data loss possible.

### What Was Saved
[Everything that could be collected: board, last deliverable, questions]

### What May Have Been Lost
| # | Data | Recovery Method |
|---|------|-----------------|
| 1 | [What was lost] | [Repeat interview / request from user / restore from handoff] |

### Task
Restore context from `docs/product/session-[N]-handoff.md`. Verify data integrity. For Full A/B — verify camp isolation. Continue from gate [ID].

→ Start as Conductor (COND-xx). Priority: data integrity verification before continuing.
---
```
