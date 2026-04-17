---
name: product-pipeline-rules
description: Абсолютные правила продуктового пайплайна — гейты, дисциплина, camp independence, межсессионный протокол
---

# Правила продуктового пайплайна

> [!CAUTION]
> **🔴 АБСОЛЮТНОЕ ПРАВИЛО №1:** Пайплайн запрещено пропускать. Без исключений.
> Каждый гейт → читать агента → deliverable → `$gates` PASS → `$handoff` → **User sign-off** → следующий гейт.
>
> **🔴 АБСОЛЮТНОЕ ПРАВИЛО №2:** В Full A/B — **Camp Independence**. Alpha и Beta не видят работу друг друга до Mediator. Нарушение = P0 contamination.

---

## Четыре режима пайплайна

### 🔵 Full Pipeline A — `/ship-right-thing` (6 сессий)

Полный стратегический цикл с adversarial на **оси Customer vs Business**. Mediator синтезирует. Output — PRD + Product Review Deck (PDF).

```
Сессия 1: CONDUCTOR → DISCOVERY                                        → session-1-handoff.md
Сессия 2: CONDUCTOR → CUSTOMER-CHAMPION (product_strategist α)         → session-2-handoff.md
Сессия 3: CONDUCTOR → BUSINESS-CHAMPION (product_strategist β)         → session-3-handoff.md
Сессия 4: CONDUCTOR → MEDIATOR (Strategy Synthesis)                    → session-4-handoff.md
Сессия 5: CONDUCTOR → PM → UX_DESIGNER + TECH_LEAD + DATA_ANALYST      → session-5-handoff.md
Сессия 6: CONDUCTOR → DESIGNER → LAYOUTER → RELEASE_GATE               → PDF
```

### 🔵 Full Pipeline B — `/shape-prioritize` (6 сессий)

Scope-decision цикл с adversarial на **оси Build vs Cut**. Strategy утверждена, scope — открыт. Mediator синтезирует final MoSCoW. Output — PRD (PDF).

```
Сессия 1: CONDUCTOR → DISCOVERY (scope intake)                         → session-1-handoff.md
Сессия 2: CONDUCTOR → BUILD-CAMP (pm α + tech_lead α)                  → session-2-handoff.md
Сессия 3: CONDUCTOR → CUT-CAMP (pm β + tech_lead β)                    → session-3-handoff.md
Сессия 4: CONDUCTOR → MEDIATOR (Scope Synthesis)                       → session-4-handoff.md
Сессия 5: CONDUCTOR → PM (final PRD) → UX_DESIGNER + DATA_ANALYST      → session-5-handoff.md
Сессия 6: CONDUCTOR → DESIGNER → LAYOUTER → RELEASE_GATE               → PDF
```

### 🟢 Spec — `/spec` (1 сессия)

Strategy и scope утверждены. Нужен формальный PRD. Без adversarial. Output — PRD (markdown).

```
CONDUCTOR → PM → UX_DESIGNER + TECH_LEAD → PRD (markdown)
```

### 🟡 Quick — `/quick-pm` (1 сессия)

Быстрая оценка, focused вопрос, низкие stakes. Без adversarial. Output — Short brief (markdown).

```
CONDUCTOR → DISCOVERY → product_strategist → PM → TECH_LEAD → DATA_ANALYST → Short Brief
```

---

## Decision Tree — выбор режима

```
Стратегия утверждена?
  ├── НЕТ + нужен полный план               → /ship-right-thing (Full A)
  ├── ДА + scope неясен, нужен scope-дебат   → /shape-prioritize (Full B)
  ├── ДА + scope утверждён, нужен PRD        → /spec
  └── Быстрая оценка, focused вопрос         → /quick-pm

Сомнение? → 5 уточняющих вопросов в Conductor Clarification Gate → предложить режим с rationale
```

Эскалация: если Conductor видит, что запрос не matchится — задаёт 5 уточняющих вопросов и предлагает режим с обоснованием. Переход только по "Approved".

---

## Обязательные правила (7) — MANDATORY ENFORCEMENT

