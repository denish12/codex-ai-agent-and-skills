---
name: value-chain-analysis
description: Analysis of primary and support activities — costs, value added, competitive advantages
---
# Value Chain Analysis — Primary and Support Activities

## When to use
- When searching for **competitive advantages** — where the company creates the most value.
- When optimizing the **cost structure** — identifying inefficient links in the chain.
- When making **make-or-buy** decisions — outsourcing, vertical integration, partnerships.
- During **benchmarking** — comparing the value chain with competitors to identify gaps.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Organization / BU | ✅ | Company or business unit for analysis |
| Industry | ✅ | Industry context for benchmarking |
| Business type | ✅ | Traditional (manufacturing/retail) / Digital (SaaS/platform) |
| Product / service | ⬚ | Specific product for focused analysis |
| Competitors for comparison | ⬚ | 1-3 competitors for benchmarking |
| Financial data | ⬚ | Costs by activity (if available) |
| Strategic goal | ⬚ | Cost optimization / differentiation / both |

> If mandatory fields are not provided — **ask the user** before starting the analysis. Do not invent.

## Data Sources
1. Management accounting — costs by activity (ABC costing).
2. Operational metrics — productivity, cycle time, quality by links.
3. Customer data — satisfaction, NPS, complaints by touchpoints.
4. Competitive analysis — benchmarks for key activities.
5. Industry standards — best practices, average indicators.

> Every fact — with source and date. Data older than 12 months — mark with ⚠️.

### Connection with other skills
| Skill | What we take | When to call |
|------|-----------|----------------|
| `competitive-analysis` | Competitor benchmarks by activity (steps 1-9) | To compare competitive position per activity |
| `unit-economics` | Costs → margin structure, CAC from marketing (step 4) | To link the chain to unit economics |
| `porters-five-forces` | Supplier power → Procurement (step 9), buyer power → Service (step 5) | If external forces impact chain links |
| `swot-analysis` | Advantages → S, inefficiencies → W (step 11) | For integration into SWOT |
| `web-research` | Industry benchmarks for costs and efficiency | If comparison data is missing |
| `customer-journey-mapping` | Customer touchpoints → Marketing, Service (steps 4-5) | To link CX to chain links |

## Framework Adaptation by Business Type

| Activity (Porter) | Traditional Business | Digital / SaaS |
|---------------------------|---------------------|----------------|
| Inbound Logistics | Raw material receipt, warehousing | Data ingestion, API integrations, content procurement |
| Operations | Manufacturing, assembly | Development (R&D), DevOps, deploy |
| Outbound Logistics | Distribution, delivery | CDN, onboarding, provisioning |
| Marketing & Sales | Advertising, channels, pricing | Growth, PLG, sales, partnerships |
| Service | Warranty, repair, support | Customer Success, support, updates |
| Infrastructure | Management, finance, legal | Management, finance, compliance |
| HR | Hiring, training, motivation | Hiring, culture, remote |
| Technological Development | R&D, innovation | Platform engineering, AI/ML |
| Procurement | Purchasing, suppliers | Cloud vendors, API providers, SaaS tools |

> For Digital/SaaS — use adapted activity names from the right column.

## Protocol

### Step 0 — Prepare Context
1. Define the object of analysis and boundaries (whole company or specific BU / product).
2. Determine business type: traditional or digital/SaaS (select adaptation).
3. Record the strategic goal: cost leadership, differentiation, or both.
4. Define the level of detail: aggregate (9 activities) or detailed (sub-activities).
5. Gather available financial and operational data.

### Step 1 — Inbound Logistics
1. Identify key processes (adapt for business type).
2. Assess costs and value added:

   | Metric | Value | Benchmark | Source |
   |---------|:--------:|:--------:|----------|
   | Costs (% of total) | X% | X% | [Source] |
   | Value added | [Description] | — | [Source] |
   | Key efficiency metric | [KPI: cycle time, reliability] | [Benchmark] | [Source] |

3. Scoring:
   - **Costs (1-5):** 1 = minimal, 5 = excessive.
   - **Value (1-5):** 1 = minimal, 5 = critical for the customer.
   - **Efficiency Score = Value / Costs** (>1.0 = efficient, <1.0 = inefficient).
4. Competitive position: Advantage / Parity / Disadvantage.

