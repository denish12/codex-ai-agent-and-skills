# /shape-prioritize — Full Pipeline B (Build-vs-Cut Adversarial)

> **Use when strategy is approved and the scope discussion is open.**
> 6 sessions with adversarial on the **Build vs Cut axis**. Mediator synthesizes the final MoSCoW. Output — PRD (PDF).

## When to Use

- Strategy / vision / roadmap theme has already been agreed upon (within the team or in a previous /ship-right-thing session)
- Team disagrees: "build everything" vs "cut ruthlessly"
- Tight timeline, prioritization is important
- A final PRD with justified scope and a scope-rationale appendix is needed
- High-stakes release (quarter-defining initiative)

## When NOT to Use

- Strategy not approved → `/ship-right-thing`
- Scope approved, only a PRD is needed → `/spec`
- Quick assessment → `/quick-pm`
- Solo-PM scope decision without disagreement → `/spec` (with PM acting in consultation)

## Decision Tree (clarifying questions in COND-01)

```
Strategy approved?
  ├── NO → /ship-right-thing (strategy synthesis needed first)
  └── YES → continue

Scope debate open?
  ├── YES (team arguing / timeline pressure) → /shape-prioritize (this workflow)
  └── NO (scope known) → /spec

Risk of cut (cutting something valuable) or risk of bloat (overcommit) — equally high?
  ├── YES → /shape-prioritize (adversarial is valuable)
  └── NO (one side is obvious) → /spec

Is exec-review presentation with scope-rationale needed?
  ├── YES → /shape-prioritize (mini deck part of output)
  └── NO → /shape-prioritize still (PRD is primary), mini deck optional
```

## Pipeline (6 sessions)

```
Session 1: CONDUCTOR → DISCOVERY (scope intake)                         → session-1-handoff.md
Session 2: CONDUCTOR → BUILD-CAMP (pm α + tech_lead α)                  → session-2-handoff.md
Session 3: CONDUCTOR → CUT-CAMP (pm β + tech_lead β)                    → session-3-handoff.md
Session 4: CONDUCTOR → MEDIATOR (Scope Synthesis)                       → session-4-handoff.md
Session 5: CONDUCTOR → PM (final PRD) → UX_DESIGNER + DATA_ANALYST      → session-5-handoff.md
Session 6: CONDUCTOR → DESIGNER → LAYOUTER → RELEASE_GATE               → PDF
```

Each session starts from scratch. Unlike /ship-right-thing, PM α and β work **paired with Tech Lead α and β** — two-agent camps (parallel expertise).

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Approved strategy / roadmap theme | ✅ | Where we pull from: which initiative |
| Vision / NSM / OKR | ✅ | From the approved strategy |
| Time box (release horizon) | ✅ | Quarter / release date |
| Team composition | ✅ | Senior / mid / junior count, velocity baseline |
| Tech constraints | ✅ | Stack, integrations, existing tech debt |
| Compliance constraints | ⬚ | SOC 2 / GDPR / HIPAA / industry-specific |
| Initial backlog (if available) | ⬚ | What is already being discussed in the team |
| Budget ceiling | ⬚ | For Tech Lead feasibility with budget constraint |

## Gates and Deliverables

### Session 1 — Scope Intake Gate

- **COND-01** (Conductor): Interview Brief
  - 5+ clarifying questions (current scope debate, team composition, constraints)
  - Strategy Brief loaded (pointer or inline)
  - Scope-debate context documented

- **DISC-01** (Discovery): Scope-focused Discovery Brief
  - Which JTBD are in scope (within the approved strategy) — and which are NOT in scope
  - Assumptions: what we consider true for the scope decision
  - Open questions (that require experiments / pilots)
  - Focus on end-user JTBD (buyer has already justified the strategy)

### Session 2 — Build-Camp (Camp Alpha)

- **PM-01α** (PM α, paired with Tech Lead α): full Scope Proposal
  - RICE-scored backlog (top 15-20 items)
  - **Each item with rationale** "why it is mandatory now"
  - Include-bias: every idea is presumed necessary, burden of proof — show it can be deferred
  - Kano balance (may include delighters as argument "we won't win without this")
  - Out-of-scope: minimal, explicit

- **TECH-01α** (Tech Lead α, paired with PM α): Build Feasibility
  - "Yes, we will deliver in N team-weeks with [team setup]"
  - T-shirt by the **lower bound** with parallelization rationale
  - Existing-stack leverage points
  - Allowed trade-offs (but not cuts)
  - Managed risk posture: every risk with mitigation

### Session 3 — Cut-Camp (Camp Beta)

