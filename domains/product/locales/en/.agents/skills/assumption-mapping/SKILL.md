---
name: assumption-mapping
description: Assumption map across value / usability / feasibility / viability axes — hypothesis prioritization for testing
---
# Assumption Mapping

> **Category:** Discovery  ·  **Slug:** `assumption-mapping`

## When to Use

- Before launching discovery or experimentation — to know which hypotheses to validate.
- When reviewing new ideas from OST — which assumptions underpin this solution?
- In decision reviews — which assumptions were made and validated / not validated?
- As a risk instrument: high-uncertainty assumptions = focal risks.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Solution / initiative context | ✅ | What we plan to do |
| Team brainstorm log | ✅ | Raw assumptions list |
| Existing evidence | ⬚ | Support/refute for assumptions |

## Data Sources

1. Team brainstorm (minimum 5-10 participants ideal).
2. Existing customer data (interviews, analytics).
3. Market data (competitor behavior, industry reports).
4. Technical docs (internal architecture constraints).

### Related Skills

| Skill | What we take | When to call |
|-------|-------------|--------------|
| `opportunity-solution-tree` | Solutions → assumptions | For each solution branch |
| `hypothesis-template` | Assumption → testable hypothesis | For top-risky assumptions |
| `user-interview-script` | Questions targeting assumptions | Validation via interviews |
| `ab-test-design` | Experiment for high-risk assumption | For quantitative validation |

## Structure: four quadrants

1. **Value (Desirability)** — will customers want it?
2. **Usability** — can they figure out how to use it?
3. **Feasibility** — can we build it?
4. **Viability** — does it make business sense (cost, scale, regulation)?

Each assumption falls into one of the four.

## Protocol

### Step 0 — Brainstorm Raw Assumptions

Workshop format:
1. Present context (solution / initiative).
2. Each participant individually writes assumptions (Post-it or digital).
3. Target: 30-50 raw assumptions.
4. No filtering at this step.

Technique: "If [X] — then this works". Assumption = X.

### Step 1 — Categorize into 4 Quadrants

Distribute assumptions across Value / Usability / Feasibility / Viability.

If it doesn't fit — rephrase or discard.

### Step 2 — Risk Assessment per Assumption

Two dimensions:

**Uncertainty** — how unknown this is, true or not (1-5):
- 1 = proven (data/experience)
- 5 = complete unknown

**Impact if wrong** — how bad if the assumption is false (1-5):
- 1 = minor adjustment
- 5 = kill the project

Risk Score = Uncertainty × Impact. Top: Score ≥ 16.

| # | Quadrant | Assumption | Uncertainty (1-5) | Impact (1-5) | Score |
|---|----------|------------|:------------------:|:------------:|:-----:|
| A1 | Value | Customers pay $X/seat | 4 | 5 | 20 |

### Step 3 — 2×2 Matrix Visualization

```
Impact if wrong →
High │  [Test NOW]    │  [Validated? If not, test]
     │                │
     │  [Document]    │  [Low priority]
Low  │________________│________________
      Low    ←       Uncertainty      →    High
```

Top-right quadrant = immediate testing priority.

### Step 4 — Test Strategy per Top Assumption

For each top-risky assumption — choose a validation method:

| Method | Speed | Confidence | Cost |
|--------|:-----:|:----------:|:----:|
| User interviews | Fast | Low-medium | Low |
| Prototype test | Medium | Medium-high | Medium |
| Landing page test | Fast | Medium | Low |
| A/B test on production | Slow | High | Medium |
| Data analysis | Fast | Medium | Low |
| Tech spike | Medium | High (feasibility only) | Medium |

Match method to assumption type:
- Value → interviews, landing page, smoke test
- Usability → prototype test, usability test
- Feasibility → tech spike, architecture review
- Viability → data analysis, financial modeling

### Step 5 — Test Plan

For each top assumption — test card:
- Assumption text
- What we think will happen (prediction)
- How we'll measure it
- Success criteria (specific threshold)
- Time box

