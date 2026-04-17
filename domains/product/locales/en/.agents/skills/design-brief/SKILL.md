---
name: design-brief
description: Brief for UX/UI designer — context, goals, users, constraints, references, tone
---
# Design Brief

> **Category:** UX  ·  **Slug:** `design-brief`

## When to Use

- When UX Designer hands off an initiative downstream (downstream visual designer or external).
- Before a large design cycle, to align on goals + constraints.
- When working with outsourced design — brief as a contract.
- When transitioning from low-fi wireframes to hi-fi visual design.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| User story / PRD | ✅ | What we are solving |
| User research findings | ✅ | JTBD, preferences, pain points |
| Brand guidelines | ⬚ | If they exist |
| Technical constraints | ⬚ | Stack, platform limits |
| References (competitors, inspirations) | ⬚ | Visual / interaction references |

## Data Sources

1. `$prd-template` — scope + goals.
2. `$jtbd-canvas` — emotional/social jobs → tone.
3. `$user-flow` — interactions → screens needed.
4. Existing brand guidelines / design system.

### Related Skills

| Skill | What we take | When to call |
|-------|-------------|--------------|
| `user-flow` | Flow steps → screens | Before brief |
| `jtbd-canvas` | Emotional jobs → tone | For tone definition |
| `prd-template` | Goals + NFR | For brief goals section |
| `report-design` | Layout patterns (for PRD/deck, not UI) | Separate contexts |

## Design Brief Structure

1. **Overview** — 1 paragraph of what we're doing
2. **Goals** — what design must achieve
3. **Users** — primary + secondary personas
4. **Jobs & Emotions** — from JTBD
5. **Scope** — screens / surfaces involved
6. **Non-goals** — explicit out-of-scope
7. **Constraints** — technical, brand, timeline
8. **References** — competitors, inspirations, style
9. **Tone** — brand voice, formality
10. **Deliverables** — wireframes? hi-fi? prototypes?
11. **Timeline + Checkpoints**

## Protocol

### Step 1 — Overview

1-2 paragraphs:
- What initiative is this (feature name)
- Who will use it
- Why it matters (business + user)

### Step 2 — Goals (design-specific)

Differentiate from PRD goals:
- **PRD goal:** "Increase activation by 15%"
- **Design goal:** "Onboarding flow feels effortless — user completes without guide"

Design goals in terms of user perception + behavior.

Examples:
- Reduce time-to-first-value from X to Y
- Make admin settings approachable for non-technical users
- Feel trustworthy for enterprise buyers

### Step 3 — Users

**Primary user(s):**
- Segment + role
- Daily context (device, time pressure, collaboration)
- Technical sophistication

**Secondary users** (if applicable):
- Who else touches the flow
- Different needs/behaviors

### Step 4 — Jobs & Emotions

From JTBD canvas:
- **Functional:** what they're trying to accomplish
- **Emotional:** how they want to feel (confident, in control, productive)
- **Social:** how they want to be perceived

Design must serve emotional/social jobs, not only functional.

### Step 5 — Scope

Explicit list:
- **In scope:** screens, states, interactions
- **Coverage:** desktop / mobile / both
- **Empty states, error states, loading states** (explicit mention)
- **Accessibility targets** (WCAG AA or AAA)

### Step 6 — Non-goals

What we are **NOT** doing in this brief:
- "Not refreshing entire design system"
- "Not supporting mobile in this release"
- "Not optimizing for screen readers beyond WCAG AA"

### Step 7 — Constraints

**Technical:**
- Component library (shadcn / Material / custom?)
- Platform (web / mobile / desktop)
- Browser / OS targets
- Performance budgets

**Brand:**
- Color system (primary, neutrals)
- Typography (fonts, scale)
- Voice / personality

**Timeline:**
- Desired completion
- Review cycles available

### Step 8 — References

Visual + interaction inspirations (3-5):
- Screenshots / links to competitor experiences
- What works (specific elements to emulate)
- What to avoid

NOT copying — showing understanding of category expectations.

### Step 9 — Tone

