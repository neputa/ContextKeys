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

    // メール関連（一覧、表示、作成）をすべて「mail」に統合
    // メール作成: popup ウィンドウ、compose URL、空 URL
    if (currentWindow.type === 'popup' || url.includes('compose') || url === '') {
      return 'mail';
    }

    // メール一覧・表示: mailbox、imap、message など
    if (/^(mailbox|imap|nntp|pop|news|message):\/\//i.test(url) || /message|thread|mail/.test(url)) {
      return 'mail';
    }

    // アドレス帳
    if (url.includes('addressbook')) {
      return 'address-book';
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
