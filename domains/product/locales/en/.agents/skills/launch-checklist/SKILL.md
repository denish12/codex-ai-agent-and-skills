---
name: launch-checklist
description: Launch checklist — internal (dogfooding, training, rollback) + external (GTM, customer comms)
---
# Launch Checklist (B2B SaaS)

> **Category:** Release  ·  **Slug:** `launch-checklist`

## When to Use

- 2-4 weeks before launching a feature / product / tier.
- For phased rollout planning.
- For alignment Product + Eng + CS + Sales + Marketing.
- As a quality gate before GA.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Feature / initiative | ✅ | What we're launching |
| Target launch date | ✅ | Planned date |
| Stakeholders | ✅ | PM, Eng, CS, Sales, Marketing, Legal |
| Customer impact level | ✅ | Minor / Major / Breaking |
| Regulatory implications | ⬚ | GDPR, industry-specific |

## Data Sources

1. `$prd-template` — feature scope.
2. `$gtm-brief` — external messaging.
3. `$release-notes` — customer-facing announcement.
4. `$rollback-plan` (if separate) — contingency.

### Related Skills

| Skill | What we take | When to invoke |
|-------|-------------|----------------|
| `prd-template` | What we're launching | Parent input |
| `gtm-brief` | External messaging | Part of launch |
| `release-notes` | Customer-facing | Part of launch |
| `ab-test-design` | Phased rollout design | If A/B launch |

## Launch Phases

1. **T-4 weeks: Internal prep**
2. **T-2 weeks: Soft launch (dogfood + beta customers)**
3. **T-1 week: Pre-launch hardening**
4. **T-0: Launch day**
5. **T+1 week: Monitor + iterate**
6. **T+4 weeks: Post-launch review**

## Checklist

### 🔧 Internal Preparation (T-4 weeks)

**Engineering:**
- [ ] Feature flag implemented + tested
- [ ] Observability: metrics dashboard created
- [ ] Alerts configured for error rate, latency, usage
- [ ] Load testing done (for high-traffic features)
- [ ] Security review completed
- [ ] Rollback tested (revert works end-to-end)

**Product:**
- [ ] PRD finalized
- [ ] Success metrics defined + instrumented
- [ ] Internal demo ready
- [ ] Edge cases documented

**Legal / Compliance:**
- [ ] ToS / Privacy policy updates (if needed)
- [ ] DPA updates (if data handling changes)
- [ ] Industry compliance (SOC2, HIPAA, GDPR) reviewed
- [ ] Export control considerations (if applicable)

**Data:**
- [ ] Analytics instrumentation live
- [ ] Dashboard created for monitoring post-launch
- [ ] Baseline metrics captured (for before/after comparison)

### 🧪 Soft Launch (T-2 weeks)

**Dogfooding:**
- [ ] Internal team using feature 5+ days
- [ ] Feedback collected from internal users
- [ ] Top 3 friction points addressed or documented

**Beta Customers:**
- [ ] Beta group identified (5-20 customers, varied segments)
- [ ] Beta agreement signed (if changes ToS)
- [ ] Feedback survey + interview sessions
- [ ] Support team briefed on potential issues

**Iteration:**
- [ ] Beta feedback review session
- [ ] Critical issues resolved
- [ ] Feature gates adjusted

### 📢 Pre-Launch Hardening (T-1 week)

**Customer Communications:**
- [ ] Release notes finalized (via `$release-notes`)
- [ ] Email announcement drafted
- [ ] In-app announcement banner designed
- [ ] Blog post / changelog published
- [ ] Documentation (public knowledge base) updated
- [ ] Video walkthrough (if major feature)

**Sales Enablement:**
- [ ] Sales deck updated
- [ ] Battle cards (vs competitors) updated
- [ ] Demo script / environment ready
- [ ] Pricing update (if applicable) approved

**CS / Support Enablement:**
- [ ] Training session conducted
- [ ] Internal FAQ / runbook created
- [ ] Support ticket categories updated
- [ ] Escalation path for launch issues

**Marketing:**
- [ ] Landing page updated / new one ready
- [ ] Social media posts scheduled
- [ ] PR outreach (if major)
- [ ] Partnership announcements (if applicable)

### 🚀 Launch Day (T-0)

