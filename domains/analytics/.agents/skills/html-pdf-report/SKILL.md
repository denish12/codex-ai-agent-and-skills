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

> Если обязательные поля не предоставлены — **запросить у пользователя** до начала работы. Не генерировать заглушки.

## Источники данных
1. Report Design Spec от Дизайнера — структура, визуализации, палитра.
2. session-1 через session-4 handoff файлы — raw text для секций и приложений.

### Связь с другими скилами
| Скил | Взаимодействие | Когда |
|------|----------------|-------|
| `$gates` (DS-01) | Макет и спецификации визуализаций — главный вход для вёрстки | Перед началом работы |
| `$handoff` | Session handoff файлы — raw text для секций отчёта | Загрузка контента |
| `$board` | Обновление статуса LY-01 при завершении | После генерации HTML |
| `$gates` (LY-01) | Валидация HTML перед Release Gate | После завершения |
| Фреймворк-скилы | Таблицы, матрицы, scoring-модели — визуализировать по Visualization Map | Для Chart.js / таблиц |

## Протокол

### Шаг 0 — Валидация входов
1. Проверить наличие Report Design Spec (P0 BLOCKER если отсутствует).
2. Проверить наличие всех raw text артефактов.
3. Извлечь числовые данные для Chart.js из отчётов.
4. Сопоставить Visualization Map с доступными данными.
5. Если данные неполны — запросить у пользователя.

### Шаг 1 — HTML Skeleton
1. `<!DOCTYPE html>` с `lang="ru"`, `charset="UTF-8"`.
2. CDN: Chart.js 4.x, Mermaid 10.x.
3. `<style>` для всех CSS, `<script>` для Chart.js и Mermaid init.
4. Структура body:

```html
<div class="report">
    <section class="title-page" id="title">...</section>
    <nav class="toc" id="toc">...</nav>
    <section class="executive-summary" id="executive-summary">...</section>
    <section class="main-section" id="section-1">...</section>
    <section class="main-section" id="section-2">...</section>
    <section class="appendix" id="appendix-a">...</section>
</div>
```

5. Каждая секция — семантический HTML: `<section>`, `<article>`, `<figure>`, `<figcaption>`.
6. Графики — `<figure>` с `<figcaption>` для accessibility и подписи.

### Шаг 2 — CSS (Base + Print)

Полный рабочий CSS-блок:

