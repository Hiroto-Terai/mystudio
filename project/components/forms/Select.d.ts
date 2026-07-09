import * as React from "react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: React.ReactNode;
  helper?: React.ReactNode;
  error?: React.ReactNode;
}

/** Native select styled to match Input, with chevron. */
export function Select(props: SelectProps): JSX.Element;
