---
name: ux_discovery
description: Clarify UX inputs based on PRD — roles, main flows, navigation, platforms (responsive), brand/references, localization, edge cases.
---

# Skill: UX Discovery

Gather missing UX context before creating the UX Spec.

**Sections:**
1. [Workflow](#1-workflow)
2. [Question Bank](#2-questions)
3. [Priority Matrix](#3-priority)
4. [Assumptions Framework](#4-assumptions)
5. [Example](#5-example)
6. [Output Template](#6-output)

---

## 1. Workflow

```
1. Read PRD (from $pm_prd)
   └── Extract: goals, user stories, acceptance criteria, constraints

2. Check: what is already known vs what needs clarification
   ├── Known → mark as a fact
   └── Unknown → add to the list of questions

3. Prioritize questions (section 3):
   ├── 🔴 Blocking: cannot choose an approach without an answer
   ├── 🟠 Important: affects UX Spec, but an assumption can be made
   └── 🟡 Nice-to-know: useful, but not critical

4. If the answer is critical → ask the user
   If an assumption can be made → document the assumption + mark "ASSUMPTION"

5. Generate Discovery Report (section 6)

6. Hand off to → $ux_spec
```

### When discovery is NOT needed

| Situation | Action |
|----------|---------|
| PRD already contains all answers | Skip discovery → go straight to $ux_spec |
| Iteration on existing UI | Minimal discovery (only new questions) |
| Bugfix / hotfix | Not needed |

---

## 2. Question Bank

### A) Platform and layout

| # | Question | Why |
|---|--------|-------|
| Q-01 | Desktop-first, mobile-first or responsive? | Determines breakpoints and layout strategy |
| Q-02 | Minimum supported resolutions? | Affects grid and responsive rules |
| Q-03 | Embedded in iframe or standalone? | Critical for sizing, scrolling, navigation |
| Q-04 | Is there a dark mode / theme switching? | Affects design tokens and CSS strategy |

### B) Roles and permissions

| # | Question | Why |
|---|--------|-------|
| Q-05 | What are the user roles? | Determines navigation and permissions logic |
| Q-06 | What can / cannot each role do? | Affects UI visibility and server-side auth |
| Q-07 | Is an admin panel / moderation needed? | Might require a separate layout |
| Q-08 | Is there onboarding for new users? | Additional screens/flow |

### C) Navigation and structure

| # | Question | Why |
|---|--------|-------|
| Q-09 | Main sections / tabs / pages? | Determines IA (Information Architecture) |
| Q-10 | Is there deep linking (URL sharing)? | Affects routing strategy |
| Q-11 | Are breadcrumbs / back navigation needed? | UX navigation pattern |
| Q-12 | Single page or multi-page? | Routing, state management |

### D) Brand and visuals

| # | Question | Why |
|---|--------|-------|
| Q-13 | Is there Figma / mockup / design system? | Determines the "source of truth" for UI |
| Q-14 | Are there visual references / inspiration? | Direction for design decisions |
| Q-15 | Logo / brand colors / fonts? | Brand compliance |
| Q-16 | Dark / light theme? | Design tokens scope |

### E) Data and states

| # | Question | Why |
|---|--------|-------|
| Q-17 | What do we show for empty data? | Empty state design |
| Q-18 | Which operations are potentially slow? | Loading/skeleton strategy |
| Q-19 | What do we do on network/server errors? | Error state design |
| Q-20 | Are there real-time updates? | WebSocket / polling strategy |
| Q-21 | Maximum data volumes (lists/tables)? | Pagination/virtualization |

### F) Localization and i18n

| # | Question | Why |
|---|--------|-------|
| Q-22 | One language or multiple? | i18n setup |
| Q-23 | RTL support? | CSS direction strategy |
| Q-24 | Format of dates / times / currencies? | Locale-specific formatting |

---

## 3. Priority Matrix

| Priority | Meaning | Action |
|----------|---------|--------|
| 🔴 **Blocking** | Cannot start UX Spec without an answer | Must ask the user |
| 🟠 **Important** | Affects UX, but an assumption can be made | Ask or document ASSUMPTION |
| 🟡 **Nice-to-know** | Useful for polish, not for MVP | Postpone or assume |

### Typical prioritization

| Category | Typical Priority |
|-----------|:------------------:|
| Platform (iframe / responsive) | 🔴 |
| Roles & permissions | 🔴 |
| Navigation / IA | 🟠 |
| Brand / design system | 🟠 |
| Empty / error states | 🟠 |
| Localization | 🟡 |
| Real-time updates | 🟡 |

---

## 4. Assumptions Framework

When there is no answer, document an assumption:

```markdown
### ASSUMPTION-01: Desktop-first layout
**Question:** Q-01 — responsive strategy
**Assumption:** Desktop-first, min-width 1024px
**Reasoning:** PRD describes a dashboard, typical use case is desktop
**Risk:** Low — easy to add mobile breakpoints later
**Needs confirmation by:** Before v1.0
```

---

## 5. Example

```markdown
# UX Discovery: SaaS Admin Panel

## Facts from PRD
- Admin dashboard for content configuration
- Roles: Admin (full access), Viewer (read-only)
- Features: Settings, Content CRUD, Preview

## Clarified
- Q-01: Desktop-first, responsive later → 🔴 confirmed
- Q-13: Design system — shadcn/ui → 🟠 confirmed
- Q-17: Empty state — show "Create your first item" CTA → 🟠 confirmed

## Assumptions
- ASSUMPTION-01: Desktop-first (admin panel = desktop) → Low risk
- ASSUMPTION-02: One language (english) for MVP → Low risk
- ASSUMPTION-03: No real-time updates (static config) → Low risk
```

---

## 6. Output Template

```markdown
# UX Discovery Report

**PRD:** <reference>
**Date:** YYYY-MM-DD
**Author:** UX/UI Designer Agent

## Facts (confirmed from PRD)
| # | Fact | Source |
|---|------|--------|
| F-01 | Desktop-first, standalone app | PRD §1 |
| F-02 | Two roles: Admin, Viewer | PRD §2.1 |

## Questions
| # | Question | Priority | Answer | Status |
|---|----------|:--------:|--------|:------:|
| Q-01 | Responsive or desktop only? | 🔴 | Desktop-first | ✅ Answered |
| Q-13 | Design system? | 🟠 | shadcn/ui | ✅ Answered |
| Q-20 | Real-time? | 🟡 | — | ASSUMED: No |

## Assumptions
| ID | Assumption | Risk | Confirm by |
|----|-----------|:----:|-----------:|
| ASSUMPTION-01 | Desktop-first | Low | v1.0 |
| ASSUMPTION-02 | English only | Low | v1.0 |

## Screen / Flow Inventory (draft)
1. Admin Panel → Settings (tabs: General, Appearance, Notifications)
2. Admin Panel → Items list (CRUD)
3. Public UI → Content display (end-user facing)

## Next Step
→ Proceed to $ux_spec with confirmed facts + assumptions
```

---

## See also
- `$pm_prd` — PRD (input for discovery)
- `$ux_spec` — UX Spec (output of discovery)
- `$design_intake` — design materials analysis