**Morning of launch:**
- [ ] Final health check (metrics dashboard green)
- [ ] Support team on-call
- [ ] PM monitoring metrics (first 2 hours intensive)
- [ ] Feature flag enabled (% rollout per plan: 5% → 25% → 100%)

**Communications:**
- [ ] Email sent to customer list
- [ ] In-app banner activated
- [ ] Blog post published
- [ ] Changelog update live
- [ ] Social media posts published
- [ ] Sales team notified

**Monitoring:**
- [ ] Error rate within baseline
- [ ] Latency within SLA
- [ ] Usage adoption tracked
- [ ] Support ticket volume monitored

### 📊 Post-Launch Monitoring (T+1 week)

**Daily:**
- [ ] Metrics dashboard review
- [ ] Support ticket trend review
- [ ] NPS feedback check

**End of week 1:**
- [ ] Success metric check (baseline → current)
- [ ] Adoption rate
- [ ] Issues discovered + logged
- [ ] Customer feedback themes

### 🔄 Post-Launch Review (T+4 weeks)

- [ ] Success metrics vs targets
- [ ] Adoption analysis by segment
- [ ] Support ticket themes
- [ ] Churn / expansion impact
- [ ] Lessons learned document
- [ ] Roadmap adjustments based on learnings

## Rollback Plan (Always Required)

- [ ] Trigger conditions defined:
  - Error rate > X% for Y minutes
  - Latency > SLA for Y minutes
  - Critical customer escalation
  - Security incident
- [ ] Rollback mechanism: feature flag disable (preferred) or git revert
- [ ] Rollback execution time: ≤ 5 minutes target
- [ ] Communication plan: who notifies customers, via what channel
- [ ] Post-rollback: root cause analysis, retry plan

## Validation (Quality Gate)

- [ ] All checklist sections completed
- [ ] Feature flag + rollback tested
- [ ] Observability instrumented
- [ ] Beta feedback addressed
- [ ] Communications ready (email, blog, docs, social)
- [ ] Sales + CS enabled
- [ ] Rollback plan with trigger conditions
- [ ] Post-launch review scheduled

## Handoff

The output is the input for:
- **Release Gate** (Conductor) — sign-off
- **Engineering** → deployment
- **CS / Sales / Marketing** → external execution
- **Data Analyst** → post-launch monitoring

Format: launch checklist markdown + tracking board. Via `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|---------------------|
| Big-bang launch | High risk, no safety net | Phased rollout (5% → 100%) |
| No rollback plan | Outage extends | Always have Plan B |
| No beta | Discover issues in production | Beta 2+ weeks |
| No CS training | Tickets swamp support | Internal training T-1 week |
| No observability | Blind post-launch | Metrics + alerts before launch |
| Ignore legal | Compliance violations | Legal review for any data/contract change |
| One person owns all | Single point of failure | Clear owner per section |

## Template

See sections above — use as checklist with tickable checkboxes.

## Worked Example — TeamFlow AI Summarization Launch Checklist (GA)

**Context:** AI Summarization MVP after beta phase. Full GA scheduled June 30, 2026. This checklist is the final production rollout.

```markdown
# Launch Checklist: AI Summarization GA (June 30, 2026)

**PM Owner:** Alex K.  ·  **Launch Commander:** Jordan M. (Design Lead + PM backup)
**Rollback On-call:** Priya S. (Eng Lead) + Sam P. (SRE)
**Launch Date:** 2026-06-30 09:00 AM PT (Tuesday — mid-week, midday for coverage)

---

## 🔧 Internal Preparation (T-4 weeks, completed June 2)

### Engineering
- [x] Feature flag «ai_summarization_ga» configured (LaunchDarkly)
- [x] Observability dashboards live: latency, error rate, generation volume, provider health
- [x] Alerts configured:
  - p95 latency >90s for >15 min → PagerDuty
  - Error rate >2% for >15 min → PagerDuty
  - LLM provider failover event → Slack alert
  - Generation volume >200% baseline → Slack (investigate surge)
- [x] Load testing: 500 concurrent summaries generated w/o degradation
- [x] Security review completed and attested (SOC 2 scope extension)
- [x] Rollback tested end-to-end (flag disable → feature off in <10s)
- [x] LLM provider fallback tested (primary offline → secondary takes over, 12s recovery)

