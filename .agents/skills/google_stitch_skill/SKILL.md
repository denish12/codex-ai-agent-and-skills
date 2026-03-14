---
name: google_stitch_skill
description: Генерация UI-экранов через Google Stitch (AI) с прямым доступом через StitchMCP. Rapid ideation после Approved UX Proposal, промпт-инжиниринг, контроль качества. Привязано к UX/UI Designer gate.
last_verified: 2026-03-11
version: 3.0
mcp_server: StitchMCP
---

# Skill: Google Stitch — AI UI Generation (MCP-Integrated)

## Назначение

Описывает, **как и когда** UX/UI Designer использует Google Stitch:
- для быстрой генерации первых вариантов экранов по промптам,
- как инструмент rapid ideation между UX Proposal и передачей в Figma,
- для генерации frontend-кода как отправной точки для DEV.

> [!IMPORTANT]
> С версии 3.0 Stitch доступен **напрямую через MCP** — агент генерирует, итерирует и
> управляет экранами без ручного копирования в браузер.
> Stitch — инструмент **быстрого прототипирования**, а не финального дизайна.
> Любой output требует доработки в Figma и ревью через `$design_parity_review`.

---

## Что такое Google Stitch

Google Stitch — AI-инструмент от Google Labs (запущен на Google I/O 2025, основан на приобретённом Galileo AI). Превращает текстовые промпты в UI-макеты с экспортом в Figma и HTML/CSS/React код.

**Движок:** Gemini 3 Pro / Gemini 3 Flash.
**URL:** https://stitch.withgoogle.com
**Доступ:** Google аккаунт + StitchMCP server подключён к агенту.

---

## StitchMCP — API Reference

### Доступные инструменты

| Tool | Назначение | Ключевые параметры |
|------|-----------|-------------------|
| `create_project` | Создать новый проект | `title` |
| `list_projects` | Список всех проектов | `filter` (owned/shared) |
| `get_project` | Детали проекта | `name` (projects/{id}) |
| `list_screens` | Список экранов в проекте | `projectId` |
| `get_screen` | Детали экрана (код, metadata) | `projectId`, `screenId` |
| `generate_screen_from_text` | 🎯 **Генерация экрана по промпту** | `projectId`, `prompt`, `deviceType`, `modelId` |
| `edit_screens` | Редактирование существующих экранов | `projectId`, `selectedScreenIds[]`, `prompt` |
| `generate_variants` | Генерация вариантов экрана | `projectId`, `selectedScreenIds[]`, `prompt`, `variantOptions` |

### Модели (modelId)

| ID | Описание | Когда использовать |
|----|----------|-------------------|
| `GEMINI_3_FLASH` | Быстрый, больше лимит | Первые итерации, перебор вариантов |
| `GEMINI_3_PRO` | Высокое качество | Финальные варианты, сложные layouts |

### Типы устройств (deviceType)

| ID | Описание |
|----|----------|
| `DESKTOP` | Десктопные UI (dashboards, admin panels) |
| `MOBILE` | Мобильные UI (iOS/Android) |
| `TABLET` | Планшетные layouts |
| `AGNOSTIC` | Универсальный (popups, widgets, modals) |

> [!TIP]
> Для popup/modal/widget-шаблонов используй `AGNOSTIC` — они не привязаны к конкретному устройству.
> Для dashboard-страниц используй `DESKTOP`.

---

## Режимы работы (через MCP)

| Режим | Модель | Когда |
|-------|--------|-------|
| **Быстрый перебор** | `GEMINI_3_FLASH` | Первые варианты, layout exploration, быстрые итерации |
| **Качественная генерация** | `GEMINI_3_PRO` | Финальный вариант, сложные layouts |

> [!WARNING]
> `generate_screen_from_text` и `edit_screens` могут занимать **до нескольких минут**.
> **НЕ повторять вызов** — дождаться ответа. Даже при ошибке соединения генерация может завершиться успешно.
> Проверить результат: `get_screen` или `list_screens`.

---

## Место Stitch в рабочем процессе UX/UI

```
PRD → UX Clarification → UX Proposal (Approved)
                                   ↓
                    [STITCH MCP: Rapid Ideation]
                    create_project → generate_screen_from_text
                    → edit_screens / generate_variants
                                   ↓
                     get_screen → Copy to Figma → Polish & Brand
                                   ↓
                        UX Spec + Screen Inventory
                                   ↓
                        Parity Review ($design_parity_review)
                                   ↓
                          Handoff → ARCH / DEV
```

