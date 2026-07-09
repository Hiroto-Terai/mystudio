import React from "react";

/**
 * Hirot logo — a geometric "sprout" mark (growth / commerce) paired with
 * the wordmark set in the thin display face. The wordmark is live text so
 * it always renders in the brand font and stays crisp at any size.
 */
export function Logo({
  variant = "full",   // "full" | "mark" | "wordmark"
  tone = "dark",       // "dark" (ink on light) | "light" (white on dark)
  size = 28,
  style,
  ...rest
}) {
  const inkColor = tone === "light" ? "var(--on-ink)" : "var(--ink)";
  const markColor = tone === "light" ? "var(--green-30)" : "var(--green-50)";
  const markLeaf2 = tone === "light" ? "var(--green-40)" : "var(--green-40)";

  const mark = (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      aria-hidden={variant !== "mark"}
      style={{ display: "block", flex: "none" }}
    >
      <path d="M24 45 C24 35 24 29 24 22" fill="none" stroke="var(--green-60)" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 23 C25 13 32 7.5 41 8 C41.5 17 34 24 24 23 Z" fill={markColor} />
      <path d="M24 28 C23 20.5 17 16 9 16 C8.5 24 15 29 24 28 Z" fill={markLeaf2} />
    </svg>
  );

  const wordmark = (
    <span
      style={{
        font: "var(--font-display)",
        fontSize: size * 0.86,
        fontWeight: 400,
        letterSpacing: "-0.01em",
        color: inkColor,
        lineHeight: 1,
      }}
    >
      Hirot
    </span>
  );

  if (variant === "mark") return <span style={{ display: "inline-flex", ...style }} aria-label="Hirot" role="img" {...rest}>{mark}</span>;
  if (variant === "wordmark") return <span style={{ display: "inline-flex", alignItems: "center", ...style }} {...rest}>{wordmark}</span>;

  return (
    <span
      style={{ display: "inline-flex", alignItems: "center", gap: size * 0.28, ...style }}
      aria-label="Hirot"
      role="img"
      {...rest}
    >
      {mark}
      {wordmark}
    </span>
  );
}
