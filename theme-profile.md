# mystudio テーマプロファイル
最終更新: 2026-07-11

## テーマ構成

- **ベーステーマ**: Dawn `theme_version: 15.5.0`（`config/settings_schema.json` 冒頭）
- **カスタム層**: ブランド名「hirot」（旧「aoi」）。Dawn の上にリスキン + 独自セクションを追加した構成。
- **グローバル読み込み**（`layout/theme.liquid`）:
  - CSS: `base.css`（Dawn 標準, L281）の**後**に `hirot.css`（L289）を読み込み、Dawn を上書き。
  - フォント: Google Fonts を直接 `<link>`（L283-286）。`Hanken Grotesk`（300-700）+ `Noto Sans JP`（300-700）、`fonts.gstatic.com` へ preconnect。
  - JS: すべて Dawn 標準（`constants.js`, `pubsub.js`, `global.js`, `animations.js` ほか）。**hirot 独自 JS は存在しない**。
- **テンプレート**: JSON が主（`index.json`, `product.json`, `page.json`, `collection.json` 等）、Liquid は `gift_card.liquid` のみ。
  - `index.json`: `hirot-hero → hirot-trust-strip → multicolumn → hirot-category-tiles → hirot-product-grid → hirot-philosophy-band → multicolumn → hirot-journal → newsletter`。hirot-* が 6 種登場。
  - `product.json` / `page.json`: Dawn 標準セクションのみ（hirot なし）。
  - `hirot-footer` は `sections/footer-group.json` 内に配置。
  - `staff-list` はどのテンプレートにも未配置（テーマエディタのプリセットから手動挿入）。

## CSS 設計

CSS はセクション単位の `{% stylesheet %}` ではなく、**単一の `assets/hirot.css`（約 747 行, hirot-* class 99 個）に集約**されている。

### 命名規則
`hirot-` プレフィックス + BEM（`block__element--modifier`）。
- 例: `.hirot-card`, `.hirot-card__image-wrap`, `.hirot-card__badge`
- 例: `.hirot-btn--primary`, `.hirot-star--half`, `.hirot-staff-card__role`
- 共有ユーティリティ:
  - `.hirot-section-eyebrow`, `.hirot-section-heading`（全セクション共通の見出し）
  - `.hirot-btn` + `--primary` / `--outline` / `--ghost` / `--accent` / `--sm` / `--lg`
  - カードファミリー: `.hirot-card`（商品）, `.hirot-tile`（カテゴリー）, `.hirot-jcard`（ジャーナル）, `.hirot-staff-card`（スタッフ）
  - `.hirot-star--full` / `--half` / `--empty`（評価星）

### CSS 変数（`:root`）
```
--hirot-ink: #0e100f;      --hirot-cream: #fbfbf5;    --hirot-white: #ffffff;
--hirot-green-05: #f1fbf4; --hirot-green-10: #d8f6e2; --hirot-green-20: #c1fbd4;
--hirot-green-30: #97e8b8; --hirot-green-40: #55c98c; --hirot-green-50: #2ea36a;
--hirot-green-60: #1f7d52; --hirot-green-70: #145038;
--hirot-shade-20: #ececed; --hirot-shade-30: #d7d7d2; --hirot-shade-40: #a6a69f;
--hirot-shade-50: #71716b; --hirot-shade-70: #38383a;
--hirot-hairline: #e8e8e1;
--hirot-surface-wash: var(--hirot-green-05);
--hirot-surface-band: var(--hirot-green-10);
--hirot-halo: 0 8px 8px rgba(14,16,15,.04), …;   /* ホバー時の署名的な微シャドウ */
--font-body-family: "Noto Sans JP", "Hanken Grotesk", system-ui, sans-serif;
--font-body-weight: 400;  --font-body-weight-bold: 600;
--font-heading-family: "Hanken Grotesk", "Noto Sans JP", system-ui, sans-serif;
--font-heading-weight: 300;   /* 細字が署名的。300 を超えない方針 */
```
色は `-05`〜`-70` の数値スケール。緑（green）がブランドアクセント、`ink` がテキスト、`shade` がグレー、`surface-*` が背景。

### ブレークポイント
hirot.css で使われる distinct な media query は 2 つのみ:
- `@media screen and (max-width: 60em)` — 主モバイル（PC → タブレット/2列へ）
- `@media screen and (max-width: 40em)` — 小画面（1列へ）

## Liquid パターン

