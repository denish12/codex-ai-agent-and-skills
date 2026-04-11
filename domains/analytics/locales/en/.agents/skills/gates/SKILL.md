---
name: gates
description: Quality control of analytical pipeline gates — passing criteria, checklists, blockers
---
# Gates — Quality Control of Analytical Pipeline Gates

## When to use
- **Before every transition** between gates — to check the deliverable of the current gate.
- **Upon return for revision** — for re-checking after fixes are made.
- **At the end of a session** — to verify the completeness of materials prior to the inter-session `$handoff`.
- **In case of readiness disputes** — as a formal arbitrator: what is done and what is not.

> **Distinction from `$board`:** `$gates` checks **quality and completeness** of a deliverable. `$board` tracks **status and progress**. Gates answers "is it ready?", Board answers "where are we now?".

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Gate Name | ✅ | Which gate is being checked (with ID: COND-01, INT-01, etc.) |
| Pipeline Mode | ✅ | Full (`/analyze`) / Quick (`/quick-insight`) — determines the set of gates and criteria |
| Gate Deliverables | ✅ | Artifacts that the agent transfers for review |
| Iteration | ⬚ | If a repeat check — iteration number + gaps from the previous one |
| Session Number | ⬚ | Current session (for Full Pipeline) |

### Connection with other skills
| Skill | Interaction |
|-------|-------------|
| `$board` | After gate check — update the gate status on the board (PASS → `[✓]`, FAIL → `[↩]`) |
| `$handoff` | On PASS / CONDITIONAL PASS — form a handoff envelope with the gate check attached |
| `$web-research` | Researcher gates (RES-xx): absence of web-research = automatic Blocker |
| `$session-prompt-generator` | At the end of a session — the gate check goes into the data for the next session's prompt |
| Framework skills | Data Analyst gates (AN-xx): check the correct completion of the Quality Gate for each framework |

## Gates and Deliverables Registry

### Full Pipeline (`/analyze`, 5 sessions)

| # | Gate | ID | Agent | Session | Required deliverables | Skills |
|---|------|----|-------|---------|-----------------------|--------|
| 1 | **Conductor** | COND-01 | Conductor | 1 | Mode determined, task scope, board created | `$board` |
| 2 | **Interviewer** | INT-01 | Interviewer | 1 | Context gathered, assessment mode selected (scoring/qualitative), research brief | `$handoff` |
| 3 | **Researcher (Analysts)** | RES-01 | Researcher | 2 | Data collected, sources verified, minimum sources reached | `$web-research` |
| 4 | **Data Analyst (Analysts)** | AN-01 | Data Analyst | 2 | Frameworks applied, methodology documented | Framework skills |
| 5 | **Strategist (Analysts)** | ST-01 | Strategist | 2 | Recommendations actionable, linked to evidence | — |
| 6 | **Researcher (Critics)** | RES-02 | Researcher | 3 | Alternative data, criticism of Analysts' data, sources verified | `$web-research` |
| 7 | **Data Analyst (Critics)** | AN-02 | Data Analyst | 3 | Alternative analysis, counter-frameworks | Framework skills |
| 8 | **Strategist (Critics)** | ST-02 | Strategist | 3 | Alternative strategy, criticism of Analysts' strategy | — |
| 9 | **Mediator** | MED-01 | Mediator | 4 | Both teams evaluated, scoring/qualitative completed, final conclusion | `$gates` |
| 10 | **Designer** | DS-01 | Designer | 5 | Report structure approved, visualization specifications | — |
| 11 | **Layouter** | LY-01 | Layouter | 5 | HTML generated, formatting validated | — |
| 12 | **Release Gate** | RG-01 | Conductor | 5 | All gates passed, PDF generated | `$board`, `$gates` |

### Quick Pipeline (`/quick-insight`, 1 session)

| # | Gate | ID | Agent | Required deliverables |
|---|------|----|-------|-----------------------|
| 1 | **Conductor** | COND-01 | Conductor | Mode determined, task scope, board created |
| 2 | **Interviewer** | INT-01 | Interviewer | Context gathered, assessment mode selected |
| 3 | **Researcher** | RES-01 | Researcher | Data collected, sources verified |
| 4 | **Data Analyst** | AN-01 | Data Analyst | Frameworks applied |
| 5 | **Strategist** | ST-01 | Strategist | Recommendations actionable |
| 6 | **Mediator** | MED-01 | Mediator | Final conclusion (without competing teams) |
| 7 | **Designer** | DS-01 | Designer | Report structure, visualizations |
| 8 | **Layouter** | LY-01 | Layouter | HTML generated, PDF ready |

## Readiness Criteria by Gates

> Each criterion has a preset severity: **[B]** = Blocker, **[G]** = Gap, **[N]** = Note. During a check, severity can be upgraded (G→B), but not downgraded (B→G).