### Правило 1: Гейты нельзя пропускать
- Порядок гейтов определён воркфлоу режима.
- Каждый гейт требует: deliverable + `$gates` PASS + `$handoff` + user sign-off.
- Пропуск гейта → 🔴 **P0 / BLOCKER**.

**Применяющие скилы:** `$gates` (проверка готовности), `$board` (отслеживание статусов), `$handoff` (передача контекста).

### Правило 2: Clarification First
- В Сессии 1 — Conductor задаёт **минимум 5 уточняющих вопросов** до начала работы Discovery.
- Без ответов на обязательные вопросы (режим / продуктовая задача / segment / constraints / формат) — P0 Blocker.

**Применяющие скилы:** `$gates` (COND-01 criteria включают «5+ вопросов получили ответ»).

### Правило 3: Handoff — обязателен между сессиями
- Без handoff-файла следующая сессия не стартует.
- Handoff содержит **полный текст артефактов** (не ссылки — следующая сессия не имеет контекста).
- Генерируется готовый промпт (`$session-prompt-generator`) для Full A/B.

**Применяющие скилы:** `$handoff` (Session тип), `$session-prompt-generator` (промпт), `$board` (сохранение состояния).

### Правило 4: Adversarial Independence (Full A/B)
- Camp Alpha и Camp Beta работают **независимо**, не видят artifact'ы друг друга до Mediator.
- Beta получает Alpha deliverable как read-only вход в Сессии 3 (через camp filter).
- Alpha handoff в Beta — помечен `team: beta` + filter rules.
- Нарушение (contamination) → P0, Mediator пометит `contamination: true`, confidence понижен.

**Применяющие скилы:** `$handoff` (camp marker), `$gates` (camp independence check на COND-0N).

### Правило 5: Evidence > Opinion
- Каждая позиция в deliverable — с источником (Discovery evidence inventory или внешним).
- Без evidence → явная пометка `⚠️ assumed`.
- Mediator учитывает это при scoring (понижение Evidence Strength).
- PRD с ≥ 30% assumed позиций без risk register → P1 Gap.

**Применяющие скилы:** `$gates` (evidence coverage check), `$assumption-mapping` (risk × uncertainty).

### Правило 6: Mediator не пишет свою стратегию
- Mediator **только синтезирует** из двух доступных позиций (Alpha + Beta).
- Third way без основания в камдах → P0 "Third Way Invention".
- Синтез пути: Adopt Alpha / Adopt Beta / Hybrid — всегда с source-pointer per element.

**Применяющие скилы:** `$gates` (MED-01 criteria включают source-pointer verification).

### Правило 7: Release Gate финален
- PDF / PRD не уходит к пользователю без `$gates` sign-off на RG-01.
- Все предшествующие гейты должны быть в [✓].
- User sign-off получен.

**Применяющие скилы:** `$gates` (RG-01 criteria), `$handoff` (финальный конверт).

---

## Маппинг «Правило → Скил → Проверка»

| Правило | Скилы | Что проверяется | При нарушении |
|---------|-------|-----------------|---------------|
| 1. Гейты нельзя пропускать | `$gates`, `$board`, `$handoff` | Статусы на доске идут подряд, нет пропусков | 🔴 P0 Blocker |
| 2. Clarification First | `$gates` (COND-01) | 5+ вопросов заданы, ответы получены | 🔴 P0 Blocker |
| 3. Handoff обязателен | `$handoff` (Session), `$session-prompt-generator` | Файл сохранён, артефакты полным текстом, промпт сгенерирован | 🔴 P0 Blocker |
| 4. Camp Independence | `$handoff` (camp marker), `$gates` (contamination check) | Camp marker корректен, нет cross-camp reads | 🔴 P0 Blocker |
| 5. Evidence > Opinion | `$gates` (evidence coverage), `$assumption-mapping` | Каждая позиция с source или пометкой `⚠️ assumed` | 🟠 P1 Gap (или P0 если coverage < 50%) |
| 6. Mediator синтез | `$gates` (MED-01 criteria), source-pointer verification | Unified deliverable с source per element | 🔴 P0 Blocker |
| 7. Release Gate | `$gates` (RG-01), `$handoff` | Все гейты [✓], PDF тестирован, user sign-off | 🔴 P0 Blocker |

