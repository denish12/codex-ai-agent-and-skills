---
name: gates
description: Quality control at gates — acceptance, rejection, severity (P0/P1/Note), escalation
---
# Gates — Quality Control of Product Pipeline Gates

## When to Use
- **Before every transition** between gates — checking the current gate's deliverable.
- **When returning for rework** — re-check after corrections.
- **At session end** — checking completeness of materials before cross-session `$handoff`.
- **When there is a dispute about readiness** — formal arbiter: what is done and what is not.

> **Distinction from `$board`:** `$gates` checks **quality and completeness** of a deliverable. `$board` tracks **status and progress**. Gates answers "is it ready?", Board answers "where are we now?".

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Gate name | ✅ | Which gate to check (with ID: COND-01, DISC-01, STRAT-01α, etc.) |
| Pipeline mode | ✅ | /ship-right-thing / /shape-prioritize / /quick-pm / /spec |
| Gate deliverables | ✅ | Artifacts that the agent submits for review |
| Iteration | ⬚ | If re-check — iteration number + gaps from previous iteration |
| Session number | ⬚ | Current session (1-6 for Full A/B) |
| Adversarial camp | ⬚ | α (Customer/Build) / β (Business/Cut) — for camp-specific gates |

### Related Skills
| Skill | Interaction |
|-------|------------|
| `$board` | After gate check — update gate status on board (PASS → `[✓]`, FAIL → `[↩]`) |
| `$handoff` | On PASS / CONDITIONAL PASS — form handoff envelope with gate check attached |
| `$session-prompt-generator` | At session end — gate check enters data for next session prompt |
| Framework skills | PM / Data Analyst gates: check correct completion of the Quality Gate of each skill used ($prd-template, $rice-scoring, $saas-metrics etc.) |

## Gate and Deliverable Registry

### Full Pipeline A (`/ship-right-thing`, 6 sessions)

| # | Gate | ID | Agent | Session | Camp | Required deliverables | Skills |
|---|------|-----|-------|:-------:|:----:|----------------------|--------|
| 1 | **Conductor** | COND-01 | Conductor | 1 | — | Mode determined, task scope, board created | `$board` |
| 2 | **Discovery** | DISC-01 | Discovery | 1 | — | JTBD canvas (buyer + end-user), problem statements, assumption map, evidence inventory | `$jtbd-canvas`, `$problem-statement`, `$assumption-mapping` |
| 3 | **Customer-Champion** | STRAT-01α | Product Strategist | 2 | α | Strategy Brief Alpha: vision (user-value), NSM (user metric), OKR, roadmap | `$product-vision`, `$okr-framework`, `$north-star-metric`, `$product-roadmap` |
| 4 | **Business-Champion** | STRAT-02β | Product Strategist | 3 | β | Strategy Brief Beta: vision (business-value), NSM (business metric), OKR, roadmap | (same skills, different lens) |
| 5 | **Mediator** | MED-01 | Mediator | 4 | — | Unified Strategy Brief: position map, evidence audit, synthesis, rationale | `$gates` |
| 6 | **PM (PRD)** | PM-SPEC | PM | 5 | — | PRD with user stories + AC + NFR + success metrics + rollout plan | `$prd-template`, `$user-story`, `$acceptance-criteria`, `$rice-scoring` |
| 7 | **UX Designer** | UX-01 | UX Designer | 5 | — | User flows, low-fi wireframes, design brief | `$user-flow`, `$design-brief` |
| 8 | **Tech Lead** | TECH-01 | Tech Lead | 5 | — | Feasibility matrix, NFR list, risk register, epic breakdown | `$epic-breakdown` |
| 9 | **Data Analyst** | DATA-01 | Data Analyst | 5 | — | Metric plan, hypotheses, experiment designs, instrumentation requirements | `$hypothesis-template`, `$saas-metrics`, `$aarrr-metrics`, `$ab-test-design` |
| 10 | **Designer** | DS-01 | Designer | 6 | — | Design spec (PRD layout + Product Review Deck) | `$report-design` |
| 11 | **Layouter** | LY-01 | Layouter | 6 | — | HTML generated, PDF ready | `$html-pdf-report` |
| 12 | **Release Gate** | RG-01 | Conductor | 6 | — | All gates passed, PDF generated, user sign-off | `$board`, `$gates` |

