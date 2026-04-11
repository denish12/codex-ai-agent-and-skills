---
name: unit-economics
description: Unit economics analysis — CAC, LTV, margin, payback period, sensitivity
---
# Unit Economics — Unit Economics Analysis

## When to Use
- When evaluating business model viability — whether the economics work on a per-unit basis.
- When planning growth — under what conditions scaling is profitable.
- When raising investment — investors require unit economics.
- When optimizing marketing — evaluating acquisition channel efficiency.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Business model | ✅ | SaaS / E-commerce / Marketplace / Service |
| Pricing model | ✅ | Subscription / transaction / license / freemium |
| Average check (ACV/ARPU) | ✅ | Average revenue per customer per period |
| Marketing expenses | ⬚ | Budget by channel (if known) |
| Number of customers | ⬚ | Current base or forecast |
| Churn rate | ⬚ | Attrition percentage (if known) |
| Gross margin | ⬚ | Product gross margin |
| Acquisition channels | ⬚ | Which channels are used |
| Historical data | ⬚ | Metrics from past periods |

> If required fields are not provided — **ask the user** before starting the analysis. Do not assume.

## Data Sources
1. **Web search** — industry benchmarks (SaaS Capital, OpenView, ProfitWell, Baremetrics).
2. **Financial data** — public filings of comparable companies.
3. **Industry reports** — average CAC, LTV, churn by vertical.
4. **User-provided data** — actual metrics from CRM, analytics, accounting.
5. **Marketing platforms** — acquisition cost by channel.

> For benchmarks — cite the source, year, and applicability to this business.

## Protocol

### Step 0 — Context Collection
Verify required data availability. Determine the business model type and analysis "unit" (customer / subscription / order). Select the currency and period.

### Step 1 — Business Model and Pricing
- Describe the monetization model (subscription, transaction, commission).
- Document the average check (ARPU / ACV).
- Define the revenue structure: one-time payment vs recurring.
- Define the unit of analysis: customer / account / subscription / order.

### Step 2 — CAC (Customer Acquisition Cost)
Calculate the cost of customer acquisition:
- **Blended CAC:** total marketing and sales expenses / number of new customers.
- **CAC by channel:** breakdown by each acquisition channel.
- Include: advertising, content, SEO, sales (salaries), tools.
- Determine the organic share (customers with CAC approximately 0).
- CAC dynamics: increasing / stable / decreasing.

### Step 3 — LTV (Lifetime Value)
Calculate the customer lifetime value. Choose the methodology:
- **Simple method:** ARPU x Gross Margin x Avg Lifetime (1/churn).
- **Cohort method:** actual cohort revenue over the customer lifetime.
- **DCF method:** discounted future cash flows from the customer.
- Justify the chosen method and state assumptions.

### Step 4 — LTV/CAC Ratio
Calculate the ratio and interpret:
- **LTV/CAC < 1:** the business loses money on every customer.
- **LTV/CAC 1-3:** borderline profitability, optimization needed.
- **LTV/CAC 3-5:** healthy economics, ready to scale.
- **LTV/CAC > 5:** possibly underinvesting in growth.
- Compare with industry benchmarks.

### Step 5 — Payback Period
Determine the time to recoup customer acquisition cost:
- **Formula:** CAC / (ARPU x Gross Margin) = months to payback.
- Benchmarks: SaaS — 12-18 months, E-commerce — 1-6 months.
- Impact of payback on cash flow and working capital requirements.

### Step 6 — Margin Analysis
Analyze profitability:
- **Gross Margin:** revenue - COGS.
- **Contribution Margin:** gross margin - variable per-customer expenses.
- **Net Margin:** contribution margin - allocated fixed expenses.
- Determine the break-even point.

### Step 7 — Sensitivity Analysis
Assess unit economics sensitivity to changes in key parameters:
- ARPU +/-20%.
- Churn rate +/-30%.
- CAC +/-25%.
- Gross Margin +/-10%.
- Build a scenario table: optimistic / base / pessimistic.

### Step 8 — Benchmarking and Recommendations
- Compare all metrics against industry benchmarks.
- Identify bottlenecks (what constrains the economics).
- Formulate improvement recommendations:
  - How to reduce CAC (channels, conversion).
  - How to increase LTV (retention, upsell, pricing).
  - How to improve margin (COGS, operational efficiency).

