---
name: user-story
description: Writing user stories per INVEST — As a / I want / So that, separation of buyer/end-user
---
# User Story

> **Category:** Specification  ·  **Slug:** `user-story`

## When to Use

- In a PRD — every user-facing functionality.
- In backlog grooming — transforming ideas into work items.
- During epic breakdown — story-level.
- In B2B — separation of buyer / end-user / admin stories.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| User role | ✅ | Buyer / end-user / admin / champion |
| JTBD / problem | ✅ | What we're solving |
| Context | ✅ | When it occurs |

## Data Sources

1. `$jtbd-canvas` — jobs as starting point.
2. `$problem-statement` — problem as «so that».
3. Customer interviews — language of user.

### Related Skills

| Skill | What we take | When to invoke |
|-------|-------------|----------------|
| `jtbd-canvas` | Jobs → «I want» | Before stories |
| `problem-statement` | Pain → «so that» | For justification |
| `acceptance-criteria` | Contract | Per each story |
| `epic-breakdown` | Grouping | After stories |

## INVEST Criteria

A good user story is:
- **I**ndependent — can be developed separately
- **N**egotiable — details can be discussed, not locked
- **V**aluable — delivers customer value
- **E**stimable — team can estimate effort
- **S**mall — fits in 1-2 sprints (< 8 points)
- **T**estable — clear pass/fail criteria

## Format

**Canonical:**
> **As a** [role]  
> **I want to** [action / capability]  
> **So that** [benefit / outcome]

Example:
> **As a** DevOps engineer at mid-market SaaS  
> **I want to** set team-level role templates in 2-3 clicks  
> **So that** onboarding new teammates takes 10 min, not 2 hours

## Protocol

### Step 0 — Role Clarity (B2B Critical)

**Different stories for different roles** — don't mix in one:
- **End-user story** — daily use experience
- **Buyer story** — purchase / evaluation decision
- **Admin story** — configuration / governance
- **Champion story** — advocacy / reporting

In B2B — separate stories per role — different AC, different flows.

### Step 1 — «So That» First

Write backwards — benefit first, then action.

Capture customer outcome:
- ❌ «So that users can use the new feature» (circular)
- ✅ «So that I can close the quarterly compliance audit in 2 hours instead of 2 days»

Benefit — **specific, measurable**, tied to JTBD.

### Step 2 — «I Want»

Action or capability — what the user specifically does.

- Atomic (one action)
- Technology-agnostic («view team activity» not «click button on dashboard»)
- User's language, not engineering

### Step 3 — «As A»

Specific role, not generic «user»:
- «DevOps engineer at mid-market SaaS» > «user»
- «Customer Success Manager with >100 accounts» > «user»

Tie role to segment (if segment-specific feature).

### Step 4 — INVEST Check

Verify each story:
- **I** — Can it be developed independently? If other stories are needed first → split.
- **N** — Are details open for discussion? (Not over-specified)
- **V** — Does customer get value? If only technical improvement → reformulate through user outcome.
- **E** — Can team estimate it? If not — unknowns need spike.
- **S** — Less than 2 sprints? If not — split.
- **T** — Can clear pass/fail AC be written?

### Step 5 — Splitting Big Stories

Split techniques:
- **Workflow:** «create → update → delete» → 3 stories
- **Data:** different entity types (user → team → organization)
- **Happy path + edges:** primary flow → error states as separate stories
- **Acceptance criteria:** pull one scenario after another from AC

### Step 6 — Story Sizing

T-shirt or Story Points:
- **S** (1-2 pts): < 1 day
- **M** (3-5 pts): 1-3 days
- **L** (8 pts): 4-7 days
- **XL** (13+ pts): **split**

### Step 7 — Negotiation Notes

Add «Notes» field for:
- Open questions
- Assumptions
- Suggested scope boundaries

This signals to engineers: where negotiation room exists.

### Step 8 — Add AC

Each story requires AC via `$acceptance-criteria`.

Without AC a story — is not ready for sprint.

## Validation (Quality Gate)

- [ ] Format: As a / I want / So that
- [ ] Role — specific, not generic «user»
- [ ] B2B: separated per role (if multi-role flow)
- [ ] «So that» — specific, measurable benefit
- [ ] INVEST passed (all 6)
- [ ] Size ≤ 8 pts (or split)
- [ ] AC attached
- [ ] Notes / assumptions explicit

## Handoff

The result is input for:
- **`acceptance-criteria`** — each story
- **`epic-breakdown`** — grouping
- **Engineering** → implementation
- **QA** → test cases

