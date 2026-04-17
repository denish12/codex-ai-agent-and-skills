---
name: prd-template
description: Product Requirements Document template for B2B SaaS — problem, solution, stories, AC, NFR, metrics, risks, rollout
---
# PRD Template (B2B SaaS)

> **Category:** Specification  ·  **Slug:** `prd-template`

## When to Use

- When scope is confirmed and the team is ready for implementation.
- As a contract between Product and Engineering.
- For onboarding new engineers onto an initiative (self-serve docs).
- As a baseline for post-launch review (did we deliver what we said?).

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Approved scope | ✅ | From Mediator (Full B) or from roadmap |
| Discovery Brief | ✅ | JTBD, problems, assumptions |
| Strategy Brief | ✅ | Vision, NSM, OKR alignment |
| Tech feasibility review | ✅ | From Tech Lead |
| Metric plan | ✅ | From Data Analyst |

## Data Sources

1. Discovery + interviews — for problem section.
2. Strategy brief — context.
3. Tech Lead review — NFR, risks.
4. Data Analyst — metrics.
5. Design brief / wireframes — UX.

### Related Skills

| Skill | What we take | When to invoke |
|-------|-------------|----------------|
| `problem-statement` | Problem section | For PRD section 2 |
| `user-story` | Stories section | For each user flow |
| `acceptance-criteria` | AC | Per story |
| `epic-breakdown` | Epic/story hierarchy | For implementation plan |
| `hypothesis-template` | Success metrics | For Success Criteria section |
| `saas-metrics` | Metric impact | For Impact section |
| `launch-checklist` | Rollout plan | For Rollout section |

## PRD Structure

1. **Header** — title, owners, status, dates, links
2. **TL;DR** — 1 paragraph (for skim)
3. **Problem** — why we're doing this
4. **Goals & Non-Goals** — explicit in-scope / out-of-scope
5. **Strategy Fit** — OKR / NSM alignment
6. **Solution** — high-level approach (not implementation)
7. **User Stories** — with AC
8. **NFR** — non-functional requirements
9. **Success Criteria** — metrics + targets
10. **Risks & Mitigations**
11. **Rollout Plan** — launch strategy
12. **Dependencies** — teams, external
13. **Open Questions**
14. **Appendix** — designs, research, data

## Protocol

### Step 0 — Gather Inputs

Checklist before starting:
- [ ] Discovery complete?
- [ ] Strategy approved?
- [ ] Scope agreed (via MoSCoW or RICE)?
- [ ] Tech review done?
- [ ] Metric plan drafted?

If not — return to the relevant predecessor.

### Step 1 — Header + TL;DR

**Header:**
```
PRD: [Feature/Initiative Name]
Owner: [PM name]
Contributors: [Eng Lead, Design Lead, Data]
Status: Draft / In Review / Approved / Shipped
Target Release: [Quarter]
Links: [OKR, Figma, research]
```

**TL;DR** — 3-5 sentences:
- Problem (1 sentence)
- Solution (1 sentence)
- Who benefits (1 sentence)
- Primary success metric (1 sentence)

### Step 2 — Problem Section

Via `$problem-statement`:
- Actor (buyer / end-user / admin)
- Context / trigger
- Pain (with evidence)
- Root cause
- Impact (reach × frequency × severity)

Include **evidence** (quotes, ticket volume, metrics).

### Step 3 — Goals & Non-Goals

**Goals** (3-5 max):
- Specific, measurable
- Tied to metric target

**Non-Goals** (explicit out-of-scope):
- What we are **NOT** solving with this PRD
- Prevents scope creep in implementation

### Step 4 — Strategy Fit

- Which OKR / KR driver?
- What impact on NSM?
- Which themes from the roadmap?
- If Full A (Customer-vs-Business) — which camp's strategy was adopted?

### Step 5 — Solution (high-level)

- Approach (paragraph)
- Key design decisions (without implementation detail)
- Alternatives considered (1-2 with reason not chosen)

