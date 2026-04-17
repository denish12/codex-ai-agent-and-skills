---
name: release-notes
description: B2B customer-facing release notes — what's new, why it matters, breaking changes, migration steps
---
# Release Notes (B2B SaaS)

> **Category:** Release  ·  **Slug:** `release-notes`

## When to Use

- Every customer-facing release (weekly, monthly, or per-feature).
- When there are breaking changes — mandatory with migration steps.
- As part of trust-building: B2B customers value transparency.
- For compliance / audit trails — change history.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Release scope | ✅ | What is included in this release |
| Breaking changes list | ✅ | Even if empty |
| Deprecated features | ✅ | Even if empty |
| Release date | ✅ | Target publication date |
| Target audience | ✅ | All customers / Enterprise only / Beta |

## Data Sources

1. `$prd-template` — feature descriptions.
2. Engineering changelog — technical changes.
3. `$gtm-brief` — messaging tone.
4. Bug tracker — resolved issues (selective).

### Related Skills

| Skill | What we take | When to invoke |
|-------|-------------|----------------|
| `gtm-brief` | Messaging tone | For consistency |
| `launch-checklist` | Timing | Part of launch |
| `prd-template` | Feature details | Source content |

## Structure (B2B standard)

1. **Title + Date**
2. **TL;DR** (3-5 bullet points)
3. **New Features**
4. **Improvements**
5. **Breaking Changes** (⚠️)
6. **Deprecations**
7. **Bug Fixes** (selective, customer-impacting)
8. **Known Issues**
9. **Migration Guide** (if applicable)
10. **Learn More / Resources**

## Protocol

### Step 0 — Scope Decision

- **Per-feature** — discrete release
- **Weekly digest** — for rapidly-releasing products
- **Monthly** — enterprise-focused products (less churn)
- **Quarterly** — platform / major updates

B2B customers prefer a predictable cadence.

### Step 1 — Title + Date

Format:
```
# Release Notes — v2.5.0 (March 15, 2026)
```

or thematic:
```
# March 2026 Release — Enterprise SSO + Performance Improvements
```

### Step 2 — TL;DR

3-5 bullet points for busy executives. **Top customer-value items**:
- ✨ New: Team role templates for faster onboarding
- ⚡ Faster: Dashboard now loads 40% faster
- 🔐 Security: SOC2 Type II certification completed
- ⚠️ Breaking: API v1 deprecated March 2026 (migrate to v2 by June)

### Step 3 — New Features

For each feature:
- **Name** (customer-facing, not internal codename)
- **What** (1-2 sentence description)
- **Why** (customer benefit, tied to JTBD)
- **How** (1-2 lines about usage or link to docs)
- **For Whom** (plan tier, segment, if feature-gated)

Example:
```
### Team Role Templates

Admins can now create reusable role templates and apply them to new team members with a single click.

**Why it matters:** Onboarding new teammates with appropriate permissions now takes seconds instead of 10 minutes. Reduces error rate for misassigned permissions.

**How to use:** Go to Settings → Teams → Role Templates. [Docs link]

**Available for:** All customers on Team plan and above.
```

### Step 4 — Improvements

Smaller enhancements — one-liners:
- Dashboard performance improved (40% faster load)
- Search now supports wildcard matching (*)
- Export to CSV includes new filter fields
- Keyboard shortcuts added for power users

### Step 5 — Breaking Changes (⚠️)

**Must-read section.** Every breaking change:

- **What's changing**
- **Timeline** (when old behavior stops)
- **Why** (rationale)
- **Migration steps** (step-by-step)
- **Support available** (contact info)

Example:
```
⚠️ **API v1 Deprecation — Action Required**

The v1 REST API will be retired on **June 30, 2026**. After this date, v1 endpoints will return 410 Gone.

**Why:** v2 API provides 10× better performance, clearer error responses, and full pagination support.

**Migration steps:**
1. Review your API usage in Settings → API → Usage report.
2. Follow [v1→v2 migration guide]
3. Update SDK to v2.x (via npm/pip/...)
4. Test in staging environment
5. Deploy to production before June 30

**Help:** Email api-support@[company].com or schedule a migration call [link].
```

### Step 6 — Deprecations

Features marked as deprecated but still functional:
- **Feature** — deprecated on [date], removal on [date]
- **Recommended alternative**
- **Why**

### Step 7 — Bug Fixes (Selective)

Only **customer-impacting** bugs. Not every internal fix.

Format:
- Fixed: [customer-observable description]
  - Example: «Fixed: Export to CSV did not include rows with special characters in text fields.»

Skip: internal refactors, tests added, minor style changes.

### Step 8 — Known Issues

Known bugs being worked on. Transparency builds trust.

- **Issue:** [description]
- **Workaround:** [if any]
- **Expected fix:** [next release / in progress]

