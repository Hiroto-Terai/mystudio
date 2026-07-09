import type { CSSProperties, HTMLAttributes, MouseEventHandler, ReactNode } from "react";

export interface DialogProps extends Omit<HTMLAttributes<HTMLDivElement>, "style" | "title"> {
  open?: boolean;
  onClose?: MouseEventHandler<HTMLElement>;
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  width?: number;
  style?: CSSProperties;
}

/**
 * Dialog — centered modal on a dimmed scrim. Level-4 floating elevation.
 * Controlled via `open`; render your own trigger. Body scroll handling is
 * left to the consumer.
 */
export function Dialog({ open, onClose, title, children, footer, width = 480, style, ...rest }: DialogProps) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(14,16,15,0.42)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        zIndex: 100,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--surface-card)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-4)",
          width: "100%",
          maxWidth: width,
          maxHeight: "88vh",
          overflow: "auto",
          ...style,
        }}
        {...rest}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "24px 24px 0" }}>
          {title && <h3 style={{ font: "var(--heading-lg)", margin: 0, color: "var(--text-primary)" }}>{title}</h3>}
          {onClose && (
            <button onClick={onClose} aria-label="close" style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--text-tertiary)", padding: 4, marginLeft: "auto" }}>
              <svg width="20" height="20" viewBox="0 0 20 20"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>
          )}
        </div>
        <div style={{ padding: "16px 24px 24px", font: "var(--body-md)", color: "var(--text-secondary)" }}>{children}</div>
        {footer && <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, padding: "0 24px 24px" }}>{footer}</div>}
      </div>
    </div>
  );
}
