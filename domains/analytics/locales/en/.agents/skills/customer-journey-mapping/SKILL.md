---
name: customer-journey-mapping
description: Analysis of customer touchpoints — from awareness to advocacy
---
# Customer Journey Mapping — Analysis of touchpoints from awareness to advocacy

## When to use
- When designing a new product / service — to understand the complete user journey.
- When optimizing the conversion funnel — identifying bottlenecks and drop-off points.
- When launching an omnichannel strategy — aligning the experience across all channels.
- When churn rate is growing — diagnosing moments of frustration and loss.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Product / service | ✅ | What we are analyzing |
| Target persona | ✅ | Who we build the map for (from `$icp-buyer-persona` or description) |
| Business model | ✅ | B2B / B2C / SaaS / Marketplace etc. |
| Current channels | ✅ | Online and offline touchpoints |
| Known problems | ⬚ | Where complaints/low conversion already exist |
| Analytics data | ⬚ | GA, Hotjar, CRM funnels, NPS, reviews |
| Competitors | ⬚ | For experience benchmarking |

> If mandatory fields are not provided — **ask the user** before starting the analysis. Do not guess.

## Data Sources
1. **Web search** — industry CX benchmarks, customer journey best practices.
2. **Reviews and feedback** — NPS data, reviews on platforms, support tickets.
3. **Product analytics** — conversion funnels, heatmaps, session recordings.
4. **CRM data** — sales cycle length, rejection reasons, repeat purchase points.
5. **Interviews / surveys** — if provided by the user.

> For each stage, indicate sources confirming the behavior pattern. Data older than 12 months — mark with ⚠️.

### Connection with other skills
| Skill | What we take | When to call |
|------|-----------|----------------|
| `icp-buyer-persona` | Persona profile, goals, context (step 1) | If the persona is not defined |
| `jtbd-analysis` | Jobs-to-be-done at each journey step (steps 2-7) | For an in-depth understanding of motivation at each stage |
| `cohort-analysis` | Retention curves, churn points (steps 6-7) | If quantitative retention data is needed |
| `competitive-analysis` | Competitor CX benchmarking (step 9) | To compare customer experience with competitors |
| `rfm-analysis` | Frequency/amount segments for the Retention stage (step 6) | To understand different retention patterns |
| `web-research` | Conversion benchmarks, industry CX practices | If there is no data or industry guidelines are needed |

## Protocol

### Step 0 — Context collection
1. Check the availability of all mandatory input data.
2. Determine the map type:

   | Type | Description | When to use |
   |-----|----------|-------------------|
   | **As-Is** | Current state of the customer journey | By default. Diagnosing problems |
   | **To-Be** | Target state after optimization | After as-is, based on gap analysis |

3. Determine the availability of quantitative data (conversions, NPS, churn). If there is no data — work with a qualitative model + industry benchmarks.

### Step 1 — Defining the persona
1. Record key characteristics:

   | Parameter | Value |
   |----------|----------|
   | Persona | [Name / role] |
   | Goal | [What they want to achieve] |
   | Context | [In what situation they turn to the product] |
   | Technical literacy | Low / Medium / High |
   | Entry trigger | [What launches the journey] |
   | Successful completion | [What is considered a result] |

2. If the persona is not defined — call `$icp-buyer-persona`.

### Step 2 — Awareness
1. How the customer first learns about the problem / product.
2. First-touch channels (search, social media, recommendations, ads, content).
3. Emotional state: curiosity, unconscious need, urgent pain.
4. Customer actions at this stage.
5. Pain points and barriers.
6. **Stage metrics:** reach, CTR, cost per acquisition (CPA), brand awareness.

### Step 3 — Consideration
1. How the customer compares options and deepens research.
2. Touchpoints: website, demo, reviews, case studies, comparative overviews.
3. Decision criteria for this persona.
4. Questions and doubts of the customer.
5. Pain points and barriers.
6. **Stage metrics:** visit → lead conversion, time on site, bounce rate, content engagement.

### Step 4 — Decision
1. Final actions before purchase / subscription.
2. Touchpoints: pricing, trial, demo call, contract.
3. Who else influences the decision (decision-maker, stakeholders, influencers).
4. Typical objections and how they are handled.
5. Pain points and barriers.
6. **Stage metrics:** lead → trial/demo conversion, sales cycle length, win rate.

