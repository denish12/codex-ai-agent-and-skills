---
name: bcg-matrix
description: Portfolio analysis — distribution of business units by market growth and relative share
---
# BCG Matrix — Business Unit Portfolio Analysis

## When to use
- When managing a **portfolio of products or business units** — resource allocation.
- When making decisions about **investments, divestments, or liquidation** of business lines.
- When **strategic planning** — balancing the portfolio by lifecycle phases.
- When preparing for **M&A** — assessing target companies or divisions.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| List of business units | ✅ | Products, brands, divisions, or segments |
| Market data | ✅ | Market size, growth rates for each segment |
| Market shares | ✅ | Company's share and the largest competitor's share |
| Revenue by units | ⬚ | For visualizing bubble sizes and calculating cash flow |
| Margin by units | ⬚ | For calculating real cash flow (gross margin or contribution margin) |
| Threshold values | ⬚ | Custom thresholds for growth and share (default: 10% growth, 1.0 share) |
| Horizon | ⬚ | Analysis period (default — current year + 2-3 year forecast) |

> If required fields are not provided — **ask** the user, do not generate assumptions.

## Data Sources
1. Internal reporting — revenue, margin, CAPEX by business units.
2. Market research — market shares, market sizes.
3. Industry reports — segment growth rates, forecasts.
4. Competitive intelligence — shares of the main competitors.
5. Financial models — cash flows, ROI by direction.

### Connection with other skills
| Skill | What we take | When to call |
|------|-----------|----------------|
| `tam-sam-som` | Volume and market potential for each BU (steps 0, 2) | If there is no data on market size or growth |
| `competitive-analysis` | Competitor shares, positioning (step 1) | If the share of the largest competitor is unknown |
| `ansoff-matrix` | Growth strategies for Stars and Question Marks (step 5) | After classification — to develop growth strategies |
| `swot-analysis` | Strengths/weaknesses of BUs for invest/divest decisions (step 5) | When decisions regarding Question Marks are unobvious |
| `web-research` | Verification of market data, trends | If data is missing or outdated (>12 months) |

## Protocol

### Step 0 — Context Preparation
1. Define the portfolio: list all analyzed business units (BUs).
2. Define the relevant market for each BU.
3. Establish threshold values:
   - Market growth: boundary high/low (usually 10% or portfolio average).
   - Relative market share: boundary high/low (usually 1.0 — parity with the leader).
   - For mature industries (FMCG, manufacturing), it is permissible to lower the growth threshold to 5%.
4. Collect data: market shares, growth rates, revenue, margin.

> Every market fact  — specifying the source and date. Data older than 12 months — mark with ⚠️ and verify via `web-research`.

### Step 1 — Calculation of Relative Market Share
1. For each BU, calculate:

   | BU | Company share | Largest competitor's share | **Rel. share** | Interpretation |
   |----|:-------------:|:--------------------------:|:-------------:|---------------|
   | [BU1] | XX% | XX% | X.X | Leader / Not a leader |

2. Value > 1.0: company is a market leader.
3. Value < 1.0: company is not a leader.
4. In the absence of exact data — use an expert assessment marked with 🔮.

### Step 2 — Determination of Market Growth Rates
1. For each BU, determine the market CAGR for the last 3 years **and** forecast for 3 years.
2. Classify: above threshold = high growth, below = low growth.
3. Record the trend: accelerating ↗, stable →, decelerating ↘.

   | BU | CAGR (fact 3Y) | Forecast (3Y) | Trend | Classification |
   |----|:--------------:|:------------:|:-----:|:-------------:|
   | [BU1] | XX% | XX% | ↗/→/↘ | High / Low |

### Step 3 — Quadrant Classification
1. **Stars** — high growth + high share:
   - Leaders in growing markets, require significant investments.
   - When growth slows down, they transform into Cash Cows.
2. **Cash Cows** — low growth + high share:
   - Cash generators, require minimal investments.
   - Finance Stars and Question Marks.
3. **Question Marks** — high growth + low share:
   - Have potential, but require major investments to grow share.
   - Key decision: invest aggressively or exit.
4. **Dogs** — low growth + low share:
   - Minimal strategic value.
   - Candidates for optimization, sale, or liquidation.
   - **Exception**: Dogs with high synergy (shared infrastructure, complementarity, anchor customer) — assess separately.

