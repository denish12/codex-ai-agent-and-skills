---
name: ansoff-matrix
description: Growth strategy — market penetration, market development, product development, diversification
---
# Ansoff Matrix — Business Growth Strategy

## When to Use
- When choosing a **growth strategy** — where to allocate resources for scaling.
- When evaluating **new market opportunities** — entering new markets or segments.
- When planning **product line expansion** — new products for existing or new customers.
- When making **diversification decisions** — assessing risks and potential.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Company / business unit | ✅ | The entity for which the growth strategy is being defined |
| Current products | ✅ | List of existing products / services |
| Current markets | ✅ | List of current markets, segments, geographies |
| Strategic growth objectives | ⬚ | Target metrics (revenue, market share, profit) |
| Available resources | ⬚ | Budget, competencies, time constraints |
| Competitive context | ⬚ | Market position, strengths, brand |

## Data Sources
1. Internal reporting — revenue and margin by products and markets.
2. Market research — market sizes, growth potential, customer segments.
3. Competitive analysis — market shares, competitor growth strategies.
4. Customer data — LTV, churn, cross-sell potential, satisfaction.
5. Industry forecasts — trends, new niches, technology shifts.

## Protocol

### Step 0 — Context Preparation
1. Define the current product and market portfolio.
2. Record the current position: revenue, share, profitability for each "product-market" pair.
3. Define strategic growth objectives and planning horizon.
4. Assess available resources and constraints.
5. Establish the organization's risk appetite (conservative / moderate / aggressive).

### Step 1 — Market Penetration
1. Analyze the potential for increasing share in current markets with current products.
2. Evaluate opportunities:
   - Increasing consumption frequency among existing customers.
   - Acquiring competitors' customers (switching).
   - Converting non-consumers within the current segment.
3. Identify instruments: pricing, promotions, distribution, loyalty programs.
4. Estimate potential impact: revenue / share growth.
5. Assess risk: low (familiar product, familiar market).
6. Determine required investment and ROI.

### Step 2 — Market Development
1. Identify new markets for existing products:
   - New geographies (cities, countries, regions).
   - New customer segments (age, income, B2B vs B2C).
   - New distribution channels (online, partnerships, franchise).
2. For each new market, evaluate:
   - Size and potential (TAM, SAM, SOM).
   - Entry barriers (regulatory, cultural, competitive).
   - Required product adaptation (localization, customization).
3. Assess risk: medium (familiar product, new market).
4. Determine required investment and expected ROI.

### Step 3 — Product Development
1. Identify new products for existing markets:
   - Extending the current product line (new SKUs, plans).
   - Upgrades and next-generation products.
   - Complementary products and services.
   - Cross-sell and up-sell opportunities.
2. For each new product, evaluate:
   - Alignment with current customer needs (product-market fit).
   - Synergy with existing competencies and infrastructure.
   - Time-to-market.
3. Assess risk: medium (new product, familiar market).
4. Determine required R&D investment and expected ROI.

### Step 4 — Diversification
1. Consider diversification options:
   - **Related**: new product in a new market, but with synergy to the current business.
   - **Unrelated**: entirely new direction without synergy.
2. For each option, evaluate:
   - Strategic rationale (why move beyond the current business).
   - Potential synergy (technology, brand, distribution, customers).
   - Required competencies — available internally or need M&A / partnership.
   - Investment size and payback period.
3. Assess risk: high (new product, new market).
4. Consider alternatives: partnership, JV, licensing vs organic growth.

### Step 5 — Risk Assessment by Quadrant
1. Build a risk/return matrix for each strategy.
2. Typical risk scale:
   - Penetration: 1-2 (low).
   - Market Development: 2-3 (medium).
   - Product Development: 2-3 (medium).
   - Diversification: 4-5 (high).
3. Compare against the organization's risk appetite.
4. Identify necessary mitigation measures for each strategy.

### Step 6 — Recommended Growth Path
1. Rank strategies by: growth potential, risk, ROI, feasibility.
2. Determine the optimal combination (growth strategy portfolio).
3. Allocate resources across quadrants (% of budget).
4. Formulate a roadmap: what to do first, what comes later.

