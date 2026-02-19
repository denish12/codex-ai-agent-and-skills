---
name: pm_interview
description: Structured interview/documentation analysis: collect goals, audience, MVP, limitations, integrations and success criteria so that you can write a PRD.
---

#Skill: PM Interview/Discovery

## Goal
Quickly find out the minimum sufficient information for PRD and subsequent development.

## When to use
- At the beginning of the project
- When the user gives scattered input
- When direction/priorities change

## Exit
- Summary of introductory points (bullet points)
- List of questions (3–12), sorted by importance
- Explicit assumptions (if made)

## Skeleton interview (ask only relevant ones)
### A) Product and users
- Who are the target users?
- What is the main pain/task?
- How does the user solve this now?
- What are the user roles and differences in rights?

### B) MVP and boundaries
- What is required in an MVP (3–7 points)?
- What exactly is NOT included (out-of-scope)?
- What are the most common/critical scenarios?

### C) Success and metrics
- How will we understand that the product is successful? (metrics/OKR)
- Are there KPIs for speed, conversion, retention?

### D) Data and integrations
- What data do we store? (profile, content, transactions)
- Do you need integrations (payments, email/SMS, CRM, SSO, analytics)?
- Are there external APIs and restrictions?

### E) Non-functional requirements (NFR)
- Security/compliance (PII, GDPR, SOC2, etc.)?
- Performance (expected load)?
- Availability (SLA)?
- Localization/languages?

### F) Technologies and deployment
- Preferred stack? If not, offer options.
- Where will we deploy? (Vercel/Docker/AWS/…)
- Do you need an admin panel?

## Question minimization rule
- If you can move forward with a safe assumption, make an assumption and mark it.
- If the answer is critical for architecture/UX, ask a question.
- If the question can be postponed until PRD, add it to the open questions section.