### Step 5 — Purchase / Onboarding
1. The process of completing a purchase or subscription.
2. First Time User Experience (FTUE).
3. Expectations vs reality: "aha moment" or disappointment.
4. Touchpoints: payment, welcome series, onboarding, support.
5. Pain points and barriers.
6. **Stage metrics:** trial → paid conversion, time-to-value, activation rate, onboarding CSAT.

### Step 6 — Retention
1. Regular use and habit formation.
2. Triggers for repeat purchases or expansion (upsell / cross-sell).
3. Frustration moments: bugs, slow support, hidden costs.
4. Touchpoints: email communication, in-app notifications, support, updates.
5. Pain points and barriers.
6. **Stage metrics:** retention rate (M1, M3, M6, M12), churn rate, NPS, expansion revenue.
7. If data is available — link to `$cohort-analysis` (drop-off points).

### Step 7 — Advocacy
1. Transition from a loyal customer to a promoter.
2. Actions: recommendations to colleagues, reviews, UGC, community participation.
3. Advocacy triggers: exceptional experience, sense of belonging, rewards.
4. Advocacy barriers: no mechanism, inconvenient, nothing to share.
5. Touchpoints: referral program, community, events, social sharing.
6. **Stage metrics:** NPS promoters %, referral rate, review rate, UGC volume, viral coefficient.

### Step 8 — Channel mapping
1. For each stage — identify active channels and their role:

   | Stage | Online channels | Offline channels | Main channel | Consistency |
   |------|:-------------:|:-------------:|:--------------:|:---------------:|
   | Awareness | [Which ones] | [Which ones] | [Which one] | ✅ / ⚠️ |
   | Consideration | [Which ones] | [Which ones] | [Which one] | ✅ / ⚠️ |
   | Decision | [Which ones] | [Which ones] | [Which one] | ✅ / ⚠️ |
   | Purchase | [Which ones] | [Which ones] | [Which one] | ✅ / ⚠️ |
   | Retention | [Which ones] | [Which ones] | [Which one] | ✅ / ⚠️ |
   | Advocacy | [Which ones] | [Which ones] | [Which one] | ✅ / ⚠️ |

2. Identify gaps: where the customer "gets lost" when transitioning between channels.
3. Evaluate omnichannel consistency: whether the experience is the same across different channels.
4. Note loops and alternative paths (a customer returns from Decision to Consideration, skips stages, etc.).

### Step 9 — Moments of Truth
Highlight critical moments that define further customer behavior:

| # | Moment | Stage | Description | Current state | Risk (1-5) | Impact on metric |
|---|--------|------|----------|-------------------|:----------:|-------------------|
| 1 | First impression | Awareness → Cons. | Does messaging match expectations | [As is now] | X | Visit → lead conv. |
| 2 | First success (aha-moment) | Onboarding | Do they achieve a goal quickly | [As is now] | X | Activation rate, M1 ret. |
| 3 | First problem | Retention | Support quality and resolution speed | [As is now] | X | Churn rate, NPS |

> It is acceptable to add more Moments of Truth (up to 5) if they are critical for the given product.

### Step 10 — Gap analysis and recommendations
1. For each stage — compare customer expectations and actual experience:

   | Stage | Customer expectation | Reality (as-is) | Gap | Severity |
   |------|------------------|--------------------|-----|:--------:|
   | [Stage] | [What they expect] | [What they get] | [What is the gap] | 🔴/🟡/🟢 |

2. Prioritize by the Impact × Effort matrix:

   | | Low Effort | High Effort |
   |--|:----------:|:-----------:|
   | **High Impact** | 🎯 Quick Wins (P1) | 💎 Big Bets (P2) |
   | **Low Impact** | 🔧 Fill-ins (P3) | ❌ Avoid |

3. Formulate an action plan:

   | Priority | Stage | Gap | Action | Target metric | Expected effect | Effort |
   |:---------:|------|-----|----------|-----------------|:----------------:|:------:|
   | P1 | [stage] | [gap] | [what to do] | [metric] | +X% | Low |

## Example — B2B SaaS HR Platform

**Context:** HR platform for recruiting automation, B2B SaaS, subscription. Persona: HR director, company 50-200 emp.

### Customer journey map

