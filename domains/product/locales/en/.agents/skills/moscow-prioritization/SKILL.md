---
name: moscow-prioritization
description: Prioritization by Must / Should / Could / Won't — for coarse scope cuts
---
# MoSCoW Prioritization

> **Category:** Prioritization  ·  **Slug:** `moscow-prioritization`

## When to Use

- When release scoping — what is the minimum viable set?
- In Cut-Camp (`/shape-prioritize`) — as the primary tool.
- For stakeholder communication — simple language about scope.
- In time-boxed projects (hard deadline) — what to cut first.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Feature list / requirements | ✅ | What is in consideration |
| Release goal | ✅ | What counts as «successful release» |
| Time box | ✅ | Deadline / sprint count |
| Capacity estimate | ✅ | Team bandwidth |
| Camp (Full B) | ⬚ | alpha (Build) / beta (Cut) |

## Data Sources

1. `$rice-scoring` — quantitative base, MoSCoW on top.
2. `$kano-model` — must-haves automatically go to Must.
3. Customer commitments / SLA — contractual musts.
4. Compliance / security — non-negotiable musts.

### Related Skills

| Skill | What we take | When to invoke |
|-------|-------------|----------------|
| `rice-scoring` | Quantitative ranking | Before MoSCoW |
| `kano-model` | Must-haves | For Must bucket |
| `prd-template` | Out-of-scope section | After MoSCoW |
| `epic-breakdown` | Stories per bucket | After assignment |

## Four Buckets

| Bucket | Meaning | Rule |
|--------|---------|------|
| **Must have** | Release blocker. Without this — release failed. | Only ~60% capacity. Strict. |
| **Should have** | Important, but not a blocker. Cutting doesn't kill release. | ~20% capacity |
| **Could have** | Nice to have. If remaining time — do it. | ~20% capacity |
| **Won't have (this time)** | Out of scope, explicit. Possibly in next release. | Unlimited list |

## Protocol

### Step 0 — Camp Framing (Full B)

**Build-Camp:** presume most items as Must. Bar for moving to Should — high.

**Cut-Camp:** presume most items as Could / Won't. Bar for Must — very high («without this release will fail»).

Without adversarial — balanced.

### Step 1 — Raw List

Gather all features / requirements. Usually 15-40.

### Step 2 — Classification Rules

**Must have** criteria:
- Absence = release failure
- Legal / compliance / security requirement
- SLA or customer contract commitment
- Core user flow (without which product is unusable)
- Must-have from Kano analysis

**Should have** criteria:
- High value, but workaround exists
- Delays cause pain, but not failure
- «Day 2» features after core release

**Could have** criteria:
- Nice enhancements
- Small effort, low complexity
- Easy to defer

**Won't have (this time)** criteria:
- Explicit out-of-scope
- Requires prerequisite not done
- Low value vs effort
- Belongs in future release

### Step 3 — Capacity Allocation

Healthy distribution:
- Must: ~60% capacity
- Should: ~20%
- Could: ~20%
- Won't: unlimited

If Musts > 60% — too ambitious, move some to Should or negotiate timeline.

### Step 4 — Individual Assessment

For each feature:

| # | Feature | Bucket | Rationale | Dependent on? |
|---|---------|:------:|-----------|---------------|
| 1 | SSO via SAML | Must | Enterprise contract requirement | — |
| 2 | User profile avatar | Could | Nice, low impact | Profile feature |

### Step 5 — Must Challenge

Challenge session: team asks about each Must in pairs: **«Could we release without this?»**

If the answer is «annoying but yes» → move to Should.

Real Musts survive the challenge: «No, release would fail because X».

### Step 6 — Won't Documentation

«Won't have» — **explicit**, not implicit. Record:
- Why excluded now
- When might be considered
- Dependency / prerequisite

This prevents re-debates later.

### Step 7 — Stakeholder Review

Communicate:
- Musts → «will ship»
- Shoulds → «plan to ship, may slip»
- Coulds → «if time permits»
- Won'ts → «not this release, here's why»

## Validation (Quality Gate)

