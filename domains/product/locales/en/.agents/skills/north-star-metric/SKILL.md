---
name: north-star-metric
description: Selecting the NSM for B2B SaaS — balancing leading/lagging, alignment with customer value and business outcome
---
# North Star Metric (NSM)

> **Category:** Strategy  ·  **Slug:** `north-star-metric`

## When to Use

- When defining product strategy — a single metric of focus.
- When aligning the team: decision-making through the lens of "does this lift the NSM?".
- For board / investor reporting — single metric story.
- When reviewing an existing metric — still meaningful?

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Product vision | ✅ | The north star must reflect the vision |
| Business model | ✅ | Subscription / usage / hybrid |
| Current metric stack | ✅ | MRR, DAU, retention, etc. |
| Customer value definition | ✅ | What we consider value for the customer |
| Adversarial camp (Full A) | ⬚ | alpha (Customer-first) / beta (Business-first) |

## Data Sources

1. Current product analytics (Amplitude, Mixpanel, custom).
2. Customer interviews → what "valuable" means.
3. Business metrics — NRR, churn.
4. Industry benchmarks (SaaS Capital, OpenView reports).

### Related Skills

| Skill | What we take | When to invoke |
|-------|-------------|----------------|
| `product-vision` | Vision → NSM alignment | Before choosing NSM |
| `aarrr-metrics` | Framework for decomposition | For input metrics |
| `saas-metrics` | Business metric layer | For lagging alignment |
| `okr-framework` | OKR KRs → often tied to NSM | After NSM |

## Criteria for a Good NSM

1. **Reflects customer value** — when NSM grows, customers receive value.
2. **Leading indicator of revenue** — moves before MRR.
3. **Actionable** — the team can influence it.
4. **Singular** — not composite, not aggregate.
5. **Measurable** — numerically trackable.
6. **Resistant to gaming** — hard to inflate without real value.

## Protocol

### Step 0 — Role Framing (Full A)

- **Customer-Champion (alpha):** emphasis on user-value metric
- **Business-Champion (beta):** emphasis on business-value metric

### Step 1 — Business Model Analysis

- **Subscription SaaS:** NSM often related to weekly/monthly active teams, usage depth
- **Usage-based:** raw consumption (API calls, workloads)
- **Transaction-based:** successful transactions
- **Platform:** marketplace size × match rate

### Step 2 — Generate Candidates

Minimum 5 candidates. Each — through the formula:

**[Action verb]** × **[Unit with value]** × **[Frequency/Cadence]** × **[Quality]**

B2B SaaS examples:
- "Weekly Active Teams with ≥5 seats" (team platform)
- "Monthly reports generated per paying account" (analytics tool)
- "Weekly successful deployments per engineering team" (DevOps tool)
- "Onboarded workspaces completing setup within 7 days" (product-led growth)

### Step 3 — Evaluation

| Metric | Customer Value | Leads Revenue | Actionable | Singular | Measurable | Anti-game | Total |
|--------|:--------------:|:-------------:|:----------:|:--------:|:----------:|:---------:|:-----:|
| [cand] | 5 | 4 | 4 | 5 | 5 | 3 | 26 |

Rank. Top candidate = NSM. Second → guardrail or input metric.

### Step 4 — Decomposition (Metric Tree)

NSM → input metrics → leading indicators.

```
NSM: Weekly Active Teams ≥5 seats
  ├── Input: New teams activating weekly
  │     ├── Signup → activation rate
  │     └── Time-to-5-seats (onboarding speed)
  ├── Input: Existing teams retaining
  │     ├── W/W retention rate
  │     └── Seats-per-team growth
  └── Guardrails:
        ├── Churn rate (capped)
        ├── NPS (no drop)
        └── Support ticket volume (no spike)
```

### Step 5 — Guardrails

What **MUST NOT break** in the pursuit of NSM:
- Churn rate
- NPS / CSAT
- Gross margin
- Support ticket volume
- p95 latency / error rate

Each guardrail = numeric threshold.

### Step 6 — Baseline + Target

- Current value
- 90-day target
- 1-year aspirational

### Step 7 — Anti-Gaming Review

Team brainstorm: "How would we game the NSM?". If it's easy — enhance the definition or change the metric.

