# デザイン仕様: Flow 自動化ショーケースページ（F9）

対象: /pages/automation。5 つの自動化例カード + インライン SVG フロー図解 + 導入バンド
モック: `docs/design/flow-showcase.html`

## 0. デザインシステム前提（発見結果の要約）

- **トークン**: 色 `--nagi-green-05..70` / `--nagi-shade-20..70` / `--nagi-ink` / `--nagi-white` / `--nagi-hairline`、面 `--nagi-surface-wash`(green-05) / `--nagi-surface-band`(green-10)。角丸 `--nagi-radius-card: 12px` / `--nagi-radius-panel: 20px`、ピル 9999px。影 `--nagi-halo`。
- **タイポ**: 見出し Hanken Grotesk 300、eyebrow 12px/500/.18em/uppercase/green-60、本文 Noto Sans JP 14〜16px、補足 shade-50。
- **既存パターン**: 導入バンド = `nagi-collection-header`（surface-wash / radius-panel / 56px 48px padding / 44px 見出し）。常時 halo のカード = `card--card` 相当。テキストリンク = `.nagi-staff-card__social`（13px/600/ヘアライン下線）。CTA バンド = newsletter 上書き様式（surface-wash パネル + accent ピル）。
- **ブレークポイント**: 60em（2列）/ 40em（1列）。
- SVG はテーマ内で線画 stroke 1.5 が既存語彙（trust-strip）。図解ノードの角丸は radius-card と同じ 12。

## 1. ページ構造

```
1. 導入バンド（nagi-collection-header 様式そのまま）
   eyebrow「Automation」/ h1 44px 300「Flow でできる、店舗運用の自動化」/ 説明文
2. カードグリッド（5 枚、2 列。1 枚目のみ全幅 featured）
3. 締め CTA パネル（newsletter 様式: surface-wash / radius-panel / 中央寄せ / accent ピル）
```

- 5 枚 + 2 列だと端数が出るため、**1 枚目（お気に入り→通知。ストア内機能 F1 と直結する看板例）を grid-column: 1 / -1 の全幅 featured** にし、2 列 x 2 段を続ける。featured 内はテキスト左 / 図解右の 2 カラム（60em で縦積み）。

## 2. カード `.nagi-flowcard`

| 要素 | 値 | トークン |
|---|---|---|
| コンテナ | 白 / radius-card / **halo 常時**（card--card と同じ「置かれた紙」） / padding 28px。クリック対象ではないので hover リフトなし | `--nagi-white` `--nagi-radius-card` `--nagi-halo` |
| カテゴリーチップ | ピル / green-10 背景 / green-70 文字 / 11px / 500 / .05em（`.nagi-card__badge` の配色反転版） | `--nagi-green-10` `--nagi-green-70` |
| タイトル | 20px / 500 / ink / 1.5（`.nagi-jcard__title` と同値） | `--nagi-ink` |
| 本文 | 14px / 1.8 / shade-50 | `--nagi-shade-50` |
| 図解 | インライン SVG（下記）。width: 100% で可変 | — |
| 体験導線リンク | 13px / 600 / ink / ヘアライン下線 → hover で ink 下線（`.nagi-staff-card__social` と同一様式）+「→」 | `--nagi-hairline` `--nagi-ink` |

## 3. フロー図解 SVG（トリガー → 条件 → アクション）

viewBox="0 0 560 96"、width:100%・height:auto で縮小追随（960px / 640px 幅でも崩れない）。外部画像依存なし。

| 部位 | 形 | 塗り/線 | 文字 |
|---|---|---|---|
| キャプション（トリガー/条件/アクション） | 各ノード上部中央 | — | 10px / .1em / `--nagi-shade-50` |
| ノード共通 | rect 168x48 / rx 12（radius-card と同値） | — | 12.5px、中央揃え、長文は 2 行 |
| トリガー | 同上 | fill `--nagi-green-10` / stroke `--nagi-green-30` | `--nagi-green-70` |
| 条件 | 同上 | fill `--nagi-white` / stroke `--nagi-shade-30` | `--nagi-ink` |
| アクション | 同上 | fill `--nagi-ink` | `--nagi-white`（結論を最も強く） |
| 矢印 | 20px の線 + シェブロン / stroke 1.5（trust-strip の線幅） | `--nagi-shade-40` | — |

