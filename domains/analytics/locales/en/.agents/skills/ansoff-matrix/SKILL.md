---
name: ansoff-matrix
description: Growth strategy — market penetration, market development, product development, diversification
---
# Ansoff Matrix — Business Growth Strategy

## When to use
- When choosing a **growth strategy** — where to allocate resources scaling.
- When assessing **new market opportunities** — entering new markets or segments.
- When planning **product line expansion** — new products for existing or new customers.
- When making decisions about **diversification** — assessing risks and potential.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Company / business unit | ✅ | The entity for which the growth strategy is being determined |
| Current products | ✅ | List of existing products / services with revenue and margin |
| Current markets | ✅ | List of current markets, segments, geographies with share and dynamics |
| Strategic growth goals | ⬚ | Target metrics (revenue, share, profit) and horizon |
| Available resources | ⬚ | Budget, competencies, timeframes |
| Competitive context | ⬚ | Market position, strengths, brand |
| Risk appetite | ⬚ | Conservative / moderate / aggressive |

> If required fields are not provided — **ask** the user, do not generate assumptions.

## Data Sources
1. Internal reporting — revenue and margin by products and markets.
2. Market research — market size, growth potential, customer segments.
3. Competitive analysis — market shares, competitors' growth strategies.
4. Customer data — LTV, churn, cross-sell potential, satisfaction.
5. Industry forecasts — trends, new niches, technological shifts.

### Connection with other skills
| Skill | What we take | When to call |
|------|-----------|----------------|
| `tam-sam-som` | TAM/SAM/SOM to assess new markets (steps 2, 4) | If there is no data on the target market size |
| `competitive-analysis` | Competitor shares, entry barriers, moats (steps 1, 2) | If there is no competitive context |
| `swot-analysis` | Strengths/weaknesses, opportunities/threats (step 0) | If the strategic position is undefined |
| `web-research` | Verification of market data, trends | If data sources are missing or outdated (>12 months) |

## Protocol

### Step 0 — Context Preparation
1. Define the current portfolio of products and markets.
2. Establish a baseline for each "product × market" pair:

   | Pair | Revenue | Market Share | Margin | YoY Dynamics |
   |------|---------|:----------:|:-----:|:------------:|
   | [Product A × Market 1] | $XXM | XX% | XX% | +/-XX% |

3. Define strategic growth goals and the horizon (1-3 years).
4. Assess available resources and constraints.
5. Establish the organization's risk appetite (conservative / moderate / aggressive).

> Every market fact  — specifying the source and date. Data older than 12 months — mark with ⚠️ and verify via `web-research`.

### Step 1 — Market Penetration
*Existing products → Existing markets. Risk: low.*

1. Analyze the potential for increasing share in current markets with current products.
2. Assess opportunities:
   - Increasing consumption frequency by existing customers.
   - Attracting competitors' customers (switching).
   - Converting non-consumers in the current segment.
3. Define tools: pricing, promo, distribution, loyalty.
4. For each initiative, fill out a card:

   | Field | Value |
   |------|----------|
   | Initiative | [Name] |
   | Mechanics | [How it works] |
   | Potential | +$XXM / +XX% share |
   | Investment | $XM |
   | Timeframe | X months |
   | Expected ROI | XX% |
   | Risk (1-5) | 1-2 |

### Step 2 — Market Development
*Existing products → New markets. Risk: medium.*

1. Identify new markets for existing products:
   - New geographies (cities, countries, regions).
   - New customer segments (age, income, B2B vs B2C).
   - New distribution channels (online, partners, franchise).
2. For each new market, assess:
   - Size and potential — use `tam-sam-som` if there is no data.
   - Entry barriers (regulatory, cultural, competitive) — use `competitive-analysis` for assessment.
   - Required product adaptation (localization, customization).
3. For each initiative, fill out a card (similar to step 1, risk 2-3).

### Step 3 — Product Development
*New products → Existing markets. Risk: medium.*

1. Identify new products for existing markets:
   - Expanding the current product line (new SKUs, tiers).
   - Upgrades and next generations of products.
   - Complementary products and services.
   - Cross-sells and up-sells.
2. For each new product, assess:
   - Alignment with current customer needs (product-market fit).
   - Synergy with current competencies and infrastructure.
   - Time-to-market.
3. For each initiative, fill out a card (similar to step 1, risk 2-3).

### Step 4 — Diversification
*New products → New markets. Risk: high.*

1. Consider diversification options:
   - **Related**: new product in a new market, but with synergy with the current business.
   - **Unrelated**: entirely new direction with no synergy.
2. For each option, assess:
   - Strategic rationale (why step outside the current business).
   - Potential synergy (technologies, brand, distribution, customers).
   - Required competencies — whether they exist internally or M&A / partnership is needed.
   - Investment size and payback period.
3. Consider alternatives: partnership, JV, licensing vs organic growth.
4. For each initiative, fill out a card (similar to step 1, risk 4-5).