B2B SaaS tone axes:
- **Formal ↔ Casual** (enterprise = more formal)
- **Playful ↔ Serious** (dev tools can be playful; compliance — serious)
- **Bold ↔ Neutral**

Pick position with rationale.

Examples:
- "Professional but approachable" — mid-market B2B
- "Seriously efficient" — enterprise DevOps tool
- "Confident expertise" — security / compliance tool

### Step 10 — Deliverables

Specify what designer will produce:
- **Low-fi wireframes:** [N screens]
- **Hi-fi mockups:** [N screens]
- **Interactive prototype:** [yes / no]
- **Design specs for eng:** [Figma handoff? Zeplin?]
- **Component updates:** [new components needed?]

### Step 11 — Timeline

| Checkpoint | Date | Participants |
|-----------|------|--------------|
| Brief signoff | YYYY-MM-DD | PM, Design Lead |
| Wireframe review | YYYY-MM-DD | PM, Eng Lead, Design |
| Hi-fi review | YYYY-MM-DD | Full team + Stakeholder |
| Final handoff | YYYY-MM-DD | Eng |

## Validation (Quality Gate)

- [ ] All 11 sections filled
- [ ] Goals user-outcome framed, not feature-framed
- [ ] Primary + secondary users defined
- [ ] Emotional/social jobs included (not only functional)
- [ ] Non-goals explicit
- [ ] Technical constraints realistic
- [ ] 3-5 references
- [ ] Tone position with rationale
- [ ] Deliverables specified
- [ ] Timeline with checkpoints

## Handoff

The result is the input for:
- **Downstream Designer** (visual designer / external)
- **Tech Lead** → technical feasibility cross-check
- **PM** → design review sessions

Format: design brief doc (markdown or linked Figma file). Via `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|-------------------|
| No jobs/emotions | Design feels generic | Explicit emotional/social jobs |
| Vague goals ("make it better") | Not actionable | Specific user outcomes |
| No non-goals | Scope creep | Explicit exclusions |
| "Make it beautiful" tone | Not directional | Tone axes with rationale |
| No references | Designer guesses | 3-5 concrete references |
| No deliverables | Ambiguous handoff | Explicit list |
| No checkpoints | Late feedback | Milestones |

## Template

```markdown
# Design Brief: [Initiative Name]

## Overview
...

## Goals
1. ...

## Users
**Primary:** [segment + role + context]
**Secondary:** [...]

## Jobs & Emotions
- Functional: ...
- Emotional: feel [X]
- Social: be seen as [Y]

## Scope
- [screens in scope]
- Empty / error / loading states: ✅

## Non-goals
- ...

## Constraints
- Technical: [stack]
- Brand: [colors, fonts]
- Timeline: [deadline]

## References
1. [competitor] — [what works]

## Tone
Formal ↔ Casual: [position]
Serious ↔ Playful: [position]

## Deliverables
- Low-fi: N screens
- Hi-fi: N screens
- Prototype: yes/no
- Handoff: Figma

## Timeline
| Checkpoint | Date |
| Brief signoff | YYYY-MM-DD |
```

## Worked Example — TeamFlow Design Brief: AI Summary Review Interface

```markdown
# Design Brief: AI Summary Review UI (Story S3)

## Overview
Design the **manager-facing interface** for reviewing, editing, and approving AI-generated 1:1 summaries within TeamFlow. This UI is the daily touchpoint where managers interact with AI output — it defines whether they trust, use, or abandon the feature.

The review UI appears after AI summary generation completes (per Story S2). Manager spends 2-5 minutes here per 1:1 reviewing, potentially editing, then approving. This experience is **the make-or-break moment** for adoption — if managers don't trust the UI, they won't trust the AI.

## Goals (design-specific, not PRD goals)

1. **Manager feels the UI is FOR them, not AUDITING them.** Every interaction reinforces "this is your document, you're in charge".
2. **Editing friction < 30 seconds** for typical corrections (fix name, add missing action item).
3. **Approval requires one explicit click** — does not slip by accidentally, does not feel like forced ceremony.
4. **Confidence signals clear:** low-confidence extracted action items visually distinct so manager knows what needs closer review.
5. **Preserves conversational tone** of summary — feels written by thoughtful human, not "enterprise bot".

