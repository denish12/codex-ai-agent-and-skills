---
name: rice-scoring
description: Prioritization by Reach × Impact × Confidence / Effort
---
# RICE Scoring

> **Category:** Prioritization  ·  **Slug:** `rice-scoring`

## When to Use

- When ranking multiple initiatives / features for a roadmap.
- As an initial screening before deeper analysis.
- For comparable scoring across initiatives of different types.
- In Build-Camp (`/shape-prioritize`) — each initiative must have a RICE score.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Backlog / initiative list | ✅ | 10-50 initiatives is optimal |
| Reach data | ✅ | Analytics / CRM for reach estimation |
| Impact hypothesis | ✅ | Metric target + rationale |
| Effort estimates | ✅ | Engineering/design time |
| Time period | ✅ | Typically a quarter |

## Data Sources

1. Product analytics — users / accounts data for reach.
2. Customer interviews — impact signal.
3. Engineering estimates — effort (time, not cost).
4. Historical data — similar features' actual outcomes.

### Related Skills

| Skill | What we take | When to invoke |
|-------|-------------|----------------|
| `problem-statement` | Reach + impact evidence | For calculation |
| `kano-model` | Category multiplier | Post-scoring adjustment |
| `product-roadmap` | Scored list → Now/Next | After scoring |
| `hypothesis-template` | Confidence basis | For Confidence assessment |

## Formula

```
RICE = (Reach × Impact × Confidence) / Effort
```

## Protocol

### Step 1 — Reach

How many **people / accounts** affected within time period.

Scale:
- Reach is always for a fixed period (quarter, half-year)
- B2B SaaS: count accounts or teams, not raw seats (usually)
- Precise metric: «150 accounts per quarter» > «many customers»

✅ Good: «120 accounts using current flow / quarter»  
❌ Bad: «A lot of teams» (unmeasured)

### Step 2 — Impact

How much value will it create for each affected user?

Scale (fixed by Intercom originator):
- **3** = Massive impact
- **2** = High
- **1** = Medium
- **0.5** = Low
- **0.25** = Minimal

Attach metric hypothesis: «+15% activation» → medium-high Impact.

### Step 3 — Confidence

How confident are we in reach × impact?

Scale:
- **100%** — Strong evidence (A/B test data, similar feature launched)
- **80%** — Moderate evidence (customer interviews N ≥ 10, some data)
- **50%** — Low evidence (assumption-based, no direct data)

Below 50% → assumption-mapping first.

### Step 4 — Effort

Person-months (total across roles).

Decomposition:
- Engineering (senior + junior adjusted)
- Design
- PM time
- QA
- Data instrumentation
- Post-launch support

Round to quarters (0.25 / 0.5 / 1 / 2 person-months).

### Step 5 — Calculate

```
RICE = (Reach × Impact × Confidence) / Effort
```

Example:
- Reach: 120 accounts
- Impact: 2 (High)
- Confidence: 80%
- Effort: 3 person-months

RICE = (120 × 2 × 0.8) / 3 = **64**

### Step 6 — Rank

Sort initiatives by RICE. Top items are candidates for Now.

### Step 7 — Sanity Check

Top 5 from RICE — reasonable?

Common red flags:
- «Tiny effort, massive reach» — check if effort was underestimated
- Confidence 100% without evidence — over-confident
- Reach > total customer base — math error
- Initiatives with radically different sizes competing — split or bucket

### Step 8 — Adjust with Kano + Strategy Fit

RICE — pure math. Add:
- Kano must-have: boost (×1.5)
- Kano indifferent: kill (×0)
- Strategic fit (aligned with theme): +20% boost
- Out of theme: reduce (×0.5)

Final = RICE × adjustments.

### Step 9 — Document Rationale

For each score — 1-line rationale. Future you (and team) needs to understand where the numbers came from.

## Validation (Quality Gate)

- [ ] Each initiative has numeric Reach (not «a lot»)
- [ ] Impact on fixed Intercom scale
- [ ] Confidence is honest — evidence stated
- [ ] Effort includes ALL roles, not only eng
- [ ] Math verified (no errors)
- [ ] Sanity check passed
- [ ] Kano + theme fit applied
- [ ] Rationale documented per score

