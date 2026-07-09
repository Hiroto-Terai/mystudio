import React, { useState } from "react";
import { Price } from "./Price.jsx";
import { Rating } from "./Rating.jsx";
import { Tag } from "../feedback/Tag.jsx";

/**
 * ProductCard — the storefront tile. Full-bleed image on top (escapes into a
 * rounded frame), then tag / title / rating / price. Lifts to the halo
 * elevation on hover. Add-to-cart is an overlay pill that appears on hover.
 */
export function ProductCard({
  image,
  title = "商品名",
  brand,
  price,
  original,
  rating,
  reviews,
  tag,
  soldOut = false,
  onAdd,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--surface-card)",
        borderRadius: "var(--radius-lg)",
        cursor: "pointer",
        boxShadow: hover ? "var(--shadow-3)" : "var(--shadow-0)",
        transform: hover ? "translateY(-3px)" : "none",
        transition: "box-shadow .2s ease, transform .2s ease",
        ...style,
      }}
      {...rest}
    >
      <div style={{ position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden", background: "var(--surface-wash)", aspectRatio: "4 / 5" }}>
        {image ? (
          <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: soldOut ? "grayscale(1)" : "none", opacity: soldOut ? 0.7 : 1 }} />
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--green-40)", font: "var(--caption)" }}>IMAGE</div>
        )}
        {tag && <span style={{ position: "absolute", top: 12, left: 12 }}><Tag variant="mint">{tag}</Tag></span>}
        {soldOut && <span style={{ position: "absolute", top: 12, left: 12, background: "var(--ink)", color: "var(--on-ink)", font: "var(--micro)", padding: "4px 10px", borderRadius: "var(--radius-pill)" }}>SOLD OUT</span>}
        {!soldOut && onAdd && (
          <button
            onClick={(e) => { e.stopPropagation(); onAdd(); }}
            aria-label="カートに追加"
            style={{
              position: "absolute",
              right: 12,
              bottom: 12,
              width: 44,
              height: 44,
              borderRadius: "var(--radius-pill)",
              border: "none",
              background: "var(--ink)",
              color: "var(--on-ink)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: hover ? 1 : 0,
              transform: hover ? "translateY(0)" : "translateY(6px)",
              transition: "opacity .2s ease, transform .2s ease",
              boxShadow: "var(--shadow-2)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </button>
        )}
      </div>

      <div style={{ padding: "16px 4px 4px", display: "flex", flexDirection: "column", gap: 6 }}>
        {brand && <span style={{ font: "var(--font-display)", fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>{brand}</span>}
        <span style={{ font: "var(--heading-sm)", color: "var(--text-primary)", lineHeight: 1.4 }}>{title}</span>
        {rating != null && <Rating value={rating} count={reviews} />}
        {price != null && <div style={{ marginTop: 2 }}><Price amount={price} original={original} size="md" /></div>}
      </div>
    </div>
  );
}
