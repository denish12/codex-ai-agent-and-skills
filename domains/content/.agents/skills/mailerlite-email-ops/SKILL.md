---
name: mailerlite-email-ops
description: Управление email через MailerLite MCP — подписчики, сегменты, кампании, автоматизации, аналитика. Прямая работа через MCP-tools
metadata:
  version: "2.0"
  mcp_server: "MailerLite MCP"
  mcp_url: "https://mcp.mailerlite.com/mcp"
  status: "beta"
---
# MailerLite Email Ops — Операции через MailerLite MCP

## Назначение

Описывает, **как** агенты контент-домена используют **MailerLite MCP** для прямого управления email-маркетингом:
- Подписчики и сегменты (тиры из `$email-engagement-tiers`).
- Кампании (regular, A/B, resend) — создание, расписание, отправка.
- Автоматизации и анализ их эффективности.
- Аналитика и оптимизация по результатам.

> [!IMPORTANT]
> **MailerLite MCP** — официальный MCP-сервер от MailerLite (beta).
> URL: `https://mcp.mailerlite.com/mcp`
> Tools вызываются **напрямую** через MCP-протокол, ИИ-агент комбинирует их для сложных задач.
> Авторизация через OAuth (один раз при подключении).

---

## Подключение MailerLite MCP

### Claude Code (терминал)

```bash
claude mcp add --transport http mailerlite https://mcp.mailerlite.com/mcp
```

После добавления — авторизация в MailerLite через OAuth (выбрать аккаунт + разрешить доступ).

### Claude Desktop / Claude Web

1. Открыть Claude → иконка инструментов → **Add connectors** → **Manage connectors** → **Add custom connector**
2. Имя: `MailerLite`
3. Remote MCP server: `https://mcp.mailerlite.com/mcp`
4. **Connect** → авторизоваться в MailerLite

### Cursor

```
cursor://anysphere.cursor-deeplink/mcp/install?name=MailerLite&config=eyJ1cmwiOiJodHRwczovL21jcC5tYWlsZXJsaXRlLmNvbS9tY3AifQ==
```

> ⚠️ Free план Cursor: лимит ~40 активных tools. Можно включать только нужные (например, `create_campaign` + `add_subscriber`) в настройках коннектора.

### VS Code (GitHub Copilot)

Использовать ссылку для установки или добавить вручную через MCP. Включить режим **Agent** в чате.

### ChatGPT (Pro/Plus, не Team)

1. Настройки → Connectors → Advanced → включить **Developer Mode**
2. Создать новый connector: Name `MailerLite`, MCP Server URL `https://mcp.mailerlite.com/mcp`, OAuth
3. Авторизоваться в MailerLite
4. В новом чате: + → More → Developer Mode → Add Sources → включить MailerLite

### Другие инструменты (Gemini CLI, Windsurf и др.)

Добавить URL `https://mcp.mailerlite.com/mcp` в настройки MCP-серверов.

---

## Доступные MCP Tools

> Это полный список инструментов, которые MailerLite MCP предоставляет агенту. Агент вызывает их **напрямую** через MCP-протокол.

### Управление подписчиками

| Tool | Назначение |
|------|-----------|
| `add_subscriber` | Добавить нового подписчика |
| `get_subscriber` | Получить данные подписчика |
| `update_subscriber` | Обновить данные (custom fields, status) |
| `list_subscribers` | Список подписчиков (с фильтрами) |
| `get_subscriber_activity` | История активности (открытия, клики) |
| `get_subscriber_count` | Общее количество подписчиков |
| `delete_subscriber` | Удалить подписчика (полностью) |
| `forget_subscriber` | GDPR-удаление (forget) |
| `get_single_import` | Статус импорта одного подписчика |

### Кампании

| Tool | Назначение |
|------|-----------|
| `create_campaign` | Создать кампанию (regular, A/B, resend) |
| `get_campaign` | Получить детали кампании (включая stats) |
| `list_campaigns` | Список кампаний (с фильтрами по статусу) |
| `update_campaign` | Обновить кампанию (до отправки) |
| `delete_campaign` | Удалить кампанию (черновик) |
| `schedule_campaign` | Запланировать отправку |
| `cancel_campaign` | Отменить запланированную |
| `get_campaign_subscribers` | Получить получателей кампании |

