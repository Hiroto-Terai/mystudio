# 仕様書 v2: nagi デモストア 実データ接続・自前アセット化・磨き

作成日: 2026-07-16 / 対象: mystudio テーマ（Dawn 15.5.0 + nagi カスタム層）/ 前提: spec v1（docs/spec.md）完了済み

## 1. 概要

デモストアを「見せられる完成度」からさらに一段上げ、**実データと自前アセットで動くストア**にする。
現状はカテゴリータイルが全て /collections/all 行き、主要ビジュアルが Unsplash ホットリンクのフォールバック、ジャーナルがリンク無しの静的ブロックのまま。ストア側のデータ準備（コレクション・Shopify Files・ブログ記事）は**完了済み**であり、本仕様はテーマコード（Liquid / JSON テンプレート / CSS）側の接続と磨きだけを対象とする。

## 2. 機能一覧

| # | 名前 | 1行説明 | 優先度 |
|---|------|---------|--------|
| F1 | カテゴリータイルの実コレクション接続 | TOP の 4 タイルを作成済みの 4 コレクション（cleansing / lotion-serum / cream-oil / gift-kit）へ正しくリンクさせる | P0 |
| F2 | 主要ビジュアルの自前アセット化 | hero・category-tiles・philosophy-band・journal の画像を Unsplash ホットリンクからアップロード済み Shopify Files（自ストア配信）に切り替える | P0 |
| F3 | ジャーナルの実記事接続 | journal カードを作成済みブログ記事 3 本にリンクさせ、日付・タイトルを記事と整合させる（TOP・About 両方） | P1 |
| F4 | 磨きバッチ | カード角丸の統一・検索結果の画像比・trust-strip の具体値化・商品カード文言の 4 点をまとめて仕上げる | P2 |

## 3. スプリント計画

1スプリント = 1機能。依存順に実施する。

| スプリント | 機能 | 内容 | 依存 |
|-----------|------|------|------|
| Sprint 1 | F1 (P0) | カテゴリータイル 4 枚を実コレクションへ接続。設定値の変更のみで完結する最小スプリント | なし |
| Sprint 2 | F2 (P0) | hero / category-tiles / philosophy-band / journal の画像設定にアップロード済み Shopify Files を割り当て、Unsplash フォールバックを画面から排除する | なし |
| Sprint 3 | F3 (P1) | journal を実ブログ記事に接続。F2 で達成した「画像の自前配信」を接続後も維持する必要があるため F2 の後に行う | F2 |
| Sprint 4 | F4 (P2) | 磨き 4 点（角丸統一・検索画像比・trust-strip 具体値・カード文言）を一括で適用 | なし |

### F2 補足（実装前の確認事項）

- 対象 4 セクションの image 設定（image_picker）は**既存 schema に全て存在することを確認済み**（hero の `image`、category-tiles の各ブロック `image`、philosophy-band の `image`、journal の各ブロック `image`）。したがって設定追加は原則不要で、JSON テンプレートへの値の設定が中心となる。万一設定が足りないセクションがあれば追加してよいが、達成基準はあくまで「画像が自前配信になっていること」。
- 画像参照は `"shopify://shop_images/<filename>"` 形式。ファイル名対応表:

| 設置箇所 | ファイル名 |
|---|---|
| hero | photo-1583209814683-c023dd293cc6.jpg |
| category-tiles クレンジング | photo-1620916566398-39f1143ab7be_87dd1189-54a4-4e04-b526-754db2de44e1.jpg |
| category-tiles 化粧水・美容液 | photo-1611930022073-b7a4ba5fcccd_6757bcf2-3626-494c-8a01-6b829668edc4.jpg |
| category-tiles クリーム・オイル | photo-1608248543803-ba4f8c70ae0b_e5e1dd12-dab0-4751-9159-d4611b033126.jpg |
| category-tiles ギフト・キット | photo-1612817288484-6f916006741a_11d4b622-0741-4dff-9042-db77fb65e41d.jpg |
| philosophy-band | photo-1519014816548-bf5fe059798b.jpg |
| journal 記事1 | photo-1519014816548-bf5fe059798b.jpg |
| journal 記事2 | photo-1601049541289-9b1b7bbbfe19.jpg |
| journal 記事3 | photo-1522335789203-aabd1fc54bc9.jpg |

- journal は TOP と About の両ページに配置されているため、両方が対象。

### F3 補足

