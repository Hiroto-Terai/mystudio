/* F5 最近見た商品 + F6 再入荷通知（商品詳細ページ）
 * 依存ゼロの自己完結 Web Component 群。対象セクション/スニペットから defer で読み込む。
 * F5 は localStorage キー `nagi:recent` に商品ハンドルの配列（新しい順）を保存し、
 * F1 wishlist と同じ /products/<handle>.js フェッチ + .nagi-card 構造で描画する。
 * F6 は localStorage キー `nagi:restock` に { handle: email } を記録するデモ実装
 * （実配信は Shopify Flow 連携の入口という位置づけ）。
 * 同一ページに複数の <script> が並ぶことがあるため、二重定義を先頭で防ぐ。
 */
(() => {
  'use strict';

  if (customElements.get('nagi-recent-products')) return;

  const RECENT_KEY = 'nagi:recent';
  const RECENT_MAX = 8;
  const RESTOCK_KEY = 'nagi:restock';
  const CARD_IMAGE_WIDTH = 800;

  /* ---- 共通ヘルパー ---- */

  function readStorage(key, fallback) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key));
      return parsed == null ? fallback : parsed;
    } catch {
      // シークレットモード等で localStorage が使えない場合は常に空扱い
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // 保存できなくてもページ内の UI は成立させる
    }
  }

  const esc = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch])
    );

  // Ajax API の price はすべて「セント換算」（¥2,400 → 240000）で返る
  function formatMoney(cents) {
    const currency =
      (window.Shopify && window.Shopify.currency && window.Shopify.currency.active) || 'JPY';
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency })
      .format(cents / 100)
      .replace('￥', '¥');
  }

  function imageUrl(src, width) {
    return src + (src.includes('?') ? '&' : '?') + 'width=' + width;
  }

  /* ---- F5 最近見た商品 ----
   * sections/nagi-recent-products.liquid のルート要素（初期状態は hidden）。
   * 「現商品を除いた閲覧履歴」を描画してから現商品を履歴の先頭に記録する
   * （同じページのリロードでも表示が変わらないようにする）。0 件なら hidden のまま。 */

  class NagiRecentProducts extends HTMLElement {
    connectedCallback() {
      this.brand = this.dataset.brand || '';
      this.track = this.querySelector('[data-recent-track]');
      const currentHandle = this.dataset.currentHandle || '';
      const viewedHandles = readRecentHandles();
      this.recordView(currentHandle, viewedHandles);
      const displayHandles = viewedHandles.filter((handle) => handle !== currentHandle);
      if (displayHandles.length > 0) this.render(displayHandles);
    }

    recordView(handle, viewedHandles) {
      if (!handle) return;
      const handles = viewedHandles.filter((viewed) => viewed !== handle);
      handles.unshift(handle);
      writeStorage(RECENT_KEY, handles.slice(0, RECENT_MAX));
    }

    async render(handles) {
      const results = await Promise.all(handles.map((handle) => fetchProduct(handle)));
      const products = results.filter((result) => result.product).map((result) => result.product);
      if (products.length === 0) return;
      this.track.innerHTML = products.map((product) => this.cardHTML(product)).join('');
      this.hidden = false;

      // ストアから削除された商品（404）は履歴からも除く。通信エラーは残す
      const missing = handles.filter((handle, index) => results[index].missing);
      if (missing.length > 0) {
        writeStorage(
          RECENT_KEY,
          readRecentHandles().filter((handle) => !missing.includes(handle))
        );
      }
    }

    cardHTML(product) {
      const image = product.featured_image
        ? `<img src="${esc(imageUrl(product.featured_image, CARD_IMAGE_WIDTH))}" alt="${esc(product.title)}" loading="lazy" width="${CARD_IMAGE_WIDTH}" height="${Math.round((CARD_IMAGE_WIDTH * 4) / 3)}">`
        : '';
      const soldoutBadge = product.available
        ? ''
        : '<span class="nagi-card__soldout-badge">売り切れ</span>';
      const comparePrice =
        product.compare_at_price > product.price
          ? `<span class="nagi-card__compare-price">${formatMoney(product.compare_at_price)}</span>`
          : '';
      return `
        <div class="nagi-card nagi-card--fav">
          <a href="/products/${encodeURIComponent(product.handle)}" class="nagi-card__link">
            <div class="nagi-card__image-wrap">
              ${image}
              ${soldoutBadge}
            </div>
            <div class="nagi-card__info">
              <div class="nagi-card__brand">${esc(this.brand)}</div>
              <div class="nagi-card__title">${esc(product.title)}</div>
              <div class="nagi-card__price-wrap">
                <span class="nagi-card__price">${formatMoney(product.price)}</span>
                ${comparePrice}
              </div>
            </div>
          </a>
          <nagi-fav-toggle data-product-handle="${esc(product.handle)}"></nagi-fav-toggle>
        </div>`;
    }
  }

  function readRecentHandles() {
    const parsed = readStorage(RECENT_KEY, []);
    return Array.isArray(parsed) ? parsed.filter((handle) => typeof handle === 'string') : [];
  }

  async function fetchProduct(handle) {
    const response = await fetch(`/products/${encodeURIComponent(handle)}.js`).catch(() => null);
    if (response && response.ok) return { product: await response.json() };
    if (response && response.status === 404) return { missing: true };
    return { error: true };
  }

  customElements.define('nagi-recent-products', NagiRecentProducts);

  /* ---- F6 再入荷通知 ----
   * snippets/nagi-restock.liquid のルート要素（売り切れ商品のみサーバー描画される）。
   * 送信でメールアドレスを localStorage に記録し、フォームを完了表示へ差し替える。
   * リロード時も登録済みなら完了表示のままにする。 */

  class NagiRestock extends HTMLElement {
    connectedCallback() {
      this.handle = this.dataset.productHandle || '';
      this.form = this.querySelector('[data-restock-form]');
      this.success = this.querySelector('[data-restock-success]');
      this.successText = this.querySelector('[data-restock-success-text]');
      this.form.addEventListener('submit', (event) => {
        event.preventDefault();
        this.register();
      });
      if (readRestockEmails()[this.handle]) {
        this.showSuccess('登録済みです。再入荷時にメールでお知らせします。');
      }
    }

    register() {
      const email = this.form.querySelector('input[type="email"]').value.trim();
      const emails = readRestockEmails();
      emails[this.handle] = email;
      writeStorage(RESTOCK_KEY, emails);
      this.showSuccess('登録しました。再入荷時にメールでお知らせします。');
    }

    showSuccess(message) {
      this.form.hidden = true;
      this.successText.textContent = message;
      this.success.hidden = false;
    }
  }

  function readRestockEmails() {
    const parsed = readStorage(RESTOCK_KEY, {});
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  }

  customElements.define('nagi-restock', NagiRestock);
})();
