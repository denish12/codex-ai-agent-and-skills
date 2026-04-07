---
name: current-state-analysis
description: Analysis of the current repository architecture — conventions, patterns, tech debt, scaling bottlenecks, security risks, and consistency.
---

# Skill: Current State Analysis

How to audit a repository before making major architectural decisions or refactoring.

**Sections:**
1. [When to use](#1-when-to-use)
2. [Workflow](#2-workflow)
3. [Analysis Areas](#3-analysis-areas)
4. [Output Template](#4-output)

---

## 1. When to use

The Architect or Senior Full Stack agent uses this skill:
- **During Discovery:** When taking over an existing repository.
- **Before major refactoring:** To understand the baseline.
- **Before system design:** To identify constraints and existing patterns that shouldn't be duplicated.

---

## 2. Workflow

```
1. Get the repository structure (find_by_name, ls)
2. Identify the technology stack (package.json, go.mod, dockerfile)
3. For each analysis area (Architecture, Data, UI, DX):
   a. Sample 3-5 representative files
   b. Look for consistency (e.g., are there 3 ways to fetch data?)
   c. Identify red flags (hardcoded secrets, missing auth, god objects)
4. Synthesize the findings into the Analysis Report
5. Propose immediate remediation steps (if requested)
```

---

## 3. Analysis Areas

### 3.1 Architecture & Structure

Check how the code is organized.

| What to look for | Tooling / Pattern | Good | Bad |
|------------------|-------------------|------|-----|
| **Module boundaries** | `find_by_name`, structure | By feature (`features/products`) or layer (`src/controllers`) | Flat `src/` with 50 files, or `misc/` folder |
| **Data flow** | `grep "fetch("` or `grep "axios"` | Through explicit services/API clients | Directly from UI components |
| **State management** | `package.json`, React Context | Zustand, RTK Query, or well-scoped Context | Prop drilling 5 levels deep, redundant global state |
| **Routing** | React Router / Next.js app dir | Centralized, lazy loaded where needed | Scattered `<Route>` definitions, no 404 handling |

### 3.2 Code Quality & Consistency

Check if the team is writing code the same way.

| What to look for | Tooling / Pattern | Good | Bad |
|------------------|-------------------|------|-----|
| **Linting/Formatting**| `package.json` (ESLint, Biome, Prettier) | Strict CI checks, `biome.json` | Missing, or lots of `eslint-disable` |
| **Naming Conventions**| Sampling files | `camelCase` for vars, `PascalCase` for React | Mixed `snake_case` and `camelCase` in JS |
| **Component Size** | File sizes | < 200 lines, focused | 1000+ line God Components |
| **Testing** | `__tests__` or `*.test.ts` | High coverage on business logic | No tests, or only empty generated tests |

### 3.3 Security & Resiliency

Check for obvious vulnerabilities and fragility.

| What to look for | Tooling / Pattern | Good | Bad |
|------------------|-------------------|------|-----|
| **Secrets** | `grep "API_KEY"` or `grep "password"` | Environment variables (`process.env`) | Hardcoded tokens in source code |
| **Authentication** | Middleware/HOCs | Centralized auth check / protected routes | Ad-hoc checks, leaked sensitive data |
| **Error Handling** | `try/catch`, Error Boundaries | Global error boundary, unified API error format | Unhandled promise rejections, blank screens |
| **Dependencies** | `npm audit`, `package.json` | Up-to-date, minimal external deps | Known vulnerabilities, 5 different date libraries |

### 3.4 UI & Performance

Check how the frontend is built and how it performs.

| What to look for | Tooling / Pattern | Good | Bad |
|------------------|-------------------|------|-----|
| **Styling Strategy** | CSS Modules, Tailwind, WDS | Consistent use of one strategy | Mixed inline styles, global CSS, and Tailwind |
| **Rendering** | Over-fetching, hydration | Memoization where needed, optimized images | 10MB bundle, `useEffect` infinite loops |
| **Accessibility (a11y)**| `aria-`, semantic HTML | `<button>`, native focus, correct contrast | `onClick` on `<div>` without keyboard support |

---

## 4. Output Template

```markdown
# Current State Analysis: <Project/Module Name>

**Date:** YYYY-MM-DD
**Analyst:** <Agent Role>

## 1. Executive Summary
<2-3 sentences summarizing the overall health and major findings.>

## 2. Tech Stack & Architecture
- **Frontend:** React 18, Vite, Zustand
- **Backend:** Node.js, Express (if monolithic repo)
- **Styling:** CSS Modules
- **Pattern:** Layered architecture (Controllers -> Services)

## 3. Findings

### 3.1 Architecture & Consistency
- ✅ **Good:** Routing is centralized in `src/routes.tsx`.
- ⚠️ **Warning:** Two different data fetching patterns found (raw `fetch` vs custom `apiClient`). Need to unify.
- 🔴 **Red Flag:** `Dashboard.jsx` is 850 lines long and handles rendering, data fetching, and complex logic (God Object).

### 3.2 Security & Error Handling
- ✅ **Good:** Passwords are never sent to the client.
- 🔴 **Red Flag:** Production API keys found hardcoded in `src/config/keys.js`. (Requires immediate rotation and .env extraction).
- ⚠️ **Warning:** Missing global React Error Boundary. Unhandled exceptions crash the whole tree.

### 3.3 UI & Code Quality
- ✅ **Good:** ESLint is configured and running strictly.
- ⚠️ **Warning:** Minimal unit test coverage (only 3 tests exist).

## 4. Recommendations & Tech Debt

**Immediate Remediation (P0):**
1. Extract secrets from `src/config/keys.js` to `.env`.
2. Refactor `Dashboard.jsx` into smaller pure components.

**Short-term Tech Debt (P1):**
1. Unify data fetching to use `apiClient` exclusively.
2. Implement global Error Boundary.

**Long-term Strategy (P2):**
1. Introduce Vitest for unit testing critical services.
```

---

## See also
- `$architecture-doc` — Use the analysis to propose the new architecture.
- `$system-design-checklist` — To ensure no areas are missed during redesign.
- `$security-review-baseline` — For deeper security audits.
