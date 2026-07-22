# 仕様書 v4: 動的リッチセクション群

作成日: 2026-07-19 / 対象: mystudio テーマ（Dawn 15.5.0 + nagi カスタム層）/ 前提: spec v1〜v3 完了済み

## 1. 概要

表示系セクションが静的テキスト中心なので、TOP・商品ページ・ブログ記事に「動き」のある JS リッチセクションを追加し、回遊と滞在の体験を高める。既存 nagi の二層 JS ルール（表示系＝JS ゼロ / インタラクティブ＝自己完結 Web Component・外部ライブラリゼロ）に従い、Dawn 標準は改変しない。CSS は `assets/nagi.css` に集約、schema は日本語ハードコード + presets。

**進化的強化（PE）方針**: 中身は Liquid でサーバレンダーし、JS は操作性の付加に徹する。Storefront API / AJAX は使わない（JS 無効でも最低限成立させる）。

## 2. 機能一覧

| # | 名前 | 1行説明 | 配置 |
|---|------|---------|------|
| F1 | Before/After スライダー | 2枚の画像をドラッグ仕切りで比較。`role=slider`・矢印キー対応 | TOP / PDP / 記事 |
| F2 | 肌診断クイズ | 多ステップ診断→結果プロフィールごとのおすすめ商品を表示 | TOP |
| F3 | 商品スワイプカルーセル | コレクションの商品を scroll-snap で横スワイプ。前後ボタン・ドット・任意オートプレイ | TOP / 記事末 |
| F4 | スクロール連動アニメ | `data-nagi-reveal` 要素をフェード＆せり上がりで表示する横断ユーティリティ | 新 nagi セクション全般 |

## 3. コンポーネント設計

- **共有スニペット `snippets/nagi-product-card.liquid`**: 既存 `.nagi-card` 体裁の商品カード（画像・売切バッジ・ブランド・タイトル・価格・お気に入り）。F2/F3 と将来のカードで再利用（現状 3 箇所以上で使うため抽象化を正当化）。JS 描画版（recent/wishlist）とマークアップを揃える。
- **`sections/nagi-before-after.liquid`** + Web Component `<nagi-before-after>`: before/after 画像（image_picker、未設定時は Unsplash フォールバック）と見出し。仕切り位置は range/ポインタで制御し、`--pos` カスタムプロパティで clip する。
- **`sections/nagi-product-carousel.liquid`** + `<nagi-product-carousel>`: コレクション設定から商品を Liquid で並べ、CSS scroll-snap のトラックに配置。JS が前後ボタン・ドット・ドラッグ・任意オートプレイ（`prefers-reduced-motion` 時停止）を付与。
- **`sections/nagi-skin-quiz.liquid`** + `<nagi-skin-quiz>`: 質問を block（各選択肢に結果キーを付与）、結果プロフィールを block（見出し + コレクション）で定義。**全プロフィールのおすすめ商品を Liquid で描画し hidden にしておき、JS は集計して該当プロフィールだけ表示**する。進捗バー・やり直し・キーボード操作対応。
- **`assets/nagi-motion.js`**: 上記 3 つの Web Component（`customElements.get` で二重定義防止）と、`[data-nagi-reveal]` を監視する IntersectionObserver（初期化は 1 回だけ）を含む単一ファイル。各セクションから `defer` で読み込む。

## 4. データ / 管理作業

- F1 の画像はテーマエディタで設定（未設定でもフォールバックで成立）。
- F2 の質問・結果・おすすめコレクションはテーマエディタの block で構成。既存コレクション（cleansing / lotion-serum / cream-oil / gift-kit）を結果に割り当てる想定。
- F3 は表示コレクションを設定（既定 all）。
- 配置はテンプレ JSON（`index.json` / `product.json` / `article.json`）に preset で追加。

## 5. 受け入れ基準

1. **F1**: TOP でドラッグ（またはハンドルにフォーカスして左右キー）すると before/after の表示比率が変わる。JS 無効でも両画像と見出しが崩れず見える。
2. **F2**: 質問に答え進むと進捗が伸び、最後に 1 つの結果プロフィールとおすすめ商品カードが表示される。「やり直す」で最初に戻る。JS 無効時は最初の質問が普通に見える（壊れない）。
3. **F3**: 前後ボタン／ドラッグ／スワイプでトラックが移動し、ドットが現在位置に追随する。`prefers-reduced-motion` でオートプレイが動かない。商品 0 件ならセクションは自然に空表示にならず非表示か案内。
4. **F4**: 対象セクションが初期は僅かに下・透明で、ビューポート進入で所定位置へフェードイン。`prefers-reduced-motion` では即表示（アニメなし）。
5. 全体: `shopify theme check` エラー 0。`--nagi-*` トークン使用・生 hex 直書きなし・レスポンシブ（60em / 40em）。

## 6. スコープ外

- Storefront API / AJAX による動的商品取得（Liquid サーバレンダーのみ）。
- クイズ結果のサーバ保存・パーソナライズ同期（クライアント集計のみ、localStorage は任意）。
- 外部アニメーション/スライダーライブラリ（依存ゼロを維持）。
