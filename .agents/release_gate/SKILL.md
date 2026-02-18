---
name: release_gate
description: Финальный релиз-гейт: собрать отчёты Reviewer+Tester+CI, проверить DoD, классифицировать риски, принять решение GO/NO-GO и сформировать план закрытия.
---

# Skill: Release Gate

## Цель
Принять решение о релизе (GO/NO-GO) на основе DoD, отчётов ревью/тестирования и состояния CI/CD.

## Обязательное условие
Перед запуском релиз-гейта дирижёр должен сгенерировать чек-лист через: $release_gate_checklist_template

## Входы
- Отчёт Reviewer (P0/P1/P2 + suggested fixes)
- Отчёт Tester (PASS/FAIL/BLOCKED + баги P0/P1/P2 + evidence)
- CI результаты (unit/integration, lint/format, security/dependency checks если есть)
- Release notes / список изменений (что релизим)
- Общий DoD
- Release Gate Checklist (RG-01…RG-xx) со статусами

## Release Criteria (строго)
### NO-GO (релиз запрещён)
- Есть **P0** от Reviewer или Tester
- Unit или Integration tests НЕ проходят
- Есть риск утечки секретов/PII в коде/логах
- Нет инструкций запуска/проверки (runbook) для изменений
- Критичный UX flow сломан или заблокирован (BLOCKED без обхода)
- Несоответствие API контрактам, ломающее клиента (P0)

### GO с условиями (допускается только если заранее согласовано)
- Есть P1/P2, но:
  - есть workaround/митигирующие меры,
  - есть заведённые задачи с приоритетом и владельцем,
  - риск описан и принят.

## DoD Checklist (обязательный)
- [ ] Unit tests проходят
- [ ] Integration tests проходят
- [ ] Секреты не попадают в код/логи
- [ ] Есть инструкции запуска/проверки (локально/CI)
- [ ] Базовая безопасность: валидация ввода, авторизация, гигиена зависимостей

## Процесс (шаги)
1) Убедись, что создан RG checklist ($release_gate_checklist_template) и проставлены статусы.
2) Собери входные артефакты: Reviewer report, Tester report, CI status.
3) Сведи Findings в единый список: P0/P1/P2, owner, task link, status.
4) Прогони DoD checklist и отметь PASS/MISSING.
5) Прими решение GO/NO-GO (или GO-with-conditions если используется).
6) Сформируй Release Report и обнови RG-22 (Decision).

## Выход: Release Report (шаблон)
### Release Decision
- Decision: GO / NO-GO / GO-with-conditions
- Version/Tag: <если есть>
- Scope: <кратко что релизим>

### Evidence
- CI: PASS/FAIL (ссылка/коммит)
- Reviewer: PASS/MISSING + P0/P1/P2 count
- Tester: PASS/FAIL/BLOCKED + баги P0/P1/P2 count

### DoD Status
- Checklist: PASS/MISSING (со списком missing)

### Blocking Issues (если NO-GO)
- [ ] ID / Описание / Владелец / Как воспроизвести / Fix plan

### Accepted Risks (если GO-with-conditions)
- Риск → влияние → mitigation → owner → дедлайн

### Next Actions
- RG-01 ...
- RG-02 ...

## См. также
- Шаблон чек-листа: $release_gate_checklist_template