### Step 4 — Building the Matrix
1. Place each BU on a 2×2 matrix.
2. Bubble size — proportional to revenue.
3. Add trend arrows: where the BU is heading over a 2-3 year horizon.
4. Mark BUs on the boundary of quadrants (±10% of the threshold) — label as "borderline".

### Step 5 — Strategy and Decision Scoring
1. For each BU, determine the strategic action:

   | Quadrant | Basic strategy | Nuances |
   |----------|-------------------|--------|
   | **Stars** | Invest to maintain leadership | If trend is ↘ — prepare transition to Cash Cow mode |
   | **Cash Cows** | Harvest, minimal investments | If trend is ↗ (market reviving) — consider re-investments |
   | **Question Marks** | Selective investments **or** divestment | Decision via scoring (see below) |
   | **Dogs** | Optimize, sell or liquidate | Check synergy before decision |

2. **Scoring for Question Marks** (invest vs divest):

   | Criterion | Weight | Scale | Invest if |
   |----------|:---:|:-----:|-------------|
   | Market size (TAM) | 0.20 | 1-10 | ≥ 7 — large market |
   | Competitive position | 0.20 | 1-10 | ≥ 5 — chance for leadership exists |
   | Synergy with portfolio | 0.15 | 1-10 | ≥ 6 — shared channels, technologies |
   | Cost of achieving leadership | 0.20 | 1-10 (invert.) | ≥ 5 — manageable investments |
   | Strategic importance | 0.15 | 1-10 | ≥ 7 — critical for the future |
   | Target margin | 0.10 | 1-10 | ≥ 6 — pays off |

   `Score = Σ(weight × score)`. Threshold: **≥ 6.0 → Invest**, **< 6.0 → Divest**.

3. **Scoring for Dogs** (keep vs exit):

   | Criterion | Keep if |
   |----------|----------|
   | Synergy with Cows/Stars | High — shared infrastructure, channels |
   | Cash flow | Positive — does not consume resources |
   | Exit barrier | High — contractual obligations, reputation |
   | Strategic anchor | Yes — needed to retain a key customer |

   If no criterion is met — recommend exit.

### Step 6 — Portfolio Cash Flow Quantification
1. Calculate cash flow for each quadrant:

   | Quadrant | Revenue | Margin | Cash generation | Investments (CAPEX + OPEX) | **Net Cash Flow** |
   |----------|:-------:|:-----:|:---------------:|:-------------------------:|:-----------------:|
   | Stars | $XXM | XX% | $XXM | -$XXM | -/+$XXM |
   | Cash Cows | $XXM | XX% | $XXM | -$XM | +$XXM |
   | Question Marks | $XXM | XX% | $XM | -$XXM | -$XXM |
   | Dogs | $XXM | XX% | $XM | -$XM | ±$XM |
   | **Total** | | | | | **±$XXM** |

2. Check balance: **Net Cash Flow of Cash Cows ≥ Net Cash Drain of Stars + Question Marks**.
3. If imbalanced — reconsider investments or accelerate divestments.

### Step 7 — Trajectory Analysis and Scenarios
1. For each BU, forecast migration between quadrants over a 2-3 year horizon:

   | BU | Now | In 2-3 years | Migration driver |
   |----|:------:|:--------------:|------------------|
   | [BU1] | ★ Star | $ Cow | Market slows down (CAGR XX% → X%) |
   | [BU2] | ? Question | ★ Star / ✕ Dog | Depends on investments |

2. Determine **critical forks**: BUs whose fate depends on decisions made now.
3. For the top-3 critical BUs — 3 scenarios:

   | BU | Scenario | Result in 3 years | Probability | Condition |
   |----|----------|:----------------------:|:-----------:|---------|
   | [BU2] | Invest aggressively | ★ Star, share 1.3 | 40% | +$XM investments, market grows ≥ XX% |
   | [BU2] | Maintain current | ? Question → ✕ Dog | 45% | Share stagnates, competitors grow |
   | [BU2] | Divest now | Exit with $XM | 15% | If buyer is found |

### Step 8 — Synthesis and Recommendations
1. Formulate portfolio strategy: overall direction and logic.
2. Determine TOP priorities for investments and divestments.
3. Record risks of the current portfolio configuration.
4. Determine the frequency of review (annually or upon significant market changes).
5. Establish go/no-go gates for each invest/divest decision.

## Example — IT Holding with 5 products

**Context:** IT holding, 5 products. Growth threshold: 10%, share threshold: 1.0. Total revenue $85M.

