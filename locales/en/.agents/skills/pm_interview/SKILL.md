---
name: pm_interview
description: Structured interview/documentation review — gather goals, audience, MVP, constraints, integrations, and success criteria to write a PRD.
---

# Skill: PM Interview / Discovery

Gather the minimum sufficient information for a PRD.

**Sections:**
1. [Workflow](#1-workflow)
2. [Question Bank](#2-questions)
3. [Priority & Assumptions](#3-priority)
4. [Output Template](#5-output)

---

## 1. Workflow

```
1. Read what is already available:
   ├── User brief / idea description
   ├── Existing code / README
   └── Previous documents (if any)

2. Extract facts (what is already known)

3. Identify gaps (what needs clarification)
   └── Use Question Bank (section 2)

4. Prioritize questions:
   ├── 🔴 Blocking — cannot write PRD without an answer
   ├── 🟠 Important — affects PRD, but can be assumed
   └── 🟡 Nice-to-know — can be deferred

5. Ask questions (only blocking + important)
   └── For the rest → make assumptions marked ASSUMPTION

6. Generate Interview Summary (section 5)
   └── Pass to → $pm_prd
```

### When an interview is NOT needed

| Situation | Action |
|----------|---------|
| User provided a detailed brief with answers to everything | Skip → go straight to $pm_prd |
| Iteration on an existing PRD | Minimal interview (only new questions) |
| Bugfix / patch | Not needed |

---

## 2. Question Bank

### A) Product and users

| # | Question | Purpose | Priority |
|---|--------|-------|:--------:|
| Q-01 | Who are the target users? | Determines user stories and UX | 🔴 |
| Q-02 | What is the main pain/problem? | Core value proposition | 🔴 |
| Q-03 | How does the user solve this now? | Competitive context | 🟠 |
| Q-04 | What are the roles and permission differences? | Auth/ACL scope | 🔴 |

### B) MVP and boundaries

| # | Question | Purpose | Priority |
|---|--------|-------|:--------:|
| Q-05 | What is mandatory for the MVP (3-7 items)? | Scope control | 🔴 |
| Q-06 | What is definitely NOT included (out-of-scope)? | Prevent scope creep | 🔴 |
| Q-07 | What are the most frequent/critical scenarios? | Priority of user flows | 🟠 |

### C) Success and metrics

| # | Question | Purpose | Priority |
|---|--------|-------|:--------:|
| Q-08 | How do we know the product is successful? | Success criteria | 🟠 |
| Q-09 | Are there KPIs (speed, conversion, retention)? | Measurable goals | 🟡 |

### D) Data and integrations

| # | Question | Purpose | Priority |
|---|--------|-------|:--------:|
| Q-10 | What data do we store? | Data model scope | 🔴 |
| Q-11 | Are external integrations needed? | Architecture dependencies | 🔴 |
| Q-12 | Are there external APIs and constraints? | API constraints | 🟠 |

### E) NFR (non-functional)

| # | Question | Purpose | Priority |
|---|--------|-------|:--------:|
| Q-13 | Are there security/compliance requirements? | Security scope | 🟠 |
| Q-14 | Expected load? | Scaling strategy | 🟡 |
| Q-15 | Localization / languages? | i18n scope | 🟡 |

### F) Technologies and deployment

| # | Question | Purpose | Priority |
|---|--------|-------|:--------:|
| Q-16 | Preferred stack? | Tech decisions | 🟠 |
| Q-17 | Where do we deploy? | Infrastructure | 🟠 |
| Q-18 | Is an admin panel needed? | Additional scope | 🟡 |

---

## 3. Priority & Assumptions

### Rule for minimizing questions

| Situation | Action |
|----------|---------|
| Answer is critical for architecture/UX | 🔴 Must ask |
| Can proceed with a safe assumption | 🟠 Assume + mark ASSUMPTION |
| Can be deferred to PRD review | 🟡 Add to Open Questions |

### Assumption format

```markdown
**ASSUMPTION-XX:** <Statement>
- Basis: <Why this is safe to assume>
- Risk: Low / Medium / High
- Confirm by: <milestone>
```

---


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
