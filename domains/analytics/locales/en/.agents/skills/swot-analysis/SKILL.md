---
name: swot-analysis
description: Analysis of strengths, weaknesses, opportunities, and threats — with cross-impact matrix and prioritization
---
# SWOT Analysis — Strengths, Weaknesses, Opportunities, and Threats

## When to Use
- When assessing the **strategic position** of a company, product, or project before making key decisions.
- When preparing for **strategic planning** — as input data for strategy formulation.
- When a **systematic assessment** of internal capabilities and external conditions is needed simultaneously.
- When conducting **competitive analysis** — comparing SWOT across multiple players.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Analysis subject | ✅ | Company, product, project, or division |
| Industry / market | ✅ | Market and industry context |
| Analysis period | ⬚ | Planning horizon (default — 1-3 years) |
| Competitors | ⬚ | List of key competitors for context |
| Strategic goals | ⬚ | Current organizational goals and priorities |
| Constraints | ⬚ | Budget, resources, regulatory framework |

## Data Sources
1. Internal reporting — financial, operational metrics, HR data.
2. Marketing research — market share, brand awareness, NPS.
3. Competitive analysis — benchmarks, competitors' public reports.
4. Macro environment — industry reports, regulatory changes, technology trends.
5. Stakeholder feedback — interviews, surveys, CRM data.

## Protocol

### Step 0 — Context Preparation
1. Clarify the analysis subject, boundaries, and horizon.
2. Identify key stakeholders and their perspectives.
3. Collect available data from sources (steps 1-5 from "Data Sources").
4. Document assumptions and analysis limitations.

### Step 1 — Strengths (Internal)
1. Audit internal resources: financial, human, technological, reputational.
2. Evaluate unique competencies and competitive advantages.
3. Assess the sustainability of each strength (is it easy to replicate?).
4. Rank by degree of impact on strategic goals (high / medium / low).
5. For each — provide the evidence base (metric, fact, benchmark).

### Step 2 — Weaknesses (Internal)
1. Audit internal deficiencies: resources, processes, competencies, culture.
2. Identify gaps relative to competitors and best practices.
3. Assess the criticality of each weakness (does it block the strategy or merely limit it?).
4. Identify cause-and-effect relationships between weaknesses.
5. Rank by degree of impact and urgency of remediation.

### Step 3 — Opportunities (External)
1. Scan the external environment: market trends, technologies, regulation, demographics.
2. Evaluate the accessibility of each opportunity (resources for realization).
3. Determine the window of opportunity (timing) and probability of realization.
4. Assess the potential business impact (revenue, market share, positioning).
5. Rank: attractiveness = impact x probability / cost.

### Step 4 — Threats (External)
1. Identify external risks: competition, regulation, macroeconomics, technology.
2. Assess the probability of each threat materializing.
3. Assess the potential damage upon materialization.
4. Determine the speed of onset (sudden / gradual).
5. Rank: criticality = damage x probability.

### Step 5 — Cross-Impact Matrix
1. **SO strategies** (Strengths + Opportunities): how to leverage strengths to capture opportunities.
2. **WO strategies** (Weaknesses + Opportunities): how to overcome weaknesses through opportunities.
3. **ST strategies** (Strengths + Threats): how to use strengths to neutralize threats.
4. **WT strategies** (Weaknesses + Threats): how to minimize weaknesses and avoid threats.
5. For each pair — formulate a specific strategic initiative.

### Step 6 — Prioritization
1. Evaluate each initiative from the cross-impact matrix by: impact, feasibility, urgency.
2. Build a prioritization matrix (Impact vs Effort).
3. Identify Quick Wins, strategic projects, and items for "parking."
4. Form a TOP-5 priority actions with owners and deadlines.

### Step 7 — Synthesis and Conclusions
1. Formulate a strategic verdict: overall position assessment.
2. Identify critical success factors.
3. Document key risks and a mitigation plan.
4. Prepare actionable recommendations with an implementation horizon.

## Validation (Quality Gate)

- [ ] Each SWOT quadrant contains at least 3 factors
- [ ] Factors are supported by evidence (metrics, facts, sources)
- [ ] Internal factors (S/W) are separated from external ones (O/T)
- [ ] The cross-impact matrix contains specific strategic initiatives, not generic phrases
- [ ] Prioritization is based on objective criteria (impact, feasibility, urgency)
- [ ] TOP-5 actions have assigned owners and deadlines
- [ ] No duplication of factors across quadrants
- [ ] The analysis accounts for the time horizon

## Handoff
Result -> Strategist / Mediator for integration into the strategic plan, portfolio analysis, or roadmap.

## Anti-patterns

| Mistake | Why It's Bad | How to Do It Right |
|---------|-------------|-------------------|
| Overly generic formulations | "Strong team" yields no actionable insights | Be specific: "3 senior ML engineers with 5+ years of NLP experience" |
| Mixing internal and external factors | Blurs the analysis boundary | S/W — only controllable factors; O/T — external only |
| SWOT without cross-impact matrix | A list without strategy is useless | Always build SO/WO/ST/WT and formulate initiatives |
| No prioritization | Everything important = nothing important | Rank by Impact x Feasibility |
| Ignoring the evidence base | Analysis based on "feelings" is subjective | Each factor — with a metric or source |
| One-time SWOT | Becomes outdated within 3-6 months | Review regularly, tie to the OKR cycle |

## Output Template

```
## SWOT Analysis: [Analysis Subject]
**Period:** [horizon]  |  **Date:** [date]

### SWOT Matrix

|  | Positive | Negative |
|--|:--------:|:--------:|
| **Internal** | **Strengths (S)** | **Weaknesses (W)** |
|  | 1. [S1] | 1. [W1] |
|  | 2. [S2] | 2. [W2] |
|  | 3. [S3] | 3. [W3] |
| **External** | **Opportunities (O)** | **Threats (T)** |
|  | 1. [O1] | 1. [T1] |
|  | 2. [O2] | 2. [T2] |
|  | 3. [O3] | 3. [T3] |

### Cross-Impact Strategy Matrix

|  | Opportunities (O) | Threats (T) |
|--|:-----------------:|:-----------:|
| **Strengths (S)** | **SO Strategies** | **ST Strategies** |
|  | 1. [SO1: S? + O? -> initiative] | 1. [ST1: S? + T? -> initiative] |
|  | 2. [SO2] | 2. [ST2] |
| **Weaknesses (W)** | **WO Strategies** | **WT Strategies** |
|  | 1. [WO1: W? + O? -> initiative] | 1. [WT1: W? + T? -> initiative] |
|  | 2. [WO2] | 2. [WT2] |

### Initiative Prioritization

| # | Initiative | Type | Impact | Feasibility | Urgency | Priority |
|---|-----------|------|--------|-------------|---------|----------|
| 1 | [Initiative 1] | SO/WO/ST/WT | High | High | High | ★★★ |
| 2 | [Initiative 2] | ... | ... | ... | ... | ★★☆ |

### Strategic Verdict
[1-2 paragraphs: overall position assessment, critical success factors, key risks]

### TOP-5 Actions
1. [Action] — owner: [who], deadline: [when]
2. ...
```
