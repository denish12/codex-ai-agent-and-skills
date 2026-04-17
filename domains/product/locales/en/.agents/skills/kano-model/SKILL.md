---
name: kano-model
description: Feature classification — must-have / performance / delighters / indifferent / reverse
---
# Kano Model

> **Category:** Strategy  ·  **Slug:** `kano-model`

## When to Use

- When planning a release — checking feature balance.
- When appraising feature requests from customers.
- In competitive analysis — what makes the product magical vs table-stakes.
- In Full Pipeline B (`/shape-prioritize`) — Kano as a filter for scope.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Feature set (existing + planned) | ✅ | List of features to classify |
| Customer research | ✅ | For survey or inference |
| Competitor feature map | ⬚ | What is table stakes in the category |

## Data Sources

1. Customer survey (Kano questionnaire — dual question format).
2. Interviews — what enchants vs frustrates.
3. Support tickets — what absence creates pain.
4. Competitor analysis — baseline expectations.

### Related Skills

| Skill | What we take | When to invoke |
|-------|-------------|----------------|
| `jtbd-canvas` | Jobs → functional vs emotional impact | Before Kano |
| `rice-scoring` | Score × Kano category = final priority | After Kano |
| `product-roadmap` | Balance check | For roadmap validation |

## Five Kano Categories

| Category | When present | When absent | Strategy |
|----------|-------------|-------------|----------|
| **Must-have (Basic)** | Expected, not exciting | High dissatisfaction | Must include. Table stakes |
| **Performance (Linear)** | Satisfaction grows proportionally | Dissatisfaction | Compete on this axis |
| **Delighters (Excitement)** | Wow, unexpected | Not missed | Differentiators. A few per release |
| **Indifferent** | Neutral | Neutral | Skip, don't spend effort |
| **Reverse** | Dissatisfies (overwhelm) | Satisfies | Cut or make optional |

## Protocol

### Step 0 — Feature List

Gather all features (existing + planned) into a single list. 10-30 features is optimal.

### Step 1 — Classification Method

Two methods:

**A. Survey (gold standard)**

For each feature — 2 questions:
- Functional: «If feature X was present — how would you feel?» (1-5 from Dislike to Like)
- Dysfunctional: «If feature X was NOT present — how would you feel?» (1-5)

Matrix responses → Kano category.

**B. Inference (quicker, less rigorous)**

Team workshop: classify by intuition + evidence (tickets, interviews).

### Step 2 — Kano Matrix

```
Dysfunctional (without feature)
              Like  Neutral  Dislike
Functional    ┌───────┬─────────┬──────────┐
Like          │ Rev.  │ Delight │ Perform. │
Neutral       │ Rev.  │ Indiff. │ Must     │
Dislike       │ -     │ -       │ Must     │
              └───────┴─────────┴──────────┘
```

### Step 3 — Classify Features

| # | Feature | Func. score | Dysfunc. score | Kano Category |
|---|---------|:-----------:|:--------------:|:-------------:|
| 1 | SSO | Neutral | Dislike | **Must-have** |
| 2 | Custom dashboards | Like | Dislike | **Performance** |
| 3 | Voice commands | Like | Neutral | **Delighter** |
| 4 | Avatar customization | Neutral | Neutral | **Indifferent** |

### Step 4 — Portfolio Balance Check

Healthy release:
- **Must-haves:** all present (even if invisible). Without = release blocked.
- **Performance:** 2-3 key ones we compete on.
- **Delighters:** 1-3. More is not needed — overwhelm.
- **Indifferent:** remove.
- **Reverse:** cut or make optional.

### Step 5 — Evolve Over Time

Important: **Delighters become Performance → Must-have** over time.
- iPhone camera: delighter (2007) → performance (2012) → must-have (2020)
- SSO: delighter (2010) → performance (2016) → must-have in B2B (2022)

Plan for each delighter: when it will become must-have → a new delighter is needed.

### Step 6 — Segment Differences

Different segments → different Kano classifications.
- SMB: SSO = indifferent
- Enterprise: SSO = must-have

Per-segment analysis is required for B2B.

### Step 7 — Kano × RICE

Multiply RICE by Kano factor:
- Must-have: if missing, feature is critical (RICE × 2)
- Performance: standard (RICE × 1)
- Delighter: boost for differentiation (RICE × 1.3)
- Indifferent: cut (RICE × 0)
- Reverse: negative (avoid)

## Validation (Quality Gate)

