---
name: pest-analysis
description: Macro-environment analysis — political, economic, social, technological, environmental, and legal factors
---
# PEST/PESTEL Analysis — Macro-Environment Analysis

## When to Use
- When assessing the **macro-environment** before entering a new market or launching a new product.
- When conducting **strategic planning** — to understand external factors affecting the business.
- When analyzing **regulatory and political risks** in specific regions or industries.
- When preparing **investment decisions** — assessing country and industry risk.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Subject of analysis | ✅ | Company, industry, market, or region |
| Geographic focus | ✅ | Country / region / global scope |
| Analysis horizon | ⬚ | Forecast period (default — 3-5 years) |
| Mode | ⬚ | PEST (4 factors) or PESTEL (6 factors, default) |
| Industry | ⬚ | Specific industry for factor focusing |
| Strategic objectives | ⬚ | Context for assessing factor impact |

## Data Sources
1. Government statistical agencies — macroeconomic indicators, demographics.
2. Central banks and regulators — interest rates, regulatory initiatives.
3. Industry associations — industry reports, forecasts.
4. International organizations — World Bank, IMF, WTO, OECD.
5. Technology reviews — Gartner, Forrester, McKinsey, BCG.
6. Environmental and legal databases — ESG ratings, legislation registries.

## Protocol

### Step 0 — Context Preparation
1. Define the subject of analysis and geographic focus.
2. Clarify the mode: PEST (4 factors) or PESTEL (6 factors).
3. Record the analysis horizon and strategic context.
4. Define key questions the analysis should answer.
5. Collect available data from sources.

### Step 1 — Political Factors
1. Assess political stability and form of government.
2. Analyze current and planned government policies affecting the industry.
3. Evaluate trade policy: tariffs, sanctions, trade agreements.
4. Analyze tax policy and government incentives.
5. Assess corruption risks and institutional quality.
6. For each factor: determine impact (1-5), probability (1-5), trend (↑/↓/→).

### Step 2 — Economic Factors
1. Analyze macroeconomic indicators: GDP, inflation, unemployment.
2. Evaluate currency risks and exchange rate dynamics.
3. Analyze interest rates and capital availability.
4. Assess purchasing power and consumption structure.
5. Analyze economic cyclicality and business cycle phase.
6. For each factor: impact (1-5), probability (1-5), trend (↑/↓/→).

### Step 3 — Social Factors
1. Analyze demographic trends: age structure, urbanization, migration.
2. Assess cultural norms and values affecting consumption.
3. Analyze education levels and workforce qualifications.
4. Evaluate changes in lifestyle and consumer preferences.
5. Analyze social inequality and its impact on markets.
6. For each factor: impact (1-5), probability (1-5), trend (↑/↓/→).

### Step 4 — Technological Factors
1. Assess the level of technological development in the region / industry.
2. Analyze the pace of technological change and disruption.
3. Evaluate R&D investment — public and private.
4. Analyze the level of digitization and internet penetration.
5. Assess the impact of automation and AI on the industry.
6. For each factor: impact (1-5), probability (1-5), trend (↑/↓/→).

### Step 5 — Environmental Factors (PESTEL)
1. Analyze environmental legislation and regulatory requirements.
2. Assess climate risks and their impact on business.
3. Analyze ESG trends and stakeholder pressure.
4. Evaluate resource availability and costs (energy, raw materials, water).
5. Analyze carbon footprint and sustainability requirements.
6. For each factor: impact (1-5), probability (1-5), trend (↑/↓/→).

### Step 6 — Legal Factors (PESTEL)
1. Analyze the regulatory environment: licensing, certification, compliance.
2. Evaluate intellectual property protection and patent law.
3. Analyze labor legislation and its impact on workforce strategy.
4. Assess data protection and privacy (GDPR, local equivalents).
5. Analyze antitrust regulation and its market impact.
6. For each factor: impact (1-5), probability (1-5), trend (↑/↓/→).

