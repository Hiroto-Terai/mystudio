/* @ds-bundle: {"format":3,"namespace":"HirotDesignSystem_e62cf3","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"Price","sourcePath":"components/commerce/Price.jsx"},{"name":"ProductCard","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"QuantityStepper","sourcePath":"components/commerce/QuantityStepper.jsx"},{"name":"Rating","sourcePath":"components/commerce/Rating.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Divider","sourcePath":"components/core/Divider.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Tag","sourcePath":"components/feedback/Tag.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Breadcrumb","sourcePath":"components/navigation/Breadcrumb.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"931f228de48c","components/buttons/IconButton.jsx":"379c479a2420","components/commerce/Price.jsx":"0e37ce3e52ca","components/commerce/ProductCard.jsx":"1c5aaa05a7e1","components/commerce/QuantityStepper.jsx":"b1662f87a1da","components/commerce/Rating.jsx":"3ad0f8145ec5","components/core/Avatar.jsx":"a7134b880677","components/core/Card.jsx":"61e11cbfe949","components/core/Divider.jsx":"c94083af2135","components/core/Logo.jsx":"de0f9e461721","components/feedback/Badge.jsx":"2f1b931a9929","components/feedback/Dialog.jsx":"daf1c788d05b","components/feedback/Tag.jsx":"82691e56c209","components/feedback/Toast.jsx":"97848407403a","components/feedback/Tooltip.jsx":"c48de9ef5e12","components/forms/Checkbox.jsx":"241ff4600236","components/forms/Input.jsx":"0bc91ee30204","components/forms/Radio.jsx":"8989281a1421","components/forms/Select.jsx":"65fabad54ff9","components/forms/Switch.jsx":"fd11c236ecb7","components/navigation/Breadcrumb.jsx":"369b74693cb5","components/navigation/Footer.jsx":"2a98325b6194","components/navigation/NavBar.jsx":"f61d291f8cde","components/navigation/Tabs.jsx":"9f92fec93506","ui_kits/storefront/Cart.jsx":"69cfa1e8d853","ui_kits/storefront/Catalog.jsx":"48c113fd35fe","ui_kits/storefront/Home.jsx":"f3c837a55a00","ui_kits/storefront/data.js":"12bef1b0f5fe","ui_kits/storefront/tweaks-panel.jsx":"6591467622ed"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HirotDesignSystem_e62cf3 = window.HirotDesignSystem_e62cf3 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Button — the pill CTA. Pill shape is non-negotiable; variants change fill /
 * border / canvas, never shape.
 *   primary  → solid ink pill (dominant CTA)
 *   accent   → solid green pill (growth action)
 *   featured → aloe-mint pill (the "start free" / highlighted tier)
 *   outline  → hairline pill on light
 *   ghost    → text-only pill, wash on hover
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  as: Tag = "button",
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const sizes = {
    sm: {
      fontSize: 14,
      padding: "8px 18px",
      gap: 6
    },
    md: {
      fontSize: 16,
      padding: "12px 24px",
      gap: 8
    },
    lg: {
      fontSize: 17,
      padding: "15px 32px",
      gap: 10
    }
  };
  const base = {
    display: fullWidth ? "flex" : "inline-flex",
    width: fullWidth ? "100%" : "auto",
    alignItems: "center",
    justifyContent: "center",
    gap: sizes[size].gap,
    font: "var(--font-body)",
    fontWeight: 500,
    fontSize: sizes[size].fontSize,
    lineHeight: 1.25,
    letterSpacing: "0.01em",
    padding: sizes[size].padding,
    borderRadius: "var(--radius-pill)",
    border: "1.5px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    transition: "background .18s ease, color .18s ease, border-color .18s ease, transform .08s ease",
    transform: active && !disabled ? "scale(0.98)" : "scale(1)",
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    minHeight: 44
  };
  const variants = {
    primary: {
      background: active ? "var(--btn-primary-press)" : hover ? "var(--shade-70)" : "var(--btn-primary-bg)",
      color: "var(--btn-primary-fg)"
    },
    accent: {
      background: hover ? "var(--green-70)" : "var(--btn-accent-bg)",
      color: "var(--btn-accent-fg)"
    },
    featured: {
      background: hover ? "var(--green-30)" : "var(--btn-featured-bg)",
      color: "var(--btn-featured-fg)"
    },
    outline: {
      background: hover ? "var(--surface-muted)" : "transparent",
      color: "var(--ink)",
      borderColor: "var(--ink)"
    },
    ghost: {
      background: hover ? "var(--surface-muted)" : "transparent",
      color: "var(--ink)"
    }
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    disabled: Tag === "button" ? disabled : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
      ...base,
      ...variants[variant],
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * IconButton — a circular pill holding a single icon. Same vocabulary as
 * Button (primary / outline / ghost) but square-ratio and round.
 */
function IconButton({
  children,
  variant = "ghost",
  size = 44,
  disabled = false,
  label,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const variants = {
    primary: {
      background: hover ? "var(--shade-70)" : "var(--ink)",
      color: "var(--on-ink)",
      border: "none"
    },
    outline: {
      background: hover ? "var(--surface-muted)" : "transparent",
      color: "var(--ink)",
      border: "1.5px solid var(--ink)"
    },
    ghost: {
      background: hover ? "var(--surface-muted)" : "transparent",
      color: "var(--ink)",
      border: "none"
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      borderRadius: "var(--radius-pill)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      transition: "background .18s ease",
      flex: "none",
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/commerce/Price.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Formats a number as JP yen: 12800 → ¥12,800 */
function yen(n) {
  return "¥" + Number(n).toLocaleString("ja-JP");
}

/**
 * Price — yen amount with optional original (strike-through) price and a
 * derived discount badge. `size` scales the primary figure.
 */
function Price({
  amount,
  original,
  size = "md",
  style,
  ...rest
}) {
  const sizes = {
    sm: 16,
    md: 22,
    lg: 30
  };
  const fs = sizes[size] || sizes.md;
  const off = original && original > amount ? Math.round((1 - amount / original) * 100) : 0;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "baseline",
      gap: 8,
      ...style
    }
  }, rest), off > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-body)",
      fontSize: fs * 0.55,
      fontWeight: 700,
      color: "var(--danger)"
    }
  }, off, "%OFF"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-body)",
      fontSize: fs,
      fontWeight: 600,
      color: "var(--text-primary)",
      letterSpacing: "0.01em"
    }
  }, yen(amount)), off > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-body)",
      fontSize: fs * 0.6,
      color: "var(--text-tertiary)",
      textDecoration: "line-through"
    }
  }, yen(original)), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--micro)",
      color: "var(--text-tertiary)"
    }
  }, "\u7A0E\u8FBC"));
}
Object.assign(__ds_scope, { Price });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/Price.jsx", error: String((e && e.message) || e) }); }

