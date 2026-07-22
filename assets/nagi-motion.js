/* 動的リッチセクション群（v4）の自己完結スクリプト。依存ゼロ。
 * 対象セクションから defer で読み込む。複数セクションが同じファイルを読み込むため、
 * Web Component は customElements.get で二重定義を防ぎ、reveal 初期化は 1 回だけ走らせる。
 * 進化的強化: 中身は Liquid でサーバレンダー済み。JS はあくまで操作性の付加。
 */
(() => {
  'use strict';

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- F4 スクロール連動アニメ ----
   * [data-nagi-reveal] を監視し、ビューポート進入で is-revealed を付けてフェードイン。
   * 初期の非表示状態は JS が付与する（nagi-reveal-armed）ため、JS 無効時は普通に見える。
   * すでに画面内にある要素はアニメなしで即表示し、初回読み込みのチラつきを防ぐ。 */

  function armReveal(root) {
    const targets = (root || document).querySelectorAll('[data-nagi-reveal]:not([data-nagi-seen])');
    if (targets.length === 0) return;

    const supportsObserver = 'IntersectionObserver' in window;
    const observer = supportsObserver
      ? new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add('is-revealed');
              obs.unobserve(entry.target);
            });
          },
          { rootMargin: '0px 0px -10% 0px' }
        )
      : null;

    targets.forEach((el) => {
      el.setAttribute('data-nagi-seen', '');
      const rect = el.getBoundingClientRect();
      const alreadyInView = rect.top < window.innerHeight && rect.bottom > 0;
      if (prefersReducedMotion || alreadyInView || !observer) {
        el.classList.add('is-revealed');
        return;
      }
      el.classList.add('nagi-reveal-armed');
      observer.observe(el);
    });
  }

  if (!window.__nagiRevealInit) {
    window.__nagiRevealInit = true;
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => armReveal());
    } else {
      armReveal();
    }
    // テーマエディタでセクションを追加/再描画したとき再スキャンする
    document.addEventListener('shopify:section:load', (event) => armReveal(event.target));
  }

  /* ---- F1 Before/After スライダー ----
   * 全面に透明で重ねた range の値を親要素の --pos に反映するだけ。
   * ドラッグ（range のトラック）とキーボード（矢印キー）を 1 要素で賄う。 */

  if (!customElements.get('nagi-before-after')) {
    class NagiBeforeAfter extends HTMLElement {
      connectedCallback() {
        const range = this.querySelector('[data-ba-range]');
        if (!range) return;
        const update = () => this.style.setProperty('--pos', range.value);
        range.addEventListener('input', update);
        update();
      }
    }
    customElements.define('nagi-before-after', NagiBeforeAfter);
  }

  /* ---- F3 商品スワイプカルーセル ----
   * scroll-snap のトラックを前後ボタン・ドット・ドラッグ・任意オートプレイで操作する。
   * ネイティブの横スクロール（タッチスワイプ）はそのまま活きる。 */

  if (!customElements.get('nagi-product-carousel')) {
    class NagiProductCarousel extends HTMLElement {
      connectedCallback() {
        this.track = this.querySelector('[data-carousel-track]');
        this.items = this.track ? [...this.track.querySelectorAll('.nagi-carousel__item')] : [];
        if (!this.track || this.items.length === 0) return;

        this.prevBtn = this.querySelector('[data-carousel-prev]');
        this.nextBtn = this.querySelector('[data-carousel-next]');
        this.dotsWrap = this.querySelector('[data-carousel-dots]');

        this.prevBtn && this.prevBtn.addEventListener('click', () => this.scrollByItems(-1));
        this.nextBtn && this.nextBtn.addEventListener('click', () => this.scrollByItems(1));

        this.buildDots();
        this.track.addEventListener('scroll', () => this.onScroll(), { passive: true });
        this.enableDrag();
        this.onScroll();
        this.setupAutoplay();
      }

      itemStep() {
        // 隣接カード間の距離（カード幅 + gap）
        if (this.items.length < 2) return this.items[0].offsetWidth;
        return this.items[1].offsetLeft - this.items[0].offsetLeft;
      }

      visibleCount() {
        return Math.max(1, Math.round(this.track.clientWidth / this.itemStep()));
      }

      scrollByItems(direction) {
        this.track.scrollBy({ left: direction * this.itemStep() * this.visibleCount(), behavior: 'smooth' });
      }

      buildDots() {
        if (!this.dotsWrap) return;
        this.pages = Math.max(1, this.items.length - this.visibleCount() + 1);
        this.dotsWrap.innerHTML = '';
        this.dots = [];
        for (let i = 0; i < this.pages; i += 1) {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.className = 'nagi-carousel__dot';
          dot.setAttribute('aria-label', `${i + 1}番目へ`);
          dot.addEventListener('click', () => {
            this.track.scrollTo({ left: i * this.itemStep(), behavior: 'smooth' });
          });
          this.dotsWrap.appendChild(dot);
          this.dots.push(dot);
        }
      }

      onScroll() {
        if (!this.dots || this.dots.length === 0) return;
        const index = Math.round(this.track.scrollLeft / this.itemStep());
        this.dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
        const atStart = this.track.scrollLeft <= 1;
        const atEnd = this.track.scrollLeft + this.track.clientWidth >= this.track.scrollWidth - 1;
        this.prevBtn && this.prevBtn.toggleAttribute('disabled', atStart);
        this.nextBtn && this.nextBtn.toggleAttribute('disabled', atEnd);
      }

      enableDrag() {
        let isDown = false;
        let startX = 0;
        let startScroll = 0;
        let moved = false;
        const down = (event) => {
          isDown = true;
          moved = false;
          startX = event.pageX;
          startScroll = this.track.scrollLeft;
        };
        const move = (event) => {
          if (!isDown) return;
          const delta = event.pageX - startX;
          if (Math.abs(delta) > 4) moved = true;
          this.track.scrollLeft = startScroll - delta;
        };
        const up = () => {
          isDown = false;
        };
        this.track.addEventListener('pointerdown', down);
        this.track.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
        // ドラッグ直後のクリックでカードのリンクに飛ばない
        this.track.addEventListener('click', (event) => {
          if (moved) {
            event.preventDefault();
            event.stopPropagation();
          }
        });
      }

      setupAutoplay() {
        const seconds = parseInt(this.dataset.autoplay || '0', 10);
        if (!seconds || prefersReducedMotion) return;
        let timer = null;
        const tick = () => {
          const atEnd =
            this.track.scrollLeft + this.track.clientWidth >= this.track.scrollWidth - 1;
          if (atEnd) {
            this.track.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            this.scrollByItems(1);
          }
        };
        const start = () => {
          if (!timer) timer = setInterval(tick, seconds * 1000);
        };
        const stop = () => {
          clearInterval(timer);
          timer = null;
        };
        this.addEventListener('pointerenter', stop);
        this.addEventListener('pointerleave', start);
        this.addEventListener('focusin', stop);
        this.addEventListener('focusout', start);
        start();
      }
    }
    customElements.define('nagi-product-carousel', NagiProductCarousel);
  }

  /* ---- F2 肌診断クイズ ----
   * 選択肢の data-key を集計し、最多キーに対応する result を表示する。
   * 全 result は Liquid でサーバレンダー済み（hidden）で、JS は表示切替のみ。 */

  if (!customElements.get('nagi-skin-quiz')) {
    class NagiSkinQuiz extends HTMLElement {
      connectedCallback() {
        this.steps = [...this.querySelectorAll('[data-quiz-step]')];
        this.resultsWrap = this.querySelector('[data-quiz-results]');
        this.results = [...this.querySelectorAll('[data-quiz-result]')];
        this.bar = this.querySelector('[data-quiz-bar]');
        this.total = this.steps.length;
        if (this.total === 0) return;

        this.addEventListener('click', (event) => {
          const option = event.target.closest('[data-quiz-option]');
          if (option) {
            this.choose(option.dataset.key);
            return;
          }
          if (event.target.closest('[data-quiz-restart]')) this.reset();
        });

        this.reset();
      }

      reset() {
        this.tally = {};
        this.current = 0;
        this.results.forEach((result) => {
          result.hidden = true;
        });
        this.resultsWrap.hidden = true;
        this.steps.forEach((step, index) => {
          step.hidden = index !== 0;
        });
        this.setProgress(0);
      }

      choose(key) {
        if (key) this.tally[key] = (this.tally[key] || 0) + 1;
        this.current += 1;
        this.setProgress(this.current);
        if (this.current >= this.total) {
          this.showResult();
          return;
        }
        this.steps.forEach((step, index) => {
          step.hidden = index !== this.current;
        });
        const firstOption = this.steps[this.current].querySelector('[data-quiz-option]');
        if (firstOption) firstOption.focus();
      }

      setProgress(answered) {
        const percent = this.total ? Math.round((answered / this.total) * 100) : 0;
        if (this.bar) this.bar.style.width = `${percent}%`;
      }

      showResult() {
        this.steps.forEach((step) => {
          step.hidden = true;
        });
        const winner = this.winnerKey();
        let shown = this.results.find((result) => result.dataset.key === winner);
        if (!shown && this.results.length > 0) shown = this.results[0];
        this.results.forEach((result) => {
          result.hidden = result !== shown;
        });
        this.resultsWrap.hidden = false;
        if (shown) {
          shown.setAttribute('tabindex', '-1');
          shown.focus();
        }
      }

      winnerKey() {
        let best = null;
        let bestCount = -1;
        Object.keys(this.tally).forEach((key) => {
          if (this.tally[key] > bestCount) {
            bestCount = this.tally[key];
            best = key;
          }
        });
        return best;
      }
    }
    customElements.define('nagi-skin-quiz', NagiSkinQuiz);
  }
})();