- **PM-02β** (PM β, paired with Tech Lead β): Minimum Scope Proposal
  - **MoSCoW**: Must — only what we cannot launch without
  - Should / Could / Won't (this release) with rationale per cut
  - Exclude-bias: every idea is presumed unnecessary, burden of proof — why it is mandatory now and not in Q2
  - Validation paths for deferred items (experiments in Q2)
  - Out-of-scope: as explicit as possible, with rationale

- **TECH-02β** (Tech Lead β, paired with PM β): Hidden Risks + Cut Rationale
  - T-shirt by the **upper bound** with hidden dependency rationale
  - Hidden integrations, migration costs
  - Technical debt implications (what cannot start without prior work)
  - Compliance phantoms (SOC 2 / GDPR riding tag)
  - 3rd party SLA risks
  - "What cannot start without [X]" explicitly for each deferred item

### Session 4 — Mediator Scope Synthesis

- **MED-01** (Mediator): Unified Scope Decision
  - **Independence check** (contamination: true/false)
  - Evidence audit per camp (coverage %, strength per position)
  - Position map **per item** (Alpha Build / Beta Cut / overlap / disagreement)
  - Disagreement analysis per item (Factual / Value / Risk / Methodological)
  - Scoring (5 dimensions): Evidence / Coherence / Delivery Feasibility / Risk / Value Density
  - Strengths & Weaknesses per camp
  - **Synthesis Path**: Adopt Build / Adopt Cut / Hybrid (often hybrid — Must from both + Should from one)
  - **Final MoSCoW** — source-pointer per item
  - Tradeoff map (what was cut and why)
  - Delivery estimate (team-weeks)

### Session 5 — Spec (Final PRD for the approved scope)

- **PM-SPEC** (PM, neutral — executes Mediator synthesis):
  - Final PRD (10 sections)
  - User stories INVEST + Gherkin AC for Mediator-approved items
  - Epic breakdown
  - Scope rationale appendix (from Mediator Tradeoff Map)
  - NFR (from Mediator synthesis + Tech reviews)
  - Success metrics (from approved Strategy)
  - Rollout plan (pilot → beta → GA with criteria)

- **UX-01** (UX Designer, in parallel):
  - User flows for Mediator-approved scope
  - Low-fi wireframes for Must items
  - Accessibility checklist (WCAG AA)
  - Design brief for Designer

- **DATA-01** (Data Analyst, in parallel):
  - Metric plan for approved scope
  - Validation experiments for deferred items (Q2 planning)
  - SaaS Impact Model (cut items — potential impact as reference)
  - Instrumentation requirements

Note: in Full B Session 5, **Tech Lead** is not required to be active — feasibility was already built in Sessions 2-3 and synthesized by Mediator. If PRD spec reveals new tech concerns — Reverse Handoff to Tech Lead.

### Session 6 — Document

- **DS-01** (Designer): Design Spec
  - PRD document IA with scope rationale appendix
  - Mini deck (10 slides): scope decision rationale for stakeholder review (not a full exec deck — Full B focus is on PRD)
  - Visualizations: MoSCoW matrix, Tradeoff map, Epic breakdown, Risk heatmap

- **LY-01** (Layouter): HTML → PDF
  - PRD HTML (25-30 pages + appendix)
  - Mini deck HTML (10 slides, if required)
  - Self-contained, print-ready

- **RG-01** (Conductor): Release Gate sign-off

## Build-Camp vs Cut-Camp Rules

**Build-Camp presumption:** every idea on the table is needed. Burden of proof — show it can be deferred.
- T-shirt by the lower bound.
- Parallelization through team setup.
- Existing-stack leverage.
- Managed risk (mitigation per risk).
- Output tone: "here is the path — this is achievable".

**Cut-Camp presumption:** every idea is unnecessary. Burden of proof — show it is mandatory now.
- T-shirt by the upper bound.
- Hidden dependencies surfaced.
- Compliance / tech debt / 3rd party risks explicit.
- Validation paths for deferred items.
- Output tone: "here are the risks — here is what we defer, and here is how we validate".

Both use the **same** Discovery Brief and Strategy Brief as input.

**Camp discipline self-check (before handoff):**
- Build-Camp: "Did I cut an item that was in Discovery?" → if yes, reconsider as Include.
- Cut-Camp: "Did I include an item on a 'nice-to-have' rationale?" → if yes, move to Should / Could.

## Adversarial Independence (pipeline rule 4)

Build-Camp (PM α + Tech Lead α) and Cut-Camp (PM β + Tech Lead β) work independently.

