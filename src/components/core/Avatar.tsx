import type { CSSProperties, HTMLAttributes } from "react";

export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, "style"> {
  src?: string;
  name?: string;
  size?: number;
  square?: boolean;
  style?: CSSProperties;
}

/**
 * Avatar — user or store avatar. Falls back to an initial on a green wash.
 * Customer/store logos in strips should instead be plain greyscale wordmarks
 * at uniform height (see the ui kit), not this component.
 */
export function Avatar({ src, name = "", size = 40, square = false, style, ...rest }: AvatarProps) {
  const initial = (name.trim()[0] || "?").toUpperCase();
  const radius = square ? "var(--radius-md)" : "var(--radius-pill)";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: radius,
        overflow: "hidden",
        background: "var(--surface-wash)",
        color: "var(--green-70)",
        font: "var(--font-body)",
        fontWeight: 600,
        fontSize: size * 0.4,
        flex: "none",
        ...style,
      }}
      {...rest}
    >
      {src ? (
        <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        initial
      )}
    </span>
  );
}
