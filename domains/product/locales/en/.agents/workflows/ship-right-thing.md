# /ship-right-thing — Full Pipeline A (Customer-vs-Business Adversarial)

> **Use when strategy is not approved and a full plan from discovery to PRD + PDF is needed.**
> 6 sessions with adversarial on the **Customer vs Business axis**. Mediator synthesizes. Output — PRD + Product Review Deck (PDF).

## When to Use

- New product direction, pivot, large initiative
- High stakes: decision will affect quarters of work
- A second perspective on strategy is needed (Customer vs Business)
- Final artifact — Product Review Deck for exec sign-off
- Strategy alternatives are not obvious — adversarial debate is needed, not solo-planning

## When NOT to Use

- Small fix → `/quick-pm`
- Strategy approved, scope under discussion → `/shape-prioritize`
- Scope approved → `/spec`
- Known roadmap theme, only a detailed PRD is needed → `/spec`

## Decision Tree (clarifying questions in COND-01)

```
Strategy / vision / NSM approved?
  ├── NO → /ship-right-thing (this workflow)
  └── YES → /shape-prioritize or /spec

Is a PDF needed for exec-review?
  ├── YES → /ship-right-thing (Product Review Deck — Full A output)
  └── NO + only PRD → /spec or /shape-prioritize (if scope is open)

Stakes:
  ├── High (quarters of work, $100K+ investment) → /ship-right-thing
  └── Low (reversible, weekly decision) → /quick-pm
```

## Pipeline (6 sessions)

```
Session 1: CONDUCTOR → DISCOVERY                                        → session-1-handoff.md
Session 2: CONDUCTOR → CUSTOMER-CHAMPION (product_strategist α)         → session-2-handoff.md
Session 3: CONDUCTOR → BUSINESS-CHAMPION (product_strategist β)         → session-3-handoff.md
Session 4: CONDUCTOR → MEDIATOR (Strategy Synthesis)                    → session-4-handoff.md
Session 5: CONDUCTOR → PM → UX_DESIGNER + TECH_LEAD + DATA_ANALYST      → session-5-handoff.md
Session 6: CONDUCTOR → DESIGNER → LAYOUTER → RELEASE_GATE               → PDF
```

Each session starts from scratch — the handoff file is the only source of context.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Product question | ✅ | What we are solving, for whom — in 1 sentence |
| Segment | ✅ | SMB / mid-market / enterprise |
| Current metrics | ✅ | ARR, churn, NRR, LTV/CAC, Payback |
| Constraints | ✅ | Timeline, team, tech, compliance, budget |
| Planning horizon | ⬚ | Usually 1-2 quarters for Q1 delivery |
| Existing product context | ⬚ | Current features / stack / recent incidents |
| Competitive landscape | ⬚ | Key competitors (Mediator uses in evidence audit) |

## Gates and Deliverables

### Session 1 — Discovery Gate

- **COND-01** (Conductor): Interview Brief
  - 5+ clarifying questions answered
  - Pipeline mode confirmed
  - Scope and anti-scope defined
  - `$board` created with the full list of gates

- **DISC-01** (Discovery): Discovery Brief
  - JTBD (functional / emotional / social) — **separately for buyer and end-user** (B2B critical)
  - Problem statements (top 3-5) — formula [actor][context][pain][root cause][evidence]
  - Assumption map (4 quadrants: value / usability / feasibility / viability) with top risky
  - Evidence inventory with quality markers (✅ Verified / ⚠️ Old / 🔮 Assumed)
  - Open questions for Session 2

### Session 2 — Customer-Champion (Camp Alpha)

- **STRAT-01α** (product_strategist α): Strategy Brief Alpha
  - Vision (from user outcomes — "managers save 2h/week...")
  - NSM — user-value metric (WAM using feature × rating ≥ 4/5)
  - OKR (1-3 Objectives + 3-5 KR each, with numbers and deadlines)
  - Roadmap (theme-based: Now / Next / Later)
  - Kano balance (must-have / performance / delighters with user-pain focus)
  - Evidence traceability per position
  - Top 5 risks with mitigation

### Session 3 — Business-Champion (Camp Beta)

