---
name: product-pipeline-rules
description: Absolute rules of the product pipeline — gates, discipline, camp independence, inter-session protocol
---

# Product Pipeline Rules

> [!CAUTION]
> **🔴 ABSOLUTE RULE #1:** The pipeline cannot be skipped. No exceptions.
> Every gate → read the agent → deliverable → `$gates` PASS → `$handoff` → **User sign-off** → next gate.
>
> **🔴 ABSOLUTE RULE #2:** In Full A/B — **Camp Independence**. Alpha and Beta do not see each other's work until Mediator. Violation = P0 contamination.

---

## Four Pipeline Modes

### 🔵 Full Pipeline A — `/ship-right-thing` (6 sessions)

Full strategic cycle with adversarial on the **Customer vs Business axis**. Mediator synthesizes. Output — PRD + Product Review Deck (PDF).

```
Session 1: CONDUCTOR → DISCOVERY                                        → session-1-handoff.md
Session 2: CONDUCTOR → CUSTOMER-CHAMPION (product_strategist α)         → session-2-handoff.md
Session 3: CONDUCTOR → BUSINESS-CHAMPION (product_strategist β)         → session-3-handoff.md
Session 4: CONDUCTOR → MEDIATOR (Strategy Synthesis)                    → session-4-handoff.md
Session 5: CONDUCTOR → PM → UX_DESIGNER + TECH_LEAD + DATA_ANALYST      → session-5-handoff.md
Session 6: CONDUCTOR → DESIGNER → LAYOUTER → RELEASE_GATE               → PDF
```

### 🔵 Full Pipeline B — `/shape-prioritize` (6 sessions)

Scope-decision cycle with adversarial on the **Build vs Cut axis**. Strategy is approved, scope is open. Mediator synthesizes the final MoSCoW. Output — PRD (PDF).

```
Session 1: CONDUCTOR → DISCOVERY (scope intake)                         → session-1-handoff.md
Session 2: CONDUCTOR → BUILD-CAMP (pm α + tech_lead α)                  → session-2-handoff.md
Session 3: CONDUCTOR → CUT-CAMP (pm β + tech_lead β)                    → session-3-handoff.md
Session 4: CONDUCTOR → MEDIATOR (Scope Synthesis)                       → session-4-handoff.md
Session 5: CONDUCTOR → PM (final PRD) → UX_DESIGNER + DATA_ANALYST      → session-5-handoff.md
Session 6: CONDUCTOR → DESIGNER → LAYOUTER → RELEASE_GATE               → PDF
```

### 🟢 Spec — `/spec` (1 session)

Strategy and scope are approved. A formal PRD is needed. No adversarial. Output — PRD (markdown).

```
CONDUCTOR → PM → UX_DESIGNER + TECH_LEAD → PRD (markdown)
```

### 🟡 Quick — `/quick-pm` (1 session)

Quick assessment, focused question, low stakes. No adversarial. Output — Short brief (markdown).

```
CONDUCTOR → DISCOVERY → product_strategist → PM → TECH_LEAD → DATA_ANALYST → Short Brief
```

---

## Decision Tree — Mode Selection

```
Strategy approved?
  ├── NO + full plan needed                → /ship-right-thing (Full A)
  ├── YES + scope unclear, scope debate    → /shape-prioritize (Full B)
  ├── YES + scope approved, PRD needed     → /spec
  └── Quick assessment, focused question  → /quick-pm

Unsure? → 5 clarifying questions in Conductor Clarification Gate → propose mode with rationale
```

Escalation: if Conductor sees that the request does not match — asks 5 clarifying questions and proposes a mode with rationale. Transition only on "Approved".

---

## Mandatory Rules (7) — MANDATORY ENFORCEMENT

### Rule 1: Gates Cannot Be Skipped
- Gate order is defined by the workflow mode.
- Each gate requires: deliverable + `$gates` PASS + `$handoff` + user sign-off.
- Skipping a gate → 🔴 **P0 / BLOCKER**.

**Enforcing skills:** `$gates` (readiness check), `$board` (status tracking), `$handoff` (context transfer).

### Rule 2: Clarification First
- In Session 1 — Conductor asks **at least 5 clarifying questions** before Discovery work begins.
- Without answers to mandatory questions (mode / product task / segment / constraints / format) — P0 Blocker.

**Enforcing skills:** `$gates` (COND-01 criteria include "5+ questions answered").

### Rule 3: Handoff Is Mandatory Between Sessions
- Without a handoff file, the next session does not start.
- Handoff contains the **full text of artifacts** (not links — the next session has no context).
- A ready-made prompt is generated (`$session-prompt-generator`) for Full A/B.

**Enforcing skills:** `$handoff` (Session type), `$session-prompt-generator` (prompt), `$board` (state saving).