| BU | Market | Share | Leader's share | Rel. share | CAGR | Revenue | Quadrant |
|----|-------|:----:|:-----------:|:---------:|:----:|:-------:|:--------:|
| CRM platform | CRM for SMB | 28% | 22% | **1.27** | 8% | $30M | $ Cow |
| Cloud analytics | BI/Analytics | 15% | 35% | **0.43** | 22% | $18M | ? Question |
| Cybersecurity | SMB Security | 32% | 25% | **1.28** | 18% | $20M | ★ Star |
| Corp. messenger | Team Comms | 5% | 40% | **0.13** | 4% | $7M | ✕ Dog |
| AI assistant | AI Productivity | 12% | 18% | **0.67** | 35% | $10M | ? Question |

**Scoring Question Marks:**

| Criterion | Cloud analytics | AI assistant |
|----------|:------------------:|:------------:|
| Market size | 7 | 9 |
| Competitive position | 4 | 6 |
| Synergy | 8 (+ CRM, + Security) | 7 (+ CRM) |
| Cost of leadership (inv.) | 3 (expensive, leader is far) | 6 (fragmented market) |
| Strategic importance | 6 | 9 |
| Target margin | 7 | 5 |
| **Score** | **5.5 → Divest** | **7.0 → Invest** |

**Scoring Dog — Corp. messenger:**
- Synergy: low (separate infrastructure) — no
- Cash flow: weakly positive (+$0.3M) — weak "yes"
- Exit barrier: low — no
- Strategic anchor: no → **Recommendation: exit (sale)**

**Cash flow balance:**
- Cows generate: +$12M → Star consumes -$6M, AI assistant -$4M → Balance: +$2M ✅

**Decisions:**
1. CRM platform (Cow): harvest, allocate $12M to Star and AI
2. Cybersecurity (Star): invest $6M, maintain leadership
3. AI assistant (Question → Invest): $4M, goal — share 1.0 in 2 years
4. Cloud analytics (Question → Divest): sell or partner
5. Corp. messenger (Dog → Exit): sell, expected price $5-8M

## Validation (Quality Gate)

