---
name: security_baseline_dev
description: Baseline security in implementation ? validation of input data (Zod), secrets management, safe errors, auth/authz patterns, XSS/injection prevention, dependency audit, secure headers. DO/DON'T examples. Activate when writing any code working with user input, auth, secrets, or questions like "how to do X safely".
---

# Skill: Security Baseline (Dev)

Concrete DO/DON'T patterns security for day-to-day development.

**Sections:**
1. [Input Validation](#1-input-validation)
2. [Secrets Management](#2-secrets-management)
3. [Safe errors](#3-secure)
4. [Auth/AuthZ](#4-authauthz)
5. [XSS Prevention](#5-xss-prevention)
6. [Injection Prevention](#6-injection-prevention)
7. [Secure Headers](#7-secure-headers)
8. [Dependency Security](#8-dependency-security)
9. [Logging Security](#9-logging-security)
10. [Anti-patterns](#10-anti-patterns)

---

## 1. Input Validation

### ✅ DO: validation on boundary (API / form) via Zod

```js
import { z } from 'zod';

// ✅ Whitelist schema — allow only known fields
const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100).trim(),
    email: z.string().email().toLowerCase(),
    age: z.number().int().min(13).max(150).optional(),
    role: z.enum(['user', 'admin']).default('user'),
  }),
});

// ✅ Parse and get typed data
const result = createUserSchema.safeParse({ body: req.body });
if (!result.success) {
  return res.status(400).json({ errors: result.error.flatten().fieldErrors });
}
const { name, email, age, role } = result.data.body; // ← safe
```

### ❌ DON'T: trust input data

```js
// ❌ No validation — any data end up in DB
app.post('/api/users', (req, res) => {
  db.users.insert(req.body); // ❌ req.body can contain isAdmin: true
});

// ❌ Manual validation — incomplete, error-prone
if (req.body.email && typeof req.body.email === 'string') {
  // ❌ not checks format email, not trim, not lowercase
}

// ✅ Zod + validate middleware (see. $node_express_beast_practices)
app.post('/api/users', validate(createUserSchema), controller.create);
```

### ✅ DO: sanitize for HTML (if you accept rich text)

```js
import DOMPurify from 'isomorphic-dompurify';

/**
 * Cleans HTML from XSS-vectors.
 * @param {string} dirty - user HTML.
 * @returns {string} secure HTML.
 */
function sanitizeHtml(dirty) {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'target'],
  });
}
```

---

## 2. Secrets Management

### ✅ DO: env variables + validation

```js
// config/env.js
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  API_KEY: z.string().min(16),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const result = envSchema.safeParse(process.env);
if (!result.success) {
  console.error('❌ Missing/invalid env vars:', result.error.flatten().fieldErrors);
  process.exit(1);
}

export const config = Object.freeze(result.data);
```

### ✅ DO: .gitignore for secrets

```gitignore
# Secrets — NEVER commit
.env
.env.local
.env.production
*.pem
*.key
credentials.json
service-account.json
```

### ❌ DON'T: secrets in code

```js
// ❌ Hardcode secrets
const API_KEY = 'sk-1234567890abcdef';  // ❌ Never
const dbUrl = 'mongodb://user:password@host:27017/db';  // ❌

// ✅ From env
const API_KEY = config.API_KEY;
const dbUrl = config.DATABASE_URL;

// ❌ Secrets in logs / errors
logger.info({ apiKey: config.API_KEY }); // ❌ leak
throw new Error(`Auth failed for key: ${apiKey}`); // ❌ leak
```

---

## 3. Safe errors

### ✅ DO: separate operational and programmer errors

```js
// ✅ For client — secure message
// For logs — full information

export function errorHandler(logger) {
  return (err, req, res, _next) => {
    // Operational — show to the client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        error: err.message,
        // ✅ Without stack trace, without SQL, without internal details
      });
    }

    // Programmer error — hide from the client
    logger.error({
      err,          // ← full stack trace in logs
      requestId: req.id,
      method: req.method,
      url: req.originalUrl,
    });

    res.status(500).json({
      error: 'Internal server error',
      // ❌ NEVER: error: err.message, stack: err.stack
    });
  };
}
```

### ❌ DON'T: leak internals

```js
// ❌ SQL error is visible to the user
res.status(500).json({
  error: 'duplicate key value violates unique constraint "users_email_key"'
});

// ❌ Stack trace is visible
res.status(500).json({
  error: err.message,
  stack: err.stack,  // ❌ Never
});

// ❌ Different reaction on "user not found" vs "wrong password"
// → reveals information about accounts (user enumeration)
if (!user) return res.status(404).json({ error: 'User not found' });
if (!passwordMatch) return res.status(401).json({ error: 'Wrong password' });

// ✅ Same message
return res.status(401).json({ error: 'Invalid credentials' });
```

---

## 4. Auth/AuthZ

### ✅ DO: JWT in httpOnly cookie (not localStorage)

```js
// ✅ Setup JWT in httpOnly cookie
res.cookie('token', jwt, {
  httpOnly: true,   // ✅ inaccessible from JS (XSS protection)
  secure: true,     // ✅ only HTTPS
  sameSite: 'lax',  // ✅ CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
  path: '/',
});

// ❌ JWT in localStorage — vulnerability to XSS
localStorage.setItem('token', jwt); // ❌ any JS can read
```

### ✅ DO: authZ checks To operations

```js
// ✅ Verify permissions Before execution operations
async function deleteCoupon(req, res) {
  const coupon = await couponService.getById(req.params.id);

  // AuthZ: only the owner or admin
  if (coupon.ownerId !== req.user.id && req.user.role !== 'admin') {
    throw new ForbiddenError('You can only delete your own coupons');
  }

  await couponService.remove(coupon.id);
  res.status(204).end();
}

// ❌ IDOR — no owner checks
async function deleteCoupon(req, res) {
  await couponService.remove(req.params.id); // any can delete any coupon
}
```

### ✅ DO: password hashing

```js
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

/**
 * Hashes a password via bcrypt.
 * @param {string} password - plain text password.
 * @returns {Promise<string>} hash.
 */
async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare a password with a hash.
 * @param {string} password - plain text.
 * @param {string} hash - bcrypt hash.
 * @returns {Promise<boolean>}
 */
async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

// ❌ Never: MD5, SHA-1, plain text
```

---

## 5. XSS Prevention

### ✅ DO: React automatically escapes JSX

```jsx
// ✅ React escapes by default — safely
return <p>{userInput}</p>; // <script>alert('xss')</script> → text

// ❌ dangerouslySetInnerHTML — XSS if input not sanitized
return <div dangerouslySetInnerHTML={{ __html: userInput }} />; // ❌

// ✅ If it is necessary to insert HTML — sanitize via DOMPurify
import DOMPurify from 'dompurify';
return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />;
```

### ✅ DO: CSP header

```js
// Helmet automatically sets CSP
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],         // without 'unsafe-inline'!
      styleSrc: ["'self'", "'unsafe-inline'"],  // CSS may require inline styles
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.example.com"],
    },
  },
}));
```

---

## 6. Injection Prevention

### ✅ DO: parameterized requests

```js
// ✅ SQL — parameterization (never concatenation)
const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

// ❌ SQL injection
const user = await db.query(`SELECT * FROM users WHERE email = '${email}'`);
// email = "'; DROP TABLE users; --"

// ? MongoDB ? do not allow operators in user input
const user = await db.users.findOne({ email: String(email) }); // ✅ explicit casting

// ❌ NoSQL injection
const user = await db.users.findOne({ email: req.body.email });
// req.body.email = { $ne: "" } → returns the first user

// ✅ Command injection prevention — never not exec(userInput)
import { execFile } from 'node:child_process';
execFile('convert', [inputPath, outputPath], callback); // ✅ args how array

// ❌ Command injection
exec(`convert ${userInput} output.png`); // ❌ userInput = "; rm -rf /"
```

---

## 7. Secure Headers

### ? DO: helmet.js (minimal setup)

```js
import helmet from 'helmet';

// ✅ Helmet sets all required security headers:
// - Content-Security-Policy
// - X-Content-Type-Options: nosniff
// - X-Frame-Options: SAMEORIGIN
// - Strict-Transport-Security (HSTS)
// - X-XSS-Protection (deprecated, but does not hurt)
// - Referrer-Policy
app.use(helmet());
```

### ✅ DO: CORS — whitelist origins

```js
import cors from 'cors';

// ✅ Whitelist specific origin
app.use(cors({
  origin: ['https://myapp.com', 'https://admin.myapp.com'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,  // for httpOnly cookies
}));

// ? Open CORS in production
app.use(cors({ origin: '*' })); // ❌ any site can do requests
```

---

## 8. Dependency Security

### ✅ DO: regular audit

```bash
# npm
npm audit                  # check vulnerabilities
npm audit fix              # auto-fix
npm audit --production     # only production deps

# package.json — lock versions
npm install --save-exact   # precise versions, not ^
```

### ? DO: minimize dependencies

```js
// ? Install lodash for the sake of one function
import _ from 'lodash';
const unique = _.uniq(arr);

// ✅ Native JS
const unique = [...new Set(arr)];

// ❌ moment.js (300KB) form dates
import moment from 'moment';

// ✅ Intl.DateTimeFormat (embedded, 0KB)
new Intl.DateTimeFormat('ru', { dateStyle: 'short' }).format(date);
```

### ✅ DO: lockfile in repositories

```gitignore
# ✅ Lockfile Must be in git (reproducible builds)
# Not add in .gitignore:
# package-lock.json   ← Needed in git
# bun.lockb           ← Needed in git
```

---

## 9. Logging Security

### ✅ DO: sanitize logs from PII and secrets

```js
/**
 * Filter sensitive fields from object for logging.
 * @param {object} obj - object for logging.
 * @returns {object} sanitized object.
 */
function sanitizeForLog(obj) {
  const SENSITIVE_KEYS = ['password', 'token', 'secret', 'apiKey', 'authorization',
    'cookie', 'ssn', 'creditCard', 'cardNumber', 'cvv'];

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (SENSITIVE_KEYS.some((s) => key.toLowerCase().includes(s))) {
        return [key, '[REDACTED]'];
      }
      if (typeof value === 'object' && value !== null) {
        return [key, sanitizeForLog(value)];
      }
      return [key, value];
    })
  );
}

// Usage:
logger.info(sanitizeForLog({ email: 'user@example.com', password: '123', token: 'abc' }));
// { email: 'user@example.com', password: '[REDACTED]', token: '[REDACTED]' }
```

### ✅ DO: pino redact (automatic filtering)

```js
import pino from 'pino';

const logger = pino({
  redact: {
    paths: ['req.headers.authorization', 'req.headers.cookie', '*.password', '*.token', '*.secret'],
    censor: '[REDACTED]',
  },
});
```

---

## 10. Anti-patterns

| ❌ Anti-pattern | ✅ Decision |
|----------------|-----------|
| `req.body` without validation | Zod schema + validate middleware |
| Secrets in code / git | env vars + .gitignore + validation |
| Stack trace in response | Different responses for operational/programmer errors |
| JWT in localStorage | httpOnly + secure + sameSite cookie |
| `SELECT * WHERE id = '${id}'` | Parameterized requests |
| `exec(userInput)` | `execFile(cmd, [args])` |
| `cors({ origin: '*' })` in prod | Whitelist origins |
| PII in logs | Redact / sanitizeForLog |
| `lodash` for the sake of 1 functions | Native JS/ES2025 |
| No npm audit | CI pipeline + regular audit |
| `md5(password)` | bcrypt/argon2 with salt |
| Different errors for login | Unified ?Invalid credentials? |

---

## Short checklist (each PR)

- [ ] Input validated (Zod / whitelist schema)?
- [ ] No secrets in code / logs / errors?
- [ ] Errors don't leak internals?
- [ ] AuthZ checked before operation?
- [ ] No raw SQL/command concatenation?
- [ ] Dependencies audited?
- [ ] Sensitive data redacted from logs?

---

## See also
- `$security_review` — full security review checklist (Reviewer gate)
- `$node_express_beast_practices` — Express middleware pipeline, error handler
- `$observability_logging` — structured logging with redaction
- `$es2025_beast_practices` — safe work with data
