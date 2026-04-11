---
name: icp-buyer-persona
description: Ideal customer profile and buyer personas — firmographics, demographics, decision-making process
---
# ICP / Buyer Persona — Ideal customer profile and buyer personas

## When to Use
- When launching a new product or entering a new market — to define the target customer.
- When setting up marketing and sales — for targeting and communication personalization.
- When conversion is low — to rethink who the efforts are directed at.
- When scaling — to refine the ICP for new segments and geographies.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Product / service | ✅ | What we offer |
| Business model | ✅ | B2B / B2C / B2B2C / DTC |
| Target geography | ✅ | Markets and regions |
| Pricing model | ⬚ | Subscription / transaction / license |
| Current customers | ⬚ | Description or data of the best current customers |
| CRM data | ⬚ | Deals, average check, sales cycle, reasons for loss |
| Competitors | ⬚ | Who the customers consider as alternatives |
| Hypotheses | ⬚ | Preliminary assumptions regarding the target audience |

> If mandatory fields are not provided — **request them from the user** before starting the analysis. Do not make assumptions.

## Data Sources
1. **Web Search** — industry reports on demographics / firmographics of the target market.
2. **CRM data** — profile of the best customers (if provided).
3. **Competitive analysis** — who competitors are targeting (landing pages, case studies).
4. **Social platforms** — LinkedIn (for B2B), social networks, specialized communities.
5. **Reviews and feedback** — who leaves reviews, what characteristics they have.

> For every persona statement — specify the data source. Mark data older than 12 months with ⚠️.

### Link with Other Skills
| Skill | What we extract | When to call |
|------|-----------|----------------|
| `competitive-analysis` | Who competitors are targeting, whitespace segments (step 2) | If there is no data on competitive targeting |
| `rfm-analysis` | Champions profile as the ICP benchmark (step 2) | If there is CRM data and a data-driven ICP is needed |
| `cohort-analysis` | Cohorts with the best retention — characteristics for ICP (step 2) | If there is cohort data |
| `jtbd-analysis` | Jobs-to-be-done to enrich persona goals and pain points (step 3) | For a deep understanding of motivation |
| `web-research` | Industry data on demographics, firmographics, salaries | If there is no primary data |
| `customer-journey-mapping` | Persona validation through the real customer path | After persona creation — for verification |

## Protocol

### Step 0 — Context Gathering
1. Verify the presence of mandatory data.
2. Determine the focus:

   | Model | ICP | Personas | Structure |
   |--------|:---:|:--------:|-----------|
   | B2B | Firmographics | 1-3 by buying role | ICP (company) → Personas (people in the company) |
   | B2C | Demographics + psychographics | 1-3 by segments | Personas = ICP (they overlap) |
   | B2B2C | Both layers | 1-2 B2B + 1-2 B2C | ICP (business partner) + Persona (end user) |

3. Determine data availability: data-driven (CRM, cohorts) or hypothesis-driven (interviews, benchmarks).

### Step 1 — Business Context
1. Description of the product and key value proposition.
2. Definition of the business model and unit of sale.
3. Average check and sales cycle.
4. Current customer base: who is already buying, who is the best customer.
5. If there is CRM data — call `$rfm-analysis` to define the Champions profile.

### Step 2 — ICP (Ideal Customer Profile)

**For B2B** — firmographic profile of the ideal client company:

| Criterion | Ideal | Acceptable | Exception | Source |
|----------|-----------|------------|------------|----------|
| Industry / vertical | [industries] | [industries] | [industries] | [Source] |
| Size (employees) | [range] | [range] | [range] | [Source] |
| ARR / Revenue | [range] | [range] | [range] | [Source] |
| Geography | [regions] | [regions] | [regions] | [Source] |
| Maturity | [stage] | [stage] | [stage] | [Source] |
| Tech stack | [technologies] | [technologies] | [technologies] | [Source] |
| Category budget | [range] | [range] | — | [Source] |
| Company pain points | [problems] | — | — | [Source] |

**For B2C** — demographic + psychographic profile:

| Criterion | Ideal | Acceptable | Exception | Source |
|----------|-----------|------------|------------|----------|
| Age | [range] | [range] | [range] | [Source] |
| Income | [range] | [range] | [range] | [Source] |
| Geography | [regions] | [regions] | [regions] | [Source] |
| Education / profession | [description] | [description] | — | [Source] |
| Interests and values | [description] | — | — | [Source] |

### Step 3 — Buyer Personas (1-3 personas)
For each persona — a detailed profile:

