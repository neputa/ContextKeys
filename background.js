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
    // 1. アクティブ（最後にフォーカスされた）ウィンドウを取得
    // これにより、別ウィンドウで開かれたメール作成画面でも
    // 正しくそのウィンドウ情報を取得できる
    const currentWindow = await browser.windows.getLastFocused();
    console.log('ContextKeys: lastFocused window type:', currentWindow.type);

    // 2. そのウィンドウのアクティブタブを取得
    const tabs = await browser.tabs.query({ 
      active: true, 
      windowId: currentWindow.id 
    });
    
    const activeTab = tabs[0] || {};
    const url = activeTab.url || '';
    const tabType = activeTab.type || '';

    console.log('ContextKeys: detected URL:', url);
    console.log('ContextKeys: tab type:', tabType);

    // 3. メール作成画面の判定（最優先）
    // ウィンドウ type が 'popup' → メール作成ウィンドウ
    if (currentWindow.type === 'popup') {
      console.log('ContextKeys: context = message-compose (popup window)');
      return 'message-compose';
    }

    // URL に compose が含まれる場合
    if (url.includes('compose')) {
      console.log('ContextKeys: context = message-compose (URL contains compose)');
      return 'message-compose';
    }

    // URL が空で tabType も空 → 新規メール作成時の可能性
    if (url === '' && tabType === '') {
      console.log('ContextKeys: context = message-compose (empty URL/type)');
      return 'message-compose';
    }

    // 4. メッセージ表示画面
    if (url.startsWith('message://') || /displayMessage|messagePane/.test(url)) {
      console.log('ContextKeys: context = message-view');
      return 'message-view';
    }

    // 5. メール一覧
    if (/^(mailbox|imap|nntp|pop|news):\/\//i.test(url) || /message|thread|mail/.test(url)) {
      console.log('ContextKeys: context = mail-list');
      return 'mail-list';
    }

    // 6. アドレス帳
    if (url.includes('addressbook')) {
      console.log('ContextKeys: context = address-book');
      return 'address-book';
    }

    console.log('ContextKeys: context = common (fallback)');
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
