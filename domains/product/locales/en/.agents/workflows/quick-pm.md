# /quick-pm — Quick Pipeline (1 session, no adversarial)

> **Use for quick product answers — 1-2 hours of work.**
> 1 session, no adversarial, no handoff files between steps. Output — Short brief (markdown, 1-2 pages).

## When to Use

- Focused product question with obvious scope
- No time for Full Pipeline (6 sessions)
- Stakes are low — decision is reversible or low-cost
- An assessment is needed, not a full plan
- Unlock decision: "should we X?" / "is Y worth building?"
- Triage ticket / backlog item before adding to quarter plan

## When NOT to Use

- Strategic decision (pivot, new segment, $M investment) → `/ship-right-thing`
- Scope debate (team disagrees) → `/shape-prioritize`
- A formal PRD is needed for engineering → `/spec`
- High stakes (quarters of work, irreversible) → `/ship-right-thing`
- Compliance-sensitive decision → Full A/B for thorough risk review

## Decision Tree (clarifying questions in Step 0)

```
Stakes?
  ├── Low (reversible, < $10K impact) → /quick-pm (this workflow)
  ├── Medium ($10-100K, team-quarter impact) → /spec or /shape-prioritize
  └── High (quarters, pivot, > $100K) → /ship-right-thing

Time budget?
  ├── 1-2 hours → /quick-pm
  ├── 3-6 hours → /spec
  └── Multi-day → Full A/B

Scope clarity?
  ├── Obvious (one-pager) → /quick-pm
  ├── Mostly clear, needs spec → /spec
  └── Open debate → /shape-prioritize

Output type?
  ├── Short brief / recommendation → /quick-pm
  ├── Engineering-ready PRD → /spec
  └── Exec-review deck → /ship-right-thing
```

## Pipeline (1 session)

```
CONDUCTOR → DISCOVERY → product_strategist → PM → TECH_LEAD → DATA_ANALYST → Short Brief
```

All agents in one session, sequentially, without handoff files between steps. Each agent — compact contribution.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Focused question | ✅ | Format: "Should we X?" or "How do we prioritize Y?" in 1 sentence |
| Current context | ✅ | ARR, segment, recent decisions — 2-3 sentences |
| Time box | ⬚ | Default 1-2 hours; max 3 hours |
| Existing evidence (if any) | ⬚ | Support tickets, user feedback, metrics |
| Decision deadline | ⬚ | If present — limits depth |

## Steps

### Step 0 — Clarification (5 min)

**Conductor**: 3-5 clarifying questions (not 5+ as in Full):
- What exactly are we deciding (is it reversible?)
- Stakes (cost of mistake)?
- Time box?
- Answer format (recommendation / estimate / comparison)?
- Any hard constraints?

### Step 1 — Discovery Compact (15-20 min)

**Discovery**:
- JTBD summary (1 paragraph for end-user + 1 for buyer if applicable)
- Problem statement (1 sentence)
- Key assumptions (3-5)
- Evidence pointer (if available — what data already confirms the direction)

Format: 30-60 lines markdown.

### Step 2 — Strategy Alignment (15 min)

**product_strategist**:
- Which NSM / OKR is linked (reference to approved strategy)
- Which roadmap theme
- Strategic fit? (strongly / loosely / off-strategy)
- If off-strategy → escalate to /ship-right-thing

Format: 20-40 lines markdown.

### Step 3 — PM Assessment (20 min)

**PM**:
- Rough RICE scoring per item (top 3-5 candidates)
- MVP sketch — 3-5 user stories (no Gherkin AC)
- Kano classification (must / performance / delighter)
- Out-of-scope (brief)

Format: 40-80 lines markdown.

### Step 4 — Tech Sanity (10 min)

**Tech Lead**:
- Feasibility rough (S/M/L/XL) overall
- Top 2-3 risks
- Hidden integrations / dependencies? (Yes / No, if Yes — highlight)
- Spike recommendation if unknown unknowns

Format: 20-30 lines markdown.

### Step 5 — Metric Sketch (10 min)

**Data Analyst**:
- Primary success metric (aligned with approved NSM)
- Guardrail (what must not break — churn / NPS / perf)
- Rough target (number + timeframe)

Format: 10-20 lines markdown.

### Step 6 — Short Brief (final deliverable, 5 min)

**PM** consolidates:

```markdown
# Quick Brief — [Question]

## Recommendation
[Yes / No / Need more discovery] — 1 sentence

## Rationale (top 3 reasons)
1. ...
2. ...
3. ...

## Rough Scope (if proceed)
- [bullet 1]
- [bullet 2]
- [bullet 3]

## Success Metric
- Primary: [NSM link]
- Guardrail: [what must not break]
- Rough target: [number + timeframe]

## Key Risks
- [risk 1 + mitigation]
- [risk 2 + mitigation]

## Effort Estimate
- T-shirt: S / M / L
- Team-weeks: ~N

## Next Step
- [Usually: deeper dive via Full A/B, proceed to /spec, or decline]
```

Format: 1-2 pages markdown.

## Gate sequencing (simplified)

Within one session — all gates in order:

```
COND-01 → DISC-quick → STRAT-quick → PM-quick → TECH-quick → DATA-quick → LITE-RG
```

Each gate: deliverable + `$gates` mini-check + next step. No handoff files. User sign-off — on the **final brief**, not on each step.

