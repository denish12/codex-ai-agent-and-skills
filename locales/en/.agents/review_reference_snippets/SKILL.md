---
name: review_reference_snippets
description: A single set of examples (do/don’t) and review comment templates: AppSec, Cloud/CI, API contracts, tests, observability.
---

# Skill: Review Reference Snippets (Do/Don't)

## Goal
Provide the Reviewer with ready-made formulations and reference do/don’t examples so that the review is specific, reproducible and uniform in style.

---

## A) Secrets (P0)

### ❌ DON'T (P0): secrets hardcode
```ts
const apiKey = "sk-proj-xxxxx";
const dbPassword = "supersecret";
```

### ✅ DO: secrets via env/secret manager + fail-fast availability check
```ts
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw new Error("OPENAI_API_KEY not configured");

const dbPassword = process.env.DB_PASSWORD;
if (!dbPassword) throw new Error("DB_PASSWORD not configured");
```

### ✅ Comment template
- **P0:** The secret is hardcoded/ends up in the repo. Place it in secret manager/env, remove it from the logs, check the git history and the rotation of secrets.

---

## B) Secrets in logs (P0)

### ❌ DON'T: log entire body/headers
```ts
logger.info({ headers: req.headers, body: req.body }, "incoming_request");
```

### ✅ DO: log only secure fields + request_id
```ts
logger.info(
  { request_id: req.requestId, route: req.path, user_id: ctx.user?.id ?? null },
  "incoming_request"
);
```

### ✅ Comment
- **P0:** Possible leakage of PII/tokens in logs. Allowlist fields + editing required.

---

## C) Input validation on the border (P0/P1)

### ✅ DO: circuit at the border (Zod example)
```ts
import { z } from "zod";

const Schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
});

const input = Schema.parse(req.body);
```

### ❌ DON'T: use req.body directly
```ts
service.create(req.body);
```

### ✅ Comment
- **P0/P1:** No input validation at the border. Add schema validation and return 422/400 according to the contract.

---

## D) Safe errors (P0/P1)

### ❌ DON'T: give stack/internal parts to user
```ts
res.status(500).json({ message: err.message, stack: err.stack });
```

### ✅ DO: uniform error format + safe message
```ts
res.status(500).json({
  error_code: "INTERNAL_ERROR",
  message: "Unexpected error",
});
```

### ✅ Comment
- **P0/P1:** Internal leakage. For 5xx - only safe message; details - in structured logs.

---

## E) SQL Injection (P0)

### ❌ DON'T: SQL concatenation
```ts
await db.query(`SELECT * FROM users WHERE email='${email}'`);
```

### ✅ DO: parameterized queries / ORM
```ts
await db.query("SELECT * FROM users WHERE email=$1", [email]);
```

### ✅ Comment
- **P0:** SQL injection risk. Parameterization/ORM only, no concatenation.

---

## F) Command/Path Injection (P0)

### ❌ DON'T: shell exec with user input
```ts
import { exec } from "node:child_process";
exec(`convert ${userPath} -resize 200x200 out.png`);
```

### ✅ DO: avoid shell, use secure APIs/libraries
```ts
// предпочтительно библиотека с безопасными аргументами, без shell
await imageLib.resize({ inputPath: safePath, width: 200, height: 200 });
```

### ✅ Comment
- **P0:** command/path injection risk. Cannot exec with user arguments; need allowlist/secure APIs.

---

## G) AuthN/AuthZ (P0)

### ❌ DON'T: “UI hid the button - that means it’s safe”
```ts
// server does not check role/ownership
```

### ✅ DO: authz before critical operations + ownership check
```ts
if (!ctx.user) throw new AppError(401, "UNAUTHORIZED", "Auth required");
if (ctx.user.role !== "admin") throw new AppError(403, "FORBIDDEN", "Not enough permissions");

// ownership example
if (resource.ownerId !== ctx.user.id) throw new AppError(403, "FORBIDDEN", "Not owner");
```

### ✅ Comment
- **P0:** No server-side authz/ownership. Add role/resource ownership check.

---

## H) CSRF (cookie-based sessions) (P1 → P0 if there is a risk)

### ❌ DON'T: cookie auth without CSRF protection
```txt
Cookie session + POST/PUT/DELETE без CSRF защиты
```

### ✅ DO: SameSite + CSRF token (if required)
```txt
SameSite=Strict/Lax + CSRF token (double-submit или synchronizer token)
```

### ✅ Comment
- **P1/P0:** If auth is on a cookie, you need CSRF protection + checking origin/referer according to the policy.

---

## I) XSS / custom HTML (P0)

### ❌ DON'T: dangerouslySetInnerHTML with user input
```tsx
<div dangerouslySetInnerHTML={{ __html: userContent }} />
```

### ✅ DO: Sanitization + CSP (if applicable)
```tsx
const safeHtml = sanitize(userContent); // allowlist tags/attrs
return <div dangerouslySetInnerHTML={{ __html: safeHtml }} />;
```

### ✅ Comment
- **P0:** XSS risk. Need sanitization/shielding and (if possible) CSP.

---

## J) SSRF (P0 if there is a fetch of external URLs)

### ❌ DON'T: accept URL from user and fetch without restrictions
```ts
await fetch(req.body.url);
```

