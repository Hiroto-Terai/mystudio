import type { CSSProperties, HTMLAttributes, MouseEventHandler, ReactNode } from "react";

export type TagVariant = "mint" | "shade" | "wash" | "outline";

export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, "style"> {
  children?: ReactNode;
  variant?: TagVariant;
  onRemove?: MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
}

/**
 * Tag — category chip on light surfaces. `mint` signals a feature category;
 * `shade` is neutral; `outline` is a hairline chip. All-caps eyebrow type.
 */
export function Tag({ children, variant = "mint", onRemove, style, ...rest }: TagProps) {
  const variants: Record<TagVariant, CSSProperties> = {
    mint:    { background: "var(--green-20)", color: "var(--ink)", border: "none" },
    shade:   { background: "var(--shade-30)", color: "var(--ink)", border: "none" },
    wash:    { background: "var(--green-05)", color: "var(--green-70)", border: "none" },
    outline: { background: "transparent", color: "var(--ink)", border: "1px solid var(--border-hairline)" },
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        font: "var(--font-display)",
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.04em",
        padding: "5px 12px",
        borderRadius: "var(--radius-pill)",
        lineHeight: 1.4,
        whiteSpace: "nowrap",
        ...variants[variant],
        ...style,
      }}
      {...rest}
    >
      {children}
      {onRemove && (
        <button onClick={onRemove} aria-label="remove" style={{ display: "inline-flex", border: "none", background: "transparent", cursor: "pointer", padding: 0, color: "inherit", opacity: 0.6 }}>
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
      )}
    </span>
  );
}