---

## Mechanical Blocks (принудительные проверки)

| # | Блок | Когда | Что проверяет | При провале |
|---|------|-------|---------------|-------------|
| 1 | **Pre-flight check** | Перед записью deliverable | Процитировать последний "Approved" пользователя | Остановиться, запросить Approved |
| 2 | **Skill read check** | Перед применением скилла | Прочитать SKILL.md через `view_file` | Прочитать, затем применять |
| 3 | **Camp marker check** | Full A/B Сессии 2-3 | Handoff содержит `team: alpha` или `team: beta` | Reverse Handoff к Conductor |
| 4 | **Evidence pointer check** | Каждый deliverable Сессий 2-5 | Каждая позиция с source или `⚠️ assumed` | Пометить или удалить |
| 5 | **Handoff file check** | Перед закрытием сессии (Full A/B) | `docs/product/session-N-handoff.md` сохранён, самодостаточен | Не закрывать сессию, сохранить файл |
| 6 | **Contamination check** | Mediator Сессия 4 | Alpha и Beta не содержат прямых цитат друг друга без маркировки | Пометить contamination: true, понизить confidence |
| 7 | **PRD metrics check** | PM-SPEC (Сессия 5 / Spec) | PRD содержит success metrics секцию (NSM / OKR link) | Не передавать на дальнейшие гейты |

---

## Gate Sequencing

| Gate ID | Сессия | Agent | Deliverable | Severity при провале |
|---------|:------:|-------|-------------|----------------------|
| COND-01 | 1 | Conductor | Interview Brief (5+ вопросов отработаны) | Blocker |
| DISC-01 | 1 | Discovery | Discovery Brief (JTBD + problems + assumptions + evidence) | Blocker |
| STRAT-01α | 2 (Full A) | product_strategist α | Strategy Brief Alpha (Customer-Champion) | Blocker |
| STRAT-02β | 3 (Full A) | product_strategist β | Strategy Brief Beta (Business-Champion) | Blocker |
| PM-01α | 2 (Full B) | PM α + Tech Lead α | Scope Proposal Alpha (Build-Camp) | Blocker |
| PM-02β | 3 (Full B) | PM β + Tech Lead β | Scope Proposal Beta (Cut-Camp) | Blocker |
| MED-01 | 4 (Full A/B) | Mediator | Unified Synthesis (Strategy или Scope) | Blocker |
| PM-SPEC | 5 | PM | Final PRD + prioritized backlog | Blocker |
| UX-01 | 5 | UX Designer | User flows + wireframes | Gap (PRD ok без при non-UI) |
| TECH-01 | 5 | Tech Lead | Feasibility + NFR + risks + epic breakdown | Blocker |
| DATA-01 | 5 | Data Analyst | Metric plan + hypotheses + experiments | Blocker |
| DS-01 | 6 | Designer | Design spec (PRD layout + Deck) | Blocker |
| LY-01 | 6 | Layouter | HTML self-contained, print-ready | Blocker |
| RG-01 | 6 | Conductor | Release Gate sign-off | Blocker |

## Severity Levels

| Приоритет | Описание | Действие |
|:---------:|----------|----------|
| 🔴 **P0 / BLOCKER** | Блокирует прогресс / публикацию PDF | Немедленно: fix или эскалация |
| 🟠 **P1 / IMPORTANT / GAP** | Важно исправить до финализации, можно продолжить с risk register | До Release Gate |
| 🟡 **P2 / NICE-TO-HAVE / NOTE** | Можно включить в следующую итерацию | Backlog |

---

## Протокол эскалации

### При отсутствии user sign-off
1. Показать deliverable и запросить "Approved".
2. Если нет ответа — **ожидать**. Не переходить к следующему гейту.
3. Напомнить: «Ожидаю "Approved" для перехода к [следующий гейт]».
4. **Никогда** не auto-proceed. `ShouldAutoProceed = false` ВСЕГДА.

