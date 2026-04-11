---
name: rfm-analysis
description: Customer segmentation by recency, frequency, and monetary value of purchases
---
# RFM Analysis — Customer Segmentation by Recency, Frequency, and Monetary Value

## When to Use
- When building a customer retention strategy — understand who to retain and who to reactivate.
- When optimizing the marketing budget — direct resources to the most valuable segments.
- When launching personalized campaigns — different messaging for different segments.
- When analyzing the customer base — identifying Champions, loyal, at-risk, and lost customers.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Business / product | ✅ | What we are analyzing |
| Business model | ✅ | E-commerce / SaaS / Marketplace / Service |
| Transaction data | ⬚ | Table: customer, date, amount (if real data available) |
| Analysis period | ⬚ | Time range (default — 12 months) |
| Customer count | ⬚ | Base size for scale calibration |
| Average order value | ⬚ | For modeling if no real data |
| Purchase frequency | ⬚ | Average frequency for modeling |

> If no real data is available — the skill works with **modeled data**, explicitly marked as hypothetical. The methodology remains applicable when real data becomes available.

## Data Sources
1. **Transaction data** — CRM, payment system, ERP (if provided).
2. **Web search** — industry benchmarks (average order value, purchase frequency, retention rate).
3. **Industry reports** — typical RFM distributions for this business type.
4. **Product analytics** — user activity data (for SaaS — logins, actions).
5. **User-provided data** — CRM exports, Google Analytics, payment provider data.

> When working with modeled data — indicate benchmark sources.

## Protocol

### Step 0 — Context Gathering
Verify required input data is present. Determine whether working with real or modeled data. Record the analysis period.

### Step 1 — Define Data Scope
- Define the unit of analysis: customer / account / subscriber.
- Define "transaction": purchase / subscription payment / significant action.
- Define the period: start and end dates.
- Exclude anomalies: test accounts, refunds, anomalous amounts.

### Step 2 — Recency Score (R)
Evaluate the recency of the last transaction for each customer:
- Calculate days since last transaction.
- Divide into quintiles (5 groups) or use business logic.
- R=5: recent activity (e.g., 0-30 days).
- R=1: long time since last transaction (e.g., >365 days).
- Thresholds depend on the business cycle (daily purchases vs annual contracts).

### Step 3 — Frequency Score (F)
Evaluate transaction frequency over the period:
- Count the number of transactions per customer.
- Divide into quintiles (5 groups).
- F=5: very frequent purchases.
- F=1: single or extremely rare purchase.
- Calibration: for SaaS — monthly payments; for e-commerce — orders.

### Step 4 — Monetary Score (M)
Evaluate total transaction volume over the period:
- Calculate total amount per customer.
- Divide into quintiles (5 groups).
- M=5: top spenders.
- M=1: minimal spending.
- Decide: total amount or average order value (depends on business model).

### Step 5 — Segmentation
Assign each customer an RFM code (three digits from 111 to 555) and group into named segments:
- **Champions** (R=5, F=5, M=5): best customers.
- **Loyal Customers** (R=4-5, F=3-5, M=3-5): regular and valuable.
- **Potential Loyalists** (R=4-5, F=1-3, M=1-3): new with potential.
- **Recent Customers** (R=5, F=1, M=1): just arrived.
- **Promising** (R=3-4, F=1-2, M=1-2): showing interest, need activation.
- **Need Attention** (R=3, F=3, M=3): average, at risk of leaving.
- **About to Sleep** (R=2-3, F=1-2, M=1-2): losing interest.
- **At Risk** (R=1-2, F=3-5, M=3-5): were active, leaving.
- **Cannot Lose** (R=1, F=5, M=5): VIPs who have left.
- **Hibernating** (R=1-2, F=1-2, M=1-2): long inactive.
- **Lost** (R=1, F=1, M=1): lost.

### Step 6 — Strategy by Segment
For each segment, define:
- Goal (retention, reactivation, upsell, onboarding).
- Key action (email, discount, personal offer, phone call).
- Budget priority (high / medium / low).
- KPI for effectiveness measurement.