Example: "Weekly Active Teams" can be gamed by counting churned teams that were active for the last time → clarification: "with activity in last 7 days".

## Validation (Quality Gate)

- [ ] Minimum 5 candidates reviewed
- [ ] Evaluation across 6 criteria
- [ ] Metric tree decomposition (NSM → inputs)
- [ ] Guardrails with numeric thresholds
- [ ] Baseline + target
- [ ] Anti-gaming review conducted
- [ ] Business model alignment verified
- [ ] Vision alignment verified

## Handoff

The result is input for:
- **`okr-framework`** — NSM = basis for several KRs
- **`aarrr-metrics`** — NSM fits into AARRR as the key stage
- **Data Analyst** — instrumentation requirements
- **Mediator** (Full A) — alpha and beta NSM for synthesis

Format: NSM doc (one-pager) with metric tree. Via `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|-------------------|
| Revenue as NSM | Lagging, not actionable | Use leading value metric |
| Vanity metric | Looks good, doesn't predict | Customer value + revenue proxy |
| Composite metric | Weighted sum is not singular | Pick ONE |
| No guardrails | Accept churn growing with NSM | Explicit guardrails |
| Change every quarter | Team can't align | Stable for ≥ year |
| Copy other company | Context-specific | Your business model |

## Template

```markdown
# North Star Metric: [Name]

## Definition
**[Action]** × **[Unit]** × **[Frequency]** × **[Quality]**
Precise: [exact definition with inclusion/exclusion rules]

## Rationale
[Why this metric — customer value + business]

## Metric Tree
NSM
├── Input: ...
├── Input: ...
└── Guardrails:
    ├── ...

## Baseline & Targets
- Current: X
- 90-day target: Y
- 1-year aspirational: Z

## Anti-Gaming
[How could this be gamed? Mitigation]

## Review
- Quarterly: still meaningful?
- Annually: re-evaluate
```

## Worked Example — TeamFlow NSM Selection (post-Mediator synthesis)

**Context:** After Mediator synthesis of visions, the team chooses a unified NSM. Alpha proposed "weekly 1:1s with AI summaries used"; Beta — "ARR from accounts with ≥3 seats on AI tier". Below — full candidate evaluation.

### Business Model Analysis

- **Revenue model:** Subscription, tiered (Core / Team / Enterprise)
- **Growth lever:** Seat expansion (mid-market, enterprise) + tier upgrade
- **Primary value delivery:** Per-1:1 workflow savings + per-manager adoption

### 5 Candidate NSMs

| # | Candidate | Formula | Leading/Lagging | Ties to vision? |
|---|-----------|---------|:---------------:|:---------------:|
| C1 | Weekly Active Managers using AI summarization (≥ 1 per week) | count(WAM_ai) | Leading | Alpha ✓ |
| C2 | ARR from AI-tier accounts | $ ARR tagged «AI tier» | Lagging | Beta ✓ |
| C3 | «Sticky Manager Ratio» — managers running ≥ 4 AI-assisted 1:1s per month | ratio | Leading + quality signal | Alpha ✓ |
| C4 | «AI-assisted 1:1s completed per week» (total count across base) | count | Leading, usage-based | Alpha ✓ |
| C5 | Net New AI Tier ARR / Quarter | $ | Lagging | Beta ✓ |

### Evaluation Matrix (6 criteria × 5 candidates, scale 1-5)

| Metric | Customer Value | Leads Revenue | Actionable | Singular | Measurable | Anti-Game | **Total** |
|--------|:--------------:|:-------------:|:----------:|:--------:|:----------:|:---------:|:---------:|
| C1 WAM_ai | 4 | 4 | 5 | 5 | 5 | 3 | **26** |
| C2 ARR AI tier | 2 | 2 (= it IS revenue) | 3 | 5 | 5 | 4 | 21 |
| C3 Sticky Manager Ratio | 5 | 4 | 5 | 5 | 5 | 4 | **28** |
| C4 AI 1:1s/week | 4 | 4 | 4 | 5 | 5 | 2 (easy to bulk) | 24 |
| C5 Net New AI ARR | 2 | 2 (= it IS revenue) | 2 | 5 | 5 | 4 | 20 |

**Winner: C3 «Sticky Manager Ratio»** — balances customer value signal (quality — 4+ 1:1s/month implies real habit) + anti-gaming (can't be bulk-created; requires genuine usage) + clear leading indicator for ARR.

### Chosen NSM — Definition

```markdown
# North Star Metric: Sticky Manager Ratio (AI Tier)

