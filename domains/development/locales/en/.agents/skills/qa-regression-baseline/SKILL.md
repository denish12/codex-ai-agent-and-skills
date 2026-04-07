---
name: qa-regression-baseline
description: >
  Run regression tests against a saved baseline and report differences. Use this skill whenever
  the user wants to: run regression tests, compare test results to a previous run, detect regressions
  in code or software, update a baseline after verified changes, generate a diff report between
  test runs, or check if recent changes broke anything. Trigger on phrases like "запусти регрессию",
  "сравни с baseline", "проверь регрессии", "обнови baseline", "run regression", "compare with baseline",
  "check for regressions", "regression report", "что сломалось", or any similar intent to test code
  stability against a known-good reference point.
---

# QA Regression Baseline Skill

This skill helps run regression tests, save baseline results, and detect regressions by comparing the current run with a saved standard.

---

## Concept

```
Baseline (standard)      Current run
      │                       │
      └──────── diff ──────────┘
                  │
            Regressions / improvements / no changes
```

- **Baseline** — saved results of a previous "good" run
- **Regression** — a test that previously passed, but now fails (or got worse)
- **Improvement** — a test that previously failed, but now passes

---

## Workflow

### Step 1. Understand the context

First, find out from the user (or from the conversation context):

1. **What are we testing?** — project path, language/framework, command to run tests
2. **Is there a baseline already?** — if not, suggest creating one
3. **Results format** — JSON, JUnit XML, text logs, snapshots
4. **What to do with discrepancies?** — report only / block / update baseline

If the user didn't specify the format — determine it yourself by file extensions or log structure.

---

### Step 2. Determine baseline format

Supported formats (read `references/formats.md` if necessary):

| Format | Typical files | Frameworks |
|--------|---------------|------------|
| JSON | `baseline.json`, `results.json` | Universal |
| JUnit XML | `*.xml` in `test-results/` | pytest, Jest, Maven |
| Snapshot | `__snapshots__/*.snap` | Jest, Vitest |
| Plain text | `*.log`, `*.txt` | Any |
| CSV | `results.csv` | Custom scripts |

---

### Step 3. Run tests

If the user asks to run tests — use bash:

```bash
# Python / pytest
pytest --tb=short -q 2>&1 | tee current_run.log
pytest --junit-xml=current_results.xml

# Node.js / Jest
npx jest --json --outputFile=current_results.json 2>&1

# Universal — run whatever the user specified
<command from config or user message>
```

Save the output to a file `current_run_<timestamp>.log` or `current_results.json`.

---

### Step 4. Compare with baseline

Use the `scripts/compare.py` script for comparison. If the baseline does not exist — suggest creating it from the current run.

```bash
python scripts/compare.py \
  --baseline baseline/results.json \
  --current current_results.json \
  --format json \
  --output report.md
```

The script can work with JSON, JUnit XML, and plain text logs.

**If baseline does not exist:**
```bash
python scripts/compare.py --create-baseline \
  --source current_results.json \
  --output baseline/results.json
```

---

### Step 5. Generate report

The report should contain:

```
## Regression Report — <date/time>

### Summary
- ✅ Passed: N
- ❌ Failed: N
- 🔴 Regressions (was OK → now FAIL): N
- 🟢 Fixed (was FAIL → now OK): N
- ➖ No changes: N

### 🔴 Regressions (critical!)
| Test | Status before | Status now | Details |
|------|--------------|--------------|--------|
| test_login | PASS | FAIL | AssertionError: ... |

### 🟢 Fixed tests
| Test | Before | Now |
|------|--------|--------|

### ℹ️ New tests (not in baseline)
| Test | Status |
|------|--------|
```

---

### Step 6. Decide what to do with the baseline

After analysis, suggest to the user:

- **If no regressions** → suggest updating baseline (`--update-baseline`)
- **If there are regressions** → show detailed diff, do not update automatically
- **If user confirmed changes** → update baseline with a comment

```bash
# Update baseline (only after explicit user confirmation)
cp current_results.json baseline/results.json
echo "$(date): Updated baseline — <reason>" >> baseline/CHANGELOG.md
```

---

## Project File Structure

Recommended structure for storing baselines in a project:

```
project/
├── baseline/
│   ├── results.json        # Reference results
│   ├── CHANGELOG.md        # Baseline update history
│   └── config.json         # Configuration (what to compare, tolerances)
├── test-results/
│   └── current_run.json    # Results of the latest run
└── qa_config.yaml          # Skill config (optional)
```

---

## Configuration File (qa_config.yaml)

If there's a `qa_config.yaml` in the project — read it first:

```yaml
test_command: "pytest --junit-xml=test-results/current.xml"
baseline_path: "baseline/results.json"
result_format: "junit_xml"   # json | junit_xml | snapshot | text
on_regression: "report"      # report | fail | notify
ignore_tests:                # tests that are always flaky
  - "test_flaky_network"
tolerance:                   # allowed deviations (for performance tests)
  duration_ms: 200
```

---

## Special Cases

### Flaky tests
If a test fails irregularly — add it to `ignore_tests` in the config or mark it in the report as "flaky, non-blocking".

### Performance regressions
If tests include time measurements — compare with a tolerance. Read `references/performance.md` for details.

### Snapshot tests (Jest/Vitest)
When updating snapshots, use `jest --updateSnapshot` only after reviewing the diff. Never update automatically without confirmation.

---

## Common user commands and what to do

| Phrase | Action |
|-------|---------|
| "запусти регрессию" (run regression) | Steps 3 → 4 → 5 |
| "создай baseline" (create baseline) | Run tests, save as baseline |
| "обнови baseline" (update baseline) | Only after explicit confirmation, Step 6 |
| "покажи что сломалось" (show what broke) | Step 4 → 5, focus on regressions |
| "сравни прогоны" (compare runs) | Step 4 with two passed files |
| "есть ли регрессии?" (any regressions?) | Steps 3 → 4 → 5 |

---

## Links to additional materials

- `references/formats.md` — detailed format schemas (JSON, JUnit XML, snapshot)
- `references/performance.md` — comparison of performance metrics with tolerances
- `scripts/compare.py` — main comparison script (read before running if customization is needed)
