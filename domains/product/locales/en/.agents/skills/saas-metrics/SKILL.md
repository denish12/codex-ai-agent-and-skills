---
name: saas-metrics
description: B2B SaaS metrics — MRR/ARR, gross/net churn, NRR, LTV/CAC, Payback, Rule of 40, Magic Number
---
# SaaS Metrics (B2B)

> **Category:** Metrics  ·  **Slug:** `saas-metrics`

## When to Use

- For board / investor reporting — standard SaaS health view.
- For PRD Success Criteria — how a PM initiative will affect MRR/NRR/churn.
- For unit economics evaluation — sustainable growth.
- For strategic decisions — pricing, segment focus, expansion.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Finance data | ✅ | Subscription revenue, billing history |
| CRM data | ✅ | Account status, cohort, upgrades/downgrades |
| Customer data | ✅ | Cohorts, churn events, contract terms |
| Costs | ✅ | CAC (S&M spend per acquired), product costs |
| Period | ✅ | Monthly / quarterly view |

## Data Sources

1. Billing system (Stripe, Chargebee, etc.)
2. CRM (Salesforce, HubSpot)
3. Finance (ERP, spreadsheets)
4. Analytics (usage data for churn prediction)

### Related Skills

| Skill | What we take | When to invoke |
|-------|-------------|----------------|
| `aarrr-metrics` | Funnel view | Complement AARRR |
| `north-star-metric` | NSM alignment | NSM is often a derivative SaaS metric |
| `hypothesis-template` | Impact modeling | For PRD |
| `unit-economics` (if available) | Deep unit view | Alternative / complement |

## Core Metrics

### Revenue

- **MRR (Monthly Recurring Revenue)** — sum of all active monthly subscriptions (normalized if annual / quarterly)
  - New MRR (from new customers)
  - Expansion MRR (upsells, add-ons)
  - Contraction MRR (downgrades)
  - Churn MRR (lost to cancellation)
  - Reactivation MRR (returning customers)
- **ARR (Annual Recurring Revenue)** — MRR × 12
- **Net New MRR** = New + Expansion − Contraction − Churn

### Churn / Retention

- **Gross Customer Churn** — customers lost / total at start
- **Net Customer Churn** — (lost − reactivated) / total
- **Gross Revenue Churn** — MRR lost / total MRR at start
- **Net Revenue Churn** — (MRR lost − expansion) / total MRR
  - **Can be negative** (key B2B SaaS metric — «negative churn» = expansion > churn)

### NRR (Net Revenue Retention)

```
NRR = (Starting MRR + Expansion − Contraction − Churn) / Starting MRR × 100%
```

**B2B SaaS benchmarks:**
- 100% = breaking even on existing base
- 110-120% = healthy B2B
- 130%+ = world-class (Snowflake, Datadog)
- < 100% = red flag (shrinking base)

### Unit Economics

- **CAC (Customer Acquisition Cost)** — total S&M spend / new customers acquired
  - Blended: all customers
  - Paid: acquisition from paid channels only
- **LTV (Lifetime Value)** — average revenue from customer over their lifetime
  - Simple: ARPA / gross churn rate
  - ARPA = Average Revenue Per Account (monthly)
- **LTV / CAC ratio** — sustainable at 3× or higher
  - < 1× = destroying value
  - 1-3× = ok, room for improvement
  - 3×+ = healthy
  - 5×+ = possibly under-investing in growth
- **CAC Payback Period** — months to recover CAC from gross margin
  - Target: < 12 months (B2B SaaS)
  - 12-18 months = ok for enterprise
  - > 24 months = unhealthy

### Growth Health

- **Rule of 40** = Growth Rate (%) + EBITDA Margin (%) ≥ 40%
  - Trade-off: fast growth allows lower margin, slow growth requires profit
  - < 40 = not attractive, either grow or profit more
- **Magic Number** = (ARR this quarter − ARR last quarter) × 4 / Sales & Marketing spend last quarter
  - > 1 = efficient growth
  - 0.5-1 = ok
  - < 0.5 = inefficient S&M
- **Burn Multiple** = Net Burn / Net New ARR
  - < 1 = great, more ARR than burn
  - 1-2 = acceptable
  - > 2 = worrying

## Protocol

### Step 0 — Period & Scope

- Period: monthly baseline, quarterly for board
- Scope: all products? per product line? per segment?

### Step 1 — Revenue Decomposition