### Step 2 — Operations
Similar structure: processes → costs/value → scoring → competitive position.

Key metrics: quality (defect rate), speed (cycle time), agility (time-to-market).

### Step 3 — Outbound Logistics
Key metrics: delivery speed, coverage, reliability, cost per unit.

### Step 4 — Marketing & Sales
Key metrics: CAC, ROAS, conversion, sales cycle length, brand awareness.

> Link to `$unit-economics`: CAC from this link → unit economics.

### Step 5 — Service
Key metrics: NPS, CSAT, SLA compliance, time-to-resolution, retention impact.

> Link to `$customer-journey-mapping`: touchpoints in retention/advocacy.

### Steps 6-9 — Support Activities

For each (Infrastructure, HR, Technological Development, Procurement) — similar structure:
1. Key processes (adapted for business type).
2. Costs (% of total) + value added.
3. Scoring: Costs (1-5), Value (1-5), Efficiency Score.
4. Competitive position.

**For each support activity — define its contribution to primary ones:**

| Support | Impacts primary | How |
|----------------|---------------------|-----|
| Infrastructure | All | Quality of management, planning, compliance |
| HR | Operations, Service | Team quality → product and support quality |
| Technological Development | Operations, Marketing | Innovations → differentiation, automation → costs |
| Procurement | Inbound Logistics, Operations | Quality and cost of inputs |

### Step 10 — Linkage Analysis
1. Identify key dependencies between activities:

   | Linkage | Activity A → Activity B | Description | Optimization Effect |
   |-------|:-------------:|----------|-------------------|
   | [L1] | Procurement → Operations | Input quality → defect rate | Better suppliers → -X% defects |
   | [L2] | Operations → Service | Product quality → support load | Fewer bugs → -X% tickets |
   | [L3] | HR → Marketing | Sales skills → conversion | Training → +X% win rate |

2. Identify **trade-offs**: where optimizing one link degrades another.
3. Identify **synergies**: where investments in one link improve several.

### Step 11 — Consolidated Analysis and Scoring

Compile all activities into a single table:

| # | Activity | Costs (%) | Costs (1-5) | Value (1-5) | Efficiency | Comp. Position | Action |
|---|-----------------|:-----------:|:-------------:|:--------------:|:----------:|:---------------:|----------|
| 1 | Inbound Logistics | X% | X | X | X.X | Adv./Parity/Disadv. | [Action] |

**Define zones using the Costs × Value matrix:**

| | Low Costs | High Costs |
|--|:--------------:|:---------------:|
| **High Value** | 🟢 Super-efficient → Invest | 🟡 Justified → Maintain |
| **Low Value** | ⚪ Neutral → Outsourcing? | 🔴 Inefficient → Optimize |

### Step 12 — Recommendations
1. TOP-3 sources of competitive advantage (🟢 + 🟡 with high value).
2. TOP-3 optimization zones (🔴 inefficient).
3. Make-or-buy decisions:

   | Activity | Decision | Justification | Expected Effect |
   |-----------------|---------|-------------|:----------------:|
   | [Activity] | Make / Buy / Partner | [Why] | [Savings / Value growth] |

4. Action plan with priorities, owners, deadlines, and KPIs.

## Example — B2B SaaS: HR Recruiting Automation Platform

**Context:** HR-tech SaaS, 200 clients, $2.4M ARR, 45 employees, RF. Strategy: differentiation via AI.

### Consolidated Table

**Primary Activities:**

| # | Activity (SaaS Adaptation) | Costs (%) | Costs (1-5) | Value (1-5) | Effic. | Comp. | Action |
|---|---------------------|:-----------:|:-----------:|:-----------:|:------:|:-------:|----------|
| 1 | Data ingestion / API | 5% | 2 | 3 | 1.5 | Parity | Maintain |
| 2 | Development (R&D) | 35% | 4 | 5 | 1.25 | **Advantage** | Invest (AI) |
| 3 | Onboarding / CDN | 8% | 3 | 4 | 1.33 | Advantage | Maintain (3-day deploy) |
| 4 | Growth / Sales | 25% | 4 | 3 | 0.75 | **Disadvantage** | 🔴 Optimize |
| 5 | Customer Success | 12% | 3 | 5 | 1.67 | Advantage | Invest (NPS 72) |

