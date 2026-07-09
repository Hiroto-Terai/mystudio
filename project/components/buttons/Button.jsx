import React, { useState } from "react";

/**
 * Button — the pill CTA. Pill shape is non-negotiable; variants change fill /
 * border / canvas, never shape.
 *   primary  → solid ink pill (dominant CTA)
 *   accent   → solid green pill (growth action)
 *   featured → aloe-mint pill (the "start free" / highlighted tier)
 *   outline  → hairline pill on light
 *   ghost    → text-only pill, wash on hover
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  as: Tag = "button",
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const sizes = {
    sm: { fontSize: 14, padding: "8px 18px", gap: 6 },
    md: { fontSize: 16, padding: "12px 24px", gap: 8 },
    lg: { fontSize: 17, padding: "15px 32px", gap: 10 },
  };

  const base = {
    display: fullWidth ? "flex" : "inline-flex",
    width: fullWidth ? "100%" : "auto",
    alignItems: "center",
    justifyContent: "center",
    gap: sizes[size].gap,
    font: "var(--font-body)",
    fontWeight: 500,
    fontSize: sizes[size].fontSize,
    lineHeight: 1.25,
    letterSpacing: "0.01em",
    padding: sizes[size].padding,
    borderRadius: "var(--radius-pill)",
    border: "1.5px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    transition: "background .18s ease, color .18s ease, border-color .18s ease, transform .08s ease",
    transform: active && !disabled ? "scale(0.98)" : "scale(1)",
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    minHeight: 44,
  };

  const variants = {
    primary: {
      background: active ? "var(--btn-primary-press)" : hover ? "var(--shade-70)" : "var(--btn-primary-bg)",
      color: "var(--btn-primary-fg)",
    },
    accent: {
      background: hover ? "var(--green-70)" : "var(--btn-accent-bg)",
      color: "var(--btn-accent-fg)",
    },
    featured: {
      background: hover ? "var(--green-30)" : "var(--btn-featured-bg)",
      color: "var(--btn-featured-fg)",
    },
    outline: {
      background: hover ? "var(--surface-muted)" : "transparent",
      color: "var(--ink)",
      borderColor: "var(--ink)",
    },
    ghost: {
      background: hover ? "var(--surface-muted)" : "transparent",
      color: "var(--ink)",
    },
  };

  return (
    <Tag
      disabled={Tag === "button" ? disabled : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{ ...base, ...variants[variant], ...style }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </Tag>
  );
}
