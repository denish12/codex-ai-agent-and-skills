---
name: google-stitch-content
description: Генерация визуальных концепций контента через Google Stitch (AI) с MCP — карусели, обложки, баннеры, social media визуалы
metadata:
  version: "1.0"
  last_verified: "2026-04-04"
  mcp_server: "StitchMCP"
  adapted_from: ".agents/skills/google-stitch-skill (UX/UI domain, v3.0)"
---

# Skill: Google Stitch для контент-визуалов (MCP-Integrated)

## Назначение

Описывает, **как и когда** Visual Concept использует Google Stitch для генерации визуальных концепций контента:
- Быстрая генерация визуальных макетов для соцсетей, баннеров, карусельных слайдов.
- Rapid ideation: 2-3 варианта визуала за минуты.
- Генерация HTML/CSS-кода для email-шаблонов и лендингов.

> [!IMPORTANT]
> Stitch доступен **напрямую через MCP** — агент генерирует, итерирует и управляет экранами без ручного копирования.
> Stitch — инструмент **быстрого прототипирования визуальных концепций**, а не финального дизайна.
> Output требует проверки на brand compliance и адаптации под `$brand-guidelines`.

> Адаптирован из `.agents/skills/google-stitch-skill` (UX/UI domain) под контент-домен.

---

## Что такое Google Stitch

Google Stitch — AI-инструмент от Google Labs. Превращает текстовые промпты в UI-макеты с экспортом в Figma и HTML/CSS/React код.

**Движок:** Gemini 3 Pro / Gemini 3 Flash.
**URL:** https://stitch.withgoogle.com
**Доступ:** Google аккаунт + StitchMCP server подключён к агенту.

---

## Когда использовать в контент-пайплайне

### ✅ Использовать
- Генерация **визуальных макетов** для карусельных слайдов (Instagram, LinkedIn PDF).
- Генерация **обложек** для постов, видео, статей.
- Генерация **баннеров** и визуальных блоков для email-рассылок.
- Быстрое создание **вариантов layout** для A/B тестирования визуалов.
- **Email-шаблоны** — HTML/CSS scaffold для `$email-copywriting`.
- **Landing page** секции — визуальные блоки для лендингов.

### ❌ НЕ использовать
- Для **фото-контента** — Stitch генерирует UI, не фотографии. Для фото → `$image-prompt-engineering` (Midjourney/DALL-E).
- Для **иллюстраций и арт-визуалов** — Stitch ≠ Midjourney. Для арта → `$image-prompt-engineering`.
- Для контента, где нужен **pixel-perfect** результат — Stitch = концепция, не финал.
- Для **видео** — Stitch не поддерживает анимации и видео.

### Место в пайплайне

```
$content-brief (тема, визуальные требования)
       ↓
$moodboard (стиль, палитра, настроение)
       ↓
$visual-brief (детальное ТЗ)
       ↓
[STITCH MCP: Rapid Visual Ideation]    ← этот скил
  generate_screen_from_text → edit_screens → generate_variants
       ↓
$brand-compliance (проверка визуала)
       ↓
$content-review-checklist → $content-release-gate
```

---

## StitchMCP — API Reference (краткая)

| Tool | Назначение | Когда |
|------|-----------|-------|
| `create_project` | Создать проект | Новая кампания / серия визуалов |
| `list_projects` / `get_project` | Найти существующий | Итерация существующей кампании |
| `list_screens` / `get_screen` | Получить экраны / код | Просмотр результатов |
| `generate_screen_from_text` | 🎯 **Генерация визуала по промпту** | Основной инструмент |
| `edit_screens` | Редактирование | Уточнение после первой генерации |
| `generate_variants` | Генерация вариантов | A/B визуалы, layout exploration |

### Модели

| ID | Когда |
|----|-------|
| `GEMINI_3_FLASH` | Первые итерации, перебор вариантов (быстрее) |
| `GEMINI_3_PRO` | Финальные варианты, сложные layouts (качественнее) |

### Device Types для контента

| DeviceType | Контент-использование |
|------------|----------------------|
| `MOBILE` | Instagram Stories/Reels (9:16), мобильные баннеры |
| `DESKTOP` | LinkedIn карусель (16:9), email-шаблоны, лендинг-секции |
| `AGNOSTIC` | Квадратные визуалы (1:1), OG-изображения, универсальные |

---

## Вход

| Поле | Обязательно | Описание |
|------|:-----------:|----------|
| Visual brief | ✅ | Из `$visual-brief` — что изображать, композиция, настроение |
| Brand guidelines | ✅ | Из `$brand-guidelines` — палитра (HEX), шрифты, стиль |
| Платформа + размеры | ✅ | Из `$platform-visual-specs` — для выбора deviceType |
| Текст для визуала | ⬚ | Заголовок, CTA — если текст на визуале |
| Мудборд | ⬚ | Из `$moodboard` — стиль, референсы |