## Handoff

The result is input for:
- **`product-roadmap`** — scored list → Now/Next/Later
- **`wsjf-scoring`** — alternative method for enterprise context
- **PM** → PRD decisions
- **Mediator** (Full B) — evidence for Build/Cut debate

Format: scored backlog table, top items with rationale. Via `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|-------------------|
| Reach = total customers | Inflates score | Only affected within period |
| Impact without metric | Subjective | Attach numeric hypothesis |
| Confidence 100% always | Over-confident | Evidence per level |
| Effort = only engineering | Under-estimates | Include all roles |
| No adjustments | Ignores strategy / Kano | Apply multipliers |
| Scoring ≠ discussion | RICE = start, not end | Top items → discussion |

## Template

```markdown
# RICE Scoring — Q2 2026 Backlog

| # | Initiative | Reach | Impact | Confidence | Effort (pm) | RICE | Adj. | Final | Rationale |
|---|------------|:-----:|:------:|:----------:|:-----------:|:----:|:----:|:-----:|-----------|
| 1 | In-app checklist | 300 | 2 | 80% | 2 | 240 | +20% (theme) | 288 | «300 acct/q × 80% conf from 5 pilots» |
| 2 | Custom branding | 180 | 1 | 50% | 3 | 30 | ×0 (indifferent) | 0 | «Low signal» |

## Top 5 Recommended (Now)
...

