import React from "react";

/**
 * Toast — a floating notification card. Uses the halo elevation. Pair with
 * your own timeout/stack logic; this renders one message.
 */
export function Toast({ title, message, tone = "neutral", onClose, style, ...rest }) {
  const accent = {
    neutral: "var(--ink)",
    success: "var(--green-50)",
    danger: "var(--danger)",
    warning: "var(--warning)",
  }[tone];

  return (
    <div
      role="status"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        background: "var(--surface-card)",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-4)",
        padding: "14px 16px",
        minWidth: 280,
        maxWidth: 400,
        ...style,
      }}
      {...rest}
    >
      <span style={{ width: 4, alignSelf: "stretch", borderRadius: 4, background: accent, flex: "none" }} />
      <div style={{ flex: 1 }}>
        {title && <div style={{ font: "var(--body-strong)", color: "var(--text-primary)", marginBottom: 2 }}>{title}</div>}
        {message && <div style={{ font: "var(--caption)", color: "var(--text-secondary)" }}>{message}</div>}
      </div>
      {onClose && (
        <button onClick={onClose} aria-label="close" style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--text-tertiary)", padding: 2 }}>
          <svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
      )}
    </div>
  );
}
