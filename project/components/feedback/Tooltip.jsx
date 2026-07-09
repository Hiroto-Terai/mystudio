import React, { useState } from "react";

/**
 * Tooltip — hover/focus label on a dark chip above the trigger. Wraps a
 * single child.
 */
export function Tooltip({ label, children, style, ...rest }) {
  const [show, setShow] = useState(false);
  return (
    <span
      style={{ position: "relative", display: "inline-flex", ...style }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      {...rest}
    >
      {children}
      {show && (
        <span
          role="tooltip"
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--canvas-ink)",
            color: "var(--on-ink)",
            font: "var(--font-body)",
            fontSize: 13,
            fontWeight: 400,
            padding: "6px 10px",
            borderRadius: "var(--radius-sm)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 50,
            boxShadow: "var(--shadow-2)",
          }}
        >
          {label}
        </span>
      )}
    </span>
  );
}
