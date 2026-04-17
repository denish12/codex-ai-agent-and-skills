---
name: gates
description: Контроль качества на гейтах — acceptance, rejection, severity (P0/P1/Note), escalation
---
# Gates — Контроль качества гейтов продуктового пайплайна

## Когда использовать
- **Перед каждым переходом** между гейтами — проверка deliverable текущего гейта.
- **При возврате на доработку** — повторная проверка после исправлений.
- **При завершении сессии** — проверка полноты материалов перед межсессионным `$handoff`.
- **При споре о готовности** — формальный арбитр: что сделано, а что нет.

> **Разграничение с `$board`:** `$gates` проверяет **качество и полноту** deliverable. `$board` отслеживает **статус и прогресс**. Gates отвечает на «готово ли?», Board — на «где мы сейчас?».

## Вход

| Поле | Обязательно | Описание |
|------|:-----------:|----------|
| Название гейта | ✅ | Какой гейт проверяем (с ID: COND-01, DISC-01, STRAT-01α и т.д.) |
| Режим пайплайна | ✅ | /ship-right-thing / /shape-prioritize / /quick-pm / /spec |
| Deliverables гейта | ✅ | Артефакты, которые агент передаёт на проверку |
| Итерация | ⬚ | Если повторная проверка — номер итерации + gap'ы предыдущей |
| Номер сессии | ⬚ | Текущая сессия (1-6 для Full A/B) |
| Adversarial camp | ⬚ | α (Customer/Build) / β (Business/Cut) — для camp-specific гейтов |

### Связь с другими скилами
| Скил | Взаимодействие |
|------|----------------|
| `$board` | После gate check — обновить статус гейта на доске (PASS → `[✓]`, FAIL → `[↩]`) |
| `$handoff` | При PASS / CONDITIONAL PASS — сформировать handoff-конверт с приложением gate check |
| `$session-prompt-generator` | При завершении сессии — gate check входит в данные для промпта следующей сессии |
| Скилы-фреймворки | PM / Data Analyst гейты: проверка корректного заполнения Quality Gate каждого используемого скила ($prd-template, $rice-scoring, $saas-metrics etc.) |

## Реестр гейтов и deliverables

### Full Pipeline A (`/ship-right-thing`, 6 сессий)

| # | Гейт | ID | Агент | Сессия | Camp | Обязательные deliverables | Скилы |
|---|------|-----|-------|:------:|:----:|---------------------------|-------|
| 1 | **Conductor** | COND-01 | Conductor | 1 | — | Режим определён, scope задачи, доска создана | `$board` |
| 2 | **Discovery** | DISC-01 | Discovery | 1 | — | JTBD canvas (buyer + end-user), problem statements, assumption map, evidence inventory | `$jtbd-canvas`, `$problem-statement`, `$assumption-mapping` |
| 3 | **Customer-Champion** | STRAT-01α | Product Strategist | 2 | α | Strategy Brief Alpha: vision (user-value), NSM (user metric), OKR, roadmap | `$product-vision`, `$okr-framework`, `$north-star-metric`, `$product-roadmap` |
| 4 | **Business-Champion** | STRAT-02β | Product Strategist | 3 | β | Strategy Brief Beta: vision (business-value), NSM (business metric), OKR, roadmap | (те же скилы, другая линза) |
| 5 | **Mediator** | MED-01 | Mediator | 4 | — | Unified Strategy Brief: карта позиций, аудит доказательств, синтез, обоснование | `$gates` |
| 6 | **PM (PRD)** | PM-SPEC | PM | 5 | — | PRD с user stories + AC + NFR + success metrics + rollout plan | `$prd-template`, `$user-story`, `$acceptance-criteria`, `$rice-scoring` |
| 7 | **UX Designer** | UX-01 | UX Designer | 5 | — | User flows, low-fi wireframes, design brief | `$user-flow`, `$design-brief` |
| 8 | **Tech Lead** | TECH-01 | Tech Lead | 5 | — | Матрица feasibility, список NFR, risk register, epic breakdown | `$epic-breakdown` |
| 9 | **Data Analyst** | DATA-01 | Data Analyst | 5 | — | Metric plan, гипотезы, дизайны экспериментов, требования к инструментированию | `$hypothesis-template`, `$saas-metrics`, `$aarrr-metrics`, `$ab-test-design` |
| 10 | **Designer** | DS-01 | Designer | 6 | — | Design spec (PRD layout + Product Review Deck) | `$report-design` |
| 11 | **Layouter** | LY-01 | Layouter | 6 | — | HTML сгенерирован, PDF готов | `$html-pdf-report` |
| 12 | **Release Gate** | RG-01 | Conductor | 6 | — | Все гейты пройдены, PDF сгенерирован, user sign-off | `$board`, `$gates` |

