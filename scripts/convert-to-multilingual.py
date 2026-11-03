#!/usr/bin/env python3
"""
Convert shortcuts.json from single language (Japanese) to multilingual format.
Generates Japanese descriptions and English translations.
"""

import json
import sys

# Translations dictionary
TRANSLATIONS = {
    # Common titles
    "共通": {"en": "Common", "ja": "共通"},
    "メール": {"en": "Mail", "ja": "メール"},
    "アドレス帳": {"en": "Address Book", "ja": "アドレス帳"},
    "カレンダー": {"en": "Calendar", "ja": "カレンダー"},
    "タスク": {"en": "Tasks", "ja": "タスク"},

    # Sections - Common
    "共通": {"en": "Common", "ja": "共通"},
    "検索": {"en": "Search", "ja": "検索"},
    "タブ": {"en": "Tabs", "ja": "タブ"},

    # Sections - Mail
    "作成": {"en": "Compose", "ja": "作成"},
    "移動": {"en": "Navigation", "ja": "移動"},
    "表示": {"en": "View", "ja": "表示"},
    "操作": {"en": "Operations", "ja": "操作"},
    "管理": {"en": "Management", "ja": "管理"},
    "返信": {"en": "Reply", "ja": "返信"},
    "マーク": {"en": "Marking", "ja": "マーク"},
    "ニュース": {"en": "News", "ja": "ニュース"},
    "選択": {"en": "Selection", "ja": "選択"},
    "編集": {"en": "Edit", "ja": "編集"},
    "書式": {"en": "Format", "ja": "書式"},

    # Descriptions - Common
    "新規作成": {"en": "New message", "ja": "新規作成"},
    "全文検索": {"en": "Full-text search", "ja": "全文検索"},
    "検索": {"en": "Search", "ja": "検索"},
    "詳細検索": {"en": "Advanced search", "ja": "詳細検索"},
    "次を検索": {"en": "Find next", "ja": "次を検索"},
    "前を検索": {"en": "Find previous", "ja": "前を検索"},
    "検索繰り返し": {"en": "Find again", "ja": "検索繰り返し"},
    "次の領域": {"en": "Next pane", "ja": "次の領域"},
    "前の領域": {"en": "Previous pane", "ja": "前の領域"},
    "次のタブ": {"en": "Next tab", "ja": "次のタブ"},
    "前のタブ": {"en": "Previous tab", "ja": "前のタブ"},
    "メールタブ": {"en": "Mail tab", "ja": "メールタブ"},
    "タブ2": {"en": "Tab 2", "ja": "タブ2"},
    "カレンダータブ": {"en": "Calendar tab", "ja": "カレンダータブ"},
    "ToDoタブ": {"en": "Task tab", "ja": "ToDoタブ"},
    "最後のタブ": {"en": "Last tab", "ja": "最後のタブ"},
    "閉じる": {"en": "Close", "ja": "閉じる"},
    "受信": {"en": "Get mail", "ja": "受信"},

    # Descriptions - Mail
    "新規メッセージ": {"en": "New message", "ja": "新規メッセージ"},
    "移動": {"en": "Move", "ja": "移動"},
    "次のメッセージ": {"en": "Next message", "ja": "次のメッセージ"},
    "前のメッセージ": {"en": "Previous message", "ja": "前のメッセージ"},
    "次の未読": {"en": "Next unread", "ja": "次の未読"},
    "前の未読": {"en": "Previous unread", "ja": "前の未読"},
    "次のスレッド": {"en": "Next thread", "ja": "次のスレッド"},
    "先頭へ": {"en": "Home", "ja": "先頭へ"},
    "末尾へ": {"en": "End", "ja": "末尾へ"},
    "スクロール": {"en": "Scroll", "ja": "スクロール"},
    "スレッド展開": {"en": "Expand thread", "ja": "スレッド展開"},
    "スレッド折りたたみ": {"en": "Collapse thread", "ja": "スレッド折りたたみ"},
    "すべて展開": {"en": "Expand all", "ja": "すべて展開"},
    "すべて折りたたみ": {"en": "Collapse all", "ja": "すべて折りたたみ"},
    "メッセージを開く": {"en": "Open message", "ja": "メッセージを開く"},
    "スレッドを開く": {"en": "Open thread", "ja": "スレッドを開く"},
    "メッセージ開く": {"en": "Open", "ja": "メッセージ開く"},
    "削除": {"en": "Delete", "ja": "削除"},
    "完全削除": {"en": "Permanently delete", "ja": "完全削除"},
    "フォルダ移動": {"en": "Move to folder", "ja": "フォルダ移動"},
    "保存": {"en": "Save", "ja": "保存"},
    "印刷": {"en": "Print", "ja": "印刷"},
    "ソース表示": {"en": "View source", "ja": "ソース表示"},
    "返信": {"en": "Reply", "ja": "返信"},
    "全員返信": {"en": "Reply to all", "ja": "全員返信"},
    "転送": {"en": "Forward", "ja": "転送"},
    "返信（表示）": {"en": "Reply (view)", "ja": "返信（表示）"},
    "全員返信（表示）": {"en": "Reply to all (view)", "ja": "全員返信（表示）"},
    "転送（表示）": {"en": "Forward (view)", "ja": "転送（表示）"},
    "編集": {"en": "Edit", "ja": "編集"},
    "送信": {"en": "Send", "ja": "送信"},
    "後で送信": {"en": "Send later", "ja": "後で送信"},
    "添付": {"en": "Attach", "ja": "添付"},
    "検索置換": {"en": "Find and replace", "ja": "検索置換"},
    "スペルチェック": {"en": "Spell check", "ja": "スペルチェック"},
    "既読切替": {"en": "Toggle read", "ja": "既読切替"},
    "スレッド既読": {"en": "Mark thread read", "ja": "スレッド既読"},
    "すべて既読": {"en": "Mark all read", "ja": "すべて既読"},
    "スター": {"en": "Star", "ja": "スター"},
    "タグ付け": {"en": "Tag", "ja": "タグ付け"},
    "タグ削除": {"en": "Remove tags", "ja": "タグ削除"},
    "迷惑メール": {"en": "Mark as spam", "ja": "迷惑メール"},
    "迷惑解除": {"en": "Mark as not spam", "ja": "迷惑解除"},
    "スレッド無視": {"en": "Ignore thread", "ja": "スレッド無視"},
    "サブスレッド無視": {"en": "Ignore subthread", "ja": "サブスレッド無視"},
    "注目対象": {"en": "Watch thread", "ja": "注目対象"},
    "フィルター": {"en": "Filter", "ja": "フィルター"},
    "選択": {"en": "Select", "ja": "選択"},
    "スレッド選択": {"en": "Select thread", "ja": "スレッド選択"},
    "コピー": {"en": "Copy", "ja": "コピー"},
    "切り取り": {"en": "Cut", "ja": "切り取り"},
    "貼付": {"en": "Paste", "ja": "貼付"},
    "元に戻す": {"en": "Undo", "ja": "元に戻す"},
    "やり直す": {"en": "Redo", "ja": "やり直す"},
    "等幅フォント": {"en": "Monospace font", "ja": "等幅フォント"},
    "太字": {"en": "Bold", "ja": "太字"},
    "斜体": {"en": "Italic", "ja": "斜体"},
    "下線": {"en": "Underline", "ja": "下線"},
    "インデント+": {"en": "Increase indent", "ja": "インデント+"},
    "インデント-": {"en": "Decrease indent", "ja": "インデント-"},
    "リンク": {"en": "Link", "ja": "リンク"},
    "スタイル中止": {"en": "Clear style", "ja": "スタイル中止"},
    "改行": {"en": "Line break", "ja": "改行"},

    # Descriptions - Address Book
    "アドレス帳を開く": {"en": "Open address book", "ja": "アドレス帳を開く"},
    "新規連絡先": {"en": "New contact", "ja": "新規連絡先"},
    "メッセージ作成": {"en": "Compose message", "ja": "メッセージ作成"},
    "プロパティ編集": {"en": "Edit properties", "ja": "プロパティ編集"},
    "すべて選択": {"en": "Select all", "ja": "すべて選択"},
    "クイック検索": {"en": "Quick search", "ja": "クイック検索"},
    "次/前フィールド": {"en": "Next/Previous field", "ja": "次/前フィールド"},

    # Descriptions - Calendar
    "新規イベント": {"en": "New event", "ja": "新規イベント"},
    "新規タスク": {"en": "New task", "ja": "新規タスク"},
    "日付移動": {"en": "Navigate date", "ja": "日付移動"},
    "期間移動": {"en": "Navigate period", "ja": "期間移動"},
    "前/次の月": {"en": "Previous/Next month", "ja": "前/次の月"},
    "前/次の日/週/月": {"en": "Previous/Next day/week/month", "ja": "前/次の日/週/月"},
    "今日に移動": {"en": "Go to today", "ja": "今日に移動"},
    "日ビュー": {"en": "Day view", "ja": "日ビュー"},
    "週ビュー": {"en": "Week view", "ja": "週ビュー"},
    "月ビュー": {"en": "Month view", "ja": "月ビュー"},
    "リストビュー": {"en": "List view", "ja": "リストビュー"},
    "詳細表示": {"en": "Show details", "ja": "詳細表示"},
    "イベント編集": {"en": "Edit event", "ja": "イベント編集"},
    "ToDo 絞り込み": {"en": "Filter tasks", "ja": "ToDo 絞り込み"},
    "絞り込み解除": {"en": "Clear filter", "ja": "絞り込み解除"},
    "次/前イベント": {"en": "Next/Previous event", "ja": "次/前イベント"},
}