- 接続先の記事（作成済み・ブログ `news`）: /blogs/news/botanical-ingredients、/blogs/news/our-craft、/blogs/news/skincare-routine
- journal セクションには既にブログ選択の仕組みがあり、ブログ接続時は記事のタイトル・日付・画像・抜粋がそのまま表示される設計になっている。接続方法自体は実装者判断でよいが、達成基準は「カードから記事に遷移でき、表示内容が記事と整合し、画像の自前配信（F2）が保たれている」こと。

### F4 補足

4 点を 1 スプリントで行う:
- (a) カード角丸の統一 — TOP の商品カード（8px）とコレクションページのカード（12px）に微差がある。どちらの値に寄せるかは実装者判断だが、共通のトークン（変数）1 箇所で管理される状態にする。
- (b) 検索結果ページの商品画像比 — 現状 adapt。コレクションページと同じ portrait に揃える。
- (c) trust-strip の「国産植物成分 使用」を具体値入り（例:「国産植物成分 90%」）へ。TOP・About の両ページのトラストストリップで具体値入りになっていること。
- (d) 商品カードの飾りボタン文言「カートに入れる」→「詳しく見る」。カード全体が商品詳細へのリンクであり、見た目と挙動を一致させる。

## 4. 受け入れ基準

すべて `shopify theme dev --store xn-0nsp96djkas7be59f.myshopify.com` を起動し、http://127.0.0.1:9292 をブラウザで開いて検証する。

### F1: カテゴリータイルの実コレクション接続

1. TOP のカテゴリータイル「クレンジング」をクリックすると /collections/cleansing に遷移し、そのコレクションの商品一覧が表示される。
2. 同様に「化粧水・美容液」→ /collections/lotion-serum、「クリーム・オイル」→ /collections/cream-oil、「ギフト・キット」→ /collections/gift-kit にそれぞれ遷移する。
3. 4 タイルのいずれも /collections/all へは遷移しない（リンク先が全て固有のコレクション）。

### F2: 主要ビジュアルの自前アセット化

1. TOP を開き、開発者ツールの Network タブ（画像フィルタ）で確認したとき、hero・カテゴリータイル 4 枚・philosophy-band・journal 3 枚の画像リクエストのホストがすべて cdn.shopify.com（自ストア配信）であり、images.unsplash.com へのリクエストが 1 件も無い。
2. 各設置箇所に表示される画像が、ファイル名対応表どおりの絵柄（従来フォールバックと同じ写真）である。
3. journal を含むセクションが配置されている About ページ（/pages/about）でも、images.unsplash.com へのリクエストが無い。
4. ブラウザ幅を 960px 前後・640px 前後に縮めても、差し替えた画像がはみ出し・つぶれなく表示される。

### F3: ジャーナルの実記事接続

1. TOP の journal のカード 3 枚がそれぞれクリックでき、/blogs/news/botanical-ingredients、/blogs/news/our-craft、/blogs/news/skincare-routine のいずれかの記事ページへ遷移する（3 枚で 3 記事すべてをカバー）。
2. 各カードに表示されるタイトル・日付が、遷移先の記事のタイトル・公開日と一致している。
3. About ページ（/pages/about）の journal でも 1〜2 が同様に成立する。
4. 接続後も TOP・About の journal の画像リクエストのホストが cdn.shopify.com であり、images.unsplash.com への直リンクが復活していない（F2 の維持）。

### F4: 磨きバッチ

1. TOP の商品カードと /collections/all の商品カードの角丸が同じ値に見え、開発者ツールで両者の computed `border-radius` を確認すると同値である。
2. 検索（/search?q=クレンジング 等、商品がヒットするクエリ）の結果ページで、商品画像が /collections/all と同じ縦長（portrait）の比率で表示される。
3. TOP と /pages/about のトラストストリップで「国産植物成分」の項目が具体的な数値入り（例:「国産植物成分 90%」）で表示され、「使用」のみの曖昧な表記が画面上に残っていない。
4. TOP・About の商品カードのボタン風表示の文言が「詳しく見る」になっており、クリックすると（従来どおり）商品詳細ページへ遷移する。

## 5. スコープ外

- ストア側データの新規作成・変更（コレクション・ブログ記事・Shopify Files のアップロードは完了済みのものを使う）
- Admin API・外部サービス連携
- nagi 層への新規 JS 追加（JS ゼロ方針を維持）
- 多言語対応（schema・文言は日本語ハードコードの既存方針を維持）
- 商品詳細ページ・カート以降のフロー改善
- journal のページネーションや記事一覧ページ（/blogs/news）自体のデザイン改修
- Unsplash フォールバック分岐コードそのものの削除（画面から Unsplash 配信が無くなればよく、フォールバックロジックの整理は必須としない）
