---
name: rfm-analysis
description: Customer segmentation by recency, frequency, and monetary value
---
# RFM Analysis — Customer Segmentation by Recency, Frequency, and Monetary Value

## When to Use
- When building a retention strategy — to understand who to retain and who to reactivate.
- When optimizing a marketing budget — to direct resources to the most valuable segments.
- When launching personalized campaigns — different messaging for different segments.
- When analyzing a customer base — identifying Champions, loyal, at-risk, and lost customers.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Business / Product | ✅ | What we are analyzing |
| Business Model | ✅ | E-commerce / SaaS / Marketplace / Service |
| Transaction Data | ⬚ | Table: customer, date, amount (if real data is available) |
| Analysis Period | ⬚ | For what period (default — 12 months) |
| Number of Customers | ⬚ | Base size to calibrate the scale |
| Average Check | ⬚ | For modeling, if real data is missing |
| Purchase Frequency | ⬚ | Average frequency for modeling |

> If mandatory fields are not provided — **request them from the user** before starting the analysis. Do not make assumptions.

> If real data is missing — the skill operates with **modeled data**, explicitly marked as hypothetical. The methodology remains applicable when real data becomes available.

## Data Sources
1. **Transactional data** — CRM, payment system, ERP (if provided).
2. **Web search** — industry benchmarks (average check, frequency, retention rate).
3. **Industry reports** — typical RFM distributions for the given business type.
4. **Product analytics** — user activity data (for SaaS — logins, actions).
5. **Data from the user** — exports from CRM, Google Analytics, payment provider.

> When working with modeled data — specify benchmark sources. Data older than 12 months must be marked ⚠️.

### Relationship with Other Skills
| Skill | What We Take | When to Call |
|------|-----------|----------------|
| `web-research` | Industry benchmarks: avg check, frequency, retention | If there is no real data — for modeling |
| `cohort-analysis` | Retention curves for calibrating Recency thresholds (step 2) | If cohort data is available |
| `competitive-analysis` | Competitor benchmarks for retention and LTV | To compare with market standards |
| `icp-buyer-persona` | Champions profile → ICP enrichment (step 8) | After segmentation: Champions = ICP standard |
| `unit-economics` | LTV per segment for calculating reactivation budget | To evaluate ROI by segments |
| `customer-journey-mapping` | Churn points for At Risk / About to Sleep | To understand exactly where we are losing customers |

## Protocol

### Step 0 — Gathering Context
1. Check for the presence of mandatory data.
2. Determine the mode: **real data** or **modeled**.
3. Record the analysis period.
4. Define the adaptation for the business model:

   | Business Model | Recency = | Frequency = | Monetary = |
   |---------------|-----------|-------------|------------|
   | E-commerce | Days since the last order | Number of orders | Total order amount |
   | SaaS (subscription) | Days since the last login/action | Number of active months | MRR or subscription plan |
   | SaaS (usage-based) | Days since the last usage | Number of sessions/actions | Total payment amount |
   | Marketplace | Days since the last transaction | Number of transactions | GMV (Gross Merchandise Volume) |
   | Service (offline) | Days since the last visit | Number of visits | Total check amount |

### Step 1 — Defining the Data Scope
- Define the unit of analysis: customer / account / subscriber.
- Define a "transaction" for the given business model (see table in step 0).
- Define the period: start and end dates.
- Exclude anomalies: test accounts, refunds, abnormal amounts (>3σ).

### Step 2 — Recency Score (R)
1. Calculate the days since the last transaction for each customer.
2. Define thresholds based on the business cycle:

   | Score | E-commerce | SaaS (subscription) | Marketplace |
   |:-----:|:----------:|:---------------:|:-----------:|
   | R=5 | 0-30 days | 0-7 days | 0-14 days |
   | R=4 | 31-90 | 8-30 | 15-45 |
   | R=3 | 91-180 | 31-60 | 46-90 |
   | R=2 | 181-365 | 61-120 | 91-180 |
   | R=1 | >365 | >120 | >180 |

   > Thresholds are guidelines. Calibrate to the actual distribution (quintiles) if data is available.

