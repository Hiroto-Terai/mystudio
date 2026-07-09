# EC Storefront — UI Kit

An interactive recreation of a Hirot-built storefront, composed **entirely from the
design-system components** (no re-implemented primitives). It demonstrates the
light / editorial commerce track end-to-end.

## Flow
`index.html` boots on the **home** landing → **ストア一覧** (category list) →
**商品詳細** (product detail) → **カート** (slide-in drawer). All navigation,
category filtering, quantity changes, and add-to-cart are live (fake data).

## Files
- `index.html` — app shell: routing, cart state, NavBar/Footer, and the Tweaks panel.
- `data.js` — sample catalog (`window.HIROT_DATA`), 8 products across 5 categories.
- `Home.jsx` — editorial hero, logo strip, featured grid, pistachio value band.
- `Catalog.jsx` — category list (filter chips + sort) and product detail (gallery, tabs, related).
- `Cart.jsx` — slide-in cart drawer with free-shipping progress.
- `tweaks-panel.jsx` — Tweaks shell (host protocol + controls).

## Tweaks (toolbar → Tweaks)
- **カラー** — forest / sage / citrus (all within the brand green family).
- **表示フォント** — modern (Hanken × Noto Sans JP) / gothic (Zen Kaku) / mincho (Noto Serif JP).
- **商品グリッド** — 4-up / 3-up.
- **ヒーロー画像を左に**, **フッターをダークに** — layout toggles.

## Components used
NavBar, Footer, ProductCard, Price, Rating, QuantityStepper, Tag, Badge,
Breadcrumb, Tabs, Button, IconButton, Select, Divider, Logo — from
`window.HirotDesignSystem_e62cf3`.

## Notes
Product imagery is Unsplash placeholder; swap `image` URLs in `data.js` for real assets.
