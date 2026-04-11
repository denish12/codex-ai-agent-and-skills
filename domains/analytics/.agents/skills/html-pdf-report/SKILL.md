---
name: html-pdf-report
description: Генерация self-contained HTML-отчёта для печати в PDF — CSS print layout, Chart.js, Mermaid
---
# HTML/PDF-отчёт — Генерация self-contained HTML для печати в PDF

## Когда использовать
- При реализации **финального аналитического отчёта** по Report Design Spec от Дизайнера.
- При создании **self-contained HTML-файла** с Chart.js, Mermaid и print-optimized CSS.
- При генерации **PDF-ready документа** через Print-to-PDF в браузере.
- При вёрстке **аналитических отчётов** с таблицами, матрицами, графиками и диаграммами.

## Вход

| Поле | Обязательно | Описание |
|------|:-----------:|----------|
| Report Design Spec | ✅ | Структура секций, визуализации, emphasis levels |
| Executive Summary Draft | ✅ | Черновик от Дизайнера |
| Color Palette | ✅ | Цвета primary, secondary, accent и т.д. |
| Visualization Map | ✅ | Список визуализаций с типами и данными |
| Raw text отчётов | ✅ | Заключение Медиатора, Alpha/Beta Reports, Brief |
| Числовые данные для графиков | ✅ | Извлечённые из отчётов или предоставленные |

## Источники данных
1. Report Design Spec от Дизайнера — структура, визуализации, палитра.
2. session-1 через session-4 handoff файлы — raw text для секций и приложений.

## Протокол

### Шаг 0 — Валидация входов
1. Проверить наличие Report Design Spec (P0 BLOCKER если отсутствует).
2. Проверить наличие всех raw text артефактов.
3. Извлечь числовые данные для Chart.js из отчётов.
4. Если данные неполны — запросить у пользователя.

### Шаг 1 — HTML Skeleton
1. `<!DOCTYPE html>` с `lang="ru"`, `charset="UTF-8"`.
2. CDN: Chart.js 4.x, Mermaid 10.x.
3. `<style>` для всех CSS, `<script>` для Chart.js и Mermaid init.
4. Структура body: `report → title-page → toc → executive-summary → main-section → appendices`.

### Шаг 2 — CSS (Base + Print)
1. Base reset: box-sizing, system fonts, 11pt, line-height 1.6.
2. Typography: h1 24pt, h2 18pt + border, h3 14pt.
3. Components: callout-box, pull-quote, data-table, matrix-2x2, chart-container.
4. Print: `@page { size: A4; margin: 20mm }`, page breaks, `animation: false` для canvas.

### Шаг 3 — Chart.js
1. Для каждого графика: `<canvas id="chart-N">` + `new Chart(...)`.
2. Типы: bar, line, pie/doughnut, radar, scatter.
3. Обязательно: `animation: false`, `responsive: true`, палитра из спецификации.

### Шаг 4 — Mermaid
1. `mermaid.initialize({ startOnLoad: true, theme: 'neutral', securityLevel: 'loose' })`.
2. Типы: flowchart, mindmap, quadrantChart.
3. `<noscript>` fallback, `page-break-inside: avoid`.

### Шаг 5 — Tables / Matrices
1. Data tables: `<table class="data-table">`, alternating rows, header с primary background.
2. 2x2 matrices: CSS Grid (1fr 1fr), цветовая кодировка ячеек.

### Шаг 6 — TOC
1. `<nav>` с `<ol class="toc-list">`, якорные ссылки.
2. Каждая секция — уникальный `id`.

### Шаг 7 — Page Breaks
1. Title/TOC: `page-break-after: always`.
2. Appendices: `page-break-before: always`.
3. Таблицы/графики: `page-break-inside: avoid`.

### Шаг 8 — Assembly
1. Собрать все компоненты в единый HTML.
2. Проверить: все id уникальны, все canvas имеют конфигурацию, TOC ссылки корректны.

## HTML Template (ключевые паттерны)

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>[TITLE]</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
    <style>
        /* BASE: box-sizing, system fonts, 11pt */
        /* TYPOGRAPHY: h1-h4, blockquote */
        /* LAYOUT: .report max-width 210mm, padding 20mm */
        /* COMPONENTS: callout, pull-quote, data-table, matrix-2x2, chart-container */
        /* PRINT: @page A4 20mm, page breaks, animation off */
    </style>
</head>
<body>
<div class="report">
    <section class="title-page" id="title">...</section>
    <section class="toc" id="toc">...</section>
    <section class="executive-summary" id="executive-summary">...</section>
    <section class="main-section" id="main">...</section>
    <section class="appendix" id="appendix-a">...</section>
    <section class="appendix" id="appendix-b">...</section>
    <section class="appendix" id="appendix-c">...</section>
    <section class="appendix" id="appendix-d">...</section>
</div>
<script>
    mermaid.initialize({ startOnLoad: true, theme: 'neutral', securityLevel: 'loose' });
    // Chart.js: new Chart(ctx, { type, data, options: { animation: false, responsive: true } })
</script>
</body>
</html>
```

## Валидация (Quality Gate)

- [ ] HTML self-contained (нет внешних CSS/JS кроме CDN)
- [ ] Все секции из Design Spec реализованы
- [ ] Все визуализации из Visualization Map присутствуют
- [ ] Палитра соответствует спецификации
- [ ] TOC якоря работают
- [ ] `@media print` корректен (A4, 20mm, page breaks)
- [ ] Chart.js: `animation: false`, `responsive: true`
- [ ] HTML валиден (нет дублированных id, незакрытых тегов)

## Handoff
Результат → Пользователь (открыть в браузере → Ctrl+P → Save as PDF) / Дирижёр (Release Gate).

## Anti-patterns

| Ошибка | Почему плохо | Как правильно |
|--------|-------------|---------------|
| Внешние CSS-фреймворки | Не работает offline | Только inline CSS |
| Animation: true | Пустые графики в PDF | Всегда `animation: false` |
| Fixed canvas size | Не масштабируется | `responsive: true` |
| Пропуск page breaks | Всё сливается | `page-break-before: always` на appendices |
| Broken TOC anchors | Навигация сломана | Уникальные id на каждой секции |

## Шаблон вывода

```
## HTML Report: [Название]
**Файл:** report.html  |  **Секций:** N

### Components
- Charts: N | Mermaid: N | Tables: N | Matrices: N

### Print
Открыть в Chrome/Edge → Ctrl+P → Save as PDF → Portrait → Background graphics ON
```
