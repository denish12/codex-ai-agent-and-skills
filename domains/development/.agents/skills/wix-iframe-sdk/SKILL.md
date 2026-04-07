---
name: wix-iframe-sdk
description: Практический skill по legacy Wix iFrame SDK (deprecated) — поиск методов, событий, параметров, ограничений SDK/Editor и готовых Syntax/Example блоков из полной локальной базы. Использовать, когда нужно отвечать/разрабатывать/мигрировать код для Wix iFrame SDK, Wix Hive и deprecated HTTP API.
---

# Skill: Wix iFrame SDK

Рабочий справочник по deprecated Wix iFrame SDK с полной offline-базой (9300+ строк).

**Разделы:**
1. [Scope и Reference](#1-scope)
2. [Workflow](#2-workflow)
3. [Fast Search](#3-fast-search)
4. [Cheat Sheet: Top Methods](#4-cheat-sheet)
5. [Output Template](#5-output-template)
6. [Migration Table](#6-migration-table)
7. [Response Rules](#7-response-rules)
8. [Boundaries](#8-boundaries)

---

## 1. Scope

### Reference file
- **Source of truth:** `references/wix-sdk-iframe.md` (427KB, 9312 lines)
- **Structure:** 22 DOC sections, each containing numbered Functions with Summary/Syntax/Example/Details

### Namespaces covered

| # | Namespace | DOC | Key Methods |
|---|-----------|-----|-------------|
| 01 | Using the SDK | DOC-01 | Setup, versions |
| 02 | **Wix** (core) | DOC-02 | addEventListener, resizeWindow, getSiteInfo, navigateTo, openModal |
| 03 | Wix.Activities | DOC-03 | postActivity |
| 04 | Wix.Analytics | DOC-04 | reportEvent |
| 05 | Wix.Billing | DOC-05 | openBillingPage |
| 06 | Wix.Contacts | DOC-06 | getSiteMembers |
| 07 | **Wix.Dashboard** | DOC-07 | getEditorUrl, openMediaDialog |
| 08 | Wix.Data.Public | DOC-08 | getAll, set, remove |
| 09 | Wix.Features | DOC-09 | isSupported |
| 10 | Wix.Preview | DOC-10 | Preview-specific calls |
| 11 | **Wix.Settings** | DOC-11 | getSiteColors, getStyleParams, triggerSettingsUpdated, refreshAppByCompIds |
| 12 | Wix.PubSub | DOC-12 | publish, subscribe |
| 13 | **Wix.Styles** | DOC-13 | getStyleParams, getSiteColors, getSiteTextPresets |
| 14 | **Wix.Utils** | DOC-14 | getInstanceId, getOrigCompId, getCompId, getViewMode, getLocale, getDeviceType |
| 15 | Wix.Worker | DOC-15 | Worker-specific calls |
| 16-17 | Wix Hive (Deprecated) | DOC-16/17 | Introduction |
| 18 | Hive Activities | DOC-18 | Activity types |
| 19-22 | HTTP API (Deprecated) | DOC-19..22 | In-App Purchases, Contacts, Activities |

---

## 2. Workflow

```
1. Определи цель запроса:
   □ Найти метод/событие
   □ Понять параметры/return value
   □ Найти пример использования
   □ Определить совместимость (SDK/Editor version)
   □ Миграция → современный API

2. Найди в reference (grep_search или view_file):
   → references/wix-sdk-iframe.md

3. Извлеки блоки:
   → Summary
   → Syntax
   → Example
   → Parameters / Return / Limitations

4. Если Example отсутствует:
   → Явно: "Not provided in source section."
   → НЕ придумывай примеры как цитату из доки
   → Можешь написать свой, но пометь: "Implementation example (not from docs):"

5. Если нужно написать код:
   → Опирайся на Syntax + ограничения
   → Добавь ⚠️ DEPRECATED пометку
   → Предложи миграцию (см. Migration Table)
```

---

## 3. Fast Search

### Grep patterns для поиска в reference file

```bash
# Найти DOC section (namespace)
grep_search: Query="## DOC-11:" → Wix.Settings

# Найти функцию по имени
grep_search: Query="getSiteColors"

# Найти все Function headers в namespace
grep_search: Query="#### Function" (в конкретном DOC section)

# Найти Syntax блок
grep_search: Query="- Syntax:"

# Найти Example блок
grep_search: Query="- Example:"

# Найти SDK version requirement
grep_search: Query="SDK Version"

# Найти deprecated warnings
grep_search: Query="Deprecated"
```

### Пример поиска в action

```
Задача: Найти как работает Wix.Settings.getSiteColors

1. grep_search → Query="getSiteColors", SearchPath="references/wix-sdk-iframe.md"
   → Находим line number

2. view_file → StartLine, EndLine (Function block ~30–50 строк)
   → Получаем Summary, Syntax, Example, Parameters

3. Формируем ответ по Output Template (section 5)
```

---

## 4. Cheat Sheet: Top Methods

### Wix (core) — самые используемые

| Method | Что делает | SDK |
|--------|-----------|-----|
| `Wix.addEventListener(event, cb)` | Подписка на события (SETTINGS_UPDATED, STYLE_PARAMS_CHANGE, THEME_CHANGE) | 1.11+ |
| `Wix.resizeWindow(width, height, cb)` | Изменить размер iframe компонента | 1.24+ |
| `Wix.getSiteInfo(cb)` | Получить baseUrl, siteTitle, pageTitle, url | 1.3+ |
| `Wix.getSiteMap(cb)` | Получить страницы/ссылки сайта | 1.81+ |
| `Wix.navigateTo(pageId, cb)` | Навигация на страницу сайта | 1.25+ |
| `Wix.openModal(url, width, height, cb)` | Открыть модальное окно | 1.16+ |
| `Wix.closeWindow(msg)` | Закрыть модал/popup | 1.16+ |
| `Wix.currentMember(cb)` | Получить текущего Site Member | 1.6+ |
| `Wix.getBoundingRectAndOffsets(cb)` | Позиция и размер компонента | 1.26+ |
| `Wix.getComponentInfo(cb)` | compId, pageId, showOnAllPages | 1.64+ |

### Wix.Settings — настройки из Settings Panel

| Method | Что делает | SDK |
|--------|-----------|-----|
| `Wix.Settings.getSiteColors(cb)` | Получить палитру сайта (30 цветов) | 1.22+ |
| `Wix.Settings.getStyleParams(cb)` | Получить style params компонента | 1.22+ |
| `Wix.Settings.triggerSettingsUpdated(data)` | Отправить SETTINGS_UPDATED событие в widget | 1.17+ |
| `Wix.Settings.refreshAppByCompIds(compIds)` | Перезагрузить компоненты по ID | 1.45+ |
| `Wix.Settings.openMediaDialog(mediaType, multiSelect, cb)` | Открыть Wix Media Manager | 1.45+ |
| `Wix.Settings.openBillingPage()` | Открыть страницу оплаты | 1.24+ |

### Wix.Styles — стили (Widget/Page side)

| Method | Что делает | SDK |
|--------|-----------|-----|
| `Wix.Styles.getStyleParams(cb)` | Получить style params (colors, fonts, numbers, booleans) | 1.22+ |
| `Wix.Styles.getSiteColors(cb)` | Палитра сайта (на стороне widget) | 1.22+ |
| `Wix.Styles.getSiteTextPresets(cb)` | Текстовые пресеты сайта | 1.22+ |

### Wix.Utils — утилиты

| Method | Что делает | SDK |
|--------|-----------|-----|
| `Wix.Utils.getInstanceId()` | Получить instanceId приложения (sync!) | 1.24+ |
| `Wix.Utils.getOrigCompId()` | Получить original component ID | 1.24+ |
| `Wix.Utils.getCompId()` | Получить component ID | 1.24+ |
| `Wix.Utils.getViewMode()` | 'editor' / 'preview' / 'site' | 1.12+ |
| `Wix.Utils.getLocale()` | Локаль сайта | 1.24+ |
| `Wix.Utils.getDeviceType()` | 'desktop' / 'mobile' | 1.26+ |
| `Wix.Utils.getWidth()` | Ширина компонента | 1.24+ |

### Wix.PubSub — коммуникация между компонентами

| Method | Что делает | SDK |
|--------|-----------|-----|
| `Wix.PubSub.publish(eventName, data, isPersistent)` | Отправить событие другим компонентам | 1.36+ |
| `Wix.PubSub.subscribe(eventName, cb, receivePast)` | Подписаться на событие | 1.36+ |
| `Wix.PubSub.unsubscribe(eventName, cb)` | Отписаться | 1.36+ |

### Ключевые события (addEventListener)

| Event | Data | Когда |
|-------|------|-------|
| `SETTINGS_UPDATED` | Custom JSON | Settings Panel → Widget (настройки изменились) |
| `STYLE_PARAMS_CHANGE` | `{colors, numbers, booleans, fonts}` | Пользователь изменил стиль |
| `THEME_CHANGE` | `{fonts, siteTextPresets, siteColors, style}` | Изменилась палитра сайта |
| `EDIT_MODE_CHANGE` | `{editMode: 'editor'/'preview'}` | Переключение editor↔preview |
| `DEVICE_TYPE_CHANGED` | `{deviceType: 'desktop'/'mobile'}` | Переключение desktop↔mobile |
| `PAGE_NAVIGATION` | `{toPage, fromPage}` | Навигация по страницам |
| `COMPONENT_DELETED` | `{}` | Компонент удалён |
| `SITE_PUBLISHED` | `{}` | Сайт опубликован |

---

## 5. Output Template

При ответе на вопрос по SDK используй этот формат:

```markdown
### `Wix.Settings.getSiteColors(callback)`

**Summary:** Retrieves the site's color palette...

**Syntax:**
\`\`\`javascript
Wix.Settings.getSiteColors(callback)
\`\`\`

**Example:**
\`\`\`javascript
Wix.Settings.getSiteColors(function(colors) {
    console.log(colors);
});
\`\`\`

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| callback (required) | Function | Receives array of color objects |

**Return (via callback):** Array of 30 color objects: `{ reference, value }`

**SDK Version:** 1.22.0+ | **Editor:** New Editor | **Components:** Settings

⚠️ **DEPRECATED:** This is part of the legacy iFrame SDK. Modern alternative: Wix Dashboard SDK / Wix Blocks.
```

---

## 6. Migration Table

| iFrame SDK (deprecated) | Современная замена | Примечание |
|------------------------|-------------------|-----------|
| `Wix.addEventListener` | Dashboard SDK events / Wix Blocks | Event model changed |
| `Wix.resizeWindow` | CSS / Dashboard SDK `setHeight` | Automatic sizing preferred |
| `Wix.getSiteInfo` | REST API `Get Site Properties` | Server-side |
| `Wix.Settings.getSiteColors` | Wix Design Tokens / CSS Variables | Auto-applied in Blocks |
| `Wix.Settings.triggerSettingsUpdated` | Dashboard SDK messaging | — |
| `Wix.Styles.getStyleParams` | Wix Blocks Design API | — |
| `Wix.Utils.getInstanceId` | Dashboard SDK / `instance` query param | — |
| `Wix.Utils.getViewMode` | Dashboard SDK context | — |
| `Wix.PubSub.publish/subscribe` | Dashboard SDK messaging | — |
| `Wix.openModal` | Dashboard SDK `openModal` | — |
| `Wix.Dashboard.openMediaDialog` | Dashboard SDK Media Manager | — |
| `Wix.Data.Public` | Wix Data Collections (REST) | — |
| `Wix Hive` | Wix CRM REST API | Fully deprecated |
| `HTTP API` | Wix REST API | Fully deprecated |

> [!WARNING]
> Если ваше Wix-приложение **использует** legacy iFrame SDK (Dashboard component работает как iframe в Wix) — миграция на Dashboard SDK возможна, но требует переписать всю коммуникацию Settings Panel ↔ Widget.

---

## 7. Response Rules

1. **Структура ответа:** Method → Syntax → Example → Parameters → Notes (см. Output Template)
2. **Цитирование:** Если пользователь просит "как в документации" — используй текст из reference без искажения
3. **Отсутствие Example:** Явно отметь `Not provided in source section.` — не изобретай примеры от имени доки
4. **Конфликты:** Указывай в каком DOC и Function найден фрагмент: `DOC-11, Function 03`
5. **Deprecated:** Всегда добавляй `⚠️ DEPRECATED` и ссылку на Migration Table

---

## 8. Boundaries

- Это **legacy/deprecated** стек. Всегда явно отмечай deprecated-контекст
- **Не смешивай** iFrame SDK с современными SDK/REST методами без явного указания на миграцию
- Reference file — единственный источник правды для iFrame SDK. Не выдумывай методы, которых нет в файле
- Если метода нет в reference — отвечай: `"Method not found in iFrame SDK reference. It may be from a different SDK or a newer API."`

---

## См. также
- `$wix-self-hosted-embedded-script` — Embedded Script extension (использует iFrame SDK для Settings Panel)
- `$react-15-3-wix-iframe` — React 15.3 patterns для Wix iFrame (если применимо)
- Wix Dashboard SDK: https://dev.wix.com/docs/sdk/api-reference/dashboard/introduction
