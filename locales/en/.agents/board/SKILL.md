---
name: board
description: Project Board management: creating tasks with ID, statuses ☐/⏳/☑/⚠️, updates after each step, visible checklist in every message from the conductor.
---

# Skill: Project Board (conductor's checklist)

## Goal
Provide transparent progress control: who is doing what, what is being blocked, what’s next.

## When to use
- Immediately after kickoff
- After every response from any agent
- When new requirements/bugs/comments appear

## ID Rules
- Prefixes: `PM-xx`, `UX-xx`, `ARCH-xx`, `DEV-xx`, `REV-xx`, `TEST-xx`
- Numbering: 01, 02, 03…
- One task = one verifiable result (artifact/verification).

## Statuses
- `☐` not started
- `⏳` at work
- `☑` ready (there is an artifact + check)
- `⚠️` blocked (required: reason + withdrawal owner)

## Algorithm
1) Create a primary Project Board: 1–3 tasks per role for the next iteration.
2) Update statuses at every step:
   - if the agent started - `⏳`
   - if you submitted an artifact and it is accepted - `☑`
   - if input/solution is needed - `⚠️`
3) With `⚠️` add the line “Blocker” to the report and the specific next step.
4) In each conductor’s message, display the Project Board as the first block.

## Board template (copy as is)
###Project Board
- [ ] (PM-01) ... — Owner: PM — Status: ☐/⏳/☑/⚠️
- [ ] (UX-01) ... — Owner: UX — Status: ☐/⏳/☑/⚠️
- [ ] (ARCH-01) ... — Owner: ARCH — Status: ☐/⏳/☑/⚠️
- [ ] (DEV-01) ... — Owner: DEV — Status: ☐/⏳/☑/⚠️
- [ ] (REV-01) ... — Owner: REV — Status: ☐/⏳/☑/⚠️
- [ ] (TEST-01) ... — Owner: TEST — Status: ☐/⏳/☑/⚠️