### Группы

| Tool | Назначение |
|------|-----------|
| `list_groups` | Список групп |
| `create_group` | Создать группу (для тиров) |
| `update_group` | Обновить группу |
| `delete_group` | Удалить группу |
| `get_group_subscribers` | Подписчики группы |
| `assign_subscriber_to_group` | Добавить подписчика в группу |
| `unassign_subscriber_from_group` | Убрать из группы |
| `import_subscribers_to_group` | Массовый импорт в группу |

### Сегменты

| Tool | Назначение |
|------|-----------|
| `list_segments` | Список сегментов |
| `get_subscribers_in_segment` | Подписчики сегмента |
| `update_segment` | Обновить сегмент |
| `delete_segment` | Удалить сегмент |

> ⚠️ Создание сегментов с условиями делается через **MailerLite UI** (нет `create_segment` в MCP). Управление существующими — через MCP.

### Автоматизации

| Tool | Назначение |
|------|-----------|
| `list_automations` | Список автоматизаций |
| `get_automation` | Детали автоматизации |
| `get_automation_activity` | Активность (письма, конверсии) |
| `create_automation` | Создать автоматизацию |
| `delete_automation` | Удалить автоматизацию |

### Формы

| Tool | Назначение |
|------|-----------|
| `list_forms` | Список форм |
| `get_form` | Детали формы |
| `update_form` | Обновить форму |
| `delete_form` | Удалить форму |
| `get_form_subscribers` | Подписчики формы |

### Вебхуки

| Tool | Назначение |
|------|-----------|
| `list_webhooks` | Список вебхуков |
| `get_webhook` | Детали вебхука |
| `create_webhook` | Создать вебхук |
| `update_webhook` | Обновить вебхук |
| `delete_webhook` | Удалить вебхук |

### Прочее

| Tool | Назначение |
|------|-----------|
| `get_auth_status` | Проверка авторизации |

---

## Когда использовать (по агентам)

| Задача | Агент | Tools |
|--------|-------|-------|
| Аудит базы | Strategist | `get_subscriber_count`, `list_segments`, `get_subscribers_in_segment` |
| Сегментация по тирам | Strategist | `list_groups`, `create_group`, `assign_subscriber_to_group` |
| Создание кампании | Copywriter | `create_campaign`, `update_campaign`, `schedule_campaign` |
| Анализ кампаний | Strategist | `list_campaigns`, `get_campaign` (со stats) |
| Анализ автоматизаций | Strategist | `list_automations`, `get_automation_activity` |
| Идеи для контента | Strategist + Copywriter | `list_campaigns` → анализ топ-перформеров |
| Чистка базы | Strategist | `list_subscribers` → `delete_subscriber` / `forget_subscriber` |
| Настройка вебхуков | Strategist | `create_webhook` (для интеграций) |

---

## Готовые промпты (паттерны вызова)

Эти промпты — реальные сценарии работы. Агент сам решает, какие tools вызвать.

### Анализ топ-кампаний
```
Проанализируй мои топ-3 newsletter кампании за последний квартал.
Что у них общего? Subject, время отправки, длина, темы.
```
**Используемые tools:** `list_campaigns` (filter: sent, last 90 days) → `get_campaign` для каждой → анализ паттернов.

### Очистка базы (sunset)
```
Помоги почистить базу: создай сегмент подписчиков, которые не открывали
письма последние 6 месяцев. Покажи количество.
```
**Tools:** `list_segments` → если нет → описать как создать в UI → `get_subscribers_in_segment` → `get_subscriber_count`.

### Создание черновика из блог-поста
```
Прочитай этот пост в блоге [текст]. Напиши summary на 150 слов и создай
черновик email-кампании в MailerLite для группы [название].
Используй брендовые цвета [HEX]. Sender: [email].
```
**Tools:** `list_groups` → найти `group_id` → `create_campaign` (тип: regular, контент с brand colors).

