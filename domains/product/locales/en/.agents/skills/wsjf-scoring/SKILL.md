---
name: wsjf-scoring
description: Weighted Shortest Job First — SAFe-style prioritization for enterprise B2B (cost of delay / job size)
---
# WSJF Scoring

> **Category:** Prioritization  ·  **Slug:** `wsjf-scoring`

## When to Use

- Enterprise B2B context with large initiatives and long cycles.
- When RICE is insufficient due to time-sensitivity / opportunity cost.
- In SAFe (Scaled Agile) environments — standard for portfolio/ART planning.
- When you need to explicitly surface **cost of delay**.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Epic / initiative list | ✅ | Large items, 1+ sprint |
| Business value data | ✅ | Revenue, retention impact |
| Time criticality factors | ✅ | Deadlines, market windows |
| Risk reduction opportunity | ✅ | Unknowns resolved |
| Job size estimate | ✅ | Relative sizing (T-shirt or points) |

## Data Sources

1. Financial projections — business value component.
2. Market analysis — time criticality.
3. Risk register — RR/OE factor.
4. Engineering estimates — job size.

### Related Skills

| Skill | What we take | When to invoke |
|-------|-------------|----------------|
| `rice-scoring` | Alternative method | Choose one for consistency |
| `epic-breakdown` | Job size estimation | Before WSJF |
| `product-roadmap` | Scored list → theme assignment | After WSJF |

## Formula

```
WSJF = Cost of Delay / Job Size

Cost of Delay (CoD) = User-Business Value + Time Criticality + Risk Reduction / Opportunity Enablement
```

Three CoD components (scale 1-10 Fibonacci: 1, 2, 3, 5, 8, 13, 20):
- **User-Business Value (UBV):** value to users/business if delivered now
- **Time Criticality (TC):** value lost with each week of delay
- **Risk Reduction / Opportunity Enablement (RR/OE):** risk mitigation + future opportunities enabled

Job Size — relative (also 1-20 Fibonacci).

## Protocol

### Step 0 — Identify Epic-level Items

WSJF works at **epic-level**, not stories. If items are too small — aggregate.

### Step 1 — User-Business Value (UBV)

Questions:
- How much revenue uplift?
- How many customers retained / expanded?
- How strategic is it?

Scale:
- **1-2** — Minimal impact
- **3-5** — Moderate
- **8-13** — High
- **20** — Transformational

B2B SaaS typical:
- Enterprise feature unlocking Fortune 500 deals: 13-20
- SMB onboarding improvement: 5-8
- UX polish: 2-3

### Step 2 — Time Criticality (TC)

Questions:
- Is there a hard deadline (regulatory, customer contract)?
- Does a window of opportunity close?
- What is the damage per week of delay?

Scale:
- **1-2** — No deadline, no decay
- **3-5** — Some time pressure
- **8-13** — Hard deadline within quarter
- **20** — Existential / immediate

### Step 3 — Risk Reduction / Opportunity Enablement (RR/OE)

Questions:
- Does it solve a critical architectural risk?
- Does it unlock future initiatives (platform play)?
- Does it reduce technical debt blocking other work?

Scale:
- **1-2** — Standalone, no downstream
- **3-5** — Enables 1-2 future items
- **8-13** — Unlocks major platform capability
- **20** — Foundational

### Step 4 — Job Size

Relative estimation by Fibonacci. If smallest epic = 1, others are relative.

Factors:
- Engineering effort
- Design complexity
- Integration touches
- Testing scope
- Deployment complexity

Not precise estimates — relative sizing.

### Step 5 — Calculate WSJF

```
CoD = UBV + TC + RR/OE
WSJF = CoD / Job Size
```

Higher WSJF = higher priority.

Example:
- Epic: SSO SAML implementation
- UBV: 13 (unlocks enterprise tier)
- TC: 8 (2 deals waiting)
- RR/OE: 5 (unlocks SCIM in next quarter)
- Job Size: 8 (medium-large)
- WSJF = (13 + 8 + 5) / 8 = **3.25**

### Step 6 — Rank

Sort by WSJF descending. Top items first.

### Step 7 — Sanity Check

- Top item — is it genuinely highest priority?
- Bottom item — really lowest?
- Job Size relative consistency — 13-sized item actually ~6× larger than 2-sized?

### Step 8 — Portfolio View

For portfolio of 20+ epics:
- Visualize on 2D: CoD (y-axis) × Job Size (x-axis)
- Diagonal from top-left = higher WSJF
- Discuss outliers: why large jobs with low CoD?

## Validation (Quality Gate)

