---
name: email-engagement-tiers
description: Segregating the email base by engagement tiers — strategy, content tweaking, frequency, win-back, list hygiene
---
# Email Engagement Tiers — Segmentation by Activity

## When to use
- While **planning an email strategy** — delineating tiers prior to launching campaigns.
- While **creating email content** — tailoring copy, tone, CTA, and urgency to a specific tier.
- When **metrics crater** — open rates / CTR dive → segmentation requires an overhaul.
- While **purging the list (hygiene)** — determining whom to reactivate and whom to cull.
- While **planning email sequences** — deploying varied series based on tier.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| ESP data | ✅ | Open rate, CTR, date of last open/click — per subscriber or segment |
| List size | ✅ | Total sum of subscribers |
| Dispatch frequency | ✅ | Letters/week currently distributed |
| Business model | ✅ | B2B / B2C / SaaS / E-commerce — dictates tier thresholds |
| Current segmentation| ⬚ | If extant — what logic is currently applied |
| Email channel goals | ⬚ | Retention / conversion / nurturing / awareness |
| ESP (platform) | ⬚ | Mailchimp / Brevo / ConvertKit / HubSpot / custom — impacts segmentation capabilities |

> If activity data is absent (no analytics) — this skill is **inapplicable**. Gather at least 60 days of data first.

## Defining the Tiers

### Standard Model (5 Tiers)

| Tier | Designation | Definition | List Share (typical) |
|-----|----------|-------------|:--------------------:|
| **🟢 A — VIP / Champions** | Hyper-active | Opened **AND clicked** within the last **30 days**. Regular interaction | 10-20% |
| **🔵 B — Engaged** | Active | Opened **at least 1 time** within the last **60 days** | 20-30% |
| **🟡 C — Passive** | Passive | Opened **at least 1 time** within the last **61-120 days** | 15-25% |
| **🟠 D — At Risk** | At Risk | **Zero opens** for **120-180 days** | 10-20% |
| **🔴 E — Dormant / Dead**| Unreachable | **Zero opens** for **> 180 days** | 10-30% |

### Threshold Adaptation by Business Model

| Business Model | Tier A | Tier B | Tier C | Tier D | Tier E |
|---------------|-------|-------|-------|-------|-------|
| **SaaS (high velocity)** | 14 days, open+click| 30 days, open | 31-90 days | 91-150 days | > 150 days |
| **E-commerce** | 30 d, open+click+buy | 60 days, open+click| 61-120 days, open| 121-180 days | > 180 days |
| **B2B (low velocity)** | 30 days, open+click| 90 days, open | 91-180 days | 181-270 days | > 270 days |
| **Newsletter / Media** | 14 days, open | 45 days, open | 46-90 days | 91-150 days | > 150 days |

> Thresholds bend to the business. If emailing 1/month — windows are broader. If 3/week — windows constrict.

### Additional Signals (Modifiers)

| Signal | Upgrades Tier | Downgrades Tier |
|--------|:------------:|:------------:|
| Clicked a CTA | ✅ +1 tier | — |
| Purchased via email | ✅ +1 tier (up to A) | — |
| Replied to email | ✅ → instantly A | — |
| Forwarded / shared | ✅ → instantly A | — |
| Phantoms an unsub | — | ⚠️ -1 tier |
| Spam complaint | — | 🔴 → instantly E + purge |
| Soft bounce | — | ⚠️ after 3 soft bounces → E |
| Hard bounce | — | 🔴 → purge from list |

## Strategy per Tier

### 🟢 Tier A — VIP / Champions

| Aspect | Strategy |
|--------|----------|
| **Goal** | Retain, scale LTV, convert into brand advocates |
| **Frequency** | Maximum allowable (3-5/week for SaaS, 2-3/week for e-com) |
| **Content** | Exclusives: early access, VIP offers, behind-the-scenes, gated content |
| **Tone** | Intimate, warm, "we appreciate you" |
| **CTA** | Direct, conversionary: buy, upgrade, recommend |
| **Urgency** | Low — they are already loyal. Artificial urgency = devaluation |
| **Personalization**| Maximum: name, purchase history, bespoke recommendations |
| **Subject line** | Personal, zero clickbait: "[Name], your exclusive", "For you — before anybody else" |

**Core tier A metrics:**
- Open Rate: > 50%
- CTR: > 10%
- Unsubscribe: < 0.05%

### 🔵 Tier B — Engaged

| Aspect | Strategy |
|--------|----------|
| **Goal** | Elevate to Tier A (accelerate interaction frequency and depth) |
| **Frequency** | Medium (2-3/week for SaaS, 1-2/week for e-com) |
| **Content** | High-utility: how-tos, case studies, toolkits, digests |
| **Tone** | Friendly-yet-expert |
| **CTA** | Engaging: learn more, try it, download |
| **Urgency** | Moderate — "this week only" is permitted |
| **Personalization**| Medium: name, topical preferences |
| **Subject line** | Value-driven: "5 ways to...", "How we scaled...", number + result |

