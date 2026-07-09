import { Fragment } from "react";
import type { CSSProperties, HTMLAttributes } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps extends Omit<HTMLAttributes<HTMLElement>, "style"> {
  items?: BreadcrumbItem[];
  style?: CSSProperties;
}

/**
 * Breadcrumb — trailing navigation for EC category paths.
 * Pass `items` as [{label, href}]; the last item renders as current.
 */
export function Breadcrumb({ items = [], style, ...rest }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8, font: "var(--caption)", ...style }} {...rest}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <Fragment key={i}>
            {last ? (
              <span style={{ color: "var(--text-primary)", fontWeight: 500 }} aria-current="page">{it.label}</span>
            ) : (
              <a href={it.href || "#"} style={{ color: "var(--text-secondary)", textDecoration: "none" }}>{it.label}</a>
            )}
            {!last && <span style={{ color: "var(--text-tertiary)" }} aria-hidden>›</span>}
          </Fragment>
        );
      })}
    </nav>
  );
}
