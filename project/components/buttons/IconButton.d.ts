import * as React from "react";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: number;
  /** accessible label — required, since there is no text */
  label: string;
}

/** Circular single-icon button. */
export function IconButton(props: IconButtonProps): JSX.Element;
