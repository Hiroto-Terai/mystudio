// Theme / layout options — the productionised version of the prototype's
// "Tweaks" panel. Colour themes stay within the brand green family; display
// fonts swap the Latin/heading face; layout toggles mirror the prototype.

export type ThemeKey = "forest" | "sage" | "citrus";
export type FontKey = "modern" | "gothic" | "mincho";
export type GridCols = 4 | 3;

export interface GreenRamp {
  g10: string;
  g20: string;
  g30: string;
  g40: string;
  g50: string;
  g60: string;
  g70: string;
}

export const THEMES: Record<ThemeKey, GreenRamp> = {
  forest: { g10: "#d8f6e2", g20: "#c1fbd4", g30: "#97e8b8", g40: "#55c98c", g50: "#2ea36a", g60: "#1f7d52", g70: "#145038" },
  sage: { g10: "#e7f0e4", g20: "#d7e6d4", g30: "#b7cdb2", g40: "#8fae88", g50: "#7fa17f", g60: "#5c7d5c", g70: "#3d543d" },
  citrus: { g10: "#e8fad2", g20: "#d6f5b8", g30: "#bde98a", g40: "#8fd44f", g50: "#6fbf3a", g60: "#4f9e26", g70: "#356b18" },
};

export const FONTS: Record<FontKey, string> = {
  modern: '"Hanken Grotesk", "Noto Sans JP", system-ui, sans-serif',
  gothic: '"Zen Kaku Gothic New", "Noto Sans JP", system-ui, sans-serif',
  mincho: '"Noto Serif JP", serif',
};

export interface Settings {
  theme: ThemeKey;
  displayFont: FontKey;
  gridCols: GridCols;
  heroReverse: boolean;
  footerDark: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  theme: "forest",
  displayFont: "modern",
  gridCols: 4,
  heroReverse: false,
  footerDark: true,
};

/** Push the active theme + display font onto :root so every token follows. */
export function applySettings(settings: Settings): void {
  const r = document.documentElement.style;
  const th = THEMES[settings.theme] ?? THEMES.forest;
  r.setProperty("--green-10", th.g10);
  r.setProperty("--green-20", th.g20);
  r.setProperty("--green-30", th.g30);
  r.setProperty("--green-40", th.g40);
  r.setProperty("--green-50", th.g50);
  r.setProperty("--green-60", th.g60);
  r.setProperty("--green-70", th.g70);
  r.setProperty("--font-display", FONTS[settings.displayFont] ?? FONTS.modern);
}
