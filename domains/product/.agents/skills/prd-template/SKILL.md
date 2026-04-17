---
name: prd-template
description: Шаблон Product Requirements Document для B2B SaaS — problem, solution, stories, AC, NFR, metrics, risks, rollout
---
# PRD Template (B2B SaaS)

> **Категория:** Specification  ·  **Slug:** `prd-template`

## Когда использовать

- Когда scope утверждён и команда готова к implementation.
- Как контракт между Product и Engineering.
- Для onboarding новых engineers на initiative (self-serve docs).
- Как baseline для post-launch review (did we deliver what we said?).

## Вход

| Поле | Обязательно | Описание |
|------|:-----------:|----------|
| Utвержденный scope | ✅ | Из Mediator (Full B) или из roadmap |
| Discovery Brief | ✅ | JTBD, problems, assumptions |
| Strategy Brief | ✅ | Vision, NSM, OKR alignment |
| Tech feasibility review | ✅ | От Tech Lead |
| Metric plan | ✅ | От Data Analyst |

## Источники данных

1. Discovery + interviews — for problem section.
2. Strategy brief — context.
3. Tech Lead review — NFR, risks.
4. Data Analyst — metrics.
5. Design brief / wireframes — UX.

### Связь с другими скилами

| Скил | Что берём | Когда вызывать |
|------|-----------|----------------|
| `problem-statement` | Problem section | Для PRD section 2 |
| `user-story` | Stories section | Для каждого user flow |
| `acceptance-criteria` | AC | Per story |
| `epic-breakdown` | Epic/story hierarchy | Для implementation plan |
| `hypothesis-template` | Success metrics | Для Success Criteria section |
| `saas-metrics` | Metric impact | Для Impact section |
| `launch-checklist` | Rollout plan | Для Rollout section |

## Структура PRD

1. **Header** — title, owners, status, dates, links
2. **TL;DR** — 1 paragraph (for skim)
3. **Problem** — why we're doing this
4. **Goals & Non-Goals** — explicit in-scope / out-of-scope
5. **Strategy Fit** — OKR / NSM alignment
6. **Solution** — high-level approach (not implementation)
7. **User Stories** — with AC
8. **NFR** — non-functional requirements
9. **Success Criteria** — metrics + targets
10. **Risks & Mitigations**
11. **Rollout Plan** — launch strategy
12. **Dependencies** — teams, external
13. **Open Questions**
14. **Appendix** — designs, research, data

## Протокол

### Шаг 0 — Сбор входных данных

Чеклист перед началом:
- [ ] Discovery завершён?
- [ ] Стратегия согласована?
- [ ] Scope согласован (через MoSCoW или RICE)?
- [ ] Tech review проведён?
- [ ] Metric plan составлен?

Если нет — вернуться к соответствующему предшественнику.

### Шаг 1 — Header + TL;DR

**Header:**
```
PRD: [Feature/Initiative Name]
Owner: [PM name]
Contributors: [Eng Lead, Design Lead, Data]
Status: Draft / In Review / Approved / Shipped
Target Release: [Quarter]
Links: [OKR, Figma, research]
```

**TL;DR** — 3-5 предложений:
- Проблема (1 предложение)
- Решение (1 предложение)
- Кто выигрывает (1 предложение)
- Основная метрика успеха (1 предложение)

### Шаг 2 — Problem Section

Через `$problem-statement`:
- Actor (buyer / end-user / admin)
- Context / trigger
- Pain (с evidence)
- Root cause
- Impact (reach × frequency × severity)

Включить **evidence** (quotes, ticket volume, metrics).

### Шаг 3 — Goals & Non-Goals

**Goals** (максимум 3-5):
- Конкретные, измеримые
- Привязаны к метрическому target

**Non-Goals** (явно вне scope):
- Что мы **НЕ** решаем этим PRD
- Предотвращает scope creep в implementation

### Шаг 4 — Strategy Fit

- Какой OKR / KR driver?
- Как impact на NSM?
- Какие themes из roadmap?
- Если Full A (Customer-vs-Business) — какая стратегия camp принята?

### Шаг 5 — Solution (high-level)

- Подход (абзац)
- Ключевые дизайн-решения (без implementation detail)
- Рассмотренные альтернативы (1-2 с причиной почему не выбраны)

### Шаг 6 — User Stories + AC

