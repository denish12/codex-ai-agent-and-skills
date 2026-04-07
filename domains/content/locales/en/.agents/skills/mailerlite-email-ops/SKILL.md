---
name: mailerlite-email-ops
description: Email management via MailerLite MCP — subscribers, segments, campaigns, automations, analytics. Direct operation via MCP tools.
metadata:
  version: "2.0"
  mcp_server: "MailerLite MCP"
  mcp_url: "https://mcp.mailerlite.com/mcp"
  status: "beta"
---
# MailerLite Email Ops — Operations via MailerLite MCP

## Purpose

Describes **how** content domain agents use **MailerLite MCP** for direct email marketing management:
- Subscribers and segments (tiers from `$email-engagement-tiers`).
- Campaigns (regular, A/B, resend) — creation, scheduling, sending.
- Automations and performance analysis.
- Analytics and optimization based on results.

> [!IMPORTANT]
> **MailerLite MCP** is the official MCP server from MailerLite (beta).
> URL: `https://mcp.mailerlite.com/mcp`
> Tools are called **directly** via the MCP protocol; the AI agent combines them for complex tasks.
> Authorization via OAuth (one-time upon connection).

---

## Connecting MailerLite MCP

### Claude Code (terminal)

```bash
claude mcp add --transport http mailerlite https://mcp.mailerlite.com/mcp
```

After adding — authorize in MailerLite via OAuth (select account + grant access).

### Claude Desktop / Claude Web

1. Open Claude → tool icon → **Add connectors** → **Manage connectors** → **Add custom connector**
2. Name: `MailerLite`
3. Remote MCP server: `https://mcp.mailerlite.com/mcp`
4. **Connect** → authorize in MailerLite

### Cursor

```
cursor://anysphere.cursor-deeplink/mcp/install?name=MailerLite&config=eyJ1cmwiOiJodHRwczovL21jcC5tYWlsZXJsaXRlLmNvbS9tY3AifQ==
```

> ⚠️ Free Cursor plan: limit of ~40 active tools. You can enable only necessary ones (e.g., `create_campaign` + `add_subscriber`) in the connector settings.

### VS Code (GitHub Copilot)

Use the installation link or add manually via MCP. Enable **Agent** mode in the chat.

### ChatGPT (Pro/Plus, not Team)

1. Settings → Connectors → Advanced → enable **Developer Mode**
2. Create new connector: Name `MailerLite`, MCP Server URL `https://mcp.mailerlite.com/mcp`, OAuth
3. Authorize in MailerLite
4. In new chat: + → More → Developer Mode → Add Sources → enable MailerLite

### Other Tools (Gemini CLI, Windsurf, etc.)

Add URL `https://mcp.mailerlite.com/mcp` in MCP server settings.

---

## Available MCP Tools

> This is a complete list of tools the MailerLite MCP provides to the agent. The agent calls them **directly** via the MCP protocol.

### Subscriber Management

| Tool | Purpose |
|------|-----------|
| `add_subscriber` | Add a new subscriber |
| `get_subscriber` | Get subscriber data |
| `update_subscriber` | Update data (custom fields, status) |
| `list_subscribers` | List of subscribers (with filters) |
| `get_subscriber_activity` | Activity history (opens, clicks) |
| `get_subscriber_count` | Total number of subscribers |
| `delete_subscriber` | Delete subscriber (completely) |
| `forget_subscriber` | GDPR deletion (forget) |
| `get_single_import` | Import status of a single subscriber |

### Campaigns

| Tool | Purpose |
|------|-----------|
| `create_campaign` | Create a campaign (regular, A/B, resend) |
| `get_campaign` | Get campaign details (including stats) |
| `list_campaigns` | List of campaigns (with filters by status) |
| `update_campaign` | Update campaign (before sending) |
| `delete_campaign` | Delete campaign (draft) |
| `schedule_campaign` | Schedule sending |
| `cancel_campaign` | Cancel scheduled sending |
| `get_campaign_subscribers` | Get campaign recipients |

### Groups

| Tool | Purpose |
|------|-----------|
| `list_groups` | List of groups |
| `create_group` | Create a group (for tiers) |
| `update_group` | Update a group |
| `delete_group` | Delete a group |
| `get_group_subscribers` | Subscribers in a group |
| `assign_subscriber_to_group` | Add a subscriber to a group |
| `unassign_subscriber_from_group` | Remove from a group |
| `import_subscribers_to_group` | Bulk import to a group |

### Segments

