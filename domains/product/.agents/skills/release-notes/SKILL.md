---
name: release-notes
description: B2B customer-facing release notes — what's new, why it matters, breaking changes, migration steps
---
# Release Notes (B2B SaaS)

> **Категория:** Release  ·  **Slug:** `release-notes`

## Когда использовать

- Каждый customer-facing release (weekly, monthly, or per-feature).
- При breaking changes — обязательно с migration steps.
- Как часть trust-building: B2B customers ценят transparency.
- Для compliance / audit trails — change history.

## Вход

| Поле | Обязательно | Описание |
|------|:-----------:|----------|
| Release scope | ✅ | Что included в этом release |
| Breaking changes list | ✅ | Даже если empty |
| Deprecated features | ✅ | Даже если empty |
| Release date | ✅ | Целевая дата публикации |
| Target audience | ✅ | All customers / Enterprise only / Beta |

## Источники данных

1. `$prd-template` — feature descriptions.
2. Engineering changelog — technical changes.
3. `$gtm-brief` — messaging tone.
4. Bug tracker — resolved issues (selective).

### Связь с другими скилами

| Скил | Что берём | Когда вызывать |
|------|-----------|----------------|
| `gtm-brief` | Messaging tone | Для consistency |
| `launch-checklist` | Timing | Part of launch |
| `prd-template` | Feature details | Source content |

## Структура (B2B standard)

1. **Title + Date**
2. **TL;DR** (3-5 bullet points)
3. **New Features**
4. **Improvements**
5. **Breaking Changes** (⚠️)
6. **Deprecations**
7. **Bug Fixes** (selective, customer-impacting)
8. **Known Issues**
9. **Migration Guide** (if applicable)
10. **Learn More / Resources**

## Протокол

### Шаг 0 — Scope Decision

- **Per-feature** — дискретный release
- **Weekly digest** — для rapidly-releasing products
- **Monthly** — enterprise-focused products (less churn)
- **Quarterly** — platform / major updates

B2B customers предпочитают предсказуемую каденс.

### Шаг 1 — Title + Date

Format:
```
# Release Notes — v2.5.0 (March 15, 2026)
```

или thematic:
```
# March 2026 Release — Enterprise SSO + Performance Improvements
```

### Шаг 2 — TL;DR

3-5 bullet points для busy executives. **Top customer-value items**:
- ✨ New: Team role templates for faster onboarding
- ⚡ Faster: Dashboard now loads 40% faster
- 🔐 Security: SOC2 Type II certification completed
- ⚠️ Breaking: API v1 deprecated March 2026 (migrate to v2 by June)

### Шаг 3 — New Features

Для каждой функции:
- **Название** (customer-facing, не internal codename)
- **Что** (описание 1-2 предложения)
- **Почему** (выгода для customer, привязана к JTBD)
- **Как** (1-2 строки об использовании или ссылка на docs)
- **Для кого** (plan tier, segment, если feature-gated)

Example:
```
### Team Role Templates

Администраторы теперь могут создавать многоразовые role templates и применять их к новым участникам команды одним кликом.

**Почему это важно:** Onboarding новых коллег с соответствующими разрешениями теперь занимает секунды вместо 10 минут. Уменьшает частоту ошибок при неправильно назначенных разрешениях.

**Как использовать:** Перейдите в Settings → Teams → Role Templates. [Ссылка на docs]

**Доступно для:** Всех customers на Team плане и выше.
```

### Шаг 4 — Improvements

Небольшие улучшения — одной строкой:
- Производительность дашборда улучшена (загрузка на 40% быстрее)
- Поиск теперь поддерживает wildcard matching (*)
- Export в CSV включает новые filter fields
- Добавлены keyboard shortcuts для power users

### Шаг 5 — Breaking Changes (⚠️)

**Обязательно для чтения.** Каждое breaking change:

- **Что меняется**
- **Timeline** (когда старое поведение прекращается)
- **Почему** (обоснование)
- **Migration steps** (пошагово)
- **Доступная поддержка** (контактная информация)

Example:
```
⚠️ **API v1 Deprecation — Требуется действие**

API v1 REST будет выведен из эксплуатации **30 июня 2026**. После этой даты endpoints v1 вернут 410 Gone.

**Почему:** API v2 обеспечивает производительность в 10× лучше, более чёткие error responses и полную поддержку pagination.

**Migration steps:**
1. Просмотрите использование вашего API в Settings → API → Usage report.
2. Следуйте [руководству по миграции v1→v2]
3. Обновите SDK до v2.x (через npm/pip/...)
4. Протестируйте в staging environment
5. Разверните в production до 30 июня

**Помощь:** Напишите на api-support@[company].com или запланируйте migration call [ссылка].
```