### Product
- [x] PRD finalized + all stories marked Done
- [x] Success metrics instrumented and validated in staging (match schema)
- [x] Internal demo ready (5-min walkthrough video)
- [x] Edge cases documented in runbook

### Legal / Compliance
- [x] ToS update published and notified to all customers (30 days notice — May 30)
- [x] DPA updates sent to Enterprise customers (200/200 signed)
- [x] SOC 2 Type II extension for AI features — attestation complete
- [x] GDPR compliance validated (EU data stays in Azure West Europe)
- [x] Data Processing Record updated

### Data
- [x] Instrumentation live: all events from flow schema firing
- [x] Dashboard published to leadership + stakeholders
- [x] Baseline metrics captured (pre-AI): activation, retention, NPS, churn

---

## 🧪 Soft Launch (T-2 weeks, May 16 - June 2)

### Dogfooding (T-3 to T-2, May 16-23)
- [x] Internal TeamFlow team used feature 14 days (100% participation)
- [x] Feedback collected: 47 internal users, 12 issues raised
- [x] Top 5 issues resolved, 7 logged for Q3 iteration

### Beta Customers (T-2, May 23 - June 2)
- [x] 10 design partner customers selected (4 SMB, 4 mid-market, 2 enterprise)
- [x] Beta agreement amended with AI clause (all 10 signed)
- [x] Weekly feedback survey + 2 interview sessions conducted
- [x] Support team briefed on potential issues (runbook + training)

### Iteration
- [x] Beta feedback review session held May 26 (2 hours, all-team)
- [x] **Critical issues resolved:**
  - Issue A: Summary «voice» too corporate, felt impersonal → prompt tuned, NPS improved +8
  - Issue B: Action items sometimes missed when said «maybe» — threshold adjusted
- [x] Feature gates adjusted based on beta telemetry

---

## 📢 Pre-Launch Hardening (T-1 week, June 23-29)

### Customer Communications
- [x] Release notes finalized (drafted via `$release-notes`, reviewed by Legal)
- [x] Email announcement drafted + sent to Alex K for approval (3 variants: SMB, mid-market, enterprise)
- [x] In-app announcement banner designed (copy approved by PM + Marketing)
- [x] Blog post «Introducing AI-Assisted 1:1s» published in drafts, scheduled for June 30 9AM
- [x] Documentation (public knowledge base):
  - «Getting started with AI Summarization» (admin + manager guides)
  - «Privacy & Security FAQ»
  - «API changes related to AI features»
- [x] Video walkthrough recorded (3 min, scheduled for release day)

### Sales Enablement
- [x] Sales deck updated (5 new slides added: «AI Summarization», «Tier Upgrade Path», «Objection Handling»)
- [x] Battle cards updated vs Lattice, 15Five (AI feature comparison)
- [x] Demo script + sandbox environment ready
- [x] Pricing update approved and in CRM (CPQ updated for AI Tier)

### CS / Support Enablement
- [x] Training session conducted: 90-min live (recorded, 12 of 15 attended live, 3 viewed recording)
- [x] Internal FAQ / runbook published (47 FAQ items documented)
- [x] Support ticket categories updated («AI Summary: Quality», «AI Summary: Latency», «AI Summary: Privacy»)
- [x] Escalation path for launch issues defined

### Marketing
- [x] Landing page «AI Summarization» published (staging, to go live June 30)
- [x] Social media posts scheduled (LinkedIn Tuesday 9AM, Twitter 10AM)
- [x] PR outreach: TechCrunch exclusive placed (briefing June 27)
- [x] Customer advisory board preview (email June 25)

---

## 🚀 Launch Day (June 30)

### Morning of launch (0700 PT)
- [x] Final health check — all metrics green, no overnight issues
- [x] Support team on-call (5 team members standby, dedicated Slack channel)
- [x] PM monitoring dashboard (first 2 hours intensive, 30 min check-ins thereafter)
- [x] Feature flag sequence:
  - 0900 PT: Enable for AI Tier accounts (100% of tier — 40 accounts)
  - 0930 PT: Expose upsell banner to Core tier customers

### Communications (0900 PT)
- [x] Email sent to customer list (4200 customer contacts, 4 variants by segment + tier)
- [x] In-app banner activated
- [x] Blog post published
- [x] Changelog updated live
- [x] Social media posts published (LinkedIn, Twitter)
- [x] Sales team Slack notification («AI GA is live — use deck v3»)

