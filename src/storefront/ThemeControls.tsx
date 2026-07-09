// ThemeControls — a small floating panel to switch colour theme, display
// font, and layout. The productionised replacement for the prototype's
// design-tool "Tweaks" panel: same options, driven by real React state.
import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Switch } from "../components";
import { THEMES, FONTS } from "./theme";
import type { Settings, ThemeKey, FontKey, GridCols } from "./theme";

const THEME_LABELS: Record<ThemeKey, string> = { forest: "Forest", sage: "Sage", citrus: "Citrus" };
const FONT_LABELS: Record<FontKey, string> = { modern: "モダン", gothic: "ゴシック", mincho: "明朝" };

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ font: "var(--micro)", fontWeight: 600, letterSpacing: "0.04em", color: "var(--text-secondary)" }}>{label}</span>
      {children}
    </div>
  );
}

function Segmented<T extends string | number>({
  value,
  options,
  onChange,
  render,
}: {
  value: T;
  options: T[];
  onChange: (v: T) => void;
  render: (v: T) => ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: 4, padding: 3, background: "var(--surface-muted)", borderRadius: "var(--radius-pill)" }}>
      {options.map((o) => {
        const on = o === value;
        return (
          <button
            key={String(o)}
            type="button"
            onClick={() => onChange(o)}
            style={{
              flex: 1,
              border: "none",
              cursor: "pointer",
              borderRadius: "var(--radius-pill)",
              padding: "6px 10px",
              font: "var(--font-body)",
              fontSize: 13,
              fontWeight: on ? 600 : 500,
              background: on ? "var(--surface-card)" : "transparent",
              color: on ? "var(--text-primary)" : "var(--text-secondary)",
              boxShadow: on ? "var(--shadow-1)" : "none",
              transition: "background .15s ease, color .15s ease",
            }}
          >
            {render(o)}
          </button>
        );
      })}
    </div>
  );
}

function Swatches({ value, onChange }: { value: ThemeKey; onChange: (v: ThemeKey) => void }) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {(Object.keys(THEMES) as ThemeKey[]).map((k) => {
        const on = k === value;
        const ramp = THEMES[k];
        return (
          <button
            key={k}
            type="button"
            onClick={() => onChange(k)}
            aria-label={THEME_LABELS[k]}
            title={THEME_LABELS[k]}
            style={{
              flex: 1,
              cursor: "pointer",
              border: on ? "1.5px solid var(--ink)" : "1px solid var(--border-hairline)",
              borderRadius: "var(--radius-md)",
              padding: 6,
              background: "var(--surface-card)",
              display: "flex",
              flexDirection: "column",
              gap: 5,
              alignItems: "center",
            }}
          >
            <span style={{ display: "flex", width: "100%", height: 18, borderRadius: 4, overflow: "hidden" }}>
              <i style={{ flex: 1, background: ramp.g20 }} />
              <i style={{ flex: 1, background: ramp.g50 }} />
              <i style={{ flex: 1, background: ramp.g70 }} />
            </span>
            <span style={{ font: "var(--font-body)", fontSize: 12, fontWeight: on ? 600 : 500, color: on ? "var(--text-primary)" : "var(--text-secondary)" }}>
              {THEME_LABELS[k]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

const panelStyle: CSSProperties = {
  position: "fixed",
  right: 20,
  bottom: 84,
  zIndex: 300,
  width: 260,
  background: "var(--surface-card)",
  borderRadius: "var(--radius-lg)",
  boxShadow: "var(--shadow-4)",
  border: "1px solid var(--border-hairline)",
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

export interface ThemeControlsProps {
  settings: Settings;
  onChange: (patch: Partial<Settings>) => void;
}

export function ThemeControls({ settings, onChange }: ThemeControlsProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div style={panelStyle} role="dialog" aria-label="テーマ設定">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ font: "var(--heading-sm)", color: "var(--text-primary)" }}>テーマ</span>
            <span style={{ font: "var(--micro)", color: "var(--text-tertiary)" }}>プレビュー</span>
          </div>

          <Row label="カラー">
            <Swatches value={settings.theme} onChange={(v) => onChange({ theme: v })} />
          </Row>

          <Row label="表示フォント">
            <Segmented<FontKey>
              value={settings.displayFont}
              options={["modern", "gothic", "mincho"]}
              onChange={(v) => onChange({ displayFont: v })}
              render={(v) => <span style={{ fontFamily: FONTS[v] }}>{FONT_LABELS[v]}</span>}
            />
          </Row>

          <Row label="商品グリッド">
            <Segmented<GridCols>
              value={settings.gridCols}
              options={[4, 3]}
              onChange={(v) => onChange({ gridCols: v })}
              render={(v) => `${v} 列`}
            />
          </Row>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 4, borderTop: "1px solid var(--border-hairline)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ font: "var(--caption)", color: "var(--text-primary)" }}>ヒーロー画像を左に</span>
              <Switch checked={settings.heroReverse} onChange={(v) => onChange({ heroReverse: v })} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ font: "var(--caption)", color: "var(--text-primary)" }}>フッターをダークに</span>
              <Switch checked={settings.footerDark} onChange={(v) => onChange({ footerDark: v })} />
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="テーマ設定"
        aria-expanded={open}
        style={{
          position: "fixed",
          right: 20,
          bottom: 20,
          zIndex: 300,
          width: 52,
          height: 52,
          borderRadius: "var(--radius-pill)",
          border: "none",
          cursor: "pointer",
          background: "var(--ink)",
          color: "var(--on-ink)",
          boxShadow: "var(--shadow-4)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </>
  );
}