### Step 3 — Frequency Score (F)
1. Count the number of transactions per customer for the period.
2. Divide into 5 groups (quintiles or business logic).
3. F=5: top-20% by frequency. F=1: one-time / minimal.

### Step 4 — Monetary Score (M)
1. Calculate the total amount per customer for the period.
2. Divide into 5 groups (quintiles or business logic).
3. M=5: top-20% by amount. M=1: minimal spending.
4. For fixed subscription SaaS: replace M with an **Engagement Score** (depth of use: features, integrations, number of users in the account).

### Step 5 — Segmentation
Assign an RFM code (111-555) to each customer and group them:

| Segment | RFM Range | Description | Typical Share |
|---------|:------------:|----------|:-------------:|
| **Champions** | R=5, F=4-5, M=4-5 | Best customers, buy frequently and a lot | 5-10% |
| **Loyal Customers** | R=4-5, F=3-5, M=3-5 | Regular and valuable | 10-15% |
| **Potential Loyalists** | R=4-5, F=1-3, M=1-3 | New with growth potential | 10-15% |
| **Recent Customers** | R=5, F=1, M=1 | Just arrived, first purchase | 5-10% |
| **Promising** | R=3-4, F=1-2, M=1-2 | Show interest, need activation | 10-15% |
| **Need Attention** | R=3, F=3, M=3 | Average, at risk of leaving | 5-10% |
| **About to Sleep** | R=2-3, F=1-2, M=1-2 | Losing interest | 10-15% |
| **At Risk** | R=1-2, F=3-5, M=3-5 | Were active and valuable, leaving | 5-10% |
| **Cannot Lose** | R=1, F=5, M=5 | VIPs who left — critical to win back | 1-3% |
| **Hibernating** | R=1-2, F=1-2, M=1-2 | Long inactive, low value | 10-15% |
| **Lost** | R=1, F=1, M=1 | Lost | 5-10% |

### Step 6 — Evaluating Segment Value
For each segment, calculate:

| Segment | % of base | % of revenue | Avg LTV | Revenue/customer | Budget Priority |
|---------|:------:|:---------:|:-------:|:--------------:|:-----------------:|
| Champions | X% | X% | $XXX | $XXX | High (retention) |
| At Risk | X% | X% | $XXX | $XXX | High (reactivation) |
| Lost | X% | X% | $XXX | $XXX | Low (let go) |

**Pareto Principle:** usually Champions + Loyal = 15-25% of the base, but 60-80% of revenue. If the distribution differs — record it as an anomaly.

### Step 7 — Strategy and Personalization by Segments

| Segment | Goal | Action | Channel | Tone | Offer | KPI |
|---------|------|----------|-------|-----|-------------|-----|
| Champions | Retention + advocacy | Exclusive access, referral program | Email, personal | Appreciative, VIP | Early access, referral bonus | NPS, referral rate |
| Loyal | Upsell + loyalty | Cross-selling, loyalty program | Email, in-app | Friendly, expert | Upgrade, bundle | ARPU, retention |
| Potential Loyalists | Engagement + onboarding | Guided onboarding, educational email series | Email, in-app | Supportive | Bonus for the 2nd purchase | F→2+, activation |
| Recent | Activation | Welcome series, aha-moment | Email, push | Welcoming | Promo code for the 2nd order | Day-7 retention |
| At Risk | Reactivation | "We miss you", special offer | Email, SMS | Caring, urgent | 20% discount, personal offer | Win-back rate |
| Cannot Lose | Urgent reactivation | Manager call, personal offer | Call, email | Personal, VIP | Max discount, upgrade | Win-back rate |
| Lost | Win-back or let go | Final email, churn reason survey | Email | Neutral | Survey + last chance | Churn reason data |

### Step 8 — Migration Analysis
Track the movement of customers between segments:

1. Compare RFM segments for the current and previous periods:

   | Migration | Count | % | Interpretation | Action |
   |----------|:----------:|:-:|---------------|----------|
   | Champions → At Risk | [N] | X% | Loss of best customers — critical | Immediate reactivation |
   | Potential Loyalists → Loyal | [N] | X% | Healthy growth — onboarding works | Scale the approach |
   | At Risk → Lost | [N] | X% | Reactivation failed | Revise strategy |
   | Recent → Promising | [N] | X% | Activation works | Continue |

