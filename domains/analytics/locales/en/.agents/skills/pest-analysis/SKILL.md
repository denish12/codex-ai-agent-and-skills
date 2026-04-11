---
name: pest-analysis
description: Macro-environment analysis — political, economic, social, technological, environmental, and legal factors
---
# PEST/PESTEL Analysis — Macro-environment Analysis

## When to Use
- When assessing the **macro-environment** before entering a new market or launching a new product.
- During **strategic planning** — to understand external factors affecting the business.
- When analyzing **regulatory and political risks** in specific regions or industries.
- When preparing **investment decisions** — assessing country and industry risks.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Subject of analysis | ✅ | Company, industry, market, or region |
| Geographic focus | ✅ | Country / region / global reach |
| Analysis horizon | ⬚ | Forecast period (default is 3-5 years) |
| Mode | ⬚ | PEST (4 factors) or PESTEL (6 factors, default) |
| Industry | ⬚ | Specific industry to narrow down factors |
| Strategic goals | ⬚ | Context for evaluating factor impact |

> If mandatory fields are not provided — **request them from the user** before starting the analysis. Do not make assumptions.

## Data Sources
1. National statistical agencies — macroeconomic indicators, demographics.
2. Central banks and regulators — interest rates, regulatory initiatives.
3. Industry associations — industry reports, forecasts.
4. International organizations — World Bank, IMF, WTO, OECD.
5. Tech insights — Gartner, Forrester, McKinsey, BCG.
6. Environmental and legal databases — ESG ratings, legislative registries.

> Each fact must be cited with a source and date. Data older than 12 months must be marked with ⚠️ and verified via `web-research`.

### Integration with Other Skills
| Skill | What We Take | When to Trigger |
|-------|--------------|-----------------|
| `swot-analysis` | External Opportunities / Threats are formed from PESTEL factors (step 8) | PESTEL → O/T block in SWOT |
| `tam-sam-som` | Macro constraints on market size: regulatory, economic (steps 1-2, 6) | If PESTEL reveals constraints on SAM/SOM |
| `competitive-analysis` | Regulatory barriers to entry for competitors (step 6) | If legal factors affect the competitive landscape |
| `ansoff-matrix` | Macro risks for growth strategies: new markets, diversification (step 8) | To assess expansion risks |
| `web-research` | Macro data verification, recent reports | If data is missing or outdated (>12 months) |
| `trend-analysis` | Trends to substantiate factor dynamics (↑/↓/→) | If deep trend elaboration is needed |

## Protocol

### Step 0 — Context Preparation
1. Define the subject of analysis and geographic focus.
2. Clarify the mode: PEST (4 factors) or PESTEL (6 factors).
3. Set the analysis horizon and strategic context.
4. Identify key questions the analysis should answer.
5. Gather available data from sources.

### Step 1 — Political Factors
1. Assess political stability and form of government.
2. Analyze current and planned government policies affecting the industry.
3. Assess trade policy: tariffs, sanctions, trade agreements.
4. Analyze tax policy and government incentives.
5. Assess corruption risks and institutional quality.
6. For each factor, fill out a card:

   | Field | Value |
   |-------|-------|
   | Factor | [Description] |
   | Impact (1-5) | [How strongly it affects the business] |
   | Probability (1-5) | [Likelihood of realization / intensification] |
   | Trend | ↑ strengthening / ↓ weakening / → stable |
   | Nature | 🟢 Opportunity / 🔴 Risk / 🟡 Dual |
   | Horizon | Short-term (<1y) / Medium-term (1-3y) / Long-term (3-5y) |
   | Source | [URL / Title, Date] |

   **Nature is determined by the following rule:**
   - 🟢 **Opportunity** — the factor creates a competitive advantage, lowers barriers, opens the market.
   - 🔴 **Risk** — the factor restricts, increases costs, creates a threat.
   - 🟡 **Dual** — depends on strategy: can be both a risk and an opportunity.

### Step 2 — Economic Factors
1. Analyze macroeconomic indicators: GDP, inflation, unemployment.
2. Assess currency risks and exchange rate dynamics.
3. Analyze interest rates and capital availability.
4. Assess purchasing power and consumption structure.
5. Analyze economic cycles and the phase of the business cycle.
6. For each factor — fill out a card (same as step 1).

