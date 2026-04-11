---
name: swot-analysis
description: Analysis of strengths, weaknesses, opportunities, and threats — with a cross-matrix and prioritization
---
# SWOT Analysis — Analysis of Strengths, Weaknesses, Opportunities, and Threats

## When to Use
- When assessing the **strategic position** of a company, product, or project before making key decisions.
- When preparing for **strategic planning** — as input data for strategy formation.
- When you need to **systematically evaluate** internal capabilities and external conditions simultaneously.
- When conducting a **competitive analysis** — comparing the SWOT of multiple players.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Analysis Subject | ✅ | Company, product, project, or department |
| Industry / Market | ✅ | Market and industry context |
| Analysis Period | ⬚ | Planning horizon (default — 1-3 years) |
| Competitors | ⬚ | List of main competitors for context |
| Strategic Goals | ⬚ | Current goals and priorities of the organization |
| Constraints | ⬚ | Budget, resources, regulatory framework |

> If mandatory fields are not provided — **request them from the user** before starting the analysis. Do not guess.

## Data Sources
1. Internal reporting — finances, operational metrics, HR data.
2. Market research — market share, brand awareness, NPS.
3. Competitive analysis — benchmarks, public competitors' reports.
4. Macro environment — industry reports, regulatory changes, tech trends.
5. Stakeholder feedback — interviews, surveys, CRM data.

> Every fact must state its source and date. Data older than 12 months must be marked ⚠️.

### Relationship with Other Skills
| Skill | What We Take | When to Call |
|------|-----------|----------------|
| `pest-analysis` | External factors → O/T: opportunities and threats from PESTEL (Steps 3-4) | If O/T are undefined — PESTEL provides a structured input |
| `competitive-analysis` | S/W relative to competitors: shares, features, moats (Steps 1-2) | If there's no data on competitive advantages/weaknesses |
| `porters-five-forces` | Threats (T) from the 5 forces: new entrants, substitutes, rivalry (Step 4) | If a structured evaluation of competitive threats is needed |
| `ansoff-matrix` | SO strategies → growth strategies (Step 5) | After the cross-matrix — to detail SO initiatives |
| `web-research` | Verification of external factors, industry data | If data is missing or outdated (>12 months) |
| `blue-ocean-strategy` | WO strategies → creating new space | If weaknesses block competition in the current industry |

## Protocol

### Step 0 — Preparing Context
1. Clarify the subject of analysis, boundaries, and horizon.
2. Identify key stakeholders and their perspectives.
3. Collect available data from sources.
4. Document assumptions and limitations of the analysis.

### Step 1 — Strengths (Internal)
1. Audit internal resources: financial, human, technological, reputational.
2. Evaluate unique competencies and competitive advantages.
3. Check the sustainability of each strength (is it easy to copy?).
4. For each — scoring and evidence base:

   | # | Strength | Impact (1-5) | Sustainability (1-5) | Score | Evidence | Source |
   |---|----------------|:-------------:|:-------------------:|:-----:|-----------------|----------|
   | S1 | [Specific formulation] | X | X | XX | [Metric / fact] | [Source] |

   `Score = Impact × Sustainability`. Top factors: Score >= 12.

> **Formulation Rule:** Not "strong team," but "3 senior ML engineers with NLP experience >5 years, publications in EMNLP 2024-2025."

### Step 2 — Weaknesses (Internal)
1. Audit internal deficits: resources, processes, competencies, culture.
2. Identify gaps relative to competitors and best practices.
3. Evaluate criticality and urgency:

   | # | Weakness | Criticality (1-5) | Urgency (1-5) | Score | Evidence | Source |
   |---|---------------|:------------------:|:---------------:|:-----:|-----------------|----------|
   | W1 | [Specific formulation] | X | X | XX | [Metric / gap] | [Source] |

   `Score = Criticality × Urgency`. Top factors: Score >= 12.

4. Identify causal links between weaknesses (does W1 cause W3?).

### Step 3 — Opportunities (External)
1. Scan the macro environment: market trends, tech, regulatory, demographic.
2. If `$pest-analysis` exists — use opportunity factors (🟢) from it.
3. Evaluate each opportunity:

   | # | Opportunity | Potential (1-5) | Probability (1-5) | Window | Score | Source |
   |---|-------------|:---------------:|:-----------------:|------|:-----:|----------|
   | O1 | [Description] | X | X | [When it closes] | XX | [Source] |

   `Score = Potential × Probability`. Top factors: Score >= 12.

