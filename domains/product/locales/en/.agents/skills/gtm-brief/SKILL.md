---
name: gtm-brief
description: GTM brief — positioning, ICP, messaging, launch channels, sales enablement, pricing hooks
---
# Go-to-Market Brief (B2B SaaS)

> **Category:** Release  ·  **Slug:** `gtm-brief`

## When to Use

- 4-6 weeks before launching a new feature / product / tier.
- As a handoff artifact from Product to Marketing + Sales + CS.
- During tier/pricing changes.
- For positioning re-work even without a feature change.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| PRD | ✅ | What we're launching |
| ICP — Ideal Customer Profile | ✅ | Who it's for |
| Competitive context | ✅ | Competitor landscape |
| Pricing / packaging | ✅ | Monetization |
| Target launch date | ✅ | For timeline |

## Data Sources

1. `$prd-template` — feature details.
2. Discovery — JTBD, pain points.
3. Sales CRM — objective competitor win/loss data.
4. Customer research — messaging validation.

### Related Skills

| Skill | What we take | When to invoke |
|-------|-------------|----------------|
| `prd-template` | What we're launching | Parent |
| `product-vision` | Positioning anchor | For messaging |
| `jtbd-canvas` | Language + value | For pain-value articulation |
| `launch-checklist` | Execution | After GTM brief |
| `release-notes` | Customer-facing | Companion |

## GTM Brief Structure

1. **Overview + Objectives**
2. **ICP** — who this is for
3. **Positioning** — "for X, who Y, our product Z"
4. **Messaging Pillars** — 3-5 key messages
5. **Competitive Differentiation**
6. **Pricing & Packaging**
7. **Launch Channels**
8. **Sales Enablement**
9. **CS Enablement**
10. **Success Metrics**
11. **Timeline**

## Protocol

### Step 1 — Overview + Objectives

**Overview:** 1 paragraph — what we're launching, why now, what impact expected.

**Objectives** (3-5 max):
- Adoption target (% of eligible customers activated)
- Pipeline generation (SQLs / deals influenced)
- Positioning shift (competitive wins)
- Revenue impact (expansion / new)

### Step 2 — ICP (Ideal Customer Profile)

**Firmographic:**
- Size (employees, revenue, seats)
- Industry / vertical
- Geography
- Tech sophistication

**Persona:**
- Buyer: role, seniority, pain points
- End-user: role, daily context
- Champion: who within org promotes

**Qualification Criteria:**
- Must-haves (without these, not ICP)
- Good-to-haves

### Step 3 — Positioning (Geoffrey Moore)

```
For [target customer]
Who [unmet need / jobs-to-be-done]
Our [product/feature] is a [category]
That [key benefit]
Unlike [competitor / alternative]
Our product [primary differentiation]
```

Short elevator pitch (30 seconds):
- Problem
- Who you help
- How you help
- Proof

### Step 4 — Messaging Pillars (3-5)

Structured as **Claim + Proof + Resonance with JTBD**.

| # | Pillar | Claim | Proof Point(s) | JTBD addressed |
|---|--------|-------|----------------|----------------|
| 1 | Speed | «Deploy in minutes, not weeks» | «Customer X deployed in 1 hour» | Functional job: fast time-to-value |
| 2 | Safety | «Enterprise-grade from day 1» | «SOC2 + HIPAA compliant» | Emotional job: feel safe |
| 3 | Expertise | «Built by ex-[RespectedCo]» | «[Names]» | Social job: be seen as informed |

Avoid generic terms («best-in-class», «leading», «innovative»).

### Step 5 — Competitive Differentiation

**Competitors:**
- Direct competitors
- Adjacent competitors
- Do-nothing / self-built

**Comparison table (for Sales):**

| Dimension | Us | Competitor A | Competitor B |
|-----------|:--:|:------------:|:------------:|
| [Key feature] | ✅ | ❌ | Partial |
| [Another] | Better | Comparable | Worse |

**«Why we win» narrative:**
- Top 3 reasons customers choose us
- Top 3 objections + responses

### Step 6 — Pricing & Packaging

**Pricing model:**
- Per-seat / usage-based / hybrid
- Price point (with rationale: value-based / competitor-based / cost-plus)
- Tier structure (if tiered)
- Discount policies

**Packaging:**
- What's included at each tier
- Add-ons
- Enterprise contract customization

### Step 7 — Launch Channels

Channel mix (weighted):
- **Owned:**
  - Email to customers (existing)
  - In-app banner
  - Blog post / changelog
  - Product hunt (if applicable)