## Definition
**Active managers** × **Using AI summarization** × **≥ 4 times per month** × **on ≥ 1 direct report**

**Precise:**
- **Active manager:** has ≥ 1 direct report in TeamFlow + logged in in last 30 days
- **Using AI summarization:** completed 1:1 with AI summary generated AND reviewed (not just generated but ignored)
- **≥ 4 per month:** rolling 30-day window
- **Exclusions:** internal TeamFlow employees; accounts <30 days old (onboarding); trial accounts

**Formula:**
```
Sticky Manager Ratio = Managers meeting criteria / Total active managers in AI-tier accounts
```

## Rationale

**Why this metric:**

- **Customer value signal:** 4 uses/month ≈ weekly 1:1s = genuine habit, not experimentation. Habit = product embedded in workflow → high retention.
- **Leading revenue:** Sticky managers → account retention → expansion → NRR. Historical TeamFlow data: features used ≥ 4×/month have 3× LTV.
- **Actionable:** Team can drive (onboarding, reminders, feature quality).
- **Singular:** One number, clear dashboard.
- **Resistant to gaming:** can't «bulk» real usage. Can be inflated via trial seats, so trial accounts excluded.

**Why not alternatives:**
- C1 WAM_ai: doesn't distinguish casual from habitual usage
- C2 ARR tier: lagging, doesn't predict expansion before it happens
- C4 1:1s/week: easily gamed («create 20 fake 1:1s»)
- C5 Net new ARR: same lagging issue

## Metric Tree

```
NSM: Sticky Manager Ratio (AI Tier)
  ├── Input: AI Tier account count (expansion)
  │     ├── New AI Tier conversions per week
  │     └── AI Tier churn
  ├── Input: Active manager activation rate (% new managers reaching ≥ 4 1:1s)
  │     ├── Time to first AI summary
  │     └── Onboarding checklist completion
  ├── Input: Feature quality signal
  │     ├── Summary approval rate (kept vs edited >50%)
  │     └── Summary NPS (in-product rating)
  └── Guardrails:
        ├── Overall NPS (must not drop > 5 points)
        ├── Gross churn rate (must not grow >1pp QoQ)
        ├── Support ticket volume / AI issues (monitor for abuse / dissatisfaction)
        └── p95 summary generation latency (< 30 sec)
```

## Baseline & Targets

| Horizon | Target | Rationale |
|---------|:------:|-----------|
| Current (Q1 2026) | 0% (feature not live) | Pre-launch |
| 90 days post-launch (end Q2) | **20%** | Conservative — based on similar AI feature launches in adjacent B2B |
| End of 2026 | 45% | Category-leading level |
| End of 2027 (aspirational) | 65% | «Cannot imagine working without it» level |

## Anti-Gaming Analysis

**How could this be gamed?**

- **Bulk fake 1:1 creation:** Mitigation — require AI summary generated AND reviewed (visible edit or approval event)
- **Single massive account inflating ratio:** Mitigation — weight by account size + report separately
- **Managers «maintaining streak» with perfunctory 1:1s:** Mitigation — 1:1 duration floor (must be ≥ 10 min scheduled)
- **Team inflating by marking non-actual 1:1s:** Mitigation — periodic sample audit with customer success conversations

## Review
- **Weekly:** ratio tracked in exec dashboard
- **Quarterly:** anti-gaming sample audit (3 accounts reviewed manually)
- **Annually:** NSM re-evaluated against strategy shift
```

> **NSM lesson:** Alpha's initial «WAM_ai» was good but too blunt — didn't distinguish trial adoption from habit. Beta's «ARR AI tier» was too lagging. Synthesis («Sticky Manager Ratio») borrowed Alpha's user-centric formulation but applied Beta's rigor about quality threshold (4+ per month = real habit). Result is a metric that **leads** revenue, **measures** customer value, and **resists** easy gaming. This is the kind of refinement that's hard to get on first try — the evaluation matrix forced the conversation.