### Анализ автоматизации
```
Проанализируй мою автоматизацию 'welcome emails'. Какое письмо имеет
самый высокий drop-off rate? Предложи улучшения.
```
**Tools:** `list_automations` → `get_automation` → `get_automation_activity` → анализ метрик по шагам.

### Идеи для контент-календаря
```
Проанализируй мои прошлые кампании и предложи идеи для будущих
newsletters с хорошими subject lines.
```
**Tools:** `list_campaigns` → `get_campaign` для топ-перформеров → паттерны subject lines → новые идеи.

### Удаление черновиков
```
Удали все мои черновики кампаний в MailerLite.
```
**Tools:** `list_campaigns` (filter: draft) → `delete_campaign` для каждого.

### Subject lines на основе истории
```
Предложи 3 high-performing subject lines для кампании про [тема],
основываясь на моих предыдущих кампаниях.
```
**Tools:** `list_campaigns` → `get_campaign` для топ по open rate → анализ паттернов → 3 варианта.

### Сбор preview URLs
```
Собери preview URLs для всех моих кампаний.
```
**Tools:** `list_campaigns` → `get_campaign` для каждой → извлечь preview URL.

---

## Советы по промптам (best practices)

| Практика | Описание |
|----------|----------|
| **Конкретика** | Указывай группу, sender, ширину письма (max 600px), стиль |
| **Разбивай на шаги** | Для сложных задач: «сначала найди группу, потом создай черновик» |
| **Privacy** | Добавляй: «Не показывай реальные email-адреса подписчиков» в выводе |
| **Эксперимент** | Не фиксируй tools жёстко — ИИ сам решит, что вызвать |
| **Brand colors** | Передавай HEX-коды бренда из `$brand-guidelines` в промпт |
| **Sender details** | Указывай from_name и from_email для каждой кампании |

---

## Интеграция с email-стратегией

### Сегментация по тирам (`$email-engagement-tiers`)

MailerLite MCP не создаёт сегменты с условиями — это делается через UI. Но MCP **управляет** ими:

```
Промпт: "Покажи мне сегмент tier-d-at-risk, сколько в нём подписчиков
и когда они последний раз открывали письма."
```
**Tools:** `list_segments` → найти `tier-d-at-risk` → `get_subscribers_in_segment` → `get_subscriber_activity`.

### Создание сегментов (через UI + MCP подсказки)

Стратег может попросить агента сформировать **инструкцию для UI**:

```
Промпт: "Дай мне инструкцию для UI MailerLite, как создать сегмент
'tier-a-vip' для подписчиков, которые открывали И кликали в последние 30 дней."
```

Агент формирует пошаговую инструкцию, пользователь создаёт в UI. После создания — управление через MCP.

### Адаптация контента по тирам (`$email-copywriting`)

Copywriter создаёт кампании для каждого тира с разным контентом:

```
Промпт: "Создай 4 черновика кампаний с одним оффером (новый гайд),
адаптированных под тиры A, B, C, D. Используй тон из $email-engagement-tiers.
Группы: tier-a-vip, tier-b-engaged, tier-c-passive, tier-d-at-risk."
```
**Tools:** `list_groups` → 4 раза `create_campaign` с разным контентом и группой.

---

## Workflow для основных задач

### Workflow 1: Создание и отправка кампании (Copywriter)

```
Шаг 1: Получить ID группы/сегмента
  → list_groups или list_segments

Шаг 2: Создать кампанию (черновик)
  → create_campaign(
      name, type (regular/ab/resend),
      subject, from_name, from_email,
      content (HTML),
      groups: [group_id]
    )
  → запомнить campaign_id

Шаг 3: A/B настройки (если type=ab)
  → update_campaign с ab_settings

Шаг 4: Расписание
  → schedule_campaign(campaign_id, date, time, timezone)
  ИЛИ
  → отправить мгновенно

Шаг 5: Через 24-48ч — анализ
  → get_campaign(campaign_id) → метрики
```