// components/commerce/QuantityStepper.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * QuantityStepper — − / value / + control for cart quantities.
 * Controlled via `value`/`onChange`, or uncontrolled with `defaultValue`.
 */
function QuantityStepper({
  value,
  defaultValue = 1,
  min = 1,
  max = 99,
  onChange,
  style,
  ...rest
}) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const v = isControlled ? value : internal;
  function set(next) {
    const clamped = Math.max(min, Math.min(max, next));
    if (!isControlled) setInternal(clamped);
    onChange && onChange(clamped);
  }
  const btn = {
    width: 40,
    height: 40,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "var(--ink)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      border: "1px solid var(--border-hairline)",
      borderRadius: "var(--radius-pill)",
      background: "var(--surface-card)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("button", {
    "aria-label": "\u6E1B\u3089\u3059",
    style: {
      ...btn,
      opacity: v <= min ? 0.3 : 1
    },
    onClick: () => set(v - 1),
    disabled: v <= min
  }, "\u2212"), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 28,
      textAlign: "center",
      font: "var(--body-strong)",
      color: "var(--text-primary)"
    }
  }, v), /*#__PURE__*/React.createElement("button", {
    "aria-label": "\u5897\u3084\u3059",
    style: {
      ...btn,
      opacity: v >= max ? 0.3 : 1
    },
    onClick: () => set(v + 1),
    disabled: v >= max
  }, "+"));
}
Object.assign(__ds_scope, { QuantityStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/QuantityStepper.jsx", error: String((e && e.message) || e) }); }

// components/commerce/Rating.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Star({
  fill
}) {
  // fill: 0..1 fraction
  const id = "sg" + Math.random().toString(36).slice(2);
  return /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 20 20",
    style: {
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: id
  }, /*#__PURE__*/React.createElement("stop", {
    offset: `${fill * 100}%`,
    stopColor: "var(--green-50)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: `${fill * 100}%`,
    stopColor: "var(--shade-30)"
  }))), /*#__PURE__*/React.createElement("path", {
    d: "M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15l-5.2 2.6 1-5.8L1.5 7.7l5.9-.9z",
    fill: `url(#${id})`
  }));
}

/**
 * Rating — 5-star display with fractional fill and an optional review count.
 * Read-only (display) rating for product cards and detail pages.
 */
function Rating({
  value = 0,
  count,
  size = 16,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 1
    },
    "aria-label": `${value} / 5`
  }, [0, 1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement(Star, {
    key: i,
    fill: Math.max(0, Math.min(1, value - i))
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-body)",
      fontSize: 13,
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, value.toFixed(1)), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--micro)",
      color: "var(--text-tertiary)"
    }
  }, "(", count, ")"));
}
Object.assign(__ds_scope, { Rating });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/Rating.jsx", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Avatar — user or store avatar. Falls back to an initial on a green wash.
 * Customer/store logos in strips should instead be plain greyscale wordmarks
 * at uniform height (see the ui kit), not this component.
 */
function Avatar({
  src,
  name = "",
  size = 40,
  square = false,
  style,
  ...rest
}) {
  const initial = (name.trim()[0] || "?").toUpperCase();
  const radius = square ? "var(--radius-md)" : "var(--radius-pill)";
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      borderRadius: radius,
      overflow: "hidden",
      background: "var(--surface-wash)",
      color: "var(--green-70)",
      font: "var(--font-body)",
      fontWeight: 600,
      fontSize: size * 0.4,
      flex: "none",
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initial);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — the generic light surface. The default `elevation="halo"` uses the
 * brand's signature stacked-tiny-shadow depth (Level 3). `variant` recolors
 * the surface for featured (aloe) and band (pistachio) treatments.
 */
function Card({
  children,
  variant = "default",
  // "default" | "featured" | "band" | "wash" | "hairline"
  elevation = "halo",
  // "flat" | "hairline" | "raised" | "halo"
  radius = "lg",
  // "md" | "lg" | "xl"
  pad = 32,
  as: Tag = "div",
  style,
  ...rest
}) {
  const surfaces = {
    default: "var(--surface-card)",
    featured: "var(--surface-featured)",
    band: "var(--surface-band)",
    wash: "var(--surface-wash)",
    hairline: "var(--surface-card)"
  };
  const shadows = {
    flat: "var(--shadow-0)",
    hairline: "var(--shadow-0)",
    raised: "var(--shadow-2)",
    halo: "var(--shadow-3)"
  };
  const radii = {
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)"
  };
  const border = variant === "hairline" || elevation === "hairline" ? "1px solid var(--border-hairline)" : "none";
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      background: surfaces[variant] || surfaces.default,
      boxShadow: shadows[elevation] ?? shadows.halo,
      borderRadius: radii[radius] || radii.lg,
      border,
      padding: typeof pad === "number" ? `${pad}px` : pad,
      color: "var(--text-primary)",
      boxSizing: "border-box",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Divider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Divider — a hairline rule. Horizontal by default; `vertical` for inline use.
 */
function Divider({
  vertical = false,
  tone = "light",
  style,
  ...rest
}) {
  const color = tone === "dark" ? "var(--hairline-ink)" : "var(--border-hairline)";
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "separator",
    "aria-orientation": vertical ? "vertical" : "horizontal",
    style: vertical ? {
      width: 1,
      alignSelf: "stretch",
      background: color,
      ...style
    } : {
      height: 1,
      width: "100%",
      background: color,
      border: "none",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Divider.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Hirot logo — a geometric "sprout" mark (growth / commerce) paired with
 * the wordmark set in the thin display face. The wordmark is live text so
 * it always renders in the brand font and stays crisp at any size.
 */
function Logo({
  variant = "full",
  // "full" | "mark" | "wordmark"
  tone = "dark",
  // "dark" (ink on light) | "light" (white on dark)
  size = 28,
  style,
  ...rest
}) {
  const inkColor = tone === "light" ? "var(--on-ink)" : "var(--ink)";
  const markColor = tone === "light" ? "var(--green-30)" : "var(--green-50)";
  const markLeaf2 = tone === "light" ? "var(--green-40)" : "var(--green-40)";
  const mark = /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 48 48",
    width: size,
    height: size,
    "aria-hidden": variant !== "mark",
    style: {
      display: "block",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M24 45 C24 35 24 29 24 22",
    fill: "none",
    stroke: "var(--green-60)",
    strokeWidth: "3",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M24 23 C25 13 32 7.5 41 8 C41.5 17 34 24 24 23 Z",
    fill: markColor
  }), /*#__PURE__*/React.createElement("path", {
    d: "M24 28 C23 20.5 17 16 9 16 C8.5 24 15 29 24 28 Z",
    fill: markLeaf2
  }));
  const wordmark = /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-display)",
      fontSize: size * 0.86,
      fontWeight: 400,
      letterSpacing: "-0.01em",
      color: inkColor,
      lineHeight: 1
    }
  }, "Hirot");
  if (variant === "mark") return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      ...style
    },
    "aria-label": "Hirot",
    role: "img"
  }, rest), mark);
  if (variant === "wordmark") return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      ...style
    }
  }, rest), wordmark);
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: size * 0.28,
      ...style
    },
    "aria-label": "Hirot",
    role: "img"
  }, rest), mark, wordmark);
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — compact status marker. Solid or soft tone.
 */
