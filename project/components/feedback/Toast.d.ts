import * as React from "react";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  message?: React.ReactNode;
  tone?: "neutral" | "success" | "danger" | "warning";
  onClose?: () => void;
}

/** Floating notification card. */
export function Toast(props: ToastProps): JSX.Element;
