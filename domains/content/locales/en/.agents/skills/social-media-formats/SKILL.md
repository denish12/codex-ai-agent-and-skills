---
name: social-media-formats
description: Social media formats — 7 platforms, format templates (carousel, thread, reel), engagement techniques, ToV adaptation, algorithmic best practices
---
# Social Media Formats

## When to Use
- When **adapting content** from `$content-brief` for a specific platform.
- During **cross-posting** — adapting a single piece of content for multiple platforms.
- When **creating platform-native content** — content initially designed for a single platform.
- When **choosing a format** — post vs carousel vs reel vs thread — what is best for the given task.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Content brief | ✅ | From `$content-brief` — topic, key messages, CTA, persona |
| Platform | ✅ | Where we are adapting to |
| Format | ✅ | Post / carousel / reel / stories / thread / video (or agent recommends) |
| Target Audience Persona | ✅ | From `$audience-analysis` — affects tone and language |
| Brand guidelines | ✅ | From `$brand-guidelines` — ToV, visual style |
| Source text | ⬚ | If adapting existing text (from blog, email, another platform) |

> If the format is not specified — the agent **recommends** the optimal format for the task and platform.

## Format Selection — Decision Tree

| Content | Instagram | TikTok | LinkedIn | Telegram | YouTube | Twitter/X |
|---------|-----------|--------|----------|----------|---------|-----------|
| Educational (how-to)| Carousel / Reel | Video | Post / Carousel PDF | Post | Video / Shorts | Thread |
| Listicle (N items)| Carousel | Photo Carousel | Carousel PDF | Post with bullets | — | Thread |
| Case / story | Reel / Post | Video (storytelling)| Long post | Post | Video | Thread |
| News / insight | Post / Stories | — | Post | Post | Community post | Tweet |
| Entertainment / trend| Reel | Video | — | — | Shorts | Tweet with meme|
| Data / statistics | Carousel / Infographics| — | Post + infographics | Post + image | — | Tweet + screenshot|
| Poll / engagement | Stories Poll | — | Poll | Quiz bot / reactions | Community Poll | Poll |

## Platforms — Formats, Limits, Structures

### Instagram

#### Formats

| Format | Limit | Visibility before "more" | Visuals | Best for |
|--------|-------|--------------------|---------|----|
| **Feed post** | 2200 characters | First 125 characters | 1 photo/video | News, insights, short stories |
| **Carousel** | 2200 characters caption| First 125 characters | 2-10 slides | Educational, listicle, how-to |
| **Reel** | 2200 characters | First 125 characters | Video 9:16, 15-90 sec | Trends, how-to, behind the scenes|
| **Stories** | — | — | Photo/video 9:16, 15 sec| Quick updates, polls, links |

#### Post Structure
```
[Hook — first 125 characters, before "more". Grab attention.]

[Development — value, key messages, story. 3-5 short paragraphs.]

[CTA — single action: save / follow / drop a comment]

·
·
·

#hashtag1 #hashtag2 #hashtag3 (3-5 items, after empty lines)
```

#### Carousel Template (10 slides)
```
Slide 1: COVER — Hook headline (large text, visual hook)
Slide 2: Problem / Context (why it matters)
Slide 3-8: Key messages (1 message = 1 slide, large text + mini-explanation)
Slide 9: Conclusion / Summary
Slide 10: CTA — "Save", "Follow", "Share"
```

#### Engagement Techniques
- **Save** — carousels and checklists → saves (strong signal to algorithm)
- **Comment [word]** — but no engagement bait (question must be genuine)
- **Stories Poll** — 2-3 options, simple question
- **Caption → discussion** — end the post with a question to the audience

#### Algorithmic Best Practices
- 🟢 Saves and Shares weigh more than likes
- 🟢 Reels with hook in the first 3 seconds
- 🟢 Carousels retain attention (swipe = engagement)
- 🔴 Engagement bait penalty: "Like if you agree"
- 🔴 TikTok watermark → reach reduction
- 🔴 Frequent edits after publishing → boost reset

---

### TikTok

#### Formats

| Format | Limit | Visuals | Best for |
|--------|-------|--------|----|
| **Video** | 2200 characters caption | 9:16, 15 sec — 10 min| Trends, how-to, storytelling, humor |
| **Photo Carousel**| 2200 characters | 9:16, ≤ 35 photos | Listicle, educational |

