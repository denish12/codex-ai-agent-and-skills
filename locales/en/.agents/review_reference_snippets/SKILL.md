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

## E2) NoSQL Injection — MongoDB (P0)

### ❌ DON'T: pass req.query/req.body directly in Mongoose
```ts
// Attack: ?email[$gt]= → object { $gt: "" } → matches ALL documents
const user = await User.findOne({ email: req.query.email });

// Attack: body = { "role": { "$ne": null } } → bypasses filter
const users = await User.find(req.body);
```

### ✅ DO: bring to type + safe filter builder + strictQuery
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
- **P0:** NoSQL injection risk. User input is passed directly into a Mongoose query. Bring to type / Zod validation + `strictQuery: true`.

---

## E3) N+1 Query (P0)

### ❌ DON'T: DB request in cycle
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
- **P0:** N+1 request (DB call in cycle). Replace on batch `$in` or `$lookup` in aggregation.

---

## E4) React Performance (P1)

### ❌ DON'T: new object/function on each render
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

### ✅ DO: stable links via useMemo/useCallback
```tsx
function Parent() {
  const style = useMemo(() => ({ color: 'red' }), []);
  const handleClick = useCallback(() => doSomething(), []);
  const activeItems = useMemo(() => items.filter(x => x.active), [items]);

  return <Child style={style} onClick={handleClick} data={activeItems} />;
}
```

### ✅ Comment
- **P1:** Inline object/function in JSX props calls extra re-renders. Use `useMemo`/`useCallback` for stable references.

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
- **P0/P1:** Layering violation — direct DB call in route/controller. Extract in service → repository.

---

## F) Command/Path Injection (P0)

### ❌ DON'T: shell exec with user input
```ts
import { exec } from "node:child_process";
exec(`convert ${userPath} -resize 200x200 out.png`);
```

### ✅ DO: avoid shell, use secure APIs/libraries
```ts
// preferably a library with safe arguments, without shell
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
Cookie session + POST/PUT/DELETE without CSRF protection
```

### ✅ DO: SameSite + CSRF token (if required)
```txt
SameSite=Strict/Lax + CSRF token (double-submit or synchronizer token)
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
// + protection from private ranges / metadata endpoints
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

### ✅ Comment
- **P1/P0:** No rate limiting. For public/expensive endpoints — mandatory.

---

## L) Idempotency (P1)

```txt
```txt
```
```

```txt
```txt
```
```

### ✅ Comment
- **P1:** For create/charge operations needed idempotency (especially with retries/network failures).

---

## M) API contract mismatches (P1/P0)

```json
```json
{ "error_code": "VALIDATION_ERROR", "message": "Invalid input", "details": { "field": "email" } }
```

```json
```json
{ "error": "bad" }
```

### ✅ Comment
- **P1/P0:** Contract errors must be consistent across the project, otherwise breaks client/tests.

---

## N) Observability: request_id/trace_id (P1)

```ts
```ts
logger.info("created user");
```

```ts
```ts
logger.info({ request_id: req.requestId, user_id: user.id }, "user_created");
```

### ✅ Comment
- **P1:** Needed correlation requests (request_id/trace_id) by Observability Plan.

---

## O) Audit logging for critical operations (P1 → P0 if compliance/finance)

```ts
```ts
logger.info(
  { audit: true, action: "ORDER_REFUND", actor_id: ctx.user.id, order_id: order.id, request_id: req.requestId },
  "audit_event"
);
```

### ✅ Comment
- **P1/P0:** For critical actions needed audit trail (who/what/when).

---

## P) Dependency & supply chain (P1)

```txt
```txt
```
```

```txt
```txt
```
```

### ✅ Comment
- **P1:** Check need dependencies, results audit, and absence known vulnerabilities.

---

## Q) CI/CD security (P1)

```yaml
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

```txt
```txt
```
```

### ✅ Comment
- **P1:** Transition on OIDC, minimal permissions, secret scanning, dependency audit.

---

## R) IAM least privilege (P0)

```yaml
```yaml
iam_role:
  permissions: ["s3:*"]
  resources: ["*"]
```

```yaml
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
- **P0:** IAM too overly broad permissions. Needed least privilege (concrete actions + resources).

---

## S) Network security (P0/P1)

```txt
```txt
```
```

```txt
```txt
```
```

### ✅ Comment
- **P0:** Public DB — critical vulnerability. close access, keep only private network/security groups.

---

## T) CDN/WAF/Security headers (P1)

```ts
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
- **P1:** Needed backups/retention/rollback. Minimum: retention, (optional) PITR, test recovery, runbook.

---

## V) Tests security (P1)

```ts
```ts
expect(resp.status).toBe(401);
expect(resp.status).toBe(403);
expect(resp.status).toBe(422);
expect(resp.status).toBe(429);
```

### ✅ Comment
- **P1:** Add tests security (auth/authz/validation/rate limiting) for critical endpoints.

---

## W) Template final review (short)

### ✅ Summary Template
```txt
Summary:
- MISSING: <what need add>
- MISSING: <what needed add>

P0 (Blockers):
- [ ] <what / where / why blocker / how fix>

P1 (Important):
- [ ] ...

P2 (Nice-to-have):
- [ ] ...

Next Actions:
- REV-01 ...
- DEV-02 ...
```