- [ ] All business units are classified into quadrants with numerical data
- [ ] Relative market share calculated correctly (share / largest competitor's share)
- [ ] Market growth rates backed by data (CAGR fact + forecast)
- [ ] Threshold values are set and justified for the industry
- [ ] Question Marks evaluated via scoring model (invest vs divest)
- [ ] Dogs checked for synergy prior to exit decision
- [ ] Portfolio cash flow is quantified: Cows cover Stars + Question Marks
- [ ] Migration trajectories defined for each BU over a 2-3 year horizon
- [ ] Scenario analysis conducted for top-3 critical BUs
- [ ] Trends and dynamics accounted for (arrows ↗/→/↘)
- [ ] Data sources indicated; data older than 12 months marked with ⚠️
- [ ] Go/no-go gates defined for each invest/divest decision

## Handoff
Result is handed over to:
- **Strategist / Mediator** — to formulate the portfolio strategy and budgeting.
- **`ansoff-matrix`** — to develop growth strategies for Stars and invested Question Marks.
- **`unit-economics`** — to calculate detailed unit economics per BU.
- **`competitive-analysis`** — for in-depth competitor analysis in low-share quadrants.

Handoff format: filled output template + Question Marks scoring + cash flow table + scenario analysis.

## Anti-patterns

| Error | Why it's bad | How to do it correctly |
|--------|-------------|---------------|
| Using absolute share instead of relative | Does not show position vs leader | Relative = share / largest competitor's share |
| Incorrect quadrant boundaries | All BUs end up in a single quadrant | Calibrate thresholds to the industry (mature = 5%, growing = 10-15%) |
| Ignoring BU size | A tiny "Star" and a huge "Dog" aren't equal | Bubble size = revenue, cash flow by quadrants |
| Static analysis without trends | Unclear where BU connects — snapshot-based decisions | Migration arrows + scenario analysis for 2-3 years |
| Automatic Dog liquidation | Some Dogs create synergy or retain clients | Keep/exit scoring: synergy, cash flow, exit barrier, anchor |
| Lack of portfolio balance | Decisions per BU made in isolation — no system | Portfolio cash flow: Cows must finance Stars + QM |
| Intuitive invest/divest for Question Marks | Toughest quadrant — intuition scales poorly | Scoring model with 6 criteria and a ≥ 6.0 threshold |
| Data without sources and dates | Impossible to verify, quickly becomes outdated | Every fact — with source and date; >12 months = ⚠️ |

## Output Template

```
## BCG Matrix: [Company / portfolio name]
**Period:** [year]  |  **Growth threshold:** [X%]  |  **Share threshold:** [X.X]  |  **Date:** [date]
**Review:** [next review date]

### Initial Data

| # | Business Unit | Market | Share | Leader's share | Rel. share | CAGR (fact) | CAGR (forecast) | Revenue | Margin |
|---|---------------|-------|:----:|:-----------:|:---------:|:-----------:|:--------------:|:-------:|:-----:|
| 1 | [BU1] | [Market] | XX% | XX% | X.X | XX% | XX% | $XXM | XX% |

### 2×2 Matrix

|  | High rel. share (> [threshold]) | Low rel. share (< [threshold]) |
|--|:-----------------------------:|:----------------------------:|
| **High growth (> [threshold]%)** | ★ **Stars** | ? **Question Marks** |
|  | [BU1] (share: X.X, growth: X%) | [BU3] (share: X.X, growth: X%) |
| **Low growth (< [threshold]%)** | $ **Cash Cows** | ✕ **Dogs** |
|  | [BU5] (share: X.X, growth: X%) | [BU7] (share: X.X, growth: X%) |

### Business Unit Breakdown

| # | Business Unit | Quadrant | Rel. share | Market growth | Revenue | Trend | Strategy |
|---|---------------|----------|:---------:|:----------:|:-------:|:-----:|-----------|
| 1 | [BU1] | Star | 1.8 | 15% ↗ | $XXM | → $ | Invest |

### Question Marks Scoring

| Criterion (weight) | [QM1] | [QM2] |
|----------------|:-----:|:-----:|
| Market size (0.20) | X | X |
| Competitive position (0.20) | X | X |
| Synergy with portfolio (0.15) | X | X |
| Cost of leadership (0.20, inv.) | X | X |
| Strategic importance (0.15) | X | X |
| Margin (0.10) | X | X |
| **Score** | **X.X** | **X.X** |
| **Decision** | Invest / Divest | Invest / Divest |

### Portfolio Cash Flow

| Quadrant | Revenue | Margin | Cash generation | Investments | **Net Cash Flow** |
|----------|:-------:|:-----:|:---------------:|:----------:|:-----------------:|
| Stars | $XXM | XX% | $XXM | -$XXM | -/+$XXM |
| Cash Cows | $XXM | XX% | $XXM | -$XM | +$XXM |
| Question Marks | $XXM | XX% | $XM | -$XXM | -$XXM |
| Dogs | $XXM | XX% | $XM | -$XM | ±$XM |
| **Total** | **$XXM** | | | | **±$XXM** |

Balance: Cows ([+$XXM]) vs Stars + QM ([-$XXM]) → [Balanced ✅ / Deficit ⚠️]

### Migration Trajectories (2-3 years)

| BU | Now | Forecast | Driver | Action |
|----|:------:|:-------:|---------|----------|
| [BU1] | ★ | → $ | Market slows down | Prepare harvest mode |

### Scenario Analysis (top-3 critical BUs)

| BU | Scenario | Result | Probability | Condition |
|----|----------|-----------|:-----------:|---------|
| [BU] | Optimistic | [Quadrant], share X.X | XX% | [What must come true] |
| [BU] | Base | [Quadrant], share X.X | XX% | [Current trends] |
| [BU] | Pessimistic | [Quadrant], share X.X | XX% | [What could go wrong] |

### Portfolio Strategy
[1-2 paragraphs: overall logic, resources from where to where, TOP priorities, key risks]

### Recommendations and go/no-go gates

| # | BU | Action | Investments | Go/No-go gate | Timeframe |
|---|-----|----------|:----------:|---------------|------|
| 1 | [BU] | [Invest / Harvest / Divest / Exit] | $XM | [Review condition] | [When] |

### Sources and Assumptions

| # | Fact / assumption | Source | Date | Reliability |
|---|-------------------|----------|------|:-------------:|
| 1 | [Fact] | [Source] | [Date] | ✅ / ⚠️ / 🔮 |

Legend: ✅ Verified (2+ sources) | ⚠️ Estimated (1 source) | 🔮 Assumed (expert assessment)
```
