---
name: product-vision
description: Product vision — for whom / why / what's unique / 2-3 year horizon / guiding principles
---
# Product Vision

> **Category:** Strategy  ·  **Slug:** `product-vision`

## When to Use

- At the start of a new product direction (new product line, pivot).
- When onboarding new teams — vision as a shared north star.
- When the team diverges on strategic decisions — no shared framework.
- For investor / exec communication — vision = story.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Discovery Brief (JTBD, problems) | ✅ | Customer-value foundation |
| Business context (ARR, segment, stage) | ✅ | Business-value foundation |
| Competitive landscape | ⬚ | Differentiation context |
| Horizon | ⬚ | 2-3 years is standard |
| Adversarial camp (Full A) | ⬚ | alpha (Customer) / beta (Business) |

## Data Sources

1. `$jtbd-canvas` — language for whom / what job.
2. Business metrics (ARR, NRR, churn) — for the Business-Champion lens.
3. Competitive analysis — moat identification.
4. Company mission / values — alignment.

### Related Skills

| Skill | What we take | When to invoke |
|-------|-------------|----------------|
| `jtbd-canvas` | Customer frame | For user-value formulation |
| `okr-framework` | Vision → quarterly goals | After vision |
| `north-star-metric` | Vision → measurable NSM | After vision |
| `product-roadmap` | Vision → themes | After NSM |

## Vision Formula (Geoffrey Moore)

```
For [target customer]
Who [statement of the need or opportunity]
Our [product name] is a [product category]
That [statement of key benefit — that is, compelling reason to buy]
Unlike [primary competitive alternative]
Our product [statement of primary differentiation]
```

## Protocol

### Step 0 — Role Determination (Full A)

If Full Pipeline A — determine the camp (Customer-Champion or Business-Champion). Different emphases:

**Customer-Champion:**
- For whom — specific end-user / buyer segment
- Why — user outcome, JTBD fulfillment
- Differentiator — user experience, value per usage

**Business-Champion:**
- For whom — segment with highest NRR / expansion potential
- Why — business outcome (ARR, moat, strategic asset)
- Differentiator — technical/market moat, scale economics

### Step 1 — Target Customer

Specific segment, not «B2B companies»:
- Firmographic (size, industry, geography)
- Psychographic (buying behavior, maturity)
- Primary role (buyer) + primary user (end-user)

### Step 2 — Need / Opportunity

One **primary** unmet job or problem (from Discovery). Not a list — ONE.

### Step 3 — Product Category

Which category we play in. If a new category — document what it includes.

### Step 4 — Key Benefit

Outcome-focused («get X done in Y time») or emotional («confident about Z»), not a feature list.

### Step 5 — Alternative

Honestly: what do customers currently use instead of our product? Including «do nothing» and self-built solutions.

### Step 6 — Differentiation

Why are we better for this customer in this job? Not «better at X» generally — a specific differentiator.

### Step 7 — Guiding Principles (3-5)

Points that guide decisions:
- «Ship small and often over perfect and late»
- «Optimize for end-user time-to-value, not feature count»
- «Enterprise-grade, SMB-simple»

### Step 8 — Vision Story

Final artifact: 1-3 paragraphs, reads as a story. Includes:
- Who's the hero (target customer)
- What's their pain
- How our product changes their life
- Where we'll be in 2-3 years

### Step 9 — Vision Test (FOCUS)

- **F**easible — can we implement it?
- **O**bsession-worthy — does it inspire the team?
- **C**larifying — does it help make trade-offs?
- **U**nique — different from competitors' copies?
- **S**pecific — not generic words?

## Validation (Quality Gate)

- [ ] Geoffrey Moore formula filled in
- [ ] Target customer — specific, not generic
- [ ] Need — one primary job, not a list
- [ ] Differentiation — specific, checkable
- [ ] 3-5 guiding principles
- [ ] Vision story ≤ 3 paragraphs
- [ ] Passes FOCUS test
- [ ] (Full A) — camp determined, emphases match

## Handoff

