---
name: epic-breakdown
description: Epic decomposition into stories with dependencies, size estimates (S/M/L/XL), critical path
---
# Epic Breakdown

> **Category:** Specification  ·  **Slug:** `epic-breakdown`

## When to Use

- After epic approval (via RICE / WSJF) — before sprint planning.
- When estimating capacity for roadmap planning.
- For identifying critical path and parallelizable work.
- Pre-kickoff: the team needs to know the decomposition.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Epic spec (from PRD) | ✅ | Scope + success criteria |
| Existing architecture | ✅ | What already exists |
| Team composition | ✅ | Senior/mid/junior, roles |
| Dependencies / integrations | ⬚ | External systems |
| Constraints | ⬚ | Deadlines, compliance |

## Data Sources

1. PRD via `$prd-template`.
2. Tech review from Tech Lead.
3. Existing codebase / architecture docs.
4. Historical velocity data.

### Related Skills

| Skill | What we take | When to call |
|-------|-------------|--------------|
| `prd-template` | Epic scope | Parent |
| `user-story` | Story-level granularity | After breakdown |
| `acceptance-criteria` | Done criteria | Per story |
| `wsjf-scoring` | Epic-level priority | Before breakdown |

## Structure

```
Epic (1-2 quarters scale)
  ├── Story 1 (1-8 points, in-sprint)
  ├── Story 2
  ├── Story 3
  └── Story N
      ↓
  + Technical Tasks (non-user-facing, e.g. infra)
  + Spikes (research / POC)
```

Sizing:
- **Epic:** weeks to months (>13 points equivalent)
- **Story:** 1-8 points (fits in sprint)
- **Task:** < 1 day
- **Spike:** time-boxed research (usually 1-3 days)

## Protocol

### Step 0 — Epic Clarity

- [ ] Epic outcome defined (what does "done" look like)?
- [ ] Success metrics attached?
- [ ] Scope explicit (in + out)?

If not — return to PRD.

### Step 1 — Vertical Slicing

**Vertical slices** (user-facing, deliver value incrementally) **>** horizontal (layers: DB → backend → frontend → UI).

Each story — a thin vertical slice, from UI to storage.

Example for "Team Role Templates" epic:
- ❌ Horizontal: Story 1 "DB schema", Story 2 "Backend API", Story 3 "Frontend" (nothing ships until all done)
- ✅ Vertical: Story 1 "Create template (basic fields)", Story 2 "Edit template", Story 3 "Delete template", Story 4 "Assign template to new member"

### Step 2 — Splitting Techniques

If a story is too big:
- **Workflow steps:** multi-step flow → story per step
- **Data variations:** user type / region / locale
- **Alternate paths:** happy path story + error cases story
- **Acceptance criteria:** pull one AC out as a separate story
- **Roles:** end-user story + admin story (separate)
- **Simple/Complex:** basic version + advanced options

### Step 3 — Add Technical Tasks

**Pure technical work** without user-visible value:
- Infrastructure setup
- DB migrations (if no user-facing story covers it)
- Observability instrumentation
- Tests / fixtures

Keep separate from stories — do not inflate user stories.

### Step 4 — Identify Spikes

If high uncertainty — spike (time-boxed research):
- Architecture decision (new tech evaluation)
- Performance problem exploration
- Integration feasibility check

Output: ADR (architecture decision record) or POC code, not a shipping feature.

### Step 5 — Dependency Mapping

For each story — **depends on** / **enables**:

| Story | Depends On | Enables | Can parallelize with |
|-------|------------|---------|----------------------|
| S1: Template CRUD | — | S2, S4 | S5 (auth) |
| S2: Permissions config | S1 | S3 | S5 |
| S3: Assign to members | S1, S2 | — | — |

### Step 6 — Critical Path

Identify critical path — longest sequence of dependent stories.

```
S1 → S2 → S3 = critical path
S5 (auth) parallel
S4 (migration) parallel
```

Length of critical path = minimum elapsed time for epic.

### Step 7 — Sizing per Story

T-shirt / Story Points:
- **XS/1:** < 1 day
- **S/2:** 1-2 days
- **M/3:** 2-4 days
- **L/5-8:** 1+ week
- **XL/13+:** SPLIT (too big for sprint)