### При повторных FAIL на `$gates`
| Итерация | Действие |
|:--------:|----------|
| 1-й FAIL | Стандартный возврат: список gap'ов → агент дорабатывает |
| 2-й FAIL | Расширенный возврат + конкретные инструкции «как исправить» |
| 3+ FAIL | **Эскалация пользователю** через протокол `$gates` (варианты: пересмотр scope / возврат на предыдущий гейт / принудительный CONDITIONAL PASS) |

### При обнаружении проблемы на последующем гейте (Reverse Handoff)
1. Агент формирует Reverse Handoff с описанием проблемы через `$handoff`.
2. Conductor маршрутизирует возврат к нужному гейту.
3. `$board` обновляется: текущий гейт → `[↩]`, возвратный → `[→]`.
4. После исправления — повторная `$gates`.

### Stalemate (Mediator не может синтезировать)
- Обе камды слабы (low evidence, low coherence).
- Mediator не делает forced synthesis.
- Эскалация к user: два варианта + rationale + recommended path (обычно — rerun одной из камд).

### Contradictory evidence
- Данные двух камд несовместимы.
- Loop back к Discovery для дополнительных interviews / data pull.
- Или эскалация user для solo-decision.

### Compliance block
- Обнаружено требование, требующее legal / security review.
- Пауза pipeline, external review, возврат после.

### Resource block
- Невозможно реализовать в заданных constraint'ах.
- Tech Lead эскалация в Cut-Camp режим или request timeline / budget revision.

---

## Метрики здоровья пайплайна

`$board` рассчитывает и отображает при каждом обновлении:

| Метрика | Формула | Здоровый | Проблемный |
|---------|---------|:--------:|:----------:|
| Прогресс (%) | Завершённые / Всего × 100 | Растёт | Стагнирует |
| Ср. время/гейт | Σ время / завершённые | ≤ 20 мин | > 40 мин |
| Блокеры (total) | Кол-во [!] за всё время | 0-1 | ≥ 3 |
| Возвраты (total) | Кол-во [↩] за всё время | 0-1 | ≥ 3 |
| FAIL rate | FAILs / gate checks × 100 | < 20% | > 40% |
| Evidence coverage | % позиций с ✅ Verified | ≥ 80% | < 50% |
| Camp contamination | false / true | false | true |

**При FAIL rate > 40%** или **contamination = true:** Conductor эскалирует пользователю — возможно, scope слишком широкий, данные недостаточны, или процесс нарушен.

---

## Артефакты пайплайна

### Full Pipeline A (ship-right-thing)

| Сессия | Артефакт | Формат | Кто создаёт | Скил |
|:------:|----------|--------|-------------|------|
| 1 | Interview Brief | Markdown | Conductor | — |
| 1 | Discovery Brief | Markdown (в handoff) | Discovery | `$jtbd-canvas`, `$problem-statement`, `$assumption-mapping` |
| 1 | Session 1 Handoff | `docs/product/session-1-handoff.md` | Conductor | `$handoff`, `$session-prompt-generator` |
| 2 | Strategy Brief Alpha (Customer-Champion) | Markdown | product_strategist α | `$product-vision`, `$north-star-metric`, `$okr-framework`, `$product-roadmap` |
| 2 | Session 2 Handoff | `docs/product/session-2-handoff.md` | Conductor | `$handoff`, `$session-prompt-generator` |
| 3 | Strategy Brief Beta (Business-Champion) | Markdown | product_strategist β | (те же скилы) |
| 3 | Session 3 Handoff | `docs/product/session-3-handoff.md` | Conductor | `$handoff`, `$session-prompt-generator` |
| 4 | Unified Strategy Synthesis | Markdown | Mediator | — |
| 4 | Session 4 Handoff | `docs/product/session-4-handoff.md` | Conductor | `$handoff`, `$session-prompt-generator` |
| 5 | Final PRD + backlog | Markdown | PM | `$prd-template`, `$user-story`, `$acceptance-criteria`, `$rice-scoring` |
| 5 | UX output (flows + wireframes) | Markdown | UX Designer | `$user-flow`, `$design-brief` |
| 5 | Tech Brief (full feasibility) | Markdown | Tech Lead | `$epic-breakdown` |
| 5 | Metric Plan | Markdown | Data Analyst | `$saas-metrics`, `$hypothesis-template`, `$ab-test-design`, `$aarrr-metrics` |
| 5 | Session 5 Handoff | `docs/product/session-5-handoff.md` | Conductor | `$handoff`, `$session-prompt-generator` |
| 6 | Design Spec | Markdown | Designer | `$report-design` |
| 6 | PRD HTML + Product Review Deck HTML | HTML → PDF | Layouter | `$html-pdf-report` |
| 6 | Release Gate sign-off | — | Conductor | `$gates` |

