import * as React from "react";

/**
 * Hirot brand logo — sprout mark + thin-display wordmark.
 * @startingPoint section="Brand" subtitle="Logo lockups & tones" viewport="700x160"
 */
export interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** full = mark + wordmark, mark = symbol only, wordmark = text only */
  variant?: "full" | "mark" | "wordmark";
  /** dark = ink on light surfaces, light = white on dark surfaces */
  tone?: "dark" | "light";
  /** pixel height of the mark; wordmark scales from it */
  size?: number;
}

/** Hirot brand logo — sprout mark + thin-display wordmark. */
export function Logo(props: LogoProps): JSX.Element;