### Conductor (COND-xx)
- [ ] **[B]** Pipeline mode determined and justified (Full / Quick)
- [ ] **[B]** Task scope formulated (what to analyze, why, limitations)
- [ ] **[B]** Board created via `$board` with correct gate IDs
- [ ] **[G]** First gate activated
- [ ] **[G]** For continuing sessions: previous handoff loaded and verified

### Interviewer (INT-xx)
- [ ] **[B]** User context gathered (business question, industry, company size, goals)
- [ ] **[B]** Assessment mode selected: scoring (quantitative) or qualitative
- [ ] **[B]** Research brief formed with specific questions for research
- [ ] **[G]** Key metrics / evaluation criteria defined
- [ ] **[G]** Scope fixed — what is included and what is NOT included in the analysis

### Researcher (RES-xx)
- [ ] **[B]** Data collected for all questions in the research brief
- [ ] **[B]** Web search performed via `$web-research` (mandatory; absence = automatic Blocker)
- [ ] **[B]** Sources verified: every data point has a URL, date, credibility level
- [ ] **[B]** No data without origin (any fact without a source = Blocker)
- [ ] **[G]** Minimum sources reached (set in research brief, default ≥ 3 per thesis)
- [ ] **[G]** Cross-check: 2+ sources for key data
- [ ] **[G]** Conflicting data flagged and explained
- [ ] **[G]** Data is up-to-date: market data — not older than 12 months, regulatory — current version
- [ ] **[N]** Additional sources for depth (nice-to-have)

**Dependency check:** Research brief from INT-xx must be explicitly cited. Each question of the brief = section in the deliverable.

### Data Analyst (AN-xx)
- [ ] **[B]** Frameworks chosen justifiably (at least 2 for Full Pipeline)
- [ ] **[B]** Each framework applied correctly — all sections filled out, framework's Quality Gate passed
- [ ] **[B]** Data from Researcher is linked to conclusions (not "in our opinion," but "according to data [source]")
- [ ] **[G]** Methodology documented: why this framework, what data was used
- [ ] **[G]** Patterns and insights explicitly highlighted
- [ ] **[N]** Limitations of the analysis are recorded

**Dependency check:** Deliverable from RES-xx must be explicitly used. Each key conclusion points to Researcher data, and not to own assumptions.

### Strategist (ST-xx)
- [ ] **[B]** Recommendations are actionable — specific actions, not generic advice
- [ ] **[B]** Each recommendation is tied to evidence from Data Analyst / Researcher
- [ ] **[G]** Recommendation prioritization (impact / effort or similar matrix)
- [ ] **[G]** Risks are outlined for each recommendation
- [ ] **[N]** Time horizons are specified (short-term / medium-term / long-term)

**Dependency check:** Every recommendation traces back to an insight in AN-xx → data in RES-xx. "Recommendation without evidence" = Blocker.

### Mediator (MED-xx)
- [ ] **[B]** Results of both teams obtained (for Full Pipeline) or of the single team (Quick)
- [ ] **[B]** Scoring or qualitative evaluation performed (according to the mode selected in INT-01)
- [ ] **[B]** Final conclusion formulated with justification
- [ ] **[G]** For scoring: criteria and weights defined, scores justified
- [ ] **[G]** For qualitative: arguments from both sides contrasted, conflicts resolved
- [ ] **[N]** Strengths of each team highlighted

**Dependency check:** Deliverables ST-01 and ST-02 (Full) or ST-01 (Quick) are explicitly cited and contrasted.

### Designer (DS-xx)
- [ ] **[B]** Report structure approved (table of contents, sections, order)
- [ ] **[B]** Visualization specifications defined (chart types, data, palette)
- [ ] **[G]** Layout aligned with the content of the Mediator
- [ ] **[N]** Branding / stylistics defined

**Dependency check:** Report structure covers all sections from the MED-xx conclusion.

### Layouter (LY-xx)
- [ ] **[B]** HTML generated according to Designer's layout
- [ ] **[B]** All visualizations are rendered
- [ ] **[G]** Formatting validated (indents, fonts, tables)
- [ ] **[G]** PDF generated and verified

**Dependency check:** HTML matches DS-xx specification. All visualizations from the specification are present.

### Release Gate (RG-xx)
- [ ] **[B]** All previous gates passed (status `[✓]` on `$board`)
- [ ] **[B]** PDF report generated and verified
- [ ] **[G]** Data is up-to-date as of the report date
- [ ] **[G]** User sign-off obtained

## Criteria Severity

