---
name: pm_prd
description: Form PRD — Vision, MVP, out-of-scope, user stories, acceptance criteria, NFR, risks and open questions. Result must be check.
---

# Skill: PRD (Product Requirements Document)

PRD, by that UX/ARCH/DEV/TEST can work from without guesswork.

**Sections:**
1. [Workflow](#1-workflow)
2. [PRD Structure](#2-structure)
3. [User Story Format](#3-user-story)
4. [Quality Checklist](#4-quality)
5. [Handoff Checklist](#5-handoff)
6. [Example: User Story](#6-example)
7. [Output Template](#7-output)

---

## 1. Workflow

```
1. Input: Interview Summary (from $pm_interview)
2. Draft PRD structure (section 2)
3. Write user stories + acceptance criteria (section 3)
4. Define NFR
5. List risks + open questions
6. Run quality checklist (section 4)
7. Submit for User review
8. After approval → handoff (section 5)
```

---

## 2. PRD Structure

### 1) Vision & Goals

| Field | Content |
|-------|---------|
| Problem | What pain point are we solving? |
| Target audience | Who are the users? |
| Value proposition | Why would they use this over alternatives? |
| Success metrics | How do we measure success? (KPI / OKR) |

### 2) Scope

| In scope (MVP) | Out of scope | Rationale |
|----------------|-------------|-----------|
| Feature A | Feature X | Not MVP priority |
| Feature B | Feature Y | Technical complexity, defer to v2 |

### 3) Roles & Permissions

| Role | Can do | Cannot do |
|------|--------|-----------|
| Site Owner | CRUD settings, coupons | Access other sites |
| End User | View popup, copy coupon | Modify settings |

### 4) User Stories → section 3

### 5) Acceptance Criteria → section 3

### 6) Non-Functional Requirements

| Category | Requirement | Priority |
|----------|-----------|:--------:|
| **Security** | Input validation (Zod), no secrets in logs | P0 |
| **Security** | Server-side auth on all protected endpoints | P0 |
| **Performance** | API response < 500ms (p95) | P1 |
| **Performance** | Widget load < 1s (LCP) | P1 |
| **Reliability** | Graceful error handling, no 500 to user | P0 |
| **Observability** | Structured logging (pino), request_id correlation | P1 |
| **Accessibility** | WCAG 2.1 AA baseline (see $a11y_baseline) | P1 |
| **Localization** | English only (MVP) | — |

### 7) Risks & Open Questions

| # | Type | Description | Impact | Mitigation | Status |
|---|------|------------|--------|-----------|:------:|
| R-01 | Technical | Wix API rate limits | High | Caching, retry logic | Open |
| R-02 | Product | User confusion with templates | Medium | Clear preview | Mitigated |

---

## 3. User Story Format

### Template

```markdown
### US-XX: <Title>

**As a** <role>
**I want to** <action>
**So that** <benefit>

**Priority:** P0 / P1 / P2

#### Acceptance Criteria

| # | Given | When | Then |
|---|-------|------|------|
| AC-01 | I am on Settings page | I change title and click Save | Title updates in widget preview |
| AC-02 | I am on Settings page | I leave title empty and click Save | Validation error "Title required" shown |
| AC-03 | Server is unavailable | I click Save | Error toast "Failed to save" shown |
```

### Story categories

| Category | Examples | Priority |
|----------|---------|:--------:|
| **Core CRUD** | Create coupon, update settings, delete coupon | P0 |
| **Integration** | Install webhook, Wix auth, embed widget | P0 |
| **UX Polish** | Loading states, empty states, toasts | P1 |
| **Error Handling** | Network errors, validation, edge cases | P1 |
| **Admin** | Analytics, export, bulk ops | P2 |

---

## 4. Quality Checklist

| # | Check | Status |
|---|-------|--------|
| PRD-01 | MVP can be built in 1-3 iterations | ☐ |
| PRD-02 | Every user story has acceptance criteria | ☐ |
| PRD-03 | AC include positive + negative + edge cases | ☐ |
| PRD-04 | Out of scope explicitly listed | ☐ |
| PRD-05 | NFR section is filled (security, perf, a11y) | ☐ |
| PRD-06 | Risks and open questions documented | ☐ |
| PRD-07 | Assumptions explicitly marked | ☐ |
| PRD-08 | PRD is understandable without verbal explanation | ☐ |
| PRD-09 | No vague language ("should be fast" → "< 500ms p95") | ☐ |
| PRD-10 | Dependencies between stories identified | ☐ |

---

## 5. Handoff Checklist

What PM passes to downstream gates:

| # | Deliverable | For whom | Status |
|---|------------|:--------:|--------|
| 1 | PRD document | UX + ARCH + DEV + TEST | ☐ |
| 2 | User stories with AC | UX (for flows) + TEST (for test plan) | ☐ |
| 3 | NFR table | ARCH (for system design) | ☐ |
| 4 | Risks & open questions | All | ☐ |
| 5 | Backlog (`$pm_backlog`) | DEV + Conductor | ☐ |

---

## 6. Example: User Story

```markdown
### US-03: Configure Popup Design

**As a** Site Owner
**I want to** customize popup colors, fonts, and template
**So that** the popup matches my store's branding

**Priority:** P0

#### Acceptance Criteria
| # | Given | When | Then |
|---|-------|------|------|
| AC-01 | On Design tab | Change background color | Preview updates in real-time |
| AC-02 | On Design tab | Select new template | Preview switches to selected template |
| AC-03 | On Design tab | Click Save | Settings persist, toast "Settings saved" |
| AC-04 | On Design tab | Enter invalid color | Validation error shown inline |
| AC-05 | Server down | Click Save | Error toast, settings not lost |
```

---

## 7. Output Template

```markdown
# PRD: <Product/Feature Name>

**Version:** 1.0
**Date:** YYYY-MM-DD
**Author:** Product Manager Agent
**Status:** Draft / Review / Approved

## 1. Vision & Goals
<section 2, table 1>

## 2. Scope
<section 2, table 2>

## 3. Roles & Permissions
<section 2, table 3>

## 4. User Stories
<section 3 format × N stories>

## 5. Non-Functional Requirements
<section 2, table 6>

## 6. Risks & Open Questions
<section 2, table 7>

## Quality Checklist
<section 4 — all checked>

## Handoff
<section 5 — all checked>
```

---

## See also
- `$pm_interview` — interview/discovery (input)
- `$pm_backlog` — decompose PRD into backlog
- `$ux_discovery` → `$ux_spec` — UX design (uses PRD)