### よく使われる記法
- ホワイトスペース制御は `{%- -%}` を条件分岐・ループで一貫使用（`{{- -}}` は少ない）。
- 複数代入は先頭の `{%- liquid … -%}` ブロックにまとめる。
```liquid
{%- liquid
  assign products_count = section.settings.products_count
  if section.settings.collection != blank
    assign products = section.settings.collection.products
  else
    assign products = collections.all.products
  endif
-%}
```
- 画像: `image_url: width: N | image_tag: loading: 'lazy'` の統一パターン。hero のみ `loading:'eager', fetchpriority:'high'`。
- 画像未設定時は **Unsplash 固定 URL をハードコードでフォールバック**（hero, category-tiles, product-grid, philosophy, journal）。
- richtext 見出しは `| replace: '<p>', '' | replace: '</p>', ''` で p タグ除去して使うことがある。
- schema の label / default は**日本語ハードコード**（翻訳キー `t:` は不使用）。全セクションが `presets` を持つ。

### メタフィールド / メタオブジェクト参照パターン
カスタム（hirot / staff）:
| アクセス | 型 | 使用箇所 |
|---|---|---|
| `product.metafields.aoi.rating` | number | `sections/hirot-product-grid.liquid:41` |
| `product.metafields.aoi.review_count` | number | `sections/hirot-product-grid.liquid:42` |
| `metaobjects.staff_member.values` | metaobject list | `sections/staff-list.liquid:2` |

staff_member のフィールドキー: `name`（氏名/単一行）, `role`（役職/単一行）, `bio`（紹介文/複数行）, `photo`（写真/ファイル）, `social_url`（SNS URL/URL）。アクセスは `staff.<key>.value`。

（参考: Dawn 標準は `product.metafields.reviews.*`, `product.metafields.shopify.disclosure.*` を使用。`aoi` 系とは別系統。）

## コンポーネント一覧

### セクション（カスタム）
すべて `render`/`include` を使わず**自己完結**（スニペット依存ゼロ・JS ゼロ）。

| セクション | schema name | ルート class | データソース |
|---|---|---|---|
| `hirot-hero` | Hirot Hero | `.hirot-hero` | section settings |
| `hirot-category-tiles` | Hirot Category Tiles | `.hirot-categories` / `.hirot-tile` | ブロック設定 |
| `hirot-product-grid` | Hirot Product Grid | `.hirot-product-grid` / `.hirot-card` | collection.products + `metafields.aoi.rating`/`review_count` + `product.tags` バッジ |
| `hirot-philosophy-band` | Hirot Philosophy Band | `.hirot-philosophy` | section settings |
| `hirot-journal` | Hirot Journal | `.hirot-journal` / `.hirot-jcard` | `blogs[…].articles`（未選択時ブロック固定値） |
| `hirot-trust-strip` | Hirot Trust Strip | `.hirot-trust` | ブロック設定 + インライン SVG |
| `hirot-footer` | Hirot Footer | `.hirot-footer` | `linklists`, `shop.*_policy`（footer-group.json 内） |
| `staff-list` | スタッフ紹介 | `.hirot-staff` / `.hirot-staff-card` | `metaobjects.staff_member.values` |

### スニペット
hirot セクションはスニペットを使わない。共有は「スニペット」ではなく **CSS ユーティリティ class + トークン**で行う。
（Dawn 標準セクションは `card-product`, `product-disclosures` 等を多用し、hirot 層と明確に分離。）

## 命名規則サマリー
- **ファイル**: カスタムセクションは `sections/hirot-*.liquid`（例外: `sections/staff-list.liquid` は接頭辞なし・schema name は日本語）。CSS は単一 `assets/hirot.css`。
- **CSS class**: `hirot-` + BEM（`hirot-block__element--modifier`）。
- **トークン**: `--hirot-*`（色は数値スケール）、フォントは `--font-body-*` / `--font-heading-*`。
- **metafield 名前空間**: カスタムは `aoi`（旧ブランド名）。metaobject 型は `staff_member`。

## 実装時の注意事項
1. **hirot の CSS は単一グローバル `assets/hirot.css` に集約**。新セクションのスタイルもここに追記し、`theme.liquid` L289 経由で全ページに適用する（セクション単位 `{% stylesheet %}` は使わない）。
2. **hirot 独自 JS は存在しない**。hirot セクションは Liquid + CSS のみ。
3. **schema ラベル・default は日本語ハードコード**（`t:` 翻訳キー不使用）。多言語対応は未考慮。
4. **metaobject `staff_member` はアクティブ状態でないと `metaobjects.staff_member.values` に出ない**（下書きはスキップ）。
5. **metafield 名前空間が `aoi`（旧名）**のまま。評価表示はこれに依存。Dawn の `reviews` metafield と混同しない。
6. **画像未設定時に外部 Unsplash URL がハードコード表示**される。本番では画像設定必須（外部依存・CSP・パフォーマンス）。
7. **`hirot.css` は Dawn 標準クラスも上書き**するリスキンレイヤーを兼ねる。`base.css` の後に読み込まれる順序が上書きの前提。
8. 分離軸: hirot はスニペット依存ゼロ・JS ゼロ・日本語ハードコード。Dawn はスニペット/customElements 多用・`t:` 翻訳キー使用。
