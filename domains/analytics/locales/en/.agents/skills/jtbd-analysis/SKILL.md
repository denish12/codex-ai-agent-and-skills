---
name: jtbd-analysis
description: Customer jobs analysis — functional, emotional, social jobs, and opportunity score
---
# Jobs To Be Done — Customer Jobs Analysis

## When to Use
- During new product development — to identify the real jobs the customer is trying to get done.
- When prioritizing features — to determine which jobs are underserved and represent the greatest opportunity.
- When evaluating a value proposition — to understand what the customer is actually willing to pay for.
- When churn is high — to find out which jobs the product fails to solve or solves poorly.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Product / service | ✅ | What is being analyzed |
| Target audience | ✅ | Who the customer is (from `$icp-buyer-persona` or description) |
| Usage context | ✅ | In what situation the customer uses the product |
| Existing data | ⬚ | Interviews, surveys, reviews, support tickets |
| Competitors | ⬚ | Alternatives the customer currently uses |
| Job hypotheses | ⬚ | Preliminary assumptions from the team |

> If mandatory fields are not provided — **request them from the user** before starting the analysis. Do not make assumptions.

## Data Sources
1. **Web Search** — customer reviews, forum discussions, video reviews.
2. **Reviews** — App Store, Google Play, G2, Capterra, Trustpilot, Amazon Reviews.
3. **Forums & Communities** — Reddit, Quora, Stack Overflow, thematic groups.
4. **Competitive Analysis** — how competitors position their solutions (what Jobs they address).
5. **Customer Data** — interviews, surveys, CRM data, support tickets.

> For each Job — at least 1 source confirming its existence. Mark data older than 12 months with ⚠️.

### Integration with Other Skills
| Skill | What We Take | When to Trigger |
|-------|--------------|-----------------|
| `icp-buyer-persona` | Personas, goals, pains, context (steps 0-1) | If the target audience is undefined |
| `competitive-analysis` | How competitors address Jobs, white spaces (step 7) | To identify competing solutions |
| `customer-journey-mapping` | Points where Jobs arise in the customer journey (step 1) | To link Jobs to journey stages |
| `web-research` | Reviews, discussions, customer pain points | If primary data (interviews/surveys) is lacking |
| `blue-ocean-strategy` | ERRC factors to create new value | If underserved Jobs require a radically new solution |
| `cohort-analysis` | Correlation between Jobs and retention (step 8) | If needed to understand which Jobs impact retention |

## Protocol

### Step 0 — Context Gathering
1. Verify the availability of required input data.
2. Determine the level of analysis: the entire product or a specific feature / scenario.
3. Determine data type: primary (interviews, surveys) or secondary (reviews, forums, benchmarks).
4. If the persona is undefined — trigger `$icp-buyer-persona`.

### Step 1 — Defining Context (When / Where / Why)
- **When:** in what situation the need arises (trigger).
- **Where:** physical and digital context of use.
- **Why:** what progress the customer wants to achieve.
- Formulate a context statement: "When [situation], I want to [progress], so I can [result]."

### Step 2 — Functional Jobs
Determine the practical tasks the customer is trying to accomplish:
- **Main Job** — the primary goal (one).
- **Related Jobs** — what else needs to be done in that context (2-5).
- **Consumption Chain Jobs** — purchasing, setting up, learning, maintaining (2-4).
- Formulation: **verb + object + context** (without tying it to a specific solution).

> Correctness test: if the wording contains a product name, brand, or technology — it is a Feature, not a Job. Reformulate.

### Step 3 — Emotional Jobs
Determine how the customer wants to feel:
- Confidence, control, peace of mind.
- Satisfaction, pride, achievement.
- Relief from anxiety, stress, uncertainty.
- Formulation: "Feel [emotion] when [context]."

### Step 4 — Social Jobs
Determine how the customer wants to be perceived by others:
- Professionalism, expertise, competence.
- Innovation, progressiveness.
- Reliability, responsibility.
- Formulation: "Be perceived as [quality] by [audience]."

### Step 5 — Job Map (Main Job Steps)
Break down the Main Job using the Universal Job Map:

