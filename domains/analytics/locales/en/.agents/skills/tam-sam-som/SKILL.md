---
name: tam-sam-som
description: Market size estimation — Total, Serviceable, and Obtainable Addressable Market
---
# TAM/SAM/SOM — Market Size Estimation

## When to use
- When entering a new market or launching a new product — to justify the potential.
- When preparing investment materials (pitch deck, business plan) — investors require market size.
- During strategic planning — choosing between markets, verticals, or geographies.
- When reviewing strategy — if the market has changed (regulation, technologies, competition).

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Product / service | ✅ | What exactly is being offered to the market |
| Target geography | ✅ | Countries / regions for estimation |
| Business model | ✅ | B2B / B2C / B2B2C / SaaS / Marketplace, etc. |
| Pricing model | ✅ | Subscription / transaction / license / freemium |
| Average Check (ACV) | ⬚ | If known; otherwise it will be estimated |
| Target segments | ⬚ | If already defined (company size, industry, demographics) |
| Competitors | ⬚ | Known players on the market |
| Forecast horizon | ⬚ | For how many years (default — 3-5 years) |

> If mandatory fields are not provided — **ask the user** before starting the analysis. Do not invent.

## Data Sources
1. **Web Search** — industry reports (Statista, Grand View Research, Mordor Intelligence, IBISWorld, McKinsey, Gartner).
2. **Financial data** — public reporting of competitors (SEC filings, annual reports).
3. **Statistical databases** — government statistical data (Rosstat, Eurostat, Census Bureau, World Bank).
4. **Industry associations** — field-specific associations, chambers of commerce.
5. **Data from user** — internal analytics, CRM, current sales.

> Provide source and date for every number. Data older than 24 months — mark with ⚠️ and verify via `web-research`. Extrapolations — mark as 🔮 Assumed.

### Connection with other skills
| Skill | What we take | When to call |
|------|-----------|----------------|
| `web-research` | Industry reports, market sizes, CAGR (steps 2-4) | Main tool — call for each level of the funnel |
| `pest-analysis` | Macro limitations on TAM: regulatory, economic (step 3) | If regulation or macro environment restricts the market |
| `competitive-analysis` | Competitors' shares to justify SOM capture rate (step 4) | If the competitive market structure is unknown |
| `icp-buyer-persona` | SAM filters: ICP defines the target segment (step 3) | If target segments are not defined |
| `ansoff-matrix` | New market TAM for Market Development and Diversification strategies | After calculation — to evaluate growth strategies |
| `blue-ocean-strategy` | TAM of new market space (noncustomers) | If the core market is small — evaluate Blue Ocean TAM |

## Protocol

### Step 0 — Collect Context
1. Check that all mandatory inputs are provided. If something is missing — ask the user.
2. Determine the unit of measurement (USD, EUR, RUB) and time horizon.
3. Clearly state the problem the product solves.
4. Define the market category (industry → subcategory → niche).
5. Outline the market boundaries: what is included, what is excluded.

### Step 1 — TAM (Total Addressable Market)
Estimate using **two methods** for cross-validation:

**Top-down:**
1. Find the total industry volume (from industry reports).
2. Apply filter for the product category.
3. Apply geographical filter.
4. Record: source, year, report methodology.

**Bottom-up:**
1. Determine the total number of potential customers in the category.
2. Multiply by the average check (ACV) × purchase frequency per year.
3. `TAM (bottom-up) = Number of customers × ACV × Frequency`.
4. Record: data source for number of customers, justification for ACV.

**Cross-check:**

| Condition | Action |
|---------|----------|
| Variance < 30% | Use the average. Normal discrepancy |
| Variance 30-100% | Investigate reason. Record both figures, justify choice of the final one |
| Variance > 100% | 🔴 Problem: redefine market boundaries or sources. Do not average — find the error |

### Step 2 — SAM (Serviceable Addressable Market)
Apply filters to TAM:

| # | Filter | Description | Multiplier | Justification | Source |
|---|--------|----------|:---------:|-------------|----------|
| 1 | Geography | Where we actually operate | ×XX% | [Why] | [Source] |
| 2 | Segment | B2B: size, industry; B2C: demographics | ×XX% | [Why] | [Source] |
| 3 | Regulation | Licenses, certifications, bans | ×XX% | [Why] | [Source] |
| 4 | Technologies | Language, platform, integrations | ×XX% | [Why] | [Source] |

`SAM = TAM × Filter₁ × Filter₂ × ... × FilterN`

> If `$icp-buyer-persona` exists — use ICP criteria as SAM filters (ideal + acceptable).

### Step 3 — SOM (Serviceable Obtainable Market)
Determine a realistic share of SAM:

1. Estimate the capture rate:

   | Stage | Typical capture rate | Justification |
   |--------|:---------------------:|-------------|
   | Pre-product (idea) | 0.5-1% | No product, no customers |
   | Startup (MVP, <$1M ARR) | 1-3% | First customers, seeking PMF |
   | Growing ($1M-10M ARR) | 3-5% | PMF found, scaling |
   | Mature (>$10M ARR) | 5-15% | Established brand and channels |
   | Market leader | 15-30% | Dominant position |