- [ ] Epic-level items (not stories)
- [ ] Each component (UBV, TC, RR/OE) scored with rationale
- [ ] Fibonacci scale applied consistently
- [ ] Job Size relative, not absolute time
- [ ] Sanity check — top/bottom make sense
- [ ] Portfolio view created if >10 items
- [ ] Scoring session included cross-functional stakeholders (eng + biz + security)

## Handoff

The result is input for:
- **`product-roadmap`** — scored epics → PI planning (if SAFe)
- **`epic-breakdown`** — top epics → stories
- **Tech Lead** → capacity allocation
- **PM** → quarter planning

Format: WSJF table + 2D portfolio view. Via `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|-------------------|
| Precise job size estimates | False precision | Fibonacci relative |
| All items scored same | Not discriminating | Spread across scale |
| Skip RR/OE | Miss platform plays | Score all three CoD |
| No rationale | Scores look arbitrary | 1-line per score |
| Solo scoring | Lost perspectives | Cross-functional session |
| WSJF for tiny items | Overkill | Use for epics (>sprint) |

## Template

```markdown
# WSJF Portfolio — Q2 2026

## Scoring Legend
Scale: 1, 2, 3, 5, 8, 13, 20 (Fibonacci)
- UBV: User-Business Value
- TC: Time Criticality
- RR/OE: Risk Reduction / Opportunity Enablement

## Epic Scores

| # | Epic | UBV | TC | RR/OE | CoD | Job Size | WSJF | Rationale |
|---|------|:---:|:--:|:-----:|:---:|:--------:|:----:|-----------|
| 1 | SSO SAML | 13 | 8 | 5 | 26 | 8 | 3.25 | «2 enterprise deals waiting» |
| 2 | Mobile app | 8 | 3 | 2 | 13 | 20 | 0.65 | «Large effort, low urgency» |

## Top 5 (Rank by WSJF)
1. [Epic 1] — WSJF 3.25
...

## Portfolio 2D (CoD × Job Size)
[Placeholder for chart]
```

## Worked Example — TeamFlow Enterprise Epic Portfolio WSJF

**Context:** TeamFlow — 10 enterprise customers (500+ employee accounts), 8 in active expansion negotiation. WSJF applied at epic-level portfolio Q2-Q3 2026. SAFe-adjacent process: quarterly Program Increment planning.

### Epic Portfolio (9 epics, SAFe PI Planning session)

| # | Epic | Business Context | UBV | TC | RR/OE | CoD | Job Size | **WSJF** |
|---|------|------------------|:---:|:--:|:-----:|:---:|:--------:|:--------:|
| 1 | **SSO SAML + SCIM Provisioning** | 2 enterprise deals waiting ($800K ARR), 3 more in Q3 pipeline | 13 | 13 | 5 | 31 | 5 | **6.20** |
| 2 | **SOC 2 Type II for AI features** | Compliance gate for 4 Enterprise deals + existing customer renewals | 13 | 8 | 3 | 24 | 8 | **3.00** |
| 3 | **AI Summarization (Core MVP)** | Flagship feature, category positioning | 13 | 5 | 5 | 23 | 13 | **1.77** |
| 4 | **Aggregate Dashboard (Enterprise tier)** | Unlocks Enterprise tier pricing ($15+ seat), 80 mid+ accounts | 8 | 5 | 8 | 21 | 8 | **2.63** |
| 5 | **Data Residency (EU + APAC regions)** | 2 EU enterprise blocked by data residency; APAC prospect | 8 | 5 | 5 | 18 | 13 | **1.38** |
| 6 | **Zoom/Meet Native Integration** | Competitive parity (Lattice shipped Q4 2025) | 5 | 3 | 3 | 11 | 13 | **0.85** |
| 7 | **Audit Log API** | Enterprise SIEM integration — nice-to-have, deal enhancer | 5 | 3 | 3 | 11 | 5 | **2.20** |
| 8 | **Mobile App (iOS + Android)** | Managers want mobile review; not blocking deals | 5 | 2 | 2 | 9 | 20 | **0.45** |
| 9 | **HIPAA Attestation for Healthcare segment** | 1 prospect in healthcare vertical | 3 | 3 | 2 | 8 | 13 | **0.62** |

### Scoring Rationale (per component)

**Epic 1 — SSO SAML + SCIM (WSJF 6.20):**
- **UBV 13:** 2 deals × $400K avg = $800K immediate + multiplier effect on Q3 pipeline
- **TC 13:** Deals close quarterly — delay 1 quarter = lose deals to competitor
- **RR/OE 5:** Unlocks enterprise sales motion (future deals easier)
- **Job Size 5:** Moderate — SCIM complex but SAML standardized

**Epic 2 — SOC 2 Type II (WSJF 3.00):**
- **UBV 13:** 4 Enterprise deals + renewal protection (~$1.5M combined)
- **TC 8:** 6-month audit cycle — must complete for Q4 renewal wave
- **RR/OE 3:** One-time certification, doesn't unlock future ones
- **Job Size 8:** Significant — SOC 2 requires audit firm engagement + documentation + attestation

**Epic 3 — AI Summarization Core (WSJF 1.77):**
- **UBV 13:** Transformational — category play
- **TC 5:** Competitors may launch parallel AI, but 6-month window exists
- **RR/OE 5:** Unlocks AI tier pricing + future AI initiatives (platform investment)
- **Job Size 13:** Large — 6-8 engineers × 3 months + ongoing

**Epic 4 — Aggregate Dashboard (WSJF 2.63):**
- **UBV 8:** Strong — Enterprise tier unlock
- **TC 5:** Seasonality — Board review cycles in Q2 + Q4
- **RR/OE 8:** Unlocks all future People Ops analytics features (huge downstream value)
- **Job Size 8:** Medium-large

**Epic 8 — Mobile App (WSJF 0.45):**
- **UBV 5:** Marginal — managers workflow primarily desktop
- **TC 2:** No hard deadline, no lost deals attributed
- **RR/OE 2:** Standalone, minimal platform leverage
- **Job Size 20:** Massive — 2 platforms, 2 teams, likely 6+ months

### Ranked Portfolio (by WSJF)

1. **SSO SAML + SCIM** (6.20) — ship Q2 sprint 1-2 (2 weeks)
2. **SOC 2 Type II** (3.00) — parallel track, Q2 end target
3. **Aggregate Dashboard** (2.63) — Q2 sprint 3-6
4. **Audit Log API** (2.20) — Q2 Q3 sprint 7-8 quick win
5. **AI Summarization Core** (1.77) — Q2 sprint 3-8 (biggest epic but lower WSJF)
6. **Data Residency EU** (1.38) — Q3 priority
7. **Zoom/Meet Integration** (0.85) — Q3-Q4 (competitive parity not burning)
8. **HIPAA Attestation** (0.62) — Q4 (1 customer waiting, low revenue impact)
9. **Mobile App** (0.45) — **DEFER, reconsider next PI**

### 2D Portfolio View (CoD × Job Size)

```
CoD (y)
 31  │ Epic 1 ★       
 24  │         Epic 2 ★
 23  │             Epic 3 (large)
 21  │         Epic 4 ★
 18  │                         Epic 5
 11  │ Epic 7 (small)    Epic 6
  9  │                                 Epic 8 (huge)
  8  │                         Epic 9
     └─────────────────────────────────────────
       5       8       13              20   Job Size (x)