```css
/* ========== RESET & BASE ========== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    font-size: 11pt;
    line-height: 1.6;
    color: #1a1a2e;
    background: #fff;
}
.report { max-width: 210mm; margin: 0 auto; padding: 20mm; }

/* ========== TYPOGRAPHY ========== */
h1 { font-size: 24pt; font-weight: 700; margin-bottom: 0.5em; color: var(--primary); }
h2 { font-size: 18pt; font-weight: 600; margin: 1.5em 0 0.5em; padding-bottom: 0.3em;
     border-bottom: 2px solid var(--primary); color: var(--primary); }
h3 { font-size: 14pt; font-weight: 600; margin: 1.2em 0 0.4em; color: var(--secondary); }
h4 { font-size: 12pt; font-weight: 600; margin: 1em 0 0.3em; }
p { margin-bottom: 0.8em; }
blockquote { border-left: 4px solid var(--accent); padding: 0.8em 1.2em;
             margin: 1em 0; background: var(--bg-light); font-style: italic; }

/* ========== CSS VARIABLES (из палитры) ========== */
:root {
    --primary: #1a1a2e;    /* Заменить из Design Spec */
    --secondary: #16213e;
    --accent: #0f3460;
    --highlight: #e94560;
    --bg-light: #f5f5f5;
    --border: #e0e0e0;
    --success: #2ecc71;
    --warning: #f39c12;
    --danger: #e74c3c;
}

/* ========== TITLE PAGE ========== */
.title-page {
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    min-height: 100vh; text-align: center;
}
.title-page h1 { font-size: 32pt; margin-bottom: 0.3em; }
.title-page .subtitle { font-size: 16pt; color: var(--secondary); margin-bottom: 2em; }
.title-page .meta { font-size: 10pt; color: #666; }

/* ========== TOC ========== */
.toc-list { list-style: none; counter-reset: toc; }
.toc-list li { padding: 0.4em 0; border-bottom: 1px dotted var(--border); }
.toc-list li::before { counter-increment: toc; content: counter(toc) ". "; font-weight: 600; }
.toc-list a { text-decoration: none; color: var(--primary); }
.toc-list a:hover { color: var(--accent); }

/* ========== DATA TABLE ========== */
.data-table { width: 100%; border-collapse: collapse; margin: 1em 0; font-size: 10pt; }
.data-table th { background: var(--primary); color: #fff; padding: 8px 12px;
                 text-align: left; font-weight: 600; }
.data-table td { padding: 8px 12px; border-bottom: 1px solid var(--border); }
.data-table tr:nth-child(even) { background: var(--bg-light); }
.data-table .highlight { background: rgba(233, 69, 96, 0.1); font-weight: 600; }

/* ========== MATRIX 2x2 ========== */
.matrix-2x2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2px;
              margin: 1em 0; border: 2px solid var(--border); }
.matrix-2x2 .cell { padding: 1.2em; }
.matrix-2x2 .cell-header { background: var(--primary); color: #fff; font-weight: 600;
                            text-align: center; padding: 0.6em; }
.matrix-2x2 .cell-tl { background: #e8f5e9; } /* Top-left: green */
.matrix-2x2 .cell-tr { background: #fff3e0; } /* Top-right: orange */
.matrix-2x2 .cell-bl { background: #e3f2fd; } /* Bottom-left: blue */
.matrix-2x2 .cell-br { background: #fce4ec; } /* Bottom-right: red */

/* ========== CALLOUT BOX ========== */
.callout { padding: 1em 1.2em; margin: 1em 0; border-radius: 6px; border-left: 4px solid; }
.callout-info { background: #e3f2fd; border-color: #2196f3; }
.callout-success { background: #e8f5e9; border-color: var(--success); }
.callout-warning { background: #fff3e0; border-color: var(--warning); }
.callout-danger { background: #fce4ec; border-color: var(--danger); }
.callout-title { font-weight: 700; margin-bottom: 0.3em; }

/* ========== PULL QUOTE ========== */
.pull-quote { font-size: 14pt; font-weight: 300; text-align: center;
              padding: 1.5em 2em; margin: 1.5em 0; color: var(--accent);
              border-top: 2px solid var(--accent); border-bottom: 2px solid var(--accent); }

/* ========== CHART CONTAINER ========== */
.chart-container { position: relative; margin: 1.5em 0; max-width: 100%; }
.chart-container canvas { max-width: 100%; }
.chart-container figcaption { font-size: 9pt; color: #666; text-align: center;
                              margin-top: 0.5em; font-style: italic; }

/* ========== SCORE / BADGE ========== */
.score-badge { display: inline-block; padding: 0.2em 0.8em; border-radius: 12px;
               font-weight: 700; font-size: 10pt; }
.score-high { background: var(--success); color: #fff; }
.score-mid { background: var(--warning); color: #fff; }
.score-low { background: var(--danger); color: #fff; }

/* ========== PRINT ========== */
@media print {
    @page { size: A4 portrait; margin: 20mm; }
    body { font-size: 10pt; }
    .report { max-width: none; padding: 0; }
    .title-page { min-height: auto; page-break-after: always; }
    .toc { page-break-after: always; }
    .executive-summary { page-break-after: always; }
    .appendix { page-break-before: always; }
    .data-table, .chart-container, .matrix-2x2, .mermaid, figure {
        page-break-inside: avoid;
    }
    h2, h3 { page-break-after: avoid; }
    .callout { page-break-inside: avoid; }
    a { color: inherit; text-decoration: none; }
    canvas { max-width: 100% !important; height: auto !important; }
}
```

> **Палитра:** заменить CSS variables из Design Spec. Все цвета — через `var(--name)`, чтобы палитра менялась в одном месте.

