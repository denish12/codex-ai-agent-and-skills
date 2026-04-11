---
name: value-chain-analysis
description: Analysis of primary and support activities — costs, added value, competitive advantages
---
# Value Chain Analysis — Primary and Support Activities

## When to Use
- When searching for **competitive advantages** — where the company creates the most value.
- When optimizing **cost structure** — identifying inefficient links in the chain.
- When making **make-or-buy decisions** — outsourcing, vertical integration, partnerships.
- When **benchmarking** — comparing the value chain with competitors to identify gaps.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Organization / BU | ✅ | Company or division for analysis |
| Industry | ✅ | Industry context for benchmarking |
| Product / service | ⬚ | Specific product for focused analysis |
| Competitors for comparison | ⬚ | 1-3 competitors for benchmarking |
| Financial data | ⬚ | Costs by activity type (if available) |
| Strategic goal | ⬚ | Cost optimization, differentiation, or both |

## Data Sources
1. Management accounting — costs by activity type (ABC costing).
2. Operational metrics — productivity, cycle time, quality by link.
3. Customer data — satisfaction, NPS, complaints by touchpoint.
4. Competitive analysis — benchmarks for key activities.
5. Industry standards — best practices, average indicators.

## Protocol

### Step 0 — Context Preparation
1. Define the analysis subject and boundaries (entire company or a specific BU / product).
2. Establish the strategic goal: cost leadership, differentiation, or both.
3. Determine the level of detail: aggregated (9 activities) or detailed (sub-activities).
4. Collect available financial and operational data.

### Step 1 — Primary Activities: Inbound Logistics
1. Identify key processes: receiving, storage, inventory management, transportation from suppliers.
2. Estimate inbound logistics costs (% of total costs).
3. Determine added value: supply reliability, input material quality.
4. Identify bottlenecks and inefficiencies.
5. Compare with competitors (if data is available).

### Step 2 — Primary Activities: Operations
1. Identify key processes: production, assembly, testing, packaging.
2. Estimate operations costs (% of total costs).
3. Determine added value: quality, speed, production flexibility.
4. Assess the technological level and degree of automation.
5. Identify sources of competitive advantage or lagging.

### Step 3 — Primary Activities: Outbound Logistics
1. Identify key processes: finished goods storage, delivery, distribution.
2. Estimate outbound logistics costs (% of total costs).
3. Determine added value: delivery speed, coverage, reliability.
4. Analyze distribution channels and their efficiency.
5. Assess customer satisfaction with delivery.

### Step 4 — Primary Activities: Marketing & Sales
1. Identify key processes: advertising, promotion, sales, pricing, channels.
2. Estimate marketing and sales costs (% of total costs).
3. Determine added value: brand awareness, conversion, customer relationships.
4. Evaluate acquisition channel efficiency (CAC, ROAS, conversion).
5. Analyze pricing positioning and strategy.

### Step 5 — Primary Activities: Service
1. Identify key processes: support, warranty, training, maintenance.
2. Estimate service costs (% of total costs).
3. Determine added value: satisfaction, retention, LTV.
4. Assess service quality: SLA, response time, CSAT, NPS.
5. Analyze opportunities for service monetization.

### Step 6 — Support Activities: Firm Infrastructure
1. Analyze: management, planning, finance, legal, quality.
2. Estimate infrastructure costs (% of total costs).
3. Determine the contribution to primary activity efficiency.
4. Assess the quality of management decisions and planning.

### Step 7 — Support Activities: Human Resource Management
1. Analyze: hiring, training, development, motivation, retention.
2. Estimate HR costs (% of total costs).
3. Determine the contribution to primary activity quality and productivity.
4. Assess competency levels and personnel risks.

### Step 8 — Support Activities: Technology Development
1. Analyze: R&D, IT, automation, innovation.
2. Estimate technology development costs (% of total costs, % of revenue).
3. Determine the contribution to differentiation and efficiency.
4. Assess the technology gap with competitors.

### Step 9 — Support Activities: Procurement
1. Analyze: purchasing, supplier management, contracts.
2. Estimate procurement costs (% of total costs).
3. Determine the contribution: input resource quality, terms, reliability.
4. Assess negotiating position and procurement strategy.