### Step 4 — Threats (External)
1. Identify external risks: competition, regulations, macroeconomics, tech.
2. If `$pest-analysis` lies — use risk factors (🔴) from it.
3. If `$porters-five-forces` exists — use forces scoring >= 3.5.
4. Evaluate each threat:

   | # | Threat | Damage (1-5) | Probability (1-5) | Speed | Score | Source |
   |---|--------|:-----------:|:-----------------:|----------|:-----:|----------|
   | T1 | [Description] | X | X | Sudden / Gradual | XX | [Source] |

   `Score = Damage × Probability`. Top factors: Score >= 12.

### Step 5 — Cross-Impact Matrix
For each quadrant — define specific strategic initiatives:

1. **SO Strategies** (Strengths + Opportunities): How to use strengths to capture opportunities.
2. **WO Strategies** (Weaknesses + Opportunities): How to overcome weaknesses through opportunities.
3. **ST Strategies** (Strengths + Threats): How to use strengths to neutralize threats.
4. **WT Strategies** (Weaknesses + Threats): How to minimize weaknesses and avoid threats.

For each initiative:

| # | Type | Factors | Initiative | Expected Effect |
|---|:---:|---------|------------|------------------|
| 1 | SO | S1 + O2 | [Specific action] | [Result: +$XM, +X% share] |

> Minimum 2 initiatives per quadrant. Each must be a concrete action, not a generic phrase.

### Step 6 — Initiative Prioritization
Evaluate each initiative using a scoring model:

| Criterion | Weight | Scale |
|----------|:---:|:-----:|
| Impact (effect on business) | 0.35 | 1-10 |
| Feasibility (realizability) | 0.30 | 1-10 |
| Urgency (time sensitivity) | 0.20 | 1-10 |
| Risk (inverted risk of failure) | 0.15 | 1-10 |

`Priority Score = Σ(weight × score)`

Matrix Impact × Effort:

| | Low Effort | High Effort |
|--|:----------:|:-----------:|
| **High Impact** | 🎯 Quick Wins (P1) | 💎 Strategic Bets (P2) |
| **Low Impact** | 🔧 Fill-ins (P3) | ❌ Avoid |

TOP-5 actions — specifying owners, deadlines, and KPIs.

### Step 7 — Synthesis and Findings
1. Formulate a strategic verdict: an overall appraisal of the position.
2. Define Critical Success Factors (CSF).
3. Log key risks and their mitigation plans.
4. Prepare actionable recommendations within the designated horizon.
5. Determine the review frequency (tied to the OKR cycle, typically 3-6 months).

## Example — EdTech Corporate Training Platform, RU

**Context:** B2B SaaS, corporate training platform. 50 clients, $2M ARR, RU market. Horizon: 1-3 years.

### SWOT Matrix

**Strengths:**

| # | Factor | Impact | Sustain. | Score | Evidence |
|---|--------|:-------:|:-------:|:-----:|----------------|
| S1 | AI-personalized learning (unique in RU market) | 5 | 4 | **20** | Patent application, 3 ML engineers |
| S2 | NPS 72 (vs industry average 45) | 4 | 3 | **12** | Survey Q1 2026, N=180 |
| S3 | Time-to-deploy 3 days (vs competitors 2-4 weeks) | 4 | 4 | **16** | CRM: average of last 20 deployments |

**Weaknesses:**

| # | Factor | Critical. | Urgency | Score | Evidence |
|---|--------|:--------:|:------:|:-----:|----------------|
| W1 | No 1C integration (table stakes in RU market) | 5 | 5 | **25** | 30% of CRM rejections cite 1C |
| W2 | Sales team 3 ppl (vs 15+ at Skillbox B2B) | 4 | 4 | **16** | Headcount report |
| W3 | No mobile app | 3 | 3 | **9** | 15% of support requests |

**Opportunities:**

| # | Factor | Potential | Prob. | Score | Source |
|---|--------|:---------:|:--------:|:-----:|----------|
| O1 | Gov program "Kadry" — subsidies for corp. training | 5 | 4 | **20** | Ministry of Labor, Mar 2026 |
| O2 | Talent shortage → increased budgets for upskilling (+28% YoY) | 5 | 5 | **25** | HH.ru Research, 2026 |
| O3 | Exit of foreign LMS (SAP SuccessFactors, Cornerstone) | 4 | 4 | **16** | Kommersant, Feb 2026 |