**Core metrics:**
- Open Rate: 30-50%
- CTR: 3-10%
- Goal: convert to A via click + supplemental action

### 🟡 Tier C — Passive

| Aspect | Strategy |
|--------|----------|
| **Goal** | Reactivate: re-spark interest, remind them of the value proposition |
| **Frequency** | Reduced (1/week for SaaS, 1/2 weeks for e-com). **Do not spam** — it triggers an exodus |
| **Content** | The best of the best: top-performing content vetted by Tier A/B |
| **Tone** | "We're still here, bearing gifts" — absolutely frictionless |
| **CTA** | Soft: "See what's new", "We prepared this for you" |
| **Urgency** | Minimal — pressure obliterates passive readers |
| **Personalization**| High — prove we remember: "Since your last purchase, we've bolted on..." |
| **Subject line** | Re-engagement: "We miss you", "What's changed since [date]", "Just for you" |

**Core metrics:**
- Open Rate: 15-30%
- Goal: return to B within 30 days
- Radio silence for 30 days → downgrade to D

### 🟠 Tier D — At Risk

| Aspect | Strategy |
|--------|----------|
| **Goal** | The final stand (reactivation attempt) before dropping them into E |
| **Frequency** | Minimal (1-2 emails a month). Win-back series deployment |
| **Content** | A 3-to-4 email Win-back saga (see protocol below) |
| **Tone** | Blunt, honest: "We noticed you're not reading. Here's what changed." |
| **CTA** | Clean binary: "I want to stay" / "Unsubscribe me" |
| **Urgency** | Encouraged: "If you don't answer — we stop writing in [N] days" |
| **Personalization**| Maximum — the final chance to prove tangible value |
| **Subject line** | Direct: "Should we keep going?", "Last chance: your exclusive", "We're packing up" |

**Win-back series (Tier D):**

| # | Day | Theme | Approach |
|---|------|------|--------|
| 1 | 0 | "We miss you" | Remind of value: what awesome stuff they missed |
| 2 | 5 | "What's new" | Highlight 3-5 top updates/posts since they vanished |
| 3 | 12 | "Exclusive for you" | Incentive: discount, bonus, freebie — strictly for returning |
| 4 | 20 | "The final email" | Direct question: "Staying?" + link "Yes" / "No, unsubscribe" |

**Core metrics:**
- Win-back open rate: 5-15%
- Win-back conversion (D→B): 3-8%
- If unopened post-sequence → plummet to E

### 🔴 Tier E — Dormant / Dead

| Aspect | Strategy |
|--------|----------|
| **Goal** | List hygiene: sunset → purge |
| **Frequency** | **0 emails** (halt all broadcasts) |
| **Content** | A singular "sunset email", followed by a void |
| **Action** | Sunset policy → scrub from the active list |

**Sunset Email (one, the last):**
> Subject: "We're saying goodbye (unless you object)"
> Body: "We noticed you haven't read our emails in a while. We respect your time and will cease sending them. If you want to stay in the loop — click [button]. If not — do nothing."
> CTA: "I'm staying!" (re-confirm opt-in)

**Post-sunset:**
> Clicked "Staying" → Tier C (passive) → re-engagement
> Complete silence for 14 days → **purged from the database**

### Why purge Tier E?

| Reason | Impact |
|---------|---------|
| **Deliverability**| Dead addresses → ISPs tag you as spam → inbox placement collapses for EVERYONE |
| **Open Rate** | Tier E anchors the average OR → ESP algorithms permanently throttle your reach |
| **Cost** | ESPs bill based on list size. Dead addresses = burning cash |
| **Spam traps** | Abandoned email accounts inevitably morph into ISP-run spam traps |

---

## Protocol

### Step 1 — Audit the current baseline
1. Extract data from ESP: open rate, last open date, last click date — granular to the subscriber or segment.
2. Filter subscribers into the 5 tiers (standard model or adapted).
3. Document the **dimension of each tier** (absolute numbers & %).
4. If Tier E > 30% of the list — this is a 🔴 severe hygiene anomaly.

### Step 2 — Threshold adaptation
1. Lock in the business model (SaaS / e-com / B2B / media).
2. Tweak the thresholds based on the table.
3. If supplementary signals exist (purchases, replies) — account for them.
4. Ratify thresholds with the user.

