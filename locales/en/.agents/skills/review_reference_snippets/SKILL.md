---
name: review_reference_snippets
description: Single set of review comment templates and examples (do/don't): AppSec, Cloud/CI, API contracts, tests, observability.
---

# Skill: Review Reference Snippets (Do/Don't)

## Goal
Provide the Reviewer with ready-made wordings and reference do/don't examples so that the review is specific, reproducible, and uniform in style.

---

## A) Secrets (P0)

### ❌ DON'T (P0): hardcode secrets
```ts
const apiKey = "sk-proj-xxxxx";
const dbPassword = "supersecret";
```

### ✅ DO: secrets via env/secret manager + fail-fast check for presence
```ts
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw new Error("OPENAI_API_KEY not configured");

const dbPassword = process.env.DB_PASSWORD;
if (!dbPassword) throw new Error("DB_PASSWORD not configured");
```

### ✅ Comment Template
- **P0:** Secret is hardcoded/gets into the repo. Move to secret manager/env, remove from logs, check git history and secret rotation.

---

## B) Secrets in logs (P0)

### ❌ DON'T: log body/headers completely
```ts
logger.info({ headers: req.headers, body: req.body }, "incoming_request");
```

### ✅ DO: log only safe fields + request_id
```ts
logger.info(
  { request_id: req.requestId, route: req.path, user_id: ctx.user?.id ?? null },
  "incoming_request"
);
```

### ✅ Comment
- **P0:** Possible leak of PII/tokens in logs. An allowlist of fields + redaction is needed.

---

## C) Input validation at the boundary (P0/P1)

### ✅ DO: schema at the boundary (Zod example)
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
- **P0/P1:** No input validation at the boundary. Add schema validation and return 422/400 according to the contract.

---

## D) Safe errors (P0/P1)

### ❌ DON'T: expose stack/internal details to the user
```ts
res.status(500).json({ message: err.message, stack: err.stack });
```

### ✅ DO: unified error format + safe message
```ts
res.status(500).json({
  error_code: "INTERNAL_ERROR",
  message: "Unexpected error",
});
```

### ✅ Comment
- **P0/P1:** Leak of internals. For 5xx — only safe message; details — in structured logs.

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
- **P0:** SQL injection risk. Only parameterization/ORM, without concatenation.

---

## E2) NoSQL Injection — MongoDB (P0)

### ❌ DON'T: pass req.query/req.body directly to Mongoose
```ts
// Attack: ?email[$gt]= → object { $gt: "" } → matches ALL documents
const user = await User.findOne({ email: req.query.email });

// Attack: body = { "role": { "$ne": null } } → bypasses filter
const users = await User.find(req.body);
```

### ✅ DO: cast to type + safe filter builder + strictQuery
```ts
// Force string — strip operator injection
const email = String(req.query.email);
const user = await User.findOne({ email });

// Or Zod validation at boundary (best)
const { email } = emailSchema.parse(req.query);

// Global Mongoose defense
mongoose.set('strictQuery', true);
```

### ✅ Comment
- **P0:** NoSQL injection risk. User input is passed directly to the Mongoose query. Cast to type / Zod validation + `strictQuery: true`.

---

## E3) N+1 Query (P0)

### ❌ DON'T: DB query in a loop
```ts
const orders = await Order.find({ userId });
for (const order of orders) {
  order.items = await Item.find({ orderId: order._id }); // N queries!
}
```

### ✅ DO: batch query with $in or $lookup
```ts
const orders = await Order.find({ userId });
const orderIds = orders.map(o => o._id);
const items = await Item.find({ orderId: { $in: orderIds } }); // 1 query
// Map items to orders in memory
```

### ✅ Comment
- **P0:** N+1 query (DB call in a loop). Replace with batch `$in` or `$lookup` in aggregation.

---

## E4) React Performance (P1)

### ❌ DON'T: new object/function on every render
```tsx
function Parent() {
  return (
    <Child
      style={{ color: 'red' }}       // new object every render
      onClick={() => doSomething()}   // new function every render
      data={items.filter(x => x.active)} // new array every render
    />
  );
}
```

### ✅ DO: stable references via useMemo/useCallback
```tsx
function Parent() {
  const style = useMemo(() => ({ color: 'red' }), []);
  const handleClick = useCallback(() => doSomething(), []);
  const activeItems = useMemo(() => items.filter(x => x.active), [items]);

  return <Child style={style} onClick={handleClick} data={activeItems} />;
}
```

### ✅ Comment
- **P1:** Inline object/function in JSX props causes unnecessary re-renders. Use `useMemo`/`useCallback` for stable references.

---

## E5) Layer Boundary Violation (P0/P1)

### ❌ DON'T: DB call in route/controller
```ts
// routes/coupons.js — route layer has direct DB access
router.get('/coupons', async (req, res) => {
  const coupons = await Coupon.find({ appInstanceId: req.appInstanceId }); // P0!
  res.json(coupons);
});
```

### ✅ DO: route → controller → service → repository
```ts
// routes/coupons.js
router.get('/coupons', auth, couponController.list);

// controllers/coupon.js
async list(req, res) {
  const coupons = await couponService.list(req.appInstanceId);
  res.json({ data: coupons });
}

// services/coupon.js
async list(appInstanceId) {
  return couponRepo.findByAppInstanceId(appInstanceId);
}
```

### ✅ Comment
- **P0/P1:** Layer violation — direct DB call in route/controller. Move to service → repository.

---

## F) Command/Path Injection (P0)

### ❌ DON'T: shell exec with user input
```ts
import { exec } from "node:child_process";
exec(`convert ${userPath} -resize 200x200 out.png`);
```

### ✅ DO: avoid shell, use safe APIs/libraries
```ts
// preferably a library with safe arguments, without shell
await imageLib.resize({ inputPath: safePath, width: 200, height: 200 });
```

### ✅ Comment
- **P0:** command/path injection risk. Cannot exec with user arguments; an allowlist/safe APIs are needed.

---

## G) AuthN/AuthZ (P0)

### ❌ DON'T: "UI hid the button — so it's safe"
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
- **P0:** No server-side authz/ownership. Add check for roles/resource ownership.

---

## H) CSRF (cookie-based sessions) (P1 → P0 if there is risk)

### ❌ DON'T: cookie auth without CSRF protection
```txt
Cookie session + POST/PUT/DELETE without CSRF protection
```

### ✅ DO: SameSite + CSRF token (if required)
```txt
SameSite=Strict/Lax + CSRF token (double-submit or synchronizer token)
```

### ✅ Comment
- **P1/P0:** If auth is on cookie — CSRF protection + checking origin/referer according to the policy is needed.

---

## I) XSS / user HTML (P0)

### ❌ DON'T: dangerouslySetInnerHTML with user input
```tsx
<div dangerouslySetInnerHTML={{ __html: userContent }} />
```

### ✅ DO: sanitization + CSP (if applicable)
```tsx
const safeHtml = sanitize(userContent); // allowlist tags/attrs
return <div dangerouslySetInnerHTML={{ __html: safeHtml }} />;
```

### ✅ Comment
- **P0:** XSS risk. Sanitization/escaping and (if possible) CSP is needed.

---

## J) SSRF (P0 if there is external URL fetch)

### ❌ DON'T: accept URL from user and fetch without restrictions
```ts
await fetch(req.body.url);
```

### ✅ DO: allowlist of domains + block internal addresses
```ts
const url = new URL(req.body.url);
if (!ALLOWED_HOSTS.has(url.hostname)) throw new AppError(400, "BAD_URL", "Host not allowed");
// + protection against private ranges / metadata endpoints
```

### ✅ Comment
- **P0:** SSRF risk. Allowlist + block internal/metadata addresses is required.

---

## K) Rate limiting (P1 → P0 if a public/expensive endpoint)

### ✅ DO: basic limit on API + stricter on expensive ops
```ts
app.use("/api", limiter);
app.use("/api/auth/login", strictLimiter);
app.use("/api/search", searchLimiter);
```

### ✅ Comment
- **P1/P0:** No rate limiting. For public/expensive endpoints — mandatory.

---

## L) Idempotency (P1)

### ❌ DON'T: repeatable POST leads to double actions
```txt
Repeating the request creates 2 orders/2 charges
```

### ✅ DO: idempotency key for risky operations
```txt
Idempotency-Key header + storing result/status by key for TTL
```

### ✅ Comment
- **P1:** For create/charge operations, idempotency is needed (especially during retries/network failures).

---

## M) API contract mismatches (P1/P0)

### ✅ DO: unified error format + status codes
```json
{ "error_code": "VALIDATION_ERROR", "message": "Invalid input", "details": { "field": "email" } }
```

### ❌ DON'T: different error formats on different endpoints
```json
{ "error": "bad" }
```

### ✅ Comment
- **P1/P0:** The error contract must be unified across the project, otherwise the client/tests will break.

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
- **P1:** Request correlation (request_id/trace_id) according to the Observability Plan is needed.

---

## O) Audit logging for critical operations (P1 → P0 if compliance/finances)

### ✅ DO: audit events (without PII/secrets)
```ts
logger.info(
  { audit: true, action: "ORDER_REFUND", actor_id: ctx.user.id, order_id: order.id, request_id: req.requestId },
  "audit_event"
);
```

### ✅ Comment
- **P1/P0:** For critical actions, an audit trail is needed (who/what/when).

---

## P) Dependency & supply chain (P1)

### ❌ DON'T: add dubious/unnecessary packages without justification
```txt
Added a package with low reputation / duplicating functionality
```

### ✅ DO: minimization + audit + lockfile
```txt
Justify the dependency, check the audit, update the lockfile, enable CI checks.
```

### ✅ Comment
- **P1:** Check the necessity of the dependency, audit results, and absence of known vulnerabilities.

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

### ❌ DON'T: store persistent keys in CI variables without rotation/restrictions
```txt
AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY are long-lived and have broad permissions
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

### ✅ DO: exact actions + resources
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
- **P0:** IAM permissions are too broad. Least privilege is needed (specific actions + resources).

---

## S) Network security (P0/P1)

### ✅ DO: DB is not public + restricted security groups
```txt
DB private subnet, inbound only from app subnet/SG, no 0.0.0.0/0
```

### ❌ DON'T: open the DB to the Internet
```txt
Inbound 0.0.0.0/0 on 5432
```

### ✅ Comment
- **P0:** Public DB is a critical vulnerability. Close access, leave only private networks/SG.

---

## T) CDN/WAF/Security headers (P1)

### ✅ DO: security headers on edge + WAF rules
```ts
headers.set("X-Frame-Options", "DENY");
headers.set("X-Content-Type-Options", "nosniff");
headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
```

### ✅ Comment
- **P1:** No security headers/WAF. For production — enable managed rules + basic headers.

---

## U) Backup/DR (P1)

### ✅ DO: retention + deletion protection + recovery plan
```hcl
backup_retention_period = 30
deletion_protection     = true
```

### ✅ Comment
- **P1:** Backups/retention/rollback are needed. Minimum: retention, (opt.) PITR, recovery test, runbook.

---

## V) Security tests (P1)

### ✅ DO: tests for auth/authz/validation/rate limit
```ts
expect(resp.status).toBe(401);
expect(resp.status).toBe(403);
expect(resp.status).toBe(422);
expect(resp.status).toBe(429);
```

### ✅ Comment
- **P1:** Add security tests (auth/authz/validation/rate limiting) for critical endpoints.

---

## W) Final review template (briefly)

### ✅ Summary Template
```txt
Summary:
- PASS: <what is ok>
- MISSING: <what needs to be added>

P0 (Blockers):
- [ ] <what / where / why is it a blocker / how to fix>

P1 (Important):
- [ ] ...

P2 (Nice-to-have):
- [ ] ...

Next Actions:
- REV-01 ...
- DEV-02 ...
```
