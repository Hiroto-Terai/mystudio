import React from "react";

/**
 * Card — the generic light surface. The default `elevation="halo"` uses the
 * brand's signature stacked-tiny-shadow depth (Level 3). `variant` recolors
 * the surface for featured (aloe) and band (pistachio) treatments.
 */
export function Card({
  children,
  variant = "default",   // "default" | "featured" | "band" | "wash" | "hairline"
  elevation = "halo",     // "flat" | "hairline" | "raised" | "halo"
  radius = "lg",          // "md" | "lg" | "xl"
  pad = 32,
  as: Tag = "div",
  style,
  ...rest
}) {
  const surfaces = {
    default:  "var(--surface-card)",
    featured: "var(--surface-featured)",
    band:     "var(--surface-band)",
    wash:     "var(--surface-wash)",
    hairline: "var(--surface-card)",
  };
  const shadows = {
    flat:     "var(--shadow-0)",
    hairline: "var(--shadow-0)",
    raised:   "var(--shadow-2)",
    halo:     "var(--shadow-3)",
  };
  const radii = { md: "var(--radius-md)", lg: "var(--radius-lg)", xl: "var(--radius-xl)" };

  const border =
    variant === "hairline" || elevation === "hairline"
      ? "1px solid var(--border-hairline)"
      : "none";

  return (
    <Tag
      style={{
        background: surfaces[variant] || surfaces.default,
        boxShadow: shadows[elevation] ?? shadows.halo,
        borderRadius: radii[radius] || radii.lg,
        border,
        padding: typeof pad === "number" ? `${pad}px` : pad,
        color: "var(--text-primary)",
        boxSizing: "border-box",
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
