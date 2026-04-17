# /spec — PRD-only Pipeline (1 session, no adversarial)

> **Use when strategy and scope are approved — a formal PRD is needed.**
> 1 session, no adversarial. Output — PRD (markdown) or PRD PDF (optional).

## When to Use

- Strategy approved (in previous `/ship-right-thing` sessions or from an external process)
- Scope approved (in `/shape-prioritize` or from a roadmap document)
- Team is ready to start implementation — a PRD is needed for handoff
- Feature / initiative within an approved roadmap theme
- Team alignment already achieved — spec is needed for engineering / UX / QA

## When NOT to Use

- Scope is open → `/shape-prioritize`
- Strategy unclear → `/ship-right-thing`
- A quick assessment without a full PRD is needed → `/quick-pm`
- Exploratory / discovery-heavy initiative → `/ship-right-thing`

## Decision Tree (clarifying questions in COND-01)

```
Strategy approved?
  ├── NO → /ship-right-thing
  └── YES → continue

Scope approved?
  ├── NO → /shape-prioritize
  └── YES → continue

Success =
  ├── Full PRD for engineering handoff → /spec (this workflow)
  ├── Short brief for discussion → /quick-pm
  └── Deep strategy rethink → /ship-right-thing
```

## Pipeline (1 session)

```
CONDUCTOR → PM → UX_DESIGNER + TECH_LEAD → PRD (markdown)
             ↓
            DATA_ANALYST (for success metrics validation)
```

Sequential-parallel:
- PM launches PRD draft.
- UX Designer + Tech Lead work in parallel on PM output.
- Data Analyst — sanity check success metrics.
- PM finalizes PRD, integrating UX + Tech + Data input.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Initiative name | ✅ | What we are specifying |
| Approved strategy context | ✅ | NSM, OKR, roadmap theme (reference or inline) |
| Approved scope | ✅ | Backlog / MoSCoW / decision memo |
| User segments | ✅ | Buyer vs end-user (from Discovery / strategy) |
| Constraints | ✅ | Timeline, team, NFR (from Tech expectations) |
| Existing flows / screens | ⬚ | If extension of existing UI |
| Success metrics expected | ⬚ | Usually inherited from approved strategy NSM |

## Gates and Deliverables

### COND-01 — Clarification + Scope Review

- **Conductor**:
  - 5+ clarifying questions (scope boundaries, timeline, NFR expectations, audience)
  - Validate approved scope (sanity check — are there open questions?)
  - Identify dependencies (other teams / external services / compliance)
  - `$board` created with 5 gates (COND-01 / PM-SPEC / UX-01 / TECH-01 / LITE-RG)

### PM-SPEC — Core PRD

- **PM**: Final PRD via `$prd-template` (10 sections):
  1. Overview (problem + audience + business context)
  2. Goals & Success Metrics (NSM / OKR link)
  3. Solution Approach + non-goals
  4. User Stories (INVEST) — 5-10 stories
  5. Acceptance Criteria (Gherkin) per story
  6. NFR (compact)
  7. Risks (top 5 with mitigation)
  8. Rollout Plan (pilot → GA)
  9. Dependencies
  10. Open Questions

- **PM** also:
  - Epic breakdown (3-5 epics)
  - Out-of-scope explicit

### UX-01 — User Flows + Wireframes (in parallel with Tech, if UI)

- **UX Designer** via `$user-flow` + `$design-brief`:
  - User flows for primary + secondary flows
  - Low-fi wireframes for key screens
  - Accessibility checklist (WCAG AA baseline)
  - Design brief for downstream visual designer (optional, if hi-fi is required)
  - B2B persona delineation (buyer flows / end-user flows / shared)

If initiative is non-UI (backend / infrastructure) — UX skip, marked as N/A on `$board`.

### TECH-01 — Feasibility + NFR (in parallel with UX)

- **Tech Lead** (neutral mode, no camp):
  - Architecture review
  - Feasibility check (Yes / Yes-caveat / No + rationale per item)
  - NFR (compact — top 5-7 categories: performance / security / compliance / observability / integrations)
  - Risk Register (top 3-5 with P×I + mitigation + owner)
  - Integration map (dependencies on other services / teams)
  - Epic breakdown (shallow, shared with PM)

### DATA-01 — Metric Plan (optional if scope contains new metrics)

- **Data Analyst**:
  - Metric tree (NSM + top 3 inputs + guardrails)
  - Hypothesis formalization (1-3, if applicable)
  - Instrumentation requirements (events + properties)
  - Baseline and target values

If success metrics are inherited as-is from the approved strategy and instrumentation already exists — Data skip, marked N/A.

### LITE-RG — PRD Finalization

- **PM** merges UX + Tech + Data input
- Self-review checklist (PRD Content Checklist — below)
- Cross-check acceptance criteria for consistency with user stories
- User sign-off

### Optional: DS-01 + LY-01 (if PDF is needed)

- Designer: compact design spec (10-15 page PRD layout).
- Layouter: HTML → PDF.
- Adds +1 session (Session 2 Spec becomes a Full A-style document session).

## PRD Content Checklist (LITE-RG criteria)