### Rule 4: Adversarial Independence (Full A/B)
- Camp Alpha and Camp Beta work **independently**, they do not see each other's artifacts until Mediator.
- Beta receives the Alpha deliverable as a read-only input in Session 3 (via camp filter).
- Alpha handoff to Beta — marked `team: beta` + filter rules.
- Violation (contamination) → P0, Mediator marks `contamination: true`, confidence is lowered.

**Enforcing skills:** `$handoff` (camp marker), `$gates` (camp independence check at COND-0N).

### Rule 5: Evidence > Opinion
- Every position in a deliverable — with a source (Discovery evidence inventory or external).
- Without evidence → explicit mark `⚠️ assumed`.
- Mediator accounts for this during scoring (lowering Evidence Strength).
- PRD with ≥ 30% assumed positions without a risk register → P1 Gap.

**Enforcing skills:** `$gates` (evidence coverage check), `$assumption-mapping` (risk × uncertainty).

### Rule 6: Mediator Does Not Write Their Own Strategy
- Mediator **only synthesizes** from the two available positions (Alpha + Beta).
- Third way without grounding in the camps → P0 "Third Way Invention".
- Synthesis paths: Adopt Alpha / Adopt Beta / Hybrid — always with source-pointer per element.

**Enforcing skills:** `$gates` (MED-01 criteria include source-pointer verification).

### Rule 7: Release Gate Is Final
- PDF / PRD is not delivered to the user without `$gates` sign-off at RG-01.
- All preceding gates must be [✓].
- User sign-off received.

**Enforcing skills:** `$gates` (RG-01 criteria), `$handoff` (final envelope).

---

## Mapping "Rule → Skill → Check"

| Rule | Skills | What is checked | On violation |
|------|--------|-----------------|--------------|
| 1. Gates cannot be skipped | `$gates`, `$board`, `$handoff` | Board statuses are sequential, no gaps | 🔴 P0 Blocker |
| 2. Clarification First | `$gates` (COND-01) | 5+ questions asked, answers received | 🔴 P0 Blocker |
| 3. Handoff mandatory | `$handoff` (Session), `$session-prompt-generator` | File saved, artifacts as full text, prompt generated | 🔴 P0 Blocker |
| 4. Camp Independence | `$handoff` (camp marker), `$gates` (contamination check) | Camp marker correct, no cross-camp reads | 🔴 P0 Blocker |
| 5. Evidence > Opinion | `$gates` (evidence coverage), `$assumption-mapping` | Every position with source or `⚠️ assumed` mark | 🟠 P1 Gap (or P0 if coverage < 50%) |
| 6. Mediator synthesis | `$gates` (MED-01 criteria), source-pointer verification | Unified deliverable with source per element | 🔴 P0 Blocker |
| 7. Release Gate | `$gates` (RG-01), `$handoff` | All gates [✓], PDF tested, user sign-off | 🔴 P0 Blocker |

---

## Mechanical Blocks (enforced checks)

| # | Block | When | What it checks | On failure |
|---|-------|------|----------------|------------|
| 1 | **Pre-flight check** | Before writing deliverable | Quote the user's last "Approved" | Stop, request Approved |
| 2 | **Skill read check** | Before applying a skill | Read SKILL.md via `view_file` | Read, then apply |
| 3 | **Camp marker check** | Full A/B Sessions 2-3 | Handoff contains `team: alpha` or `team: beta` | Reverse Handoff to Conductor |
| 4 | **Evidence pointer check** | Every deliverable in Sessions 2-5 | Every position with source or `⚠️ assumed` | Mark or remove |
| 5 | **Handoff file check** | Before closing session (Full A/B) | `docs/product/session-N-handoff.md` saved, self-contained | Do not close session, save file |
| 6 | **Contamination check** | Mediator Session 4 | Alpha and Beta do not contain direct quotes of each other without marking | Mark contamination: true, lower confidence |
| 7 | **PRD metrics check** | PM-SPEC (Session 5 / Spec) | PRD contains success metrics section (NSM / OKR link) | Do not pass to further gates |

---

## Gate Sequencing

