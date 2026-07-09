import type { CSSProperties, HTMLAttributes } from "react";

function Star({ fill }: { fill: number }) {
  // fill: 0..1 fraction
  const id = "sg" + Math.random().toString(36).slice(2);
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" style={{ display: "block" }}>
      <defs>
        <linearGradient id={id}>
          <stop offset={`${fill * 100}%`} stopColor="var(--green-50)" />
          <stop offset={`${fill * 100}%`} stopColor="var(--shade-30)" />
        </linearGradient>
      </defs>
      <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15l-5.2 2.6 1-5.8L1.5 7.7l5.9-.9z" fill={`url(#${id})`} />
    </svg>
  );
}

export interface RatingProps extends Omit<HTMLAttributes<HTMLSpanElement>, "style"> {
  value?: number;
  count?: number;
  size?: number;
  style?: CSSProperties;
}

/**
 * Rating — 5-star display with fractional fill and an optional review count.
 * Read-only (display) rating for product cards and detail pages.
 */
export function Rating({ value = 0, count, size = 16, style, ...rest }: RatingProps) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, ...style }} {...rest}>
      <span style={{ display: "inline-flex", gap: 1 }} aria-label={`${value} / 5`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} fill={Math.max(0, Math.min(1, value - i))} />
        ))}
      </span>
      <span style={{ font: "var(--font-body)", fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{value.toFixed(1)}</span>
      {count != null && <span style={{ font: "var(--micro)", color: "var(--text-tertiary)" }}>({count})</span>}
    </span>
  );
}
