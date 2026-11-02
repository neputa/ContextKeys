const shortcutDataUrl = browser.runtime.getURL('data/shortcuts.json');

async function readShortcutData() {
  const response = await fetch(shortcutDataUrl);
  if (!response.ok) {
    throw new Error('Failed to load shortcut data');
  }

  return response.json();
}

async function detectContext() {
  try {
    // 最後にフォーカスされたウィンドウを取得
    const currentWindow = await browser.windows.getLastFocused();

    // そのウィンドウのアクティブタブを取得
    const tabs = await browser.tabs.query({
      active: true,
      windowId: currentWindow.id
    });

    const activeTab = tabs[0] || {};
    const url = activeTab.url || '';

    console.log('ContextKeys: detected URL:', url);

    // カレンダー（最初にチェック）
    if (url.includes('about:calendar')) {
      return 'calendar';
    }

    // タスク（次にチェック）
    if (url.includes('about:tasks')) {
      return 'tasks';
    }

    // アドレス帳
    if (url.includes('addressbook')) {
      return 'address-book';
    }

    // メール一覧・表示: プロトコルベースの判定のみ
    if (/^(mailbox|imap|nntp|pop|news|message):\/\//i.test(url)) {
      return 'mail';
    }

    // メール作成: popup ウィンドウ、compose URL、空 URL
    if (currentWindow.type === 'popup' || url.includes('compose') || url === '') {
      return 'mail';
    }

    return 'common';
  } catch (error) {
    console.error('ContextKeys: detectContext error:', error);
    return 'common';
  }
}

async function openShortcutDialog() {
  try {
    const context = await detectContext();
    const url = browser.runtime.getURL(`shortcut-dialog.html?context=${encodeURIComponent(context)}`);

    await browser.windows.create({
      type: 'popup',
      url,
      width: 720,
      height: 760,
    });
  } catch (error) {
    console.error('ContextKeys: failed to open dialog', error);
  }
}

browser.commands.onCommand.addListener((command) => {
  if (command === 'show-shortcuts') {
    openShortcutDialog();
  }
});

browser.runtime.onInstalled.addListener(() => {
  console.log('ContextKeys installed');
});
