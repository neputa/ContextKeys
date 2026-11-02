const shortcutDataUrl = browser.runtime.getURL('data/shortcuts.json');

async function readShortcutData() {
  const response = await fetch(shortcutDataUrl);
  if (!response.ok) {
    throw new Error('Failed to load shortcut data');
  }

  return response.json();
}

async function detectContext() {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  const activeTab = tabs[0] || {};
  const url = activeTab.url || '';
  const tabType = activeTab.type || '';

  // メール作成画面: 新しいウィンドウまたはタイプが特定できない場合
  if (url.includes('compose.html') || (tabType === '' && url === '')) {
    return 'message-compose';
  }

  // メッセージ表示画面: message:// URL または specific tab indicators
  if (url.startsWith('message://') || /displayMessage|messagePane/.test(url)) {
    return 'message-view';
  }

  // メール一覧: mailbox://, imap://, nntp:// など
  if (/^(mailbox|imap|nntp|pop|news):\/\//i.test(url) || /message|thread|mail/.test(url)) {
    return 'mail-list';
  }

  // アドレス帳
  if (url.includes('addressbook')) {
    return 'address-book';
  }

  return 'common';
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
