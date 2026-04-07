---
name: memory
description: Project context management — what to store, how to retrieve it, how to avoid decision conflicts and context loss between sessions.
---

# Skill: Memory (context between sessions)

Do not lose context: decisions, contracts, requirements, results.

**Sections:**
1. [Workflow](#1-workflow)
2. [What to Store](#2-what-to-store)
3. [Storage Strategy](#3-storage-strategy)
4. [Retrieval Patterns](#4-retrieval-patterns)
5. [Conflict Resolution](#5-conflict-resolution)
6. [Session Handoff](#6-session-handoff)

---

## 1. Workflow

```
1. During work:
   ├── Save decisions as they happen (ADR, assumptions)
   ├── Save deliverables (PRD, specs, contracts)
   └── Save issues/findings (bugs, review findings)

2. Before delegating to agent:
   ├── Retrieve relevant context for task
   ├── Include in Context Pack (max 5-15 items)
   └── Check for conflicts with previous decisions

3. Between sessions:
   ├── Session handoff summary (section 6)
   └── Update docs/ with current state
```

---

## 2. What to Store

### By priority

| Priority | What | Where | When to update |
|----------|------|-------|---------------|
| 🔴 **Critical** | PRD | `docs/prd.md` | On change + version |
| 🔴 **Critical** | Architecture + ADR | `docs/architecture.md`, `docs/adr/` | On architecture decision |
| 🔴 **Critical** | API Contracts | `docs/api-contracts.md` | On API change |
| 🟠 **Important** | UX Spec | `docs/ux-spec.md` | On UX change |
| 🟠 **Important** | Data Model | `docs/data-model.md` | On schema change |
| 🟠 **Important** | Review findings (P0) | Review report artifacts | After each review |
| 🟠 **Important** | Test results | Test report artifacts | After each test run |
| 🟠 **Important** | Backlog + Board | `docs/backlog.md`, board in messages | After each gate |
| 🟡 **Useful** | Design decisions | Design intake report | When design changes |
| 🟡 **Useful** | Session summaries | Session handoff docs | End of each session |

---

## 3. Storage Strategy

### Filesystem-based (primary)

```
docs/
├── prd.md                          # PRD (versioned)
├── ux-spec.md                      # UX Spec
├── architecture.md                 # Architecture Doc
├── api-contracts.md                # API Contracts
├── data-model.md                   # Data Model
├── backlog.md                      # Product Backlog
├── adr/
│   ├── ADR-001-database-choice.md  # Architecture Decision Records
│   ├── ADR-002-design-system.md
│   └── ...
├── reviews/
│   ├── rev-01-settings-api.md      # Review reports
│   └── ...
├── tests/
│   ├── test-plan-v1.md             # Test plans
│   ├── test-report-iter1.md        # Test reports
│   └── ...
└── sessions/
    ├── session-1-handoff.md        # Session summaries
    └── ...
```

### Naming conventions

| Type | Format | Example |
|------|--------|---------|
| ADR | `ADR-NNN-short-title.md` | `ADR-001-mongodb-choice.md` |
| Review | `rev-NN-scope.md` | `rev-01-settings-api.md` |
| Test report | `test-report-iterN.md` | `test-report-iter1.md` |
| Session | `session-N-handoff.md` | `session-3-handoff.md` |

---

## 4. Retrieval Patterns

### Before delegating task to agent

```
1. Identify scope of task (e.g., "implement settings API")

2. Retrieve relevant documents:
   ├── PRD → user stories for this feature
   ├── UX Spec → screen specs for this feature
   ├── API Contracts → endpoints for this feature
   ├── Architecture → layer rules, tech decisions
   ├── ADRs → relevant decisions
   └── Previous review findings → avoid re-introducing issues

3. Include in Context Pack:
   ├── MAX 5-15 items (focus on relevant)
   ├── Full paths to files
   └── Key excerpts if files are long
```

### Retrieval commands

```bash
# Find relevant documents
find_by_name: Pattern="*.md" SearchDirectory="docs/"

# Find ADRs
find_by_name: Pattern="ADR-*" SearchDirectory="docs/adr/"

# Search for specific topic
grep_search: Query="settings" SearchPath="docs/"

# Find previous review findings
grep_search: Query="P0" SearchPath="docs/reviews/"
```

---

## 5. Conflict Resolution

### When new proposal contradicts existing decision

```markdown
### ⚠️ CONFLICT DETECTED

**Topic:** <what's in conflict>
**Existing decision:** ADR-001 — <summary> (date: YYYY-MM-DD)
**New proposal:** <what's being proposed>

**Impact if changed:**
- <downstream effects on architecture>
- <downstream effects on existing code>
- <downstream effects on contracts>

**Options:**
1. Keep existing decision (no change)
2. Update decision (create new ADR, update affected docs)
3. Defer to user for decision

**Recommendation:** <1/2/3 with rationale>
```

### Rules

| Rule | Explanation |
|------|------------|
| ADR decisions are immutable without new ADR | Can't silently change |
| API contracts require version bump | Breaking changes need explicit approval |
| PRD scope changes need user approval | Only user can expand/reduce scope |
| UX Spec changes need UX re-review | Design changes cascade to dev |

---

## 6. Session Handoff

### At end of session, create summary:

```markdown
# Session N Handoff

**Date:** YYYY-MM-DD
**Duration:** ~Xh
**Conversation ID:** <id>

## What was accomplished
- [x] <completed task 1>
- [x] <completed task 2>
- [ ] <started but not finished>

## Current state
| Gate | Status | Notes |
|------|:------:|-------|
| PM | ☑ | PRD approved |
| UX | ☑ | UX Spec approved |
| ARCH | ☑ | Architecture approved |
| DEV | ⏳ | Settings API done, UI in progress |
| REV | ☐ | — |

## Key artifacts updated
| Artifact | Path | Change |
|----------|------|--------|
| PRD | docs/prd.md | No change |
| Settings schema | server/models/Settings.js | Created |

## Blockers / Open items
- <blocker 1>
- <open question 1>

## Next session should
1. Continue DEV: Settings UI
2. Then: REV gate
3. Then: OPS + TEST
```

---

## See also
- `$handoff` — context pack for delegating
- `$board` — project board (tracks progress)
- `$adr-log` — architecture decision records
- `$gates` — gate definitions