function Badge({
  children,
  tone = "neutral",
  solid = false,
  style,
  ...rest
}) {
  const map = {
    neutral: {
      soft: ["var(--shade-20)", "var(--shade-60)"],
      solid: ["var(--ink)", "var(--on-ink)"]
    },
    accent: {
      soft: ["var(--green-10)", "var(--green-70)"],
      solid: ["var(--green-60)", "var(--on-ink)"]
    },
    success: {
      soft: ["var(--green-10)", "var(--green-70)"],
      solid: ["var(--success)", "var(--on-ink)"]
    },
    warning: {
      soft: ["#fbf3d8", "#7a5a00"],
      solid: ["var(--warning)", "var(--on-ink)"]
    },
    danger: {
      soft: ["#fbe3df", "#8f271b"],
      solid: ["var(--danger)", "var(--on-ink)"]
    }
  };
  const [bg, fg] = map[tone][solid ? "solid" : "soft"];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      background: bg,
      color: fg,
      font: "var(--font-body)",
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "0.02em",
      padding: "3px 9px",
      borderRadius: "var(--radius-pill)",
      lineHeight: 1.4,
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Dialog — centered modal on a dimmed scrim. Level-4 floating elevation.
 * Controlled via `open`; render your own trigger. Body scroll handling is
 * left to the consumer.
 */
function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
  width = 480,
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(14,16,15,0.42)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      zIndex: 100
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-4)",
      width: "100%",
      maxWidth: width,
      maxHeight: "88vh",
      overflow: "auto",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      padding: "24px 24px 0"
    }
  }, title && /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "var(--heading-lg)",
      margin: 0,
      color: "var(--text-primary)"
    }
  }, title), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "close",
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "var(--text-tertiary)",
      padding: 4,
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 5l10 10M15 5L5 15",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 24px 24px",
      font: "var(--body-md)",
      color: "var(--text-secondary)"
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 12,
      padding: "0 24px 24px"
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tag — category chip on light surfaces. `mint` signals a feature category;
 * `shade` is neutral; `outline` is a hairline chip. All-caps eyebrow type.
 */
function Tag({
  children,
  variant = "mint",
  onRemove,
  style,
  ...rest
}) {
  const variants = {
    mint: {
      background: "var(--green-20)",
      color: "var(--ink)",
      border: "none"
    },
    shade: {
      background: "var(--shade-30)",
      color: "var(--ink)",
      border: "none"
    },
    wash: {
      background: "var(--green-05)",
      color: "var(--green-70)",
      border: "none"
    },
    outline: {
      background: "transparent",
      color: "var(--ink)",
      border: "1px solid var(--border-hairline)"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      font: "var(--font-display)",
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: "0.04em",
      padding: "5px 12px",
      borderRadius: "var(--radius-pill)",
      lineHeight: 1.4,
      whiteSpace: "nowrap",
      ...variants[variant],
      ...style
    }
  }, rest), children, onRemove && /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    "aria-label": "remove",
    style: {
      display: "inline-flex",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      padding: 0,
      color: "inherit",
      opacity: 0.6
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 3l6 6M9 3l-6 6",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }))));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tag.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * ProductCard — the storefront tile. Full-bleed image on top (escapes into a
 * rounded frame), then tag / title / rating / price. Lifts to the halo
 * elevation on hover. Add-to-cart is an overlay pill that appears on hover.
 */
function ProductCard({
  image,
  title = "商品名",
  brand,
  price,
  original,
  rating,
  reviews,
  tag,
  soldOut = false,
  onAdd,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: onClick,
    style: {
      display: "flex",
      flexDirection: "column",
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      cursor: "pointer",
      boxShadow: hover ? "var(--shadow-3)" : "var(--shadow-0)",
      transform: hover ? "translateY(-3px)" : "none",
      transition: "box-shadow .2s ease, transform .2s ease",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      background: "var(--surface-wash)",
      aspectRatio: "4 / 5"
    }
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: title,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      filter: soldOut ? "grayscale(1)" : "none",
      opacity: soldOut ? 0.7 : 1
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--green-40)",
      font: "var(--caption)"
    }
  }, "IMAGE"), tag && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 12,
      left: 12
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    variant: "mint"
  }, tag)), soldOut && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 12,
      left: 12,
      background: "var(--ink)",
      color: "var(--on-ink)",
      font: "var(--micro)",
      padding: "4px 10px",
      borderRadius: "var(--radius-pill)"
    }
  }, "SOLD OUT"), !soldOut && onAdd && /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onAdd();
    },
    "aria-label": "\u30AB\u30FC\u30C8\u306B\u8FFD\u52A0",
    style: {
      position: "absolute",
      right: 12,
      bottom: 12,
      width: 44,
      height: 44,
      borderRadius: "var(--radius-pill)",
      border: "none",
      background: "var(--ink)",
      color: "var(--on-ink)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: hover ? 1 : 0,
      transform: hover ? "translateY(0)" : "translateY(6px)",
      transition: "opacity .2s ease, transform .2s ease",
      boxShadow: "var(--shadow-2)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 4px 4px",
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, brand && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-display)",
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--text-tertiary)"
    }
  }, brand), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--heading-sm)",
      color: "var(--text-primary)",
      lineHeight: 1.4
    }
  }, title), rating != null && /*#__PURE__*/React.createElement(__ds_scope.Rating, {
    value: rating,
    count: reviews
  }), price != null && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Price, {
    amount: price,
    original: original,
    size: "md"
  }))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Toast — a floating notification card. Uses the halo elevation. Pair with
 * your own timeout/stack logic; this renders one message.
 */
