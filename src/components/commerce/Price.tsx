import type { CSSProperties, HTMLAttributes } from "react";

/** Formats a number as JP yen: 12800 → ¥12,800 */
function yen(n: number) {
  return "¥" + Number(n).toLocaleString("ja-JP");
}

export interface PriceProps extends Omit<HTMLAttributes<HTMLSpanElement>, "style"> {
  amount: number;
  original?: number;
  size?: "sm" | "md" | "lg";
  style?: CSSProperties;
}

/**
 * Price — yen amount with optional original (strike-through) price and a
 * derived discount badge. `size` scales the primary figure.
 */
export function Price({ amount, original, size = "md", style, ...rest }: PriceProps) {
  const sizes = { sm: 16, md: 22, lg: 30 };
  const fs = sizes[size] || sizes.md;
  const off = original && original > amount ? Math.round((1 - amount / original) * 100) : 0;

  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", gap: 8, ...style }} {...rest}>
      {off > 0 && (
        <span style={{ font: "var(--font-body)", fontSize: fs * 0.55, fontWeight: 700, color: "var(--danger)" }}>
          {off}%OFF
        </span>
      )}
      <span style={{ font: "var(--font-body)", fontSize: fs, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "0.01em" }}>
        {yen(amount)}
      </span>
      {off > 0 && (
        <span style={{ font: "var(--font-body)", fontSize: fs * 0.6, color: "var(--text-tertiary)", textDecoration: "line-through" }}>
          {yen(original as number)}
        </span>
      )}
      <span style={{ font: "var(--micro)", color: "var(--text-tertiary)" }}>税込</span>
    </span>
  );
}
