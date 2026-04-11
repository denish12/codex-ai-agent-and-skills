---
name: customer-journey-mapping
description: Customer touchpoint analysis — from awareness to advocacy
---
# Customer Journey Map — Touchpoint Analysis from Awareness to Advocacy

## When to Use
- When designing a new product / service — to understand the complete customer path.
- When optimizing the conversion funnel — identifying bottlenecks and drop-off points.
- When launching an omnichannel strategy — aligning experience across all channels.
- When churn rate is rising — diagnosing moments of disappointment and loss.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Product / service | ✅ | What we are analyzing |
| Target persona | ✅ | For whom we are building the map (from `$icp-buyer-persona` or description) |
| Business model | ✅ | B2B / B2C / SaaS / Marketplace, etc. |
| Current channels | ✅ | Online and offline touchpoints |
| Known issues | ⬚ | Where complaints / low conversion already exist |
| Analytics data | ⬚ | GA, Hotjar, CRM funnels, NPS, reviews |
| Competitors | ⬚ | For experience benchmarking |

> If required fields are not provided — **ask the user** before starting the analysis. Do not assume.

## Data Sources
1. **Web search** — CX benchmarks by industry, customer journey best practices.
2. **Reviews and feedback** — NPS data, platform reviews, support tickets.
3. **Product analytics** — conversion funnels, heatmaps, session recordings.
4. **CRM data** — sales cycle length, rejection reasons, repeat purchase points.
5. **Interviews / surveys** — if provided by the user.

> For each stage, indicate sources confirming the behavioral pattern.

## Protocol

### Step 0 — Context Gathering
Verify all required input data is present. Determine map type: current state (as-is) or target (to-be). Default is as-is.

### Step 1 — Persona Definition
- Record key persona characteristics: goals, context, technical literacy level.
- Define the starting point (trigger for entering the journey).
- Define the end point (what constitutes successful completion).

### Step 2 — Awareness
- How the customer first learns about the product / problem.
- First-touch channels (search, social media, referrals, advertising).
- Emotional state: curiosity, unrecognized need, urgent pain.
- Customer actions at this stage.
- Pain points and barriers.

### Step 3 — Consideration
- How the customer compares options and deepens research.
- Touchpoints: website, demo, reviews, case studies, comparison reviews.
- Decision criteria for this persona.
- Customer questions and doubts.
- Pain points and barriers.

### Step 4 — Decision
- Final actions before purchase / subscription.
- Touchpoints: pricing, trial, demo call, contract.
- Who else influences the decision (decision-makers, stakeholders).
- Typical objections and how they are resolved.
- Pain points and barriers.

### Step 5 — Purchase / Onboarding
- The purchase or subscription process.
- First use experience (FTUE — First Time User Experience).
- Expectations vs reality: the "aha moment" or disappointment.
- Touchpoints: payment, welcome series, onboarding, support.
- Pain points and barriers.

### Step 6 — Retention / Advocacy
- Regular use and habit formation.
- Repeat purchase or expansion triggers (upsell / cross-sell).
- Delight moments and frustration moments.
- Transition to advocacy: referrals, reviews, UGC.
- Pain points and barriers.

### Step 7 — Moments of Truth
Identify critical moments that determine subsequent customer behavior:
- **Moment of Truth #1:** first impression (meeting expectations).
- **Moment of Truth #2:** first success (achieving a goal with the product).
- **Moment of Truth #3:** first problem (quality of support and response).
- For each moment — current state, risk, and recommendation.

### Step 8 — Gap Analysis and Recommendations
- Identify gaps between customer expectations and actual experience.
- Prioritize issues by business impact (conversion, retention, NPS).
- Formulate specific recommendations indicating the stage and touchpoint.

## Validation (Quality Gate)

- [ ] All 5 journey stages covered (Awareness → Advocacy)
- [ ] For each stage: actions, emotions, touchpoints, pain points, opportunities are specified
- [ ] At least 3 Moments of Truth identified
- [ ] Map is tied to a specific persona (not an abstract customer)
- [ ] Pain points are specific and actionable
- [ ] Gap analysis conducted with prioritization
- [ ] Recommendations tied to specific stages and touchpoints
- [ ] Data sources indicated for key behavioral patterns

> If validation fails — refine until it passes, do not hand off incomplete work.

## Handoff
The `$customer-journey-mapping` result is input for:
- **Strategist / Mediator** — understanding the customer path for strategic decisions.
- `$icp-buyer-persona` — enriching personas with real behavior data.
- `$rfm-analysis` — points for increasing purchase frequency and amount.
- `$unit-economics` — optimizing CAC through improving conversion at key stages.

On handoff — use `$handoff` indicating key findings and priority gaps.

## Anti-patterns

| Mistake | Why It's Bad | How to Do It Right |
|---------|-------------|-------------------|
| Map without a persona | Abstract path, not tied to real behavior | Always tie to a specific persona |
| Online channels only | Half the customer path is missed | Include offline: calls, meetings, events |
| No emotions | Dry diagram without customer understanding | Record emotional state at every stage |
| Linear path | Customers loop back, skip stages | Mark loops and alternative paths |
| Without gap analysis | Map for map's sake, no actionable conclusions | Always conclude with gap analysis and recommendations |
| Idealized path | Drawing "how we want it" instead of "how it is" | Start with as-is, then build to-be |
| Too much detail | Map is unreadable, focus is lost | 5-7 touchpoints per stage maximum |

## Output Template

```
### Customer Journey Map — [Product / Service]

**Persona:** [Name / persona name]
**Map Type:** As-Is / To-Be
**Business Model:** [model]
**Analysis Date:** [date]

---

#### Customer Journey Map

| Stage | Customer Actions | Touchpoints | Emotions | Pain Points | Opportunities |
|-------|-----------------|-------------|----------|-------------|---------------|
| **Awareness** | [what they do] | [channels] | [emotion] | [problem] | [improvement] |
| **Consideration** | [what they do] | [channels] | [emotion] | [problem] | [improvement] |
| **Decision** | [what they do] | [channels] | [emotion] | [problem] | [improvement] |
| **Purchase / Onboarding** | [what they do] | [channels] | [emotion] | [problem] | [improvement] |
| **Retention / Advocacy** | [what they do] | [channels] | [emotion] | [problem] | [improvement] |

---

#### Moments of Truth

| # | Moment | Stage | Current State | Risk | Recommendation |
|---|--------|-------|---------------|------|----------------|
| 1 | [moment] | [stage] | [description] | [risk] | [action] |
| 2 | [moment] | [stage] | [description] | [risk] | [action] |
| 3 | [moment] | [stage] | [description] | [risk] | [action] |

---

#### Gap Analysis (prioritized)

| Priority | Stage | Gap | Business Impact | Recommendation | Complexity |
|----------|-------|-----|-----------------|----------------|------------|
| P1 | [stage] | [gap] | [metric] | [action] | [H/M/L] |
| P2 | [stage] | [gap] | [metric] | [action] | [H/M/L] |
| P3 | [stage] | [gap] | [metric] | [action] | [H/M/L] |

---

#### Recommendations for Next Stages
- **→ Strategist:** [key conclusion]
- **→ $icp-buyer-persona:** [persona enrichment]
- **→ $unit-economics:** [impact on CAC/LTV]
```
