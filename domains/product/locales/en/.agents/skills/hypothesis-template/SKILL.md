---
name: hypothesis-template
description: Testable hypothesis — We believe / Will result in / We'll know when [metric] reaches [threshold]
---
# Hypothesis Template

> **Category:** Experimentation  ·  **Slug:** `hypothesis-template`

## When to Use

- Before every experiment (A/B test, rollout, prototype test).
- During assumption validation — convert assumption into testable hypothesis.
- For pre-mortem decisions — «if we do X, what do we expect?».
- As part of PRD success criteria.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Proposed change / feature | ✅ | What we're testing |
| Underlying assumption | ✅ | Why we think it will work |
| Outcome metric | ✅ | What to measure |
| Baseline data | ✅ | Current metric level |

## Data Sources

1. `$assumption-mapping` — which assumptions to test.
2. `$saas-metrics` + `$aarrr-metrics` — for outcome metric selection.
3. Historical data — baseline.
4. Industry benchmarks — expected effect sizes.

### Related Skills

| Skill | What we take | When to invoke |
|-------|-------------|----------------|
| `assumption-mapping` | Top-risky assumptions → hypotheses | Before hypothesis |
| `ab-test-design` | Testing method | After hypothesis |
| `saas-metrics` | Outcome metrics | For measurement |
| `north-star-metric` | Primary metric alignment | For NSM-related tests |

## Format (Canonical)

> **We believe** [proposed change / hypothesis]  
> **For** [target user / segment]  
> **Will result in** [expected outcome]  
> **We'll know it's true when** [metric] **reaches** [threshold] **within** [timeframe]  
> **Because** [underlying rationale]

Example:
> **We believe** adding an in-app onboarding checklist  
> **For** new users (trial signups, first 7 days)  
> **Will result in** higher activation rate  
> **We'll know it's true when** 7-day activation rate reaches **45%** (from baseline **32%**) **within** 6 weeks of rollout  
> **Because** 12/15 interviews showed confusion about first steps, and competitor data suggests checklist approach drives +40% activation in the category.

## Protocol

### Step 1 — Hypothesis Formulation

**We believe:** specific change (feature, copy, flow)
**For:** specific user segment (not «all users»)
**Will result in:** directional outcome + metric

Rules:
- Specific change, not vague («improve UX»)
- Specific user, not «users»
- Specific outcome, not «better engagement»

### Step 2 — Outcome Metric Selection

Primary metric must be:
- **Measurable:** instrumented or instrumentable
- **Leading or lagging:** know which
- **Aligned:** ties to NSM / OKR
- **Anti-game:** not easily gameable

Common outcome metrics per hypothesis type:
- **Onboarding/Activation hypothesis:** 7-day activation rate, time-to-first-value
- **Retention hypothesis:** W/W retention, churn rate, usage frequency
- **Monetization hypothesis:** conversion rate, ARPA, upsell rate
- **Engagement hypothesis:** DAU/MAU, session duration, actions per session

### Step 3 — Baseline + Threshold

**Baseline:** current level (based on recent data window).

**Threshold:** what signals «hypothesis validated»? Two approaches:

1. **Absolute:** «45% activation» (defined absolute number)
2. **Relative:** «+20% activation» or «+5pp»

Rationale for threshold:
- Based on business need (what lift makes it worth shipping)
- Based on detectable effect (what sample size supports)
- Based on industry benchmarks

### Step 4 — Timeframe

- Too short = noise
- Too long = slow learning cycle
- B2B SaaS typical: 4-8 weeks for activation, 8-12 for retention

Justify: why this duration?

### Step 5 — «Because» — Rationale

Underlying evidence:
- User research (quotes, interviews)
- Historical data (past similar changes)
- Industry benchmarks
- Competitor behavior

Without «because» — guessing. With evidence — informed bet.

### Step 6 — Null Hypothesis (Explicit)

What if hypothesis fails? What would it mean:
- Assumption does not hold
- Need new hypothesis
- Feature does not ship, resources go elsewhere

Prepare to kill idea if data says so.

### Step 7 — Guardrail Metrics

What **should not** degrade even if primary metric improves:
- Churn rate (must not increase)
- NPS
- Support ticket volume
- Performance metrics
- Revenue per user (if engagement growth comes at ARPA cost)

If guardrail breaks — despite primary win — treat as failure.

### Step 8 — Confidence Level

Bayesian informal:
- **High confidence** (80%+): Strong evidence, similar successful launches, clear mechanism
- **Medium** (50-80%): Moderate evidence, novel mechanism
- **Low** (<50%): Exploratory, assumption-heavy

Adjusts experimentation investment (bigger tests for lower confidence).

### Step 9 — Segment Analysis Plan

