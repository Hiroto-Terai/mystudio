import type { CSSProperties, InputHTMLAttributes, ReactNode } from "react";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "style"> {
  label?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  name?: string;
  value?: InputHTMLAttributes<HTMLInputElement>["value"];
  style?: CSSProperties;
}

/**
 * Radio — single-choice control. Ink dot on selection.
 */
export function Radio({ label, checked, defaultChecked, disabled = false, name, value, style, ...rest }: RadioProps) {
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
          type="radio"
          name={name}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          style={{ position: "absolute", opacity: 0, width: 20, height: 20, margin: 0, cursor: "inherit" }}
          {...rest}
        />
        <span
          aria-hidden
          className="hirot-radio-ring"
          style={{
            width: 20,
            height: 20,
            borderRadius: "var(--radius-pill)",
            border: "1.5px solid var(--shade-40)",
            background: "var(--surface-card)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color .15s ease",
          }}
        >
          <span className="hirot-radio-dot" style={{ width: 10, height: 10, borderRadius: "var(--radius-pill)", background: "var(--ink)", transform: "scale(0)", transition: "transform .15s ease" }} />
        </span>
      </span>
      {label && <span>{label}</span>}
      <style>{`
        label:hover .hirot-radio-ring { border-color: var(--green-50); }
        input[type=radio]:checked + .hirot-radio-ring { border-color: var(--ink); }
        input[type=radio]:checked + .hirot-radio-ring .hirot-radio-dot { transform: scale(1); }
        input[type=radio]:focus-visible + .hirot-radio-ring { box-shadow: var(--ring-accent); }
      `}</style>
    </label>
  );
}
