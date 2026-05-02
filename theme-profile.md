# Horizon テーマプロファイル
最終更新: 2026-04-29

---

## テーマ構成

**テーマ:** Horizon v1.0.2（Shopify公式）

```
mystudio/
├── assets/          # CSS・JS・SVGアイコン（94ファイル）
├── blocks/          # テーマブロック（78ファイル）
├── config/          # settings_schema.json, settings_data.json, markets.json
├── layout/          # theme.liquid（1ファイル）
├── locales/         # 54言語対応（en.default.json が基準）
├── sections/        # セクション（33ファイル）
├── snippets/        # スニペット（103ファイル）
└── templates/       # JSON形式テンプレート（12ファイル + gift_card.liquid）
```

**グローバルレイアウト（layout/theme.liquid）の読み込み順**
1. `base.css` — メインスタイルシート（96.7KB）
2. `meta-tags`, `fonts`, `scripts`, `theme-styles-variables`, `color-schemes` — スニペット
3. `content_for_header`（Shopify注入）
4. header-group → MainContent → footer-group
5. `search-modal`, `quick-add-modal`（グローバルモーダル）
6. `critical.js`（パーサーブロッキング）

**`<body>` クラスパターン**
```liquid
<body class="page-width-{{ settings.page_width }} card-hover-effect-{{ settings.card_hover_effect }}">
```

---

## CSS 設計

### 命名規則

**BEM**（Block Element Modifier）が基本
```
.product-card           ← Block
.product-card__link     ← Element
.product-card__image    ← Element
.product-grid__item     ← Element
.collection-card__image ← Element
.resource-card__image   ← Element
```

**ユーティリティクラス**
```css
/* 表示制御 */
.hidden  .hidden--mobile  .hidden--desktop
.mobile:hidden  .desktop:hidden
.visually-hidden  .is-visually-hidden-mobile

/* レイアウト */
.flex  .grid
.page-width-wide  .page-width-normal  .page-width-narrow  .page-width-content

/* セクション幅 */
.section
.section--page-width
.section--full-width
.section--full-width-right
.section--full-width-margin

/* セクション高さ */
.section--height-small
.section--height-medium
.section--height-large
.section--height-full-screen
```

**動的クラス（Liquidで生成）**
```liquid
class="color-{{ scheme.id }}"            <!-- カラースキーム -->
class="card-hover-effect-lift"           <!-- ホバーエフェクト -->
class="card-hover-effect-scale"
class="card-hover-effect-subtle-zoom"
```

**スタイルスニペット（インラインCSS変数注入）**
```liquid
{% render 'spacing-style', settings: section.settings %}
{% render 'gap-style', settings: section.settings %}
{% render 'layout-panel-style', settings: section.settings %}
{% render 'border-override', settings: section.settings %}
{% render 'size-style', settings: section.settings %}
```

---

### CSS 変数

#### ページ・コンテンツ幅
```css
--sidebar-width: 25rem
--narrow-content-width: 36rem
--normal-content-width: 42rem
--wide-content-width: 46rem
--narrow-page-width: 90rem
--normal-page-width: 120rem
--wide-page-width: 150rem
```

#### セクション高さ
```css
--section-height-small: 15rem   /* モバイル: 40svh */
--section-height-medium: 25rem  /* モバイル: 55svh */
--section-height-large: 35rem   /* モバイル: 70svh */
```

#### 色彩システム（カラースキームで上書き）
```css
--color-background
--color-foreground
--color-foreground-heading
--color-primary
--color-primary-hover
--color-border
--color-shadow
--color-primary-button-text / --color-primary-button-background / --color-primary-button-border
--color-primary-button-hover-text / --color-primary-button-hover-background / --color-primary-button-hover-border
--color-secondary-button-text / -background / -border
--color-secondary-button-hover-*
--color-input-background / --color-input-text / --color-input-border
--color-input-hover-background
--color-variant-background / -border / -text
--color-selected-variant-background / -border / -text
```