### Workflow 2: Аудит базы (Strategist)

```
Шаг 1: Общий размер
  → get_subscriber_count

Шаг 2: По тирам (если сегменты созданы)
  → list_segments
  → для каждого tier-segment:
     get_subscribers_in_segment → count + sample

Шаг 3: Активность подписчиков
  → list_subscribers (filter: status=active)
  → get_subscriber_activity для sample

Шаг 4: Сформировать Dashboard
  → таблица: тир / count / % / здоровье
```

### Workflow 3: Анализ автоматизаций (Strategist)

```
Шаг 1: Список автоматизаций
  → list_automations

Шаг 2: Для каждой:
  → get_automation → структура (шаги, триггеры)
  → get_automation_activity → метрики (open/click по шагам)

Шаг 3: Найти drop-off
  → шаг с самым большим падением engagement

Шаг 4: Рекомендации
  → переписать subject / тело / CTA проблемного шага
```

### Workflow 4: Win-back серия (Strategist + Copywriter)

```
Шаг 1: Найти тир D
  → list_segments → tier-d-at-risk
  → get_subscribers_in_segment → count

Шаг 2: Создать win-back автоматизацию (если нет)
  → create_automation (или инструкция для UI)

Шаг 3: Создать 3-4 кампании win-back
  → create_campaign × 4 с разными subject и контентом
  → schedule_campaign с интервалами 5-7 дней

Шаг 4: Через 30 дней — анализ
  → get_campaign для каждой
  → подсчитать win-back conversion (D → B)

Шаг 5: Не реактивированных
  → переместить в tier-e-dormant → sunset
```

### Workflow 5: Чистка базы (Strategist)

```
Шаг 1: Найти hard bounces
  → list_subscribers (filter: bounced)
  → delete_subscriber для каждого

Шаг 2: Найти dormant (тир E)
  → list_segments → tier-e-dormant
  → get_subscribers_in_segment

Шаг 3: Sunset email (если ещё не отправлен)
  → create_campaign + schedule_campaign

Шаг 4: Через 14 дней
  → get_campaign → кто открыл
  → unassign_subscriber_from_group для неоткрывших → delete_subscriber

Шаг 5: GDPR-запросы
  → forget_subscriber (полное удаление по запросу)
```

---

## Privacy и Compliance

| Правило | Действие |
|---------|----------|
| **Не выводить email-адреса** | В промпте указывать: «не показывай реальные email-адреса в ответе» |
| **GDPR-удаление** | Использовать `forget_subscriber`, не `delete_subscriber` |
| **Unsubscribe link** | MailerLite добавляет автоматически — проверять, что присутствует |
| **CAN-SPAM** | Физический адрес отправителя — настроить в аккаунте MailerLite |
| **Согласие** | Не импортировать подписчиков без opt-in |

---

## Ограничения MailerLite MCP

| Ограничение | Влияние | Workaround |
|-------------|---------|------------|
| **Beta** | Возможны баги, изменения API | Проверять `get_auth_status` перед операциями. Следить за обновлениями MailerLite |
| **ChatGPT — только Pro/Plus** | Free и Team не поддерживают MCP | Использовать Claude / Cursor |
| **Cursor Free — лимит 40 tools** | Не все tools одновременно | Включать только нужные |
| **Нет создания сегментов с условиями** | Только управление существующими | Создавать сегменты в UI, управлять через MCP |
| **Automation builder — UI** | Сложные workflow только через UI | `create_automation` для простых, UI для сложных |
| **Темплейты email — UI** | Нет загрузки шаблонов через MCP | Создать в UI, использовать через MCP |
| **Лимиты тарифа** | Free: 1000 подписчиков, нет автоматизаций | Upgrade при росте базы |

---

## Anti-patterns