| Severity | Marker | Definition | Impact on Decision |
|----------|:------:|------------|--------------------|
| Blocker | **[B]** | Mandatory deliverable is missing or critically incomplete | FAIL — return for revision |
| Gap | **[G]** | Deliverable exists, but is incomplete or has remarks | CONDITIONAL PASS — can proceed, but gaps are logged |
| Note | **[N]** | Minor remark, does not affect transition | PASS — remark is passed to the next gate as context |

> Severity can be upgraded (G→B for critical issues), but **cannot be downgraded** (B→G). The preset severity is the minimum.

## Decisions

| Decision | Condition | Action |
|----------|-----------|--------|
| **PASS** | 0 Blockers + 0 Gaps | Request user Approved → `$handoff` → next gate |
| **CONDITIONAL PASS** | 0 Blockers + 1-2 Gaps | Log gaps → Request user Approved with a note → `$handoff` with a note |
| **FAIL** | ≥ 1 Blocker | Return to the agent with a specific list of gaps → Do not request Approved |

> **Absolute Rule:** Never skip gates, even if the task seems simple. FAIL — revision — repeat check. Without exceptions.

### Special Rules
- Researcher gates (RES-xx): lack of `$web-research` — **automatic Blocker**.
- Data without a source — **Blocker** (not Gap, not Note).
- Data older than 12 months (market) — **Gap** with "requires update" note.

## Escalation Protocol on Repeated FAILs

| Iteration | Action |
|:---------:|--------|
| 1st FAIL | Standard return: list of gaps → agent revises → repeat check |
| 2nd FAIL | Extended return: gaps + specific instructions "how to fix" + warning |
| 3rd FAIL | **Escalation to User:** |

Escalation Template (3+ FAILs):
```
### ⚠️ Escalation — Gate [ID] fails check (iteration [N])

**Gate:** [ID] [Name]
**FAIL Iterations:** [N]
**Recurring gaps:** [list of gaps not fixed in N iterations]

**Options:**
1. Re-evaluate scope / lower deliverable requirements
2. Return to the previous gate (problem is in the source data)
3. Forced CONDITIONAL PASS (user accepts the risk of the gaps)

→ Waiting for a decision from the user.
```

## Protocol

### Step 0 — Loading Context
1. Determine which gate is being checked (by ID from `$board`).
2. Determine pipeline mode (Full / Quick) and session number.
3. Load readiness criteria for this gate from the registry (with preset severity).
4. If a repeat check — load gaps from the previous iteration.

### Step 1 — Reviewing Deliverables
1. For each readiness criterion — check: fulfilled / unfulfilled / N/A.
2. For unfulfilled ones — apply the preset severity (can be upgraded, cannot be downgraded).
3. For unfulfilled ones — describe the specific gap: what exactly is missing / what to fix.
4. **Dependency check:** verify that the deliverable from the previous gate is explicitly used (not merely existing, but cited/utilized in the current deliverable).

### Step 2 — Decision Making
1. Calculate severity.
2. Apply decision rules (PASS / CONDITIONAL PASS / FAIL).
3. Verify iteration number — if 3+ FAILs, activate escalation protocol.
4. Add entry to check log.

### Step 3 — Action by Result
- **PASS:** show to the user → request Approved → `$handoff` → update `$board`.
- **CONDITIONAL PASS:** show gaps → request Approved acknowledging gaps → `$handoff` with note → update `$board`.
- **FAIL:** show gaps → return to the agent → update `$board` (status `[↩] Return`). If 3+ FAILs — escalate.

## Example — Gate Check RES-01 (Researcher Analysts), iteration 1 → CONDITIONAL PASS

```
### Gate Check — RES-01 Researcher (Analysts)

**Mode:** Full Pipeline
**Session:** 2 of 5
**Iteration:** 1
**Previous gaps:** Initial check

---

#### Readiness Criteria

| # | Criterion | Sev | Status | Gap / Comment |
|---|-----------|:---:|:------:|---------------|
| 1 | Data collected for all questions in the research brief | [B] | ✅ | 7 out of 7 questions covered |
| 2 | Web search performed via `$web-research` | [B] | ✅ | 12 queries, 28 sources |
| 3 | Sources verified (URL, date, credibility) | [B] | ✅ | All 28 have URL and date |
| 4 | No data without origin | [B] | ✅ | 0 facts without source |
| 5 | Minimum sources (≥ 3 per thesis) | [G] | ⚠️ | EdTech market TAM thesis — 2 sources instead of 3 |
| 6 | Cross-check (2+ for key data) | [G] | ✅ | OK |
| 7 | Conflicting data flagged | [G] | ✅ | 2 conflicts flagged and explained |
| 8 | Data is up-to-date (≤ 12 months) | [G] | ⚠️ | 1 source (IDC report) — 14 mo, flagged ⚠️ |
| 9 | Additional sources (nice-to-have) | [N] | ℹ️ | Recommended to add Rosstat data |

**Dependency check:** Research brief INT-01 cited in the heading of each section. All 7 questions = 7 sections. ✅

---

#### Summary

| Severity | Quantity | Items |
|----------|:--------:|-------|
| Blocker | 0 | — |
| Gap | 2 | #5 (TAM: 2 sources), #8 (IDC: 14 mo) |
| Note | 1 | #9 (Rosstat nice-to-have) |

### Decision: CONDITIONAL PASS

**Justification:** 0 Blockers, 2 Gaps — acceptable to proceed. Gaps logged for AN-01.

---

**Deliverables to transfer:**
- Research Report (7 sections, 28 sources, 2 conflicts explained)

**Gaps for AN-01:**
- EdTech market TAM supported by 2 sources (instead of 3) — note as ⚠️ Estimated
- IDC report 14 months old — flagged, recommended to verify with fresh data

→ Ready to handoff to **Data Analyst (Analysts)**. Waiting for **"Approved"**.
```

