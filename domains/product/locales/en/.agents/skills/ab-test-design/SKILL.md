---
name: ab-test-design
description: A/B test design — primary metric, MDE, sample size, duration, guardrails, critical region
---
# A/B Test Design

> **Category:** Experimentation  ·  **Slug:** `ab-test-design`

## When to Use

- For hypothesis validation with a quantitative signal.
- When rolling out high-risk changes (pricing, onboarding, core flow).
- For comparing alternatives when evidence is unclear.
- When measuring feature impact for PRD success criteria.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Hypothesis | ✅ | Via `$hypothesis-template` |
| Primary metric | ✅ | What we are measuring |
| Baseline metric value | ✅ | Current mean + variance |
| Expected effect size | ✅ | MDE — minimum detectable effect |
| Traffic / eligible users | ✅ | Weekly eligible sample |
| Infrastructure | ✅ | Feature flag / experimentation platform |

## Data Sources

1. Historical metric data — baseline + variance.
2. `$hypothesis-template` — expected direction + magnitude.
3. User analytics — eligible population.
4. Industry benchmarks — typical effect sizes.

### Related Skills

| Skill | What we take | When to call |
|-------|-------------|--------------|
| `hypothesis-template` | What we're testing | Prerequisite |
| `saas-metrics` | Primary + guardrail metrics | For selection |
| `aarrr-metrics` | Funnel context | For understanding |
| `assumption-mapping` | High-risk assumption → A/B | For top assumptions |

## Protocol

### Step 0 — Is A/B Appropriate?

Checklist:
- Enough traffic (≥ 1000 users / week per variant)?
- Metric instrumentable + detectable in timeframe?
- Change isolatable (not confounded with other rollouts)?
- Can ethically A/B (not critical safety / compliance)?

If not — alternatives: phased rollout with cohort comparison, before/after, qualitative testing.

### Step 1 — Primary Metric

Single primary metric. Not multiple ("Impact on activation AND retention").

Typical:
- **Activation:** 7-day activation rate
- **Retention:** W/W active, churn
- **Conversion:** signup → paid, trial → active
- **Engagement:** actions per session, DAU/MAU

Properties:
- **Detectable** in reasonable sample size
- **Aligned** with hypothesis outcome
- **Sensitive** — moves when the expected change happens
- **Trustworthy** — not easily gamed

### Step 2 — Minimum Detectable Effect (MDE)

MDE — smallest lift worth detecting. Trade-off:
- Smaller MDE = need more sample = longer test
- Larger MDE = faster test, but miss smaller wins

Rules of thumb:
- Activation metrics: MDE 3-5% (pp)
- Conversion metrics: MDE 5-10% (pp) relative lift
- Retention metrics: MDE 2-4% (pp)

In B2B: smaller samples → MDE often 5-10% minimum.

### Step 3 — Sample Size Calculation

Formula for proportion tests:
```
n per variant = (Z_α/2 + Z_β)² × 2 × p(1-p) / MDE²
```

Where:
- Z_α/2 = 1.96 (95% confidence)
- Z_β = 0.84 (80% power)
- p = baseline rate
- MDE = minimum detectable effect

For continuous metrics — similar formula with variance.

**Use calculator:** online tools (Evan Miller, Optimizely calc) — do not handle the math yourself.

### Step 4 — Duration

Duration = sample_size × variants / weekly_eligible_users.

Multiply:
- By 1.5-2× for week-over-week cyclicality (weekdays vs weekends)
- For B2B: minimum 2 weeks (full week cycle)
- Maximum: 6-8 weeks (beyond that — context changes, seasonality)

### Step 5 — Randomization

- **Unit:** user or account-level (B2B: account-level typically, to avoid split-brain within a team)
- **Seed:** random but deterministic (same user gets same variant on re-visit)
- **Allocation:** 50/50 default, can be 80/20 (control heavy) for risky changes

