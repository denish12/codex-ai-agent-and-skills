---
name: opportunity-solution-tree
description: Opportunity-Solution Tree by Teresa Torres — desired outcome → opportunities → solutions → experiments
---
# Opportunity-Solution Tree (OST)

> **Category:** Discovery  ·  **Slug:** `opportunity-solution-tree`

## When to Use

- When you have a desired outcome (from strategy or OKR) but it's unclear **how** to achieve it.
- During continuous discovery — as an artifact that evolves over time.
- When the team jumps into solution mode without understanding the opportunity space.
- When handing off discovery to engineering — OST shows the rationale behind solutions.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Desired outcome | ✅ | Business or product outcome (from NSM/OKR) |
| Customer research | ✅ | Interviews, JTBD, problems |
| Current assumptions | ⬚ | Which hypotheses already exist |
| Time box | ⬚ | Usually 1-2 weeks for MVP tree |

## Data Sources

1. `$user-interview-script` transcripts — opportunities from pain points.
2. `$jtbd-canvas` — opportunity jobs.
3. Support tickets, NPS comments — evidence for opportunities.
4. Product analytics — quantitative signal.

### Related Skills

| Skill | What we take | When to invoke |
|-------|-------------|----------------|
| `jtbd-canvas` | Underserved jobs → opportunities | When branching opportunities |
| `problem-statement` | Specific problem → opportunity node | For articulating a specific opportunity |
| `assumption-mapping` | Assumptions underlying solutions | For each solution node |
| `hypothesis-template` | Solution → testable hypothesis | For experiment nodes |

## Tree Structure

```
Desired Outcome (top)
  │
  ├── Opportunity 1 (customer problem / unmet job)
  │     ├── Solution 1a (product idea)
  │     │     └── Experiment 1a-i (test)
  │     └── Solution 1b
  │
  ├── Opportunity 2
  │     └── Solution 2a
  │           └── Experiment 2a-i
  │
  └── Opportunity 3
```

## Protocol

### Step 0 — Desired Outcome

Formulate **one** outcome. Must be measurable, tied to a business metric.

✅ Good: «Increase weekly active teams by 30% in 2 quarters»  
❌ Bad: «Improve engagement»

### Step 1 — Opportunities

Opportunities are customer problems or unmet jobs. From JTBD + interviews.

Rules:
- Formulated as a **customer** statement, not a solution
- Evidence-backed (evidence ≥ 2 sources or mark 🔮 assumed)
- Mutually exclusive (no overlap)

Limit: 3-7 opportunities at the top level. More → split into sub-branches.

| # | Opportunity | Evidence | Estimated impact |
|---|-------------|----------|-------------------|
| O1 | [customer pain / unmet job] | JTBD F3, Interview 4-7 | High / Medium / Low |

### Step 2 — Opportunity Assessment

For each — importance × reach × gap (where the current solution falls short).

Prune opportunities with low impact — focus on top 3.

### Step 3 — Solutions

For each **top** opportunity — 2-5 solution candidates. These are product ideas, features, process changes.

Rules:
- Specific (not «improve onboarding», but «in-app checklist for first 3 tasks»)
- One opportunity can have multiple solutions — don't choose immediately
- Solutions can be «non-product» (docs, training, pricing change)

### Step 4 — Experiments

For each solution — an experiment (or several) for validation.

| Solution | Experiment | Prediction | Measurement | Time box |
|----------|------------|------------|-------------|-----------|
| In-app checklist | A/B test with 50% new users | +20% first-week activation | Funnel metric | 4 weeks |

Experiments — via `$hypothesis-template` + `$ab-test-design`.

### Step 5 — Prioritization

Prioritize experiments, not solutions. Sometimes quick experiments reveal that an opportunity is weaker than it seemed.

Use `$rice-scoring` at the experiment level.

### Step 6 — Iteration

OST is a living document. After each experiment:
- Update evidence
- Prune debunked branches
- Add new opportunities from findings

## Validation (Quality Gate)