- **Paid:**
  - LinkedIn ads (B2B SaaS standard)
  - Google search ads
  - Retargeting
- **Earned:**
  - PR outreach (Tier 1 publications)
  - Influencer advocacy
  - Customer case studies
- **Partners:**
  - Integration partners
  - Agency network
  - Consultants

### Step 8 — Sales Enablement

Deliverables for the sales team:
- Updated pitch deck
- Battle cards (vs each key competitor)
- Demo script + environment
- ROI calculator / business case template
- Objection handling guide
- Cold outreach sequence
- Pricing sheet

**Training:**
- 1-hour session pre-launch
- Recorded demo
- Q&A with Product

### Step 9 — CS Enablement

Deliverables for CS:
- Customer-facing docs (knowledge base)
- Video walkthroughs
- FAQ
- Migration guides (if breaking change)
- Escalation runbook

**Training:**
- Internal workshop
- Shadow dogfooding session
- Early access 2+ weeks before

### Step 10 — Success Metrics

**Short-term (30 days):**
- Adoption rate in eligible customers
- Support ticket volume
- Sales inquiry volume

**Mid-term (90 days):**
- Pipeline influenced
- New ARR attributed
- Competitive win rate

**Long-term (6+ months):**
- Retention lift
- NRR impact
- Category positioning shift

### Step 11 — Timeline

| Week | Phase | Activities |
|:----:|-------|-----------|
| T-6 | Prep | GTM brief approval |
| T-4 | Prep | Sales deck, battle cards, training |
| T-2 | Beta | Beta customers, feedback |
| T-1 | Hardening | Final copy, FAQ |
| T-0 | Launch | Announce, enable all channels |
| T+1 | Monitor | Daily metrics review |
| T+4 | Review | Post-launch retro |

## Validation (Quality Gate)

- [ ] All 11 sections completed
- [ ] ICP — firmographic + persona + qualification
- [ ] Positioning is unique (passes FOCUS test)
- [ ] 3-5 messaging pillars with claim + proof
- [ ] Competitive comparison table
- [ ] Pricing rationale (value / competitor / cost)
- [ ] Channel mix diversified
- [ ] Sales enablement deliverables listed
- [ ] CS enablement deliverables listed
- [ ] Success metrics (short/mid/long)
- [ ] Timeline with T-weeks

## Handoff

The output is the input for:
- **Marketing** → campaign execution
- **Sales** → enablement, pitch updates
- **CS** → customer communication
- **PM** → launch execution
- **`launch-checklist`** — operational checklist

Format: GTM brief doc (markdown or deck). Via `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|---------------------|
| Generic positioning | Doesn't differentiate | Specific ICP + specific benefit |
| Feature list as messaging | Not customer-centric | Messaging pillars tied to JTBD |
| No competitive | Sales blind | Comparison table + narrative |
| Single channel | Over-reliance | Diversified channel mix |
| No sales training | Sales fumbles | Min 1 hour training |
| Vanity metrics | «Website visits» without context | Adoption + pipeline + retention |
| Rush (no beta) | Messaging mis-aligned | Beta validates messaging |

## Template

```markdown
# GTM Brief: [Initiative Name]

## Overview + Objectives
...

## ICP
- Firmographic: [size, industry, geo]
- Persona (Buyer): [role, seniority, pain]
- Persona (End-user): ...
- Qualification criteria: must-haves

## Positioning
For [target]
Who [need]
Our [product] is a [category]
That [benefit]
Unlike [alternative]
Our product [differentiator]

## Messaging Pillars
| # | Pillar | Claim | Proof | JTBD |

## Competitive Differentiation
[Comparison table + win/loss narrative]

## Pricing & Packaging
...

## Launch Channels
- Owned: ...
- Paid: ...
- Earned: ...
- Partner: ...

## Sales Enablement
- Deck, battle cards, demo, ROI calc, objections

## CS Enablement
- Docs, videos, FAQ, migration guide

## Success Metrics
- 30-day: ...
- 90-day: ...
- 6mo+: ...

## Timeline
[T-weeks table]
```

## Worked Example — TeamFlow AI Summarization GTM Brief

```markdown
# GTM Brief: TeamFlow AI 1:1 Summarization (Team Tier Launch)

**Owner:** Jamie L. (Head of Product Marketing)  ·  **Launch:** June 30, 2026  ·  **Status:** Approved

## Overview + Objectives

**Overview:** Launch TeamFlow's first AI feature — 1:1 summarization — as the flagship value driver of the new «Team Tier» (+$8/seat/month premium). Positions TeamFlow as the AI-native category leader in B2B people management, opens clear expansion path from existing Core customers.