### Step 6 — Guardrail Metrics

Metrics that must not degrade:
- Churn rate
- NPS / CSAT
- Support ticket volume
- p95 latency / error rate
- Revenue / user

Set thresholds (e.g., "churn cannot increase >1pp").

### Step 7 — Segment Analysis Plan

Pre-registered (not p-hacking after):
- By company size
- By tenure (new vs established)
- By role
- By geography (if relevant)

Document in the test plan, not after results.

### Step 8 — Statistical Method

- **Frequentist** (most common): p-value < 0.05, 80% power
- **Bayesian:** posterior probability of improvement > 95%

Pick one. Document.

### Step 9 — Critical Region / Stopping Rules

When to stop the test:
- **Success** — significance reached, stop
- **Failure (futility):** minimal effect after N% samples, stop
- **Guardrail breach:** even if primary wins, stop
- **Time limit:** maximum duration reached

**NEVER peek early** and stop based on p-value (inflates false positive rate) without sequential testing design.

### Step 10 — Pre-registered Analysis Plan

Document BEFORE running the test:
- Primary metric + MDE + sample size
- Segments
- Guardrails
- Stopping criteria
- Interpretation rules

Forces avoiding HARKing (Hypothesizing After Results Known).

## Validation (Quality Gate)

- [ ] A/B appropriate (traffic, isolation, ethics)
- [ ] Primary metric single + well-defined
- [ ] MDE rationale (business + detectable)
- [ ] Sample size calculated
- [ ] Duration ≥ 2 weeks, ≤ 8 weeks
- [ ] Randomization unit appropriate (user / account)
- [ ] Guardrail metrics with thresholds
- [ ] Segment analysis pre-registered
- [ ] Statistical method picked + justified
- [ ] Stopping rules explicit
- [ ] Pre-registered analysis plan

## Handoff

The result is the input for:
- **Engineering** → feature flag + instrumentation
- **Data Analyst** → monitoring dashboard
- **PM** → launch criteria
- **Stakeholders** → weekly reports

Format: A/B test design doc (markdown). Via `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|-------------------|
| Multiple primary metrics | p-value inflation | Single primary |
| Peeking + early stop | False positive | Sequential or set duration |
| No MDE rationale | Under-powered or over-long | Business + detectable justification |
| Ignore guardrails | Feature "wins" while breaking | Explicit guardrails with kill criteria |
| No pre-registration | HARKing, p-hacking | Plan before running |
| Short duration | Weekly cycle noise | Min 2 weeks |
| User-level in B2B flow | Same account, different variants | Account-level randomization |

## Template

```markdown
# A/B Test: [Name]

## Hypothesis
[via $hypothesis-template]

## Primary Metric
- Metric: [e.g. 7-day activation rate]
- Baseline: X% (last 30 days)
- MDE: +5pp (rationale: business need + sample support)

## Sample & Duration
- Eligible users / week: Y
- Sample per variant: Z
- Calculated duration: N weeks
- Planned duration: N weeks (accounting for cyclicality)

## Variants
- Control: current flow
- Treatment: [change]
- Allocation: 50/50
- Randomization: account-level, deterministic

## Guardrails
| Metric | Current | Threshold |
| Churn rate | 2% | < 2.5% |
| NPS | 45 | ≥ 43 |
| p95 latency | 180ms | < 200ms |

## Pre-registered Analysis
- Segments: company size, user role
- Statistical method: frequentist, α=0.05, power=0.8
- Ship criteria: primary +MDE significant, no guardrail breach

## Stopping Rules
- Success: significance reached + guardrails ok → ship
- Failure: effect < MDE with 50%+ sample → kill
- Guardrail: any guardrail breached → stop, investigate
- Max duration: 8 weeks
```

## Worked Example — TeamFlow Onboarding A/B Test (Post-MVP Iteration)

**Context:** AI Summarization MVP shipped. 30 days later, H-003 (adoption) hypothesis tracking 42% adoption — below 60% target. Data Analyst designs an A/B test of onboarding checklist vs control for iteration.

```markdown
# A/B Test Design: Onboarding Checklist for New AI Tier Managers

