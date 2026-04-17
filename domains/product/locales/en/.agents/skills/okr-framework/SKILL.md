---
name: okr-framework
description: Objectives & Key Results for B2B product teams — quarterly cycle, measurable key results
---
# OKR Framework

> **Category:** Strategy  ·  **Slug:** `okr-framework`

## When to Use

- During quarterly planning for the product team.
- When translating vision → operational goals.
- When aligning with exec-level goals (cascading OKR).
- During post-quarter review — grading KRs.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Product vision | ✅ | What is the long-term north star |
| North Star Metric | ✅ | Measurable anchor |
| Company-level goals | ✅ | Which OKRs come from above |
| Previous quarter grade | ⬚ | For adjustments |
| Team capacity | ✅ | Honest assessment of resources |

## Data Sources

1. `$product-vision` — long-term direction.
2. `$north-star-metric` — primary metric.
3. Company OKR — alignment with company goals.
4. Previous quarter results — learning.

### Related Skills

| Skill | What we take | When to invoke |
|-------|-------------|----------------|
| `product-vision` | Vision | Before OKR — for alignment |
| `north-star-metric` | NSM | KRs often tied to NSM |
| `product-roadmap` | Initiatives | OKR → roadmap themes |
| `rice-scoring` | Priorities | Which initiatives this quarter |

## Structure

```
Objective (qualitative goal, inspirational)
  ├── Key Result 1 (measurable, outcome, not output)
  ├── Key Result 2
  └── Key Result 3
```

## Protocol

### Step 0 — Cascade from Company

1. Review company-level Objectives.
2. Which of them does our product team drive?
3. Alignment is not through copy-paste — through "how we contribute".

### Step 1 — Objectives (1-3)

Rules:
- **Qualitative, inspirational** — not a number
- Clear enough to know «did we achieve it?»
- Time-bounded (usually a quarter)
- 1-3 per quarter — more = distraction

✅ Good: «Become the default onboarding tool for mid-market engineering teams»  
❌ Bad: «Increase feature adoption» (weakly inspirational) or «Grow ARR by 15%» (this is a KR, not an O)

### Step 2 — Key Results per Objective (2-5)

Rules:
- **Measurable** — numeric target
- **Outcome, not output** (not «ship feature X», but «feature X used by Y teams»)
- **Ambitious** — 70% grade = success (target = stretch)
- **Time-boxed** (by end of quarter)

KR types:
- **Impact metrics:** NRR, activation rate, retention
- **Leading indicators:** time-to-value, feature adoption
- **Quality:** p95 latency, error rate, NPS

Mix types — not all impact, not all leading.

✅ Good KR: «Grow weekly active teams from 120 to 180»  
❌ Bad KR: «Ship checkout redesign» (output, not outcome)

### Step 3 — Ambition Calibration

Stretch goals:
- **Committed KRs** (must hit) — 100% target. Typically 0.8× ambitious.
- **Aspirational KRs** — 70% target. Typically 1.3× ambitious.

In B2B SaaS the usual mix: 70% committed + 30% aspirational.

### Step 4 — Initiatives Mapping

For each KR — **which initiatives** (features, projects) drive it? Via `$product-roadmap`.

| KR | Initiative | Expected impact | Timeline |
|----|------------|:---------------:|----------|
| KR1 | Onboarding checklist | +15% activation | Week 4-8 |

### Step 5 — Sanity Check

- Does team capacity suffice? (not over-ambitious)
- Does each Objective have ≥ 2 KRs?
- Do KRs cover leading + lagging?
- Conflict check: does achieving one KR not destroy another?

### Step 6 — Review Cadence

- **Weekly:** progress check (burndown style)
- **Mid-quarter:** re-calibration (adjust committed/aspirational if reality changed)
- **End-of-quarter:** grade each KR (0-1.0), retro

### Step 7 — Grading