Specify segments for post-test analysis:
- By company size (SMB / mid / enterprise)
- By user role (buyer / end-user / admin)
- By plan tier
- By tenure (new / established)

Overall lift + per-segment breakdown.

## Validation (Quality Gate)

- [ ] All 5 components (believe / for / result / know / because) completed
- [ ] Specific change + specific user segment
- [ ] Outcome metric measurable + instrumented
- [ ] Baseline data supplied (recent window)
- [ ] Threshold justified (business + detectable)
- [ ] Timeframe rationale
- [ ] Rationale cites ≥ 2 evidence sources
- [ ] Null hypothesis consequences are explicit
- [ ] Guardrail metrics listed
- [ ] Confidence level stated
- [ ] Segment analysis plan

## Handoff

The output is the input for:
- **`ab-test-design`** — testing method
- **Data Analyst** — instrumentation
- **PM** → PRD Success Criteria section
- **Engineering** → feature flag setup

Format: hypothesis card (markdown). Via `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|---------------------|
| Vague change | Not testable | Specific implementation |
| «All users» | Dilutes signal | Specific segment |
| No baseline | Can't detect change | Baseline data first |
| No threshold | «It will improve» | Numeric threshold + rationale |
| No rationale | Guessing | ≥ 2 evidence sources |
| No guardrails | Invisible damage | Explicit guardrails |
| Ignored null | Never kill losing ideas | Prepare kill conditions |

## Template

```markdown
# Hypothesis: [Short Name]

**We believe** [change]
**For** [segment]
**Will result in** [outcome]
**We'll know it's true when** [metric] reaches [threshold] within [timeframe]
**Because** [rationale, ≥2 evidence sources]

## Baseline
- Current [metric]: X
- Data window: [last 30 days, etc.]
- Confidence: Medium

## Threshold
- Target: X → Y
- Rationale: [business need + detectable + benchmark]

## Guardrails
- Churn < [threshold]
- NPS ≥ [threshold]
- Support tickets < [threshold]

## Segments for analysis
- Company size
- User role

## Null Hypothesis Consequences
If metric does not reach Y:
- Assumption X does not hold
- Ship? Likely no — data says no fit
```

## Worked Example — TeamFlow Hypothesis Cards (4 cards for AI Summarization launch)

**Context:** Pre-MVP launch, data analyst forms hypothesis cards for each high-risk assumption from the assumption-map. Each card will be validated through a specific experiment.

### Hypothesis Card H-001: AI Summary Willingness to Pay (V1 assumption)

```markdown
# Hypothesis: H-001 — Willingness to Pay for AI Tier

**We believe** adding AI Summarization as Team Tier feature (+$8/seat/month premium)
**For** TeamFlow customer base (200 existing Core accounts) + new trial signups with manager workflows
**Will result in** 40 account upgrades to AI Team Tier within first quarter post-launch
**We'll know it's true when** AI Team Tier adoption reaches **20%** of 200 existing customer base
  (baseline: 0% (tier not existing pre-launch); target = 40 of 200 customer accounts upgrade)
  **within** 90 days post-launch
