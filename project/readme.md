# Hirot Design System

**Hirot（ヒロット）** is an EC (e-commerce) production studio. This design system exists to
produce **on-brand EC storefronts and sales/marketing material** for two audiences:

1. **EC事業者（営業先）** — businesses that own or want an online store, evaluating Hirot as a partner.
2. **制作会社・副業者** — production companies and freelancers Hirot recruits.

Everything is optimized for **Japanese-language readability** (generous line-height, `palt`
kerning) with an **editorial, refined, trustworthy** voice on a **light canvas**.

> **Language:** primary copy is **Japanese**, with **decorative English** on eyebrows and
> some headlines. Fonts are **Google Fonts** so they are easy to swap later.

## Sources & provenance

- No existing brand assets, codebase, or Figma were provided — the brand identity here
  (logo, palette, type system, voice) was **created from scratch** for Hirot.
- The visual *taste* was adapted from a reference brief (a Shopify-like "Shopifi" system:
  thin-display typography, pill buttons, green commerce accents, editorial whitespace). We
  **adapted, did not copy** it: flipped to a light-first canvas, added Japanese type rules,
  and softened the green into a fuller brand scale.
- ⚠️ **The logo is a placeholder** — a geometric "sprout" (growth/commerce) mark plus a
  thin wordmark. Replace with a real logo when available.

---

## CONTENT FUNDAMENTALS — how Hirot writes

**Voice:** calm, confident, editorial. We sound like a design studio that takes
craft seriously but speaks plainly — never salesy, never loud.

- **Person:** address the reader politely as an implied "お客様"; use **です・ます調**
  (polite form) throughout. Avoid casual だ・である and avoid stiff 敬語 overload.
- **Japanese first, English as accent.** English appears only as short eyebrows/labels
  (`Featured Collection`, `Why Hirot`, `Design & Commerce`) — a decorative editorial layer,
  never as the primary message. Never write a full English sentence where Japanese should carry meaning.
- **Concise, benefit-led.** Lead with the outcome. e.g. 見出し「売れる体験を、ていねいに設計する。」／
  リード「企画からデザイン、運用までを一貫して支える EC 制作スタジオ。」
- **Numbers earn their place.** Prices are yen with 税込 (`¥8,800 税込`); use fine print
  (`※ 送料は地域により異なります。`) rather than crowding the main copy.
- **Casing:** English eyebrows are Title Case or ALL-CAPS with wide tracking. Japanese never
  gets letter-spacing beyond the subtle global `palt`.
- **Punctuation:** full-width Japanese punctuation（。、）; use ・ for inline lists; use — sparingly.
- **No emoji.** The brand voice is editorial; emoji are off-brand. Iconography is line SVG only.
- **Micro-copy examples:** CTAs → 「ストアを見る」「カートに入れる」「無料で相談する」／
  空状態 →「カートは空です」／ 進捗 →「あと ¥1,200 で送料無料」.

---

## VISUAL FOUNDATIONS

**Overall vibe:** an editorial print-magazine spread rendered for commerce — lots of warm
off-white space, thin oversized headlines, full-bleed photography, and one clear action per band.

