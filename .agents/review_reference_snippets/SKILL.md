---
name: review_reference_snippets
description: Единый набор примеров (do/don’t) и шаблонов комментариев ревью: AppSec, Cloud/CI, контракты API, тесты, observability.
---

# Skill: Review Reference Snippets (Do/Don't)

## Цель
Дать Reviewer готовые формулировки и эталонные do/don’t примеры, чтобы ревью было конкретным, воспроизводимым и единым по стилю.

---

## A) Secrets (P0)

### ❌ DON'T (P0): хардкод секретов
```ts
const apiKey = "sk-proj-xxxxx";
const dbPassword = "supersecret";
```

### ✅ DO: секреты через env/secret manager + fail-fast проверка наличия
```ts
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw new Error("OPENAI_API_KEY not configured");

const dbPassword = process.env.DB_PASSWORD;
if (!dbPassword) throw new Error("DB_PASSWORD not configured");
```

### ✅ Шаблон комментария
- **P0:** Секрет захардкожен/попадает в репо. Вынести в secret manager/env, убрать из логов, проверить историю git и ротацию секретов.

---

## B) Secrets in logs (P0)

### ❌ DON'T: логировать body/headers целиком
```ts
logger.info({ headers: req.headers, body: req.body }, "incoming_request");
```

### ✅ DO: логировать только безопасные поля + request_id
```ts
logger.info(
  { request_id: req.requestId, route: req.path, user_id: ctx.user?.id ?? null },
  "incoming_request"
);
```

### ✅ Комментарий
- **P0:** Возможна утечка PII/токенов в логах. Нужен allowlist полей + редактирование.

---

## C) Input validation на границе (P0/P1)

### ✅ DO: схема на границе (пример Zod)
```ts
import { z } from "zod";

const Schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
});

const input = Schema.parse(req.body);
```

### ❌ DON'T: использовать req.body напрямую
```ts
service.create(req.body);
```

### ✅ Комментарий
- **P0/P1:** Нет валидации входа на границе. Добавить schema validation и вернуть 422/400 по контракту.

---

## D) Safe errors (P0/P1)

### ❌ DON'T: отдавать stack/внутренние детали пользователю
```ts
res.status(500).json({ message: err.message, stack: err.stack });
```

### ✅ DO: единый формат ошибок + safe message
```ts
res.status(500).json({
  error_code: "INTERNAL_ERROR",
  message: "Unexpected error",
});
```

### ✅ Комментарий
- **P0/P1:** Утечка внутренностей. Для 5xx — только safe message; детали — в структурированные логи.

---

## E) SQL Injection (P0)

### ❌ DON'T: конкатенация SQL
```ts
await db.query(`SELECT * FROM users WHERE email='${email}'`);
```

### ✅ DO: параметризованные запросы / ORM
```ts
await db.query("SELECT * FROM users WHERE email=$1", [email]);
```

### ✅ Комментарий
- **P0:** SQL injection риск. Только параметризация/ORM, без конкатенации.

---

## F) Command/Path Injection (P0)

### ❌ DON'T: shell exec с пользовательским вводом
```ts
import { exec } from "node:child_process";
exec(`convert ${userPath} -resize 200x200 out.png`);
```

### ✅ DO: избегать shell, использовать безопасные API/библиотеки
```ts
// предпочтительно библиотека с безопасными аргументами, без shell
await imageLib.resize({ inputPath: safePath, width: 200, height: 200 });
```

### ✅ Комментарий
- **P0:** command/path injection риск. Нельзя exec с пользовательскими аргументами; нужен allowlist/безопасные API.

---

## G) AuthN/AuthZ (P0)

### ❌ DON'T: “UI спрятал кнопку — значит безопасно”
```ts
// server does not check role/ownership
```

### ✅ DO: authz до критичных операций + ownership check
```ts
if (!ctx.user) throw new AppError(401, "UNAUTHORIZED", "Auth required");
if (ctx.user.role !== "admin") throw new AppError(403, "FORBIDDEN", "Not enough permissions");

// ownership example
if (resource.ownerId !== ctx.user.id) throw new AppError(403, "FORBIDDEN", "Not owner");
```

