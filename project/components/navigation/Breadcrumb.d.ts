import * as React from "react";

export interface Crumb { label: string; href?: string; }

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items?: Crumb[];
}

/** Category-path breadcrumb; last item is current. */
export function Breadcrumb(props: BreadcrumbProps): JSX.Element;