### Full Pipeline B (`/shape-prioritize`, 6 сессий)

| # | Гейт | ID | Агент | Сессия | Camp | Обязательные deliverables |
|---|------|-----|-------|:------:|:----:|---------------------------|
| 1 | Conductor | COND-01 | Conductor | 1 | — | Режим, scope, доска |
| 2 | Discovery (scope intake) | DISC-01 | Discovery | 1 | — | Scope brief: что приоритизируем, JTBD в scope, assumptions |
| 3 | PM Build-Camp | PM-01α | PM | 2 | α | Предложение scope Build: максимальный RICE, обоснование по каждому пункту |
| 4 | Tech Lead Build-Camp | TECH-01α | Tech Lead | 2 | α | Feasibility по каждой story, «да, X недель при Y ресурсах», компромиссы |
| 5 | PM Cut-Camp | PM-02β | PM | 3 | β | Предложение scope Cut: MoSCoW, обоснование по каждому сокращению |
| 6 | Tech Lead Cut-Camp | TECH-02β | Tech Lead | 3 | β | Скрытые риски, «без X не начинаем», флаги технического долга |
| 7 | Mediator | MED-01 | Mediator | 4 | — | Финальное решение по scope + обоснование, список out-of-scope |
| 8 | PM (final PRD) | PM-SPEC | PM | 5 | — | PRD на утверждённый scope |
| 9 | UX Designer | UX-01 | UX Designer | 5 | — | User flows для финального scope |
| 10 | Data Analyst | DATA-01 | Data Analyst | 5 | — | Metric plan |
| 11 | Designer | DS-01 | Designer | 6 | — | Design spec |
| 12 | Layouter | LY-01 | Layouter | 6 | — | HTML/PDF |
| 13 | Release Gate | RG-01 | Conductor | 6 | — | Sign-off |

### Quick Pipeline (`/quick-pm`, 1 сессия)

| # | Гейт | ID | Агент | Обязательные deliverables |
|---|------|-----|-------|---------------------------|
| 1 | Conductor | COND-01 | Conductor | Режим, scope, time box |
| 2 | Discovery (light) | DISC-01 | Discovery | Краткое JTBD, problem statement (1 строка), топ 3-5 допущений |
| 3 | Product Strategist | STRAT-01 | Product Strategist | Согласование с NSM, соответствие OKR, тема roadmap |
| 4 | PM | PM-01 | PM | Грубый RICE, набросок MVP (3-5 stories), Kano-классификация |
| 5 | Tech Lead | TECH-01 | Tech Lead | Грубая feasibility (S/M/L/XL), топ 2-3 рисков |
| 6 | Data Analyst | DATA-01 | Data Analyst | Основная метрика, guardrail, приблизительный таргет |

### Spec Pipeline (`/spec`, 1 сессия)

| # | Гейт | ID | Агент | Обязательные deliverables |
|---|------|-----|-------|---------------------------|
| 1 | Conductor | COND-01 | Conductor | Сверка: strategy + scope утверждены |
| 2 | PM (PRD draft) | PM-SPEC | PM | PRD draft через `$prd-template`, user stories через `$user-story`, AC через `$acceptance-criteria` |
| 3 | UX Designer | UX-01 | UX Designer | User flow, ссылки на wireframes, заметки по accessibility |
| 4 | Tech Lead | TECH-01 | Tech Lead | NFR, risk register, карта интеграций, epic breakdown |
| 5 | PM (final) | PM-FINAL | PM | Объединённый PRD (готов к передаче в engineering) |