### Step 6 — User Stories + AC

For each user flow:
- Story via `$user-story` (INVEST)
- AC via `$acceptance-criteria` (Gherkin)

Structure:
- Primary (happy path) stories
- Edge cases
- Error states

### Step 7 — NFR (B2B SaaS critical)

Via checklist (NFR skill or Tech Lead review):
- **Performance:** p95, throughput
- **Availability:** SLA target (99.9% / 99.99%)
- **Security:** authN/Z, encryption at rest, audit logs
- **Compliance:** SOC2, GDPR, HIPAA, industry-specific
- **Scalability:** target load
- **Observability:** logs, metrics, traces
- **Integrations:** SSO (SAML/OIDC), SCIM, API rate limits
- **Accessibility:** WCAG level

### Step 8 — Success Criteria

Metric tree (via `$north-star-metric` + `$saas-metrics`):
- **Primary metric** — what we're moving (NSM impact)
- **Secondary metrics** — supporting signals
- **Guardrails** — what must not break

Targets:
- Baseline (today)
- Short-term (30 days post-launch)
- Medium-term (90 days)
- Long-term (6+ months)

### Step 9 — Risks & Mitigations

Top 5:

| # | Risk | Probability | Impact | Mitigation |
|---|------|:-----------:|:------:|------------|
| 1 | [desc] | H/M/L | H/M/L | [plan] |

### Step 10 — Rollout Plan

Via `$launch-checklist`:
- **Phased rollout** (feature flag? beta customers first?)
- **Dogfooding** (internal use)
- **Documentation** (customer-facing docs, training)
- **Communication** (release notes, email, in-app)
- **Rollback plan** (if something goes wrong)

B2B specific:
- Customer advisory board preview
- Enterprise account notice (security / contract implications)

### Step 11 — Dependencies

- Teams: [Platform / Security / Data / CS]
- External: [vendors, integrations]
- Prerequisites: [what must be done first]

### Step 12 — Open Questions

Live list — what is undefined, who resolves it, by when.

## Validation (Quality Gate)

- [ ] TL;DR ≤ 5 sentences
- [ ] Problem section has evidence
- [ ] Goals are measurable + Non-Goals are explicit
- [ ] Strategy fit shown
- [ ] Each user story has AC
- [ ] NFR covered (performance, security, compliance)
- [ ] Success metrics with baselines + targets
- [ ] Top 5 risks with mitigation
- [ ] Rollout plan includes rollback
- [ ] Dependencies listed
- [ ] Open questions with owners

## Handoff

The result is input for:
- **Engineering** → implementation planning
- **Designer + Layouter** (if PDF)
- **QA** → test plan
- **CS / Sales** → enablement materials
- **Mediator / Release Gate**

Format: PRD markdown (can be converted to PDF). Via `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|-------------------|
| Implementation details | PRD ≠ design doc | What/why, not how |
| No success metrics | Can't measure win | Primary + secondary + guardrails |
| Missing NFR | B2B deal breakers | Security, compliance mandatory |
| No Non-Goals | Scope creep | Explicit out-of-scope |
| PRD without AC | Loose contract | Every story has AC |
| No rollback plan | Risky launches | Always have Plan B |

## Template

```markdown
# PRD: [Initiative Name]

**Owner:** [PM]  ·  **Status:** Draft  ·  **Target:** Q2 2026

## TL;DR
[3-5 sentences]

## Problem
[via $problem-statement]

## Goals
1. ...

## Non-Goals (out of scope)
- ...

## Strategy Fit
- OKR: [link]
- NSM impact: [expected]

## Solution
[High-level approach]

## User Stories
### Story 1: [title]
[via $user-story]

**Acceptance Criteria:** [via $acceptance-criteria]

## Non-Functional Requirements
- Performance: p95 < 200ms
- Availability: 99.9%
- Security: SSO, audit logs
- Compliance: SOC 2 Type II
...

