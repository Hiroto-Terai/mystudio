import { useState } from "react";
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style" | "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: ReactNode;
  style?: CSSProperties;
}

/**
 * Switch — on/off toggle. Green when on (growth = active). Controlled via
 * `checked`/`onChange`, or uncontrolled with `defaultChecked`.
 */
export function Switch({ checked, defaultChecked = false, onChange, disabled = false, label, style, ...rest }: SwitchProps) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState(defaultChecked);
  const on = isControlled ? checked : internal;

  function toggle() {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on);
  }

  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, font: "var(--body-md)", color: "var(--text-primary)", ...style }}>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        disabled={disabled}
        onClick={toggle}
        style={{
          width: 44,
          height: 26,
          borderRadius: "var(--radius-pill)",
          border: "none",
          padding: 3,
          background: on ? "var(--green-50)" : "var(--shade-30)",
          cursor: "inherit",
          transition: "background .18s ease",
          display: "inline-flex",
          alignItems: "center",
          flex: "none",
        }}
        {...rest}
      >
        <span
          style={{
            width: 20,
            height: 20,
            borderRadius: "var(--radius-pill)",
            background: "#fff",
            boxShadow: "0 1px 2px rgba(0,0,0,0.25)",
            transform: on ? "translateX(18px)" : "translateX(0)",
            transition: "transform .18s ease",
          }}
        />
      </button>
      {label && <span>{label}</span>}
    </label>
  );
}