| Attribute | Description |
|---------|----------|
| **Name and role** | Archetypal name + title / role |
| **Demographics** | Age, gender, geo, income, education |
| **Professional context** | Title, experience, reporting structure, KPI |
| **Goals and motivations** | What they want to achieve (professionally and personally) |
| **Pains and frustrations** | What hinders them, what they complain about |
| **Behavior** | How they seek solutions, where they consume information |
| **Tech literacy** | Low / Medium / High |
| **Quote** | A phrase reflecting the persona's essence |

> Every attribute — with an indicated source: CRM, interview, benchmark, hypothesis.

### Step 4 — Negative Persona (Anti-persona)
Identify 1-2 customer profiles that **should not** be attracted:

| Attribute | Description |
|---------|----------|
| **Name and role** | Archetypal name |
| **Why not our client** | Reason for exclusion |
| **Typical signs** | How to recognize them early |
| **Cost of a mistake** | What happens if we acquire them (high churn, low LTV, support load) |

> Negative personas help sales and marketing **avoid wasting resources** on obviously unsuitable clients.

### Step 5 — Decision-Making Process
For each persona:
- **Buying role** — initiator / influencer / decision maker / user / gatekeeper.
- **Selection criteria** — by which parameters they compare solutions.
- **Objections** — typical doubts and barriers.
- **Decision cycle** — duration and stages.
- **Environment influence** — who else affects the decision.

### Step 6 — Channels and Touchpoints
For each persona:

| Channel | Uses | Content format | Effectiveness |
|-------|:----------:|-----------------|:-------------:|
| Google Search | Yes / No | [Articles, reviews] | High / Medium / Low |
| LinkedIn | Yes / No | [Posts, webinars] | ... |
| Conferences | Yes / No | [Speeches, networking] | ... |
| Peer review (colleagues) | Yes / No | [Recommendations] | ... |
| [Others] | ... | ... | ... |

### Step 7 — Messaging per Persona
For each persona:
- **Key message** — one sentence conveying value.
- **Arguments** — 3-5 supporting points.
- **Tone** — formal / friendly / expert.
- **Trigger words** — what attracts them.
- **Stop words** — what repels them.

### Step 8 — Prioritization
Rank personas according to a scoring model:

| Criterion | Weight | Scale | Description |
|----------|:---:|:-----:|----------|
| Segment size | 0.20 | 1-10 | How many potential customers |
| LTV (potential) | 0.25 | 1-10 | Expected revenue per customer |
| CAC (inverted) | 0.20 | 1-10 | 10 = cheap to acquire, 1 = expensive |
| Product-market fit | 0.20 | 1-10 | How well the product solves the persona's pains |
| Strategic importance | 0.15 | 1-10 | Brand effect, new market entry, referrals |

`Priority Score = Σ(weight × score)`. **Priority persona: Score ≥ 7.0.**

### Step 9 — Persona Validation
Check internal consistency:

| Check | Test | Result |
|----------|------|:---------:|
| ICP ↔ Personas | Personas work in companies fitting the ICP | Yes / No |
| Personas ↔ Negative | Personas do not overlap with anti-personas | Yes / No |
| Pains ↔ Product | The product actually solves stated pains | Yes / No |
| Channels ↔ Messaging | The message tone fits the channel | Yes / No |
| Data-backed | ≥ 70% of attributes are backed by data (not hypotheses) | Yes / ⚠️ |

> If Data-backed < 70% — mark the persona as **hypothesis-driven**, recommend validation via interviews / A/B testing.

## Example — B2B SaaS: Recruitment Automation Platform

**Context:** HR-tech platform, B2B SaaS, per-seat subscription, average check $500/mo, Russian market.

### ICP (Firmographics)