| Step | Description | Analysis Question |
|------|-------------|-------------------|
| 1. **Define** | Determine what needs to be done | How does the customer formulate the goal? What objectives are set? |
| 2. **Locate** | Find resources and inputs | What needs to be found/gathered before execution? |
| 3. **Prepare** | Get ready to execute | How does the customer prepare the environment, tools, data? |
| 4. **Confirm** | Verify readiness | How do they check that everything is in place? |
| 5. **Execute** | Perform the task | What exactly are they doing? What are the steps? |
| 6. **Monitor** | Track progress | How do they know things are on track? |
| 7. **Modify** | Correct issues if they arise | What do they do if something goes wrong? |
| 8. **Conclude** | Finish the task | How is the result finalized? What happens next? |

For each step: what the customer does now, where the friction is, what can be improved.

### Step 6 — Prioritization (Importance vs Satisfaction)
Score each Job on two scales (1-10):
- **Importance** — how important this job is to the customer.
- **Satisfaction** — how well current solutions get the job done.

| Zone | Condition | Interpretation |
|------|-----------|----------------|
| **Underserved** | High Importance + Low Satisfaction | Core opportunity — customer wants it but isn't getting it |
| **Served** | Importance ≈ Satisfaction | Current level is sufficient |
| **Overserved** | Low Importance + High Satisfaction | Over-invested — could be simplified |

### Step 7 — Outcome Expectations
Define expected outcomes for each priority Job:

| Job | Outcome | Metric | Minimum | Ideal | Current Level | Gap |
|-----|---------|--------|:-------:|:-----:|:-------------:|:---:|
| [F1] | [Result] | [How to measure] | [Value] | [Value] | [Value] | [Δ] |

- Metrics: speed, quality, cost, convenience, reliability.
- Gap = Ideal − Current Level. The larger the Gap, the larger the opportunity.

### Step 8 — Competing Solutions
For each Job:

| Job | Direct Competitor | Indirect | DIY | "Do nothing" |
|-----|-------------------|----------|-----|--------------|
| [F1] | [Product A] | [Category B] | [Excel, manual process] | [Consequences: loses X] |

- **Switching triggers:** what will cause the customer to switch from their current solution.
- **Barriers:** what keeps them on the current solution (habit, switching costs, fear).

### Step 9 — Opportunity Score
Calculate the Opportunity Score for each Job:

**Formula:** `Opportunity = Importance + max(Importance - Satisfaction, 0)`

| Threshold | Status | Recommendation |
|:---------:|--------|----------------|
| > 15 | 🔴 Underserved | Priority — high potential for the product |
| 10-15 | 🟡 Served | Maintain, seek targeted improvements |
| < 10 | 🟢 Overserved | Do not invest, consider simplifying |

Rank all Jobs by Opportunity Score.

### Step 10 — Jobs → Product Opportunities
Translate underserved Jobs into specific product opportunities:

| # | Underserved Job | Opportunity Score | Job Map Friction | Product Opportunity | Type |
|---|-----------------|:-----------------:|------------------|---------------------|:----:|
| 1 | [F1] | XX | [Job Map step with friction] | [What the product can do] | Feature / Improvement / New Product |

- **Feature** — add functionality addressing a specific Job Map step.
- **Improvement** — improve an existing feature (reduce friction).
- **New Product** — if the Job requires a fundamentally new solution → trigger `$blue-ocean-strategy`.

## Example — SaaS: Recruiting Automation Platform

**Context:** HR platform, persona "Marina" (HR Director, 50-200 employees, 15+ open roles).

### Context Statement
> When a company has 15+ open roles simultaneously, the HR Director wants to quickly close positions with suitable candidates so that the business does not lose money due to unfilled roles.

### Functional Jobs

| # | Job | Imp. | Sat. | Opp. | Status |
|---|-----|:----:|:----:|:----:|:------:|
| F1 | Filter suitable candidates from a resume stream (15+ roles) | 9 | 4 | **14** | 🔴 Underserved |
| F2 | Approve a candidate with the hiring manager in 1-2 days | 8 | 3 | **13** | 🔴 Underserved |
| F3 | Track the status of all current open roles in one place | 7 | 5 | **9** | 🟢 Overserved |
| F4 | Import roles and resumes from external sources (e.g. Indeed) | 8 | 2 | **14** | 🔴 Underserved |
| F5 | Prepare a hiring efficiency report for the CEO | 6 | 4 | **8** | 🟢 Overserved |

