---
name: jtbd-canvas
description: JTBD canvas for B2B products — functional, emotional, social jobs separately for buyer and end-user
---
# Jobs-to-be-Done Canvas

> **Category:** Discovery  ·  **Slug:** `jtbd-canvas`

## When to Use

- When you want to dig deeper than «feature requests» and find underlying motivation.
- When formulating product vision and messaging — JTBD provides language for marketing and sales.
- When you need to explain why customers choose the product.
- When analyzing churn — what job did the product stop doing?

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Target role | ✅ | Buyer / end-user — separate canvas per role |
| Interview transcripts / notes | ✅ | Minimum 5 interviews per role |
| Existing customer data | ⬚ | Support tickets, NPS, reviews |
| Category context | ✅ | What alternative solution they currently use |

## Data Sources

1. Verbatim quotes from `$user-interview-script` — primary source.
2. Support tickets — reveal functional jobs of users.
3. NPS feedback — emotional/social jobs surface.
4. Competitor reviews (G2, Capterra) — what other users are trying to accomplish.

### Related Skills

| Skill | What we take | When to invoke |
|-------|-------------|----------------|
| `user-interview-script` | Verbatim quotes → jobs | Before JTBD — collect evidence |
| `problem-statement` | Jobs → problem framing | After defining jobs |
| `opportunity-solution-tree` | Jobs → opportunity branches | For discovery expansion |

## Protocol

### Step 0 — Role Segmentation

**Critical for B2B:** split canvases into **buyer** and **end-user**. Their jobs differ fundamentally.

- **Buyer JTBD:** «Help the team work more effectively without headcount», «Show impact on ARR within 2 quarters», «Reduce compliance risk».
- **End-user JTBD:** «Complete the task in 10 minutes instead of an hour», «Don't get in trouble for a mistake», «Earn respect from the team».

### Step 1 — Functional Jobs (what)

What is the user trying to do? Format: **verb + object + context**.

✅ Good: «Onboard new team member to our codebase without distracting senior devs for 2 weeks»  
❌ Bad: «Onboarding» (too abstract)

| # | Functional Job | Context/Trigger | Evidence (quote) | Frequency |
|---|----------------|-----------------|------------------|-----------|
| F1 | [verb + object + context] | [when it arises] | «...» | Daily/Weekly/Monthly |

### Step 2 — Emotional Jobs (feel)

What does the user want to **feel** (or stop feeling)?

Categories: Confidence, Control, Growth, Safety, Recognition.

| # | Emotional Job | Trigger | Evidence |
|---|---------------|---------|----------|
| E1 | Feel [X] when [context] | [when] | «...» |

### Step 3 — Social Jobs (perception)

How does the user want to be **perceived** by others (manager, team, customers)?

| # | Social Job | Audience | Evidence |
|---|------------|----------|----------|
| S1 | Be seen as [X] by [audience] | [who] | «...» |

### Step 4 — Job Circumstances

For each functional job:

| Job | When | Frequency | Current Workaround | Desired Outcome | Metric |
|-----|------|-----------|--------------------|------------------|--------|
| F1 | ... | Weekly | Manual Excel | Automated report by Monday | Time saved per week |

### Step 5 — Job Prioritization

Which jobs are most **important** and **underserved**.

Scoring:
- **Importance** (1-10)
- **Satisfaction** (1-10) with current solution
- **Opportunity Score** = Importance + max(Importance − Satisfaction, 0)

Top opportunity jobs — Importance ≥ 8, Satisfaction ≤ 5.

| # | Job | Importance | Satisfaction | Opportunity |
|---|-----|:----------:|:------------:|:-----------:|
| F1 | [job] | 9 | 4 | 14 |

### Step 6 — Buyer vs End-user Alignment