Via `$hypothesis-template`.

### Step 6 — Iteration

Assumption map — living document. After each validation:
- Mark as ✅ validated / ❌ invalidated / ⚠️ partial
- Update Risk Score (uncertainty goes down if data collected)
- Promote new assumptions from surprises

## Validation (Quality Gate)

- [ ] ≥ 20 raw assumptions in brainstorm
- [ ] All categorized in 4 quadrants
- [ ] Each assumption has Uncertainty × Impact scoring
- [ ] Top 3-5 high-risk assumptions identified
- [ ] For each top assumption — test method + plan
- [ ] Test cards via `$hypothesis-template`

## Handoff

The result is the input for:
- **`hypothesis-template`** — top assumptions → formal hypotheses
- **`ab-test-design`** — test method = A/B for high-certainty validation
- **`user-interview-script`** — questions targeting specific assumptions
- **PM**: top risks → PRD risk section

Format: assumption map (table + 2×2 visualization) + test plan. Via `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|-------------------|
| Skip categorization | 4 quadrants give balanced risk view | Mandatory V/U/F/Vi |
| Test low-risk first | Does not accelerate learning | Start with top-right (high U × high I) |
| Not iterating | Stale map = useless | Update after each validation |
| Over-testing feasibility | Engineers love tech spikes | Balance across quadrants |
| Vague assumptions | "Customers will like it" | Specific: "Customers will pay $X/mo" |

## Worked Example — TeamFlow Assumption Map (AI 1:1 Summarization)

**Context:** TeamFlow (B2B SaaS HR-tech). After Discovery + OST the team planned work on AI summarization. Before engineering begins — assumption map session (workshop 90 min, 8 participants: PM, Eng Lead, Designer, CTO, VP Sales, CPO-customer-advocate, Data Lead, Legal counsel).

### Raw Assumptions Brainstorm (30+ assumptions in 30 min)

Categorized into 4 quadrants with Risk Score (Uncertainty × Impact, 1-5 each).

#### Value (Desirability) — Will customers want this?

| # | Assumption | Uncertainty | Impact | Risk | Status |
|---|-----------|:-----------:|:------:|:----:|:------:|
| V1 | Customers will pay **$8-12/seat/month premium** for AI summarization feature | 4 | 5 | **20** | 🔴 Critical |
| V2 | End-user managers will **adopt** AI summarization at >60% active users within 90 days | 4 | 4 | **16** | 🔴 Critical |
| V3 | Buyers (VP HR) see **aggregate dashboard** as tier-upgrade justification | 3 | 5 | **15** | 🔴 Critical |
| V4 | Feature reduces manager churn signal ("tool helps me") by >10pp | 4 | 3 | 12 | 🟡 Major |
| V5 | Competitors (Lattice, 15Five) **have not yet shipped** AI summarization in the next 6 months | 3 | 4 | 12 | 🟡 Major |
| V6 | Customers prefer AI-in-TeamFlow vs standalone (Otter.ai etc.) — "privacy + integrated" | 2 | 4 | 8 | 🟢 Low |

#### Usability — Can managers figure out how to use it?

| # | Assumption | Uncertainty | Impact | Risk | Status |
|---|-----------|:-----------:|:------:|:----:|:------:|
| U1 | Managers will **trust AI summaries** enough to rely on them (not manually re-write) | 4 | 4 | **16** | 🔴 Critical |
| U2 | First-time user clearly understands how to **enable** AI summarization (opt-in UX) | 2 | 3 | 6 | 🟢 Low |
| U3 | Summaries written in **tone appropriate** for performance conversations (not too casual, not too corporate) | 3 | 3 | 9 | 🟡 Major |
| U4 | Managers will **correct errors** via inline edit (not abandon feature) | 3 | 3 | 9 | 🟡 Major |
| U5 | Mobile experience for on-the-go review / approve summaries acceptable | 3 | 2 | 6 | 🟢 Low |

#### Feasibility — Can we build it?

| # | Assumption | Uncertainty | Impact | Risk | Status |
|---|-----------|:-----------:|:------:|:----:|:------:|
| F1 | **LLM summarization quality** acceptable for HR conversations (no hallucinations, no misattributions) — >85% acceptable rate from managers | 4 | 5 | **20** | 🔴 Critical |
| F2 | Streaming **transcription latency** acceptable (<3 sec lag) for real-time in-meeting use | 3 | 4 | 12 | 🟡 Major |
| F3 | Engineering can ship MVP in 8-10 weeks with existing team (8 eng) | 3 | 3 | 9 | 🟡 Major |
| F4 | **Data residency** requirements (EU, HIPAA in healthcare customers) solvable via regional LLM endpoints (Azure, Bedrock) | 3 | 4 | 12 | 🟡 Major |
| F5 | **Cost per summary** economically viable at target price ($0.05-0.10 per 30-min meeting) | 3 | 4 | 12 | 🟡 Major |
| F6 | Integration with existing TeamFlow 1:1 data model without major refactor | 2 | 3 | 6 | 🟢 Low |

#### Viability — Does it make business sense?

| # | Assumption | Uncertainty | Impact | Risk | Status |
|---|-----------|:-----------:|:------:|:----:|:------:|
| Vi1 | **Privacy / compliance** (GDPR, SOC2, CCPA) manageable via architecture choices (opt-in, user-controlled, no training on data) | 3 | 5 | **15** | 🔴 Critical |
| Vi2 | **Legal risk** (wrongful termination suit referencing AI summary as evidence) not material — enterprise customers do not backlash | 3 | 4 | 12 | 🟡 Major |
| Vi3 | Pricing premium **does not cannibalize** core tier ARR (existing customers upgrade, not swap) | 3 | 4 | 12 | 🟡 Major |
| Vi4 | **GTM execution** ready (Sales trained, CS enabled, Marketing positioned) in target timeline | 3 | 3 | 9 | 🟡 Major |
| Vi5 | Infrastructure + LLM API costs **scale economically** at 5,000+ active users | 3 | 3 | 9 | 🟡 Major |
| Vi6 | Customer success in EU / regulated industries (healthcare, finance) **does not block** sales | 3 | 3 | 9 | 🟡 Major |

### 2×2 Prioritization Matrix

```
Impact if wrong →
High (5) │  V1 (20)  F1 (20)   │  [Validated: F6, U2]
         │  U1 (16)  V2 (16)   │
         │  V3 (15)  Vi1 (15)  │
         │                     │
         │  V4 (12)  F2 (12)   │
         │  F4 (12)  F5 (12)   │  
         │  Vi2 (12) Vi3 (12)  │
         │  V5 (12)            │  
         │                     │
         │  U3 (9)  U4 (9)     │  [Document]
