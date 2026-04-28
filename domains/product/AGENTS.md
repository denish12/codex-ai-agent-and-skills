# Оркестратор продуктового домена

## Обзор
Продуктовый домен — система агентов для **B2B SaaS product management**: от discovery до релиза. Две adversarial-оси дают устойчивость решений:
- **Customer-Champion vs Business-Champion** — на стратегическом уровне (зачем и для кого).
- **Build-Camp vs Cut-Camp** — на приоритизации (сколько и какой scope).

Mediator синтезирует результаты обеих камп. Designer+Layouter готовят PRD / Product Review Deck в PDF.

## Пайплайн A — `/ship-right-thing` (Customer-vs-Business, 6 сессий)
```
Сессия 1: CONDUCTOR → DISCOVERY                                        → Handoff
Сессия 2: CONDUCTOR → CUSTOMER-CHAMPION (product_strategist α)         → Handoff
Сессия 3: CONDUCTOR → BUSINESS-CHAMPION (product_strategist β)         → Handoff
Сессия 4: CONDUCTOR → MEDIATOR                                         → Handoff
Сессия 5: CONDUCTOR → PM → UX_DESIGNER + TECH_LEAD + DATA_ANALYST      → Handoff
Сессия 6: CONDUCTOR → DESIGNER → LAYOUTER                              → PDF
```

## Пайплайн B — `/shape-prioritize` (Build-vs-Cut, 6 сессий)
Запуск при уже утверждённой стратегии — дискуссия идёт вокруг scope.
```
Сессия 1: CONDUCTOR → DISCOVERY (scope intake)                         → Handoff
Сессия 2: CONDUCTOR → BUILD-CAMP (pm α + tech_lead α)                  → Handoff
Сессия 3: CONDUCTOR → CUT-CAMP (pm β + tech_lead β)                    → Handoff
Сессия 4: CONDUCTOR → MEDIATOR                                         → Handoff
Сессия 5: CONDUCTOR → PM → UX_DESIGNER + DATA_ANALYST                  → Handoff
Сессия 6: CONDUCTOR → DESIGNER → LAYOUTER                              → PDF (PRD)
```

## Пайплайн Quick — `/quick-pm` (1 сессия, без adversarial)
```
CONDUCTOR → DISCOVERY → product_strategist → PM → TECH_LEAD → DATA_ANALYST → PDF
```

## Пайплайн Spec — `/spec` (1 сессия, только PRD)
```
CONDUCTOR → PM → UX_DESIGNER + TECH_LEAD → PRD (markdown)
```

## Команды (adversarial)

| Команда | Активна в | Состав | Задача |
|---------|-----------|--------|--------|
| Customer-Champion (Alpha) | /ship-right-thing | product_strategist α | Стратегия вокруг user value, JTBD, adoption |
| Business-Champion (Beta) | /ship-right-thing | product_strategist β | Стратегия вокруг revenue, margin, strategic moats |
| Build-Camp (Alpha) | /shape-prioritize | pm α + tech_lead α | Максимальный scope: каждая фича оправдана |
| Cut-Camp (Beta) | /shape-prioritize | pm β + tech_lead β | Минимальный scope: вырезать всё, что можно |
| Верстальщики | все пайплайны с PDF | Designer → Layouter | Макет и вёрстка PRD / Product Review Deck |

## Агенты

| Роль | Файл | Зона ответственности |
|------|-------|---------------------|
| Дирижёр | agents/conductor.md | Оркестрация, роутинг сессий, гейт-контроль |
| Discovery | agents/discovery.md | Scope, user research intake, jobs, assumptions |
| Product Strategist | agents/product_strategist.md | Vision, OKR, NSM, roadmap. Играет обе стороны в Customer-vs-Business |
| PM | agents/pm.md | Приоритизация, PRD, stories. Играет обе стороны в Build-vs-Cut |
| UX Designer | agents/ux_designer.md | Wireframes, user flows, design brief |
| Tech Lead | agents/tech_lead.md | Feasibility, breakdown, risk, non-functional requirements |
| Data Analyst | agents/data_analyst.md | Experiment design, SaaS metrics, AARRR, hypothesis validation |
| Медиатор | agents/mediator.md | Impartial synthesis Customer/Business и Build/Cut |
| Designer | agents/designer.md | Макет PRD / Product Review Deck, визуализации |
| Layouter | agents/layouter.md | HTML/CSS → PDF, графики, сборка документа |

## Воркфлоу

| Команда | Режим | Adversarial ось |
|---------|-------|-----------------|
| /ship-right-thing | Full Pipeline A (6 сессий) | Customer-Champion vs Business-Champion |
| /shape-prioritize | Full Pipeline B (6 сессий) | Build-Camp vs Cut-Camp |
| /spec | PRD Only (1 сессия) | — |
| /quick-pm | Quick Pipeline (1 сессия) | — |

## Скилы по агентам

### Дирижёр
- $board — доска задач
- $handoff — передача между гейтами/сессиями
- $gates — контроль гейтов
- $session-prompt-generator — промпт следующей сессии

### Discovery
- $user-interview-script — скрипт B2B-интервью
- $jtbd-canvas — Jobs-to-be-Done
- $opportunity-solution-tree — дерево возможностей-решений
- $problem-statement — формулировка проблемы
- $assumption-mapping — карта допущений
- $board, $handoff

### Product Strategist
- $product-vision — видение продукта
- $okr-framework — OKR
- $north-star-metric — NSM
- $product-roadmap — дорожная карта
- $kano-model — модель Кано
- $handoff

### PM
- $rice-scoring — RICE
- $moscow-prioritization — MoSCoW
- $wsjf-scoring — WSJF (для enterprise)
- $prd-template — PRD
- $user-story — user stories
- $acceptance-criteria — критерии приёмки
- $epic-breakdown — декомпозиция эпика
- $kano-model — модель Кано (для scope-дискуссий)
- $handoff

### UX Designer
- $design-brief — бриф для дизайнера
- $user-flow — user flows
- $handoff

### Tech Lead
- $epic-breakdown — декомпозиция эпика
- $handoff

### Data Analyst
- $hypothesis-template — гипотеза
- $ab-test-design — дизайн A/B-теста
- $saas-metrics — B2B SaaS метрики
- $aarrr-metrics — AARRR
- $north-star-metric — NSM (для metric design)
- $handoff

### Медиатор
- $handoff — получение результатов обеих камп
- $gates — финальная проверка

### Designer
- $report-design — макет PRD / Product Review Deck

### Layouter
- $html-pdf-report — HTML/CSS → PDF

### Release (cross-agent skills)
- $launch-checklist — чеклист запуска
- $gtm-brief — GTM-бриф (handoff в marketing/sales)
- $release-notes — release notes для B2B-клиентов

### Cross-cutting / Quality (все агенты домена)
- $karpathy-guidelines — обязателен перед любой нетривиальной задачей

## MCP-интеграции (ожидаемые)
- **mempalace** — долгосрочная память по продукту, решения, discovery-артефакты
- **shadcn + tailwindcss + stitch** — для UI-мокапов через UX-designer
- **scheduled-tasks** — discovery cadence, регулярные review

## Локализация
- Default: `ru`
- Available: `ru` (v1.0), `en` (v1.1+)