### Шаг 3 — Chart.js

Для каждого графика из Visualization Map:
1. `<figure class="chart-container">` → `<canvas id="chart-N">` → `<figcaption>`.
2. Config: `animation: false`, `responsive: true`, палитра из CSS variables.

**Конфигурации по типам:**

```javascript
// ========== BAR CHART (сравнение конкурентов, scoring) ==========
new Chart(document.getElementById('chart-competitors'), {
    type: 'bar',
    data: {
        labels: ['Конкурент A', 'Конкурент B', 'Конкурент C', 'Наш продукт'],
        datasets: [{
            label: 'Threat Score',
            data: [7.2, 7.3, 4.8, null],
            backgroundColor: ['#e74c3c', '#e74c3c', '#f39c12', '#2ecc71'],
            borderWidth: 0,
            borderRadius: 4
        }]
    },
    options: {
        animation: false, responsive: true,
        plugins: { legend: { display: false },
                   title: { display: true, text: 'Threat Score конкурентов', font: { size: 14 } } },
        scales: { y: { beginAtZero: true, max: 10, title: { display: true, text: 'Score' } } }
    }
});

// ========== RADAR CHART (мультикритериальное сравнение) ==========
new Chart(document.getElementById('chart-radar'), {
    type: 'radar',
    data: {
        labels: ['Функционал', 'Цена', 'UX', 'Поддержка', 'Экосистема', 'Бренд'],
        datasets: [
            { label: 'Наш продукт', data: [7, 8, 6, 5, 4, 3],
              borderColor: '#0f3460', backgroundColor: 'rgba(15,52,96,0.1)', borderWidth: 2 },
            { label: 'Лидер рынка', data: [9, 4, 8, 7, 9, 9],
              borderColor: '#e94560', backgroundColor: 'rgba(233,69,96,0.1)', borderWidth: 2 }
        ]
    },
    options: {
        animation: false, responsive: true,
        scales: { r: { beginAtZero: true, max: 10, ticks: { stepSize: 2 } } }
    }
});

// ========== PIE / DOUGHNUT (доли, распределение) ==========
new Chart(document.getElementById('chart-share'), {
    type: 'doughnut',
    data: {
        labels: ['Сегмент A', 'Сегмент B', 'Сегмент C', 'Прочие'],
        datasets: [{ data: [35, 28, 22, 15],
                     backgroundColor: ['#1a1a2e', '#0f3460', '#e94560', '#ccc'],
                     borderWidth: 2, borderColor: '#fff' }]
    },
    options: {
        animation: false, responsive: true,
        plugins: { legend: { position: 'right' } }
    }
});

// ========== LINE CHART (тренды, retention curves) ==========
new Chart(document.getElementById('chart-retention'), {
    type: 'line',
    data: {
        labels: ['M0', 'M1', 'M2', 'M3', 'M6', 'M12'],
        datasets: [
            { label: 'Когорта Янв', data: [100, 42, 31, 26, 20, 16],
              borderColor: '#e94560', fill: false, tension: 0.3 },
            { label: 'Когорта Мар', data: [100, 55, 44, 38, null, null],
              borderColor: '#2ecc71', fill: false, tension: 0.3 }
        ]
    },
    options: {
        animation: false, responsive: true,
        scales: { y: { beginAtZero: true, max: 100, title: { display: true, text: 'Retention %' } } }
    }
});

// ========== SCATTER (позиционирование 2D) ==========
new Chart(document.getElementById('chart-positioning'), {
    type: 'scatter',
    data: {
        datasets: [
            { label: 'Конкурент A', data: [{ x: 8, y: 7 }], pointRadius: 10,
              backgroundColor: '#e74c3c' },
            { label: 'Наш продукт', data: [{ x: 5, y: 6 }], pointRadius: 12,
              backgroundColor: '#2ecc71', pointStyle: 'star' }
        ]
    },
    options: {
        animation: false, responsive: true,
        scales: {
            x: { min: 0, max: 10, title: { display: true, text: 'Функционал' } },
            y: { min: 0, max: 10, title: { display: true, text: 'Цена' } }
        }
    }
});
```