---

## Протокол работы

### Шаг 1 — Подготовка проекта

```
ЕСЛИ кампания/серия → create_project(title: "[Бренд] — [Кампания]")
ЕСЛИ единичный визуал → использовать существующий проект или создать новый
→ запомнить projectId
```

### Шаг 2 — Формирование промпта

Структура промпта для контент-визуалов:

```
[Тип визуала] + [Платформа/размер] + [Контент-элементы] + [Бренд-стиль] + [Ограничения]
```

#### Чеклист промпта для контента

- [ ] **Тип:** Carousel slide / Banner / Email block / Post cover / OG image / Landing section
- [ ] **Размер:** Точные px или ratio (1080×1080, 1080×1350, 1200×627)
- [ ] **Контент-элементы:** Заголовок (текст), подзаголовок, CTA-кнопка, иконки, изображение-плейсхолдер
- [ ] **Бренд:** Цвета (HEX), шрифт, лого (позиция), стиль (minimal / bold / editorial)
- [ ] **Настроение:** Из `$moodboard` или `$visual-brief`
- [ ] **Ограничения:** «No stock photos», «No illustrations», «Text only», safe zones

#### Примеры промптов для контента

**Instagram карусель (слайд):**
```
Social media carousel slide, 1080×1080px.
Bold headline "5 Email Marketing Mistakes" in white, 48px, Inter Bold.
Background: solid dark navy (#1A1A2E). Accent: teal (#00C9A7).
Subtext: "Mistake #1: No segmentation" in 20px, light gray.
Bottom: page indicator dots (5 dots, first active).
Minimal style, no illustrations, no stock photos.
Logo small bottom-right corner.
```

**Email banner:**
```
Email header banner, 600×200px, desktop.
Left: headline "Your Weekly Digest" in 24px Inter Bold, dark text (#1A1A2E).
Right: abstract geometric shape, teal (#00C9A7) accent.
Background: light gray (#F5F5F5). Bottom border: 2px teal line.
Clean, minimal, SaaS-style. No photos.
```

**LinkedIn post image:**
```
Social media post image, 1200×627px, desktop.
Center: large stat "340%" in bold 72px, accent color (#4361EE).
Below: "Growth in AI-generated content in 2026" in 18px, dark gray.
Background: white with subtle grid pattern.
Bottom-left: small logo. Bottom-right: source attribution "McKinsey, 2026" in 12px gray.
Data visualization style, minimal, professional.
```

### Шаг 3 — Генерация

```
generate_screen_from_text(
  projectId: "<id>",
  prompt: "<промпт>",
  deviceType: "MOBILE" | "DESKTOP" | "AGNOSTIC",
  modelId: "GEMINI_3_FLASH"  // Flash для первых итераций
)
→ запомнить screenId
```

> ⚠️ Генерация может занимать до нескольких минут. **НЕ повторять вызов** — дождаться ответа.

### Шаг 4 — Итерация (edit_screens)

2-3 итерации по уточнению:

```
edit_screens(
  projectId: "<id>",
  selectedScreenIds: ["<screenId>"],
  prompt: "Change headline color to #00C9A7, move CTA button to bottom-center",
  modelId: "GEMINI_3_FLASH"
)
```

**Типы правок для контент-визуалов:**
- **Цвет:** `"Change [element] color to [HEX]"`
- **Текст:** `"Replace headline with '[новый текст]'"`
- **Позиция:** `"Move [element] to [position]"`
- **Размер:** `"Make headline larger, 56px"`
- **Удалить:** `"Remove [element]"`
- **Добавить:** `"Add CTA button '[текст]' at bottom-center, teal background"`

### Шаг 5 — Варианты для A/B

```
generate_variants(
  projectId: "<id>",
  selectedScreenIds: ["<screenId>"],
  prompt: "Generate layout variations with different text placement",
  variantOptions: { numberOfVariants: 3 }
)
```

### Шаг 6 — Получение результата

```
get_screen(projectId, screenId, name)
→ код / metadata
→ для карусели: повторить для каждого слайда
```

---

## Карусели — специальный workflow

Для Instagram / LinkedIn каруселей (несколько слайдов):

```
1. create_project(title: "[Бренд] — Carousel: [тема]")
2. Для каждого слайда:
   generate_screen_from_text(prompt: "Slide [N] of [total]: [содержание слайда]")
3. Важно: в каждом промпте указывать единый стиль:
   "Same style as previous: [цвета, шрифт, размер, стиль]"
4. edit_screens для каждого слайда → brand consistency
5. get_screen для каждого → сохранить
```

> ⚠️ Stitch плохо держит консистентность > 3 экранов. Для длинных каруселей (10 слайдов) — генерировать по 2-3, явно повторяя стилевые параметры.