**Threats:**

| # | Factor | Damage | Prob. | Score | Source |
|---|--------|:-----:|:--------:|:-----:|----------|
| T1 | Yandex Praktikum launches B2B direction | 5 | 4 | **20** | TechCrunch Russia, Jan 2026 |
| T2 | 152-FZ on personal data — stricter storage | 4 | 5 | **20** | Consultant Plus, current ed. |
| T3 | Inflation 8-10% — pressure on HR budgets | 3 | 5 | **15** | Central Bank RF, 2026-2027 est. |

### Cross-Impact Matrix

| # | Type | Factors | Initiative | Effect |
|---|:---:|---------|------------|--------|
| 1 | SO | S1 + O2 | AI module "ROI on training": prove to firms that upskilling pays off | +$1M ARR in 12 mos |
| 2 | SO | S3 + O3 | Express migration from SAP: deploy in 3 days + data import | 30 new enterprise clients |
| 3 | WO | W1 + O1 | 1C integration → access to gov subsidies (1C is mandatory for reports) | -30% rejections, +subsidies |
| 4 | WO | W2 + O2 | Hire 5 sales + affiliate program (budgets are growing, need pipeline) | ×3 pipeline |
| 5 | ST | S1 + T1 | Build AI into a strong moat: Yandex can't copy in 6 mos | Sustain differentiation |
| 6 | ST | S2 + T3 | Use high NPS for a referral program (lower CAC during inflation) | CAC -20% |
| 7 | WT | W1 + T2 | 1C integration + migration to RU servers = compliance bundle | Clear both blockers |

### Prioritization

| # | Initiative | Type | Impact | Feasib. | Urgency | Risk inv. | **Score** | Zone |
|---|------------|:---:|:------:|:-------:|:-------:|:---------:|:---------:|:----:|
| 7 | 1C + RU servers (compliance bundle) | WT | 9 | 7 | 10 | 6 | **8.3** | 🎯 P1 |
| 3 | 1C → gov subsidies | WO | 8 | 7 | 8 | 7 | **7.7** | 🎯 P1 |
| 2 | Express migration from SAP | SO | 9 | 8 | 7 | 6 | **7.8** | 🎯 P1 |
| 5 | Empower AI moat | ST | 8 | 6 | 8 | 5 | **7.0** | 💎 P2 |
| 4 | Hire 5 sales + partners | WO | 7 | 5 | 6 | 6 | **6.1** | 💎 P2 |

### TOP-5 Actions

1. **1C + RU servers** (Score 8.3) — CTO, Q2 2026. KPI: 0% compliance rejections.
2. **Express migration from SAP** (Score 7.8) — Head of Sales, Q2-Q3 2026. KPI: 30 enterprise clients.
3. **1C Integration → gov subsidies** (Score 7.7) — Product Lead, Q2 2026. KPI: -30% rejections.
4. **AI-moat** (Score 7.0) — ML Team Lead, Q3-Q4 2026. KPI: 2 new AI features.
5. **Sales expansion** (Score 6.1) — VP Sales, Q3 2026. KPI: pipeline ×3.

## Validation (Quality Gate)

- [ ] Each SWOT quadrant has at least 3 factors with numeric scoring
- [ ] Scoring is verified: S (Impact × Sustainability), W (Criticality × Urgency), O (Potential × Probability), T (Damage × Probability)
- [ ] Factors are backed by evidence (metrics, facts, sources)
- [ ] Internal factors (S/W) strictly separated from external (O/T)
- [ ] Cross-matrix contains at least 2 initiatives per quadrant (SO/WO/ST/WT)
- [ ] Initiatives are concrete: action + expected effect (no generic phrases)
- [ ] Prioritization uses the scoring model (Impact, Feasibility, Urgency, Risk)
- [ ] TOP-5 actions specified with owner, deadline, and KPI
- [ ] No duplicated factors between quadrants
- [ ] Horizon is factored in, revision frequency established
- [ ] Data sources cited; data older than 12 mos marked with ⚠️

