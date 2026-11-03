const params = new URLSearchParams(window.location.search);
const selectedContext = params.get('context') || 'common';
const searchInput = document.querySelector('#shortcut-search');
const shortcutList = document.querySelector('#shortcut-list');
let originalHtml = ''; // Store original HTML to restore after search

// Language detection
const userLanguage = navigator.language.split('-')[0]; // Get base language (e.g., 'ja', 'en')
const supportedLanguages = ['ja', 'en'];
const currentLanguage = supportedLanguages.includes(userLanguage) ? userLanguage : 'en';

// Helper function to get translated text
function getText(translations, fallback = '') {
  if (!translations) return fallback;
  return translations[currentLanguage] || translations['en'] || Object.values(translations)[0] || fallback;
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function loadData() {
  const response = await fetch(browser.runtime.getURL('data/shortcuts.json'));
  const data = await response.json();
  const contextInfo = data[selectedContext] || data.common;

  renderGroups(contextInfo, data);
}

function renderGroups(contextInfo, data) {
  const groups = [];

  if (contextInfo && contextInfo.titles) {
    groups.push({ titles: contextInfo.titles, items: contextInfo.shortcuts || [] });
  }

  const commonGroup = data.common;
  if (commonGroup && selectedContext !== 'common') {
    groups.push({ titles: commonGroup.titles, items: commonGroup.shortcuts || [] });
  }

  const currentGroups = groups.filter((group) => group.items.length > 0);

  if (currentGroups.length === 0) {
    const emptyMessage = currentLanguage === 'ja' ? '該当するショートカットはありません。' : 'No shortcuts found.';
    shortcutList.innerHTML = `<div class="empty-state">${emptyMessage}</div>`;
    originalHtml = '';
    return;
  }

  const html = currentGroups.map((group) => {
    const groupTitle = getText(group.titles, 'Shortcuts');

    const items = group.items.map((item) => {
      const description = getText(item.descriptions, item.description || '');
      const section = getText(item.sections, item.section || '');
      return `
        <li class="shortcut-item">
          <span class="key">${escapeHtml(item.key)}</span>
          <span class="description">${escapeHtml(description)}</span>
        </li>
      `;
    }).join('');

    return `
      <section class="group" aria-label="${escapeHtml(groupTitle)}">
        <h2>${escapeHtml(groupTitle)}</h2>
        <ul class="shortcut-items">${items}</ul>
      </section>
    `;
  }).join('');

  shortcutList.innerHTML = html;
  originalHtml = html; // Save original HTML
  applyFilter();
}

function applyFilter() {
  const query = searchInput.value.trim().toLowerCase();

  if (query === '') {
    // No search query: restore original HTML
    if (originalHtml) {
      shortcutList.innerHTML = originalHtml;
    }
    return;
  }

  // Restore original HTML if it was replaced with empty-state
  if (!shortcutList.querySelector('.group')) {
    if (originalHtml) {
      shortcutList.innerHTML = originalHtml;
    }
  }

  // Filter groups and items
  const groups = Array.from(document.querySelectorAll('.group'));
  let hasVisibleItems = false;

  groups.forEach((group) => {
    const items = group.querySelectorAll('.shortcut-item');
    let visibleCount = 0;

    items.forEach((item) => {
      const text = item.textContent.toLowerCase();
      const shouldShow = text.includes(query);
      item.style.display = shouldShow ? '' : 'none';
      if (shouldShow) visibleCount += 1;
    });

    if (visibleCount > 0) {
      group.style.display = '';
      hasVisibleItems = true;
    } else {
      group.style.display = 'none';
    }
  });

  // Show empty state if no results
  if (!hasVisibleItems) {
    const noResultsMessage = currentLanguage === 'ja' ? '検索結果がありません。' : 'No results found.';
    shortcutList.innerHTML = `<div class="empty-state">${noResultsMessage}</div>`;
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    window.close();
  }
});

searchInput.addEventListener('input', applyFilter);

// Initialize UI text based on current language
function initializeUIText() {
  const dialogTitle = document.querySelector('#dialog-title');
  const searchLabel = document.querySelector('.search-label');
  const searchInput = document.querySelector('#shortcut-search');

  if (currentLanguage === 'ja') {
    dialogTitle.textContent = 'Thunderbird ショートカット';
    searchLabel.textContent = 'ショートカットを検索';
    searchInput.placeholder = '例: 返信';
    searchInput.setAttribute('aria-label', 'ショートカットを検索');
    document.documentElement.lang = 'ja';
  } else {
    dialogTitle.textContent = 'Thunderbird Shortcuts';
    searchLabel.textContent = 'Search shortcuts';
    searchInput.placeholder = 'e.g., Reply';
    searchInput.setAttribute('aria-label', 'Search shortcuts');
    document.documentElement.lang = 'en';
  }
}

initializeUIText();
loadData();