## Adjustments Applied
- Kano must-have: ×1.5
- Theme-aligned: +20%
- Indifferent: ×0
```

## Worked Example — TeamFlow Q2 Backlog RICE Scoring

**Context:** TeamFlow. After Kano classification (18 features across 3 segments) the team scores initiatives for Q2 implementation. Period: one quarter (13 weeks). Baseline RICE + Kano adjustments + theme fit.

### Backlog Scoring (Top 18 items)

| # | Initiative | Reach (accts / quarter) | Impact | Confidence | Effort (pm) | RICE | Kano Adj | Theme Adj | **Final** | Rationale |
|---|------------|:----------------------:|:------:|:----------:|:-----------:|:----:|:--------:|:---------:|:---------:|-----------|
| 1 | AI Summary (core) | 200 (base) | 3 (Massive) | 80% (wizard-of-oz validated) | 3 | **160** | Performance ×1.0 | Theme1 +20% | **192** | «Core AI feature, strong discovery evidence, engineering validated» |
| 2 | Auto Action Items Extraction | 200 | 2 | 80% | 1.5 | **213** | Performance ×1.0 | Theme1 +20% | **256** | «Highest RICE — high reach, low effort as extension of AI summary» |
| 3 | Action Items Reminders | 200 | 2 | 90% (rule-based, no AI) | 0.5 | **720** | Must (enterprise) ×1.5 | Theme1 +20% | **1296** | «Quick win — minimal effort, already-built notification stack» |
| 4 | Per-Meeting AI Toggle | 200 | 1 | 100% | 0.5 | **400** | Must ×1.5 | Theme3 +20% | **720** | «Privacy must-have, simple UI» |
| 5 | Data Retention Controls | 200 | 1 | 100% | 1 | **200** | Must ×1.5 | Theme3 +20% | **360** | «Must-have for compliance» |
| 6 | Inline Summary Edit | 200 | 1 | 100% | 0.5 | **400** | Must ×1.5 | Theme1 +20% | **720** | «Must-have, simple UX» |
| 7 | Aggregate Dashboard MVP | 80 (mid+ accts) | 3 | 70% (design partners ready) | 3 | **56** | Performance ×1.0 | Theme2 +20% | **67** | «Enterprise tier enabler» |
| 8 | Manager Health Score | 80 | 2 | 60% (formula unclear) | 4 | **24** | Performance (ent) ×1.0 | Theme2 +20% | **29** | «Needs assumption validation» |
| 9 | Quarterly Exec Report Generator | 80 | 2 | 80% | 2 | **64** | Must (mid+) ×1.5 | Theme2 +20% | **115** | «VP HR reporting need» |
| 10 | SSO SAML | 27 (enterprise) | 3 | 100% | 1 | **81** | Must (ent) ×1.5 | Theme2 +20% | **146** | «Enterprise contract blocker» |
| 11 | Audit Log Enhancements | 27 | 2 | 100% | 1.5 | **36** | Must (ent) ×1.5 | Theme3 +20% | **65** | «SOC 2 compliance» |
| 12 | Calendar Integration v2 | 150 (mid+) | 2 | 90% | 2 | **135** | Must (mid+) ×1.5 | Theme1 +20% | **243** | «Unblocker for mid-market adoption» |
| 13 | Slack Notifications | 150 | 1 | 90% | 0.5 | **270** | Delighter ×1.3 | Theme1 +20% | **421** | «Delighter in SMB + mid, quick build» |
| 14 | Zoom/Meet Import | 70 (mid) | 1 | 60% (integration risk) | 3 | **14** | Delighter (mid) ×1.3 | — | **18** | «Low RICE, defer to Q3» |
| 15 | AI Discussion Prompts | 120 (SMB primary) | 1 | 50% (novelty — adoption unclear) | 1 | **60** | Delighter (SMB) ×1.3 | Theme1 +10% | **86** | «SMB delighter» |
| 16 | Meeting Templates | 120 | 1 | 80% | 1 | **96** | Delighter (SMB) ×1.3 | Theme1 +10% | **137** | «SMB onboarding aid» |
| 17 | Sentiment Tracking | 0 (Reverse in SMB!) | 0 | 100% | 2 | **0** | Reverse ×0 | — | **0** | «❌ CUT — Reverse signal in Kano» |
| 18 | Real-time Transcription | 150 (mid+) | 2 | 75% | 4 | **56** | Performance ×1.0 | Theme1 +20% | **68** | «High effort, consider in Q3» |

### Sanity Check Observations

1. **Item 3 (Action Items Reminders) RICE is highest** — smells suspicious initially. But rationale holds: very low effort (0.5 pm = 2 weeks), large reach, high confidence (rule-based, no AI uncertainty). Green light as Q2 quick-win.
2. **Item 17 (Sentiment Tracking) killed** by Kano Reverse multiplier — would have shipped in naive RICE-only view (baseline 60). Kano integration saved this.
3. **Item 8 (Manager Health Score) low** due to confidence penalty — formula unclear. Triggers decision: **spike** 1 week to define formula, THEN re-score.
4. **Item 14 (Zoom/Meet) deferred** — low absolute RICE, high integration risk.

### Top 10 Recommended for Now (sorted by Final)

1. **Action Items Reminders** (1296) — P0 quick win
2. **Auto Action Items Extraction** (256) — P0 core
3. **Calendar Integration v2** (243) — P0 mid-market enabler
4. **AI Summary core** (192) — P0 flagship
5. **Per-Meeting AI Toggle** (720) — P0 privacy must
6. **Inline Summary Edit** (720) — P0 UX must
7. **Data Retention Controls** (360) — P0 compliance
8. **Slack Notifications** (421) — P1 SMB delighter
9. **Data Retention Controls** — also P0 compliance
10. **SSO SAML** (146) — P0 enterprise unblocker

### Effort Total (Top 10)

**Must-haves (P0):** 14.5 person-months  
**Should-haves + Delighters:** 1.5 person-months  
**Total Now bucket:** 16 person-months in 13-week quarter = ~5 engineers fully allocated. Matches team capacity (8 eng) with 3 reserved for Theme 2 + 3.

### Deferred to Q3

- Real-time Transcription (item 18) — too high effort for Q2, queued for Q3 when AI infra stabilized
- Zoom/Meet Import (item 14) — dependent on integration platform work

> **RICE lesson:** Kano multipliers **changed the order** — without them Sentiment Tracking would have shipped. Theme fit bonus concentrated work in 3 strategic themes — avoided scattered backlog. Confidence penalty on Item 8 (Manager Health Score) prevented commitment without formula validation — converted to spike first. Scoring — discussion starter; top 10 is a commitment after alignment, not algorithm output.
