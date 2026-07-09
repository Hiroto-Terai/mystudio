import * as React from "react";

export interface NavLink { label: string; href?: string; }

/**
 * Top navigation bar with logo, links, search/cart, and CTA.
 * @startingPoint section="Navigation" subtitle="Light & dark top nav" viewport="1200x84"
 */
export interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
  tone?: "light" | "dark";
  links?: NavLink[];
  cartCount?: number;
  ctaLabel?: string;
  onCta?: () => void;
  onCartClick?: () => void;
  onLinkClick?: (link: NavLink) => void;
  onLogoClick?: () => void;
}

/** Top navigation bar with logo, links, search/cart, and CTA. */
export function NavBar(props: NavBarProps): JSX.Element;
