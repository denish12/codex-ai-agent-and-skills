---
name: product-roadmap
description: Theme-based roadmap — Now / Next / Later, without hard dates, attached to OKR
---
# Product Roadmap

> **Category:** Strategy  ·  **Slug:** `product-roadmap`

## When to Use

- During quarterly or semi-annual planning.
- For stakeholder communication (exec, sales, customer success).
- For alignment of cross-functional work (eng + design + marketing + CS).
- For a public-facing customer roadmap (with caveats).

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Product vision | ✅ | Long-term direction |
| OKRs | ✅ | Current quarter goals |
| North Star Metric | ✅ | Alignment anchor |
| Backlog (prioritized) | ✅ | Initiatives + score |
| Capacity | ✅ | Team size, eng bandwidth |
| Known commitments | ⬚ | Customer promises, compliance deadlines |

## Data Sources

1. `$okr-framework` — quarterly goals.
2. `$rice-scoring` / `$moscow-prioritization` — initiatives.
3. `$jtbd-canvas` / `$opportunity-solution-tree` — opportunity themes.
4. Customer feedback (support, NPS, direct requests).

### Related Skills

| Skill | What we take | When to invoke |
|-------|-------------|----------------|
| `okr-framework` | KRs | Before roadmap |
| `rice-scoring` | Prioritized initiatives | For Now/Next/Later assignment |
| `kano-model` | Feature balance | Balance must-have / delighters |
| `product-vision` | Themes rationale | Themes must fit vision |

## Format: Now / Next / Later by Theme

```
Theme A: [Customer outcome]
  Now (0-3 months):    [Initiative 1], [Initiative 2]
  Next (3-6 months):   [Initiative 3]
  Later (6+ months):   [Theme direction]

Theme B: ...
```

**Themes**, not features: each theme = customer outcome or strategic direction.

## Protocol

### Step 0 — Identify Themes

From vision + OKR determine 3-5 themes for the current horizon.

Theme = customer-valued outcome, not «Q2 release».

✅ Good themes:
- «Onboarding: new teams activate in <7 days»
- «Enterprise-ready: SSO, SCIM, audit logs»
- «Usage visibility: account-level analytics»

❌ Bad themes:
- «Platform improvements» (too abstract)
- «Bug fixes» (not a theme, this is operational)
- «Ship feature X» (single feature ≠ theme)

### Step 1 — Initiatives per Theme

For each theme — a list of initiatives (from backlog). Via `$rice-scoring`.

| Theme | Initiative | RICE Score | Effort (t-shirt) |
|-------|------------|:----------:|:----------------:|
| Onboarding | In-app checklist | 45 | M |
| Onboarding | Team templates | 30 | L |

### Step 2 — Capacity Check

- Team size × weeks = total person-weeks
- Minus: oncall, meetings, eng debt, slack (~30%)
- Net available = useful capacity

Match Now (0-3 months) to ~70-80% capacity. The rest — buffer for incidents, emergent work.

### Step 3 — Assignment to Now / Next / Later

**Now** — committed to work, specific scope, start date within 6 weeks.

**Next** — high-priority, but scope/timing TBD. Will start in 3-6 months.

**Later** — strategically important, but not yet shaped. Placeholder for directions.

Don't put dates, except for hard external commits (compliance, customer SLA).

### Step 4 — Cross-team Dependencies

For each initiative:
- Which teams are involved (design, data, platform, security)?
- External dependencies (vendors, legal, partnerships)?
- Hard deadlines (contract, regulation)?

### Step 5 — Risks + Contingencies

- Top 3 risks per theme (missing deps, scope uncertainty, hiring)
- Trigger events — what will force a roadmap adjustment

### Step 6 — Communication Artifact

Two formats:
- **Internal roadmap** — full, with RICE scores, risks
- **External roadmap** (if shared with customers) — themes + directions, **without promised dates**, with disclaimer «subject to change»

### Step 7 — Review Cadence

- **Monthly:** progress, emergent work, re-assignment
- **Quarterly:** Now → shipped, Next → Now, Later → shaped
- **Board/exec:** quarterly summary

## Validation (Quality Gate)