## Validation (Quality Gate)

- [ ] CAC is calculated (blended + by channel)
- [ ] LTV is calculated with methodology and assumptions stated
- [ ] LTV/CAC ratio is calculated and interpreted
- [ ] Payback period is defined in months
- [ ] Margin analysis is conducted (gross / contribution)
- [ ] Sensitivity analysis with minimum 3 scenarios
- [ ] Metrics are compared against industry benchmarks
- [ ] Formulas and assumptions are explicitly stated
- [ ] Recommendations are specific and tied to metrics

> If validation fails — rework until passing, do not hand off further.

## Handoff
The `$unit-economics` result serves as input for:
- **Strategist / Mediator** — unit economics as the foundation for a growth strategy.
- `$tam-sam-som` — revenue potential = SOM x ARPU.
- `$cohort-analysis` — LTV by cohort for model refinement.
- `$rfm-analysis` — LTV by segment.
- `$trend-analysis` — trends affecting future CAC and churn.

On handoff — use `$handoff` with key metrics and formulas.

## Anti-patterns

| Mistake | Why It's Bad | How to Do It Right |
|---------|-------------|-------------------|
| LTV without accounting for churn | Overestimation by multiples | Always factor churn into LTV |
| CAC without sales costs | Marketing is not all of CAC | Include sales salaries, tools, overhead |
| Single LTV method | Different methods yield different results | Calculate with 2+ methods, compare |
| No payback period | Cash flow burden invisible | Always calculate payback in months |
| No benchmarks | Unclear whether figures are good | Compare with industry standards |
| Static model | Metrics change every quarter | Recommend regular recalculation |
| No sensitivity analysis | False confidence in a single scenario | Always 3 scenarios minimum |

## Output Template

```
### Unit Economics — [Product / Service]

**Business model:** [model]
**Pricing model:** [model]
**Currency:** [currency]
**Period:** [period]
**Analysis date:** [date]

---

#### Key Metrics (Dashboard)

| Metric | Value | Benchmark | Assessment |
|--------|-------|-----------|------------|
| **ARPU** (monthly) | $[X] | $[X]-$[X] | [above/normal/below] |
| **CAC** (blended) | $[X] | $[X]-$[X] | [above/normal/below] |
| **LTV** | $[X] | $[X]-$[X] | [above/normal/below] |
| **LTV/CAC** | [X]x | 3-5x | [above/normal/below] |
| **Payback Period** | [X] months | [X]-[X] months | [above/normal/below] |
| **Gross Margin** | [X]% | [X]-[X]% | [above/normal/below] |
| **Churn Rate** (monthly) | [X]% | [X]-[X]% | [above/normal/below] |

---

#### CAC by Channel

| Channel | Budget | Customers | CAC | Share | Efficiency |
|---------|--------|-----------|-----|-------|------------|
| [Channel 1] | $[X] | [N] | $[X] | [X]% | [high/medium/low] |
| [Channel 2] | $[X] | [N] | $[X] | [X]% | [high/medium/low] |
| Organic | $0 | [N] | $0 | [X]% | High |
| **Total (blended)** | $[X] | [N] | $[X] | 100% | — |

---

#### LTV — Methodology

| Method | Formula | Result | Assumptions |
|--------|---------|--------|-------------|
| Simple | ARPU x GM x (1/Churn) | $[X] | [assumptions] |
| Cohort | Actual cohort revenue | $[X] | [assumptions] |
| **Final estimate** | [weighted] | **$[X]** | — |

---

#### Sensitivity Analysis

| Scenario | ARPU | Churn | CAC | LTV | LTV/CAC | Payback |
|----------|------|-------|-----|-----|---------|---------|
| Optimistic | $[X] | [X]% | $[X] | $[X] | [X]x | [X] months |
| **Base** | $[X] | [X]% | $[X] | $[X] | [X]x | [X] months |
| Pessimistic | $[X] | [X]% | $[X] | $[X] | [X]x | [X] months |

---

#### Recommendations
1. **Reduce CAC:** [specific actions]
2. **Increase LTV:** [specific actions]
3. **Improve margin:** [specific actions]
4. **Recalculation:** recommended quarterly update
```
