# 仕様書 v5: コンテンツページのリッチ化（できること / 読み物 / about）

作成日: 2026-07-24 / 対象: mystudio テーマ（Dawn 15.5.0 + nagi）/ 前提: spec v1〜v4 完了済み

## 1. 概要

説明的で静的だった 3 ページを、伝わる・回遊する体験に作り替える。既存 nagi 規約（`--nagi-*` トークン・`nagi.css` 集約・日本語 schema + presets・60em/40em レスポンシブ・外部ライブラリゼロ・表示系は JS ゼロ / 演出は nagi-motion.js の reveal）に従う。

## 2. 機能一覧

| # | 名前 | 1行説明 | 配置 |
|---|------|---------|------|
| F1 | アプリスタック | 能力ごとに実アプリ名＋自作アイコン＋「アプリで即/実装で自由に」を並べる | できること(page.automation) |
| F2 | ブログ一覧マガジン化 | `blog.articles` を先頭大＋カードグリッドのマガジン風に | 読み物一覧(blog) |
| F3 | 記事リッチ化 | 読み物タイポ整備＋記事末アウトロ帯（回遊）＋既存関連商品カルーセル | 記事(article) |
| F4 | about ストーリー | 信念→違い→変化→価値提供を1本の物語として設計した新セクション | about(page.about) |

## 3. コンポーネント設計

- **`sections/nagi-app-stack.liquid`**（F1・JSゼロ表示＋reveal）: ブロック `app`（icon select / capability / app_names / description）。カードに機能アイコン・能力名・実アプリ例・説明・デュアルバッジ「アプリで即 / 実装で自由に」。アイコンは使う 8 種のみ自作インライン SVG（`case` で切替、currentColor）。実ロゴは商標/CSP のため使わない。
- **`sections/nagi-blog-index.liquid`**（F2・JSゼロ＋reveal）: blog テンプレの `blog.articles` を `paginate` で取得。先頭記事を大きく（画像・抜粋・日付・カテゴリ）、以降をカードグリッド。記事が無いブログでも壊れない空状態。`main-blog` を置換。
- **`sections/nagi-article-outro.liquid`**（F3・JSゼロ＋reveal）: 記事末のブランドからの一言＋回遊リンク（読みもの一覧・商品へ）。`article.json` の関連商品カルーセルの前に置く。
- **記事タイポ CSS**（F3）: `nagi.css` に読み物用の版面（快適な行長・大きめリード段落・引用/画像/キャプション装飾）。Dawn の `article-template`/`.article-template__content`(rte) を上書き。Dawn liquid は非改変。
- **`sections/nagi-about-story.liquid`**（F4・JSゼロ＋reveal）: 4 楽章の固定構造（設定駆動）。1) 信念（大きなマニフェスト）2) 他との違い（普通は/ nagi は の対比）3) 使うとどうなるか（体験の before→after）4) どう価値提供するか（成分厳選・処方・国内製造・伴走を“お客様の得”に接続）。写真×余白×強タイポ、reveal 演出。熱量ある既定コピーを用意。

## 4. 配置（テンプレ JSON）

- `page.automation.json`: flow-showcase → **nagi-app-stack** → faq
- `blog.json`: `main-blog` を **nagi-blog-index** に置換
- `article.json`: main-article → **nagi-article-outro** → 関連商品カルーセル
- `page.about.json`: 先頭を **nagi-about-story** に。数値(trust)・スタッフ・商品・読みもの・お問い合わせは支える形で残す

## 5. 受け入れ基準

1. **F1**: できることページに、能力ごとのアイコン付きカードが並び、各カードに実アプリ名と「アプリで即/実装で自由に」の2バッジが出る。JS 無効でも全カード見える。
2. **F2**: 読みもの一覧が、先頭記事大＋カードグリッドのマガジン風で、各記事に画像・日付・抜粋が出る。ページネーションが機能する。記事 0 件でも崩れない。
3. **F3**: 記事本文が快適な行長・階層で読め、引用や本文中画像が装飾される。記事末にアウトロ帯と関連商品カルーセルが出る。
4. **F4**: about が「信念→違い→変化→価値提供」の流れで、説明ではなく主張として読める。写真と余白で情感が出て、スクロールで各楽章がフェードインする。
5. 全体: `shopify theme check` エラー 0。`--nagi-*` トークン使用・レスポンシブ・外部ライブラリゼロ。

## 6. スコープ外

- 記事本文そのものの執筆（管理画面の記事編集内容。テーマは「映える器」を用意）。
- 実アプリのロゴ画像・アフィリエイト連携（名称テキストと自作アイコンのみ）。