## Критерии готовности по гейтам

> Каждый критерий имеет предустановленный severity: **[B]** = Blocker, **[G]** = Gap, **[N]** = Note. При проверке severity можно повысить (G→B), но не понизить (B→G).

### Conductor (COND-xx)
- [ ] **[B]** Режим пайплайна определён и обоснован (Full A / Full B / Quick / Spec)
- [ ] **[B]** Scope задачи сформулирован (что делаем, для кого, ограничения)
- [ ] **[B]** Доска создана через `$board` с корректными ID гейтов
- [ ] **[B]** Для Full A/B — adversarial camp определён для текущей сессии (если S2-S3)
- [ ] **[G]** Первый гейт активирован
- [ ] **[G]** Для продолжающихся сессий: предыдущий handoff загружен и верифицирован
- [ ] **[G]** Clarification first: минимум 5 уточняющих вопросов заданы (Сессия 1)

### Discovery (DISC-xx)
- [ ] **[B]** JTBD canvas заполнен: functional + emotional + social jobs (отдельно для buyer и end-user в Full A/B)
- [ ] **[B]** Минимум 5 evidence quotes на роль (из `$user-interview-script`) ИЛИ явный «discovery-light mode» для Quick
- [ ] **[B]** Problem statements (топ 3, структурированный формат actor/context/pain)
- [ ] **[B]** Assumption map (4 квадранта: value/usability/feasibility/viability), идентифицированы топ 3 высокорискованных
- [ ] **[G]** Evidence inventory с quality flags (✅ verified / ⚠️ aged / 🔮 assumed)
- [ ] **[G]** Открытые вопросы зафиксированы для нижестоящих гейтов
- [ ] **[N]** Разбивка по сегментам (SMB / mid-market / enterprise) где применимо

### Product Strategist (STRAT-xx)
- [ ] **[B]** Vision сформирована (Geoffrey Moore formula)
- [ ] **[B]** NSM выбрана с evaluation по 6 критериям (`$north-star-metric`)
- [ ] **[B]** OKR (1-3 Objectives, 2-5 KRs каждый)
- [ ] **[B]** Roadmap (Now/Next/Later) с themes
- [ ] **[B]** Для Full A — camp lens выдержан: Alpha акцент на user-value, Beta на business-value. Mixed = FAIL
- [ ] **[G]** Kano-баланс для пунктов roadmap
- [ ] **[G]** Набросок конкурентного дифференцирования
- [ ] **[N]** Тест FOCUS пройден для vision

**Dependency check:** Discovery Brief (JTBD + problems) процитирован. Vision/NSM связаны с конкретными JTBD.

### PM — Scope & Spec (PM-xx)
**Для PM-01α / PM-02β (Full B adversarial):**
- [ ] **[B]** Scope proposal — полный список с обоснованием по каждому пункту
- [ ] **[B]** Скоринг приоритизации (RICE / MoSCoW / WSJF)
- [ ] **[B]** Camp lens выдержан: Build — максимум + обоснование, Cut — минимум + «что отказываемся»
- [ ] **[G]** Kano-классификация по каждому пункту
- [ ] **[G]** Список out-of-scope (даже для Build camp)

**Для PM-SPEC (финальный PRD):**
- [ ] **[B]** PRD через `$prd-template` — все 14 секций заполнены
- [ ] **[B]** User stories через `$user-story` (INVEST), минимум 3-5 основных
- [ ] **[B]** Acceptance criteria через `$acceptance-criteria` per каждая story
- [ ] **[B]** Success metrics (основная + вторичные + guardrails) с базовыми уровнями + целями
- [ ] **[B]** Non-Goals явно определены
- [ ] **[G]** Топ 5 рисков с митигацией
- [ ] **[G]** Rollout plan через `$launch-checklist`
- [ ] **[N]** Зависимости отмечены

**Dependency check:** Strategy Brief (Mediator synthesis для Full A, или утверждённая стратегия для Spec/Quick/Full B) процитирован. Цели PRD связаны с KR OKR.

