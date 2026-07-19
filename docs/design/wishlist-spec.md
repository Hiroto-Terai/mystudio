# デザイン仕様: お気に入り（F1 wishlist）

対象: 商品カード上のハートボタン / ヘッダーのハートアイコン+カウントバッジ / wishlist ページ（一覧・削除・空状態）
モック: `docs/design/wishlist.html`

## 0. デザインシステム前提（発見結果の要約）

- **トークン**: 色は `--nagi-green-05..70` / `--nagi-shade-20..70` / `--nagi-ink` / `--nagi-white` / `--nagi-cream` / `--nagi-hairline`、面は `--nagi-surface-wash`(=green-05) / `--nagi-surface-band`(=green-10)。角丸は `--nagi-radius-card: 12px` / `--nagi-radius-panel: 20px`、ピルと小バッジは 9999px リテラル。影は `--nagi-halo`（積層微影）のみ。生 hex・新規影・新規角丸は導入しない。
- **タイポ**: 見出し = Hanken Grotesk 300（署名的な細字、300 を超えない）。本文 = Noto Sans JP。eyebrow = 12px / 500 / tracking .18em / uppercase / green-60。
- **コンポーネント言語**: アイコンは stroke 1.5 のライン画（nagi-trust-strip 参照）。カードは白地 + radius-card、hover は translateY(-3px) + halo。ボタンはピル（`--primary`=ink / `--accent`=green-60 / `--outline` / `--ghost`、`--sm`=40px 高、標準 44px 以上）。
- **ブレークポイント**: `max-width: 60em`（→2列）と `max-width: 40em`（→1列）の 2 つのみ。ただし `nagi-product-grid` は 60em で 2 列になった後、40em でも 2 列を維持する（商品カードは常時 2 列が最小）。

## 1. ハートの表現（判断）

**rest = ink の線画（stroke 1.5, fill none）→ active = green-60 の塗り + 同色ストローク。**

- rest はヘッダーの既存アイコン群（ink・線画）および trust-strip の stroke 1.5 と同族にする。
- active はブランドの「操作の結果」を示すアクセント。星評価が green-70、accent ボタンが green-60 なので、**green-60** を採用（星と微差をつけつつ操作系の色に揃える）。
- 赤ハートは使わない。`#ef4444` はこのテーマでは売り切れ警告専用。

## 2. 商品カード上のハートボタン `.nagi-fav-toggle`

`.nagi-card__image-wrap` 内の absolute 配置（top: 10px / right: 10px）。バッジ（左上 `.nagi-card__badge`）とは対角なので通常は干渉しない。

| 属性 | 値 | トークン |
|---|---|---|
| サイズ | 44 x 44px の正円（タップ領域そのまま） | 9999px ピル |
| 背景 | 白 | `--nagi-white` |
| 影 | halo を常時（写真上での輪郭確保） | `--nagi-halo` |
| アイコン | 22px、stroke 1.5 | rest: `--nagi-ink` / active: `--nagi-green-60` |
| hover | アイコンのみ scale(1.07)（Dawn の header__icon hover と同じ） | transition .15s ease |
| active(追加済み) | パスに fill=currentColor、色 green-60。ワンショットの scale ポップ（1 → 1.25 → 1、.25s）は任意 | `--nagi-green-60` |

- `<button type="button">` とし、`aria-pressed` + `aria-label="お気に入りに追加"` / 追加済みは `aria-label="お気に入りから削除"`。
- カード全体が `<a>` の内側に置けない（a > button は不正）。**generator 注意**: `nagi-card` は現在カード全体が `<a>`。ハート導入時は `image-wrap` を position 基点にカードを `<div>` 化してリンクを分離するか、ハートをカード `<a>` の兄弟として重ねる。
- **売り切れバッジとの共存**: `.nagi-card__soldout-badge` は現在 top:12/right:12。ハートがある文脈では `right: 62px` にずらす（モック参照）。

## 3. ヘッダーのハートアイコン + カウントバッジ

Dawn の `.header__icon`（44 x 44px, ink, hover で icon scale 1.07）の作法に完全に合わせ、カートアイコンの左に置く。

