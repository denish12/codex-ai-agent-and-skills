---
name: qa_browser_testing
description: Визуальное E2E-тестирование через встроенный Antigravity Browser — Pre-Auth Handoff, browser_subagent, скриншоты, visual parity, evidence-сбор.
last_verified: 2026-03-11
version: 1.0
---

# Skill: Antigravity Browser Testing

## Назначение

Тестирование через **встроенный браузер Google Antigravity** (`browser_subagent`).
Основной инструмент Tester-агента для визуальной проверки, UI parity и DEMO gate.

> [!IMPORTANT]
> Этот скил — для **ручного-автоматизированного** тестирования внутри Antigravity.
> Для CI/CD автоматизации (spec-файлы, pipeline) → `$qa_e2e_playwright`.

---

## Когда использовать

- Тестирование Wix Dashboard / Shopify Admin (закрытая среда)
- Visual parity: сравнение реализации с дизайн-источником (Stitch / Figma / HTML-ref)
- DEMO gate: проверка DEV-xx срезов
- Быстрая regression проверка UI
- Сбор evidence (скриншоты + видео) для QA Report

## Когда НЕ использовать

- Нужна автоматизация в CI/CD pipeline → `$qa_e2e_playwright`
- Unit/integration тестирование → Vitest
- API contract testing → `$qa_api_contract_tests`
- Вычислительная логика → unit-тесты

---

## Инструменты

| Инструмент | Что делает | Когда |
|-----------|-----------|-------|
| `browser_subagent` | Открывает страницу, кликает, вводит текст, проверяет UI | Основной |
| `capture_browser_screenshot` | Делает скриншот текущей страницы | Каждый шаг проверки |
| `open_browser_url` | Переходит на URL | Навигация |
| `read_browser_page` | Читает DOM/текст страницы | Проверка контента |
| `click_browser_element` | Кликает по элементу | Интерактивная проверка |

> [!NOTE]
> Каждый вызов `browser_subagent` автоматически записывает `.webp` видео.
> Видео = evidence для QA report и walkthrough.

---

## Pre-Auth Handoff (Wix / Shopify)

> **Триггер:** пользователь указывает **«Wix»** или **«Shopify»** при переходе к TEST gate.

### Протокол

**Шаг 1 — Запросить авторизацию:**
```
🌐 Pre-Auth Handoff: обнаружен триггер [Wix/Shopify].
Пожалуйста:
1. Откройте браузер Antigravity
2. Залогиньтесь в [Wix Dashboard / Shopify Admin]
3. Перейдите на страницу, которую нужно протестировать
4. Напишите: "Браузер готов"
```

**Шаг 2 — Пользователь авторизуется и открывает нужную страницу.**

**Шаг 3 — Tester запускает `browser_subagent` со строгими правилами:**
- ❌ НЕ открывать новые URL (только работать с текущей страницей)
- ❌ НЕ пытаться навигировать на localhost
- ✅ Делать скриншот на КАЖДОМ шаге проверки
- ✅ Кликать, переключать, проверять UI
- ✅ Записать видео (`.webp`) для evidence

**Шаг 4 — Анализ скриншотов и формирование findings.**

### Ограничения

| Работает ✅ | Не работает ❌ |
|------------|---------------|
| `manage.wix.com` | `localhost` |
| `admin.shopify.com` | Self-signed SSL |
| Любой URL с валидным SSL | Wix sandbox iFrame API |
| Auth state сохраняется | Session expires (~24h) |

---

## Visual Parity через Antigravity Browser

