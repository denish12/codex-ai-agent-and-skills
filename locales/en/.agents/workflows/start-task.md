---
description: Task launch template through the 8-agent pipeline. Use at the beginning of EVERY session.
---

# /start-task

## Steps
1. Load `/pipeline-rules`
2. Read `AGENTS.md`
3. Read `agents/conductor.md`
4. Start the pipeline gate by gate
5. Do not apply code before DEV gate + explicit Approved
6. If a gate fails, run a full Fix Cycle through DEV → REV → OPS → TEST

## First prompt template
```
@AGENTS.md /pipeline-rules

Task: [what to do].
Files: [known files].

Rules:
1. Start with Conductor
2. Every gate: read protocol → complete all sections → full response → Approved
3. Do not apply code before DEV gate + my Approved
4. Fix Cycle = full pass through agents
```