function Toast({
  title,
  message,
  tone = "neutral",
  onClose,
  style,
  ...rest
}) {
  const accent = {
    neutral: "var(--ink)",
    success: "var(--green-50)",
    danger: "var(--danger)",
    warning: "var(--warning)"
  }[tone];
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 12,
      background: "var(--surface-card)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-4)",
      padding: "14px 16px",
      minWidth: 280,
      maxWidth: 400,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 4,
      alignSelf: "stretch",
      borderRadius: 4,
      background: accent,
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--body-strong)",
      color: "var(--text-primary)",
      marginBottom: 2
    }
  }, title), message && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--caption)",
      color: "var(--text-secondary)"
    }
  }, message)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "close",
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "var(--text-tertiary)",
      padding: 2
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 4l8 8M12 4l-8 8",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }))));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Tooltip — hover/focus label on a dark chip above the trigger. Wraps a
 * single child.
 */
function Tooltip({
  label,
  children,
  style,
  ...rest
}) {
  const [show, setShow] = useState(false);
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: "relative",
      display: "inline-flex",
      ...style
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false)
  }, rest), children, show && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
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
      boxShadow: "var(--shadow-2)"
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Checkbox — controlled or uncontrolled. Ink-filled box with white check.
 */
function Checkbox({
  label,
  checked,
  defaultChecked,
  disabled = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "flex-start",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      font: "var(--body-md)",
      color: "var(--text-primary)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      flex: "none",
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    defaultChecked: defaultChecked,
    disabled: disabled,
    style: {
      position: "absolute",
      opacity: 0,
      width: 20,
      height: 20,
      margin: 0,
      cursor: "inherit"
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    className: "hirot-check-box",
    style: {
      width: 20,
      height: 20,
      borderRadius: "var(--radius-xs)",
      border: "1.5px solid var(--shade-40)",
      background: "var(--surface-card)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background .15s ease, border-color .15s ease"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2.5 6.5l2.5 2.5 4.5-5.5",
    stroke: "var(--on-ink)",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))), label && /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("style", null, `
        label:hover .hirot-check-box { border-color: var(--green-50); }
        input[type=checkbox]:checked + .hirot-check-box { background: var(--ink); border-color: var(--ink); }
        input[type=checkbox]:focus-visible + .hirot-check-box { box-shadow: var(--ring-accent); }
      `));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Input — text field on light surfaces. Supports label, helper/error text,
 * and optional leading/trailing adornments. Green focus ring.
 */
function Input({
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
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: uid,
    style: {
      display: "block",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: "var(--font-body)",
      fontSize: 14,
      fontWeight: 500,
      color: "var(--text-primary)",
      marginBottom: 6
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
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
      opacity: disabled ? 0.5 : 1
    }
  }, leading && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: "var(--text-tertiary)"
    }
  }, leading), /*#__PURE__*/React.createElement("input", _extends({
    id: uid,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: "none",
      outline: "none",
      background: "transparent",
      font: "var(--body-md)",
      color: "var(--text-primary)",
      padding: "11px 0",
      minWidth: 0
    }
  }, rest)), trailing && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: "var(--text-tertiary)"
    }
  }, trailing)), (helper || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: "var(--caption)",
      color: error ? "var(--danger)" : "var(--text-secondary)",
      marginTop: 6
    }
  }, error || helper));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Radio — single-choice control. Ink dot on selection.
 */
function Radio({
  label,
  checked,
  defaultChecked,
  disabled = false,
  name,
  value,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "flex-start",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      font: "var(--body-md)",
      color: "var(--text-primary)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      flex: "none",
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    defaultChecked: defaultChecked,
    disabled: disabled,
    style: {
      position: "absolute",
      opacity: 0,
      width: 20,
      height: 20,
      margin: 0,
      cursor: "inherit"
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    className: "hirot-radio-ring",
    style: {
      width: 20,
      height: 20,
      borderRadius: "var(--radius-pill)",
      border: "1.5px solid var(--shade-40)",
      background: "var(--surface-card)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "border-color .15s ease"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hirot-radio-dot",
    style: {
      width: 10,
      height: 10,
      borderRadius: "var(--radius-pill)",
      background: "var(--ink)",
      transform: "scale(0)",
      transition: "transform .15s ease"
    }
  }))), label && /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("style", null, `
        label:hover .hirot-radio-ring { border-color: var(--green-50); }
        input[type=radio]:checked + .hirot-radio-ring { border-color: var(--ink); }
        input[type=radio]:checked + .hirot-radio-ring .hirot-radio-dot { transform: scale(1); }
        input[type=radio]:focus-visible + .hirot-radio-ring { box-shadow: var(--ring-accent); }
      `));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Select — native select styled to match Input, with a chevron adornment.
 */
function Select({
  label,
  helper,
  error,
  id,
  disabled = false,
  children,
  style,
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  const uid = id || rest.name || undefined;
  const borderColor = error ? "var(--danger)" : focus ? "var(--green-50)" : "var(--border-hairline)";
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: uid,
    style: {
      display: "block",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: "var(--font-body)",
      fontSize: 14,
      fontWeight: 500,
      color: "var(--text-primary)",
      marginBottom: 6
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      background: "var(--surface-card)",
      border: `1px solid ${borderColor}`,
      borderRadius: "var(--radius-md)",
      minHeight: 44,
      boxShadow: focus ? "var(--ring-accent)" : "none",
      transition: "border-color .15s ease, box-shadow .15s ease",
      opacity: disabled ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: uid,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: "none",
      WebkitAppearance: "none",
      flex: 1,
      border: "none",
      outline: "none",
      background: "transparent",
      font: "var(--body-md)",
      color: "var(--text-primary)",
      padding: "11px 40px 11px 12px",
      cursor: "pointer"
    }
  }, rest), children), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    style: {
      position: "absolute",
      right: 14,
      pointerEvents: "none",
      color: "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6l4 4 4-4",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), (helper || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: "var(--caption)",
      color: error ? "var(--danger)" : "var(--text-secondary)",
      marginTop: 6
    }
  }, error || helper));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Switch — on/off toggle. Green when on (growth = active). Controlled via
 * `checked`/`onChange`, or uncontrolled with `defaultChecked`.
 */
