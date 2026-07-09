import { useState } from "react";
import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from "react";

export type IconButtonVariant = "primary" | "outline" | "ghost";

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  children?: ReactNode;
  variant?: IconButtonVariant;
  size?: number;
  disabled?: boolean;
  label?: string;
  style?: CSSProperties;
}

/**
 * IconButton — a circular pill holding a single icon. Same vocabulary as
 * Button (primary / outline / ghost) but square-ratio and round.
 */
export function IconButton({
  children,
  variant = "ghost",
  size = 44,
  disabled = false,
  label,
  style,
  ...rest
}: IconButtonProps) {
  const [hover, setHover] = useState(false);

  const variants: Record<IconButtonVariant, CSSProperties> = {
    primary: { background: hover ? "var(--shade-70)" : "var(--ink)", color: "var(--on-ink)", border: "none" },
    outline: { background: hover ? "var(--surface-muted)" : "transparent", color: "var(--ink)", border: "1.5px solid var(--ink)" },
    ghost: { background: hover ? "var(--surface-muted)" : "transparent", color: "var(--ink)", border: "none" },
  };

  return (
    <button
      aria-label={label}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: "var(--radius-pill)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "background .18s ease",
        flex: "none",
        ...variants[variant],
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
