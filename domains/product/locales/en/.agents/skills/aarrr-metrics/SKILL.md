---
name: aarrr-metrics
description: Pirate metrics — Acquisition, Activation, Retention, Referral, Revenue — adapted for B2B
---
# AARRR Metrics (B2B adapted)

> **Category:** Metrics  ·  **Slug:** `aarrr-metrics`

## When to Use

- For funnel analysis and identifying drop-off points.
- For growth team priorities (which stage is weakest?).
- For onboarding optimization — Activation as the key stage.
- For product-led growth strategy.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Product analytics | ✅ | Event data, funnel |
| CRM data | ✅ | Accounts, stages |
| Usage data | ✅ | Daily/weekly activity |
| Revenue data | ✅ | Conversion, upgrades |

## Data Sources

1. Product analytics (Amplitude, Mixpanel).
2. CRM — lead → customer journey.
3. Marketing analytics — acquisition channels.
4. Finance — revenue per customer.

### Related Skills

| Skill | What we take | When to call |
|-------|-------------|--------------|
| `saas-metrics` | Revenue layer | For R (Revenue) stage |
| `north-star-metric` | NSM | Usually aligned with one stage |
| `hypothesis-template` | Per-stage tests | Per stage improvement |

## Five Stages

### A1 — Acquisition

How users find + arrive in the product.

**B2B metrics:**
- MQLs (marketing qualified leads)
- SQLs (sales qualified leads)
- Trial signups
- Demo requests
- Direct signups (PLG)
- By channel: organic, paid, referral, content, outbound

**Channel attribution** — multi-touch attribution is better than last-touch for B2B (long sales cycle).

### A2 — Activation

**First meaningful moment** the user gets value. B2B adapted — not just signup.

**Definition examples:**
- Team created + ≥3 members invited
- First integration connected
- First production deployment
- First report generated and shared
- First billing setup

**Activation rate** = activated users / acquired users.

**Time to activate** = signup → activation timeframe.

B2B-specific: activation often takes days/weeks (not minutes like B2C).

### R1 — Retention

Returning to get value.

**B2B retention metrics:**
- W/W active (teams, users, accounts)
- M/M active
- Activity depth (features used, actions/week)
- Account-level retention curves

**Leading indicator of churn** — if retention drops, churn follows.

### R2 — Referral

Users bringing others.

**B2B referral signals:**
- In-product invites sent
- Invite → acceptance rate
- External referrals (partnership, word-of-mouth)
- Account expansion (new seats added by existing admins)
- Case studies / logos (customer advocacy)

**K-factor** = new users per existing user (typically < 1 for B2B, but can be >1 for viral tools).

### R3 — Revenue

Monetization.

**B2B metrics:**
- Trial → paid conversion
- Freemium → paid conversion
- ARPA (Average Revenue Per Account)
- Expansion revenue (upsells, seat growth, tier upgrade)
- Revenue per activated user

## Protocol

### Step 0 — Map Funnel to Product

Define each stage for your product specifically. Same AARRR framework, different implementations.

### Step 1 — Instrumentation

Events per stage:
- A1: `signup`, `demo_requested`, `trial_started`
- A2: `activation_event_X` (define specific)
- R1: `active_week` (how defined: ≥1 login or core action?)
- R2: `invite_sent`, `referral_signup`
- R3: `trial_to_paid`, `upsell_event`

### Step 2 — Funnel Calculation

```
Acquisition →  Activation  →  Retention  →  Revenue
   100           35            27            20
              (35%          (77%            (74%
           conversion)    retention)       monetization)
   
Referral (parallel): 12% of actives send invites, 30% accept → 4% new from referrals
```

### Step 3 — Identify Weakest Stage

"One that's the weakest limits them all."

Calculate stage conversion rates, compare to industry benchmarks:
- SaaS typical acquisition → activation: 20-40%
- Typical activation → 30-day retention: 60-80%

Identify gap vs benchmark.

### Step 4 — Per-Segment AARRR

B2B SaaS has wildly different AARRR per segment:
- SMB: short funnel, higher activation rate, higher churn
- Enterprise: long sales cycle, slower activation, very low churn

Per-segment funnel gives the actual picture.

### Step 5 — Cohort View

AARRR by cohort (by signup month):
- Retention curves by cohort
- Activation rates by cohort
- Revenue per cohort

Spot trends (onboarding changes? marketing shift?).

### Step 6 — Stage-Specific Playbooks

**If Acquisition weak:**
- Channel mix review
- Message-market fit testing
- SEO / content
- Paid channel optimization

**If Activation weak:**
- Onboarding flow
- In-app guides
- First-value experience
- Personalized onboarding by role

**If Retention weak:**
- Feature adoption drives
- Re-engagement campaigns
- Customer health scoring
- Sticky feature development

**If Referral weak:**
- In-product invite flow
- Incentive programs
- NPS → advocacy pipeline

