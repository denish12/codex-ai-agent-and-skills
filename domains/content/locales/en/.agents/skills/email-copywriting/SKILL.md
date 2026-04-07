---
name: email-copywriting
description: Email copywriting — email types, subject line formulas, structures by type, sequences, technical specs, legal
---
# Email Copywriting

## When to use
- While creating **single emails** — newsletter, promo, product update, announcement.
- While designing **email sequences** — onboarding, nurturing, retention, win-back.
- When **optimizing existing ones** — addressing low open rates, low CTR, high unsubscribe rates.
- As part of the **content strategy** — managing email as a channel derived from `$platform-strategy`.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Email type | ✅ | Newsletter / Promo / Product Update / Onboarding / Nurturing / Retention / Win-back / Announcement / Transactional |
| Goal | ✅ | Specific target action: open → read → click → convert |
| Target persona | ✅ | From `$audience-analysis` — language, pain points, triggers |
| Base segment | ✅ | Who receives it (new / active / dormant / all) |
| Funnel stage | ✅ | TOFU / MOFU / BOFU — dictates CTA aggressiveness |
| Brand guidelines | ✅ | From `$brand-guidelines` — ToV, visual style |
| Offer / value | ⬚ | What is being pitched (for promo / nurturing) |
| Sequence position | ⬚ | If part of a series — which installment, what precedes/follows it |
| Current metrics | ⬚ | Open rate, CTR, unsubscribe rate — if optimizing |

> If the type or segment is not stated — **ask the user**. An unsegmented email = spam.

## Email types and their structures

### Newsletter (digest)
**Goal:** retention, building a habit of opening. **Frequency:** regular.
```
Subject → Preheader → Greeting → Lead-in (1-2 sentences) → 
Block 1 [topic + description + link] → Block 2 → Block 3 → 
Bonus/recommendation → Sign-off → Footer
```
- 3-5 content blocks, each sporting an individual link.
- Distributed CTA: every block acts as a distinct call-to-action.
- Length: 300-500 words.

### Promo (promotional / offer)
**Goal:** conversion, purchase. **Frequency:** campaign-based.
```
Subject (urgency/value) → Preheader → Hook (pain point or benefit) → 
Offer (what they get) → Social proof (testimonial/stats) → 
CTA button → Constraint (urgency/scarcity) → P.S. reiterating CTA → Footer
```
- One offer, one CTA (reiterated 2-3 times).
- Length: 150-300 words.

### Product Update
**Goal:** informing, driving adoption of a new feature.
```
Subject → Preheader → "What's new" (1 sentence) → 
Feature 1 [description + benefit] → Feature 2 → 
CTA "Try it" → Sign-off → Footer
```
- Focus squarely on the benefit, not the technical spec.
- Length: 200-400 words.

### Onboarding (sequence)
**Goal:** activation, establishing first value. **Typically 3-7 emails.**
```
Email 1: Welcome — who we are, what to expect, step one
Email 2: Quick win — the simplest route to immediate value
Email 3: Core feature — primary functionality, how to wield it
Email 4: Social proof — case studies, testimonials
Email 5: CTA upgrade / next step — pushing for conversion
```
- Each email carries precisely **one** action. Do not overload.
- Intervals: day 0, day 1, day 3, day 5, day 7.

### Nurturing (sequence)
**Goal:** warming up, escorting to a decision. **MOFU → BOFU.**
```
Email 1: High-value content (sans sales pitch)
Email 2: Case study / success story
Email 3: FAQ / handling objections
Email 4: Pointed offer layered with social proof
Email 5: Final chance / urgency
```
- A gradient scaling from pure value to a direct pitch.
- Intervals: 2-4 days between dispatches.

### Retention
**Goal:** reactivating dormant users.
```
Subject (personal / "we miss you") → Reminding them of the value → 
What's new (since they departed) → Incentive to return (bonus/discount) → CTA → Footer
```
- Keep it brief, personal, with an explicit incentive.

### Win-back
**Goal:** retrieving unsubscribed / lapsed customers.
```
Subject (intrigue / direct question) → "We noticed you've left" → 
Reasons to return (1-3) → Exclusive offer → CTA → 
P.S. "If you're not interested — unsubscribe" → Footer
```
- The final volley — respectful tone, zero pressure.

