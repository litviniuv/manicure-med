/* Variant 2: scroll-linked melt of the headline + panel entering from the left */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hero = document.querySelector('.melt');
  var bar = document.querySelector('.v2-progress');
  if (reduce) root.classList.add('reduce');
  if (hero && !reduce) {
    var ticking = false;
    var clamp = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
    var update = function () {
      ticking = false;
      if (window.mmMenuOpen && window.mmMenuOpen()) return; /* body is fixed while menu is open */
      var r = hero.getBoundingClientRect();
      var track = hero.offsetHeight - (window.innerHeight - (parseInt(getComputedStyle(root).getPropertyValue('--chrome-h'), 10) || 0));
      var p = clamp(-r.top / Math.max(1, track));
      hero.style.setProperty('--h', clamp(p / 0.4).toFixed(3));
      hero.style.setProperty('--q', clamp((p - 0.28) / 0.42).toFixed(3));
      if (bar) { bar.style.setProperty('--p', p.toFixed(3)); bar.classList.toggle('is-done', p >= 1); }
    };
    var req = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', req);
    update();
  }
  var panels = document.querySelectorAll('.v2 .panel');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.02 });
    panels.forEach(function (p) { io.observe(p); });
  } else panels.forEach(function (p) { p.classList.add('is-in'); });
})();
