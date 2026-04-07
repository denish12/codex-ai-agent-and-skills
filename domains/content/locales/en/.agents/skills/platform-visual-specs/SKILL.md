---
name: platform-visual-specs
description: Complete visual specifications guide — photo, video, ad formats, safe zones, accessibility, dark mode
---
# Platform Visual Specs

> **Last Updated:** 2026-Q1. Platforms frequently change specs — when in doubt, verify current data via web search.

## When to Use
- When **preparing visual content** for a specific platform.
- When **creating a `$visual-brief`** — to specify exact dimensions and constraints.
- When doing **`$image-prompt-engineering`** — to select an aspect ratio for AI generation.
- When doing **`$platform-compliance`** — identifying technical specs for validation.
- When **cross-posting** — adapting dimensions for another platform.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Platform | ✅ | Where it will be published |
| Content Type | ✅ | Post / Stories / Reels / Carousel / video / cover / ad |
| Organic / Paid | ✅ | Ad formats have separate requirements |
| Text on Image | ⬚ | If yes — factor in the 20% rule for ads and safe zones |

## Specifications Guide

### Instagram

#### Photo / Static

| Type | Size (px) | Ratio | Max File | Format | Safe Zone |
|-----|------------|-------|-----------|--------|-----------|
| Feed Square | 1080×1080 | 1:1 | 30MB | JPG/PNG | 50px from edges |
| Feed Portrait | 1080×1350 | 4:5 | 30MB | JPG/PNG | 50px from edges |
| Feed Landscape | 1080×566 | 1.91:1 | 30MB | JPG/PNG | 50px from edges |
| Carousel (up to 10 slides) | 1080×1080 or 1080×1350 | 1:1 or 4:5 | 30MB/slide | JPG/PNG | Single ratio for all slides |
| Stories | 1080×1920 | 9:16 | 30MB | JPG/PNG | 250px top, 320px bottom (UI elements) |
| Reels Cover | 1080×1920 | 9:16 | — | JPG/PNG | Center 1080×1080 zone visible in grid |
| Profile Photo | 320×320 | 1:1 | — | JPG/PNG | Circular crop |
| Highlights Cover | 161×161 | 1:1 | — | JPG/PNG | Circular crop |

#### Video

| Type | Resolution | Ratio | Duration | Max File | Codec | FPS |
|-----|-----------|-------|-------------|-----------|-------|-----|
| Reels | 1080×1920 | 9:16 | 15-90 sec (recommended ≤ 60) | 4GB | H.264 | 30 |
| Stories Video | 1080×1920 | 9:16 | ≤ 15 sec/slide | 4GB | H.264 | 30 |
| Feed Video | 1080×1080 or 1080×1350 | 1:1 or 4:5 | ≤ 60 min | 4GB | H.264 | 30 |

#### Ads (Paid)

| Type | Size | Ratio | Text on Image | Details |
|-----|--------|-------|---------------------|-------------|
| Feed Ad | 1080×1080 | 1:1 | ≤ 20% (recommendation, does not block delivery) | Caption: 125 chars primary text |
| Stories Ad | 1080×1920 | 9:16 | ≤ 20% | CTA button at bottom — 320px safe zone |
| Carousel Ad | 1080×1080 | 1:1 | ≤ 20% | 2-10 cards |

---

### TikTok

#### Video

| Type | Resolution | Ratio | Duration | Max File | Codec | FPS |
|-----|-----------|-------|-------------|-----------|-------|-----|
| Video | 1080×1920 | 9:16 | 15 sec — 10 min | 287MB (iOS) / 72MB (Android) | H.264 | 30 |
| Photo Carousel | 1080×1920 | 9:16 | — | — | JPG/PNG | ≤ 35 photos |

| Safe Zone | Description |
|-----------|----------|
| Top | 150px — username and description |
| Bottom | 270px — caption, music, buttons |
| Right | 100px — icons (like, comment, share) |

---

### YouTube