Monthly waterfall:
- Starting MRR (carryover from last month)
- + New MRR
- + Expansion MRR
- − Contraction MRR
- − Churn MRR
- = Ending MRR

### Step 2 — Cohort Analysis

Track customer cohorts by signup month:
- Starting count
- Retention by month (month 1, 3, 6, 12, 24)
- Revenue expansion per cohort
- Gross + Net revenue retention curves

B2B healthy: retention curve stabilizes around 60-85% at 12 months (depends on segment).

### Step 3 — Per-Segment

Split metrics by segment:
- SMB vs mid-market vs enterprise — radically different metrics
- SMB: higher churn, lower ARPA, shorter payback
- Enterprise: lower churn, higher ARPA, longer payback, higher NRR

### Step 4 — Unit Economics Per Segment

| Segment | ARPA | Gross Churn | LTV | CAC | LTV/CAC | Payback |
|---------|:----:|:-----------:|:---:|:---:|:-------:|:-------:|
| SMB | $50/mo | 4% | $1,250 | $400 | 3.1× | 10 months |
| Mid-market | $500/mo | 1.5% | $33,333 | $8,000 | 4.2× | 16 months |
| Enterprise | $5,000/mo | 0.5% | $1M | $150,000 | 6.7× | 24 months |

### Step 5 — Leading Indicators

Predictors for churn / expansion:
- Usage frequency (decrease = churn risk)
- Team seats adoption
- Feature depth
- Support ticket pattern
- Renewal risk score

### Step 6 — Benchmark

Compare to industry:
- SaaS Capital Index
- OpenView benchmark reports
- ChartMogul benchmarks
- Public SaaS companies (10-K filings)

### Step 7 — Forecasting

Modeling:
- Base + optimistic + pessimistic scenarios
- New MRR from channels × conversion
- Expansion from existing cohorts
- Churn from historical curves

## Validation (Quality Gate)

- [ ] MRR decomposition (new / exp / contract / churn)
- [ ] Gross + Net churn separated
- [ ] NRR calculated
- [ ] LTV / CAC / Payback per segment
- [ ] Cohort retention curves
- [ ] Rule of 40 computed
- [ ] Segment-split present (not only blended)
- [ ] Benchmarked against industry
- [ ] Forecasts scenario-based

## Handoff

The result is input for:
- **`north-star-metric`** — NSM should relate to NRR / retention
- **`hypothesis-template`** — expected SaaS metric impact per initiative
- **PRD Success Criteria** — quantified business impact
- **Board / Exec reporting**

Format: SaaS metrics dashboard / doc. Via `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|-------------------|
| ARR vs MRR confusion | Wrong numbers | MRR × 12 = ARR only for monthly; otherwise careful |
| Ignore contraction | Over-reports growth | Separate contraction from churn |
| Only blended metrics | Hides segment truth | Always per-segment |
| LTV/CAC without payback | Distorted view | Both together |
| Cherry-pick cohorts | Survivorship bias | All cohorts |
| Magic Number alone | Pre-revenue misleading | With Burn Multiple |
| Gross margin confusion | LTV × wrong margin | Gross margin, not revenue LTV |

## Template

```markdown
# SaaS Metrics Dashboard — Q2 2026

## Revenue Waterfall
- Starting MRR: $X
- + New MRR: $Y
- + Expansion: $Z
- − Contraction: $A
- − Churn: $B
- = Ending MRR: $C
- Net New MRR: $D

## Retention
- Gross Rev Churn: X%
- Net Rev Retention: Y%
- Customer Gross Churn: Z%
- Customer Net Churn: A%

## Unit Economics (per segment)
| Segment | ARPA | Churn | LTV | CAC | LTV/CAC | Payback |
| SMB | | | | | | |
| Mid-market | | | | | | |
| Enterprise | | | | | | |

## Growth Health
- Rule of 40: [growth%] + [margin%] = X
- Magic Number: Y
- Burn Multiple: Z

## Cohort Retention
[Curve chart by cohort]

## Benchmarks
- Industry median NRR: 110%
- Our NRR: 115% ✅
- ...

## Forecast
| Scenario | Q3 ARR | Q4 ARR |
| Base | | |
| Optimistic | | |
| Pessimistic | | |
```

## Worked Example — TeamFlow SaaS Metrics Dashboard Q2 2026

```markdown
# SaaS Metrics Dashboard — TeamFlow Q2 2026

