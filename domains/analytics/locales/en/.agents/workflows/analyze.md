---
name: analyze
description: Full analytical pipeline — 5 sessions, adversarial approach, mediation, PDF report
---

# Workflow: /analyze — Full Analytical Pipeline (5 sessions)

## Description
Full analytical pipeline with an adversarial approach. Two competing teams (Analysts and Critics) independently research the question, the Mediator evaluates the results, and the design/layout team prepares a PDF report. Divided into 5 sessions to manage context window limits.

> **Pipeline rules:** This workflow obeys `analytics-pipeline-rules.md` — 7 mandatory rules, mechanical blocks, health metrics, and the escalation protocol.

## When to use

| Criterion | /analyze (Full) | /quick-insight (Quick) |
|-----------|:---------------:|:----------------------:|
| Complexity of the question | High: strategic, multifactorial | Low: single framework, quick check |
| Stakes | High: investments, market entry, M&A | Low: internal report, exploration |
| Devil's advocate needed? | Yes — critique strengthens the outcome | No — one perspective is sufficient |
| PDF report | Yes — for a presentation | No — markdown is sufficient |
| Time budget | 5 sessions (total 2-4 hours) | 1 session (30-60 min) |
| When in doubt | ✅ **Use /analyze** | |

## When NOT to use
- Simple analytical question → `/quick-insight`.
- A fast answer needed without a PDF → `/quick-insight`.

> Quick Pipeline is described in `quick-insight.md`. All gates covered in one session, without competing teams.

## Workflow Inputs

| Field | Required | Description |
|-------|:--------:|-------------|
| Question / topic | ✅ | What needs to be analyzed — from the user |
| User data | ⬚ | Any available data, reports, metrics |
| Industry / market | ⬚ | If known in advance. If not — Interviewer will clarify |
| Budget / resources | ⬚ | Context for strategic recommendations |
| Deadline | ⬚ | Influences the depth of research |

---

## Pipeline (5 sessions)

```
┌─────────── Session 1 ───────────┐
│ COND-01 → INT-01                │ → session-1-handoff.md
└─────────────────────────────────┘

┌─────────── Session 2 ───────────┐
│ COND-02 → RES-01(α)             │
│         → AN-01(α)              │
│         → ST-01(α)              │ → session-2-handoff.md
└─────────────────────────────────┘

┌─────────── Session 3 ───────────┐
│ COND-03 → RES-02(β)             │
│         → AN-02(β)              │
│         → ST-02(β)              │ → session-3-handoff.md
└─────────────────────────────────┘

┌─────────── Session 4 ───────────┐
│ COND-04 → MED-01                │ → session-4-handoff.md
│ (opt: MED-01 Synthesis)         │
└─────────────────────────────────┘

┌─────────── Session 5 ───────────┐
│ COND-05 → DS-01 → LY-01         │ → PDF report
│         → RG-01                 │
└─────────────────────────────────┘
```

### Parallelism

| Sessions | Parallel? | Reason |
|----------|:---------:|--------|
| Sessions 1-5 | ❌ Strictly sequential | Each depends on the previous handoff |
| Inside session: gates | ❌ Sequential | Researcher → Data Analyst → Strategist |
| Session 5: DS-01 → LY-01 | ❌ Sequential | Layouter implements the design spec |

---

## Gates and deliverables per session

### Session 1: Interview

#### COND-01: Conductor
**Input:** User request
**Actions:**
1. Determine the scope and complexity of the question.
2. Confirm `/analyze` mode (or switch to `/quick-insight`).
3. Initialize the board (`$board` — Full Pipeline, 15 gates).
4. Formulate the task for the Interviewer.
5. `$gates` → `$handoff` → Interviewer.
**Required skills:** `$board`, `$gates`, `$handoff`
**Deliverable:** Board + Handoff Envelope → Interviewer
**→ Wait for "Approved"**

#### INT-01: Interviewer
**Input:** `$handoff` from COND-01
**Actions:**
1. Adaptive interview — ask questions until obtaining sufficient context.
2. Determine: question, industry, data, goal, timeline, Mediator evaluation method.
3. Form a Research Brief.
4. `$gates` → `$handoff` → Conductor.
**Required skills:** `$gates`, `$handoff`
**Deliverable:** Research Brief (scope, constraints, key questions, data sources, evaluation method)
**→ Wait for "Approved"**

#### End of session 1
Conductor:
1. Saves `docs/analytics/session-1-handoff.md` (full text of the Research Brief).
2. Generates a prompt for session 2 (`$session-prompt-generator`).
3. Shows the prompt to the user.

