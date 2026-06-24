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
      this.listEl.replaceChildren(...products.filter(Boolean).map(this.cardElement));
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

    // Build nodes with the DOM API so product data never has to be HTML-escaped.
    cardElement = (product) => {
      const item = el('li', 'wishlist__item');

      const card = el('a', 'wishlist__card');
      card.href = `${window.Shopify.routes.root}products/${product.handle}`;

      const media = el('div', 'wishlist__media');
      if (product.featured_image) {
        const img = document.createElement('img');
        img.src = `${product.featured_image}&width=400`;
        img.alt = product.title || '';
        img.loading = 'lazy';
        media.appendChild(img);
      }

      const info = el('div', 'wishlist__info');
      info.append(
        el('span', 'wishlist__title', product.title || ''),
        el('span', 'wishlist__price', formatMoney(product.price))
      );

      card.append(media, info);

      const remove = document.createElement('wishlist-button');
      remove.className = 'wishlist__remove is-active';
      remove.dataset.productHandle = product.handle;
      const button = el('button', null, this.dataset.removeIcon || '×');
      button.type = 'button';
      button.setAttribute('aria-pressed', 'true');
      button.setAttribute('aria-label', this.dataset.labelRemove || '');
      remove.appendChild(button);

      item.append(card, remove);
      return item;
    };

    toggleEmpty(isEmpty) {
      if (this.emptyEl) this.emptyEl.hidden = !isEmpty;
      if (this.listEl) this.listEl.hidden = isEmpty;
    }
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function formatMoney(cents) {
    if (window.Shopify && typeof window.Shopify.formatMoney === 'function') {
      return window.Shopify.formatMoney(cents);
    }
    return (cents / 100).toLocaleString(undefined, { minimumFractionDigits: 0 });
  }

  if (!customElements.get('wishlist-button')) {
    customElements.define('wishlist-button', WishlistButton);
  }
  if (!customElements.get('wishlist-list')) {
    customElements.define('wishlist-list', WishlistList);
  }
})();