### UX Designer (UX-xx)
- [ ] **[B]** User flows для основных потоков (happy path + точки принятия решений + ошибки)
- [ ] **[B]** Low-fi wireframes для новых UI-поверхностей
- [ ] **[B]** Design brief через `$design-brief` (если handoff к visual designer)
- [ ] **[G]** Пустые / состояния загрузки покрыты
- [ ] **[G]** Цели accessibility (уровень WCAG) указаны
- [ ] **[N]** Prototype / видеовоспроизведение

**Dependency check:** User stories из PRD покрыты flows.

### Tech Lead (TECH-xx)
**Для TECH-01α / TECH-02β (Full B):**
- [ ] **[B]** Feasibility по каждой story (можем построить? за сколько?)
- [ ] **[B]** Camp lens: Build — «да, доставим за X», Cut — «скрытые риски, не начинать без Y»
- [ ] **[G]** Риски интеграций / миграций выявлены

**Для TECH-01 (standalone):**
- [ ] **[B]** NFR (performance, availability, security, compliance, scalability, observability)
- [ ] **[B]** Risk register (топ 5 с митигацией)
- [ ] **[B]** Epic breakdown (stories с зависимостями, critical path) через `$epic-breakdown`
- [ ] **[G]** Кандидаты в spike идентифицированы (time-boxed)
- [ ] **[N]** Architecture ADR (если значимое решение)

**Dependency check:** PRD user stories покрыты feasibility + breakdown.

### Data Analyst (DATA-xx)
- [ ] **[B]** Основная метрика определена + базовый уровень + цель
- [ ] **[B]** Guardrail metrics с порогами
- [ ] **[B]** Hypothesis (через `$hypothesis-template`) для ключевых инициатив
- [ ] **[B]** SaaS metric impact model (через `$saas-metrics`)
- [ ] **[G]** Дизайн эксперимента (`$ab-test-design`) если A/B запланирован
- [ ] **[G]** Требования к инструментированию — что логируется
- [ ] **[N]** План сегментного анализа предзарегистрирован

**Dependency check:** NSM из Strategy Brief используется как anchor. PRD success metrics согласованы с metric plan.

### Mediator (MED-xx)
- [ ] **[B]** Результаты обеих camp получены (Alpha + Beta)
- [ ] **[B]** Независимость верифицирована — нет признаков контаминации
- [ ] **[B]** Аудит доказательств по camp (скоринг 1-5 силы доказательств)
- [ ] **[B]** Карта позиций (где совпадают / где расходятся)
- [ ] **[B]** Анализ разногласий (фактические / ценностные / рисковые)
- [ ] **[B]** Синтез с обоснованием (принять Alpha / принять Beta / гибрид)
- [ ] **[G]** Открытые риски + план митигации
- [ ] **[G]** Открытые вопросы для discovery

**Dependency check:** Strategy Brief Alpha + Beta (Full A) или Scope Brief Alpha + Beta (Full B) явно процитированы и сопоставлены.

### Designer (DS-xx)
- [ ] **[B]** Design spec через `$report-design`
- [ ] **[B]** Структура + навигация для PRD / Review Deck
- [ ] **[B]** Component library (таблицы, callouts, статусные бейджи)
- [ ] **[G]** Ключевые визуализации (roadmap, дерево метрик, воронка)
- [ ] **[N]** Соответствие бренду

**Dependency check:** Структура покрывает все секции финального PRD / unified strategy brief.

### Layouter (LY-xx)
- [ ] **[B]** HTML сгенерирован по design spec
- [ ] **[B]** Все visualizations отрендерены (Chart.js / Mermaid / SVG)
- [ ] **[B]** PDF output корректен (переносы страниц, шрифты встроены)
- [ ] **[G]** Самодостаточный (нет битых ссылок)
- [ ] **[N]** Размер файла разумный (< 10 МБ)

**Dependency check:** HTML соответствует design spec. Все секции из PRD присутствуют.

### Release Gate (RG-xx)
- [ ] **[B]** Все предыдущие гейты пройдены (статус `[✓]` на `$board`)
- [ ] **[B]** PDF / PRD финальный готов
- [ ] **[B]** Launch checklist (`$launch-checklist`) если релиз подразумевается
- [ ] **[G]** User sign-off получен
- [ ] **[G]** План распространения (email, in-app, blog, sales)