### Когда использовать Stitch ✅
- После получения **Approved** на UX Proposal — для быстрой материализации flows в экраны
- Для демонстрации клиенту/PM «как это может выглядеть» до полировки в Figma
- Для генерации вариантов одного экрана (layout exploration)
- Как основа для frontend-кода при быстром прототипировании

### Когда НЕ использовать Stitch ❌
- Для финального UI, требующего точного следования design system
- Для сложных многоэкранных flows (Stitch плохо держит консистентность >2–3 экранов)
- Когда уже есть готовая Figma с компонентами — проще работать напрямую
- Для анимаций и сложных интерактивных состояний
- Когда design system полностью определён и нужен pixel-perfect — Figma напрямую

---

## Входы

- Approved UX Proposal (обязательно — без него Stitch запрещён)
- PRD / User Stories (контекст фичи)
- Design tokens (цвета, шрифты, spacing) — для включения в промпт
- Предыдущие Stitch-экраны (screenId — для `edit_screens` / `generate_variants`)

---

## Алгоритм работы (MCP)

### Шаг 1: Подготовка проекта

```
ЕСЛИ проект уже существует:
  → list_projects → найти projectId
  → list_screens(projectId) → проверить существующие экраны

ЕСЛИ нового проекта нет:
  → create_project(title: "Название проекта")
  → запомнить projectId из ответа
```

### Шаг 2: Генерация экрана

```
generate_screen_from_text(
  projectId: "<id>",
  prompt: "<промпт по чеклисту ниже>",
  deviceType: "DESKTOP" | "MOBILE" | "TABLET" | "AGNOSTIC",
  modelId: "GEMINI_3_FLASH"   // Flash для первой итерации
)
→ запомнить screenId из ответа
→ если output_components содержит suggestions — показать пользователю
```

### Шаг 3: Итерация (edit_screens)

```
edit_screens(
  projectId: "<id>",
  selectedScreenIds: ["<screenId>"],
  prompt: "Move the CTA button to bottom, change color to #4361EE",
  modelId: "GEMINI_3_FLASH"
)
```

### Шаг 4: Варианты (generate_variants)

```
generate_variants(
  projectId: "<id>",
  selectedScreenIds: ["<screenId>"],
  prompt: "Generate layout variations",
  variantOptions: { numberOfVariants: 3 }
)
```

### Шаг 5: Получение результата

```
get_screen(
  projectId: "<id>",
  screenId: "<screenId>",
  name: "projects/<id>/screens/<screenId>"
)
→ получить код / metadata экрана
```

---

## Промпт-инжиниринг для Stitch

### Структура эффективного промпта

```
[Тип экрана] + [Платформа] + [Контент/элементы] + [Стиль] + [Ограничения]
```

**Пример плохого промпта:**
> "Сделай форму регистрации"

**Пример хорошего промпта:**
> "Mobile registration screen for a fintech app. Include: email field, password field with show/hide toggle, 'Continue' primary button, 'Sign in' text link below. Dark background (#0F0F14), accent color teal (#00C9A7), Inter font, 16px body. Error state for invalid email shown inline below the field. No illustrations."

### Элементы промпта (чеклист)

- [ ] **Тип экрана:** Dashboard / Form / List / Detail / Onboarding / Modal / Popup / Widget
- [ ] **Платформа:** Mobile (iOS/Android) / Web desktop / Tablet / Responsive / Wix iframe embed
- [ ] **Контент:** Перечислить конкретные элементы (поля, кнопки, карточки, графики)
- [ ] **Состояние:** Default / Loading / Empty / Error / Success / Hover / Disabled
- [ ] **Стиль:** цветовая схема (hex), шрифт, радиус углов, плотность, тени
- [ ] **Ограничения:** что НЕ нужно ("No illustrations", "No sidebar", "No gradients on buttons")
- [ ] **Размеры (если embed):** точные размеры viewport (e.g. "400×500px container")

### Промпты для конкретных состояний

**Empty state:**
> "...empty state screen when user has no data yet. Show a simple icon (no illustrations), headline 'No items yet', subtext 'Create your first item to get started', and a primary CTA button."

