---
name: design_intake
description: Find and analyze provided design materials (files/links), determine the "source of truth" for UI, and extract checkable rules (screens, components, tokens, states).
---

# Skill: Design Intake

Fix design artifacts as the Source of Truth and extract checkable rules.

**Sections:**
1. [Workflow](#1-workflow)
2. [Source Discovery](#2-source-discovery)
3. [Extraction Checklist](#3-extraction-checklist)
4. [Design Rules Examples](#4-design-rules-examples)
5. [Example](#5-example)
6. [Output Template](#6-output-template)

---

## 1. Workflow

```
1. Identify sources
   ├── Files in repository (design/, docs/, assets/)
   ├── Links (Figma, Stitch, Zeplin)
   └── HTML References (popup_description/*.html)

2. Classify each source
   ├── Source of Truth (master)
   ├── Reference (auxiliary)
   └── Outdated (mark, do not use)

3. For each SoT → extract spec (section 3)

4. Form Design Reference Map (screen → file)

5. Extract Design Rules (5-20 checkable rules)

6. Validate: are all screens from PRD covered?
```

---

## 2. Source Discovery

### Where to look

```bash
# Folders
find_by_name: Pattern="design" Type=directory
find_by_name: Pattern="docs" Type=directory
find_by_name: Pattern="assets" Type=directory
find_by_name: Pattern="ui" Type=directory
find_by_name: Pattern="popup_description" Type=directory

# Files
find_by_name: Extensions=["fig","pdf","png","jpg","svg","sketch"]
find_by_name: Pattern="*.html" SearchDirectory="<design_folder>"

# Links in documentation
grep_search: Query="figma.com" Includes=["*.md"]
grep_search: Query="stitch" Includes=["*.md"]
grep_search: Query="design" Includes=["README.md"]
```

### Source classification

| Type | Marker | Priority | Example |
|------|--------|:--------:|---------|
| **Source of Truth** | 🟢 SoT | Highest | Figma page "Dashboard v2" |
| **Reference** | 🟡 Ref | Medium | Old mockups, inspiration |
| **Outdated** | 🔴 Outdated | Ignore | Previous iteration designs |
| **Generated** | 🔵 Gen | Verify | Stitch-generated screens |

---

## 3. Extraction Checklist

For each Source of Truth, extract:

| # | What to extract | How | Status |
|---|----------------|-----|--------|
| DI-01 | **Screen list** with names & purpose | List all distinct screens/pages | ☐ |
| DI-02 | **Layout structure** per screen | Identify columns, sections, hierarchy | ☐ |
| DI-03 | **Components & variants** | Button types, input styles, cards | ☐ |
| DI-04 | **Color palette** | Primary, secondary, accent, states (success/error/warn) | ☐ |
| DI-05 | **Typography** | Font families, sizes, weights, hierarchy | ☐ |
| DI-06 | **Spacing & sizing** | Padding, margins, gap patterns | ☐ |
| DI-07 | **States** | Loading, empty, error, success, disabled, hover | ☐ |
| DI-08 | **Content / copy** | Button labels, titles, error messages, placeholder text | ☐ |
| DI-09 | **Icons / imagery** | Icon set (Material, custom), illustrations | ☐ |
| DI-10 | **Responsive rules** | Breakpoints, layout changes, hidden elements | ☐ |

---

## 4. Design Rules Examples

### Typical checkable rules

| # | Rule | Checkable? | Example |
|---|------|:----------:|---------|
| DR-01 | Primary CTA is always blue (#116DFF) filled button | ✅ | "Save" button |
| DR-02 | Destructive actions are red (#D32F2F) + confirmation modal | ✅ | "Delete" button |
| DR-03 | Form errors shown inline below field, red text | ✅ | Validation |
| DR-04 | Empty state has illustration + text + CTA | ✅ | Coupons list |
| DR-05 | Loading shows skeleton, not spinner (for initial load) | ✅ | Settings page |
| DR-06 | Config panel = left 60%, Live Preview = right 40% | ✅ | Dashboard layout |
| DR-07 | Tabs use underline active state, not background fill | ✅ | Settings tabs |
| DR-08 | Toast appears bottom-right, auto-dismiss 3s for success | ✅ | Save settings |
| DR-09 | Modal backdrop is dark 50% opacity | ✅ | Confirm dialog |
| DR-10 | Font: headings = 600 weight, body = 400 | ✅ | Typography |
| DR-11 | Border radius: buttons 8px, cards 12px, inputs 4px | ✅ | Components |
| DR-12 | Color picker shows 4 tokens: bg, text, accent, overlay | ✅ | Design tab |

### Rule format

```markdown
### DR-XX: <Short name>

**Source:** <File/Frame/Page> in <SoT>
**Scope:** <Where it applies>
**Rule:** <Concrete, checkable statement>
**Verification:** <How to check — visual / code / grep>
```

---

## 5. Example

```markdown
# Design Intake: SaaS Admin Panel

## Sources
| # | Source | Type | Location | Format |
|---|--------|------|----------|--------|
| 1 | Figma mockups | 🟢 SoT | `design/figma-export/` | PNG files |
| 2 | Component specs | 🟢 SoT | `docs/component-specs.md` | Markdown |
| 3 | Stitch screens | 🔵 Gen | Stitch project "Admin Panel" | PNG/Stitch |
| 4 | Design system docs | 🟡 Ref | shadcn/ui documentation | Web |

## Source of Truth
- **Admin UI:** Figma mockups + Component specs
- **Dashboard layout:** UX Spec + design system patterns
- **Public content:** Template spec files

## Design Reference Map
| Screen | SoT Source | Frame/File |
|--------|-----------|-----------|
| Settings panel | UX Spec + design system | Figma frame |
| Products list | UX Spec + DataTable pattern | — |
| Content preview | template_spec.md | reference.html |

## Design Rules (extracted)
- DR-01: Primary CTA is filled blue button
- DR-02: Tables use striped rows with hover highlight
- DR-03: Forms use inline validation errors below fields
- DR-04: Empty states include illustration + CTA
- DR-05: Config panel: 2 columns, left = form, right = preview
```

---

## 6. Output Template

```markdown
# Design Intake Report

**Date:** YYYY-MM-DD
**Author:** UX/UI Designer Agent
**PRD:** <reference>

## Sources Inventory
| # | Source | Type | Location | Format | Status |
|---|--------|:----:|----------|--------|:------:|
| 1 | ... | 🟢 SoT | ... | ... | ✅ Analyzed |
| 2 | ... | 🟡 Ref | ... | ... | ✅ Reviewed |
| 3 | ... | 🔴 Outdated | ... | ... | ⏭️ Skipped |

## Source of Truth
| Domain | SoT | Notes |
|--------|-----|-------|
| Widget UI | Template specs + HTML refs | Per-template |
| Dashboard | WDS + UX Spec | No Figma |
| Config Panel | UX Spec | WDS components |

## Extraction Results
| # | Check | Status |
|---|-------|--------|
| DI-01 | Screen list | ✅ X screens |
| DI-02 | Layout structure | ✅ |
| DI-03 | Components & variants | ✅ X components |
| DI-04 | Color palette | ✅ X tokens |
| ... | ... | ... |

## Design Reference Map
| Screen | Source | File/Frame | SoT |
|--------|--------|-----------|:---:|
| ... | ... | ... | 🟢 |

## Design Rules
<DR-01..DR-XX per section 4 format>

## Coverage Check
- [ ] All PRD screens have a design source
- [ ] All design screens are in UX Spec screen list
- [ ] All components are in UI Inventory

## Gaps / Open Questions
| # | Gap | Impact | Resolution |
|---|-----|--------|-----------|
| 1 | No design for error states | P1 | Apply standard error pattern |

## Next Step
→ Proceed to $ux_spec / $design_parity_review
```

---

## See also
- `$ux_spec` — UX Spec (uses intake output)
- `$design_parity_review` — compare design with implementation
- `$ui_inventory` — component inventory
- `$google_stitch` — generate screens from text