| Tool | Purpose |
|------|-----------|
| `list_segments` | List of segments |
| `get_subscribers_in_segment` | Subscribers in a segment |
| `update_segment` | Update a segment |
| `delete_segment` | Delete a segment |

> ⚠️ Creating segments with conditions is done via the **MailerLite UI** (no `create_segment` in MCP). Managing existing ones — via MCP.

### Automations

| Tool | Purpose |
|------|-----------|
| `list_automations` | List of automations |
| `get_automation` | Automation details |
| `get_automation_activity` | Activity (emails, conversions) |
| `create_automation` | Create an automation |
| `delete_automation` | Delete an automation |

### Forms

| Tool | Purpose |
|------|-----------|
| `list_forms` | List of forms |
| `get_form` | Form details |
| `update_form` | Update a form |
| `delete_form` | Delete a form |
| `get_form_subscribers` | Form subscribers |

### Webhooks

| Tool | Purpose |
|------|-----------|
| `list_webhooks` | List of webhooks |
| `get_webhook` | Webhook details |
| `create_webhook` | Create a webhook |
| `update_webhook` | Update a webhook |
| `delete_webhook` | Delete a webhook |

### Other

| Tool | Purpose |
|------|-----------|
| `get_auth_status` | Check authorization |

---

## When to Use (by Agents)

| Task | Agent | Tools |
|--------|-------|-------|
| Database audit | Strategist | `get_subscriber_count`, `list_segments`, `get_subscribers_in_segment` |
| Tier segmentation | Strategist | `list_groups`, `create_group`, `assign_subscriber_to_group` |
| Campaign creation | Copywriter | `create_campaign`, `update_campaign`, `schedule_campaign` |
| Campaign analysis | Strategist | `list_campaigns`, `get_campaign` (with stats) |
| Automation analysis | Strategist | `list_automations`, `get_automation_activity` |
| Content ideas | Strategist + Copywriter | `list_campaigns` → analyze top-performers |
| Database cleaning | Strategist | `list_subscribers` → `delete_subscriber` / `forget_subscriber` |
| Webhook setup | Strategist | `create_webhook` (for integrations) |

---

## Ready-made Prompts (Call Patterns)

These prompts are real usage scenarios. The agent itself decides which tools to call.

### Top Campaigns Analysis
```
Analyze my top-3 newsletter campaigns over the last quarter.
What do they have in common? Subject, send time, length, topics.
```
**Tools used:** `list_campaigns` (filter: sent, last 90 days) → `get_campaign` for each → pattern analysis.

### Database Cleaning (Sunset)
```
Help clean the database: create a segment of subscribers who haven't opened
emails in the last 6 months. Show the count.
```
**Tools:** `list_segments` → if absent → describe how to create in UI → `get_subscribers_in_segment` → `get_subscriber_count`.

### Draft Creation from Blog Post
```
Read this blog post [text]. Write a 150-word summary and create
an email campaign draft in MailerLite for the group [name].
Use brand colors [HEX]. Sender: [email].
```
**Tools:** `list_groups` → find `group_id` → `create_campaign` (type: regular, content with brand colors).

### Automation Analysis
```
Analyze my 'welcome emails' automation. Which email has the
highest drop-off rate? Suggest improvements.
```
**Tools:** `list_automations` → `get_automation` → `get_automation_activity` → metrics analysis by steps.

### Content Calendar Ideas
```
Analyze my past campaigns and suggest ideas for future
newsletters with good subject lines.
```
**Tools:** `list_campaigns` → `get_campaign` for top-performers → subject lines patterns → new ideas.

### Deleting Drafts
```
Delete all my campaign drafts in MailerLite.
```
**Tools:** `list_campaigns` (filter: draft) → `delete_campaign` for each.

### Subject Lines Based on History
```
Suggest 3 high-performing subject lines for a campaign about [topic],
based on my previous campaigns.
```
**Tools:** `list_campaigns` → `get_campaign` for top by open rate → pattern analysis → 3 variants.

### Collecting Preview URLs
```
Collect preview URLs for all my campaigns.
```
**Tools:** `list_campaigns` → `get_campaign` for each → extract preview URL.

---

## Prompting Tips (Best Practices)

| Practice | Description |
|----------|----------|
| **Specificity** | Specify the group, sender, email width (max 600px), style |
| **Break into steps** | For complex tasks: "first find the group, then create a draft" |
| **Privacy** | Add: "Do not show real email addresses of subscribers" in the output |
| **Experimentation** | Do not hardcode tools — the AI will decide what to call |
| **Brand colors** | Pass HEX codes from `$brand-guidelines` in the prompt |
| **Sender details** | Specify from_name and from_email for each campaign |

