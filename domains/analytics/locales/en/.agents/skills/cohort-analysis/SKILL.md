---
name: cohort-analysis
description: Cohort analysis — retention, revenue per cohort, behavioral patterns by groups
---
# Cohort Analysis — Retention, revenue, and behavioral patterns by groups

## When to use
- When analyzing customer retention — to understand how retention changes over time.
- When evaluating the effectiveness of changes — to compare cohorts before and after the changes.
- When forecasting LTV — cohort data provides the most accurate estimate.
- When identifying onboarding problems — early churn in new cohorts.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Product / service | ✅ | What we are analyzing |
| Business model | ✅ | SaaS / E-commerce / Marketplace / App |
| Cohort tracking criteria | ✅ | By sign-up date / first purchase date / other |
| Cohort data | ⬚ | Actual retention / revenue data (if available) |
| Analysis period | ⬚ | For what period (default — 12 months) |
| Granularity | ⬚ | Weeks / months / quarters (default — months) |
| Cohort size | ⬚ | Number of users in each cohort |

> If required fields are not provided — **request** them from the user, do not generate assumptions.

> If there is no actual data — the skill forms a **methodological framework** with industry benchmarks that can be applied when data appears. Explicitly mark as "Framework (no actual data)".

## Data sources
1. **Product analytics** — data on sign-ups, activity, payments.
2. **Web search** — industry retention benchmarks (Mixpanel, Amplitude, Lenny Rachitsky).
3. **Industry reports** — average retention curves across verticals.
4. **CRM / Payment data** — data from the user, if provided.
5. **Public data** — retention cases of public companies (S-1 filings, earnings).

> When working with benchmarks — indicate the source, date, and degree of applicability.

### Connection with other skills
| Skill | What we take | When to call |
|------|-----------|----------------|
| `web-research` | Industry retention benchmarks, public cases | If there is no actual data or benchmarks are needed for comparison |
| `competitive-analysis` | Competitor retention benchmarks (if public) | For comparison with competitors (step 5) |
| `rfm-analysis` | RFM segments for cross-analysis with cohorts | If we need to understand which segments within cohorts retain better |
| `unit-economics` | CAC for calculating cohort payback | For step 6 (revenue per cohort → payback period) |
| `customer-journey-mapping` | Churn points to explain retention drops | If we need to explain why a specific cohort is losing users |

## Protocol

### Step 0 — Context gathering
1. Verify the availability of required data.
2. Determine the mode: **actual data** or **methodological framework**.
3. Fix the period and granularity.
4. Determine the activity metric: what we consider "active" (login, transaction, key action — "aha moment").
5. Fix exceptions: test accounts, bots, anomalies.

### Step 1 — Determining cohort criteria

| Parameter | Value | Justification |
|----------|----------|-------------|
| Primary criteria | sign-up date / first purchase / subscription | [Why this was chosen] |
| Cohort period | week / month / quarter | [Granularity justification] |
| Activity metric | [login / transaction / key action] | [What reflects value to the user] |
| Observation period | [6 / 12 / 24 months] | [Depth justification] |
| Minimum cohort size | ≥ 30 (statistical significance) | Mark cohorts < 30 with ⚠️ |

### Step 2 — Retention Table (Retention Triangle)
1. Build a retention table by cohorts:
   - Rows: cohorts (by sign-up months).
   - Columns: life months (M0, M1, ... MN).
   - Values: percentage of active users relative to the initial cohort size.
   - M0 = 100% (by definition).
2. Highlight cells with color coding:
   - 🟢 ≥ industry benchmark
   - 🟡 within ±5pp from benchmark
   - 🔴 < benchmark by > 5pp

### Step 3 — Retention Curves
Visualize retention curves:
1. Overlay the curves of different cohorts for comparison.
2. Identify the characteristic shape:

   | Shape | Description | Interpretation |
   |-------|----------|---------------|
   | **Flattening (plateau)** | Decline → stabilization on a plateau | Healthy product, core of loyal users |
   | **Continuous decay** | Constant decline without plateau | Problem with value proposition or product-market fit |
   | **Smile curve** | Decline → growth | Reactivation works, but there is an early retention problem |
   | **Cliff** | Sharp drop at a specific month | Problem at a specific point (end of trial, first payment) |

3. Identify the stabilization point: the month when retention plateaus (Δ < 1pp between periods).