- [ ] All features assigned to one of 4 buckets
- [ ] Must capacity ≤ 60%
- [ ] Each Must passes «could we ship without?» challenge
- [ ] Should/Could have rationale
- [ ] Won't features documented with reason
- [ ] Capacity check: total estimated ≤ available
- [ ] Dependencies mapped

## Handoff

The output is the input for:
- **`prd-template`** → Must/Should in scope, Won't in out-of-scope
- **`epic-breakdown`** → stories per bucket
- **Tech Lead** → effort validation
- **Mediator** (Full B) — Cut camp evidence

Format: MoSCoW table with rationale. Via `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|---------------------|
| Everything is Must | Lost prioritization | Max 60% capacity Must |
| No Won't | Scope uncontrolled | Explicit Won't list |
| No rationale | Debates repeat | Every item has justification |
| MoSCoW once, never updated | Stale | Review at sprint boundaries |
| «Negotiating» up at Should | Scope creep | Challenge process |
| Vague buckets | Unclear scope | Strict definitions |

## Template

```markdown
# MoSCoW — [Release Name] / [Quarter]

## Release Goal
[What makes this release successful]

## Must Have (~60% capacity)
| # | Feature | Rationale | Effort |
| 1 | ... | Contract requirement | 2pm |

## Should Have (~20%)
...

## Could Have (~20%)
...

## Won't Have (This Release)
| # | Feature | Why not now | When considered |
| 1 | Mobile app | Web-first strategy | Q4 2026 |

## Capacity Summary
- Available: N person-weeks
- Must: X (Y%)
- Should: X (Y%)
- Could: X (Y%)
- Buffer: Z
```

## Worked Example — TeamFlow `/shape-prioritize` Build-Camp vs Cut-Camp

**Context:** TeamFlow. Strategy and vision approved (Mediator synthesis). Team uses Full Pipeline B for **AI Summarization MVP scope debate** — Build-Camp (α) vs Cut-Camp (β) adversarial scope battle. Output — Mediator synthesis.

### Build-Camp MoSCoW (PM-01α)

**Position:** Every idea is justified. Burden of proof — show it can be deferred. Result: inclusive tendency.

```markdown
# Build-Camp MoSCoW — AI Summarization MVP Q2 2026

## Release Goal
Ship «best-in-category» AI summarization MVP that managers can't live without.

## Must Have (~80% capacity)
| # | Feature | Rationale | Effort (pm) |
|---|---------|-----------|:-----------:|
| 1 | AI Summary (core transcribe + summarize) | Core promise of initiative | 3 |
| 2 | Auto action items extraction | JTBD F3 — action items dropped without this | 1.5 |
| 3 | Inline summary edit | Must-have per Kano, all segments | 0.5 |
| 4 | Per-meeting AI toggle | Privacy Must-have, Kano | 0.5 |
| 5 | Data retention controls | Compliance Must-have | 1 |
| 6 | Calendar integration | Must-have per Kano for mid-market+ | 2 |
| 7 | Action items reminders (rule-based) | Highest RICE, quick win | 0.5 |
| 8 | Real-time transcription | Enables AI summary + delighter SMB | 4 |
| 9 | Pre-1:1 prep card | Leverages summary data, high-value workflow | 2 |
| 10 | Manager dashboard (per-manager 1:1 health) | Visual reinforcement of usage | 2 |
| 11 | SSO SAML (enterprise unblocker) | 2 enterprise deals waiting | 1 |
| 12 | Audit log enhancements | SOC 2 compliance — blocking | 1.5 |

**Must total: 19.5 pm** (of 24 person-months capacity)

## Should Have (~15%)
| # | Feature | Rationale | Effort (pm) |
|---|---------|-----------|:-----------:|
| 13 | Slack notifications | SMB Delighter, low effort | 0.5 |
| 14 | Quarterly exec report generator | VP HR Must per Kano | 2 |

**Should total: 2.5 pm**

## Could Have (~5%)
| # | Feature | Rationale | Effort (pm) |
|---|---------|-----------|:-----------:|
| 15 | AI discussion prompts | SMB Delighter | 1 |
| 16 | Meeting templates | SMB Delighter | 1 |

**Could total: 2 pm**