---

## Brand Compliance после Stitch

Stitch **не знает** ваш бренд. После генерации — обязательно проверить:

| Элемент | Проверить | Действие если не совпадает |
|---------|----------|---------------------------|
| Цвета | HEX совпадают с `$brand-guidelines`? | `edit_screens` → исправить цвета |
| Шрифт | Правильный шрифт? | Stitch часто использует системные. Пометить для замены |
| Лого | Правильный вариант, позиция? | `edit_screens` → добавить/переместить |
| Стиль | Соответствует `$moodboard`? | Итерация или re-generate |
| Текст | Без ошибок? Правильный CTA? | `edit_screens` → исправить |
| Safe zone | Ключевой контент не в safe zone? | `edit_screens` → переместить |

---

## Валидация (Quality Gate)

Stitch-визуал считается готовым к передаче если:

- [ ] Пройдено ≥ 2 итерации через `edit_screens`
- [ ] Цвета соответствуют `$brand-guidelines` (HEX проверены)
- [ ] Текст на визуале без ошибок
- [ ] Размеры соответствуют `$platform-visual-specs`
- [ ] Safe zones учтены
- [ ] Для карусели: стиль консистентен между слайдами
- [ ] Screen ID задокументирован
- [ ] Промпт сохранён (для воспроизводимости)
- [ ] A/B варианты сгенерированы (если нужно)

---

## Ограничения Stitch для контента

| Ограничение | Влияние | Workaround |
|-------------|---------|------------|
| Не генерирует фотографии | Только UI/layout, не photo-реалистичные изображения | Для фото → `$image-prompt-engineering` (Midjourney/DALL-E) |
| Консистентность > 3 экранов низкая | Карусели из 10 слайдов — разный стиль | Явно повторять стиль в каждом промпте |
| Нет анимаций | Нельзя сделать animated Stories/Reels | Только статичные визуалы |
| Шрифты — системные | Не знает ваши бренд-шрифты | Пометить для замены, указать шрифт в промпте |
| Не знает бренд | Нет auto-apply brand guidelines | Явно указывать HEX, шрифт, стиль в каждом промпте |
| MCP-генерация медленная | До нескольких минут на экран | Не повторять вызов, дождаться |
| Copy to Figma — только через UI | MCP не поддерживает Figma-экспорт | Ручной шаг через браузер |

---

## Anti-patterns

| Ошибка | Почему плохо | Как правильно |
|--------|-------------|---------------|
| Промпт «красивый баннер для Instagram» | Stitch не угадает стиль, цвета, контент | Конкретный промпт: размер + текст + цвета HEX + стиль |
| Принять первую генерацию без итераций | Первый результат редко идеален | Минимум 2 итерации через `edit_screens` |
| Использовать Stitch для фото | Stitch генерирует UI, не фотографии | `$image-prompt-engineering` для фото |
| Не проверить brand compliance | Цвета, шрифты, лого могут не совпасть | Проверять после каждой генерации |
| Повторять вызов при «зависании» | Дублирование генераций, потеря бюджета | Ждать. Проверить через `get_screen` |
| 10 правок в одном `edit_screens` | Stitch теряет контекст | Максимум 3-5 правок за раз |
| Stitch-output как финальный визуал | Не бренд-compliant, системные шрифты | Stitch = концепция. Финал = после brand check |
| Карусель без единого стиля | Каждый слайд выглядит иначе | Повторять стилевые параметры в каждом промпте |

---

## Интеграция с другими скилами

| Скил | Взаимодействие |
|------|----------------|
| `$visual-brief` | **Источник:** ТЗ для генерации → Stitch-промпт |
| `$brand-guidelines` | **Источник:** цвета, шрифты, стиль → параметры промпта |
| `$moodboard` | **Источник:** настроение, стиль → стилевые параметры промпта |
| `$platform-visual-specs` | **Источник:** размеры, ratio → deviceType и размеры |
| `$image-prompt-engineering` | **Комплемент:** Stitch = UI/layout, image_prompt = фото/арт |
| `$brand-compliance` | **Потребитель:** проверка Stitch-output на соответствие бренду |
| `$email-copywriting` | **Потребитель:** HTML-scaffold из Stitch для email-шаблонов |

---

## Выход (Deliverables)

```
### Stitch Output — [Контент / Кампания]

**Project ID:** [id]
**Screen IDs:** [список]
**Промпт (сохранённый):** [для воспроизводимости]
**Итерации:** [список edit_screens]
**Brand Check:** [✅ цвета / ✅ стиль / ⚠️ шрифт — пометить для замены]
**Варианты:** [A/B — какие, для чего]

→ Передать в `$brand-compliance` → `$content-review-checklist` → `$content-release-gate`
```
