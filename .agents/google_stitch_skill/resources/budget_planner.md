# Stitch Generation Budget Planner

## Месячные лимиты

| Режим | Лимит | Средний расход на экран | Экранов в месяц |
|-------|-------|------------------------|-----------------|
| Standard (Flash) | ~350 | 3–6 генераций | ~60–115 экранов |
| Experimental (Pro) | ~50 | 3–5 генераций | ~10–16 экранов |

## Рекомендуемое распределение для SCR

| Задача | Режим | Генерации | Примечание |
|--------|-------|-----------|------------|
| Новый popup template (1 шт.) | Standard | ~5 | Начальная + 2 итерации + 2 состояния |
| Финальная версия popup | Experimental | ~3 | С HTML-референсом на входе |
| Dashboard page (1 шт.) | Standard | ~8 | Сложнее popup, больше итераций |
| State coverage (4 состояния) | Standard | ~8 | 4 × (1 генерация + 1 итерация) |

## Стратегия экономии

1. **Standard first, Experimental last** — черновики на Flash, финал на Pro
2. **Сохраняй промпты** — повторная генерация с тем же промптом = предсказуемый результат
3. **Batch states** — генерируй все состояния одного экрана за одну сессию
4. **Reuse style block** — копируй block стиля между промптами для консистентности

## Шаблон style-блока для SCR (copy-paste в каждый промпт)

```
Style block (paste into every SCR prompt):
Font: Inter 14px body / 24px headline / 12px caption.
Border-radius: 12px cards, 8px buttons, 24px popup container.
Spacing: 8px grid. Colors: primary #4361EE, surface #FAFAFA,
dark #1A1A2E, error #FF4D4F, success #22C55E.
No stock illustrations. Subtle box-shadows.
```