### Step 3 — Social Factors
1. Analyze demographic trends: age structure, urbanization, migration.
2. Assess cultural norms and values affecting consumption.
3. Analyze education levels and workforce qualifications.
4. Assess changes in lifestyle and consumer preferences.
5. Analyze social inequality and its impact on markets.
6. For each factor — fill out a card (same as step 1).

### Step 4 — Technological Factors
1. Assess the level of technological development in the region / industry.
2. Analyze the pace of technological change and disruption.
3. Assess R&D investments — public and private.
4. Analyze the level of digitalization and internet penetration.
5. Assess the impact of automation and AI on the industry.
6. For each factor — fill out a card (same as step 1).

### Step 5 — Environmental Factors (PESTEL)
1. Analyze environmental legislation and regulatory requirements.
2. Assess climate risks and their impact on the business.
3. Analyze ESG trends and stakeholder pressure.
4. Assess the availability and cost of resources (energy, raw materials, water).
5. Analyze carbon footprints and sustainability requirements.
6. For each factor — fill out a card (same as step 1).

### Step 6 — Legal Factors (PESTEL)
1. Analyze the regulatory context: licensing, certification, compliance.
2. Assess intellectual property protection and patent law.
3. Analyze labor legislation and its impact on HR strategy.
4. Assess data protection and privacy (GDPR, local equivalents).
5. Analyze antitrust regulation and its impact on the market.
6. For each factor — fill out a card (same as step 1).

### Step 7 — Scoring and Prioritization
1. Calculate the final score for each factor: `Score = Impact × Probability`.
2. Determine top factors by category (Score ≥ 12).
3. Build a heatmap:

   | | Probability 1 | 2 | 3 | 4 | 5 |
   |--|:---:|:---:|:---:|:---:|:---:|
   | **Impact 5** | 5 | 10 | 15 🟡 | 20 🔴 | 25 🔴 |
   | **4** | 4 | 8 | 12 🟡 | 16 🔴 | 20 🔴 |
   | **3** | 3 | 6 | 9 | 12 🟡 | 15 🟡 |
   | **2** | 2 | 4 | 6 | 8 | 10 |
   | **1** | 1 | 2 | 3 | 4 | 5 |

   🔴 Score ≥ 16: critical — immediate response required.
   🟡 Score 12-15: significant — monitoring and action plan needed.
   No marker < 12: background — monitor the trend.

4. Highlight critical factors requiring an immediate response.

### Step 8 — Scenario Analysis
1. Define 2-3 key uncertainties (factors with high Scores and ambiguous trends).
2. Build 3 scenarios:

   | Scenario | Key Assumptions | Business Impact | Probability | Strategic Response |
   |----------|-----------------|-----------------|:-----------:|--------------------|
   | Optimistic | [Which factors improve] | [What it yields] | XX% | [What to do] |
   | Base | [Current trends continue] | [What to expect] | XX% | [What to do] |
   | Pessimistic | [Which factors worsen] | [What the threat is] | XX% | [What to do] |

3. For the pessimistic scenario — define trigger points: under what conditions to activate the contingency plan.

### Step 9 — Synthesis and Recommendations
1. Formulate the overall macro-environment profile (favorable / neutral / hostile).
2. Identify key change drivers over the analysis horizon.
3. Formulate strategic recommendations:

   | # | Factor | Type | Recommendation | Priority | Timeframe |
   |---|--------|:----:|----------------|:--------:|-----------|
   | 1 | [Factor] | 🔴 Risk | [What to do for mitigation] | P1 | [When] |
   | 2 | [Factor] | 🟢 Opp. | [How to leverage] | P2 | [When] |

4. Determine review frequency (quarterly for volatile markets, annually for stable ones).

## Example — EdTech platform, Russian market, 3-year horizon

**Context:** Online corporate learning platform, B2B SaaS, Russia, horizon 2026-2029.

### Factor Summary Table (TOP)