**固定色（カラースキームに依存しない）**
```css
--color-error: #8B0000
--color-success: #006400
--color-white: #FFFFFF
--color-black: #000000
--color-instock: #3ED660
--color-lowstock: #EE9441
--color-outofstock: #C8C8C8
```

#### スペーシング（3段階スケール）
```css
/* --margin-* / --padding-* / --gap-* で同じスケールを共有 */
--margin-3xs: 0.125rem
--margin-2xs: 0.3rem
--margin-xs: 0.5rem
--margin-sm: 0.7rem
--margin-md: 0.8rem
--margin-lg: 1rem
--margin-xl: 1.25rem
--margin-2xl: 1.5rem
--margin-3xl: 1.75rem
--margin-4xl: 2rem
--margin-5xl: 3rem
--margin-6xl: 5rem
```

#### アニメーション
```css
--ease-out-cubic: cubic-bezier(0.33, 1, 0.68, 1)
--ease-out-quad: cubic-bezier(0.32, 0.72, 0, 1)
--animation-speed: 0.125s
--animation-speed-slow: 0.2s
--animation-speed-medium: 0.15s
--animation-easing: ease-in-out
--animation-slideshow-easing: cubic-bezier(0.4, 0, 0.2, 1)
--drawer-animation-speed: 0.2s
--animation-timing-hover: cubic-bezier(0.25, 0.46, 0.45, 0.94)
--animation-timing-active: cubic-bezier(0.5, 0, 0.75, 0)
--animation-timing-bounce: cubic-bezier(0.34, 1.56, 0.64, 1)
```

#### ホバーエフェクト
```css
--hover-lift-amount: 4px
--hover-scale-amount: 1.03
--hover-subtle-zoom-amount: 1.015
--hover-shadow-color: var(--color-shadow)
--hover-transition-duration: 0.25s
--hover-transition-timing: ease-out
```

#### レイヤリング（z-index）
```css
--layer-section-background: -2
--layer-lowest: -1
--layer-base: 0
--layer-flat: 1
--layer-raised: 2
--layer-heightened: 4
--layer-sticky: 8
--layer-window-overlay: 10
--layer-header-menu: 12
--layer-overlay: 16
--layer-menu-drawer: 18
--layer-temporary: 20
```

---

### ブレークポイント

**主要な境界値**
| 区分 | 値 | メモ |
|------|-----|------|
| モバイル上限 | `750px` | デフォルトのSP/PC境界 |
| タブレット | `990px` | 中間サイズ |
| 大型デスクトップ | `1400px` | ワイドレイアウト |

**記法（px単位・range syntax）**
```css
@media screen and (width < 750px) { /* モバイル */ }
@media screen and (width >= 750px) { /* デスクトップ以上 */ }
@media screen and (width >= 990px) { /* 大型デバイス */ }
@media screen and (width >= 1400px) { /* 大型デスクトップ */ }
@media (any-pointer: fine) and (prefers-reduced-motion: no-preference) { /* ホバー対応端末 */ }
@media (prefers-reduced-motion: no-preference) { /* アニメーション可 */ }
```

**Liquidによる表示制御**
```liquid
class="mobile:hidden"   <!-- 750px未満で非表示 -->
class="desktop:hidden"  <!-- 750px以上で非表示 -->
```

---

## Liquid パターン

### よく使われる記法

**ホワイトスペース制御**
```liquid
{%- liquid
  assign order = 'logo,menu,localization,search,actions'
  if shop.customer_accounts_enabled
    assign order = 'mobile_search,logo,menu,localization,search,actions'
  endif
-%}
```
`{%- -%}` を積極的に使用（余分な改行・スペースを除去）。

**スニペット呼び出し（パラメータ渡し）**
```liquid
{% render 'spacing-style', settings: section.settings %}
{% render 'search', style: search_style, class: search_class %}
{% render 'dropdown-localization', show_country: show_country, show_language: show_language %}
```

**case/when**
```liquid
{% case section.settings.content_width %}
  {% when 'content-center-aligned' %}
    {% assign content_width = 'page-width' %}
  {% when 'content-full-width' %}
    {% assign content_width = 'full-width' %}
{% endcase %}
```