**Error state:**
> "...error/failure screen. Network error message in a toast/snackbar at the bottom, red (#FF4D4F), with retry action. Main content stays visible but dimmed."

**Loading state:**
> "...loading state with skeleton screens (gray animated placeholders) instead of content. No spinners."

---

## Итерации через edit_screens

После первой генерации использовать `edit_screens` для уточнений:

### Точечные правки (предпочтительно)
```
prompt: "Move the CTA button to the bottom of the screen, fixed position."
prompt: "Change the card layout to 2 columns instead of 1."
prompt: "Replace the pie chart with a bar chart."
prompt: "Change background color to #0F0F14 and accent to #00C9A7."
```

### Шаблон итерации
```
Alignment fix: "[Element] should be [position/alignment]"
Color fix:     "Change [element] color to [hex]"
Layout fix:    "Switch [layout A] to [layout B]"
Content fix:   "Replace [old text/element] with [new text/element]"
Size fix:      "Make [element] [larger/smaller], [exact px if known]"
Remove:        "Remove [element] entirely"
Add:           "Add [element] at [position]"
```

### Запрещено в итерациях
- Менять концепцию целиком (лучше новая `generate_screen_from_text`)
- Промпт «сделай красивее» без конкретики — Stitch не угадает
- Более 5 правок за один `edit_screens` — разбивать на шаги

---

## Экспорт в Figma

### Когда экспортировать
После 2–3 итераций через `edit_screens`, когда layout устраивает.

### Процесс (через MCP)
1. `get_screen` → получить данные экрана
2. Открыть Stitch UI в браузере → **"Copy to Figma"**
3. Figma → `Cmd/Ctrl + V` → вставить

> [!NOTE]
> Copy to Figma пока доступен только через UI. MCP даёт код и metadata,
> но для вставки в Figma нужен ручной шаг через браузер.

### После вставки в Figma — обязательные шаги
- [ ] Заменить шрифты на проектные (Stitch использует системные)
- [ ] Привязать цвета к токенам design system
- [ ] Заменить сгенерированные компоненты на компоненты из DS
- [ ] Проверить spacing — привести к 4/8px grid
- [ ] Добавить missing states (loading/empty/error если не сгенерированы)
- [ ] Проверить a11y: контраст, размеры touch targets
- [ ] Добавить пометку в слоях: `[Stitch-generated]`

> [!WARNING]
> Stitch **НЕ** создаёт Figma components и DS-токены — всё нужно доделывать вручную.

---

## Экспорт кода (через MCP)

`get_screen` возвращает HTML/CSS/React код. Использовать как:
- Референс структуры для DEV
- Стартовую точку для быстрого прототипа
- Проверку собственного понимания layout

### Алгоритм получения кода
```
get_screen(projectId, screenId, name)
→ response содержит сгенерированный код экрана
→ сохранить в файл с пометкой [Stitch-generated scaffold]
→ передать DEV
```

### Что НЕ делать
- Отдавать Stitch-код как production-ready без ревью DEV
- Ожидать, что компоненты будут соответствовать shadcn/WDS/другому DS
- Копировать inline-стили в продакшн — заменять на CSS-токены

---

## Ограничения Stitch (знать и учитывать)

| Ограничение | Влияние | Mitigation |
|-------------|---------|------------|
| Консистентность между экранами низкая | Разные стили на разных экранах | Промптить одинаковый стиль явно, использовать `generate_variants` |
| Нет анимаций и transitions | Нельзя передать motion | Документировать отдельно в UX Spec |
| Нет поддержки DS-токенов | Нет auto-apply brand | Ручная замена после получения кода |
| Сложные flows >3 экранов — слабо | Потеря консистентности | Генерировать по 1–2 экрана в проекте |
| MCP-генерация медленная | До нескольких минут | Не повторять вызов, дождаться ответа |
| Лимиты генераций действуют | Те же ограничения аккаунта | Планировать бюджет генераций |
| Код не production-ready | inline-стили, нет DS, нет a11y | Только как scaffold, обязательный DEV-ревью |
| Copy to Figma — только через UI | MCP не поддерживает Figma-экспорт | Ручной шаг через браузер |

---

## Работа с существующими проектами

### Проекты в Stitch

Используй `list_projects` чтобы найти существующие проекты и `list_screens(projectId)` для экранов.

