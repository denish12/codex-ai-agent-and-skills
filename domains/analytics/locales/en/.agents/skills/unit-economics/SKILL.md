---
name: unit-economics
description: Unit economics analysis — CAC, LTV, margin, payback period, sensitivity
---
# Unit Economics — Unit Level Economics Analysis

## When to use
- When evaluating the viability of a business model — does the unit economics converge.
- When planning for growth — under what conditions scaling is profitable.
- When raising investments — investors demand unit economics.
- When optimizing marketing — assessing the efficiency of acquisition channels.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Business model | ✅ | SaaS / E-commerce / Marketplace / Service |
| Pricing model | ✅ | Subscription / transaction / license / freemium |
| Average ticket (ACV/ARPU)| ✅ | Average revenue per customer per period |
| Marketing expenses | ⬚ | Budget by channels (if known) |
| Number of customers | ⬚ | Current base or forecast |
| Churn rate | ⬚ | Customer attrition percentage (if known) |
| Gross margin | ⬚ | Gross margin of the product |
| Acquisition channels | ⬚ | Which channels are used |
| Historical data | ⬚ | Metrics for past periods |

> If mandatory fields are not provided — **ask the user** before starting the analysis. Do not invent.

> If real data is absent — the skill operates with **modeled data** based on industry benchmarks, clearly marked. The methodology remains applicable once real data becomes available.

## Data Sources
1. **Web Search** — industry benchmarks (SaaS Capital, OpenView, ProfitWell, Baremetrics).
2. **Financial data** — public reporting of similar companies.
3. **Industry reports** — average CAC, LTV, churn by verticals.
4. **Data from user** — real metrics from CRM, analytics, accounting.
5. **Marketing platforms** — acquisition cost by channels.

> For benchmarks — denote source, year, and applicability to the given business. Data older than 12 months — mark with ⚠️.

### Connection with other skills
| Skill | What we take | When to call |
|------|-----------|----------------|
| `cohort-analysis` | Cohort LTV, retention curves for precise LTV calculation (step 3) | If cohort data exists — preferred method for LTV |
| `rfm-analysis` | LTV per segment (Champions vs At Risk) for differentiated economics (step 3) | If unit economics by segments is needed |
| `competitive-analysis` | CAC/LTV benchmarks of competitors (step 8) | For comparison with competitors |
| `icp-buyer-persona` | CAC and LTV per persona — different personas = different economics | If unit economics per persona is needed |
| `tam-sam-som` | SOM × ARPU = revenue potential (step 8) | To tie unit economics to market size |
| `web-research` | Industry benchmarks for CAC, LTV, churn | If real data is missing |
| `customer-journey-mapping` | Attrition points → where to optimize churn (step 8) | For recommendations on improving LTV |

## Protocol

### Step 0 — Collect Context
1. Check the availability of mandatory data.
2. Determine the business model type and the "unit" of analysis:

   | Business Model | Unit | ARPU = | Churn = | Typical Cycle |
   |---------------|---------|--------|---------|----------------|
   | SaaS (sub) | Account / seat | MRR per account | % accounts cancelling sub | Month |
   | E-commerce | Customer | Avg ticket × frequency | % not returning in 12 mo | Order |
   | Marketplace | Transaction | Take rate × GMV | % buyers/sellers churning| Transaction |
   | Service | Customer | Avg ticket × visits | % not returning | Visit |

3. Select currency and period.

### Step 1 — Revenue Model (revenue flow)

Visualize the unit economics flow:

```
Revenue ($ARPU/mo)
  └─ COGS (-$XX) ──────────────────── = Gross Margin ($XX, XX%)
       └─ Variable Costs (-$XX) ───── = Contribution Margin ($XX, XX%)
            └─ Allocated Fixed (-$XX)  = Net Margin ($XX, XX%)
```

| Component | Value | % of Revenue | Description |
|-----------|:--------:|:------------:|----------|
| Revenue (ARPU) | $XX/mo | 100% | [Income source] |
| COGS | -$XX | XX% | [Hosting, support, infrastructure] |
| **Gross Margin** | **$XX** | **XX%** | Revenue - COGS |
| Variable Costs | -$XX | XX% | [Onboarding, transactional] |
| **Contribution Margin** | **$XX** | **XX%** | Gross Margin - Variable |
| Allocated Fixed| -$XX | XX% | [R&D, G&A, allocated per unit] |
| **Net Margin** | **$XX** | **XX%** | Contribution - Fixed |

