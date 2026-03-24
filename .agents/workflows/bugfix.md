---
description: Запуск сокращённого 4-гейтового пайплайна для исправления багов. Используй вместо /start-task для bugfix-задач.
---

# /bugfix — Запуск Bugfix Pipeline (4 гейта)

> 🟢 **Режим:** Bugfix — для исправления багов в существующем функционале.
> Полный пайплайн: `/start-task`. Hotfix (мелочи): `/hotfix`.

## Когда использовать

- Баг в логике, API ошибки, сломанная валидация, проблемы с данными
- Затрагивает > 2 файлов или нетривиальный blast radius
- НЕ меняет UI layout, НЕ добавляет новый API, НЕ меняет схему данных (иначе → `/start-task`)

## Шаг 0: Загрузить правила

Выполни `/pipeline-rules` — прочитай правила ПЕРЕД началом работы.

## Шаг 1: CONDUCTOR — Классификация

1. Выполни `view_file` на `agents/conductor.md`
2. Подтверди что задача = bugfix (по Decision Tree)
3. Создай Mini Checklist:
```
[ ] BF-DEV-01   Fix + TDD + Handoff Envelope
[ ] BF-REV-01   Code review + regression check + Handoff Envelope
[ ] BF-TEST-01  Verification + regression smoke + GO/NO-GO
```
4. `notify_user` → ждать **Approved**

## Шаг 2: DEV — TDD-фикс

1. Выполни `view_file` на `agents/senior_full_stack.md`
2. Пройди протокол (пропуская §1 UX review и §6 DEMO):
   - §0: Context + read skills
   - §2: Analyze bug + root cause
   - §3: RED — написать падающий тест, воспроизводящий баг
   - §4: GREEN — минимальный код для прохождения теста
   - §5: REFACTOR — улучшить без изменения поведения
   - §7: JSDoc на изменённых функциях
3. Перезапустить затронутые сервисы (если применимо)
4. Сформировать Handoff Envelope → REV
5. `notify_user` → ждать **Approved**

## Шаг 3: REV — Code Review

1. Выполни `view_file` на `agents/reviewer.md`
2. Фокус ревью:
   - Тест действительно воспроизводит баг (RED-фаза)?
   - Фикс не создаёт побочных эффектов?
   - Regression risk оценён?
   - JSDoc на месте?
3. Сформировать Handoff Envelope → TEST
4. `notify_user` → ждать **Approved**

## Шаг 4: TEST — Верификация

1. Выполни `view_file` на `agents/tester.md`
2. Проверить:
   - Баг исправлен (по шагам воспроизведения)
   - Регрессии нет (smoke по затронутым модулям)
   - Тесты проходят (CI green)
3. Вынести вердикт: **GO ✅ / NO-GO ❌**
4. `notify_user` → ждать **Approved**

---

## При FAIL на REV или TEST

1. Агент выдаёт FAIL Report + Handoff → DEV
2. DEV исправляет → Handoff → REV → TEST (повтор цикла)
3. Approved на каждом гейте обязателен

---

## Шаблон промпта

```
@AGENTS.md /bugfix

Баг: [описание бага, 1-2 предложения].
Воспроизведение: [шаги, если известны].
Файлы: [затронутые файлы, если известны].

Правила:
1. Bugfix Pipeline: CONDUCTOR → DEV → REV → TEST
2. TDD обязательно (RED → GREEN → REFACTOR)
3. Approved на каждом гейте
```
