(function () {
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

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  function fillBars(scope) {
    scope.querySelectorAll('.bar i[data-fill]').forEach(function (bar) {
      bar.style.width = bar.getAttribute('data-fill') + '%';
    });
  }
  function settleCounts(scope, animate) {
    scope.querySelectorAll('.count[data-to]').forEach(function (el) {
      if (!animate) {
        el.textContent = el.getAttribute('data-to');
        return;
      }
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

  if (!('IntersectionObserver' in window) || reduce) {
    reveals.forEach(function (el) {
      el.classList.add('in');
      fillBars(el);
      settleCounts(el, false);
    });
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
  }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
  reveals.forEach(function (el) { io.observe(el); });
})();