### Step 2 — CAC (Customer Acquisition Cost)

**Blended CAC:**
`CAC = (Marketing + Sales + Tools) / Number of new customers`

**CAC by channels:**

| Channel | Budget | Customers | CAC | % of total | Channel LTV/CAC | Verdict |
|-------|:------:|:-------:|:---:|:----------:|:--------------:|:-------:|
| Paid (Google/FB) | $XX | N | $XX | XX% | X.Xx | Scale / Optimize / Disable |
| Content/SEO | $XX | N | $XX | XX% | X.Xx | ... |
| Sales (outbound) | $XX | N | $XX | XX% | X.Xx | ... |
| Referral | $XX | N | $XX | XX% | X.Xx | ... |
| Organic | $0 | N | $0 | XX% | ∞ | Maximize |
| **Blended** | **$XX** | **N** | **$XX** | **100%** | **X.Xx** | |

CAC dynamics: growing ↑ / stable → / decreasing ↓ (quarter-over-quarter).

### Step 3 — LTV (Lifetime Value)

Calculate via **at least two methods** for cross-validation:

| Method | Formula | Result | When to use | Assumptions |
|-------|---------|:---------:|---------------------|-----------|
| **Simple** | `ARPU × Gross Margin × (1 / Churn)` | $XX | No cohort data | Churn is constant |
| **Cohort** | Σ(actual cohort revenue) / cohort size | $XX | Has `$cohort-analysis` data| Mature cohorts (≥12 mo) |
| **DCF** | Σ(ARPU × GM × retention_rate_month_i / (1+r)^i) | $XX | For investors, precise config | Discount rate |

**Cross-check:** if variance > 30% — specify reason, justify choice of final value.

> If `$rfm-analysis` exists — calculate LTV per segment:

| Segment | ARPU | Churn | LTV | % of base | % of revenue |
|---------|:----:|:-----:|:---:|:------:|:---------:|
| Champions | $XX | X% | $XX | X% | X% |
| Loyal | $XX | X% | $XX | X% | X% |
| At Risk | $XX | X% | $XX | X% | X% |
| **Blended** | **$XX** | **X%** | **$XX** | **100%** | **100%** |

### Step 4 — LTV/CAC Ratio

| LTV/CAC | Interpretation | Action |
|:-------:|---------------|----------|
| < 1.0 | 🔴 Loss on every customer | Urgent: lower CAC or increase LTV |
| 1.0-3.0 | 🟡 On the verge of payback | Optimization: churn, pricing, channels|
| 3.0-5.0 | 🟢 Healthy economics | Scale, invest in growth |
| > 5.0 | 🔵 Potentially underinvesting | Increase marketing spend, test new channels |

Compare with industry benchmarks and company stage.

### Step 5 — Payback Period

`Payback = CAC / (ARPU × Gross Margin) = X months`

| Business Model | Healthy Payback | Problematic |
|---------------|:----------------:|:----------:|
| SaaS (SMB) | < 12 mo | > 18 mo |
| SaaS (Enterprise) | < 18 mo | > 24 mo |
| E-commerce | < 3 mo | > 6 mo |
| Marketplace | < 6 mo | > 12 mo |

Impact on cash flow: `Cash needed = CAC × New Customers/mo × Payback (mo)`.

### Step 6 — Break-Even Analysis

Determine the break-even point:

**At the unit level:**
`Break-even units = Fixed Costs / Contribution Margin per unit`

**At the business level:**

| Metric | Formula | Value |
|---------|---------|:--------:|
| Fixed Costs (mo) | [R&D + G&A + Infra] | $XX |
| Contribution Margin per unit (mo)| [ARPU × GM - Variable] | $XX |
| **Break-even clients** | Fixed / CM per unit | **N clients** |
| Current base | | N clients |
| Gap to break-even | | ±N clients |
| At current growth — break-even in | | X mo |