2. Key migrations to monitor:
   - **Negative:** Champions/Loyal → At Risk, At Risk → Lost, Potential → Hibernating.
   - **Positive:** Recent → Potential → Loyal → Champions.
3. Recommended recalculation frequency:

   | Business Model | Frequency |
   |---------------|---------|
   | E-commerce (FMCG) | Weekly |
   | E-commerce (high-ticket) | Monthly |
   | SaaS | Monthly |
   | Marketplace | Bi-weekly |
   | Service (offline) | Quarterly |

## Example — E-commerce: Sports Supplements Store

**Context:** Online sports supplements store, B2C, 12,000 customers, 12-month period. Average check $45, average frequency 3.2 purchases/year.

### Evaluation Scale

| Metric | 5 | 4 | 3 | 2 | 1 |
|---------|:-:|:-:|:-:|:-:|:-:|
| **Recency** (days) | 0-30 | 31-60 | 61-120 | 121-240 | >240 |
| **Frequency** (orders) | ≥6 | 4-5 | 3 | 2 | 1 |
| **Monetary** ($) | >$300 | $200-300 | $100-200 | $50-100 | <$50 |

### Segments

| Segment | % of base | % of rev. | Count | Avg LTV | Strategy |
|---------|:------:|:---------:|:------:|:-------:|-----------|
| Champions | 8% | 35% | 960 | $520 | Referral program, VIP access |
| Loyal | 12% | 28% | 1440 | $340 | Upsell to subscription, loyalty program |
| Potential Loyalists | 11% | 8% | 1320 | $105 | Onboarding: "3rd order = free shipping" |
| At Risk | 7% | 12% | 840 | $250 | "We miss you" + 15% discount on favorite category |
| Cannot Lose | 2% | 5% | 240 | $360 | Manager call, personal offer |
| Lost | 15% | 2% | 1800 | $25 | Final email + churn reason survey |

**Pareto Check:** Champions + Loyal = 20% of base, 63% of revenue ✅ (healthy distribution).

### Migration Analysis (MoM)

| Migration | Count | % | Signal |
|----------|:------:|:-:|--------|
| Champions → At Risk | 45 | 4.7% | 🔴 Loss of VIPs — launch win-back |
| Potential → Loyal | 180 | 13.6% | 🟢 Onboarding works |
| At Risk → Lost | 120 | 14.3% | 🟡 Reactivation isn't effective enough |

**Recommendation:** Champions → At Risk = 4.7% — above benchmark (3%). Investigate: price? quality? competitor?

## Validation (Quality Gate)

- [ ] All three metrics (R, F, M) are defined with clear thresholds adapted to the business model
- [ ] Quintile thresholds are justified by the business cycle (or real data quintiles)
- [ ] A minimum of 6 named segments with RFM ranges are outlined
- [ ] For each segment: strategy, action, channel, tone, KPI
- [ ] Segment value is evaluated: % of base, % of revenue, average LTV
- [ ] Pareto check: Champions + Loyal ≈ 15-25% of base, 60-80% of revenue
- [ ] Migration analysis: key transitions between segments are recorded
- [ ] Recalculation frequency is recommended for the given business model
- [ ] If the data is modeled — it is explicitly stated with benchmark sources
- [ ] No logical contradictions in segmentation (RFM codes are correct)
- [ ] Data sources are specified; data older than 12 months is marked ⚠️

> If validation fails — iterate until it passes, rather than handing off.

## Handoff
The output of `$rfm-analysis` is an input for:
- **Strategist / Mediator** — customer segments for strategic decisions.
- **`unit-economics`** — LTV by segments, retention rates, reactivation budget.
- **`cohort-analysis`** — cohort grouping within segments.
- **`customer-journey-mapping`** — churn points for At Risk / About to Sleep.
- **`icp-buyer-persona`** — Champions profile = ICP standard.