2. Factor in competitive intensity:
   - If `$competitive-analysis` exists — use competitors' market shares for justification.
   - If not — evaluate based on the number and size of players.

3. `SOM = SAM × Capture Rate`.
4. Calculate for 3 horizons: year 1, year 3, year 5.

### Step 4 — Sensitivity Analysis
Estimate how SOM changes when varying key parameters:

| Parameter | Variation | Effect on SOM |
|----------|:--------:|:--------------:|
| ACV | ±20% | SOM ±20% |
| Capture rate | ±50% | SOM ±50% |
| Target segment size | ±30% | SAM/SOM ±30% |

3 scenarios:

| Scenario | TAM | SAM | SOM (year 3) | Key Assumption |
|----------|:---:|:---:|:-----------:|---------------------|
| Optimistic | $XB | $XM | $XM | [What must come true] |
| Base | $XB | $XM | $XM | [Current trends] |
| Pessimistic | $XB | $XM | $XM | [What might go wrong] |

### Step 5 — Dynamics and Growth (YoY)
1. Determine the market's CAGR (historical + forecast).
2. Growth drivers: technologies, regulation, consumer behavior.
3. Hindrance factors: saturation, substitution, crises.
4. Forecast TAM/SAM/SOM for the 3-5 year horizon.

## Example — B2B SaaS: Corporate Learning Platform, RF

**Context:** AI-powered corporate training platform, B2B SaaS, per seat subscription, RF. ACV is $6K/yr. Horizon: 2026-2031.

### TAM

**Top-down:**
- EdTech Market RF = $4.2B (Smart Ranking, 2026) ✅
- Corporate learning = 43% of EdTech = $1.8B (HSE, 2026) ✅
- **TAM (top-down) = $1.8B**

**Bottom-up:**
- Companies in RF with 50+ employees: ~85,000 (Rosstat, 2025) ✅
- Average training budget: $18K/yr (HH.ru Research, 2026) ⚠️ (1 source)
- **TAM (bottom-up) = 85,000 × $18K = $1.53B**

**Cross-check:** 15% variance ($1.53B vs $1.8B) — normal. **TAM = $1.65B** (average).

### SAM

| # | Filter | Multiplier | Justification | Source |
|---|--------|:---------:|-------------|----------|
| 1 | Only SaaS solutions (no trainers, no offline) | ×35% | 35% of budgets go to digital | HSE, 2026 ✅ |
| 2 | Companies 50-2000 ppl (our sweet spot) | ×60% | Ent >2000 — SAP/Oracle; <50 — don't buy | CRM + benchmark |
| 3 | IT, fintech, retail, manufacturing | ×70% | Other industries — low digitization | Rosstat ⚠️ |

**SAM = $1.65B × 0.35 × 0.60 × 0.70 = $243M**

### SOM

| Horizon | Capture Rate | SOM | Justification |
|:--------:|:-----------:|:---:|-------------|
| Year 1 | 1.5% | $3.6M | Startup, 50 clients, $6K ACV |
| Year 3 | 4% | $9.7M | PMF found, 160 clients |
| Year 5 | 8% | $19.4M | Leader in the AI training niche |

### Sensitivity Analysis (SOM year 3)

| Scenario | TAM | SAM | SOM | Assumption |
|----------|:---:|:---:|:---:|-----------|
| Optimistic | $2.1B | $310M | $15.5M | CAGR 25% + state subsidies up 50% |
| Base | $1.65B | $243M | $9.7M | CAGR 18%, current competition |
| Pessimistic | $1.3B | $182M | $5.5M | Inflation squeezes budgets, capture 3% |

### Dynamics

| Year | TAM | CAGR | SAM | SOM |
|:---:|:---:|:----:|:---:|:---:|
| 2026 | $1.65B | — | $243M | $3.6M |
| 2027 | $1.95B | 18% | $287M | $5.7M |
| 2029 | $2.71B | 18% | $399M | $15.9M |
| 2031 | $3.77B | 18% | $555M | $44.4M |

**Growth drivers:** personnel shortage (HR budgets ↑), AI personalization, "Kadry" state program.
**Hindrance factors:** inflation (8-10%), competition (Yandex, Skillbox), regulatory barriers (FZ-152).

## Validation (Quality Gate)

- [ ] TAM calculated via two methods (top-down + bottom-up)
- [ ] Variance between methods recorded and handled by rule (<30% / 30-100% / >100%)
- [ ] SAM has clear filters, each justified with a multiplier and source
- [ ] SOM based on a realistic capture rate, justified by the company's stage
- [ ] SOM calculated for 3 horizons (year 1 / 3 / 5)
- [ ] Sensitivity analysis: 3 scenarios varying ACV, capture rate, segment
- [ ] CAGR and 3-5 year forecast with growth and hindrance factors
- [ ] TAM ≥ SAM ≥ SOM (no internal contradictions)
- [ ] Units of measurement and currency are consistent
- [ ] All figures cited; >24 mo = ⚠️; extrapolations = 🔮
- [ ] Conflicting sources documented explaining the choice made