### Monitoring (ongoing)
- Error rate: baseline 0.1%, launch day target <1% ✅ (actual: 0.3%)
- p95 latency: target <60s ✅ (actual: 42s)
- Generation volume: 1,200 summaries day 1 ✅ (within capacity)
- Support ticket volume: target <5% of total ✅ (actual: 3.1%)

---

## 📊 Post-Launch Monitoring (T+1 week, June 30 - July 7)

### Daily (M-F, 9am standup)
- [x] Metrics dashboard review (PM + Data + SRE)
- [x] Support ticket trend review (CS Lead)
- [x] NPS feedback check (survey opens after first summary use)

### End of week 1 review (July 7)
- [x] Success metric check:
  - AI Tier adoption: 43% of AI Tier managers (target 50% by day 30 — on track)
  - Tier upgrade funnel: 8 new upgrades week 1 (target 15 by day 30 — on track)
  - NPS: 52 (baseline 45, target 50 — ✅ exceeded)
- [x] Adoption rate by segment: SMB 35%, mid-market 58%, enterprise 68%
- [x] Issues discovered: 7 new (2 resolved week 1, 5 in backlog)
- [x] Customer feedback themes: «Love it!» (majority), «Want mobile» (3 customers), «Privacy concerns resolved» (positive signal)

---

## 🔄 Post-Launch Review (T+4 weeks, July 28)

- [ ] Success metrics vs targets (retrospective)
- [ ] Adoption analysis by segment + cohort
- [ ] Support ticket themes (quantitative)
- [ ] Churn / expansion impact (analyst review)
- [ ] Lessons learned document (cross-functional)
- [ ] Roadmap adjustments based on learnings

---

## Rollback Plan

### Trigger Conditions (ANY of):
- **Error rate > 2% sustained for > 15 minutes** → immediate flag disable
- **P95 latency > 120s sustained for > 30 minutes** → investigate + consider disable
- **Critical customer escalation from Enterprise account** → review within 2 hours
- **Security incident (data leak / unauthorized access)** → immediate disable + customer notification
- **LLM provider SLA breach (both primary + fallback)** → automatic failover + investigate

### Rollback Mechanism
1. **Primary:** LaunchDarkly feature flag disable («ai_summarization_ga» → false)
2. **Time to rollback:** ≤ 5 minutes (flag propagation + cache invalidation)
3. **User impact:** AI toggle greys out, existing AI summaries remain accessible (read-only)
4. **Data impact:** No data loss — summaries persisted, just generation paused

### Communication Plan (on rollback)
- **Internal:** Slack #incident-response + PagerDuty ack
- **Customers:** In-app banner «AI Summarization temporarily paused — investigating» (within 10 min)
- **Affected customer call-out:** Email to Enterprise customers within 1 hour
- **Status page:** Public status.teamflow.com updated

### Post-Rollback
- Root cause analysis within 48 hours (5-why analysis)
- Fix verified in staging + beta customers
- Re-launch plan with learnings (may be next day, next week, or delay)

---

## Ownership Per Section

| Section | Owner | Backup |
|---------|-------|--------|
| Engineering readiness | Priya (Eng Lead) | Marcus (Backend) |
| Product / feature correctness | Alex (PM) | Jordan (Design) |
| Legal / Compliance | Mia (Legal) | Sarah (Security) |
| Sales enablement | VP Sales | Sales Ops |
| CS / Support | CS Lead | Support Manager |
| Marketing / Customer Comms | Marketing Lead | CMO |
| Launch Day coordination | Jordan (Launch Commander) | Alex (PM backup) |
| Rollback decision authority | Priya (Eng Lead) + Alex (PM), can decide alone in emergency | SRE on-call |
```

> **launch-checklist lesson:** A checklist of 100+ items is normal for a major B2B SaaS launch. **Rollback plan with numeric triggers** — «error rate >2% for >15 min» — not «if it breaks». **Ownership matrix** prevents «no one noticed» — each section has primary + backup. **Phased feature flag rollout** (Tier customers first, then upsell to Core) minimizes blast radius. **Communications across multi-channel** (email + in-app + blog + social + PR + sales enablement) — a single channel never reaches all stakeholders.