## Subject Line Formulas

| Formula | Description | Example | When to use |
|---------|----------|--------|-------------------|
| **Number + benefit** | Specificity attracts | "5 ways to cut costs by 30%" | Newsletter, educational |
| **Question** | Engages, provokes thought | "Why is your email marketing failing?" | Nurturing, TOFU |
| **Personalization**| Name / company inside subject | "[Name], your personal report is ready" | All types; boosts OR by 10-20% |
| **Urgency** | Imposing a time limit | "Final 24 hours: 40% off everything" | Promo, win-back |
| **Curiosity gap** | Incompleteness, intrigue | "We found exactly what you were looking for"| Retention, nurturing |
| **How-to** | Promise of tutelage | "How to snag your first 100 subs in a week"| Newsletter, onboarding |
| **Social proof** | Authority / statistics | "10,000 marketers already use this method" | Promo, BOFU |
| **Negative (use with care)**| Fear of loss | "You're losing clients because of this error"| Nurturing, MOFU |

### Subject line ground rules
- **≤ 50 characters** — optimal for mobile (where 60% of opens occur).
- **Zero spam triggers** — FREE, URGENT, $$$ (triggers red flags).
- **No deception** — the subject must accurately reflect the payload.
- **Preheader supplements** — it expands rather than reiterates the subject.
- **A/B testing** — always field 2 differing formula variants.

## Technical Requirements

| Parameter | Requirement | Rationale |
|----------|-----------|--------|
| **Width** | 600px maximum | Ensures correct rendering across the majority of clients |
| **HTML Weight** | ≤ 100 KB | Gmail aggressively truncates emails > 102 KB |
| **Images** | Alt-text is mandatory | 40% of users block images by default |
| **Text/Image ratio** | 60/40 minimum textual | Spam filters penalize image-heavy dispatches |
| **Font** | Web-safe: Arial, Helvetica, Georgia, Verdana | Custom web fonts do not render ubiquitously |
| **CTA Button** | HTML button (not an image), contrasting color, ≤ 5 words | Image buttons vanish if media isn't downloaded |
| **Plain text** | Always embed a plain text version | Fallback mode for clients devoid of HTML support |
| **Responsive** | Mobile-first: single-column layout | 60%+ opens occur on mobile devices |
| **Dark mode** | Verify: logo, colors, background | Dark mode adoption is ballooning |
| **Preheader** | 45-85 characters, populated deliberately | If left empty, it drags in garbage text from the body |

## Legal Requirements

| Requirement | Standard | Mandatory Status |
|-----------|----------|---------------|
| **Unsubscribe link**| CAN-SPAM, GDPR | 🔴 Mandatory in every single email |
| **Physical address**| CAN-SPAM | 🔴 Mandatory (US distributions) |
| **Sender identity** | CAN-SPAM, GDPR | 🔴 "From whom" — do not mislead or obfuscate |
| **Recipient consent**| GDPR (double opt-in for EU) | 🔴 Mandatory |
| **Unsub processing**| CAN-SPAM (10 days), GDPR (immediately) | 🔴 The unsubscription logic must function flawlessly |
| **Ad labeling** | Regional laws | 🟡 If promotional, label as "Advertisement" |

> The legal footer is non-negotiable in **every** email. Lacking an unsubscribe button = fines.

## Metrics and Benchmarks

| Metric | Formula | Benchmark (Average) | Good | Red flag if |
|---------|---------|--------------------|---------|--------------| 
| **Open Rate** | Opens / Delivered × 100 | 20-25% | > 30% | < 15% — subject line or deliverability issues |
| **CTR** | Clicks / Delivered × 100 | 2-3% | > 5% | < 1% — CTA or content failure |
| **CTOR** | Clicks / Opens × 100 | 10-15% | > 20% | < 8% — content misaligned with expectations |
| **Unsubscribe Rate**| Unsubs / Delivered × 100 | 0.1-0.3% | < 0.1% | > 0.5% — too frequent or irrelevant |
| **Bounce Rate** | Bounces / Sent × 100 | < 2% | < 0.5% | > 5% — list hygiene issue |
| **Spam Complaint** | Complaints / Delivered × 100 | < 0.1% | < 0.05% | > 0.1% — critical risk of domain blacklisting |

