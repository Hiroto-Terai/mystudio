import React, { useState } from "react";
import { Logo } from "../core/Logo.jsx";
import { Button } from "../buttons/Button.jsx";

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 3h2l2.4 12.3a1 1 0 001 .7h8.7a1 1 0 001-.8L21 7H6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9.5" cy="20" r="1.4" fill="currentColor" />
      <circle cx="17.5" cy="20" r="1.4" fill="currentColor" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/**
 * NavBar — top navigation. Logo left, links center, actions (search, cart,
 * CTAs) right. `tone` flips the whole bar between light and rare dark canvas.
 */
export function NavBar({
  tone = "light",
  links = [],
  cartCount = 0,
  ctaLabel = "無料で相談する",
  onCta,
  onCartClick,
  onLinkClick,
  onLogoClick,
  style,
  ...rest
}) {
  const [open, setOpen] = useState(false);
  const dark = tone === "dark";
  const fg = dark ? "var(--on-ink)" : "var(--ink)";
  const bg = dark ? "var(--canvas-ink)" : "var(--surface-card)";

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        background: bg,
        color: fg,
        padding: "16px 24px",
        borderBottom: dark ? "1px solid var(--hairline-ink)" : "1px solid var(--border-hairline)",
        ...style,
      }}
      {...rest}
    >
      <span onClick={onLogoClick} style={{ cursor: onLogoClick ? "pointer" : "default", display: "inline-flex" }}>
        <Logo tone={dark ? "light" : "dark"} size={26} />
      </span>

      <div style={{ display: "flex", gap: 26, marginLeft: 20, flex: 1 }} className="hirot-nav-links">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href || "#"}
            onClick={(e) => { if (onLinkClick) { e.preventDefault(); onLinkClick(l); } }}
            style={{ font: "var(--font-body)", fontSize: 15, fontWeight: 500, color: fg, textDecoration: "none", opacity: 0.86 }}
          >
            {l.label}
          </a>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button aria-label="検索" style={{ display: "inline-flex", padding: 10, border: "none", background: "transparent", color: fg, cursor: "pointer", borderRadius: "var(--radius-pill)" }}>
          <SearchIcon />
        </button>
        <button aria-label="カート" onClick={onCartClick} style={{ position: "relative", display: "inline-flex", padding: 10, border: "none", background: "transparent", color: fg, cursor: "pointer", borderRadius: "var(--radius-pill)" }}>
          <CartIcon />
          {cartCount > 0 && (
            <span style={{ position: "absolute", top: 2, right: 2, minWidth: 16, height: 16, padding: "0 4px", borderRadius: 8, background: "var(--green-50)", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
              {cartCount}
            </span>
          )}
        </button>
        <Button variant={dark ? "featured" : "primary"} size="sm" onClick={onCta}>{ctaLabel}</Button>
      </div>
    </nav>
  );
}