> [!TIP]
> Если экран уже существует — используй `edit_screens` и `generate_variants` вместо создания нового.
> Пример: `edit_screens(projectId: "<id>", selectedScreenIds: ["<screenId>"], prompt: "...")`

---

## Workflow-карточки (MCP-сценарии)

### Сценарий 1: Rapid Screen Ideation
```
Цель: Быстро показать 2–3 варианта экрана для согласования
Модель: GEMINI_3_FLASH
Шаги:
1. create_project(title) или выбрать существующий
2. generate_screen_from_text(prompt, GEMINI_3_FLASH) → screenId
3. generate_variants(screenId, prompt, { numberOfVariants: 3 })
4. Показать варианты пользователю (get_screen для каждого)
5. Выбрать → edit_screens для уточнений
DoD: Layout выбран и согласован
```

### Сценарий 2: Итерация существующего экрана
```
Цель: Улучшить существующий экран по feedback
Модель: GEMINI_3_FLASH → GEMINI_3_PRO для финала
Шаги:
1. list_screens(projectId) → найти screenId
2. get_screen → увидеть текущее состояние
3. edit_screens(screenId, prompt с правками, GEMINI_3_FLASH)
4. Повторить 2–3 раза
5. Финальная итерация с GEMINI_3_PRO
DoD: Экран прошёл 2+ итерации, пользователь согласовал
```

### Сценарий 3: State Coverage
```
Цель: Покрыть все состояния экрана (loading/empty/error/success)
Модель: GEMINI_3_FLASH
Шаги:
1. generate_screen_from_text → default state
2. generate_screen_from_text → "Same screen but loading state with skeletons"
3. generate_screen_from_text → "Same screen but empty state"
4. generate_screen_from_text → "Same screen but error state with inline message"
5. Все 4 screenId → документировать в Screen Inventory
DoD: 4 состояния сгенерированы
```

### Сценарий 4: Component Template
```
Цель: Сгенерировать/обновить UI-компонент по дизайн-спецификации
Модель: GEMINI_3_FLASH → GEMINI_3_PRO
Device: AGNOSTIC (для modal/popup/widget) или DESKTOP (для dashboard)
Шаги:
1. Взять Template Brief / Design Spec
2. Извлечь: уникальные элементы, цвета, стиль
3. generate_screen_from_text(prompt с компонентом + визуальные элементы, deviceType)
   ИЛИ edit_screens(существующий screenId) если обновляем
4. edit_screens → 2–3 итерации по правкам
5. get_screen → получить код для DEV
6. Сверка с $design_parity_review
DoD: Компонент визуально соответствует спецификации, все элементы видны
```

---

## Примеры промптов

> Полная коллекция готовых промптов: `examples/scr_prompts.md`

### Glassmorphism Modal
```
Modal dialog, 400×500px container, centered overlay on a page.
Glassmorphism style: frosted glass background (rgba(255,255,255,0.15)),
backdrop-filter: blur(20px), border: 1px solid rgba(255,255,255,0.2).
Elements: close button (top-right, ×), header image area (top),
headline "Your Title" (24px bold), body text (14px),
content area with action button,
CTA button (full width, gradient accent, rounded 12px).
Font: Inter. No external illustrations. Dark overlay behind modal.
Default state.
```

### Dashboard — Admin Settings Editor
```
Web admin dashboard, desktop. SaaS-style panel.
Left sidebar: navigation links (Dashboard, Content, Settings, Analytics).
Main content area: Settings editor with live preview.
Top: section selector (tabs), page title.
Center: split layout — left: form controls (color pickers, text inputs,
dropdowns for font/size/position, toggle switches),
right: live preview of content in a centered frame.
Bottom: "Save" primary button, "Reset" secondary button.
Color: white background (#FAFAFA), sidebar dark (#1A1A2E), accent (#4361EE).
Font: Inter 14px. Border-radius: 8px. Subtle shadow on cards.
Loaded state with sample data filled in.
```

---

## Anti-patterns при работе со Stitch MCP