### Emotional Jobs

| # | Job | Imp. | Sat. | Opp. |
|---|-----|:----:|:----:|:----:|
| E1 | Feel in control when managing 15+ roles simultaneously | 9 | 3 | **15** 🔴 |
| E2 | Relieve anxiety about a candidate getting "lost" in the process | 8 | 4 | **12** 🟡 |

### Social Jobs

| # | Job | Imp. | Sat. | Opp. |
|---|-----|:----:|:----:|:----:|
| S1 | Be perceived as an effective HR leader by the CEO | 8 | 5 | **11** 🟡 |
| S2 | Demonstrate a tech-savvy approach in front of the team | 6 | 6 | **6** 🟢 |

### Job Map — Main Job (F1: Filter candidates)

| Step | Current Behavior | Friction | Opportunity |
|------|------------------|----------|-------------|
| Define | Formulates requirements mentally | No standardized template → vague criteria | Requirements template with must/nice-to-have |
| Locate | Searches for resumes manually | Manual search for 15 roles = 3h/day | Auto-import via API |
| Prepare | Copies resumes into Excel | Formatting breaks, no unified view | Auto-parsing of resumes |
| Confirm | Visually checks for fit | Highly subjective, misses candidates | AI-scoring based on criteria |
| Execute | Emails the manager | Manager forgets, no SLAs | In-app approvals with deadlines |
| Monitor | Asks the manager via chat | Zero visibility into status | Dashboard with a pipeline |

### Jobs → Product Opportunities

| # | Job | Opp. | Friction | Opportunity | Type |
|---|-----|:----:|----------|-------------|:----:|
| 1 | F4: Import from external sources | 14 | Locate: manual search 3h/day | API integration | Feature |
| 2 | F1: Filter candidates | 14 | Confirm: subjective scoring | AI-scoring by must/nice-to-have | Feature |
| 3 | F2: Approve with manager | 13 | Execute: email without SLA | In-app approvals with deadlines | Improvement |

## Validation (Quality Gate)

- [ ] Identified at least 5 functional jobs formulated as "verb + object + context"
- [ ] Identified at least 3 emotional jobs
- [ ] Identified at least 2 social jobs
- [ ] All jobs formulated without tying them to a specific solution (test: no product names)
- [ ] Job Map built for the Main Job (8 steps of the Universal Job Map)
- [ ] For each Job Map step: current behavior, friction, and opportunity defined
- [ ] Prioritization via Importance × Satisfaction is completed
- [ ] Opportunity Score calculated, Jobs ranked
- [ ] Competing solutions (4 levels) and switching triggers defined for each priority Job
- [ ] Outcome Expectations defined with metrics, minimum, ideal, and gap
- [ ] Underserved Jobs translated into product opportunities
- [ ] Data sources cited; data older than 12 months marked with ⚠️

> If validation fails — revise and refine until it passes, rather than proceeding to the next step.

## Handoff
The output of `$jtbd-analysis` serves as input for:
- **Strategist / Product Manager** — priority Jobs for product strategy.
- **`icp-buyer-persona`** — enriching personas with jobs and expectations.
- **`competitive-analysis`** — competing solutions for benchmarking.
- **`customer-journey-mapping`** — jobs at each stage of the customer journey.
- **`unit-economics`** — willingness to pay based on the value of jobs to be done.
- **`blue-ocean-strategy`** — if underserved Jobs require a radically new solution.

Handoff format: ranked list of Jobs with Opportunity Scores + Job Map + product opportunities. Use `$handoff` to transfer context.

## Anti-patterns