**Objectives (Q2-Q3 2026):**
1. **40 account upgrades** to Team Tier within first 90 days (OKR KR1.1)
2. **Pipeline generation:** 50 qualified Team Tier opportunities from existing Core customers
3. **Competitive wins:** 3 Lattice/15Five replacements citing «AI summarization» as primary reason
4. **Category positioning:** ≥ 1 Tier-1 publication (TechCrunch, Axios, CNBC) covering launch

---

## ICP — Ideal Customer Profile

### Firmographic
- **Company size:** 100-1000 employees (mid-market primary)
- **Industry:** Tech-forward — B2B SaaS, Software, Fintech, HealthTech (regulated OK)
- **Revenue:** $5M-$500M ARR
- **Geography:** US + Canada primary, EU secondary (EU data residency ready), APAC future
- **Growth stage:** Scaling (hired 20-50% YoY) — management needs are acute

### Personas

**Primary Buyer: VP People / Chief People Officer**
- **Role seniority:** Director through C-level (reports to CEO or COO)
- **Tenure:** 5-10 years in People/HR
- **Key context:** Under pressure to show manager effectiveness data, reports to ELT
- **Pain:** Cannot measure 1:1 quality; relies on storytelling with CEO
- **Goal:** Be seen as data-driven People leader
- **Budget authority:** Yes ($50K-$500K annually)

**End-User: People Manager**
- **Role:** Engineering / Sales / Ops / Product managers with 5-15 direct reports
- **Tenure:** 2-10 years in management
- **Pain:** 45-60 min/week admin per report, action items dropped, meeting quality anxiety
- **Goal:** Feel prepared, connected, not burned out
- **Buying influence:** Moderate (their pushback kills deals, their enthusiasm accelerates)

**Champion: Chief of Staff / HR Business Partner**
- **Role:** Reports to VP People or directly to exec
- **Function:** Advocate internally, navigate multi-stakeholder buying
- **What they need:** Clear business case, easy internal messaging, support

### Qualification Criteria

**Must-haves (ICP):**
- [ ] 100+ employees (scale threshold)
- [ ] Multi-tier management structure (managers who manage managers)
- [ ] VP People or equivalent role exists (buyer present)
- [ ] Currently using spreadsheet / ad-hoc / competitor for performance management

**Good-to-haves:**
- [ ] Tech industry (AI-ready culture)
- [ ] Remote / hybrid workforce (1:1 importance elevated)
- [ ] Recent leadership change (new VP People looking for modern tools)
- [ ] Data-driven organization (CRO + CTO with metrics buy Sales, CPO wants parity)

---

## Positioning (Geoffrey Moore)

**For** People operations leaders at mid-market B2B SaaS companies (100-1000 employees)
**Who** need measurable evidence of manager effectiveness at scale
**Our** TeamFlow AI-powered 1:1 tier **is a** People operations intelligence platform
**That** automates the admin burden of 1:1s and generates actionable insights on manager practice
**Unlike** Lattice, 15Five, or Culture Amp (which provide structured templates but no AI automation)
**Our product** combines native AI summarization with privacy-by-design architecture, trusted by 3+ years of B2B HR data handling.

**Elevator pitch (30 seconds):**
«Managers spend 3+ hours a week on 1:1 admin — prep, notes, follow-up. We turn those hours back into real conversations. TeamFlow AI summarizes every 1:1, extracts action items, and reminds managers before the next meeting. VP HR gets the data they've never had: which managers run great 1:1s, which teams are at risk, all without touching the sensitive content. 40 mid-market customers upgraded in the first quarter.»

---

## Messaging Pillars

| # | Pillar | Claim | Proof Points | JTBD Addressed |
|---|--------|-------|--------------|----------------|
| 1 | **Time Reclaimed** | «Get 3 hours per week back for every manager» | Wizard-of-Oz beta: avg 2.8 hrs saved/week per manager; customer quote wall | End-user F1 (admin overhead) |
| 2 | **Confidence, Not Surveillance** | «Privacy-first AI that managers opt into, not corporate monitoring» | Architecture: opt-in per meeting, zero data retention on LLM, SOC 2 Type II attestation | Buyer E1 + End-user E1 (emotional jobs) |
| 3 | **Measurable People Operations** | «See manager 1:1 health across your org for the first time» | Dashboard: cadence, action items velocity, health scores (aggregate, privacy-preserving) | Buyer F1, F2 (consistency + ROI reporting) |
| 4 | **Enterprise-Grade from Day One** | «SOC 2 Type II, GDPR, BYOK encryption, SSO/SCIM — ready for your procurement» | Security attestations; customer references (2 enterprise design partners) | Buyer S1 (credibility with ELT) |

