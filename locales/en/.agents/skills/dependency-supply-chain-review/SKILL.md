---
name: dependency-supply-chain-review
description: Dependency review with mandatory socket.dev MCP check (depscore) — supply chain, vulnerability, licenses. P0 alerts block installation.
last_verified: 2026-04-08
version: 2.0
mcp_server: socket-mcp
---

# Skill: Dependency & Supply Chain Review

Audit of npm dependencies: supply chain, vulnerabilities, licenses, suspicious packages.
**Since v2.0** — mandatory integration with **socket.dev MCP** (`depscore`) for every new or updated package. P0 alerts block installation until explicit user confirmation.

**Sections:**
0. [Prerequisites — Socket.dev MCP](#0-prerequisites)
1. [When to activate](#1-when-to-activate)
2. [Audit Commands](#2-audit-commands)
3. [Checklist](#3-checklist)
4. [Red Flags](#4-red-flags)
5. [License Policy](#5-license-policy)
6. [Decision Framework](#6-decision-framework)
7. [CI Integration](#7-ci-integration)
8. [Output Template](#8-output-template)
9. [Socket.dev Integration](#9-socket-dev)

---

## 0. Prerequisites — Socket.dev MCP <a id="0-prerequisites"></a>

> [!IMPORTANT]
> **Socket.dev MCP is mandatory since v2.0.** Without it, this skill operates in **degraded mode** with a notice in the report.

### Why

[socket.dev](https://socket.dev) provides automated supply-chain analytics for packages: detection of malware, typosquatting, suspicious maintainer changes, native binding risks. Without it, the review relies only on `npm audit`, which catches only known CVEs.

### Installation (recommended — HTTP, no API key required)

Add the snippet to the `mcpServers` config of your AI client (Claude Code / Codex / Qwen / Copilot / Antigravity):

```json
{
  "mcpServers": {
    "socket-mcp": {
      "type": "http",
      "url": "https://mcp.socket.dev/"
    }
  }
}
```

### Alternative — stdio with API key (for teams with paid socket.dev account)

```json
{
  "mcpServers": {
    "socket-mcp": {
      "command": "npx",
      "args": ["-y", "@socketsecurity/mcp@latest"],
      "env": {
        "SOCKET_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

API key is available at https://socket.dev/.

### Detection protocol (agent runs this before review)

1. Try calling `depscore` on a known package (e.g., `lodash@4.17.21`).
2. If the tool is available and returns a valid response → **Active mode**, proceed.
3. If the tool is unavailable → **degraded mode**, follow the steps below.

### Degraded mode protocol

If `socket-mcp` is not connected:

1. **Log a warning**: `[degraded] socket-mcp not detected — falling back to npm audit only`.
2. **Offer installation**: show the user both JSON snippets (HTTP + stdio) and ask:
   > "Socket.dev MCP is not connected. Want to install it now? (HTTP mode requires no API key). [y/n]"
3. If **y** → instruct: "Add the snippet to the `mcpServers` config of your AI client and restart the session", then re-run detection after restart.
4. If **n** or the tool is still unavailable after installation → continue review with `Mode: Degraded` in Output Template, fall back to `npm audit` + manual checks from section 4 (Red Flags).

> [!WARNING]
> In degraded mode, the review **does not block** merge on DEP-05a/05b/05c (socket-checks), but Reviewer must explicitly record the degraded status in the Handoff Envelope.

---

## 1. When to activate

| Trigger | Action |
|---------|--------|
| New dependency added | Full review of the package |
| PR with `package.json` / `package-lock.json` changes | Diff review + audit |
| Periodic review (monthly) | Full audit |
| Security alert (GitHub Dependabot, npm advisory) | Targeted review |
| Major version upgrade | Changelog review + test |
| Pre-release gate | Full audit as part of RG checklist |

---

## 2. Audit Commands

### Essential commands

```bash
# Vulnerability audit (fail on high/critical)
npm audit --audit-level=high

# Detailed audit (JSON for parsing)
npm audit --json

# List outdated packages
npm outdated

# Check licenses
npx license-checker --summary

# Check licenses with allowed list
npx license-checker --onlyAllow "MIT;ISC;BSD-2-Clause;BSD-3-Clause;Apache-2.0"

# Find unused dependencies
npx depcheck

# Package size analysis
npx cost-of-modules

# Check package popularity/health
npx npm-check

# Lock file integrity
npm ci --dry-run
```

### Grep for suspicious patterns

```bash
# Postinstall scripts (supply chain attack vector)
grep_search: Query="postinstall" SearchPath="package.json"
grep_search: Query="preinstall" SearchPath="package.json"

# Native bindings (potential security risk)
grep_search: Query="node-gyp" SearchPath="package-lock.json"
grep_search: Query="prebuild" SearchPath="package-lock.json"
```

---

## 3. Checklist

### 3.1 Necessity

| # | Check | Severity | Status |
|---|-------|----------|--------|
| DEP-01 | Each dependency is actually used (no dead deps) | 🟠 P1 | ☐ |
| DEP-02 | No duplicate packages for same purpose (e.g. 2 date libs) | 🟠 P1 | ☐ |
| DEP-03 | Could be replaced with native API (e.g. `fetch` vs `axios`, `crypto` vs `uuid`) | 🟡 P2 | ☐ |
| DEP-04 | Dev dependencies are in `devDependencies`, not `dependencies` | 🟠 P1 | ☐ |

### 3.2 Security

| # | Check | Severity | Status |
|---|-------|----------|--------|
| DEP-05 | `npm audit` — no high/critical vulnerabilities | 🔴 P0 | ☐ |
| DEP-05a | socket.dev `depscore.supply_chain ≥ 0.75` for all new/updated deps | 🔴 P0 | ☐ |
| DEP-05b | socket.dev `depscore.vulnerability ≥ 0.80` | 🔴 P0 | ☐ |
| DEP-05c | socket.dev `depscore.license ≥ 0.50` (no copyleft contamination) | 🔴 P0 | ☐ |
| DEP-05d | socket-mcp tool detected (not degraded mode) | 🟠 P1 | ☐ |
| DEP-06 | `package-lock.json` committed and up to date | 🔴 P0 | ☐ |
| DEP-07 | No `npm install` with `--force` or `--legacy-peer-deps` (unless justified) | 🟠 P1 | ☐ |
| DEP-08 | No postinstall scripts from untrusted packages | 🔴 P0 | ☐ |
| DEP-09 | Packages use well-known publishers (npm org verified) | 🟠 P1 | ☐ |

> [!NOTE]
> DEP-05a/05b/05c are checked automatically via socket.dev `depscore` (see section [9. Socket.dev Integration](#9-socket-dev)). In **degraded mode** these checks are marked `N/A — degraded` and do not block merge, but Reviewer must record this in the Output Template.

### 3.3 Maintenance

| # | Check | Severity | Status |
|---|-------|----------|--------|
| DEP-10 | No abandoned packages (last publish > 2 years, no maintainer) | 🟠 P1 | ☐ |
| DEP-11 | Major version not overly outdated (< 2 major versions behind) | 🟠 P1 | ☐ |
| DEP-12 | Critical deps have alternatives identified (bus factor) | 🟡 P2 | ☐ |
| DEP-13 | Version pinning strategy defined (exact vs range vs caret) | 🟡 P2 | ☐ |

### 3.4 License

| # | Check | Severity | Status |
|---|-------|----------|--------|
| DEP-14 | All licenses are permissive (MIT, ISC, BSD, Apache-2.0) | 🟠 P1 | ☐ |
| DEP-15 | No GPL/AGPL/SSPL in production dependencies (if proprietary project) | 🔴 P0 | ☐ |
| DEP-16 | No UNLICENSED packages in production | 🟠 P1 | ☐ |

---

## 4. Red Flags

### Package red flags

| 🚩 Red Flag | Risk | Example |
|------------|------|---------|
| **Typosquatting** | Malicious package with similar name | `lodahs` instead of `lodash` |
| **No README / empty repo** | Placeholder for attack | New package with 0 downloads |
| **Excessive permissions** | postinstall runs arbitrary code | `"postinstall": "curl | sh"` |
| **Single maintainer, no org** | Bus factor = 1, takeover risk | Unmaintained personal project |
| **Version 0.0.x** | Unstable, breaking changes | Not ready for production |
| **Last publish > 2 years** | Abandoned, no security patches | `is-promise` (1 line, 3M downloads) |
| **Huge transitive deps** | Giant attack surface | One util bringing 100+ sub-deps |
| **Native bindings** | Build-time vulnerabilities | `node-gyp` based packages |
| **Filesystem / network access** | Unexpected side effects | Package writes to disk or phones home |

### Quick health check for new dependency

```markdown
Before adding `npm install <package>`:

1. ☐ npm page: weekly downloads > 10K? last publish < 1 year?
2. ☐ GitHub: stars > 100? open issues managed? CI passing?
3. ☐ License: MIT/ISC/BSD/Apache?
4. ☐ Bundle size: acceptable? (bundlephobia.com)
5. ☐ Alternatives: is there a smaller/native option?
6. ☐ Transitive deps: how many sub-dependencies?
```

---

## 5. License Policy

### Allowed licenses (production)

| License | Status | Notes |
|---------|--------|-------|
| MIT | ✅ Allowed | Most permissive |
| ISC | ✅ Allowed | npm default |
| BSD-2-Clause | ✅ Allowed | Permissive |
| BSD-3-Clause | ✅ Allowed | Permissive |
| Apache-2.0 | ✅ Allowed | Patent grant included |
| 0BSD | ✅ Allowed | Public domain equivalent |
| CC0-1.0 | ✅ Allowed | Public domain |
| Unlicense | ⚠️ Review | May have legal ambiguity |
| GPL-2.0 | ❌ Blocked | Copyleft, infectious |
| GPL-3.0 | ❌ Blocked | Copyleft, infectious |
| AGPL-3.0 | ❌ Blocked | Most restrictive copyleft |
| SSPL | ❌ Blocked | MongoDB's copyleft variant |
| UNLICENSED | ❌ Blocked | No license = all rights reserved |

---

## 6. Decision Framework

### Keep vs Remove vs Replace

```
New dependency request:
                          ┌──────────────────────────┐
                          │ Is it actually needed?   │
                          └────┬────────────┬──────────┘
                               │ Yes        │ No
                               ▼            ▼
                          ┌────────┐    REMOVE
                          │ Native │
                          │ API?   │
                          └─┬────┬─┘
                       Yes  │    │ No
                            ▼    ▼
                         REMOVE  ┌────────────┐
                                 │ Audit pass?│
                                 └─┬────────┬─┘
                              Yes  │        │ No
                                   ▼        ▼
                              ┌─────────┐  FIND
                              │ License │  ALTERNATIVE
                              │  OK?    │
                              └─┬─────┬─┘
                             Yes │    │ No
                                 ▼    ▼
                               ADD   FIND
                                     ALTERNATIVE
```

### Alternatives for common packages

| Package | Size | Alternative | Size |
|---------|------|-------------|------|
| `moment` | 290KB | `dayjs` (2KB) or native `Intl` | 0-2KB |
| `lodash` | 530KB | `lodash-es` (tree-shakeable) or native | 0-70KB |
| `axios` | 29KB | native `fetch` | 0KB |
| `uuid` | 18KB | `crypto.randomUUID()` | 0KB |
| `chalk` | 15KB | `picocolors` (2KB) | 2KB |
| `dotenv` | 7KB | native `--env-file` (Node 20.6+) | 0KB |
| `express-validator` | 35KB | `zod` (already in stack) | 0KB extra |

---

## 7. CI Integration

### GitHub Actions

```yaml
dependency-review:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with: { node-version: 20 }

    # Vulnerability check
    - name: npm audit
      run: npm audit --audit-level=high

    # License check
    - name: License compliance
      run: npx license-checker --onlyAllow "MIT;ISC;BSD-2-Clause;BSD-3-Clause;Apache-2.0;0BSD"

    # Unused deps
    - name: Depcheck
      run: npx depcheck --ignores="@types/*,vitest"

    # PR dependency review (for pull requests)
    - name: Dependency Review
      if: github.event_name == 'pull_request'
      uses: actions/dependency-review-action@v4
      with:
        fail-on-severity: high
        deny-licenses: GPL-2.0, GPL-3.0, AGPL-3.0
```

---

## 8. Output Template

```markdown
# Dependency & Supply Chain Review

**Date:** YYYY-MM-DD
**Reviewer:** Reviewer Agent
**Total deps:** production: XX, dev: YY

## Socket.dev Audit
- **Mode:** ✅ Active / ⚠️ **Degraded** (socket-mcp not available)
- Packages scanned: XX
- P0 blockers: Y
- P1 warnings: Z

| Package | supply_chain | vuln | license | quality | maint | Verdict |
|---------|--------------|------|---------|---------|-------|---------|
| `zod@3.22.0` | 0.95 | 0.92 | 1.00 | 0.88 | 0.91 | ✅ OK |
| `event-stream@3.3.6` | 0.10 | 0.05 | 0.85 | 0.40 | 0.20 | 🔴 P0 BLOCK |

## Audit Results
| Check | Result |
|-------|--------|
| npm audit | ✅ No high/critical |
| socket.dev depscore | ✅ All deps pass / 🔴 1 P0 blocker / ⚠️ Degraded |
| License check | ⚠️ 1 GPL package found |
| Unused deps | ✅ All used |
| Outdated (major) | ⚠️ 3 packages behind |

## Findings

| # | Severity | Package | Finding | Action |
|---|----------|---------|---------|--------|
| 1 | 🔴 P0 | `event-stream@3.3.6` | socket.dev: supply_chain=0.10 (known attack) | Remove immediately |
| 2 | 🟠 P1 | `moment@2.29.1` | 290KB, abandoned | Replace with dayjs |
| 3 | 🟠 P1 | `some-lib@0.1.0` | GPL-3.0 license | Replace or get legal approval |
| 4 | 🟡 P2 | `lodash@4.17.21` | Only using `debounce` | Replace with `lodash.debounce` or native |

## New Dependencies (this PR)
| Package | Version | Size | License | Downloads/week | Verdict |
|---------|---------|------|---------|----------------|---------|
| `zod` | 3.22.0 | 13KB | MIT | 8M | ✅ Approved |

## Summary
- P0: X findings (must fix)
- P1: Y findings (should fix)
- P2: Z findings (optional)
- Total bundle impact: +XX KB
```

---

## 9. Socket.dev Integration <a id="9-socket-dev"></a>

### Tool: `depscore`

`@socketsecurity/mcp` exposes **a single** tool — `depscore` — which returns five metrics per package:

| Metric | Meaning |
|--------|---------|
| `supply_chain` | Supply-chain attack risk (typosquatting, malware, maintainer changes, scripts) |
| `vulnerability` | Known CVEs and vulnerabilities |
| `quality` | Code quality, tests, documentation |
| `maintenance` | Maintainer activity, release frequency |
| `license` | License compliance (low = copyleft / unlicensed) |

All metrics are in the range `0.0–1.0`, where `1.0` is perfect.

### Tool call

```javascript
depscore({
  packages: [
    { ecosystem: "npm", depname: "lodash", version: "4.17.21" },
    { ecosystem: "npm", depname: "zod", version: "3.22.0" }
  ]
})
```

Returns lines in the format:
```
pkg:npm/lodash@4.17.21: supply_chain: 0.95, quality: 0.88, maintenance: 0.91, vulnerability: 0.92, license: 1.0
pkg:npm/zod@3.22.0: supply_chain: 0.97, quality: 0.95, maintenance: 0.93, vulnerability: 0.95, license: 1.0
```

### Threshold matrix (action policy)

| Metric | Range | Severity | Action |
|--------|-------|----------|--------|
| `supply_chain` | < 0.50 | 🔴 **P0** | **BLOCK** — escalate to user with metrics |
| `supply_chain` | 0.50 – 0.74 | 🟠 P1 | WARN — require justification |
| `supply_chain` | ≥ 0.75 | ✅ | OK |
| `vulnerability` | < 0.50 | 🔴 **P0** | **BLOCK** |
| `vulnerability` | 0.50 – 0.79 | 🟠 P1 | WARN |
| `vulnerability` | ≥ 0.80 | ✅ | OK |
| `license` | < 0.50 | 🔴 **P0** | **BLOCK** — likely copyleft/unlicensed |
| `license` | ≥ 0.50 | ✅ | OK |
| `quality` | < 0.50 | 🟡 P2 | INFO |
| `maintenance` | < 0.50 | 🟡 P2 | INFO (abandoned) |

### Workflow (agent pseudocode)

```
for each new or updated package (from package.json diff):
  result = depscore({ packages: [{ ecosystem: "npm", depname, version }] })
  metrics = parse(result)

  if metrics.supply_chain < 0.50
     OR metrics.vulnerability < 0.50
     OR metrics.license < 0.50:
    → 🔴 P0 BLOCK
    → escalate to user: "Package X has critical socket.dev alert: <metric>=<value>. Installation blocked. Confirm explicitly to proceed."
    → wait for confirmation

  elif any metric in P1 range:
    → 🟠 P1 WARN
    → add to Findings with "requires justification" note

  else:
    → ✅ OK
    → proceed

record all results in Output Template → Socket.dev Audit table
```

### When to call `depscore`

| Trigger | Caller |
|---------|--------|
| DEV: before `npm install <pkg>` | Senior Full Stack |
| DEV: before `npm update` or major version bump | Senior Full Stack |
| REV: when reviewing PR with `package.json` / `package-lock.json` changes | Reviewer |
| RG: pre-release full audit of all production deps | Reviewer (on Conductor request) |

### Batch optimization

For large diffs (>10 packages) — batch calls into chunks of 10–20 packages per `depscore({ packages: [...] })`. Socket.dev accepts arrays; no need to call one-by-one.

---

## See also
- `$security-review` — application security review
- `$security-baseline-dev` — secure coding patterns
- `$cloud-infrastructure-security` — CI/CD pipeline security
- `$tooling-bun-biome` — package manager setup
- [socket.dev MCP server](https://github.com/SocketDev/socket-mcp) — official repo