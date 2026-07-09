import * as React from "react";

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  width?: number;
}

/** Centered modal on a dimmed scrim. */
export function Dialog(props: DialogProps): JSX.Element | null;