- They do not see each other until Mediator.
- Paired agents (PM + Tech Lead) within the same camp coordinate through Conductor handoff in the same session.
- Beta receives the Alpha deliverable read-only via camp filter in Session 3.
- Contamination check by Mediator — same as in Full A.

## Severity levels

- **P0 Blocker:** absence of one of the camps, scope without justifications, contamination critical, Mediator without synthesis
- **P1 Gap:** thin evidence in Cut-camp (acceptable, Mediator will audit); weak rationale per item
- **P2 Note:** mini deck for non-exec stakeholders; edge-case items

## Escalation paths

- **Stalemate with equal evidence** — both camps are strong, delta < 0.5, Mediator cannot choose a path → escalate to user with two scope options and recommended
- **Resource block** — scope > capacity even in Cut-Camp minimum → pause, re-scope within constraints (return to Strategy)
- **Compliance block** — Cut-Camp surfaces a compliance requirement that is critical for release → pause, legal review
- **Hidden strategy gap** — revealed that a strategy assumption does not hold → pause, return to /ship-right-thing mini-session

## Health metrics for this workflow

| Metric | Healthy | Problematic | Action |
|--------|:-------:|:-----------:|--------|
| Build-Cut divergence | Delta 10-30% items | Delta > 50% | Possible misalignment — Mediator investigate |
| Cut rationale depth | Per item with tech + user evidence | Hand-wave "nice to cut" | Reverse Handoff to Cut-Camp |
| Build feasibility confidence | ≥ 70% items with Spike or proven pattern | < 40% | Reverse Handoff to Build-Camp + Tech Lead |
| Final MoSCoW Must % | 30-50% total items | > 70% Must | Cut-Camp underdelivered, Mediator re-audit |
| Delivery estimate vs time box | ≤ 100% capacity | > 120% | Re-scope in Mediator |

## Output

- `prd.pdf` — final PRD with justified scope (25-35 pages + appendix)
- `prd.pdf` → Appendix: Scope Rationale (from Mediator Tradeoff Map)
- Optional `scope-decision-deck.pdf` — 10-slide mini deck for stakeholder review
- All `session-N-handoff.md` in `docs/product/` (N = 1..5)
- `$board` history with metrics

## Example — TeamFlow AI 1:1: Shape MVP scope (Full B)

**Request:** "Strategy approved (AI summaries). How much do we put in MVP: summary only / + coaching / + admin dashboard? Timeline Q1."

**Mode:** /shape-prioritize (strategy approved, scope debate open, 3 MVP scenarios)

**Session 1 (Discovery scope intake):**
- Which JTBD are in scope Q1: end-user summary (Must-have JTBD from previous discovery). Buyer dashboard — under review.
- Assumptions: managers actually read summaries (validated in Q4 pilot ✅). CPO pay premium for dashboard (⚠️ assumed).

**Session 2 (Build-Camp PM α + TL α):**
- RICE backlog top 12 items. Include: summary + coaching + dashboard + export + RU + Slack.
- TL: 12 team-weeks with 3 senior + 2 mid, parallelization. Existing stack covers 80%.

**Session 3 (Cut-Camp PM β + TL β):**
- MoSCoW: Must = summary + rating feedback. Should = coaching (validate first). Could = dashboard (assumption unvalidated). Won't = RU, Slack, export.
- TL β: Dashboard revealed dependency on new aggregation service (+3 team-weeks). Compliance on OpenAI TOS in-progress (P1 gap).

**Session 4 (Mediator Scope Synthesis):**
- Scoring: Build Total 7.0, Cut Total 7.6 (delta 0.6 → slight Cut advantage).
- Synthesis: **Hybrid** — Must = summary + rating (from both), Should = coaching (with validation gate at W4), Could = dashboard (spike in W2 for CPO interviews), Won't = RU / Slack / export.
- Tradeoff map: dashboard deferred until validation (P1 — will disconnect 20% premium revenue hypothesis), coaching Should with go/no-go gate.

**Session 5 (Spec):**
- PRD: 8 user stories for Must + coaching, 3 epics, rollout pilot.
- UX: primary flow (generate summary), coaching prompt panel (Should, MVP-2).
- Data: NSM tree, 3 hypotheses, A/B design for coaching.

**Session 6:**
- PRD 28 pages + scope rationale appendix (4 pages).
- Mini deck 10 slides (scope decision rationale for VP Eng review).
- Release Gate sign-off.

**Result:** 6 sessions × ~1.5h = 9h for unified scope with explicit tradeoffs, validated through adversarial debate.
