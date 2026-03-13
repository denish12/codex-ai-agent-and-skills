---
name: ux_discovery
description: Clarify UX inputs by PRD — roles, main flows, navigation, platform (responsive), brand/references, localization, edge cases.
---

# Skill: UX Discovery

Collect the missing UX context before the UX Spec.

**Sections:**
1. [Workflow](#1-workflow)
2. [Question Bank](#2-questions)
3. [Priority Matrix](#3-priority)
4. [Assumptions Framework](#4-assumptions)
5. [Example: Smart Cart Rescue](#5-example)
6. [Output Template](#6-output)

---

## 1. Workflow

```
1. Read PRD (from $pm_prd)
   └── Highlight: goals, user stories, acceptance criteria, constraints

2. Check: what already known vs what needed clarify
   ├── Known → mark as fact
   └── Unknown → add in list questions

3. Prioritize questions (section 3):
   ├── 🔴 Blocking: without answer cannot choose approach
   ├── 🟠 Important: affects on UX Spec, but can assume
   └── 🟡 Nice-to-know: useful, but not critical

4. If response critical → ask question to the user
   If can assume → record assumption + mark "ASSUMPTION"

5. Form Discovery Report (section 6)

6. Pass in → $ux_spec
```

### When Not needed discovery

| Situation | Action |
|----------|---------|
| PRD already contains all responses | Skip discovery → immediately $ux_spec |
| Iteration over existing UI | Minimum discovery (only new questions) |
| Bugfix / hotfix | Not needed |

---

## 2. Question Bank

### A) Platform and layout

| # | Question | Why |
|---|--------|-------|
| Q-01 | Desktop-first, mobile-first or responsive? | Defines breakpoints and layout strategy |
| Q-02 | Minimal support resolutions? | Affects on grid and responsive rules |
| Q-03 | Is embedded in iframe or standalone? | Critical for dimensions, scrolling, navigation |
| Q-04 | There is whether dark mode / theme switching? | Affects on design tokens and CSS strategy |

### B) Roles and permissions

| # | Question | Why |
|---|--------|-------|
| Q-05 | Which roles users? | Defines navigation and permissions logic |
| Q-06 | What each role can / cannot do? | Affects on UI visibility and server-side auth |
| Q-07 | Needed whether admin panel / moderation? | Can require separate layout |
| Q-08 | There is whether onboarding for new users? | Additional screens/flow |

### C) Navigation and structure

| # | Question | Why |
|---|--------|-------|
| Q-09 | Main sections / tabs / pages? | Defines IA (Information Architecture) |
| Q-10 | There is whether deep linking (URL sharing)? | Affects on routing strategy |
| Q-11 | Breadcrumbs / back navigation needed? | UX navigation pattern |
| Q-12 | Single page or multi-page? | Routing, state management |

### D) brand and visuals

| # | Question | Why |
|---|--------|-------|
| Q-13 | There is whether Figma / mockup / design system? | Defines «source truth» by UI |
| Q-14 | There is visual references / inspiration? | Direction for design |
| Q-15 | Logo / brand colors / fonts? | Brand compliance |
| Q-16 | Dark / light theme? | Design tokens scope |

### E) Data and states

| # | Question | Why |
|---|--------|-------|
| Q-17 | What show with empty data? | Empty state design |
| Q-18 | Which operations potentially long-running? | Loading/skeleton strategy |
| Q-19 | What do we do with network/server errors? | Error state design |
| Q-20 | There is whether real-time updates? | WebSocket / polling strategy |
| Q-21 | Maximum data volumes (lists/tables)? | Pagination/virtualization |

### F) Localization and i18n

| # | Question | Why |
|---|--------|-------|
| Q-22 | One language or several? | i18n setup |
| Q-23 | RTL support? | CSS direction strategy |
| Q-24 | Format dates / time / currencies? | Locale-specific formatting |

---

## 3. Priority Matrix

| Priority | Meaning | Action |
|----------|---------|--------|
| 🔴 **Blocking** | Without answer cannot start the UX Spec | Mandatory ask user |
| 🟠 **Important** | Affects on UX, but can make an assumption | Ask or record ASSUMPTION |
| 🟡 **Nice-to-know** | useful for polish, not for MVP | Postpone or assume |

### Type prioritization

| Category | Typical priority |
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

When no answer, record assumption:

```markdown
### ASSUMPTION-01: Desktop-first layout
**Question:** Q-01 — responsive strategy
**Assumption:** Desktop-first, min-width 1024px
**Rationale:** PRD describes dashboard, typical use case — desktop
**Risk:** Low — easily add mobile breakpoints later
**need confirm:** To v1.0
```

---

## 5. Example: Smart Cart Rescue

```markdown
# UX Discovery: Smart Cart Rescue Dashboard

## Facts from PRD
- Wix App — is embedded via iframe
- Dashboard for settings popup-widgets
- Roles: Site Owner (single role)
- Templates: Glassmorphism, Neo-Brutalism, Minimal

## Clarified
- Q-03: iframe inside Wix Editor/Business Manager → 🔴 confirmed
- Q-13: Design system — WDS (Wix Design System) → 🟠 confirmed
- Q-17: Empty state — show "Create your first coupon" CTA → 🟠 confirmed

## Assumptions
- ASSUMPTION-01: Desktop-only (iframe in Wix Editor = desktop) → Low risk
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
| F-01 | Desktop-first, iframe in Wix | PRD §1 |
| F-02 | Single role: Site Owner | PRD §2.1 |

## Questions
| # | Question | Priority | Answer | Status |
|---|----------|:--------:|--------|:------:|
| Q-01 | Responsive or desktop only? | 🔴 | Desktop only (iframe) | ✅ Answered |
| Q-13 | Design system? | 🟠 | WDS (Wix Design System) | ✅ Answered |
| Q-20 | Real-time? | 🟡 | — | ASSUMED: No |

## Assumptions
| ID | Assumption | Risk | Confirm by |
|----|-----------|:----:|-----------|
| ASSUMPTION-01 | Desktop only | Low | v1.0 |
| ASSUMPTION-02 | English only | Low | v1.0 |

## Screen / Flow Inventory (draft)
1. Dashboard → Settings (tabs: General, Design, Timer, Coupon)
2. Dashboard → Coupons list (CRUD)
3. Widget → Public popup (end-user facing)

## Next Step
→ Proceed to $ux_spec with confirmed facts + assumptions
```

---

## See also
- `$pm_prd` — PRD (input for discovery)
- `$ux_spec` — UX Spec (output of discovery)
- `$design_intake` — design materials analysis