### Step 7 — Sensitivity Analysis

| Parameter | Base | Optimistic (+) | Pessimistic (-) |
|----------|:-------:|:-------------:|:--------------:|
| ARPU | $XX | $XX (+20%) | $XX (-20%) |
| Churn | X% | X% (-30%) | X% (+30%) |
| CAC | $XX | $XX (-25%) | $XX (+25%) |
| Gross Margin | XX% | XX% (+10pp) | XX% (-10pp) |

| Scenario | ARPU | Churn | CAC | LTV | LTV/CAC | Payback | Break-even |
|----------|:----:|:-----:|:---:|:---:|:-------:|:-------:|:----------:|
| Optimistic | $XX | X% | $XX | $XX | X.Xx | X mo | X mo |
| **Base** | **$XX** | **X%** | **$XX** | **$XX** | **X.Xx** | **X mo** | **X mo** |
| Pessimistic| $XX | X% | $XX | $XX | X.Xx | X mo | X mo |

**Kill-condition:** Under what scenario is LTV/CAC < 1.0 → the model is unviable.

### Step 8 — Benchmark and Recommendations

Compare all metrics with industry benchmarks:

| Metric | Ours | Benchmark (industry) | Δ | Rating |
|---------|:----:|:-------------------:|:-:|:------:|
| LTV/CAC | X.Xx | 3-5x | ±X.Xx | 🟢/🟡/🔴 |
| Payback | X mo | 12-18 mo | ±X mo | 🟢/🟡/🔴 |
| Gross Margin| XX% | 70-80% (SaaS) | ±Xpp | 🟢/🟡/🔴 |
| Churn (mo) | X% | 2-5% (SaaS SMB) | ±Xpp | 🟢/🟡/🔴 |

Recommendations — tied to bottlenecks:

| # | Bottleneck | Action | Target Metric | Expected Effect | Priority |
|---|-------------|----------|-----------------|:----------------:|:---------:|
| 1 | [CAC is too high] | [How to lower: channels, conversion] | CAC | -$XX (-X%) | P1 |
| 2 | [Churn above benchmark]| [How to lower: onboarding, retention]| Churn | -Xpp | P1 |
| 3 | [Margin below norm] | [How to improve: COGS, pricing] | GM | +Xpp | P2 |

## Example — B2B SaaS: HR platform, per seat subscription

**Context:** HR recruiting automation platform, B2B SaaS, subscription $500/mo per company (avg 10 seats × $50). 200 clients, RF.

### Revenue Model

| Component | Value | % | Description |
|-----------|:--------:|:-:|----------|
| Revenue (ARPU) | $500/mo | 100% | 10 seats × $50 |
| COGS | -$75 | 15% | Hosting, HH.ru API, L1 support |
| **Gross Margin** | **$425** | **85%** | |
| Variable Costs | -$50 | 10% | New client onboarding (amort.) |
| **Contribution Margin** | **$375** | **75%** | |

### CAC by channels

| Channel | Budget/mo | Clients/mo | CAC | LTV/CAC | Verdict |
|-------|:----------:|:-----------:|:---:|:-------:|---------|
| Google Ads | $8K | 5 | $1,600 | 3.5x | 🟢 Scale |
| LinkedIn Ads | $5K | 2 | $2,500 | 2.2x | 🟡 Optimize |
| Outbound Sales | $12K | 4 | $3,000 | 1.9x | 🟡 Optimize |
| Content/SEO | $3K | 3 | $1,000 | 5.6x | 🟢 Scale |
| Referral | $1K | 2 | $500 | 11.2x | 🟢 Maximize |
| Organic | $0 | 4 | $0 | ∞ | 🟢 |
| **Blended** | **$29K** | **20** | **$1,450** | **3.9x** | 🟢 |

### LTV

| Method | Calculation | LTV |
|-------|--------|:---:|
| Simple | $500 × 85% × (1/3.5%) = $500 × 0.85 × 28.6 mo | **$12,143** |
| Cohort | Avg cohort (12+ mo): $11,800 over lifetime | **$11,800** |
| **Final estimate** | Average (variance 3%) | **$5,600** (3-year capped) |

