# Hirot Storefront

An editorial Japanese EC (e‑commerce) storefront built on the **Hirot Design System**.
White / cream editorial canvas, a growth‑green accent, thin‑weight display type over
Noto Sans JP — implemented as a real **Vite + React + TypeScript** app that consumes the
design system's tokens and components.

This is the production implementation of the design handoff bundle that lives under
[`project/`](./project) (exported from Claude Design). The prototypes there were
browser‑only React (Babel‑in‑the‑browser); this repo turns them into a runnable,
type‑checked app.

## Quick start

```bash
npm install
npm run dev        # start the dev server (Vite)
npm run build      # type-check + production build to dist/
npm run preview    # preview the production build
npm run typecheck  # type-check only
```

Then open the printed local URL. The storefront boots on the **home** landing.

> **Note on assets:** product photography and the Latin display font are loaded from
> Unsplash / Google Fonts by URL. On a network‑restricted machine the images render as
> the brand green wash placeholder and the display font falls back to Noto Sans JP — the
> layout and type scale are unaffected. Swap the `image` URLs in
> [`src/storefront/data.ts`](./src/storefront/data.ts) for real assets when you have them.

## What it does

An interactive storefront composed entirely from the design‑system components:

`home` (editorial hero, logo strip, featured grid, pistachio value band)
→ `ストア一覧` (category list with filter chips + sort)
→ `商品詳細` (gallery, rating, price, tabs, related products)
→ `カート` (slide‑in drawer with free‑shipping progress).

Routing, category filtering, quantity changes, and add‑to‑cart are all live (fake data).

A floating **テーマ** panel (bottom‑right) previews the design variations the client asked
to compare — colour theme (forest / sage / citrus), display font (modern / gothic /
mincho), product‑grid density (4‑up / 3‑up), and two layout toggles. It's the
productionised replacement for the prototype's design‑tool "Tweaks" panel, driven by real
React state and CSS custom‑property overrides.

## Structure

```
index.html                  App entry (loads Zen Kaku Gothic / Noto Serif JP for the font options)
public/                     Logo mark SVGs (also the favicon)
src/
  main.tsx                  React root; imports the design-system CSS
  App.tsx                   App shell — routing, cart state, nav/footer, theme panel
  styles/
    styles.css              Design-system entry (imports only) — link THIS
    tokens/                 CSS custom properties: colors, typography, spacing, radius, elevation, fonts
    app.css                 App-level reset + responsive nav collapse
  components/               The Hirot Design System component library (see below)
    index.ts                Barrel — screens import primitives from here
  storefront/
    types.ts                Product / Catalog / CartLine types
    data.ts                 Sample catalog (8 products, 5 categories)
    theme.ts                Theme ramps, font stacks, applySettings()
    Home.tsx                Home screen
    Catalog.tsx             CatalogList + ProductDetail
    Cart.tsx                Slide-in cart drawer
    ThemeControls.tsx       Floating theme/layout preview panel
```

### Components

Ported 1:1 from the design system to typed `.tsx`, styled entirely via the CSS token
custom properties (no CSS‑in‑JS libraries):

- **core** — `Logo`, `Card`, `Avatar`, `Divider`
- **buttons** — `Button` (primary / accent / featured / outline / ghost pills), `IconButton`
- **forms** — `Input`, `Select`, `Checkbox`, `Radio`, `Switch`
- **feedback** — `Badge`, `Tag`, `Toast`, `Tooltip`, `Dialog`
- **navigation** — `NavBar`, `Footer`, `Breadcrumb`, `Tabs`
- **commerce** — `ProductCard`, `Price`, `Rating`, `QuantityStepper`

## Design system

The brand foundations — two‑canvas colour system, thin‑display typography, 8px spacing,
pill buttons, the signature stacked‑tiny‑shadow "paper halo" elevation — are documented in
the handoff bundle: [`project/readme.md`](./project/readme.md), with foundation specimen
cards under `project/guidelines/`. The tokens in `src/styles/tokens/` are copied verbatim
from `project/tokens/`, so the two stay in sync.