Ensure no XL remains after breakdown.

### Step 8 — Team Role Assignment

Per story — who's involved?
- Frontend + Backend + DB (full-stack slice)
- Design needed?
- Data / analytics involvement?
- Security review needed?
- QA time?

### Step 9 — Sprint Planning Input

Output: epic breakdown doc:
- Epic summary + success criteria
- Stories list with size + dependencies
- Critical path visualization
- Technical tasks
- Spikes
- Estimated total effort
- Timeline estimate

### Step 10 — Validation Checkpoint

Team review (PM + Eng Lead + Design):
- Missing stories?
- Mis-sized?
- Dependencies correct?
- Parallelizable work maximized?

## Validation (Quality Gate)

- [ ] Epic outcome + success metrics explicit
- [ ] Stories vertical slices (each delivers value)
- [ ] No XL stories (all split to ≤ 8 pts)
- [ ] Technical tasks separated from stories
- [ ] Spikes time-boxed
- [ ] Dependencies mapped
- [ ] Critical path identified
- [ ] Parallelizable work explicit
- [ ] Team capacity check (total effort vs capacity)
- [ ] Stakeholder review passed

## Handoff

The result is the input for:
- **Sprint Planning** — stories → sprints
- **`user-story`** + **`acceptance-criteria`** for each story
- **Tech Lead** → technical tasks ownership
- **PM** → roadmap timeline refinement

Format: epic breakdown doc (markdown + dependency graph). Via `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|-------------------|
| Horizontal slicing | Nothing ships until layers done | Vertical thin slices |
| XL stories | Does not fit in sprint | Split using techniques |
| No spike for unknowns | Mis-estimated stories | Time-boxed spike |
| Technical tasks inflate stories | Mis-sized | Separate track |
| Ignore dependencies | Parallel work blocked | Explicit DAG |
| Skip validation review | Missing stories discovered mid-sprint | Team review pre-kickoff |

## Template

```markdown
# Epic Breakdown: [Epic Name]

## Epic Summary
- Outcome: [what done looks like]
- Success metric: [X from baseline to target]
- Scope: [in scope]
- Out of scope: [explicit]

## Stories (vertical slices)

| # | Story | Size | Depends on | Enables | Roles |
|---|-------|:----:|------------|---------|-------|
| S1 | [...] | M | — | S2, S3 | FE+BE+Design |
| S2 | [...] | S | S1 | S3 | BE |

## Technical Tasks
- T1: DB migration for [X] — 1 day
- T2: Observability instrumentation — 0.5 day

## Spikes
- SP1: Evaluate Redis vs Memcached caching — 2 days time-box

## Critical Path
S1 → S2 → S3 (total: ~2 weeks)
Parallel: T1 (DB migration), S5 (auth integration)

## Capacity Summary
- Total estimate: N person-weeks
- Team: M people × Y weeks = Available
- Buffer: ~20%

## Open Questions
- [Q, owner]
```

## Worked Example — TeamFlow Epic Breakdown: AI Summarization

**Context:** After WSJF the team decided to decompose Epic 3 "AI Summarization Core" (WSJF 1.77 — low due to job size). The decomposition cycle below turns the monolithic epic into vertical slices + technical tasks + spikes.

```markdown
# Epic Breakdown: AI Summarization Core

## Epic Summary
- **Outcome:** Managers using TeamFlow AI summarization weekly — Sticky Manager Ratio ≥20% by Day 90 post-launch
- **Success metric:** 65% adoption in AI-tier accounts, action items completion 60→75%
- **Scope:** Post-meeting AI summarization MVP (NOT real-time, NOT prep card — those are Q3)
- **Out of scope:** Real-time transcription, multi-meeting intelligence, external meeting integration

## Stories (vertical slices — each delivers value end-to-end)