---

## Integration with Email Strategy

### Tier Segmentation (`$email-engagement-tiers`)

MailerLite MCP does not create segments with conditions — this is done via the UI. But MCP **manages** them:

```
Prompt: "Show me the segment tier-d-at-risk, how many subscribers are in it
and when they last opened emails."
```
**Tools:** `list_segments` → find `tier-d-at-risk` → `get_subscribers_in_segment` → `get_subscriber_activity`.

### Segment Creation (via UI + MCP hints)

A Strategist can ask the agent to form **instructions for the UI**:

```
Prompt: "Give me instructions for the MailerLite UI on how to create the segment
'tier-a-vip' for subscribers who opened AND clicked in the last 30 days."
```

The agent forms a step-by-step guide, the user creates it in the UI. After creation — management is via MCP.

### Content Adaptation by Tiers (`$email-copywriting`)

A Copywriter creates campaigns for each tier with different content:

```
Prompt: "Create 4 campaign drafts with a single offer (new guide),
adapted for tiers A, B, C, D. Use the tone from $email-engagement-tiers.
Groups: tier-a-vip, tier-b-engaged, tier-c-passive, tier-d-at-risk."
```
**Tools:** `list_groups` → 4 calls to `create_campaign` with different content and group.

---

## Workflows for Main Tasks

### Workflow 1: Create and Send a Campaign (Copywriter)

```
Step 1: Get group/segment ID
  → list_groups or list_segments

Step 2: Create a campaign (draft)
  → create_campaign(
      name, type (regular/ab/resend),
      subject, from_name, from_email,
      content (HTML),
      groups: [group_id]
    )
  → remember campaign_id

Step 3: A/B settings (if type=ab)
  → update_campaign with ab_settings

Step 4: Schedule
  → schedule_campaign(campaign_id, date, time, timezone)
  OR
  → send instantly

Step 5: After 24-48h — Analysis
  → get_campaign(campaign_id) → metrics
```

### Workflow 2: Database Audit (Strategist)

```
Step 1: Total size
  → get_subscriber_count

Step 2: By tiers (if segments are created)
  → list_segments
  → for each tier-segment:
     get_subscribers_in_segment → count + sample

Step 3: Subscriber activity
  → list_subscribers (filter: status=active)
  → get_subscriber_activity for sample

Step 4: Form Dashboard
  → table: tier / count / % / health
```

### Workflow 3: Automation Analysis (Strategist)

```
Step 1: List automations
  → list_automations

Step 2: For each:
  → get_automation → structure (steps, triggers)
  → get_automation_activity → metrics (open/click per step)

Step 3: Find drop-off
  → find step with the largest engagement drop

Step 4: Recommendations
  → rewrite subject / body / CTA of the problematic step
```

### Workflow 4: Win-back Series (Strategist + Copywriter)

```
Step 1: Find tier D
  → list_segments → tier-d-at-risk
  → get_subscribers_in_segment → count

Step 2: Create win-back automation (if absent)
  → create_automation (or instruction for UI)

Step 3: Create 3-4 win-back campaigns
  → create_campaign × 4 with different subjects and content
  → schedule_campaign with 5-7 day intervals

Step 4: After 30 days — Analysis
  → get_campaign for each
  → calculate win-back conversion (D → B)

Step 5: Unreactivated
  → move to tier-e-dormant → sunset
```

### Workflow 5: Database Cleaning (Strategist)

```
Step 1: Find hard bounces
  → list_subscribers (filter: bounced)
  → delete_subscriber for each

Step 2: Find dormant (tier E)
  → list_segments → tier-e-dormant
  → get_subscribers_in_segment

Step 3: Sunset email (if not sent yet)
  → create_campaign + schedule_campaign

Step 4: After 14 days
  → get_campaign → who opened
  → unassign_subscriber_from_group for non-openers → delete_subscriber

Step 5: GDPR requests
  → forget_subscriber (full deletion upon request)
```

---

## Privacy and Compliance

| Rule | Action |
|---------|----------|
| **Do not output email addresses** | Specify in prompt: "do not show real email addresses in response" |
| **GDPR deletion** | Use `forget_subscriber`, not `delete_subscriber` |
| **Unsubscribe link** | MailerLite adds it automatically — verify its presence |
| **CAN-SPAM** | Sender's physical address — configure in MailerLite account |
| **Consent** | Do not import subscribers without opt-in |

---

## MailerLite MCP Limitations