### Step 7 — Personalization
For each segment, recommend:
- Communication tone.
- Offer type (discount, new feature, exclusive).
- Communication channel (email, push, SMS, phone call).
- Contact frequency.

## Validation (Quality Gate)

- [ ] All three metrics (R, F, M) defined with clear thresholds
- [ ] Quintile thresholds justified by business cycle
- [ ] At least 6 named segments identified
- [ ] Strategy and specific actions specified for each segment
- [ ] If data is modeled — explicitly stated
- [ ] Benchmark sources indicated for modeling
- [ ] Personalization recommendations tied to segments
- [ ] No logical contradictions in segmentation (RFM codes are correct)

> If validation fails — refine until it passes, do not hand off incomplete work.

## Handoff
The `$rfm-analysis` result is input for:
- **Strategist / Mediator** — customer segments for strategic decisions.
- `$unit-economics` — LTV by segment, retention rates.
- `$cohort-analysis` — grouping by cohorts within segments.
- `$customer-journey-mapping` — touchpoints at different stages for each segment.
- `$icp-buyer-persona` — enriching personas with behavioral data.

On handoff — use `$handoff` with the segment table and strategies.

## Anti-patterns

| Mistake | Why It's Bad | How to Do It Right |
|---------|-------------|-------------------|
| Same thresholds for all businesses | SaaS and e-commerce have different purchase cycles | Calibrate thresholds per business model |
| Modeled data without labeling | Decisions based on hypotheses, not facts | Explicitly label hypothetical data |
| Too many segments | Impossible to create a unique strategy for each | 6-11 named segments maximum |
| Segmentation without strategy | RFM for RFM's sake, no actionable conclusions | Each segment = specific action |
| Ignoring M for subscriptions | In SaaS, Monetary is less variable | Replace M with engagement score for SaaS |
| Static analysis | RFM changes every month | Recommend regular recalculation |
| Without personalization | Same message for Champions and At Risk | Different tone, channel, and offer per segment |

## Output Template

```
### RFM Analysis — [Business / Product]

**Business Model:** [model]
**Analysis Period:** [date — date]
**Data Type:** Real / Modeled (benchmark: [source])
**Analysis Date:** [date]

---

#### Scoring Scale

| Metric | Score 5 | Score 4 | Score 3 | Score 2 | Score 1 |
|--------|---------|---------|---------|---------|---------|
| **Recency** (days) | 0-[X] | [X]-[X] | [X]-[X] | [X]-[X] | >[X] |
| **Frequency** (transactions) | >[X] | [X]-[X] | [X]-[X] | [X]-[X] | [X] |
| **Monetary** ([currency]) | >[X] | [X]-[X] | [X]-[X] | [X]-[X] | <[X] |

---

#### Customer Segments

| Segment | RFM Codes | Description | % of Base | Strategy | Action | Priority |
|---------|-----------|-------------|-----------|----------|--------|----------|
| Champions | 555, 554, 545 | Best customers | [X]% | Retention + advocacy | [action] | High |
| Loyal | 444, 435, 534 | Regular, valuable | [X]% | Upsell + loyalty | [action] | High |
| Potential Loyalists | 513, 512, 412 | New with potential | [X]% | Onboarding + engagement | [action] | Medium |
| At Risk | 155, 254, 245 | Were active, leaving | [X]% | Reactivation | [action] | High |
| Lost | 111, 112, 121 | Lost | [X]% | Win-back or let go | [action] | Low |

---

#### Personalization by Segment

| Segment | Tone | Offer | Channel | Frequency | KPI |
|---------|------|-------|---------|-----------|-----|
| Champions | [tone] | [offer] | [channel] | [frequency] | [KPI] |
| Loyal | [tone] | [offer] | [channel] | [frequency] | [KPI] |
| At Risk | [tone] | [offer] | [channel] | [frequency] | [KPI] |

---

#### Recommendations
1. **Immediate actions:** [what to do with At Risk / Cannot Lose]
2. **Mid-term:** [strategy for Potential Loyalists]
3. **Long-term:** [loyalty program for Champions]
4. **Recalculation:** recommended to recalculate RFM every [N] days
```
