import type { CSSProperties, HTMLAttributes } from "react";

export interface DividerProps extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
  vertical?: boolean;
  tone?: "light" | "dark";
  style?: CSSProperties;
}

/**
 * Divider — a hairline rule. Horizontal by default; `vertical` for inline use.
 */
export function Divider({ vertical = false, tone = "light", style, ...rest }: DividerProps) {
  const color = tone === "dark" ? "var(--hairline-ink)" : "var(--border-hairline)";
  return (
    <div
      role="separator"
      aria-orientation={vertical ? "vertical" : "horizontal"}
      style={
        vertical
          ? { width: 1, alignSelf: "stretch", background: color, ...style }
          : { height: 1, width: "100%", background: color, border: "none", ...style }
      }
      {...rest}
    />
  );
}