## Success Criteria
| Metric | Baseline | 30d | 90d | 6mo |
| Primary | | | | |

## Risks
...

## Rollout
1. Dogfood week N
2. Beta N customers week N+1
3. GA week N+2
4. Rollback: feature flag

## Dependencies
- Platform: [what needed]
- Security: [review timeline]

## Open Questions
- [Q, owner, by when]
```

## Worked Example — TeamFlow PRD: AI 1:1 Summarization MVP (excerpt)

```markdown
# PRD: AI 1:1 Summarization (Team Tier MVP)

**Owner:** Alex K., PM  ·  **Status:** Approved (post-Mediator synthesis)  ·  **Target Release:** Q2 2026 (GA target June 30)
**Contributors:** Eng Lead (Priya S.), Design Lead (Jordan M.), Data Lead (Sam P.), Legal (Mia R.)
**Links:** [OKR Q2 Product doc] · [Figma designs] · [Discovery Brief session-1-handoff.md] · [Mediator synthesis session-4-handoff.md]

## TL;DR
AI Summarization turns 1:1s from a 3-hour/week admin burden into a 30-minute confident workflow. Managers speak, TeamFlow captures, summarizes, extracts action items, reminds. Launched under the Team Tier (+$8/seat). Success: 40 account upgrades + 65% manager adoption in AI-tier accounts within the first 90 days.

## Problem
People managers (5-15 direct reports) at mid-market B2B SaaS companies (100-1000 employees) experience 45-60 min/week per report on 1:1 prep + note-taking + follow-up (3-4 hrs/week for a manager with 8 reports), because TeamFlow provides structured templates but no capture or synthesis capability.

**Evidence:** 6 of 8 customer interviews + 120 support tickets Q1 2026 + internal analytics. Impact: ~3,000 affected managers across 200-customer base. Business: $3-5M ARR expansion opportunity + 10pp NRR lift potential through Team Tier upgrade path.

