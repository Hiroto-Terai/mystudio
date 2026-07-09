// Home screen — editorial marketing landing.
import { Button, ProductCard } from "../components";
import type { Catalog, Product } from "./types";

function HeroSection({ onShop, reverse }: { onShop: () => void; reverse: boolean }) {
  const copy = (
    <div key="copy">
      <span style={{ font: "var(--eyebrow)", letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--green-60)" }}>
        Design &amp; Commerce
      </span>
      <h1 style={{ font: "var(--display-xl)", letterSpacing: "-0.01em", margin: "16px 0 0", color: "var(--text-primary)" }}>
        売れる体験を、<br />ていねいに設計する。
      </h1>
      <p style={{ font: "var(--body-lg)", color: "var(--text-secondary)", maxWidth: 460, margin: "20px 0 0" }}>
        Hirot は、企画からデザイン、運用までを一貫して支える EC 制作スタジオ。ブランドの世界観を、購入体験の隅々まで。
      </p>
      <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
        <Button variant="primary" size="lg" onClick={onShop}>ストアを見る</Button>
        <Button variant="outline" size="lg">制作を相談する</Button>
      </div>
    </div>
  );
  const photo = (
    <div key="photo" style={{ borderRadius: "var(--radius-xl)", overflow: "hidden", aspectRatio: "4 / 5", boxShadow: "var(--shadow-3)" }}>
      <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1000&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </div>
  );
  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: reverse ? "1fr 1.05fr" : "1.05fr 1fr", gap: 48, alignItems: "center" }}>
        {reverse ? [photo, copy] : [copy, photo]}
      </div>
    </section>
  );
}

function LogoStrip() {
  const names = ["AOYAMA", "MORI", "KAZE", "SORA", "NAGI", "HANA"];
  return (
    <section style={{ maxWidth: 1000, margin: "24px auto 0", padding: "24px", display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
      {names.map((n) => (
        <span key={n} style={{ font: "var(--font-display)", fontWeight: 500, fontSize: 18, letterSpacing: "0.12em", color: "var(--shade-40)" }}>{n}</span>
      ))}
    </section>
  );
}

function FeaturedGrid({ products, onOpen, onAdd, cols = 4 }: { products: Product[]; onOpen: (p: Product) => void; onAdd: (p: Product) => void; cols?: number }) {
  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <span style={{ font: "var(--eyebrow)", letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--green-60)" }}>Featured Collection</span>
          <h2 style={{ font: "var(--display-md)", margin: "10px 0 0", color: "var(--text-primary)" }}>今週のおすすめ</h2>
        </div>
        <Button variant="ghost" size="sm">すべて見る →</Button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 24 }}>
        {products.slice(0, cols).map((p) => (
          <ProductCard key={p.id} {...p} onClick={() => onOpen(p)} onAdd={() => onAdd(p)} />
        ))}
      </div>
    </section>
  );
}

function ValueBand() {
  const items = [
    { t: "一貫した設計", d: "情報設計から UI、実装、運用改善まで一気通貫で。" },
    { t: "編集的なデザイン", d: "写真と余白を活かし、ブランドの世界観を丁寧に。" },
    { t: "成果への責任", d: "CVR・回遊率を指標に、公開後も伴走します。" },
  ];
  return (
    <section style={{ background: "var(--surface-band)", padding: "64px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <span style={{ font: "var(--eyebrow)", letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--green-70)" }}>Why Hirot</span>
        <h2 style={{ font: "var(--display-md)", margin: "10px 0 32px", color: "var(--text-primary)" }}>選ばれる、3つの理由</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
          {items.map((it, i) => (
            <div key={i}>
              <div style={{ font: "var(--font-display)", fontWeight: 300, fontSize: 40, color: "var(--green-70)", lineHeight: 1 }}>0{i + 1}</div>
              <h3 style={{ font: "var(--heading-md)", margin: "16px 0 8px", color: "var(--text-primary)" }}>{it.t}</h3>
              <p style={{ font: "var(--body-md)", color: "var(--text-secondary)", margin: 0 }}>{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export interface HomeProps {
  data: Catalog;
  onOpenProduct: (p: Product) => void;
  onAdd: (p: Product) => void;
  onShop: () => void;
  cols?: number;
  heroReverse?: boolean;
}

export function Home({ data, onOpenProduct, onAdd, onShop, cols = 4, heroReverse = false }: HomeProps) {
  return (
    <div>
      <HeroSection onShop={onShop} reverse={heroReverse} />
      <LogoStrip />
      <FeaturedGrid products={data.products} onOpen={onOpenProduct} onAdd={onAdd} cols={cols} />
      <ValueBand />
    </div>
  );
}