- [ ] Desired outcome — measurable, tied to a metric
- [ ] 3-7 opportunities at the top level
- [ ] Each opportunity — customer-framed, not a solution
- [ ] Evidence (≥ 2 sources) or mark 🔮
- [ ] Top 3 opportunities have ≥ 2 solutions
- [ ] Each solution has ≥ 1 experiment
- [ ] Experiments prioritized (RICE)

## Handoff

The result is input for:
- **`rice-scoring`** — prioritization of experiments
- **`hypothesis-template`** — formalize experiments
- **PM**: solutions → feature candidates for roadmap
- **`assumption-mapping`** — assumptions behind solutions

Format: OST as markdown tree or Miro-style diagram (exported). Via `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|-------------------|
| Solution-first tree | Skip opportunity space | Start with outcome → opportunities |
| Opportunities = features | Just a renamed backlog | Opportunity = customer problem |
| No experiments | Solutions not validated | Each solution has an experiment |
| Tree never updated | Frozen OST = dead OST | Weekly/biweekly update |
| Choosing solution before validation | Locked into first idea | Keep alternatives until experiment data |

## Worked Example — TeamFlow OST (AI 1:1 Summarization initiative)

**Context:** TeamFlow (B2B SaaS HR-tech, $8M ARR, NRR 105%). After Discovery (8 interviews + JTBD canvas), the team builds the OST for the chosen desired outcome. Question: «Should we build AI summarization?» — OST should show the opportunity space and alternatives, not jump to a conclusion.

### Desired Outcome

```
Grow Net Revenue Retention from 105% to 115% within 4 quarters
```

**Why this metric:** NRR is the key SaaS metric for Board and investors. Growth in NRR drives ARR, moat, margin. A 10pp lift is tied to expansion + churn reduction, both achievable by increasing manager engagement with the product.

**Why not another metric:**
- «Activation rate» — too leading, doesn't prove business outcome.
- «Weekly active teams» — vanity if not linked with revenue.
- «ARR growth» — too lagging, NRR = leading indicator.

### Opportunity Layer (from JTBD canvas + Discovery Brief)

```
Desired: Grow NRR 105% → 115%
  │
  ├── O1: Managers spend 3-4 hrs/week on 1:1 admin overhead
  │   (buyer and end-user pain)
  │   Evidence: 6 of 8 interviews, internal analytics shows prep time
  │   Estimated reach: 3,000 active managers across customer base
  │   Impact: retention + expansion (see Opp assessment)
  │
  ├── O2: VP HR lack visibility into manager 1:1 practice/quality across org
  │   (buyer pain)
  │   Evidence: 4 of 4 buyer interviews
  │   Estimated reach: 200 buyer accounts
  │   Impact: expansion opportunity (enterprise tier)
  │
  ├── O3: 40% of 1:1 action items dropped / forgotten
  │   (end-user pain)
  │   Evidence: 5 of 8 end-user interviews, internal product data (completed/total)
  │   Estimated reach: 3,000 managers × 8 reports × 40% = significant
  │   Impact: user retention + NPS
  │
  ├── O4: New-manager onboarding takes 6+ months until «effective 1:1»
  │   (buyer pain F4)
  │   Evidence: 3 of 4 buyer interviews
  │   Estimated reach: ~1,000 new managers/year across customer base
  │   Impact: smaller, but high-value for enterprise segment
  │
  └── O5: Cross-manager 1:1 experience inconsistency
      (buyer + skip-level + employee pain)
      Evidence: 2 of 4 buyer interviews, 1 end-user correlation
      Estimated reach: Broad but fuzzy — hard to quantify
      Impact: employee NPS / retention, but indirect
