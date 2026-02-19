---
name: memory
description: Managing project context through a vector database/MCP: what to save, how to retrieve, how to avoid decision conflicts and loss of context.
---

#Skill: Memory/Vector DB (optional)

## Goal
Don’t lose context between sessions and iterations: decisions, contracts, requirements, test results.

## What to save
- PRD and changes (versions/dates)
- UX Spec and changes
- Architecture + ADR (key solutions)
- API contracts and data schemas
- DoD standards and gates
- Review results (P0/P1/P2) and fixes
- Test plans/reports and bug lists

## Retrieval before delegation
Before issuing a task to an agent:
- find relevant fragments by keys: `feature`, `module`, `endpoint`, `decision`, `test`, `bug`
- include only the most important things in the Context Pack (5–15 points maximum)

## Conflicts
If the new proposal contradicts the saved solution:
- mark: `Conflict: ...`
- list: old decision, new proposal, consequences
- submit for approval to the user/conductor