### Color
- **Light-first, two surfaces:** `--canvas-light` (#ffffff) for cards/tiles and
  `--canvas-cream` (#fbfbf5, barely-warm off-white) for page backgrounds. `--canvas-ink`
  (#0e100f) is used **rarely** — footer and the occasional cinematic band.
- **Green is the brand.** A full scale `--green-05…70` signals growth / commerce / success.
  Pale **aloe** (`--green-20`) fills featured cards & chips; **pistachio** (`--green-10`)
  fills wide value bands; deeper greens (`--green-50/60/70`) are for links, small accents,
  and the accent CTA. **Greens are surface/accent fills, never body-text color** (except links).
- **Neutrals:** an ink→shade-20 ladder for text and hairlines. Text primary = ink,
  secondary = shade-50, tertiary = shade-40. Hairline borders are a warm `#e8e8e1`.
- **Imagery vibe:** natural, warm, lifestyle photography — daylight, real products, minimal
  styling. No heavy filters, no duotone. Photography does the visual heavy lifting; there are
  **no gradients, no illustration, no texture/pattern** backgrounds.

### Typography
- **Display = thin (300).** `--font-display` is **Hanken Grotesk** for Latin, falling through
  to **Noto Sans JP** for Japanese — so English renders in the thin grotesque and Japanese in
  Noto within the same headline. **Never bump display past 300** — the thinness is the signature.
- **Body = Noto Sans JP** (400/500/600) with **generous line-height (1.85)** and slight
  positive tracking for Japanese comfort.
- **Eyebrows** are 12px, wide-tracked (0.18em), UPPERCASE English in green.
- Sizes stair-step 88 → 64 → 48 → 36 (display) then 28/24/20/18 headings, 18/16 body.

### Space & layout
- 8px base unit; section rhythm is airy on marketing (64–96px) and tighter on commerce (48px).
- Containers: 1200px default, 760px reading column. Product grids 4-up → 3-up → 2 → 1.
- Whitespace is treated as a primary asset — the editorial calm comes from restraint.

### Shape, depth, borders
- **Corner radii:** cards/tiles `--radius-lg` (12px), inputs `--radius-md` (8px), hero frames
  `--radius-xl` (20px). **Buttons are always `--radius-pill`** — rounded rectangles never exist for buttons.
- **Signature elevation = Level 3 "stacked tiny shadows"** (`--shadow-3`): four stacked
  low-opacity shadows produce a soft paper halo on light cards. Product tiles are flat at rest
  and **lift to this halo on hover** (translateY -3px).
- **Cards:** white surface, 12px radius, either a hairline border (flat) or the halo (raised);
  featured cards drop the border and fill aloe. No colored left-border accents, ever.

### Motion & states
- **Transitions** are quick and soft: 150–200ms ease on color/shadow, 80ms on press scale.
- **Hover:** buttons darken (primary → shade-70, accent → green-70); tiles lift + reveal an
  add-to-cart pill; links get the green. No bounces, no springy overshoot.
- **Press:** primary/accent buttons scale to 0.98; primary lifts to shade-70.
- **Focus:** a green focus ring (`--ring-accent`) on inputs and controls (accessibility).
- **Reduced motion:** keep it subtle; nothing depends on animation to be legible.

### Transparency & blur
- Scrims for cart drawer / dialog use `rgba(14,16,15,0.42)`. No frosted-glass blur, no
  translucent chrome — the system stays crisp and opaque.

---

## ICONOGRAPHY

- **Line icons, ~1.6px stroke, rounded caps/joins**, drawn to a 24px grid — the same weight
  as **Lucide**. In the design-system components (NavBar, Cart, form controls) the handful of
  needed glyphs (cart, search, close, plus, heart, chevron, star, trash) are inlined as SVG
  matching that spec.
- **For UI kits / new screens, use [Lucide](https://lucide.dev) via CDN**
  (`https://unpkg.com/lucide-static`) for any additional icons — it matches the built-in stroke
  style. ⚠️ *Substitution flag:* Lucide is a stand-in for a bespoke Hirot icon set (none exists yet).
- **Fill icons** are avoided except the rating **star** (green fill = brand).
- **No emoji, no unicode-glyph icons** (the ・ separator and › breadcrumb chevron are the only
  typographic marks used structurally).
- Brand mark lives in `assets/logo/` (`hirot-mark.svg` colored, `hirot-mark-mono.svg` for tinting).
- Customer/partner logos in strips are **plain greyscale wordmarks at uniform height**, not avatars.

---

## Index / manifest

**Root**
- `styles.css` — the single entry point consumers link (imports only).
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `elevation.css`.
- `assets/logo/` — `hirot-mark.svg`, `hirot-mark-mono.svg`.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand).
- `readme.md` (this file) · `SKILL.md`.

**Components** (`window.HirotDesignSystem_e62cf3`) — grouped by concern, each dir has a `@dsCard`:
- `components/core/` — Logo, Card, Avatar, Divider
- `components/buttons/` — Button, IconButton
- `components/forms/` — Input, Select, Checkbox, Radio, Switch
- `components/feedback/` — Badge, Tag, Toast, Tooltip, Dialog
- `components/navigation/` — NavBar, Breadcrumb, Tabs, Footer
- `components/commerce/` — ProductCard, Price, Rating, QuantityStepper

**UI kits**
- `ui_kits/storefront/` — interactive EC storefront (home / list / detail / cart) with Tweaks.

### Do / Don't (quick)
- ✅ Pill buttons only · display at weight 300 · green as fill/accent · full-bleed warm photography · polite です・ます Japanese.
- ❌ No third canvas color · no rounded-rect buttons · no gradients/illustration/texture · no emoji · no green behind body text.