```

### Opportunity Assessment

| # | Opportunity | Importance (1-10) | Reach (users) | Gap (current vs desired) | Priority Score |
|---|-------------|:-----------------:|:-------------:|:------------------------:|:--------------:|
| O1 | Admin overhead | 10 | ~3,000 | Big (no tool today) | 52,000 |
| O3 | Action items dropped | 9 | ~3,000 | Big | 46,800 |
| O2 | Buyer visibility | 9 | ~200 (but $$$) | Big | 1,800 (absolute) — but high deal size |
| O4 | New-mgr onboarding | 7 | ~1,000/yr | Medium | 7,000 |
| O5 | Cross-mgr consistency | 6 | Fuzzy | Medium | Hard to score |

**Pruning:** focus on top 3: **O1 (admin overhead), O3 (action items), O2 (buyer visibility)** — all interconnected and one feature can address multiple.

### Solutions Layer (for top 3 opportunities)

```
O1: Admin overhead
  ├── S1.1: AI-powered real-time transcription + summarization during 1:1
  │         (hypothesis: address capture-during-meeting pain + action items extraction)
  ├── S1.2: Template library + auto-population from previous 1:1s
  │         (lighter: not AI, but reduces prep time)
  ├── S1.3: 1:1 duration reduction through structured agendas + time-boxing UI
  │         (behavioral, not AI)
  └── S1.4: Async 1:1s (structured written async for some updates)
            (radical: reduce live meeting count)

O3: Action items dropped
  ├── S3.1: AI-extracted action items with automated reminders in the next 1:1
  │         (ties to S1.1 — AI summarization output)
  ├── S3.2: Calendar / Slack integration — reminders 2 days before 1:1
  │         (lighter: rules-based)
  └── S3.3: Weekly digest email «here's what you committed to» with status checkboxes

O2: Buyer visibility
  ├── S2.1: Aggregate dashboard: 1:1 frequency, duration, action items velocity per team
  │         (rule-based analytics, no AI needed for basic version)
  ├── S2.2: AI-inferred 1:1 health score (combining multiple signals)
  │         (more advanced, needs S1.1 infrastructure)
  └── S2.3: Quarterly People Ops report generator (auto-composed for Board)
```

### Experiments Layer (for top solutions)

| Solution | Experiment | Prediction | Measurement | Time box | RICE score |
|----------|------------|------------|-------------|----------|:----------:|
| S1.1: AI summarization | Concierge MVP: human «AI» assists 10 beta customers manually for 2 weeks | Managers save 30 min/week; want to keep | Survey + retention | 3 weeks | 35 |
| S1.1: AI summarization | Wizard-of-Oz: Real OpenAI API integration with 20 beta managers, tightly monitored | 20% drop-off acceptable; summarization quality > 70% acceptable | Manager survey + usage data | 4 weeks | 48 |
| S1.2: Template library | Ship feature flag to 50% users, measure prep time via surveys | -30% prep time self-reported | Survey + funnel | 4 weeks | 28 |
| S3.1: AI action items | Builds on S1.1 — separate evaluation: after AI summary generated, opt-in reminder system | +20% action items completed | Product analytics | 6 weeks | 30 |
| S3.2: Rule-based reminders | Ship to all users, measure completion rate | +10% action items completed | Product analytics | 2 weeks | 25 |
| S2.1: Aggregate dashboard | Beta 5 enterprise customers, qualitative interviews after 30 days | 4 of 5 say «would use weekly» | Interviews | 6 weeks | 22 |

### Experiment Prioritization

1. **S1.2 (Template library)** — low-risk, fast, independent. **Ship this first** (4 weeks).
2. **S3.2 (Rule-based reminders)** — quick win, complements S1.2.
3. **S1.1 (AI summarization) — Concierge MVP first, then Wizard-of-Oz** — validates value before engineering investment.
4. **S2.1 (Dashboard)** — parallel track, different customer (enterprise), different eng workstream.
5. **S3.1 (AI action items)** — deferred pending S1.1 results.

### Iteration Notes (how this OST evolves)

**Week 4 update (hypothetical):** S1.2 Template library shipped — survey shows only -12% prep time (not -30%). Learning: templates help new managers but experienced managers don't adopt. → Update OST: split O1 opportunity by manager tenure. New sub-opportunity: «New managers face steepest learning curve» (O4 recombined here).

**Week 6 update:** S1.1 Concierge MVP results positive (9 of 10 want feature). Green-light Wizard-of-Oz + engineering investment. Branch expanded: add «privacy architecture» as a necessary sub-solution.

**Week 10 update:** Wizard-of-Oz shows 72% summarization quality acceptable but privacy concerns from enterprise beta. Added new branch for compliance architecture.

> **OST lesson:** Tree is a living document. The initial focus on «build AI» was correct, but through experiments it became clear that **template library + rule-based reminders** close 40-50% of value with 20% of effort. OST forced consideration of **alternatives** (S1.2, S3.2) that would otherwise have been skipped in favor of a better AI story.

> **Reference to `$assumption-mapping`:** Each solution rests on assumptions. For S1.1 the top assumptions (privacy, LLM quality, willingness to pay) — tracked in the assumption map, validated through experiments.

## Experiment Card Templates (per branch)

Each solution in the OST has a prescribed experiment design. Use these templates.

### Template A: Concierge MVP (validates Value)

```markdown
# Experiment: S1.1 Concierge MVP — AI Summarization

