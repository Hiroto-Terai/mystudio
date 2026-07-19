/* F1 お気に入り（wishlist）
 * 依存ゼロの自己完結 Web Component 群。layout/theme.liquid から defer で読み込む。
 * localStorage キー `nagi:wishlist` に商品ハンドルの配列（追加順）を保存する。
 * ハートはログイン不要のゲスト体験（localStorage のみ）で完結する。
 */
(() => {
  'use strict';

  const STORAGE_KEY = 'nagi:wishlist';
  const CHANGE_EVENT = 'nagi:wishlist:change';
  const BUBBLE_MAX_COUNT = 9;
  const CARD_IMAGE_WIDTH = 800;
  const HEART_PATH =
    'M12 20.6C7.2 16.9 3.5 13.4 3.5 9.6 3.5 7 5.6 5 8.1 5c1.6 0 3 .8 3.9 2.1C12.9 5.8 14.3 5 15.9 5c2.5 0 4.6 2 4.6 4.6 0 3.8-3.7 7.3-8.5 11z';

  /* ---- localStorage ストア ---- */

  function readHandles() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(parsed) ? parsed.filter((handle) => typeof handle === 'string') : [];
    } catch {
      // シークレットモード等で localStorage が使えない場合は常に空扱い
      return [];
    }
  }

  function writeHandles(handles) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(handles));
    } catch {
      // 保存できなくてもページ内の UI 同期は続ける
    }
    document.dispatchEvent(new CustomEvent(CHANGE_EVENT));
  }

  function hasHandle(handle) {
    return readHandles().includes(handle);
  }

  function toggleHandle(handle) {
    const handles = readHandles();
    const index = handles.indexOf(handle);
    if (index === -1) {
      handles.push(handle);
    } else {
      handles.splice(index, 1);
    }
    writeHandles(handles);
  }

  // 別タブでの変更も同じ change イベントに合流させる
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) document.dispatchEvent(new CustomEvent(CHANGE_EVENT));
  });

  /* ---- 共通ヘルパー ---- */

  const esc = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch])
    );

  const heartSvg = (size) =>
    `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" aria-hidden="true"><path d="${HEART_PATH}"/></svg>`;

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

  function extractHandle(href) {
    const match = href.match(/\/products\/([^/?#]+)/);
    return match ? decodeURIComponent(match[1]) : '';
  }

  /* ---- ハート切り替えボタン ----
   * <nagi-fav-toggle data-product-handle="..."> をカードの <a> の兄弟として置く
   * （a > button の HTML 不正を回避。デザイン仕様 §2）。中身が空なら自前で
   * ボタンを生成するので、JS からの注入時は要素を append するだけでよい。 */

  class NagiFavToggle extends HTMLElement {
    connectedCallback() {
      this.handle = this.dataset.productHandle || '';
      if (!this.querySelector('button')) {
        this.innerHTML = `<button type="button" class="nagi-fav-toggle" aria-pressed="false" aria-label="お気に入りに追加">${heartSvg(22)}</button>`;
      }
      this.button = this.querySelector('button');
      this.button.addEventListener('click', (event) => {
        event.preventDefault();
        toggleHandle(this.handle);
      });
      this.onChange = () => this.update();
      document.addEventListener(CHANGE_EVENT, this.onChange);
      this.update();
    }

    disconnectedCallback() {
      document.removeEventListener(CHANGE_EVENT, this.onChange);
    }

    update() {
      const isPressed = hasHandle(this.handle);
      this.button.setAttribute('aria-pressed', String(isPressed));
      this.button.setAttribute('aria-label', isPressed ? 'お気に入りから削除' : 'お気に入りに追加');
    }
  }

  customElements.define('nagi-fav-toggle', NagiFavToggle);

  /* ---- ヘッダーの件数バッジ ----
   * 0 件時は中身を空にして :empty { display: none } で消す（Dawn の
   * cart-count-bubble パターン）。10 件以上は「9+」に丸める。 */

  class NagiFavBubble extends HTMLElement {
    connectedCallback() {
      this.onChange = () => this.update();
      document.addEventListener(CHANGE_EVENT, this.onChange);
      this.update();
    }

    disconnectedCallback() {
      document.removeEventListener(CHANGE_EVENT, this.onChange);
    }

    update() {
      const count = readHandles().length;
      if (count === 0) {
        this.textContent = '';
      } else {
        this.textContent = count > BUBBLE_MAX_COUNT ? `${BUBBLE_MAX_COUNT}+` : String(count);
      }
      const link = this.closest('a');
      if (link) link.setAttribute('aria-label', `お気に入り（${count}件）`);
    }
  }

  customElements.define('nagi-fav-bubble', NagiFavBubble);

  /* ---- wishlist ページ ----
   * sections/nagi-wishlist.liquid のルート要素。localStorage のハンドルから
   * /products/<handle>.js を取得し、.nagi-card と同一構造のカードを描画する。 */

  class NagiWishlistPage extends HTMLElement {
    connectedCallback() {
      this.brand = this.dataset.brand || '';
      this.grid = this.querySelector('[data-wishlist-grid]');
      this.gridWrap = this.querySelector('[data-wishlist-grid-wrap]');
      this.empty = this.querySelector('[data-wishlist-empty]');
      this.count = this.querySelector('[data-wishlist-count]');
      this.productCache = new Map();
      this.renderToken = 0;
      this.onChange = () => this.render();
      document.addEventListener(CHANGE_EVENT, this.onChange);
      this.render();
    }

    disconnectedCallback() {
      document.removeEventListener(CHANGE_EVENT, this.onChange);
    }

    async render() {
      const token = ++this.renderToken;
      const handles = readHandles().slice().reverse(); // 新しく追加した順に表示
      if (handles.length === 0) {
        this.renderCount(0);
        this.grid.innerHTML = '';
        this.gridWrap.hidden = true;
        this.empty.hidden = false;
        return;
      }

      const results = await Promise.all(handles.map((handle) => this.fetchProduct(handle)));
      if (token !== this.renderToken) return; // 描画中に新しい render が始まっていたら破棄

      const products = results.filter((result) => result.product).map((result) => result.product);
      this.renderCount(products.length);
      this.grid.innerHTML = products.map((product) => this.cardHTML(product)).join('');
      this.gridWrap.hidden = products.length === 0;
      this.empty.hidden = products.length !== 0;

      // ストアから削除された商品（404）は保存からも除く。通信エラーは残す
      const missing = handles.filter((handle, index) => results[index].missing);
      if (missing.length > 0) {
        writeHandles(readHandles().filter((handle) => !missing.includes(handle)));
      }
    }

    renderCount(count) {
      this.count.hidden = count === 0;
      this.count.innerHTML = `<strong>${count}点</strong>の商品`;
    }

    async fetchProduct(handle) {
      if (this.productCache.has(handle)) return this.productCache.get(handle);
      const response = await fetch(`/products/${encodeURIComponent(handle)}.js`).catch(() => null);
      let result;
      if (response && response.ok) {
        result = { product: await response.json() };
      } else if (response && response.status === 404) {
        result = { missing: true };
      } else {
        result = { error: true };
      }
      if (!result.error) this.productCache.set(handle, result);
      return result;
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

  customElements.define('nagi-wishlist-page', NagiWishlistPage);

  /* ---- Dawn 標準カード・商品詳細への注入 ----
   * Dawn の Liquid（card-product / main-product）は改変しない方針のため、
   * コレクション/検索/関連商品グリッドと商品詳細のハートは JS から重ねる。
   * フィルター適用時に Dawn がグリッドの DOM を差し替えるので、
   * MutationObserver で再注入する（注入は冪等）。 */

  function injectCardToggles() {
    document.querySelectorAll('.product-grid .card-wrapper').forEach((wrapper) => {
      if (wrapper.querySelector('nagi-fav-toggle')) return;
      const link = wrapper.querySelector('a[href*="/products/"]');
      const handle = link ? extractHandle(link.getAttribute('href')) : '';
      if (!handle) return;
      const toggle = document.createElement('nagi-fav-toggle');
      toggle.dataset.productHandle = handle;
      wrapper.appendChild(toggle);
    });
  }

  function injectPdpToggle() {
    const mediaWrapper = document.querySelector('.product__media-wrapper');
    if (!mediaWrapper || mediaWrapper.querySelector('nagi-fav-toggle')) return;
    const handle = extractHandle(window.location.pathname);
    if (!handle) return;
    const toggle = document.createElement('nagi-fav-toggle');
    toggle.dataset.productHandle = handle;
    mediaWrapper.appendChild(toggle);
  }

  function initInjection() {
    injectCardToggles();
    injectPdpToggle();
    let isScheduled = false;
    new MutationObserver(() => {
      if (isScheduled) return;
      isScheduled = true;
      requestAnimationFrame(() => {
        isScheduled = false;
        injectCardToggles();
      });
    }).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInjection);
  } else {
    initInjection();
  }
})();