### Step 5 — Comparative Portfolio Analysis
*End-to-end assessment of all initiatives from steps 1-4.*

1. Gather all initiatives into a single scoring table:

   | # | Quadrant | Initiative | Potential (1-10) | Risk (1-5) | ROI | Feasibility (1-10) | Synergy (1-10) | **Score** |
   |---|----------|-----------|:----------------:|:----------:|:---:|:--------------------:|:---------------:|:---------:|
   | 1 | MP | [Name] | X | X | XX% | X | X | **XX** |

2. Scoring formula (adapt weights according to risk appetite):

   | Risk appetite | wPotential | wRisk (invert.) | wROI | wFeasibility | wSynergy |
   |:------------:|:----------:|:---------------:|:----:|:--------------:|:---------:|
   | Conservative | 0.20 | 0.30 | 0.25 | 0.15 | 0.10 |
   | Moderate | 0.25 | 0.20 | 0.25 | 0.15 | 0.15 |
   | Aggressive | 0.35 | 0.10 | 0.20 | 0.15 | 0.20 |

   `Score = wPotential × Potential + wRisk × (6 - Risk) + wROI × norm(ROI) + wFeasibility × Feasibility + wSynergy × Synergy`

3. Rank initiatives by Score. Select Top-N into the portfolio.
4. Check the portfolio for balance: at least 2 quadrants are represented.

### Step 6 — Scenario Analysis
1. For the top 3 initiatives, build 3 scenarios:

   | Scenario | Potential | Probability | Key Assumption |
   |----------|-----------|:-----------:|---------------------|
   | Optimistic | +XX% from base | XX% | [What must come true] |
   | Base | base | XX% | [Current trends] |
   | Pessimistic | -XX% from base | XX% | [What could go wrong] |

2. Calculate the weighted expected value (EV) for each initiative.
3. Determine kill-conditions: under what scenario the initiative should be shut down.

### Step 7 — Resource Allocation and Roadmap
1. Allocate budget across quadrants (% of total growth budget).
2. Typical proportions (guideline, not dogma):

   | Risk appetite | Penetration | Market Development | Product Development | Diversification |
   |:------------:|:-------------:|:--------------:|:-----------------:|:--------------:|
   | Conservative | 50-60% | 20-25% | 15-20% | 0-5% |
   | Moderate | 35-45% | 20-25% | 20-25% | 10-15% |
   | Aggressive | 20-30% | 20-25% | 25-30% | 20-30% |

3. Formulate a roadmap with specific milestones, owners, and KPIs.
4. Define gates: go/no-go decision points for each initiative.

### Step 8 — Synthesis and Conclusions
1. Formulate the recommended growth path (1-2 paragraphs of strategic logic).
2. Define key KPIs to track progress.
3. Record critical decisions and deadlines.
4. Prepare an action plan with owners and milestones.

## Example — SaaS Analytics Platform

**Context:** B2B SaaS, product — business analytics platform. Revenue $12M ARR, 200 customers in the SMB segment of RF, margin 72%, growth +25% YoY. Goal: $30M ARR in 2 years. Risk appetite: moderate.

| | Existing products | New products |
|--|:---------------------:|:--------------:|
| **Existing markets** | **MP: Upsell to Enterprise tier** | **PD: AI predictive analytics module** |
| (SMB RF) | Potential: +$3M, Risk: 1, ROI: 180% | Potential: +$5M, Risk: 3, ROI: 90% |
| | Switch 40 top customers to Pro tier | Add-on to the core product, cross-sell |
| **New markets** | **MD: Expansion to CIS (KZ, UZ)** | **D: White-label for banks** |
| | Potential: +$4M, Risk: 3, ROI: 65% | Potential: +$8M, Risk: 5, ROI: 45% |
| | TAM CIS = $50M, SOM = $4M (via partners) | Related diversification, integration needed |

**Scoring (moderate):** MP = 8.2, PD = 7.1, MD = 6.4, D = 5.0 → Portfolio: MP + PD + MD.
**Budget:** Penetration 40%, Product Development 30%, Market Development 25%, Diversification 5% (research).
**Kill-condition for MD:** if SOM < $1.5M after 6 months — shut down.

## Validation (Quality Gate)

- [ ] All 4 quadrants are analyzed with specific initiatives
- [ ] Baseline recorded: revenue, share, margin for each "product × market" pair
- [ ] Card filled out for each initiative: potential, risk, ROI, investment, timeframe
- [ ] Scoring performed using a unified model factoring in risk appetite
- [ ] Scenario analysis for top 3 initiatives (optimistic / base / pessimistic)
- [ ] Portfolio is balanced: at least 2 quadrants are represented
- [ ] Resource allocation is justified and tied to risk appetite
- [ ] Roadmap has milestones, owners, and go/no-go gates
- [ ] Kill-conditions defined for initiatives with risk ≥ 3
- [ ] Data sources indicated; data older than 12 months marked with ⚠️