def convert_shortcuts_to_multilingual(input_file):
    """Convert single-language shortcuts.json to multilingual format."""

    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    new_data = {}

    for context, context_data in data.items():
        new_context = {}

        # Convert title
        old_title = context_data.get('title', '')
        new_context['titles'] = {
            'ja': old_title,
            'en': TRANSLATIONS.get(old_title, {}).get('en', old_title)
        }

        # Convert shortcuts
        new_shortcuts = []
        for shortcut in context_data.get('shortcuts', []):
            new_shortcut = {
                'key': shortcut['key'],
                'descriptions': {
                    'ja': shortcut['description'],
                    'en': TRANSLATIONS.get(shortcut['description'], {}).get('en', shortcut['description'])
                },
                'sections': {
                    'ja': shortcut['section'],
                    'en': TRANSLATIONS.get(shortcut['section'], {}).get('en', shortcut['section'])
                }
            }
            new_shortcuts.append(new_shortcut)

        new_context['shortcuts'] = new_shortcuts
        new_data[context] = new_context

    return new_data

if __name__ == '__main__':
    input_file = sys.argv[1] if len(sys.argv) > 1 else 'data/shortcuts.json'
    output_file = sys.argv[2] if len(sys.argv) > 2 else 'data/shortcuts.json'

    print(f"Converting {input_file}...")
    new_data = convert_shortcuts_to_multilingual(input_file)

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(new_data, f, ensure_ascii=False, indent=2)

    print(f"✅ Conversion complete! Saved to {output_file}")
    print(f"   Contexts: {len(new_data)}")
    total_shortcuts = sum(len(ctx.get('shortcuts', [])) for ctx in new_data.values())
    print(f"   Total shortcuts: {total_shortcuts}")
