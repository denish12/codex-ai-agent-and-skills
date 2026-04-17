---
name: problem-statement
description: Product problem formulation — actor, context, pain, root cause, evidence
---
# Problem Statement

> **Category:** Discovery  ·  **Slug:** `problem-statement`

## When to Use

- At the start of the Discovery phase — as a focusing artifact.
- Before a PRD — a clearly formulated problem = half the solution.
- When the team diverges: "what exactly are we solving?".
- As a filter for the backlog: not related to active problem → not in scope.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Evidence (interviews, tickets, metrics) | ✅ | What points to the problem |
| Target role | ✅ | Buyer / end-user / admin |
| Context / trigger | ✅ | When the problem occurs |
| Existing workaround | ⬚ | How they currently cope |

## Data Sources

1. `$user-interview-script` quotes — pain descriptions.
2. Support tickets — volume + categorization.
3. Product analytics — drop-off points, error rates.
4. Competitor comparison — what they do that you don't.

### Related Skills

| Skill | What we take | When to invoke |
|-------|-------------|----------------|
| `user-interview-script` | Evidence quotes | For each problem |
| `jtbd-canvas` | Actor + desired outcome | For formulation |
| `assumption-mapping` | Root cause assumptions | If root cause is unclear |
| `opportunity-solution-tree` | Problem → opportunities | After formulating |

## Protocol

### Step 0 — Raw Signal Collection

Collect all signals: quotes, tickets, metrics. Group by similar themes.

### Step 1 — Formulation Frame

Use the structure:

> **[Actor]** in **[context]** experiences **[pain]** because **[root cause]**. Evidence: **[data]**. Impact: **[quantified]**.

✅ Good:  
«**End-user engineers** at **mid-market SaaS companies** experience **2-3 hour delays to onboard new teammates** because **our role-based access setup requires 7 manual admin steps**. Evidence: 14 interviews + 230 support tickets Q3-Q4 2025. Impact: ~40% of new-hire first-week productivity lost.»

❌ Bad: «Onboarding is slow.»

### Step 2 — Five Whys

For each problem — drill to root cause via 5 "why?"s:

1. Why is onboarding slow? → Manual admin steps.
2. Why manual? → No role templates.
3. Why no templates? → Product doesn't support.
4. Why not? → Not prioritized.
5. Why? → No data on impact.

Stop when you reach a fix-able root cause (usually at level 3-4).

### Step 3 — Impact Quantification

- **Reach** — how many users affected (weekly/monthly)
- **Frequency** — how often they encounter it
- **Severity** — how bad (blocker / frustrating / minor)
- **Business impact** — churn risk / conversion drop / CAC increase / NRR impact

Priority = Reach × Frequency × Severity.

### Step 4 — Problem vs Symptom

Distinguish:
- **Problem:** «Can't easily onboard new teammates» (root)
- **Symptom:** «Support tickets about SSO setup» (surface)

Symptoms — evidence for the problem. Problem — what we're solving.

### Step 5 — Non-problems

Explicit out-of-scope: what we are **NOT** solving in this framing:
- «We are not solving compliance onboarding (legal concern)»
- «We are not solving onboarding for external contractors (different flow)»

### Step 6 — Problem Statement Document

Final artifact:
- Problem statement (1 sentence structured format)
- Evidence section (quotes, data, metrics)
- Five-whys analysis
- Impact quantification
- Non-problems (explicit)
- Open questions (for discovery)

## Validation (Quality Gate)

- [ ] Problem formulated as structured: actor / context / pain / root cause
- [ ] Evidence ≥ 2 sources (interviews + quantitative)
- [ ] Five-whys conducted to fix-able root
- [ ] Impact quantified (reach × frequency × severity)
- [ ] Distinguish problem from symptom
- [ ] Non-problems explicit
- [ ] Quantified impact tied to business metric

## Handoff

The result is input for:
- **`opportunity-solution-tree`** — problem → opportunity space
- **`rice-scoring`** — reach + impact feeds scoring
- **`prd-template`** — problem section
- **`hypothesis-template`** — testable predictions from root cause

Format: problem statement doc (markdown). Via `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|-------------------|
| Solution embedded | «Problem: no dashboard» | Problem — pain, not absence of feature |
| Vague actor | «Users» | Specific role: «Engineering manager in mid-market» |
| No evidence | Speculation | Min 2 sources, quantitative + qualitative |
| No root cause | Stay at surface | Five-whys is mandatory |
| Not quantified | «Serious problem» | Reach × Frequency × Severity |
| Scope creep | «All onboarding issues» | Narrow + non-problems |

## Template

```markdown
# Problem Statement: [Short Name]

## Statement
[Actor] in [context] experiences [pain] because [root cause].
Evidence: [sources]. Impact: [quantified].

## Evidence
- Quote 1: «...» (Interview 3, mid-market Engineering Manager)
- Ticket volume: [N] Q3-Q4 2025
- Metric: [drop-off X% at step Y]

## Root Cause (Five Whys)
1. Why X? → A
2. Why A? → B
...

