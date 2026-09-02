/* ──────────────────────────────────────────────────────────
   site.js — nav behaviour, scroll reveal, and JSON-driven
   rendering for the project cards (index) and project
   sections (projects.html).
────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  /* Reveal animations are gated on html.js so the page stays fully
     readable if this script never runs. */
  document.documentElement.classList.add('js');

  /* ── nav ───────────────────────────────────────────────── */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('is-stuck', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    var toggle = nav.querySelector('.nav__toggle');
    var links = nav.querySelector('.nav__links');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        var open = links.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(open));
      });
      links.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
          links.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  /* ── scroll reveal ─────────────────────────────────────── */
  function observeReveals(root) {
    var els = (root || document).querySelectorAll('[data-reveal]:not(.is-in)');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });

    /* Safety net: if the observer never fires (background tab, print,
       an engine that throttles it), nothing should stay invisible. */
    setTimeout(function () {
      els.forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight * 1.5) {
          el.classList.add('is-in');
        }
      });
    }, 2500);
  }

  /* ── small helpers ─────────────────────────────────────── */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function tagRow(tags, cls) {
    var row = el('div', cls);
    (tags || []).forEach(function (t) { row.appendChild(el('span', 'tag', t)); });
    return row;
  }

  function galleryFor(items) {
    var g = el('div', 'gallery');
    (items || []).forEach(function (it) {
      var fig = el('figure');
      var img = el('img');
      img.src = it.src;
      img.alt = it.cap || '';
      img.loading = 'lazy';
      img.decoding = 'async';
      fig.appendChild(img);
      if (it.cap) fig.appendChild(el('figcaption', null, it.cap));
      g.appendChild(fig);
    });
    return g;
  }

  /* ── index: project cards ──────────────────────────────── */
  function renderCards(host, projects) {
    var frag = document.createDocumentFragment();
    projects.filter(function (p) { return p.featured; }).forEach(function (p, i) {
      var a = el('a', 'card');
      a.href = '/projects#' + p.id;
      a.setAttribute('data-reveal', '');
      a.style.setProperty('--reveal-delay', (i * 60) + 'ms');

      var img = el('img', 'card__img');
      img.src = p.card;
      img.alt = p.title;
      img.loading = 'lazy';
      img.decoding = 'async';
      a.appendChild(img);

      var body = el('div', 'card__body');
      body.appendChild(el('p', 'card__org mono', p.org.split('—')[0].trim()));
      body.appendChild(el('h3', 'card__title', p.title));
      body.appendChild(el('p', 'card__desc', p.summary));
      body.appendChild(tagRow((p.tags || []).slice(0, 3), 'card__tags'));

      body.appendChild(el('p', 'card__go mono', 'View project →'));

      a.appendChild(body);
      frag.appendChild(a);
    });
    host.appendChild(frag);
    observeReveals(host);
  }

  /* ── projects page: full sections ──────────────────────── */
  function renderProjects(host, projects) {
    var frag = document.createDocumentFragment();

    projects.forEach(function (p) {
      var sec = el('section', 'proj');
      sec.id = p.id;

      var wrap = el('div', 'wrap');

      var head = el('div', 'proj__head');
      head.setAttribute('data-reveal', '');
      head.appendChild(el('p', 'proj__org mono', p.org + (p.when ? '  ·  ' + p.when : '')));
      head.appendChild(el('h2', 'proj__title', p.title));
      head.appendChild(el('p', 'proj__sub', p.summary));
      head.appendChild(tagRow(p.tags, 'proj__tags'));
      wrap.appendChild(head);

      var grid = el('div', 'proj__grid');

      var left = el('div');
      left.setAttribute('data-reveal', '');
      var pts = el('ul', 'proj__points');
      (p.points || []).forEach(function (pt) {
        var li = el('li');
        li.appendChild(el('strong', null, pt.lead + ' — '));
        li.appendChild(document.createTextNode(pt.text));
        pts.appendChild(li);
      });
      left.appendChild(pts);

      if (p.specs && p.specs.length) {
        var dl = el('dl', 'specs');
        p.specs.forEach(function (row) {
          var d = el('div');
          d.appendChild(el('dt', null, row[0]));
          d.appendChild(el('dd', null, row[1]));
          dl.appendChild(d);
        });
        left.appendChild(dl);
      }

      if (p.note) {
        var note = el('p', 'mono');
        note.style.marginTop = '1.5rem';
        note.style.color = 'var(--fg-dim)';
        note.style.letterSpacing = '0.06em';
        note.textContent = p.note;
        left.appendChild(note);
      }

      grid.appendChild(left);

      if (p.gallery && p.gallery.length) {
        var right = el('div', 'proj__media');
        right.setAttribute('data-reveal', '');
        right.style.setProperty('--reveal-delay', '90ms');
        right.appendChild(galleryFor(p.gallery));
        grid.appendChild(right);
      } else {
        grid.classList.add('proj__grid--single');
      }

      wrap.appendChild(grid);
      sec.appendChild(wrap);
      frag.appendChild(sec);
    });

    host.appendChild(frag);
    observeReveals(host);

    /* honour a #hash that pointed at a section we only just built */
    if (location.hash) {
      var target = document.getElementById(location.hash.slice(1));
      if (target) {
        setTimeout(function () {
          target.scrollIntoView({ behavior: 'auto', block: 'start' });
        }, 0);
      }
    }
  }

  /* ── boot ──────────────────────────────────────────────── */
  observeReveals(document);

  var cardHost = document.querySelector('[data-project-cards]');
  var projHost = document.querySelector('[data-project-sections]');

  if (cardHost || projHost) {
    fetch('projects.json', { cache: 'no-cache' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) {
        var projects = data.projects || [];
        if (cardHost) renderCards(cardHost, projects);
        if (projHost) renderProjects(projHost, projects);
      })
      .catch(function (err) {
        console.error('[site] could not load projects.json', err);
        var host = projHost || cardHost;
        if (!host) return;
        var msg = el('p', 'mono');
        msg.style.color = 'var(--fg-dim)';
        msg.textContent =
          'Project data could not be loaded. If you opened this file directly, ' +
          'run a local server instead (see README).';
        host.appendChild(msg);
      });
  }

  /* year stamp in the footer */
  document.querySelectorAll('[data-year]').forEach(function (n) {
    n.textContent = String(new Date().getFullYear());
  });
})();
