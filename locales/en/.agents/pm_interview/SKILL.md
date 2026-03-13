---
name: pm_interview
description: Structured interview/documentation review — collect goals, audience, MVP, constraints, integrations, and success criteria, so that can was write PRD.
---

#Skill: PM Interview/Discovery

Collect the minimally sufficient information for a PRD.

**Sections:**
1. [Workflow](#1-workflow)
2. [Question Bank](#2-questions)
3. [Priority & Assumptions](#3-priority)
4. [Example: Smart Cart Rescue](#4-example)
5. [Output Template](#5-output)

---

## 1. Workflow

```
1. Read that, what already is:
   ├── User brief / idea description
   ├── Existing code / README
   └── Previous documents (if is)

2. Extract facts (what already known)

3. Determine gaps (what needed clarify)
   └── Use Question Bank (section 2)

4. Prioritize questions:
   ├── 🔴 Blocking — without the answer you cannot write the PRD
   ├── 🟠 Important — affects on PRD, but can assume
   └── 🟡 Nice-to-know — can postpone

5. Ask questions (only blocking + important)
   └── The rest → assumptions with marker ASSUMPTION

6. Form Interview Summary (section 5)
   └── Pass in → $pm_prd
```

### When Not needed interview

| Situation | Action |
|----------|---------|
| The user provided a detailed brief with answers to everything | Skip → immediately $pm_prd |
| Iteration over existing PRD | Minimum interview (only new questions) |
| Bugfix / patch | Not needed |

---

## 2. Question Bank

### A) Product and users

| # | Question | Why | Priority |
|---|--------|-------|:--------:|
| Q-01 | Who goal users? | Defines user stories and UX | 🔴 |
| Q-02 | What is the main pain point/task? | Core value proposition | 🔴 |
| Q-03 | How does the user solve this now? | Competitive context | 🟠 |
| Q-04 | Which roles and permission differences are there? | Auth/ACL scope | 🔴 |

### B) MVP and boundaries

| # | Question | Why | Priority |
|---|--------|-------|:--------:|
| Q-05 | What is mandatory in the MVP (3-7 items)? | Scope control | 🔴 |
| Q-06 | What definitely does not belong here (out of scope)? | Prevent scope creep | 🔴 |
| Q-07 | Which scenarios most common/critical? | Priority of user flows | 🟠 |

### C) Success and metrics

| # | Question | Why | Priority |
|---|--------|-------|:--------:|
| Q-08 | How will we know that the product is successful? | Success criteria | 🟠 |
| Q-09 | Are there KPIs (speed, conversion, retention)? | Measurable goals | 🟡 |

### D) Data and integrations

| # | Question | Why | Priority |
|---|--------|-------|:--------:|
| Q-10 | Which data store? | Data model scope | 🔴 |
| Q-11 | Needed whether external integrations? | Architecture dependencies | 🔴 |
| Q-12 | There is whether external API and constraints? | API constraints | 🟠 |

### E) NFR (non-functional)

| # | Question | Why | Priority |
|---|--------|-------|:--------:|
| Q-13 | There is whether requirements by security/compliance? | Security scope | 🟠 |
| Q-14 | Expected load? | Scaling strategy | 🟡 |
| Q-15 | Localization / languages? | i18n scope | 🟡 |

### F) Technologies and deployment

| # | Question | Why | Priority |
|---|--------|-------|:--------:|
| Q-16 | Preferred stack? | Tech decisions | 🟠 |
| Q-17 | Where are we deploying? | Infrastructure | 🟠 |
| Q-18 | Needed whether admin panel? | Additional scope | 🟡 |

---

## 3. Priority & Assumptions

### Question minimization rule

| Situation | Action |
|----------|---------|
| The response is critical for architecture/UX | 🔴 Mandatory ask |
| You can move forward with a safe assumption | 🟠 Assume + mark ASSUMPTION |
| Can postpone to PRD review | 🟡 Add in Open Questions |

### Assumption format

```markdown
**ASSUMPTION-XX:** <Statement>
- Basis: <Why this is safe to assume>
- Risk: Low / Medium / High
- Confirm to: <milestone>
```

---

## 4. Example: Smart Cart Rescue

```markdown
# Interview Summary: Smart Cart Rescue

## Facts (from user brief)
- Wix App — andbandoned cart recovery via popup
- Dashboard for configuring popup widgets
- Multiple design templates (Glassmorphism, Neo-Brutalism, Minimal)
- Coupon management (CRUD)
- Timer countdown for urgency

## Questions Asked
| # | Question | Answer | Status |
|---|----------|--------|:------:|
| Q-01 | Target users? | Wix store owners | ✅ |
| Q-04 | Roles? | Single role: Site Owner | ✅ |
| Q-05 | MVP features? | Settings, Coupons, Widget, Install | ✅ |
| Q-06 | Out of scope? | Analytics, A/B testing, multi-language | ✅ |
| Q-11 | Integrations? | Wix Platform (OAuth, Webhooks) | ✅ |

## Assumptions
- ASSUMPTION-01: Desktop-only (Wix Editor = desktop) → Low risk
- ASSUMPTION-02: English only for MVP → Low risk
- ASSUMPTION-03: No payment integration (free app) → Low risk
```

---

## 5. Output Template

```markdown
# PM Interview Summary

**Date:** YYYY-MM-DD
**Interviewer:** Product Manager Agent
**Source:** <user brief / existing docs / conversation>

## Facts (confirmed)
| # | Fact | Source |
|---|------|--------|
| F-01 | ... | User brief |
| F-02 | ... | README.md |

## Questions & Answers
| # | Question | Priority | Answer | Status |
|---|----------|:--------:|--------|:------:|
| Q-01 | ... | 🔴 | ... | ✅ Answered |
| Q-05 | ... | 🔴 | ... | ✅ Answered |
| Q-09 | ... | 🟡 | — | ASSUMED |

## Assumptions
| ID | Assumption | Risk | Confirm by |
|----|-----------|:----:|-----------|
| ASSUMPTION-01 | ... | Low | MVP review |

## Open Questions (deferred)
| # | Question | Why deferred | Address at |
|---|----------|-------------|-----------|
| Q-14 | Expected load? | Not critical for MVP | Pre-launch |

## Next Step
→ Proceed to $pm_prd
```

---

## See also
- `$pm_prd` — PRD (output of interview)
- `$pm_backlog` — Backlog decomposition
- `$ux_discovery` — UX-specific discovery