| # | Story | Size | Depends on | Enables | Roles |
|---|-------|:----:|------------|---------|-------|
| S1 | Enable AI Summarization toggle per-meeting | S (2) | T1 (feature flag) | S2 | FE + BE |
| S2 | Generate AI summary from meeting recording | L (8) | S1, T2 (LLM API), T3 (audio pipeline) | S3, S4 | BE + AI + Data |
| S3 | Review and edit summary inline | M (5) | S2 | S6 (audit) | FE + Design + BE |
| S4 | Extract action items with confidence scoring | M (5) | S2 | S5 | AI + BE |
| S5 | Surface action items reminders before next 1:1 | S (3) | S4, T4 (notif infra) | — | BE + FE |
| S6 | Admin org-wide AI policy | S (3) | S1 | — | FE + BE |
| S7 | Export AI operations audit log | S (3) | S1, S2, S3, S6 | — | BE |

**Total story points:** 29. Velocity estimate: 4-5 points/week for AI team (4 eng). Duration: ~6-7 weeks.

## Technical Tasks (do not deliver user value alone, but are necessary)

| # | Task | Effort | Owner | Dependency |
|---|------|:------:|-------|-----------|
| T1 | Feature flag infrastructure (LaunchDarkly setup + wrapper) | 0.5 week | Platform | — (foundation) |
| T2 | LLM API abstraction layer (OpenAI + Anthropic failover) | 1.5 weeks | AI team | SP1 result |
| T3 | Audio ingestion pipeline (browser recording → storage) | 1 week | Platform | — |
| T4 | Notification scheduling service | 0.5 week | Platform | — (can reuse) |
| T5 | Summary data model + schema migration | 0.5 week | Backend | — |
| T6 | Observability instrumentation (OTEL events, dashboards) | 0.5 week | SRE + AI | T2 |
| T7 | SOC 2 Type II audit controls documentation | 1 week | Security + Legal | Parallel track |

**Technical task total:** ~5.5 weeks of parallel work.

## Spikes (time-boxed research)

| # | Spike | Time Box | Owner | Decision Needed |
|---|-------|:--------:|-------|-----------------|
| SP1 | LLM provider benchmark: OpenAI GPT-4 vs Anthropic Claude for HR conversation quality | 1 week | AI Lead | Which primary, which fallback |
| SP2 | Audio pipeline: browser MediaRecorder vs WebRTC vs third-party (Recall.ai) | 1 week | Platform Lead | Build vs buy decision |
| SP3 | Summary data storage: Postgres JSONB vs dedicated document store (for future ML) | 3 days | Data Lead | Schema approach |

**Spike total:** ~2.5 weeks (parallel with early dev work).

## Dependency Graph (DAG)

```
Spikes (Week 1):
  SP1 (LLM bench) → informs T2
  SP2 (Audio)    → informs T3
  SP3 (Storage)  → informs T5

Technical foundation (Week 1-2, parallel):
  T1 (feature flag) ─┐
  T3 (audio pipeline) ┼─→ S1 (enable toggle)
  T5 (schema)         │
  T7 (SOC 2 docs — parallel, Weeks 1-8)
  T2 (LLM API) ──────────┐
                          ▼
  S1 → S2 (generate summary) ─┬─→ S3 (edit inline)
                              │      └─→ S6 (audit export, needs edit events)
                              └─→ S4 (action items)
                                     └─→ S5 (reminders, needs T4)

S6 (admin policy) requires S1

T6 (observability) parallel, picks up as S2 ships

Critical path: SP1 → T2 → S2 = 3.5 weeks sequential
                            (S2 blocks S3, S4, ultimately S5, S6, S7)
```

## Critical Path Analysis

**Critical path:**
```
Week 1: Spikes (SP1 LLM bench) + T1 (feature flag) + T3 (audio pipeline) + T5 (schema) + SOC 2 parallel
Week 2-3: T2 (LLM API abstraction) — blocked by SP1
Week 3: S1 (enable toggle) — unblocked after T1
Week 3-6: S2 (generate summary) — the big one, 8 points at 2 points/week AI team
Week 6-7: S3 (edit inline) + S4 (action items) parallel — both depend on S2
Week 7-8: S5 (reminders), S6 (admin policy), S7 (audit export) — all S-sized
Week 8-10: Integration testing, beta, iteration
Week 11-13: Limited GA → Full GA
```

**Compressed timeline:** 13 weeks for MVP (matches Q2 target).

## Parallelizable Work

- Platform tasks (T1, T3, T4, T5) — independent, start simultaneously in Week 1
- SOC 2 audit (T7) — parallel track entire quarter
- Design work for S3 inline editor — parallel with S2 development
- Data instrumentation (T6) — parallel with S2