Low (1)  │  F3 (9)  Vi4 (9)    │
         │  Vi5 (9) Vi6 (9)    │
         │                     │
         │  V6 (8)  U5 (6)     │  [Low priority]
         │  U2 (6)  F6 (6)     │
         ──────────────────────→
         Low (1)     Uncertainty     High (5)
```

### Top-Right Assumptions (test NOW) — Risk ≥ 15

1. **V1** (Pay $8-12 premium, Risk 20) — biggest money question
2. **F1** (LLM quality acceptable, Risk 20) — biggest technical question
3. **U1** (Managers trust summaries, Risk 16) — adoption question
4. **V2** (>60% adoption in 90 days, Risk 16) — usage scale
5. **V3** (Dashboard tier upgrade, Risk 15) — buyer expansion
6. **Vi1** (Privacy manageable, Risk 15) — existential risk

### Test Strategy per Top Assumption

| # | Assumption | Method | Duration | Cost | Confidence |
|---|-----------|--------|:--------:|:----:|:----------:|
| V1 | Pay $8-12 premium | Landing page test with pricing + "notify me" CTA + follow-up interview | 2 weeks | Low | Medium |
| V1 | (secondary) | Commitment test: 20 customers sign LOI for beta at $10/seat | 3 weeks | Low | High |
| F1 | LLM quality | **Wizard-of-Oz:** OpenAI API + manual review, 20 beta managers, blind quality rating | 4 weeks | Medium | High |
| U1 | Managers trust | Observational: beta managers — do they edit summaries? How often? Interview delta | 4 weeks (concurrent with F1) | Low | Medium |
| V2 | 60% adoption | A/B launch: 50% feature flag, measure 30-day adoption | 4 weeks (post-MVP) | Medium | High |
| V3 | Dashboard tier upgrade | Concierge: offer 5 enterprise customers "preview" dashboard, measure willingness to upgrade tier | 3 weeks | Low | Medium |
| Vi1 | Privacy architecture | **Spike** (engineering + legal): design + privacy review + counsel opinion | 2 weeks | Medium | High |

### Test Plan per Top Assumption (through `$hypothesis-template`)

#### Test Card — V1 (Willingness to Pay)

```
**We believe** that mid-market and enterprise TeamFlow customers
**For** accounts with ≥10 active managers
**Will pay** $8-12/seat/month premium for AI 1:1 summarization
**We'll know it's true when** either:
  (a) 30% visitors to landing page click "Pricing details" AND 15% of those click "Get beta access"
  (b) 8 of 10 customer conversations confirm "we'd upgrade at that price"
