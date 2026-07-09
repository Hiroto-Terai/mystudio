import * as React from "react";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
  tone?: "light" | "dark";
}

/** Hairline rule, horizontal or vertical. */
export function Divider(props: DividerProps): JSX.Element;