| # | Cat. | Factor | Impact | Prob. | Score | Trend | Nature | Horizon |
|---|------|--------|:------:|:-----:|:-----:|:-----:|:------:|---------|
| P1 | Political | Gov program "Personnel" — subsidies for corp training | 4 | 4 | **16** | ↑ | 🟢 | Mid-term |
| P2 | Political | Restrictions on foreign LMS (import substitution) | 4 | 3 | **12** | ↑ | 🟡 | Short-term |
| E1 | Economic | Inflation 8-10% — pressure on HR budgets | 4 | 5 | **20** | → | 🔴 | Short-term |
| E2 | Economic | Talent shortage → growing upskilling investments | 5 | 4 | **20** | ↑ | 🟢 | Mid-term |
| S1 | Social | Gen Z entering workforce — digital-first learning expected | 4 | 5 | **20** | ↑ | 🟢 | Long-term |
| T1 | Technological | AI personalization in learning — new standard | 5 | 4 | **20** | ↑ | 🟢 | Mid-term |
| T2 | Technological | LLM content generation — reducing course costs | 4 | 4 | **16** | ↑ | 🟡 | Short-term |
| L1 | Legal | Personal Data Law — local data storage required | 5 | 5 | **25** | → | 🔴 | Short-term |

### Macro-Environment Profile

| Category | Avg. Score | Trend | Evaluation |
|----------|:----------:|:-----:|------------|
| Political | 14.0 | ↑ | 🟡 Dual — subsidies + restrictions |
| Economic | 20.0 | ↑ | 🟢 Favorable — talent shortage = high demand |
| Social | 20.0 | ↑ | 🟢 Favorable — digital-first trend |
| Technological | 18.0 | ↑ | 🟢 Favorable — AI drives differentiation |
| Legal | 25.0 | → | 🔴 Hostile — high compliance requirements |

**Overall profile:** Favorable macro-environment for EdTech with significant legal constraints.

### Scenario Analysis

| Scenario | Assumptions | Impact | Prob. | Response |
|----------|-------------|--------|:-----:|----------|
| Optimistic | Subsidies +50%, AI lowers cost-per-learner | TAM ×1.5, margin +10pp | 25% | Aggressive growth, AI investments |
| Base | Trends continue, inflation 8% | TAM +15% YoY, margin stable | 50% | Focus on PMF and retention |
| Pessimistic | HR budgets cut, regulatory barriers rise | TAM flat, churn +5pp | 25% | Focus on compliance, lower CAC |

**Trigger point (Pessimistic):** if HR budgets in >30% of client companies are cut by >20% — activate contingency.

### Strategic Recommendations

| # | Factor | Type | Recommendation | Priority |
|---|--------|:----:|----------------|:--------:|
| 1 | L1: Personal Data Law | 🔴 | Migrate to local servers by Q3 | P1 |
| 2 | T1: AI personalization | 🟢 | Invest in AI module as a differentiator | P1 |
| 3 | E2: Talent shortage | 🟢 | Position as "ROI on learning" | P2 |
| 4 | P2: Import substitution | 🟡 | Prepare for inclusion in local software registry | P2 |

## Validation (Quality Gate)

- [ ] All categories (P/E/S/T or P/E/S/T/E/L) are covered with at least 3 factors each
- [ ] For each factor: impact (1-5), probability (1-5), trend (↑/↓/→), nature (🟢/🔴/🟡), horizon
- [ ] Nature justified: opportunity / risk / dual — per the protocol rule
- [ ] Scoring correct: Score = Impact × Probability, top factors (≥12) highlighted
- [ ] Trends justified with causes and sources
- [ ] No overlaps between categories
- [ ] Scenario analysis: 3 scenarios with assumptions, impact, probability, and response
- [ ] Trigger points defined for the pessimistic scenario
- [ ] Recommendations are specific, prioritized (P1/P2/P3), and tied to factors
- [ ] Analysis reflects the specified horizon and geographic focus
- [ ] Data sources cited; data older than 12 months marked with ⚠️

