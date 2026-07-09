import { useState } from "react";
import type { CSSProperties, HTMLAttributes } from "react";

export interface QuantityStepperProps extends Omit<HTMLAttributes<HTMLSpanElement>, "style" | "onChange"> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (n: number) => void;
  style?: CSSProperties;
}

/**
 * QuantityStepper — − / value / + control for cart quantities.
 * Controlled via `value`/`onChange`, or uncontrolled with `defaultValue`.
 */
export function QuantityStepper({ value, defaultValue = 1, min = 1, max = 99, onChange, style, ...rest }: QuantityStepperProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const v = isControlled ? value : internal;

  function set(next: number) {
    const clamped = Math.max(min, Math.min(max, next));
    if (!isControlled) setInternal(clamped);
    onChange && onChange(clamped);
  }

  const btn: CSSProperties = {
    width: 40,
    height: 40,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "var(--ink)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid var(--border-hairline)",
        borderRadius: "var(--radius-pill)",
        background: "var(--surface-card)",
        ...style,
      }}
      {...rest}
    >
      <button aria-label="減らす" style={{ ...btn, opacity: v <= min ? 0.3 : 1 }} onClick={() => set(v - 1)} disabled={v <= min}>−</button>
      <span style={{ minWidth: 28, textAlign: "center", font: "var(--body-strong)", color: "var(--text-primary)" }}>{v}</span>
      <button aria-label="増やす" style={{ ...btn, opacity: v >= max ? 0.3 : 1 }} onClick={() => set(v + 1)} disabled={v >= max}>+</button>
    </span>
  );
}