| Type | Size (px) | Ratio | Max File | Format |
|-----|------------|-------|-----------|--------|
| Thumbnail | 1280×720 | 16:9 | 2MB | JPG/PNG |
| Video (recommended) | 1920×1080 | 16:9 | 256GB / 12 hours | MP4 (H.264) |
| Shorts | 1080×1920 | 9:16 | — | MP4, ≤ 60 sec |
| Channel Banner | 2560×1440 | — | 6MB | JPG/PNG |
| Channel Avatar | 800×800 | 1:1 | — | JPG/PNG |
| End Screen | 1920×1080 | 16:9 | — | Elements in last 5-20 sec |

| Video Specs | Recommendation |
|-------------|-------------|
| Codec | H.264 |
| Audio | AAC, 48kHz |
| FPS | 24-60 (30 standard) |
| Bitrate | 8 Mbps (1080p), 35-45 Mbps (4K) |

| Safe zone (Thumbnail) | Description |
|----------------------|----------|
| Bottom Right Corner | Video duration covers ~100×30px |
| Text | Large (≥ 60px), legible on mobile |

---

### LinkedIn

| Type | Size (px) | Ratio | Max File | Format |
|-----|------------|-------|-----------|--------|
| Post Image | 1200×627 | 1.91:1 | 10MB | JPG/PNG |
| Post Square | 1080×1080 | 1:1 | 10MB | JPG/PNG |
| Post Vertical | 627×1200 | 1:2 | 10MB | JPG/PNG |
| Carousel (PDF) | 1080×1080 or 1920×1080 | 1:1 or 16:9 | 100MB | PDF, ≤ 300 pages |
| Article Cover | 1920×1080 | 16:9 | — | JPG/PNG |
| Profile Photo | 400×400 | 1:1 | 8MB | JPG/PNG |
| Banner | 1584×396 | 4:1 | 8MB | JPG/PNG |

| Video | Specs |
|-------|-------|
| Resolution | 256×144 — 4096×2304 |
| Duration | 3 sec — 10 min |
| Max File | 5GB |
| Codec | H.264, AAC |
| FPS | 30 |

---

### Telegram

| Type | Size (px) | Max File | Format | Details |
|-----|------------|-----------|--------|-------------|
| Post Photo | recommended 800×400+ | 5MB (compressed) / 20MB (as file) | JPG/PNG | Horizontal looks better in preview |
| Photo Album | — | 5MB/photo | JPG/PNG | ≤ 10 photos |
| Channel Avatar | 640×640 | — | JPG/PNG | Circular crop |
| GIF | — | 10MB | GIF/MP4 | — |
| Video | — | 2GB | MP4 | H.264, AAC |
| Video Note (circle) | 384×384 | — | MP4 | Circular, ≤ 60 sec |
| Stickers | 512×512 | — | WebP/TGS/WebM | — |

---

### Twitter / X

| Type | Size (px) | Ratio | Max File | Format |
|-----|------------|-------|-----------|--------|
| In-stream Image | 1600×900 | 16:9 | 5MB | JPG/PNG/GIF |
| Card Image | 800×418 | 1.91:1 | — | JPG/PNG |
| Profile Photo | 400×400 | 1:1 | 2MB | JPG/PNG |
| Header | 1500×500 | 3:1 | 5MB | JPG/PNG |

| Video | Specs |
|-------|-------|
| Resolution | 1920×1200 max |
| Duration | ≤ 2:20 (free), ≤ 60 min (Premium) |
| Max File | 512MB |
| FPS | 30-60 |

---

### Facebook

| Type | Size (px) | Ratio | Max File | Format |
|-----|------------|-------|-----------|--------|
| Post Image | 1200×630 | 1.91:1 | 30MB | JPG/PNG |
| Post Square | 1080×1080 | 1:1 | 30MB | JPG/PNG |
| Stories | 1080×1920 | 9:16 | 30MB | JPG/PNG |
| Cover Photo | 820×312 | 2.63:1 | — | JPG/PNG |
| Profile Photo | 170×170 | 1:1 | — | JPG/PNG |
| Event Cover | 1200×628 | 1.91:1 | — | JPG/PNG |

