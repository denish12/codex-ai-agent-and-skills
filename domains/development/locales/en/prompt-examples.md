# Prompt Examples for Pipeline Launch

> Copy the relevant prompt, replace placeholders with your data, paste into chat.

---

## 🔵 Full Pipeline (`/start-task`) — new feature / refactoring

### New Feature
```
@AGENTS.md Task:
Implement [feature description].
Full pipeline!

SESSION RULES:
1. Each gate: view_file agents/<role>.md → view_file on EVERY SKILL.md from the protocol skills → deliverable → notify_user → wait for "Approved"
2. Skipping a gate or skill = BLOCKER
3. Do not proceed without Approved
```

### Refactoring
```
@AGENTS.md Task:
Refactor [description: what exactly we're refactoring and why].
Full pipeline!

SESSION RULES:
1. Each gate: view_file agents/<role>.md → view_file on EVERY SKILL.md from the protocol skills → deliverable → notify_user → wait for "Approved"
2. Skipping a gate or skill = BLOCKER
3. Do not proceed without Approved
```

---

## 🟢 Bugfix (`/bugfix`) — bug fix (4 gates)

### Standard Bug
```
@AGENTS.md Task:
Fix bug: [bug description, reproduction steps, expected vs actual behavior].
Bugfix pipeline!

SESSION RULES:
1. Each gate: view_file agents/<role>.md → view_file on EVERY SKILL.md from the protocol skills → deliverable → notify_user → wait for "Approved"
2. Skipping a gate or skill = BLOCKER
3. Do not proceed without Approved
```

### Bug with File References
```
@AGENTS.md Task:
@[path/to/file1] @[path/to/file2]
Bug: [description]. Root cause likely in the referenced files.
Bugfix pipeline!

SESSION RULES:
1. Each gate: view_file agents/<role>.md → view_file on EVERY SKILL.md → deliverable → notify_user → wait for "Approved"
2. Skipping a gate = BLOCKER
```

---

## 🟡 Hotfix (`/hotfix`) — minor fix (2 gates)

### Typo / CSS / Single Line
```
@AGENTS.md Task:
Hotfix: [fix description, e.g.: "fix typo in heading" or "change button color from #333 to #555"].
Hotfix pipeline!

SESSION RULES:
1. Each gate: view_file agents/<role>.md → view_file on EVERY SKILL.md → deliverable → notify_user → wait for "Approved"
2. Skipping a gate = BLOCKER
```

---

## 🎨 Design Only (Google Stitch)

### UI Screen Generation
```
@AGENTS.md Task:
Create UI screens for [description: which screens, which application].
Use Google Stitch via $google-stitch-skill.

SESSION RULES:
1. view_file agents/ux_ui_designer.md → view_file $google-stitch-skill → deliverable → notify_user → wait for "Approved"
```

---

## 📄 Documentation Only

### Document Adaptation / Creation
```
@AGENTS.md Task:
[Documentation task description, e.g.: "adapt files X, Y, Z for global use"].
Bugfix pipeline! (or Full pipeline — depending on complexity)

SESSION RULES:
1. Each gate: view_file agents/<role>.md → view_file on EVERY SKILL.md → deliverable → notify_user → wait for "Approved"
2. Skipping a gate = BLOCKER
```

---

## ⚡ Gate Transitions (User Responses)

### Approve and Move to Next Gate
```
Approved. Next gate: agents/<role>.md. Skills: view_file required. Full format.
```

### Approve with Trigger (Wix / Shopify)
```
Approved. TEST gate. Wix.
```

### Reject / Return for Rework
```
NO-GO. Fix: [list of issues]. Return to [gate] gate.
```

---

## 🔧 Utility Prompts

### Check Status
```
Show the current Master Checklist and status of all gates.
```

### Run a Specific Agent
```
Run agents/<role>.md. Context: [brief description]. Skills: view_file required.
```

### Update Version
```
Update the version in package.json to X.Y.Z
```

---

## 📝 Tips for Writing Prompts

1. **Always start with `@AGENTS.md`** — this loads the agent system
2. **Reference files with `@[path]`** — the agent immediately sees the context
3. **Name the pipeline mode** — "Full pipeline!", "Bugfix pipeline!", "Hotfix pipeline!"
4. **Add SESSION RULES** — this guarantees protocol compliance
5. **Write "Approved" explicitly** — without this word the agent will not proceed to the next gate
6. **Be specific** — the more precise the description, the better the result