| Limitation | Impact | Workaround |
|-------------|---------|------------|
| **Beta** | Possible bugs, API changes | Check `get_auth_status` before operations. Monitor MailerLite updates |
| **ChatGPT — Pro/Plus only** | Free and Team don't support MCP | Use Claude / Cursor |
| **Cursor Free — 40 tools limit** | Not all tools simultaneously | Enable only the necessary ones |
| **No condition-based segment creation** | Only managing existing ones | Create segments in UI, manage via MCP |
| **Automation builder — UI** | Complex workflows via UI only | `create_automation` for simple ones, UI for complex ones |
| **Email templates — UI** | No loading templates via MCP | Create in UI, use via MCP |
| **Plan limits** | Free: 1000 subscribers, no automations | Upgrade as database grows |

---

## Anti-patterns

| Mistake | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Hardcoding tool in prompt | AI chooses optimal path itself | Describe **goal**, not tools. "Create campaign" — not "call create_campaign" |
| Creating segments via MCP | `create_segment` doesn't exist — attempt will fail | Segments with conditions — in MailerLite UI |
| Importing without opt-in | GDPR/CAN-SPAM violation | Confirmed subscribers only |
| Deleting GDPR requests via `delete_subscriber` | Not a complete deletion | Use `forget_subscriber` for GDPR |
| Showing email addresses in output | Privacy violation | Always add "do not show real emails" |
| Not checking `get_auth_status` | Calls fail silently | Status check before batch operations |
| Ignoring beta status | Sudden API changes | Test critical workflows before prod |
| Using MCP for final content review | MCP doesn't check brand compliance | Review via `$brand-compliance` + `$content-review-checklist` |

---

## Integration with other skills

| Skill | Interaction |
|------|----------------|
| `$email-engagement-tiers` | **Source:** defining tiers → implementation via MailerLite segments |
| `$email-copywriting` | **Source:** email content → load via `create_campaign` |
| `$content-calendar` | **Source:** mailing dates → `schedule_campaign` |
| `$platform-strategy` | **Source:** email as a channel, frequency → schedule |
| `$cta-optimization` | **Source:** CTA → buttons in email |
| `$marketing-psychology` | **Source:** triggers → application in email body |
| `$brand-guidelines` | **Source:** visual style, HEX codes → email template |
| `$content-release-gate` | **Consumer:** metrics from `get_campaign` as evidence |

---

## Useful Links

- **Official MCP page:** https://developers.mailerlite.com/mcp/
- **Connection guide:** https://www.mailerlite.com/help/how-to-connect-mailerlites-mcp
- **What is MCP for email:** https://www.mailerlite.com/features/mcp
- **9 ways to use:** https://www.mailerlite.com/blog/email-marketing-mcp
- **MailerLite MCP announcement:** https://www.mailerlite.com/blog/mcp-mailerlite

---

## Output Template

### For Database Audit (Strategist)

```
### MailerLite MCP — Database Audit

**Date:** [YYYY-MM-DD]
**Auth status:** ✅ (via get_auth_status)

#### Overall Metrics
- Total subscribers: [N] (get_subscriber_count)
- Active: [N]
- Unsubscribed: [N]
- Bounced: [N]

#### Distribution by Segments/Tiers
| Segment | Subscribers | % of base | Last activity |
|---------|:-----------:|:------:|---------------|
| tier-a-vip | [N] | [%] | [data] |
| tier-b-engaged | [N] | [%] | [data] |
| tier-c-passive | [N] | [%] | [data] |
| tier-d-at-risk | [N] | [%] | [data] |
| tier-e-dormant | [N] | [%] | [data] |

#### Used MCP tools
- get_subscriber_count
- list_segments
- get_subscribers_in_segment × [N]

**Recommendations:** [actions]
```

### For Campaign Creation (Copywriter)

```
### MailerLite MCP — Campaign Created

**Campaign ID:** [id from create_campaign]
**Name:** [name]
**Type:** [regular / ab / resend]
**Group/Segment:** [name + id]

#### Content
- **Subject A:** [text]
- **Subject B:** [text] (if A/B)
- **From:** [name + email]
- **Preheader:** [text]
- **Brand colors:** [HEX]

#### Schedule
- **Send Date:** [date]
- **Time:** [HH:MM]
- **Timezone:** [tz]
- **Resend after 48h:** [yes / no]

#### Used MCP tools
- list_groups (find group_id)
- create_campaign
- schedule_campaign

**Status:** Scheduled / Sent
**→ After 24h:** get_campaign for metrics
```