- ❌ Повторять `generate_screen_from_text` если первый вызов «повис» — дождаться
- ❌ Использовать `GEMINI_3_PRO` для первых экспериментов — сначала `GEMINI_3_FLASH`
- ❌ Отдавать Stitch-код DEV без пометки "scaffold only"
- ❌ Генерировать 20+ экранов в одном проекте без структурирования
- ❌ Промпт «сделай красиво» без деталей — результат непредсказуем
- ❌ Принимать первую генерацию без `edit_screens` — всегда 2–3 итерации
- ❌ Использовать Stitch ДО получения Approved на UX Proposal
- ❌ Копировать Stitch inline-стили в продакшн вместо замены на DS-токены
- ❌ Сравнивать реализацию со Stitch-output — сравнивать с Figma-финалом
- ❌ Удалять/пересоздавать экраны вместо `edit_screens` — теряется история итераций

---

## Definition of Done (Stitch MCP output → Figma)

Stitch-материал считается готовым к передаче в Figma, когда:

- [ ] Выбран финальный вариант (не черновик)
- [ ] Пройдено ≥2 итерации через `edit_screens`
- [ ] Все ключевые состояния экрана покрыты (default + loading/empty/error/success)
- [ ] Промпт сохранён (в deliverables для воспроизводимости)
- [ ] `get_screen` подтверждает корректный output
- [ ] Screen ID задокументирован в Screen Inventory

## Definition of Done (Figma-доработка после Stitch)

Figma-материал считается готовым к Handoff, когда:

- [ ] Шрифты → проектные (Inter / SF Pro / проектные)
- [ ] Цвета → привязаны к DS-токенам
- [ ] Spacing → 4/8px grid
- [ ] Компоненты → заменены на DS components (если есть DS)
- [ ] Пометка `[Stitch-generated]` в Figma-слоях для отслеживания
- [ ] a11y baseline: контраст ≥4.5:1, touch targets ≥44px
- [ ] Пройдена сверка через `$design_parity_review` → ≤0 P0

---

## Связь с другими skills и pipeline

| Этап UX/UI | Роль Stitch MCP | Связанный skill |
|------------|-----------------|-----------------|
| Clarification (шаг 2) | **Не использовать** — ещё нет Approved | — |
| UX Proposal (шаг 3) | Опционально: `generate_screen_from_text` для быстрых wireframe-вариантов | — |
| Screen Inventory | `generate_screen_from_text` для каждого экрана → `get_screen` | `$design_intake` |
| Handoff → DEV | `get_screen` → код как scaffold + Figma-финал | — |
| Parity Review | Сравнивать реализацию с **Figma**, не со Stitch-output | `$design_parity_review` |

> [!CAUTION]
> **Source of truth определяется пользователем** на этапе UX Clarification (обязательный вопрос #2).
> Варианты: **(a) Stitch** — parity review по Stitch-скриншотам через MCP,
> **(b) Figma** — parity review по Figma-макетам, **(c) HTML-референс** — parity review по файлам из репозитория.
> Если source of truth не определён — считать 🔴 P0 BLOCKER, запросить у пользователя.

---

## Выход (Deliverables)

### Stitch Output Package
- **Project ID** и **Screen IDs** (для воспроизводимости и итераций)
- **Промпт** (сохранённый)
- **Список итераций** (какие `edit_screens` были выполнены)
- **State coverage:** какие состояния покрыты (screenId для каждого)

### Передача DEV (если код)
- **HTML/CSS scaffold** из `get_screen` с пометкой "Stitch-generated, needs DS integration"
- **Layout reference:** какие секции, порядок, responsive breakpoints
- **НЕ передавать:** inline-стили как финальные, цвета без токенов

---

## Формат ответа

### Summary
Краткий итог: что сгенерировано, сколько вариантов, какой выбран. Project ID и Screen IDs.

### Deliverables
- Stitch Output Package (Screen IDs / код / Figma-экспорт)
- Промпт (для воспроизводимости)

### Decisions
Какой вариант выбран и почему.

### Risks/Blockers
- Лимиты генераций (оставшийся бюджет)
- Консистентность (если >3 экранов)

### Open Questions
Нерешённые вопросы по layout/стилю.

### Next Actions (IDs: UX-xx)
- UX-xx: доработка в Figma
- UX-xx: сверка через `$design_parity_review`

---

## Ресурсы

- **Stitch:** https://stitch.withgoogle.com
- **Google Blog:** https://developers.googleblog.com/en/stitch-a-new-way-to-design-uis/
- **MCP Server:** StitchMCP (подключён к агенту)
- **Примеры промптов:** `examples/scr_prompts.md`
- **Бюджет генераций:** `resources/budget_planner.md`
- **Связанные skills:** `$design_intake`, `$design_parity_review`