function Switch({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  label,
  style,
  ...rest
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState(defaultChecked);
  const on = isControlled ? checked : internal;
  function toggle() {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on);
  }
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      font: "var(--body-md)",
      color: "var(--text-primary)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "switch",
    "aria-checked": on,
    disabled: disabled,
    onClick: toggle,
    style: {
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
      flex: "none"
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: "var(--radius-pill)",
      background: "#fff",
      boxShadow: "0 1px 2px rgba(0,0,0,0.25)",
      transform: on ? "translateX(18px)" : "translateX(0)",
      transition: "transform .18s ease"
    }
  })), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumb.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Breadcrumb — trailing navigation for EC category paths.
 * Pass `items` as [{label, href}]; the last item renders as current.
 */
function Breadcrumb({
  items = [],
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    "aria-label": "breadcrumb",
    style: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 8,
      font: "var(--caption)",
      ...style
    }
  }, rest), items.map((it, i) => {
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, last ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-primary)",
        fontWeight: 500
      },
      "aria-current": "page"
    }, it.label) : /*#__PURE__*/React.createElement("a", {
      href: it.href || "#",
      style: {
        color: "var(--text-secondary)",
        textDecoration: "none"
      }
    }, it.label), !last && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-tertiary)"
      },
      "aria-hidden": true
    }, "\u203A"));
  }));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Footer — full-width footer. `tone="dark"` for the cinematic ink footer,
 * `tone="light"` for transactional pages. `columns` is [{title, links:[{label,href}]}].
 */
function Footer({
  tone = "dark",
  columns = [],
  note = "© Hirot Inc.",
  style,
  ...rest
}) {
  const dark = tone === "dark";
  const bg = dark ? "var(--canvas-ink)" : "var(--surface-card)";
  const fg = dark ? "var(--on-ink)" : "var(--ink)";
  const linkColor = dark ? "var(--link-quiet)" : "var(--text-secondary)";
  const border = dark ? "var(--hairline-ink)" : "var(--border-hairline)";
  return /*#__PURE__*/React.createElement("footer", _extends({
    style: {
      background: bg,
      color: fg,
      padding: "64px 24px 32px",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 48,
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 260
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    tone: dark ? "light" : "dark",
    size: 26
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--caption)",
      color: linkColor,
      marginTop: 16
    }
  }, "\u6210\u679C\u306B\u3064\u306A\u304C\u308BEC\u30B5\u30A4\u30C8\u3092\u3001\u30C7\u30B6\u30A4\u30F3\u304B\u3089\u904B\u7528\u307E\u3067\u3002")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 48
    }
  }, columns.map(col => /*#__PURE__*/React.createElement("div", {
    key: col.title,
    style: {
      minWidth: 120
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--font-display)",
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: dark ? "var(--link-mint)" : "var(--text-tertiary)",
      marginBottom: 14
    }
  }, col.title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, col.links.map(l => /*#__PURE__*/React.createElement("li", {
    key: l.label
  }, /*#__PURE__*/React.createElement("a", {
    href: l.href || "#",
    style: {
      font: "var(--caption)",
      color: linkColor,
      textDecoration: "none"
    }
  }, l.label)))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48,
      paddingTop: 24,
      borderTop: `1px solid ${border}`,
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--micro)",
      color: linkColor
    }
  }, note), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--micro)",
      color: linkColor
    }
  }, "\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC \u30FB \u5229\u7528\u898F\u7D04"))));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
function CartIcon() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 3h2l2.4 12.3a1 1 0 001 .7h8.7a1 1 0 001-.8L21 7H6",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "20",
    r: "1.4",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17.5",
    cy: "20",
    r: "1.4",
    fill: "currentColor"
  }));
}
function SearchIcon() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 20l-3.5-3.5",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }));
}

/**
 * NavBar — top navigation. Logo left, links center, actions (search, cart,
 * CTAs) right. `tone` flips the whole bar between light and rare dark canvas.
 */
function NavBar({
  tone = "light",
  links = [],
  cartCount = 0,
  ctaLabel = "無料で相談する",
  onCta,
  onCartClick,
  onLinkClick,
  onLogoClick,
  style,
  ...rest
}) {
  const [open, setOpen] = useState(false);
  const dark = tone === "dark";
  const fg = dark ? "var(--on-ink)" : "var(--ink)";
  const bg = dark ? "var(--canvas-ink)" : "var(--surface-card)";
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      gap: 24,
      background: bg,
      color: fg,
      padding: "16px 24px",
      borderBottom: dark ? "1px solid var(--hairline-ink)" : "1px solid var(--border-hairline)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    onClick: onLogoClick,
    style: {
      cursor: onLogoClick ? "pointer" : "default",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    tone: dark ? "light" : "dark",
    size: 26
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 26,
      marginLeft: 20,
      flex: 1
    },
    className: "hirot-nav-links"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    href: l.href || "#",
    onClick: e => {
      if (onLinkClick) {
        e.preventDefault();
        onLinkClick(l);
      }
    },
    style: {
      font: "var(--font-body)",
      fontSize: 15,
      fontWeight: 500,
      color: fg,
      textDecoration: "none",
      opacity: 0.86
    }
  }, l.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    "aria-label": "\u691C\u7D22",
    style: {
      display: "inline-flex",
      padding: 10,
      border: "none",
      background: "transparent",
      color: fg,
      cursor: "pointer",
      borderRadius: "var(--radius-pill)"
    }
  }, /*#__PURE__*/React.createElement(SearchIcon, null)), /*#__PURE__*/React.createElement("button", {
    "aria-label": "\u30AB\u30FC\u30C8",
    onClick: onCartClick,
    style: {
      position: "relative",
      display: "inline-flex",
      padding: 10,
      border: "none",
      background: "transparent",
      color: fg,
      cursor: "pointer",
      borderRadius: "var(--radius-pill)"
    }
  }, /*#__PURE__*/React.createElement(CartIcon, null), cartCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 2,
      right: 2,
      minWidth: 16,
      height: 16,
      padding: "0 4px",
      borderRadius: 8,
      background: "var(--green-50)",
      color: "#fff",
      fontSize: 10,
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      lineHeight: 1
    }
  }, cartCount)), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: dark ? "featured" : "primary",
    size: "sm",
    onClick: onCta
  }, ctaLabel)));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Tabs — underline tab strip. Controlled via `value`/`onChange`, or
 * uncontrolled with `defaultValue`. `tabs` is [{value, label}].
 */
