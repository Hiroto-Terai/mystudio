# デザイン仕様: カート UI 群（F2 送料無料プログレスバー / F3 配送日時指定 / F7 ギフトラッピング）

対象: Dawn の main-cart-items の上下に挿入されるカートページ UI 3 点
モック: `docs/design/cart-features.html`

## 0. デザインシステム前提（発見結果の要約）

- **トークン**: 色 `--hirot-green-05..70` / `--hirot-shade-20..70` / `--hirot-ink` / `--hirot-white` / `--hirot-hairline`、面 `--hirot-surface-wash`(green-05) / `--hirot-surface-band`(green-10)。角丸 `--hirot-radius-card: 12px` / `--hirot-radius-panel: 20px`、ピル 9999px。影は `--hirot-halo` のみ。入力欄は Dawn 上書きで **8px 角丸**（hirot.css の `.field__input, .select__select { border-radius: 8px }`）。
- **タイポ**: 見出し Hanken Grotesk 300、本文 Noto Sans JP。強調数字は 700（`.hirot-card__price` と同じ）。
- **アイコン**: stroke 1.5 の線画（trust-strip 参照）。
- **ブレークポイント**: 60em / 40em の 2 つ。
- 新しい色・グラデーション・影は発明しない（進捗バーの塗りも単色トークン）。

## 1. 配置（Dawn カートページへの挿入位置）

```
h1「カート」+ 買い物を続ける
├── [F2] 送料無料プログレスバー      ← main-cart-items の【上】に挿入（全幅）
├── main-cart-items（Dawn 標準・不改変）
└── cart footer（2 カラム）
    ├── 左: [F3+F7] 配送・ギフトオプションパネル ← Dawn の cart__note スロット相当の位置
    └── 右: 小計・注意書き・チェックアウトボタン（Dawn 標準）
```

- F2 はカートドロワーにも同一コンポーネントを縮小配置（padding を 12px 16px に落とすのみ、構造同一）。
- F3 はカートページのみ（spec-v3 の受け入れ基準どおり）。F7 はドロワー・ページ両方。

## 2. F2: 送料無料プログレスバー `.hirot-shipbar`

しきい値 ¥5,000（trust-strip の訴求と一致）。

| 要素 | 値 | トークン |
|---|---|---|
| コンテナ | surface-wash 背景 / radius-card / padding 16px 20px | `--hirot-surface-wash` `--hirot-radius-card` |
| ラベル行 | 14px / 1.7 / ink。差額 `¥X,XXX` のみ 700 / green-70（セール価格と同じ強調系） | `--hirot-ink` `--hirot-green-70` |
| トラック | 高さ 6px / ピル / 白 + 1px 内側ヘアラインリング | `--hirot-white`, `inset 0 0 0 1px rgba(14,16,15,.05)`（halo と同係数） |
| 塗り（未達） | green-50 単色 / ピル / width = 小計÷5000 | `--hirot-green-50` |
| 塗り（達成） | green-60 単色 / width 100% | `--hirot-green-60` |
| 達成ラベル | 18px チェック丸アイコン（trust-strip の check、green-60）+「送料無料でお届けします」14px / 600 / green-70 | `--hirot-green-60` `--hirot-green-70` |
| 変化 | width は transition .4s ease（数量変更時に滑らかに追随） | — |

状態:

| 小計 | 表示 |
|---|---|
| ¥0（空カート） | コンポーネント自体を出さない |
| ¥1〜¥4,999 | 「あと **¥X,XXX** で送料無料」+ 部分塗りバー（最小幅 6px 保証） |
| ¥5,000 以上 | チェックアイコン + 達成文言 + 満タンバー（green-60） |

## 3. F3: 配送日時指定（`.hirot-cart-options` パネル内）

パネル `.hirot-cart-options`: 白背景 / 1px `--hirot-hairline` 枠 / radius-card / padding 20px。
（surface-wash はプログレスバー＝訴求系に使い、入力系パネルは白 + ヘアラインで階層を分ける）

- パネル見出し: 15px / 600 / ink「配送日時の指定」+ 18px トラック線画アイコン（trust-strip の shipping と同パス）。右側に「任意」12px / shade-50。
- フィールド 2 つを横並び grid（1fr 1fr / gap 12px）。40em で 1 列に落とす。