## Severity критериев

| Severity | Маркер | Определение | Влияние на решение |
|----------|:------:|-------------|-------------------|
| Blocker | **[B]** | Обязательный deliverable отсутствует или критически неполный | FAIL — возврат на доработку |
| Gap | **[G]** | Deliverable есть, но неполный или с замечаниями | CONDITIONAL PASS — можно передать, но gap'ы зафиксированы |
| Note | **[N]** | Мелкое замечание, не влияет на переход | PASS — замечание передаётся следующему гейту как контекст |

> Severity можно повысить (G→B при критичности), но **нельзя понизить** (B→G). Предустановленный severity — минимальный.

## Решения

| Решение | Условие | Действие |
|---------|---------|----------|
| **PASS** | 0 Blocker + 0 Gap | Запросить user Approved → `$handoff` → следующий гейт |
| **CONDITIONAL PASS** | 0 Blocker + 1-2 Gap | Зафиксировать gap'ы → Запросить user Approved с пометкой → `$handoff` с пометкой |
| **FAIL** | ≥ 1 Blocker | Вернуть агенту с конкретным списком gap'ов → Не запрашивать Approved |

> **Абсолютное правило:** Никогда не пропускать гейты, даже если задача кажется простой. FAIL — доработка — повторная проверка. Без исключений.

### Специальные правила
- Discovery (DISC): отсутствие JTBD canvas с 5+ evidence quotes (кроме `/quick-pm`) — **автоматический Blocker**.
- PRD без success metrics section — **Blocker**.
- User story без AC — **Blocker**.
- В Full A/B — camp contamination (Alpha видел Beta artefacts до Mediator) — **автоматический Blocker**, эскалация.
- Release Gate без launch checklist для production release — **Blocker**.

## Протокол эскалации при повторных FAIL

| Итерация | Действие |
|:--------:|----------|
| 1-й FAIL | Стандартный возврат: список gap'ов → агент дорабатывает → повторная проверка |
| 2-й FAIL | Расширенный возврат: gap'ы + конкретные инструкции «как исправить» + предупреждение |
| 3-й FAIL | **Эскалация пользователю** |

Шаблон эскалации (3+ FAIL):
```
### ⚠️ Эскалация — Гейт [ID] не проходит проверку (итерация [N])

**Гейт:** [ID] [Название]
**Итераций FAIL:** [N]
**Повторяющиеся gap'ы:** [список gap'ов, не исправленных за N итераций]

**Варианты:**
1. Пересмотреть scope / снизить требования к deliverable
2. Вернуть на предыдущий гейт (проблема в исходных данных)
3. Принудительный CONDITIONAL PASS (user принимает риск gap'ов)

→ Ожидаю решение от пользователя.
```

## Протокол

### Шаг 0 — Загрузка контекста
1. Определить какой гейт проверяем (по ID из `$board`).
2. Определить режим пайплайна и номер сессии.
3. Загрузить критерии готовности для этого гейта из реестра (с предустановленным severity).
4. Если повторная проверка — загрузить gap'ы предыдущей итерации.
5. Для Full A/B — проверить camp contamination (предварительно).

### Шаг 1 — Проверка deliverables
1. Для каждого критерия готовности — проверить: выполнен / не выполнен / N/A.
2. Для невыполненных — применить предустановленный severity (можно повысить, нельзя понизить).
3. Для невыполненных — описать конкретный gap: что именно не хватает / что исправить.
4. **Dependency check:** проверить, что deliverable предыдущего гейта явно использован (не просто существует, а процитирован / задействован в текущем deliverable).

### Шаг 2 — Принятие решения
1. Подсчитать severity.
2. Применить правила решений (PASS / CONDITIONAL PASS / FAIL).
3. Проверить номер итерации — если 3+ FAIL, активировать протокол эскалации.
4. Добавить запись в лог проверок.

