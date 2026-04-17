---
name: user-interview-script
description: Structured script for B2B interviews — separation of buyer and end-user, pain-discovery without leading questions
---
# User Interview Script (B2B)

> **Category:** Discovery  ·  **Slug:** `user-interview-script`

## When to Use

- Before a major product initiative, to capture real pain points and JTBD.
- When preparing `/ship-right-thing` or `/shape-prioritize` — as the foundation of the Discovery Brief.
- When validating new ideas / hypotheses from `$opportunity-solution-tree`.
- When customer support / CRM data is insufficient to understand root cause.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Segment | ✅ | SMB / mid-market / enterprise |
| Interviewee role(s) | ✅ | Buyer / end-user / admin / champion — separately |
| Product context | ✅ | Current product, category, alternatives |
| Hypotheses / areas of interest | ✅ | What we want to learn |
| Duration | ⬚ | Default 30-45 min |
| Format | ⬚ | 1-on-1 / 2-on-1 (usually 2: one leads, one takes notes) |

> If segment and roles are not defined — **request from the user**.

## Data Sources

1. Existing interviews (mempalace, support tickets, NPS comments) — avoid duplicating questions.
2. CRM data — deal status, cohort, usage patterns.
3. Product analytics — understand how the product is really used (don't rely on «how they say» they use it).

### Related Skills

| Skill | What we take | When to invoke |
|-------|-------------|----------------|
| `jtbd-canvas` | Jobs structure → questions for discovery | After formulating job hypotheses |
| `problem-statement` | Problem draft → focused questions | If problem is already formulated |
| `assumption-mapping` | Top assumptions → validation questions | For high-risk assumptions |
| `opportunity-solution-tree` | Opportunities → exploration questions | When discovering new opportunities |

## Protocol

### Step 0 — Segmentation

Split interviews by role, **do not mix buyer and end-user in one script**:

- **Buyer** (VP Engineering, Director of Ops, CIO) — ROI, compliance, fit with current stack, purchasing concerns.
- **End-user** (developer, HR manager, sales rep) — daily experience, friction points, workarounds.
- **Champion** — who promotes the product internally, their motivations.
- **Admin** — who configures, integrates, monitors compliance.

### Step 1 — Opening (5 min)

Goal — establish context, not sell.

1. Introduce yourself: «I work on [...] at [company]. Today I want to learn how you [context], not to sell anything.»
2. Permission to record (if applicable).
3. Warm-up: «Tell me in 2-3 sentences — what does your day look like? What's your role on the team?»
4. **Rule:** never mention the product first.

### Step 2 — Context Building (10 min)

Understand the interviewee's workflow.

Framework questions:
- «Tell me about the last time you [situation]. What happened? Step by step.»
- «How do you currently solve [proximate problem]?»
- «Who else is involved? Who makes the decision?»
- «What tools do you use?»

**Rule:** ask about a specific recent case, not abstract generalizations.

### Step 3 — Pain Discovery (15 min)

Don't ask directly «what hurts». Look for evidence:

- «What was difficult about that case?»
- «What would you like to change?»
- «When was the last time you complained about this?»
- «What takes up the most time that you don't like?»
- «If you had a magic wand — what would you fix?»

**Red flags:**
- Leading question: «You find [X] difficult, right?»
- Hypothetical: «If we built [feature] — would you use it?»
- Direct feature request: «Do you need [feature]?» → dig down to why.

### Step 4 — Buyer-specific (for buyer, 10 min)

- «Who is involved in the decision? (procurement, finance, legal, IT)»
- «How do you evaluate ROI?»
- «What made you look at [category] now?»
- «What compliance / security requirements do you have?»
- «What is your budget cycle?»
- «What didn't work with similar tools in the past?»

### Step 5 — End-user-specific (for end-user, 10 min)

- «How often do you use [category]? When was the last time?»
- «What annoys you? What do you complain about to colleagues?»
- «What workarounds do you use?»
- «What would make your work 30% easier?»

### Step 6 — Wrap-up (5 min)

- «What should I have asked but didn't?»
- «Who else would you recommend talking to?»
- Thank you + follow-up offer.

### Step 7 — Post-interview (15 min, immediately after)

1. Record top 3 quotes (verbatim).
2. Mark moments of surprise / contradiction.
3. Add to Discovery log: date, segment, role, top pains, evidence quotes, open questions.

## Validation (Quality Gate)

- [ ] Buyer vs end-user interviews are separated
- [ ] Minimum 5 interviews per role (or explicit rationale)
- [ ] Context through recent specific case, not generic
- [ ] Pain discovery — without leading questions
- [ ] Verbatim quotes recorded
- [ ] Surprises / contradictions noted
- [ ] Wrap-up done with «what else?»

## Handoff

The result is input for:
- **`jtbd-canvas`** — jobs hypothesis → validation through quotes
- **`problem-statement`** — evidence for actor/context/pain
- **`assumption-mapping`** — new assumptions from surprises
- **Discovery agent** — compilation into Discovery Brief

Transfer format: interview log (markdown) with segmentation, top quotes, open questions. Via `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|-------------------|
| Leading questions | Distort data | Open-ended, about specific case |
| Mixing buyer and end-user in one script | Different JTBD | Separate scripts |
| Pitching instead of listening | Interview → demo | No product talk in opening |
| Hypothetical questions | Don't predict behavior | Ask about past behavior |
| Agreeing to vague requests | «I'd like automation» — empty insight | Dig to specific workflow |
| Once or twice and done | Saturation ≠ 2 interviews | 5+ per role, until repeat patterns |

## Interview Log Template

```markdown
# Interview: [Name or anonymized ID]
- **Date:** YYYY-MM-DD
- **Segment:** SMB / Mid-market / Enterprise
- **Role:** Buyer / End-user / Champion / Admin
- **Product context:** [current stack, alternatives]

## Top Pains (ranked)
1. [Pain] — evidence: «[verbatim quote]»

## Top Quotes (verbatim)
> «[Quote]» — on topic X

## Surprises / contradictions
- [What was unexpected]

## Open questions (for next session)
- [Question]
```

## Worked Example — TeamFlow (B2B SaaS, HR-tech)

**Context:** TeamFlow — B2B SaaS for performance management (OKR + 1:1 notes + feedback + reviews). $8M ARR, 200 customers (120 SMB, 70 mid-market, 10 enterprise). NRR 105%, gross churn 8%. Considering initiative: **AI-powered 1:1 note summarization**. Discovery cycle.

**Interview plan (initial):**
- **Buyers (4):** VP People at 2 mid-market customers + CPO at 1 enterprise + VP People at 1 prospect
- **End-users (4):** Manager with 8 reports (mid-market), manager with 5 reports (SMB), manager with 12 reports (enterprise), IC on the receiving end
- Duration: 45 min each
- Format: 2-on-1 (lead + conotetaker)

### Interview log — Interview #3 (End-user, Manager, Mid-market)

```markdown
# Interview: E3 (anonymized: Marcus, Engineering Manager)
- **Date:** 2026-04-08
- **Segment:** Mid-market (250 employees, B2B SaaS)
- **Role:** End-user (Engineering Manager, 8 direct reports)
- **Product context:** Active TeamFlow user 18 months, also uses Notion for personal notes, Asana for team tasks
- **Interviewer:** Alex K. (PM), with notetaker Priya S.

## Opening (5 min)
«Marcus, today I want to understand your 1:1 workflow — not about TeamFlow specifically, but about how your day with 1:1s is structured.» [user relaxed, confirmed permission to record]

## Context Building (10 min) — recent specific case

**Q:** «Tell me about the last time you prepared for a 1:1. What happened? Step by step.»

**Marcus:** «Yesterday, with Sarah [report]. Usually I... look in TeamFlow at previous 1:1 notes, then in Slack for the past week to remember what we discussed, then in Asana to look at blockers on her tasks, then I write 3-5 bullet points in TeamFlow as the agenda. That takes about 20-25 minutes. Before I didn't do this — just came and asked "how's it going" — but that was a disaster, we didn't discuss anything concrete.»

**Q:** «And what about action items from previous 1:1s?»

**Marcus:** *[long pause]* «Honestly? I sometimes forget to check. Sometimes TeamFlow shows them in the summary, but if I don't mark them as completed — they just accumulate. I probably have 20-30 open action items, half of which are no longer relevant... [laughs] and generally already forgotten.»

*[Interviewer note: surprise — user acknowledges that action items tracking is weak, but wants automatic reminders]*

## Pain Discovery (15 min)

**Q:** «What was difficult about that case with Sarah? What would you like to change?»

**Marcus:** «The main thing is 25 minutes of prep every week for each of my 8 reports. That's ~3 hours a week just on preparation. Plus 8 hours on the 1:1s themselves. Plus about an hour on follow-up notes. 12 hours a week goes to this. I have a 40-hour week — 30% of my time on 1:1s. Management thinks this is an investment, but honestly I sometimes regret the overhead.»

**Q:** «What takes up the most time that you don't like?»

**Marcus:** «Notes. I type slowly. During the meeting — it's impossible to keep the conversation going + type. After the meeting — it's hard to remember exactly what was said. I often write only headlines and lose context.»

**Q:** «When was the last time you complained about this?»

**Marcus:** *[laughs]* «Honestly? Two days ago. I skipped prep for a 1:1 with a Junior engineer because I was too loaded with code review. The meeting was messy, he was clearly disappointed. I felt guilty — parent-of-the-year syndrome.»

*[Key verbatim quote]*

**Q:** «If you had a magic wand — what would you fix?»

**Marcus:** «Mmm... if I could just speak aloud during the meeting, and the system would write notes itself, highlight action items, and the next week remind me of them — I would pay for that personally. Right now I do something similar through Otter.ai transcription, but that's just a transcript, not a summary. And it's not connected to TeamFlow.»

*[GOLD — this is exactly what we're prototyping]*

**Q:** «Have you tried anything similar?»

**Marcus:** «Otter.ai — transcribes but doesn't summarize in an actionable way. Copy-paste into ChatGPT to summarize — tried it, but it's risky with confidential conversations. I'm not sure where ChatGPT stores data.»

*[Emergent: privacy concern — critical for HR use case]*

## End-user-specific (10 min)

**Q:** «How often do you use TeamFlow? When was the last time?»

**Marcus:** «Daily. Before each 1:1, after each 1:1, weekly for the review section.»

**Q:** «What annoys you? What do you complain about to colleagues?»

**Marcus:** «Action items. Notes — everyone writes them differently. Between managers there's no consistency. My team gets a different experience if they're moved to a different pod.»

*[Organizational pain — great quote for buyer interview]*

**Q:** «What would make your work 30% easier?»

**Marcus:** «Automated note-taking + action item tracking + reminder in a prep email before the next 1:1. This reliably, with privacy guarantees.»

## Wrap-up (5 min)

**Q:** «What should I have asked but didn't?»

**Marcus:** «About cross-manager visibility. How does the skip-level know that my 1:1s are good quality? Right now they're in a vacuum. An aggregate metric would be useful.»

*[Another emergent topic — org-level visibility for skip-levels / VP HR]*

**Q:** «Who else would you recommend talking to?»

**Marcus:** «My skip-level, Jennifer — she would talk about what she does now to understand team health. And probably Sarah (my report) — to hear from her side how she perceives our 1:1s.»

---

## Top Pains (ranked)

1. **45-60 min/week on prep + notes + follow-up per report.** Overall 3-4 hours a week with 8 reports just on prep and note-taking. — evidence: «25 minutes of prep every week for each of my 8 reports»
2. **Notes quality inconsistency** — typing during the meeting → lose conversation, after the meeting → forget context. — evidence: «I type slowly. During the meeting — it's impossible to keep the conversation going + type»
3. **Action items drop rate ~40%** — forgotten, accumulated, never marked complete. — evidence: «I probably have 20-30 open action items, half of which are no longer relevant»
4. **Privacy concern with generic AI tools** (Otter.ai + ChatGPT) — confidential HR conversations in untrusted destinations. — evidence: «I'm not sure where ChatGPT stores data»
5. **Cross-manager inconsistency** — moving between managers = different 1:1 experience. — evidence: «Between managers there's no consistency»

## Top Quotes (verbatim)

> «If I could just speak aloud during the meeting, and the system would write notes itself, highlight action items, and the next week remind me of them — I would pay for that personally.» — on willingness to pay

> «25 minutes of prep every week for each of my 8 reports. That's ~3 hours a week.» — on admin overhead

> «I probably have 20-30 open action items, half of which are no longer relevant.» — on action items drop rate

> «Copy-paste into ChatGPT to summarize — tried it, but it's risky with confidential conversations.» — on privacy

## Surprises / contradictions

- **Surprise:** Marcus already using Otter.ai + ChatGPT workaround (not something initial hypothesis considered). Suggests market education is not needed — workflows are already evolving, just without a safe tool.
- **Contradiction:** says action items tracking is weak, but wants automatic reminders — means he values structure but doesn't have the will to maintain it manually. AI helper can close this gap.
- **Emergent topic:** org-level visibility (skip-level, VP HR view of team 1:1 health) — this is buyer pain, but end-user surfaced it.

## Open questions (for next session)

1. Is willingness-to-pay ($X premium) validated? Marcus said «paid personally» — but his company pays. Check buyer interview for enterprise pricing model.
2. Privacy / compliance: does TeamFlow AI feature need SOC 2 type II + HIPAA for healthcare customers? Check with enterprise customers.
3. Scope: just 1:1s or all meetings? 5 other interviews showed the same pain for team meetings. Risk scope creep.
4. Build vs Buy: OpenAI API works, but data residency issues for EU. Explore Azure OpenAI, Anthropic via AWS Bedrock, or fine-tuned OSS (Llama 3, Mistral).
```

> **Lesson from this interview:** open-ended questions about a specific case ("last time you did X") yield gold. Magic wand question revealed exact feature hypothesis + willingness to pay. Emergent topics (org-level visibility, privacy concern) appeared because the interviewer didn't ask about them directly — gave room for them to surface.
