import { useState } from "react";
import type { CSSProperties, ReactNode, SelectHTMLAttributes } from "react";

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "style"> {
  label?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  id?: string;
  disabled?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
}

/**
 * Select — native select styled to match Input, with a chevron adornment.
 */
export function Select({ label, helper, error, id, disabled = false, children, style, ...rest }: SelectProps) {
  const [focus, setFocus] = useState(false);
  const uid = id || rest.name || undefined;
  const borderColor = error ? "var(--danger)" : focus ? "var(--green-50)" : "var(--border-hairline)";

  return (
    <label htmlFor={uid} style={{ display: "block", ...style }}>
      {label && (
        <span style={{ display: "block", font: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "var(--text-primary)", marginBottom: 6 }}>
          {label}
        </span>
      )}
      <span
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          background: "var(--surface-card)",
          border: `1px solid ${borderColor}`,
          borderRadius: "var(--radius-md)",
          minHeight: 44,
          boxShadow: focus ? "var(--ring-accent)" : "none",
          transition: "border-color .15s ease, box-shadow .15s ease",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <select
          id={uid}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            font: "var(--body-md)",
            color: "var(--text-primary)",
            padding: "11px 40px 11px 12px",
            cursor: "pointer",
          }}
          {...rest}
        >
          {children}
        </select>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ position: "absolute", right: 14, pointerEvents: "none", color: "var(--text-secondary)" }}>
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {(helper || error) && (
        <span style={{ display: "block", font: "var(--caption)", color: error ? "var(--danger)" : "var(--text-secondary)", marginTop: 6 }}>
          {error || helper}
        </span>
      )}
    </label>
  );
}