## Won't Have (This Release)
| # | Feature | Why not now | When considered |
|---|---------|-------------|:---------------:|
| 1 | Zoom/Meet recording import | Integration risk, Q2 tight | Q3 2026 |
| 2 | Sentiment tracking | Kano Reverse in SMB | Not on roadmap |
| 3 | Mobile-only experience | Web-first, mobile responsive OK | Q4 2026 |

## Capacity Summary
- Available: 24 person-months (8 eng × 13 weeks ÷ 52 = technical capacity)
- Must: 19.5 (81%) ⚠️ over target, but «everything is justified»
- Should: 2.5 (10%)
- Could: 2 (8%)
- Buffer: 0 (basically none)

**Build-Camp Argument:** «Managers who adopt this feature halfway will churn. We need full MVP — prep card + dashboard alongside core — to make it sticky. Cutting scope = ships mediocre feature in a category where Lattice has a 6 month lead. Must go big.»
```

### Cut-Camp MoSCoW (PM-02β)

**Position:** Every idea is unnecessary until proven otherwise. Burden of proof — show why it is **required now**. Result: minimalist tendency.

```markdown
# Cut-Camp MoSCoW — AI Summarization MVP Q2 2026

## Release Goal
Ship **minimal viable** AI summarization — validate market want, protect quality, 
leave room for post-launch iteration.

## Must Have (~40% capacity)
| # | Feature | Rationale | Effort (pm) |
|---|---------|-----------|:-----------:|
| 1 | AI Summary (core only — transcribe + summarize) | THE feature. Without it there's nothing. | 3 |
| 2 | Inline summary edit | Trust rule — must let managers correct | 0.5 |
| 3 | Per-meeting AI toggle | Privacy — cannot ship without | 0.5 |
| 4 | Data retention controls (basic) | Compliance baseline | 1 |
| 5 | Calendar integration (basic pull only) | Without this managers can't find 1:1s in AI UI | 1 |
| 6 | SSO SAML | Enterprise contract blocker, 2 deals waiting | 1 |

**Must total: 7 pm** (of 24 person-months capacity)

## Should Have (~30%)
| # | Feature | Rationale | Effort (pm) |
|---|---------|-----------|:-----------:|
| 7 | Auto action items extraction | High value, but depends on AI summary quality, can wait 1 iteration | 1.5 |
| 8 | Action items reminders (rule-based) | Quick win, doesn't depend on AI | 0.5 |
| 9 | Audit log enhancements | Needed for SOC 2 Type II, but 4 weeks leeway before audit | 1.5 |

**Should total: 3.5 pm**

## Could Have (~10%)
| # | Feature | Rationale | Effort (pm) |
|---|---------|-----------|:-----------:|
| 10 | Slack notifications | Delighter, trivial effort | 0.5 |
| 11 | Quarterly exec report generator | Useful but not blocking adoption | 2 |

**Could total: 2.5 pm**

## Won't Have (This Release)
| # | Feature | Why not now | When considered |
|---|---------|-------------|:---------------:|
| 1 | **Real-time transcription** | HIGH RISK: 4pm effort, can delay launch. Ship post-meeting summary first, live later. | Q3 2026 after MVP learnings |
| 2 | **Pre-1:1 prep card** | Depends on multi-meeting data — won't have enough until post-MVP | Q3 2026 |
| 3 | **Per-manager dashboard** | Duplicates aggregate dashboard (Theme 2) — scope collision | Post-MVP |
| 4 | **AI discussion prompts** | Delighter, defer to post-validation | Q4 2026 |
| 5 | **Meeting templates** | Adjacent feature, different team scope | Post-MVP |
| 6 | Zoom/Meet import | Integration complexity | Q4 2026 |
| 7 | Sentiment tracking | Kano Reverse | ❌ Never |

## Capacity Summary
- Available: 24 person-months
- Must: 7 (29%) 
- Should: 3.5 (15%)
- Could: 2.5 (10%)
- **Buffer: 11 pm (46%)** — allows quality investment, bug bash, beta iteration

