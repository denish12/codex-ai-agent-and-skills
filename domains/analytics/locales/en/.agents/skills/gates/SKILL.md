---
name: gates
description: Analytics pipeline gate quality control — pass criteria, checklists, blockers
---
# Gates — Analytics Pipeline Gate Quality Control

## When to Use
- **Before every transition** between gates — verifying the current gate's deliverable.
- **On return for rework** — re-verification after corrections.
- **At session completion** — verifying completeness of materials before cross-session `$handoff`.
- **When readiness is disputed** — formal arbiter: what is done and what is not.

> **Distinction from `$board`:** `$gates` verifies **quality and completeness** of deliverables. `$board` tracks **status and progress**. Gates answers "is it ready?", Board answers "where are we now?".

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Gate name | ✅ | Which gate we are checking (with ID: COND-01, INT-01, etc.) |
| Pipeline mode | ✅ | Full (`/analyze`) / Quick (`/quick-insight`) — determines gate set and criteria |
| Gate deliverables | ✅ | Artifacts the agent submits for review |
| Iteration | ⬚ | If re-check — iteration number + previous gaps |
| Session number | ⬚ | Current session (for Full Pipeline) |

## Gate Registry and Deliverables

### Full Pipeline (`/analyze`, 5 sessions)

| # | Gate | ID | Agent | Session | Required Deliverables | Skills |
|---|------|----|-------|---------|----------------------|--------|
| 1 | **Conductor** | COND-01 | Conductor | 1 | Mode determined, task scope, board created | `$board` |
| 2 | **Interviewer** | INT-01 | Interviewer | 1 | Context collected, evaluation mode chosen (scoring/qualitative), research brief | `$handoff` |
| 3 | **Researcher (Analysts)** | RES-01 | Researcher | 2 | Data collected, sources verified, minimum sources met | `$web-research` |
| 4 | **Data Analyst (Analysts)** | AN-01 | Data Analyst | 2 | Frameworks applied, methodology documented | Framework skills |
| 5 | **Strategist (Analysts)** | ST-01 | Strategist | 2 | Recommendations actionable, tied to evidence | — |
| 6 | **Researcher (Critics)** | RES-02 | Researcher | 3 | Alternative data, critique of Analyst data, sources verified | `$web-research` |
| 7 | **Data Analyst (Critics)** | AN-02 | Data Analyst | 3 | Alternative analysis, counter-frameworks | Framework skills |
| 8 | **Strategist (Critics)** | ST-02 | Strategist | 3 | Alternative strategy, critique of Analyst strategy | — |
| 9 | **Mediator** | MED-01 | Mediator | 4 | Both teams evaluated, scoring/qualitative completed, final conclusion | `$gates` |
| 10 | **Designer** | DS-01 | Designer | 5 | Report structure approved, visualization specifications | — |
| 11 | **Layouter** | LY-01 | Layouter | 5 | HTML generated, formatting validated | — |
| 12 | **Release Gate** | RG-01 | Conductor | 5 | All gates passed, PDF generated | `$board`, `$gates` |

### Quick Pipeline (`/quick-insight`, 1 session)

| # | Gate | ID | Agent | Required Deliverables |
|---|------|----|-------|----------------------|
| 1 | **Conductor** | COND-01 | Conductor | Mode determined, task scope, board created |
| 2 | **Interviewer** | INT-01 | Interviewer | Context collected, evaluation mode chosen |
| 3 | **Researcher** | RES-01 | Researcher | Data collected, sources verified |
| 4 | **Data Analyst** | AN-01 | Data Analyst | Frameworks applied |
| 5 | **Strategist** | ST-01 | Strategist | Recommendations actionable |
| 6 | **Mediator** | MED-01 | Mediator | Final conclusion (without competing teams) |
| 7 | **Designer** | DS-01 | Designer | Report structure, visualizations |
| 8 | **Layouter** | LY-01 | Layouter | HTML generated, PDF ready |

## Readiness Criteria by Gate

