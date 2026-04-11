---
name: cohort-analysis
description: Cohort analysis — retention, revenue per cohort, behavioral patterns by group
---
# Cohort Analysis — Retention, Revenue, and Behavioral Patterns by Group

## When to Use
- When analyzing customer retention — understanding how retention changes over time.
- When evaluating the effectiveness of changes — comparing cohorts before and after changes.
- When forecasting LTV — cohort data provides the most accurate estimate.
- When identifying onboarding issues — early churn in new cohorts.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Product / service | ✅ | What is being analyzed |
| Business model | ✅ | SaaS / E-commerce / Marketplace / App |
| Cohort criterion | ✅ | By registration date / first purchase / other |
| Cohort data | ⬚ | Actual retention / revenue data (if available) |
| Analysis period | ⬚ | Time range (default — 12 months) |
| Granularity | ⬚ | Weeks / months / quarters (default — months) |
| Cohort sizes | ⬚ | Number of users in each cohort |

> If no actual data is available — the skill produces a **methodological framework** with industry benchmarks that can be applied when data becomes available.

## Data Sources
1. **Product analytics** — data on registrations, activity, payments.
2. **Web search** — industry retention benchmarks (Mixpanel, Amplitude, Lenny Rachitsky).
3. **Industry reports** — average retention curves by vertical.
4. **CRM / Payment data** — data from the user, if provided.
5. **Public data** — retention case studies from public companies (S-1 filings, earnings).

> When working with benchmarks — cite the source and degree of applicability.

## Protocol

### Step 0 — Context Collection
Verify required data availability. Determine whether working with actual data or creating a methodological framework. Set the period and granularity.

### Step 1 — Define Cohort Criteria
- **Primary criterion:** registration date / first purchase / subscription date.
- **Cohort period:** week / month / quarter.
- **Activity metric:** what counts as "active" (login, transaction, key action).
- **Observation period:** depth of analysis (6 / 12 / 24 months).
- Exclusions: test accounts, bots, anomalies.

### Step 2 — Retention Table (Retention Triangle)
Build a retention table by cohort:
- Rows: cohorts (by registration month).
- Columns: lifecycle months (Month 0, Month 1, ... Month N).
- Values: percentage of active users relative to initial cohort size.
- Month 0 = 100% (by definition).

### Step 3 — Retention Curves
Visualize retention curves:
- Overlay curves of different cohorts for comparison.
- Determine the characteristic shape:
  - **Flattening curve** — reaching a plateau (healthy product).
  - **Continuous decay** — constant decline (retention problem).
  - **Smile curve** — decline, then growth (reactivation).
- Identify the stabilization point (if any).

### Step 4 — Patterns and Anomalies
Analyze cohorts for patterns:
- **Plateau:** at which month retention stabilizes.
- **Decay:** which cohorts lose users faster.
- **Revival:** are there seasonal or trigger-based returns.
- **Improvement/deterioration:** are newer cohorts better or worse than older ones.
- Link anomalies to events (feature launch, pricing change, marketing campaign).

### Step 5 — Cohort Comparison
Compare cohorts across key dimensions:
- By time: early vs late (is the product improving).
- By acquisition channel: if data allows.
- By segment: different pricing tiers, geographies, devices.
- Determine which factors correlate with better retention.

### Step 6 — Revenue per Cohort
If revenue data is available:
- Build a cumulative revenue per cohort table.
- Calculate ARPU by cohort.
- Determine when a cohort "pays back" CAC.
- Identify cohorts with the highest and lowest revenue.

### Step 7 — Actionable Insights and Action Plan
Based on the analysis, produce:
- Key findings (3-5 main conclusions).
- Root causes (hypotheses about why retention is at its current level).
- Specific actions to improve retention.
- Metrics for tracking impact.
- Recommendations for recalculation frequency.

## Validation (Quality Gate)

- [ ] Cohort criterion is defined with justification
- [ ] Retention table is built (or methodological framework with benchmarks)
- [ ] Retention curves are described with shape identification (plateau/decay/smile)
- [ ] Patterns and anomalies are identified and linked to events
- [ ] Cohort comparison is conducted along at least one dimension
- [ ] Actionable insights are formulated (minimum 3)
- [ ] Action plan contains specific actions with metrics
- [ ] If data is modeled — this is explicitly stated

