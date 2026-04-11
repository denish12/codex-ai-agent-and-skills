---
name: bcg-matrix
description: Portfolio analysis — classifying business units by market growth and relative market share
---
# BCG Matrix — Business Unit Portfolio Analysis

## When to Use
- When managing a **portfolio of products or business units** — resource allocation.
- When making decisions about **investments, divestitures, or liquidation** of business lines.
- When conducting **strategic planning** — balancing the portfolio across lifecycle phases.
- When preparing for **M&A** — evaluating target companies or divisions.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| List of business units | ✅ | Products, brands, divisions, or segments |
| Market data | ✅ | Market size, growth rates for each segment |
| Market shares | ✅ | Company share and largest competitor's share |
| Revenue by unit | ⬚ | For bubble size visualization |
| Threshold values | ⬚ | Custom growth and share thresholds (default: growth 10%, share 1.0) |
| Horizon | ⬚ | Analysis period (default — current year) |

## Data Sources
1. Internal reporting — revenue, margin, CAPEX by business unit.
2. Market research — market shares, market volumes.
3. Industry reports — segment growth rates, forecasts.
4. Competitive intelligence — major competitors' shares.
5. Financial models — cash flows, ROI by line of business.

## Protocol

### Step 0 — Context Preparation
1. Define the portfolio: list all business units (BUs) under analysis.
2. Define the relevant market for each BU.
3. Set threshold values:
   - Market growth: high/low boundary (typically 10% or portfolio average).
   - Relative market share: high/low boundary (typically 1.0 — parity with the leader).
4. Collect data: market shares, growth rates, revenue.

### Step 1 — Calculate Relative Market Share
1. For each BU: relative share = company share / largest competitor's share.
2. Value > 1.0: company is the market leader.
3. Value < 1.0: company is not the leader.
4. Record absolute share for context.
5. If precise data is unavailable — use expert estimates with a notation.

### Step 2 — Determine Market Growth Rates
1. For each BU: determine market CAGR over the last 3 years or 3-year forecast.
2. Classify: above threshold = high growth, below = low growth.
3. Account for specifics: for mature industries, the threshold may be lower (5%).
4. Record the forecast trend: accelerating or decelerating growth.

### Step 3 — Quadrant Classification
1. **Stars** — high growth + high share:
   - Leaders in growing markets, require significant investment.
   - Transform into Cash Cows as growth slows.
2. **Cash Cows** — low growth + high share:
   - Cash generators, require minimal investment.
   - Fund Stars and Question Marks.
3. **Question Marks** — high growth + low share:
   - Potential exists, but require major investment to grow share.
   - Key decision: invest aggressively or exit.
4. **Dogs** — low growth + low share:
   - Minimal strategic value.
   - Candidates for optimization, sale, or liquidation.

### Step 4 — Build the Matrix
1. Place each BU on the 2x2 matrix.
2. Bubble size — proportional to revenue (if data is available).
3. Add trend arrows: where the BU is heading (share and market growth/decline).
4. Flag BUs on quadrant boundaries.

### Step 5 — Resource Allocation Strategy
1. For each BU, determine the strategic action:
   - **Stars**: Invest to maintain leadership.
   - **Cash Cows**: Harvest, minimal investment.
   - **Question Marks**: Selective investment or divestiture.
   - **Dogs**: Optimize, sell, or liquidate.
2. Determine the volume of resource reallocation between quadrants.
3. Calculate cash flow by quadrant: who generates, who consumes.

### Step 6 — Portfolio Balance
1. Assess portfolio balance:
   - Healthy portfolio: Cash Cows fund Stars and Question Marks.
   - Imbalance: too many Dogs or absence of Stars.
2. Identify portfolio gaps: what is missing for sustainable growth.
3. Formulate rebalancing recommendations.

### Step 7 — Synthesis and Conclusions
1. Formulate the portfolio strategy: overall direction.
2. Define top priorities for investments and divestitures.
3. Record risks of the current portfolio configuration.
4. Recommend review frequency (typically annually).

## Validation (Quality Gate)

- [ ] All business units classified by quadrant
- [ ] Relative market share calculated correctly (share / leader's share)
- [ ] Market growth rates supported by data (CAGR or forecast)
- [ ] Threshold values recorded and justified
- [ ] Each BU has a strategic action
- [ ] Portfolio balance assessed (cash flow between quadrants)
- [ ] Trends and dynamics accounted for (movement arrows)
- [ ] Recommendations are specific and tied to quadrants

## Handoff
Result -> Strategist / Mediator for portfolio strategy formulation, budgeting, or M&A decisions.

## Anti-patterns

| Mistake | Why It's Bad | How to Do It Right |
|---------|-------------|-------------------|
| Using absolute share instead of relative | Doesn't show position vs leader | Relative = share / largest competitor's share |
| Incorrect quadrant boundaries | All BUs end up in one quadrant | Calibrate thresholds for the industry and portfolio |
| Ignoring BU size | A small "Star" and a large "Dog" are not equivalent | Use bubble size = revenue |
| Static analysis without trends | Can't see where BU is heading | Add arrows and 2-3 year forecast |
| Automatic liquidation of "Dogs" | Some "Dogs" create synergy | Verify strategic value before making a decision |
| No portfolio balance assessment | Decisions for each BU in isolation | Look at the portfolio as a whole: who funds whom |

## Output Template

```
## BCG Matrix: [Company / Portfolio Name]
**Period:** [year]  |  **Growth Threshold:** [X%]  |  **Share Threshold:** [X.X]  |  **Date:** [date]

### 2x2 Matrix

|  | High Rel. Share (> [threshold]) | Low Rel. Share (< [threshold]) |
|--|:------------------------------:|:-----------------------------:|
| **High Growth (> [threshold]%)** | ★ **Stars** | ? **Question Marks** |
|  | [BU1] (share: X.X, growth: X%) | [BU3] (share: X.X, growth: X%) |
|  | [BU2] (share: X.X, growth: X%) | [BU4] (share: X.X, growth: X%) |
| **Low Growth (< [threshold]%)** | $ **Cash Cows** | ✕ **Dogs** |
|  | [BU5] (share: X.X, growth: X%) | [BU7] (share: X.X, growth: X%) |
|  | [BU6] (share: X.X, growth: X%) | |

### Business Unit Details

| # | Business Unit | Quadrant | Rel. Share | Market Growth | Revenue | Trend | Strategy |
|---|--------------|----------|:---------:|:------------:|:-------:|:-----:|----------|
| 1 | [BU1] | Star | 1.8 | 15% | $XXM | → $ | Invest |
| 2 | [BU2] | Cash Cow | 2.1 | 3% | $XXM | → | Harvest |
| 3 | [BU3] | Question Mark | 0.4 | 20% | $XXM | → ★? | Selective investment |
| 4 | [BU4] | Dog | 0.3 | 2% | $XXM | → | Optimize / exit |

### Portfolio Balance

| Quadrant | # of BUs | % of Revenue | Cash Flow | Assessment |
|----------|:--------:|:------------:|:---------:|------------|
| Stars | [N] | [X%] | Consuming | [OK / Too few / Too many] |
| Cash Cows | [N] | [X%] | Generating | ... |
| Question Marks | [N] | [X%] | Consuming | ... |
| Dogs | [N] | [X%] | Neutral | ... |

### Resource Allocation Strategy
[1-2 paragraphs: where to redirect resources from and to, top priorities, risks]

### Recommendations
1. [Action 1] — [BU], [rationale]
2. [Action 2] — ...
```