*Full analysis: [problem-statement #1 in Discovery Brief]*

## Goals
1. **Adoption:** 65% of managers in AI-tier accounts use summarization weekly by Day 90
2. **Tier conversion:** 40 accounts upgrade from Core to Team tier (+$8/seat) by Q2 end
3. **Action items lift:** 60% → 75% completion rate in AI-tier accounts
4. **Quality:** Summary acceptance rate (not edited >50%) ≥ 70%

## Non-Goals (explicitly out of scope)
- Real-time transcription during 1:1 (Q3 target — per Mediator scope decision)
- Pre-1:1 prep card generation (Q3 — requires multi-meeting data)
- Group meeting / team meeting summarization (future, scope creep control)
- Non-English language support (English-first, EU languages Q4)
- Mobile-native experience (web responsive only for MVP)
- Integration with external meeting tools (Zoom/Meet) — Q3-Q4

## Strategy Fit
- **OKR:** Drives O1.1 (40 tier upgrades), O1.2 (65% manager adoption), O1.3 (NPS ≥50), O1.4 (action items 60→75%)
- **NSM:** Primary driver of «Sticky Manager Ratio» — target 20% by Day 90
- **Roadmap:** Theme 1 «AI-Assisted 1:1 Workflow» — Now bucket item

## Solution (High-Level)

Manager workflow:
1. Before 1:1: Toggle «AI assist» on (or default-on for AI tier accounts)
2. During 1:1: Normal conversation in TeamFlow 1:1 interface. No typing required (audio optional via browser recording with user consent).
3. After 1:1: AI generates summary + extracts action items. Manager reviews, edits (inline), or approves.
4. Before next 1:1: Action items from previous summary surface prominently.

Architecture: summaries generated via OpenAI GPT-4 API (regional endpoints: US, EU) on opt-in basis. No data retention in LLM provider (zero-retention API tier). Summaries stored in TeamFlow DB with customer-owned encryption keys.

**Alternatives considered:**
- Fine-tuned on-premise LLM: rejected (quality gap, infra complexity, Q2 timeline)
- Anthropic Claude via Bedrock: **accepted as fallback** (contract in place for redundancy)
- Third-party (Otter.ai embed): rejected (privacy architecture not sufficient for HR data)

## User Stories (top 5 from PRD backlog; full list: 14 stories)

### Story S1: Enable AI Summarization for New 1:1
**As a** People manager with 5+ reports at mid-market B2B SaaS company (Team Tier account)
**I want to** enable AI summarization for upcoming 1:1 with one click
**So that** I can focus fully on conversation without worrying about note-taking

**AC:** [via `$acceptance-criteria` — 4 scenarios: happy path, already-enabled, admin-disabled-at-org-level, AI provider unavailable fallback]

**Size:** S (2 points) · **Depends on:** T1 (feature flag infra)

### Story S2: Generate Summary After 1:1 Ends
**As a** manager who just finished an AI-enabled 1:1
**I want to** receive summary + action items within 60 seconds of meeting end
**So that** I can review and approve before moving to my next task

**AC:** [4 scenarios incl. streaming delivery UX]
**Size:** L (8 points) — THE core AI work · **Depends on:** S1

### Story S3: Review and Edit Summary Inline
**As a** manager reviewing AI-generated summary
**I want to** edit content inline and mark it approved
**So that** corrections become the authoritative record and AI learns preferences over time

**AC:** [3 scenarios]
**Size:** M (5 points)

### Story S4: Auto-Extract and Track Action Items
**As a** manager with approved AI summary
**I want** action items automatically extracted and tracked in my 1:1 follow-up queue
**So that** I don't lose commitments between meetings

**AC:** [4 scenarios incl. detection confidence threshold]
**Size:** M (5 points) · **Depends on:** S2

### Story S5: Receive Action Items Reminder Before Next 1:1
**As a** manager with open action items from previous 1:1
**I want** them surfaced 30 min before next 1:1
**So that** follow-through is top-of-mind

**AC:** [3 scenarios]
**Size:** S (3 points) — rule-based, not AI · **Depends on:** S4

## Non-Functional Requirements

- **Performance:** 
  - Summary generation: p95 ≤ 60s from meeting end
  - Summary load time: ≤ 500ms
- **Availability:** 99.9% (excluding 3rd-party LLM outages, for which a documented fallback to secondary provider exists)
- **Security:**
  - All transcript data encrypted at rest (AES-256) and in transit (TLS 1.3)
  - Per-customer encryption key (BYOK for enterprise)
  - Zero data retention in LLM provider (use OpenAI/Anthropic zero-retention API tiers)
  - Audit log of every AI operation (summary generated, edited, approved)
- **Compliance:**
  - SOC 2 Type II attestation extended to cover AI features (audit Q2)
  - GDPR compliant — EU customer data stays in EU region (Azure West Europe)
  - No training on customer data (contractual with providers)
- **Scalability:** Support 5,000 summaries/day Q2, scale to 50,000/day by Q4
- **Observability:** Full instrumentation — generation latency, quality rating, edit rate, action items extraction accuracy
- **Privacy UX:**
  - Opt-in per meeting (manager control)
  - Org-level disable toggle (admin can turn off company-wide)
  - Retention controls (30 / 90 / 365 / 730 days, customer choice)

## Success Criteria

| Metric | Baseline (pre-launch) | 30d target | 90d target | 6mo target |
|--------|:--------------------:|:----------:|:----------:|:----------:|
| **Sticky Manager Ratio (NSM)** | 0% | 10% | 20% | 35% |
| Team Tier upgrades | 0 accounts | 15 accounts | 40 accounts | 80 accounts |
| Action items completion (AI-tier) | 60% baseline | 68% | 75% | 80% |
| AI summary acceptance (no major edits >50%) | N/A | 65% | 70% | 75% |
| NPS in AI tier | 45 (blended TeamFlow NPS) | 48 | 50 | 55 |
| **Guardrails:** | | | | |
| Gross churn (overall) | 8% annual | ≤8% | ≤8% | ≤8% |
| Support ticket volume / AI issues | N/A | <5% of total | <3% | <2% |
| p95 latency | N/A | <60s | <45s | <30s |

## Risks & Mitigations (Top 5)

| # | Risk | Prob | Impact | Mitigation |
|---|------|:----:|:------:|------------|
| 1 | LLM quality below 85% acceptable — user trust collapses | M | H | Wizard-of-Oz validated 78% pre-launch; human-review layer feature flag ready; secondary LLM provider contract |
| 2 | Privacy concern backlash (surveillance perception) | M | H | Opt-in per meeting; transparent data model; communicated early to customer advisory; legal review completed |
| 3 | SOC 2 Type II audit delays block enterprise deals | M | H | Parallel-track audit started Week 1; conditional deal commitments acceptable; fallback Type II deferred to Q3 |
| 4 | OpenAI pricing / terms change mid-quarter | L | M | Anthropic contract in place; API abstraction layer allows swap in <1 week |
| 5 | Action items extraction accuracy low → user distrust | M | M | Confidence threshold surfacing; manager always can edit; iterative prompt tuning |

## Rollout Plan

**Phase 1 — Internal Dogfood (Week 6-7):**
- TeamFlow employees use feature internally
- Top 5 issues identified + resolved pre-beta

**Phase 2 — Beta (Week 8-10):**
- 10 Design Partner customers (curated mix: SMB 4, mid-market 4, enterprise 2)
- Weekly customer interviews + survey
- NPS target ≥45 during beta

**Phase 3 — Limited GA (Week 11-12):**
- Feature flag exposed to 25% of AI-tier-upgraded customers
- Monitor guardrails; gate full rollout on green metrics

**Phase 4 — Full GA (Week 13+):**
- Feature flag to 100% of AI tier
- Sales and CS enabled; marketing campaign triggered
- Tier upgrade funnel open for non-AI-tier customers

**Rollback triggers:**
- Error rate >2% for >15 minutes → feature flag disable
- p95 latency >2 min for >30 minutes → disable
- Support ticket spike 5× baseline → investigation + possible disable
- Critical privacy incident → immediate disable + customer notification

## Dependencies

- **Platform team:** Event instrumentation schema (Week 4 delivery) — blocker for Week 6 dogfood
- **Security team:** SOC 2 Type II audit sign-off (Week 10) — blocker for Enterprise deals, not for GA
- **Legal:** DPA updates sent to customers (Week 8)
- **Sales:** Enablement training session (Week 11)
- **CS:** Runbook + training (Week 10)
- **Marketing:** Landing page + email campaign (Week 11)

## Open Questions

1. Pricing — Team Tier +$8/seat confirmed? (Owner: VP Sales, by Week 3)
2. Enterprise customers — BYOK encryption delivery path? (Owner: Eng Lead, by Week 5)
3. Audit log retention — default 365 days, customer override? (Owner: Legal, by Week 4)
4. Beta customer selection finalized? (Owner: CS Lead, by Week 7)

---

## Appendix A: Full User Stories List (14 stories)
[Link to Stories spreadsheet]

## Appendix B: Design References
[Figma link]

## Appendix C: Mediator Synthesis Rationale
[Link to session-4-handoff.md]

## Appendix D: Metric Plan Details
[Link to metric-plan.md by Data Analyst]
```

> **PRD lesson:** every section traces back to Discovery / Strategy / Mediator artifacts — this prevents the "we discussed it somewhere" syndrome. NFR in B2B SaaS is critical — privacy + compliance take up more space than performance. Rollback triggers are numeric — not «if it breaks», but «error rate >2% for >15 min». Non-goals are explicit to prevent scope creep in implementation.
