import React from "react";

/**
 * Badge — compact status marker. Solid or soft tone.
 */
export function Badge({ children, tone = "neutral", solid = false, style, ...rest }) {
  const map = {
    neutral: { soft: ["var(--shade-20)", "var(--shade-60)"], solid: ["var(--ink)", "var(--on-ink)"] },
    accent:  { soft: ["var(--green-10)", "var(--green-70)"], solid: ["var(--green-60)", "var(--on-ink)"] },
    success: { soft: ["var(--green-10)", "var(--green-70)"], solid: ["var(--success)", "var(--on-ink)"] },
    warning: { soft: ["#fbf3d8", "#7a5a00"], solid: ["var(--warning)", "var(--on-ink)"] },
    danger:  { soft: ["#fbe3df", "#8f271b"], solid: ["var(--danger)", "var(--on-ink)"] },
  };
  const [bg, fg] = map[tone][solid ? "solid" : "soft"];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        background: bg,
        color: fg,
        font: "var(--font-body)",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.02em",
        padding: "3px 9px",
        borderRadius: "var(--radius-pill)",
        lineHeight: 1.4,
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
