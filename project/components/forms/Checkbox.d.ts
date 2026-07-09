import * as React from "react";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

/** Checkbox with ink-filled box and white check. */
export function Checkbox(props: CheckboxProps): JSX.Element;