> If validation fails — rework until passing, do not hand off further.

## Handoff
The `$cohort-analysis` result serves as input for:
- **Strategist / Mediator** — retention as the foundation for a growth strategy.
- `$unit-economics` — cohort LTV for precise calculation.
- `$rfm-analysis` — intersection of cohort data with RFM segments.
- `$customer-journey-mapping` — churn points for journey optimization.
- `$trend-analysis` — retention trends as an indicator of market changes.

On handoff — use `$handoff` with key findings and retention curves.

## Anti-patterns

| Mistake | Why It's Bad | How to Do It Right |
|---------|-------------|-------------------|
| Average retention without cohorts | Masks problems in new cohorts | Always break down by cohort |
| Cohorts without context | Numbers without explaining "why" | Link anomalies to events |
| Cohorts that are too small | Statistical insignificance | Minimum 30-50 users per cohort |
| Only Day 1 / Day 7 / Day 30 | Missing intermediate patterns | Full retention table with every period |
| No action plan | Analysis for the sake of analysis | Each finding = a specific action |
| Ignoring revenue per cohort | Retention without a link to money | If data exists — calculate revenue per cohort |
| Static analysis | Cohorts need to be recalculated | Recommend monthly recalculation |

## Output Template

```
### Cohort Analysis — [Product / Service]

**Business model:** [model]
**Cohort criterion:** [criterion]
**Granularity:** [weeks / months]
**Observation period:** [N months]
**Data type:** Actual / Framework (benchmark: [source])
**Analysis date:** [date]

---

#### Retention Table (Retention Triangle)

| Cohort | Size | M0 | M1 | M2 | M3 | M4 | M5 | M6 | M12 |
|--------|------|-----|-----|-----|-----|-----|-----|-----|------|
| [Jan] | [N] | 100% | [X]% | [X]% | [X]% | [X]% | [X]% | [X]% | [X]% |
| [Feb] | [N] | 100% | [X]% | [X]% | [X]% | [X]% | [X]% | [X]% | — |
| [Mar] | [N] | 100% | [X]% | [X]% | [X]% | [X]% | [X]% | — | — |

**Industry benchmark:**
- Day 1: [X]% | Day 7: [X]% | Day 30: [X]% | Day 90: [X]% — *Source: [source]*

---

#### Retention Curves

| Characteristic | Value |
|---------------|-------|
| **Curve shape** | [Plateau / Decay / Smile] |
| **Stabilization point** | Month [X] at [X]% |
| **Critical drop** | Month [X]-[X] (loss of [X]%) |
| **Trend across cohorts** | Improving / Stable / Deteriorating |

---

#### Patterns and Anomalies

| Pattern | Cohorts | Description | Possible Cause |
|---------|---------|-------------|----------------|
| [Pattern 1] | [cohorts] | [description] | [cause / event] |
| [Pattern 2] | [cohorts] | [description] | [cause / event] |

---

#### Cohort Comparison

| Dimension | Best Cohort | Worst Cohort | Difference | Hypothesis |
|-----------|------------|--------------|------------|------------|
| [By time] | [cohort] @ [X]% M6 | [cohort] @ [X]% M6 | [X]pp | [cause] |
| [By channel] | [channel] @ [X]% M6 | [channel] @ [X]% M6 | [X]pp | [cause] |

---

#### Key Findings

1. **[Finding 1]:** [description + data]
2. **[Finding 2]:** [description + data]
3. **[Finding 3]:** [description + data]

---

#### Action Plan

| Priority | Action | Target Metric | Expected Impact | Timeline |
|----------|--------|---------------|-----------------|----------|
| P1 | [action] | [metric] | [+X% retention] | [timeline] |
| P2 | [action] | [metric] | [+X% retention] | [timeline] |
| P3 | [action] | [metric] | [+X% retention] | [timeline] |

**Recommended recalculation frequency:** monthly
```
