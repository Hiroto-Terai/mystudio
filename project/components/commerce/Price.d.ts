import * as React from "react";

export interface PriceProps extends React.HTMLAttributes<HTMLSpanElement> {
  amount: number;
  original?: number;
  size?: "sm" | "md" | "lg";
}

/** Yen price with optional strike-through original and discount badge. */
export function Price(props: PriceProps): JSX.Element;