## Company Snapshot
- **Stage:** Series B, 5 years post-founding, $8M ARR
- **Customers:** 200 active (120 SMB + 70 mid-market + 10 enterprise)
- **Headcount:** 45
- **Period:** Q2 2026 (April 1 – June 30)

---

## Revenue Waterfall (Q2 2026)

| Line Item | Amount | Notes |
|-----------|--------|-------|
| **Starting MRR (April 1)** | **$667K** | $8M ARR ÷ 12 |
| + New MRR (new customers) | +$140K | 14 new customer logos, blended ACV ~$3.3K/mo avg |
| + Expansion MRR (existing) | +$213K | 38 accounts added seats / upgraded tier (AI Tier early upgrades) |
| − Contraction MRR | −$20K | 8 accounts downgraded (SMB price sensitivity) |
| − Churn MRR | −$160K | 5 customer logos churned (matches 2.5% quarterly = ~8% annual gross churn anchor) |
| = **Ending MRR (June 30)** | **$840K** | |
| **Net New MRR** | **+$173K** | Health measure: +26% QoQ MRR growth |

Annualized: ARR end of Q2 = $10.08M (12 × $840K). QoQ annualized growth rate: ~26% → trailing annualized ~125% if sustained (optimistic, actual will moderate as AI Tier early-adopter burst fades).

**NRR verification:** (Start − Churn − Contraction + Expansion) / Start = (667 − 160 − 20 + 213) / 667 = 700 / 667 = **105.0%** ✓ matches stated NRR

---

## Retention Metrics

| Metric | Value | Benchmark (B2B SaaS median) | Status |
|--------|:-----:|:--------------------------:|:------:|
| **Gross Revenue Churn** (Q2) | 2.1% (annualized ~8.4%) | 10-15% annual | ✅ healthy |
| **Net Revenue Retention (NRR)** | 105% (from 108% Q1) | 115% median | ⚠️ declining |
| **Customer Gross Churn** (Q2) | 2.5% logo churn (annualized ~10%) | 8-12% annual | ✅ on target |
| **Customer Net Churn** | −1.5% net (5 churned, 12 expansion reactivation, +9 net) | N/A | |

**Key insight:** NRR dropped 3pp QoQ. Investigation: SMB tier price sensitivity + insufficient expansion motion. **AI tier launch (Q2 late) expected to revert by Q3.**

---

## Unit Economics — Per Segment

> All LTV/CAC computed with 80% gross margin (SaaS standard). Segment ARPAs chosen so total ARR ≈ $8M: SMB $432K + Mid $4.2M + Ent $3.6M = $8.23M ≈ $8M anchor.

| Segment | ARPA/mo | ARPA/yr | Gross Churn (annual) | LTV (GM 80%) | CAC | LTV/CAC | CAC Payback |
|---------|:-------:|:-------:|:--------------------:|:------------:|:---:|:-------:|:-----------:|
| **SMB** (120 customers) | $300 | $3,600 | 20% | $14,400 | $4,800 | **3.0×** | 24 mo |
| **Mid-market** (70 customers) | $5,000 | $60,000 | 10% | $480,000 | $80,000 | **6.0×** | 20 mo |
| **Enterprise** (10 customers) | $30,000 | $360,000 | 5% | $5,760,000 | $600,000 | **9.6×** | 25 mo |
| **Blended (weighted)** | $3,333 | $40,000 | ~10% | ~$320,000 | ~$60,000 | **~5.3×** | ~22 mo |

**LTV formula:** `LTV = ARPA_annual × gross_margin / annual_gross_churn` (standard B2B SaaS).

**Key insights:**
- **Enterprise economics excellent** — 9.6× LTV/CAC justifies aggressive investment in enterprise GTM.
- **SMB at 3× threshold** — healthy but sensitive to churn deterioration; SMB price tier needs ongoing optimization.
- **Blended 5.3×** — above industry median (3.0×), room for continued S&M expansion.
- **Strategic question:** double down on SMB volume or shift mix to mid+ where unit economics sing?

---

## Growth Health Metrics

| Metric | Value | Target | Status |
|--------|:-----:|:------:|:------:|
| **Rule of 40** = Growth% + EBITDA% | 52% + (−15%) = **37%** | ≥ 40% | ⚠️ just below |
| **Magic Number** (S&M efficiency) | **1.15** | > 1.0 | ✅ efficient |
| **Burn Multiple** (Net Burn / Net New ARR) | **1.8×** | < 1.5× | ⚠️ slightly high |
| **Pipeline Coverage** (pipeline / quota) | 3.2× | ≥ 3× | ✅ healthy |