★ = top-left quadrant (high CoD, smaller job = high WSJF priority)
```

### Insight from Portfolio View

- **Top-left cluster** (Epics 1, 2, 4, 7): high CoD + manageable size = **PI priority**
- **Epic 3 (AI Summarization)** is odd-one-out: high CoD but largest job size. Need to **decompose** into sub-epics to manage better (done in `$epic-breakdown`).
- **Epic 8 (Mobile)** bottom-right: huge job, marginal CoD → **defer**. Re-evaluate next PI if customer feedback elevates.
- **Portfolio balance:** 4 high-WSJF items fit in Q2 capacity with AI decomposition.

### Decomposition Trigger (Epic 3)

Epic 3 «AI Summarization Core» has WSJF 1.77 due to job size penalty. **Decompose in `$epic-breakdown`**:
- Sub-epic A: Transcription infrastructure (shared platform) — medium, CoD via RR/OE
- Sub-epic B: Summary generation pipeline — small-medium, CoD via UBV
- Sub-epic C: Manager review UI — small, CoD via usability
- Each sub-epic gets own WSJF rescoring — likely higher than parent due to better size ratio

### PI Commitment (Q2)

| Epic | Assignment | Teams | PI Objectives |
|------|------------|-------|---------------|
| Epic 1 | Committed | Platform + Security | «SSO live by Sprint 2» |
| Epic 2 | Committed | Security + Compliance | «SOC 2 attestation by Sprint 12» |
| Epic 3 (decomposed) | Committed | AI team | «MVP summarization shipped by Sprint 8» |
| Epic 4 | Committed | Analytics + Eng | «Dashboard beta by Sprint 10» |
| Epic 7 | Stretch | Platform | «Audit API if capacity» |

> **WSJF lesson:** Mobile App (Epic 8) WSJF 0.45 was **controversial** initially — loud customer voices «we need mobile». WSJF forced accounting: $20 pm effort for marginal CoD = **terrible ratio**. Deferring saved 20 pm for higher-impact work. AI Summarization (Epic 3) WSJF 1.77 — counterintuitively NOT highest — but this is an artifact of large job size. **Decomposition** fixes this: sub-epics score much higher individually. WSJF doesn't work on monolithic giant epics — decompose first.