- **STRAT-02β** (product_strategist β): Strategy Brief Beta
  - Vision (from business outcomes — "+$1M ARR in HR-tech segment...")
  - NSM — business-value metric (ARR per seat, NRR by segment)
  - OKR (ARR, CAC payback, NRR, win rate focus)
  - Roadmap (theme-based, opens sales motion / pricing / moat first)
  - Rationale: revenue / margin / competitive moat
  - Evidence traceability per position
  - Top 5 risks with mitigation

### Session 4 — Mediator Strategy Synthesis

- **MED-01** (Mediator): Unified Strategy Brief
  - **Independence check** (contamination: true/false)
  - Evidence audit per camp (coverage %, strength per position)
  - Position map (Alpha vs Beta on key themes: Vision / NSM / OKR / Roadmap / Risks)
  - Disagreement analysis (Factual / Value / Risk / Methodological classification)
  - Scoring (5 dimensions × 0-10): Evidence / Coherence / Feasibility / Risk / User-Business Fit
  - Strengths & Weaknesses per camp
  - **Synthesis Path**: Adopt Alpha / Adopt Beta / Hybrid (with explicit rationale)
  - **Unified deliverable** (Vision, NSM, OKR, Roadmap) — source-pointer per element

### Session 5 — Planning + Specification

- **PM-SPEC** (PM): Final PRD + prioritized backlog
  - PRD 10 sections (Overview → Rollout)
  - RICE-scored backlog top 15
  - User stories INVEST + Gherkin AC
  - Epic breakdown 4-8 epics
  - Dependencies map with UX / Tech / Data
  - Out-of-scope explicit

- **UX-01** (UX Designer, in parallel with Tech + Data):
  - User flows (primary + secondary + edge)
  - Low-fi wireframes
  - Accessibility checklist (WCAG AA baseline)
  - Design brief for Designer downstream

- **TECH-01** (Tech Lead, in parallel):
  - Architecture review
  - Feasibility matrix (t-shirt per item with rationale)
  - NFR (9 categories: performance / security / scalability / compliance / observability / integrations / accessibility / i18n / privacy)
  - Risk Register (5-10 risks with P×I + mitigation + owner)
  - Dependencies Map + Critical Path (team-weeks floor)
  - Epic breakdown with critical path membership

- **DATA-01** (Data Analyst, in parallel):
  - Metric Plan (tree: NSM → inputs → guardrails → leading)
  - Hypotheses formalized (3-7 with threshold + timeframe)
  - Experiment designs (per primary hypothesis with sample size / MDE / guardrails)
  - SaaS Impact Model (ARR / churn / NRR / LTV/CAC / Rule of 40)
  - AARRR funnel (B2B-adapted: Activation ≠ signup)
  - Instrumentation requirements (events / properties / cohorts / privacy)

### Session 6 — Document Finalization

- **DS-01** (Designer): Design Spec
  - PRD document IA (10 sections)
  - Product Review Deck structure (14-15 slides, Why→What→How→When→Measure→Risks→Ask arc)
  - Visual hierarchy (typography, color B2B sober, spacing 8pt)
  - Key visualizations spec (roadmap, metric tree, RICE, risk heatmap, flow summary)
  - Layouter handoff spec (8 sections)

- **LY-01** (Layouter): HTML → PDF
  - Self-contained PRD HTML (semantic, print-ready)
  - Self-contained Deck HTML (15-20 slides)
  - Embedded CSS, page-break hints, @page rules
  - TOC with anchors
  - Visualizations: CSS Grid / SVG / Mermaid / Chart.js with fallback

- **RG-01** (Conductor): Release Gate sign-off
  - All gates [✓]
  - Visual check PDF (page breaks, content intact)
  - User sign-off received

## Adversarial Independence (pipeline rule 4)

**Critical:** Alpha and Beta work independently in Sessions 2 and 3.

- Both receive the same Discovery Brief (from Session 1).
- They do not share artifacts, they do not see the other camp's position.
- Beta handoff in Session 3 is marked `team: beta` + contains Alpha deliverable read-only via camp filter.
- Conductor applies camp filter when forming Session 3 handoff (Alpha Strategy → Beta read-only).

