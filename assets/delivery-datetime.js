/*
 * Saves the requested delivery date and time slot as cart attributes.
 * Attributes persist to the order via Shopify's AJAX cart API.
 */
(function () {
  class DeliveryDatetime extends HTMLElement {
    connectedCallback() {
      this.dateInput = this.querySelector('[data-delivery-date]');
      this.timeInput = this.querySelector('[data-delivery-time]');
      this.status = this.querySelector('[data-delivery-status]');
      this.dateKey = this.dataset.dateKey;
      this.timeKey = this.dataset.timeKey;

      this.inputs = [this.dateInput, this.timeInput].filter(Boolean);
      this.inputs.forEach((el) => el.addEventListener('change', this.save));
    }

    disconnectedCallback() {
      this.inputs.forEach((el) => el.removeEventListener('change', this.save));
    }

    save = async () => {
      const attributes = {};
      if (this.dateInput) attributes[this.dateKey] = this.dateInput.value;
      if (this.timeInput) attributes[this.timeKey] = this.timeInput.value;

      try {
        const response = await fetch(`${window.Shopify.routes.root}cart/update.js`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ attributes }),
        });
        if (response.ok) {
          this.showStatus(this.dataset.savedText);
        }
      } catch (error) {
        // Network errors are non-blocking: the buyer can still check out.
      }
    };

    showStatus(message) {
      if (!this.status || !message) return;
      this.status.textContent = message;
      clearTimeout(this.statusTimer);
      this.statusTimer = setTimeout(() => {
        this.status.textContent = '';
      }, 2000);
    }
  }

  if (!customElements.get('delivery-datetime')) {
    customElements.define('delivery-datetime', DeliveryDatetime);
  }
})();