### Step 10 — Cost and Value Analysis by Link
1. Build a cost distribution diagram across all 9 activity types.
2. For each activity, determine: costs vs added value.
3. Identify activities with the largest GAP (high costs, low value).
4. Identify activities with the greatest competitive advantage.

### Step 11 — Synthesis and Conclusions
1. Identify the TOP-3 sources of competitive advantage.
2. Identify the TOP-3 optimization zones.
3. Formulate recommendations: optimization, outsourcing, investment, integration.
4. Prepare an action plan with priorities and expected impact.

## Validation (Quality Gate)

- [ ] All 5 primary activities are analyzed
- [ ] All 4 support activities are analyzed
- [ ] For each activity, costs (% or absolute) and added value are indicated
- [ ] Bottlenecks and inefficiencies are identified
- [ ] Competitive advantages are identified with justification
- [ ] Recommendations are specific: optimization / outsourcing / investment / integration
- [ ] Benchmarking against competitors is conducted (at minimum, expert assessment)
- [ ] Summary cost/value table is completed for all 9 activities

## Handoff
Result -> Strategist / Mediator for formulating operational strategy, optimization program, or competitive strategy.

## Anti-patterns

| Mistake | Why It's Bad | How to Do It Right |
|---------|-------------|-------------------|
| Analyzing only primary activities | Support activities often define competitive advantage | All 9 activities: 5 primary + 4 support |
| Costs without value | Unclear whether costs are justified | Always pair: costs + added value |
| Ignoring linkages between activities | Optimizing one link may degrade another | Analyze interdependencies (logistics <-> operations) |
| Generic formulations without data | "Good marketing" yields no insights | Specifics: CAC = $X, conversion = Y%, ROAS = Z |
| Analysis without strategic context | Cost optimization vs differentiation — different focuses | Tie to strategy: what to optimize, what to strengthen |
| No benchmarking | Unclear whether indicators are good or bad | Compare with competitors and industry standards |

## Output Template

```
## Value Chain Analysis: [Organization / BU]
**Industry:** [industry]  |  **Strategy:** [cost leadership / differentiation]  |  **Date:** [date]

### Value Chain — Summary Table

#### Support Activities

| Activity | Cost (%) | Added Value | Rating (1-5) | Competitive Position |
|----------|:--------:|------------|:------------:|---------------------|
| Firm Infrastructure | [X%] | [Description] | [X] | [Advantage / Parity / Lagging] |
| Human Resource Management | [X%] | [Description] | [X] | ... |
| Technology Development | [X%] | [Description] | [X] | ... |
| Procurement | [X%] | [Description] | [X] | ... |

#### Primary Activities

| Activity | Cost (%) | Added Value | Rating (1-5) | Competitive Position |
|----------|:--------:|------------|:------------:|---------------------|
| Inbound Logistics | [X%] | [Description] | [X] | [Advantage / Parity / Lagging] |
| Operations | [X%] | [Description] | [X] | ... |
| Outbound Logistics | [X%] | [Description] | [X] | ... |
| Marketing & Sales | [X%] | [Description] | [X] | ... |
| Service | [X%] | [Description] | [X] | ... |

**Margin:** [X%]

### Cost vs Value Map

| Activity | Cost | Value | Efficiency | Action |
|----------|:----:|:-----:|:----------:|--------|
| [Activity 1] | High | High | Efficient | Maintain |
| [Activity 2] | High | Low | Inefficient | Optimize |
| [Activity 3] | Low | High | Super-efficient | Invest |
| [Activity 4] | Low | Low | Neutral | Outsource? |

### Competitive Advantages (TOP-3)

| # | Activity | Advantage | Sustainability | Justification |
|---|----------|-----------|:--------------:|---------------|
| 1 | [Activity] | [Description] | [High/Medium/Low] | [Data] |
| 2 | [Activity] | [Description] | ... | ... |
| 3 | [Activity] | [Description] | ... | ... |

### Optimization Zones (TOP-3)

| # | Activity | Issue | Recommendation | Expected Impact |
|---|----------|-------|---------------|-----------------|
| 1 | [Activity] | [GAP] | [Action] | [Savings / Value growth] |
| 2 | [Activity] | [GAP] | [Action] | ... |
| 3 | [Activity] | [GAP] | [Action] | ... |

### Strategic Recommendations
[1-2 paragraphs: overall value chain assessment, key advantages, growth areas, action plan]
```