### Step 4 — Patterns and anomalies
1. Analyze cohorts for patterns:
   - **Plateau:** on which month retention stabilizes.
   - **Decay:** which cohorts lose users faster.
   - **Revival:** are there any seasonal or trigger-based returns.
   - **Improvement/deterioration:** new cohorts better or worse than old ones.
2. Tie anomalies to events:

   | Cohort | Anomaly | Event | Impact | Reliability |
   |---------|----------|---------|---------|:-------------:|
   | [Mar 2025] | M1 retention +8pp vs average | Launch of new onboarding | Positive | ✅ / ⚠️ / 🔮 |

### Step 5 — Cohort comparison
Compare cohorts across a minimum of 2 dimensions:

| Dimension | Group A | Retention MX | Group B | Retention MX | Δ | Significance |
|------|----------|:------------:|----------|:------------:|:-:|:----------:|
| By time | Early (Q1) | XX% M6 | Late (Q3) | XX% M6 | Xpp | Significant / No |
| By channel | Organic | XX% M6 | Paid | XX% M6 | Xpp | Significant / No |
| By segment | Pro-tier | XX% M6 | Free-tier | XX% M6 | Xpp | Significant / No |

**Significance evaluation of the difference:**
- Cohort size ≥ 30 and Δ ≥ 5pp → likely significant.
- Cohort size < 30 or Δ < 5pp → mark with ⚠️, refrain from strong conclusions.
- If there is access to data: χ²-test or z-test for proportions.

### Step 6 — Revenue per Cohort
1. Build a cumulative revenue table:

   | Cohort | Size | M0 | M1 | M3 | M6 | M12 | ARPU (M12) | CAC | Payback |
   |---------|:------:|:--:|:--:|:--:|:--:|:---:|:----------:|:---:|:-------:|
   | [Jan] | [N] | $XX | $XX | $XX | $XX | $XX | $XX | $XX | M[X] |

2. Calculate ARPU by cohorts (cumulative revenue / cohort size).
3. Identify payback period: the month when cumulative ARPU ≥ CAC.
4. Identify cohorts with the best/worst monetization.
5. Calculate projected LTV based on the retention curve:
   - `LTV = ARPU × Σ(retention_rate_month_i)` for i = 0..N
   - Or: `LTV = ARPU / churn_rate` (with stable churn on a plateau).

> If revenue data is unavailable — skip with the mark "Revenue per Cohort: data not provided. Recommended to add when available".

### Step 7 — Actionable Insights and Action Plan
1. Formulate 3-5 key findings (each with data).
2. For each finding — root cause (hypothesis) + specific action:

   | # | Finding | Data | Root cause | Action | Metric | Expected impact |
   |---|---------|--------|------------------|----------|---------|:----------------:|
   | 1 | [What was derived] | [Numbers] | [Why this is so] | [What to do] | [What to measure] | +Xpp retention |

3. Prioritize actions: P1 (fast impact, low effort) → P3 (slow impact, high effort).
4. Recommend recalculation frequency (typically monthly).

## Example — B2B SaaS Project Management Platform

**Context:** B2B SaaS, subscription model, 2000 new sign-ups/month. Criterion: sign-up date. Granularity: months. Metric: login ≥ 1 time per month.

### Retention Table

| Cohort | Size | M0 | M1 | M2 | M3 | M6 | M12 |
|---------|:------:|:---:|:---:|:---:|:---:|:---:|:----:|
| Jan | 1850 | 100% | 42% 🔴 | 31% | 26% | 20% | 16% |
| Feb | 2100 | 100% | 44% 🔴 | 33% | 28% | 22% | — |
| Mar | 2200 | 100% | 55% 🟢 | 44% | 38% | — | — |
| Apr | 1900 | 100% | 53% 🟢 | 42% | — | — | — |

**B2B SaaS Benchmark:** M1: 50%, M3: 35%, M6: 25%, M12: 18% — *Source: Lenny Rachitsky, 2025*

### Retention Curves
- **Shape:** Flattening — plateau begins around M4-M5.
- **Stabilization point:** M5 at ~20% (Jan-Feb cohorts), M5 at ~32% (Mar-Apr cohorts).
- **Cliff:** M0→M1 = loss of 45-58% — critical transition from trial to active usage.
- **Trend:** Improvement — Mar-Apr cohorts are +11pp better across M1.