---

### Session 2: Team Alpha (Analysts)

#### COND-02: Conductor (initialization)
**Input:** `docs/analytics/session-1-handoff.md` (user pastes the prompt)
**Actions:**
1. Parse the handoff file — contextual restoration.
2. Verify integrity (`$handoff` → recovery protocol, if file is incomplete).
3. Load the Research Brief.
4. Announce: "Session 2 — Analysts Team (Alpha)".
5. Set team mode: `Alpha`.
6. `$gates` → `$handoff` → RES-01.
**→ Wait for "Approved"**

#### RES-01: Researcher (Alpha)
**Input:** Research Brief + `team: Alpha`
**Actions:**
1. Fact-check and data collection covering the key questions of the Research Brief.
2. **Mandatory** web search (`$web-research`) — verification + supplementation.
3. Form the Research Package (facts + sources + Tier + confidence level).
4. `$gates` → `$handoff` → AN-01.
**Required skills:** `$web-research`, `$gates`, `$handoff`
**Deliverable:** Alpha Research Package (data with URLs, dates, confidence levels ✅/⚠️/🔮)
**→ Wait for "Approved"**

#### AN-01: Data Analyst (Alpha)
**Input:** Alpha Research Package + Research Brief
**Actions:**
1. Select relevant frameworks (minimum 2 from the available list).
2. Apply frameworks to the collected data.
3. Structure and identify patterns.
4. `$gates` (dependency check: RES-01 data quoted) → `$handoff` → ST-01.
**Required skills:** Selected frameworks (from the catalog: `$swot-analysis`, `$tam-sam-som`, `$competitive-analysis`, `$pest-analysis`, `$porters-five-forces`, `$bcg-matrix`, `$ansoff-matrix`, `$blue-ocean-strategy`, `$value-chain-analysis`, `$cohort-analysis`, `$rfm-analysis`, `$unit-economics`, `$trend-analysis`, `$customer-journey-mapping`, `$icp-buyer-persona`, `$jtbd-analysis`), `$gates`, `$handoff`
**Deliverable:** Alpha Analytical Report (frameworks + patterns + insights)
**→ Wait for "Approved"**

#### ST-01: Strategist (Alpha)
**Input:** Alpha Research Package + Alpha Analytical Report
**Actions:**
1. Synthesize data and analytics into a strategy.
2. Formulate recommendations tied to the evidence.
3. Assess risks + action plan.
4. `$gates` (dependency check: evidence from AN-01 and RES-01) → `$handoff` → Conductor.
**Required skills:** `$gates`, `$handoff`
**Deliverable:** Alpha Strategy Report (executive summary + insights + strategy + risks + action plan + KPIs)
**→ Wait for "Approved"**

#### End of session 2
Conductor:
1. Saves `docs/analytics/session-2-handoff.md` (full text: Research Brief + Alpha Research Package + Alpha Analytical Report + Alpha Strategy).
2. Generates a prompt for session 3 (`$session-prompt-generator`).

---

### Session 3: Team Beta (Critics)

#### COND-03: Conductor (initialization)
**Input:** `docs/analytics/session-2-handoff.md`
**Actions:**
1. Parse the handoff — load the Research Brief + the full Alpha report.
2. Verify integrity.
3. Announce: "Session 3 — Critics Team (Beta)".
4. Set team mode: `Beta`.
5. Pass Alpha's full output as mandatory input to Beta.
6. `$gates` → `$handoff` → RES-02.
**→ Wait for "Approved"**

#### RES-02: Researcher (Beta)
**Input:** Research Brief + Alpha full output + `team: Beta`
**Actions:**
1. Independent research on the same questions (using proper, different sources if required).
2. **Mandatory** web search (`$web-research`) — looking for counter-evidence.
3. Analyze Alpha: identify gaps, weak sources, missing data.
4. `$gates` → `$handoff` → AN-02.
**Required skills:** `$web-research`, `$gates`, `$handoff`
**Deliverable:** Beta Research Package (independent findings + Alpha gaps + counter-evidence)
**→ Wait for "Approved"**

#### AN-02: Data Analyst (Beta)
**Input:** Beta Research Package + Alpha Analytical Report
**Actions:**
1. Critique Alpha's analytical conclusions (methodologies, frameworks, interpretations).
2. Apply frameworks missed by Alpha (counter-frameworks).
3. Deliver alternative analytics from a different perspective.
4. `$gates` (dependency check: RES-02 data + critique of Alpha AN-01) → `$handoff` → ST-02.
**Required skills:** counter-frameworks from the catalog, `$gates`, `$handoff`
**Deliverable:** Beta Analytical Report (critique of Alpha + alternative analysis)
**→ Wait for "Approved"**