Для каждого user flow:
- Story через `$user-story` (INVEST)
- AC через `$acceptance-criteria` (Gherkin)

Структура:
- Primary (happy path) stories
- Edge cases
- Error states

### Шаг 7 — NFR (B2B SaaS critical)

Через checklist (NFR skill или Tech Lead review):
- **Performance:** p95, throughput
- **Availability:** SLA target (99.9% / 99.99%)
- **Security:** authN/Z, encryption at rest, audit logs
- **Compliance:** SOC2, GDPR, HIPAA, industry-specific
- **Scalability:** target load
- **Observability:** logs, metrics, traces
- **Integrations:** SSO (SAML/OIDC), SCIM, API rate limits
- **Accessibility:** WCAG level

### Шаг 8 — Success Criteria

Metric tree (через `$north-star-metric` + `$saas-metrics`):
- **Primary metric** — что двигаем (NSM impact)
- **Secondary metrics** — supporting signals
- **Guardrails** — что нельзя сломать

Цели:
- Baseline (сегодня)
- Краткосрочный (30 дней после запуска)
- Среднесрочный (90 дней)
- Долгосрочный (6+ месяцев)

### Шаг 9 — Risks & Mitigations

Топ 5:

| # | Риск | Вероятность | Impact | Меры противодействия |
|---|------|:-----------:|:------:|------------|
| 1 | [desc] | H/M/L | H/M/L | [plan] |

### Шаг 10 — Rollout Plan

Через `$launch-checklist`:
- **Phased rollout** (feature flag? сначала beta customers?)
- **Dogfooding** (внутреннее использование)
- **Документация** (customer-facing docs, обучение)
- **Коммуникация** (release notes, email, in-app)
- **Rollback plan** (если что-то пойдёт не так)

Специфика B2B:
- Предварительный просмотр для customer advisory board
- Уведомление Enterprise аккаунтов (security / контрактные последствия)

### Шаг 11 — Dependencies

- Команды: [Platform / Security / Data / CS]
- Внешние: [vendors, integrations]
- Предварительные условия: [что должно быть сделано сначала]

### Шаг 12 — Open Questions

Живой список — что неопределённо, кто решает, к какому сроку.

## Валидация (Quality Gate)

- [ ] TL;DR ≤ 5 sentences
- [ ] Problem section имеет evidence
- [ ] Goals измеримы + Non-Goals явны
- [ ] Strategy fit показан
- [ ] Каждая user story имеет AC
- [ ] NFR covered (performance, security, compliance)
- [ ] Success metrics с baselines + targets
- [ ] Top 5 risks с mitigation
- [ ] Rollout plan включает rollback
- [ ] Dependencies listed
- [ ] Open questions с owners

## Handoff

Результат является входом для:
- **Engineering** → implementation planning
- **Designer + Layouter** (if PDF)
- **QA** → test plan
- **CS / Sales** → enablement materials
- **Mediator / Release Gate**

Формат: PRD markdown (может быть сconverted в PDF). Через `$handoff`.

## Anti-patterns

| Ошибка | Почему плохо | Как правильно |
|--------|-------------|---------------|
| Implementation details | PRD ≠ design doc | Что/почему, не как |
| No success metrics | Нельзя измерить победу | Primary + secondary + guardrails |
| Missing NFR | B2B deal breakers | Security, compliance обязательны |
| No Non-Goals | Scope creep | Явный out-of-scope |
| PRD without AC | Слабый контракт | Каждая story имеет AC |
| No rollback plan | Рискованные запуски | Всегда иметь Plan B |

## Шаблон

```markdown
# PRD: [Название инициативы]

**Владелец:** [PM]  ·  **Статус:** Черновик  ·  **Target:** Q2 2026

## TL;DR
[3-5 предложений]

## Проблема
[через $problem-statement]

## Цели
1. ...

## Non-Goals (вне scope)
- ...

## Strategy Fit
- OKR: [ссылка]
- NSM impact: [ожидаемый]

## Решение
[Высокоуровневый подход]

## User Stories
### Story 1: [название]
[через $user-story]

**Acceptance Criteria:** [через $acceptance-criteria]

## Non-Functional Requirements
- Performance: p95 < 200ms
- Availability: 99.9%
- Security: SSO, audit logs
- Compliance: SOC 2 Type II
...

## Success Criteria
| Метрика | Baseline | 30d | 90d | 6mo |
| Primary | | | | |

## Риски
...

## Rollout
1. Dogfood неделя N
2. Beta N customers неделя N+1
3. GA неделя N+2
4. Rollback: feature flag

## Dependencies
- Platform: [что необходимо]
- Security: [сроки review]

## Открытые вопросы
- [Вопрос, владелец, к какому сроку]
```