Note: Avoid generic «AI-powered» — everyone says that. Specifics + proof points matter.

---

## Competitive Differentiation

### Direct competitors

| Dimension | **TeamFlow AI** | Lattice | 15Five | Culture Amp |
|-----------|:---------------:|:-------:|:------:|:-----------:|
| AI 1:1 summarization | ✅ **Native, launched June 2026** | ❌ | ❌ | ❌ |
| Action items auto-extract | ✅ | Partial (manual) | ❌ | ❌ |
| Aggregate 1:1 dashboard | ✅ Q3 2026 | ❌ | Partial | ❌ |
| Privacy architecture (opt-in, BYOK) | ✅ | Basic | Basic | Basic |
| SSO SAML + SCIM | ✅ | ✅ | ✅ | ✅ |
| Pricing (mid-market avg) | $30/seat (Team Tier) | $35/seat | $28/seat | $25/seat |

### Indirect competitors
- **Notion / Asana / Airtable:** «generic tool hack» — customers cobble together workflows
- **Otter.ai + ChatGPT:** external transcription + summary — privacy nightmare for HR

### Why We Win (top 3 reasons customers choose us)
1. **AI-native, purpose-built** — not bolted-on, understood HR context
2. **Privacy architecture** — enterprise-ready trust model
3. **Integrated workflow + analytics** — one platform, multiple tiers

### Top Objections + Responses

| Objection | Response |
|-----------|----------|
| «Why not wait for Lattice to add AI?» | «Feature gap likely 12+ months. Our 3-year data head start = better summaries Day 1. See demo.» |
| «Privacy concerns — HR data leaking to OpenAI?» | «Zero retention API tier + regional endpoints + BYOK for enterprise. Happy to share arch diagrams + SOC 2 scope.» |
| «We already have our own process» | «Great — keep what works. AI augments, doesn't replace. Our Team Tier adds AI assist without disrupting current workflows. Try for 30 days.» |
| «Pricing feels steep» | «$8/seat for 3 hrs/week saved — that's $150/hr value created. ROI 45×. Our customers see NRR lift 5-10pp post-AI tier adoption.» |
| «What if AI is wrong?» | «Manager reviews and edits before approval. AI-assisted, human-authored. See demo.» |

---

## Pricing & Packaging

### Pricing Model

**Three-tier structure (active effective July 1, 2026):**

| Tier | Price/seat/mo | Core Features | AI Summarization | Analytics |
|------|:-------------:|:-------------:|:----------------:|:---------:|
| **Core** | $15 | 1:1 templates, OKR tracking, reviews | ❌ | Basic |
| **Team** | $23 (+$8) | All Core + | ✅ | Standard |
| **Enterprise** | $50+ (negotiated) | All Team + | ✅ + BYOK | Aggregate + benchmarks + manager health scores |

**Pricing rationale:**
- Value-based: $8/seat for 3 hrs/week saved = customer ROI 45×
- Competitor-based: Lattice $35, 15Five $28, us positioned in middle
- Expansion-optimized: tier ladder encourages upgrade (Core → Team → Enterprise)

**Discount Policies:**
- Annual prepay: 15% discount
- 500+ seats: negotiated (sales-led)
- Non-profit: 30% discount
- Early adopter (first 100 Team Tier upgrades): +50% free trial extension (30 → 45 days)

---

## Launch Channels

**Channel mix (investment weighting):**

### Owned (60% focus)
- **Email to existing customers:** 4,200 contacts, segmented (SMB / mid / enterprise)
- **In-app banner:** Core tier customers see upsell CTA
- **Blog post:** «Introducing AI-Assisted 1:1s» — long-form, SEO-optimized
- **Changelog update:** Published via release notes
- **Webinar series:** «AI in People Ops — 4-week series» (weekly)
- **Customer advisory board:** Exclusive preview 3 days before public

### Paid (20% focus)
- **LinkedIn ads:** B2B SaaS standard — targeting VP HR titles, 100-1000 employee filter
- **Google search ads:** «AI for performance management», «ai 1:1 notes», competitor keywords
- **Retargeting:** website visitors who bounced off pricing page

### Earned (15% focus)
- **PR outreach:** TechCrunch exclusive (briefing June 27), Axios, CNBC follow-ups
- **Influencer advocacy:** 3 People Ops thought leaders briefed (Lars, Mia, Kevin)
- **Customer case studies:** 3 written + filmed by Q3