### Шаг 4 — Mermaid

```javascript
mermaid.initialize({ startOnLoad: true, theme: 'neutral', securityLevel: 'loose' });
```

**Диаграммы по типам:**

```html
<!-- ========== FLOWCHART (процессы, пайплайны) ========== -->
<div class="mermaid">
flowchart TD
    A[Awareness] --> B[Consideration]
    B --> C[Decision]
    C --> D[Purchase]
    D --> E[Retention]
    E --> F[Advocacy]
    E -.->|churn| G[Exit]
    style G fill:#fce4ec,stroke:#e74c3c
</div>

<!-- ========== MINDMAP (структура, иерархия) ========== -->
<div class="mermaid">
mindmap
  root((Стратегия роста))
    Проникновение
      Upsell
      Cross-sell
    Развитие рынка
      СНГ
      Enterprise
    Развитие продукта
      AI-модуль
      Mobile app
    Диверсификация
      White-label
</div>

<!-- ========== QUADRANT CHART (матрицы 2x2) ========== -->
<div class="mermaid">
quadrantChart
    title Impact vs Effort
    x-axis Low Effort --> High Effort
    y-axis Low Impact --> High Impact
    quadrant-1 Big Bets
    quadrant-2 Quick Wins
    quadrant-3 Fill-ins
    quadrant-4 Avoid
    Action A: [0.3, 0.8]
    Action B: [0.7, 0.9]
    Action C: [0.2, 0.3]
</div>
```

> Каждая Mermaid-диаграмма оборачивается в `<figure>` с `<figcaption>` и `page-break-inside: avoid`.

### Шаг 5 — Компоненты (HTML-фрагменты)

**Data Table:**
```html
<table class="data-table">
    <thead>
        <tr><th>Конкурент</th><th>Score</th><th>Ранг</th></tr>
    </thead>
    <tbody>
        <tr><td>Компания A</td><td>7.6</td>
            <td><span class="score-badge score-high">High</span></td></tr>
        <tr class="highlight"><td><strong>Наш продукт</strong></td><td>6.2</td>
            <td><span class="score-badge score-mid">Medium</span></td></tr>
    </tbody>
</table>
```

**Matrix 2×2:**
```html
<div class="matrix-2x2">
    <div class="cell-header">Высокая доля</div>
    <div class="cell-header">Низкая доля</div>
    <div class="cell cell-tl">
        <h4>★ Звёзды</h4>
        <p>Продукт A ($30M, рост 18%)</p>
    </div>
    <div class="cell cell-tr">
        <h4>? Вопросительные Знаки</h4>
        <p>Продукт C ($10M, рост 35%)</p>
    </div>
    <div class="cell cell-bl">
        <h4>$ Дойные Коровы</h4>
        <p>Продукт B ($45M, рост 3%)</p>
    </div>
    <div class="cell cell-br">
        <h4>✕ Собаки</h4>
        <p>Продукт D ($5M, рост 1%)</p>
    </div>
</div>
```

**Callout Box:**
```html
<div class="callout callout-warning">
    <div class="callout-title">⚠️ Ключевой риск</div>
    <p>TAM рынка оценён на основе 2 источников (вместо 3). Данные помечены как Estimated.</p>
</div>
```

**Pull Quote:**
```html
<div class="pull-quote">
    «AI-first CRM для малого бизнеса — единственная незанятая позиция на рынке»
</div>
```

### Шаг 6 — TOC (Table of Contents)

```html
<nav class="toc" id="toc">
    <h2>Содержание</h2>
    <ol class="toc-list">
        <li><a href="#executive-summary">Executive Summary</a></li>
        <li><a href="#section-1">Анализ рынка</a></li>
        <li><a href="#section-2">Конкурентный ландшафт</a></li>
        <li><a href="#section-3">Стратегические рекомендации</a></li>
        <li><a href="#appendix-a">Приложение A — Research Brief</a></li>
        <li><a href="#appendix-b">Приложение B — Данные Аналитиков</a></li>
        <li><a href="#appendix-c">Приложение C — Данные Критиков</a></li>
        <li><a href="#appendix-d">Приложение D — Источники</a></li>
    </ol>
</nav>
```

