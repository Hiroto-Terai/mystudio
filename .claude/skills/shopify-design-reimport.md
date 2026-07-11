# shopify-design-reimport

Claude Design プロジェクトのデザインを Shopify テーマに完全再現するスキル。
デザイントークン・セクション・ページ・商品・画像・レビュー表示をすべて実装する。

---

## インプット

ユーザーから以下を受け取る:
- Claude Design の URL（例: `https://claude.ai/design/p/<projectId>?file=<filename>`）
- Shopify ストアドメインとテーマID（不明なら `shopify theme list` で確認）

---

## フェーズ 1: デザイン読み込み

### 1-1. DesignSync でプロジェクト取得

`DesignSync(method: "list_files", projectId: "<projectId>")` でファイル一覧を確認する。
メインの `.dc.html` ファイルを `DesignSync(method: "get_file", ...)` で取得する。

### 1-2. 抽出する情報

取得した HTML から以下を Python スクリプトで抽出する（scratchpad に保存）:

```python
import json, re
# Unsplash URLs
urls = re.findall(r'https://images\.unsplash\.com/[^\s"\']+', html)
# Product data (JS object)
# Category tile images
# Journal/blog images
# About page sections
# Design tokens (CSS variables)
```

抽出対象:
- **デザイントークン** — カラー・タイポグラフィ・余白・角丸・シャドウ
- **セクション構成** — Hero / Trust strip / Category tiles / Product grid / Philosophy band / Journal / Footer
- **商品データ** — title, price, originalPrice, category, tag, rating, reviews, image URL, description
- **カテゴリー画像** — タイル4枚分の Unsplash URL
- **ページコンテンツ** — About ページのテキスト・セクション構成
- **ジャーナル記事** — 3件分のタイトル・カテゴリー・概要・画像 URL

---

## フェーズ 2: テーマ実装

### 2-1. CSS設計（`assets/aoi.css`）

`:root` にデザイントークンを CSS 変数として定義する:

```css
/* Google Fonts import */
@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600&family=Noto+Sans+JP:wght@400;500;700&display=swap');

:root {
  /* Colors */
  --aoi-cream: #fbfbf5;
  --aoi-ink: #0e100f;
  --aoi-green-70: #145038;
  --aoi-green-10: #d8f6e2;
  --aoi-surface-band: var(--aoi-green-10);
  --aoi-surface-wash: #f3f3ee;
  --aoi-on-ink: #ffffff;
  --aoi-shade-20: #ececed;
  --aoi-shade-50: #71716b;

  /* Typography */
  --aoi-font-display: 'Hanken Grotesk', sans-serif;
  --aoi-font-body: 'Noto Sans JP', 'Hanken Grotesk', sans-serif;

  /* Radius */
  --aoi-radius-sm: 8px;
  --aoi-radius-md: 12px;
  --aoi-radius-lg: 16px;
  --aoi-radius-xl: 20px;
  --aoi-radius-pill: 999px;

  /* Shadows */
  --aoi-shadow-1: 0 1px 4px rgba(0,0,0,0.08);
  --aoi-shadow-2: 0 4px 16px rgba(0,0,0,0.10);
  --aoi-shadow-3: 0 8px 32px rgba(0,0,0,0.12);
}
```

### 2-2. `layout/theme.liquid` への適用

`{{ 'base.css' | asset_url | stylesheet_tag }}` の直後に追加:
```liquid
{{ 'aoi.css' | asset_url | stylesheet_tag }}
```

`{%- render 'color-schemes' -%}` の直後に `{% style %}` ブロックで Horizon のカラー変数を上書き:
```liquid
{% style %}
:root, .color-scheme-1, .color-1 {
  --color-background: #fbfbf5;
  --color-foreground: #0e100f;
  --color-border: #e8e8e1;
  --color-primary-button-background: #0e100f;
  --color-primary-button-label: #ffffff;
  /* ... etc */
}
{% endstyle %}
```

### 2-3. セクションファイル作成

デザインの各セクションに対応する `sections/aoi-*.liquid` を作成する:

| ファイル | 内容 |
|---------|------|
| `aoi-hero.liquid` | 2カラム Hero（見出し・本文・CTAボタン・画像） |
| `aoi-trust-strip.liquid` | 信頼バッジ横並び（送料無料・無添加・返品保証） |
| `aoi-category-tiles.liquid` | 4列カテゴリーグリッド |
| `aoi-product-grid.liquid` | 商品グリッド（★レーティング表示付き） |
| `aoi-philosophy-band.liquid` | ピスタチオ背景・2カラムコンテンツ |
| `aoi-journal.liquid` | 3列ブログカード |
| `aoi-footer.liquid` | ダークインク背景フッター |
| `aoi-about.liquid` | Aboutページ 5セクション |

**共通ルール:**
- `"tag": "div"` を schema に必ず含める
- `url` 型 setting に `"default"` は設定しない（デプロイエラーになる）
- 画像が未設定の場合は Unsplash URL の `<img>` を fallback にする（`placeholder_svg_tag` は避ける。存在しない名前でエラーになる）
- `{% stylesheet %}` 内に Liquid は使えない → `{% style %}` タグを使う