**content_for（ブロックシステム）**
```liquid
{% content_for 'blocks' %}
{% content_for 'block', type: '_header-logo', id: 'header-logo' %}
{% content_for 'block', type: '_product-media-gallery', id: 'media-gallery', closest.product: section.settings.product %}
```

**フィルタ一覧（使用頻度高）**
```liquid
{{ image | image_url: width: 500 }}
{{ image | image_tag: width: 500, height: 500, alt: '', class: 'hero__image', sizes: sizes }}
{{ video | video_tag: image_size: '3840x', autoplay: true, loop: true, controls: false, muted: true }}
{{ font | font_modify: 'weight', 'bold' }}
{{ font | font_face: font_display: 'swap' }}
{{ value | default: 'fallback' }}
{{ value | t }}
{{ value | json }}
```

**インラインCSSへの変数展開**
```liquid
style="
  --hero-min-height: {{ section.settings.min_height }}rem;
  --hero-border-style: {{ section.settings.border_style }};
"
```

---

### メタフィールド参照パターン

**基本形式**
```liquid
{{ product.metafields.reviews.rating.value.rating }}
{{ product.metafields.reviews.rating.value.scale_max }}
{{ product.metafields.reviews.rating_count }}
```

**フォールバック付き**
```liquid
{% assign rating = product.metafields.reviews.rating.value | default: 4 %}
```

**名前空間一覧（確認済み）**
| namespace | key | 用途 |
|-----------|-----|------|
| `reviews` | `rating` | レビュー評価（rating.value.rating / scale_max） |
| `reviews` | `rating_count` | レビュー件数 |

---

### スキーマの書き方

**基本構造**
```json
{% schema %}
{
  "name": "t:names.section-name",
  "tag": "section",
  "class": "section-wrapper",
  "blocks": [
    { "type": "@theme" },
    { "type": "@app" },
    { "type": "_divider" }
  ],
  "disabled_on": { "groups": ["header"] },
  "settings": [
    { "type": "header", "content": "t:content.layout" },
    {
      "type": "select",
      "id": "setting_id",
      "label": "t:settings.label",
      "options": [
        { "value": "value1", "label": "t:options.label1" }
      ],
      "default": "value1"
    },
    {
      "type": "checkbox",
      "id": "check_id",
      "label": "t:settings.label",
      "default": false,
      "visible_if": "{{ section.settings.other_setting == 'value' }}"
    }
  ]
}
{% endschema %}
```

**翻訳キー体系（`t:` プレフィックス）**
| プレフィックス | 用途 |
|---------------|------|
| `t:names.*` | セクション・ブロック名 |
| `t:categories.*` | カテゴリ名 |
| `t:content.*` | ヘッダー・説明文 |
| `t:settings.*` | 設定項目ラベル |
| `t:options.*` | 選択肢ラベル |
| `t:actions.*` | ボタン等の行動テキスト |
| `t:accessibility.*` | aria-label 等 |

---

## コンポーネント一覧

### セクション

| ファイル | 役割 | 使用スニペット |
|---------|------|--------------|
| `header.liquid` | グローバルヘッダー | `header-actions`, `search`, `dropdown-localization` |
| `hero.liquid` | ヒーロー画像/動画 | `spacing-style`, `background-image`, `background-video` |
| `product-information.liquid` | 製品詳細ページメイン | `spacing-style`, `skip-to-content-link` |
| `section.liquid` | 汎用レイアウトセクション | blocks経由 |
| `footer.liquid` | グローバルフッター | blocks経由 |
| `product-list.liquid` | 製品グリッド表示 | `product-grid` |
| `header-announcements.liquid` | アナウンスメントバー | `slideshow`, `slideshow-arrows` |
| `slideshow.liquid` | スライドショー | `slideshow`, `slideshow-controls`, `slideshow-arrows` |
| `collection-list.liquid` | コレクション一覧 | `collection-card` |
| `featured-product.liquid` | 特集製品 | `product-media`, `add-to-cart-button` |
| `predictive-search.liquid` | 予測検索UI | `predictive-search`, `predictive-search-empty-state` |
| `search-results.liquid` | 検索結果ページ | `product-grid`, `facets-actions` |
| `main-collection.liquid` | コレクションページ | `product-grid`, `list-filter`, `sorting` |
| `main-cart.liquid` | カートページ | `cart-products`, `cart-summary` |
| `main-blog.liquid` | ブログ一覧 | blocks経由 |
| `main-blog-post.liquid` | ブログ記事 | blocks経由 |
| `main-page.liquid` | 汎用ページ | blocks経由 |
| `main-404.liquid` | 404ページ | — |
| `custom-liquid.liquid` | カスタムLiquid挿入 | — |
| `divider.liquid` | 仕切り線 | `divider` |
| `marquee.liquid` | スクロールテキスト | `marquee` |
| `media-with-content.liquid` | メディア+テキスト | blocks経由 |
| `collection-links.liquid` | コレクションリンク | `_collection-link` |