- [ ] 10-30 features classified
- [ ] Method (survey or inference) is explicit
- [ ] Per-segment analysis (SMB vs enterprise)
- [ ] Portfolio balance: all must-haves ✅, 2-3 performance, 1-3 delighters
- [ ] Indifferent features identified for cut
- [ ] Delighter evolution plan
- [ ] Kano × RICE integrated

## Handoff

The output is the input for:
- **`product-roadmap`** — feature balance in Now/Next
- **`rice-scoring`** — adjusted scores
- **PM** → scope decisions
- **Mediator** (Full B) — Build/Cut camp evidence

Format: Kano classification table + portfolio chart. Via `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|---------------------|
| All delighters | No foundation + overwhelm | Must-haves required first |
| No must-have check | Release blocked | Must-haves = foundation |
| Indifferent shipped | Waste of effort | Cut early |
| No segment split | B2B SMB ≠ Enterprise | Per-segment analysis |
| Static Kano | Migration not accounted for | Plan delighter → must-have |
| Survey N=5 | Not statistically meaningful | N ≥ 100 for survey |

## Worked Example — TeamFlow Kano Survey (AI 1:1 Summarization release)

**Context:** TeamFlow (B2B SaaS HR-tech, $8M ARR). After Discovery + OST + PRD draft — team is deliberating final scope for AI summarization release. 18 feature candidates reviewed. Goal: ship a strong MVP without overwhelm, with clear delighters for competitive differentiation.

### Feature List (18 candidates)

```
CORE AI (from main initiative):
1. Real-time transcription during 1:1
2. Auto-generated summary (post-meeting)
3. Auto-extracted action items
4. Action items reminders (before next 1:1)
5. Manager inline edit of summary

BUYER DASHBOARD:
6. Aggregate 1:1 cadence dashboard (org-level)
7. Manager-level 1:1 health score
8. Exportable quarterly report for Board

INTEGRATIONS:
9. Calendar integration (auto-pull 1:1 events)
10. Slack notification integration
11. Zoom / Google Meet recording import
12. SSO (SAML) — required for enterprise

PRIVACY / CONTROL:
13. Per-meeting AI on/off toggle
14. Data retention controls (30 / 90 / 365 days)
15. Audit log (who accessed summaries)

