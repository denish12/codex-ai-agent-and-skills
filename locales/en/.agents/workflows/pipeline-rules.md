---
description: Absolute development pipeline rules. MUST NOT BE BROKEN.
---

# Pipeline Rules

The pipeline must not be skipped.

## Pipeline
TEST → PM → UX → ARCH → DEV → REV → OPS → TEST

## Mandatory actions at every gate
1. Read `agents/<role>.md`
2. Follow that role protocol and its skills
3. Produce deliverable + Handoff Envelope
4. Present result to the user
5. Wait for explicit `Approved` before moving forward

## Forbidden
- Fast-tracking gates
- Writing code before the required gates are complete
- Skipping mandatory protocol sections
- Treating generic confirmation as permission to skip gates
- Claiming a protocol was read when it was not