**Experiment ID:** EXP-025
**Status:** Approved, launch July 8, 2026
**Owner:** Sam P. (Data) + Alex K. (PM) + Jordan M. (Design)
**Hypothesis:** H-003 iteration 1

## Hypothesis (re-stated for test)

**We believe** providing an onboarding checklist ("Complete 3 steps to master AI summaries") 
**For** managers newly activated in AI-tier accounts
**Will result in** higher 30-day weekly adoption rate
**We'll know it's true when** treatment group 30-day adoption rate is ≥5pp higher than control
**Because** 
  - Discovery surprise: 60% of low-adopters cited "didn't know where to start" in post-launch survey
  - Onboarding checklists in TeamFlow existing features show +22% activation lift (internal benchmark)
  - 7-day first-activation window predicts long-term retention (our cohort analysis Q1)

## Primary Metric

- **Metric:** 30-day weekly adoption rate (% of newly-activated managers who used AI summary ≥1 per week in weeks 2-4 post-activation)
- **Baseline:** 42% (current, measured last 30 days of AI tier rollout)
- **MDE:** +5pp (target: 47% treatment vs 42% control)
- **MDE Rationale:**
  - Business threshold: +5pp × ~200 new managers/month = 10 more managers retained/month = $2.4K MRR
  - Detectable with reasonable sample (see sample size calc)
  - Below 5pp not material for PM-level decision

## Sample Size Calculation

Using formula for proportion test:
- Baseline p1 = 0.42
- Treatment p2 = 0.47 (target)
- α = 0.05 (two-sided)
- Power = 0.80
- Z_α/2 = 1.96, Z_β = 0.84

n per variant = 2 × (1.96 + 0.84)² × [0.42(0.58) + 0.47(0.53)] / (0.05)² 
             ≈ 2 × 7.84 × 0.493 / 0.0025
             ≈ 3092

**Sample per variant: ~3100**
**Total sample: 6200**

## Duration

- Weekly eligible managers (newly-activating in AI tier): ~200/week
- Duration: 6200 / 200 = **31 weeks**

**Problem:** 31 weeks is unreasonably long. Options:
1. **Raise MDE to 7pp** (target 49%) — Duration drops to ~16 weeks
2. **Increase allocation to 80/20** — more weight on treatment, but no speed benefit
3. **Accept extended runway** with weekly monitoring for early signal

**Decision:** Raise MDE to 7pp (target 49%). Business-justified — 7pp × 200 managers = 14 managers/month saved, material.

**Revised duration: 16 weeks.** Plus cyclicality buffer: 18 weeks total.

## Variants

- **Control (50%):** Current experience — manager activates tier, sees default TeamFlow onboarding, no checklist
- **Treatment (50%):** Same + sticky onboarding checklist:
  - Step 1: Enable AI for first 1:1 (button)
  - Step 2: Review generated summary + approve
  - Step 3: Check extracted action items before next 1:1

Checklist persists in manager's dashboard until all 3 steps completed or manually dismissed.

## Randomization

- **Unit:** Account-level (not user-level — same account gets same variant across all managers)
  - Rationale: B2B consistency — HR admin shouldn't see different onboarding per team
- **Seed:** SHA256 of account_id — deterministic, re-assignable
- **Allocation:** 50/50
- **Eligibility:** Accounts activating AI tier from July 8 onward (test start date)

## Guardrail Metrics

| Metric | Baseline | Threshold | Monitoring |
|--------|:--------:|:---------:|:----------:|
| Gross churn rate (AI tier accounts) | 3% / 90 days | ≤ 4% | Weekly |
| NPS (in AI tier) | 50 | ≥ 47 | Bi-weekly survey |
| Support tickets "onboarding confusion" | <2% of total | <3% | Daily check |
| Manager NPS on AI feature | 52 | ≥ 48 | Monthly in-product survey |

