---
name: mongodb_mongoose_best_practices
description: Best practices для MongoDB + Mongoose: схемы, индексы, валидация, транзакции, миграции, производительность, безопасность, тестирование, anti-patterns и примеры.
---

# Skill: MongoDB + Mongoose Best Practices

## Цель
Помочь проектировать и реализовывать data layer на MongoDB + Mongoose так, чтобы он был:
- предсказуемым (схемы/контракты),
- производительным (индексы/запросы),
- безопасным (валидация/санитайзинг/least privilege),
- поддерживаемым (паттерны, миграции, тесты),
- готовым к росту (шардинг/операции).

## Когда использовать
- Backend на Node.js и в проекте используется MongoDB.
- Выбран ORM/ODM: Mongoose.
- Нужны CRUD, поиск, агрегации, связи, транзакции.

## Входы
- PRD + acceptance criteria
- API Contracts (payload/filters/sort)
- Data model / Architecture Doc
- NFR: latency/throughput, объёмы, retention, security/compliance

## Выход (Deliverables)
- Список коллекций и ключевых документов (схемы)
- Индексы (и зачем они)
- Правила валидации/санитайзинга на границе
- Стратегия миграций и версионирования схем
- Паттерны запросов и performance notes
- План тестов (unit/integration) для data layer
- Список anti-patterns + “как надо/как не надо”

---

# 1) Проектирование схемы (Schema Design)

## 1.1 Embedded vs Referenced
Выбор делай осознанно и фиксируй trade-off:
- **Embed** (вкладывать) если:
  - данные маленькие, часто читаются вместе,
  - нужны атомарные обновления поддокументов,
  - “child” не живёт отдельно.
- **Reference** (ObjectId ссылки) если:
  - дочерний объект большой/растёт,
  - нужен независимый lifecycle,
  - есть шардинг/разные access patterns.

⚠️ Ограничение: документ до 16MB. Вкладывать “вечные” массивы (лог, события) — риск.

## 1.2 Определяй invariants в схеме
- required, enum, min/max, custom validators
- default значения
- timestamps (createdAt/updatedAt) — почти всегда

## 1.3 Версионирование схем
- Добавляй поле `schemaVersion` (если схема эволюционирует активно)
- Новый код должен уметь читать старую версию (переходный период)

---

# 2) Индексы и производительность

## 2.1 Правило №1: Индексы под реальные запросы
Индекс — это контракт с access pattern’ом.
Для каждого ключевого endpoint/UX flow:
- фильтр/поиск,
- сортировка,
- пагинация.

## 2.2 Типовые индексы
- **compound index** для (filter + sort)
- **unique** для логинов/ключей/slug’ов
- **TTL** для одноразовых токенов/сессий (если подходит)
- **partial index** если индекс нужен не для всех документов
- **text index** — осторожно, часто лучше отдельный search (или Atlas Search)

## 2.3 Пагинация
- Offset (`skip`) на больших объёмах деградирует.
- Для больших коллекций используй **cursor pagination**:
  - по `_id` или `createdAt` (и индекс под это).

## 2.4 “Lean reads” и выбор полей
- `.lean()` для read-only (ускоряет, меньше памяти)
- `.select()` — не тащи лишние поля (особенно большие blobs)

## 2.5 Избегай N+1
- Либо **embed**, либо batch query по ids,
- `.populate()` использовать аккуратно, понимать cost.

---

# 3) Безопасность

## 3.1 NoSQL injection (must)
Опасно принимать фильтры напрямую из пользователя.
- Запрещай “сырой” объект фильтра из body/query.
- Используй allowlist полей и операторов.

### Хорошо ✅
- маппинг query params → безопасный filter
- явная валидация Zod/Joi + сборка query

### Плохо ❌
- `Model.find(req.query)` / `Model.find(req.body.filter)` без фильтрации

## 3.2 Least privilege
- отдельный пользователь БД для приложения,
- минимальные права (readWrite на нужную БД),
- разные creds для env.

