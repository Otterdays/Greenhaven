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

  // ---- stars (hero) ----
  var stars = document.getElementById('stars');
  if (stars) {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 70; i++) {
      var s = document.createElement('i');
      s.style.left = (Math.random() * 100) + '%';
      s.style.top = (Math.random() * 70) + '%';
      s.style.setProperty('--t', (3 + Math.random() * 5).toFixed(1) + 's');
      s.style.setProperty('--d', (-Math.random() * 6).toFixed(1) + 's');
      if (Math.random() < .2) { s.style.width = s.style.height = '3px'; }
      frag.appendChild(s);
    }
    stars.appendChild(frag);
  }

  // ---- parallax hills ----
  var hills = document.querySelectorAll('.hills path[data-depth]');
  if (hills.length && !reduce) {
    var ticking = false;
    function hillStep() {
      var y = window.scrollY;
      hills.forEach(function (p) {
        var d = parseFloat(p.getAttribute('data-depth')) || 0;
        p.style.transform = 'translateY(' + (y * d / 100) + 'px)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(hillStep); ticking = true; }
    }, { passive: true });
  }

  // ---- tile spotlight ----
  document.querySelectorAll('.tile').forEach(function (tile) {
    tile.addEventListener('pointermove', function (e) {
      var r = tile.getBoundingClientRect();
      tile.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      tile.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    });
  });

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
