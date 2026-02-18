---
name: release_gate_checklist_template
description: Генерирует перед релизом видимый чек-лист RG-01…RG-xx (Evidence/DoD/Security/Ops/Post-deploy/Rollback) и правила статусов.
---

# Skill: Release Gate Checklist Template (RG-01…RG-xx)

## Цель
Перед каждым релизом создать **одинаковый** релизный чек-лист, чтобы дирижёр мог:
- собрать доказательства (reports/CI),
- проверить DoD,
- зафиксировать риски,
- выполнить post-deploy smoke,
- обеспечить rollback plan.

## Когда использовать
- Каждый раз перед финальным решением о релизе (Release Gate).

## Входы
- Scope релиза (что релизим)
- Версия/тег/коммит (если есть)
- Ссылки на окружения (staging/prod) при наличии

## Выход
- Видимый checklist **RG-01…RG-xx** со статусами:
  - TODO / IN-PROGRESS / BLOCKED / DONE
- Краткая секция Evidence (ссылки/коммиты)
- Мини-итог “Что ещё нужно закрыть до GO”

## Шаблон (создавать как есть)
### Release Gate Checklist
- [ ] RG-01 (Evidence) Указать scope релиза + версия/тег/коммит
- [ ] RG-02 (Evidence) CI зелёный: unit tests PASS
- [ ] RG-03 (Evidence) CI зелёный: integration tests PASS
- [ ] RG-04 (Evidence) Lint/format PASS (если есть в CI)
- [ ] RG-05 (Evidence) Dependency/SCA audit PASS или риски зафиксированы
- [ ] RG-06 (Evidence) Reviewer report получен (P0=0) + ссылка на отчёт
- [ ] RG-07 (Evidence) Tester report получен (P0=0) + PASS/FAIL/BLOCKED + ссылка

- [ ] RG-08 (DoD) Секреты не попали в код/логи (проверки/скан/ручная верификация)
- [ ] RG-09 (DoD) Есть инструкции запуска/проверки (runbook) актуальные
- [ ] RG-10 (DoD) Базовая безопасность подтверждена: input validation + authz + hygiene

- [ ] RG-11 (Contracts) API соответствует контрактам (коды/форматы ошибок/валидация)
- [ ] RG-12 (Data) Миграции/изменения данных: план применений + обратимость (если есть)
- [ ] RG-13 (Ops) Observability: request_id/trace_id и безопасные логи (без PII/секретов)
- [ ] RG-14 (Ops) Rate limiting / WAF / security headers (если применимо и предусмотрено)

- [ ] RG-15 (Release) Release notes/изменения подготовлены
- [ ] RG-16 (Release) Feature flags/rollout стратегия (если используется) определена
- [ ] RG-17 (Rollback) Rollback plan описан и понятен
- [ ] RG-18 (Rollback) Backup/restore требования выполнены (если есть БД/критичные данные)

- [ ] RG-19 (Post-deploy) Smoke test сценарии определены (минимум P0 flows)
- [ ] RG-20 (Post-deploy) Smoke test выполнен на целевом окружении (PASS)
- [ ] RG-21 (Post-deploy) Мониторинг/алерты проверены (ошибки/latency)

- [ ] RG-22 (Decision) Итоговое решение: GO / NO-GO (+ причины и условия)

## Правила статусов
- Если любой пункт RG-02/03/06/07/08/09/10 провален → ставить BLOCKED и релиз = NO-GO.
- P0 из Reviewer или Tester → BLOCKED и релиз = NO-GO.
- P1 допускаются только при явном “Accepted Risks” с owner+deadline.

## Формат ответа
### Release Gate Checklist (RG-xx) — со статусами
### Evidence Links
### What’s Missing to GO
