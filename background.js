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
    const title = activeTab.title || '';

    console.log('ContextKeys: detectContext', {
      url,
      title,
      windowType: currentWindow.type,
      tabTitle: activeTab.title,
      tabUrl: activeTab.url
    });

    // タイトルベースの判定（優先度高）
    const titleLower = title.toLowerCase();

    // カレンダー
    if (titleLower.includes('calendar') || title.includes('カレンダー') || url.includes('about:calendar')) {
      console.log('ContextKeys: detected calendar context');
      return 'calendar';
    }

    // タスク/ToDo（タイトルで最初に判定）
    if (titleLower.includes('todo') || titleLower.includes('task') ||
        title.includes('タスク') || title.includes('やること') ||
        url.includes('about:tasks')) {
      console.log('ContextKeys: detected tasks context');
      return 'tasks';
    }

    // アドレス帳
    if (titleLower.includes('addressbook') || title.includes('アドレス帳') || url.includes('addressbook')) {
      console.log('ContextKeys: detected address-book context');
      return 'address-book';
    }

    // メール一覧・表示: プロトコルベースの判定
    if (/^(mailbox|imap|nntp|pop|news|message):\/\//i.test(url)) {
      console.log('ContextKeys: detected mail context (protocol)');
      return 'mail';
    }

    // メール作成: compose URL または popup ウィンドウ
    if (url.includes('compose') || currentWindow.type === 'popup') {
      console.log('ContextKeys: detected mail context (compose/popup)');
      return 'mail';
    }

    // 空のURLで、タイトルが "受信トレイ" など メール関連の場合
    if (url === '' && (title.includes('受信トレイ') || title.includes('フォルダー') ||
        titleLower.includes('inbox') || titleLower.includes('mail'))) {
      console.log('ContextKeys: detected mail context (empty url + title)');
      return 'mail';
    }

    console.log('ContextKeys: detected common context');
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
