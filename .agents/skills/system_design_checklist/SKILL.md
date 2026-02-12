---
name: system_design_checklist
description: Чек-лист системного дизайна: функциональные/нефункциональные требования, техдизайн, операции (деплой/мониторинг/backup/rollback), чтобы ничего не забыть.
---

# Skill: System Design Checklist

## Цель
Самопроверка полноты архитектуры перед передачей в разработку.

## Checklist

### Functional Requirements
- [ ] User stories документированы
- [ ] UI/UX flows промаплены
- [ ] API контракты определены
- [ ] Data models определены

### Non-Functional Requirements
- [ ] Performance targets (latency/throughput) определены
- [ ] Scalability требования описаны
- [ ] Security требования идентифицированы
- [ ] Availability targets (uptime %) определены

### Technical Design
- [ ] Архитектурная диаграмма (текстовая) создана
- [ ] Ответственности компонентов определены
- [ ] Data flow документирован
- [ ] Integration points идентифицированы
- [ ] Error handling стратегия определена
- [ ] Testing strategy запланирована (unit/integration, границы)

### Operations
- [ ] Deployment стратегия определена
- [ ] Monitoring/alerting запланированы
- [ ] Backup/recovery стратегия описана (если есть БД)
- [ ] Rollback plan документирован

### Red Flags Check
- [ ] Нет Big Ball of Mud
- [ ] Нет God Object
- [ ] Нет Tight Coupling
- [ ] Нет “Magic” поведения без документации
- [ ] Нет analysis paralysis (есть MVP путь)

## Выход
- Список “PASS”
- Список “MISSING” с рекомендациями и ARCH-xx задачами
