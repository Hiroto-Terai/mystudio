# CLAUDE.md

Shopify テーマ。**Dawn 15.5.0 ベース + 「nagi」ブランドのリスキン/独自セクション**。フリーランスのポートフォリオ用デモストア（`mystudio`）。汎用コーディング規約はグローバル `~/.claude/CLAUDE.md` に従い、ここには本リポジトリ固有のことだけ書く。

構造・命名規則・CSS トークンの網羅的な詳細は **[theme-profile.md](theme-profile.md)**（作業前に一読）。

## アーキテクチャ（コードから読み取りにくい前提）

- カスタム層 = **nagi**。独自セクションは `sections/nagi-*.liquid` と `sections/staff-list.liquid`。それ以外（`main-*`, `cart-*`, ほとんどの `snippets/`・`assets/*.js`）は **Dawn 標準＝原則いじらない**。
- **CSS は単一 `assets/nagi.css` に集約**。`layout/theme.liquid` L289 で `base.css` の後に読み込み Dawn を上書きする。新セクションのスタイルもここに追記する（セクション個別の `{% stylesheet %}` は使わない）。
- nagi セクションは **JS ゼロ・スニペット依存ゼロ**（自己完結）。共有は CSS ユーティリティ class（`.nagi-section-eyebrow` / `.nagi-section-heading` / `.nagi-btn*`）と `--nagi-*` トークン。

## 新しいカスタムセクションを作るとき

- 既存の `sections/nagi-*.liquid` を雛形にして書式を合わせる（我流にしない）。
- クラスは `nagi-` + BEM。色・余白・フォントは `--nagi-*` トークンを使い生 hex を直書きしない（色スケール `--nagi-green-05..70` / `--nagi-shade-20..70`、フォント `--font-body-family`=Noto Sans JP・`--font-heading-family`=Hanken Grotesk）。
- レスポンシブは `max-width: 60em`（→2列）と `max-width: 40em`（→1列）の 2 ブレークポイント。
- schema の label / default は**日本語ハードコード**（翻訳キー `t:` は使わない。既存に合わせる）。全セクションに `presets` を付ける。

## データ

- カスタム metafield 名前空間は **`aoi`**（旧ブランド名）: `product.metafields.aoi.rating` / `.review_count`。Dawn 標準の `reviews` metafield とは別系統なので混同しない。
- スタッフ紹介 = metaobject **`staff_member`**（フィールドキー `name` / `role` / `bio`[複数行] / `photo`[ファイル型] / `social_url`[URL]）。参照は `metaobjects.staff_member.values` → `staff.<key>.value`。
- **落とし穴**: `staff_member` はエントリが**アクティブ**状態でないと `metaobjects.staff_member.values` に出ない（下書きはスキップ）。テーマから見えない時はまずエントリのステータスと定義のストアフロント公開を疑う。

## コマンド

```bash
# このストアを必ず明示する（CLI の既定接続先が別ストア hugall のことがあり、
# 付け忘れると metaobject 等が別ストア基準で nil になる）
S=xn-0nsp96djkas7be59f.myshopify.com
shopify theme dev --store $S        # 開発テーマをプレビュー
shopify theme check                # theme-check（Liquid/JSON 静的検証。コミット前に通す）
shopify theme console --store $S    # Liquid REPL。式のみ入力（{{ }} 不要）。metaobject の実データ確認に使う
shopify theme push/pull --store $S  # リモートテーマと同期
```

- コンソールで metaobject を確認する例: `metaobjects.staff_member.values.size` / `metaobjects.staff_member.values | map: 'name' | json`。REPL は `{% for %}` 不可なので `.first`/`[0]` は取れない（`| map`/`| json` で確認する）。