- 0.0-0.3 — failed / didn't prioritize
- 0.4-0.6 — didn't hit but made progress
- 0.7 — hit target (healthy for aspirational)
- 1.0 — fully achieved (if consistently 1.0 → KRs not ambitious enough)

## Validation (Quality Gate)

- [ ] 1-3 Objectives per team / quarter
- [ ] 2-5 KRs per Objective
- [ ] KRs measurable (numeric, not subjective)
- [ ] KRs outcome-focused, not output
- [ ] Mix leading + lagging
- [ ] Initiatives mapped to KRs
- [ ] Capacity-checked
- [ ] Cascade alignment with company OKR
- [ ] Review cadence planned

## Handoff

The result is input for:
- **`product-roadmap`** — initiatives mapped to KRs
- **`rice-scoring`** — prioritization of initiatives within quarter
- **Data Analyst** (`$saas-metrics`, `$hypothesis-template`) — how to measure KRs

Format: OKR doc (one page per quarter). Via `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|-------------------|
| Too many Objectives | Focus lost | Max 3 |
| KR = feature ship | Output, not outcome | Measure customer impact |
| Vague KR | «Improve X» | Numeric: «X from A to B» |
| No ambition | Always 1.0 | Aspirational: stretch 70% |
| Ignoring capacity | Overcommit | Honest capacity check |
| Copy-paste from company | Not cascaded | «How we contribute to» |

## Template

```markdown
# OKR Q2 2026 — [Team Name]

## O1: [Inspirational Objective]
- **KR1.1:** [Metric] from [baseline] to [target] by [date]
- **KR1.2:** [Metric] from X to Y
- **KR1.3:** ...

### Initiatives for O1
| KR | Initiative | Expected impact | Timeline |
| ... |

## O2: ...

---

## Health Check
- [ ] Objectives inspire
- [ ] KRs measurable
- [ ] Capacity-honest
- [ ] Cascade checked

## Review Schedule
- Weekly Tuesday: progress
- Mid-Q (week 6): re-calibrate
- End-Q: grade + retro
```

## Worked Example — TeamFlow Q2 2026 OKRs (Product team, post-Mediator)

**Context:** TeamFlow (B2B SaaS HR-tech, $8M ARR). After Mediator synthesis of visions (Alpha + Beta), the team forms Q2 OKRs for the Product team. Company-level OKRs: grow ARR 50% YoY ($8M → $12M by Q4) + launch AI tier + NRR 105% → 110%.

```markdown
# OKR Q2 2026 — TeamFlow Product Team

## Company Context (cascade input)
- **Company O:** Become category-leading People Ops platform by 2027
- **Company KR:** $12M ARR by Q4 2026 (from $8M), NRR 115%, launch AI tier
- **Our cascade role:** Drive product-led expansion; enable Enterprise tier; make AI MVP successful

---

## O1: Ship AI 1:1 tier that managers love and buyers pay for

**Ambition:** Aspirational (70% grade = success)

- **KR1.1:** 40 customers (of 200 base) upgraded to AI Team tier ($8/seat) by June 30
  - Baseline: 0 (tier not existing yet)
  - Target: 40 accounts = 20% base penetration
  - Stretch: 60 accounts
- **KR1.2:** Among upgraded accounts, 65% of active managers use AI summarization weekly (vs zero baseline)
- **KR1.3:** AI summarization NPS ≥ 50 (vs general TeamFlow NPS 45)
- **KR1.4:** Action items completion rate lifts from 60% baseline to 75% in AI tier accounts

### Initiatives for O1
| KR | Initiative | Expected impact | Timeline |
|----|------------|-----------------|----------|
| KR1.1 | AI Team tier launch (feature flag gated) | 40 upgrade conversations | Week 4-10 |
| KR1.1 | GTM campaign (email, webinar, in-app) | +15 upgrades | Week 6-12 |
| KR1.2 | Onboarding flow for new AI users (checklist + first-success moment) | +25pp adoption | Week 8-10 |
| KR1.3 | Feedback loop (in-product rating after each summary) | Signal for iteration | Week 6-ongoing |
| KR1.4 | Automated reminders for AI-extracted action items | +15pp completion | Week 10-12 |

