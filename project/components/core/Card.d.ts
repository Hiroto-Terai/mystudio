import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "featured" | "band" | "wash" | "hairline";
  elevation?: "flat" | "hairline" | "raised" | "halo";
  radius?: "md" | "lg" | "xl";
  pad?: number | string;
  as?: keyof JSX.IntrinsicElements;
}

/** Generic light surface with the signature stacked-shadow halo. */
export function Card(props: CardProps): JSX.Element;