> If validation fails — iterate until it passes, do not hand off further.

## Handoff
The output of `$tam-sam-som` acts as input for:
- **Strategist / Mediator** — market size as a factor when choosing strategy.
- **`unit-economics`** — market size to calculate potential revenue.
- **`competitive-analysis`** — competitors' market shares for benchmarking.
- **`ansoff-matrix`** — new market TAM for Market Development strategies.
- **`bcg-matrix`** — market growth to classify business units.
- **`blue-ocean-strategy`** — TAM of new space (noncustomers).

Output format: TAM/SAM/SOM funnel + filters + sensitivity + dynamics + assumptions. When handing off — use `$handoff`.

## Anti-patterns

| Mistake | Why it hurts | How to do it right |
|--------|-------------|---------------|
| Top-down only | One methodology gives a skewed picture | Always use two methods: top-down + bottom-up + cross-check |
| TAM = entire industry | Inflating by 10x+, loss of trust | Clearly bound the product category |
| SOM without capture rate | Pure fantasy instead of forecast | Justify capture rate by company stage and competitive environment |
| Old data | Markets change quickly | Sources ≤ 24 mo; older = ⚠️ + verify |
| No sensitivity analysis | False precision — one number instead of a range | 3 scenarios: ACV ±20%, capture ±50%, segment ±30% |
| SAM = TAM | No filtering, useless estimate | Filters: geo, segment, regulation, tech — each with a multiplier |
| Not stating assumptions | Impossible to assess estimation reliability | Each assumption — with its impact on the result |
| Top-down & bottom-up differ > 100% | One method is flawed, cannot be averaged | Find the error source, do not average |

## Output Template

```
### Market Size Estimation — [Product / Service]

**Market Category:** [industry → subcategory → niche]
**Geography:** [regions]
**Business Model:** [model]
**Currency:** [USD / EUR / RUB]
**Horizon:** [year — year]
**Assessment Date:** [date]

---

#### TAM → SAM → SOM Funnel

| Metric | Volume | Method | Source | Confidence |
|---------|:-----:|-------|----------|:-------------:|
| **TAM** (top-down) | $[X]B | [method] | [source, year] | ✅ / ⚠️ / 🔮 |
| **TAM** (bottom-up) | $[Y]B | [quantity] × [ACV] × [frequency] | [source] | ✅ / ⚠️ / 🔮 |
| **TAM** (final) | $[Z]B | [Average / weighted / choice] | Variance: X% | |
| **SAM** | $[X]M | TAM × filters | [sources] | |
| **SOM** (year 1) | $[X]M | SAM × [X]% capture | [justification] | |
| **SOM** (year 3) | $[X]M | SAM × [X]% capture | [justification] | |
| **SOM** (year 5) | $[X]M | SAM × [X]% capture | [justification] | |

---

#### SAM Filters

| # | Filter | Multiplier | Justification | Source |
|---|--------|:---------:|-------------|----------|
| 1 | [Geo] | ×XX% | [Why] | [Source] |
| 2 | [Segment] | ×XX% | [Why] | [Source] |

`SAM = TAM × F₁ × F₂ × ... = $[X]M`

---

#### Capture Rate (SOM)

| Horizon | Capture Rate | SOM | Justification |
|:--------:|:-----------:|:---:|-------------|
| Year 1 | X% | $XM | [Stage + competition] |
| Year 3 | X% | $XM | [Stage + competition] |
| Year 5 | X% | $XM | [Stage + competition] |

---

#### Sensitivity Analysis

| Scenario | TAM | SAM | SOM (year 3) | Key Assumption |
|----------|:---:|:---:|:-----------:|---------------------|
| Optimistic | $XB | $XM | $XM | [What must come true] |
| Base | $XB | $XM | $XM | [Current trends] |
| Pessimistic | $XB | $XM | $XM | [What might go wrong] |

---

#### Market Dynamics (YoY)

| Year | TAM | CAGR | SAM | SOM |
|:---:|:---:|:----:|:---:|:---:|
| [current] | $XB | — | $XM | $XM |
| [+1] | $XB | X% | $XM | $XM |
| [+3] | $XB | X% | $XM | $XM |
| [+5] | $XB | X% | $XM | $XM |

**Growth drivers:** [list]
**Hindrance factors:** [list]

---

#### Sources and Assumptions

| # | Fact / Assumption | Source | Date | Confidence |
|---|-------------------|----------|------|:-------------:|
| 1 | [Fact] | [Source] | [Date] | ✅ / ⚠️ / 🔮 |

Legend: ✅ Verified (2+ sources) | ⚠️ Estimated (1 source) | 🔮 Assumed (extrapolation / calculation)
```
