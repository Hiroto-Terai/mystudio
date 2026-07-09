import * as React from "react";

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: React.ReactNode;
  children: React.ReactNode;
}

/** Hover/focus tooltip on a dark chip. */
export function Tooltip(props: TooltipProps): JSX.Element;
