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

Этот скил помогает запускать регрессионные тесты, сохранять baseline результаты и выявлять регрессии при сравнении текущего прогона с сохранённым эталоном.

---

## Концепция

```
Baseline (эталон)        Текущий прогон
      │                       │
      └──────── diff ──────────┘
                  │
            Регрессии / улучшения / без изменений
```

- **Baseline** — сохранённые результаты предыдущего «хорошего» прогона
- **Регрессия** — тест, который раньше проходил, а сейчас падает (или ухудшился)
- **Улучшение** — тест, который раньше падал, а сейчас проходит

---

## Workflow

### Шаг 1. Понять контекст

Сначала выясни у пользователя (или из контекста разговора):

1. **Что тестируем?** — путь к проекту, язык/фреймворк, команда запуска тестов
2. **Есть ли уже baseline?** — если нет, предложи создать
3. **Формат результатов** — JSON, JUnit XML, текстовые логи, снапшоты
4. **Что делать с расхождениями?** — только отчёт / блокировать / обновить baseline

Если пользователь не указал формат — определи его сам по расширению файлов или структуре логов.

---

### Шаг 2. Определить формат baseline

Поддерживаемые форматы (читай `references/formats.md` при необходимости):

| Формат | Типичные файлы | Фреймворки |
|--------|---------------|------------|
| JSON | `baseline.json`, `results.json` | Универсальный |
| JUnit XML | `*.xml` в `test-results/` | pytest, Jest, Maven |
| Snapshot | `__snapshots__/*.snap` | Jest, Vitest |
| Plain text | `*.log`, `*.txt` | Любой |
| CSV | `results.csv` | Кастомные скрипты |

---

### Шаг 3. Запустить тесты

Если пользователь просит запустить тесты — используй bash:

```bash
# Python / pytest
pytest --tb=short -q 2>&1 | tee current_run.log
pytest --junit-xml=current_results.xml

# Node.js / Jest
npx jest --json --outputFile=current_results.json 2>&1

# Универсально — запусти то, что указал пользователь
<команда из конфига или сообщения пользователя>
```

Сохрани вывод в файл `current_run_<timestamp>.log` или `current_results.json`.

---

### Шаг 4. Сравнить с baseline

Используй скрипт `scripts/compare.py` для сравнения. Если baseline не существует — предложи создать его из текущего прогона.

```bash
python scripts/compare.py \
  --baseline baseline/results.json \
  --current current_results.json \
  --format json \
  --output report.md
```

Скрипт умеет работать с JSON, JUnit XML и plain text логами.

**Если baseline не существует:**
```bash
python scripts/compare.py --create-baseline \
  --source current_results.json \
  --output baseline/results.json
```

---

### Шаг 5. Сформировать отчёт

Отчёт должен содержать:

```
## Regression Report — <дата/время>

### Итог
- ✅ Прошло: N
- ❌ Упало: N
- 🔴 Регрессии (было OK → стало FAIL): N
- 🟢 Исправлено (было FAIL → стало OK): N
- ➖ Без изменений: N

### 🔴 Регрессии (критично!)
| Тест | Статус раньше | Статус сейчас | Детали |
|------|--------------|--------------|--------|
| test_login | PASS | FAIL | AssertionError: ... |

### 🟢 Исправленные тесты
| Тест | Раньше | Сейчас |
|------|--------|--------|

### ℹ️ Новые тесты (не было в baseline)
| Тест | Статус |
|------|--------|
```

---

### Шаг 6. Решить что делать с baseline

После анализа предложи пользователю:

- **Если регрессий нет** → предложи обновить baseline (`--update-baseline`)
- **Если есть регрессии** → показать детальный diff, не обновлять автоматически
- **Если пользователь подтвердил изменения** → обновить baseline с комментарием

```bash
# Обновить baseline (только после явного подтверждения пользователя)
cp current_results.json baseline/results.json
echo "$(date): Updated baseline — <причина>" >> baseline/CHANGELOG.md
```

---

## Файловая структура проекта

Рекомендуемая структура для хранения baseline в проекте:

```
project/
├── baseline/
│   ├── results.json        # Эталонные результаты
│   ├── CHANGELOG.md        # История обновлений baseline
│   └── config.json         # Конфигурация (что сравнивать, допуски)
├── test-results/
│   └── current_run.json    # Результаты последнего прогона
└── qa_config.yaml          # Конфиг скила (опционально)
```

---

## Конфигурационный файл (qa_config.yaml)

Если в проекте есть `qa_config.yaml` — прочитай его первым делом:

```yaml
test_command: "pytest --junit-xml=test-results/current.xml"
baseline_path: "baseline/results.json"
result_format: "junit_xml"   # json | junit_xml | snapshot | text
on_regression: "report"      # report | fail | notify
ignore_tests:                # тесты которые всегда нестабильны
  - "test_flaky_network"
tolerance:                   # допустимые отклонения (для перфоманс-тестов)
  duration_ms: 200
```

---

## Специальные случаи

### Нестабильные (flaky) тесты
Если тест падает нерегулярно — добавь его в `ignore_tests` в конфиге или отметь в отчёте как "flaky, не блокирует".

### Перфоманс-регрессии
Если тесты включают замеры времени — сравнивай с допуском (tolerance). Читай `references/performance.md` для деталей.

### Snapshot-тесты (Jest/Vitest)
При обновлении снапшотов используй `jest --updateSnapshot` только после ревью diff. Никогда не обновляй автоматически без подтверждения.

---

## Частые команды пользователя и что делать

| Фраза | Действие |
|-------|---------|
| "запусти регрессию" | Шаги 3 → 4 → 5 |
| "создай baseline" | Запустить тесты, сохранить как baseline |
| "обнови baseline" | Только после явного подтверждения, Шаг 6 |
| "покажи что сломалось" | Шаг 4 → 5, акцент на регрессиях |
| "сравни прогоны" | Шаг 4 с двумя переданными файлами |
| "есть ли регрессии?" | Шаги 3 → 4 → 5 |

---

## Ссылки на доп. материалы

- `references/formats.md` — детальные схемы форматов (JSON, JUnit XML, snapshot)
- `references/performance.md` — сравнение перфоманс-метрик с допусками
- `scripts/compare.py` — основной скрипт сравнения (читай перед запуском если нужна кастомизация)