**If Revenue weak:**
- Pricing / packaging test
- Upsell paths
- Trial conversion optimization
- Expansion playbooks

### Step 7 — Continuous Reviews

Weekly: funnel metrics trends.
Monthly: cohort analysis, segment view.
Quarterly: stage-level deep dives, playbook updates.

## Validation (Quality Gate)

- [ ] All 5 stages defined for product
- [ ] Events instrumented per stage
- [ ] Funnel conversion rates computed
- [ ] Benchmark comparison
- [ ] Per-segment split
- [ ] Cohort view
- [ ] Weakest stage identified
- [ ] Stage-specific playbook

## Handoff

The result is the input for:
- **`saas-metrics`** — Revenue stage deep-dive
- **`north-star-metric`** — NSM tied to one AARRR stage
- **PM** → prioritize initiatives by weakest stage
- **Data Analyst** → instrumentation requirements

Format: AARRR funnel doc (numbers + charts). Via `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|-------------------|
| Activation = signup | Trivially high, meaningless | Define meaningful first value |
| B2C-style K-factor obsession | Unrealistic B2B | K < 1 typical, focus expansion |
| All focus on Acquisition | Leaky bucket | Fix retention first |
| No per-segment | Hides truth | Always segment |
| No cohorts | Survivorship bias | Cohort view always |
| Ignore downstream stages | Acquisition looks good, churn kills | Review end-to-end |

## Template

```markdown
# AARRR Funnel — Q2 2026

## Stage Definitions
- **Acquisition:** signup OR demo requested
- **Activation:** team ≥ 3 members + 1 integration connected
- **Retention:** active in any week N+1..N+4 after activation
- **Referral:** invite sent in-product
- **Revenue:** trial → paid conversion

## Funnel (last 30 days)
| Stage | Count | Conversion |
| Acquisition | 5,000 | — |
| Activation | 1,800 | 36% |
| Retention (30d) | 1,200 | 67% |
| Referral (invite) | 340 | 28% |
| Revenue (paid) | 420 | 35% |

## Per-Segment
| Segment | Acq | Activation | Retention | Revenue |
| SMB | 3,800 | 40% | 60% | 30% |
| Mid-market | 1,000 | 30% | 75% | 45% |
| Enterprise | 200 | 20% | 85% | 60% |

## Weakest Stage
Activation (36%) — below benchmark 50% for SMB.
Playbook: onboarding checklist test (see hypothesis H-027).

## Cohort Retention (Month 1, 3, 6)
[Chart]
```

## Worked Example — TeamFlow AARRR Funnel Q2 2026

```markdown
# AARRR Funnel — TeamFlow Q2 2026 (with AI Tier Launch Impact)

## Stage Definitions (B2B-adapted for TeamFlow)

- **Acquisition:** Company signs up for TeamFlow (trial, demo, or direct signup)
- **Activation:** Within 14 days of signup:
  - Account has ≥ 3 managers set up
  - ≥ 10 employee profiles imported
  - ≥ 1 team created with ≥ 1 1:1 scheduled
- **Retention:** Account has ≥ 1 active manager (any 1:1 in past 7 days) in any week post-activation
- **Referral:** In-product invite sent by existing manager to another manager in their org
- **Revenue:** Trial → paid conversion, OR existing tier → higher tier (e.g., Team → Enterprise)

---

## Full Funnel (Q2 2026, blended)

```
Acquisition (new accounts)      78 accounts
   │    61% of signups activate
   ▼
Activation (within 14 days)     48 accounts
   │    82% retain past 30 days
   ▼
Retention (30d active)          39 accounts
   │    64% make in-product invites
   ▼
Referral (invites sent)         25 accounts (avg 3 invites each = 75 new manager invites)
   │    35% of active accounts convert to paid
   ▼
Revenue (paid conversion)       17 new paid accounts
```

**Overall Acquisition → Paid conversion: 17 / 78 = 22%**

---

## Per-Segment Breakdown

| Segment | Acquisition | Activation | Activation Rate | Retention 30d | Retention Rate | Revenue Conv | Revenue Rate |
|---------|:-----------:|:----------:|:---------------:|:-------------:|:--------------:|:------------:|:------------:|
| **SMB (5-99 employees)** | 58 | 30 | 52% | 22 | 73% | 9 paid | 30% |
| **Mid-market (100-499)** | 16 | 14 | 88% | 14 | 100% | 6 paid | 43% |
| **Enterprise (500+)** | 4 | 4 | 100% | 3 | 75%* | 2 paid | 67% |

*Enterprise retention dropped due to 1 deal not closing — shown for transparency

**Observations:**
- **SMB activation gap:** 52% vs 88% mid-market — major drop-off
- **Mid-market retention excellent:** 100% retention past 30 days
- **Enterprise has highest revenue conversion** but smallest absolute numbers

---

## Stage-Level Deep Dive

### Acquisition (78 accounts)