- [ ] 3-5 themes, customer-outcome framed
- [ ] Each theme has initiatives
- [ ] Initiatives — scored (RICE / MoSCoW)
- [ ] Capacity check: Now ~70-80%
- [ ] No hard dates except external commits
- [ ] Dependencies identified
- [ ] Risks listed
- [ ] Internal + external versions separated

## Handoff

The result is input for:
- **PM** → PRDs for Now initiatives
- **Tech Lead** → engineering planning
- **Stakeholders** → expectation setting
- **Mediator** (Full A) — for synthesis

Format: roadmap doc (markdown + optional visual / timeline). Via `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|-------------------|
| Dated roadmap (public) | Missed dates → trust erosion | Themes without dates externally |
| Feature list instead of themes | No outcome framing | Themes = outcomes |
| 100% capacity | No buffer for incidents | 70-80% in Now |
| Too many themes (6+) | Focus lost | 3-5 themes |
| No review cadence | Stale roadmap | Monthly check-ins |
| Promise «all of this» | Under-delivers | Now = commitment, Next = intent, Later = direction |

## Template

```markdown
# Product Roadmap — Q2-Q3 2026

## Themes

### Theme 1: [Customer Outcome]
**Why:** [alignment with vision / OKR]

#### Now (0-3 months)
- [Initiative A] — RICE 45, Effort M, Owner: PM-X
- [Initiative B] — RICE 30, Effort L

#### Next (3-6 months)
- [Initiative C]

#### Later (6+ months)
- [Direction]

**Dependencies:** [cross-team]
**Risks:** [top 3]

### Theme 2: ...

---

## Capacity
- Team: N people
- Now commitment: X person-weeks (Y% capacity)
- Buffer: 20%

## Review Cadence
- Monthly: progress + emergent work
- Quarterly: re-shape Next/Later
```

## Worked Example — TeamFlow Roadmap Q2-Q3 2026

**Context:** TeamFlow after Q1 Mediator synthesis + OKR set. Roadmap aligns to unified vision (workflow + analytics), cascades through 3 Objectives.

```markdown
# Product Roadmap — Q2-Q3 2026 (TeamFlow Product)

## Strategic Context
- **Vision:** AI-powered People Ops platform (workflow + analytics)
- **NSM:** Sticky Manager Ratio (AI Tier)
- **OKRs:** O1 (AI tier ships + adoption), O2 (Enterprise tier expansion), O3 (data foundation)
- **Horizon:** 6 months (Q2 + Q3)

## Themes

### Theme 1: AI-Assisted 1:1 Workflow (End-User Value)
**Why:** Drives O1 (manager adoption). Addresses top JTBD (manager admin overhead).

#### Now (0-3 months, April-June)
- **AI Summarization MVP** — auto-transcribe + summarize + action items. RICE 288, L effort. Owner: PM Alex. *Status: Week 4/12.*
- **Inline Summary Edit** — manager reviews/corrects before save. Must-have from Kano. RICE 52, M effort.
- **Action Items Auto-Extract + Reminders** — extracted from AI summary, surfaced before next 1:1. RICE 58, M.
- **Per-Meeting AI Toggle** — privacy Must-have. RICE 45, S.

#### Next (3-6 months, July-September)
- **Real-Time Prep Card** — AI generates pre-1:1 context brief (previous topics, open action items, suggested prompts). Delighter-turning-Performance.
- **Calendar Integration v2** — auto-pull from Google Cal + Outlook, map to TeamFlow 1:1s.
- **Mobile Summary Review** — review / approve summaries from mobile.

#### Later (6+ months, Q4+)
- **Voice-only interaction** — manager speaks, no typing required (delighter).
- **Multi-language summarization** — non-English companies.
- **Group meeting summarization** — beyond 1:1s (scope creep controlled).

**Dependencies:** LLM API budget approval (CFO, by Week 3); Privacy/Legal review for EU data residency.
**Risks:** (1) LLM quality plateau below 85% acceptable — mitigation: human-review layer feature flag. (2) OpenAI pricing change — mitigation: vendor alternative tested (Anthropic via AWS Bedrock).