## Handoff
The output of `$swot-analysis` serves as input for:
- **Strategist / Mediator** — strategic position setting for strategy formulation.
- **`ansoff-matrix`** — SO initiatives → growth strategies.
- **`blue-ocean-strategy`** — WO initiatives → creating new market space.
- **`competitive-analysis`** — S/W applied for competitive benchmarking.
- **`pest-analysis`** — O/T input for deepened macro-analysis.

Handoff format: SWOT matrix with scoring + cross-matrix + prioritized initiatives + TOP-5. On handoff, use `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Overly broad formulations | "Strong team" lacks actionable insight | Be specific: "3 senior ML engineers with NLP exp > 5 yrs" |
| Mixing internal and external | Blurs the analysis boundary | S/W — exclusively controllable; O/T — purely external |
| SWOT without cross-matrix | A list without a strategy is useless | SO/WO/ST/WT mapped to specific initiatives (min 2 per quad) |
| Missing prioritization | Everything is vital = nothing is vital | Scoring formula: Impact × Feasibility × Urgency × Risk |
| Unsubstantiated factors | Analysis resting on "vibes" is subjective | Every factor must map to a metric or source |
| One-off SWOT | Rapidly decays within 3-6 months | Tie to the OKR cycle, revisit every 3-6 months |
| Factors without scoring | Can't objectively weigh S1 against S3 | Numeric scoring per quadrant (e.g. Impact × Sustainability) |
| Initiatives without effect | "Improve sales" isn't actionable | Specific effect targeted: "+$1M ARR in 12 mos", "-30% rejections" |

## Output Template

```markdown
## SWOT Analysis: [Analysis Subject]
**Industry:** [Industry]  |  **Period:** [Horizon]  |  **Date:** [Date]
**Next Revision:** [Next date]

### SWOT Matrix

#### Strengths (S) — Internal

| # | Factor | Impact (1-5) | Sustainability (1-5) | Score | Evidence | Source |
|---|--------|:-------------:|:-------------------:|:-----:|-----------------|----------|
| S1 | [Formulation] | X | X | XX | [Metric/fact] | [Source] |

#### Weaknesses (W) — Internal

| # | Factor | Criticality (1-5) | Urgency (1-5) | Score | Evidence | Source |
|---|--------|:------------------:|:---------------:|:-----:|-----------------|----------|
| W1 | [Formulation] | X | X | XX | [Metric/gap] | [Source] |

#### Opportunities (O) — External

| # | Factor | Potential (1-5) | Probability (1-5) | Window | Score | Source |
|---|--------|:---------------:|:-----------------:|------|:-----:|----------|
| O1 | [Formulation] | X | X | [When] | XX | [Source] |

#### Threats (T) — External

| # | Factor | Damage (1-5) | Probability (1-5) | Speed | Score | Source |
|---|--------|:-----------:|:-----------------:|----------|:-----:|----------|
| T1 | [Formulation] | X | X | [Type] | XX | [Source] |

---

### Strategy Cross-Matrix

| # | Type | Factors | Initiative | Expected Effect |
|---|:---:|---------|------------|------------------|
| 1 | SO | S? + O? | [Action] | [Result] |
| 2 | WO | W? + O? | [Action] | [Result] |
| 3 | ST | S? + T? | [Action] | [Result] |
| 4 | WT | W? + T? | [Action] | [Result] |

---

### Initiative Prioritization

| # | Initiative | Type | Impact (0.35) | Feasib. (0.30) | Urgency (0.20) | Risk inv. (0.15) | **Score** | Zone |
|---|------------|:---:|:------------:|:--------------:|:--------------:|:----------------:|:---------:|:----:|
| 1 | [Initiative] | SO | X | X | X | X | **X.X** | 🎯/💎/🔧 |

---

### Strategic Verdict
[1-2 paragraphs: overall appraisal of the position, CSF, key risks]

### TOP-5 Actions

| # | Action | Score | Owner | Deadline | KPI |
|---|----------|:-----:|---------------|------|-----|
| 1 | [Action] | X.X | [Who] | [When] | [Metric] |

---

### Sources and Assumptions

| # | Fact / Assumption | Source | Date | Reliability |
|---|-------------------|----------|------|:-------------:|
| 1 | [Fact] | [Source] | [Date] | ✅ / ⚠️ / 🔮 |

Legend: ✅ Verified (2+ sources) | ⚠️ Estimated (1 source) | 🔮 Assumed (expert estimate)
```