## 3.3 Secrets
- creds только через env/secret manager
- не логировать connection string

---

# 4) Mongoose: паттерны и конвенции

## 4.1 Schema: строгий режим
Рекомендуется:
- `strict: "throw"` для критичных моделей (ловит неожиданные поля)
- `strictQuery: true` (чтобы query не принимали “мусор”)

## 4.2 Валидация: где что
- На границе API: Zod/Joi (обязательная)
- В Mongoose schema: инварианты модели (второй рубеж)
Не полагайся только на Mongoose validation для user input.

## 4.3 Middleware/hooks: осторожно
- pre/post hooks = “Magic” если их много и они скрывают логику.
- Любой hook обязан быть задокументирован.
- Не класть бизнес-логику в hooks, только технические вещи (timestamps, normalization).

## 4.4 Plugin’ы
- `mongoose-lean-virtuals`, `mongoose-delete` и т.п. — использовать осознанно
- Следить за supply-chain (репутация/поддержка)

## 4.5 Transactions
Транзакции доступны в replica set.
Используй `session` и `withTransaction` для multi-doc операций.
Но помни: MongoDB любит моделирование, где транзакции нужны редко.

---

# 5) Миграции и эволюция данных

## 5.1 Миграции обязательны при изменении модели
Варианты:
- `migrate-mongo`
- свой migration runner (таблица `migrations` в Mongo)

## 5.2 Backfill стратегия
- small batches
- id-range/cursor
- retries
- наблюдаемость (сколько осталось)

---

# 6) Обработка ошибок

## 6.1 Типовые ошибки
- duplicate key → код 409 (если это бизнес-конфликт)
- validation error → 400
- not found → 404
- cast error (ObjectId) → 400
- connection/timeouts → 503/500 (в зависимости от политики)

## 6.2 Не утекать внутренностями
- не возвращать stack
- не возвращать raw error от Mongo

---

# 7) Тестирование (TDD-friendly)

## 7.1 Unit tests
- валидаторы/мапперы/filter builders
- сервисный слой (с mock repo)

## 7.2 Integration tests
- реальная Mongo (Testcontainers/Docker) или MongoMemoryServer (быстрее, но не 100% как прод)
- тесты индексов (unique, TTL логика)
- транзакции (если используете)

---

# 8) Anti-patterns (как P0 риски)

🔴 P0:
- Принимать user input как “сырой” Mongo filter (NoSQL injection)
- Отсутствие индексов под ключевые запросы (latency деградирует)
- Слишком много Mongoose hooks (Magic)
- Огромные документы/растущие массивы (16MB риск)
- Попытка заменить схему “динамикой” без строгих правил (Big Ball of Mud в данных)

🟠 P1:
- `.populate()` в циклах / N+1
- `skip` пагинация на больших объёмах
- `select *` без `.select()`

---

# 9) Примеры (как надо / как не надо)

## 9.1 Safe filter builder (пример)
### ✅ Хорошо: allowlist + явные операторы
- принимаем query params: `status`, `q`, `from`, `to`
- строим filter сами
- запрещаем `$where`, `$expr`, `$regex` без ограничений

### ❌ Плохо: прямой find по req.query
- `Model.find(req.query)`

## 9.2 Индекс под фильтр + сорт
### ✅ Хорошо
- endpoint: list orders by userId sorted by createdAt desc
- индекс: `{ userId: 1, createdAt: -1 }`

### ❌ Плохо
- сортировка по неиндексированному полю на большой коллекции

---

# 10) Чек-лист перед передачей в разработку/ревью
- [ ] Схемы определены (required/enums/defaults/timestamps)
- [ ] Решения embed vs reference задокументированы
- [ ] Индексы определены под ключевые endpoints
- [ ] Пагинация выбрана (cursor для больших коллекций)
- [ ] Нет сырого user-provided фильтра (NoSQL injection)
- [ ] Миграции/бекфил план есть
- [ ] Integration tests есть (DB queries/unique/transactions)
- [ ] Ошибки маппятся безопасно (400/404/409/5xx)