### Шаг 7 — Accessibility

1. Все `<img>` и `<canvas>` — с `alt` / `aria-label`:
```html
<figure class="chart-container" role="img" aria-label="Threat Score конкурентов: A=7.2, B=7.3, C=4.8">
    <canvas id="chart-competitors"></canvas>
    <figcaption>Рис. 1 — Threat Score конкурентов (шкала 1-10)</figcaption>
</figure>
```
2. Таблицы — `<caption>` и `scope="col"` / `scope="row"` для `<th>`.
3. Цветовая кодировка — не единственный способ передачи информации (+ текстовые метки, иконки).
4. Контраст: текст на фоне ≥ 4.5:1 (WCAG AA).

### Шаг 8 — Assembly и тестирование

1. Собрать все компоненты в единый HTML.
2. Проверить: все id уникальны, все canvas имеют конфигурацию, TOC якоря работают.
3. **Протокол тестирования PDF:**

| # | Проверка | Как тестировать | Типичная проблема |
|---|----------|-----------------|-------------------|
| 1 | Открыть в Chrome/Edge | Файл → Открыть файл | Mermaid не рендерится → проверить CDN |
| 2 | Ctrl+P → Preview | Проверить layout | Графики обрезаны → уменьшить canvas |
| 3 | Все графики видны | Скроллить preview | Пустой canvas → `animation: false` |
| 4 | Page breaks корректны | Каждая appendix на новой странице | Сливается → `page-break-before: always` |
| 5 | Таблицы не разрезаны | Таблицы целиком на странице | Разрез → `page-break-inside: avoid` |
| 6 | TOC якоря кликабельны | Нажать ссылки в TOC | Не работает → проверить id |
| 7 | Background graphics | Включить в настройках печати | Цвета пропали → «Background graphics: ON» |
| 8 | Текст читаем | Проверить font-size в print | Мелко → увеличить `@media print` font-size |

> **Инструкция для пользователя:** Chrome/Edge → Ctrl+P → Destination: Save as PDF → Layout: Portrait → Paper: A4 → Margins: Default → **Background graphics: ON** → Save.

## Пример — Секция Executive Summary

```html
<section class="executive-summary" id="executive-summary">
    <h2>Executive Summary</h2>

    <div class="pull-quote">
        «Рынок EdTech РФ достигнет $4.2B к 2027. Основная возможность —
        корпоративное обучение (CAGR 28%), где конкуренция фрагментирована.»
    </div>

    <h3>Ключевые выводы</h3>
    <div class="callout callout-success">
        <div class="callout-title">✅ Главный инсайт</div>
        <p>AI-персонализация обучения — незанятая ниша. Ни один из 5 ключевых конкурентов
        не предлагает адаптивные траектории на уровне ★★★.</p>
    </div>

    <table class="data-table">
        <caption>Сводка по ключевым метрикам</caption>
        <thead>
            <tr><th scope="col">Метрика</th><th scope="col">Значение</th><th scope="col">Бенчмарк</th><th scope="col">Оценка</th></tr>
        </thead>
        <tbody>
            <tr><td>TAM</td><td>$4.2B</td><td>—</td>
                <td><span class="score-badge score-high">Крупный</span></td></tr>
            <tr><td>SOM (Year 1)</td><td>$180M</td><td>—</td>
                <td><span class="score-badge score-mid">Средний</span></td></tr>
            <tr><td>Главная угроза</td><td>Яндекс Практикум</td><td>Score 7.6</td>
                <td><span class="score-badge score-low">High</span></td></tr>
        </tbody>
    </table>

    <figure class="chart-container" role="img" aria-label="Threat Score: Skillbox 7.2, Нетология 6.8, Яндекс 7.6, GeekBrains 4.1, Skyeng 5.3">
        <canvas id="chart-exec-threats"></canvas>
        <figcaption>Рис. 1 — Threat Score ключевых конкурентов</figcaption>
    </figure>
</section>
```

