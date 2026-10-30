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

  if (/message|thread|mail/.test(url)) {
    return 'mail-list';
  }

  return 'common';
}

async function openShortcutDialog() {
  try {
    const context = await detectContext();

    if (typeof browser.browserAction?.openPopup === 'function') {
      browser.browserAction.openPopup();
      return;
    }

    await readShortcutData();
    const url = browser.runtime.getURL(`shortcut-dialog.html?context=${encodeURIComponent(context)}`);

    await browser.windows.create({
      type: 'popup',
      url,
      width: 520,
      height: 620,
      focused: true,
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