### Conductor (COND-xx)
- [ ] Pipeline mode determined and justified (Full / Quick)
- [ ] Task scope formulated (what we analyze, purpose, constraints)
- [ ] Board created via `$board` with correct gate IDs
- [ ] First gate activated
- [ ] For continuing sessions: previous handoff loaded and verified

### Interviewer (INT-xx)
- [ ] User context collected (business question, industry, company size, goals)
- [ ] Evaluation mode chosen: scoring (quantitative) or qualitative
- [ ] Research brief formed with specific research questions
- [ ] Key metrics / evaluation criteria defined
- [ ] Scope fixed — what is included and what is NOT included in the analysis

### Researcher (RES-xx)
- [ ] Data collected for all research brief questions
- [ ] Web search performed via `$web-research` (mandatory)
- [ ] Sources verified: each data point has URL, date, confidence level
- [ ] Minimum sources met (set in research brief, default >= 3 per thesis)
- [ ] Cross-verification: 2+ sources for key data
- [ ] Conflicting data flagged and explained
- [ ] Data is current: market data — no older than 12 months, regulatory — current version

### Data Analyst (AN-xx)
- [ ] Frameworks chosen with justification (at least 2 for Full Pipeline)
- [ ] Each framework applied correctly — all sections completed
- [ ] Methodology documented: why this framework, what data was used
- [ ] Researcher data linked to conclusions (not "in our opinion" but "according to [source]")
- [ ] Patterns and insights explicitly highlighted

### Strategist (ST-xx)
- [ ] Recommendations are actionable — specific actions, not general advice
- [ ] Each recommendation linked to evidence from Data Analyst / Researcher
- [ ] Recommendations prioritized (impact / effort or similar matrix)
- [ ] Risks identified for each recommendation
- [ ] Time horizons specified (short-term / mid-term / long-term)

### Mediator (MED-xx)
- [ ] Both teams' results received (for Full Pipeline) or single team's (Quick)
- [ ] Scoring or qualitative evaluation performed (per mode chosen in INT-01)
- [ ] For scoring: criteria and weights defined, scores justified
- [ ] For qualitative: arguments from both sides compared, conflicts resolved
- [ ] Final conclusion formulated with justification
- [ ] Strengths of each team highlighted

### Designer (DS-xx)
- [ ] Report structure approved (table of contents, sections, order)
- [ ] Visualization specifications defined (chart types, data, palette)
- [ ] Layout aligned with Mediator content
- [ ] Branding / styling defined

### Layouter (LY-xx)
- [ ] HTML generated per Designer layout
- [ ] All visualizations rendered
- [ ] Formatting validated (spacing, fonts, tables)
- [ ] PDF generated and reviewed

### Release Gate (RG-xx)
- [ ] All previous gates passed (status `[✓]` on `$board`)
- [ ] PDF report generated and reviewed
- [ ] Data is current as of the report date
- [ ] User sign-off obtained

## Criteria Severity

| Severity | Definition | Impact on Decision |
|----------|-----------|-------------------|
| Blocker | Required deliverable is missing or critically incomplete | FAIL — return for rework |
| Gap | Deliverable exists but is incomplete or has remarks | CONDITIONAL PASS — can be handed off, but gaps are recorded |
| Note | Minor remark, does not affect transition | PASS — remark passed to the next gate as context |

## Decisions

| Decision | Condition | Action |
|----------|----------|--------|
| **PASS** | 0 Blocker + 0 Gap | Request user Approved → `$handoff` → next gate |
| **CONDITIONAL PASS** | 0 Blocker + 1-2 Gap | Record gaps → Request user Approved with notation → `$handoff` with notation |
| **FAIL** | >= 1 Blocker | Return to agent with specific gap list → Do not request Approved |

> **Absolute rule:** Never skip gates, even if the task seems simple. FAIL — rework — re-check. No exceptions.

### Special Rules for Data Verification
- Researcher gates (RES-xx): absence of `$web-research` — **automatic Blocker**.
- Data without a source — **Blocker** (not Gap, not Note).
- Data older than 12 months (market data) — **Gap** with notation "requires update".

## Protocol