### 2-4. 画像の Fallback 設定

各セクションの `{%- else -%}` ブロックで Unsplash URL を直接埋め込む:

```liquid
{%- if section.settings.image != blank -%}
  {{ section.settings.image | image_url: width: 1000 | image_tag: loading: 'lazy' }}
{%- else -%}
  <img src="https://images.unsplash.com/photo-XXXX?w=1000&q=80" alt="" style="width:100%;height:100%;object-fit:cover;display:block">
{%- endif -%}
```

カテゴリータイル・ジャーナルカードは `forloop.index0` と `{%- case -%}` で各インデックスに対応する URL を割り当てる。

### 2-5. ★ レーティング表示

`product.metafields.aoi.rating` から取得して表示する:

```liquid
{%- liquid
  assign rating = product.metafields.aoi.rating | times: 1.0
  assign review_count = product.metafields.aoi.review_count
  assign full_stars = rating | floor
  assign remainder = rating | minus: full_stars
  assign has_half = false
  if remainder >= 0.3
    assign has_half = true
  endif
  assign half_star_pos = full_stars | plus: 1
-%}
{%- if rating > 0 -%}
  <div class="aoi-card__rating">
    {%- for i in (1..5) -%}
      {%- if i <= full_stars -%}
        <span class="aoi-star aoi-star--full">★</span>
      {%- elsif has_half and i == half_star_pos -%}
        <span class="aoi-star aoi-star--half">★</span>
      {%- else -%}
        <span class="aoi-star aoi-star--empty">★</span>
      {%- endif -%}
    {%- endfor -%}
    <span class="aoi-card__rating-score">{{ rating }}</span>
    {%- if review_count -%}
      <span class="aoi-card__rating-count">({{ review_count }})</span>
    {%- endif -%}
  </div>
{%- endif -%}
```

---

## フェーズ 3: テンプレート設定

### `templates/index.json`

セクションの並び順:
```json
{
  "order": ["aoi_hero", "aoi_trust", "aoi_categories", "featured_products", "aoi_philosophy", "aoi_journal", "aoi_newsletter"]
}
```

各セクションにデザインから抽出したデフォルトテキストを `settings` に設定する。

### `templates/page.about.json`

```json
{
  "sections": { "aoi_about": { "type": "aoi-about", "settings": {} } },
  "order": ["aoi_about"]
}
```

### `sections/footer-group.json`

`aoi-footer` セクションを参照するよう差し替える。

---

## フェーズ 4: デプロイ

```bash
shopify theme push \
  --store <store>.myshopify.com \
  --theme <themeId> \
  --allow-live
```

エラーが出た場合の主なケース:
- `url 型 setting に default` → `"default"` キーを削除
- `セクションタイプが見つからない` → 別のセクションファイルのスキーマエラーが連鎖している（先にそちらを修正）
- `Unknown SVG placeholder 'xxx'` → 有効な名前は `lifestyle-1/2`, `product-1〜6`, `collection-1〜6`, `image` のみ

---

## フェーズ 5: 商品登録

### 5-1. 商品作成（並行）

`mcp__shopify__create-product` を使って全商品を並行作成する。1回のメッセージで複数の tool use ブロックを送ることで並列実行できる。

各商品に必ず `metafields` を含める:
```json
[
  { "namespace": "aoi", "key": "rating", "value": "4.8", "type": "number_decimal" },
  { "namespace": "aoi", "key": "review_count", "value": "140", "type": "number_integer" }
]
```

タグで商品属性を表現する: `人気`, `新着`, `20%OFF`, `送料無料`, `ギフト対応`, `限定`, `売り切れ`

### 5-2. 価格設定（並行）

`mcp__shopify__get-product-by-id` で全商品のバリアント ID を並行取得 → `mcp__shopify__manage-product-variants` で価格を並行設定。

セール商品は `compareAtPrice` も設定する:
```json
{ "id": "gid://shopify/ProductVariant/...", "price": "4800", "compareAtPrice": "6000" }
```

---

## フェーズ 6: ページ作成

Shopify の「ブランドについて」等のページは Admin で作成する（MCP/CLI で自動作成が難しい場合）:

1. Admin → オンラインストア → ページ → 新規追加
2. タイトル・handle を設定
3. テーマエディターでページのテンプレートを `page.about` に変更

---

## フェーズ 7: 最終確認チェックリスト

- [ ] ホームページの全セクションが表示されている
- [ ] Unsplash 画像が全セクションで表示されている
- [ ] 商品が表示され、価格・タグ・★レーティングが正しい
- [ ] About ページが `page.about` テンプレートで表示されている
- [ ] フッターのリンクが機能している
- [ ] モバイルでレイアウトが崩れていない

---

## 注意事項

- `shopify store execute` は CLI バージョンによっては使用不可。GraphQL が必要な場合は `mcp__shopify-dev-mcp__validate_graphql_codeblocks` で検証後、手動実行を案内する
- Unsplash の画像は商用利用可能だが、本番環境では権利のある画像に差し替えることを推奨
- メタフィールド `aoi.rating` / `aoi.review_count` は Shopify Admin の「カスタムデータ」でも確認・編集できる