#### ST-02: Strategist (Beta)
**Input:** Beta Research + Beta Analysis + Alpha Strategy
**Actions:**
1. Critique Alpha's strategy point-by-point with evidence.
2. Identify risks skipped by Alpha.
3. Form an alternative strategy.
4. `$gates` → `$handoff` → Conductor.
**Required skills:** `$gates`, `$handoff`
**Deliverable:** Beta Strategy Report (critique of Alpha + alternative strategy + risks + action plan)
**→ Wait for "Approved"**

#### End of session 3
Conductor:
1. Saves `docs/analytics/session-3-handoff.md` (Research Brief + Alpha full Report + Beta full Report).
2. Generates a prompt for session 4.

---

### Session 4: Mediation

#### COND-04: Conductor (initialization)
**Input:** `docs/analytics/session-3-handoff.md`
**Actions:**
1. Parse the handoff — load Research Brief + Alpha + Beta reports.
2. Verify integrity.
3. Announce: "Session 4 — Mediation".
4. Confirm the evaluation method (determined during the interview).
5. `$gates` → `$handoff` → MED-01.
**→ Wait for "Approved"**

#### MED-01: Mediator
**Input:** Research Brief + Alpha full report + Beta full report + evaluation method
**Actions:**
1. Comparative analysis of Alpha vs Beta.
2. Apply the chosen evaluation method (scoring / qualitative / both).
3. Formulate the final conclusion and recommendations.
4. Propose synthesis (Appendix D) — the user decides.
5. `$gates` → `$handoff` → Conductor.
**Required skills:** `$gates`, `$handoff`
**Deliverable:** Mediated Conclusion (comparative analysis + scoring + recommendation + action items)
**→ Wait for "Approved"**

#### MED-01 Synthesis (optional)
If the user approved the synthesis:
1. Integrate the best elements from both teams.
2. Create a synthesized strategy (Appendix D).
**Deliverable:** Synthesis Report
**→ Wait for "Approved"**

#### End of session 4
Conductor:
1. Saves `docs/analytics/session-4-handoff.md` (Research Brief + Mediated Conclusion + Synthesis if any).
2. Generates a prompt for session 5.

---

### Session 5: Report

#### COND-05: Conductor (initialization)
**Input:** `docs/analytics/session-4-handoff.md`
**Actions:**
1. Parse the handoff — load all artifacts for the report.
2. Verify integrity.
3. Announce: "Session 5 — Report Preparation".
4. `$gates` → `$handoff` → DS-01.
**→ Wait for "Approved"**

#### DS-01: Designer
**Input:** Mediated Conclusion + Alpha Report + Beta Report + Research Brief
**Actions:**
1. Design the report structure (`$report-design`).
2. Map visualizations for each data block (decision tree from `$report-design`).
3. Set the color palette and internal hierarchy.
4. Draft the executive summary.
5. `$gates` → `$handoff` → LY-01.
**Required skills:** `$report-design`, `$gates`, `$handoff`
**Deliverable:** Report Design Spec (structure + visualization map + palette + executive summary draft)
**→ Wait for "Approved"**

#### LY-01: Layouter
**Input:** Report Design Spec + all data for the report
**Actions:**
1. Generate an HTML file with inline CSS (`$html-pdf-report`).
2. Embed Chart.js charts and Mermaid diagrams.
3. Layout all sections + Appendices A, B, C, D.
4. Follow the PDF testing protocol (8 checks from `$html-pdf-report`).
5. `$gates` → `$handoff` → Conductor.
**Required skills:** `$html-pdf-report`, `$gates`, `$handoff`
**Deliverable:** Self-contained HTML file (→ Print-to-PDF)
**→ Wait for "Approved"**

#### RG-01: Release Gate
**Input:** HTML report + all deliverables
**Check (checklist from `analytics-pipeline-rules.md`):**
- [ ] All gates of all sessions are in [✓] on `$board`
- [ ] PDF report generated and visually verified
- [ ] Data is up to date as of the publication date
- [ ] PDF contains: Title Page, TOC, Executive Summary, Main Section, Appendix A-C (D optional)
- [ ] All data is verified (source URLs present)
- [ ] Executive summary reflects mediation
- [ ] Visualizations correspond correctly (Chart.js animation: false, Mermaid rendered)

