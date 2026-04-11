---
name: jtbd-analysis
description: Customer job analysis — functional, emotional, social jobs and opportunity score
---
# Jobs To Be Done — Customer Job Analysis

## When to Use
- When developing a new product — to uncover the real jobs customers are trying to get done.
- When prioritizing features — to determine which jobs are underserved and present the greatest opportunity.
- When revisiting the value proposition — to understand what customers actually pay for.
- When churn is high — to discover which jobs the product fails to address or addresses poorly.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Product / service | ✅ | What we are analyzing |
| Target audience | ✅ | Who is our customer (from `$icp-buyer-persona` or description) |
| Usage context | ✅ | In what situation the customer turns to the product |
| Existing data | ⬚ | Interviews, surveys, reviews, support tickets |
| Competitors | ⬚ | Alternatives the customer currently uses |
| Job hypotheses | ⬚ | Team's preliminary assumptions |

> If required fields are not provided — **ask the user** before starting the analysis. Do not assume.

## Data Sources
1. **Web search** — customer reviews, forum discussions, video reviews.
2. **Reviews** — App Store, Google Play, G2, Capterra, Trustpilot, Amazon Reviews.
3. **Forums and communities** — Reddit, Quora, Stack Overflow, topical groups.
4. **Competitive analysis** — how competitors position their solutions (which Jobs they address).
5. **User-provided data** — interviews, surveys, CRM data, support tickets.

> For each Job — at least 1 source confirming its existence.

## Protocol

### Step 0 — Context Gathering
Verify all required input data is present. Determine the analysis level: entire product or a specific feature / scenario.

### Step 1 — Context Definition (When / Where / Why)
- **When:** in what situation the need arises (trigger).
- **Where:** physical and digital context of use.
- **Why:** what progress the customer wants to achieve.
- Formulate a context statement: "When [situation], I want [progress], so that [outcome]".

### Step 2 — Functional Jobs
Identify the practical tasks the customer is trying to accomplish:
- Main Job — the key objective.
- Related Jobs — what else needs to be done in context.
- Consumption Chain Jobs — purchasing, setup, learning, maintenance.
- Formulation: verb + object + context (without tying to a solution).

### Step 3 — Emotional Jobs
Identify how the customer wants to feel:
- Confidence, control, peace of mind.
- Satisfaction, pride, accomplishment.
- Relief from anxiety, stress, uncertainty.
- Formulation: "Feel [emotion] when [context]".

### Step 4 — Social Jobs
Identify how the customer wants to be perceived by others:
- Professionalism, expertise, competence.
- Innovation, progressiveness.
- Reliability, responsibility.
- Formulation: "Be seen as [quality] by [audience]".

### Step 5 — Prioritization (Importance vs Satisfaction)
For each Job, rate on two scales (1-10):
- **Importance** — how important this job is to the customer.
- **Satisfaction** — how well current solutions handle it.
- Plot on a matrix: high importance + low satisfaction = top opportunity.

### Step 6 — Outcome Expectations
For each priority Job, define expected outcomes:
- What the customer considers successful job completion.
- Success metrics from the customer's perspective (speed, quality, cost, convenience).
- Minimum acceptable level and ideal level.

### Step 7 — Competing Solutions
For each Job, identify how the customer currently solves it:
- Direct competitors (similar products).
- Indirect competitors (different solution categories).
- DIY solutions (Excel, manual processes, workarounds).
- "Do nothing" (tolerate the problem).

### Step 8 — Opportunity Score
Calculate the Opportunity Score for each Job:
- **Formula:** Opportunity = Importance + max(Importance - Satisfaction, 0).
- Jobs with Opportunity > 15 — high potential (underserved).
- Jobs with Opportunity < 10 — low potential (overserved or unimportant).
- Rank all Jobs by Opportunity Score.

## Validation (Quality Gate)

- [ ] At least 5 functional jobs identified with proper formulation
- [ ] At least 3 emotional jobs identified
- [ ] At least 2 social jobs identified
- [ ] All jobs formulated without tying to a specific solution
- [ ] Prioritization conducted via Importance x Satisfaction matrix
- [ ] Opportunity Score calculated for all jobs
- [ ] Competing solutions identified for each priority job
- [ ] Outcome Expectations are specific and measurable
- [ ] Data sources indicated for key jobs

