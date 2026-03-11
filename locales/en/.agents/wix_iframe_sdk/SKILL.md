---
name: wix_iframe_sdk
description: Practical skill for legacy Wix iFrame SDK (deprecated): finding methods, events, parameters, SDK/Editor limits, and ready Syntax/Example blocks from a full local knowledge base. Use when you need to answer, develop, or migrate code for Wix iFrame SDK, Wix Hive, and deprecated HTTP API.
---

# Skill: Wix-iFrame-SDK

Use this skill as a working reference for deprecated Wix iFrame SDK.

## Scope
- Source of truth: `references/wix-sdk-iframe.md`
- Coverage: `Wix` (main namespace)
- Coverage: `Wix Activities`, `Wix Analytics`, `Wix Billing`, `Wix Contacts`, `Wix Dashboard`, `Wix Data Public`, `Wix Features`, `Wix Preview`, `Wix Settings`, `Wix Pubsub`, `Wix Styles`, `Wix Utils`, `Wix Worker`
- Coverage: `Wix Hive (Deprecated)`
- Coverage: `HTTP API (Deprecated)`

## Workflow
1. Identify request goal: method, event, namespace, migration, version limitation.
2. Find the needed doc/function in `references/wix-sdk-iframe.md`.
3. Extract blocks:
- `Summary`
- `Syntax`
- `Example`
- key `Details` (parameters, return values, limits)
4. If `Example` is missing in source:
- explicitly mark: `Not provided in source section.`
- do not invent pseudo-official examples quoted as docs.
5. If code writing is required:
- rely on found `Syntax` and SDK version/editor support limits,
- add deprecated notice and safe migration path (if applicable).

## Fast Search Patterns
Use targeted search in `references/wix-sdk-iframe.md`:
- By function: `^#### Function .*: <methodName>`
- By doc section: `^## DOC-..:`
- By syntax: `^- Syntax:`
- By example: `^- Example:`
- By limits: `SDK Version`, `Editor Version`, `Deprecated`, `Important`

## Response Rules
- Return answers in this structure:
- `Method/Section`
- `Syntax`
- `Example`
- `Parameters/Notes`
- If the user asks for "as in documentation", use reference text without semantic distortion.
- For conflicts/ambiguities, indicate DOC and function where fragment was found.

## Boundaries
- This is a legacy/deprecated stack. Always explicitly mark deprecated context.
- Do not mix iFrame SDK with modern SDK/REST methods unless migration is explicitly requested.
