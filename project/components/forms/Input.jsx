import React, { useState } from "react";

/**
 * Input — text field on light surfaces. Supports label, helper/error text,
 * and optional leading/trailing adornments. Green focus ring.
 */
export function Input({
  label,
  helper,
  error,
  id,
  leading = null,
  trailing = null,
  disabled = false,
  style,
  ...rest
}) {
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
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "var(--surface-card)",
          border: `1px solid ${borderColor}`,
          borderRadius: "var(--radius-md)",
          padding: "0 12px",
          minHeight: 44,
          boxShadow: focus ? "var(--ring-accent)" : "none",
          transition: "border-color .15s ease, box-shadow .15s ease",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {leading && <span style={{ display: "inline-flex", color: "var(--text-tertiary)" }}>{leading}</span>}
        <input
          id={uid}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            font: "var(--body-md)",
            color: "var(--text-primary)",
            padding: "11px 0",
            minWidth: 0,
          }}
          {...rest}
        />
        {trailing && <span style={{ display: "inline-flex", color: "var(--text-tertiary)" }}>{trailing}</span>}
      </span>
      {(helper || error) && (
        <span style={{ display: "block", font: "var(--caption)", color: error ? "var(--danger)" : "var(--text-secondary)", marginTop: 6 }}>
          {error || helper}
        </span>
      )}
    </label>
  );
}