### Anomalies
| Cohort | Anomaly | Event | Reliability |
|---------|----------|---------|:-------------:|
| Mar 2025 | M1 +11pp vs Jan-Feb | Launch of guided onboarding (March 1) | ✅ (A/B test) |

### Revenue per Cohort

| Cohort | ARPU (M6) | CAC | Payback | Projected LTV |
|---------|:---------:|:---:|:-------:|:-------------:|
| Jan | $89 | $120 | M8 | $210 |
| Mar | $124 | $115 | M5 | $320 |

### Key Findings & Action Plan

| # | Finding | Action | Priority | Metric | Impact |
|---|---------|----------|:---------:|---------|:------:|
| 1 | M0→M1 cliff: 45-58% loss | Expand guided onboarding (working since March, +11pp) | P1 | M1 retention | +10pp |
| 2 | Mar+ cohorts perform significantly better | Scale A/B winner to all channels | P1 | M1 retention | +5pp |
| 3 | Payback Jan = M8 vs Mar = M5 | Focus marketing on channels granting high retention | P2 | Payback period | -2 mo |

## Validation (Quality Gate)

- [ ] Cohort tracking criteria defined with justification
- [ ] Retention table built (or methodological framework with benchmarks)
- [ ] Cohorts of size < 30 mapped with a ⚠️, their insights formulated cautiously
- [ ] Retention curves described indicating shape (plateau / decay / smile / cliff)
- [ ] Stabilization point tracked (or its absence recognized)
- [ ] Anomalies directly tied to specific events with their reliability appraised
- [ ] Cohorts compared against at least 2 dimensions alongside significance evaluation
- [ ] Revenue per cohort evaluated (or stated as "data not provided")
- [ ] Actionable findings shaped correctly with sufficient data (minimum 3 matters)
- [ ] Action plan holds prioritized maneuvers pointing out metrics and expected impact
- [ ] If data behaves modeling-wise / features benchmark parameters — explicitly noted paired with source and date
- [ ] Origin data of benchmark items identified; references older than 12 mos marked with a ⚠️

> If validation is missed — follow up continuously until full approval, abstaining from shifting towards the next phase.

## Handoff
The resulting `$cohort-analysis` becomes an input requirement for:
- **Strategist / Mediator** — scaling strategies strictly relying on retention logic.
- **`unit-economics`** — cohort LTV coupled with robust payback period modeling.
- **`rfm-analysis`** — exploring the intersection spanning cohort metrics alongside RFM segmentation.
- **`customer-journey-mapping`** — addressing churn inflection landmarks (cliff, decay) targeted towards path enhancement.
- **`trend-analysis`** — discerning retention drift serving as a hallmark indicator addressing market deviations.

Output package scheme: retention table + retention curves (shape, plateau) + key findings + action plan. Ensure issuing `$handoff` continuously.

## Anti-patterns