#### Video Structure
```
0-3 sec: HOOK — grab attention (text on screen + voice)
3-15 sec: Context — why it matters
15-45 sec: Value — key messages, steps, story
Last 3-5 sec: CTA — follow / watch part 2 / answer in comments
```

#### Engagement Techniques
- **Video reply to comment** — generates engagement + new content
- **Duet / Stitch** — reaction to someone else's content
- **Series** — "Part 1", "Part 2" — audience retention
- **Trending sounds** — increase reach

#### Algorithmic Best Practices
- 🟢 Completion rate > all (shorter = higher completion)
- 🟢 Hook in the first 1-3 seconds — critical
- 🟢 Trending audio increases reach
- 🔴 Another platform's watermark
- 🔴 Low-resolution content

---

### LinkedIn

#### Formats

| Format | Limit | Visibility before "more" | Best for |
|--------|-------|--------------------|----|
| **Text post** | 3000 characters | First 210 characters | Insights, cases, opinion |
| **Carousel (PDF)**| — | — | Educational, listicle, frameworks|
| **Video** | — | — | Expert talks, demo |
| **Poll** | 4 options | — | Engagement, opinion research |
| **Article** | No limit | — | Long read, deep dive |

#### Post Structure
```
[Hook — first 210 characters. Insight, provocation, or data.]

[Development — story, case, arguments. Short paragraphs, 1-2 sentences.]

[Insight — non-obvious takeaway.]

[Question / CTA — spark a discussion]

·

#hashtag1 #hashtag2 #hashtag3 (3-5 items)
```

#### Engagement Techniques
- **Question at the end** — triggers comments (dwell time + comments = reach)
- **Personal story** — LinkedIn loves personal stories with a professional lesson
- **Tag people** — only relevant ones, no spam-tagging
- **Link in first comment** — post without link gets more reach

#### Algorithmic Best Practices
- 🟢 Dwell time (reading time) — long formatting posts
- 🟢 Comments in the first hour — critical
- 🟢 Native content > links
- 🔴 Links in post → -40-50% reach
- 🔴 Editing in the first hour → boost reset
- 🔴 Engagement bait → penalty

---

### Telegram

#### Formats

| Format | Limit | Formatting | Best for |
|--------|-------|---------------|---------|
| **Text post** | 4096 characters | Markdown / HTML (bold, italic, links, code) | Insights, news, long reads |
| **Post + photo** | 1024 chars caption | Markdown | Visual content + caption |
| **Post + video** | 1024 chars caption | Markdown | Video content |
| **Poll** | 10 options, 300 chars/option | — | Engagement, research |

#### Post Structure
```
**Bold Headline**

[First paragraph — core, hook. 2-3 sentences.]

[Development — key messages, facts, arguments. Formatting: bold for keywords, bullets for lists.]

[CTA — link, reaction, comment]

#hashtag (1-3)
```

#### Engagement Techniques
- **Reactions** — ask to press a reaction (fire = agree)
- **Forwards** — valuable content gets forwarded → subscriber growth
- **Link to discussion** — if the channel has a chat
- **Quiz** — bot quiz for engagement

#### Best Practices
- 🟢 Chronological feed — posting time is critical
- 🟢 Forwards = main growth metric
- 🟢 Formatting (bold, italic, bullets) increases read-through rate
- 🔴 Excessively long posts without structure — don't get read to the end
- 🔴 Posting too frequently (> 5/day) — leads to mutes

---

### YouTube

#### Formats

| Format | Limit | Best for |
|--------|-------|----|
| **Long-form video**| Title ≤ 100 (rec. ≤ 70), Description ≤ 5000 | Deep dive, how-to, vlogs, interviews |
| **Shorts** | Caption ≤ 100, video ≤ 60 sec | Quick tips, trends, hooks |
| **Community Post** | Text + image / poll | Engagement between videos |

#### Description Structure
```
[First 2 lines — essence of video + CTA (visible without "more")]

[Timestamps:]
00:00 Intro
01:30 [Topic 1]
05:00 [Topic 2]

[Links:]
🔗 [Resource 1]: [URL]
🔗 [Resource 2]: [URL]

[About:]
[About channel, subscribe, social media]

#hashtag1 #hashtag2 #hashtag3 (≤ 15, first 3 visible above title)
```