function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  style,
  ...rest
}) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? tabs[0]?.value);
  const current = isControlled ? value : internal;
  function select(v) {
    if (!isControlled) setInternal(v);
    onChange && onChange(v);
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: "flex",
      gap: 4,
      borderBottom: "1px solid var(--border-hairline)",
      ...style
    }
  }, rest), tabs.map(t => {
    const on = t.value === current;
    return /*#__PURE__*/React.createElement("button", {
      key: t.value,
      role: "tab",
      "aria-selected": on,
      onClick: () => select(t.value),
      style: {
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
        transition: "color .15s ease, border-color .15s ease"
      }
    }, t.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Cart.jsx
try { (() => {
// Slide-in cart drawer. Exports window.HirotCart.
const {
  Button,
  QuantityStepper,
  Divider,
  IconButton,
  Price
} = window.HirotDesignSystem_e62cf3;
function yen(n) {
  return "¥" + Number(n).toLocaleString("ja-JP");
}
function HirotCart({
  open,
  lines,
  onClose,
  onQty,
  onRemove
}) {
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const freeShip = subtotal >= 5000;
  const count = lines.reduce((s, l) => s + l.qty, 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 200,
      pointerEvents: open ? "auto" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(14,16,15,0.42)",
      opacity: open ? 1 : 0,
      transition: "opacity .25s ease"
    }
  }), /*#__PURE__*/React.createElement("aside", {
    style: {
      position: "absolute",
      top: 0,
      right: 0,
      height: "100%",
      width: "min(420px, 92vw)",
      background: "var(--surface-card)",
      boxShadow: "var(--shadow-4)",
      display: "flex",
      flexDirection: "column",
      transform: open ? "translateX(0)" : "translateX(100%)",
      transition: "transform .28s cubic-bezier(.4,0,.2,1)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 24px",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--heading-md)",
      margin: 0
    }
  }, "\u30AB\u30FC\u30C8 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)",
      fontWeight: 400
    }
  }, "(", count, ")")), /*#__PURE__*/React.createElement(IconButton, {
    label: "\u9589\u3058\u308B",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 5l10 10M15 5L5 15",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  })))), lines.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      color: "var(--text-tertiary)",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "40",
    height: "40",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 3h2l2.4 12.3a1 1 0 001 .7h8.7a1 1 0 001-.8L21 7H6",
    stroke: "currentColor",
    strokeWidth: "1.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--body-md)",
      margin: 0
    }
  }, "\u30AB\u30FC\u30C8\u306F\u7A7A\u3067\u3059")) : /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "8px 24px"
    }
  }, lines.map(l => /*#__PURE__*/React.createElement("div", {
    key: l.product.id,
    style: {
      display: "flex",
      gap: 14,
      padding: "16px 0",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: l.product.image,
    alt: "",
    style: {
      width: 72,
      height: 72,
      borderRadius: "var(--radius-md)",
      objectFit: "cover",
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--body-strong)",
      color: "var(--text-primary)"
    }
  }, l.product.title), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--caption)",
      color: "var(--text-tertiary)",
      marginBottom: 8
    }
  }, l.product.brand), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(QuantityStepper, {
    value: l.qty,
    onChange: v => onQty(l.product.id, v)
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--body-strong)",
      color: "var(--text-primary)"
    }
  }, yen(l.product.price * l.qty)))), /*#__PURE__*/React.createElement("button", {
    onClick: () => onRemove(l.product.id),
    "aria-label": "\u524A\u9664",
    style: {
      border: "none",
      background: "none",
      cursor: "pointer",
      color: "var(--text-tertiary)",
      alignSelf: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 3l10 10M13 3L3 13",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  })))))), lines.length > 0 && /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: "20px 24px",
      borderTop: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      font: "var(--body-md)",
      color: "var(--text-secondary)",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u5C0F\u8A08"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)",
      fontWeight: 600
    }
  }, yen(subtotal))), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--caption)",
      color: freeShip ? "var(--green-60)" : "var(--text-tertiary)",
      marginBottom: 16
    }
  }, freeShip ? "✓ 送料無料が適用されます" : `あと ${yen(5000 - subtotal)} で送料無料`), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true
  }, "\u30EC\u30B8\u306B\u9032\u3080"))));
}
window.HirotCart = HirotCart;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Cart.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Catalog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Category list + product detail. Exports window.HirotList, window.HirotDetail.
const {
  Breadcrumb,
  Tabs,
  Button,
  ProductCard,
  Price,
  Rating,
  QuantityStepper,
  Tag,
  Divider,
  Select
} = window.HirotDesignSystem_e62cf3;

/* ---------------- Category list ---------------- */
function HirotList({
  data,
  category,
  onCategory,
  onOpen,
  onAdd,
  cols = 4
}) {
  const items = category === "すべて" ? data.products : data.products.filter(p => p.cat === category);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "24px 24px 64px"
    }
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    items: [{
      label: "ホーム"
    }, {
      label: "ストア"
    }, {
      label: category
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      margin: "16px 0 24px",
      flexWrap: "wrap",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--eyebrow)",
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase",
      color: "var(--green-60)"
    }
  }, "Shop All"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--display-md)",
      margin: "8px 0 0",
      color: "var(--text-primary)"
    }
  }, category)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 200
    }
  }, /*#__PURE__*/React.createElement(Select, {
    defaultValue: "pop"
  }, /*#__PURE__*/React.createElement("option", {
    value: "pop"
  }, "\u304A\u3059\u3059\u3081\u9806"), /*#__PURE__*/React.createElement("option", {
    value: "new"
  }, "\u65B0\u7740\u9806"), /*#__PURE__*/React.createElement("option", {
    value: "price"
  }, "\u4FA1\u683C\u304C\u5B89\u3044\u9806")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      marginBottom: 28
    }
  }, data.categories.map(c => {
    const on = c === category;
    return /*#__PURE__*/React.createElement("button", {
      key: c,
      onClick: () => onCategory(c),
      style: {
        font: "var(--font-body)",
        fontSize: 14,
        fontWeight: 500,
        padding: "8px 18px",
        borderRadius: "var(--radius-pill)",
        cursor: "pointer",
        border: on ? "1.5px solid var(--ink)" : "1px solid var(--border-hairline)",
        background: on ? "var(--ink)" : "transparent",
        color: on ? "var(--on-ink)" : "var(--text-primary)"
      }
    }, c);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: 24
    }
  }, items.map(p => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: p.id
  }, p, {
    onClick: () => onOpen(p),
    onAdd: () => onAdd(p)
  })))));
}