### ✅ Комментарий
- **P0:** Нет server-side authz/ownership. Добавить проверку ролей/владения ресурсом.

---

## H) CSRF (cookie-based sessions) (P1 → P0 если есть риск)

### ❌ DON'T: cookie auth без CSRF защиты
```txt
Cookie session + POST/PUT/DELETE без CSRF защиты
```

### ✅ DO: SameSite + CSRF token (если требуется)
```txt
SameSite=Strict/Lax + CSRF token (double-submit или synchronizer token)
```

### ✅ Комментарий
- **P1/P0:** Если auth на cookie — нужна CSRF защита + проверка origin/referer по политике.

---

## I) XSS / пользовательский HTML (P0)

### ❌ DON'T: dangerouslySetInnerHTML с пользовательским вводом
```tsx
<div dangerouslySetInnerHTML={{ __html: userContent }} />
```

### ✅ DO: санитизация + CSP (если применимо)
```tsx
const safeHtml = sanitize(userContent); // allowlist tags/attrs
return <div dangerouslySetInnerHTML={{ __html: safeHtml }} />;
```

### ✅ Комментарий
- **P0:** XSS риск. Нужна санитизация/экранирование и (по возможности) CSP.

---

## J) SSRF (P0 если есть fetch внешних URL)

### ❌ DON'T: принимать URL от пользователя и fetch без ограничений
```ts
await fetch(req.body.url);
```

### ✅ DO: allowlist доменов + блок внутренних адресов
```ts
const url = new URL(req.body.url);
if (!ALLOWED_HOSTS.has(url.hostname)) throw new AppError(400, "BAD_URL", "Host not allowed");
// + защита от private ranges / metadata endpoints
```

### ✅ Комментарий
- **P0:** SSRF риск. Требуется allowlist + блок внутренних/metadata адресов.

---

## K) Rate limiting (P1 → P0 если публичный/дорогой endpoint)

### ✅ DO: базовый лимит на API + stricter на expensive ops
```ts
app.use("/api", limiter);
app.use("/api/auth/login", strictLimiter);
app.use("/api/search", searchLimiter);
```

### ✅ Комментарий
- **P1/P0:** Нет rate limiting. Для публичных/дорогих эндпоинтов — обязательно.

---

## L) Idempotency (P1)

### ❌ DON'T: повторяемый POST приводит к двойным действиям
```txt
Повтор запроса создаёт 2 заказа/2 списания
```

### ✅ DO: idempotency key для рискованных операций
```txt
Idempotency-Key header + хранение результата/статуса по ключу на TTL
```

### ✅ Комментарий
- **P1:** Для create/charge операций нужна идемпотентность (особенно при ретраях/сетевых сбоях).

---

## M) API contract mismatches (P1/P0)

### ✅ DO: единый error формат + коды статусов
```json
{ "error_code": "VALIDATION_ERROR", "message": "Invalid input", "details": { "field": "email" } }
```

### ❌ DON'T: разные форматы ошибок на разных ручках
```json
{ "error": "bad" }
```

### ✅ Комментарий
- **P1/P0:** Контракт ошибок должен быть единым по проекту, иначе ломается клиент/тесты.

---

## N) Observability: request_id/trace_id (P1)

### ❌ DON'T: логи без корреляции
```ts
logger.info("created user");
```

### ✅ DO: structured logs + request_id + ключевые поля
```ts
logger.info({ request_id: req.requestId, user_id: user.id }, "user_created");
```

### ✅ Комментарий
- **P1:** Нужна корреляция запросов (request_id/trace_id) по Observability Plan.

---

## O) Audit logging для критичных операций (P1 → P0 если комплаенс/финансы)

### ✅ DO: audit события (без PII/секретов)
```ts
logger.info(
  { audit: true, action: "ORDER_REFUND", actor_id: ctx.user.id, order_id: order.id, request_id: req.requestId },
  "audit_event"
);
```