## Users

### Primary: Overwhelmed People Manager
- **Segment:** B2B SaaS companies 100-1000 employees (mid-market)
- **Role:** Engineering / Sales / Ops manager, 5-15 direct reports
- **Context:** Reviews summary within 0-60 min of meeting end, often between other meetings. Desktop primary, mobile secondary (rare).
- **Technical sophistication:** Comfortable with rich text editors (Notion / Google Docs daily users). Not deep technical.

### Secondary: HR Business Partner (Admin)
- **Same UI mostly not used** — their admin experience is different (Story S6).
- But edge case: they sometimes help new managers review summaries → UI must be approachable to non-daily users.

## Jobs & Emotions

### Functional Jobs (from JTBD canvas)
- **F1:** Review summary for accuracy in 2 minutes (manager has 6 min between meetings)
- **F2:** Edit specific elements (wrong attribution, missing item) without rewriting everything
- **F3:** Mark approved explicitly so action items flow to tracking

### Emotional Jobs
- **E1:** Feel **confident** that I understand what AI captured (not confused by opaque output)
- **E2:** Feel **in control** — AI serves me, I'm not serving AI's weird format
- **E3:** Feel **not-monitored** — this is my draft, I approve what persists

### Social Jobs
- **S1:** Be seen by report (who may get summary shared) as thoughtful note-taker
- **S2:** Not be seen by skip-level as carelessly approving nonsense

## Scope

### In scope for this brief:
- **Main review screen** (desktop + responsive mobile)
  - Summary body (editable rich text)
  - Action items list (editable, confidence indicators)
  - Topics list (editable)
  - Approval CTA
- **States:** loading (streaming summary), loaded-draft, in-edit, approved
- **Empty / error states:** low-quality summary warning, AI unavailable fallback, very-short-meeting skipped summary

### Out of scope (separate briefs or future phases):
- **Admin UI for org policy** (Story S6 — separate brief)
- **Aggregate dashboard** (Theme 2 — separate PRD)
- **Email notifications** (uses existing TeamFlow email templates)
- **Audit log viewer** (admin-only, already existing UI pattern)
- **Mobile-native app** (web responsive only for MVP)

## Non-goals (explicit exclusions)

- Not "beautiful" in a decorative sense — **utilitarian elegance** (think Linear, not Dropbox Paper)
- Not re-inventing text editor — **use our existing ProseMirror-based editor**
- Not gamification (streaks / badges) — managers hate cutesy HR tech
- Not "like" / "react" — summaries are **workflow**, not social

## Constraints

### Technical
- **Component library:** TeamFlow DS (internal, Radix-based)
- **Editor:** Existing ProseMirror wrapper (reuse, not replace)
- **Stack:** React / Next.js / TypeScript
- **Browser targets:** Chrome/Edge/Safari/Firefox last 2 versions; IE not supported
- **Performance:** First meaningful paint <500ms; editor interactive <1s
- **Responsive:** Desktop-first (1200px+), tablet supported (768px), mobile functional but not optimized