- アイコン: 20px 線画ハート、stroke 1.5、`--nagi-ink`（fill なし。active 状態は持たない — 状態はバッジで示す）。
- バッジ `.nagi-fav-bubble`: Dawn `.cart-count-bubble` のジオメトリを踏襲。
  - 17 x 17px 正円、絶対配置（bottom: 8px / left: 22px 相当）。
  - 背景 `--nagi-green-60`、文字 白 / 10px / 600。（Dawn のカートバブルはボタン色 = ink。お気に入りは green-60 でカートと区別する）
  - **0 件時は非表示**（`:empty { display: none }` の Dawn パターンを踏襲。要素は出力し中身を空にする）。
  - 10 件以上は「9+」に丸める（バブルの幅を保つ）。

## 4. wishlist ページ（/pages/wishlist）

構造は上から:

1. **導入バンド** — `nagi-collection-header` の様式をそのまま流用（surface-wash パネル / radius-panel / padding 56px 48px）。
   - eyebrow「Wishlist」（英語 eyebrow の既存慣習）
   - h1 44px / 300「お気に入り」
   - 説明文 16px / shade-50 + 件数表示「3点の商品」(14px / shade-50)
2. **商品グリッド** — `nagi-product-grid` と同一構造・同一 class（`.nagi-card` 一式を再利用）。4 列 / gap 24px。
   - 各カードのハートは **active（green-60 塗り）固定**で、クリック = 削除。`aria-label="お気に入いから削除"`。
   - 削除時はカードを即時取り除き、ヘッダーのバッジ件数も同期。
3. **空状態 `.nagi-wishlist__empty`** — グリッドの代わりに表示。
   - 中央寄せ、padding 80px 20px。
   - 56px の線画ハート（stroke 1.5、`--nagi-shade-30`）
   - 見出し 20px / 500 / ink「お気に入りはまだありません」
   - 本文 14px / shade-50「商品ページのハートを押すと、ここに保存されます。」
   - CTA: `nagi-btn nagi-btn--outline`「商品を見る」→ /collections/all

## 5. 状態一覧

| 状態 | 見た目 |
|---|---|
| カードハート rest | 白円 + halo + ink 線画 |
| カードハート hover | アイコン scale 1.07 |
| カードハート active | green-60 塗りハート |
| ヘッダーバッジ 0 件 | バブル非表示（ハートのみ） |
| ヘッダーバッジ n 件 | green-60 円 + 白数字 |
| ページ 0 件 | 空状態ブロック（グリッド非表示） |
| 削除直後 | カード消滅 + バッジ減算（アニメーション必須ではない） |

## 6. レスポンシブ

- グリッド: 4 列 → 60em で 2 列 → 40em でも 2 列維持（nagi-product-grid と同じ）。
- 導入バンド: 60em で padding 40px 28px / 見出し 34px、40em で padding 32px 20px / 見出し 28px（nagi-collection-header と同値）。
- ハートは全幅で 44px を維持（縮小しない）。

## 7. generator への注意点

- 雛形: カード = `sections/nagi-product-grid.liquid`、導入バンド = `sections/nagi-collection-header.liquid`。
- CSS は `assets/nagi.css` 末尾に追記（`{% stylesheet %}` 禁止）。
- ヘッダーへの挿入は Dawn の `sections/header.liquid` 側になるため、Dawn の `.header__icon` class 系をそのまま使い、独自 class は `.nagi-fav-bubble` のみ追加する（Dawn 改変を最小に）。
- Web Component（localStorage 同期）は spec-v3 の二層ルールで許可。UI 状態は `aria-pressed` / `--active` modifier の付け外しだけで切り替わる CSS 設計にしてある。
- 売り切れバッジのオフセットは「ハートを持つカード」に限定して当てる（既存 grid の見た目を変えない）。

## 8. 代替案（システム逸脱を含むため分離）

- ハート active を green-50（より明るい）にする案: 写真上での視認性は上がるが、白背景上のコントラストが 3.6:1 まで下がるため不採用。
- カードのハートを常時非表示 → hover 時のみ表示する案: モバイルで発見できないため不採用（タッチデバイス優先）。
- ヘッダーバッジを ink にしてカートと完全統一する案: 可能だが「お気に入り=green」の意味づけが失われる。実装が簡単になる場合の第二候補。