NICE-TO-HAVE:
16. AI-suggested discussion prompts
17. Sentiment tracking (aggregated, over time)
18. Meeting template library
```

### Kano Survey Method

Dual-question survey sent to **247 TeamFlow customers** (stratified sample: 140 SMB, 80 mid-market, 27 enterprise contacts). Response rate: 52% = 129 responses.

**Question format per feature:**
- **Functional:** «If TeamFlow HAD [feature], how would you feel?» (1 = Dislike, 5 = Like)
- **Dysfunctional:** «If TeamFlow DIDN'T HAVE [feature], how would you feel?» (1 = Dislike, 5 = Like)

### Classification Results (Per Segment)

#### SMB segment (N=70)

| # | Feature | Func. | Dysf. | Category |
|---|---------|:-----:|:-----:|:--------:|
| 1 | Real-time transcription | Like | Neutral | **Delighter** |
| 2 | Auto-generated summary | Like | Dislike | **Performance** |
| 3 | Auto-extracted action items | Like | Dislike | **Performance** |
| 4 | Action items reminders | Like | Neutral | **Delighter** |
| 5 | Manager inline edit | Neutral | Dislike | **Must-have** |
| 6 | Aggregate dashboard | Neutral | Neutral | **Indifferent** (SMB don't need org-level) |
| 7 | Manager health score | Neutral | Neutral | **Indifferent** |
| 8 | Quarterly export | Neutral | Neutral | **Indifferent** |
| 9 | Calendar integration | Like | Dislike | **Performance** |
| 10 | Slack notifications | Like | Neutral | **Delighter** |
| 11 | Zoom/Meet import | Neutral | Neutral | **Indifferent** |
| 12 | SSO SAML | Neutral | Neutral | **Indifferent** (SMB use Google auth) |
| 13 | Per-meeting toggle | Neutral | Dislike | **Must-have** |
| 14 | Data retention controls | Neutral | Dislike | **Must-have** |
| 15 | Audit log | Neutral | Neutral | **Indifferent** |
| 16 | AI discussion prompts | Like | Neutral | **Delighter** |
| 17 | Sentiment tracking | Neutral | Like | **Reverse** (SMB react negatively) |
| 18 | Meeting templates | Like | Neutral | **Delighter** |

#### Mid-market segment (N=45)

| # | Feature | Func. | Dysf. | Category |
|---|---------|:-----:|:-----:|:--------:|
| 1 | Real-time transcription | Like | Dislike | **Performance** |
| 2 | Auto-generated summary | Like | Dislike | **Performance** |
| 3 | Auto-extracted action items | Like | Dislike | **Performance** |
| 4 | Action items reminders | Like | Dislike | **Performance** |
| 5 | Manager inline edit | Neutral | Dislike | **Must-have** |
| 6 | Aggregate dashboard | Like | Dislike | **Performance** |
| 7 | Manager health score | Like | Neutral | **Delighter** |
| 8 | Quarterly export | Neutral | Dislike | **Must-have** |
| 9 | Calendar integration | Neutral | Dislike | **Must-have** |
| 10 | Slack notifications | Neutral | Neutral | **Indifferent** |
| 11 | Zoom/Meet import | Like | Neutral | **Delighter** |
| 12 | SSO SAML | Neutral | Dislike | **Must-have** |
| 13 | Per-meeting toggle | Neutral | Dislike | **Must-have** |
| 14 | Data retention controls | Neutral | Dislike | **Must-have** |
| 15 | Audit log | Neutral | Neutral | **Indifferent** |
| 16 | AI discussion prompts | Neutral | Neutral | **Indifferent** |
| 17 | Sentiment tracking | Neutral | Neutral | **Indifferent** |
| 18 | Meeting templates | Neutral | Neutral | **Indifferent** |

#### Enterprise segment (N=14)

| # | Feature | Func. | Dysf. | Category |
|---|---------|:-----:|:-----:|:--------:|
| 1 | Real-time transcription | Like | Dislike | **Performance** |
| 2 | Auto-generated summary | Like | Dislike | **Performance** |
| 3 | Auto-extracted action items | Like | Dislike | **Performance** |
| 4 | Action items reminders | Neutral | Dislike | **Must-have** |
| 5 | Manager inline edit | Neutral | Dislike | **Must-have** |
| 6 | Aggregate dashboard | Like | Dislike | **Performance** (high value) |
| 7 | Manager health score | Like | Dislike | **Performance** |
| 8 | Quarterly export | Neutral | Dislike | **Must-have** |
| 9 | Calendar integration | Neutral | Dislike | **Must-have** |
| 10 | Slack notifications | Neutral | Neutral | **Indifferent** |
| 11 | Zoom/Meet import | Like | Dislike | **Performance** |
| 12 | SSO SAML | Neutral | Dislike | **Must-have** (contract requirement!) |
| 13 | Per-meeting toggle | Neutral | Dislike | **Must-have** |
| 14 | Data retention controls | Neutral | Dislike | **Must-have** |
| 15 | Audit log | Neutral | Dislike | **Must-have** (compliance requirement!) |
| 16 | AI discussion prompts | Neutral | Neutral | **Indifferent** |
| 17 | Sentiment tracking | Neutral | Neutral | **Indifferent** |
| 18 | Meeting templates | Neutral | Neutral | **Indifferent** |

### Segment Reconciliation — final classification

Using the rule «worst segment wins» (if a feature is Must-have for enterprise but Indifferent for SMB — treat as Must-have for Enterprise tier; for general release — high priority):

| # | Feature | SMB | Mid-market | Enterprise | **Final Priority** | Rationale |
|---|---------|:---:|:----------:|:----------:|:------------------:|-----------|
| 5 | Manager inline edit | Must | Must | Must | **MUST-HAVE** | Universal table stakes |
| 13 | Per-meeting toggle | Must | Must | Must | **MUST-HAVE** | Privacy across all |
| 14 | Data retention controls | Must | Must | Must | **MUST-HAVE** | Privacy + compliance |
| 9 | Calendar integration | Perf | Must | Must | **MUST-HAVE** (mid+) | Blocker at mid-market+ |
| 12 | SSO SAML | Indiff | Must | Must | **MUST-HAVE** (mid+) | Enterprise contract requirement |
| 15 | Audit log | Indiff | Indiff | Must | **MUST-HAVE** (enterprise) | SOC 2 compliance |
| 8 | Quarterly export | Indiff | Must | Must | **MUST-HAVE** (mid+) | VP HR reporting |
| 4 | Action items reminders | Delight | Perf | Must | **MUST-HAVE** (enterprise), **PERFORMANCE** (mid) | Varies by segment — ship in MVP |
| 2 | Auto-generated summary | Perf | Perf | Perf | **PERFORMANCE** | Core feature, competitive axis |
| 3 | Auto-extracted action items | Perf | Perf | Perf | **PERFORMANCE** | Core feature |
| 6 | Aggregate dashboard | Indiff | Perf | Perf | **PERFORMANCE** (mid+ tier) | Expansion driver |
| 1 | Real-time transcription | Delight | Perf | Perf | **PERFORMANCE** (mid+), **DELIGHTER** (SMB) | Entry point for SMB awe |
| 7 | Manager health score | Indiff | Delight | Perf | **PERFORMANCE** (enterprise), **DELIGHTER** (mid) | Tier differentiator |
| 11 | Zoom/Meet import | Indiff | Delight | Perf | **DELIGHTER** (mid) | Integration moat |
| 10 | Slack notifications | Delight | Indiff | Indiff | **DELIGHTER** (SMB primary) | SMB-specific delight |
| 16 | AI discussion prompts | Delight | Indiff | Indiff | **DELIGHTER** (SMB) | Novelty for SMB |
| 18 | Meeting templates | Delight | Indiff | Indiff | **DELIGHTER** (SMB) | Onboarding aid |
| 17 | Sentiment tracking | Reverse | Indiff | Indiff | **CUT** | Red flag for SMB! |

### Portfolio Balance Check

**MVP scope (Must-haves):**
- Manager inline edit, Per-meeting toggle, Data retention controls (universal)
- Calendar, SSO, Quarterly export (mid-market / enterprise)
- Audit log (enterprise)
- Action items reminders (tier-dependent)

**Performance features (core competitive):**
- Auto summary, auto action items extraction, Real-time transcription (mid+), Aggregate dashboard (mid+), Manager health score (enterprise)

**Delighters (optional for MVP, for competitive differentiation and SMB love):**
- Zoom/Meet import (mid-market) — pick 1-2
- Slack notifications (SMB)
- AI discussion prompts (SMB)

**CUT:**
- Sentiment tracking — Reverse in SMB segment, Indifferent in mid+ → drop from release
- Consider post-launch research if enterprise requests appear later

### Kano × RICE Integration

| Feature | RICE score | Kano Adjustment | Final Priority |
|---------|:----------:|:---------------:|:--------------:|
| Auto summary | 64 | Performance × 1.0 = 64 | P0 |
| Auto action items | 58 | Performance × 1.0 = 58 | P0 |
| Inline edit | 35 | Must × 1.5 = 52 | P0 |
| Privacy toggles | 30 | Must × 1.5 = 45 | P0 |
| Calendar integration | 40 | Must (mid+) × 1.5 = 60 | P0 |
| SSO SAML | 25 | Must (enterprise) × 1.5 = 37 | P0 |
| Aggregate dashboard | 45 | Performance × 1.0 = 45 | P1 (mid+ tier) |
| Zoom/Meet import | 20 | Delighter × 1.3 = 26 | P1 |
| Sentiment tracking | 15 | Reverse × 0 = 0 | **CUT** |

### Delighter Evolution Plan (12-24 months out)

| Delighter (today) | → Performance (6-12 mo) | → Must-have (12-24 mo) |
|-------------------|-------------------------|-------------------------|
| Real-time transcription (SMB) | 3-6 mo (after competitors launch) | ~18 mo |
| AI discussion prompts | 9-12 mo | ~24 mo |
| Zoom/Meet import | 6-12 mo | ~18 mo |

**Implications:**
- Ship MVP with solid must-haves + 2-3 delighters = category leader perception
- Roadmap 12-24 mo: add «next generation» delighters to avoid being table-stakes-locked (e.g., coaching insights, multi-meeting threads)

### Final Recommendation for PM

- **Ship MVP:** all universal Must-haves + Auto summary + Auto action items + Real-time transcription + (tier-gated) Aggregate dashboard + SSO/Audit for Enterprise
- **Cut from MVP:** Sentiment tracking (Reverse signal), Manager health score (Delighter for mid, defer)
- **Pricing architecture:** 
  - **Core tier:** Auto summary, Auto actions, Real-time transcription, Privacy toggles
  - **Team tier +$8/seat:** Calendar, Slack notifications, Quarterly export
  - **Enterprise tier +$15/seat:** Aggregate dashboard, Manager health score, SSO, Audit log
- **Delight SMB:** Ship Slack notifications + AI discussion prompts in MVP — low eng cost, big perceived value

> **Kano lesson:** Per-segment analysis **changed scope**. Sentiment tracking was initially slated for MVP, but the survey revealed a **Reverse signal in the SMB segment** — SMB customers would **dislike** if it existed. Shipping it would have damaged NPS in the largest customer segment. Without the Kano survey, this would have launched and hurt.

> **Tier design lesson:** Kano reflects buyer vs end-user value — SSO / Audit log Indifferent for SMB, but a contract blocker for Enterprise. Perfect signal for tiered pricing architecture.
