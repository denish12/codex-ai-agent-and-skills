---
name: icp-buyer-persona
description: Ideal customer profile and buyer personas — firmographics, demographics, decision-making process
---
# ICP / Buyer Persona — Ideal Customer Profile and Buyer Personas

## When to Use
- When launching a new product or entering a new market — to define the target customer.
- When setting up marketing and sales — for targeting and personalized communications.
- When conversion is low — rethinking who efforts are directed at.
- When scaling — refining ICP for new segments and geographies.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Product / service | ✅ | What we offer |
| Business model | ✅ | B2B / B2C / B2B2C / DTC |
| Target geography | ✅ | Markets and regions |
| Pricing model | ⬚ | Subscription / transaction / license |
| Current customers | ⬚ | Description or data of best current customers |
| CRM data | ⬚ | Deals, average deal size, sales cycle, rejection reasons |
| Competitors | ⬚ | Who customers consider as alternatives |
| Hypotheses | ⬚ | Preliminary assumptions about the target audience |

> If required fields are not provided — **ask the user** before starting the analysis. Do not assume.

## Data Sources
1. **Web search** — industry reports on target market demographics / firmographics.
2. **CRM data** — profile of best customers (if provided).
3. **Competitive analysis** — who competitors target (landing pages, case studies).
4. **Social platforms** — LinkedIn (for B2B), social media, professional communities.
5. **Reviews and feedback** — who leaves reviews, what their characteristics are.

> For each claim about a persona — indicate the data source.

## Protocol

### Step 0 — Context Gathering
Verify required data is present. Determine focus: B2B (ICP + Buyer Personas) or B2C (Buyer Personas). For B2B2C — both layers.

### Step 1 — Business Context
- Product description and key value proposition.
- Business model and unit of sale definition.
- Average deal size and sales cycle.
- Current customer base: who already buys, who is the best customer.

### Step 2 — ICP (Ideal Customer Profile)
For **B2B** — firmographic profile of the ideal customer company:
- **Industry / vertical** — in which industries the best customers operate.
- **Company size** — number of employees, annual revenue.
- **Geography** — countries, regions, locality types.
- **Maturity** — startup / growing / mature / enterprise.
- **Technology stack** — what technologies they use (for tech products).
- **Budget** — budget size for the solution category.
- **Company pain points** — organizational problems the product solves.

For **B2C** — demographic profile of the ideal buyer:
- **Age, gender, geography** — basic demographics.
- **Income** — income level and purchasing power.
- **Education and profession** — socioeconomic status.
- **Family status** — if it influences the purchase.
- **Interests and values** — psychographics.

### Step 3 — Buyer Personas (1-3 personas)
For each persona, a detailed profile:
- **Name and role** — archetypal name and job title / role.
- **Demographics** — age, gender, geography, income, education.
- **Professional context** — job title, experience, reporting line, KPIs.
- **Goals and motivations** — what they want to achieve.
- **Pain points and frustrations** — what gets in their way.
- **Behavior** — how they search for solutions, where they get information.
- **Technology literacy** — digital maturity level.
- **Quote** — a phrase that captures the essence of the persona.

### Step 4 — Decision-Making Process
For each persona:
- **Role in purchasing** — initiator / influencer / decision-maker / user / gatekeeper.
- **Selection criteria** — parameters by which they compare solutions.
- **Objections** — typical doubts and barriers.
- **Decision cycle** — duration and stages.
- **Environmental influence** — who else influences the decision.

### Step 5 — Channels and Touchpoints
For each persona:
- Where they search for solution information (search, social media, conferences, peer review).
- What content formats they consume (articles, videos, podcasts, webinars).
- Through which channel they are best reachable.

### Step 6 — Messaging per Persona
For each persona:
- **Key message** — one sentence conveying the value.
- **Arguments** — 3-5 supporting points.
- **Tone** — formal / friendly / expert.
- **Trigger words** — what attracts.
- **Stop words** — what repels.

### Step 7 — Prioritization
Rank personas by:
- Segment size and accessibility.
- Revenue potential (LTV).
- Acquisition cost (CAC).
- Strategic importance.
- Determine the priority persona with justification.

## Validation (Quality Gate)