### Step 3 — Tier-based strategy
For every assigned tier, decree:
1. **Goal** — what are we chasing.
2. **Frequency** — dispatch volume.
3. **Content** — packet payload (type, depth, exclusivity).
4. **Tone & CTA** — vernacular and call-to-action aggression.
5. **Subject line strategy** — operative formulas.
6. **Personalization** — depth and referenced data.

### Step 4 — Win-back sequence (Tier D)
1. Architect a 3-4 letter sequence.
2. Blueprint the intervals.
3. Ascertain the incentive (discount / bonus / high-tier content).
4. Dictate the exit condition: opened → Tier B/C, unopened → Tier E.

### Step 5 — Sunset Policy (Tier E)
1. Script the sunset email.
2. Decree the waiting horizon (14 days).
3. Dictate the action mechanism: re-confirm → C, silence → cull.

### Step 6 — Rhythm of review
1. **Weekly:** audit metrics per tier (automate within the ESP).
2. **Monthly:** shuffle subscribers between tiers (automated scripts or manual).
3. **Quarterly:** audit tier thresholds, execute Tier E culls, dissect win-back conversion rates.

---

## Content Adaptation by Tier (For Copywriter)

### How the copy transforms

| Element | 🟢 Tier A | 🔵 Tier B | 🟡 Tier C | 🟠 Tier D |
|---------|----------|----------|----------|----------|
| **Subject line** | Intimate, exclusive | Value-driven, numbers | Re-engagement, "we're here" | Direct, urgency |
| **Hook** | "For you, first" | "Here's what works" | "Long time no see" | "We're shutting down" |
| **Tone** | Warm, insider | Expert, friendly | Frictionless, soft | Blunt, honest |
| **CTA** | Buy, upgrade, refer | Discover, try, download | See what's new | Stay / Unsubscribe |
| **Urgency** | None (unnecessary)| Moderate | Minimal | Allowable |
| **Length** | Arbitrary (they digest it)| Medium | Curt (avoid overload) | Minimal (1 primary CTA) |
| **Personalization**| Utmost: name + history + recs| Medium: name + prefs | High: "since you last..." | Utmost: the final Hail Mary |
| **Content** | VIP, early access | Utility: how-tos, cases | The absolute best (proven)| Win-back saga |

### Case Study: One offer → 4 variants

**Offer:** The new "Email Marketing 2026" guide

**🟢 Tier A:**
> Subject: "[Name], your exclusive passport to the guide"
> Body: "As a VIP, you're grabbing this 48 hours before anyone else. Inside: 15 strategies..."
> CTA: "Download before everyone else"

**🔵 Tier B:**
> Subject: "15 email frameworks operating in 2026"
> Body: "We collapsed 500+ campaigns into a single guide. Here are 3 insights that shocked us..."
> CTA: "Download for free"

**🟡 Tier C:**
> Subject: "We built something specifically for you"
> Body: "Hey [Name]! Since your last visit, we launched 12 articles. But the real meat is in this guide..."
> CTA: "See what's inside"

**🟠 Tier D:**
> Subject: "[Name], we're about to stop writing. But first — a parting gift"
> Body: "We noticed we haven't connected lately. Before we say goodbye, we wanted to leave you our premier guide..."
> CTA: "Download & Stay" / "Unsubscribe"

---

## Validation (Quality Gate)

Segmentation is certified if:

- [ ] Tiers are codified (5 echelons mapped to concrete thresholds)
- [ ] Thresholds reflect the inherent business model
- [ ] Mass of each tier is chronicled (absolute numbers and %)
- [ ] Tier strategies mapped: goal, frequency, content, tone, CTA
- [ ] Win-back sequence scripted for Tier D (3-4 deployments)
- [ ] Sunset policy solidified for Tier E
- [ ] Tier-specific metrics locked with target benchmarks
- [ ] Regular review cadences scheduled (weekly / monthly / quarterly)
- [ ] Handshake approval acquired from the user

## Handoff

| Consumer | How it's used |
|-------------|---------------|
| `$email-copywriting` | **Primary:** calibrates text, tone, and CTA contingent on tier |
| `$content-calendar` | Marks email blasts with their respective targeted tier |
| `$content-brief` | "Tier" cemented as a mandatory variable in the email brief |
| `$platform-strategy` | Cross-references email segmentation within the macro-channel view |
| `$cta-optimization` | Aggressiveness of generated CTAs scales relative to the tier |
| `$audience-analysis` | Tiers act as an overlay (behavioral) onto demographic personas |

## Integration with other skills

| Skill | Interaction |
|------|----------------|
| `$email-copywriting` | **Consumer:** tiers dictate email archetype, tone, CTA, and frequency |
| `$audience-analysis` | **Complement:** personas = *who* (demo+JTBD), tiers = *how they act* (activity) |
| `$platform-strategy` | **Source:** email operationalized as a channel → tiers act as the core schematic |
| `$content-calendar` | **Consumer:** divergent payloads sent to divergent tiers mapped on one board |
| `$content-brief` | **Consumer:** tier tagged in brief → Copywriter morphs the draft accordingly |
| `$cta-optimization` | **Consumer:** CTA lethality modulated by the target tier |