### Шаг 6 — Deprecations

Функции помечены как deprecated, но ещё работают:
- **Функция** — deprecated [дата], удаление [дата]
- **Рекомендуемая альтернатива**
- **Почему**

### Шаг 7 — Bug Fixes (Выборочно)

Только **баги влияющие на customers**. Не каждый internal fix.

Формат:
- Fixed: [описание видимое customer]
  - Пример: «Fixed: Export to CSV не включала rows с special characters in text fields.»

Пропустить: internal refactors, добавленные тесты, незначительные style changes.

### Шаг 8 — Known Issues

Известные баги в работе. Прозрачность строит доверие.

- **Issue:** [описание]
- **Workaround:** [если есть]
- **Ожидаемый fix:** [следующий release / в процессе]

### Шаг 9 — Migration Guide (Если применимо)

Отдельный подраздел для сложных миграций. Включить:
- Pre-migration checklist
- Пошагово
- Rollback plan
- FAQ
- Контакт для помощи

### Шаг 10 — Learn More

- Ссылки на документацию
- Video walkthroughs
- Blog post (deep dive)
- Webinar / office hours

### Шаг 11 — Tone & Voice

B2B SaaS tone:
- **Профессиональный, но человечный** — не корпоративный язык
- **Честный** — «we fixed» > «a subtle issue was addressed»
- **Конкретный** — числа вместо прилагательных
- **Уважающий время customer** — сначала TL;DR, детали ниже
- **Проактивный** — предвосхищать вопросы

### Шаг 12 — Distribution

Публиковать:
- **Product changelog page** (основное место)
- **Email customers** (с учётом релевантности)
- **In-app notification / banner** (для major releases)
- **RSS / webhook** (для customers которые мониторят)
- **Blog post** (для значимых releases)
- **Sales enablement** (copy-paste для customer emails)

## Валидация (Quality Gate)

- [ ] Title + date + version
- [ ] TL;DR (3-5 bullets)
- [ ] New features — customer-facing framing
- [ ] Improvements
- [ ] Breaking changes с timeline + migration
- [ ] Deprecations с alternatives
- [ ] Selective customer-impacting bug fixes
- [ ] Known issues disclosed
- [ ] Migration guide если applicable
- [ ] Tone consistent (professional, human)
- [ ] Distribution plan

## Handoff

Результат является входом для:
- **Marketing** → blog / email distribution
- **CS** → customer communication
- **Sales** → «what's new» pitch
- **Support** → ready для related tickets

Формат: release notes markdown / HTML page. Через `$handoff`.

## Anti-patterns

| Ошибка | Почему плохо | Как правильно |
|--------|-------------|---------------|
| Скрывать breaking changes | Доверие customers рушится | ⚠️ Заметно + migration |
| Internal codenames | Запутывает | Customer-facing names |
| Корпоративный язык | Читается плохо | Конкретный, человечный |
| Сваливать все bug fixes | Шум | Только влияющие на customers |
| Нет «почему» | Feature list без контекста | JTBD / benefit angle |
| Нет migration steps | Ломает интеграции customers | Пошагово |
| Скрытые deprecations | Неожиданное удаление | Анонсировать рано, напоминать часто |
| Нет known issues | «Всё идеально» — нечестно | Раскрывать известные баги |

## Шаблон

```markdown
# Release Notes — v[X.Y.Z] ([День Месяц Год])

## TL;DR
- ✨ [Топ функция 1]
- ⚡ [Топ улучшение]
- 🔐 [Security/compliance]
- ⚠️ [Breaking change если применимо]

## ✨ New Features

### [Название функции]
[Описание 2 предложения]

**Почему это важно:** [Выгода для Customer]
**Как использовать:** [Быстрые шаги + ссылка на docs]
**Доступно для:** [Plan / segment]

---

## ⚡ Improvements
- [Улучшение одной строкой]
- [Одной строкой]

## ⚠️ Breaking Changes
### [Название изменения]
- **Timeline:** [даты]
- **Почему:** [обоснование]
- **Migration:** [шаги + ссылка]
- **Помощь:** [контакт]

## 📉 Deprecations
- [Функция] — deprecated [дата], удаление [дата]. Используйте [альтернативу].

## 🐛 Bug Fixes
- Fixed: [описание видимое customer]

## ⚠️ Known Issues
- [Issue]: [workaround если есть]. Ожидаемый fix: [когда]

## 📚 Learn More
- [Документация]
- [Video walkthrough]
- [Blog post]
```

