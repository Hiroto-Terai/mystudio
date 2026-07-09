import * as React from "react";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "mint" | "shade" | "wash" | "outline";
  onRemove?: () => void;
}

/** Category chip / pill tag. */
export function Tag(props: TagProps): JSX.Element;