### Partners (5% focus)
- **Integration partners:** Notion, Linear, Jira announcements mentioning TeamFlow AI
- **Agency network:** Carta People, Gusto refer customers with performance mgmt needs

---

## Sales Enablement

**Deliverables (completed June 23):**
- [x] Updated pitch deck (+5 AI slides)
- [x] Battle cards vs Lattice, 15Five, Culture Amp, Notion/Asana hack
- [x] Demo script (7 min live + interactive sandbox environment)
- [x] ROI calculator (inputs: # managers, # reports/manager → outputs: hours saved, $ value)
- [x] Objection handling guide (20 common objections + responses)
- [x] Cold outreach sequence (3-email, LinkedIn InMail variants)
- [x] Pricing sheet with annual prepay options

**Training:**
- [x] 90-min live session (June 24) — 18 of 20 sales reps attended
- [x] Recorded + transcribed for async review
- [x] Weekly office hours with PM + Product Marketing (Fridays 2pm)

---

## CS Enablement

**Deliverables:**
- [x] Customer-facing docs (knowledge base): «Getting Started», «Privacy FAQ», «Admin Guide»
- [x] Video walkthrough (5 min manager + 3 min admin)
- [x] FAQ: 47 questions covering all major use cases
- [x] Migration guides: For customers currently using competitor note-taking
- [x] Escalation runbook for edge cases

**Training:**
- [x] Internal workshop (June 20) — all 15 CS team members attended
- [x] Dogfood access — CS reps used feature 2 weeks pre-launch
- [x] Shadow manager sessions (live 1:1 observations)

---

## Success Metrics

### Short-term (30 days post-launch — July 30)
- **Adoption:** 15 Team Tier upgrades
- **Support ticket volume:** <5% of total
- **Sales inquiry volume:** 30 new Team Tier opportunities
- **Press coverage:** 1 Tier-1 publication
- **NPS (Team Tier users):** 48+ (baseline 45 for TeamFlow overall)

### Mid-term (90 days — September 30)
- **Total upgrades:** 40 accounts (OKR commitment)
- **Pipeline influenced:** $3M ARR
- **New ARR attributed:** $400K
- **Competitive win rate vs Lattice:** 35%+ (baseline 22%)
- **Sticky Manager Ratio (NSM):** 20%+

### Long-term (6+ months — Dec 30)
- **Retention lift in AI Tier accounts:** +3pp vs Core tier
- **NRR impact:** +5pp org-wide
- **Category positioning shift:** «AI-native People Ops» appears in analyst reports (Forrester, Gartner)

---

## Timeline

| Week | Phase | Activities |
|:----:|-------|-----------|
| T-6 (May 19) | Prep | GTM brief approval, ICP finalized |
| T-4 (June 2) | Prep | Sales deck, battle cards, training materials ready |
| T-2 (June 16) | Beta | Beta customer feedback, iteration, final messaging |
| T-1 (June 23) | Hardening | Final copy, FAQ, docs published (staging), training sessions |
| **T-0 (June 30)** | **Launch** | **Announce all channels, sales enablement live, CS prepared** |
| T+1 (July 7) | Monitor | Daily metrics review, issue triage, customer feedback |
| T+4 (July 28) | Retro | Post-launch retrospective, adjustments, Q3 plan |

---

## Open Questions (resolved pre-launch)

1. [RESOLVED] Pricing final: $23/seat Team Tier confirmed by VP Sales + CFO
2. [RESOLVED] PR exclusive: TechCrunch briefing date locked (June 27)
3. [RESOLVED] Customer advisory board preview: June 27 email + dedicated Slack
4. [OPEN — post-launch monitor] Mobile demand: 3 customers asked; track signal, reconsider Q4

---

## Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|:-----------:|:------:|-----------|
| Launch coincides with competitor AI announcement | M | H | Pre-brief on day zero narrative — «first-to-market with privacy-first» differentiator |
| Support ticket spike overwhelms CS | M | M | 5 CS reserves on standby first 2 weeks |
| Pricing pushback from price-sensitive SMBs | H | L | 30-day trial + annual discount offers |
| Enterprise prospects stall on compliance | L | H | SOC 2 Type II attestation ready, fast-track responses |
```

> **GTM brief lesson:** Messaging pillars are not a feature list. Each pillar = claim + proof + JTBD link. **Objection handling** with concrete numeric responses («$150/hr value, ROI 45×») rather than platitudes. **Channel mix weighted** (60/20/15/5) — not equal effort. Sales enablement deliverables specific + timed. Metrics laddered (short / mid / long) prevent launch anxiety about Day 1 adoption.