> Capped at 3 years (36 mo) for a conservative estimate: $500 × 0.85 × Σ(retention_i) = **$5,600**.

### Key Metrics

| Metric | Ours | Benchmark (SaaS SMB) | Rating |
|---------|:----:|:--------------------:|:------:|
| LTV/CAC | 3.9x | 3-5x | 🟢 |
| Payback | 3.4 mo | < 12 mo | 🟢 |
| Gross Margin | 85% | 70-80% | 🟢 |
| Monthly Churn | 3.5% | 2-5% | 🟡 |
| Break-even | 160 clients ($60K fixed) | — | ✅ (200 > 160) |

### Sensitivity (SOM year 3)

| Scenario | ARPU | Churn | CAC | LTV (3yr) | LTV/CAC | Payback |
|----------|:----:|:-----:|:---:|:---------:|:-------:|:-------:|
| Optimistic | $600 | 2.5% | $1,100 | $7,200 | 6.5x | 2.2 mo |
| **Base** | **$500** | **3.5%** | **$1,450** | **$5,600** | **3.9x** | **3.4 mo** |
| Pessimistic | $400 | 5% | $1,800 | $3,400 | 1.9x | 5.3 mo |

**Kill-condition:** Churn > 7% → LTV/CAC < 1.0 → model is unviable.

### Recommendations

| # | Bottleneck | Action | Effect | Priority |
|---|-------------|----------|:------:|:---------:|
| 1 | Churn 3.5% (upper bound) | Guided onboarding + health score alerts | Churn → 2.5%, LTV +29% | P1 |
| 2 | LinkedIn CAC $2,500 (high) | A/B test creatives, narrow targeting | CAC → $1,800 | P2 |
| 3 | Referral only 10% of clients| Launch referral program "month for free" | +5 clients/mo, CAC $500| P2 |

## Validation (Quality Gate)

- [ ] Revenue model is visualized: Revenue → COGS → Gross Margin → Variable → Contribution Margin
- [ ] CAC runs calculated (blended + by channels with LTV/CAC per channel)
- [ ] LTV calculated with min 2 methods, noting assumptions
- [ ] Variance between LTV methods noted (< 30% or choice justified)
- [ ] LTV/CAC ratio calculated and interpreted by scale
- [ ] Payback period defined in months, compared with benchmark
- [ ] Break-even calculated: number of clients and timeline to reach
- [ ] Sensitivity analysis: 3 scenarios + kill-condition (at what LTV/CAC < 1.0)
- [ ] Metrics compared against industry benchmarks (with sources)
- [ ] Recommendations tied to bottlenecks with expected effect
- [ ] If data is modeled — explicitly marked with benchmark sources
- [ ] Data sources cited; data older than 12 mo marked ⚠️

> If validation fails — iterate until it passes, do not hand off further.

## Handoff
The output of `$unit-economics` acts as input for:
- **Strategist / Mediator** — unit economics as foundation for growth strategy.
- **`tam-sam-som`** — revenue potential = SOM × ARPU.
- **`cohort-analysis`** — cohort LTV to polish the model.
- **`rfm-analysis`** — LTV by segments for differentiated marketing.
- **`ansoff-matrix`** — unit economics of new markets / products.
- **`customer-journey-mapping`** — churn points → churn & CAC optimization.

Output format: metrics dashboard + revenue model + CAC per channel + LTV (2 methods) + sensitivity + recommendations. When handing off — use `$handoff`.

## Anti-patterns

| Mistake | Why it hurts | How to do it right |
|--------|-------------|---------------|
| LTV without churn | Massive overestimation | Always factor in churn; or use capped LTV (e.g. 3 yrs) |
| CAC without sales | Marketing is not the entire CAC | Include sales salaries, tools, overhead |
| Single LTV method | Different methods → different results | Minimal 2 methods, cross-check, justify choice |
| No payback period | Cash flow burden is unseen | Payback in mo + cash needed = CAC × new × payback |
| No benchmarks | Unclear if numbers are good | Contrast with industry (SaaS Capital, OpenView) |
| Static model | Metrics shift every quarter | Recalculate quarterly |
| No sensitivity | False confidence in one scenario | 3 scenarios + kill-condition (LTV/CAC < 1.0) |
| Blended CAC only | Unclear which channel is bleeding money | CAC per channel + LTV/CAC per channel → verdict |
| No break-even | Unclear when business turns a profit | Break-even clients + timeframe to achieve |

