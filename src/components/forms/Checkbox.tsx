import type { CSSProperties, InputHTMLAttributes, ReactNode } from "react";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "style"> {
  label?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
}

/**
 * Checkbox — controlled or uncontrolled. Ink-filled box with white check.
 */
export function Checkbox({ label, checked, defaultChecked, disabled = false, style, ...rest }: CheckboxProps) {
  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "flex-start",
        gap: 10,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        font: "var(--body-md)",
        color: "var(--text-primary)",
        ...style,
      }}
    >
      <span style={{ position: "relative", display: "inline-flex", flex: "none", marginTop: 2 }}>
        <input
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          style={{ position: "absolute", opacity: 0, width: 20, height: 20, margin: 0, cursor: "inherit" }}
          {...rest}
        />
        <span
          aria-hidden
          className="hirot-check-box"
          style={{
            width: 20,
            height: 20,
            borderRadius: "var(--radius-xs)",
            border: "1.5px solid var(--shade-40)",
            background: "var(--surface-card)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background .15s ease, border-color .15s ease",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6.5l2.5 2.5 4.5-5.5" stroke="var(--on-ink)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
      {label && <span>{label}</span>}
      <style>{`
        label:hover .hirot-check-box { border-color: var(--green-50); }
        input[type=checkbox]:checked + .hirot-check-box { background: var(--ink); border-color: var(--ink); }
        input[type=checkbox]:focus-visible + .hirot-check-box { box-shadow: var(--ring-accent); }
      `}</style>
    </label>
  );
}