| 要素 | 値 | トークン |
|---|---|---|
| ラベル | 13px / 500 / shade-50、下 margin 6px | `--hirot-shade-50` |
| select | 高さ 44px / radius 8px（hirot の入力角丸） / 1px `--hirot-shade-30` 枠 / 白背景 / 14px ink / 左 padding 14px | `--hirot-shade-30` `--hirot-ink` |
| chevron | 16px 線画（stroke 1.5, ink）を右 14px に絶対配置（appearance: none） | `--hirot-ink` |
| focus | 枠を `--hirot-green-50` + 0 0 0 3px の green-10 リング | `--hirot-green-50` `--hirot-green-10` |
| ヘルプ文 | 12px / shade-50「翌日から14日先までご指定いただけます」 | `--hirot-shade-50` |

選択肢:
- 配送日: 「指定なし」+ 翌日〜14 日先（除外曜日は設定で消える。表記例「7/18（土）」）
- 時間帯: 指定なし / 午前中 / 14〜16時 / 16〜18時 / 18〜20時

## 4. F7: ギフトラッピングのチェック行 `.hirot-gift`

同じ `.hirot-cart-options` パネル内の最下段。上に 1px `--hirot-hairline` の区切り + padding-top 16px。

| 要素 | 値 | トークン |
|---|---|---|
| 行全体 | `<label>` で全面クリック可 / min-height 44px / flex / gap 12px | — |
| チェックボックス | 20 x 20px / radius 6px / 1.5px `--hirot-shade-30` 枠 / 白 | `--hirot-shade-30` |
| checked | 背景+枠 `--hirot-green-60`、白チェック（stroke 2, 12px） | `--hirot-green-60` |
| focus-visible | green-10 の 3px リング（select と同じ） | `--hirot-green-10` |
| ラベル | 14px / ink「ギフトラッピングを希望する」+ 価格「+¥300」14px / 700 / ink | `--hirot-ink` |
| 補足 | 12px / shade-50「リボン付きの包装紙でお包みします」 | `--hirot-shade-50` |
| アイコン | 18px ギフトボックス線画（stroke 1.5, ink）をラベル先頭に | `--hirot-ink` |

ドロワー版はパネルなしでチェック行のみを小計の上に置く（構造同一）。

## 5. レスポンシブ

- 60em: カート footer が 1 カラム化（オプションパネルが小計の上に全幅で積まれる。Dawn の footer 折返しに従う）。
- 40em: 配送日/時間帯 select が 1 列に。プログレスバーの padding を 14px 16px に。
- タップ領域: select 44px、チェック行 44px、いずれも維持。

## 6. generator への注意点

- 雛形: パネルの枠・見出しは `hirot-pdetails`（15px/600 見出し + ヘアライン区切り）の語彙に最も近い。アイコンは `sections/hirot-trust-strip.liquid` の SVG パスを再利用。
- CSS は `assets/hirot.css` 末尾に追記。
- F2 は Web Component（cart 更新イベント購読）許可。文言とバーは `data-` 属性 or 再描画で切替。しきい値 ¥5,000 は section setting に出す（default 5000）。
- F3 の日付選択肢生成・除外曜日は Liquid で組み立て、attributes 名は `配送希望日` / `配送希望時間帯`（cart.js で読める日本語キーで良い。既存仕様に既定なし）。
- F7 の attribute は `ギフトラッピング: 希望する`。チェック解除で属性を空にする。
- Dawn の `main-cart-items.liquid` / `main-cart-footer.liquid` は不改変。挿入は新規セクション（テンプレート JSON への追加）または footer 直前の独立セクションで行う。

## 7. 代替案（システム逸脱を含むため分離）

- プログレスバーをグラデーション塗りにする案: システムにグラデーションが存在しないため不採用。
- 達成時にバー全体を green-10 背景へ切替える案: 訴求が弱まるため不採用（文言+チェックで十分）。
- 配送日を `<input type="date">` にする案: ネイティブカレンダーの見た目を統制できず、除外曜日も制御不能のため select を採用。
