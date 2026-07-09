// Category list + product detail. Exports window.HirotList, window.HirotDetail.
const {
  Breadcrumb, Tabs, Button, ProductCard, Price, Rating, QuantityStepper, Tag, Divider, Select,
} = window.HirotDesignSystem_e62cf3;

/* ---------------- Category list ---------------- */
function HirotList({ data, category, onCategory, onOpen, onAdd, cols = 4 }) {
  const items = category === "すべて" ? data.products : data.products.filter((p) => p.cat === category);
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 24px 64px" }}>
      <Breadcrumb items={[{ label: "ホーム" }, { label: "ストア" }, { label: category }]} />
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "16px 0 24px", flexWrap: "wrap", gap: 16 }}>
        <div>
          <span style={{ font: "var(--eyebrow)", letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--green-60)" }}>Shop All</span>
          <h1 style={{ font: "var(--display-md)", margin: "8px 0 0", color: "var(--text-primary)" }}>{category}</h1>
        </div>
        <div style={{ width: 200 }}>
          <Select defaultValue="pop"><option value="pop">おすすめ順</option><option value="new">新着順</option><option value="price">価格が安い順</option></Select>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
        {data.categories.map((c) => {
          const on = c === category;
          return (
            <button key={c} onClick={() => onCategory(c)} style={{
              font: "var(--font-body)", fontSize: 14, fontWeight: 500,
              padding: "8px 18px", borderRadius: "var(--radius-pill)", cursor: "pointer",
              border: on ? "1.5px solid var(--ink)" : "1px solid var(--border-hairline)",
              background: on ? "var(--ink)" : "transparent",
              color: on ? "var(--on-ink)" : "var(--text-primary)",
            }}>{c}</button>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 24 }}>
        {items.map((p) => <ProductCard key={p.id} {...p} onClick={() => onOpen(p)} onAdd={() => onAdd(p)} />)}
      </div>
    </div>
  );
}

/* ---------------- Product detail ---------------- */
function HirotDetail({ product, data, onAdd, onBack, onOpen, cols = 4 }) {
  const [qty, setQty] = React.useState(1);
  const [tab, setTab] = React.useState("desc");
  const related = data.products.filter((p) => p.id !== product.id && p.cat === product.cat).slice(0, 4);
  const gallery = [product.image,
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80"];
  const [main, setMain] = React.useState(0);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 24px 64px" }}>
      <Breadcrumb items={[{ label: "ホーム" }, { label: "ストア" }, { label: product.cat }, { label: product.title }]} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, margin: "20px 0 56px" }}>
        {/* gallery */}
        <div>
          <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", aspectRatio: "1 / 1", background: "var(--surface-wash)" }}>
            <img src={gallery[main]} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            {gallery.map((g, i) => (
              <button key={i} onClick={() => setMain(i)} style={{ width: 72, height: 72, borderRadius: "var(--radius-md)", overflow: "hidden", border: i === main ? "2px solid var(--ink)" : "1px solid var(--border-hairline)", padding: 0, cursor: "pointer", background: "none" }}>
                <img src={g} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </button>
            ))}
          </div>
        </div>

        {/* info */}
        <div>
          <span style={{ font: "var(--font-display)", fontSize: 12, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>{product.brand}</span>
          <h1 style={{ font: "var(--heading-xl)", margin: "8px 0 12px", color: "var(--text-primary)" }}>{product.title}</h1>
          <Rating value={product.rating} count={product.reviews} />
          <div style={{ margin: "20px 0" }}><Price amount={product.price} original={product.original} size="lg" /></div>
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {product.tag && <Tag variant="mint">{product.tag}</Tag>}
            <Tag variant="outline">ギフト対応</Tag>
          </div>
          <p style={{ font: "var(--body-md)", color: "var(--text-secondary)", marginBottom: 28 }}>{product.desc}</p>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <QuantityStepper value={qty} onChange={setQty} />
            <Button variant="accent" size="lg" fullWidth onClick={() => onAdd(product, qty)} disabled={product.soldOut}>
              {product.soldOut ? "売り切れ" : "カートに入れる"}
            </Button>
          </div>
          <p style={{ font: "var(--caption)", color: "var(--text-tertiary)", marginTop: 14 }}>15時までのご注文で当日発送 ・ 5,000円以上で送料無料</p>
        </div>
      </div>

      {/* tabs */}
      <Tabs tabs={[{ value: "desc", label: "商品説明" }, { value: "spec", label: "詳細・仕様" }, { value: "ship", label: "配送・返品" }]} value={tab} onChange={setTab} />
      <div style={{ font: "var(--body-md)", color: "var(--text-secondary)", padding: "24px 0 8px", maxWidth: 720 }}>
        {tab === "desc" && <p style={{ margin: 0 }}>{product.desc} 素材の質感と使い心地にこだわり、長く愛用いただける一品に仕上げました。</p>}
        {tab === "spec" && <p style={{ margin: 0 }}>ブランド：{product.brand} ／ カテゴリー：{product.cat} ／ 原産国：日本 ／ お手入れ：手洗い推奨。</p>}
        {tab === "ship" && <p style={{ margin: 0 }}>全国一律550円（税込）、5,000円以上で無料。到着後7日以内であれば返品・交換を承ります。</p>}
      </div>

      <Divider style={{ margin: "40px 0 32px" }} />
      <h2 style={{ font: "var(--heading-lg)", margin: "0 0 20px", color: "var(--text-primary)" }}>関連する商品</h2>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 24 }}>
        {related.map((p) => <ProductCard key={p.id} {...p} onClick={() => onOpen(p)} onAdd={() => onAdd(p, 1)} />)}
      </div>
    </div>
  );
}

window.HirotList = HirotList;
window.HirotDetail = HirotDetail;
