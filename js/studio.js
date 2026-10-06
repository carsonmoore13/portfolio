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

  const benchViews = {
    cad: { src: '/images/hub-cad-render.jpg', alt: 'Rear wheel hub and bearing CAD assembly', caption: 'Rear hub and bearing assembly' },
    fea: { src: '/images/hub-fea.jpg', alt: 'Ansys finite element analysis of the rear wheel hub', caption: 'Hub structural analysis in Ansys' }
  };
  document.querySelectorAll('[data-bench]').forEach(button => {
    button.addEventListener('click', () => {
      const view = benchViews[button.dataset.bench];
      const img = document.querySelector('#bench-image');
      img.src = view.src; img.alt = view.alt;
      img.parentElement.classList.toggle('analysis', button.dataset.bench === 'fea');
      document.querySelector('#bench-caption').textContent = view.caption;
      document.querySelectorAll('[data-bench]').forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active));
      });
    });
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
    if (countNode) countNode.textContent = `${count} PROJECT${count === 1 ? '' : 'S'}`;
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
        img.src = link.href; img.alt = link.dataset.caption;
        dialog.querySelector('p').textContent = link.dataset.caption;
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