> If validation fails — refine until it passes, do not hand off incomplete work.

## Handoff
The `$jtbd-analysis` result is input for:
- **Strategist / Mediator** — priority Jobs for product strategy.
- `$icp-buyer-persona` — enriching personas with jobs and expectations.
- `$competitive-analysis` — competing solutions for benchmarking.
- `$customer-journey-mapping` — jobs at each stage of the customer journey.
- `$unit-economics` — willingness to pay based on the value of solving jobs.

On handoff — use `$handoff` with the ranked list of Jobs and Opportunity Scores.

## Anti-patterns

| Mistake | Why It's Bad | How to Do It Right |
|---------|-------------|-------------------|
| Job tied to a solution | "Wants to use our API" — that's not a Job | Formulate through progress, not through the product |
| Only functional Jobs | Emotions and social context are ignored | Always analyze all three types |
| Without prioritization | All Jobs seem equally important | Use the Importance x Satisfaction matrix |
| Without competing solutions | Unclear what we compete against | For each Job — current alternatives |
| Too abstract Jobs | "Wants to be successful" — not actionable | Specific context, specific progress |
| Mixing Job and Feature | Job — customer's task, Feature — the solution | Separate the levels of analysis |
| Without Outcome Expectations | Unclear how to measure success | Define success metrics for each Job |

## Output Template

```
### Jobs To Be Done — [Product / Service]

**Target Audience:** [who]
**Context:** [situation]
**Analysis Date:** [date]

---

#### Context Statement
> When [situation], [persona] wants [progress], so that [outcome].

---

#### Job Hierarchy

##### Functional Jobs

| # | Job | Importance (1-10) | Satisfaction (1-10) | Opportunity Score | Status |
|---|-----|-------------------|---------------------|-------------------|--------|
| F1 | [Main Job: verb + object + context] | [X] | [X] | [X] | Underserved / Served / Overserved |
| F2 | [Related Job] | [X] | [X] | [X] | [status] |
| F3 | [Related Job] | [X] | [X] | [X] | [status] |

##### Emotional Jobs

| # | Job | Importance | Satisfaction | Opportunity |
|---|-----|-----------|--------------|-------------|
| E1 | Feel [emotion] when [context] | [X] | [X] | [X] |
| E2 | Feel [emotion] when [context] | [X] | [X] | [X] |

##### Social Jobs

| # | Job | Importance | Satisfaction | Opportunity |
|---|-----|-----------|--------------|-------------|
| S1 | Be seen as [quality] by [audience] | [X] | [X] | [X] |
| S2 | Be seen as [quality] by [audience] | [X] | [X] | [X] |

---

#### Opportunity Score Matrix

| Zone | Jobs | Recommendation |
|------|------|----------------|
| **Underserved** (>15) | [F1, E1, ...] | Priority for development — high potential |
| **Served** (10-15) | [F2, S1, ...] | Maintain current level |
| **Overserved** (<10) | [F3, ...] | Do not invest, consider simplifying |

---

#### Competing Solutions

| Job | Direct Competitor | Indirect Competitor | DIY | "Do Nothing" |
|-----|------------------|---------------------|-----|--------------|
| [F1] | [solution] | [solution] | [solution] | [consequences] |
| [F2] | [solution] | [solution] | [solution] | [consequences] |

---

#### Outcome Expectations (for top 3 Jobs)

| Job | Success Metric | Minimum | Ideal | Current Level |
|-----|---------------|---------|-------|---------------|
| [F1] | [metric] | [value] | [value] | [value] |
| [F1] | [metric] | [value] | [value] | [value] |

---

#### Recommendations
1. **Top opportunity:** [Job with highest Opportunity Score] — [what to do]
2. **Quick win:** [Job that is easy to improve] — [what to do]
3. **Strategic bet:** [Job with high growth potential] — [what to do]
```