### Full Pipeline B (shape-prioritize)

| Сессия | Артефакт | Формат | Кто создаёт | Скил |
|:------:|----------|--------|-------------|------|
| 1 | Discovery Brief (scope intake) | Markdown | Discovery | `$jtbd-canvas`, `$assumption-mapping` |
| 2 | Scope Proposal Alpha (Build-Camp) | Markdown | PM α + Tech Lead α | `$rice-scoring`, `$epic-breakdown` |
| 3 | Scope Proposal Beta (Cut-Camp) | Markdown | PM β + Tech Lead β | `$moscow-prioritization`, `$epic-breakdown` |
| 4 | Unified Scope Decision | Markdown | Mediator | — |
| 5 | Final PRD + UX + Metric plan (same as Full A S5, без new strategy) | Markdown | PM, UX, Data Analyst | (см. Full A) |
| 6 | PRD HTML + mini deck → PDF | HTML → PDF | Designer + Layouter | `$report-design`, `$html-pdf-report` |

### Spec

| Артефакт | Формат | Кто создаёт | Скил |
|----------|--------|-------------|------|
| PRD | Markdown | PM | `$prd-template`, `$user-story`, `$acceptance-criteria` |
| UX notes (если UI) | Markdown | UX Designer | `$user-flow` |
| Tech notes | Markdown | Tech Lead | `$epic-breakdown` |

### Quick

| Артефакт | Формат | Кто создаёт | Скил |
|----------|--------|-------------|------|
| Short Brief | Markdown (1-2 страницы) | PM (с вкладом остальных) | `$rice-scoring` (rough), `$saas-metrics` |

---

## Локализация

- Default: `ru`
- Каждый artifact может быть localized через `locales/en/` (Phase 2, не входит в Phase 1).

---

## Чек-лист запуска пайплайна (для Conductor)

Conductor выполняет при инициализации:

- [ ] Режим определён по Decision Tree (Full A / Full B / Spec / Quick)
- [ ] 5+ clarifying вопросов заданы и получены ответы
- [ ] `$board` создана с корректными ID гейтов (из Gate Sequencing)
- [ ] Первый гейт активирован (COND-01 → [→])
- [ ] User sign-off получен на режим и scope
- [ ] Для продолжающейся сессии: handoff файл загружен и верифицирован (протокол восстановления `$handoff`)

## Чек-лист закрытия сессии (для Conductor)

Conductor выполняет перед завершением:

- [ ] Все гейты текущей сессии в [✓] или [⊘] (нет [→] или [!])
- [ ] `$board` сохранена в handoff файле
- [ ] Все артефакты включены **полным текстом** в handoff
- [ ] Camp marker выставлен корректно (Full A/B Сессии 2-3)
- [ ] Evidence coverage проверен (≥ 80% или risk register обновлён)
- [ ] `$session-prompt-generator` вызван, промпт сгенерирован (Full A/B)
- [ ] Handoff файл сохранён: `docs/product/session-N-handoff.md`
- [ ] Файл самодостаточен (тест: можно начать работу без внешнего контекста)
- [ ] User sign-off получен на закрытие сессии

## Чек-лист Release Gate (для Conductor, Сессия 6)

- [ ] Все гейты всех сессий в [✓] на `$board`
- [ ] PRD HTML / PDF готов (LY-01 self-containment check пройден)
- [ ] Product Review Deck готов (Full A)
- [ ] Visual check: page breaks clean, cross-links work, TOC correct
- [ ] File size разумный (< 10 MB PRD / < 5 MB deck)
- [ ] Content intact — не модифицирован Layouter'ом
- [ ] User sign-off получен
- [ ] Итоговая доска + лог показаны пользователю
