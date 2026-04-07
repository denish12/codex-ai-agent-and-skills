---
name: wix-iframe-sdk
description: Practical skill on legacy Wix iFrame SDK (deprecated) — search for methods, events, parameters, SDK/Editor limitations, and ready-made Syntax/Example blocks from the complete local database. Use when you need to answer/develop/migrate code for Wix iFrame SDK, Wix Hive, and deprecated HTTP API.
---

# Skill: Wix iFrame SDK

Working reference for the deprecated Wix iFrame SDK with a complete offline database (9300+ lines).

**Sections:**
1. [Scope and Reference](#1-scope)
2. [Workflow](#2-workflow)
3. [Fast Search](#3-fast-search)
4. [Cheat Sheet: Top Methods](#4-cheat-sheet)
5. [Output Template](#5-output-template)
6. [Migration Table](#6-migration-table)
7. [Response Rules](#7-response-rules)
8. [Boundaries](#8-boundaries)

---

## 1. Scope

### Reference file
- **Source of truth:** `references/wix-sdk-iframe.md` (427KB, 9312 lines)
- **Structure:** 22 DOC sections, each containing numbered Functions with Summary/Syntax/Example/Details

### Namespaces covered

| # | Namespace | DOC | Key Methods |
|---|-----------|-----|-------------|
| 01 | Using the SDK | DOC-01 | Setup, versions |
| 02 | **Wix** (core) | DOC-02 | addEventListener, resizeWindow, getSiteInfo, navigateTo, openModal |
| 03 | Wix.Activities | DOC-03 | postActivity |
| 04 | Wix.Analytics | DOC-04 | reportEvent |
| 05 | Wix.Billing | DOC-05 | openBillingPage |
| 06 | Wix.Contacts | DOC-06 | getSiteMembers |
| 07 | **Wix.Dashboard** | DOC-07 | getEditorUrl, openMediaDialog |
| 08 | Wix.Data.Public | DOC-08 | getAll, set, remove |
| 09 | Wix.Features | DOC-09 | isSupported |
| 10 | Wix.Preview | DOC-10 | Preview-specific calls |
| 11 | **Wix.Settings** | DOC-11 | getSiteColors, getStyleParams, triggerSettingsUpdated, refreshAppByCompIds |
| 12 | Wix.PubSub | DOC-12 | publish, subscribe |
| 13 | **Wix.Styles** | DOC-13 | getStyleParams, getSiteColors, getSiteTextPresets |
| 14 | **Wix.Utils** | DOC-14 | getInstanceId, getOrigCompId, getCompId, getViewMode, getLocale, getDeviceType |
| 15 | Wix.Worker | DOC-15 | Worker-specific calls |
| 16-17 | Wix Hive (Deprecated) | DOC-16/17 | Introduction |
| 18 | Hive Activities | DOC-18 | Activity types |
| 19-22 | HTTP API (Deprecated) | DOC-19..22 | In-App Purchases, Contacts, Activities |

---

## 2. Workflow

```
1. Determine the goal of the request:
   □ Find a method/event
   □ Understand parameters/return value
   □ Find an integration example
   □ Determine compatibility (SDK/Editor version)
   □ Migration → modern API

2. Find in reference (grep_search or view_file):
   → references/wix-sdk-iframe.md

3. Extract blocks:
   → Summary
   → Syntax
   → Example
   → Parameters / Return / Limitations

4. If Example is missing:
   → Explicitly tell: "Not provided in source section."
   → DO NOT invent examples pretending they are quotes from the documentation
   → You can write your own, but mark it: "Implementation example (not from docs):"

5. If you need to write code:
   → Rely on Syntax + limitations
   → Add ⚠️ DEPRECATED mark
   → Propose migration (see Migration Table)
```

---

## 3. Fast Search

### Grep patterns for searching in reference file

```bash
# Find DOC section (namespace)
grep_search: Query="## DOC-11:" → Wix.Settings

# Find function by name
grep_search: Query="getSiteColors"

# Find all Function headers in namespace
grep_search: Query="#### Function" (in specific DOC section)

# Find Syntax block
grep_search: Query="- Syntax:"

# Find Example block
grep_search: Query="- Example:"

# Find SDK version requirement
grep_search: Query="SDK Version"

# Find deprecated warnings
grep_search: Query="Deprecated"
```

### Search example in action

```
Task: Find how Wix.Settings.getSiteColors works

1. grep_search → Query="getSiteColors", SearchPath="references/wix-sdk-iframe.md"
   → Find line number

2. view_file → StartLine, EndLine (Function block ~30–50 lines)
   → Get Summary, Syntax, Example, Parameters

3. Form response according to Output Template (section 5)
```

---

## 4. Cheat Sheet: Top Methods

### Wix (core) — most used

| Method | What it does | SDK |
|--------|-----------|-----|
| `Wix.addEventListener(event, cb)` | Subscribe to events (SETTINGS_UPDATED, STYLE_PARAMS_CHANGE, THEME_CHANGE) | 1.11+ |
| `Wix.resizeWindow(width, height, cb)` | Change iframe component size | 1.24+ |
| `Wix.getSiteInfo(cb)` | Get baseUrl, siteTitle, pageTitle, url | 1.3+ |
| `Wix.getSiteMap(cb)` | Get site pages/links | 1.81+ |
| `Wix.navigateTo(pageId, cb)` | Navigate to a site page | 1.25+ |
| `Wix.openModal(url, width, height, cb)` | Open a modal window | 1.16+ |
| `Wix.closeWindow(msg)` | Close modal/popup | 1.16+ |
| `Wix.currentMember(cb)` | Get the current Site Member | 1.6+ |
| `Wix.getBoundingRectAndOffsets(cb)` | Component position and size | 1.26+ |
| `Wix.getComponentInfo(cb)` | compId, pageId, showOnAllPages | 1.64+ |

### Wix.Settings — settings from Settings Panel

| Method | What it does | SDK |
|--------|-----------|-----|
| `Wix.Settings.getSiteColors(cb)` | Get site palette (30 colors) | 1.22+ |
| `Wix.Settings.getStyleParams(cb)` | Get component style params | 1.22+ |
| `Wix.Settings.triggerSettingsUpdated(data)` | Send SETTINGS_UPDATED event to widget | 1.17+ |
| `Wix.Settings.refreshAppByCompIds(compIds)` | Reload components by ID | 1.45+ |
| `Wix.Settings.openMediaDialog(mediaType, multiSelect, cb)` | Open Wix Media Manager | 1.45+ |
| `Wix.Settings.openBillingPage()` | Open billing page | 1.24+ |

### Wix.Styles — styles (Widget/Page side)

| Method | What it does | SDK |
|--------|-----------|-----|
| `Wix.Styles.getStyleParams(cb)` | Get style params (colors, fonts, numbers, booleans) | 1.22+ |
| `Wix.Styles.getSiteColors(cb)` | Site palette (on widget side) | 1.22+ |
| `Wix.Styles.getSiteTextPresets(cb)` | Site text presets | 1.22+ |

### Wix.Utils — utilities

| Method | What it does | SDK |
|--------|-----------|-----|
| `Wix.Utils.getInstanceId()` | Get application instanceId (sync!) | 1.24+ |
| `Wix.Utils.getOrigCompId()` | Get original component ID | 1.24+ |
| `Wix.Utils.getCompId()` | Get component ID | 1.24+ |
| `Wix.Utils.getViewMode()` | 'editor' / 'preview' / 'site' | 1.12+ |
| `Wix.Utils.getLocale()` | Site locale | 1.24+ |
| `Wix.Utils.getDeviceType()` | 'desktop' / 'mobile' | 1.26+ |
| `Wix.Utils.getWidth()` | Component width | 1.24+ |

### Wix.PubSub — communication between components

| Method | What it does | SDK |
|--------|-----------|-----|
| `Wix.PubSub.publish(eventName, data, isPersistent)` | Send event to other components | 1.36+ |
| `Wix.PubSub.subscribe(eventName, cb, receivePast)` | Subscribe to event | 1.36+ |
| `Wix.PubSub.unsubscribe(eventName, cb)` | Unsubscribe | 1.36+ |

### Key events (addEventListener)

| Event | Data | When |
|-------|------|-------|
| `SETTINGS_UPDATED` | Custom JSON | Settings Panel → Widget (settings changed) |
| `STYLE_PARAMS_CHANGE` | `{colors, numbers, booleans, fonts}` | User changed style |
| `THEME_CHANGE` | `{fonts, siteTextPresets, siteColors, style}` | Site palette changed |
| `EDIT_MODE_CHANGE` | `{editMode: 'editor'/'preview'}` | Toggle editor↔preview |
| `DEVICE_TYPE_CHANGED` | `{deviceType: 'desktop'/'mobile'}` | Toggle desktop↔mobile |
| `PAGE_NAVIGATION` | `{toPage, fromPage}` | Page navigation |
| `COMPONENT_DELETED` | `{}` | Component deleted |
| `SITE_PUBLISHED` | `{}` | Site published |

---

## 5. Output Template

When answering an SDK question, use this format:

```markdown
### `Wix.Settings.getSiteColors(callback)`

**Summary:** Retrieves the site's color palette...

**Syntax:**
\`\`\`javascript
Wix.Settings.getSiteColors(callback)
\`\`\`

**Example:**
\`\`\`javascript
Wix.Settings.getSiteColors(function(colors) {
    console.log(colors);
});
\`\`\`

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| callback (required) | Function | Receives array of color objects |

**Return (via callback):** Array of 30 color objects: `{ reference, value }`

**SDK Version:** 1.22.0+ | **Editor:** New Editor | **Components:** Settings

⚠️ **DEPRECATED:** This is part of the legacy iFrame SDK. Modern alternative: Wix Dashboard SDK / Wix Blocks.
```

---

## 6. Migration Table

| iFrame SDK (deprecated) | Modern alternative | Note |
|------------------------|-------------------|-----------|
| `Wix.addEventListener` | Dashboard SDK events / Wix Blocks | Event model changed |
| `Wix.resizeWindow` | CSS / Dashboard SDK `setHeight` | Automatic sizing preferred |
| `Wix.getSiteInfo` | REST API `Get Site Properties` | Server-side |
| `Wix.Settings.getSiteColors` | Wix Design Tokens / CSS Variables | Auto-applied in Blocks |
| `Wix.Settings.triggerSettingsUpdated` | Dashboard SDK messaging | — |
| `Wix.Styles.getStyleParams` | Wix Blocks Design API | — |
| `Wix.Utils.getInstanceId` | Dashboard SDK / `instance` query param | — |
| `Wix.Utils.getViewMode` | Dashboard SDK context | — |
| `Wix.PubSub.publish/subscribe` | Dashboard SDK messaging | — |
| `Wix.openModal` | Dashboard SDK `openModal` | — |
| `Wix.Dashboard.openMediaDialog` | Dashboard SDK Media Manager | — |
| `Wix.Data.Public` | Wix Data Collections (REST) | — |
| `Wix Hive` | Wix CRM REST API | Fully deprecated |
| `HTTP API` | Wix REST API | Fully deprecated |

> [!WARNING]
> If your Wix application **uses** the legacy iFrame SDK (Dashboard component works as an iframe in Wix) — migration to the Dashboard SDK is possible, but requires rewriting all Settings Panel ↔ Widget communication.

---

## 7. Response Rules

1. **Response structure:** Method → Syntax → Example → Parameters → Notes (see Output Template)
2. **Quoting:** If the user asks "like in documentation" — use text from reference without distortion
3. **Missing Example:** Explicitly note `Not provided in source section.` — do not invent examples on behalf of the docs
4. **Conflicts:** Specify in which DOC and Function the fragment is found: `DOC-11, Function 03`
5. **Deprecated:** Always add `⚠️ DEPRECATED` and a link to Migration Table

---

## 8. Boundaries

- This is a **legacy/deprecated** stack. Always explicitly mention the deprecated context
- **Do not mix** iFrame SDK with modern SDK/REST methods without an explicit indication of migration
- Reference file is the single source of truth for the iFrame SDK. Do not invent methods that are not in the file
- If a method is not in the reference — respond: `"Method not found in iFrame SDK reference. It may be from a different SDK or a newer API."`

---

## See also
- `$wix-self-hosted-embedded-script` — Embedded Script extension (uses iFrame SDK for Settings Panel)
- `$react-15-3-wix-iframe` — React 15.3 patterns for Wix iFrame (if applicable)
- Wix Dashboard SDK: https://dev.wix.com/docs/sdk/api-reference/dashboard/introduction