## Валидация (Quality Gate)

- [ ] HTML self-contained (нет внешних CSS/JS кроме CDN для Chart.js и Mermaid)
- [ ] Все секции из Design Spec реализованы
- [ ] Все визуализации из Visualization Map присутствуют
- [ ] CSS variables соответствуют палитре из Design Spec
- [ ] TOC якоря работают (каждый `<a href="#id">` → `<section id="id">`)
- [ ] `@media print` корректен (A4, 20mm, page breaks)
- [ ] Chart.js: `animation: false`, `responsive: true` на каждом графике
- [ ] Mermaid: `startOnLoad: true`, `theme: 'neutral'`
- [ ] HTML валиден (нет дублированных id, незакрытых тегов)
- [ ] Accessibility: `alt` / `aria-label` на графиках, `caption` на таблицах, контраст ≥ 4.5:1
- [ ] Протокол тестирования PDF пройден (8 проверок)
- [ ] Print preview: все графики видны, page breaks корректны, таблицы не разрезаны

## Handoff
Результат передаётся:
- **Пользователь** — открыть в браузере → Ctrl+P → Save as PDF (инструкция в отчёте).
- **`$gates` (RG-01)** — Release Gate: финальная проверка перед публикацией.
- **`$board`** — обновить LY-01 → `[✓]`.

Формат передачи: `report.html` (единый файл) + инструкция по печати в PDF.

## Anti-patterns

| Ошибка | Почему плохо | Как правильно |
|--------|-------------|---------------|
| Внешние CSS-фреймворки (Bootstrap и т.д.) | Не работает offline, лишний вес | Только inline CSS |
| `animation: true` | Пустые графики в PDF (canvas не отрисован) | Всегда `animation: false` |
| Fixed canvas size (`width="600"`) | Не масштабируется при печати | `responsive: true`, размер через CSS |
| Пропуск page breaks | Секции сливаются, таблицы разрезаны | `page-break-before/after/inside` по протоколу |
| Broken TOC anchors | Навигация сломана | Уникальные id на каждой секции, проверить все ссылки |
| Цвета хардкодом | Палитра не меняется из одного места | CSS variables: `var(--primary)`, `var(--accent)` |
| Нет `<figcaption>` на графиках | Непонятно, что показывает график | `<figure>` + `<figcaption>` + `aria-label` |
| Нет fallback для Mermaid | Если JS не загрузился — пустое место | `<noscript>` с текстовым описанием диаграммы |
| Не включён Background graphics | Цвета, фоны таблиц пропадают в PDF | Инструкция пользователю: Background graphics: ON |

## Шаблон вывода

```
## HTML Report: [Название]
**Файл:** docs/analytics/report.html
**Размер:** ~XXX KB
**Секций:** N основных + N приложений
**Дата:** [YYYY-MM-DD]

### Компоненты
| Тип | Количество | ID |
|-----|:----------:|-----|
| Chart.js (bar, radar, etc.) | N | chart-1, chart-2, ... |
| Mermaid (flowchart, mindmap) | N | — (auto) |
| Data Tables | N | — |
| Matrices 2×2 | N | — |
| Callout Boxes | N | — |
| Pull Quotes | N | — |

### Палитра
| Variable | Hex | Использование |
|----------|-----|---------------|
| --primary | #XXXXXX | Заголовки, таблицы |
| --accent | #XXXXXX | Акценты, ссылки |
| --highlight | #XXXXXX | Ключевые метрики |

### Протокол тестирования
- [ ] Chrome/Edge открывает без ошибок
- [ ] Все графики отрисованы (не пустые)
- [ ] Ctrl+P → preview корректный
- [ ] Page breaks на местах
- [ ] Background graphics: ON

### Инструкция для PDF
Chrome/Edge → Ctrl+P → Save as PDF → Portrait → A4 → Default margins → **Background graphics: ON** → Save
```