## Severity levels

- **P0:** missing context (ARR, segment, product area)
- **P1:** weak evidence (acceptable — explicitly "preliminary", with noted assumption map)
- **P2:** incomplete strategic fit analysis

## Escalation paths

If Quick reveals complexity — **convert to Full A or Full B**:

- **Discovery reveal:** problem space is more complex than 3-5 assumptions → save brief, escalate to `/ship-right-thing`
- **Scope debate emerges:** team disagrees on scope within the session → escalate to `/shape-prioritize`
- **Strategy misalignment:** initiative off-strategy / contradicts approved → escalate to `/ship-right-thing`
- **High risk revealed:** Tech Lead surfaces compliance / security concern → pause, do not ship Quick brief as decision
- **Overrun time box:** session > 3h → stop, save progress, escalate (Quick is not suitable for this scope)

## Health metrics

| Metric | Healthy | Problematic | Action |
|--------|:-------:|:-----------:|--------|
| Session duration | 1-2h | > 3h | Escalate to Full |
| Open questions | ≤ 3 | > 6 | Scope too big for Quick |
| Evidence coverage | ≥ 60% | < 30% | Discovery loop recommend, Quick brief as preliminary |
| Strategic fit | Strong / Loose | Off-strategy | Escalate to /ship-right-thing |

## Output

- `quick-brief-[slug].md` (1-2 pages) — final deliverable
- Optional: CONTEXT.md update (if project uses CONTEXT.md)
- Optional: adding item to roadmap backlog (if recommendation = Yes)

## Example — TeamFlow AI 1:1: Add emoji reactions to summary? (Quick)

**Request:** "Should we add emoji reactions (👍/❤️/🎉) to the summary card? Support tickets are asking for it."

**Mode:** /quick-pm (low stakes, focused, 1h)

**Step 0 (Clarification):**
- Stakes: low (1 week implementation, reversible).
- Deadline: next sprint planning (2 days).
- Format: recommendation + rough estimate.
- Constraints: existing design system, accessibility.

**Step 1 (Discovery, 15 min):**
- End-user JTBD: emotional — "I want to react quickly to the summary without going back to the meeting".
- Evidence: 6 support tickets (Q3-Q4) asking for quick reactions. Manager Slack feedback.
- Assumptions: emoji reactions increase engagement; not distracting.

**Step 2 (Strategy, 10 min):**
- NSM link: sessions/week per active manager (engagement proxy). Roadmap theme: "delighters Q2".
- Fit: loosely (not core JTBD, delighter category).

**Step 3 (PM, 15 min):**
- RICE: reach 1500 (MAM), impact 0.25 (minor), confidence 80%, effort 1 week → score 300.
- 3 user stories (view reactions, add reaction, see who reacted).
- Kano: delighter.

**Step 4 (Tech, 10 min):**
- Feasibility: Yes, S. Existing reactions service (extend).
- Risks: accessibility (screen reader announces), perf (aggregation at 100+ reactions).
- Integrations: existing.

**Step 5 (Data, 5 min):**
- Primary: reaction rate per summary (new event).
- Guardrail: summary rating stays ≥ 4.0.
- Target: 30% summaries get ≥ 1 reaction within 4 weeks.

**Step 6 (Brief):**

```markdown
# Quick Brief — Emoji Reactions in Summary

## Recommendation
**Yes, add as delighter in Q2.**

## Rationale
1. 6 support tickets + Manager Slack direct ask (demand signal)
2. 1 team-week effort, existing stack leverage
3. Delighter category — differentiator without core risk

## Rough Scope
- 3 emojis (👍/❤️/🎉) in summary card
- Reaction aggregation (count + who)
- Notification to 1:1 participants (optional)

## Success Metric
- Primary: 30% summaries with ≥ 1 reaction in 4 weeks
- Guardrail: summary rating stays ≥ 4.0
- Rough target: 1500 MAM × 30% = 450 reactions/week

## Key Risks
- Accessibility: screen reader announces (mitigation: aria-label per reaction)
- Perf at 100+ reactions (mitigation: cached aggregation, unlikely at current scale)

## Effort Estimate
- T-shirt: S (1 team-week)
- 1 senior engineer

## Next Step
- Add to Q2 roadmap as delighter
- No Full pipeline needed — proceed to /spec in sprint planning
```

**Result:** 1 session × 60 min = recommendation + rough plan, ready for sprint planning.

---

## Anti-patterns

| Mistake | Why it's bad | How to do it right |
|---------|-------------|--------------------|
| Formal PRD in Quick | Quick = brief, not PRD | If a PRD is needed, escalate to /spec |
| Adversarial in Quick | Adversarial is only for Full A/B | Single perspective ok for low stakes |
| Overthinking / overrun | Defeats purpose of Quick | Boxed to 1-2h; > 3h → escalate |
| Skip strategic fit | Off-strategy items slip in | Always check NSM / roadmap link |
| No guardrail metric | NSM can be gamed | Guardrail — churn / NPS / perf always |
| Decision without evidence | Guessing in recommendation | Include existing support tickets / metrics / user quotes |
| Quick brief as PRD | Engineering expects more detail | Explicit "this is preliminary, PRD to follow" |
| Missing next step | Brief without action | Always define next step (proceed / escalate / decline) |
