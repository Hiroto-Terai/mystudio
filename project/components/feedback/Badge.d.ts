import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "accent" | "success" | "warning" | "danger";
  solid?: boolean;
}

/** Compact status marker, soft or solid. */
export function Badge(props: BadgeProps): JSX.Element;
