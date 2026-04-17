---
name: acceptance-criteria
description: Критерии приёмки — Gherkin (Given / When / Then) или scenario-based
---
# Acceptance Criteria

> **Категория:** Specification  ·  **Slug:** `acceptance-criteria`

## Когда использовать

- Для каждой user story в PRD.
- Как контракт между PM и Engineering.
- Для QA test cases (AC → тест-сценарии).
- При спорах о «готова ли story?» — AC = оракул.

## Вход

| Поле | Обязательно | Описание |
|------|:-----------:|----------|
| User story | ✅ | Через `$user-story` |
| UX flow / wireframe | ⬚ | Если поток сложный |
| Edge cases | ⬚ | Ошибочные состояния, лимиты |
| Data constraints | ⬚ | Правила валидации |

## Источники данных

1. User story — как отправная точка.
2. UX wireframes — визуальные подсказки для сценариев.
3. NFR-требования — для нефункциональных AC.
4. Интервью с клиентами — граничные случаи пользователей.

### Связь с другими скилами

| Скил | Что берём | Когда вызывать |
|------|-----------|----------------|
| `user-story` | Story → AC сценарии | Родительский скил |
| `user-flow` | Шаги потока → сценарии | Для сложных потоков |
| `prd-template` | Где в PRD | Встроен в stories |
| `hypothesis-template` | Тестируемое поведение | Для экспериментальных stories |

## Два формата

### A. Gherkin (Given / When / Then)

```gherkin
Scenario: [Короткое описательное название]
  Given [начальный контекст / предусловие]
  When [действие / событие]
  Then [ожидаемый результат]
  And [дополнительный результат]
```

Плюсы: структурированный, совместим с инструментами тестирования (Cucumber), BDD-стиль.  
Минусы: многословный, негибкий для сложных данных.

### B. Scenario-based чеклист

```
## Scenario: [Название]
- Precondition: [состояние]
- Action: [пользователь делает X]
- Expected: [результат]
- Error case: [что происходит, когда X не удаётся]
```

Плюсы: гибкий, читаемый для нетехнических стейкхолдеров.  
Минусы: менее строгий, не автоматизируется напрямую.

**Выбор:** Gherkin для сложного поведения (особенно API / backend), scenario для UI-heavy stories.

## Протокол

### Шаг 1 — Сначала Happy Path

Набросать сценарий happy path. Это основной поток, который проходят 80% пользователей.

```gherkin
Scenario: Admin creates a new team role
  Given an admin is on the Teams settings page
  When they click "New role template"
  And fill in name "Senior Engineer" and select 12 permissions
  And click "Save"
  Then the role is saved
  And appears в roles list
  And is selectable при adding new team members
```

### Шаг 2 — Предусловия

Каждый сценарий — что должно быть истиной до начала. Избегать неявных допущений.

Предусловия для фиксации:
- Состояние аутентификации пользователя (авторизован, роль, разрешения)
- Состояние данных (существующие сущности, счётчики)
- Флаги функций
- Время / дата (для чувствительных ко времени функций)

### Шаг 3 — Граничные случаи

Для каждой story — подумать о:
- **Пустое состояние:** нет данных, первый запуск пользователя
- **Граничные значения:** 0, 1, максимум, максимум+1
- **Параллелизм:** два пользователя действуют одновременно
- **Разрешения:** пользователь без разрешения пытается выполнить действие
- **Сеть:** офлайн, медленная сеть, таймаут
- **Валидация:** некорректный ввод, XSS, инъекция
- **Идемпотентность:** одно и то же действие дважды

B2B-специфичные граничные случаи:
- Граничные случаи SSO (пользователь деактивирован в IdP)
- Администратор без разрешения пытается выполнить ограниченное действие
- Сбои интеграций (сторонний сервис недоступен)
- Ограничения скорости / квоты

### Шаг 4 — Сценарии ошибок

Для каждого видимого пользователю режима сбоя:
- Что его вызывает
- Что видит пользователь (сообщение об ошибке, действие восстановления)
- Состояние системы после (залогировано? повторяемо?)

```gherkin
Scenario: Save fails due to name conflict
  Given a role named "Senior Engineer" exists
  When admin tries to create role with same name
  Then display error "Role name already exists"
  And do not save
  And focus name field for correction
```

### Шаг 5 — Нефункциональные сценарии

Отдельные AC для NFR, если применимо:

```gherkin
Scenario: Role creation — performance
  Given a team with 500 existing roles
  When admin adds a new role
  Then response returns < 500ms p95
```

```gherkin
Scenario: Role creation — audit
  When any role is created, updated, or deleted
  Then an audit log entry is written с user id, timestamp, before/after diff
```

### Шаг 6 — Вариации данных

Для AC, управляемых данными, использовать таблицы:

```gherkin
Scenario Outline: Role validation rejects invalid names
  Given admin is creating a role
  When they enter name "<name>"
  Then they see error "<error>"

Examples:
  | name                          | error                                    |
  | ""                            | Название обязательно                     |
  | [255 char string]             | Название должно быть < 255 символов      |
  | "admin"                       | Название конфликтует с системной ролью   |
  | "<script>alert(1)</script>"   | Название содержит недопустимые символы   |
```

