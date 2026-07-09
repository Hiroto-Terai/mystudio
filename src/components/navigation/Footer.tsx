import type { CSSProperties, HTMLAttributes } from "react";
import { Logo } from "../core/Logo.tsx";

export interface FooterLink {
  label: string;
  href?: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterProps extends Omit<HTMLAttributes<HTMLElement>, "style"> {
  tone?: "light" | "dark";
  columns?: FooterColumn[];
  note?: string;
  style?: CSSProperties;
}

/**
 * Footer — full-width footer. `tone="dark"` for the cinematic ink footer,
 * `tone="light"` for transactional pages. `columns` is [{title, links:[{label,href}]}].
 */
export function Footer({ tone = "dark", columns = [], note = "© Hirot Inc.", style, ...rest }: FooterProps) {
  const dark = tone === "dark";
  const bg = dark ? "var(--canvas-ink)" : "var(--surface-card)";
  const fg = dark ? "var(--on-ink)" : "var(--ink)";
  const linkColor = dark ? "var(--link-quiet)" : "var(--text-secondary)";
  const border = dark ? "var(--hairline-ink)" : "var(--border-hairline)";

  return (
    <footer style={{ background: bg, color: fg, padding: "64px 24px 32px", ...style }} {...rest}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 48, justifyContent: "space-between" }}>
          <div style={{ maxWidth: 260 }}>
            <Logo tone={dark ? "light" : "dark"} size={26} />
            <p style={{ font: "var(--caption)", color: linkColor, marginTop: 16 }}>
              成果につながるECサイトを、デザインから運用まで。
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 48 }}>
            {columns.map((col) => (
              <div key={col.title} style={{ minWidth: 120 }}>
                <div style={{ font: "var(--font-display)", fontSize: 12, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: dark ? "var(--link-mint)" : "var(--text-tertiary)", marginBottom: 14 }}>
                  {col.title}
                </div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href || "#"} style={{ font: "var(--caption)", color: linkColor, textDecoration: "none" }}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${border}`, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ font: "var(--micro)", color: linkColor }}>{note}</span>
          <span style={{ font: "var(--micro)", color: linkColor }}>プライバシーポリシー ・ 利用規約</span>
        </div>
      </div>
    </footer>
  );
}