| Error | Why it's bad | Correct Approach |
|-------|--------------|------------------|
| Job is tied to a solution | "Wants to use our API" is a Feature, not a Job | Frame via progress: "verb + object + context" |
| Only functional Jobs | Emotional and social context are ignored | Always analyze all three types |
| Without prioritization | All Jobs appear equally important | Importance × Satisfaction → Opportunity Score |
| Free of competing solutions | Unclear what we are competing against | For each Job: direct, indirect, DIY, "do nothing" |
| Excessively abstract Jobs | "Wants to be successful" is not actionable | Specific context: "close 15 roles in 30 days" |
| Confusing Job and Feature | Job = customer's task, Feature = provider's solution | Separate layers, translate via Job Map |
| Without Outcome Expectations | Unclear how to measure success | Metric + minimum + ideal + current level + gap |
| Missing Job Map | Unclear where the exact friction points lie | Universal Job Map: 8 steps for the Main Job |
| Opportunity Score without actions | We know it's underserved, but don't know what to do | Jobs → Product Opportunities with type: feature / improvement / new product |

## Output Template

```markdown
### Jobs To Be Done — [Product / Service]

**Target Audience:** [who]
**Context:** [situation]
**Data Type:** Primary (interviews N=X) / Secondary (reviews, forums)
**Date of Analysis:** [date]

---

#### Context Statement
> When [situation], [persona] wants to [progress], so they can [result].

---

#### Job Hierarchy

##### Functional Jobs

| # | Job | Imp. (1-10) | Sat. (1-10) | Opp. Score | Status | Source |
|---|-----|:-----------:|:-----------:|:----------:|:------:|--------|
| F1 | [Main Job: verb + object + context] | X | X | XX | 🔴/🟡/🟢 | [Source] |
| F2 | [Related Job] | X | X | XX | 🔴/🟡/🟢 | [Source] |

##### Emotional Jobs

| # | Job | Imp. | Sat. | Opp. | Source |
|---|-----|:----:|:----:|:----:|--------|
| E1 | Feel [emotion] when [context] | X | X | XX | [Source] |

##### Social Jobs

| # | Job | Imp. | Sat. | Opp. | Source |
|---|-----|:----:|:----:|:----:|--------|
| S1 | Be perceived as [quality] by [audience] | X | X | XX | [Source] |

---

#### Job Map — Main Job ([F1])

| Step | Current Behavior | Friction | Opportunity |
|------|------------------|----------|-------------|
| Define | [Description] | [Problem] | [Solution] |
| Locate | [Description] | [Problem] | [Solution] |
| Prepare | [Description] | [Problem] | [Solution] |
| Confirm | [Description] | [Problem] | [Solution] |
| Execute | [Description] | [Problem] | [Solution] |
| Monitor | [Description] | [Problem] | [Solution] |
| Modify | [Description] | [Problem] | [Solution] |
| Conclude | [Description] | [Problem] | [Solution] |

---

#### Opportunity Score Matrix

| Zone | Jobs | Opp. Score | Recommendation |
|------|------|:----------:|----------------|
| 🔴 Underserved (>15) | [F1, E1, ...] | XX-XX | Priority for development |
| 🟡 Served (10-15) | [F2, S1, ...] | XX-XX | Maintain, targeted improvements |
| 🟢 Overserved (<10) | [F3, ...] | XX-XX | Do not invest, consider simplifying |

---

#### Competing Solutions

| Job | Direct | Indirect | DIY | "Nothing" | Switching Trigger |
|-----|--------|----------|-----|-----------|-------------------|
| [F1] | [Product] | [Category] | [Method] | [Consequences] | [What will cause a switch] |

---

#### Outcome Expectations (Top 3 Jobs)

| Job | Outcome | Metric | Minimum | Ideal | Current | Gap |
|-----|---------|--------|:-------:|:-----:|:-------:|:---:|
| [F1] | [Result] | [Metric] | [Value] | [Value] | [Value] | [Δ] |

---

#### Jobs → Product Opportunities

| # | Underserved Job | Opp. | Job Map Friction | Opportunity | Type |
|---|-----------------|:----:|------------------|-------------|:----:|
| 1 | [F1] | XX | [Step: problem] | [What to do] | Feature / Improvement / New Product |

---

#### Sources and Assumptions

| # | Fact / Assumption | Source | Date | Reliability |
|---|-------------------|--------|------|:-----------:|
| 1 | [Fact] | [Source] | [Date] | ✅ / ⚠️ / 🔮 |

Legend: ✅ Verified (interviews N≥5 / product data) | ⚠️ Estimated (reviews / 1 source) | 🔮 Assumed (hypothesis)
```