### スニペット

#### コアスタイル生成
| スニペット | 役割 |
|-----------|------|
| `theme-styles-variables.liquid` | CSS変数の全量定義（25.7KB・自動生成） |
| `color-schemes.liquid` | カラースキームのCSS生成 |
| `fonts.liquid` | フォントロード |
| `spacing-style.liquid` | padding/margin のインラインCSS注入 |
| `spacing-padding.liquid` | padding のみ |
| `spacing-margin.liquid` | margin のみ |
| `gap-style.liquid` | gap のインラインCSS注入 |
| `layout-panel-style.liquid` | flex/grid レイアウト変数注入 |
| `size-style.liquid` | width/height 変数注入 |
| `border-override.liquid` | border スタイル上書き |
| `typography-style.liquid` | タイポグラフィ変数注入 |

#### ナビゲーション
| スニペット | 役割 |
|-----------|------|
| `header-drawer.liquid` | モバイルドロワーナビ（44.6KB） |
| `header-menu.liquid` | デスクトップメニュー |
| `header-actions.liquid` | カート・アカウント等のアクション |
| `mega-menu.liquid` | メガメニューコンテナ |
| `mega-menu-list.liquid` | メガメニューリスト（11.1KB） |
| `search.liquid` | 検索フォーム |
| `search-modal.liquid` | 検索モーダル |
| `predictive-search.liquid` | 予測検索UI（4.4KB） |

#### 製品関連
| スニペット | 役割 |
|-----------|------|
| `product-card.liquid` | 製品カード（`ref`属性でJS連携） |
| `product-card-badges.liquid` | セール・在庫バッジ |
| `product-grid.liquid` | グリッドレイアウト処理 |
| `product-media.liquid` | メディア表示（6.6KB） |
| `variant-main-picker.liquid` | バリアント選択UI（17.2KB） |
| `variant-swatches.liquid` | カラースウォッチ |
| `variant-quick-add.liquid` | クイック追加バリアント |
| `quick-add.liquid` | クイック追加モーダルトリガー（8.3KB） |
| `quick-add-modal.liquid` | クイック追加モーダル本体（9.8KB） |
| `price.liquid` | 価格表示（通常/セール） |
| `add-to-cart-button.liquid` | カートボタン（3.3KB） |
| `quantity-selector.liquid` | 数量選択（2.1KB） |

#### カート
| スニペット | 役割 |
|-----------|------|
| `cart-products.liquid` | カート内製品リスト（21.3KB） |
| `cart-summary.liquid` | 合計・チェックアウトボタン（3.8KB） |
| `cart-drawer.liquid` | カートドロワー（4.4KB） |
| `cart-discount.liquid` | 割引コード入力（6.3KB） |
| `cart-bubble.liquid` | ヘッダーのカート数バッジ |
| `cart-note.liquid` | カートメモ入力 |