**If any guardrail breaches:** pause experiment, investigate, potentially kill.

## Segment Analysis (Pre-registered)

Expected differential lift:
- **Company size:** Expect SMB highest lift (more novice managers) > mid-market > enterprise (already have training programs)
- **Manager experience:** Expect new managers (<2 years) highest lift
- **Industry:** Tech companies first-movers — expect highest baseline + moderate lift

Analysis will be reported **both** overall AND per-segment. No cherry-picking segments post-hoc.

## Statistical Method

- **Frequentist, Z-test for proportions** (standard for adoption rate A/B)
- α = 0.05 two-sided
- Power = 0.80
- No peeking before planned duration (18 weeks)
- Segmented analysis — multiple comparisons correction (Bonferroni): α / 3 segments = 0.017

## Critical Region / Stopping Rules

### Success (Go — ship to all)
- Primary metric: treatment lift ≥ 7pp, significant at α=0.05
- No guardrail breach
- ≥ 16 weeks duration completed

### Failure (Stop — kill variant)
- Primary metric: absolute difference < 3pp after 50% sample reached
- OR guardrail breach

### Extended observation (continue)
- Primary metric: 3-7pp observed, not significant → continue to planned duration

### Early positive signal (not stopping)
- Primary metric: 8pp+ observed at 25% sample, significant
- Action: DO NOT stop early — continue, watch for heterogeneity

## Pre-Registered Analysis Plan

Posted on internal wiki before experiment start:

1. Primary metric: 30-day weekly adoption rate, Z-test, α=0.05
2. Guardrail checks: weekly automated alerts
3. Segment analysis: by company size, manager experience, industry (Bonferroni-corrected)
4. Interpretation rules: pre-committed above
5. Reporting: Weekly tracking dashboard, formal report at weeks 8, 16, 18

## Implementation Plan

### Pre-launch
- [ ] Feature flag configured (account-level, deterministic)
- [ ] Treatment variant built + QA'd
- [ ] Instrumentation: event `onboarding_checklist_step_completed`, `onboarding_checklist_dismissed`
- [ ] Analytics dashboard live (auto-updating weekly)
- [ ] Control variant verified unchanged from production

### During
- **Weekly review** (Monday 10am): check sample accrual, guardrails, no interim analysis peeking
- **Bi-weekly survey:** 20 random managers from each variant — qualitative signal
- **Incident response:** if guardrail breach — pause within 24 hours

### Post (if success)
- Full rollout — remove feature flag
- Checklist becomes part of standard onboarding
- Document decision rationale for future iteration

### Post (if failure)
- Variant killed
- Qualitative analysis of why — interviews with managers who did / didn't complete checklist
- Design next experiment (e.g., different onboarding approach)

## Open Questions

1. Do we expose variant to existing non-activated managers in AI-tier accounts? (**Decision:** No, only new activations from July 8 — cleaner baseline)
2. What about managers in accounts that activate DURING experiment but ALL variant differ? (**Decision:** Follow account assignment — if account is treatment, all new managers see checklist)
3. Bonferroni vs alternative multiple-comparisons correction? (**Decision:** Bonferroni — conservative, easier to explain)
```

> **A/B design lesson:** Sample size calculation revealed MDE had to be **raised**, no shortcuts. **18 weeks** is a real commitment — not a fake "2-week" test that reads noise. **Account-level** randomization is critical in B2B — user-level would have one team split across variants = invalid. **Pre-registered analysis plan** on internal wiki prevents HARKing (Hypothesizing After Results Known). **Guardrails with numeric thresholds** — without them, "churn increased a bit but feature won" rationalizations happen. This test is honest science — takes months, tests one thing cleanly.
