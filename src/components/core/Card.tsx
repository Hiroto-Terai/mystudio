import type { CSSProperties, ElementType, ReactNode, HTMLAttributes } from "react";

export type CardVariant = "default" | "featured" | "band" | "wash" | "hairline";
export type CardElevation = "flat" | "hairline" | "raised" | "halo";
export type CardRadius = "md" | "lg" | "xl";

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, "style"> {
  children?: ReactNode;
  variant?: CardVariant;
  elevation?: CardElevation;
  radius?: CardRadius;
  pad?: number | string;
  as?: ElementType;
  style?: CSSProperties;
}

/**
 * Card — the generic light surface. The default `elevation="halo"` uses the
 * brand's signature stacked-tiny-shadow depth (Level 3). `variant` recolors
 * the surface for featured (aloe) and band (pistachio) treatments.
 */
export function Card({
  children,
  variant = "default",
  elevation = "halo",
  radius = "lg",
  pad = 32,
  as: Tag = "div",
  style,
  ...rest
}: CardProps) {
  const surfaces: Record<CardVariant, string> = {
    default: "var(--surface-card)",
    featured: "var(--surface-featured)",
    band: "var(--surface-band)",
    wash: "var(--surface-wash)",
    hairline: "var(--surface-card)",
  };
  const shadows: Record<CardElevation, string> = {
    flat: "var(--shadow-0)",
    hairline: "var(--shadow-0)",
    raised: "var(--shadow-2)",
    halo: "var(--shadow-3)",
  };
  const radii: Record<CardRadius, string> = {
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)",
  };

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
