/*
 * Client-side wishlist stored in localStorage. No account required.
 * - <wishlist-button data-product-handle="..."> toggles a product in the list
 * - <wishlist-list> renders the saved products on the wishlist page
 */
(function () {
  const STORAGE_KEY = 'theme:wishlist:v1';
  const CHANGE_EVENT = 'wishlist:change';

  function readWishlist() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function writeWishlist(handles) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(handles));
    document.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { handles } }));
  }

  function toggleHandle(handle) {
    const handles = readWishlist();
    const index = handles.indexOf(handle);
    if (index === -1) {
      handles.push(handle);
    } else {
      handles.splice(index, 1);
    }
    writeWishlist(handles);
    return handles.indexOf(handle) !== -1;
  }

  class WishlistButton extends HTMLElement {
    connectedCallback() {
      this.handle = this.dataset.productHandle;
      this.button = this.querySelector('button');
      if (!this.handle || !this.button) return;

      this.syncState();
      this.button.addEventListener('click', this.handleClick);
      document.addEventListener(CHANGE_EVENT, this.syncState);
    }

    disconnectedCallback() {
      document.removeEventListener(CHANGE_EVENT, this.syncState);
    }

    handleClick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const isActive = toggleHandle(this.handle);
      this.reflect(isActive);
    };

    syncState = () => {
      this.reflect(readWishlist().indexOf(this.handle) !== -1);
    };

    reflect(isActive) {
      this.classList.toggle('is-active', isActive);
      this.button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      const label = isActive ? this.dataset.labelRemove : this.dataset.labelAdd;
      if (label) this.button.setAttribute('aria-label', label);
    }
  }

  class WishlistList extends HTMLElement {
    connectedCallback() {
      this.listEl = this.querySelector('[data-wishlist-items]');
      this.emptyEl = this.querySelector('[data-wishlist-empty]');
      this.render();
      document.addEventListener(CHANGE_EVENT, this.render);
      window.addEventListener('storage', this.render);
    }

    disconnectedCallback() {
      document.removeEventListener(CHANGE_EVENT, this.render);
      window.removeEventListener('storage', this.render);
    }

    render = async () => {
      const handles = readWishlist();
      if (!handles.length) {
        this.listEl.innerHTML = '';
        this.toggleEmpty(true);
        return;
      }
      this.toggleEmpty(false);

      const products = await Promise.all(handles.map(this.fetchProduct));
      this.listEl.innerHTML = products.filter(Boolean).map(this.cardMarkup).join('');
    };

    fetchProduct = async (handle) => {
      try {
        const response = await fetch(`${window.Shopify.routes.root}products/${handle}.js`);
        if (!response.ok) return null;
        return await response.json();
      } catch (error) {
        return null;
      }
    };

    cardMarkup = (product) => {
      const image = product.featured_image
        ? `<img src="${product.featured_image}&width=400" alt="${escapeHtml(product.title)}" loading="lazy">`
        : '';
      const price = formatMoney(product.price);
      const url = `${window.Shopify.routes.root}products/${product.handle}`;
      return `
        <li class="wishlist__item">
          <a class="wishlist__card" href="${url}">
            <div class="wishlist__media">${image}</div>
            <div class="wishlist__info">
              <span class="wishlist__title">${escapeHtml(product.title)}</span>
              <span class="wishlist__price">${price}</span>
            </div>
          </a>
          <wishlist-button
            class="wishlist__remove is-active"
            data-product-handle="${product.handle}"
          >
            <button type="button" aria-pressed="true" aria-label="${escapeHtml(this.dataset.labelRemove || '')}">
              ${this.dataset.removeIcon || '&times;'}
            </button>
          </wishlist-button>
        </li>
      `;
    };

    toggleEmpty(isEmpty) {
      if (this.emptyEl) this.emptyEl.hidden = !isEmpty;
      if (this.listEl) this.listEl.hidden = isEmpty;
    }
  }

  function formatMoney(cents) {
    if (window.Shopify && typeof window.Shopify.formatMoney === 'function') {
      return window.Shopify.formatMoney(cents);
    }
    return (cents / 100).toLocaleString(undefined, { minimumFractionDigits: 0 });
  }

  function escapeHtml(value) {
    const div = document.createElement('div');
    div.textContent = value == null ? '' : String(value);
    return div.innerHTML;
  }

  if (!customElements.get('wishlist-button')) {
    customElements.define('wishlist-button', WishlistButton);
  }
  if (!customElements.get('wishlist-list')) {
    customElements.define('wishlist-list', WishlistList);
  }
})();
