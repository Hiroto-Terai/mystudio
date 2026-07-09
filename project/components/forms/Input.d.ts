import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  helper?: React.ReactNode;
  error?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

/** Text field with label, helper/error, and adornments. */
export function Input(props: InputProps): JSX.Element;
