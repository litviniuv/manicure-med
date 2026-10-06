/* Variant 3: pointer parallax on the background photo, circle opening of section shots, darker veil after the hero */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var bg = document.querySelector('.v3-bg');
  var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  if (bg && fine && !reduce) {
    var raf = 0, mx = 0, my = 0;
    window.addEventListener('pointermove', function (e) {
      mx = (e.clientX / window.innerWidth - .5) * -18;
      my = (e.clientY / window.innerHeight - .5) * -12;
      if (!raf) raf = requestAnimationFrame(function () { raf = 0; bg.style.setProperty('--mx', mx.toFixed(1) + 'px'); bg.style.setProperty('--my', my.toFixed(1) + 'px'); });
    }, { passive: true });
  }
  var hero = document.querySelector('.giant');
  var onScroll = function () {
    if (window.mmMenuOpen && window.mmMenuOpen()) return;
    var past = hero ? hero.getBoundingClientRect().bottom < window.innerHeight * .55 : false;
    document.body.classList.toggle('is-scrolled', past);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  var shots = document.querySelectorAll('.gallery-grid li, .about-photo');
  Array.prototype.forEach.call(shots, function (s) { s.classList.add('shot'); });
  /* observe unclipped containers; a target clipped to zero would never report as visible */
  var groups = document.querySelectorAll('.gallery-grid, .about-grid');
  var openGroup = function (g) {
    var items = g.querySelectorAll('.shot');
    Array.prototype.forEach.call(items, function (s, i) { setTimeout(function () { s.classList.add('is-open'); }, Math.min(i, 8) * 70); });
  };
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { openGroup(e.target); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    Array.prototype.forEach.call(groups, function (g) { io.observe(g); });
  } else Array.prototype.forEach.call(shots, function (s) { s.classList.add('is-open'); });
})();
