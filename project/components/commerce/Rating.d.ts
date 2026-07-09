import * as React from "react";

export interface RatingProps extends React.HTMLAttributes<HTMLSpanElement> {
  value?: number;
  count?: number;
  size?: number;
}

/** Read-only 5-star rating with fractional fill. */
export function Rating(props: RatingProps): JSX.Element;