| Stage | Actions | Touchpoints | Emotions | Pains | Metrics |
|------|----------|----------------|:------:|------|---------|
| **Awareness** | Searches a solution to close 15+ vacs | Google, LinkedIn, colleagues | 😰 Overwhelm | Doesn't know where to start comparing | CTR 2.1%, CPA $45 |
| **Consideration** | Compares 3-4 platforms, reads reviews | Site, G2, demo video, blog | 🤔 Caution | Unclear how we differ from competitors | Visit→lead: 4%, bounce: 62% 🔴 |
| **Decision** | Requests demo, shows to CEO | Demo call, pricing, trial | 😟 Fear of error | No ROI calculator, CEO doesn't see value | Lead→trial: 28%, cycle: 21 days |
| **Purchase** | Connects trial, imports vacancies | Welcome email, onboarding, chat | 😊→😐 | Excel import broken, 3 emails no reply | Trial→paid: 18% 🔴, TTV: 5 days |
| **Retention** | Uses 3x/week, but no upsell | Email digest, in-app, support | 😊 Habituality | No hh.ru integration, duplicates manually | M1: 72%, M6: 48%, NPS: 32 🟡 |
| **Advocacy** | Uses silently, doesn't recommend | — | 😐 Neutral | No referral program, nothing to share | Referral: 2% 🔴 |

### Channel mapping

| Stage | Online | Offline | Main | Consistency |
|------|--------|--------|----------|:---------------:|
| Awareness | Google Ads, LinkedIn | HR events | LinkedIn | ✅ |
| Consideration | Site, G2, blog | — | Site | ⚠️ Site doesn't reflect G2 features |
| Decision | Demo call (Zoom) | — | Demo call | ✅ |
| Purchase | In-app onboarding | — | In-app | ⚠️ Welcome email untied from onboard. |
| Retention | Email, in-app | — | In-app | ✅ |
| Advocacy | — | — | No channel | 🔴 Channel missing |

### Moments of Truth

| # | Moment | Stage | Current | Risk | Impact |
|---|--------|------|---------|:----:|---------|
| 1 | First site visit | Consideration | Bounce 62%, loose messaging | 4 | Visit→lead |
| 2 | First vacancy import (aha-mom.) | Purchase | Excel import broken for 30% | 5 | Trial→paid |
| 3 | First support ticket | Retention | Reply >24h, 3 emails unreplied | 4 | Churn, NPS |

### Gap analysis → Action Plan

| Priority | Stage | Gap | Action | Metric | Effect | Effort |
|:---------:|------|-----|----------|---------|:------:|:------:|
| P1 🎯 | Purchase | Excel import broken | Fix parser + add drag-n-drop | Trial→paid | +8% | Low |
| P1 🎯 | Consideration | Bounce 62%, lacking diff. | Hero section redesign: "Close vacs 2x faster" | Bounce rate | -15pp | Low |
| P2 💎 | Retention | No hh.ru integration | API integration with hh.ru | M6 retention | +10pp | High |
| P2 💎 | Advocacy | No referral program | Launch "invite HR-peer → month free" | Referral rate | +5% | Med |
| P3 🔧 | Decision | No ROI calculator | Interactive calculator on site | Lead→trial | +3% | Low |

## Validation (Quality Gate)