**Because** 6 of 8 Discovery interviews expressed pay-interest
    + competitor pricing ($5-7 for ChatGPT Teams) suggests price elasticity exists
    + existing TeamFlow seats price point $15-50/mo → 20-30% premium within precedent range.
```

#### Test Card — F1 (LLM Quality)

```
**We believe** that GPT-4 / Claude 3.5 level LLMs
**For** 30-minute 1:1 performance conversations in English
**Will generate summaries** with >85% acceptable rate from managers
**We'll know it's true when** in Wizard-of-Oz test:
  - Blind quality rating from managers: ≥4 out of 5 stars (average), across ≥100 meetings
  - Hallucination rate (factually wrong info): <5% of summaries
  - Misattribution rate (wrong person said X): <3%
**Because** recent LLM benchmarks on summarization task show 85-90% acceptable rates
    + our manually-crafted test prompts achieved 90% in internal QA
    + similar-adjacent use cases (Fireflies.ai, Gong) report >80% customer satisfaction.
```

### Iteration Log (3 weeks later, hypothetical)

**Status updates:**
- **V1:** ✅ Validated. Landing page test: 38% click-through, 22% "Get beta access". 7 of 10 customer conversations confirmed $10/seat acceptable. 2 customers said "we'd pay $15 for enterprise features". → **Risk downgraded to 6**.
- **F1:** ⚠️ Partial. Wizard-of-Oz: 78% quality acceptable (below 85% target). Hallucinations 8% (above 5% target). → Additional work needed: prompt engineering + human-review layer. Risk **still 15**.
- **U1:** ✅ Validated. Beta managers edit summaries 35% of time (not abandon). Sentiment positive. → Risk 6.
- **Vi1:** ✅ Validated. Privacy architecture approved by counsel (opt-in, no training on data, regional endpoints). Risk 3.
- **V2 / V3:** Pending MVP launch.

**New assumptions emerged:**
- **NEW V7:** "Customers accept 24-hour summary delivery delay for enhanced quality" (Uncertainty 4, Impact 3). 
- **NEW F7:** "Human review layer scalable to 5,000 summaries/day" (Uncertainty 4, Impact 4). Added to high-risk quadrant.

### Promoted to PRD Risk Register

Assumptions with lingering risk (F1 quality, F7 human review scale) → PRD Top 5 risks section + mitigation plan.

> **Assumption mapping lesson:** Brainstorm with a cross-functional team (legal, sales, CS in addition to PM + eng) revealed **Vi1 (privacy)** as an existential risk that an engineering-only session would have missed. Landing page test for V1 cost $400 and gave high-signal validation in 2 weeks — saved 10 weeks of engineering investment in the wrong pricing model.