## Worked Example — TeamFlow Release Notes: AI Summarization GA

```markdown
# TeamFlow Release Notes — v3.8.0 "AI Summarization GA" (June 30, 2026)

## 🎉 TL;DR

- ✨ **NEW: AI-Assisted 1:1 Summarization** — Team Tier (+$8/seat/month premium) launches GA. Managers save 3+ hours per week; action items stop falling through the cracks.
- 📊 **NEW: Aggregate 1:1 Dashboard** (Enterprise Tier) — VP HR / CPO dashboards for 1:1 cadence and team health at org level.
- 🔐 **SECURITY: SOC 2 Type II extended** to cover AI features. Privacy architecture documented и publicly attested.
- ⚠️ **PRICING: New «Team Tier»** introduced at $23/seat/mo (existing Core tier unchanged). Migration tools included.
- 💼 **NEW: SSO SCIM provisioning** (Enterprise Tier) — fully automated user provisioning from Okta/Azure AD.

---

## ✨ New Features

### AI-Assisted 1:1 Summarization (Team Tier)

Проводите вашу 1:1 как обычно. TeamFlow AI захватывает разговор (opt-in на каждую встречу), генерирует структурированный summary в течение 60 секунд после окончания встречи, и извлекает action items с confidence scoring. Проверяйте, редактируйте inline, и одобряйте — action items автоматически отображаются перед вашей следующей 1:1.

**Почему это важно:** Менеджеры с 5+ прямыми подчинёнными экономят в среднем 3 часа в неделю на 1:1 admin overhead. Action items completion rate растёт с 60% (manual baseline) до 75%+ у beta customers. Менеджеры сообщают что чувствуют себя «более присутствующими» в разговорах.

**Как использовать:** Перейдите в Settings → AI Features → Enable for your team. Включите «Use AI» на любой странице предстоящей 1:1 встречи. [Полное руководство по началу работы]

**Доступно для:** Team Tier аккаунтов ($23/seat/mo, +$8 от Core tier). 30-дневный бесплатный trial доступен для Core customers.

**Privacy-first:**
- Opt-in на каждую встречу (вы контролируете какие 1:1s используют AI)
- Zero data retention у LLM провайдеров (OpenAI / Anthropic zero-retention API tiers)
- Encryption keys на каждого customer (BYOK для Enterprise)
- Полный audit log всех AI операций
- Региональные endpoints (данные US / EU остаются в регионе)

---

### Aggregate 1:1 Dashboard (Enterprise Tier)

Новый dashboard для VP People / CPO пользователей, показывающий частоту 1:1, velocity action items и team health scores на уровне организации и команды. Privacy-preserving — только aggregate, контент не отображается.

**Почему это важно:** Первый раз People leaders имеют измеримые данные об эффективности менеджеров в масштабе. Связывайте retention, engagement outcomes с паттернами 1:1 practice — данные, которые можно привести в ELT обсуждениях.

**Как использовать:** Свяжитесь с вашим CSM для Enterprise tier upgrade. Dashboard становится доступным после upgrade в течение 48 часов (требует provisioning data pipeline).

**Доступно для:** Enterprise Tier аккаунтов ($50+/seat, по согласованию).

---

### SSO SCIM Provisioning (Enterprise Tier)

Полностью автоматизированный provisioning, обновление и deprovisioning пользователей из вашего IdP (Okta, Azure AD, Google Workspace). Больше никаких ручных добавлений пользователей или orphan аккаунтов после ухода сотрудников.

**Почему это важно:** Устраняет жалобу #1 Enterprise customers — ручное управление пользователями в масштабе. Ваша IT команда будет вам благодарна.

**Доступно для:** Enterprise Tier.

---

## ⚡ Improvements

- **Быстрее загружаются дашборды** — OKR dashboard загружается на 40% быстрее с new query optimization (p95 снизился с 1.2s до 0.7s).
- **Поиск теперь поддерживает wildcards** — находите команды с «eng*» или action items содержащие «*budget*».
- **Export в CSV** теперь включает все filter fields (ранее advanced filters терялись при export).
- **Keyboard shortcuts для power users** — нажмите `?` чтобы увидеть список; `J`/`K` для навигации между 1:1s; `G` + `D` для dashboard.
- **Фильтр 1:1 history по «open action items»** — выявляйте незакрытые обязательства во время review cycles.

---

## ⚠️ Breaking Changes

### API v1 Deprecation — Action Required by December 31, 2026

API v1 REST будет выведен из эксплуатации **31 декабря 2026**. После этой даты endpoints v1 вернут HTTP 410 Gone.

**Почему:** API v2 обеспечивает:
- Производительность в 10× лучше (p95 50ms vs 400ms)
- Более чёткие error responses со structured codes
- Полную поддержку pagination (v1 возвращает макс 100 items)
- AI endpoints (`/v2/ai/*`) доступны только в v2

**Кого затрагивает:** Примерно 250 customers с активными v1 API интеграциями. Проверьте использование в Settings → API → Usage Report.

**Migration steps:**
1. Просмотрите руководство по миграции v1 → v2: [ссылка]
2. Обновите client SDKs:
   - JavaScript: `npm update @teamflow/sdk@2.x`
   - Python: `pip install --upgrade teamflow-sdk>=2.0`
   - Ruby: `gem update teamflow`
3. Запустите migration assistant (новый инструмент): `teamflow-cli migrate-v2 --dry-run`
4. Протестируйте в staging environment используя флаг `--env=staging`
5. Разверните в production до 31 декабря

**Доступная помощь:**
- Напишите на api-support@teamflow.com для персонального migration call
- Office hours по вторникам в 10:00 PT в течение Q4 2026 (запись: [ссылка])
- Документация + worked examples: [migration guide]

**Timeline:**
- 30 июня 2026: v2 API GA (сегодня); v1 помечен как deprecated
- 30 сентября 2026: Migration assistant выпущен
- 31 декабря 2026: v1 выведен из эксплуатации

---

## 📉 Deprecations

- **Legacy «Simple» onboarding flow** — deprecated 30 июня 2026; удалён 31 декабря 2026. Используйте новый «Guided» onboarding flow (по умолчанию для новых customers с марта 2026). Миграция settings автоматическая.
- **Per-seat «Basic AI» legacy flag** — deprecated 30 июня 2026. Заменён полными AI Tier features. Customers на internal «Basic AI» флаге (примерно 12 beta customers) автоматически мигрированы на Team Tier с 90-дневной защитой цены.

---

## 🐛 Bug Fixes

- **Fixed:** Action items containing special characters («é», «ñ», emoji) now export correctly to CSV (previously garbled).
- **Fixed:** 1:1 meeting notes no longer lose formatting when scheduled recurring meetings trigger (affected ~3% of users).
- **Fixed:** OKR dashboard correctly shows «At Risk» status for goals < 50% complete within 2 weeks of due date (previously showed «On Track» incorrectly).
- **Fixed:** Calendar integration properly handles time zone changes during daylight saving transitions.
- **Fixed:** Slack notifications respect user's quiet hours (previously fired during set «do not disturb» periods).
- **Fixed:** Performance review reminders не send to employees on sabbatical / parental leave (если status marked).

---

## ⚠️ Known Issues

- **Mobile experience для AI Summary review:** Функционирует, но не оптимизирован. Редактирование требует desktop для лучшего UX. Ожидаемый fix: Q4 2026 (native mobile app).
- **AI summarization для meetings > 2 hours:** Качество summary деградирует для очень длинных встреч. Workaround: планируйте recap сегменты короче. Ожидаемый fix: Q3 2026.
- **Извлечение action items для non-English контента:** English-only до Q4 2026 release поддержки мультиязычности. Non-English контент помечается заметкой.
- **Иногда задержка при failover LLM провайдера:** Редко (<0.1% встреч), failover с primary на secondary провайдер добавляет 30-45 секунд. Решение: улучшение архитектуры в Q3.

---

## 📊 Что изменилось для Admins / IT

### Новые Admin Settings

- **AI Features policy** (Settings → Admin → AI Features):
  - «Disabled org-wide» (нет доступа к AI для любого пользователя)
  - «Enabled — per-manager opt-in» (по умолчанию — менеджеры выбирают на каждую встречу)
  - «Enabled — default on for new managers»
- **Data retention controls:** Выберите 30 / 90 / 365 / 730 дней для AI-generated summaries
- **Regional data preference:** Выберите регион обработки данных (US / EU / APAC)

### Новые Compliance Artifacts

- **SOC 2 Type II attestation (расширена на AI features):** Доступна Enterprise customers в Trust Center
- **Data Processing Agreement (обновлено для AI):** Отправлено всем Enterprise customers 30 мая 2026
- **Subprocessor list (обновлён):** Теперь включает OpenAI и Anthropic как AI провайдеров

### Security Notes

- Audit logs теперь включают AI операции (generate / edit / approve / delete summaries)
- BYOK (Bring Your Own Key) шифрование доступно для Enterprise tier (свяжитесь с CSM для настройки)
- Contractual обязательства zero data retention подписаны с LLM провайдерами

---

## 💼 Для Sales и Customer Success Teams

(Внутренний раздел — также передаётся customers через их CSM)

### Шпаргалка по messaging

**Core → Team Tier upsell pitch:**
«Самое большое изменение в performance management за 10 лет только что вышло. Ваши менеджеры получают обратно 3 часа/неделю, action items перестают теряться. Team Tier +$8/seat включает AI Summarization, Action Items Reminders и auto-Extraction. 30-дневный trial если хотите тест-драйв.»

**Mid-market/Enterprise pitch:**
«Помимо продуктивности менеджеров, Enterprise Tier теперь включает Aggregate 1:1 Dashboard — первый измеримый взгляд на эффективность менеджеров по всей организации. Покажите вашему Board что ваши People инвестиции драйвят retention. В сочетании с нашим новым SSO SCIM, procurement говорит «да».»

### Работа с возражениями (топ 3)

| Возражение | Ответ |
|-----------|----------|
| «Privacy concerns с AI» | «Zero data retention, SOC 2 Type II attested, BYOK для enterprise. У нас есть публичная документация + audit reports.» |
| «Надбавка $8/seat слишком дорого» | «ROI — 45× — 3 часа/неделю × 200 менеджеров × $150/час blended cost = ваша ежемесячная надбавка окупается на первой неделе.» |
| «А если AI генерирует неправильный summary?» | «Менеджер проверяет и редактирует перед одобрением — это assisted, не autonomous. Мы отслеживаем edit rate; текущая beta показывает 30% summaries редактируются, то есть остальные 70% принимаются как есть.» |

---

## 📚 Learn More

- **Blog post:** [«Представляем TeamFlow AI — Первую AI-Native People Ops Platform»](https://blog.teamflow.com/ai-summarization-launch)
- **Video walkthrough (3 мин):** [YouTube link]
- **Документация:** [docs.teamflow.com/ai](https://docs.teamflow.com/ai)
- **Webinar:** «AI в People Operations — Что это значит для вашей стратегии 2026», 15 июля 2026, 13:00 ET — [Зарегистрироваться]
- **Migration guide для v1 → v2 API:** [api-migration link]
- **Trust Center:** [trust.teamflow.com](https://trust.teamflow.com) — SOC 2 Type II reports + subprocessor list

---

## 💬 Обратная связь

Ваши отзывы делают TeamFlow лучше. Поделитесь:
- **Баги / проблемы:** support@teamflow.com
- **Feature requests:** feedback@teamflow.com
- **Участие в customer advisory:** cab@teamflow.com

Спасибо за 5 лет создания TeamFlow вместе. AI Summarization — самый большой шаг который мы сделали — это было бы невозможно без вашей обратной связи в течение всего discovery.

— The TeamFlow Team

---

## Метаданные релиза

- **Версия:** 3.8.0
- **Дата релиза:** 30 июня 2026
- **Предыдущая версия:** 3.7.2 (27 мая 2026)
- **Следующий запланированный релиз:** 3.9.0 цель — конец июля 2026 (итерация AI tier + улучшения mobile)
- **Support policy:** Каждая major версия поддерживается 24 месяца с момента релиза
```

> **Урок release-notes:** TL;DR первым — busy execs читают только его. **Breaking changes с 6-месячным migration window** + персонализированная помощь — предотвращают surprise churn. **Прозрачность known issues** — строит доверие («они рассказывают нам что сломано»). Отдельные разделы для **admins/IT** — у них разные concerns. **Работа с возражениями для sales** внутри release notes = документ двойного использования. **Migration tooling** (не только docs) — `teamflow-cli migrate-v2 --dry-run` — снижает нагрузку на customers.