---

## O2: Establish Enterprise tier as credible expansion path

**Ambition:** Committed (100% grade = must hit)

- **KR2.1:** 5 Enterprise tier accounts signed ($50+/seat, min 300 seats each) by June 30
  - Baseline: 10 Enterprise accounts on legacy pricing
  - Target: 5 on new Enterprise tier
- **KR2.2:** Enterprise pilot: 3 design partners live on aggregate dashboard + health score features
- **KR2.3:** Security review passed: SOC 2 Type II controls documented for AI features (blocker for 2 deals)
- **KR2.4:** 0 Enterprise contract rejections due to compliance/AI concerns (baseline: 2 in Q1)

### Initiatives for O2
| KR | Initiative | Expected impact | Timeline |
|----|------------|-----------------|----------|
| KR2.1 | Enterprise tier pricing + packaging docs | Sales enablement | Week 2-4 |
| KR2.2 | Aggregate dashboard MVP (from Beta vision) | 3 design partners engaged | Week 6-12 |
| KR2.3 | SOC 2 Type II audit for AI tier | Unblock enterprise deals | Week 1-8 |
| KR2.4 | Compliance FAQ + objection handling deck | Sales reduces objection time | Week 4 |

---

## O3: Build data foundation for 2027 category leadership

**Ambition:** Aspirational (70%)

- **KR3.1:** 1:1 behavioral data pipeline instruments 100% of AI tier events (reliable for downstream analytics)
- **KR3.2:** Privacy architecture passes external audit (trust layer for future AI features)
- **KR3.3:** Benchmark engine MVP — 3 industry/segment comparisons live for Enterprise accounts

### Initiatives for O3
| KR | Initiative | Expected impact | Timeline |
|----|------------|-----------------|----------|
| KR3.1 | Event schema + instrumentation (PM + Data) | Data basis for Q3 features | Week 4-8 |
| KR3.2 | Privacy architecture review + attestation | Moat reinforcement | Week 2-10 |
| KR3.3 | Benchmark calculation engine | Enterprise delight | Week 10-13 |

---

## Health Check
- [x] Objectives inspire — all tie to category positioning
- [x] KRs measurable — all numeric (% / count / NPS / binary)
- [x] Capacity-honest — 8 eng + 3 PM + 2 design = 13 person-weeks capacity per sprint × 13 sprints = 169 weeks total available; planned initiatives ≈ 120 person-weeks (71% capacity, 29% buffer)
- [x] Cascade checked — O1 drives Company KR «launch AI tier»; O2 drives «NRR 115%»; O3 drives «category leadership»

## Review Schedule
- **Weekly Tuesday 10am:** progress burndown + adjustments (15 min per Objective)
- **Mid-Q (Week 6, May 12):** re-calibrate commitments, move committed↔aspirational if reality shifted
- **End-Q (June 30):** grade all KRs (0-1.0), retrospective, input for Q3

## Grading Rubric (applied at end-Q)

Example grade for KR1.1 (40 account upgrades):
- Hit 40 → 1.0 (hit target)
- Hit 30 → 0.75 (healthy progress, 75% of target)
- Hit 20 → 0.5 (partial)
- Hit 10 → 0.25 (minimal)
- Hit 0 → 0.0

For aspirational KRs, 0.7 = green. For committed KRs, anything below 1.0 triggers retro.
```

> **OKR lesson:** O1, O2, O3 distribute across Alpha and Beta priorities — O1 is Alpha-weighted (workflow + managers), O2 is Beta-weighted (analytics + buyers), O3 is foundation for both. This prevents OKR-level re-litigation of the Mediator synthesis — the roadmap is now guided by the triple Objective, not by camp politics.