### ✅ Комментарий
- **P1/P0:** Для критичных действий нужен audit trail (кто/что/когда).

---

## P) Dependency & supply chain (P1)

### ❌ DON'T: добавлять сомнительные/лишние пакеты без обоснования
```txt
Добавлен пакет с низкой репутацией / дублирующий функциональность
```

### ✅ DO: минимизация + audit + lockfile
```txt
Обосновать зависимость, проверить аудит, обновить lockfile, включить CI проверки.
```

### ✅ Комментарий
- **P1:** Проверь необходимость зависимости, результаты audit, и отсутствие known vulnerabilities.

---

## Q) CI/CD security (P1)

### ✅ DO: OIDC вместо long-lived tokens + secret scanning + audit
```yaml
permissions:
  contents: read

steps:
  - uses: trufflesecurity/trufflehog@main
  - run: npm audit --audit-level=high
  - uses: aws-actions/configure-aws-credentials@v4
    with:
      role-to-assume: arn:aws:iam::123:role/ci
      aws-region: eu-central-1
```

### ❌ DON'T: хранить постоянные ключи в CI variables без ротации/ограничений
```txt
AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY долгоживущие и с широкими правами
```

### ✅ Комментарий
- **P1:** Переход на OIDC, минимальные permissions, secret scanning, dependency audit.

---

## R) IAM least privilege (P0)

### ❌ DON'T: wildcard доступ
```yaml
iam_role:
  permissions: ["s3:*"]
  resources: ["*"]
```

### ✅ DO: точные actions + ресурсы
```yaml
iam_role:
  permissions:
    - s3:GetObject
    - s3:ListBucket
  resources:
    - arn:aws:s3:::my-bucket
    - arn:aws:s3:::my-bucket/*
```

### ✅ Комментарий
- **P0:** IAM слишком широкие права. Нужен least privilege (конкретные actions + ресурсы).

---

## S) Network security (P0/P1)

### ✅ DO: DB не публичная + ограниченные security groups
```txt
DB private subnet, inbound только от app subnet/SG, no 0.0.0.0/0
```

### ❌ DON'T: открывать БД в интернет
```txt
Inbound 0.0.0.0/0 на 5432
```

### ✅ Комментарий
- **P0:** Публичная БД — критическая уязвимость. Закрыть доступ, оставить только приватные сети/SG.

---

## T) CDN/WAF/Security headers (P1)

### ✅ DO: security headers на edge + WAF rules
```ts
headers.set("X-Frame-Options", "DENY");
headers.set("X-Content-Type-Options", "nosniff");
headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
```

### ✅ Комментарий
- **P1:** Нет security headers/WAF. Для продакшена — включить managed rules + базовые заголовки.

---

## U) Backup/DR (P1)

### ✅ DO: retention + deletion protection + recovery plan
```hcl
backup_retention_period = 30
deletion_protection     = true
```

### ✅ Комментарий
- **P1:** Нужны бэкапы/retention/rollback. Минимум: retention, (опц.) PITR, тест восстановления, runbook.

---

## V) Тесты безопасности (P1)

### ✅ DO: тесты на auth/authz/валидацию/rate limit
```ts
expect(resp.status).toBe(401);
expect(resp.status).toBe(403);
expect(resp.status).toBe(422);
expect(resp.status).toBe(429);
```

### ✅ Комментарий
- **P1:** Добавить тесты безопасности (auth/authz/validation/rate limiting) для критичных ручек.

---

## W) Шаблон итогового ревью (кратко)

### ✅ Summary Template
```txt
Summary:
- PASS: <что ок>
- MISSING: <что нужно добавить>

P0 (Blockers):
- [ ] <что / где / почему блокер / как исправить>

P1 (Important):
- [ ] ...

P2 (Nice-to-have):
- [ ] ...

Next Actions:
- REV-01 ...
- DEV-02 ...
```