- [ ] ICP formulated with clear firmographic / demographic criteria
- [ ] 1-3 buyer personas defined with complete profiles
- [ ] Personas differ from each other (no duplication)
- [ ] Decision-making process described for each persona
- [ ] Channels and touchpoints identified for each persona
- [ ] Messaging tied to specific personas
- [ ] Prioritization conducted with justification
- [ ] Claims supported by data sources
- [ ] No internal contradictions between ICP and personas

> If validation fails — refine until it passes, do not hand off incomplete work.

## Handoff
The `$icp-buyer-persona` result is input for:
- **Strategist / Mediator** — target audience for strategic decisions.
- `$customer-journey-mapping` — personas for building the customer journey map.
- `$jtbd-analysis` — personas as context for job analysis.
- `$competitive-analysis` — target segments for competitive benchmarking.
- `$tam-sam-som` — SAM filters based on ICP.
- `$rfm-analysis` — Champions profile for comparison with ICP.

On handoff — use `$handoff` with ICP map, personas, and prioritization.

## Anti-patterns

| Mistake | Why It's Bad | How to Do It Right |
|---------|-------------|-------------------|
| ICP = everyone | No focus, scattered resources | Clear inclusion/exclusion criteria |
| Persona without data | Fantasy, not research | Every claim backed by a source |
| Demographics only | People of the same age behave differently | Add behavior, motivation, decision process |
| 5+ personas | Impossible to personalize for all | Maximum 3, prioritize |
| ICP for B2C | B2C has no firmographics, different structure needed | Use demographics + psychographics for B2C |
| Without messaging | Personas exist but unclear how to talk to them | For each persona — key message and tone |
| Static profile | Markets and customers change | Recommend review every 6 months |

## Output Template

```
### ICP / Buyer Persona — [Product / Service]

**Business Model:** [B2B / B2C / B2B2C]
**Geography:** [markets]
**Pricing Model:** [model]
**Analysis Date:** [date]

---

#### ICP (Ideal Customer Profile)

##### B2B — Firmographic Profile

| Criterion | Ideal | Acceptable | Exclusion |
|-----------|-------|------------|-----------|
| Industry | [industries] | [industries] | [industries] |
| Size (employees) | [range] | [range] | [range] |
| Revenue | [range] | [range] | [range] |
| Geography | [regions] | [regions] | [regions] |
| Maturity | [stage] | [stage] | [stage] |
| Category budget | [range] | [range] | — |

##### B2C — Demographic Profile

| Criterion | Ideal | Acceptable |
|-----------|-------|------------|
| Age | [range] | [range] |
| Income | [range] | [range] |
| Geography | [regions] | [regions] |

---

#### Buyer Persona 1: [Name] — [Role] (priority)

| Parameter | Description |
|-----------|-------------|
| **Demographics** | [age, gender, geo, income] |
| **Job Title** | [title, company, experience] |
| **KPIs** | [work success metrics] |
| **Goals** | [what they want to achieve] |
| **Pain Points** | [what gets in their way] |
| **Quote** | "[phrase capturing the essence]" |

**Decision-Making Process:**
- Role in purchasing: [role]
- Selection criteria: [criteria]
- Objections: [typical doubts]
- Decision cycle: [duration]

**Channels:** [where they search for information]
**Formats:** [what they consume]

**Messaging:**
- Key message: [one sentence]
- Arguments: [3-5 points]
- Tone: [communication style]
- Triggers: [words] | Stop words: [words]

---

#### Buyer Persona 2: [Name] — [Role]
[Same structure]

---

#### Prioritization Matrix

| Persona | Segment Size | LTV | CAC | Strategic Importance | Priority |
|---------|-------------|-----|-----|---------------------|----------|
| [Persona 1] | [estimate] | [estimate] | [estimate] | [estimate] | 1 |
| [Persona 2] | [estimate] | [estimate] | [estimate] | [estimate] | 2 |

**Priority Persona:** [Persona X] — [justification]

---

#### Recommendations for Next Stages
- **→ Strategist:** [key conclusion for strategy]
- **→ $customer-journey-mapping:** [persona for journey map]
- **→ $competitive-analysis:** [target segments for benchmarking]
```