/* ---------------- Product detail ---------------- */
function HirotDetail({
  product,
  data,
  onAdd,
  onBack,
  onOpen,
  cols = 4
}) {
  const [qty, setQty] = React.useState(1);
  const [tab, setTab] = React.useState("desc");
  const related = data.products.filter(p => p.id !== product.id && p.cat === product.cat).slice(0, 4);
  const gallery = [product.image, "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80", "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80"];
  const [main, setMain] = React.useState(0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "24px 24px 64px"
    }
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    items: [{
      label: "ホーム"
    }, {
      label: "ストア"
    }, {
      label: product.cat
    }, {
      label: product.title
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 48,
      margin: "20px 0 56px"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      aspectRatio: "1 / 1",
      background: "var(--surface-wash)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: gallery[main],
    alt: product.title,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 12
    }
  }, gallery.map((g, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setMain(i),
    style: {
      width: 72,
      height: 72,
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      border: i === main ? "2px solid var(--ink)" : "1px solid var(--border-hairline)",
      padding: 0,
      cursor: "pointer",
      background: "none"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: g,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-display)",
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--text-tertiary)"
    }
  }, product.brand), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--heading-xl)",
      margin: "8px 0 12px",
      color: "var(--text-primary)"
    }
  }, product.title), /*#__PURE__*/React.createElement(Rating, {
    value: product.rating,
    count: product.reviews
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "20px 0"
    }
  }, /*#__PURE__*/React.createElement(Price, {
    amount: product.price,
    original: product.original,
    size: "lg"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 20
    }
  }, product.tag && /*#__PURE__*/React.createElement(Tag, {
    variant: "mint"
  }, product.tag), /*#__PURE__*/React.createElement(Tag, {
    variant: "outline"
  }, "\u30AE\u30D5\u30C8\u5BFE\u5FDC")), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--body-md)",
      color: "var(--text-secondary)",
      marginBottom: 28
    }
  }, product.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(QuantityStepper, {
    value: qty,
    onChange: setQty
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    fullWidth: true,
    onClick: () => onAdd(product, qty),
    disabled: product.soldOut
  }, product.soldOut ? "売り切れ" : "カートに入れる")), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--caption)",
      color: "var(--text-tertiary)",
      marginTop: 14
    }
  }, "15\u6642\u307E\u3067\u306E\u3054\u6CE8\u6587\u3067\u5F53\u65E5\u767A\u9001 \u30FB 5,000\u5186\u4EE5\u4E0A\u3067\u9001\u6599\u7121\u6599"))), /*#__PURE__*/React.createElement(Tabs, {
    tabs: [{
      value: "desc",
      label: "商品説明"
    }, {
      value: "spec",
      label: "詳細・仕様"
    }, {
      value: "ship",
      label: "配送・返品"
    }],
    value: tab,
    onChange: setTab
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--body-md)",
      color: "var(--text-secondary)",
      padding: "24px 0 8px",
      maxWidth: 720
    }
  }, tab === "desc" && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, product.desc, " \u7D20\u6750\u306E\u8CEA\u611F\u3068\u4F7F\u3044\u5FC3\u5730\u306B\u3053\u3060\u308F\u308A\u3001\u9577\u304F\u611B\u7528\u3044\u305F\u3060\u3051\u308B\u4E00\u54C1\u306B\u4ED5\u4E0A\u3052\u307E\u3057\u305F\u3002"), tab === "spec" && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "\u30D6\u30E9\u30F3\u30C9\uFF1A", product.brand, " \uFF0F \u30AB\u30C6\u30B4\u30EA\u30FC\uFF1A", product.cat, " \uFF0F \u539F\u7523\u56FD\uFF1A\u65E5\u672C \uFF0F \u304A\u624B\u5165\u308C\uFF1A\u624B\u6D17\u3044\u63A8\u5968\u3002"), tab === "ship" && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "\u5168\u56FD\u4E00\u5F8B550\u5186\uFF08\u7A0E\u8FBC\uFF09\u30015,000\u5186\u4EE5\u4E0A\u3067\u7121\u6599\u3002\u5230\u7740\u5F8C7\u65E5\u4EE5\u5185\u3067\u3042\u308C\u3070\u8FD4\u54C1\u30FB\u4EA4\u63DB\u3092\u627F\u308A\u307E\u3059\u3002")), /*#__PURE__*/React.createElement(Divider, {
    style: {
      margin: "40px 0 32px"
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--heading-lg)",
      margin: "0 0 20px",
      color: "var(--text-primary)"
    }
  }, "\u95A2\u9023\u3059\u308B\u5546\u54C1"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: 24
    }
  }, related.map(p => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: p.id
  }, p, {
    onClick: () => onOpen(p),
    onAdd: () => onAdd(p, 1)
  })))));
}
window.HirotList = HirotList;
window.HirotDetail = HirotDetail;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Catalog.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Home.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Home screen — editorial marketing landing. Exports window.HirotHome.
const {
  Button,
  ProductCard,
  Tag
} = window.HirotDesignSystem_e62cf3;
function HeroSection({
  onShop,
  reverse
}) {
  const copy = /*#__PURE__*/React.createElement("div", {
    key: "copy"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--eyebrow)",
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase",
      color: "var(--green-60)"
    }
  }, "Design & Commerce"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--display-xl)",
      letterSpacing: "-0.01em",
      margin: "16px 0 0",
      color: "var(--text-primary)"
    }
  }, "\u58F2\u308C\u308B\u4F53\u9A13\u3092\u3001", /*#__PURE__*/React.createElement("br", null), "\u3066\u3044\u306D\u3044\u306B\u8A2D\u8A08\u3059\u308B\u3002"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--body-lg)",
      color: "var(--text-secondary)",
      maxWidth: 460,
      margin: "20px 0 0"
    }
  }, "Hirot \u306F\u3001\u4F01\u753B\u304B\u3089\u30C7\u30B6\u30A4\u30F3\u3001\u904B\u7528\u307E\u3067\u3092\u4E00\u8CAB\u3057\u3066\u652F\u3048\u308B EC \u5236\u4F5C\u30B9\u30BF\u30B8\u30AA\u3002\u30D6\u30E9\u30F3\u30C9\u306E\u4E16\u754C\u89B3\u3092\u3001\u8CFC\u5165\u4F53\u9A13\u306E\u9685\u3005\u307E\u3067\u3002"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 28,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onShop
  }, "\u30B9\u30C8\u30A2\u3092\u898B\u308B"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg"
  }, "\u5236\u4F5C\u3092\u76F8\u8AC7\u3059\u308B")));
  const photo = /*#__PURE__*/React.createElement("div", {
    key: "photo",
    style: {
      borderRadius: "var(--radius-xl)",
      overflow: "hidden",
      aspectRatio: "4 / 5",
      boxShadow: "var(--shadow-3)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1000&q=80",
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }
  }));
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "56px 24px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: reverse ? "1fr 1.05fr" : "1.05fr 1fr",
      gap: 48,
      alignItems: "center"
    }
  }, reverse ? [photo, copy] : [copy, photo]));
}
function LogoStrip() {
  const names = ["AOYAMA", "MORI", "KAZE", "SORA", "NAGI", "HANA"];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1000,
      margin: "24px auto 0",
      padding: "24px",
      display: "flex",
      gap: 40,
      justifyContent: "center",
      flexWrap: "wrap",
      alignItems: "center"
    }
  }, names.map(n => /*#__PURE__*/React.createElement("span", {
    key: n,
    style: {
      font: "var(--font-display)",
      fontWeight: 500,
      fontSize: 18,
      letterSpacing: "0.12em",
      color: "var(--shade-40)"
    }
  }, n)));
}
function FeaturedGrid({
  products,
  onOpen,
  onAdd,
  cols = 4
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "48px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--eyebrow)",
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase",
      color: "var(--green-60)"
    }
  }, "Featured Collection"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--display-md)",
      margin: "10px 0 0",
      color: "var(--text-primary)"
    }
  }, "\u4ECA\u9031\u306E\u304A\u3059\u3059\u3081")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "\u3059\u3079\u3066\u898B\u308B \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: 24
    }
  }, products.slice(0, cols).map(p => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: p.id
  }, p, {
    onClick: () => onOpen(p),
    onAdd: () => onAdd(p)
  })))));
}
function ValueBand() {
  const items = [{
    t: "一貫した設計",
    d: "情報設計から UI、実装、運用改善まで一気通貫で。"
  }, {
    t: "編集的なデザイン",
    d: "写真と余白を活かし、ブランドの世界観を丁寧に。"
  }, {
    t: "成果への責任",
    d: "CVR・回遊率を指標に、公開後も伴走します。"
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-band)",
      padding: "64px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--eyebrow)",
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase",
      color: "var(--green-70)"
    }
  }, "Why Hirot"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--display-md)",
      margin: "10px 0 32px",
      color: "var(--text-primary)"
    }
  }, "\u9078\u3070\u308C\u308B\u30013\u3064\u306E\u7406\u7531"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 32
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--font-display)",
      fontWeight: 300,
      fontSize: 40,
      color: "var(--green-70)",
      lineHeight: 1
    }
  }, "0", i + 1), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "var(--heading-md)",
      margin: "16px 0 8px",
      color: "var(--text-primary)"
    }
  }, it.t), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--body-md)",
      color: "var(--text-secondary)",
      margin: 0
    }
  }, it.d))))));
}
function HirotHome({
  data,
  onOpenProduct,
  onAdd,
  onShop,
  cols = 4,
  heroReverse = false
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(HeroSection, {
    onShop: onShop,
    reverse: heroReverse
  }), /*#__PURE__*/React.createElement(LogoStrip, null), /*#__PURE__*/React.createElement(FeaturedGrid, {
    products: data.products,
    onOpen: onOpenProduct,
    onAdd: onAdd,
    cols: cols
  }), /*#__PURE__*/React.createElement(ValueBand, null));
}
window.HirotHome = HirotHome;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/data.js
try { (() => {
// Hirot storefront — sample catalog. Plain script; sets window.HIROT_DATA.
// Imagery from Unsplash (lifestyle / apparel), used as placeholders.
window.HIROT_DATA = {
  categories: ["すべて", "アパレル", "生活雑貨", "食品", "ギフト"],
  products: [{
    id: "p1",
    brand: "Hirot Studio",
    title: "リネンシャツ / ナチュラル",
    cat: "アパレル",
    price: 8800,
    original: 12000,
    rating: 4.5,
    reviews: 128,
    tag: "送料無料",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80",
    desc: "上質なフレンチリネンを使用した、一枚で決まる定番シャツ。洗うほどに肌になじみます。"
  }, {
    id: "p2",
    brand: "Aoyama Craft",
    title: "ハンドメイド陶器マグ",
    cat: "生活雑貨",
    price: 3400,
    rating: 4.8,
    reviews: 64,
    tag: "数量限定",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80",
    desc: "職人が一点ずつ仕上げた、手になじむ厚手のマグ。毎日のコーヒーを少し特別に。"
  }, {
    id: "p3",
    brand: "Hirot Studio",
    title: "オーガニックコットン トート",
    cat: "アパレル",
    price: 5200,
    rating: 4.3,
    reviews: 210,
    tag: "人気",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    desc: "しっかりとした厚手生地のトートバッグ。通勤にも休日にも。"
  }, {
    id: "p4",
    brand: "Mori Foods",
    title: "スペシャルティ ドリップコーヒー 10袋",
    cat: "食品",
    price: 2160,
    rating: 4.7,
    reviews: 342,
    tag: "定期便あり",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80",
    desc: "契約農園から届く、香り高いシングルオリジン。手軽なドリップバッグで。"
  }, {
    id: "p5",
    brand: "Kaze Living",
    title: "アロマ キャンドル / ヒノキ",
    cat: "生活雑貨",
    price: 2800,
    original: 3600,
    rating: 4.6,
    reviews: 89,
    tag: "ギフト対応",
    image: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=800&q=80",
    desc: "国産ヒノキの精油をブレンドした、深くやすらぐ香り。約35時間燃焼。"
  }, {
    id: "p6",
    brand: "Hirot Studio",
    title: "ウール ニットビーニー",
    cat: "アパレル",
    price: 4600,
    rating: 4.2,
    reviews: 47,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80",
    desc: "チクチクしにくいメリノウール。深めのシルエットで暖かく。",
    soldOut: true
  }, {
    id: "p7",
    brand: "Sora Gift",
    title: "季節のギフトボックス",
    cat: "ギフト",
    price: 6800,
    rating: 4.9,
    reviews: 156,
    tag: "熨斗対応",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
    desc: "旬の逸品を詰め合わせた、贈って喜ばれるボックス。メッセージカード付き。"
  }, {
    id: "p8",
    brand: "Mori Foods",
    title: "はちみつ 2種セット",
    cat: "食品",
    price: 3980,
    rating: 4.4,
    reviews: 73,
    tag: "送料無料",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80",
    desc: "国産アカシアと百花蜜の食べ比べセット。パンにもヨーグルトにも。"
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/data.js", error: String((e && e.message) || e) }); }

// ui_kits/storefront/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Price = __ds_scope.Price;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.QuantityStepper = __ds_scope.QuantityStepper;

__ds_ns.Rating = __ds_scope.Rating;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