### Full Pipeline B (`/shape-prioritize`, 6 sessions)

| # | Gate | ID | Agent | Session | Camp | Required deliverables |
|---|------|-----|-------|:-------:|:----:|----------------------|
| 1 | Conductor | COND-01 | Conductor | 1 | — | Mode, scope, board |
| 2 | Discovery (scope intake) | DISC-01 | Discovery | 1 | — | Scope brief: what we are prioritizing, JTBD in scope, assumptions |
| 3 | PM Build-Camp | PM-01α | PM | 2 | α | Build scope proposal: max RICE, rationale per item |
| 4 | Tech Lead Build-Camp | TECH-01α | Tech Lead | 2 | α | Feasibility per story, "yes, X weeks at Y resources", trade-offs |
| 5 | PM Cut-Camp | PM-02β | PM | 3 | β | Cut scope proposal: MoSCoW, rationale per cut |
| 6 | Tech Lead Cut-Camp | TECH-02β | Tech Lead | 3 | β | Hidden risks, "without X we do not start", technical debt flags |
| 7 | Mediator | MED-01 | Mediator | 4 | — | Final scope decision + rationale, out-of-scope list |
| 8 | PM (final PRD) | PM-SPEC | PM | 5 | — | PRD for approved scope |
| 9 | UX Designer | UX-01 | UX Designer | 5 | — | User flows for final scope |
| 10 | Data Analyst | DATA-01 | Data Analyst | 5 | — | Metric plan |
| 11 | Designer | DS-01 | Designer | 6 | — | Design spec |
| 12 | Layouter | LY-01 | Layouter | 6 | — | HTML/PDF |
| 13 | Release Gate | RG-01 | Conductor | 6 | — | Sign-off |

### Quick Pipeline (`/quick-pm`, 1 session)

| # | Gate | ID | Agent | Required deliverables |
|---|------|-----|-------|----------------------|
| 1 | Conductor | COND-01 | Conductor | Mode, scope, time box |
| 2 | Discovery (light) | DISC-01 | Discovery | JTBD summary, problem statement (1-liner), top 3-5 assumptions |
| 3 | Product Strategist | STRAT-01 | Product Strategist | NSM alignment, OKR fit, roadmap theme |
| 4 | PM | PM-01 | PM | Rough RICE, MVP sketch (3-5 stories), Kano classification |
| 5 | Tech Lead | TECH-01 | Tech Lead | Feasibility rough (S/M/L/XL), top 2-3 risks |
| 6 | Data Analyst | DATA-01 | Data Analyst | Primary metric, guardrail, rough target |

### Spec Pipeline (`/spec`, 1 session)

| # | Gate | ID | Agent | Required deliverables |
|---|------|-----|-------|----------------------|
| 1 | Conductor | COND-01 | Conductor | Cross-check: strategy + scope approved |
| 2 | PM (PRD draft) | PM-SPEC | PM | PRD draft via `$prd-template`, user stories via `$user-story`, AC via `$acceptance-criteria` |
| 3 | UX Designer | UX-01 | UX Designer | User flow, wireframe references, accessibility notes |
| 4 | Tech Lead | TECH-01 | Tech Lead | NFR, risk register, integration map, epic breakdown |
| 5 | PM (final) | PM-FINAL | PM | Merged PRD (ready for engineering handoff) |

## Readiness Criteria by Gate

> Each criterion has a preset severity: **[B]** = Blocker, **[G]** = Gap, **[N]** = Note. During review severity can be raised (G→B), but not lowered (B→G).

