# Оркестратор аналитического домена

## Обзор
Аналитический домен — система агентов для бизнес-аналитики и стратегического анализа. Две конкурирующие команды (Аналитики и Критики) исследуют вопрос независимо, затем Медиатор оценивает результаты и формирует финальное заключение. Команда верстальщиков готовит PDF-отчёт.

## Пайплайн (Full — `/analyze`, 5 сессий)
```
Сессия 1: CONDUCTOR → INTERVIEWER                                           → Handoff
Сессия 2: CONDUCTOR → АНАЛИТИКИ (RESEARCHER → DATA_ANALYST → STRATEGIST)    → Handoff
Сессия 3: CONDUCTOR → КРИТИКИ   (RESEARCHER → DATA_ANALYST → STRATEGIST)    → Handoff
Сессия 4: CONDUCTOR → MEDIATOR                                              → Handoff
Сессия 5: CONDUCTOR → DESIGNER → LAYOUTER                                   → PDF
```

## Пайплайн (Quick — `/quick-insight`, 1 сессия)
```
CONDUCTOR → INTERVIEWER → RESEARCHER → DATA_ANALYST → STRATEGIST → MEDIATOR → DESIGNER → LAYOUTER → PDF
```

## Команды

| Команда | Состав | Задача |
|---------|--------|--------|
| Аналитики (Alpha) | Исследователь → Аналитик данных → Стратег | Исследуют вопрос, формируют стратегию |
| Критики (Beta) | Исследователь → Аналитик данных → Стратег | Собственное исследование + критика Аналитиков + альтернативная стратегия |
| Верстальщики | Дизайнер → Верстальщик | Макет и вёрстка PDF-отчёта |

## Агенты

| Роль | Файл | Зона ответственности |
|------|-------|---------------------|
| Дирижёр | agents/conductor.md | Оркестрация, роутинг сессий, гейт-контроль |
| Интервьюер | agents/interviewer.md | Адаптивный сбор контекста, определение scope |
| Исследователь | agents/researcher.md | Сбор фактов, данных, кейсов. Веб-поиск обязателен |
| Аналитик данных | agents/data_analyst.md | Структурирование данных, паттерны, фреймворки |
| Стратег | agents/strategist.md | Выводы, рекомендации, план действий |
| Медиатор | agents/mediator.md | Оценка обеих команд, финальное заключение |
| Дизайнер | agents/designer.md | Макет отчёта, визуализации, палитра |
| Верстальщик | agents/layouter.md | HTML/CSS → PDF, графики, сборка документа |

## Воркфлоу

| Команда | Режим | Гейты |
|---------|-------|-------|
| /analyze | Full Pipeline (5 сессий) | CONDUCTOR → INTERVIEWER → АНАЛИТИКИ → КРИТИКИ → MEDIATOR → DESIGNER → LAYOUTER → RG |
| /quick-insight | Quick Pipeline (1 сессия) | CONDUCTOR → INTERVIEWER → АНАЛИТИКИ → MEDIATOR → DESIGNER → LAYOUTER → RG |

## Скилы

### Дирижёр
- $board — управление доской задач
- $handoff — передача между гейтами и сессиями
- $gates — контроль гейтов
- $session-prompt-generator — генерация промпта для следующей сессии

### Интервьюер
- $board — обновление доски задач
- $handoff — формирование исследовательского брифа

### Исследователь
- $web-research — обязательный веб-поиск и верификация данных
- $trend-analysis — анализ трендов
- $competitive-analysis — конкурентный анализ

### Аналитик данных
- $swot-analysis — SWOT-анализ
- $pest-analysis — PEST/PESTEL-анализ
- $porters-five-forces — 5 сил Портера
- $bcg-matrix — матрица BCG
- $blue-ocean-strategy — стратегия голубого океана
- $ansoff-matrix — матрица Ансоффа
- $value-chain-analysis — анализ цепочки ценности
- $tam-sam-som — оценка размера рынка
- $customer-journey-mapping — карта путешествия клиента
- $jtbd-analysis — Jobs To Be Done
- $rfm-analysis — RFM-сегментация
- $icp-buyer-persona — профиль идеального клиента
- $unit-economics — юнит-экономика
- $cohort-analysis — когортный анализ

### Стратег
- $swot-analysis — SWOT-анализ (стратегический синтез)
- $blue-ocean-strategy — стратегия голубого океана
- $ansoff-matrix — матрица Ансоффа
- $value-chain-analysis — анализ цепочки ценности

### Медиатор
- $handoff — получение результатов обеих команд
- $gates — финальная проверка качества

### Дизайнер
- $report-design — проектирование макета отчёта

### Верстальщик
- $html-pdf-report — генерация HTML/CSS → PDF

### Cross-cutting / Quality (все агенты домена)
- $karpathy-guidelines — обязателен перед любой нетривиальной задачей
