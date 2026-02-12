---
name: qa_api_contract_tests
description: Проверить API на соответствие контрактам: схемы, коды, ошибки, валидация, пагинация; smoke через Postman/curl/скрипты.
---

# Skill: QA API Contract Tests

## Проверить
- Endpoints соответствуют method/path
- Status codes (200/201/204/400/401/403/404/409/422/500) по контракту
- Единый формат ошибок (error_code/message)
- Валидация (422/400) на некорректных данных
- Пагинация/фильтры/сортировка (если в UX/контракте)

## Выход
- Таблица проверок: endpoint → PASS/FAIL → заметки