### Conductor (COND-xx)
- [ ] **[B]** Pipeline mode determined and justified (Full A / Full B / Quick / Spec)
- [ ] **[B]** Task scope formulated (what we're doing, for whom, constraints)
- [ ] **[B]** Board created via `$board` with correct gate IDs
- [ ] **[B]** For Full A/B — adversarial camp determined for current session (if S2-S3)
- [ ] **[G]** First gate activated
- [ ] **[G]** For continuing sessions: previous handoff loaded and verified
- [ ] **[G]** Clarification first: at least 5 clarifying questions asked (Session 1)

### Discovery (DISC-xx)
- [ ] **[B]** JTBD canvas filled: functional + emotional + social jobs (separately for buyer and end-user in Full A/B)
- [ ] **[B]** At least 5 evidence quotes per role (from `$user-interview-script`) OR explicit "discovery-light mode" for Quick
- [ ] **[B]** Problem statements (top 3, structured format actor/context/pain)
- [ ] **[B]** Assumption map (4 quadrants: value/usability/feasibility/viability), top 3 high-risk identified
- [ ] **[G]** Evidence inventory with quality flags (✅ verified / ⚠️ aged / 🔮 assumed)
- [ ] **[G]** Open questions recorded for downstream gates
- [ ] **[N]** Segment split (SMB / mid-market / enterprise) where applicable

### Product Strategist (STRAT-xx)
- [ ] **[B]** Vision formed (Geoffrey Moore formula)
- [ ] **[B]** NSM selected with evaluation by 6 criteria (`$north-star-metric`)
- [ ] **[B]** OKR (1-3 Objectives, 2-5 KRs each)
- [ ] **[B]** Roadmap (Now/Next/Later) with themes
- [ ] **[B]** For Full A — camp lens maintained: Alpha emphasis on user-value, Beta on business-value. Mixed = FAIL
- [ ] **[G]** Kano balance for roadmap items
- [ ] **[G]** Competitive differentiation sketch
- [ ] **[N]** FOCUS test passed for vision

**Dependency check:** Discovery Brief (JTBD + problems) cited. Vision/NSM linked to specific JTBD.

### PM — Scope & Spec (PM-xx)
**For PM-01α / PM-02β (Full B adversarial):**
- [ ] **[B]** Scope proposal — full list with rationale per item
- [ ] **[B]** Prioritization scoring (RICE / MoSCoW / WSJF)
- [ ] **[B]** Camp lens maintained: Build — maximum + justification, Cut — minimum + "what we give up"
- [ ] **[G]** Kano classification per item
- [ ] **[G]** Out-of-scope list (even for Build camp)

**For PM-SPEC (final PRD):**
- [ ] **[B]** PRD via `$prd-template` — all 14 sections filled
- [ ] **[B]** User stories via `$user-story` (INVEST), min 3-5 primary
- [ ] **[B]** Acceptance criteria via `$acceptance-criteria` per each story
- [ ] **[B]** Success metrics (primary + secondary + guardrails) with baselines + targets
- [ ] **[B]** Non-Goals explicit
- [ ] **[G]** Top 5 risks with mitigation
- [ ] **[G]** Rollout plan via `$launch-checklist`
- [ ] **[N]** Dependencies mapped

**Dependency check:** Strategy Brief (Mediator synthesis for Full A, or approved strategy for Spec/Quick/Full B) cited. PRD goals linked to OKR KRs.

### UX Designer (UX-xx)
- [ ] **[B]** User flows for primary flows (happy path + decision points + errors)
- [ ] **[B]** Low-fi wireframes for new UI surfaces
- [ ] **[B]** Design brief via `$design-brief` (if handoff to visual designer)
- [ ] **[G]** Empty / loading states covered
- [ ] **[G]** Accessibility targets (WCAG level) specified
- [ ] **[N]** Prototype / video walkthrough

**Dependency check:** User stories from PRD covered by flows.

### Tech Lead (TECH-xx)
**For TECH-01α / TECH-02β (Full B):**
- [ ] **[B]** Feasibility per story (can we build? time?)
- [ ] **[B]** Camp lens: Build — "yes, deliver in X", Cut — "hidden risks, do not start without Y"
- [ ] **[G]** Integration / migration risks identified

**For TECH-01 (standalone):**
- [ ] **[B]** NFR (performance, availability, security, compliance, scalability, observability)
- [ ] **[B]** Risk register (top 5 with mitigation)
- [ ] **[B]** Epic breakdown (stories with dependencies, critical path) via `$epic-breakdown`
- [ ] **[G]** Spike candidates identified (time-boxed)
- [ ] **[N]** Architecture ADR (if major decision)

**Dependency check:** PRD user stories covered by feasibility + breakdown.

### Data Analyst (DATA-xx)
- [ ] **[B]** Primary metric defined + baseline + target
- [ ] **[B]** Guardrail metrics with thresholds
- [ ] **[B]** Hypothesis (via `$hypothesis-template`) for key initiatives
- [ ] **[B]** SaaS metric impact model (via `$saas-metrics`)
- [ ] **[G]** Experiment design (`$ab-test-design`) if A/B planned
- [ ] **[G]** Instrumentation requirements — what is logged
- [ ] **[N]** Segment analysis plan pre-registered

**Dependency check:** NSM from Strategy Brief used as anchor. PRD success metrics aligned with metric plan.

### Mediator (MED-xx)
- [ ] **[B]** Results from both camps received (Alpha + Beta)
- [ ] **[B]** Independence verified — no signs of contamination
- [ ] **[B]** Evidence audit per camp (scoring 1-5 evidence strength)
- [ ] **[B]** Position map (where they agree / where they diverge)
- [ ] **[B]** Disagreement analysis (factual / value / risk)
- [ ] **[B]** Synthesis with rationale (adopt Alpha / adopt Beta / hybrid)
- [ ] **[G]** Open risks + mitigation plan
- [ ] **[G]** Open questions for discovery

**Dependency check:** Strategy Brief Alpha + Beta (Full A) or Scope Brief Alpha + Beta (Full B) explicitly cited and compared.

### Designer (DS-xx)
- [ ] **[B]** Design spec via `$report-design`
- [ ] **[B]** Structure + navigation for PRD / Review Deck
- [ ] **[B]** Component library (tables, callouts, status badges)
- [ ] **[G]** Key visualizations (roadmap, metric tree, funnel)
- [ ] **[N]** Brand consistency

**Dependency check:** Structure covers all sections of final PRD / unified strategy brief.

### Layouter (LY-xx)
- [ ] **[B]** HTML generated per design spec
- [ ] **[B]** All visualizations rendered (Chart.js / Mermaid / SVG)
- [ ] **[B]** PDF output valid (page breaks, fonts embedded)
- [ ] **[G]** Self-contained (no broken references)
- [ ] **[N]** File size reasonable (< 10 MB)

**Dependency check:** HTML matches design spec. All sections from PRD present.

### Release Gate (RG-xx)
- [ ] **[B]** All previous gates passed (status `[✓]` on `$board`)
- [ ] **[B]** PDF / PRD final ready
- [ ] **[B]** Launch checklist (`$launch-checklist`) if release implied
- [ ] **[G]** User sign-off received
- [ ] **[G]** Distribution plan (email, in-app, blog, sales)

## Criterion Severity

| Severity | Marker | Definition | Impact on decision |
|----------|:------:|------------|-------------------|
| Blocker | **[B]** | Required deliverable is absent or critically incomplete | FAIL — return for rework |
| Gap | **[G]** | Deliverable exists, but incomplete or with remarks | CONDITIONAL PASS — can pass, but gaps recorded |
| Note | **[N]** | Minor remark, does not affect transition | PASS — remark passed to next gate as context |

> Severity can be raised (G→B if critical), but **cannot be lowered** (B→G). Preset severity is the minimum.

## Decisions

| Decision | Condition | Action |
|---------|---------|--------|
| **PASS** | 0 Blocker + 0 Gap | Request user Approved → `$handoff` → next gate |
| **CONDITIONAL PASS** | 0 Blocker + 1-2 Gap | Record gaps → Request user Approved with note → `$handoff` with note |
| **FAIL** | ≥ 1 Blocker | Return to agent with specific list of gaps → Do not request Approved |

> **Absolute rule:** Never skip gates, even if the task seems simple. FAIL — rework — re-check. No exceptions.

### Special Rules
- Discovery (DISC): absence of JTBD canvas with 5+ evidence quotes (except `/quick-pm`) — **automatic Blocker**.
- PRD without success metrics section — **Blocker**.
- User story without AC — **Blocker**.
- In Full A/B — camp contamination (Alpha saw Beta artifacts before Mediator) — **automatic Blocker**, escalation.
- Release Gate without launch checklist for production release — **Blocker**.

## Escalation Protocol on Repeated FAIL

| Iteration | Action |
|:---------:|--------|
| 1st FAIL | Standard return: list of gaps → agent reworks → re-check |
| 2nd FAIL | Extended return: gaps + specific instructions "how to fix" + warning |
| 3rd FAIL | **Escalation to user** |

Escalation template (3+ FAIL):
```
### ⚠️ Escalation — Gate [ID] fails check (iteration [N])

**Gate:** [ID] [Name]
**FAIL iterations:** [N]
**Recurring gaps:** [list of gaps not fixed over N iterations]

**Options:**
1. Revise scope / lower requirements for deliverable
2. Return to previous gate (problem is in source data)
3. Forced CONDITIONAL PASS (user accepts risk of gaps)

→ Awaiting decision from user.
```

## Protocol

### Step 0 — Load Context
1. Determine which gate to check (by ID from `$board`).
2. Determine pipeline mode and session number.
3. Load readiness criteria for this gate from the registry (with preset severity).
4. If re-check — load gaps from previous iteration.
5. For Full A/B — check camp contamination (pre-check).

### Step 1 — Check Deliverables
1. For each readiness criterion — check: fulfilled / not fulfilled / N/A.
2. For unfulfilled — apply preset severity (can raise, cannot lower).
3. For unfulfilled — describe specific gap: what is missing / what to fix.
4. **Dependency check:** verify that the previous gate's deliverable is explicitly used (not just exists, but cited / applied in the current deliverable).

### Step 2 — Make Decision
1. Count severity.
2. Apply decision rules (PASS / CONDITIONAL PASS / FAIL).
3. Check iteration number — if 3+ FAIL, activate escalation protocol.
4. Add entry to check log.

### Step 3 — Act on Result
- **PASS:** show user → request Approved → `$handoff` → update `$board`.
- **CONDITIONAL PASS:** show gaps → request Approved with gap confirmation → `$handoff` with note → update `$board`.
- **FAIL:** show gaps → return to agent → update `$board` (status `[↩] Returned`). If 3+ FAIL — escalation.

## Example — Gate Check PM-SPEC (TeamFlow, `/ship-right-thing` Session 5), iteration 1 → CONDITIONAL PASS

**Context:** TeamFlow (B2B SaaS, HR-tech). After Mediator synthesis (MED-01) the team wrote a PRD for AI-powered 1:1 summarization. Gate check before handoff to UX + Tech + Data.

```
### Gate Check — PM-SPEC (PM final PRD)

**Mode:** /ship-right-thing (Full A)
**Session:** 5 of 6
**Iteration:** 1
**Previous gaps:** First check

---

#### Readiness Criteria

| # | Criterion | Sev | Status | Gap / Comment |
|---|----------|:---:|:------:|---------------|
| 1 | PRD: all 14 sections filled | [B] | ✅ | TL;DR, Problem, Goals, Non-Goals, Strategy Fit, Solution, Stories, NFR, Metrics, Risks, Rollout, Deps, Q's, Appendix |
| 2 | User stories (INVEST), min 3-5 primary | [B] | ✅ | 7 stories (5 primary + 2 error paths) |
| 3 | AC per story (Gherkin / scenario) | [B] | ✅ | All 7 stories have AC with edge cases + error states |
| 4 | Success metrics: primary + secondary + guardrails | [B] | ✅ | Primary: weekly 1:1s with AI summary (30→50% in 90d). Guardrails: NPS stability, compliance ticket volume |
| 5 | Non-Goals explicit | [B] | ✅ | "Not building summarization for group meetings", "Not replacing human note-takers" |
| 6 | Top 5 risks with mitigation | [G] | ⚠️ | 4 risks vs target 5. Missing: compliance/legal risk re:HR data ingestion |
| 7 | Rollout plan (launch-checklist) | [G] | ⚠️ | Phased rollout defined, but rollback trigger conditions are not numeric |
| 8 | Dependencies mapped | [N] | ℹ️ | Platform team dependency specified, but timeline not confirmed |

**Dependency check:** Unified Strategy Brief (MED-01) cited in Strategy Fit section. NSM "weekly 1:1s with AI summary" from Strategy Brief = primary success metric in PRD. ✅

---

#### Summary

| Severity | Count | Items |
|----------|:-----:|-------|
| Blocker | 0 | — |
| Gap | 2 | #6 (risks count), #7 (rollback trigger) |
| Note | 1 | #8 (deps timeline) |

### Decision: CONDITIONAL PASS

**Rationale:** 0 Blocker, 2 Gap — acceptable for handoff to parallel work (UX, Tech, Data). Gaps noted: risk register and rollback criteria — TECH-01 and Release Gate will clarify.

---

**Deliverables for handoff:**
- PRD (v1 draft, 14 sections, 7 user stories with AC)

**Gaps for downstream:**
- [Tech Lead] Add 5th risk: compliance/legal — HR data ingestion, GDPR / SOC2 implications
- [Tech Lead / Data] Define numeric trigger conditions for rollback (error rate, latency, NPS drop)
- [Release Gate] Confirm platform team timeline

→ Ready for handoff to **UX Designer + Tech Lead + Data Analyst** (in parallel). Awaiting **"Approved"**.
```

## Validation (Quality Gate)

Gate check is considered complete if:

- [ ] All readiness criteria checked (fulfilled / not fulfilled / N/A — no blanks)
- [ ] Each criterion assigned severity from registry (B/G/N), raised if necessary
- [ ] For each unfulfilled: severity, gap description, what to fix
- [ ] Dependency check passed: previous gate's deliverable explicitly used in current
- [ ] For Full A/B — camp contamination check passed
- [ ] Decision matches rules (not subjective)
- [ ] At 3+ FAIL — escalation protocol activated
- [ ] Check log updated
- [ ] On PASS/CONDITIONAL PASS — user Approved received
- [ ] `$board` updated

## Handoff
The result of `$gates` is input data for: `$handoff` (gate check attached to envelope).

Transfer format: completed gate check template + decision + gaps (if CONDITIONAL PASS) + dependency check result.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|-------------------|
| Skip gate "because it's simple" | Errors pass unnoticed | Never skip. No exceptions |
| PASS without checking all criteria | Unnoticed gaps | Each criterion = fulfilled / not fulfilled / N/A |
| "Generally ok" instead of specifics | Agent does not know what to fix | Specific gap: "Non-Goals section has only 1 item, need min 2" |
| FAIL without describing gaps | Agent returns and does not know what to do | Each FAIL = list of specific reworks |
| Approved without user sign-off | Pipeline protocol violation | Always explicit Approved from user |
| Discovery without JTBD canvas | Pipeline operates without customer-centric foundation | JTBD — mandatory, its absence = Blocker |
| Equal importance for all criteria | Minor issue blocks, critical one passes | Preset severity: [B] / [G] / [N] per criterion |
| Re-check without comparing to gaps | Gap may not have been fixed | Load previous iteration gaps, check each one |
| Lowering severity (B→G) | Critical deliverable passes without check | Severity can be raised, but not lowered |
| Infinite FAIL cycle | Pipeline hangs | 3+ FAIL = escalation to user with options |
| Formal check "exists" | Deliverable exists, but not used by next gate | Dependency check: previous deliverable cited |
| Camp contamination (Full A/B) | Alpha and Beta mutually influence each other | Contamination = automatic Blocker |

## Output Template

```
### Gate Check — [ID] [Gate name]

**Mode:** [/ship-right-thing | /shape-prioritize | /quick-pm | /spec]
**Session:** [N of M]
**Camp:** [α / β / —]
**Iteration:** [1 / 2 / N]
**Previous gaps:** [list or "First check"]

---

#### Readiness Criteria

| # | Criterion | Sev | Status | Gap / Comment |
|---|----------|:---:|:------:|---------------|
| 1 | [Criterion from registry] | [B] | ✅/⚠️/❌ | [If not fulfilled: what is missing] |

**Dependency check:** [Deliverable [previous ID] cited: ✅/❌. Details.]

**Camp independence check (Full A/B):** [Verified / Contamination detected]

---

#### Summary

| Severity | Count | Items |
|----------|:-----:|-------|
| Blocker | [N] | #[list] |
| Gap | [N] | #[list] |
| Note | [N] | #[list] |

### Decision: [ PASS / CONDITIONAL PASS / FAIL ]

**Rationale:** [by rules: 0 blocker + 0 gap = PASS etc.]

---

#### On PASS / CONDITIONAL PASS:
**Deliverables for handoff:**
- [Artifact 1]

**Gaps for next gate (if CONDITIONAL):**
- [Gap 1 — what to consider]

→ Ready for handoff to **[Next agent]**. Awaiting **"Approved"**.

#### On FAIL:
**Gaps for rework:**

| # | Gap | Sev | What to fix | Responsible |
|---|-----|:---:|-------------|-------------|
| [N] | [description] | [B] | [specific action] | [agent] |

→ Return to **[Current agent]**. After fixes — re-check (iteration [N+1]).
[If iteration ≥ 3: escalation protocol activated]
```