#### フィルター・検索
| スニペット | 役割 |
|-----------|------|
| `list-filter.liquid` | フィルターサイドバー（26.4KB） |
| `facets-actions.liquid` | フィルター適用ボタン（5.8KB） |
| `filter-remove-buttons.liquid` | フィルター解除ボタン（5.2KB） |
| `price-filter.liquid` | 価格レンジフィルター（7.5KB） |
| `sorting.liquid` | 並び替え選択（8.9KB） |

#### ユーティリティ
| スニペット | 役割 |
|-----------|------|
| `icon.liquid` | アイコンライブラリ（133KB） |
| `scripts.liquid` | importmap定義・JSロード |
| `meta-tags.liquid` | OGタグ等のメタデータ |
| `skip-to-content-link.liquid` | アクセシビリティ・スキップリンク |
| `util-autofill-img-size-attr.liquid` | 画像sizes属性自動計算 |
| `util-product-grid-card-size.liquid` | グリッドカードサイズ計算 |

---

## 命名規則サマリー

**ファイル名**
- システム要素（ブロック・スニペット内部）：`_kebab-case.liquid`（アンダースコア接頭辞）
- 公開スニペット・セクション：`kebab-case.liquid`
- ユーティリティスニペット：`util-description.liquid`

**CSSクラス名**
- コンポーネント：BEM形式（`.block__element--modifier`）
- ユーティリティ：短縮形（`.hidden`, `.flex`）
- レスポンシブ修飾子：`mobile:hidden`, `desktop:hidden`
- テーマ設定由来：`color-{id}`, `card-hover-effect-{type}`

**CSS変数**
- カラー：`--color-{role}[-{variant}]`
- スペーシング：`--margin-{size}` / `--padding-{size}` / `--gap-{size}`
- レイヤー：`--layer-{name}`
- アニメーション：`--animation-{type}` / `--ease-{type}`
- コンポーネント固有：`--{component}-{property}`（例: `--hero-min-height`）

**JavaScript**
- クラス名：PascalCase（`ProductCard`, `CartDrawer`）
- イベント定数：`ThemeEvents.variantUpdate`形式
- プライベートメソッド：`#handleEvent` 形式（プライベートフィールド）
- モジュール：`@theme/component` 形式のimportmap

**Liquidスキーマ設定ID**
- snake_case（例：`desktop_media_position`, `content_width`, `min_height`）

---

## 実装時の注意事項

1. **CSS変数を直接定義しない** — `theme-styles-variables.liquid` が自動生成するので、設定値は `config/settings_schema.json` で制御する。カスタムCSS変数はセクション/スニペットのインラインstyleで注入するか、`base.css` に追加する。

2. **スペーシング・レイアウトはスニペットで注入** — `spacing-style`, `gap-style`, `layout-panel-style` 等のスニペットを経由してCSS変数を注入するパターンが統一されている。独自のインラインstyleは最小限に。

3. **ブレークポイントは `750px` / `990px` / `1400px` を使う** — `max-width` 記法ではなく `width < 750px` のrange syntax で書く。

4. **スキーマのラベルは必ず `t:` 翻訳キーを使う** — ハードコードしない。新しいキーは `en.default.json` に追加し、`locales/xx.schema.json` にも追加する。

5. **スニペットのファイル名** — プライベート（セクション内部専用）は `_` 接頭辞をつける。

6. **JSはWeb Componentベース** — 新しいインタラクションは `Component` クラスを継承して実装する。`ThemeEvents` でコンポーネント間通信し、直接DOMに触れるコードは避ける。

7. **`content_for 'blocks'`** — ブロックの動的レンダリングはこのAPIを経由する。blocks/ に対応するブロックファイルが必要。

8. **`icon.liquid` は133KB** — アイコンを追加する場合はこのファイルに追記する。SVGをインラインで直接書かない。

9. **カラースキームはLiquidから動的にクラスを注入** — `color-{{ scheme.id }}` 形式で、CSSは `color-schemes.liquid` が生成する。新しい色を追加する場合はスキームを経由する。

10. **View Transitions API を使用** — ページ遷移・状態変化でView Transitions APIを利用している。CSSの `view-transition-name` 指定に注意。`prefers-reduced-motion` を尊重する実装が必要。
