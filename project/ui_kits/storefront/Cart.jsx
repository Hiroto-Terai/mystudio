// Slide-in cart drawer. Exports window.HirotCart.
const { Button, QuantityStepper, Divider, IconButton, Price } = window.HirotDesignSystem_e62cf3;

function yen(n) { return "¥" + Number(n).toLocaleString("ja-JP"); }

function HirotCart({ open, lines, onClose, onQty, onRemove }) {
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const freeShip = subtotal >= 5000;
  const count = lines.reduce((s, l) => s + l.qty, 0);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, pointerEvents: open ? "auto" : "none" }}>
      {/* scrim */}
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(14,16,15,0.42)", opacity: open ? 1 : 0, transition: "opacity .25s ease" }} />
      {/* panel */}
      <aside style={{
        position: "absolute", top: 0, right: 0, height: "100%", width: "min(420px, 92vw)",
        background: "var(--surface-card)", boxShadow: "var(--shadow-4)", display: "flex", flexDirection: "column",
        transform: open ? "translateX(0)" : "translateX(100%)", transition: "transform .28s cubic-bezier(.4,0,.2,1)",
      }}>
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid var(--border-hairline)" }}>
          <h2 style={{ font: "var(--heading-md)", margin: 0 }}>カート <span style={{ color: "var(--text-tertiary)", fontWeight: 400 }}>({count})</span></h2>
          <IconButton label="閉じる" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </IconButton>
        </header>

        {lines.length === 0 ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, color: "var(--text-tertiary)", padding: 24 }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M3 3h2l2.4 12.3a1 1 0 001 .7h8.7a1 1 0 001-.8L21 7H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <p style={{ font: "var(--body-md)", margin: 0 }}>カートは空です</p>
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: "auto", padding: "8px 24px" }}>
            {lines.map((l) => (
              <div key={l.product.id} style={{ display: "flex", gap: 14, padding: "16px 0", borderBottom: "1px solid var(--border-hairline)" }}>
                <img src={l.product.image} alt="" style={{ width: 72, height: 72, borderRadius: "var(--radius-md)", objectFit: "cover", flex: "none" }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ font: "var(--body-strong)", color: "var(--text-primary)" }}>{l.product.title}</div>
                  <div style={{ font: "var(--caption)", color: "var(--text-tertiary)", marginBottom: 8 }}>{l.product.brand}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <QuantityStepper value={l.qty} onChange={(v) => onQty(l.product.id, v)} />
                    <span style={{ font: "var(--body-strong)", color: "var(--text-primary)" }}>{yen(l.product.price * l.qty)}</span>
                  </div>
                </div>
                <button onClick={() => onRemove(l.product.id)} aria-label="削除" style={{ border: "none", background: "none", cursor: "pointer", color: "var(--text-tertiary)", alignSelf: "flex-start" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {lines.length > 0 && (
          <footer style={{ padding: "20px 24px", borderTop: "1px solid var(--border-hairline)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", font: "var(--body-md)", color: "var(--text-secondary)", marginBottom: 6 }}>
              <span>小計</span><span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{yen(subtotal)}</span>
            </div>
            <div style={{ font: "var(--caption)", color: freeShip ? "var(--green-60)" : "var(--text-tertiary)", marginBottom: 16 }}>
              {freeShip ? "✓ 送料無料が適用されます" : `あと ${yen(5000 - subtotal)} で送料無料`}
            </div>
            <Button variant="primary" size="lg" fullWidth>レジに進む</Button>
          </footer>
        )}
      </aside>
    </div>
  );
}

window.HirotCart = HirotCart;