### ✅ DO: allowlist domains + block of internal addresses
```ts
const url = new URL(req.body.url);
if (!ALLOWED_HOSTS.has(url.hostname)) throw new AppError(400, "BAD_URL", "Host not allowed");
// + защита от private ranges / metadata endpoints
```

### ✅ Comment
- **P0:** SSRF risk. Requires allowlist + block of internal/metadata addresses.

---

## K) Rate limiting (P1 → P0 if public/expensive endpoint)

### ✅ DO: basic limit on API + stricter on expensive ops
```ts
app.use("/api", limiter);
app.use("/api/auth/login", strictLimiter);
app.use("/api/search", searchLimiter);
```

### ✅ Comment- **P1/P0:** No rate limiting. For public/expensive endpoints - a must.

---

## L) Idempotency (P1)

### ❌ DON'T: Repeated POST results in double actions
```txt
Повтор запроса создаёт 2 заказа/2 списания
```

### ✅ DO: idempotency key for risky operations
```txt
Idempotency-Key header + хранение результата/статуса по ключу на TTL
```

### ✅ Comment
- **P1:** Create/charge operations require idempotency (especially during retries/network failures).

---

## M) API contract mismatches (P1/P0)

### ✅ DO: single error format + status codes
```json
{ "error_code": "VALIDATION_ERROR", "message": "Invalid input", "details": { "field": "email" } }
```

### ❌ DON'T: different error formats on different pens
```json
{ "error": "bad" }
```

### ✅ Comment
- **P1/P0:** The error contract must be uniform across the project, otherwise the client/tests will break.

---

## N) Observability: request_id/trace_id (P1)

### ❌ DON'T: logs without correlation
```ts
logger.info("created user");
```

### ✅ DO: structured logs + request_id + key fields
```ts
logger.info({ request_id: req.requestId, user_id: user.id }, "user_created");
```

### ✅ Comment
- **P1:** We need correlation of requests (request_id/trace_id) according to the Observability Plan.

---

## O) Audit logging for critical operations (P1 → P0 if compliance/finance)

### ✅ DO: audit events (without PII/secrets)
```ts
logger.info(
  { audit: true, action: "ORDER_REFUND", actor_id: ctx.user.id, order_id: order.id, request_id: req.requestId },
  "audit_event"
);
```

### ✅ Comment
- **P1/P0:** For critical actions you need an audit trail (who/what/when).

---

## P) Dependency & supply chain (P1)

### ❌ DON'T: add questionable/extra packages without justification
```txt
Добавлен пакет с низкой репутацией / дублирующий функциональность
```

### ✅ DO: minification + audit + lockfile
```txt
Обосновать зависимость, проверить аудит, обновить lockfile, включить CI проверки.
```

### ✅ Comment
- **P1:** Check the need for dependency, audit results, and the absence of known vulnerabilities.

---

## Q) CI/CD security (P1)

### ✅ DO: OIDC instead of long-lived tokens + secret scanning + audit
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

### ❌ DON'T: store permanent keys in CI variables without rotation/restrictions
```txt
AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY долгоживущие и с широкими правами
```

### ✅ Comment
- **P1:** Transition to OIDC, minimal permissions, secret scanning, dependency audit.

---

## R) IAM least privilege (P0)

### ❌ DON'T: wildcard access
```yaml
iam_role:
  permissions: ["s3:*"]
  resources: ["*"]
```

### ✅ DO: precise actions + resources
```yaml
iam_role:
  permissions:
    - s3:GetObject
    - s3:ListBucket
  resources:
    - arn:aws:s3:::my-bucket
    - arn:aws:s3:::my-bucket/*
```

### ✅ Comment
- **P0:** IAM rights are too broad. We need least privilege (specific actions + resources).

---

## S) Network security (P0/P1)

### ✅ DO: DB is not public + limited security groups
```txt
DB private subnet, inbound только от app subnet/SG, no 0.0.0.0/0
```

### ❌ DON'T: open the database on the Internet
```txt
Inbound 0.0.0.0/0 на 5432
```

### ✅ Comment
- **P0:** Public database is a critical vulnerability. Close access, leave only private networks/SG.

---

## T) CDN/WAF/Security headers (P1)

### ✅ DO: security headers on edge + WAF rules
```ts
headers.set("X-Frame-Options", "DENY");
headers.set("X-Content-Type-Options", "nosniff");
headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
```

### ✅ Comment
- **P1:** No security headers/WAF. For production - enable managed rules + basic headers.

---

## U) Backup/DR (P1)

### ✅ DO: retention + deletion protection + recovery plan
```hcl
backup_retention_period = 30
deletion_protection     = true
```

### ✅ Comment
- **P1:** We need backups/retention/rollback. Minimum: retention, (optional) PITR, recovery test, runbook.

---

## V) Security Tests (P1)

### ✅ DO: tests for auth/authz/validation/rate limit
```ts
expect(resp.status).toBe(401);
expect(resp.status).toBe(403);
expect(resp.status).toBe(422);
expect(resp.status).toBe(429);
```

### ✅ Comment
- **P1:** Add security tests (auth/authz/validation/rate limiting) for critical handles.

---

## W) Final review template (briefly)

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