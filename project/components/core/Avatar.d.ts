import * as React from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  name?: string;
  size?: number;
  square?: boolean;
}

/** Round (or squared) avatar with initial fallback on a green wash. */
export function Avatar(props: AvatarProps): JSX.Element;