- [ ] All 6 journey stages covered (Awareness → Consideration → Decision → Purchase → Retention → Advocacy)
- [ ] For each stage: actions, emotions, touchpoints, pains, opportunities
- [ ] Metrics specified for each stage (real or benchmarks with a note)
- [ ] Retention and Advocacy analyzed separately
- [ ] Identified at least 3 Moments of Truth with risk assessment and impact on metric
- [ ] Channel mapping: online + offline channels at each stage, consistency evaluated
- [ ] Loops and alternative paths are marked (customer doesn't always go linearly)
- [ ] The map is tied to a specific persona (not an abstract customer)
- [ ] Gap analysis with Impact × Effort prioritization
- [ ] Action plan with target metrics and expected effect
- [ ] Data sources indicated; data older than 12 mo marked with ⚠️

> If validation fails — rework until passing, do not pass further.

## Handoff
The output of `$customer-journey-mapping` is input for:
- **Strategist / Mediator** — understanding the customer journey for strategic decisions.
- **`icp-buyer-persona`** — enriching personas with real behavior and pain data.
- **`rfm-analysis`** — touchpoints to increase frequency and amount of purchases (Retention stage).
- **`unit-economics`** — optimizing CAC via conversion enhancement at key stages.
- **`cohort-analysis`** — churn points for in-depth cohort analysis.
- **`jtbd-analysis`** — jobs at each stage to refine the value proposition.

Handoff format: journey map + Moments of Truth + gap analysis + action plan. When handing off — use `$handoff`.

## Anti-patterns

| Mistake | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Map without a persona | Abstract journey, untied to real behavior | Always tie to a specific persona |
| Only online channels | Half the customer journey is missed | Channel mapping: online + offline at each stage |
| No emotions | Dry scheme without customer understanding | Capture emotional state at each stage |
| Linear journey | Customers loop, return, skip stages | Note loops and alternative paths |
| No gap analysis | Map for the sake of a map, no actionable insights | Always conclude with gap analysis + Impact × Effort |
| Idealized journey | Drawing "how we want" instead of "as is" | Start with as-is, then build to-be |
| Too many details | Unreadable map, focus is lost | 5-7 touchpoints per stage maximum |
| Retention + Adv. in one | Retention ≠ recommendation, different mechanics and metrics | Analyze as separate stages |
| No metrics | Qualitative map without numbers — half the value | Connversion, NPS, time-to-value, churn at each stage |

## Output Template

```markdown
### Customer Journey Mapping — [Product / Service]

**Persona:** [Name / role]
**Map type:** As-Is / To-Be
**Business model:** [model]
**Analysis date:** [date]
**Data type:** Real / Benchmarks ([source])

---

#### Customer Journey Map

| Stage | Customer actions | Touchpoints | Emotions | Pains | Opportunities | Metrics |
|------|-----------------|----------------|:------:|------|-------------|---------|
| **Awareness** | [what they do] | [channels] | [😊😐😟] | [problem] | [improvement] | [CTR, CPA] |
| **Consideration** | [what they do] | [channels] | [😊😐😟] | [problem] | [improvement] | [conv., bounce] |
| **Decision** | [what they do] | [channels] | [😊😐😟] | [problem] | [improvement] | [win rate, cycle] |
| **Purchase / Onboard.** | [what they do] | [channels] | [😊😐😟] | [problem] | [improvement] | [activ., TTV] |
| **Retention** | [what they do] | [channels] | [😊😐😟] | [problem] | [improvement] | [ret., NPS, churn] |
| **Advocacy** | [what they do] | [channels] | [😊😐😟] | [problem] | [improvement] | [refer., UGC] |

---

#### Channel Mapping

| Stage | Online channels | Offline channels | Main channel | Consistency |
|------|:-------------:|:-------------:|:--------------:|:---------------:|
| [Stage] | [Which ones] | [Which ones] | [Which one] | ✅ / ⚠️ / 🔴 |

**Loops and alternative paths:** [description of nonlinear routes]

---

#### Moments of Truth

| # | Moment | Stage | Current state | Risk (1-5) | Impact on metric |
|---|--------|------|-------------------|:----------:|-------------------|
| 1 | [moment] | [stage] | [description] | X | [metric] |

---

#### Gap Analysis

| Stage | Customer expectation | Reality (as-is) | Gap | Severity |
|------|------------------|--------------------|-----|:--------:|
| [Stage] | [What they expect] | [What they get] | [Gap] | 🔴/🟡/🟢 |

---

#### Action Plan (Impact × Effort)

| Priority | Stage | Gap | Action | Target metric | Expected effect | Effort |
|:---------:|------|-----|----------|-----------------|:----------------:|:------:|
| P1 🎯 | [stage] | [gap] | [what to do] | [metric] | +X% | Low |
| P2 💎 | [stage] | [gap] | [what to do] | [metric] | +X% | High |
| P3 🔧 | [stage] | [gap] | [what to do] | [metric] | +X% | Low |

---

#### Recommendations for subsequent stages
- **→ Strategist:** [key insight for strategy]
- **→ $icp-buyer-persona:** [persona enrichment]
- **→ $unit-economics:** [impact on CAC/LTV]
- **→ $cohort-analysis:** [churn points for in-depth analysis]

---

#### Sources and Assumptions

| # | Fact / assumption | Source | Date | Reliability |
|---|-------------------|----------|------|:-------------:|
| 1 | [Fact] | [Source] | [Date] | ✅ / ⚠️ / 🔮 |

Legend: ✅ Verified (analytics data / A/B test) | ⚠️ Estimated (benchmark / 1 source) | 🔮 Assumed (expert hypothesis)
```
