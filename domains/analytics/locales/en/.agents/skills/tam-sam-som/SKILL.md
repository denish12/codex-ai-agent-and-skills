---
name: tam-sam-som
description: Market sizing — total, serviceable, and obtainable market volume
---
# TAM/SAM/SOM — Market Sizing

## When to Use
- When entering a new market or launching a new product — to substantiate the potential.
- When preparing investment materials (pitch deck, business plan) — investors require market sizing.
- During strategic planning — choosing between markets, verticals, or geographies.
- When revisiting strategy — if the market has changed (regulation, technology, competition).

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Product / service | ✅ | What exactly is offered to the market |
| Target geography | ✅ | Countries / regions for assessment |
| Business model | ✅ | B2B / B2C / B2B2C / SaaS / Marketplace, etc. |
| Pricing model | ✅ | Subscription / transaction / license / freemium |
| Average contract value (ACV) | ⬚ | If known; otherwise will be estimated |
| Target segments | ⬚ | If already defined (company size, industry, demographics) |
| Competitors | ⬚ | Known market players |
| Forecast horizon | ⬚ | Number of years (default — 3-5 years) |

> If required fields are not provided — **ask the user** before starting the analysis. Do not assume.

## Data Sources
1. **Web search** — industry reports (Statista, Grand View Research, Mordor Intelligence, IBISWorld, McKinsey, Gartner).
2. **Financial data** — competitors' public filings (SEC filings, annual reports).
3. **Statistical databases** — government statistics (Rosstat, Eurostat, Census Bureau, World Bank).
4. **Industry associations** — professional associations, chambers of commerce.
5. **User-provided data** — internal analytics, CRM, current sales.

> For every figure, cite the source. If data is extrapolated — explicitly mark it as an estimate.

## Protocol

### Step 0 — Context Collection
Verify that all required input data is present. If anything is missing — ask the user. Define the unit of measurement (USD, EUR, RUB) and the time horizon.

### Step 1 — Product and Category Definition
- Clearly articulate the problem the product solves.
- Define the market category (industry -> subcategory -> niche).
- Establish market boundaries: what is included, what is excluded.

### Step 2 — TAM (Total Addressable Market)
Estimate using two methods for cross-validation:
- **Top-down:** from total industry volume -> filter by category -> filter by geography.
- **Bottom-up:** number of potential customers x average check x purchase frequency.
- Indicate the spread between methods and the final estimate.

### Step 3 — SAM (Serviceable Addressable Market)
Apply filters to TAM:
- Geographic constraints (where operations actually run).
- Segment constraints (B2B: company size, industry; B2C: demographics, purchasing power).
- Regulatory constraints (licenses, certifications, prohibitions).
- Technological constraints (language, platform, integrations).
- Justify each filter and its impact on market size.

### Step 4 — SOM (Serviceable Obtainable Market)
Determine the realistic share of SAM that can be captured:
- Current market position and resources.
- Competitive intensity (number of players, their market shares).
- Realistic capture rate (typically 1-5% for a startup, 10-20% for a mature business).
- Time horizon for achievement (1 year / 3 years / 5 years).

### Step 5 — Source Verification
- Verify each data source for recency (no older than 2 years).
- Cross-reference figures from different sources.
- Identify and document discrepancies.
- Note assumptions and limitations.

### Step 6 — Sensitivity Analysis
Assess how SOM changes when key parameters vary:
- ACV +/-20%.
- Capture rate +/-50%.
- Target segment size +/-30%.
- Build a table for "optimistic / base / pessimistic" scenarios.

### Step 7 — Dynamics and Growth (YoY)
- Determine market CAGR (historical + forecast).
- Growth drivers: technology, regulation, consumer behavior.
- Deceleration factors: saturation, substitution, crises.
- TAM/SAM/SOM forecast over a 3-5 year horizon.

## Validation (Quality Gate)

