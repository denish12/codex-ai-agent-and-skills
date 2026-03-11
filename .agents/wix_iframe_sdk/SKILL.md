---
name: wix_iframe_sdk
description: Практический skill по legacy Wix iFrame SDK (deprecated): поиск методов, событий, параметров, ограничений SDK/Editor и готовых Syntax/Example блоков из полной локальной базы. Использовать, когда нужно отвечать/разрабатывать/мигрировать код для Wix iFrame SDK, Wix Hive и deprecated HTTP API.
---

# Skill: Wix-iFrame-SDK

Используй этот skill как рабочий справочник по deprecated Wix iFrame SDK.

## Scope
- Источник истины: `references/wix-sdk-iframe.md`
- Покрытие: `Wix` (основной namespace)
- Покрытие: `Wix Activities`, `Wix Analytics`, `Wix Billing`, `Wix Contacts`, `Wix Dashboard`, `Wix Data Public`, `Wix Features`, `Wix Preview`, `Wix Settings`, `Wix Pubsub`, `Wix Styles`, `Wix Utils`, `Wix Worker`
- Покрытие: `Wix Hive (Deprecated)`
- Покрытие: `HTTP API (Deprecated)`

## Workflow
1. Определи цель запроса: метод, событие, namespace, миграция, ограничение версии.
2. Найди нужный документ/функцию в `references/wix-sdk-iframe.md`.
3. Вытащи блоки:
- `Summary`
- `Syntax`
- `Example`
- ключевые `Details` (параметры, return, ограничения)
4. Если `Example` отсутствует в источнике:
- явно отметь: `Not provided in source section.`
- не придумывай псевдо-официальный пример как цитату из доки.
5. Если нужно написать код:
- опирайся на найденный `Syntax` и ограничения SDK version/editor support
- добавляй пометку deprecated и безопасный путь миграции (если применимо)

## Fast Search Patterns
Используй точечный поиск в `references/wix-sdk-iframe.md`:
- По функции: `^#### Function .*: <methodName>`
- По секции документа: `^## DOC-..:`
- По синтаксису: `^- Syntax:`
- По примеру: `^- Example:`
- По ограничениям: `SDK Version`, `Editor Version`, `Deprecated`, `Important`

## Response Rules
- Отдавай ответ структурой:
- `Method/Section`
- `Syntax`
- `Example`
- `Parameters/Notes`
- Если пользователь просит “как в документации”, используй текст из reference без искажения смысла.
- Для конфликтов/неясностей указывай, в каком DOC и функции найден фрагмент.

## Boundaries
- Это legacy/deprecated стек. Всегда явно отмечай deprecated-контекст.
- Не смешивай iFrame SDK с современными SDK/REST методами без явного указания на миграцию.