### Step 0 — Load Context
1. Determine which gate we are checking (by ID from `$board`).
2. Determine the pipeline mode (Full / Quick) and session number.
3. Load readiness criteria for this gate from the registry.
4. If re-check — load previous iteration gaps.

### Step 1 — Verify Deliverables
1. For each readiness criterion — check: met / not met / N/A.
2. For each unmet criterion — assign severity (Blocker / Gap / Note).
3. For each unmet criterion — describe the specific gap: what exactly is missing / what to fix.

### Step 2 — Make Decision
1. Count severities.
2. Apply decision rules (PASS / CONDITIONAL PASS / FAIL).
3. Add an entry to the check log.

### Step 3 — Act on Result
- **PASS:** show to user → request Approved → `$handoff` → update `$board`.
- **CONDITIONAL PASS:** show gaps → request Approved with gap acknowledgment → `$handoff` with notation → update `$board`.
- **FAIL:** show gaps → return to agent → update `$board` (status `[↩] Returned`).

## Validation (Quality Gate)

Gate check is considered complete if:

- [ ] All readiness criteria evaluated (met / not met / N/A — no blanks)
- [ ] For each unmet criterion: severity, gap description, and fix instructions provided
- [ ] Decision follows the rules (not subjective)
- [ ] Check log updated
- [ ] For PASS/CONDITIONAL PASS — user Approved obtained
- [ ] `$board` updated
- [ ] For Researcher gates: `$web-research` verified

## Handoff
The `$gates` result is input for: `$handoff` (attaching gate check to the envelope).

## Anti-patterns

| Mistake | Why It's Bad | How to Do It Right |
|---------|-------------|-------------------|
| Skipping a gate "because it's simple" | Errors pass unnoticed | Never skip. No exceptions |
| PASS without checking all criteria | Unnoticed gaps | Each criterion = met / not met / N/A |
| "Generally OK" instead of specifics | Agent doesn't know what to fix | Specific gap: "source X doesn't contain publication date" |
| FAIL without gap description | Agent returns and doesn't know what to do | Every FAIL = list of specific rework items |
| Approved without user sign-off | Protocol violation | Always get explicit Approved from the user |
| Researcher data without web search | Unverified data in the report | `$web-research` — mandatory, its absence = Blocker |
| Equal importance for all criteria | Minor issue blocks, critical one passes | Severity: Blocker / Gap / Note |
| Re-check without comparing to gaps | Gap may not have been fixed | Load previous iteration gaps, verify each one |

## Output Template

```
### Gate Check — [ID] [Gate Name]

**Mode:** [Full / Quick]
**Session:** [N of M]
**Iteration:** [1 / 2 / N]
**Previous gaps:** [list or "First check"]

---

#### Readiness Criteria

| # | Criterion | Sev | Status | Gap / Comment |
|---|----------|-----|--------|---------------|
| 1 | [Criterion from registry] | Blocker | met/not met | |
| 2 | [Criterion from registry] | Blocker | met/not met | |
| 3 | [Criterion from registry] | Gap | met/not met | |
| 4 | [Criterion from registry] | Note | met/not met/N/A | |

---

#### Summary

| Severity | Count | Items |
|----------|-------|-------|
| Blocker | [N] | #[list] |
| Gap | [N] | #[list] |
| Note | [N] | #[list] |

### Decision: [ PASS / CONDITIONAL PASS / FAIL ]

**Rationale:** [per rules: 0 blocker + 0 gap = PASS]

---

#### On PASS / CONDITIONAL PASS:
**Deliverables for handoff:**
- [Artifact 1]
- [Artifact 2]

**Gaps for the next gate (if CONDITIONAL):**
- [Gap 1 — what to consider]

→ Ready for handoff to **[Next agent]**. Awaiting **"Approved"**.

#### On FAIL:
**Gaps for rework:**

| # | Gap | Sev | What to Fix | Owner |
|---|-----|-----|-------------|-------|
| [N] | [description] | Blocker | [specific action] | [agent] |

→ Return to **[Current agent]**. After fix — re-check (iteration [N+1]).
```