## Impact
- Reach: [N users / week]
- Frequency: [N times / month]
- Severity: Blocker / Major / Minor
- Business: [$X NRR impact / Y% conversion drop]

## Non-problems (out of scope)
- ...
```

## Worked Example — TeamFlow Top 3 Problem Statements

**Context:** TeamFlow (B2B SaaS HR-tech, $8M ARR, 200 customers). After 8 interviews + JTBD canvas — the team formulated the Top 3 problem statements for the Discovery Brief. All 3 — candidates for the AI 1:1 summarization initiative, but with different priority.

### Problem Statement #1: Manager Admin Overhead

#### Statement

**People managers** (primarily at mid-market / enterprise B2B SaaS, 100-1000 employees) **managing 5-15 direct reports** experience **45-60 min/week per report on 1:1 prep + note-taking + follow-up** (3-4 hrs/week total for a manager with 8 reports), **because** TeamFlow provides a structured template but no capture or synthesis capability — managers must manually type notes during the conversation (losing focus) or after (losing context).

Evidence: 6 of 8 customer interviews + 120 related support tickets Q1 2026 + internal analytics (averaged prep time inferred from session duration data). Impact: 3,000 active managers × 2 hrs/week saved × 50 weeks × $150/hr loaded cost = $45M gross annual value; business case assumes ~10% realizable as paid TeamFlow expansion → $3-5M ARR opportunity through premium AI tier.

#### Evidence

- **Quote 1:** «25 minutes prep every week for each of my 8 reports. Total ~3 hours per week.» — Interview E3 (Engineering Manager, mid-market, 250 emp)
- **Quote 2:** «Typing during the meeting → lose the conversation. After the meeting → forget context. I often just write headlines and lose context.» — E3
- **Quote 3:** «I skipped prep for a 1:1 with a junior engineer because I was too overloaded. The meeting was scrappy, he was clearly disappointed. I felt guilty.» — E3
- **Quote 4:** «If I could just speak during the meeting and the system would write notes and highlight action items — I'd pay for that personally.» — E3
- **Support tickets:** 120 tickets Q1 2026 tagged «1:1 notes / notes / meeting» — recurring themes: «can I export?», «why does TeamFlow not do X automatically?», «how do other teams handle notes?»
- **Product analytics:** Session duration (time spent in 1:1 notes interface) avg 12 min per 1:1 prep + 8 min post — matches self-reported numbers
- **Competitor comparison:** Lattice, 15Five — same gap. Industry-wide unmet need, not TeamFlow-specific.

#### Root Cause (Five Whys)

1. **Why do managers spend 45-60 min/week on 1:1 admin?**
   → Because prep + note-taking + follow-up are manual, require mental context-switching.

2. **Why manual?**
   → Because no tool captures conversation content and synthesizes action items automatically.

3. **Why no tool?**
   → Historical: tools required accurate transcription (not solved), privacy concerns, HR data sensitivity. Now LLM APIs make this tractable, but TeamFlow hasn't invested.

4. **Why hasn't TeamFlow invested?**
   → Historically focused on structured-data features (OKR, reviews). Note-taking seen as commodity. No one made a business case for AI integration.

5. **Why no business case?**
   → NRR / churn data show that the top churn reason is «manager adoption low» (60% from customer interviews + CRM data). The connection between manager admin load → adoption drop was not explicitly traced until recent analysis.

**Root cause (actionable level):** Lack of AI-powered capture + synthesis in 1:1 workflow — addressable through an integrated AI summarization feature.

#### Impact

- **Reach:** ~3,000 active people managers across 200 customers (weighted: SMB 120 × 5 avg managers = 600, mid-market 70 × 20 avg = 1,400, enterprise 10 × 100 avg = 1,000)
- **Frequency:** Weekly (3-4 hrs/week per manager → 9,000-12,000 hrs/week total across base)
- **Severity:** Major (not blocking, but drives 30% of manager-tool churn signal)
- **Business impact:** 
  - Direct: $3-5M ARR expansion opportunity in 4 quarters through premium AI tier ($8-12/seat/mo)
  - Indirect: NRR lift 5-10pp if manager activation / retention improves
  - Defensive: Lattice / 15Five may launch similar; first-mover gives moat

#### Non-problems (out of scope)

- **Not solving** transcription accuracy below 95% for non-English languages (defer to future; English-first)
- **Not solving** meeting recording / video archival (legal / privacy implications differ across jurisdictions)
- **Not solving** automated coaching suggestions («manager should have asked X») — requires deeper training data, future work
- **Not solving** integration with external meeting tools (Zoom/Meet/Teams) in the first release — TeamFlow-native 1:1s only

---

### Problem Statement #2: VP HR Lacks Visibility into 1:1 Quality / Frequency

#### Statement

**VPs of People / CPOs** at **mid-market and enterprise customers (100-1000 employees)** lack **visibility into 1:1 cadence, quality, and action items completion rate across the organization**, forcing them to rely on self-report + anecdote + post-departure exit interviews. **Because** TeamFlow's analytics surface team-level OKR data but not 1:1 health metrics (frequency, duration, action items velocity, sentiment).

Evidence: 4 of 4 buyer interviews — direct quote pain + specific asks for dashboard. Impact: blocker for expansion from Team tier ($15/seat) to Enterprise tier ($50+/seat + analytics). Addressing this = $2-3M ARR expansion opportunity within existing base.

#### Evidence

- **Quote 1:** «Some managers run amazing 1:1s, others literally cancel them. I have no visibility, no levers.» — B2 (VP HR, 450-emp B2B SaaS)
- **Quote 2:** «When CFO asks about retention spend ROI, I have to weave a story. I don't have data.» — B1 (CPO, 800-emp enterprise)
- **Quote 3:** «Sarah left the company because her manager never did 1:1s. We only found out after the fact. I should have known.» — B3 (VP HR, 200-emp mid-market)
- **CRM data:** 8 of 10 enterprise prospects ask «do you have 1:1 analytics?» during evaluation calls — this is a current blocker for Enterprise tier conversion
- **Product analytics:** Currently buyer-role logins (VP/CPO) — 35% monthly active vs end-user 78% — indicates the buyer doesn't have enough reason to use the product regularly

#### Root Cause (Five Whys)

1. **Why does VP HR lack visibility?** → TeamFlow doesn't surface 1:1 health metrics.
2. **Why not surface?** → Existing analytics focus on goals (OKR) and reviews, not on meeting patterns.
3. **Why?** → Product roadmap prioritized OKR-centric features historically (last 2 years).
4. **Why?** → Because sales-led signals pointed to OKR as differentiator vs competitors.
5. **Why those signals?** → Sales never segmented buyer personas — VP HR vs CPO have different priorities, but the pitch was uniform.

**Root cause (actionable):** Missing buyer-persona-specific analytics layer. Addressable through a new dashboard feature.

#### Impact

- **Reach:** 80 buyer accounts (mid-market + enterprise), some overlap with enterprise tier
- **Frequency:** Quarterly (critical for board prep)
- **Severity:** Major — blocker for Enterprise tier expansion
- **Business impact:** $2-3M ARR if Enterprise conversion rate improves from 15% to 30% in 4 quarters

#### Non-problems (out of scope)

- **Not solving** individual 1:1 content surveillance (privacy line — VP HR sees aggregate only)
- **Not solving** compensation-linked coaching insights (separate initiative)

---

### Problem Statement #3: Action Items Drop Rate ~40%

#### Statement

**Managers with 5+ direct reports** experience **~40% action items drop rate** from 1:1 meetings (forgotten, not tracked, never marked complete), **because** TeamFlow creates action items as records but provides no proactive reminder / re-surfacing mechanism — managers must self-police checking completion.

Evidence: 5 of 8 end-user interviews + internal product analytics (action items created vs completed ratio). Impact: indirect on end-user satisfaction + retention.

#### Evidence

- **Quote 1:** «I probably have 20-30 open action items, half of which are no longer relevant... and actually just forgotten.» — E3
- **Quote 2:** «Action items tracking is weak. Forget to check. They pile up.» — E3
- **Product analytics:** Average action items created per 1:1 = 3.2. Average marked completed within 14 days = 1.9. Completion rate 60% = drop rate 40%.
- **Support tickets:** 42 tickets Q1 2026 «action items not reminders / notifications»

#### Root Cause (Five Whys)

1. **Why 40% drop?** → Action items don't surface proactively, only manual check.
2. **Why not proactive?** → No notification / reminder system for action items.
3. **Why?** → Original design assumption: manager will review manually.
4. **Why that assumption?** → Pre-AI era design: manual was the only option.
5. **Why still manual?** → Feature not re-evaluated since original launch (2 years ago).

**Root cause (actionable):** Missing proactive reminder layer. Low-hanging fruit — no AI required, rule-based is OK.

#### Impact

- **Reach:** ~3,000 managers
- **Frequency:** Weekly
- **Severity:** Minor (doesn't break workflow, but compounds frustration)
- **Business impact:** Indirect — contributes to manager adoption rate + NPS

#### Non-problems (out of scope)

- **Not solving** automatic action items extraction from unstructured notes (this is part of the AI summarization initiative)
- **Not solving** cross-team action items visibility (future)

---

### Summary of Top 3 Priorities

| # | Problem | Actor | Severity | Reach | Business Impact | Priority |
|---|---------|-------|:--------:|:-----:|:---------------:|:--------:|
| 1 | Manager admin overhead | End-user manager | Major | ~3,000 | $3-5M ARR expansion | **P0** |
| 2 | Buyer visibility gap | VP HR / CPO | Major | 80 accounts | $2-3M ARR (Enterprise conv) | **P0** |
| 3 | Action items drop rate | End-user manager | Minor | ~3,000 | Indirect | **P1** |

**Implication:** Problem #1 and #2 can be addressed through the **same feature** (AI summarization + aggregate dashboard), making the initiative highly leveraged. Problem #3 — complementary but independent (rule-based reminders, quick win).

> **Problem-statement lesson:** Every problem formally structured prevents hidden assumptions. Problem #1's five-whys surfaced the question of **«why historically there was no investment»** — a strategic question, not just a product question. This is information for a CEO / Board session, not just the engineering roadmap.
