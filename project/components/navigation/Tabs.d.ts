import * as React from "react";

export interface TabItem { value: string; label: React.ReactNode; }

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs?: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

/** Underline tab strip with green active indicator. */
export function Tabs(props: TabsProps): JSX.Element;
