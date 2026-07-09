Top navigation bar — logo, center links, search/cart, and a CTA. `tone="light"` (default) or `tone="dark"`.

```jsx
<NavBar links={[{label:"ストア"},{label:"料金"}]} cartCount={2}
  ctaLabel="無料で相談する" onCartClick={openCart} onLinkClick={nav} onLogoClick={goHome} />
```

Callbacks: `onCartClick`, `onLinkClick(link)`, `onLogoClick`, `onCta`. Sticky-position it via a wrapper.
