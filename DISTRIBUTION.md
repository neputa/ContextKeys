# ContextKeys 配布ガイド

このドキュメントは、ContextKeys を配布可能な状態にするための手順をまとめています。

## 📋 配布前チェックリスト

### 1. バージョン管理
- [ ] `manifest.json` の `version` を更新
- [ ] `package.json` の `version` を更新
- [ ] `CHANGELOG.md` に変更内容を記載
- [ ] `README.md` を最新情報で更新

### 2. コード品質
- [ ] `npm test` でリント成功を確認
- [ ] すべての JavaScript/JSON ファイルが有効
- [ ] コメントとドキュメントが最新

### 3. 機能テスト
- [ ] メール画面で `Ctrl+Shift+H` → 共通＋メールショートカット表示
- [ ] カレンダータブで `Ctrl+Shift+H` → カレンダーショートカット表示
- [ ] アドレス帳タブで `Ctrl+Shift+H` → アドレス帳ショートカット表示
- [ ] タスク/ToDoタブで `Ctrl+Shift+H` → タスクショートカット表示
- [ ] 検索ボックスで絞り込みが動作
- [ ] `Esc` キーでウィンドウが閉じる
- [ ] ダークモードで正しく表示される

### 4. ドキュメント
- [ ] README.md が完全で最新
- [ ] CHANGELOG.md が整形されている
- [ ] LICENSE ファイルが存在
- [ ] docs/ フォルダに参考資料がある

---

## 🔨 XPI ファイル生成

### 前提条件
- Node.js 12.0 以上（スクリプト実行用）
- `zip` コマンド（zip パッケージを作成）

**インストール:**

- **Windows**: WSL（Windows Subsystem for Linux）または Git Bash を使用
- **macOS**: `brew install zip`
- **Linux**: `sudo apt-get install zip`

### 生成手順

```bash
# 1. リポジトリをクローン
git clone https://github.com/yourusername/ContextKeys.git
cd ContextKeys

# 2. XPI ファイルを生成
npm run build

# 出力: dist/contextkeys-1.0.0.xpi
```

**手動で生成する場合（推奨）:**

```bash
# dist/ ディレクトリを作成
mkdir -p dist

# manifest.json から version を取得して XPI を作成
VERSION=$(node -p "require('./manifest.json').version")
zip -r "dist/contextkeys-${VERSION}.xpi" \
  manifest.json \
  background.js \
  shortcut-dialog.* \
  data/ \
  LICENSE \
  README.md \
  -x ".*" "node_modules/*" "scripts/*" "docs/*" "dist/*"
```

---

## 📦 リリース手順

### 1. GitHub Releases での公開

```bash
# 1. タグを作成
git tag -a v1.0.0 -m "Release version 1.0.0"

# 2. push
git push origin v1.0.0

# 3. GitHub でリリースを作成
# - https://github.com/yourusername/ContextKeys/releases
# - "Draft a new release"
# - タグ: v1.0.0
# - 説明: CHANGELOG.md の内容をコピー
# - XPI ファイルをアップロード: dist/contextkeys-1.0.0.xpi
```

### 2. Thunderbird Add-ons Store（Mozilla）への登録

**前提条件**: Mozilla Developer Account が必要

**手順**:

1. https://addons.mozilla.org/ にアクセス
2. アカウントにログイン
3. 「新しいアドオンを登録」を選択
4. XPI ファイルをアップロード
5. メタデータを入力:
   - **名前**: ContextKeys
   - **説明**: 日本語説明と英語説明
   - **カテゴリー**: 生産性
   - **バージョン**: 1.0.0
   - **Thunderbird 最小バージョン**: 128.0
6. レビューを待機

**レビュー期間**: 通常 3～7日

---

## 📝 配布ファイルのテンプレート

### Release Notes テンプレート

```markdown
# ContextKeys v1.0.0

**初回リリース**: Thunderbird 向けキーボードショートカット表示アドオン

## 新機能

- コンテキスト対応ショートカット表示（メール、カレンダー、アドレス帳、タスク）
- リアルタイム検索機能
- ダークモード対応
- 156 個のショートカット実装

## インストール方法

1. `contextkeys-1.0.0.xpi` をダウンロード
2. Thunderbird → ツール → アドオン → ⚙️ → ファイルからインストール
3. XPI ファイルを選択
4. インストール完了

## 使い方

- **Ctrl + Shift + H**: ショートカット一覧表示
- **Esc**: 一覧を閉じる

詳細は [README.md](../README.md) を参照。

## 対応環境

- Thunderbird 128.0 以上
- Windows, macOS, Linux

---

詳細は [README.md](../README.md) をご覧ください。
```

---

## 🔒 署名とセキュリティ

### コード署名（推奨）

Thunderbird Add-ons Store での配布には、Mozilla による署名が必要です。

1. Developer Account で XPI をアップロード
2. 自動的に署名されます
3. 署名済み XPI をダウンロード

### ユーザーへの注意

配布時に以下を明記してください：

```
このアドオンは以下の権限を必要とします：
- activeTab: 現在のタブ情報を取得
- tabs: タブ一覧を取得

これらの権限はコンテキスト判定にのみ使用されます。
```

---

## 📊 配布後のサポート

### バージョン管理

- **Semantic Versioning** に従う: `MAJOR.MINOR.PATCH`
- `MAJOR`: 互換性破棄の変更
- `MINOR`: 新機能（後方互換性あり）
- `PATCH`: バグ修正

### サポートチャネル

- GitHub Issues: バグ報告、機能提案
- Discussions: 使用方法についての質問

### 更新の通知

ユーザーは Thunderbird の アドオン管理画面で自動更新を受け取ります。

---

## 🔗 参考資料

- [Mozilla WebExtensions Documentation](https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions)
- [Thunderbird WebExtensions API](https://thunderbird-webextensions.readthedocs.io/)
- [Thunderbird Add-ons Store](https://addons.thunderbird.net/)

---

**最終更新**: 2026年11月2日
