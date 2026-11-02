const params = new URLSearchParams(window.location.search);
const selectedContext = params.get('context') || 'common';
const contextLabel = document.querySelector('#context-label');
const searchInput = document.querySelector('#shortcut-search');
const shortcutList = document.querySelector('#shortcut-list');

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

  contextLabel.textContent = `現在のコンテキスト: ${contextInfo.title}`;
  renderGroups(contextInfo, data);
}

function renderGroups(contextInfo, data) {
  const groups = [];

  if (contextInfo && contextInfo.title) {
    groups.push({ title: contextInfo.title, items: contextInfo.shortcuts || [] });
  }

  const commonGroup = data.common;
  if (commonGroup && selectedContext !== 'common') {
    groups.push({ title: commonGroup.title, items: commonGroup.shortcuts || [] });
  }

  const currentGroups = groups.filter((group) => group.items.length > 0);

  if (currentGroups.length === 0) {
    shortcutList.innerHTML = '<div class="empty-state">該当するショートカットはありません。</div>';
    return;
  }

  const html = currentGroups.map((group) => {
    const items = group.items.map((item) => {
      return `
        <li class="shortcut-item">
          <span class="key">${escapeHtml(item.key)}</span>
          <span class="description">${escapeHtml(item.description)}</span>
        </li>
      `;
    }).join('');

    return `
      <section class="group" aria-label="${escapeHtml(group.title)}">
        <h2>${escapeHtml(group.title)}</h2>
        <ul class="shortcut-items">${items}</ul>
      </section>
    `;
  }).join('');

  shortcutList.innerHTML = html;
  applyFilter();
}

function applyFilter() {
  const query = searchInput.value.trim().toLowerCase();
  const groups = Array.from(document.querySelectorAll('.group'));

  groups.forEach((group) => {
    const items = group.querySelectorAll('.shortcut-item');
    let visibleCount = 0;

    items.forEach((item) => {
      const text = item.textContent.toLowerCase();
      const shouldShow = !query || text.includes(query);
      item.hidden = !shouldShow;
      if (shouldShow) visibleCount += 1;
    });

    group.hidden = visibleCount === 0;
  });

  const visibleGroups = groups.filter((group) => !group.hidden);
  if (visibleGroups.length === 0) {
    shortcutList.innerHTML = '<div class="empty-state">該当するショートカットはありません。</div>';
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    window.close();
  }
});

searchInput.addEventListener('input', applyFilter);
loadData();