**Support Activities:**

| # | Activity | Costs (%) | Costs (1-5) | Value (1-5) | Effic. | Comp. | Action |
|---|-----|:-----------:|:-----------:|:-----------:|:------:|:-------:|----------|
| 6 | Management / compliance | 5% | 2 | 2 | 1.0 | Parity | Maintain |
| 7 | HR (hiring, culture) | 3% | 2 | 4 | 2.0 | 🟢 Super-effic | Invest |
| 8 | Platform engineering | 5% | 3 | 5 | 1.67 | Advantage | Invest |
| 9 | Cloud / API vendors | 2% | 1 | 2 | 2.0 | Parity | Maintain |

**Margin:** 85% gross (Revenue $200K/mo − COGS $30K).

### Linkages

| Linkage | A → B | Effect | Trade-off / Synergy |
|-------|:-----:|--------|:-------------------:|
| R&D → Customer Success | Fewer bugs → -30% tickets | Synergy ✅ |
| R&D → Growth/Sales | AI features → differentiation → +conversion | Synergy ✅ |
| HR → R&D | Hiring quality → development speed | Synergy ✅ |
| Growth/Sales → Customer Success | Aggressive sales → bad-fit clients → churn | Trade-off ⚠️ |

### Competitive Advantages (TOP-3)

| # | Activity | Advantage | Sustainability | Proof |
|---|-----|-------------|:------------:|----------------|
| 1 | R&D | AI personalization (only ones in RF market) | High (patent + team) | 3 ML engineers, patent pending |
| 2 | Customer Success | NPS 72 vs industry 45 | Medium (copyable via processes) | Q1 2026 survey, N=180 |
| 3 | Onboarding | 3-day deploy vs competitors' 2-4 weeks | Medium | CRM: last 20 deployments |

### Optimization Zones (TOP-3)

| # | Activity | Problem | Recommendation | Effect |
|---|-----|---------|-------------|:------:|
| 1 | Growth/Sales | Efficiency 0.75, CAC $1,450 (LinkedIn $2,500) | Reallocate budget: LinkedIn → Content/Referral | CAC → $1,100 (-24%) |
| 2 | Growth/Sales | Sales team 3 ppl., bottleneck | Hire 2 SDRs + partner program | Pipeline ×2 |
| 3 | Data ingestion | No 1C integration (30% drop-off) | Develop 1C integration | -30% drop-off |

### Make-or-Buy

| Activity | Decision | Justification | Effect |
|-----|---------|-------------|:------:|
| Cloud infrastructure | Buy (Yandex Cloud) | Not core competence, commodity | -15% vs on-premise |
| AI/ML models | Make (in-house) | Core differentiator, cannot offload | Moat |
| L1 Support | Partner (outsourced 50%) | Standard tickets, non-differentiating | -20% support costs |

## Validation (Quality Gate)

- [ ] All 5 primary activities analyzed (adapted for business type)
- [ ] All 4 support activities analyzed
- [ ] For each activity: costs (%), scoring (1-5 costs, 1-5 value), Efficiency Score
- [ ] Competitive position defined per activity (Advantage / Parity / Disadvantage)
- [ ] Linkages between activities analyzed: synergies and trade-offs
- [ ] Costs × Value matrix filled, zones defined (🟢/🟡/⚪/🔴)
- [ ] TOP-3 competitive advantages with sustainability and proofs
- [ ] TOP-3 optimization zones with recommendations and expected effect
- [ ] Make-or-buy decisions justified for key activities
- [ ] Benchmarking conducted (against competitors or industry standards)
- [ ] Data sources cited; data older than 12 mo marked ⚠️

> If validation fails — iterate until it passes, do not hand off further.

## Handoff
The output of `$value-chain-analysis` acts as input for:
- **Strategist / Mediator** — operational strategy, optimization program.
- **`swot-analysis`** — advantages → S, inefficiencies → W.
- **`competitive-analysis`** — benchmarking by activities.
- **`unit-economics`** — costs per activity → margin structure.
- **`porters-five-forces`** — procurement ↔ supplier power, service ↔ buyer power.

Output format: consolidated table + linkages + TOP-3 advantages + TOP-3 optimizations + make-or-buy. When handing off — use `$handoff`.