- 「淡い緑（きっかけ）→ 白（判定）→ ink（実行）」の 3 段階で読み順を作る。全て既存トークン。
- LINE / メールはテキストラベルのみ（ロゴ模倣禁止）。
- 各 SVG に `role="img"` + `aria-label`（流れの一文説明）。ノード内テキストは装飾でなく実テキストとして SVG `<text>` に持たせる。

## 4. 5 枚のカード内容

| # | チップ | タイトル | トリガー | 条件 | アクション | 体験導線 |
|---|---|---|---|---|---|---|
| 1 (featured) | マーケティング | お気に入りをきっかけに LINE・メールでお知らせ | お気に入りに追加 | セール開始 / 在庫わずか | LINE・メールで通知 | /pages/wishlist |
| 2 | マーケティング | 再入荷を待っているお客様へ自動配信 | 在庫が 0 → 1 以上に | 通知の登録あり | 再入荷メールを配信 | 売り切れ商品ページ（通知フォーム） |
| 3 | 顧客フォロー | 購入後、ちょうどよい頃にレビュー依頼 | 注文の発送完了 | 発送から 7 日経過 | レビュー依頼メール送信 | — |
| 4 | 顧客管理 | 上位顧客に VIP タグを自動付与 | 注文が作成された | 累計購入額 ¥50,000 以上 | 顧客に「VIP」タグ | — |
| 5 | 不正対策 | 高リスク注文を自動で保留 | 注文が作成された | リスク評価が High | 支払い保留 + 担当へ通知 | — |

## 5. レスポンシブ

- グリッド: 2 列（featured は全幅）→ 60em で 2 列維持（featured 内部は縦積みに）→ 40em で 1 列。gap 24px。
- 導入バンド: nagi-collection-header と同じ縮小（60em: padding 40px 28px / 34px 見出し、40em: 32px 20px / 28px）。
- SVG は width 100% で等比縮小のみ。1 列時は最大幅いっぱいで十分読める（実測 12.5px x 0.9 倍程度）。
- 体験導線リンクは行高 44px 相当の padding を確保。

## 6. generator への注意点

- 雛形: 導入バンド = `sections/nagi-collection-header.liquid`（ただし page テンプレート用なので `collection.title` でなく section settings の text）。SVG インライン化の作法 = `sections/nagi-trust-strip.liquid`。締め CTA = newsletter 上書き様式を独自 class で再現。
- JS ゼロ（表示系。spec-v3 の二層ルール）。CSS は `assets/nagi.css` 末尾へ。
- カードは section blocks（type: flow_example）で 5 枚をプリセット投入。図解ノードの 3 ラベル + aria-label + チップ文言 + 体験導線 URL を block settings に。SVG の枠組み（rect/矢印）は Liquid 側に固定し、`<text>` だけ設定値を流す。
- ノード内 2 行テキストは Liquid で「改行位置」を持たせるより、ラベル 1（上段）/ ラベル 2（下段・任意）の 2 settings に分けると安全。
- page.automation テンプレート JSON: nagi-collection-header 系バンド → flow showcase → （任意で nagi-trust-strip）。

## 7. 代替案（システム逸脱を含むため分離）

- 図解を縦フロー（上から下）にする案: モバイルで自然だが、カード高さが不揃いになり 2 列グリッドが崩れるため、横フロー等比縮小を採用。
- 高リスク注文カードのアクションノードを赤系にする案: `#ef4444` は売り切れ専用であり、受け入れ基準も「緑系トークンで統一」のため不採用。
- カードに hover リフト（translateY + halo 強調）を付ける案: カード自体が非リンクのためアフォーダンスが嘘になる。不採用。