### Step 7 — Synthesis and Conclusions
1. Formulate the recommended growth path.
2. Define key KPIs for tracking progress.
3. Record critical decisions and timelines.
4. Prepare an action plan with owners and milestones.

## Validation (Quality Gate)

- [ ] All 4 quadrants analyzed with specific initiatives
- [ ] For each initiative, potential, risk, and ROI are defined
- [ ] Current "product-market" portfolio recorded with metrics
- [ ] Risks assessed and compared against the organization's appetite
- [ ] Recommended growth path supported by data
- [ ] Resource allocation across quadrants defined
- [ ] Roadmap has specific milestones and owners
- [ ] Risk mitigation measures recorded

## Handoff
Result -> Strategist / Mediator for integration into the strategic plan, budget, or business plan.

## Anti-patterns

| Mistake | Why It's Bad | How to Do It Right |
|---------|-------------|-------------------|
| Focus only on penetration | Current market potential is finite | Evaluate all 4 quadrants, seek balance |
| Diversification without rationale | The riskiest quadrant without strategic logic | Diversify only with a clear strategic rationale |
| One strategy instead of a portfolio | Putting all eggs in one basket is risky | Combine strategies with different risk levels |
| Ignoring risks | Optimistic plans without validation | Each quadrant — with risk assessment and mitigation measures |
| No metrics for the current position | Growth "from unknown" is impossible to measure | Start by establishing a baseline: revenue, share, margin |
| Mixing market development and product development | Unclear where the growth source is | Clearly separate: new market vs new product |

## Output Template

```
## Ansoff Matrix: [Company / BU]
**Horizon:** [period]  |  **Risk Appetite:** [conserv./moder./aggress.]  |  **Date:** [date]

### 2x2 Matrix

|  | Existing Products | New Products |
|--|:-----------------:|:------------:|
| **Existing Markets** | **Market Penetration** | **Product Development** |
|  | Risk: Low | Risk: Medium |
|  | 1. [Initiative MP1] | 1. [Initiative PD1] |
|  | 2. [Initiative MP2] | 2. [Initiative PD2] |
| **New Markets** | **Market Development** | **Diversification** |
|  | Risk: Medium | Risk: High |
|  | 1. [Initiative MD1] | 1. [Initiative D1] |
|  | 2. [Initiative MD2] | 2. [Initiative D2] |

### Initiative Details

| # | Quadrant | Initiative | Potential | Risk (1-5) | ROI | Investment | Timeline |
|---|----------|-----------|-----------|:----------:|-----|-----------|----------|
| 1 | Penetration | [MP1] | +$XXM | 1 | XX% | $XM | 6 mo |
| 2 | Market Development | [MD1] | +$XXM | 3 | XX% | $XM | 12 mo |
| 3 | Product Development | [PD1] | +$XXM | 2 | XX% | $XM | 9 mo |
| 4 | Diversification | [D1] | +$XXM | 4 | XX% | $XM | 18 mo |

### Resource Allocation

| Quadrant | % of Budget | Rationale |
|----------|:-----------:|-----------|
| Market Penetration | [X%] | [Why] |
| Market Development | [X%] | [Why] |
| Product Development | [X%] | [Why] |
| Diversification | [X%] | [Why] |

### Portfolio Risk Profile

| Quadrant | Risk | Key Threats | Mitigation |
|----------|:----:|------------|------------|
| Penetration | Low | [Threats] | [Measures] |
| Market Development | Medium | [Threats] | [Measures] |
| Product Development | Medium | [Threats] | [Measures] |
| Diversification | High | [Threats] | [Measures] |

### Recommended Growth Path
[1-2 paragraphs: strategic logic, priorities, roadmap, KPIs]

### Roadmap
1. **Q1-Q2**: [Action] — quadrant: [X], owner: [who]
2. **Q3-Q4**: [Action] — quadrant: [X], owner: [who]
3. **Year 2**: [Action] — quadrant: [X], owner: [who]
```