**Tree branch:** Desired Outcome → O1 Admin Overhead → S1.1 AI Summarization
**Status:** Active Week 2-5 (4-week experiment)

## What we're testing
Value of AI-summarized 1:1s — are managers willing to change their workflow?

## Method
Concierge (human-powered «AI»): 10 beta customer-managers email us meeting audio; PM + Designer manually produce summary + action items within 24 hours, deliver back in TeamFlow UI marked «AI-generated» (actually human).

## Prediction
- ≥ 7 of 10 managers want to continue after 2 weeks
- Reported time-saving ≥ 2 hrs / week
- Action items completion rate lifts ≥ 10pp

## Measurement
- Weekly survey (5-min)
- Exit interview week 4
- Self-reported time diary
- Action items completion tracked in product

## Success threshold
≥ 7 of 10 say «want to keep» → green-light Wizard-of-Oz

## Decision rules
- 9+ positive → Strong signal, invest aggressively
- 7-8 positive → Proceed to Wizard-of-Oz w/ standard investment
- 5-6 positive → Iterate concierge, retest
- <5 positive → Kill branch or major re-shape

## Ties to assumption map
Validates V1 (willingness to pay — indirectly via willingness to use), V2 (adoption intent)
```

### Template B: Wizard-of-Oz (validates Feasibility + Usability)

```markdown
# Experiment: S1.1 Wizard-of-Oz — AI Summarization (Real LLM)

**Tree branch:** Same as Concierge, progression step
**Status:** Scheduled Week 6-9 (after Concierge validation)

## What we're testing
(a) LLM quality — can real AI produce acceptable output?
(b) User trust — will managers edit vs abandon?

## Method
Real OpenAI GPT-4 integration with 20 beta managers. Full pipeline: meeting recording → transcription → LLM summarization → manager review UI. Heavy telemetry + feedback.

## Prediction
- Summary quality ≥ 4 out of 5 avg (blind rating)
- Edit rate 30-50% (not 0% = blind approve; not 100% = AI useless)
- P95 latency ≤ 60s
- Managers continue using after 4 weeks (≥ 80%)

## Measurement
- Summary rating (1-5) per meeting via in-product prompt
- Edit telemetry (what % of summary changed)
- Generation latency (server metrics)
- Drop-off tracking (weekly active managers in beta)

## Success thresholds
- Quality: ≥ 85% of summaries rated ≥ 4
- Edit rate: 25-55% (sweet spot)
- Continuation: ≥ 80% still using at week 4

## Decision rules
- All thresholds met → Green-light GA investment
- 2/3 met → Iterate prompt + retry week 10-11
- 1/3 met → Consider feature gate (human-review layer)
- 0/3 met → Branch kill

## Ties to assumption map
Primary validation for F1 (LLM quality) + U1 (manager trust)
```

### Template C: A/B Test (validates Scale)

```markdown
# Experiment: S3.2 Rule-Based Reminders — A/B Test

**Tree branch:** Desired Outcome → O3 Action Items Dropped → S3.2 Rule-Based Reminders
**Status:** Scheduled Week 12-16 (post-MVP, iteration)