The result is input for:
- **`okr-framework`** — vision → quarterly Objectives
- **`north-star-metric`** — vision → measurable NSM
- **`product-roadmap`** — vision → themes
- **Mediator** (Full A) — alpha and beta vision for synthesis

Format: vision doc (~1 page) + Moore-formula + principles. Via `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|-------------------|
| Vision = feature roadmap | No differentiator, no story | Story: hero + pain + transform |
| Generic customer | «Teams» | Specific: «DevOps teams in mid-market SaaS» |
| Multiple «primary» needs | Distraction | ONE primary, rest secondary |
| Copy competitors | No moat | Specific differentiator |
| Feasible only in 10 years | Team disengages | 2-3 years horizon |
| No guiding principles | Team trade-offs by mood | 3-5 principles |

## Template

```markdown
# Product Vision

## Target Customer
[Specific segment]

## Need / Opportunity
[ONE primary unmet job / problem]

## Product Category
[Category we play in]

## Key Benefit
[Compelling outcome]

## Unlike (Alternative)
[Current alternatives + why we're different]

## Differentiation
[Specific, defensible]

## Guiding Principles
1. ...

## Vision Story (1-3 paragraphs)
...

## FOCUS Check
- Feasible: ✅
- Obsession-worthy: ✅
- Clarifying: ✅
- Unique: ✅
- Specific: ✅
```

## Worked Example — TeamFlow (Full Pipeline A: Customer-Champion vs Business-Champion)

**Context:** TeamFlow AI summarization initiative. Full Pipeline A (`/ship-right-thing`) — adversarial vision sessions. Alpha (STRAT-01α) and Beta (STRAT-02β) work **independently**, each receiving only the Discovery Brief. The Mediator synthesizes in session 4. Below — complete vision docs from both camps + Mediator output.

### Camp Alpha — Customer-Champion Vision (STRAT-01α)

```markdown
# Product Vision — AI 1:1 Summarization (Customer-Champion perspective)

## Target Customer
People managers (5-15 direct reports) in B2B SaaS / Tech companies 100-1000 employees.
Secondary: individual contributors, benefiting indirectly through better managers.

## Need / Opportunity
Every week managers lose 3-4 hours to admin overhead (prep + note-taking + follow-up).
This robs both time AND attention from actual conversation — when a manager types notes during
a 1:1, they don't listen deeply. End-user managers want TeamFlow to **handle the admin work
so they can focus on people**.

## Product Category
AI-assisted 1:1 workflow (new category — extends «performance management platform»).

## Key Benefit
**Reclaim 3 hours per week of deep work time + transform 1:1s from anxiety-inducing
admin task into confident, connected conversations.** Manager enters each 1:1
knowing context, leaves without homework, never loses an action item.

## Unlike (Alternatives)
- **Manual workflow (today):** 3-4 hrs/week lost, 40% action items dropped, anxiety
  + guilt from skipped prep.
- **Otter.ai + ChatGPT workaround:** privacy concern (confidential HR data in OpenAI
  consumer), disconnected from TeamFlow context.
- **Lattice / 15Five:** same gap — no native AI summarization. Manual templates only.

## Differentiation
**Privacy-first AI integrated in TeamFlow's 1:1 data model.** Summaries know previous
1:1s, action items, OKR context. Standalone transcription tools can't replicate
contextual awareness. Competitors may catch up on AI — but our end-user trust moat
(3+ years of HR data handling) is deeper.

## Guiding Principles
1. **End-user time is sacred.** Every feature must save minutes, not add them.
2. **Summaries supplement, not replace, human judgment.** Inline edit always available.
3. **Privacy by design.** Manager controls every toggle. No training on user data.
4. **Integrated always beats standalone.** Context > accuracy.
5. **Delight the manager, not surveil them.** Individual value, not management control.

## Vision Story
Imagine Marcus, an engineering manager with 8 reports. Monday morning: TeamFlow shows
him an AI-generated prep card for his 10am 1:1 with Sarah — last week's commitments
resurfaced, her recent Slack mood indicators flagged, suggested discussion prompts
from org patterns. During the conversation, Marcus is fully present — no typing.
When it ends, TeamFlow has a draft summary ready, action items extracted, ready for
Marcus's one-tap approval. By Friday, Marcus has spent 45 minutes on 1:1 admin
instead of 3.5 hours. He's a better manager because the tool does the work AI does best.

By 2028, TeamFlow has become the standard: if you're a manager and you're not using
AI-assisted 1:1s, you're considered behind — the way typing without autocomplete feels now.

## FOCUS Check
- **Feasible:** ✅ LLM APIs at required quality exist today
- **Obsession-worthy:** ✅ Managers personally want this, beyond business case
- **Clarifying:** ✅ "Does this save manager time?" — clear decision filter
- **Unique:** ✅ Native TeamFlow integration + privacy architecture
- **Specific:** ✅ Concrete segment, concrete time-save, concrete alternatives
```

---

### Camp Beta — Business-Champion Vision (STRAT-02β)

```markdown
# Product Vision — AI 1:1 Summarization (Business-Champion perspective)

## Target Customer
VP People / Chief People Officers at mid-market and enterprise B2B SaaS companies
($5M-$500M ARR, 100-1000 employees). Secondary: managers, as tool users.

## Need / Opportunity
Mid-market CPOs cannot **measure or drive** manager effectiveness at scale. They rely
on storytelling + anecdata when CFO asks «what's the ROI of $200K manager training?».
The gap: no data layer on 1:1 practice. **We unlock measurable People Ops** — turning
HR into a data-driven discipline on par with Sales and Engineering.

## Product Category
People Ops analytics platform (category expansion from «performance management
platform» to broader «people operations intelligence»).

## Key Benefit
**Make People Operations as measurable as Sales Operations.** Dashboard showing 1:1
cadence, action items velocity, team health indicators per-manager and org-wide —
the metrics CPOs have always wanted. Turns the «soft» HR function into a credible
ELT presence.

## Unlike (Alternatives)
- **Culture Amp, Lattice surveys:** lagging, quarterly, employee-reported. Our metrics
  are leading, continuous, behavioral.
- **Spreadsheets + tribal knowledge:** doesn't scale past 200 employees.
- **Zendesk-style approach «just count tickets»:** doesn't surface cause.

## Differentiation
**Leading indicators of manager effectiveness**, extracted from 1:1 patterns. Moat: 
1. 3+ years of customer 1:1 behavioral data (training corpus for AI)
2. Network effect — more customers → better aggregate benchmarks (is your 1:1 cadence
   in top quartile?)
3. Analytics layer as expansion driver (Enterprise tier unlocks this)

## Guiding Principles
1. **Measure or it doesn't exist.** Every feature generates a data point.
2. **Analytics drives tier expansion.** Basic usage = Team tier, analytics = Enterprise.
3. **Aggregate > individual for buyers.** Never surveillance content.
4. **Benchmark as value-add.** Industry / cohort comparisons = hard-to-copy.
5. **ROI visibility for CPO.** Dashboard → Board deck in 1 click.

## Vision Story
Imagine Jennifer, CPO at a 450-person B2B SaaS. Monday morning, she reviews the TeamFlow
dashboard: 89% of managers ran 1:1s last week (vs 82% last month — green arrow). Action
item completion rate is 68% org-wide, but the Engineering team is at 52% (flag: manager
training opportunity). Her top-performer-retention cohort shows a 1:1 pattern that differs
from the at-risk cohort — 3 weeks of early warning before regrettable attrition.

When CEO asks «what's ROI on People investment?», Jennifer has a one-page dashboard
ready: 1:1 cadence correlates with retention r=0.71, actions velocity correlates
with NPS r=0.58. For the first time, People shows up at ELT with hard numbers.

By 2028, TeamFlow is the «Salesforce for People Operations» — the platform where
CPOs spend their morning like CROs live in their pipeline dashboard. Category-defining,
not feature-expanding.

## FOCUS Check
- **Feasible:** ✅ Data exists in product, surfacing is eng-solvable
- **Obsession-worthy:** ✅ CPOs have been asking for this for years
- **Clarifying:** ✅ "Does this give CPOs a new metric?" — filter
- **Unique:** ✅ Our data corpus is unique; benchmarks create moat
- **Specific:** ✅ Concrete persona, concrete ELT narrative, concrete metrics
```

---

### Mediator Synthesis (MED-01, Session 4)

**Alpha evidence strength:** 4/5 (strong JTBD connection, strong competitive differentiation)  
**Beta evidence strength:** 4/5 (strong buyer need, strong tier expansion rationale)  

**Key disagreements:**
1. **Factual:** Alpha says «manager time saved drives retention»; Beta says «analytics drives expansion». Evidence supports BOTH — not mutually exclusive.
2. **Value:** Alpha centers end-user; Beta centers buyer. Both are real customers in the B2B buying loop.
3. **Risk:** Alpha under-weights aggregate dashboard importance for Enterprise; Beta under-weights privacy concerns for SMB.

**Synthesis: HYBRID vision**

```markdown
# Unified Product Vision — AI-Assisted 1:1 Workflow + Analytics

## Target Customer (Expanded)
Two user types, both buyers in B2B People Ops decisions:
- **Primary user:** People managers (5-15 reports)
- **Primary buyer:** VP People / CPO (mid-market + enterprise)

## Need / Opportunity
Simultaneously solve two connected problems:
1. Managers lose 3-4 hrs/week to 1:1 admin (end-user pain)
2. CPOs cannot measure manager effectiveness (buyer pain)
Both stem from the same root: 1:1 workflow is manual, leaving no data and no time.

## Key Benefit
**For managers:** Reclaim hours per week, transform 1:1s from admin to connection.
**For CPOs:** Make People Ops measurable — leading indicators + benchmarks.
Both benefits reinforce each other: time saved → more 1:1s happen → more data →
better insights → better coaching → retention.

## Product Category
AI-powered People Operations platform (convergence of workflow + analytics tiers).

## Differentiation (Moat Stack)
1. **Privacy architecture** (from Alpha): end-user trust
2. **Behavioral data corpus** (from Beta): analytics moat
3. **Integrated workflow** (from Alpha): context-aware summaries
4. **Benchmark network** (from Beta): industry comparison value

## Guiding Principles (Merged)
1. End-user time is sacred AND generates valuable data — alignment.
2. Summaries are individual; analytics are aggregate. Never mix.
3. Privacy by design (end-user consent for AI; aggregate-only for buyer).
4. Tiered value: Team tier = workflow, Enterprise tier = analytics.
5. Delight manager AND equip CPO — both stakeholders win.

## Tier Architecture (from synthesis)
- **Core (today):** Manual 1:1 workflow
- **AI Team tier (+$8/seat):** AI summarization, auto action items, reminders (Alpha focus)
- **Enterprise tier (+$15/seat):** Aggregate dashboard, manager health scores, benchmarks (Beta focus)

## Open Risks
- [Alpha concern] Privacy architecture must be bulletproof for end-user adoption
- [Beta concern] Analytics tier must not feel like surveillance (Alpha principle #5 applied)
- [Mediator add] Pricing can cannibalize if not tiered cleanly — test with customer advisory board

## Rationale for Hybrid
Alpha and Beta are not competing visions — they're complementary layers of the same
platform. Choosing only one would:
- Alpha only: miss $2-3M ARR Enterprise expansion opportunity
- Beta only: lack end-user love, leading to low adoption and churn risk

Synthesis: **Ship Alpha MVP first (workflow), layer Beta (analytics) as Enterprise
tier within 4-6 months.** Sequencing respects end-user trust (must work before surveilling).
```

> **Product-vision adversarial lesson:** Customer vs Business camps, independent work, Mediator synthesis. **Neither camp won outright** — the synthesis revealed both were right but incomplete. Without the formal adversarial process, the team would have shipped Alpha's vision alone and missed the $2-3M Enterprise ARR opportunity, OR shipped Beta's vision alone and faced adoption backlash. The structured debate cost 2 extra sessions but saved at least one strategic misstep.