**Because** 
  (1) 7 of 10 customer conversations in landing page test confirmed «we'd pay $10/seat for AI summaries»
  (2) Competitor ChatGPT Teams priced at $25/user shows price ceiling exists (we're well-below)
  (3) Post-Discovery survey: 34% of customers expressed interest in AI summarization, suggesting 20% conversion realistic conservative target

## Baseline
- Current AI Tier adoption: 0 accounts (tier not existing pre-launch)
- Historic Core → Team Tier upgrade rate: 12% / year (industry normal)
- Data window: Q4 2025 + Q1 2026 (6 months) — for baseline churn / NPS
- Confidence: Medium-High (validated in 2 customer research methods)

## Threshold
- Target: **20% conversion** of 200-customer base in 90 days = 40 accounts
- Rationale: 
  - Business need: OKR KR1.1 «40 accounts upgraded»
  - Upper bound: 34% expressed interest (Discovery survey) → 20% conversion assumes 60% interest-to-upgrade rate
  - Benchmark: Successful B2B SaaS premium-tier launches hit 15-25% in first 90 days when feature matches customer need

## Guardrails
- Churn rate < 9% (from baseline 8%) — if pricing triggers churn
- NPS ≥ 43 (from baseline 45) — if tier disruption causes dissatisfaction  
- Support tickets «pricing / tier confusion» < 5% of all tickets
- Core-tier churn must not accelerate (+0.5pp max)

## Segments for analysis
- Company size (SMB / mid-market / enterprise) — expect enterprise > mid > SMB
- Tenure (<6 mo / 6-24 mo / 24+ mo) — expect established > newer
- Current usage intensity (top quartile WAM / median / bottom) — expect heavy users → upgrade

## Null Hypothesis Consequences
If conversion does not reach 8%:
- **Below 3%:** Pricing wrong OR feature value weak. Trigger: re-evaluate pricing; consider unbundling
- **3-5%:** Signal mixed. Investigate by-segment: likely enterprise adopting but mid-market price-sensitive
- **5-8%:** Near-miss — extend observation 30 days, adjust GTM messaging, re-evaluate

## Tied Experiments
- Exp EXP-012: A/B test pricing page messaging (value-focus vs savings-focus)
- Exp EXP-015: A/B test in-product upsell timing (day 7 vs day 14 vs day 30 of tier eligibility)

## Confidence Level: Medium-High (75%)
## Expected P-value if true: <0.05 in 90-day window
```

---

### Hypothesis Card H-002: LLM Quality Acceptability (F1 assumption)

```markdown
# Hypothesis: H-002 — LLM Quality Acceptable for HR Use Case

**We believe** GPT-4 level LLMs (primary OpenAI GPT-4-Turbo, fallback Anthropic Claude 3.5)
**For** 30-minute 1:1 performance conversations in English
**Will generate summaries** acceptable to managers >85% of the time
  (Acceptable = manager approves without major edits (< 50% content changed))
**We'll know it's true when** in Wizard-of-Oz test:
  - Blind quality rating from managers: ≥ 4.0 out of 5.0 average (across N ≥ 100 meetings)
  - Hallucination rate: < 5% of summaries contain factually wrong info
  - Misattribution rate: < 3% of action items assigned to wrong person
  **within** 4 weeks of Wizard-of-Oz testing
**Because**
  (1) Recent LLM benchmarks on summarization (Anthropic HELM, OpenAI evals) show 87-92% acceptance
  (2) Our manual QA on 30 sample prompts achieved 90% acceptable rate
  (3) Adjacent use cases (Fireflies.ai, Gong) report >80% customer satisfaction — lower bar but similar

## Baseline
- Internal QA prompt testing: 90% acceptable (N=30 manual tests)
- No external baseline for HR conversation specifically
- Confidence: Medium (limited HR-specific data)

## Threshold
- Target: **≥85% acceptable rate** in Wizard-of-Oz
- Rationale:
  - Below 85% → user trust collapses, feature becomes liability
  - 85-90% = production-ready
  - >90% = exceeds expectations

## Guardrails
- P95 generation latency ≤ 60s (user experience constraint)
- Cost per summary ≤ $0.10 (viability — FP5 assumption)
- Zero data leakage to LLM provider (verified via provider audit)
- Zero training on customer data (contractual + technical enforcement)

## Segments for analysis
- Meeting duration (short 5-15 / standard 15-45 / long 45-120 min) — expect medium best
- Conversation type (planning / feedback / difficult convo / catch-up) — expect varying
- Industry of customer (tech / services / manufacturing) — expect tech highest
- Language mix (pure English / some non-English) — exclude non-English for MVP

## Null Hypothesis Consequences
If acceptance < 85%:
- **<70%:** Kill feature. LLM not ready for HR use case, wait 6-12 months.
- **70-80%:** Ship with mandatory human-review layer (feature flag). Reduces value prop but launches.
- **80-85%:** Extensive prompt engineering + iteration before launch. Delay 2-4 weeks.

## Tied Experiments
- **Exp EXP-020: Wizard-of-Oz test** — 20 beta managers, 100+ meetings total, blind quality rating
- Exp EXP-021: Prompt engineering iteration (A/B different prompts, measure acceptance)

## Confidence Level: Medium (60%)
## Investment at risk: $200K engineering + 10 weeks delay if invalidated
```

---

### Hypothesis Card H-003: Manager Adoption Rate (V2 assumption)

```markdown
# Hypothesis: H-003 — Manager Adoption Rate Post-Launch

**We believe** managers in AI-tier upgraded accounts
**Will** adopt AI summarization at **≥60% weekly usage rate** within 90 days of account upgrade
  (Adoption = ≥1 AI-summarized 1:1 per week)
**Because**
  (1) Discovery: 6 of 8 managers expressed direct desire for this feature
  (2) Removes 3-4 hrs/week admin burden — very high individual incentive
  (3) Onboarding checklist design will guide first-use in <7 days

## Baseline
- N/A (feature not existing). Comparable: existing Team Tier feature adoption avg 55% weekly usage in 90 days.
- Confidence: Medium

## Threshold
- Target: **60% weekly adoption** by Day 90
- Stretch: 75%
- Rationale:
  - Below 50% — feature isn't sticky; churn risk
  - 50-60% — acceptable but needs improvement
  - 60-75% — healthy
  - 75%+ — category-defining

## Guardrails
- Reverse adoption (abandonment) < 10% — users who tried and stopped
- NPS stable or improving
- Action items completion rate lifts in adopters (bonus signal)

## Segments for analysis
- Team size of manager (small 3-5 / medium 6-10 / large 11+ reports) — expect medium/large highest
- Manager tenure in role (<2 yrs / 2-5 / 5+) — expect newer managers highest (novelty helps)
- Industry / role (tech / non-tech) — expect tech highest
- Time of month (reviews season vs normal) — should be stable

## Null Hypothesis Consequences
If adoption < 60%:
- **<40%:** Feature fail — re-evaluate design, consider major rework
- **40-50%:** Needs iteration, likely onboarding flow issues
- **50-60%:** Near-miss, iterate onboarding + reminders

## Tied Experiments
- Exp EXP-025: A/B test onboarding checklist presence (with vs without)
- Exp EXP-026: A/B test first-meeting reminder timing
- Ongoing: cohort analysis by activation month

## Confidence: Medium (65%)
```

---

### Hypothesis Card H-004: Enterprise Tier Dashboard Upgrade Driver (V3 assumption)

```markdown
# Hypothesis: H-004 — Aggregate Dashboard Drives Enterprise Tier Upgrades

**We believe** showing VP HR / CPO buyers aggregate dashboard (cadence + health score + benchmarks)
**Will** drive **5 Enterprise tier upgrades** (to $50+/seat tier) within Q2
**Because**
  (1) 4 of 4 buyer interviews explicitly asked for dashboard visibility
  (2) 8 of 10 enterprise prospects in Q1 asked «do you have 1:1 analytics?» — current blocker
  (3) Existing mid-market → enterprise conversion rate 0% (no offering); we're creating demand

## Baseline
- Current Enterprise tier conversions from mid-market: 0/quarter (no dashboard feature)
- Current Enterprise tier = legacy pricing, 10 accounts grandfathered
- Confidence: Medium (strong buyer signal, but new motion)

## Threshold
- Target: **5 Enterprise tier upgrades** by June 30
- Stretch: 10
- Rationale:
  - 5 = OKR KR2.1 commitment
  - Based on 80 eligible mid-market accounts × 6% conversion (conservative) = 5

## Guardrails
- No cannibalization of existing Enterprise tier accounts (shouldn't churn down)
- Enterprise deal size not diluted (avg ACV maintained)
- Sales team does not spend disproportionate time (time-per-deal monitored)

## Segments for analysis
- Account size (100-299 / 300-499 / 500+ employees) — expect 300+ highest conversion
- Current spend tier (Team vs Enterprise legacy) — Team with >50 seats most likely
- Industry (regulated / non-regulated) — regulated lower (compliance review barriers)

## Null Hypothesis Consequences
If upgrades < 5:
- **0-2:** Dashboard insufficient value for tier premium. Re-evaluate feature scope or pricing.
- **3-4:** Near-miss — extend timeline 30 days, refine sales motion
- **5+:** Success, expand roadmap for Enterprise tier features

## Tied Experiments
- Exp EXP-030: 3 design partner concierge sessions (qualitative + conversion intent)
- Exp EXP-031: Sales team pitch variations A/B (data-first pitch vs ROI-first pitch)

## Confidence: Medium (60%)
```

---

### Hypothesis Card Portfolio Overview

| ID | Hypothesis | Confidence | Validation Method | Status | Ship Dependency |
|----|-----------|:----------:|-------------------|:------:|-----------------|
| H-001 | WTP $8/seat premium | 75% | Landing page + customer conversations | ⏳ Pre-launch | Ship price tier |
| H-002 | LLM quality ≥85% | 60% | Wizard-of-Oz N=100+ | ⏳ Week 3-6 | Ship AI feature |
| H-003 | 60% weekly adoption | 65% | Post-launch cohort analysis | 🔜 Post-launch | Iterate onboarding |
| H-004 | 5 Enterprise upgrades | 60% | Design partner sessions + sales A/B | ⏳ Pre-launch | Dashboard MVP |

### Decision Tree Based on Results

```
H-002 (LLM quality)
  ├── >85% acceptable → GREEN LIGHT for MVP launch
  ├── 70-85% → Ship with human-review layer, iterate prompts
  └── <70% → Delay 2-3 months, wait for LLM improvement

H-001 (WTP)
  ├── >8% conversion → Validated, scale GTM
  ├── 5-8% → Near miss, iterate pricing / messaging  
  └── <5% → Pricing wrong, re-price or unbundle
```

> **Hypothesis lesson:** 4 hypothesis cards cover **different types of risk**: value (H-001, H-004), feasibility (H-002), usability (H-003). Each with its own validation method (landing page, Wizard-of-Oz, cohort analysis, design partner). The **null hypothesis consequences** section — which is often skipped — makes it actionable: «if <X, do Y». Without this, hypothesis cards = wishful thinking. Each card links back to the assumption-map risk score, closing the discovery-to-validation loop.
