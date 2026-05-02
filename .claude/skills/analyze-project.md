---
description: Shopifyテーマの構造・命名規則・CSS設計を分析してtheme-profile.mdに出力する
---

# プロジェクト分析

以下の手順でこの Shopify テーマを分析し、**`theme-profile.md`** に結果を出力してください。

## 分析対象

1. `layout/theme.liquid` — グローバルレイアウト
2. `config/settings_schema.json` — テーマ設定
3. `sections/` — 全セクション（役割・使用スニペット・メタフィールド）
4. `snippets/` — 全スニペット（役割・呼び出し元）
5. `assets/*.css` / `assets/*.css.liquid` — CSS命名規則・変数・ブレークポイント
6. `assets/*.js` — JSパターン

## 出力形式

`theme-profile.md` を以下の構成で上書き作成する：

# {テーマ名} テーマプロファイル
最終更新: {日付}

## テーマ構成
## CSS 設計
### 命名規則
### CSS 変数
### ブレークポイント
## Liquid パターン
### よく使われる記法
### メタフィールド参照パターン
## コンポーネント一覧
### セクション
### スニペット
## 命名規則サマリー
## 実装時の注意事項

完了後、theme-profile.md を作成したことをユーザーに報告する。