### Brand
- **Color system:** TeamFlow primary (deep blue #0A2540), accent (amber #F2A900), neutrals
- **Typography:** Inter for body (reuse existing); Source Serif Pro for summary body itself (subtle distinction — "AI output" visually typed)
- **Voice:** Professional, confident, not chatty. "Review your summary" not "Hey! Check out your summary ✨"

### Timeline
- Brief signoff: Week 3, April 17, 2026
- Low-fi review: Week 5, May 1
- Hi-fi review: Week 7, May 15
- Final handoff: Week 8, May 22
- Implementation: Weeks 7-10 parallel with design

### Accessibility
- **WCAG 2.1 AA compliance required** (mid-market+ enterprise customer requirement)
- Keyboard navigation entire flow
- Screen reader labels for confidence indicators
- Color contrast 4.5:1 minimum for text

## References

1. **Notion AI summary UI** — great inline editing, subtle confidence treatment. Emulate: clean editor state, edit/approve state transition.
2. **Linear issue details** — utilitarian, dense, no fluff. Emulate: information density without overwhelm.
3. **Gmail's smart compose** — good confidence visual (light grey = suggestion). Emulate: confidence treatment.
4. **What to avoid — Otter.ai's review UI:** too much decoration, hard to scan, feels consumer-first.
5. **Lattice's current UI** — what customers are used to. Maintain consistency where possible (button placement, action item list format).

## Tone

- **Formal ↔ Casual:** Position = **60% formal** (professional, not chatty; "Approve summary" not "All good!")
- **Serious ↔ Playful:** Position = **80% serious** (HR conversations carry weight; no confetti, no emojis in UI chrome)
- **Bold ↔ Neutral:** Position = **55% bold** (confident use of primary color for key actions, but not overly design-heavy)

Rationale: Discovery revealed managers trust "quiet confidence" tone. Playful tone risks feeling "toy-like" for enterprise + compliance-sensitive buyers.

## Deliverables

- **Low-fi wireframes:** 8 screens (desktop + mobile responsive)
  - Loading / streaming summary
  - Summary review — default state
  - Summary review — editing mode
  - Action items — confidence variants (high / low)
  - Approved state (read-only)
  - Empty state (meeting too short)
  - Error state (AI unavailable)
  - Mobile review (responsive desktop adapted)
- **Hi-fi mockups:** Same 8 screens in Figma with final typography, colors, spacing
- **Interactive prototype:** Clickable flow via Figma for usability testing on beta customers
- **Design specs for eng:** Figma handoff mode (measurements, assets, CSS tokens)
- **Component additions:** 2 new components contributed to DS:
  - `<ConfidenceIndicator />` — light-grey dashed border for AI content below 70% confidence
  - `<SummaryApprovalActionBar />` — fixed-bottom approval CTA with unsaved-changes protection

## Timeline

| Checkpoint | Date | Participants |
|-----------|------|--------------|
| Brief signoff | 2026-04-17 | PM Alex, Design Lead Jordan, Eng Lead Priya |
| Information architecture review | 2026-04-24 | PM + Eng + Design |
| Low-fi wireframe review | 2026-05-01 | Full team + VP Product |
| Usability testing (5 customers) | 2026-05-08 | Design + PM + 5 external testers |
| Hi-fi mockup review | 2026-05-15 | Full team |
| Accessibility audit | 2026-05-19 | External a11y consultant |
| Final design handoff | 2026-05-22 | To Eng team |
| Implementation review (Week 2) | 2026-06-05 | Design pair with eng weekly |

## Risk & Mitigation

| Risk | Mitigation |
|------|-----------|
| Confidence indicator design too subtle → managers miss low-quality AI items | Usability test Week 5 — validate confidence noticed |
| Approval CTA too prominent feels "forced" / "coercive" | A/B test two placements; keep softer variant ready |
| Edit mode friction too high → managers accept AI blindly | Iteration plan: if edit rate <10% in beta, revisit friction |
| Mobile responsive inadequate, enterprise complains | Scoped to web-only for MVP; mobile-native Q4 plan communicated |

## Success Measurement (post-launch)

- **Edit rate:** 30-50% of summaries edited (not 0% = blind approval; not 100% = AI unusable)
- **Time-to-approve:** median ≤ 2 minutes
- **Approval rate:** 95%+ of generated summaries eventually approved (not abandoned)
- **Usability score:** SUS >70 in beta survey
```

> **Design-brief lesson:** Separation of **goals (design-specific)** from PRD goals is crucial — PRD goals are "40 tier upgrades", design goals are "approval feels non-coercive". Without this separation design becomes feature implementation. **Non-goals** section prevents scope bloat ("not gamification", "not replace editor"). Tone axes with rationale forces team alignment instead of arguing "feels wrong" in hi-fi review. Brief should be so complete that an external designer (outsourced agency) can execute from it.
