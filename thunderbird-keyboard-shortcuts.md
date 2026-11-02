# Thunderbird キーボードショートカット一覧

> 出典: [Mozilla サポート「Thunderbird のキーボードショートカット」](https://support.mozilla.org/ja/kb/keyboard-shortcuts-tb)  
> 公式ページの最終更新: 2026年4月7日  
> このファイルは公式ページの内容を用途別に整理したものです。キーの動作は Thunderbird のバージョン、OS、フォーカス位置、表示モードによって異なる場合があります。

## 表記について

- **Windows / Linux**: 主に `Ctrl` を使用します。
- **macOS**: 主に `Command`（`⌘`）を使用します。
- `+` は同時押しを表します。例: `Ctrl + Shift + R`
- `単独` は修飾キーを押さず、そのキーだけを押します。
- macOS のノート PC では、`F1`～`F12` の使用に `fn` キーが必要な場合があります。
- 公式ページの日本語翻訳に重複・表記揺れがある箇所は、読みやすさを優先して整理しています。環境差があるキーは注記しています。

## 1. メッセージ機能

### 1.1 新規作成・返信・転送

| 操作 | Windows / Linux | macOS |
|---|---|---|
| 新しいメッセージ | `Ctrl + N` または `Ctrl + M` | `Command + N` |
| 送信者だけに返信 | `Ctrl + R` | `Command + R` |
| 全員に返信 | `Ctrl + Shift + R` | `Command + Shift + R` |
| メーリングリストに返信 | `Ctrl + Shift + L` | `Command + Shift + L` |
| メッセージを転送 | `Ctrl + L` | `Command + L` |
| 新しいメッセージとして編集 | `Ctrl + E` | `Command + E` |

**作成形式（プレーンテキスト / HTML）の切り替え**

- 作成・返信・全員に返信・リストに返信・転送のボタンを、`Shift` を押しながらクリックします。
- または、既存メッセージを右クリックし、`Shift` を押しながらコンテキストメニューの返信・転送項目を選択します。

### 1.2 受信・閲覧

| 操作 | Windows / Linux | macOS |
|---|---|---|
| 現在のアカウントの新着メッセージを受信 | `F5` または `F9` | `Command + Y` |
| すべてのアカウントの新着メッセージを受信 | `Shift + F5` または `Shift + F9` | `Command + Shift + Y` |
| メッセージを開く | `Ctrl + O` または `Enter` | `Command + O` または `Return` |
| メッセージのスレッドを開く | `Ctrl + Shift + O` | `Command + Shift + O` |
| スレッドを展開 | `→` | `→` |
| スレッドを折りたたむ | `←` | `←` |
| すべてのスレッドを展開 | `*` | `*` |
| すべてのスレッドを折りたたむ | `\` | `\` |
| ズームイン | `Ctrl + +` または `Ctrl + =` | `Command + +` または `Command + =` |
| ズームアウト | `Ctrl + -` | `Command + -` |
| ズームをリセット | `Ctrl + 0` | `Command + 0` |

メッセージやフォルダーを別タブで開く操作は、マウス操作を使用します。

- 背面のタブで開く: 中クリック、または右クリックメニューから「新しいタブで開く」。
- 前面のタブで開く: `Shift` + 中クリック、または `Shift` を押しながら右クリックメニューの「新しいタブで開く」を選択。

### 1.3 メッセージの管理

| 操作 | Windows / Linux | macOS |
|---|---|---|
| 印刷 | `Ctrl + P` | `Command + P` |
| メッセージをファイルに保存 | `Ctrl + S` | `Command + S` |
| メッセージのソースを表示 | `Ctrl + U` | `Command + U` |
| すべて選択 | `Ctrl + A` | `Command + A` |
| スレッドを選択 | `Ctrl + Shift + A` | `Command + Shift + A` |
| キャレットブラウズモードの切り替え | `F7` | `F7` |
| コピー | `Ctrl + C` | `Command + C` |
| 切り取り | `Ctrl + X` | `Command + X` |
| 貼り付け | `Ctrl + V` | `Command + V` |
| 前回と同じフォルダーに移動 / コピー | `Ctrl + Shift + M` | `Command + Option + M` |
| アーカイブ | `A`（単独） | `A`（単独） |
| 削除 | `Delete` | `Delete` |
| ごみ箱を経由せず削除（取り消し不可） | `Shift + Delete` | `Shift + Delete` |
| 元に戻す | `Ctrl + Z` | `Command + Z` |
| やり直す | `Ctrl + Y` | `Command + Y` |
| フォルダー名を変更 | `F2` | 対応記載なし（Windows / Linux のみ） |

**複数メッセージの選択**

- 連続したメッセージ: 最初のメッセージを選択し、`Shift` を押しながら最後のメッセージをクリックします。キーボードでは、`Shift` を押しながら `↑` / `↓` / `Page Up` / `Page Down` / `Home` / `End` で範囲を選択できます。
- 離れたメッセージ: `Ctrl`（macOS は `Command`）を押しながら対象をクリックします。キーボードでは、修飾キーを押しながら移動し、`Space` で個別に選択します。

**フォルダー間の操作**

- メッセージを別フォルダーへ移動: メッセージを目的のフォルダーへドラッグします。
- メッセージを別フォルダーへコピー: Windows / Linux は `Ctrl`、macOS は `Option` を押しながら目的のフォルダーへドラッグします。

### 1.4 タグ・マーク

| 操作 | キー |
|---|---|
| タグ 1～9 を追加 / 削除 | `1` ～ `9`（単独） |
| メッセージからすべてのタグを削除 | `0`（単独） |
| メッセージを既読 / 未読にする | `M`（単独） |
| スレッドを既読にする | `R`（単独） |
| すべてのメッセージを既読にする | `Shift + C` |
| 送信日時による既読設定 | `C`（単独） |
| 迷惑マークを付ける | `J`（単独） |
| 迷惑マークを解除 | `Shift + J` |
| スターを付ける / 外す | `S`（単独） |

### 1.5 ニュースグループ

| 操作 | キー |
|---|---|
| スレッドを無視 / 無視解除 | `K`（単独） |
| サブスレッドを無視 / 無視解除 | `Shift + K` |
| スレッドを注目対象にする | `W`（単独） |

## 2. 検索と絞り込み

| 操作 | Windows / Linux | macOS |
|---|---|---|
| すべてのメッセージを検索（全アカウント全文検索） | `Ctrl + K` | `Command + K` |
| クイックフィルター | `Ctrl + Shift + K` | `Command + Shift + K` |
| クイックフィルターを解除 / バーを隠す | `Esc` | `Esc` |
| フォルダー内の詳細検索 | `Ctrl + Shift + F` | `Command + Shift + F` |
| 現在のメッセージ内を検索 | `Ctrl + F` | `Command + F` |
| 次を検索 | `Ctrl + G` または `F3` | `Command + G` または `F3` |
| 前を検索 | `Ctrl + Shift + G` または `Shift + F3` | `Command + Shift + G` または `Shift + F3` |

## 3. Thunderbird 内の移動

### 3.1 メッセージ間の移動

| 操作 | キー |
|---|---|
| メッセージを下へスクロールし、次の未読メッセージへ移動 | `Space` |
| 次のメッセージ | `F`（単独） |
| 前のメッセージ | `B`（単独） |
| 次の未読メッセージ | `N`（単独） |
| 前の未読メッセージ | `P`（単独） |
| 次の未読スレッドへ移動（現在のスレッドを既読にする） | `T`（単独） |
| 次に表示したメッセージへ進む | `]` |
| 前に表示したメッセージへ戻る | `[` |
| メッセージリストの先頭へ移動 | `Home` |
| メッセージリストの末尾へ移動 | `End` |

### 3.2 画面・UI 領域の移動

| 操作 | Windows / Linux | macOS |
|---|---|---|
| 次の UI 要素へ移動 | `Tab` | `Tab` |
| 前の UI 要素へ移動 | `Shift + Tab` | `Shift + Tab` |
| 次のメイン UI 領域へ移動 | `F6` または `Ctrl + F6` | `F6` |
| 前のメイン UI 領域へ移動 | `Shift + F6` または `Ctrl + Shift + F6` | `Shift + F6` |
| 次のタブへ移動 | `Ctrl + Tab` または `Ctrl + Page Down` | `Command + Option + →` |
| 前のタブへ移動 | `Ctrl + Shift + Tab` または `Ctrl + Page Up` | `Command + Option + ←` |
| メール / ニュースグループのホームタブ（タブ 1） | `Ctrl + 1` | `Command + 1` |
| タブ 2～8 へ移動 | `Ctrl + 2` ～ `Ctrl + 8` | `Command + 2` ～ `Command + 8` |
| 最後のタブへ移動 | `Ctrl + 9` | `Command + 9` |
| アドレス帳を開く | `Ctrl + Shift + B` | `Command + Shift + B` |
| 保存したファイルを開く | `Ctrl + J` | `Command + J` |
| ヘルプを開く | `F1` | `Command + ?` |
| 開発ツールを開く | `Ctrl + Shift + I` | `Command + Option + I` |
| メッセージペインの表示 / 非表示 | `F8` | `F8` |
| 隠れているメニューバーを表示 | `Alt` または `F10` | `Control + F2` など OS 設定に依存 |
| コンテキストメニューを表示 | `Menu` キーまたは `Shift + F10` | コンテキストメニューキー / OS・キーボードに依存 |
| ウィンドウ / タブを閉じる | `Ctrl + W`、ウィンドウは `Alt + F4`、タブは `Ctrl + F4` | `Command + W` |
| 閉じたタブを復元 | `Ctrl + Shift + T` | `Command + Shift + T` |
| Thunderbird を終了 | `Ctrl + Q` | `Command + Q` |

**メッセージリストの列の移動**

- 列を右へ移動: Windows / Linux は `Alt + →`、macOS は `Option + →`。
- 列を左へ移動: Windows / Linux は `Alt + ←`、macOS は `Option + ←`。
- この操作はメールタブのテーブルビュー向けで、カードビューには適用されません。公式ページでは macOS で完全には動作しない場合があるとされています。

## 4. メッセージの作成・編集

### 4.1 作成・保存・送信

| 操作 | Windows / Linux | macOS |
|---|---|---|
| 新しいメッセージ | `Ctrl + N` または `Ctrl + M` | `Command + N` |
| 下書きを保存 | `Ctrl + S` | `Command + S` |
| 下書きを印刷 | `Ctrl + P` | `Command + P` |
| 今すぐ送信 | `Ctrl + Enter` | `Command + Return` |
| 後で送信 | `Ctrl + Shift + Enter` | `Command + Shift + Return` |
| 連絡先サイドバーの表示 / 非表示 | `F9`（Windows / Linux のみ） | — |
| 次のメイン UI 要素へ移動 | `F6`、`Ctrl + F6`、`Ctrl + Tab` | `F6` |
| 前のメイン UI 要素へ移動 | `Shift + F6`、`Ctrl + Shift + F6`、`Ctrl + Shift + Tab` | `Shift + F6` |
| 添付ペインの表示切り替え | `Alt + M` または `Ctrl + M` | `Ctrl + M` |
| メインのメールウィンドウを表示 | `Ctrl + 1` | `Command + 1` |

### 4.2 テキスト編集・添付ファイル

| 操作 | Windows / Linux | macOS |
|---|---|---|
| コピー | `Ctrl + C` | `Command + C` |
| 切り取り | `Ctrl + X` | `Command + X` |
| 貼り付け | `Ctrl + V` | `Command + V` |
| 引用文として貼り付け | `Ctrl + Shift + O` | `Command + Shift + O` |
| 書式なしで貼り付け | `Ctrl + Shift + V` | `Command + Shift + V` |
| テキストを再改行 | `Ctrl + R` | `Command + R` |
| 選択したテキスト / 添付ファイルなどを削除 | `Delete` | `Delete` |
| カーソル位置から単語末尾まで削除 | `Ctrl + Delete` | `Control + Delete` |
| カーソル位置から単語先頭まで削除 | `Ctrl + Backspace` | `Option + Delete` |
| すべて選択 | `Ctrl + A` | `Command + A` |
| 表のセルを選択 | `Ctrl` + セル内クリック | `Command` + セル内クリック |
| 表の行 / 列を選択 | 行 / 列のセル上をドラッグ | 同左 |
| 表全体を選択 | `Ctrl` + 表の境界線をクリック | `Command` + 表の境界線をクリック |
| リンクを挿入 | `Ctrl + K` | `Command + K` |
| 選択テキストのリンクを解除 | `Ctrl + Shift + K` | `Command + Shift + K` |
| 名前付きアンカーを削除 | `Ctrl + Shift + R` | `Command + Shift + R` |
| 元に戻す | `Ctrl + Z` | `Command + Z` |
| やり直す | `Ctrl + Y` | `Command + Y` |
| 検索して置換 | `Ctrl + H`（Windows / Linux のみ） | — |
| 次を検索 | `Ctrl + G` または `F3` | `Command + G` または `F3` |
| 前を検索 | `Ctrl + Shift + G` または `Shift + F3` | `Command + Shift + G` または `Shift + F3` |
| スペルチェック | `Ctrl + Shift + P` | `Command + Shift + P` |
| ファイルを添付 | `Ctrl + Shift + A` | `Command + Shift + A` |
| 添付ファイル名を変更 | `F2`（Windows / Linux のみ） | — |
| 添付ファイルの並べ替え | `Alt + X` または `Ctrl + X` | `Ctrl + X` |
| 段落ではなく改行を入力 | `Shift + Enter` | `Shift + Return` |

### 4.3 添付ファイルの並べ替え

| 操作 | Windows / Linux | macOS |
|---|---|---|
| 最初へ移動 | `Alt + Home` | `Command + Option + ↑` |
| 上へ移動 | `Alt + ↑` | `Option + ↑` |
| まとめて移動 | `Alt + ←` | `Option + ←` |
| 下へ移動 | `Alt + ↓` | `Option + ↓` |
| 最後へ移動 | `Alt + End` | `Command + Option + ↓` |
| 添付ファイルをソート | `Alt + Y` | `Alt + Y`（環境依存） |

### 4.4 文字の書式

| 操作 | Windows / Linux | macOS |
|---|---|---|
| 文字サイズを拡大 | `Ctrl + >` または `Ctrl + .` | `Command + >` または `Command + .` |
| 文字サイズを縮小 | `Ctrl + <` または `Ctrl + ,` | `Command + <` または `Command + ,` |
| 太字 | `Ctrl + B` | `Command + B` |
| 斜体 | `Ctrl + I` | `Command + I` |
| 下線 | `Ctrl + U` | `Command + U` |
| 等幅フォント | `Ctrl + T` | `Command + T` |
| テキストのスタイル付けを中止 | `Ctrl + Shift + Y` または `Ctrl + Space` | `Command + Shift + Y` |
| インデントを追加 | `Ctrl + ]` | `Command + ]` |
| インデントを削除 | `Ctrl + [` | `Command + [` |

## 5. アドレス帳

| 操作 | Windows / Linux | macOS |
|---|---|---|
| 新しい連絡先 | `Ctrl + N` | `Command + N` |
| 選択した連絡先にメッセージを作成 | `Ctrl + M` | — |
| アドレス帳のクイックフィルター | `Ctrl + F`（Windows のみ） | — |
| アドレス帳の詳細検索 | `Ctrl + Shift + F` | `Command + Shift + F` |
| 選択した連絡先 / アドレス帳のプロパティを編集 | `Ctrl + I` | `Command + I` |
| すべて選択 | `Ctrl + A` | `Command + A` |
| 選択した連絡先を印刷 | `Ctrl + P` | `Command + P` |
| 削除 | `Delete` | `Delete` |
| メインのメールウィンドウを表示 | `Ctrl + 1` | `Command + 1` |

## 6. カレンダー

### 6.1 基本操作

| 操作 | Windows / Linux | macOS |
|---|---|---|
| Today ペインの表示 / 非表示 | `F11` | `F11` |
| カレンダータブ | `Alt + 3` または `Ctrl + 3` | `Control + 3` |
| ToDo タブ | `Alt + 4` または `Ctrl + 4` | `Control + 4` |
| メール / ニュースグループのホームタブ | `Alt + 1` または `Ctrl + 1` | `Command + 1` |
| 新しい予定 | `Ctrl + I` | `Command + I` |
| 新しい ToDo | `Ctrl + D` | `Command + D` |

### 6.2 カレンダー内の移動・絞り込み

| 操作 | Windows / Linux | macOS |
|---|---|---|
| 現在の絞り込みを解除 | `Esc` | `Esc` |
| 今日に移動 | `Alt + End` | `Option + Fn + →` |
| 次の日 / 週 / 複数週 / 月へ移動 | `]` | `]` |
| 前の日 / 週 / 複数週 / 月へ移動 | `[` | `[` |

### 6.3 ToDo・予定の基本操作

| 操作 | Windows / Linux | macOS |
|---|---|---|
| ToDo を絞り込み | `Ctrl + Shift + K` | `Command + Shift + K` |
| 現在の絞り込みを解除 | `Esc` | `Esc` |
| コピー | `Ctrl + C` | `Command + C` |
| 切り取り | `Ctrl + X` | `Command + X` |
| 貼り付け | `Ctrl + V` | `Command + V` |
| 削除 | `Delete` | `Delete` |
| 元に戻す | `Ctrl + Z` | `Command + Z` |
| やり直す | `Ctrl + Y` | `Command + Y` |
| 印刷 | `Ctrl + P` | `Command + P` |

## 7. その他

| 操作 | Windows / Linux | macOS |
|---|---|---|
| メールスタートページへ移動（フォルダーペインまたはメッセージリストにフォーカスがある場合） | `Alt + Home` | `Option + Fn + ←` |
| 履歴を消去 | `Ctrl + Shift + Delete` | `Command + Shift + Delete` |

## 8. ショートカットの追加・変更

Mozilla の公式ヘルプでは、アドオンによってショートカットキーを追加・変更できると説明されています。一方、ショートカットキーを変更するための標準キーボード設定は、公式ページの記載時点では将来のリリースで対応予定とされています。

## 9. 利用時の注意

1. **フォーカス位置によって動作が変わる**: 同じ `Ctrl + A` でも、メッセージ作成画面では本文の全選択、メッセージリストではメッセージの全選択になります。
2. **利用できるキーが画面によって異なる**: メッセージリスト、メッセージ本文、検索欄、作成画面など、操作対象によって有効なショートカットが異なります。
3. **単独キーのショートカット**: `A`、`F`、`B`、`N` などは、入力欄にフォーカスがある場合など、状況によって期待どおりに動作しないことがあります。
4. **OS・バージョン差**: 同じ機能でも Windows / Linux / macOS でキーが異なる場合があります。実際の環境で確認してください。

## 参考

- [Mozilla サポート: Thunderbird のキーボードショートカット](https://support.mozilla.org/ja/kb/keyboard-shortcuts-tb)
- [Mozilla サポート: 検索機能のキーボードショートカット](https://support.mozilla.org/ja/kb/searching-messages)