### Шаг 7 — Чеклист «Готово»

- [ ] Сценарий happy path
- [ ] Граничные случаи покрыты (пустой / граничные значения / параллелизм / разрешения)
- [ ] Сценарии ошибок с сообщениями
- [ ] Предусловия явны
- [ ] Вариации данных для правил валидации
- [ ] NFR (если применимо) отдельно
- [ ] Нет неоднозначных формулировок («быстро», «удобно»)

## Валидация (Quality Gate)

- [ ] Каждая story имеет ≥ 1 AC
- [ ] Happy path покрыт
- [ ] ≥ 2 граничных случая (кроме тривиальных stories)
- [ ] ≥ 1 сценарий ошибки
- [ ] Предусловия явны
- [ ] Нет неоднозначных глаголов («должно работать правильно»)
- [ ] NFR AC для performance/security/compliance-критичных stories
- [ ] Формат (Gherkin или scenario) единообразен на весь PRD

## Handoff

Результат является входом для:
- **Engineering** → реализация + написание тестов
- **QA** → автоматизированные тест-кейсы
- **Designer** → мокапы ошибочных состояний

Формат: AC встроены в карточку user story. Через `$handoff`.

## Anti-patterns

| Ошибка | Почему плохо | Как правильно |
|--------|-------------|---------------|
| Неоднозначно («быстро», «легко») | Не тестируемо | Конкретные пороги |
| Только happy path | Баги в граничных случаях | ≥ 2 граничных случая |
| Специфично для реализации | «Нажать синюю кнопку» | «Когда пользователь сохраняет» (UI-независимо) |
| Смешивать AC с заметками реализации | Путает контракт | Заметки отдельно |
| Слишком много сценариев (20+) | Бремя обслуживания | Разбить story |
| Нет NFR AC | Критические баги уходят в прод | NFR явно |
| Нет определённых сообщений об ошибках | Непоследовательный UX | Конкретный текст для каждой ошибки |

## Шаблон

```markdown
## Story: [Название]

### Acceptance Criteria

**Happy path:**
```gherkin
Scenario: [название]
  Given [предусловие]
  When [действие]
  Then [результат]
  And [результат]
```

**Граничные случаи:**
```gherkin
Scenario: [название граничного случая]
  Given [предусловие]
  When [действие]
  Then [результат]
```

**Сценарии ошибок:**
```gherkin
Scenario: [название ошибки]
  Given [предусловие]
  When [неуспешное действие]
  Then [сообщение об ошибке]
  And [восстановление]
```

**NFR (если применимо):**
```gherkin
Scenario: Performance
  When [действие]
  Then response < 200ms p95
```
```

## Worked Example — TeamFlow AC: Story S2 "Receive AI Summary Within 60 Seconds"

**Контекст:** Полный Gherkin AC для флагманской story (S2 из скила user-story). Демонстрирует happy path + граничные случаи + ошибки + NFR + вариации данных.