### Step 9 — Migration Guide (If Applicable)

Standalone subsection for complex migrations. Include:
- Pre-migration checklist
- Step-by-step
- Rollback plan
- FAQ
- Contact for help

### Step 10 — Learn More

- Documentation links
- Video walkthroughs
- Blog post (deep dive)
- Webinar / office hours

### Step 11 — Tone & Voice

B2B SaaS tone:
- **Professional, but human** — not corporate-speak
- **Honest** — «we fixed» > «a subtle issue was addressed»
- **Specific** — numbers over adjectives
- **Respectful of customer time** — TL;DR first, details below
- **Proactive** — anticipate questions

### Step 12 — Distribution

Publish:
- **Product changelog page** (primary home)
- **Email to customers** (tailored by relevance)
- **In-app notification / banner** (major releases)
- **RSS / webhook** (for customers who monitor)
- **Blog post** (for significant releases)
- **Sales enablement** (copy-paste for customer emails)

## Validation (Quality Gate)

- [ ] Title + date + version
- [ ] TL;DR (3-5 bullets)
- [ ] New features — customer-facing framing
- [ ] Improvements
- [ ] Breaking changes with timeline + migration
- [ ] Deprecations with alternatives
- [ ] Selective customer-impacting bug fixes
- [ ] Known issues disclosed
- [ ] Migration guide if applicable
- [ ] Tone consistent (professional, human)
- [ ] Distribution plan

## Handoff

The result is input for:
- **Marketing** → blog / email distribution
- **CS** → customer communication
- **Sales** → «what's new» pitch
- **Support** → ready for related tickets

Format: release notes markdown / HTML page. Via `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|-------------------|
| Hide breaking changes | Customer trust collapses | ⚠️ Prominent + migration |
| Internal codenames | Confusing | Customer-facing names |
| Corporate-speak | Reads poorly | Specific, human |
| Dump every bug fix | Noise | Customer-impacting only |
| No «why» | Feature list without context | JTBD / benefit angle |
| No migration steps | Breaks customer integrations | Step-by-step |
| Buried deprecations | Surprise removal | Announce early, remind often |
| No known issues | «Everything perfect» feels dishonest | Disclose known bugs |

## Template

```markdown
# Release Notes — v[X.Y.Z] ([Month Day, Year])

## TL;DR
- ✨ [Top feature 1]
- ⚡ [Top improvement]
- 🔐 [Security/compliance]
- ⚠️ [Breaking change if applicable]

## ✨ New Features

### [Feature Name]
[2-sentence description]

**Why it matters:** [Customer benefit]
**How to use:** [Quick steps + docs link]
**Available for:** [Plan / segment]

---

## ⚡ Improvements
- [One-liner improvement]
- [One-liner]

## ⚠️ Breaking Changes
### [Change title]
- **Timeline:** [dates]
- **Why:** [rationale]
- **Migration:** [steps + link]
- **Help:** [contact]

## 📉 Deprecations
- [Feature] — deprecated [date], removal [date]. Use [alternative] instead.

## 🐛 Bug Fixes
- Fixed: [customer-observable description]

## ⚠️ Known Issues
- [Issue]: [workaround if any]. Expected fix: [when]

## 📚 Learn More
- [Documentation]
- [Video walkthrough]
- [Blog post]
```

## Worked Example — TeamFlow Release Notes: AI Summarization GA

```markdown
# TeamFlow Release Notes — v3.8.0 "AI Summarization GA" (June 30, 2026)

## 🎉 TL;DR

- ✨ **NEW: AI-Assisted 1:1 Summarization** — Team Tier (+$8/seat/month premium) launches GA. Managers save 3+ hours per week; action items stop falling through the cracks.
- 📊 **NEW: Aggregate 1:1 Dashboard** (Enterprise Tier) — VP HR / CPO dashboards for 1:1 cadence and team health at org level.
- 🔐 **SECURITY: SOC 2 Type II extended** to cover AI features. Privacy architecture documented and publicly attested.
- ⚠️ **PRICING: New «Team Tier»** introduced at $23/seat/mo (existing Core tier unchanged). Migration tools included.
- 💼 **NEW: SSO SCIM provisioning** (Enterprise Tier) — fully automated user provisioning from Okta/Azure AD.

---

## ✨ New Features

### AI-Assisted 1:1 Summarization (Team Tier)

Run your 1:1 normally. TeamFlow AI captures the conversation (opt-in per meeting), generates a structured summary within 60 seconds of meeting end, and extracts action items with confidence scoring. Review, edit inline, and approve — action items automatically surface before your next 1:1.

**Why it matters:** Managers with 5+ direct reports save an average of 3 hours per week on 1:1 admin overhead. Action items completion rate lifts from 60% (manual baseline) to 75%+ in beta customers. Managers report feeling «more present» in conversations.