- [ ] TAM is calculated using two methods (top-down + bottom-up) with spread indicated
- [ ] SAM has clear filters, each justified
- [ ] SOM is based on a realistic capture rate with justification
- [ ] All figures cite their source
- [ ] Extrapolations and assumptions are explicitly marked
- [ ] Sensitivity analysis conducted (minimum 3 scenarios)
- [ ] CAGR and 3-5 year forecast are provided
- [ ] Units of measurement and currency are consistent throughout the document
- [ ] No internal contradictions between TAM -> SAM -> SOM (each <= the previous)

> If validation fails — rework until passing, do not hand off further.

## Handoff
The `$tam-sam-som` result serves as input for:
- **Strategist / Mediator** — market size as a factor in strategy selection.
- `$unit-economics` — market size for potential revenue calculation.
- `$competitive-analysis` — competitor market shares for benchmarking.
- `$trend-analysis` — market dynamics as context for trends.

On handoff — use `$handoff` specifying the final TAM/SAM/SOM figures and key assumptions.

## Anti-patterns

| Mistake | Why It's Bad | How to Do It Right |
|---------|-------------|-------------------|
| Top-down only | A single methodology gives a distorted picture | Always two methods: top-down + bottom-up |
| TAM = entire industry | Overestimation by orders of magnitude, loss of credibility | Clearly constrain the product category |
| SOM without capture rate | Fantasy, not a forecast | Justify the capture rate with benchmarks |
| Outdated data | Markets change rapidly | Sources no older than 2 years |
| No sensitivity analysis | False precision | Always 3 scenarios: optimistic / base / pessimistic |
| SAM = TAM | No filtering, useless estimate | Apply all relevant filters |
| No stated assumptions | Impossible to assess reliability | Explicitly document each assumption |

## Output Template

```
### Market Sizing — [Product / Service]

**Market category:** [industry -> subcategory -> niche]
**Geography:** [regions]
**Business model:** [model]
**Currency:** [USD / EUR / RUB]
**Horizon:** [year — year]
**Assessment date:** [date]

---

#### TAM -> SAM -> SOM Funnel

| Metric | Volume | Method | Source |
|--------|--------|--------|--------|
| **TAM** (top-down) | $[X]B | [method description] | [source] |
| **TAM** (bottom-up) | $[Y]B | [# of customers] x [ACV] | [source] |
| **TAM** (final estimate) | $[Z]B | Average / weighted | — |
| **SAM** | $[X]M | TAM x [filters] | [source] |
| **SOM** (year 1) | $[X]M | SAM x [capture rate]% | [justification] |
| **SOM** (year 3) | $[X]M | SAM x [capture rate]% | [justification] |

---

#### SAM Filters

| Filter | Impact | Justification |
|--------|--------|---------------|
| [Geographic constraint] | TAM x [X]% | [why] |
| [Segment] | x [X]% | [why] |
| [Regulation] | x [X]% | [why] |

---

#### Sensitivity Analysis

| Scenario | TAM | SAM | SOM (year 3) | Key Assumption |
|----------|-----|-----|-------------|----------------|
| Optimistic | $[X]B | $[X]M | $[X]M | [what must come true] |
| Base | $[X]B | $[X]M | $[X]M | [current trends] |
| Pessimistic | $[X]B | $[X]M | $[X]M | [what could go wrong] |

---

#### Market Dynamics (YoY)

| Year | TAM | SAM | SOM | CAGR |
|------|-----|-----|-----|------|
| [current] | $[X]B | $[X]M | $[X]M | — |
| [+1] | $[X]B | $[X]M | $[X]M | [X]% |
| [+3] | $[X]B | $[X]M | $[X]M | [X]% |
| [+5] | $[X]B | $[X]M | $[X]M | [X]% |

**Growth drivers:** [list]
**Deceleration factors:** [list]

---

#### Assumptions and Limitations
1. [Assumption 1] — [impact on estimate]
2. [Assumption 2] — [impact on estimate]

#### Data Sources
1. [Source] — [year, link]
2. [Source] — [year, link]
```