#### Engagement Techniques
- **Subscribe + bell** — vocal CTA in video
- **Question at the end** → comments
- **End screen** — link to next video (last 20 sec)
- **Pinned comment** — CTA or question pinned

#### Algorithmic Best Practices
- 🟢 Thumbnail CTR > 5% — critical for recommendations
- 🟢 Average View Duration > 50% — main metric
- 🟢 Timestamps improve retention (viewers skip to what they need)
- 🔴 Clickbait title without substance → retention drops → algorithm penalizes
- 🔴 First 30 seconds without a hook → drop off

---

### Twitter / X

#### Formats

| Format | Limit | Best for |
|--------|-------|----|
| **Tweet** | 280 characters (free) / 25000 (Premium) | Insights, opinions, news, humor |
| **Thread** | Series of tweets | Deep dive, storytelling, listicle |
| **Poll** | 4 options, 25 chars/option | Quick engagement |

#### Thread Structure
```
Tweet 1: HOOK — strongest point. Must grab attention and motivate to read further. "🧵" at the end.

Tweet 2-N: One point per tweet. Each is a complete thought.

Last Tweet: CTA — "Retweet if useful", "Follow for [topic]", link to resource.
```

#### Engagement Techniques
- **Quote retweet** — adds context
- **Reply to own thread** — bumps it up in the feed
- **Quote tweet** — reaction to someone else's content
- **Poll** — quick engagement

#### Algorithmic Best Practices
- 🟢 Native content > links (links lower reach)
- 🟢 Replies and quote tweets increase reach
- 🟢 Visuals in tweet increase engagement
- 🔴 Duplicating the exact same text — penalty
- 🔴 Mass tagging = spam

---

### Facebook

#### Formats

| Format | Limit | Best for |
|--------|-------|----|
| **Post** | 63206 chars (optimal 40-80 words) | Broad audience, community |
| **Stories** | 9:16, 15 sec/slide | Quick updates |
| **Reel** | 9:16, ≤ 90 sec | Viral reach |
| **Event** | — | Offline/online events |

#### Post Structure
```
[Question or fact — grab attention]

[Development — 2-3 short paragraphs]

[CTA — question for comments / link]
```

#### Best Practices
- 🟢 Videos and Reels get more reach
- 🟢 Groups — engagement is higher than on pages
- 🔴 Engagement bait → penalty (intensified since 2024)
- 🔴 Links lower reach (native content is better)

## ToV Adaptation by Platform

| Platform | Tone | Language Features |
|-----------|-----|-------------------|
| **Instagram** | Friendly, inspiring, visual | Emojis allowed (1-3), short paragraphs, empty lines |
| **TikTok** | Conversational, energetic, authentic| Audience slang, humor, "live" language — not corporate |
| **LinkedIn** | Professional, expert, but human | No emojis (or minimal), structure, data, insights |
| **Telegram** | Informative, direct, deep | Formatting (bold, bullets), can be longer |
| **YouTube** | Conversational, engaging | Like talking to a friend, but expertly |
| **Twitter/X** | Sharp, provocative, concise | Maximum thought density per character |
| **Facebook** | Warm, community-oriented | Questions, addressing the audience |

> Tone adaptation ≠ brand change. The tone adapts, brand values remain. All within `$brand-guidelines`.

## Protocol

### Step 1 — Context
1. Obtain content brief, platform, persona.
2. If format is not specified — determine via Decision Tree.
3. Load ToV from `$brand-guidelines` + platform adaptation.

### Step 2 — Text Adaptation
1. Apply **platform limits** (characters, hashtags).
2. Write a **hook** in the first N characters (before "more").
3. Structure according to **platform template**.
4. Adapt **tone** per ToV table.
5. Add **platform-specific elements** (hashtags, emojis, @mentions, formatting).

### Step 3 — CTA
1. One CTA, adapted for the platform (from `$cta-optimization`).
2. For Instagram: "Save / Follow / Drop a comment".
3. For LinkedIn: question for discussion.
4. For Telegram: link or reaction.

### Step 4 — Engagement Techniques
1. Select **1-2 techniques** from the platform's list.
2. Integrate organically — no spam, no engagement bait.