**Decision:** GO ✅ / NO-GO ❌ / GO-with-conditions ⚠️
**→ Wait for "Approved"**

---

## Reverse Handoff — return protocol

### Common return reasons

| From Gate | Reason | Return to | Skill |
|-----------|--------|-----------|-------|
| AN-01/02 | Insufficient data | RES-01/02 | `$handoff` (Reverse) |
| ST-01/02 | Analytics do not cover the question | AN-01/02 | `$handoff` (Reverse) |
| MED-01 | Data contradict each other without explanation | RES-01 or RES-02 | `$handoff` (Reverse) |
| DS-01 | No visualizable data | MED-01 | `$handoff` (Reverse) |
| LY-01 | Incomplete design spec | DS-01 | `$handoff` (Reverse) |

### Protocol
1. The agent forms a Reverse Handoff via `$handoff` (what to fix + what NOT to touch).
2. Conductor routes the return to the correct gate.
3. The `$board` is updated: current → `[↩]`, return → `[→]`.
4. After correction — repeated `$gates` verification.
5. If the return spans across sessions — Conductor shapes a new handoff file.

> Detailed protocol — in `$handoff` → "Reverse Handoff".

---

## Example — pipeline mid-flight (end of session 2)

```
📊 Progress: 40% (6/15) | Session: 2/5 | Avg. time/gate: 10 min | Blockers: 0 | Returns: 0

| # | ID | Gate | Session | Status | Deliverable |
|---|----|------|:-------:|:------:|-------------|
| 1 | COND-01 | Conductor | 1 | [✓] | Full Pipeline, scope: EdTech corp. training RF |
| 2 | INT-01 | Interviewer | 1 | [✓] | Brief: 12 questions, scoring mode |
| 3 | COND-02 | Conductor (s.2) | 2 | [✓] | Context loaded, team Alpha |
| 4 | RES-01 | Researcher (α) | 2 | [✓] | 28 sources, Verified 62% 🟡 |
| 5 | AN-01 | Data Analyst (α) | 2 | [✓] | TAM/SAM/SOM + Competitive + PEST |
| 6 | ST-01 | Strategist (α) | 2 | [✓] | AI-first corp. learning, 5 recommendations |
| 7 | COND-03 | Conductor (s.3) | 3 | [ ] | — |
| ... | ... | ... | ... | [ ] | — |
```

**Next up:** Conductor saves `session-2-handoff.md` incorporating the full Alpha Report text (Research + Analysis + Strategy), and generates a prompt for Session 3 (Team Beta: Critics).

---

## Catalog of Available Frameworks (for AN-01 / AN-02)

The Data Analyst selects frameworks by evaluating their relevance to the question:

| Framework | Skill | When to use |
|-----------|-------|-------------|
| SWOT | `$swot-analysis` | Strategic position, S/W/O/T + cross-matrix |
| TAM/SAM/SOM | `$tam-sam-som` | Market size, revenue potential |
| Competitive Analysis | `$competitive-analysis` | Competitive landscape, threat score |
| PEST/PESTEL | `$pest-analysis` | Macroenvironment, external factors |
| Porter's 5 Forces | `$porters-five-forces` | Industry attractiveness |
| BCG Matrix | `$bcg-matrix` | Portfolio analysis of business units |
| Ansoff Matrix | `$ansoff-matrix` | Growth strategy |
| Blue Ocean | `$blue-ocean-strategy` | Creating new market space |
| Value Chain | `$value-chain-analysis` | Value creation chain, make-or-buy |
| Cohort Analysis | `$cohort-analysis` | Retention, LTV by cohorts |
| RFM Analysis | `$rfm-analysis` | Customer segmentation |
| Unit Economics | `$unit-economics` | CAC, LTV, payback, margin |
| Trend Analysis | `$trend-analysis` | Market trends, timing |
| Customer Journey | `$customer-journey-mapping` | Customer journey, churn points |
| ICP / Buyer Persona | `$icp-buyer-persona` | Target audience, personas |
| JTBD | `$jtbd-analysis` | Client's Jobs-To-Be-Done, opportunity score |

**Rule:** Minimum of 2 frameworks for the Full Pipeline (AN-01 and AN-02 must assign different ones).

---

## Starting Prompt Template

```
I need an in-depth analysis on: [describe the question].

Context:
- Industry: [industry]
- Existing data: [what is available]
- Goal: [purpose of the analysis]
- Deadline: [if applicable]

Start /analyze.
```
