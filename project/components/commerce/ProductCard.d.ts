import * as React from "react";

/**
 * Storefront product tile — image, tag, title, rating, price, hover add-to-cart.
 * @startingPoint section="Commerce" subtitle="Product grid tile" viewport="320x460"
 */
export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image?: string;
  title?: string;
  brand?: string;
  price?: number;
  original?: number;
  rating?: number;
  reviews?: number;
  tag?: string;
  soldOut?: boolean;
  onAdd?: () => void;
}

/** Storefront product tile — image, tag, title, rating, price, hover add-to-cart. */
export function ProductCard(props: ProductCardProps): JSX.Element;