## Anti-patterns

| Error | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Static broadcasts | Tier A receives identical slop to Tier D → abysmal ROI | Dynamic content mutated by tier |
| Spamming Tier C/D | Accelerates unsubscribes and spam complaints | Strangle the frequency, spike the value |
| Hoarding Tier E | Drags global deliverability into the abyss for the whole roster | Sunset → massacre after 14 days |
| Urgency for Tier A| VIPs don't need a gun to their head; it cheapens the brand | Exclusivity > urgency for elite segments |
| Monotone voice | "We miss you" sent to Tier A = psychotic | Tone-shifts: warm (A), soft (C), blunt (D) |
| Carbon-copy thresholds| SaaS speed ≠ B2B speed | Bend thresholds to the business model's reality |
| Win-back devoid of incentive| "Come back" with zero rationale — utterly impotent | Incentive: discount, bonus, locked content |
| Zero recalibration| Subscribers migrate between tiers autonomously | Monthly forced reallocation sweeps |
| Hard bounce = keep sending | Decimates sender rep | Hard bounce = instantaneous execution (removal) |

## Output Template

```
### Email Engagement Tiers — [Brand]

**Business Model:** [SaaS / E-commerce / B2B / Media]
**Database Size:** [N subscribers]
**Current dispatch rate:** [N emails/week]
**Audit Date:** [YYYY-MM-DD]

---

#### Tier Distribution

| Tier | Designation | Threshold | Count | Base % | Core Objective |
|-----|----------|-------|:----------:|:------:|------|
| 🟢 A | VIP | Open+Click in [N]d | [N] | [%] | Retain, scale LTV |
| 🔵 B | Engaged | Open in [N]d | [N] | [%] | Shift to A |
| 🟡 C | Passive | Open in [N-M]d | [N] | [%] | Reactivate |
| 🟠 D | At Risk | 0 opens in [N-M]d | [N] | [%] | Win-back sequence |
| 🔴 E | Dormant | 0 opens > [M]d | [N] | [%] | Sunset → purge |

**Database Health:** [✅ E < 20% / ⚠️ E = 20-30% / 🔴 E > 30%]

---

#### Tier Strategy

| Tier | Frequency | Content focus | Tone | Target CTA | Subject line logic |
|-----|---------|---------|-----|-----|-------------|
| 🟢 A | [N/wk] | [type] | [tone] | [CTA] | [formula] |
| 🔵 B | [N/wk] | [type] | [tone] | [CTA] | [formula] |
| 🟡 C | [N/wk] | [type] | [tone] | [CTA] | [formula] |
| 🟠 D | Win-back| [type] | [tone] | [CTA] | [formula] |
| 🔴 E | Sunset | [type] | [tone] | [CTA] | [formula] |

---

#### Win-back Sequence (Tier D)

| # | Day | Subject | Approach | CTA |
|---|------|---------|--------|-----|
| 1 | 0 | [subject] | [approach] | [CTA] |
| 2 | [N] | [subject] | [approach] | [CTA] |
| 3 | [N] | [subject] | [approach] | [CTA] |
| 4 | [N] | [subject] | [approach] | [CTA] |

**Exit:** Opens → tier [B/C]. Blank stares post-sequence → tier E.

---

#### Sunset Policy (Tier E)

- **Sunset email:** [subject + micro-description]
- **Holding pattern:** [N] days
- **Re-confirm morphs to:** Tier [C]
- **Absolute silence morphs to:** Purged from database

---

#### Target Metrics by Tier

| Tier | Open Rate | CTR | Unsubscribe | Transition Goal |
|-----|:---------:|:---:|:-----------:|--------------|
| 🟢 A | > [N]% | > [N]% | < [N]% | Solidify retention |
| 🔵 B | [N-M]% | [N-M]% | < [N]% | → A |
| 🟡 C | [N-M]% | — | < [N]% | → B |
| 🟠 D | [N-M]% | — | — | → C (win-back) |
| 🔴 E | — | — | — | Sunset protocol |

---

#### Review Cadence

| Period | Tactical action |
|--------|----------|
| Weekly | Audit core metrics per tier |
| Monthly | Rebalance subscriber allocations |
| Quarterly | Recalibrate thresholds, purge Tier E, review win-back |

**→ Next step:** Enmesh tiers into `$content-calendar` (stratified slots) + `$content-brief` (tier required field) + `$email-copywriting` (tone adjustments)
```