### Шаг 3 — Действие по результату
- **PASS:** показать пользователю → запросить Approved → `$handoff` → обновить `$board`.
- **CONDITIONAL PASS:** показать gap'ы → запросить Approved с подтверждением gap'ов → `$handoff` с пометкой → обновить `$board`.
- **FAIL:** показать gap'ы → вернуть агенту → обновить `$board` (статус `[↩] Возврат`). Если 3+ FAIL — эскалация.

## Пример — Gate Check PM-SPEC (TeamFlow, `/ship-right-thing` Сессия 5), итерация 1 → CONDITIONAL PASS

**Контекст:** TeamFlow (B2B SaaS, HR-tech). После Mediator synthesis (MED-01) команда написала PRD для AI-powered 1:1 summarization. Gate check перед передачей UX + Tech + Data.

```
### Gate Check — PM-SPEC (PM финальный PRD)

**Режим:** /ship-right-thing (Full A)
**Сессия:** 5 из 6
**Итерация:** 1
**Предыдущие gap'ы:** Первая проверка

---

#### Критерии готовности

| # | Критерий | Sev | Статус | Gap / Комментарий |
|---|----------|:---:|:------:|-------------------|
| 1 | PRD: все 14 секций заполнены | [B] | ✅ | TL;DR, Problem, Goals, Non-Goals, Strategy Fit, Solution, Stories, NFR, Metrics, Risks, Rollout, Deps, Q's, Appendix |
| 2 | User stories (INVEST), min 3-5 primary | [B] | ✅ | 7 stories (5 primary + 2 error paths) |
| 3 | AC per story (Gherkin / scenario) | [B] | ✅ | Все 7 stories имеют AC с edge cases + error states |
| 4 | Success metrics: основная + вторичные + guardrails | [B] | ✅ | Основная: еженедельные встречи 1:1 с AI-резюме (30→50% за 90 дней). Guardrails: стабильность NPS, объём тикетов по соответствию |
| 5 | Non-Goals явно определены | [B] | ✅ | «Не строим суммаризацию для групповых встреч», «Не заменяем конспектирование вручную» |
| 6 | Топ 5 рисков с митигацией | [G] | ⚠️ | 4 риска из целевых 5. Отсутствует: риск соответствия/правовой по HR data ingestion |
| 7 | Rollout plan (launch-checklist) | [G] | ⚠️ | Поэтапная выкатка определена, но условия триггера rollback не числовые |
| 8 | Зависимости отмечены | [N] | ℹ️ | Зависимость от platform team указана, но сроки не подтверждены |

**Dependency check:** Unified Strategy Brief (MED-01) процитирован в Strategy Fit section. NSM «weekly 1:1s with AI summary» из Strategy Brief = primary success metric в PRD. ✅

---

#### Сводка

| Severity | Количество | Пункты |
|----------|:----------:|--------|
| Blocker | 0 | — |
| Gap | 2 | #6 (risks count), #7 (rollback trigger) |
| Note | 1 | #8 (deps timeline) |

### Решение: CONDITIONAL PASS

**Обоснование:** 0 Blocker, 2 Gap — допустимо для передачи в параллельную работу (UX, Tech, Data). Gap'ы помечены: risk register и rollback criteria — TECH-01 и Release Gate уточнят.

---

**Deliverables для передачи:**
- PRD (v1 draft, 14 секций, 7 user stories с AC)

**Gap'ы для downstream:**
- [Tech Lead] Добавить 5-й риск: соответствие/правовой — HR data ingestion, последствия GDPR / SOC2
- [Tech Lead / Data] Определить числовые условия триггера для rollback (коэффициент ошибок, задержка, падение NPS)
- [Release Gate] Подтвердить сроки platform team

→ Готов к передаче **UX Designer + Tech Lead + Data Analyst** (параллельно). Ожидаю **"Approved"**.
```

## Валидация (Quality Gate)

Проверка гейта считается завершённой если:

- [ ] Все критерии готовности пройдены (выполнен / не выполнен / N/A — нет пустых)
- [ ] Каждому критерию присвоен severity из реестра (B/G/N), при необходимости повышен
- [ ] Для каждого невыполненного указаны: severity, описание gap'а, что исправить
- [ ] Dependency check пройден: deliverable предыдущего гейта явно использован в текущем
- [ ] Для Full A/B — camp contamination check пройден
- [ ] Решение соответствует правилам (не субъективное)
- [ ] При 3+ FAIL — активирован протокол эскалации
- [ ] Лог проверок обновлён
- [ ] При PASS/CONDITIONAL PASS — user Approved получен
- [ ] `$board` обновлён