| Gate ID | Session | Agent | Deliverable | Severity on failure |
|---------|:-------:|-------|-------------|---------------------|
| COND-01 | 1 | Conductor | Interview Brief (5+ questions answered) | Blocker |
| DISC-01 | 1 | Discovery | Discovery Brief (JTBD + problems + assumptions + evidence) | Blocker |
| STRAT-01α | 2 (Full A) | product_strategist α | Strategy Brief Alpha (Customer-Champion) | Blocker |
| STRAT-02β | 3 (Full A) | product_strategist β | Strategy Brief Beta (Business-Champion) | Blocker |
| PM-01α | 2 (Full B) | PM α + Tech Lead α | Scope Proposal Alpha (Build-Camp) | Blocker |
| PM-02β | 3 (Full B) | PM β + Tech Lead β | Scope Proposal Beta (Cut-Camp) | Blocker |
| MED-01 | 4 (Full A/B) | Mediator | Unified Synthesis (Strategy or Scope) | Blocker |
| PM-SPEC | 5 | PM | Final PRD + prioritized backlog | Blocker |
| UX-01 | 5 | UX Designer | User flows + wireframes | Gap (PRD ok without for non-UI) |
| TECH-01 | 5 | Tech Lead | Feasibility + NFR + risks + epic breakdown | Blocker |
| DATA-01 | 5 | Data Analyst | Metric plan + hypotheses + experiments | Blocker |
| DS-01 | 6 | Designer | Design spec (PRD layout + Deck) | Blocker |
| LY-01 | 6 | Layouter | HTML self-contained, print-ready | Blocker |
| RG-01 | 6 | Conductor | Release Gate sign-off | Blocker |

## Severity Levels

| Priority | Description | Action |
|:--------:|-------------|--------|
| 🔴 **P0 / BLOCKER** | Blocks progress / PDF publication | Immediately: fix or escalate |
| 🟠 **P1 / IMPORTANT / GAP** | Important to fix before finalization, can continue with risk register | By Release Gate |
| 🟡 **P2 / NICE-TO-HAVE / NOTE** | Can be included in the next iteration | Backlog |

---

## Escalation Protocol

### When user sign-off is missing
1. Show the deliverable and request "Approved".
2. If no response — **wait**. Do not proceed to the next gate.
3. Remind: "Waiting for 'Approved' to proceed to [next gate]".
4. **Never** auto-proceed. `ShouldAutoProceed = false` ALWAYS.

### On repeated FAIL at `$gates`
| Iteration | Action |
|:---------:|--------|
| 1st FAIL | Standard return: list of gaps → agent revises |
| 2nd FAIL | Extended return + specific instructions on "how to fix" |
| 3+ FAIL | **Escalate to user** via `$gates` protocol (options: scope revision / return to previous gate / forced CONDITIONAL PASS) |

### When a problem is discovered at a subsequent gate (Reverse Handoff)
1. Agent creates a Reverse Handoff describing the problem via `$handoff`.
2. Conductor routes the return to the appropriate gate.
3. `$board` updates: current gate → `[↩]`, return gate → `[→]`.
4. After fix — repeat `$gates`.

### Stalemate (Mediator cannot synthesize)
- Both camps are weak (low evidence, low coherence).
- Mediator does not perform forced synthesis.
- Escalate to user: two options + rationale + recommended path (usually — rerun one of the camps).

### Contradictory evidence
- Data from the two camps is incompatible.
- Loop back to Discovery for additional interviews / data pull.
- Or escalate to user for a solo-decision.

### Compliance block
- A requirement is discovered that needs legal / security review.
- Pause pipeline, external review, return afterwards.

### Resource block
- Cannot be implemented within the given constraints.
- Tech Lead escalates to Cut-Camp mode or requests a timeline / budget revision.

---

## Pipeline Health Metrics

`$board` calculates and displays on every update:

| Metric | Formula | Healthy | Problematic |
|--------|---------|:-------:|:-----------:|
| Progress (%) | Completed / Total × 100 | Growing | Stagnating |
| Avg time/gate | Σ time / completed | ≤ 20 min | > 40 min |
| Blockers (total) | Count of [!] for all time | 0-1 | ≥ 3 |
| Returns (total) | Count of [↩] for all time | 0-1 | ≥ 3 |
| FAIL rate | FAILs / gate checks × 100 | < 20% | > 40% |
| Evidence coverage | % positions with ✅ Verified | ≥ 80% | < 50% |
| Camp contamination | false / true | false | true |

**When FAIL rate > 40%** or **contamination = true:** Conductor escalates to user — possibly, scope is too wide, data is insufficient, or the process has been violated.

---

## Pipeline Artifacts

### Full Pipeline A (ship-right-thing)

