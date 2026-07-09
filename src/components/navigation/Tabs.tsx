import { useState } from "react";
import type { CSSProperties, HTMLAttributes } from "react";

export interface TabItem {
  value: string;
  label: string;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "style" | "onChange"> {
  tabs?: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (v: string) => void;
  style?: CSSProperties;
}

/**
 * Tabs — underline tab strip. Controlled via `value`/`onChange`, or
 * uncontrolled with `defaultValue`. `tabs` is [{value, label}].
 */
export function Tabs({ tabs = [], value, defaultValue, onChange, style, ...rest }: TabsProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? tabs[0]?.value);
  const current = isControlled ? value : internal;

  function select(v: string) {
    if (!isControlled) setInternal(v);
    onChange && onChange(v);
  }

  return (
    <div role="tablist" style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--border-hairline)", ...style }} {...rest}>
      {tabs.map((t) => {
        const on = t.value === current;
        return (
          <button
            key={t.value}
            role="tab"
            aria-selected={on}
            onClick={() => select(t.value)}
            style={{
              font: "var(--font-body)",
              fontSize: 15,
              fontWeight: on ? 600 : 500,
              color: on ? "var(--text-primary)" : "var(--text-secondary)",
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${on ? "var(--green-50)" : "transparent"}`,
              padding: "12px 14px",
              marginBottom: -1,
              cursor: "pointer",
              transition: "color .15s ease, border-color .15s ease",
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