## What we're testing
Do simple reminders (without AI) meaningfully improve action items completion rate?

## Method
Classic A/B. 50% of users receive auto-reminder 2 days before next 1:1 showing open action items. Control: no reminder.

## Prediction
- Action items completion lifts from 60% (baseline) to 68%+ (+8pp)
- No increase in «reminder fatigue» (measured via opt-out rate)

## Measurement
- Action items completed / created ratio (weekly)
- Opt-out rate of reminders
- NPS impact (separate survey)

## Sample & duration
- Eligible users / week: ~500
- Sample per variant: 3200 (calculated via `$ab-test-design`)
- Duration: 13 weeks

## Guardrails
- Opt-out rate < 15%
- NPS not declining

## Decision rules
- +8pp AND guardrails ok → Ship to all
- +4 to +8pp → Ship with iterated copy
- <+4pp → Kill, pivot to S3.1 AI reminders

## Ties to assumption map
Validates U2 (usability — do reminders annoy?) + V4 (lower-case value of simple solution)
```

### Template D: Design Partner Sessions (validates Enterprise Value)

```markdown
# Experiment: S2.1 Aggregate Dashboard — Enterprise Design Partner

**Tree branch:** Desired Outcome → O2 Buyer Visibility → S2.1 Aggregate Dashboard
**Status:** Week 6-12

## What we're testing
Will VP HR / CPO at enterprise customers upgrade tier based on dashboard value?

## Method
Concierge dashboard for 5 enterprise prospects. Manual data compilation weekly, delivered as «beta dashboard preview» Google Sheet. Track:
- Usage frequency (do they check it?)
- Reactions («would you pay for this?»)
- Upgrade conversion (stated intent → actual upgrade)

## Prediction
- 4 of 5 prospects say «would use weekly»
- 3 of 5 express upgrade intent
- 2 of 5 actually upgrade within 30 days

## Measurement
- Qualitative interview notes
- Upgrade CRM status
- Dashboard access frequency (even if manual — we track requests)

## Success thresholds
- Use intent: 4 of 5
- Upgrade conversion: ≥ 2 of 5

## Decision rules
- 2+ upgrade → Green-light productization
- 0-1 upgrade → Re-evaluate dashboard scope based on feedback
- Stalled at «like it but not upgrade» → Investigate pricing / packaging

## Ties to assumption map
Primary validation for V3 (buyer tier upgrade) + V4 (expansion driver)
```

### Experiment Portfolio Overview

| # | Experiment | Method | Duration | Signal Type | Investment |
|---|-----------|--------|:--------:|-------------|:----------:|
| EXP-010 | S1.1 Concierge MVP | Manual | 4 weeks | Qualitative | Low ($2K) |
| EXP-011 | S1.1 Wizard-of-Oz | Real LLM + heavy telemetry | 4 weeks | Quant + Qual | Medium ($15K) |
| EXP-012 | S3.2 Rule-based reminders A/B | Production A/B | 13 weeks | Quantitative | Low ($5K — eng time only) |
| EXP-013 | S2.1 Enterprise dashboard | Design partners | 6 weeks | Mixed | Medium ($10K) |
| EXP-014 | S1.2 Template library A/B | Production A/B | 4 weeks | Quantitative | Low ($3K) |

### Portfolio Balance

- **Mix of methods:** qualitative (Concierge, Design Partner) + quantitative (A/B) + engineering-heavy (Wizard-of-Oz)
- **Mix of speed:** fast (Concierge 4wk, reminders A/B early results 6wk) + slow (full A/B 13wk)
- **Mix of investment:** low-risk ($2-5K) + medium ($10-15K)
- **Decision dependencies:** Concierge → Wizard → Full AI investment (stepped commitment)

> **Experiment portfolio lesson:** Mixing methods + durations prevents analysis paralysis. Fast low-investment experiments (Concierge) unlock confidence for higher investment (Wizard-of-Oz). Clear **decision rules per experiment** — if threshold not met, action is pre-specified (kill / iterate / pivot). Without pre-committed decision rules, «we'll see» becomes chronic postponement.
