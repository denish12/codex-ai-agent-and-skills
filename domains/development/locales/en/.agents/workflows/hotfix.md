---
description: Launch the minimal 2-gate pipeline for trivial fixes (hotfix). Use for trivial fixes with blast radius ≈ 0.
---

# /hotfix — Launch Hotfix Pipeline (2 gates)

> 🟡 **Mode:** Hotfix — for trivial fixes with minimal risk.
> Full pipeline: `/start-task`. Bugfix (more serious): `/bugfix`.

## When to use

- Typos in text/code
- CSS fixes (color, padding, font size)
- Single-line logic fix
- Copy-paste error
- Blast radius ≈ 0 (affects 1–2 files, does not change contracts)

## Do NOT use if

- Affects > 2 files → `/bugfix`
- Changes API contract → `/bugfix` or `/start-task`
- Changes UI layout / adds screens → `/start-task`
- Unsure → ask the user

## Step 0: Load rules

Execute `/pipeline-rules` — read the rules BEFORE starting work.

## Step 1: CONDUCTOR — Classification

1. Execute `view_file` on `agents/conductor.md`
2. Confirm the task = hotfix (per Decision Tree: blast radius ≈ 0, 1–2 files)
3. Create Mini Checklist:
```
[ ] HF-DEV-01   Fix + test + service restart (if applicable)
[ ] HF-VERIFY   Self-check + GO/NO-GO
```
4. `notify_user` → wait for **Approved**

## Step 2: DEV+TEST — Fix and self-verification

1. Execute `view_file` on `agents/senior_full_stack.md`
2. TDD:
   - RED: test reproducing the issue (if applicable)
   - GREEN: minimal fix
   - REFACTOR: if necessary
3. JSDoc on modified functions
4. Restart affected services if applicable
5. Self-verification:
   - Does the fix work?
   - Do tests pass?
   - No regressions?
6. Verdict: **GO ✅ / NO-GO ❌**
7. `notify_user` → wait for **Approved**

---

## When in doubt

If during work it becomes clear that the task is more complex than a hotfix:
> ⚠️ "Task turned out to be more complex than a hotfix. Recommend switching to /bugfix."

Switching — only with user Approved.

---

## Prompt template

```
@AGENTS.md /hotfix

What to fix: [description, 1 sentence].
File: [specific file].
```