| Criterion | Ideal | Acceptable | Exception | Source |
|----------|-----------|------------|------------|----------|
| Industry | IT, fintech, retail | Manufacturing, logistics | Public sector (long tenders) | CRM: 80% customers |
| Size | 50-500 employees | 20-50 or 500-2000 | < 20 (no HR) | CRM: sweet spot |
| Revenue | $5M-$50M | $1M-$5M | < $1M | Benchmark HH.ru |
| Geography | Moscow, St. Petersburg | Millionaire cities (Russia) | CIS (for now) | CRM: 70% Moscow/SPB |
| Open vacancies | 10+ simultaneously | 5-10 | < 5 (doesn't pay off) | CRM: correlation with LTV |

### Buyer Persona 1: "Marina" — HR Director (Priority)

| Attribute | Description | Source |
|---------|----------|----------|
| **Demographics** | F, 32-42, Moscow/SPB, income 250-400K ₽/mo | LinkedIn, HH.ru |
| **Title** | HR Director / Head of People, reports to CEO | CRM: 65% deals |
| **KPI** | Time-to-hire < 30 days, cost-per-hire < $2K | Interviews (N=8) |
| **Goals** | Close 15+ vacancies in parallel without team burnout | Interviews |
| **Pains** | Manual work in Excel, losing candidates, CEO pressures for speed | Support tickets |
| **Behavior** | Seeks solutions on Google + HR communities in Telegram | Survey (N=120) |
| **Tech literacy** | Medium — confident SaaS user | CRM |
| **Quote** | "I need to close vacancies, not fill out spreadsheets" | Interviews |

**Decision process:** Decision Maker (budget up to $1K/mo), influencer for $1K+. Cycle: 14-30 days. Objections: "What if it doesn't integrate with HH.ru?", "The team won't use it". Criteria: integration with HH.ru, simplicity, price.

**Channels:** Google (ATS reviews), HR Telegram (Recruiters chat), conferences (HR API, People Management).

**Messaging:** "Close vacancies 2x faster — without Excel or manual routine". Tone: expert, hype-free. Triggers: "automation", "integration with HH.ru", "time saving". Stop words: "AI will replace recruiters", "revolution".

### Negative Persona: "Oleg" — Micro-business CEO

| Attribute | Description |
|---------|----------|
| **Profile** | CEO of a company < 15 people, hires on his own 1-2 times a year |
| **Why not ours** | No HR dept, vacancies are too rare, subscription won't pay off |
| **Signs** | Registers with personal email, 1 vacancy, asks about a free tier |
| **Cost of mistake** | LTV < CAC ($45 vs $120), 80% churn in M1, support load |

### Prioritization

| Persona | Size (0.20) | LTV (0.25) | Rev. CAC (0.20) | PMF (0.20) | Strateg. (0.15) | **Score** |
|---------|:------------:|:----------:|:---------------:|:----------:|:---------------:|:---------:|
| Marina (HR Dir.) | 7 | 8 | 7 | 9 | 6 | **7.6** |
| Anton (CEO 50-200) | 5 | 9 | 4 | 6 | 8 | **6.4** |

**Priority:** Marina (7.6) — maximum PMF, accessible via HR channels, solves a direct pain point.

## Validation (Quality Gate)

- [ ] ICP is formulated with clear criteria (ideal / acceptable / exception) and sources
- [ ] 1-3 buyer personas are defined with complete profiles
- [ ] Personas are distinct from each other (no duplication)
- [ ] At least 1 negative persona defined with identifiers and mistake cost
- [ ] Decision-making process described for each persona
- [ ] Channels and touchpoints defined with effectiveness evaluation
- [ ] Messaging tied to specific personas (message, tone, triggers, stop words)
- [ ] Prioritization conducted via a weighted scoring model
- [ ] Consistency validation passed (ICP ↔ Personas ↔ Negative ↔ Product)
- [ ] ≥ 70% of attributes are backed by data; if < 70% — persona is marked hypothesis-driven
- [ ] Data sources are specified; data older than 12 months is marked ⚠️

> If validation fails — iterate until it passes, do not hand off before that.

## Handoff
The result of `$icp-buyer-persona` serves as input for:
- **Strategist / Mediator** — target audience for strategic decisions.
- **`customer-journey-mapping`** — personas for journey mapping.
- **`jtbd-analysis`** — personas as context for task analysis.
- **`competitive-analysis`** — target segments for competitive benchmarking.
- **`tam-sam-som`** — SAM/SOM filters based on ICP.
- **`rfm-analysis`** — Champions profile to compare against the ICP.

Delivery format: ICP table + buyer personas + negative persona + prioritization + messaging. Use `$handoff` during transfer.

## Anti-patterns

| Mistake | Why it's bad | Correct approach |
|--------|-------------|---------------|
| ICP = everyone | No focus, dilutes resources | Clear inclusion / exclusion criteria |
| Persona without data | Fantasy, not research | Every attribute has a source; < 70% data = hypothesis-driven |
| Demographics only | People of the same age act differently | Incorporate behavior, motivation, decision process |
| 5+ personas | Impossible to personalize for everyone | Maximum 3, prioritize via scoring |
| ICP for B2C | B2C lacks firmographics, requires a different structure | Demographics + psychographics for B2C |
| No messaging | Personas exist, but how to talk to them is unclear | Key message + tone + triggers + stop words |
| No negative persona | Marketing spends budget on wrong fits | At least 1 anti-persona with identifiers and mistake cost |
| Static profile | The market and customers change | Review every 6 months |
| "Eyeballed" prioritization | Subjective choice, not reproducible | Scoring model with weights and a ≥ 7.0 threshold |

## Output Template

```
### ICP / Buyer Persona — [Product / Service]

**Business Model:** [B2B / B2C / B2B2C]
**Geography:** [markets]
**Pricing Model:** [model]
**Data Type:** Data-driven / Hypothesis-driven
**Date of Analysis:** [date]

---

#### ICP (Ideal Customer Profile)

##### B2B — Firmographic Profile

| Criterion | Ideal | Acceptable | Exception | Source |
|----------|-----------|------------|------------|----------|
| Industry | [industries] | [industries] | [industries] | [Source] |
| Size (employees) | [range] | [range] | [range] | [Source] |
| Revenue | [range] | [range] | [range] | [Source] |
| Geography | [regions] | [regions] | [regions] | [Source] |
| Maturity | [stage] | [stage] | [stage] | [Source] |
| Category budget | [range] | [range] | — | [Source] |

##### B2C — Demographic + Psychographic Profile

| Criterion | Ideal | Acceptable | Exception | Source |
|----------|-----------|------------|------------|----------|
| Age | [range] | [range] | [range] | [Source] |
| Income | [range] | [range] | [range] | [Source] |
| Geography | [regions] | [regions] | [regions] | [Source] |

---

#### Buyer Persona 1: [Name] — [Role] (Priority)

| Attribute | Description | Source |
|---------|----------|----------|
| **Demographics** | [age, gender, geo, income] | [Source] |
| **Title** | [title, company, experience] | [Source] |
| **KPI** | [success metrics at work] | [Source] |
| **Goals** | [what they want to achieve] | [Source] |
| **Pains** | [what hinders them] | [Source] |
| **Behavior** | [how they seek solutions] | [Source] |
| **Tech literacy**| [level] | [Source] |
| **Quote** | «[phrase]» | [Source] |

**Decision-Making Process:**
- Buying role: [role]
- Selection criteria: [criteria]
- Objections: [typical doubts]
- Decision cycle: [duration]
- Influence: [who else is involved]

**Channels:**

| Channel | Format | Effectiveness |
|-------|--------|:-------------:|
| [Channel] | [Content format] | High / Medium / Low |

**Messaging:**
- Key message: "[one sentence]"
- Arguments: [3-5 points]
- Tone: [style]
- Triggers: [words] | Stop words: [words]

---

#### Buyer Persona 2: [Name] — [Role]
[Similar structure]

---

#### Negative Persona: [Name] — [Role]

| Attribute | Description |
|---------|----------|
| **Profile** | [Who it is] |
| **Why not our client** | [Reason for exclusion] |
| **Signs** | [How to recognize early] |
| **Mistake cost** | [What is lost: LTV < CAC, churn, support load] |

---

#### Prioritization (Scoring)

| Persona | Size (0.20) | LTV (0.25) | CAC inv. (0.20) | PMF (0.20) | Strateg. (0.15) | **Score** | **Priority** |
|---------|:------------:|:----------:|:---------------:|:----------:|:---------------:|:---------:|:------------:|
| [Persona 1] | X | X | X | X | X | **X.X** | 1 |
| [Persona 2] | X | X | X | X | X | **X.X** | 2 |

**Priority Persona:** [Name] (Score X.X) — [justification]

---

#### Consistency Validation

| Check | Result |
|----------|:---------:|
| ICP ↔ Personas | Yes / No |
| Personas ↔ Negative | Yes / No |
| Pains ↔ Product | Yes / No |
| Channels ↔ Messaging | Yes / No |
| Data-backed ≥ 70% | Yes / ⚠️ |

---

#### Sources & Assumptions

| # | Fact / assumption | Source | Date | Reliability |
|---|-------------------|----------|------|:-------------:|
| 1 | [Fact] | [Source] | [Date] | ✅ / ⚠️ / 🔮 |

Legend: ✅ Verified (CRM / interviews N≥5) | ⚠️ Estimated (benchmark / 1 source) | 🔮 Assumed (hypothesis)

---

#### Recommendations
- **→ Strategist:** [key takeaway]
- **→ $customer-journey-mapping:** [persona for mapping]
- **→ $competitive-analysis:** [target segments for benchmarking]
- **Review:** in 6 months or upon product/market changes
```