## Handoff
Result is handed over to:
- **Strategist / Mediator** — to integrate into the strategic plan and budget.
- **`unit-economics`** — to calculate detailed unit economics for selected initiatives.
- **`competitive-analysis`** — for in-depth competitor analysis in new markets (step 2).
- **`tam-sam-som`** — to refine market estimates if approximate data was used.

Handoff format: filled output template + scoring table + scenario analysis.

## Anti-patterns

| Error | Why it's bad | How to do it correctly |
|--------|-------------|---------------|
| Focus only on penetration | Current market potential is finite, company misses opportunities | Assess all 4 quadrants, portfolio of at least 2 quadrants |
| Diversification without rationale | The riskiest quadrant without strategic logic | Diversification only with clear rationale + related > unrelated |
| One strategy instead of a portfolio | All resources in one direction — no fallback | Combine strategies with varying risk levels and horizons |
| Ignoring risks | Optimistic plans without validation → failure | Each initiative — with scoring, scenarios, and kill-conditions |
| Lack of baseline metrics | Growth "from unknown" cannot be measured | Start by recording a baseline: revenue, share, margin by pairs |
| Mixing market and product development | Unclear where growth comes from, focus blurs | Explicitly: new market (MD) vs new product (PD), don't mix |
| Estimating "by eye" without a model | Subjective priorities, unreproducible result | Unified scoring with weights adapted to risk appetite |
| Data without sources | Impossible to verify, quickly becomes outdated | Every fact — with source and date; >12 months = ⚠️ |

## Output Template

```
## Ansoff Matrix: [Company / BU]
**Horizon:** [period]  |  **Risk appetite:** [conserv./mod./aggress.]  |  **Date:** [date]

### Baseline — current portfolio

| "Product × Market" pair | Revenue | Market Share | Margin | YoY Dynamics |
|-------------------------|---------|:----------:|:-----:|:------------:|
| [Product A × Market 1] | $XXM | XX% | XX% | +/-XX% |

### 2×2 Matrix

|  | Existing products | New products |
|--|:---------------------:|:--------------:|
| **Existing markets** | **Market Penetration** | **Product Development** |
|  | Risk: Low | Risk: Medium |
|  | 1. [Initiative MP1] | 1. [Initiative PD1] |
|  | 2. [Initiative MP2] | 2. [Initiative PD2] |
| **New markets** | **Market Development** | **Diversification** |
|  | Risk: Medium | Risk: High |
|  | 1. [Initiative MD1] | 1. [Initiative D1] |
|  | 2. [Initiative MD2] | 2. [Initiative D2] |

### Initiative Scoring

| # | Quadrant | Initiative | Potential (1-10) | Risk (1-5) | ROI | Feasibility (1-10) | Synergy (1-10) | **Score** |
|---|----------|-----------|:----------------:|:----------:|:---:|:--------------------:|:---------------:|:---------:|
| 1 | MP | [Name] | X | X | XX% | X | X | **X.X** |

Scoring model: [conserv./mod./aggress.] — weights: [wP/wR/wROI/wFeas/wSyn]

### Scenario Analysis (top-3)

| Initiative | Optimistic | Base | Pessimistic | EV | Kill-condition |
|------------|:-------------:|:-------:|:--------------:|:--:|-------------|
| [MP1] | +$XXM (p=XX%) | +$XXM (p=XX%) | +$XXM (p=XX%) | $XXM | [Condition] |

### Resource Allocation

| Quadrant | % budget | Abs. value | Rationale |
|----------|:---------:|:-------------:|-------------|
| Market Penetration | [X%] | $XM | [Why] |
| Market Development | [X%] | $XM | [Why] |
| Product Development | [X%] | $XM | [Why] |
| Diversification | [X%] | $XM | [Why] |

### Portfolio Risk Profile

| Quadrant | Risk | Main threats | Mitigation |
|----------|:----:|----------------|-----------|
| Penetration | Low | [Threats] | [Measures] |
| Market Development | Medium | [Threats] | [Measures] |
| Product Development | Medium | [Threats] | [Measures] |
| Diversification | High | [Threats] | [Measures] |

### Recommended Growth Path
[1-2 paragraphs: strategic logic, priorities, why specifically this portfolio]

### Roadmap

| Period | Action | Quadrant | Owner | KPI | Go/No-go gate |
|--------|----------|----------|---------------|-----|---------------|
| Q1-Q2 | [Action] | [X] | [Who] | [Metric] | [Condition] |
| Q3-Q4 | [Action] | [X] | [Who] | [Metric] | [Condition] |
| Year 2 | [Action] | [X] | [Who] | [Metric] | [Condition] |

### Sources and Assumptions

| # | Fact / assumption | Source | Date | Reliability |
|---|-------------------|----------|------|:-------------:|
| 1 | [Fact] | [Source] | [Date] | ✅ / ⚠️ / 🔮 |

Legend: ✅ Verified (2+ sources) | ⚠️ Estimated (1 source) | 🔮 Assumed (expert assessment)
```