**Cut-Camp Argument:** «Real-time transcription adds 4 pm effort and 50% delivery risk. Ship post-meeting summary first (still solves JTBD F1 + F2), validate with customers, then add real-time in Q3. Pre-1:1 prep card needs multi-meeting data — MVP doesn't have enough context. Per-manager dashboard duplicates Theme 2 aggregate dashboard — scope collision not resolved. 11pm buffer = 46% — even Build-Camp acknowledges quality needs headroom, we build it into the plan.»
```

### Mediator Synthesis (MED-01)

**Evidence audit:**
- Build-Camp evidence: 3/5. Strong on user value, weak on delivery confidence (81% Must capacity = over-commitment)
- Cut-Camp evidence: 4/5. Strong on risk argument, but Should items 7, 8 look bordering-Must for launch success

**Synthesis decision — Hybrid:**

```markdown
# Unified Scope Decision — AI Summarization MVP Q2 2026

## Adopted (from Cut-Camp baseline + select Build-Camp adds)

### Must Have (~60% capacity)
| # | Feature | Effort | Source camp |
|---|---------|:------:|:-----------:|
| 1 | AI Summary (core) | 3 | Both |
| 2 | Inline summary edit | 0.5 | Both |
| 3 | Per-meeting AI toggle | 0.5 | Both |
| 4 | Data retention controls | 1 | Both |
| 5 | Calendar integration | 2 | Build (upgrade from Cut's basic) |
| 6 | SSO SAML | 1 | Both |
| 7 | Auto action items extraction | 1.5 | Build (promoted from Cut's Should) |
| 8 | Action items reminders | 0.5 | Both |
| 9 | Audit log enhancements | 1.5 | Cut (Should → promoted to Must per compliance deadline) |
| 10 | Manager inline edit | 0.5 | Both |

**Must total: 12 pm (50% — within healthy target)**

### Should Have
| Feature | Rationale |
|---------|-----------|
| Slack notifications | SMB delighter quick win |
| Quarterly exec report generator | VP HR value (Theme 2 anchor) |

### Could Have
| Feature | Rationale |
|---------|-----------|
| AI discussion prompts | SMB delighter if time |
| Meeting templates | SMB delighter if time |

### Won't Have
| Feature | Why |
|---------|-----|
| **Real-time transcription** | **Cut-Camp wins this battle** — ship post-meeting MVP first, prove adoption, add real-time in Q3. Evidence: 4 pm effort + 50% risk of launch delay. |
| **Pre-1:1 prep card** | Cut-Camp wins — needs multi-meeting data not available in MVP. Q3 addition. |
| **Per-manager dashboard** | Scope collision with Theme 2 — consolidate post-MVP. |
| Zoom/Meet import | Q3-Q4 as Kano Delighter |
| Sentiment tracking | ❌ Kano Reverse |

## Capacity Summary
- Available: 24 pm
- Must: 12 (50%) ✅
- Should: 2.5 (10%)
- Could: 2 (8%)
- **Buffer: 7.5 pm (32%)** — room for quality + emergent work

## Rationale for Hybrid
- Cut-Camp correctly identified **real-time transcription as highest-risk Must** — demote to Q3 saves ship-risk
- Cut-Camp correctly identified **per-manager dashboard scope collision** — Theme 2 handles this
- Build-Camp correctly identified **action items extraction is near-Must** — demoting creates «why have AI summary without action items?» confusion
- Build-Camp correctly identified **calendar integration must go beyond basic** — mid-market expectations
- **Buffer 32%** respects Cut-Camp's quality concern while shipping meaningful MVP

## Open risks
- Action items extraction depends on AI summary quality reaching threshold — spike in Week 2 to validate before commit
- Q3 addition of real-time transcription must be planned now (infra)

## Sign-off required from: CTO (capacity), CPO (feature scope), VP Sales (enterprise readiness)
```

> **MoSCoW adversarial lesson:** Build-Camp's Must = 81% capacity = **delivery risk**. Cut-Camp's Must = 29% = **feature anemia**. Mediator landed at 50% — **goldilocks zone**. Neither camp's argument was «wrong» — each was optimizing for a different failure mode. Structured debate forced explicit trade-offs instead of team compromising in private channels. Final Must list can be traced per-feature to which camp owned the decision, preserving accountability.