> Benchmarks fluctuate by industry. The figures above represent cross-market averages.

## Protocol

### Step 1 — Context and Segment
1. Determine the email type and objective.
2. Formulate the base segment and target persona.
3. Establish the funnel stage and sequence position (if a series).
4. Verify: when was the last email sent to this segment? (Abstain from spamming).

### Step 2 — Subject Line + Preheader
1. Select **2-3 formulas** from the table.
2. Draft **3 variants** of the subject line (≤ 50 characters).
3. For each — draft a companion preheader (45-85 characters, augments instead of repeats).
4. Nominate one pair for the primary send + one pair for the A/B test.
5. Scrub for spam trigger words.

### Step 3 — Structure and Body
1. Dictate the **structure corresponding to the email type** (see above).
2. Draft the email body.
3. Validate scanability: headers, bullets, bolded text, curt paragraphs.
4. Check length — must comport with the prescribed type.

### Step 4 — CTA
1. Forge the CTA leveraging `$cta-optimization` (or base rules).
2. One primary CTA button + a maximum of one secondary (text link).
3. Reiterate the CTA: above the fold + sign-off string.
4. CTA button: stark contrasting color, ≤ 5 words, strictly HTML (no imagery).

### Step 5 — Personalization
1. Inject the Name in the subject / greeting (if the variable exists in the DB).
2. Field dynamic content contingent on the segment (if the platform allows).
3. Embed behavioral triggers (if automated — last action, recently viewed item).

### Step 6 — Technical and Legal Checks
1. Sweep through the technical requirements matrix.
2. Affix the mandatory legal infrastructure (unsubscribe, address, identification).
3. Verify the HTML weight (must remain ≤ 100 KB).

### Step 7 — A/B Test
1. Isolate the test variable: subject line (most prevalent), CTA, dispatch time.
2. Prepare variant B.
3. Designate the test sample size (10-20% of the list) and the victory metric (open rate / CTR).

## Validation (Quality Gate)

An email is deemed finalized if:

- [ ] Type is declared, structure aligns natively with the format
- [ ] Subject line ≤ 50 characters, devoid of spam triggers
- [ ] Preheader is 45-85 characters, expanding on the subject
- [ ] Body is hyper-scannable: headers, bullets, curt paragraphs
- [ ] CTA — one primary target, explicit, ≤ 5 words on the button
- [ ] Personalization injected (at minimum a first name)
- [ ] Alt-text applied retroactively to all media
- [ ] Unsubscribe link is undeniably present
- [ ] Plain text fallback generated
- [ ] A/B subject line variant formulated
- [ ] HTML weight verified at ≤ 100 KB
- [ ] Visualized & proven across mobile environments (responsive)

## Email Sequences

### Designing a Sequence

| Parameter | Description |
|----------|----------|
| **Trigger** | What launches the sequence (registration, purchase, N days dormant) |
| **Number of emails** | 3-7 for onboarding, 4-6 for nurturing, 2-3 for win-back |
| **Interval** | Onboarding: 1-2 days. Nurturing: 2-4 days. Win-back: 3-7 days |
| **Gradient** | Ramps from pure value (initiation) directly to conversion (finale) |
| **Exit conditions** | When to abort: converted, unsubscribed, reached terminus |

### Sequence Template
```
| # | Day | Subject line | Type | Goal | CTA |
|---|------|-------------|-----|------|-----|
| 1 | 0 | [subject] | Welcome | First impression | [action] |
| 2 | 1 | [subject] | Quick win | First value | [action] |
| 3 | 3 | [subject] | Core feature | Adoption | [action] |
| 4 | 5 | [subject] | Social proof | Establish trust| [action] |
| 5 | 7 | [subject] | Upgrade/CTA | Conversion | [action] |
```

## Handoff

| Consumer | How it's used |
|-------------|---------------|
| `$content-brief` | Email serving as the format for a specific content unit |
| `$content-calendar` | Dispatch slotting within the macro-calendar |
| `$cta-optimization` | Injecting optimized CTAs |
| `$content-review-checklist` | Mandating an aggressive text review |
| `$brand-compliance` | Validating ToV and visual style bindings |
| `$content-release-gate` | The final countdown prior to sending |