## Handoff
The output of `$pest-analysis` serves as input for:
- **Strategist / Mediator** — macro-environment for strategic decisions and risk assessment.
- **`swot-analysis`** — external Opportunities and Threats derived from PESTEL factors.
- **`tam-sam-som`** — macro constraints on market size (regulatory, economic).
- **`ansoff-matrix`** — macro risks for growth strategies in new markets.
- **`competitive-analysis`** — regulatory barriers to entry for competitors.

Handoff format: factor summary table + macro-environment profile + scenario analysis + recommendations. Use `$handoff` to transfer context.

## Anti-patterns

| Error | Why it's bad | Correct Approach |
|-------|--------------|------------------|
| Listing factors without scoring | An unprioritized list is useless | Each factor gets Score = Impact × Probability |
| Ignoring trends | A static snapshot ignores dynamics | Provide Trend ↑/↓/→ + horizon + cause |
| Confusing categories | Putting a legal factor under "Political" muddles the analysis| Strictly separate by PESTEL categories |
| Focusing solely on negative factors | Opportunities get lost | Nature: 🟢 opportunity / 🔴 risk / 🟡 dual |
| Lack of geographic focus | Factors vary by country | Always specify region / country |
| Identical scores for all factors | No differentiation, no priorities | Use the full 1-5 scale, justify each score |
| Scenarios without trigger points | Unclear when to activate contingency | Trigger: specific condition → specific action |
| Factors without sources | Cannot be verified, subjective opinions | Each fact must have source and date; >12mo = ⚠️ |

## Output Template

```markdown
## PEST/PESTEL Analysis: [Subject of Analysis]
**Region:** [Geography]  |  **Horizon:** [Period]  |  **Mode:** PEST / PESTEL  |  **Date:** [Date]

### Factor Summary Table

| # | Cat. | Factor | Impact (1-5) | Prob. (1-5) | Score | Trend | Nature | Horizon | Source |
|---|------|--------|:------------:|:-----------:|:-----:|:-----:|:------:|---------|--------|
| 1 | P | [Factor] | X | X | XX | ↑/↓/→ | 🟢/🔴/🟡 | Short/Mid/Long | [Source] |

### Heatmap (TOP Factors)

| Factor | Score | Trend | Cat. | Nature | Recommendation |
|--------|:-----:|:-----:|------|:------:|----------------|
| [Factor] | XX 🔴 | ↑ | [X] | Risk | [Action] |

Thresholds: 🔴 ≥ 16 critical | 🟡 12-15 significant | < 12 background

### Macro-Environment Profile

| Category | Avg. Score | Trend | Evaluation |
|----------|:----------:|:-----:|------------|
| Political | X.X | ↑/↓/→ | 🟢 Favorable / 🟡 Neutral / 🔴 Hostile |
| Economic | X.X | ↑/↓/→ | ... |
| Social | X.X | ↑/↓/→ | ... |
| Technological | X.X | ↑/↓/→ | ... |
| Environmental | X.X | ↑/↓/→ | ... |
| Legal | X.X | ↑/↓/→ | ... |

**Overall profile:** [1-2 sentences]

### Scenario Analysis

| Scenario | Key Assumptions | Business Impact | Probability | Strategic Response |
|----------|-----------------|-----------------|:-----------:|--------------------|
| Optimistic | [Which factors improve] | [What it yields] | XX% | [What to do] |
| Base | [Current trends continue] | [What to expect] | XX% | [What to do] |
| Pessimistic | [Which factors worsen] | [What the threat is] | XX% | [What to do] |

**Trigger points (pessimistic):** [Under what condition → what action]

### Strategic Recommendations

| # | Factor | Type | Recommendation | Priority | Timeframe |
|---|--------|:----:|----------------|:--------:|-----------|
| 1 | [Factor] | 🔴 | [Mitigation] | P1 | [When] |
| 2 | [Factor] | 🟢 | [How to leverage] | P2 | [When] |

**Review Frequency:** [quarterly / annually]

### Sources and Assumptions

| # | Fact / Assumption | Source | Date | Reliability |
|---|-------------------|--------|------|:-----------:|
| 1 | [Fact] | [Source] | [Date] | ✅ / ⚠️ / 🔮 |

Legend: ✅ Verified (2+ sources) | ⚠️ Estimated (1 source) | 🔮 Assumed (expert assessment)
```