| Channel | Acquisitions | % of total | Trend QoQ |
|---------|:-----------:|:----------:|:---------:|
| Inbound (organic web) | 34 | 44% | +12% |
| Paid (Google / LinkedIn) | 18 | 23% | −8% |
| Referral (existing customers) | 14 | 18% | +35% |
| Content (blog / webinars) | 8 | 10% | +5% |
| Outbound sales | 4 | 5% | Flat |

**Insight:** Referral grew 35% QoQ — biggest leading indicator of product-market fit.

### Activation (61% rate — below 70% benchmark)

**Funnel decomposition — why do 30 accounts fail activation?**

| Drop-off Reason | Count | % of drop-offs |
|-----------------|:-----:|:-------------:|
| Didn't finish manager setup (only 1-2 managers added) | 14 | 47% |
| Didn't import employees | 8 | 27% |
| Created team but no 1:1 scheduled | 6 | 20% |
| Opened product but <3 logins in 14 days | 2 | 7% |

**Playbook investment:**
- Onboarding checklist test (EXP-025) aims to drive activation rate to 70%+
- Integration auto-import from HRIS (Q3 roadmap) for employee import pain

### Retention (82% at 30 days, 71% at 90 days)

**Stickiness indicator:** Manager WAU/MAU
- **Q1 baseline:** 48% (daily active managers / monthly active managers)
- **Q2 current:** 52% (trending upward since AI tier launch)
- **Top-quartile benchmark:** 60%+

**Cohort retention curves:**
```
Cohort        Mo 1    Mo 3    Mo 6    Mo 12
Q1 2025       95%     78%     70%     63%
Q2 2025       96%     82%     75%     69%
Q3 2025       94%     80%     73%     (pending)
Q4 2025       97%     85%     (pending)  
Q1 2026       95%     (pending)
```

Improving trend — product gets stickier over time.

### Referral (64% of retained accounts sent invites)

**Referral K-factor:** 0.23 (new accounts from referrals / existing accounts × period)
- **Typical B2B SaaS:** K 0.1-0.3
- **Our position:** healthy

**Invite-to-signup rate:** 28% (invites sent → person signs up as manager)
- Mostly internal growth (adding more managers within existing customer)
- ~15% external (to another org entirely)

### Revenue (35% conversion)

**Trial → Paid conversion rate:** 35% overall

| Trigger | Accounts | % of conversions |
|---------|:--------:|:----------------:|
| Manual sales outreach | 6 | 35% |
| In-product trial expiry prompt | 5 | 29% |
| Tier upgrade from free tier | 4 | 24% |
| Self-serve at signup | 2 | 12% |

**Expansion revenue (existing → higher tier):**
- Core → Team tier: 11 accounts conversion (first full quarter of AI tier availability)
- Team → Enterprise: 2 accounts (OKR target was 5 for full Q2 — progress)

---

## Weakest Stage Analysis

**Weakest stage:** Activation — 61% overall vs 70% benchmark.

**Per-segment diagnosis:**
- Mid-market/enterprise: already at healthy 88-100% — no action needed
- **SMB: 52% activation is the ONE leak** — biggest absolute impact

**SMB Activation Playbook (Q3):**
1. **Onboarding checklist A/B test** (EXP-025) — expect +7pp lift
2. **HRIS auto-import integration** — remove employee import friction
3. **Templated 1:1 creation** — "you have teammates, let's schedule your first 1:1 now" prompt
4. **Sales-assisted onboarding** for SMB <10 managers accounts — call within 48 hours
5. **Content onboarding**: "Your first week with TeamFlow" email series

**Expected impact:** SMB activation 52% → 65% (+13pp) → ~6 more activated SMB accounts per quarter

---

## Growth Playbook Prioritization

Ranked by (impact × ease):

1. **Activation improvement (SMB)** — high impact, medium ease → **PRIMARY FOCUS**
2. **Retention improvement (SMB 73%)** — high impact, high ease (AI tier will boost) → **SECONDARY**
3. **Referral amplification** — medium impact, high ease (share prompts + incentives) → **TERTIARY**
4. **Acquisition channel optimization** (more paid, SEO) — medium impact, medium ease → **LATER**
5. **Revenue (trial → paid)** — low incremental impact already at 35%, hard → **MAINTAIN**

---

## Overall Business Health Signal

Funnel points to healthy growth trajectory with one clear bottleneck (SMB activation). AI tier launch mid-Q2 is already lifting retention but activation gap persists. Q3 focus should primarily be onboarding optimization — which also sets up AI tier adoption ceiling.
```

> **AARRR lesson:** B2B-adapted stages differ significantly from B2C. Activation ≠ signup — requires meaningful first-value event. Referral K-factor 0.23 is "healthy B2B" — would be disaster for B2C. **Per-segment analysis** crucial — blended activation 61% hides SMB 52% vs mid-market 88% radical difference. **Weakest stage ≠ lowest conversion** — it's **segment-specific bottleneck** where intervention has biggest impact. Stage playbook prioritized by impact × ease, not equal attention.