### Step 7 — Scoring and Prioritization
1. Calculate the overall score for each factor: Impact x Probability.
2. Identify top factors per category (score >= 12).
3. Build a risk and opportunity heat map.
4. Highlight critical factors requiring immediate response.

### Step 8 — Synthesis and Conclusions
1. Formulate the overall macro-environment profile (favorable / neutral / hostile).
2. Identify key change drivers on the analysis horizon.
3. Record scenarios: optimistic, baseline, pessimistic.
4. Prepare strategic recommendations accounting for macro factors.

## Validation (Quality Gate)

- [ ] All categories (P/E/S/T or P/E/S/T/E/L) covered with at least 3 factors
- [ ] Each factor has an impact rating (1-5), probability (1-5), and trend
- [ ] Factors supported by data and sources
- [ ] Scoring is correct: overall score = impact x probability
- [ ] Trends are justified (↑/↓/→) with reasons provided
- [ ] Critical factors highlighted with recommendations
- [ ] Analysis accounts for the specified horizon and geographic focus
- [ ] No duplication between categories

## Handoff
Result -> Strategist / Mediator for integration into strategic analysis, risk assessment, or investment decision.

## Anti-patterns

| Mistake | Why It's Bad | How to Do It Right |
|---------|-------------|-------------------|
| Listing factors without impact assessment | A list without priorities is useless | Each factor — with impact and probability scores |
| Ignoring trends | A static snapshot doesn't show dynamics | Always indicate trend ↑/↓/→ and horizon |
| Mixing categories | A legal factor in "Political" confuses the analysis | Strictly separate by PESTEL categories |
| Focus only on negative factors | Opportunities are missed | Analyze both risks and opportunities |
| No geographic specificity | Factors differ by country | Always specify region / country |
| Identical scores for all factors | No differentiation, no priorities | Use the full 1-5 scale, justify ratings |

## Output Template

```
## PEST/PESTEL Analysis: [Subject of Analysis]
**Region:** [geography]  |  **Horizon:** [period]  |  **Date:** [date]

### Factor Summary Table

| # | Category | Factor | Impact (1-5) | Probability (1-5) | Score | Trend | Nature |
|---|----------|--------|:------------:|:-----------------:|:-----:|:-----:|--------|
| 1 | Political | [Factor P1] | 4 | 3 | 12 | ↑ | Risk |
| 2 | Political | [Factor P2] | 3 | 4 | 12 | → | Opportunity |
| 3 | Economic | [Factor E1] | 5 | 4 | 20 | ↓ | Risk |
| 4 | Social | [Factor S1] | 3 | 3 | 9 | ↑ | Opportunity |
| 5 | Technological | [Factor T1] | 4 | 5 | 20 | ↑ | Opportunity |
| 6 | Environmental | [Factor En1] | 3 | 4 | 12 | ↑ | Risk |
| 7 | Legal | [Factor L1] | 4 | 3 | 12 | → | Risk |

### Heat Map (Top Factors, Score >= 12)

| Factor | Score | Trend | Category | Recommendation |
|--------|:-----:|:-----:|----------|----------------|
| [Factor] | 20 | ↑ | T | [Action] |
| [Factor] | 20 | ↓ | E | [Action] |

### Macro-Environment Profile

| Category | Average Score | Overall Trend | Assessment |
|----------|:------------:|:-------------:|------------|
| Political | [X.X] | [↑/↓/→] | [Favorable / Neutral / Hostile] |
| Economic | [X.X] | [↑/↓/→] | ... |
| Social | [X.X] | [↑/↓/→] | ... |
| Technological | [X.X] | [↑/↓/→] | ... |
| Environmental | [X.X] | [↑/↓/→] | ... |
| Legal | [X.X] | [↑/↓/→] | ... |

### Strategic Conclusions
[1-2 paragraphs: overall macro-environment assessment, key drivers, scenarios, recommendations]
```