## Anti-patterns

| Mistake | Why it hurts | How to do it right |
|--------|-------------|---------------|
| Analyzing only primary | Support activities often determine competitive advantage (R&D, HR) | All 9 activities: 5 primary + 4 support |
| Costs without value | Unclear if costs are justified | Pair: Costs + Value → Efficiency Score |
| Ignoring linkages | Optimizing one link may degrade another | Linkages: synergies and trade-offs between activities |
| Vague phrasing | "Good marketing" gives no insights | Specifics: CAC = $X, conversion = Y%, NPS = Z |
| No strategic context | Cost optimization vs differentiation — different focuses | Tie to strategy: what to optimize, what to reinforce |
| No benchmarking | Unclear if metrics are good or bad | Compare with competitors and the industry |
| Core Porter for SaaS w/o adapting | "Inbound logistics" makes no sense for SaaS | Adapt: Data ingestion, R&D, Onboarding, Growth, CS |
| No Efficiency Score | Impossible to compare links objectively | Efficiency = Value / Costs; <1.0 = problem |
| No make-or-buy | Missed outsourcing and focusing opportunities | Make (core), Buy (commodity), Partner (standard) |

## Output Template

```
### Value Chain Analysis: [Organization / BU]
**Industry:** [industry]  |  **Type:** [Traditional / Digital / SaaS]
**Strategy:** [cost leadership / differentiation]  |  **Date:** [date]

---

#### Framework Adaptation

| Activity (Porter) | Adaptation for [business type] |
|--------------|------------------------------|
| Inbound Logistics | [Adapted name] |
| Operations | [Adapted name] |
| ... | ... |

---

#### Consolidated Table

**Primary Activities**

| # | Activity | Costs (%) | Costs (1-5) | Value (1-5) | Efficiency | Comp. Position | Action |
|---|-----|:-----------:|:-----------:|:-----------:|:----------:|:---------------:|----------|
| 1 | [Activity] | X% | X | X | X.X | Adv./Parity/Disadv. | [Action] |

**Support Activities**

| # | Activity | Costs (%) | Costs (1-5) | Value (1-5) | Efficiency | Comp. Position | Action |
|---|-----|:-----------:|:-----------:|:-----------:|:----------:|:---------------:|----------|
| 6 | [Activity] | X% | X | X | X.X | Adv./Parity/Disadv. | [Action] |

**Margin:** XX%

---

#### Costs × Value Matrix

| | Low Costs (1-2) | High Costs (3-5) |
|--|:--------------------:|:---------------------:|
| **High Value (4-5)** | 🟢 Invest: [activities] | 🟡 Maintain: [activities] |
| **Low Value (1-3)** | ⚪ Outsourcing?: [activities] | 🔴 Optimize: [activities] |

---

#### Linkages

| Linkage | A → B | Description | Type |
|-------|:-----:|----------|:---:|
| [L1] | [Activity A] → [Activity B] | [Effect] | Synergy / Trade-off |

---

#### Competitive Advantages (TOP-3)

| # | Activity | Advantage | Sustainability | Proof | Source |
|---|-----|-------------|:------------:|----------------|----------|
| 1 | [Activity] | [Description] | High/Medium/Low | [Metric/fact] | [Source] |

---

#### Optimization Zones (TOP-3)

| # | Activity | Problem (Efficiency < 1.0) | Recommendation | Expected Effect |
|---|-----|----------------------------|-------------|:----------------:|
| 1 | [Activity] | [GAP] | [Action] | [Savings / Growth] |

---

#### Make-or-Buy

| Activity | Decision | Justification | Effect |
|-----|:-------:|-------------|:------:|
| [Activity] | Make / Buy / Partner | [Why] | [Result] |

---

#### Strategic Recommendations
[1-2 paragraphs: overall assessment of the chain, key advantages, growth zones, action plan]

---

#### Sources and Assumptions

| # | Fact / Assumption | Source | Date | Confidence |
|---|-------------------|----------|------|:-------------:|
| 1 | [Fact] | [Source] | [Date] | ✅ / ⚠️ / 🔮 |

Legend: ✅ Verified (2+ sources) | ⚠️ Estimated (1 source) | 🔮 Assumed (expert estimate)
```