**Investor narrative:**
- Rule of 40 at 37% — «tight but growing»; AI tier launch strategy aims to add 5pp to growth rate without increasing burn
- Magic Number 1.15 supports continued S&M investment
- Burn Multiple 1.8× reflects R&D investment in AI — justified, will normalize post-MVP

---

## Cohort Retention Curves

**Q1 2025 cohort retention (by month):**

| Month | # Remaining | Retention | Revenue Retention |
|:-----:|:-----------:|:---------:|:-----------------:|
| Month 1 | 38 of 40 | 95% | 98% |
| Month 3 | 34 | 85% | 92% |
| Month 6 | 31 | 78% | 105% (expansion >churn) |
| Month 12 | 28 | 70% | 118% |
| Month 24 | 25 | 63% | 142% |

**Interpretation:**
- **Logo retention decays** (63% at 24 mo)
- **Revenue retention grows** (142% at 24 mo) — strong expansion per retained account
- **Pattern typical for B2B SaaS** — few big accounts expand aggressively, offset logo loss

**Cohort comparison:**
- **Q2 2024 cohort:** 60% at 24mo (slightly worse) — improving over time
- **Q1 2026 cohort:** 95% at 3mo (much stronger) — new motion paying off

---

## Key Metric: «Sticky Manager Ratio» (NSM Tracking)

- **Baseline (pre-AI tier):** 0% (feature not existing)
- **90-day target (post AI tier launch):** 20%
- **Current (projected):** on track for 18% by end Q2, pull back 2pp to target with continued GTM

---

## Benchmark Comparison (Industry)

| Metric | TeamFlow | Median B2B SaaS | Top Quartile |
|--------|:--------:|:--------------:|:------------:|
| NRR | 105% | 110% | 125%+ |
| Gross Churn | 8% | 10% | <6% |
| LTV/CAC (blended) | 2.8× | 3.0× | 5.0×+ |
| Rule of 40 | 37% | 40% | 60%+ |
| Magic Number | 1.15 | 0.9 | 1.5+ |

**Overall position:** Middle of pack. Magic Number above median, but NRR / LTV-CAC below. AI tier strategy aims to pull all three into top-quartile by Q4 2026.

---

## Scenario Forecasts (Q3-Q4 2026)

| Scenario | Q3 ARR | Q4 ARR | Key Assumptions |
|----------|:------:|:------:|-----------------|
| **Base** | $9.5M | $10.8M | AI tier adoption hits 15% by Q3, 25% by Q4; NRR climbs to 110% |
| **Optimistic** | $10.2M | $12.5M | AI tier adoption 20%+ by Q3, 5 new Enterprise deals, NRR 115% |
| **Pessimistic** | $8.8M | $9.5M | AI tier adoption <10%, continued SMB churn, NRR stays 105% |

**Factors for base/optimistic pivot:**
- H-001 (WTP) validation — if WTP confirmed, optimistic scenario triggered
- LLM quality H-002 pass — if passes, all scenarios possible; fail pushes to pessimistic
- Enterprise tier conversion — 5 deals in Q2 is base; 10+ triggers optimistic

---

## Action Items (for Leadership)

1. **NRR decline watch:** weekly tracking, intervention plan prepared if NRR <100% at any week
2. **SMB churn deep-dive:** cash flow analysis of 14 Q2 churn events — patterns?
3. **AI tier launch execution:** on track, but marketing amplification needed (CRO ownership)
4. **Enterprise tier pipeline:** 8 deals in active negotiation — 5 closing target by Q2 end; ensure SOC 2 attestation unblocks them
5. **Q3 planning:** post-H-002 validation, allocate R&D between AI iteration vs Enterprise tier features
```

> **saas-metrics lesson:** Blended metrics **hide** segment realities — Enterprise 11× LTV/CAC vs SMB 2.87× requires completely different strategies. **Cohort analysis reveals time-dynamics** — logo churn looks bad, but revenue retention growth compensates (typical B2B). **NRR trend (not absolute)** matters more than point value — 108→105 is worth investigating even though 105 acceptable. **Scenario forecasts** tied to **validated/pending hypotheses** — not random assumptions. Dashboard tells story: «we're middle-pack, AI tier is our move to top-quartile, here are the leading indicators».