| Session | Artifact | Format | Created by | Skill |
|:-------:|----------|--------|------------|-------|
| 1 | Interview Brief | Markdown | Conductor | — |
| 1 | Discovery Brief | Markdown (in handoff) | Discovery | `$jtbd-canvas`, `$problem-statement`, `$assumption-mapping` |
| 1 | Session 1 Handoff | `docs/product/session-1-handoff.md` | Conductor | `$handoff`, `$session-prompt-generator` |
| 2 | Strategy Brief Alpha (Customer-Champion) | Markdown | product_strategist α | `$product-vision`, `$north-star-metric`, `$okr-framework`, `$product-roadmap` |
| 2 | Session 2 Handoff | `docs/product/session-2-handoff.md` | Conductor | `$handoff`, `$session-prompt-generator` |
| 3 | Strategy Brief Beta (Business-Champion) | Markdown | product_strategist β | (same skills) |
| 3 | Session 3 Handoff | `docs/product/session-3-handoff.md` | Conductor | `$handoff`, `$session-prompt-generator` |
| 4 | Unified Strategy Synthesis | Markdown | Mediator | — |
| 4 | Session 4 Handoff | `docs/product/session-4-handoff.md` | Conductor | `$handoff`, `$session-prompt-generator` |
| 5 | Final PRD + backlog | Markdown | PM | `$prd-template`, `$user-story`, `$acceptance-criteria`, `$rice-scoring` |
| 5 | UX output (flows + wireframes) | Markdown | UX Designer | `$user-flow`, `$design-brief` |
| 5 | Tech Brief (full feasibility) | Markdown | Tech Lead | `$epic-breakdown` |
| 5 | Metric Plan | Markdown | Data Analyst | `$saas-metrics`, `$hypothesis-template`, `$ab-test-design`, `$aarrr-metrics` |
| 5 | Session 5 Handoff | `docs/product/session-5-handoff.md` | Conductor | `$handoff`, `$session-prompt-generator` |
| 6 | Design Spec | Markdown | Designer | `$report-design` |
| 6 | PRD HTML + Product Review Deck HTML | HTML → PDF | Layouter | `$html-pdf-report` |
| 6 | Release Gate sign-off | — | Conductor | `$gates` |

### Full Pipeline B (shape-prioritize)

| Session | Artifact | Format | Created by | Skill |
|:-------:|----------|--------|------------|-------|
| 1 | Discovery Brief (scope intake) | Markdown | Discovery | `$jtbd-canvas`, `$assumption-mapping` |
| 2 | Scope Proposal Alpha (Build-Camp) | Markdown | PM α + Tech Lead α | `$rice-scoring`, `$epic-breakdown` |
| 3 | Scope Proposal Beta (Cut-Camp) | Markdown | PM β + Tech Lead β | `$moscow-prioritization`, `$epic-breakdown` |
| 4 | Unified Scope Decision | Markdown | Mediator | — |
| 5 | Final PRD + UX + Metric plan (same as Full A S5, without new strategy) | Markdown | PM, UX, Data Analyst | (see Full A) |
| 6 | PRD HTML + mini deck → PDF | HTML → PDF | Designer + Layouter | `$report-design`, `$html-pdf-report` |

### Spec

| Artifact | Format | Created by | Skill |
|----------|--------|------------|-------|
| PRD | Markdown | PM | `$prd-template`, `$user-story`, `$acceptance-criteria` |
| UX notes (if UI) | Markdown | UX Designer | `$user-flow` |
| Tech notes | Markdown | Tech Lead | `$epic-breakdown` |

### Quick

| Artifact | Format | Created by | Skill |
|----------|--------|------------|-------|
| Short Brief | Markdown (1-2 pages) | PM (with contributions from others) | `$rice-scoring` (rough), `$saas-metrics` |

---

## Localization

- Default: `ru`
- Each artifact can be localized via `locales/en/` (Phase 2, not included in Phase 1).

---

## Pipeline Launch Checklist (for Conductor)

Conductor performs on initialization:

- [ ] Mode determined by Decision Tree (Full A / Full B / Spec / Quick)
- [ ] 5+ clarifying questions asked and answered
- [ ] `$board` created with correct gate IDs (from Gate Sequencing)
- [ ] First gate activated (COND-01 → [→])
- [ ] User sign-off received on mode and scope
- [ ] For a continuing session: handoff file loaded and verified (recovery protocol `$handoff`)

## Session Close Checklist (for Conductor)

Conductor performs before wrapping up:

- [ ] All gates of the current session are [✓] or [⊘] (no [→] or [!])
- [ ] `$board` saved in the handoff file
- [ ] All artifacts included as **full text** in handoff
- [ ] Camp marker set correctly (Full A/B Sessions 2-3)
- [ ] Evidence coverage checked (≥ 80% or risk register updated)
- [ ] `$session-prompt-generator` called, prompt generated (Full A/B)
- [ ] Handoff file saved: `docs/product/session-N-handoff.md`
- [ ] File is self-contained (test: work can start without external context)
- [ ] User sign-off received for session close

## Release Gate Checklist (for Conductor, Session 6)

- [ ] All gates of all sessions are [✓] on `$board`
- [ ] PRD HTML / PDF ready (LY-01 self-containment check passed)
- [ ] Product Review Deck ready (Full A)
- [ ] Visual check: page breaks clean, cross-links work, TOC correct
- [ ] File size reasonable (< 10 MB PRD / < 5 MB deck)
- [ ] Content intact — not modified by Layouter
- [ ] User sign-off received
- [ ] Final board + log shown to user
