import * as React from "react";

export interface FooterColumn { title: string; links: { label: string; href?: string }[]; }

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  tone?: "dark" | "light";
  columns?: FooterColumn[];
  note?: React.ReactNode;
}

/** Full-width footer, dark or light canvas. */
export function Footer(props: FooterProps): JSX.Element;