### Step 5 — Algorithmic Check
1. Verify against platform best practices (🟢/🔴).
2. Ensure there are no penalty triggers.

### Step 6 — Format Templates (if applicable)
If the format is a carousel, thread, or reel — apply the corresponding template.

## Validation (Quality Gate)

Adaptation is considered complete if:

- [ ] Platform and format determined
- [ ] Character limits observed
- [ ] Hook in the first N characters (before "more") grabs attention
- [ ] Structure follows platform template
- [ ] ToV is adapted (no corporate text on TikTok, no memes on LinkedIn)
- [ ] CTA is present, adapted for platform
- [ ] Hashtags in proper quantity
- [ ] No algorithmic penalty triggers
- [ ] Engagement techniques integrated organically
- [ ] If carousel/thread — template followed

## Handoff

| Consumer | How it's Used |
|-------------|---------------|
| `$content-brief` | Format and structure as part of the brief |
| Copywriter (agent) | Writes text per platform template |
| Visual Concept (agent)| Carousels, reel covers — visual design |
| `$content-review-checklist`| Reviewer checks the adaptation |
| `$platform-compliance`| Technical check (limits, rules) |
| `$content-release-gate`| Final check before publication |

## Integration with Other Skills

| Skill | Interaction |
|------|----------------|
| `$content-brief` | **Source:** topic, key messages, CTA, persona |
| `$audience-analysis` | **Source:** persona → tone and language |
| `$brand-guidelines` | **Source:** ToV → platform adaptation |
| `$platform-strategy` | **Source:** which platforms, formats, frequencies |
| `$cta-optimization` | **Source:** CTA adapted for the platform |
| `$headline-formulas` | **Source:** hook / headline |
| `$platform-compliance` | **Consumer:** platform rules check |
| `$platform-visual-specs`| **Consumer:** dimensions for visuals |

## Anti-patterns

| Mistake | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Copy-pasting exact text to all platforms | Different platforms = different rules, tone, limits | Adapt text, tone, CTA for each |
| Corporate tone on TikTok | Audience doesn't engage, scrolls away | Conversational, authentic, with humor |
| Memes on LinkedIn | Unprofessional, unfollow | Expert tone, data, insights |
| Link in Instagram post | Unclickable — empty CTA | "Link in bio" or Stories sticker |
| 30 hashtags on Instagram | Looks like spam, doesn't increase reach | 3-5 relevant ones |
| Thread without a hook in first tweet | No one expands it — scroll past | First tweet = strongest point |
| Engagement bait | Algorithm penalty | Genuine question, not "like if you breathe" |
| Reel without hook in first 3 sec | Scroll away → algorithm doesn't push | Text on screen + voice in first 1-3 seconds |

## Output Template

```markdown
### Social Media Format — [Platform]

**Content Brief:** [ID / topic]
**Platform:** [platform]
**Format:** [post / carousel / reel / thread / stories / video]
**Persona:** [from $audience-analysis]
**ToV:** [adaptation from $brand-guidelines]

---

#### Adapted Text

**Hook (before "more"):**
[first N characters — grab attention]

**Body:**
[adapted text per platform template]

**CTA:**
[adapted CTA]

**Hashtags:**
[#hashtag1 #hashtag2 ... (quantity per platform)]

---

#### Format Template (if carousel / thread / reel)

| Element | Content |
|---------|-----------|
| [Slide 1 / Tweet 1 / Hook 0-3 sec] | [content] |
| [Slide 2 / Tweet 2 / Context 3-15 sec] | [content] |
| ... | ... |
| [Last / CTA] | [content] |

---

#### Engagement Techniques
1. [Technique 1 — how integrated]
2. [Technique 2 — how integrated]

#### Algorithmic Check
| Rule | Status |
|---------|--------|
| [🟢 best practice 1] | ✅/❌ |
| [🔴 penalty trigger 1] | ✅ No / ⚠️ Yes |

---

**Limits:**
| Parameter | Limit | Actual | Status |
|----------|-------|------|--------|
| Characters | [N] | [N] | ✅/❌ |
| Hashtags | [N] | [N] | ✅/❌ |
| [other] | [limit] | [actual] | ✅/❌ |

**→ Next step:** → Visual Concept (if visual needed) → `$content-review-checklist` → `$platform-compliance` → `$content-release-gate`
```