## Team Role Assignment

| Workstream | Team | Week 1-3 | Week 4-6 | Week 7-10 | Week 11-13 |
|------------|------|----------|----------|-----------|------------|
| AI/Backend | AI team (2 eng) | SP1, T2 | S2 core | S4, iterate | Beta fixes |
| Backend | Platform (2 eng) | T1, T3, T4, T5, SP2 | S1 + support S2 | S5, S6, S7 | GA rollout |
| Frontend | FE team (2 eng) | Designs review | S1 UI | S3, S5 UI | Iteration |
| Design | Design (1) | Flow + wireframes | Hi-fi mocks for S3 | Edge cases | Polish |
| Data | Data Lead | SP3 | Event schema | T6 instrumentation | Dashboards |
| Security | Security Lead | T7 docs | T7 audit prep | T7 audit | Attestation |
| PM/Design | PM + Design | Kickoff + AC | Beta prep | Beta running | GA planning |

## Sprint Plan (2-week sprints)

**Sprint 1 (Weeks 1-2): Foundation**
- Complete: SP1, SP2, SP3, T1, T3, T5
- In progress: T2, T7

**Sprint 2 (Weeks 3-4): First Feature**
- Complete: T2, S1
- In progress: S2

**Sprint 3 (Weeks 5-6): Core AI**
- Complete: S2
- In progress: S3, S4

**Sprint 4 (Weeks 7-8): Expand + Polish**
- Complete: S3, S4, S5, S6
- In progress: S7, T6, beta prep

**Sprint 5 (Weeks 9-10): Beta + Iteration**
- Beta live with 10 design partners
- Iteration based on feedback

**Sprint 6 (Weeks 11-12): Limited GA**
- 25% of AI-tier customers
- Monitor guardrails

**Sprint 7 (Week 13): Full GA**
- 100% AI-tier
- Launch marketing

## Capacity Summary

- **Team:** 8 engineers (AI team 2, Platform 2, FE 2, plus Design 1, Data 1) + 3 PM + Security
- **Total person-weeks:** ~14 people × 13 weeks = 182 weeks
- **Epic 3 allocation:** ~70 person-weeks (AI team fully, others partially) = 38% of team capacity
- **Other Q2 epics in parallel:** Epic 1 (SSO), Epic 4 (Dashboard), T7 (SOC 2) — share remaining 60%
- **Buffer:** ~20% of each engineer's time for incidents, oncall, emergent

## Validation Checkpoint (Week 6 — Pre-beta)

**Before beta launch, team review:**
- [ ] S2 quality threshold met (≥70% summary acceptance via internal dogfood)
- [ ] P95 latency <60s for test meetings
- [ ] Privacy audit passed (internal counsel review)
- [ ] T2 failover tested (forced OpenAI outage → Anthropic switches in <10s)
- [ ] 5 dogfood cases include edge scenarios (short meeting, long meeting, sensitive content)

If any item fails → extend Sprint 3-4 before beta (do not launch broken).

## Open Questions

1. SP1 benchmark — which LLM primary? (Owner: AI Lead, by Week 2)
2. SP2 audio pipeline — browser-native sufficient or need Recall.ai? (Owner: Platform Lead, by Week 2)
3. BYOK encryption for Enterprise — design? (Owner: Security Lead, by Week 4)
4. Beta customer selection finalized? (Owner: CS Lead, by Week 6)
5. Pricing for AI Tier confirmed +$8/seat? (Owner: VP Sales, by Week 3 — blocks tier launch)
```

> **Epic-breakdown lesson:** Original Epic 3 was **WSJF 1.77 (near-reject)** because job size was 13. After decomposition:
> - S2 (generate summary) alone = WSJF 4+ (high UBV, medium size)
> - S5 reminders = WSJF 5+ (quick-win quality)
> - T7 SOC 2 = WSJF 3+ (blocking compliance)  
>  
> Decomposed epic **fits budget** (70 pm in 182-pm quarter) with parallel workstreams. Without breakdown, monolithic 13-point WSJF would have suggested defer — missed opportunity. **Breakdown is a prioritization tool, not just a planning tool.**