---

### Theme 2: People Ops Analytics (Buyer Value → Enterprise Expansion)
**Why:** Drives O2 (enterprise tier). Addresses VP HR visibility gap.

#### Now (0-3 months)
- **Aggregate 1:1 Cadence Dashboard** — per-team, per-manager frequency + duration. RICE 45, M.
- **Manager Health Score (MVP)** — 4-component score (cadence, action items velocity, NPS, attrition). Delighter-turning-Performance. RICE 32, L.
- **Quarterly Exec Report Generator** — auto-composed board-ready PDF. RICE 28, M.

#### Next (3-6 months)
- **Benchmark Engine** — industry comparisons (is our 1:1 cadence top-quartile?). Differentiation moat.
- **At-Risk Team Detector** — pattern-based early warning. AI-powered.
- **Manager Coaching Insights** — AI surfaces coaching opportunities per manager.

#### Later (6+ months)
- **Predictive Attrition Model** — manager practice data → retention risk.
- **Cross-Customer Benchmarks** — network effect analytics.

**Dependencies:** Data pipeline instrumentation (Theme 3 prerequisite). Security attestation SOC 2 Type II for analytics tier.
**Risks:** (1) Benchmark data thin until N ≥ 20 Enterprise customers — mitigation: start with internal team benchmarks. (2) Manager backlash if perceived as surveillance — mitigation: aggregate-only, transparent data model.

---

### Theme 3: Data & Privacy Foundation
**Why:** Drives O3 (foundation). Enables Themes 1 & 2.

#### Now (0-3 months)
- **Event Schema + Instrumentation** — reliable 1:1 behavioral data pipeline. Platform work.
- **Privacy Architecture** — opt-in, user-controlled, regional LLM endpoints (US + EU + APAC).
- **SOC 2 Type II Extension** — to cover AI features.

#### Next (3-6 months)
- **Data Retention Controls UI** — customer-controlled (30/90/365 days).
- **Audit Log Enhancements** — Who accessed what summary when.

#### Later (6+ months)
- **HIPAA-ready tier** — for healthcare customers.
- **On-premise LLM option** — for ultra-regulated enterprise.

**Dependencies:** Legal review; external security audit firm engagement.
**Risks:** (1) Audit delays → Enterprise deals slip — mitigation: parallel-track audit + conditional deals.

---

## Capacity

- **Team:** 8 engineers + 3 PM + 2 design + 1 data = 14 people
- **Available person-weeks:** 14 × 13 weeks = 182 weeks (per 13-sprint quarter)
- **Allocations:**
  - Theme 1: 70 person-weeks (54% of Now)
  - Theme 2: 45 person-weeks (35% of Now)
  - Theme 3: 30 person-weeks (23% — platform, invisible but critical)
  - Total Now: 145 person-weeks
  - **Buffer:** 37 person-weeks (20% — for incidents, emergent work, recruiting ramp)

## Public-facing Roadmap (Customer-visible)

### What's Next on TeamFlow

- **Q2 2026:** AI-assisted 1:1 summaries + action items tracking (Team tier)
- **Q3 2026:** People Ops analytics + team benchmarks (Enterprise tier)
- **Coming Later:** Advanced AI coaching insights, predictive analytics

*This public roadmap shows themes without specific dates. Features ship when ready; we share 
progress through quarterly customer webinars. [Subscribe for updates].*

## Review Cadence
- **Monthly 1st Tuesday:** cross-theme progress + emergent work integration
- **Mid-Q (Week 6, May 12):** re-calibrate Now, convert Next→Now if ahead
- **End-Q (June 30):** full retro, Next→Now promotions, Later additions
- **Annual (December):** Themes evolved / retired; new horizon defined
```

> **Roadmap lesson:** **Three themes = three OKRs**. Each theme drives one Objective, so the team can say «if I touch Theme 1 this week, I'm moving KR1.x». No orphan work. Dependencies between themes (Theme 3 enables Theme 2's data layer) are documented explicitly — this prevents the «why is the platform team busy?» confusion. The public-facing version strictly avoids dates — learned from prior missed-date backlash in Q4 2025.