| Ошибка | Почему плохо | Как правильно |
|--------|-------------|---------------|
| Жёстко прописывать tool в промпте | ИИ сам выбирает оптимальный путь | Описывать **цель**, не tools. «Создай кампанию» — не «вызови create_campaign» |
| Создавать сегменты через MCP | `create_segment` нет — попытка не сработает | Сегменты с условиями — в UI MailerLite |
| Импортировать без opt-in | GDPR/CAN-SPAM нарушение | Только подтверждённые подписчики |
| Удалять GDPR-запросы через `delete_subscriber` | Не полное удаление | `forget_subscriber` для GDPR |
| Показывать email-адреса в выводе | Privacy нарушение | Всегда добавлять «не показывай реальные emails» |
| Не проверять `get_auth_status` | Вызовы падают молча | Проверка статуса перед массовыми операциями |
| Игнорировать beta-статус | Внезапные изменения API | Тестировать критичные workflow перед prod |
| Использовать MCP для финального ревью контента | MCP не проверяет brand compliance | Ревью через `$brand-compliance` + `$content-review-checklist` |

---

## Интеграция с другими скилами

| Скил | Взаимодействие |
|------|----------------|
| `$email-engagement-tiers` | **Источник:** определение тиров → реализация через сегменты MailerLite |
| `$email-copywriting` | **Источник:** контент писем → загрузка через `create_campaign` |
| `$content-calendar` | **Источник:** даты рассылок → `schedule_campaign` |
| `$platform-strategy` | **Источник:** email как канал, частота → расписание |
| `$cta-optimization` | **Источник:** CTA → кнопки в письме |
| `$marketing-psychology` | **Источник:** триггеры → применение в тексте писем |
| `$brand-guidelines` | **Источник:** визуальный стиль, HEX-коды → шаблон email |
| `$content-release-gate` | **Потребитель:** метрики из `get_campaign` как evidence |

---

## Полезные ссылки

- **Официальная страница MCP:** https://developers.mailerlite.com/mcp/
- **Гайд по подключению:** https://www.mailerlite.com/help/how-to-connect-mailerlites-mcp
- **Что такое MCP для email:** https://www.mailerlite.com/features/mcp
- **9 способов использования:** https://www.mailerlite.com/blog/email-marketing-mcp
- **Анонс MailerLite MCP:** https://www.mailerlite.com/blog/mcp-mailerlite

---

## Шаблон вывода

### Для аудита базы (Strategist)

```
### MailerLite MCP — Аудит базы

**Дата:** [YYYY-MM-DD]
**Auth status:** ✅ (через get_auth_status)

#### Общие метрики
- Всего подписчиков: [N] (get_subscriber_count)
- Активных: [N]
- Отписавшихся: [N]
- Bounced: [N]

#### Распределение по сегментам/тирам
| Сегмент | Подписчиков | % базы | Last activity |
|---------|:-----------:|:------:|---------------|
| tier-a-vip | [N] | [%] | [data] |
| tier-b-engaged | [N] | [%] | [data] |
| tier-c-passive | [N] | [%] | [data] |
| tier-d-at-risk | [N] | [%] | [data] |
| tier-e-dormant | [N] | [%] | [data] |

#### Использованные MCP tools
- get_subscriber_count
- list_segments
- get_subscribers_in_segment × [N]

**Рекомендации:** [действия]
```

### Для создания кампании (Copywriter)

```
### MailerLite MCP — Кампания создана

**Campaign ID:** [id из create_campaign]
**Название:** [name]
**Тип:** [regular / ab / resend]
**Группа/сегмент:** [name + id]

#### Контент
- **Subject A:** [текст]
- **Subject B:** [текст] (если A/B)
- **From:** [name + email]
- **Прехедер:** [текст]
- **Brand colors:** [HEX]

#### Расписание
- **Дата отправки:** [дата]
- **Время:** [HH:MM]
- **Timezone:** [tz]
- **Resend через 48ч:** [да / нет]

#### Использованные MCP tools
- list_groups (поиск group_id)
- create_campaign
- schedule_campaign

**Статус:** Запланировано / Отправлено
**→ Через 24ч:** get_campaign для метрик
```