| Error | Why it falls short | How to do it right |
|--------|-------------|---------------|
| Blended/average retention bypassing cohorts | Obscures structural flaws affecting fresh cohorts (Simpson's paradox) | Inherently breakdown data strictly reflecting cohorts |
| Raw cohort measurements lacking context | Stats offering zero clues towards "why" represent meaningless artifacts | Bind every anomaly closely reflecting actionable incidents |
| Analyzing exceedingly thin segments | Missing statistical value → faulty interpretations | Base cohorts spanning a sheer 30 items or mark sparse volumes using ⚠️ |
| Exclusively viewing tracking for Day 1 / Day 7 / Day 30 | Omission regarding mid-tier behavioral transitions/cliffs | Full-scale retention array deploying continuous measurement spans |
| Skipping an explicit actionable layout | Vain assessments, rendering nil material enterprise value | Distinct findings generating exclusive and prioritized responses invariably |
| Disregarding cross-reference scaling with revenue footprints | Displaying behaviors evading fiscal anchoring dilutes the aggregate projection value | Strictly trace gross revenue, explicit ARPU, paired tracking against cohort payback footprints |
| Static assessment frames | Cohort matrices morph continuously rendering snapshot tracking functionally expired quickly | Monthly calibration iterations tracking side-by-side progression deltas invariably |
| Side grading cohorts absent adequate variation confidence check | A 2pp swing possibly constitutes mere noise as opposed to clear signal | Set Δ ≥ 5pp integrated with sample ≥ 30 indicating substantiality; alternatively denote as ⚠️ |
| Inserting naked benchmarks devoid of authentic source trace | Denies external vetting whilst exhibiting skewed modeling parameters | Pair explicit sources alongside respective publishing dates validating immediate alignment regarding contextual business frameworks |

## Output Template

```
### Cohort Analysis — [Product / Service]

**Business model:** [model]
**Cohort tracking criteria:** [criteria]
**Activity metric:** [what counts as "active"]
**Granularity:** [weeks / months]
**Observation period:** [N months]
**Data type:** Actual / Framework (benchmark: [source])
**Date of analysis:** [date]

---

#### Retention Table (Retention Triangle)

| Cohort | Size | M0 | M1 | M2 | M3 | M6 | M12 |
|---------|:------:|:---:|:---:|:---:|:---:|:---:|:----:|
| [Jan] | [N] | 100% | [X]% | [X]% | [X]% | [X]% | [X]% |
| [Feb] | [N] | 100% | [X]% | [X]% | [X]% | [X]% | — |

Markings: 🟢 ≥ benchmark | 🟡 ±5pp | 🔴 < benchmark by >5pp

**Benchmark [industry]:**
- M1: [X]% | M3: [X]% | M6: [X]% | M12: [X]% — *Source: [source], [date]*

---

#### Retention Curves

| Characteristic | Value |
|---------------|----------|
| **Curve shape** | [Plateau / Decay / Smile / Cliff] |
| **Stabilization point** | Month [X] at [X]% (Δ < 1pp) |
| **Critical drop (cliff)** | M[X]→M[X]: loss of [X]pp |
| **Trend across cohorts** | Improvement / Stability / Deterioration |

---

#### Patterns and anomalies

| Cohort | Anomaly | Event | Impact | Reliability |
|---------|----------|---------|---------|:-------------:|
| [cohort] | [description + Δ] | [event / reason] | [pos. / neg.] | ✅ / ⚠️ / 🔮 |

---

#### Cohort comparison

| Dimension | Group A | Ret. MX | Group B | Ret. MX | Δ | Significance |
|------|----------|:-------:|----------|:-------:|:-:|:----------:|
| [By time] | [cohort] | [X]% | [cohort] | [X]% | [X]pp | Yes / ⚠️ |
| [By channel] | [channel] | [X]% | [channel] | [X]% | [X]pp | Yes / ⚠️ |

---

#### Revenue per Cohort

| Cohort | Size | Cum. Rev. M6 | Cum. Rev. M12 | ARPU (M12) | CAC | Payback | Proj. LTV |
|---------|:------:|:------------:|:-------------:|:----------:|:---:|:-------:|:---------:|
| [Jan] | [N] | $XX | $XX | $XX | $XX | M[X] | $XX |

LTV formula: [ARPU × Σ retention / ARPU ÷ churn_rate]

---

#### Key Findings

| # | Finding | Data | Root cause (hypothesis) | Reliability |
|---|---------|--------|----------------------------|:-------------:|
| 1 | [What was derived] | [Numbers, Δ, cohorts] | [Why this is so] | ✅ / ⚠️ / 🔮 |
| 2 | [What was derived] | [Numbers, Δ, cohorts] | [Why this is so] | ✅ / ⚠️ / 🔮 |
| 3 | [What was derived] | [Numbers, Δ, cohorts] | [Why this is so] | ✅ / ⚠️ / 🔮 |

---

#### Action Plan

| Priority | Action | Target metric | Expected impact | Deadline |
|:---------:|----------|-----------------|:----------------:|------|
| P1 | [action] | [metric] | +Xpp retention | [deadline] |
| P2 | [action] | [metric] | +Xpp retention | [deadline] |
| P3 | [action] | [metric] | +Xpp retention | [deadline] |

**Recommended recalculation frequency:** monthly

---

#### Data sources and assumptions

| # | Fact / assumption | Source | Date | Reliability |
|---|-------------------|----------|------|:-------------:|
| 1 | [Fact] | [Source] | [Date] | ✅ / ⚠️ / 🔮 |

Legend: ✅ Verified (2+ sources / A/B test) | ⚠️ Estimated (1 source / correlation) | 🔮 Assumed (expert hypothesis)
```
