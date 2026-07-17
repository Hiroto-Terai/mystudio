/* F2 送料無料プログレスバー + F3 配送日時指定 + F7 ギフトラッピング
 * 依存ゼロの自己完結 Web Component 群。対象セクションとカートドロワーから defer で読み込む。
 * Dawn の pubsub（cartUpdate）を購読してカート更新へ追随する。
 * 同一ページに複数の <script> が並ぶことがあるため、二重定義を先頭で防ぐ。
 */
(() => {
  'use strict';

  if (customElements.get('hirot-shipbar')) return;

  const GIFT_ATTRIBUTE = 'ギフトラッピング';
  const GIFT_VALUE = '希望する';
  const GIFT_SYNC_EVENT = 'hirot:gift:change';

  // Ajax API の price はすべて「セント換算」（¥2,400 → 240000）で返る
  function formatMoney(cents) {
    const currency =
      (window.Shopify && window.Shopify.currency && window.Shopify.currency.active) || 'JPY';
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency })
      .format(cents / 100)
      .replace('￥', '¥');
  }

  /* cart attribute を 1 件だけ即時更新する。失敗（!ok）は throw して
   * 呼び出し側が UI を変更前へ戻せるようにする。 */
  async function updateCartAttribute(name, value) {
    const updateUrl = (window.routes && window.routes.cart_update_url) || '/cart/update.js';
    const response = await fetch(updateUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ attributes: { [name]: value } }),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
  }

  /* cartUpdate を購読し、常に total_price / item_count を持つカート JSON で
   * callback を呼ぶ。商品追加（cart/add.js 応答）はカート全体を含まないため
   * /cart.js から取り直す。pubsub 未ロード時は購読しない（サーバー描画のみ）。 */
  function onCartUpdate(callback) {
    if (typeof subscribe !== 'function' || typeof PUB_SUB_EVENTS === 'undefined') return null;
    return subscribe(PUB_SUB_EVENTS.cartUpdate, (event) => {
      const cartData = event && event.cartData;
      if (cartData && typeof cartData.total_price === 'number') {
        callback(cartData);
      } else {
        const cartUrl = (window.routes && window.routes.cart_url) || '/cart';
        fetch(`${cartUrl}.js`)
          .then((response) => response.json())
          .then(callback)
          .catch(() => {});
      }
    });
  }

  /* ---- F2 プログレスバー ----
   * snippets/hirot-shipbar.liquid のルート要素。初期状態はサーバー描画で、
   * カート更新時に差額・バー幅・達成状態をクライアント側で更新する。 */

  class HirotShipbar extends HTMLElement {
    connectedCallback() {
      this.threshold = parseInt(this.dataset.threshold, 10);
      this.amount = this.querySelector('[data-shipbar-amount]');
      this.fill = this.querySelector('[data-shipbar-fill]');
      this.unsubscribe = onCartUpdate((cart) => this.render(cart));
    }

    disconnectedCallback() {
      if (this.unsubscribe) this.unsubscribe();
    }

    render(cart) {
      this.hidden = cart.item_count === 0;
      if (this.hidden) return;
      const remaining = this.threshold - cart.total_price;
      this.classList.toggle('hirot-shipbar--done', remaining <= 0);
      if (remaining > 0) this.amount.textContent = formatMoney(remaining);
      this.fill.style.width = `${Math.min((cart.total_price / this.threshold) * 100, 100)}%`;
    }
  }

  customElements.define('hirot-shipbar', HirotShipbar);

  /* ---- F7 ギフトラッピング ----
   * snippets/hirot-gift-wrap.liquid のルート要素。チェック変更を cart attribute
   * へ即時 POST し、ページ/ドロワーの複数インスタンス間はイベントで同期する。 */

  class HirotGiftWrap extends HTMLElement {
    connectedCallback() {
      this.checkbox = this.querySelector('input[type="checkbox"]');
      this.checkbox.addEventListener('change', () => this.save(this.checkbox.checked));
      this.onSync = (event) => {
        this.checkbox.checked = event.detail.checked;
      };
      document.addEventListener(GIFT_SYNC_EVENT, this.onSync);
      this.unsubscribe = onCartUpdate((cart) => {
        this.hidden = cart.item_count === 0;
      });
    }

    disconnectedCallback() {
      document.removeEventListener(GIFT_SYNC_EVENT, this.onSync);
      if (this.unsubscribe) this.unsubscribe();
    }

    async save(checked) {
      this.checkbox.disabled = true;
      try {
        await updateCartAttribute(GIFT_ATTRIBUTE, checked ? GIFT_VALUE : '');
        document.dispatchEvent(new CustomEvent(GIFT_SYNC_EVENT, { detail: { checked } }));
      } catch {
        // 記録に失敗したら表示を実状態（変更前）へ戻す
        this.checkbox.checked = !checked;
      } finally {
        this.checkbox.disabled = false;
      }
    }
  }

  customElements.define('hirot-gift-wrap', HirotGiftWrap);

  /* ---- F3 配送日時指定 ----
   * snippets/hirot-delivery.liquid のルート要素（カートページ / ドロワー共通）。
   * 選択の変更を cart attributes「配送希望日」「配送希望時間帯」へ即時 POST する。
   * リロード・ドロワー再描画時の復元はサーバー描画（cart.attributes → selected）が担う。 */

  const DELIVERY_DATE_ATTRIBUTE = '配送希望日';
  const DELIVERY_TIME_ATTRIBUTE = '配送希望時間帯';
  const DELIVERY_DAYS_AHEAD = 14;
  const SUNDAY = 0;
  const WEEKDAY_LABELS = ['日', '月', '火', '水', '木', '金', '土'];

  class HirotDelivery extends HTMLElement {
    connectedCallback() {
      this.dateSelect = this.querySelector('[data-delivery-date]');
      this.timeSelect = this.querySelector('[data-delivery-time]');
      this.buildDateOptions();
      this.bindSelect(this.dateSelect, DELIVERY_DATE_ATTRIBUTE);
      this.bindSelect(this.timeSelect, DELIVERY_TIME_ATTRIBUTE);
      this.unsubscribe = onCartUpdate((cart) => {
        this.hidden = cart.item_count === 0;
      });
    }

    disconnectedCallback() {
      if (this.unsubscribe) this.unsubscribe();
    }

    /* 日付リストを Liquid で組むと 'now' がページキャッシュで古くなるため、
     * 接続時にクライアントで生成する。サーバー描画の選択済み日付（data-saved）は
     * 生成後のリスト内の同じ値へ引き継ぎ、範囲外なら「指定なし」に戻る。 */
    buildDateOptions() {
      const isSundayExcluded = this.dataset.excludeSunday === 'true';
      const savedDate = this.dateSelect.dataset.saved;
      const options = [new Option('指定なし', '')];
      const date = new Date();
      for (let i = 0; i < DELIVERY_DAYS_AHEAD; i += 1) {
        date.setDate(date.getDate() + 1);
        if (isSundayExcluded && date.getDay() === SUNDAY) continue;
        const label = `${date.getMonth() + 1}/${date.getDate()}（${WEEKDAY_LABELS[date.getDay()]}）`;
        options.push(new Option(label, label, false, label === savedDate));
      }
      this.dateSelect.replaceChildren(...options);
    }

    bindSelect(select, attribute) {
      let savedValue = select.value;
      select.addEventListener('change', async () => {
        select.disabled = true;
        try {
          await updateCartAttribute(attribute, select.value);
          savedValue = select.value;
        } catch {
          // 記録に失敗したら表示を実状態（変更前）へ戻す
          select.value = savedValue;
        } finally {
          select.disabled = false;
        }
      });
    }
  }

  customElements.define('hirot-delivery', HirotDelivery);
})();
