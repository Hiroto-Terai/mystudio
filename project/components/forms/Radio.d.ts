import * as React from "react";

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

/** Single-choice radio with ink dot. */
export function Radio(props: RadioProps): JSX.Element;