Format: story card (title + as-I-so-that + notes + AC link). Via `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|-------------------|
| «User» role | Lost context | Specific role/segment |
| Vague «so that» | Lost value | Measurable benefit |
| Implementation in story | Over-specified | Action, not UI |
| Mix roles in one story | Confused AC | Separate per role |
| Big (>13 pt) | Not estimable | Split using techniques |
| No AC | No contract | Must have AC |
| «As developer I want refactor» | Not customer value | Translate to user outcome |

## Template

```markdown
## Story: [Short Title]

**As a** [specific role]
**I want to** [action]
**So that** [measurable benefit]

### Notes
- Assumption: [X]
- Open question: [Y]

### Acceptance Criteria
[via $acceptance-criteria]

### Size
M (3-5 points)

### Dependencies
- Story [#123] (prerequisite)
```

## Worked Example — TeamFlow User Stories for AI Summarization

**Context:** 14 total user stories in PRD. Below — 7 key stories with proper INVEST + B2B role separation. Show splitting technique: end-user vs admin vs buyer.

### Stories grouped by Role

---

#### Role: People Manager (end-user) — Primary

**Story S1: Enable AI Summarization for Upcoming 1:1**

**As a** People manager with 5+ direct reports at mid-market B2B SaaS company on Team Tier  
**I want to** toggle «AI assist» on for an upcoming 1:1 in one click  
**So that** I can focus fully on conversation without worrying about notes

**Notes:**
- Default state: turned-off (opt-in respects privacy), user activates per-meeting
- Admin can default-on for all new 1:1s (org setting, S7)
- Assumption: managers prefer per-meeting control. Validated in Discovery E2-E4.
- Open Q: does toggle apply to entire meeting or before/after toggle events? → clarify in AC

**AC:** [see `$acceptance-criteria` S1 scenarios — 4 total]

**Size:** S (2 points) — UI toggle, feature flag check, settings API  
**Dependencies:** T1 (feature flag infrastructure)  
**Role validation:** INVEST passes (independent, negotiable, valuable, estimable, small, testable)

---

**Story S2: Receive AI Summary Within 60 Seconds of Meeting End**

**As a** People manager who completed AI-enabled 1:1  
**I want to** receive structured summary (topics, decisions, action items) within 60 seconds of meeting end  
**So that** I can review and approve before moving to next task

**Notes:**
- Streaming UX acceptable — summary populates progressively within 60s
- Quality threshold: ≥70% of summaries acceptable without major edits (measured via S3)
- Assumption: 60s feels instant; 90s feels laggy. Validated via beta feedback in Wizard-of-Oz test.

**AC:** [4 scenarios: happy path, streaming fallback, LLM timeout, meeting <5min skipped]

**Size:** L (8 points) — core AI pipeline  
**Dependencies:** S1 (must be enabled), T2 (LLM API integration)

---

**Story S3: Review and Edit AI Summary Inline**

**As a** manager reviewing AI-generated summary  
**I want to** edit content inline (add, remove, modify) and mark approved  
**So that** corrections become authoritative record, and future AI learns my style

**Notes:**
- Edit tracked separately from original AI version (both retained for audit + learning)
- Approval state: «draft (AI)», «edited», «approved» (manager-confirmed)
- Open Q: auto-approve after 7 days without edit? → default: no, keeps «awaiting review» status

**AC:** [3 scenarios: basic edit, cancel edit, approved → read-only]

**Size:** M (5 points) — rich text editor integration + state machine  
**Dependencies:** S2 (must have summary first)

---

**Story S4: Auto-Track Action Items Extracted from Summary**

**As a** manager with approved AI summary  
**I want** extracted action items automatically added to my follow-up queue with owner + due date (if LLM inferred)  
**So that** I don't lose commitments between meetings

**Notes:**
- Extraction confidence threshold: >70% — low confidence items shown separately for manager review
- Owner default: inferred from context (if «Sarah, please review» → Sarah), else manager
- Due date default: «by next 1:1» (7 days), manager can override

**AC:** [4 scenarios: standard extraction, low confidence review, owner inference, custom due date]

**Size:** M (5 points)  
**Dependencies:** S2

---

**Story S5: See Action Items Reminder Before Next 1:1**

**As a** manager with open action items from previous 1:1 with a report  
**I want** those items surfaced 30 min before upcoming 1:1 via in-product notification + email  
**So that** follow-through is top-of-mind and conversation flows naturally

**Notes:**
- 30 min window configurable (15 / 30 / 60 / disabled) — user setting
- Items marked complete in reminder UI sync to both manager's and report's views

**AC:** [3 scenarios: reminder fires, customized window, reminder disabled per user setting]

**Size:** S (3 points) — rule-based, uses existing notification stack  
**Dependencies:** S4 (needs action items existing)

---

#### Role: Admin / HR Business Partner

**Story S6: Configure Org-Wide AI Summarization Policy**

**As an** admin (HR Business Partner or People Ops lead) for TeamFlow account on Team or Enterprise tier  
**I want to** set org-wide AI policy (enabled / disabled / default-on for new managers)  
**So that** I can align TeamFlow AI usage with company data governance decisions

**Notes:**
- 3 states: «disabled org-wide» (AI not available for anyone), «enabled — per-manager opt-in» (default), «enabled — default on for new managers»
- Policy change notifies all managers
- Policy setting audit-logged

**AC:** [4 scenarios: 3 state transitions + audit log verification]

**Size:** S (3 points)  
**Dependencies:** S1 (per-meeting toggle must exist)

---

**Story S7: Export Audit Log of AI Operations**

**As an** admin responsible for compliance (SOC 2, GDPR)  
**I want to** export audit log of all AI operations (summaries generated, edited, approved) for given time period  
**So that** I can demonstrate compliance during audit + investigate incidents

**Notes:**
- Log entry: timestamp, actor (manager ID), action (generate/edit/approve/delete), meeting ID, summary ID  
- Export formats: CSV, JSON
- Retention: 365 days minimum (legal baseline)

**AC:** [3 scenarios: export happy path, date range filter, empty range]

**Size:** S (3 points) — uses existing audit log infrastructure  
**Dependencies:** S1, S2, S3 (all AI operations logged)

---

#### Role: Buyer (VP HR / CPO) — pulled through admin experience

**Story S8 (pulled into PRD Appendix — Theme 2 dashboard scope):**

VP HR visibility / aggregate dashboard stories — moved to separate PRD (aggregate-dashboard-v1), but linked:
- «As VP HR, I want to see AI summarization adoption across teams so I can allocate training»  
- «As CPO, I want action items velocity as leading indicator of team health»

*These stories live in Aggregate Dashboard PRD — cross-referenced here.*

---

### Story Sizing Summary

| Story | Size | Total |
|-------|:----:|------|
| S1 Enable toggle | S (2) | Small, quick |
| S2 Generate summary | L (8) | THE big one — core AI |
| S3 Edit inline | M (5) | Rich editor |
| S4 Extract action items | M (5) | Post-processing |
| S5 Reminder | S (3) | Rule-based |
| S6 Org policy | S (3) | Admin UI |
| S7 Audit export | S (3) | Export feature |
| **Total (primary flow):** | | **29 points** |

Balance distribution (1 L + 2 M + 4 S) — healthy MVP shape. No XLs = no un-sized risks.

### Splitting Techniques Applied

- **By role:** S1-S5 end-user (manager), S6-S7 admin, S8 deferred to separate PRD (buyer dashboard)
- **By workflow step:** Prep (defer — Q3), During meeting (S1-S2), Review (S3), Follow-through (S4-S5)
- **Simple → Complex:** S2 ships «basic summary»; future ships «summary + themes» separately
- **Happy path → Edge cases:** S2 happy path above, error-state handling via AC (not separate stories)

### Story Dependencies DAG

```
T1 (feature flag infra)
    └─→ S1 (enable toggle)
           └─→ S2 (generate summary) ← depends on T2 (LLM API)
                  ├─→ S3 (edit inline)
                  └─→ S4 (extract action items)
                         └─→ S5 (reminder)

S6 (org policy) ← depends on S1 (per-meeting must exist first)
S7 (audit export) ← depends on S1, S2, S3 (need operations to log)
```

**Critical path (for MVP):** T1 → S1 → S2 → S3 → S4 → S5 = ~26 points ≈ 6 weeks at 4 points/week velocity.

> **user-story lesson:** B2B **always** has multiple roles. Separating manager (end-user) from admin (HR Business Partner) from buyer (VP HR) — 3 distinct AC sets, 3 distinct «so that» phrases. Without separation «As a user» = vague. Stories S6-S7 admin-focused — critical for companies with governance requirements. Our initial 14 stories included only manager — Discovery B3 interview revealed admin governance need; added S6-S7 late, prevented post-launch «admin has no control» complaints.
