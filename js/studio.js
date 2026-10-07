(() => {
  'use strict';
  document.documentElement.classList.add('enhanced');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav?.addEventListener('click', event => {
    if (!event.target.closest('a')) return;
    menu?.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav?.classList.contains('is-open')) {
      nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); menu.focus();
    }
  });

  const cases = [...document.querySelectorAll('.case')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  function applyFilter(category) {
    let count = 0;
    cases.forEach(item => {
      const visible = category === 'all' || item.dataset.category === category;
      item.hidden = !visible; if (visible) count++;
    });
    filters.forEach(item => {
      const active = item.dataset.filter === category;
      item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active));
    });
    const countNode = document.querySelector('#project-count');
    if (countNode) countNode.textContent = `${count} engineering project${count === 1 ? '' : 's'}`;
  }
  filters.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter)));
  let hashFrame;
  function revealHash() {
    cancelAnimationFrame(hashFrame);
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    const project = target?.closest('.case');
    if (project) {
      applyFilter('all');
      project.querySelector('.case-details').open = true;
      for (let parent = target.parentElement; parent && parent !== project; parent = parent.parentElement) {
        if (parent.tagName === 'DETAILS') parent.open = true;
      }
    }
    hashFrame = requestAnimationFrame(() => target.scrollIntoView({ block: 'start', behavior: 'instant' }));
  }
  window.addEventListener('hashchange', revealHash);
  revealHash();

  const dialog = document.querySelector('.image-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    document.querySelectorAll('.zoom-image').forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        const img = dialog.querySelector('img');
        img.src = link.href;
        img.alt = link.querySelector('img')?.alt || link.dataset.caption || '';
        const caption = dialog.querySelector('p');
        caption.textContent = link.dataset.caption || '';
        caption.hidden = !caption.textContent;
        dialog.showModal();
      });
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    });
  }
})();