```gherkin
# Acceptance Criteria: S2 Receive AI Summary Within 60 Seconds

# ============ HAPPY PATH ============

Scenario: Manager ends 1:1, AI generates summary within 60 seconds
  Given Maria is on Team Tier account (AI Summarization enabled)
  And Maria has AI-enabled 1:1 meeting «Sarah weekly sync» starting 10:00 AM
  And meeting includes 23 minutes of recorded audio
  When Maria clicks «End meeting» at 10:23 AM
  Then within 60 seconds summary appears in meeting notes view
  And summary includes sections: «Topics discussed», «Decisions», «Action items»
  And action items list contains ≥ 1 extracted item (if discussion mentioned commitments)
  And summary status is «Draft (AI)» (not «Approved»)
  And event «ai_summary_generated» logged с meeting_id, duration, summary_id


# ============ STREAMING / LOADING ============

Scenario: Summary streams progressively if generation exceeds 10 seconds
  Given Maria ended meeting successfully
  When summary generation takes 35 seconds
  Then loading indicator shows by 5th second
  And first «Topics discussed» section appears as soon as generated (streaming)
  And remaining sections populate progressively
  And manager can read early sections without waiting for complete summary


# ============ BOUNDARY: MEETING DURATION ============

Scenario Outline: Summary behavior по meeting duration
  Given Maria ended 1:1 meeting of <duration> minutes
  When summary generation completes
  Then summary section behavior is <behavior>

  Examples:
    | duration | behavior                                                                      |
    | 0-4      | Резюме не создаётся — отображается сообщение «Встреча слишком короткая»       |
    | 5-14     | Краткое резюме (2-3 темы, пункты действий если явные)                         |
    | 15-45    | Полное стандартное резюме (все секции заполнены)                              |
    | 46-120   | Расширенное резюме с добавленной секцией «Ключевые темы»                      |
    | 121+     | Резюме создаётся с пометкой «Очень длинная встреча — просмотрите внимательно» |


# ============ ERROR SCENARIOS ============

Scenario: LLM API timeout — user sees fallback
  Given Maria ended AI-enabled meeting
  When LLM API не returns summary within 120 seconds (hard timeout)
  Then manager sees message «Summary taking longer than expected — we'll email you when ready»
  And event «ai_summary_timeout_fallback» logged
  And background job continues attempting generation
  And on success, manager получает in-product notification + email с summary

Scenario: LLM API hard error — graceful degradation
  Given Maria ended AI-enabled meeting
  When primary LLM provider returns 500 error after 3 retries
  Then system automatically switches to secondary provider (Anthropic)
  And event «ai_provider_failover» logged для ops review
  And summary generates using secondary с quality parity

Scenario: Complete LLM failure (both providers) — manual fallback
  Given Maria ended AI-enabled meeting
  When both LLM providers unavailable для > 2 minutes
  Then manager sees «AI summary unavailable this meeting — manual notes preserved»
  And existing meeting notes (if any) не affected
  And event «ai_summary_unavailable» logged
  And within 24 hours manager получает email: «AI recovered — want to retry?»


# ============ PRIVACY & PERMISSION ============

Scenario: AI disabled org-wide — AI summary not generated
  Given Maria's account admin set «AI org policy: disabled»
  When Maria tries to enable AI for meeting
  Then toggle is greyed out с tooltip «AI disabled by admin — contact admin»
  And no AI summary generated after meeting end

Scenario: Meeting participant declined recording consent
  Given Maria starts AI-enabled meeting с Sarah
  When Sarah clicks «Decline AI recording» consent prompt
  Then AI disables for this meeting
  And Maria sees «Sarah declined AI — switching to manual notes»
  And event «ai_declined_by_participant» logged
  And Maria can take manual notes normally


# ============ NON-FUNCTIONAL REQUIREMENTS ============

Scenario: Summary generation p95 latency under 60 seconds
  Given 100 completed AI-enabled meetings in past 7 days
  When latency measured от «End meeting» event to «summary available» event
  Then p95 latency ≤ 60 seconds
  And p99 latency ≤ 90 seconds
  And p50 latency ≤ 30 seconds

Scenario: Summary data encryption at rest
  Given AI summary generated and stored
  When database queried directly (не via API)
  Then summary content encrypted с customer-specific key (AES-256)
  And cannot be decrypted без customer-managed key (BYOK для Enterprise)

Scenario: Audit log completeness
  Given any AI summary operation occurs (generate / edit / approve / delete)
  When audit log queried для that meeting_id
  Then every operation logged с timestamp, actor_id, action_type, meeting_id, summary_id
  And log retention ≥ 365 days
  And log entries immutable (tamper-evident)


# ============ DATA VARIATION: Action Items Extraction ============

Scenario Outline: Action items extraction confidence handling
  Given 1:1 transcript contains statement: «<statement>»
  When AI extracts action items
  Then extraction should be <extraction>
  And confidence should be <confidence>

  Examples:
    | statement                                     | extraction                                              | confidence      |
    | «Sarah, please review PR by Friday»           | «Sarah: review PR, due Friday»                          | Высокая (>90%)  |
    | «Let's figure out the deployment plan»        | Не извлечено (нет владельца/чёткого действия)           | Низкая (<50%)   |
    | «I'll send you docs soon»                     | «Maria: send docs, due TBD»                             | Средняя (70-90%)|
    | «We should probably talk to Dave about it»    | Не извлечено (предположительно)                         | Низкая (<50%)   |
```

### Анализ плотности AC

- **12 сценариев итого** для одной story S2
- **Разбивка:**
  - Happy path: 1
  - Streaming / загрузка: 1
  - Граничные случаи (продолжительность): 1 (с 5 вариантами)
  - Сценарии ошибок: 3
  - Конфиденциальность / разрешения: 2
  - NFR: 3 (задержка, шифрование, аудит)
  - Вариации данных: 1 (с 4 вариантами)

**Плотность соответствует L-sized (8 очков) story с критичными для безопасности + NFR-насыщенными требованиями.** Сравнительно с S1 (переключатель), у которой 4 более простых сценария.

### Распространённые ошибки AC, которых мы избежали

1. **Расплывчатые пороги:** Не «быстро» — «60s p95, 90s p99»
2. **Единственный happy path:** 11 нехappy-path сценариев, потому что продакшн — это граничные случаи
3. **Пропущена конфиденциальность:** 2 явных сценария конфиденциальности (отключение администратором, согласие участника) — блокеры для B2B
4. **Пропущены NFR:** Задержка + шифрование + аудит — всё является требованиями, но легко пропустить
5. **Специфика реализации:** «Пользователь нажимает синюю кнопку» — избегали — «Пользователь завершает встречу» (UI-независимо)

> **Урок AC:** L-story с AI + конфиденциальностью + NFR требует 10+ сценариев. Без комплексных AC:  
> 1. Eng выкатывает happy path, сталкивается с граничными случаями в проде  
> 2. QA не знает что тестировать → баги в граничных случаях  
> 3. Требования конфиденциальности (отключение администратором, согласие участника) теряются  
>  
> Таблицы данных (Scenario Outline) сжимают вариации данных — 4 примера в 1 сценарии vs 4 сценария × дублированный скаффолд. Держать AC поддерживаемыми.