Where buyer JTBD and end-user JTBD **align** — best product-market fit. Where they **diverge** — churn risk (buyer purchased, end-user doesn't use it).

## Validation (Quality Gate)

- [ ] Separate canvases for buyer and end-user
- [ ] Minimum 5 evidence quotes per canvas
- [ ] Functional jobs — verb + object + context
- [ ] Each job has context/trigger, frequency, current workaround
- [ ] Prioritization scoring
- [ ] Top 3 opportunities identified
- [ ] Buyer vs end-user alignment recorded

## Handoff

The output is the input for:
- **`problem-statement`** — actor = role, pain = unmet job
- **`opportunity-solution-tree`** — top opportunity jobs = desired outcomes
- **`product-vision`** — language for vision («we help X do Y in situation Z»)
- **`user-story`** — «As a» = actor, «I want» = functional, «so that» = emotional/social

Transfer format: JTBD canvas + priority matrix + buyer/end-user alignment map. Via `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|---------------------|
| Jobs-as-features | «Wants automation» | Job is about outcome |
| One JTBD for everyone | B2B buyer ≠ end-user | Separate canvases |
| Skipping emotional/social | Incomplete picture | In B2B decisions are often emotional |
| No evidence | Speculation | Minimum 5 verbatim quotes per job |
| No prioritization | All jobs equal → paralysis | Opportunity scoring |
| Ignoring current alternative | Don't understand switching cost | Current workaround is required |

## Worked Example — TeamFlow (AI 1:1 Summarization initiative)

**Context:** TeamFlow (B2B SaaS HR-tech, $8M ARR). Discovery for AI-powered 1:1 note summarization. 8 interviews (4 buyer VP HR + 4 end-user managers) from session `user-interview-script`. Separate canvases for buyer and end-user.

### JTBD Canvas — Buyer (VP People / CPO)

**Context:** Mid-market / enterprise B2B SaaS companies, 100-1000 employees. Buyer reports to CEO or COO.

#### Functional Jobs

| # | Job | Context / Trigger | Evidence (quote) | Frequency |
|---|-----|-------------------|------------------|-----------|
| F1 | Ensure consistent 1:1 quality across all managers in org (not dependent on individual skill) | Annual performance review cycle raises concerns that managers vary wildly | «Some managers run amazing 1:1s, others literally cancel them. I have no visibility, no levers.» — Interview B2 (VP HR, 450-emp company) | Weekly (anxiety), Quarterly (urgency) |
| F2 | Report to CEO / Board on people development ROI measurably | Board meetings, performance cycles, workforce investments under scrutiny | «When CFO asks about retention spend ROI, I have to weave a story. I don't have data.» — B1 | Quarterly |
| F3 | Identify manager coaching opportunities proactively (not reactively after exit) | High performer leaves → exit interview reveals bad management | «Sarah left the company because her manager never did 1:1s. We only found out afterwards. I should have known.» — B3 | Quarterly |
| F4 | Reduce manager onboarding time for promoting-from-IC transitions | New manager starts, doesn't know how to run 1:1s, needs 6+ months to calibrate | «Promoting our best ICs to managers is a disaster. They flail for months.» — B4 | Per new manager (avg 5-10/year in mid-market) |

#### Emotional Jobs

| # | Job | Trigger | Evidence |
|---|-----|---------|----------|
| E1 | **Feel in control** of people strategy outcomes vs being reactive | Board pushes on retention / engagement metrics | «I feel like I'm flying blind. People leaders don't get dashboards like Engineering does.» — B2 |
| E2 | **Feel confident** that investment in manager training / tooling shows return | CFO scrutinizes budget | «I spent $200K on manager training last year. Can't tell you if it worked.» — B1 |
| E3 | **Feel like a modern, data-driven leader** vs «soft» HR | Career positioning, peer comparison | «I want to be at the same data-driven table as CRO and CPO. They have MRR, ARR, CAC. I want metrics too.» — B3 |

#### Social Jobs

| # | Job | Audience | Evidence |
|---|-----|----------|----------|
| S1 | Be seen by **CEO** as strategic business partner (not operational HR) | CEO / exec team | «Our CEO doesn't see HR as strategic. I want to change that — need data.» — B2 |
| S2 | Be seen by **peer execs** (CRO, CTO, CFO) as measurement-savvy | Peer exec team | «In ELT meetings, I feel like the soft one. They bring metrics. I bring stories.» — B1 |
| S3 | Be seen by **employees** as genuinely caring (not policing) | Employees, Glassdoor reviews | «If we introduce AI in 1:1s and it feels Big Brother — it backfires massively.» — B4 |

#### Job Circumstances (functional jobs)

| Job | When | Frequency | Current Workaround | Desired Outcome | Metric |
|-----|------|-----------|--------------------|------------------|--------|
| F1 | Post-engagement-survey lows | Quarterly | Manager training workshops + spot-checks + hope | 100% managers running 1:1s weekly + action items executed | % managers with ≥ weekly 1:1 cadence |
| F2 | Board / CEO meetings | Quarterly | «Storytelling + anecdata + hope» | Dashboard: 1:1 frequency, action items completion rate, correlated with retention | Retention correlation to 1:1 health |
| F3 | After key departures | Reactive | Exit interviews | Leading indicator dashboard: at-risk teams based on 1:1 patterns | Weeks of early warning |
| F4 | New manager promotions | 5-10/year | Training program (6 weeks) + buddy | AI-assisted guidance for new managers | Time to «effective 1:1» benchmark |

#### Job Prioritization

| # | Job | Importance | Satisfaction with current | Opportunity |
|---|-----|:----------:|:-------------------------:|:-----------:|
| F1 | Consistent 1:1 quality | 10 | 4 | 16 |
| F2 | Report ROI to Board | 9 | 3 | 15 |
| F3 | Proactive coaching | 8 | 3 | 13 |
| F4 | Manager onboarding | 7 | 5 | 9 |
| E1 | Feel in control | 9 | 4 | 14 |
| E3 | Feel data-driven leader | 8 | 3 | 13 |
| S2 | Seen as measurement-savvy | 7 | 3 | 11 |

**Top buyer opportunities:** F1 (consistency, 16), F2 (reporting, 15), E1 (feel in control, 14).

---

### JTBD Canvas — End-User (People Manager)

**Context:** Engineering / Sales / Ops manager in B2B SaaS. 5-15 direct reports. 2-10 years management experience.

#### Functional Jobs

| # | Job | Context / Trigger | Evidence (quote) | Frequency |
|---|-----|-------------------|------------------|-----------|
| F1 | Prepare for each 1:1 efficiently (know context, previous topics, action items) | Before each 1:1 meeting | «25 minutes of prep every week for each of 8 reports» — E3 | Weekly × N reports (5-15) |
| F2 | Capture conversation and action items during 1:1 without distraction | During 1:1 | «Typing during the meeting → lose conversation. After the meeting → forget context.» — E3 | During 1:1 (N/week) |
| F3 | Follow up on action items from previous 1:1s consistently | Between 1:1s | «I probably have 20-30 open action items, half of which are no longer relevant.» — E3 | Daily checks |
| F4 | Give structured feedback for performance reviews (pulling from 1:1 history) | Performance review cycle (bi-annual) | «Review time — I'm scrambling through half a year of notes trying to remember.» — E2 | Bi-annually |
| F5 | Navigate difficult conversations (performance issues, salary, growth) with preparation | Infrequent but high-stakes | «Difficult conversations — I don't know how to start, how to structure, what to write afterwards.» — E4 | Monthly |

#### Emotional Jobs

| # | Job | Trigger | Evidence |
|---|-----|---------|----------|
| E1 | **Feel prepared** without spending 30 min before each 1:1 | Time pressure, calendar overload | «I skipped preparation for a 1:1 with a junior engineer because I was too busy. The meeting was a mess. I felt guilty.» — E3 |
| E2 | **Feel confident** that important things don't fall through the cracks | Action items piling up, forgetting commitments | «Action items tracking is weak. I forget to check. They pile up.» — E3 |
| E3 | **Feel supported** by tooling vs fighting it | Friction in workflow | «TeamFlow helps, but I still type everything manually. Tooling should work FOR me, not ADD work.» — E1 |

#### Social Jobs

| # | Job | Audience | Evidence |
|---|-----|----------|----------|
| S1 | Be seen by **direct reports** as attentive / supportive (not distracted / rushed) | Team | «A report can feel like a task when I'm clearly rushed. That's worst case.» — E2 |
| S2 | Be seen by **skip-level** as strong people manager | Skip-level / VP | «My skip asks "how's the team?" — I want to answer confidently, with data.» — E3 |
| S3 | Be seen by **peer managers** as organized / professional | Peer managers | «In calibration sessions, you can tell which managers know their people and which are winging it.» — E1 |

#### Job Prioritization

| # | Job | Importance | Satisfaction with current | Opportunity |
|---|-----|:----------:|:-------------------------:|:-----------:|
| F2 | Capture during 1:1 | 10 | 3 | 17 |
| F1 | Prep efficiently | 9 | 4 | 14 |
| F3 | Follow up action items | 9 | 2 | 16 |
| F4 | Feedback for reviews | 8 | 4 | 12 |
| F5 | Difficult conversations | 7 | 2 | 12 |
| E1 | Feel prepared | 9 | 4 | 14 |
| E2 | Feel confident (things tracked) | 8 | 3 | 13 |

**Top end-user opportunities:** F2 (capture during 1:1, 17), F3 (follow up action items, 16), F1 (prep efficiently, 14), E1 (feel prepared, 14).

---

### Buyer ↔ End-user Alignment

**Aligned opportunities (both care deeply):**
- Buyer F1 (consistency) **↔** End-user F3 (action items follow-up) — same underlying issue: things don't get done, no one sees it
- Buyer F3 (proactive coaching) **↔** End-user E2 (feel confident tracked) — both want visibility
- Buyer E3 (data-driven leader) **↔** End-user S2 (seen as strong manager) — both want to be credible via data

**Divergent / potential friction:**
- Buyer S3 (not policing) **↔** End-user E3 (tooling FOR me) — AI summarization risks feeling like surveillance unless opt-in + transparent
- Buyer F2 (reporting) **vs** End-user privacy — aggregate metrics OK, individual 1:1 content → red line

**Implications for AI summarization feature:**
1. Dual value prop: end-user gets 45 min/week back (F2 capture); buyer gets aggregate health metrics (F2 reporting)
2. Privacy architecture critical: end-user controls what gets summarized, buyer sees **aggregate** not individual content
3. Onboarding flow: emphasize «tool for manager, not to monitor manager» — preserve end-user agency
4. Pricing: per-seat premium makes sense — both buyer and end-user get value

> **JTBD lesson:** Splitting buyer vs end-user revealed a **conflict in expectations** (Buyer F2 reporting wants insights, end-user privacy concern). Without separate canvases this would have been missed — and the feature at launch would have faced backlash «feels Big Brother». This is information for the PRD NFR section (privacy architecture) and the GTM brief (messaging for end-users).
