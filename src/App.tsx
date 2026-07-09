import { useEffect, useState } from "react";
import { NavBar, Footer } from "./components";
import { catalog } from "./storefront/data";
import type { Product, CartLine } from "./storefront/types";
import { Home } from "./storefront/Home";
import { CatalogList, ProductDetail } from "./storefront/Catalog";
import { Cart } from "./storefront/Cart";
import { ThemeControls } from "./storefront/ThemeControls";
import { DEFAULT_SETTINGS, applySettings } from "./storefront/theme";
import type { Settings } from "./storefront/theme";

type Route = "home" | "list" | "detail";

const NAV_LINKS = [{ label: "ストア" }, { label: "特集" }, { label: "制作実績" }, { label: "料金" }];
const FOOTER_COLS = [
  { title: "Shop", links: [{ label: "すべての商品" }, { label: "アパレル" }, { label: "生活雑貨" }, { label: "ギフト" }] },
  { title: "About", links: [{ label: "Hirotについて" }, { label: "制作実績" }, { label: "料金プラン" }] },
  { title: "Support", links: [{ label: "配送について" }, { label: "返品・交換" }, { label: "よくある質問" }] },
];

export function App() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  const [route, setRoute] = useState<Route>("home");
  const [category, setCategory] = useState("すべて");
  const [product, setProduct] = useState<Product | null>(null);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // apply theme + font settings to :root
  useEffect(() => {
    applySettings(settings);
  }, [settings]);

  const cols = settings.gridCols;
  const cartCount = lines.reduce((s, l) => s + l.qty, 0);

  function addToCart(p: Product, qty = 1) {
    setLines((prev) => {
      const ex = prev.find((l) => l.product.id === p.id);
      if (ex) return prev.map((l) => (l.product.id === p.id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { product: p, qty }];
    });
    setCartOpen(true);
  }
  function setQty(id: string, qty: number) {
    setLines((prev) => prev.map((l) => (l.product.id === id ? { ...l, qty } : l)));
  }
  function removeLine(id: string) {
    setLines((prev) => prev.filter((l) => l.product.id !== id));
  }
  function openProduct(p: Product) {
    setProduct(p);
    setRoute("detail");
    window.scrollTo(0, 0);
  }
  function goList(cat?: string) {
    if (cat) setCategory(cat);
    setRoute("list");
    window.scrollTo(0, 0);
  }
  function goHome() {
    setRoute("home");
    window.scrollTo(0, 0);
  }

  return (
    <div>
      <div className="app-nav">
        <NavBar
          links={NAV_LINKS}
          cartCount={cartCount}
          ctaLabel="無料で相談する"
          onLogoClick={goHome}
          onCartClick={() => setCartOpen(true)}
          onLinkClick={() => goList("すべて")}
        />
      </div>

      {route === "home" && (
        <Home
          data={catalog}
          cols={cols}
          heroReverse={settings.heroReverse}
          onOpenProduct={openProduct}
          onAdd={addToCart}
          onShop={() => goList("すべて")}
        />
      )}
      {route === "list" && (
        <CatalogList
          data={catalog}
          category={category}
          cols={cols}
          onCategory={setCategory}
          onOpen={openProduct}
          onAdd={addToCart}
        />
      )}
      {route === "detail" && product && (
        <ProductDetail
          product={product}
          data={catalog}
          cols={cols}
          onAdd={addToCart}
          onBack={() => goList(category)}
          onOpen={openProduct}
        />
      )}

      <Footer tone={settings.footerDark ? "dark" : "light"} columns={FOOTER_COLS} />

      <Cart open={cartOpen} lines={lines} onClose={() => setCartOpen(false)} onQty={setQty} onRemove={removeLine} />

      <ThemeControls settings={settings} onChange={(patch) => setSettings((s) => ({ ...s, ...patch }))} />
    </div>
  );
}
