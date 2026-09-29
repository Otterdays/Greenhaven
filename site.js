(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- nav ----
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var header = document.getElementById('header');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // ---- stars (page heads) and drifting motes (hero) ----
  function seed(el, n, opts) {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < n; i++) {
      var s = document.createElement('i');
      s.style.left = (Math.random() * 100) + '%';
      s.style.top = (Math.random() * opts.spread) + '%';
      s.style.setProperty('--t', (opts.tMin + Math.random() * opts.tVar).toFixed(1) + 's');
      s.style.setProperty('--d', (-Math.random() * opts.tMax).toFixed(1) + 's');
      if (opts.dx) s.style.setProperty('--dx', ((Math.random() * 90 - 45) | 0) + 'px');
      if (opts.big && Math.random() < .2) { s.style.width = s.style.height = '3px'; }
      frag.appendChild(s);
    }
    el.appendChild(frag);
  }
  var stars = document.getElementById('stars');
  if (stars) seed(stars, 70, { spread: 70, tMin: 3, tVar: 5, tMax: 6, big: true });
  var motes = document.getElementById('motes');
  if (motes && !reduce) seed(motes, 16, { spread: 85, tMin: 10, tVar: 9, tMax: 19, dx: true });

  // ---- tile spotlight ----
  document.querySelectorAll('.tile').forEach(function (tile) {
    tile.addEventListener('pointermove', function (e) {
      var r = tile.getBoundingClientRect();
      tile.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      tile.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    });
  });

  // ---- live world status ----
  // Point this at an HTTP(S) JSON endpoint shaped like {"1":"online","2":"online","3":"offline"}.
  // Hostnames never appear in the page; leave empty to show "status in game".
  var STATUS_URL = '';
  var LABELS = { online: 'Online', offline: 'Offline', unknown: 'Status in game' };
  var statusEls = document.querySelectorAll('[data-world]');
  function paint(states) {
    statusEls.forEach(function (el) {
      var st = states[el.getAttribute('data-world')] || 'unknown';
      if (st !== 'online' && st !== 'offline') st = 'unknown';
      var target = el.classList.contains('world') ? el.querySelector('.live-pill') : el;
      if (!target) return;
      target.setAttribute('data-state', st);
      var b = target.querySelector('b');
      if (b) b.textContent = LABELS[st];
    });
  }
  function poll() {
    if (!STATUS_URL || !window.fetch) { paint({}); return; }
    fetch(STATUS_URL, { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : {}; })
      .then(paint, function () { paint({}); });
  }
  if (statusEls.length) {
    poll();
    if (STATUS_URL) setInterval(poll, 60000);
  }

  // ---- ladder tabs ----
  document.querySelectorAll('[role=tablist]').forEach(function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role=tab]'));
    function select(tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) {
          panel.classList.toggle('on', on);
          if (on) panel.removeAttribute('hidden'); else panel.setAttribute('hidden', '');
        }
      });
      tab.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : -1;
        if (n < 0) return;
        e.preventDefault();
        select(tabs[(n + tabs.length) % tabs.length]);
      });
    });
  });

  // ---- news filter chips + release index jump ----
  var chips = Array.prototype.slice.call(document.querySelectorAll('.fchip'));
  var cards = Array.prototype.slice.call(document.querySelectorAll('.ncard'));
  function applyFilter(f) {
    cards.forEach(function (c) {
      var on = f === 'all' || (c.getAttribute('data-cat') || '').split(' ').indexOf(f) > -1;
      c.classList.toggle('hide', !on);
    });
  }
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('on'); c.setAttribute('aria-pressed', 'false'); });
      chip.classList.add('on');
      chip.setAttribute('aria-pressed', 'true');
      applyFilter(chip.getAttribute('data-filter'));
    });
  });
  document.querySelectorAll('.ver[data-jump]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var v = a.getAttribute('data-jump');
      var target = cards.filter(function (c) { return c.getAttribute('data-ver') === v; })[0];
      if (!target) return;
      if (target.classList.contains('hide') && chips.length) chips[0].click();
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      target.classList.add('flash');
      setTimeout(function () { target.classList.remove('flash'); }, 1600);
    });
  });

  // ---- reveal + counters ----
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  function settleCounts(scope, animate) {
    scope.querySelectorAll('.count[data-to]').forEach(function (el) {
      if (!animate) { el.textContent = el.getAttribute('data-to'); return; }
      if (el.dataset.done) return;
      el.dataset.done = '1';
      var to = parseInt(el.getAttribute('data-to'), 10) || 0;
      var start = null;
      function step(t) {
        if (start === null) start = t;
        var p = Math.min(1, (t - start) / 1100);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(to * eased));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  function fillBars(scope) {
    scope.querySelectorAll('.skill .bar i').forEach(function (bar) {
      var v = getComputedStyle(bar.closest('.skill')).getPropertyValue('--fill').trim();
      if (v) bar.style.width = v;
    });
  }

  if (!('IntersectionObserver' in window) || reduce) {
    reveals.forEach(function (el) { el.classList.add('in'); fillBars(el); settleCounts(el, false); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      el.classList.add('in');
      fillBars(el);
      settleCounts(el, true);
      io.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(function (el) { io.observe(el); });
})();
