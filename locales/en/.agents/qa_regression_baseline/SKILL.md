---
name: qa_regression_baseline
description: >
  Run regression tests against a saved baseline and report differences. Use this skill whenever
  the user wants to: run regression tests, compare test results to a previous run, detect regressions
  in code or software, update a baseline after verified changes, generate a diff report between
  test runs, or check if recent changes broke anything. Trigger on phrases like "run regression",
  "compare with baseline", "check regressions", "update baseline", "run regression", "compare with baseline",
  "check for regressions", "regression report", "what broke", or any similar intent to test code
  stability against a known-good reference point.
---

# QA Regression Baseline Skill

This skill helps run regression tests, save baseline results, and identify regressions by comparing the current run with the saved baseline.

---

## Concept

```
Baseline (reference)        Current run
      │                       │
      └──────── diff ──────────┘
                  │
            Regressions / improvements / without changes
```

- **Baseline** — saved results previous «good» run
- **Regression** ? a test that passed earlier and now fails (or got worse)
- **Improvement** ? a test that failed earlier and now passes

---

## Workflow

### Step 1. Understand context

First clarify with the user (or from the conversation context):

1. **What are we testing?** ? project path, language/framework, team test startup
2. **Is there already a baseline?** ? if no, propose creating it
3. **Result format** ? JSON, JUnit XML, text logs, snapshots
4. **What to do with mismatches?** — only report / block / update baseline

If the user did not specify the format ? determine it yourself by file extension or structured logs.

---

### Step 2. Determine format baseline

Support form (read `references/formats.md` with need):

| Format | Typical files | Frameworks |
|--------|---------------|------------|
| JSON | `baseline.json`, `results.json` | Universal |
| JUnit XML | `*.xml` in `test-results/` | pytest, Jest, Maven |
| Snapshot | `__snapshots__/*.snap` | Jest, Vitest |
| Plain text | `*.log`, `*.txt` | Any |
| CSV | `results.csv` | Custom scripts |

---

### Step 3. Run tests

If user asks run tests — use bash:

```bash
# Python / pytest
pytest --tb=short -q 2>&1 | tee current_run.log
pytest --junit-xml=current_results.xml

# Node.js / Jest
npx jest --json --outputFile=current_results.json 2>&1

# Universal — run that, what specified user
<team from config or messages user>
```

Save output to `current_run_<timestamp>.log` or `current_results.json`.

---

### Step 4. Compare with baseline

Use script `scripts/compare.py` for compare. If baseline not exists — propose creating it it from current run.

```bash
python scripts/compare.py \
  --baseline baseline/results.json \
  --current current_results.json \
  --format json \
  --output report.md
```

The script can work with JSON, JUnit XML, and plain-text logs.

**If baseline not exists:**
```bash
python scripts/compare.py --create-baseline \
  --source current_results.json \
  --output baseline/results.json
```

---

### Step 5. Form report

Report must contain:

```
## Regression Report ? <date/time>

### Result
- ✅ Went: N
- ? Failed: N
- 🔴 Regressions (was OK → became FAIL): N
- 🟢 Fix (was FAIL → became OK): N
- ➖ Without changes: N

### 🔴 Regressions (critical!)
| Test | Status earlier | Status now | Details |
|------|--------------|--------------|--------|
| test_login | PASS | FAIL | AssertionError: ... |

### 🟢 Fix tests
| Test | Earlier | Now |
|------|--------|--------|

### ℹ️ New tests (not was in baseline)
| Test | Status |
|------|--------|
```

---

### Step 6. Decide what to do with the baseline

After analysis propose to the user:

- **If there are no regressions** ? propose updating the baseline (`--update-baseline`)
- **If is regressions** → show detail diff, not update automatically
- **If the user confirmed the changes** ? update the baseline with a comment

```bash
# Update baseline (only after explicit confirmation user)
cp current_results.json baseline/results.json
echo "$(date): Updated baseline — <cause>" >> baseline/CHANGELOG.md
```

---

## File structure of the project

Recommended structure for storing baselines in the project:

```
project/
├── baseline/
│   ├── results.json        # Reference results
│   ├── CHANGELOG.md        # History update baseline
?   ??? config.json         # Configuration (what to compare, tolerances)
├── test-results/
│   └── current_run.json    # Results last run
??? qa_config.yaml          # Skill config (optional)
```

---

## Config file (qa_config.yaml)

If the project contains `qa_config.yaml` ? read it first:

```yaml
test_command: "pytest --junit-xml=test-results/current.xml"
baseline_path: "baseline/results.json"
result_format: "junit_xml"   # json | junit_xml | snapshot | text
on_regression: "report"      # report | fail | notify
ignore_tests:                # tests that are always unstable
  - "test_flaky_network"
tolerance:                   # allowed deviation (for performance tests)
  duration_ms: 200
```

---

## Special cases

### Unstable (flaky) tests
If a test fails irregularly ? add it to `ignore_tests` in the config or mark it in the report as "flaky, does not block".

### Performance regressions
If tests include time measurements ? compare with a tolerance. Read `references/performance.md` for details.

### Snapshot-tests (Jest/Vitest)
When updating snapshots use `jest --updateSnapshot` only after reviewing the diff. Never update automatically without confirmation.

---

## Common commands user and what do

| Phrase | Action |
|-------|---------|
| "run regression" | Steps 3 → 4 → 5 |
| "create baseline" | Run tests, save how baseline |
| "update baseline" | Only after explicit confirmation, Step 6 |
| "show what broke" | Step 4 ? 5, focus on regressions |
| "compare runs" | Step 4 with two provided files |
| "is there regressions?" | Steps 3 → 4 → 5 |

---

## Links to additional materials

- `references/formats.md` — detail schemas form (JSON, JUnit XML, snapshot)
- `references/performance.md` ? comparison of performance metrics with tolerances
- `scripts/compare.py` ? main comparison script (read before running if customization is needed)
