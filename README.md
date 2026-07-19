# Nagi — Shopify theme (Dawn reskin)

The Nagi design applied to a real, installable **Shopify theme**, built on
Shopify's reference theme **[Dawn](https://github.com/Shopify/dawn)**. It keeps all of
Dawn's real commerce functionality (product/collection/cart/checkout, sections, theme
editor) and reskins it with the Nagi brand: a cream editorial canvas, growth‑green
accents, thin‑weight display type over Noto Sans JP, pill buttons, and the signature
stacked‑shadow "paper halo" card depth.

> **Why not the React code directly?** Shopify themes render with **Liquid** (server‑side),
> so the earlier React/Vite storefront can't be dropped in as‑is. Instead, the *design* is
> reflected into Dawn — the brand tokens, typography, and component signatures — while
> Shopify keeps ownership of the storefront logic. The React implementation and the
> original design bundle are preserved in git history (see **History** below).

## How the reskin is structured

Everything is done as **overrides on top of vanilla Dawn**, so it stays upgradeable:

| Layer | File | What it does |
|---|---|---|
| Color | [`config/settings_data.json`](./config/settings_data.json) | 5 Nagi color schemes: cream page · white card · pistachio band · ink footer · aloe featured. Plus pill button radius (40), 12px card radius, 8px inputs, 24px grid gap, and a **drawer** cart. |
| Type + components | [`assets/nagi.css`](./assets/nagi.css) | Loaded after `base.css`. Overrides the font‑family vars (Noto Sans JP body / Hanken Grotesk display), thins headings to weight 300 with tighter tracking, sets Japanese line‑height + `palt`, forces pill buttons, and adds the stacked‑shadow card halo on hover. |
| Fonts | [`layout/theme.liquid`](./layout/theme.liquid) | Adds the Google Fonts link (Noto Sans JP + Hanken Grotesk) and wires in `nagi.css`. |
| Homepage | [`templates/index.json`](./templates/index.json) | Rebuilt to echo the Nagi home: editorial hero (image‑with‑text), brand strip, featured‑collection grid (4‑up, portrait cards, quick‑add), and a pistachio "選ばれる、3つの理由" value band. |
| Footer | [`sections/footer-group.json`](./sections/footer-group.json) | Switched to the ink‑dark scheme. |

The Nagi color/type values map 1:1 to the design system tokens (`--green-20` = aloe
`#c1fbd4`, `--canvas-cream` = `#fbfbf5`, display weight 300, etc.).

## Install / preview

This is a standard Shopify theme — use the Shopify CLI against a store you own:

```bash
# one-time: install the CLI (https://shopify.dev/docs/api/shopify-cli)
npm i -g @shopify/cli @shopify/theme

shopify theme dev   --store your-store.myshopify.com   # live local preview
shopify theme push  --store your-store.myshopify.com --unpublished   # upload as a draft
shopify theme check                                    # lint (passes with 0 errors)
```

Or zip the repo (excluding `node_modules`) and upload it under
**Online Store → Themes → Add theme → Upload zip**.

## Verified

- `shopify theme check` (via `@shopify/theme-check-node`): **0 errors**. Remaining notes are
  a `RemoteAsset` info‑warning for the Google Fonts link (deliberate — see Caveats) and
  Dawn's own pre‑existing `scheme_classes` note.
- All theme JSON validated; all section/block types and setting enums used in
  `index.json` verified against the section schemas.

Full visual QA requires pushing to a Shopify store (Liquid can't render locally without
one) — that step needs your store + CLI auth.

## Caveats / next steps

- **Fonts load from Google Fonts by URL.** Matches the design system and is editable in one
  place, but theme‑check prefers CDN‑hosted assets. Can be self‑hosted into `assets/` on
  request for best performance + offline theme‑editor rendering.
- **Logo** is the shop‑name wordmark (styled). The Nagi sprout mark can be added as an
  uploaded logo image in the theme editor (Header section) — Shopify needs it uploaded to
  the store's media library, so it isn't wired via `settings_data.json`.
- **Product imagery / catalog** comes from your real Shopify products. The homepage's
  featured grid points at the `all` collection.
- Deeper per‑section polish (PDP layout, collection filters) can be iterated section by
  section on top of this base.

## History

- Branch **`implement-nagi-storefront`** — the standalone React + Vite + TS storefront
  implementation of the same design.
- Branch **`main`** / earlier commits — the original Claude Design handoff bundle
  (`project/`, `chats/`) with the full design‑system spec, tokens, and specimen cards.

Both are recoverable with `git checkout <branch>`.
