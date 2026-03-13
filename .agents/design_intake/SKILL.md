---
name: design_intake
description: Найти и проанализировать предоставленные дизайн-материалы (файлы/ссылки), определить "источник правды" по UI и извлечь проверяемые правила (экраны, компоненты, токены, состояния).
---

# Skill: Design Intake

Зафиксировать дизайн-артефакты как Source of Truth и извлечь проверяемые правила.

**Разделы:**
1. [Workflow](#1-workflow)
2. [Source Discovery](#2-discovery)
3. [Extraction Checklist](#3-extraction)
4. [Design Rules Examples](#4-rules)
5. [Пример: Smart Cart Rescue](#5-пример)
6. [Output Template](#6-output)

---

## 1. Workflow

```
1. Определи источники
   ├── Файлы в репозитории (design/, docs/, assets/)
   ├── Ссылки (Figma, Stitch, Zeplin)
   └── HTML References (popup_description/*.html)

2. Классифицируй каждый источник
   ├── Source of Truth (мастер)
   ├── Reference (вспомогательный)
   └── Outdated (пометить, не использовать)

3. Для каждого SoT → extract spec (section 3)

4. Сформируй Design Reference Map (screen → file)

5. Извлеки Design Rules (5-20 проверяемых правил)

6. Validate: все экраны из PRD покрыты?
```

---

## 2. Source Discovery

### Где искать

```bash
# Папки
find_by_name: Pattern="design" Type=directory
find_by_name: Pattern="docs" Type=directory
find_by_name: Pattern="assets" Type=directory
find_by_name: Pattern="ui" Type=directory
find_by_name: Pattern="popup_description" Type=directory

# Файлы
find_by_name: Extensions=["fig","pdf","png","jpg","svg","sketch"]
find_by_name: Pattern="*.html" SearchDirectory="<design_folder>"

# Ссылки в документации
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

### Типичные проверяемые правила

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

## 5. Пример: Smart Cart Rescue

```markdown
# Design Intake: Smart Cart Rescue Dashboard

## Sources
| # | Source | Type | Location | Format |
|---|--------|------|----------|--------|
| 1 | Template HTML refs | 🟢 SoT | `popup_description/` | HTML files |
| 2 | Glassmorphism spec | 🟢 SoT | `popup_description/glassmorphism_spec.md` | Markdown |
| 3 | Neo-Brutalism spec | 🟢 SoT | `popup_description/neo_brutalism_spec.md` | Markdown |
| 4 | Stitch screens | 🔵 Gen | Stitch project "SCR Dashboard" | PNG/Stitch |
| 5 | WDS documentation | 🟡 Ref | `@wix/design-system` docs | Web |

## Source of Truth
- **Widget design:** Template spec .md files + HTML references
- **Dashboard UI:** WDS components + UX Spec
- **Config panel:** UX Spec (no design file — follows WDS patterns)

## Design Reference Map
| Screen | SoT Source | Frame/File |
|--------|-----------|-----------|
| Settings panel | UX Spec + WDS | — |
| Widget: Glassmorphism | glassmorphism_spec.md | `popup7.html` |
| Widget: Neo-Brutalism | neo_brutalism_spec.md | `popup9.html` |
| Coupons list | WDS Table pattern | — |

## Design Rules (extracted)
- DR-01: Glassmorphism popup uses 4-color token system (bg, text, accent, overlay)
- DR-02: Timer digits use monospace font
- DR-03: CTA button text from settings, icon optional (Material Symbols)
- DR-04: Neo-Brutalism uses hard shadows (4px 4px 0 #000)
- DR-05: Config panel: 2 columns, left = form, right = live preview
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

## См. также
- `$ux_spec` — UX Spec (uses intake output)
- `$design_parity_review` — compare design with implementation
- `$ui_inventory` — component inventory
- `$google_stitch` — generate screens from text