## Handoff
Результат `$gates` является входными данными для: `$handoff` (приложение gate check к конверту).

Формат передачи: заполненный шаблон gate check + решение + gap'ы (если CONDITIONAL PASS) + dependency check результат.

## Anti-patterns

| Ошибка | Почему плохо | Как правильно |
|--------|-------------|---------------|
| Пропуск гейта «потому что просто» | Ошибки проходят незамеченными | Никогда не пропускать. Без исключений |
| PASS без проверки всех критериев | Незамеченные gap'ы | Каждый критерий = выполнен / не выполнен / N/A |
| «В целом ок» вместо конкретики | Агент не знает что исправлять | Конкретный gap: «Non-Goals section содержит только 1 пункт, нужно min 2» |
| FAIL без описания gap'ов | Агент возвращается и не знает что делать | Каждый FAIL = список конкретных доработок |
| Approved без user sign-off | Нарушение протокола пайплайна | Всегда явное Approved от пользователя |
| Discovery без JTBD canvas | Пайплайн работает без customer-centric foundation | JTBD — обязателен, его отсутствие = Blocker |
| Одинаковая важность всех критериев | Мелочь блокирует, критичное проходит | Предустановленный severity: [B] / [G] / [N] per criterion |
| Повторная проверка без сверки с gap'ами | Gap мог быть не исправлен | Загрузить gap'ы предыдущей итерации, проверить каждый |
| Понижение severity (B→G) | Критический deliverable проходит без проверки | Severity можно повысить, но нельзя понизить |
| Бесконечный цикл FAIL | Пайплайн зависает | 3+ FAIL = эскалация пользователю с вариантами |
| Формальная проверка «существует» | Deliverable есть, но не использован следующим гейтом | Dependency check: предыдущий deliverable процитирован |
| Camp contamination (Full A/B) | Alpha и Beta взаимно влияют | Contamination = автоматический Blocker |

## Шаблон вывода

```
### Gate Check — [ID] [Название гейта]

**Режим:** [/ship-right-thing | /shape-prioritize | /quick-pm | /spec]
**Сессия:** [N из M]
**Camp:** [α / β / —]
**Итерация:** [1 / 2 / N]
**Предыдущие gap'ы:** [список или «Первая проверка»]

---

#### Критерии готовности

| # | Критерий | Sev | Статус | Gap / Комментарий |
|---|----------|:---:|:------:|-------------------|
| 1 | [Критерий из реестра] | [B] | ✅/⚠️/❌ | [Если не выполнен: что не хватает] |

**Dependency check:** [Deliverable [предыдущий ID] процитирован: ✅/❌. Детали.]

**Camp independence check (Full A/B):** [Verified / Contamination detected]

---

#### Сводка

| Severity | Количество | Пункты |
|----------|:----------:|--------|
| Blocker | [N] | #[список] |
| Gap | [N] | #[список] |
| Note | [N] | #[список] |

### Решение: [ PASS / CONDITIONAL PASS / FAIL ]

**Обоснование:** [по правилам: 0 blocker + 0 gap = PASS и т.д.]

---

#### При PASS / CONDITIONAL PASS:
**Deliverables для передачи:**
- [Артефакт 1]

**Gap'ы для следующего гейта (если CONDITIONAL):**
- [Gap 1 — что учесть]

→ Готов к передаче **[Следующий агент]**. Ожидаю **"Approved"**.

#### При FAIL:
**Gap'ы для доработки:**

| # | Gap | Sev | Что исправить | Ответственный |
|---|-----|:---:|---------------|---------------|
| [N] | [описание] | [B] | [конкретное действие] | [агент] |

→ Возврат к **[Текущий агент]**. После исправления — повторная проверка (итерация [N+1]).
[Если итерация ≥ 3: активирован протокол эскалации]
```