## Validation (Quality Gate)

The gate check is considered complete if:

- [ ] All readiness criteria have been checked (fulfilled / unfulfilled / N/A — no blanks)
- [ ] Each criterion is assigned severity from the registry (B/G/N), upgraded if necessary
- [ ] For every unfulfilled item specified: severity, gap description, what to fix
- [ ] Dependency check passed: the deliverable of the previous gate is explicitly used in the current one
- [ ] Decision conforms to the rules (not subjective)
- [ ] On 3+ FAILs — escalation protocol activated
- [ ] Check log updated
- [ ] On PASS/CONDITIONAL PASS — user Approved obtained
- [ ] `$board` updated

## Handoff
The result of `$gates` is input data for: `$handoff` (attaching the gate check to the envelope).

Transfer format: filled gate check template + decision + gaps (if CONDITIONAL PASS) + dependency check result.

## Anti-patterns

| Mistake | Why it's bad | How to do it right |
|---------|--------------|--------------------|
| Skipping a gate "because it's simple" | Errors go unnoticed | Never skip. Without exceptions |
| PASS without checking all criteria | Unnoticed gaps | Every criterion = fulfilled / unfulfilled / N/A |
| "Overall ok" instead of specifics | The agent doesn't know what to fix | Specific gap: "source X does not contain a publication date" |
| FAIL without describing gaps | The agent returns and doesn't know what to do | Every FAIL = list of specific fixes |
| Approved without user sign-off | Pipeline protocol violation | Always an explicit Approved from the user |
| Researcher data without web search | Unverified data in the report | `$web-research` — mandatory, absence is a Blocker |
| Equal importance of all criteria | Minor issue blocks, critical issue passes | Preset severity: [B] / [G] / [N] per criterion |
| Repeat check without comparing gaps | A gap might not be fixed | Load gaps from previous iteration, check each one |
| Downgrading severity (B→G) | Critical deliverable passes without fixes | Severity can be upgraded, but not downgraded |
| Endless FAIL loop | Pipeline hangs, user is unaware | 3+ FAILs = escalation to the user with options to resolve |
| Formal check "it exists" | Deliverable is there, but not used by the next gate | Dependency check: previous deliverable is cited and put to use |

## Output Template

```
### Gate Check — [ID] [Gate Name]

**Mode:** [Full / Quick]
**Session:** [N out of M]
**Iteration:** [1 / 2 / N]
**Previous gaps:** [list or "Initial check"]

---

#### Readiness Criteria

| # | Criterion | Sev | Status | Gap / Comment |
|---|-----------|:---:|:------:|---------------|
| 1 | [Criterion from registry] | [B] | ✅/⚠️/❌ | [If unfulfilled: what is missing] |

**Dependency check:** [Deliverable [previous ID] cited: ✅/❌. Details.]

---

#### Summary

| Severity | Quantity | Items |
|----------|:--------:|-------|
| Blocker | [N] | #[list] |
| Gap | [N] | #[list] |
| Note | [N] | #[list] |

### Decision: [ PASS / CONDITIONAL PASS / FAIL ]

**Justification:** [per rules: 0 blockers + 0 gaps = PASS, etc.]

---

#### If PASS / CONDITIONAL PASS:
**Deliverables to transfer:**
- [Artifact 1]
- [Artifact 2]

**Gaps for next gate (if CONDITIONAL):**
- [Gap 1 — what to consider]

→ Ready to handoff to **[Next Agent]**. Waiting for **"Approved"**.

#### If FAIL:
**Gaps for revision:**

| # | Gap | Sev | What to fix | Responsible |
|---|-----|:---:|-------------|-------------|
| [N] | [description] | [B] | [specific action] | [agent] |

→ Return to **[Current Agent]**. After fixing — repeat check (iteration [N+1]).
[If iteration ≥ 3: escalation protocol activated]
```