**Contamination check** (Mediator, Step 1):
- Direct quotes from Alpha in Beta without marking → contamination: true.
- Structural mirroring (Beta vision = rephrased Alpha) → flag.
- When contamination: `confidence` in synthesis is lowered, user notified, possible rerun of one of the camps.

## Severity levels

- **P0 Blocker:** absence of Discovery Brief, one of the camps, Mediator synthesis; contamination = true (critical case)
- **P1 Gap:** weak evidence in one camp (acceptable, Mediator will account for it during scoring), evidence coverage 50-79%
- **P2 Note:** UX wireframes for non-UI initiatives; low-priority disagreements

## Escalation paths

- **Stalemate** (Mediator cannot synthesize, both camps are weak) → escalate to user with two options + rationale + recommended (usually rerun one of the camps)
- **Contradictory evidence** between camps → additional discovery mini-session (loop back to Discovery)
- **Compliance block** found in Session 5 (Tech Lead review) → pause pipeline, legal / security review, return
- **Resource block** (scope > capacity) → loop back to Mediator for re-synthesis with cut constraints or escalate budget
- **User non-sign-off** on Mediator synthesis → Reverse Handoff to Discovery for more evidence

## Health metrics for this workflow

| Metric | Healthy | Problematic | Action |
|--------|:-------:|:-----------:|--------|
| Session 1-3 velocity | 1 session / 1-2 days | > 3 days / session | Check clarification quality |
| Evidence coverage (per camp) | ≥ 80% | < 50% | Discovery loop |
| Contamination | false | true | Rerun or partial rerun |
| Mediator synthesis delta (Total) | < 1.5 (hybrid expected) | > 3.0 | Possible bias, re-audit |
| Session 5 parallel completion | All 4 parallel agents ✅ | Sequential due to dependencies | Unblock by PM |

## Output

- `prd.pdf` — final PRD for the team (30-45 pages)
- `product-review-deck.pdf` — for exec sign-off (15-20 slides)
- All `session-N-handoff.md` in `docs/product/` (N = 1..5)
- `$board` history with metrics

## Example — TeamFlow AI 1:1 Summarization (end-to-end)

**Request:** "Should we launch AI 1:1 summarization for managers? What should the strategy be?"

**Mode:** /ship-right-thing (strategy not approved, high stakes — $M initiative)

**Session 1 (Discovery):**
- Conductor: 5+ questions (segment HR-tech, ARR $8M, buyer=CPO, end-user=Manager).
- Discovery: 8 manager interviews (✅ Verified), CPO 2 interviews (⚠️ Old). 3 problems (top: 2h/week prep pain). 8 assumptions (top risky: "managers actually read summaries"). Coverage 72%.

**Session 2 (Customer-Champion α):**
- Strategy Alpha: Vision "managers save 2h/week", NSM = "40% MAM × 4.0 rating", OKR focus adoption + retention.

**Session 3 (Business-Champion β):**
- Strategy Beta: Vision "unlock $1M ARR HR-tech segment", NSM = "ARR per seat × seats-with-activity", OKR focus sales motion + ARPU.

**Session 4 (Mediator):**
- Scoring: Alpha Total 7.3, Beta Total 7.4 (delta < 0.5 → parity).
- Synthesis: **Hybrid** — Alpha vision (user) + Beta risk lens (adoption stall) + hybrid OKR (40% MAM + 10 HR-tech logo wins).

**Session 5 (Planning):**
- PM PRD: 10 user stories, RICE-scored, 5 epics, rollout pilot→beta→GA.
- UX: primary flow (generate summary post-1:1), accessibility WCAG AA.
- Tech: 10 team-weeks critical path, 5 managed risks.
- Data: NSM tree, 3 hypotheses, 1 A/B design (coaching prompts).

**Session 6 (Document):**
- Designer: PRD 35 pages + Deck 15 slides.
- Layouter: HTML → PDF, self-contained.
- Release Gate: user sign-off, PDF published.

**Result:** 6 sessions × ~2h = 12h for a unified plan, validated with adversarial debate, evidence-based.