Handoff format: table of segments (% of base, % of revenue, LTV) + strategies + migration analysis. When transferring — use `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Identical thresholds for all businesses | SaaS and e-commerce have different buying cycles | Calibrate thresholds to the business model (table in step 0) |
| Modeled data without labels | Decisions based on hypotheses, not facts | Explicitly mark, specify benchmark sources |
| Too many segments (>11) | Impossible to create a unique strategy for each | 6-11 named segments |
| Segmentation without a strategy | RFM for the sake of RFM, no actionable insights | Every segment = goal + action + channel + KPI |
| Ignoring M for subscriptions | Monetary is less variable in SaaS | Replace M with Engagement Score for SaaS |
| Static analysis without migration | Cannot see how customers move between segments | Migration analysis: negative and positive transitions |
| No personalization | Identical message for Champions and At Risk | Different tone, channel, offer, frequency per segment |
| Segments without value | Unclear where to allocate budget | % of base + % of revenue + LTV per segment + Pareto check |
| Benchmarks without a source | Impossible to verify | Every benchmark — with a source and date |

## Output Template

```markdown
### RFM Analysis — [Business / Product]

**Business Model:** [Model]
**Analysis Period:** [Date — Date]
**Base Size:** [N customers]
**Data Type:** Real / Modeled (Benchmark: [Source])
**Date:** [Date]

---

#### Metric Adaptation

| Metric | Definition for the Given Business |
|---------|-------------------------------|
| Recency | [What is measured: days since the last X] |
| Frequency | [What is counted: number of X over the period] |
| Monetary | [What is counted: total amount of X / engagement score] |

#### Assessment Scale

| Metric | Score 5 | Score 4 | Score 3 | Score 2 | Score 1 |
|---------|:-------:|:-------:|:-------:|:-------:|:-------:|
| **Recency** | 0-[X] | [X]-[X] | [X]-[X] | [X]-[X] | >[X] |
| **Frequency** | >[X] | [X]-[X] | [X]-[X] | [X]-[X] | [X] |
| **Monetary** | >[X] | [X]-[X] | [X]-[X] | [X]-[X] | <[X] |

---

#### Customer Segments

| Segment | RFM Range | % Base | % Rev. | Count | Avg LTV | Priority |
|---------|:------------:|:------:|:---------:|:------:|:-------:|:---------:|
| Champions | R5, F4-5, M4-5 | X% | X% | [N] | $XXX | High |
| Loyal | R4-5, F3-5, M3-5 | X% | X% | [N] | $XXX | High |
| ... | ... | ... | ... | ... | ... | ... |

**Pareto Check:** Champions + Loyal = X% of base, X% of revenue → [Healthy / Anomalous]

---

#### Strategy and Personalization

| Segment | Goal | Action | Channel | Tone | Offer | KPI |
|---------|------|----------|-------|-----|-------------|-----|
| Champions | [Goal] | [Action] | [Channel] | [Tone] | [Offer] | [KPI] |
| At Risk | [Goal] | [Action] | [Channel] | [Tone] | [Offer] | [KPI] |

---

#### Migration Analysis

| Migration | Count | % of Segment | Signal | Action |
|----------|:------:|:----------:|:------:|----------|
| Champions → At Risk | [N] | X% | 🔴 | [What to do] |
| Potential → Loyal | [N] | X% | 🟢 | [What to do] |
| At Risk → Lost | [N] | X% | 🟡 | [What to do] |

**Recalculation Frequency:** [weekly / monthly / quarterly]

---

#### Recommendations
1. **Immediate:** [At Risk / Cannot Lose — what to do now]
2. **Medium-term:** [Potential Loyalists — how to activate]
3. **Long-term:** [Champions — loyalty program / advocacy]
4. **Recalculation:** every [N] days

---

#### Sources and Assumptions

| # | Fact / Assumption | Source | Date | Reliability |
|---|-------------------|----------|------|:-------------:|
| 1 | [Fact] | [Source] | [Date] | ✅ / ⚠️ / 🔮 |

Legend: ✅ Verified (real data) | ⚠️ Estimated (benchmark) | 🔮 Assumed (modeling)
```