> [!IMPORTANT]
> **Source of truth определяется UX Designer** (обязательный вопрос #2 Clarification Protocol).
> Если не указан — запросить перед проверкой.

### Алгоритм

```
1. Получить reference-скриншот (зависит от Source of Truth):
   (a) Stitch → get_screen() → скачать screenshot через browser_subagent
   (b) Figma → пользователь предоставляет экспорт PNG
   (c) HTML-ref → открыть HTML-файл в browser_subagent → capture_screenshot

2. Получить actual-скриншот:
   → browser_subagent: открыть реализацию → capture_screenshot

3. Визуально сравнить (Tester анализирует оба скриншота):
   → Структура: элементы на местах?
   → Типографика: шрифт, размер, цвет?
   → Spacing: отступы соответствуют?
   → Цвета: палитра верна?
   → Состояния: все реализованы?

4. Оформить finding:
   → UX-PARITY-xx: PASS / FAIL + скриншот + описание
```

### Пример: Stitch как Source of Truth

```
Шаг 1: get_screen(projectId, screenId) → получить screenshot URL
Шаг 2: browser_subagent → открыть screenshot URL → capture_screenshot → сохранить как reference
Шаг 3: browser_subagent → открыть реализацию (Wix Dashboard) → capture_screenshot → сохранить как actual
Шаг 4: Сравнить reference vs actual → зафиксировать расхождения
```

### Пример: Figma как Source of Truth

```
Шаг 1: Пользователь предоставляет PNG экспорт из Figma
Шаг 2: browser_subagent → открыть реализацию → capture_screenshot
Шаг 3: Сравнить Figma PNG vs actual screenshot
Шаг 4: Оформить findings
```

### Пример: HTML-ref как Source of Truth

```
Шаг 1: browser_subagent → открыть popup_templates/glassmorphism.html → capture_screenshot
Шаг 2: browser_subagent → открыть реализацию → capture_screenshot
Шаг 3: Сравнить reference vs actual
Шаг 4: Оформить findings
```

---

## DEMO Gate через Browser

### Протокол DEMO-xx

```
1. Получить DEMO-инструкции от Dev (DEMO-xx)
2. Pre-Auth (если Wix/Shopify) или открыть URL напрямую
3. browser_subagent: выполнить шаги из DEMO
4. capture_screenshot на КАЖДОМ шаге
5. Зафиксировать: PASS/FAIL + скриншот + описание
6. Embed в walkthrough.md
```

### Формат evidence

```markdown
### DEMO-01: Template Selection

![Step 1: Open editor](path/to/screenshot_step1.png)
Статус: ✅ PASS — редактор открылся, шаблоны загрузились

![Step 2: Select Glassmorphism](path/to/screenshot_step2.png)
Статус: ✅ PASS — preview обновился корректно

![Step 3: Save changes](path/to/screenshot_step3.png)
Статус: ❌ FAIL — toast не появился после сохранения
```

---

## browser_subagent Best Practices

### Правила вызова

```
browser_subagent(
  Task: "Detailed description of what to check and what to return",
  TaskName: "Short descriptive name",
  RecordingName: "lowercase_with_underscores"
)
```

### Что указывать в Task

- **Конкретные элементы** для проверки (data-testid, текст, CSS)
- **Ожидаемый результат** (что должно быть видно)
- **Условие возврата** (когда считать задачу завершённой)
- **Скриншоты** — когда именно их делать

### Пример хорошего Task

```
Navigate to the Widget Design page. Verify that:
1. Template selector shows at least 3 templates
2. Click on "Glassmorphism" template
3. Verify live preview updates with glassmorphism styling
4. Take a screenshot after each step.
Return: screenshot paths and PASS/FAIL status for each step.
```

### Пример плохого Task ❌

```
Check if the page works.
```

---

## Anti-patterns

- ❌ `browser_subagent` без конкретных шагов — «проверь страницу» слишком размыто
- ❌ Открывать новые URL после Pre-Auth — потеряем auth state
- ❌ Не делать скриншоты — нет evidence = нет proof
- ❌ Визуальная проверка без reference — нужен baseline (Stitch/Figma/HTML)
- ❌ Игнорировать `.webp` записи — это готовый evidence
- ❌ Тестировать бизнес-логику через browser — используй unit-тесты

---

## Артефакты (Deliverables)

| Артефакт | Формат | Где |
|----------|--------|-----|
| Скриншоты шагов | `.png` | Embed в walkthrough.md |
| Видео-записи | `.webp` | Embed в walkthrough.md |
| DEMO Results | Таблица | В QA Report |
| UX Parity Results | Таблица | В QA Report |
| Findings | P0/P1/P2 блоки | В QA Report |

---

## Выход (формат)

### Browser Test Summary
| Step | Action | Expected | Actual | Screenshot | Status |
|------|--------|----------|--------|------------|--------|
| 1 | ... | ... | ... | 📸 link | PASS/FAIL |

### UX Parity Results
| UX-PARITY-xx | Screen | Source of Truth | Findings | Status |
|--------------|--------|----------------|----------|--------|
| ... | ... | Stitch / Figma / HTML-ref | ... | PASS/FAIL |

### DEMO Results
| DEMO-xx | Steps verified | Issues | Status |
|---------|---------------|--------|--------|
| ... | 5/5 | none | ✅ PASS |
