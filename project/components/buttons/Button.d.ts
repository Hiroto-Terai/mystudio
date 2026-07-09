import * as React from "react";

/**
 * Pill CTA — the system's dominant action.
 * @startingPoint section="Actions" subtitle="Pill buttons, all variants" viewport="700x150"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "accent" | "featured" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

/** Pill CTA — the system's dominant action. */
export function Button(props: ButtonProps): JSX.Element;