## Worked Example — TeamFlow PRD: AI 1:1 Summarization MVP (excerpt)

```markdown
# PRD: AI 1:1 Summarization (Team Tier MVP)

**Owner:** Alex K., PM  ·  **Status:** Approved (post-Mediator synthesis)  ·  **Target Release:** Q2 2026 (GA target June 30)
**Contributors:** Eng Lead (Priya S.), Design Lead (Jordan M.), Data Lead (Sam P.), Legal (Mia R.)
**Links:** [OKR Q2 Product doc] · [Figma designs] · [Discovery Brief session-1-handoff.md] · [Mediator synthesis session-4-handoff.md]

## TL;DR
AI Summarization превращает 1:1s от 3-часовой/неделю административной нагрузки в 30-минутный уверенный workflow. Менеджеры говорят, TeamFlow захватывает, суммирует, извлекает action items, напоминает. Запущено за Team Tier (+$8/seat). Успех: 40 upgrades аккаунтов + 65% adoption менеджеров в AI-tier аккаунтах в первые 90 дней.

## Problem
People managers (5-15 прямых подчинённых) в mid-market B2B SaaS компаниях (100-1000 сотрудников) тратят 45-60 мин/неделю на report на 1:1 prep + note-taking + follow-up (3-4 часа/неделю для manager с 8 reports), потому что TeamFlow предоставляет structured templates, но не имеет capture или synthesis capability.

**Evidence:** 6 of 8 customer interviews + 120 support tickets Q1 2026 + internal analytics. Impact: ~3,000 affected managers across 200-customer base. Business: $3-5M ARR expansion opportunity + 10pp NRR lift potential through Team Tier upgrade path.

*Full analysis: [problem-statement #1 в Discovery Brief]*

## Goals
1. **Adoption:** 65% of managers в AI-tier accounts use summarization weekly by Day 90
2. **Tier conversion:** 40 accounts upgrade from Core to Team tier (+$8/seat) by Q2 end
3. **Action items lift:** 60% → 75% completion rate в AI-tier accounts
4. **Quality:** Summary acceptance rate (не edited >50%) ≥ 70%

## Non-Goals (явно вне scope)
- Транскрипция в реальном времени во время 1:1 (цель Q3 — по решению Mediator о scope)
- Генерация pre-1:1 prep card (Q3 — требует данных нескольких встреч)
- Суммаризация групповых / командных встреч (будущее, контроль scope creep)
- Поддержка нерусских языков (English-first, EU languages Q4)
- Mobile-native experience (только web responsive для MVP)
- Интеграция с внешними инструментами для встреч (Zoom/Meet) — Q3-Q4

## Strategy Fit
- **OKR:** Drives O1.1 (40 tier upgrades), O1.2 (65% manager adoption), O1.3 (NPS ≥50), O1.4 (action items 60→75%)
- **NSM:** Primary driver of «Sticky Manager Ratio» — target 20% by Day 90
- **Roadmap:** Theme 1 «AI-Assisted 1:1 Workflow» — Now bucket item

## Решение (высокий уровень)

Workflow менеджера:
1. До 1:1: Включить «AI assist» (или по умолчанию для AI tier аккаунтов)
2. Во время 1:1: Обычный разговор в TeamFlow 1:1 interface. Печатать не нужно (audio опционально через запись в браузере с согласия пользователя).
3. После 1:1: AI генерирует summary + извлекает action items. Менеджер просматривает, редактирует (inline) или одобряет.
4. Перед следующей 1:1: Action items из предыдущего summary prominently отображаются.

Архитектура: summaries генерируются через OpenAI GPT-4 API (региональные endpoints: US, EU) на opt-in basis. Нет хранения данных у LLM провайдера (zero-retention API tier). Summaries хранятся в TeamFlow DB с customer-owned encryption keys.

**Рассмотренные альтернативы:**
- Fine-tuned on-premise LLM: отклонён (разрыв в качестве, сложность infra, сроки Q2)
- Anthropic Claude via Bedrock: **принят как fallback** (контракт действует для redundancy)
- Third-party (Otter.ai embed): отклонён (privacy architecture недостаточна для HR data)

## User Stories (топ 5 из PRD backlog; полный список: 14 stories)

### Story S1: Включить AI Summarization для новой 1:1
**Как** People manager с 5+ подчинёнными в mid-market B2B SaaS компании (Team Tier аккаунт)
**Я хочу** включить AI summarization для предстоящей 1:1 одним кликом
**Чтобы** я мог полностью сосредоточиться на разговоре, не беспокоясь о ведении заметок

**AC:** [через `$acceptance-criteria` — 4 сценария: happy path, already-enabled, admin-disabled-at-org-level, AI provider unavailable fallback]

**Размер:** S (2 points) · **Зависит от:** T1 (feature flag infra)

### Story S2: Генерировать Summary после завершения 1:1
**Как** менеджер, который только что завершил AI-enabled 1:1
**Я хочу** получить summary + action items в течение 60 секунд после завершения встречи
**Чтобы** я мог проверить и одобрить прежде, чем переходить к следующей задаче

**AC:** [4 сценария включая streaming delivery UX]
**Размер:** L (8 points) — ОСНОВНАЯ AI работа · **Зависит от:** S1

### Story S3: Просматривать и редактировать Summary inline
**Как** менеджер, просматривающий AI-generated summary
**Я хочу** редактировать контент inline и отмечать его одобренным
**Чтобы** исправления стали авторитетной записью и AI учился предпочтениям со временем

**AC:** [3 сценария]
**Размер:** M (5 points)

### Story S4: Автоматически извлекать и отслеживать Action Items
**Как** менеджер с одобренным AI summary
**Я хочу** action items автоматически извлечённые и отслеживаемые в моей очереди follow-up для 1:1
**Чтобы** я не терял обязательства между встречами

**AC:** [4 сценария включая detection confidence threshold]
**Размер:** M (5 points) · **Зависит от:** S2

### Story S5: Получать напоминание об Action Items перед следующей 1:1
**Как** менеджер с открытыми action items из предыдущей 1:1
**Я хочу** чтобы они отображались за 30 мин до следующей 1:1
**Чтобы** follow-through был top-of-mind

**AC:** [3 сценария]
**Размер:** S (3 points) — rule-based, не AI · **Зависит от:** S4

## Non-Functional Requirements

- **Performance:** 
  - Генерация summary: p95 ≤ 60s с момента окончания встречи
  - Время загрузки summary: ≤ 500ms
- **Availability:** 99.9% (исключая 3rd-party LLM outages, для которых документирован fallback на вторичного провайдера)
- **Security:**
  - Все данные транскрипций зашифрованы в покое (AES-256) и при передаче (TLS 1.3)
  - Encryption key на каждого customer (BYOK для enterprise)
  - Zero data retention у LLM провайдера (использовать OpenAI/Anthropic zero-retention API tiers)
  - Audit log каждой AI операции (summary сгенерирован, отредактирован, одобрен)
- **Compliance:**
  - SOC 2 Type II attestation расширена для покрытия AI features (аудит Q2)
  - GDPR compliant — данные EU customers остаются в регионе EU (Azure West Europe)
  - Нет обучения на данных customers (contractual с провайдерами)
- **Scalability:** Поддержка 5,000 summaries/день Q2, масштабирование до 50,000/день к Q4
- **Observability:** Полная инструментация — generation latency, quality rating, edit rate, точность извлечения action items
- **Privacy UX:**
  - Opt-in на каждую встречу (контроль менеджера)
  - Org-level disable toggle (admin может отключить company-wide)
  - Retention controls (30 / 90 / 365 / 730 дней, выбор customer)

## Success Criteria

| Metric | Baseline (pre-launch) | 30d target | 90d target | 6mo target |
|--------|:--------------------:|:----------:|:----------:|:----------:|
| **Sticky Manager Ratio (NSM)** | 0% | 10% | 20% | 35% |
| Team Tier upgrades | 0 accounts | 15 accounts | 40 accounts | 80 accounts |
| Action items completion (AI-tier) | 60% baseline | 68% | 75% | 80% |
| AI summary acceptance (no major edits >50%) | N/A | 65% | 70% | 75% |
| NPS в AI tier | 45 (blended TeamFlow NPS) | 48 | 50 | 55 |
| **Guardrails:** | | | | |
| Gross churn (overall) | 8% annual | ≤8% | ≤8% | ≤8% |
| Support ticket volume / AI issues | N/A | <5% of total | <3% | <2% |
| p95 latency | N/A | <60s | <45s | <30s |

## Риски и меры противодействия (Топ 5)

| # | Риск | Вероятность | Impact | Меры противодействия |
|---|------|:----:|:------:|------------|
| 1 | Качество LLM ниже 85% приемлемого — доверие пользователей рушится | M | H | Wizard-of-Oz проверил 78% до запуска; human-review layer feature flag готов; контракт со вторичным LLM провайдером |
| 2 | Реакция на privacy concerns (восприятие слежки) | M | H | Opt-in на каждую встречу; прозрачная модель данных; ранняя коммуникация с customer advisory; legal review завершён |
| 3 | Задержки аудита SOC 2 Type II блокируют enterprise deals | M | H | Параллельный аудит начат с Недели 1; условные deal commitments приемлемы; fallback Type II отложен до Q3 |
| 4 | Изменение pricing / terms OpenAI в середине квартала | L | M | Контракт Anthropic действует; API abstraction layer позволяет замену менее чем за 1 неделю |
| 5 | Низкая точность извлечения action items → недоверие пользователей | M | M | Отображение порога confidence; менеджер всегда может редактировать; итеративная настройка prompt |

## Rollout Plan

**Фаза 1 — Internal Dogfood (Неделя 6-7):**
- Сотрудники TeamFlow используют функцию внутренне
- Топ 5 проблем выявлено + устранено до beta

**Фаза 2 — Beta (Неделя 8-10):**
- 10 Design Partner customers (отобранный mix: SMB 4, mid-market 4, enterprise 2)
- Еженедельные интервью с customers + опрос
- NPS target ≥45 во время beta

**Фаза 3 — Limited GA (Неделя 11-12):**
- Feature flag открыт для 25% AI-tier-upgraded customers
- Мониторинг guardrails; полный rollout только при зелёных метриках

**Фаза 4 — Full GA (Неделя 13+):**
- Feature flag для 100% AI tier
- Sales и CS обучены; marketing campaign запущена
- Tier upgrade funnel открыт для non-AI-tier customers

**Rollback triggers:**
- Error rate >2% более 15 минут → отключить feature flag
- p95 latency >2 мин более 30 минут → отключить
- Всплеск support tickets 5× baseline → расследование + возможное отключение
- Критический privacy инцидент → немедленное отключение + уведомление customers

## Dependencies

- **Platform team:** Event instrumentation schema (поставка Неделя 4) — blocker для dogfood Неделя 6
- **Security team:** Подписание SOC 2 Type II аудита (Неделя 10) — blocker для Enterprise deals, не для GA
- **Legal:** DPA обновления отправлены customers (Неделя 8)
- **Sales:** Сессия enablement training (Неделя 11)
- **CS:** Runbook + обучение (Неделя 10)
- **Marketing:** Landing page + email campaign (Неделя 11)

## Открытые вопросы

1. Pricing — Team Tier +$8/seat подтверждён? (Владелец: VP Sales, к Неделе 3)
2. Enterprise customers — путь поставки BYOK encryption? (Владелец: Eng Lead, к Неделе 5)
3. Audit log retention — по умолчанию 365 дней, customer override? (Владелец: Legal, к Неделе 4)
4. Выбор beta customers финализирован? (Владелец: CS Lead, к Неделе 7)

---

## Appendix A: Полный список User Stories (14 stories)
[Ссылка на таблицу Stories]

## Appendix B: Дизайн-референсы
[Ссылка Figma]

## Appendix C: Обоснование Mediator Synthesis
[Ссылка на session-4-handoff.md]

## Appendix D: Детали Metric Plan
[Ссылка на metric-plan.md от Data Analyst]
```

> **Урок PRD:** каждая секция трассируется назад к Discovery / Strategy / Mediator artefacts — это предотвращает синдром «где-то там обсуждали». NFR в B2B SaaS критичны — privacy + compliance занимают больше места чем performance. Rollback triggers числовые — не «if it breaks», а «error rate >2% for >15 min». Явные Non-goals предотвращают scope creep в implementation.