**How to use:** Go to Settings → AI Features → Enable for your team. Toggle «Use AI» on any upcoming 1:1 meeting page. [Full getting started guide]

**Available for:** Team Tier accounts ($23/seat/mo, +$8 from Core tier). 30-day free trial available for Core customers.

**Privacy-first:**
- Opt-in per meeting (you control which 1:1s use AI)
- Zero data retention with LLM providers (OpenAI / Anthropic zero-retention API tiers)
- Per-customer encryption keys (BYOK for Enterprise)
- Full audit log of all AI operations
- Regional endpoints (US / EU data stays in region)

---

### Aggregate 1:1 Dashboard (Enterprise Tier)

New dashboard for VP People / CPO users showing 1:1 cadence, action items velocity, and team health scores at org and team level. Privacy-preserving — aggregate only, no content surfaced.

**Why it matters:** First time People leaders have measurable data on manager effectiveness at scale. Tie retention, engagement outcomes back to 1:1 practice patterns — data you can bring to ELT discussions.

**How to use:** Contact your CSM for Enterprise tier upgrade. Dashboard becomes available post-upgrade within 48 hours (requires data pipeline provisioning).

**Available for:** Enterprise Tier accounts ($50+/seat, negotiated).

---

### SSO SCIM Provisioning (Enterprise Tier)

Fully automated user provisioning, updating, and deprovisioning from your IdP (Okta, Azure AD, Google Workspace). No more manual user additions or orphan accounts after employees leave.

**Why it matters:** Eliminates the #1 Enterprise customer complaint — manual user management at scale. Your IT team will love you.

**Available for:** Enterprise Tier.

---

## ⚡ Improvements

- **Faster dashboard loads** — OKR dashboard loads 40% faster with new query optimization (p95 dropped from 1.2s to 0.7s).
- **Search now supports wildcards** — find teams with «eng*» or action items containing «*budget*».
- **Export to CSV** now includes all filter fields (previously lost advanced filters on export).
- **Keyboard shortcuts for power users** — press `?` to see the list; `J`/`K` for navigation between 1:1s; `G` + `D` for dashboard.
- **1:1 history filter by «open action items»** — spot incomplete commitments during review cycles.

---

## ⚠️ Breaking Changes

### API v1 Deprecation — Action Required by December 31, 2026

The v1 REST API will be retired on **December 31, 2026**. After this date, v1 endpoints return HTTP 410 Gone.

**Why:** v2 API provides:
- 10× better performance (p95 50ms vs 400ms)
- Clearer error responses with structured codes
- Full pagination support (v1 returns max 100 items)
- AI endpoints (`/v2/ai/*`) available only in v2

**Who's affected:** Approximately 250 customers with active v1 API integrations. Audit your usage at Settings → API → Usage Report.

**Migration steps:**
1. Review v1 → v2 migration guide: [link]
2. Update client SDKs:
   - JavaScript: `npm update @teamflow/sdk@2.x`
   - Python: `pip install --upgrade teamflow-sdk>=2.0`
   - Ruby: `gem update teamflow`
3. Run migration assistant (new tool): `teamflow-cli migrate-v2 --dry-run`
4. Test in staging environment using `--env=staging` flag
5. Deploy to production before December 31

**Help available:**
- Email api-support@teamflow.com for a personalized migration call
- Office hours Tuesdays 10am PT through Q4 2026 (book: [link])
- Documentation + worked examples: [migration guide]

**Timeline:**
- June 30, 2026: v2 API GA (today); v1 marked deprecated
- September 30, 2026: Migration assistant released
- December 31, 2026: v1 retired

---

## 📉 Deprecations

- **Legacy «Simple» onboarding flow** — deprecated June 30, 2026; removed December 31, 2026. Use new «Guided» onboarding flow (default for new customers since March 2026). Settings migration automatic.
- **Per-seat «Basic AI» legacy flag** — deprecated June 30, 2026. Superseded by full AI Tier features. Customers on internal «Basic AI» flag (approximately 12 beta customers) auto-migrated to Team Tier with 90-day price protection.

---

## 🐛 Bug Fixes

- **Fixed:** Action items containing special characters («é», «ñ», emoji) now export correctly to CSV (previously garbled).
- **Fixed:** 1:1 meeting notes no longer lose formatting when scheduled recurring meetings trigger (affected ~3% of users).
- **Fixed:** OKR dashboard correctly shows «At Risk» status for goals < 50% complete within 2 weeks of due date (previously showed «On Track» incorrectly).
- **Fixed:** Calendar integration properly handles time zone changes during daylight saving transitions.
- **Fixed:** Slack notifications respect user's quiet hours (previously fired during set «do not disturb» periods).
- **Fixed:** Performance review reminders do not send to employees on sabbatical / parental leave (if status is marked).

---