## Output Template

```
### Unit Economics — [Product / Service]

**Business Model:** [model]
**Pricing Model:** [model]
**Analysis Unit:** [client / account / order]
**Currency:** [currency]
**Period:** [period]
**Data Type:** Real / Modeled (benchmark: [source])
**Assessment Date:** [date]

---

#### Revenue Model (Unit Economics Flow)

| Component | Value/mo | % of Revenue | Description |
|-----------|:------------:|:------------:|----------|
| Revenue (ARPU) | $XX | 100% | [Source] |
| COGS | -$XX | XX% | [What is included] |
| **Gross Margin** | **$XX** | **XX%** | |
| Variable Costs | -$XX | XX% | [What is included] |
| **Contribution Margin** | **$XX** | **XX%** | |

---

#### Key Metrics (Dashboard)

| Metric | Value | Benchmark | Rating |
|---------|:--------:|:--------:|:------:|
| ARPU (mo) | $XX | $XX-$XX | 🟢/🟡/🔴 |
| CAC (blended) | $XX | $XX-$XX | 🟢/🟡/🔴 |
| LTV (capped 3yr)| $XX | $XX-$XX | 🟢/🟡/🔴 |
| LTV/CAC | X.Xx | 3-5x | 🟢/🟡/🔴 |
| Payback | X mo | X-X mo | 🟢/🟡/🔴 |
| Gross Margin | XX% | XX-XX% | 🟢/🟡/🔴 |
| Churn (mo) | X% | X-X% | 🟢/🟡/🔴 |
| Break-even | N clients| — | ✅/⚠️ |

---

#### CAC by Channels

| Channel | Budget | Clients | CAC | % total | LTV/CAC | Verdict |
|-------|:------:|:-------:|:---:|:-------:|:-------:|:-------:|
| [Channel] | $XX | N | $XX | XX% | X.Xx | 🟢/🟡/🔴 |
| **Blended** | **$XX** | **N** | **$XX** | **100%** | **X.Xx** | |

---

#### LTV — Methodology

| Method | Formula | Result | Assumptions |
|-------|---------|:---------:|-----------|
| Simple | ARPU × GM × (1/Churn) | $XX | [assumptions] |
| Cohort | Actual cohort revenue | $XX | [assumptions] |
| **Final estimate**| [method / average] | **$XX** | Variance: X% |

---

#### Break-Even

| Metric | Value |
|---------|:--------:|
| Fixed Costs (mo) | $XX |
| Contribution Margin per unit | $XX |
| Break-even clients | N |
| Current base | N |
| Gap | ±N |
| Timeline to reach | X mo |

---

#### Sensitivity Analysis

| Scenario | ARPU | Churn | CAC | LTV | LTV/CAC | Payback |
|----------|:----:|:-----:|:---:|:---:|:-------:|:-------:|
| Optimistic | $XX | X% | $XX | $XX | X.Xx | X mo |
| **Base** | **$XX** | **X%** | **$XX** | **$XX** | **X.Xx** | **X mo** |
| Pessimistic | $XX | X% | $XX | $XX | X.Xx | X mo |

**Kill-condition:** [Under what parameter LTV/CAC < 1.0]

---

#### Recommendations

| # | Bottleneck | Action | Target Metric | Expected Effect | Priority |
|---|-------------|----------|-----------------|:----------------:|:---------:|
| 1 | [Problem] | [Action] | [Metric] | [±X%] | P1 |

**Recalculation:** quarterly

---

#### Sources and Assumptions

| # | Fact / Assumption | Source | Date | Confidence |
|---|-------------------|----------|------|:-------------:|
| 1 | [Fact] | [Source] | [Date] | ✅ / ⚠️ / 🔮 |

Legend: ✅ Verified (real data / 2+ sources) | ⚠️ Estimated (benchmark) | 🔮 Assumed (modeling)
```
