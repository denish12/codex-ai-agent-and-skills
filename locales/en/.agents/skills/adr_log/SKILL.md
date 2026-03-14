---
name: adr_log
description: Record key Architectural Decision Records (ADR) with trade-offs — Pros/Cons/Alternatives/Decision, status and date.
---

# Skill: ADR Log

Format and examples for Architectural Decision Records.

**Sections:**
1. [When to create an ADR](#1-when-to-create)
2. [Format (mandatory)](#2-format)
3. [Naming Convention](#3-naming)
4. [ADR Examples](#4-examples)
5. [Decision Matrix](#5-decision-matrix)
6. [Lifecycle](#6-lifecycle)
7. [Anti-patterns](#7-anti-patterns)

---

## 1. When to create an ADR

Create an ADR for **every non-trivial choice** — if in 6 months someone asks "why is it like this?":

| Category | Examples |
|-----------|---------|
| **Database** | DBMS choice, embed vs reference, sharding strategy |
| **Auth** | JWT vs sessions, cookie vs header, OAuth flow |
| **API Design** | REST vs GraphQL, versioning, error format |
| **Architecture** | Monolith vs microservices, layering, module boundaries |
| **Infrastructure** | Docker vs K8s, CDN, reverse proxy, HTTPS strategy |
| **Integration** | Wix SDK choice, payment provider, email service |
| **State** | Zustand vs Redux vs Context, server state (React Query) |
| **Styling** | CSS Modules vs Tailwind vs styled-components |
| **Testing** | Test runner, coverage thresholds, mock strategy |
| **Error handling** | Error format, retry policy, circuit breaker |

---

## 2. Format (mandatory)

```markdown
# ADR-XXX: <Short name of the decision>

## Status
Proposed | Accepted | Deprecated | Superseded by ADR-YYY

## Date
YYYY-MM-DD

## Context
<Why is this needed? What are the constraints? What hurts?>
- Current situation
- Requirements / constraints
- What happens if not resolved

## Decision
<What was chosen and exactly how we will do it>

## Consequences

### Positive
- ...
- ...

### Negative
- ...
- ...

### Risks
- ... (and how we mitigate them)

## Alternatives Considered

### Option A: <name>
- ✅ Pros: ...
- ❌ Cons: ...
- 💡 Why rejected: ...

### Option B: <name>
- ✅ Pros: ...
- ❌ Cons: ...
- 💡 Why rejected: ...

## References
- PRD section / UX Spec / ticket
- External docs / articles
- Related ADRs: ADR-XXX
```

---

## 3. Naming Convention

| Rule | Example |
|---------|--------|
| Number: 3-digit, with leading zeros | ADR-001, ADR-042 |
| Name: action + object | "Use MongoDB as primary database" |
| File: `ADR-XXX-kebab-case.md` | `ADR-001-use-mongodb.md` |
| Directory: `docs/architecture/adr/` | — |
| Chronological order | New ADRs = next number |

---

## 4. ADR Examples

### ADR-001: Use MongoDB as primary database

```markdown
# ADR-001: Use MongoDB as primary database

## Status
Accepted

## Date
2025-06-15

## Context
The application needs persistent storage for tenants, settings,
and products. Requirements:
- Flexible schema (settings structure varies per configuration)
- Low operational overhead (small team)
- Good Node.js ecosystem support
- No complex joins needed (data is per-tenant)

## Decision
Use MongoDB 7 with Mongoose ODM.
- Single database, collections: tenants, settings, products
- Hosted via Docker (dev) / MongoDB Atlas (production)

## Consequences

### Positive
- Flexible schema fits varying template settings
- Excellent Mongoose ecosystem (validators, middleware, lean queries)
- Easy Docker setup for local development
- Native JSON — minimal serialization overhead

### Negative
- No ACID transactions across collections (need replica set)
- No joins — must denormalize or do application-level joins
- Schema discipline required (strict mode + Zod validation)

### Risks
- Schema drift without validation → mitigated by strict: 'throw'
- 16MB document limit → mitigated by reference strategy for unbounded arrays

## Alternatives Considered

### Option A: PostgreSQL
- ✅ ACID, complex queries, strong typing
- ❌ Schema migrations more complex for flexible settings
- ❌ JSON column less ergonomic than native MongoDB documents
- 💡 Overkill for current use case (no joins, no complex queries)

### Option B: SQLite
- ✅ Zero infrastructure, file-based
- ❌ No concurrent writes in Docker
- ❌ No production scaling path
- 💡 Too limiting for multi-service architecture

## References
- PRD: Data requirements section
- Related: ADR-002 (Mongoose strict mode)
```

---

### ADR-018: Use Wix ImageViewer for dashboard images

```markdown
# ADR-018: Use Wix ImageViewer for dashboard images

## Status
Accepted

## Date
2025-12-20

## Context
Dashboard needs to display template preview images.
The app runs inside Wix iframe where standard <img> tags may have
CORS issues with Wix media URLs (wixstatic.com).

## Decision
Use WDS (Wix Design System) ImageViewer component for all
dashboard images instead of native <img> tags.

## Consequences

### Positive
- Handles Wix media URLs natively (no CORS issues)
- Consistent with Wix design system (visual parity)
- Built-in loading states and error handling

### Negative
- Dependency on WDS component library
- Different API than standard <img> (onLoad, src format)

## Alternatives Considered

### Option A: Native <img> with proxy
- ✅ Simple, no dependency
- ❌ CORS errors with wixstatic.com
- ❌ Need custom proxy endpoint
- 💡 Unnecessary complexity

## References
- Bug: Dashboard images not loading (blank src)
- Wix Design System docs: ImageViewer component
```

---

### ADR-019: CSS overflow containment for popup templates

```markdown
# ADR-019: CSS overflow containment for popup

## Status
Accepted

## Date
2025-12-20

## Context
Popup templates render inside Wix embedded script.
CSS overflow from popup elements leaks outside the container,
causing scrollbars on the Wix page.

## Decision
Apply containment strategy:
1. `overflow: hidden` on popup container
2. `contain: layout style` on root widget element
3. `box-sizing: border-box` on all popup children

## Consequences

### Positive
- No visual leaking outside container
- No unexpected scrollbars on host page
- Each template isolated

### Negative
- Must test each template for clipping issues
- Shadow effects near edges may be cut off

## Alternatives Considered

### Option A: Shadow DOM
- ✅ Complete style isolation
- ❌ Complex to implement for dynamic templates
- ❌ Limited shadow DOM support for legacy browsers
- 💡 Overkill for current 3-template scope

## References
- Bug: Scrollbar appearing on Wix site when popup opens
- Related: ADR-018 (ImageViewer)
```

---

## 5. Decision Matrix

For complex decisions with 3+ alternatives, use a weighted matrix:

```markdown
## Decision Matrix: State Management

### Criteria (weighted)
| Criteria | Weight | Description |
|----------|--------|-------------|
| Simplicity | 3 | Learning curve, boilerplate |
| Performance | 2 | Re-render efficiency |
| DevTools | 1 | Debugging experience |
| Ecosystem | 1 | Community, plugins |
| Bundle size | 2 | KB added |

### Scoring (1-5, higher = better)

| Option | Simplicity (×3) | Performance (×2) | DevTools (×1) | Ecosystem (×1) | Bundle (×2) | **Total** |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|
| **Zustand** | 5 (15) | 4 (8) | 4 (4) | 3 (3) | 5 (10) | **40** |
| Redux Toolkit | 3 (9) | 4 (8) | 5 (5) | 5 (5) | 3 (6) | **33** |
| Context + useReducer | 4 (12) | 2 (4) | 3 (3) | 5 (5) | 5 (10) | **34** |
| Jotai | 4 (12) | 5 (10) | 3 (3) | 2 (2) | 5 (10) | **37** |

### Decision
Zustand wins (40 points). Best simplicity + performance + bundle size.
```

---

## 6. Lifecycle

```
Proposed → Accepted → [Active use]
                         ↓
                    Deprecated (if better solution found)
                         ↓
                    Superseded by ADR-YYY
```

| Status | Meaning |
|--------|---------|
| **Proposed** | Decision proposed, waiting for review |
| **Accepted** | Decision approved, is applied |
| **Deprecated** | Decision is obsolete, but code still uses it |
| **Superseded** | Replaced by another ADR (provide link) |

### Supersedes/Superseded-by

```markdown
# ADR-025: Migrate from CSS Modules to Tailwind

## Status
Accepted (Supersedes ADR-008)

---

# ADR-008: Use CSS Modules for component styling

## Status
Superseded by ADR-025
```

---

## 7. Anti-patterns

| ❌ Anti-pattern | ✅ Solution |
|----------------|-----------|
| ADR without Alternatives | Always minimum 2 alternatives |
| "We chose X because it's popular" | Specific Pros/Cons according to project criteria |
| 500-line ADR | Short and specific: max 50-80 lines |
| ADR retroactively (a month later) | Create ADR at the moment of making the decision |
| No cross-references | Links to PRD, related ADRs, tickets |
| No Negative consequences | Every decision has trade-offs |
| "Alternatives: none" | If there are no alternatives — reconsider the scope of the question |

---

## Deliverables

| Artifact | Format | Where |
|---------|--------|-----|
| ADR record | Markdown (format above) | `docs/architecture/adr/ADR-XXX-name.md` |
| ADR index | Table of contents | `docs/architecture/adr/README.md` |

### ADR Index format

```markdown
# Architecture Decision Records

| # | Title | Status | Date |
|---|-------|--------|------|
| ADR-001 | Use MongoDB as primary database | Accepted | 2025-06-15 |
| ADR-008 | Use CSS Modules for styling | Superseded by ADR-025 | 2025-07-01 |
| ADR-018 | Use WDS ImageViewer | Accepted | 2025-12-20 |
| ADR-019 | CSS overflow containment | Accepted | 2025-12-20 |
| ADR-025 | Migrate to Tailwind | Accepted | 2026-01-15 |
```

---

## See also
- `$architecture_doc` — Architecture Document (ADR decisions referenced inline)
- `$current_state_analysis` — audit before new ADRs
- `$system_design_checklist` — design completeness checklist