## ⚠️ Known Issues

- **Mobile experience for AI Summary review:** Functional but not optimized. Edits require desktop for best UX. Expected fix: Q4 2026 (native mobile app).
- **AI summarization for meetings > 2 hours:** Summary quality degrades for ultra-long meetings. Workaround: schedule recap segments shorter. Expected fix: Q3 2026.
- **Action items extraction for non-English content:** English-only until Q4 2026 release of multi-language support. Non-English content marked with note.
- **Occasional LLM provider failover delay:** Rarely (<0.1% of meetings), failover from primary to secondary provider adds 30-45 seconds. Resolution: architecture improvement in Q3.

---

## 📊 What's Changed for Admins / IT

### New Admin Settings

- **AI Features policy** (Settings → Admin → AI Features):
  - «Disabled org-wide» (no AI access for any user)
  - «Enabled — per-manager opt-in» (default — managers choose per meeting)
  - «Enabled — default on for new managers»
- **Data retention controls:** Choose 30 / 90 / 365 / 730 days for AI-generated summaries
- **Regional data preference:** Choose data processing region (US / EU / APAC)

### New Compliance Artifacts Available

- **SOC 2 Type II attestation (extended to AI features):** Available to Enterprise customers in Trust Center
- **Data Processing Agreement (updated for AI):** Sent to all Enterprise customers May 30, 2026
- **Subprocessor list (updated):** Now lists OpenAI and Anthropic as AI providers

### Security Notes

- Audit logs now include AI operations (generate / edit / approve / delete summaries)
- BYOK (Bring Your Own Key) encryption available for Enterprise tier (contact CSM to configure)
- Zero data retention contractual commitments signed with LLM providers

---

## 💼 For Sales and Customer Success Teams

(Internal section — also shared with customers via their CSM)

### Messaging Cheatsheet

**Core → Team Tier upsell pitch:**
«The biggest change in performance management in 10 years just shipped. Your managers get 3 hrs/week back, action items stop falling through. Team Tier +$8/seat includes AI Summarization, Action Items Reminders, and auto-Extraction. 30-day trial if you want to test drive.»

**Mid-market/Enterprise pitch:**
«Beyond manager productivity, Enterprise Tier now includes Aggregate 1:1 Dashboard — the first measurable view of manager effectiveness across your org. Show your Board that your People investments drive retention. Combined with our new SSO SCIM, procurement says yes.»

### Objection Handling (top 3)

| Objection | Response |
|-----------|----------|
| «Privacy concerns with AI» | «Zero data retention, SOC 2 Type II attested, BYOK for enterprise. We have public documentation + audit reports.» |
| «$8/seat premium too expensive» | «ROI is 45× — 3 hrs/week × 200 managers × $150/hr blended cost = your monthly premium pays in first week.» |
| «What if AI generates wrong summary?» | «Manager reviews and edits before approval — this is assisted, not autonomous. We track edit rate; current beta shows 30% of summaries are edited, meaning the other 70% are accepted as-is.» |

---

## 📚 Learn More

- **Blog post:** [«Introducing TeamFlow AI — The First AI-Native People Ops Platform»](https://blog.teamflow.com/ai-summarization-launch)
- **Video walkthrough (3 min):** [YouTube link]
- **Documentation:** [docs.teamflow.com/ai](https://docs.teamflow.com/ai)
- **Webinar:** «AI in People Operations — What this means for your 2026 strategy», July 15, 2026, 1pm ET — [Register]
- **Migration guide for v1 → v2 API:** [api-migration link]
- **Trust Center:** [trust.teamflow.com](https://trust.teamflow.com) — SOC 2 Type II reports + subprocessor list

---

## 💬 Feedback

Your feedback makes TeamFlow better. Share:
- **Bugs / issues:** support@teamflow.com
- **Feature requests:** feedback@teamflow.com
- **Customer advisory participation:** cab@teamflow.com

Thank you for 5 years of building TeamFlow together. AI Summarization is the biggest leap we've taken — it wouldn't be possible without your feedback throughout discovery.

— The TeamFlow Team

---

## Release Metadata

- **Version:** 3.8.0
- **Release date:** June 30, 2026
- **Previous version:** 3.7.2 (May 27, 2026)
- **Next planned release:** 3.9.0 targeted late July 2026 (AI tier iteration + mobile improvements)
- **Support policy:** Each major version supported 24 months from release
```

> **Release-notes lesson:** TL;DR first — busy execs only read that. **Breaking changes with a 6-month migration window** + personalized help — prevents surprise churn. **Known issues transparency** — builds trust («they tell us what's broken»). Separate sections for **admins/IT** — they have different concerns. **Objection handling for sales** inside release notes = a double-use document. **Migration tooling** (not just docs) — `teamflow-cli migrate-v2 --dry-run` — reduces customer burden.