- [ ] Problem (clear, evidence-backed, from approved Discovery pointer)
- [ ] Audience (buyer + end-user from Discovery)
- [ ] Solution approach (1-2 paragraphs, no implementation details)
- [ ] Success metrics (primary NSM + guardrails — from approved strategy)
- [ ] User stories (INVEST — Independent / Negotiable / Valuable / Estimable / Small / Testable)
- [ ] Acceptance criteria (Gherkin Given/When/Then)
- [ ] Non-functional requirements (performance / security / compliance / accessibility)
- [ ] Out-of-scope (explicit list)
- [ ] Risks (top 3-5 with mitigation + owner)
- [ ] Rollout plan (pilot / beta / GA with criteria + rollback)
- [ ] Dependencies (other teams / external / compliance)
- [ ] Open questions (owner + deadline)

## Severity levels

- **P0 Blocker:** PRD without success metrics; user stories without AC; NFR void; audience undefined
- **P1 Gap:** Skipped UX for an initiative where UI is affected; missing rollout plan; thin dependencies
- **P2 Note:** Optional PDF; expanded risks beyond top 5

## Escalation paths

- **Scope reveals strategy gap** (new contradiction with approved strategy) → pause, escalate to /ship-right-thing mini-session
- **Scope reveals feasibility blocker** (Tech Lead surfaces hard-no) → pause, escalate to PM / stakeholder for re-scope
- **Compliance block** found (SOC 2 / GDPR / HIPAA) → pause, legal review, return
- **Timeline conflict** (scope > capacity) → escalation: cut scope or extend timeline (user decision)

## Health metrics

| Metric | Healthy | Problematic | Action |
|--------|:-------:|:-----------:|--------|
| PRD completeness | 10/12 checklist items | < 8 | Do not pass to engineering |
| User stories AC coverage | 100% stories have AC | < 80% | Reverse Handoff PM |
| NFR coverage | ≥ 5 categories | < 3 | Reverse Handoff Tech Lead |
| Session duration | ≤ 3h focused | > 6h | Scope too big for Spec → consider split |

## Output

- `prd.md` (main deliverable) — 10-20 pages markdown
- Optional `prd.pdf` (if Designer + Layouter sessions are added)
- `$board` history
- Engineering-ready handoff (story IDs, epics, dependencies)

## Example — TeamFlow AI 1:1 Summary: Q2 Export feature (Spec)

**Request:** "Scope approved for Q2: add PDF/Notion export for summaries. A PRD is needed for the engineering team."

**Mode:** /spec (strategy + scope already approved; specification-only work)

**Session 1:**

- **COND-01**: Scope validation — Q2 roadmap theme "Export", scope includes PDF + Notion, out-of-scope Slack. Timeline 3 weeks. WCAG AA. 5 questions answered.

- **PM-SPEC**:
  - PRD 12 pages: Problem (14 support tickets in Q3 asking for export), audience (end-user Manager), solution (native PDF + Notion API).
  - 5 user stories INVEST: "As a manager I want to export summary as PDF so I can share with report". AC Gherkin per story.
  - NFR: performance p95 < 3s for PDF gen; Notion API rate limit handling.
  - Risks: Notion API deprecation risk (mitigation: vendored client); PDF rendering quality (mitigation: preview in UI).
  - Rollout: opt-in beta for 10 managers, GA at 4.0 rating.
  - Dependencies: Notion integration (new), PDF service (existing).

- **UX-01**:
  - User flow: Click "Export" on summary → select format (PDF/Notion) → download/open Notion page.
  - Low-fi wireframes: 2 screens (summary detail + export modal).
  - Accessibility: keyboard nav for modal, aria-label for format selector.

- **TECH-01**:
  - Feasibility: Yes. T-shirt = M (2 team-weeks).
  - NFR: PDF gen via existing service, Notion integration new (1 week spike for auth OAuth flow).
  - Risks: Notion API rate limit (mitigation: batch + retry), PDF large file size (mitigation: compression).
  - Epics: 2 (PDF pipeline, Notion integration).

- **DATA-01 (N/A)**: Metrics inherited — "export events" logged via existing event pipeline. Skip.

- **LITE-RG**:
  - PRD checklist: 11/12 ✅ (open questions listed, 1 noted "Notion Teams API vs Personal").
  - User sign-off received.

**Result:** 1 session × 3h = ready PRD 12 pages, engineering-ready.

---

## Anti-patterns

| Mistake | Why it's bad | How to do it right |
|---------|-------------|--------------------|
| PRD without success metrics | Impossible to assess win | NSM / OKR link is mandatory |
| Implementation details in PRD | PRD = what/why, not how | How → engineering docs |
| User stories without AC | AC — contract with engineers | Gherkin Given/When/Then |
| Skipping NFR | In B2B SaaS often deal-breakers | NFR top 5 minimum |
| Scope reveal in spec session | Violates pipeline order | Escalate — return to /shape-prioritize or /ship-right-thing |
| No rollout plan | Risk of incidents at GA | Pilot → Beta → GA with criteria + rollback |
| Open questions without owner | Blocked during impl | Owner + deadline per question |