| Ads (Paid) | Text on Image |
|---------------|---------------------|
| Feed Ad | ≤ 20% text (recommended, affects delivery) |
| Stories Ad | ≤ 20%, 250px top/320px bottom safe zone |

---

### Pinterest

| Type | Size (px) | Ratio | Max File | Format |
|-----|------------|-------|-----------|--------|
| Standard Pin | 1000×1500 | 2:3 | 20MB | JPG/PNG |
| Long Pin | 1000×2100 | 1:2.1 | 20MB | JPG/PNG |
| Square Pin | 1000×1000 | 1:1 | 20MB | JPG/PNG |
| Video Pin | 1080×1920 | 9:16, 1:1, 2:3 | 2GB | MP4, MOV |
| Profile Photo | 165×165 | 1:1 | — | JPG/PNG |

---

### Web / OG

| Type | Size (px) | Ratio | Format | Details |
|-----|------------|-------|--------|-------------|
| OG Image | 1200×630 | 1.91:1 | JPG/PNG | Preview when sharing URL |
| Favicon | 32×32 / 192×192 | 1:1 | ICO/PNG | Browser tab |
| Blog Hero | 1200×600+ | 2:1 | JPG/PNG/WebP | WebP recommended for speed |

## Accessibility and Dark Mode

### Accessibility

| Requirement | Description | How to Verify |
|-----------|----------|---------------|
| **Alt-text** | Image description for screen readers | Fill in when publishing (all platforms support) |
| **Text Contrast** | Contrast ratio ≥ 4.5:1 (AA) for text on image | Tools: WebAIM Contrast Checker, Figma plugins |
| **Text Size** | Text on image ≥ 16px (legible on mobile) | Visual check on mobile phone |
| **Not only via color** | Information should not be conveyed solely by color | Icons, patterns, labels supplement color |

### Dark Mode

| Element | Problem | Solution |
|---------|---------|---------|
| Logo on white | Looks like a white rectangle on dark background | Use transparent background (PNG) or dark version of logo |
| Bright images | Blinding in dark mode | Add a thin border (1px) or soft drop shadow |
| Text on image | White text on a light image is invisible in light mode (and vice versa) | Add a background / overlay behind text |
| Infographics | Colors can blend into dark backgrounds | Check preview in both modes |

## Protocol

### Step 1 — Establish Context
1. Identify platform.
2. Identify content type (post / video / stories / carousel / ad).
3. Identify organic vs paid.

### Step 2 — Select Specs
1. Find specs in the directory by platform and type.
2. Record: size, ratio, format, max file, safe zone.
3. If video — add: codec, FPS, bitrate, duration.
4. If ad — check ad specs (20% text rule, CTA zones).

### Step 3 — Safe Zone Check
1. Ensure key content (text, faces, logo) does not overlay into safe zones.
2. For Reels/Stories — account for platform UI elements.
3. For YouTube thumbnails — account for the duration overlay.

### Step 4 — Accessibility and Dark Mode
1. Check text contrast (≥ 4.5:1).
2. Prepare alt-text.
3. Check visual in dark mode (if applicable).

### Step 5 — Cross-platform Adaptations
If content is for multiple platforms — prepare sizes for each:

| Platform | Recommended Format for AI generation | MJ Parameter |
|-----------|--------------------------------------|-------------|
| Instagram Feed | 1080×1350 (4:5) | `--ar 4:5` |
| Instagram Stories/Reels | 1080×1920 (9:16) | `--ar 9:16` |
| LinkedIn | 1200×627 (1.91:1) | `--ar 191:100` |
| YouTube Thumbnail | 1280×720 (16:9) | `--ar 16:9` |
| Telegram | 800×400 (2:1) | `--ar 2:1` |
| Pinterest | 1000×1500 (2:3) | `--ar 2:3` |
| OG Image | 1200×630 (1.91:1) | `--ar 191:100` |

## Validation (Quality Gate)

Specifications are considered correctly applied if:

- [ ] Visual size meets platform specs
- [ ] Ratio is correct
- [ ] File format is supported
- [ ] File weight is within limits
- [ ] Safe zone is accounted for (key content is not cropped by UI)
- [ ] Text on image is legible (≥ 16px, contrast ≥ 4.5:1)
- [ ] Alt-text is prepared
- [ ] Dark mode checked (if applicable)
- [ ] Ad restrictions are accounted for (if paid)

## Handoff

| Consumer | How it Uses it |
|-------------|---------------|
| `$visual-brief` | Sizes and constraints for a specific visual |
| `$image-prompt-engineering` | Ratio for AI generation (MJ `--ar` parameter) |
| `$platform-compliance` | Technical specs for compliance checks |
| `$content-release-gate` | Size checks in final checklist |
| Visual Concept (agent) | Technical requirements for generating a visual |

## Integration with Other Skills

| Skill | Interaction |
|------|----------------|
| `$visual-brief` | **Consumer:** sizes → visual brief |
| `$image-prompt-engineering` | **Consumer:** ratio → prompt |
| `$platform-strategy` | **Source:** platforms → which specs are needed |
| `$platform-compliance` | **Complement:** visual specs = dimensions, compliance = rules |
| `$brand-guidelines` | **Source:** style, but this skill governs technical dimensions |
| `$moodboard` | **Consumer:** specs inform the visual style |

## Anti-patterns

| Mistake | Why it's Bad | How to do it Right |
|--------|-------------|---------------|
| One size for all platforms | Cropped, stretched, looks unprofessional | Custom size for each platform |
| Ignoring safe zones | Text hidden behind platform UI | Check safe zones for each format |
| Text is too small (< 16px) | Illegible on mobile — 60%+ of traffic | Minimum 16px, preferably 24px+ |
| Dark mode not checked | Logo/text blends into background | Test in both modes |
| Heavy files | Slow loading, platform rejection | Optimize: WebP for web, compression for socials |
| 2023 specs | Platforms updated their constraints | Verify relevance, monitor updates |
| Ad specs used for organic | 20% rule applies to ads, not organic | Separate organic from paid |
| Missing alt-text | Inaccessible to screen readers, worse SEO | Always include alt-text |

## Output Template

```
### Visual Specifications — [Task / Content]

**Platform:** [platform]
**Content Type:** [post / stories / reels / carousel / video / ad]
**Organic / Paid:** [type]

---

#### Selected Specifications

| Parameter | Value |
|----------|----------|
| Size | [W×H px] |
| Ratio | [ratio] |
| Format | [JPG/PNG/MP4/WebP] |
| Max File | [N MB] |
| Codec (video) | [H.264 / N/A] |
| FPS (video) | [30 / N/A] |
| Duration (video) | [seconds / N/A] |

#### Safe Zone

| Zone | Offset | What overlays it |
|------|--------|-------------------|
| Top | [N px] | [username, time, UI] |
| Bottom | [N px] | [caption, buttons, CTA] |
| Right | [N px] | [like/share icons] |
| Left | [N px] | [—] |

#### Accessibility

| Parameter | Status | Value |
|----------|--------|----------|
| Alt-text | ✅/❌ | [text] |
| Text Contrast | ✅/❌ | [ratio:1] |
| Legible on mobile | ✅/❌ | [font size] |
| Dark mode | ✅/❌ | [checked / not checked] |

#### Ad Constraints (if paid)

| Constraint | Status |
|------------|--------|
| Text ≤ 20% | ✅/❌/N/A |
| CTA safe zone | ✅/❌/N/A |

---

#### Cross-platform dimensions (if adaptations needed)

| Platform | Size | Ratio | MJ Parameter |
|-----------|--------|-------|-------------|
| [platform 1] | [W×H] | [ratio] | [--ar X:Y] |
| [platform 2] | [W×H] | [ratio] | [--ar X:Y] |

**→ Next step:** pass to `$visual-brief` / `$image-prompt-engineering` / Visual Concept
```