## Integration with other skills

| Skill | Interaction |
|------|----------------|
| `$audience-analysis` | **Source:** persona, pains, triggers, verbiage |
| `$brand-guidelines` | **Source:** ToV, visual taxonomy, fonts |
| `$cta-optimization` | **Source:** phrasing and spatial placement |
| `$data-storytelling` | **Source:** hook-fact, insight dedicated for lead |
| `$headline-formulas` | **Source:** mechanical frameworks for subject lines |
| `$platform-strategy` | **Source:** designated email cadence |
| `$content-review-checklist` | **Consumer:** final review layer before pushing 'Send' |

## Anti-patterns

| Error | Why it's bad | How to do it right |
|--------|-------------|---------------|
| No segmentation | One blast for everyone = highly irrelevant | Segment + persona binding for every deployment |
| Subject > 50 chars | Truncated into oblivion on mobile iOS | Keep it under 50, critical info front-loaded |
| Multiple equal CTAs| Widespread paralysis: nobody clicks anything | One primary CTA, repeated twice |
| Image-only body | Renders blank by default, caught by spam filters| 60%+ text ratio, absolute alt-text compliance |
| AWOL Unsubscribe | CAN-SPAM fines scaling up to $46K a pop | Exists natively in the legal footer |
| Sending sans A/B | You don't optimize → you don't scale | Bare minimum: A/B the overarching subject line |
| Wall of text | Immediately deleted upon glance | Scanability: headers, bullets, ≤ 3 sentences per |
| Hyper-frequent | > 3/week → mass exodus via unsubscriptions | Newsletter 1/week, promo ≤ 2/month for cold lists |
| Excluded plain text| Excludes clients relying on legacy codebases | Plain text fallback permanently locked in |

## Output Template

```
### Email — [Email type]

**Goal:** [specific action]
**Segment:** [who are we blasting]
**Persona:** [from $audience-analysis]
**Funnel Stage:** [TOFU / MOFU / BOFU]
**Sequence position:** [N/N or standalone]

---

#### Subject Line
| Variant | Subject (≤ 50 characters) | Formula | Preheader (45-85 characters) |
|---------|------------------------|---------|--------------------------|
| A (primary) | [subject] | [formula] | [preheader] |
| B (A/B test) | [subject] | [formula] | [preheader] |

**A/B test variable:** [subject / CTA / time sent]
**Sample size:** [% of total list]
**Victory metric:** [open rate / CTR]

---

#### Email Body

**Greeting:** [Name] / [Neutral]

**Lead-in (1-2 sentences):**
[Hook — hijacking attention, tethered strictly to the subject]

**Body:**
[Core content structured via the email type parameters]

**Bullets (if necessary):**
- [Item 1 — raw benefit]
- [Item 2 — raw benefit]
- [Item 3 — raw benefit]

**CTA (Primary):**
[ 🔵 Button: [text ≤ 5 words] → [URL] ]

**P.S. (if applicable):**
[Repetition of the primary CTA or an overarching secondary argument]

**Sign-off:**
[Name, Role, Brand entity]

---

#### Technical Parameters

| Parameter | Value |
|----------|----------|
| Length | [N words] |
| CTA buttons| [1-2] |
| Personalization | [specifically what is dynamic] |
| HTML Weight| [≤ 100 KB] |
| Plain text | [✅ / ❌] |
| Alt-text | [✅ / ❌] |
| Responsive | [✅ / ❌] |
| Dark mode | [verified ✅ / ❌] |

#### Legal Block

| Element | Status |
|---------|--------|
| Unsubscribe link | ✅/❌ |
| Physical address | ✅/❌/N/A |
| Sender identity | ✅/❌ |
| Marked "Ad" | ✅/❌/N/A |

#### Target Metrics

| Metric | Target | Benchmark |
|---------|------|----------|
| Open Rate | [%] | 20-25% |
| CTR | [%] | 2-3% |
| CTOR | [%] | 10-15% |
| Unsubscribe | < [%] | < 0.3% |

**→ Next step:** [→ $content-review-checklist / → $content-release-gate / → next email in the sequence]
```
