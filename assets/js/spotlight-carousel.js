// Spotlight carousel — Recognition page
(function () {
  'use strict';

  var root = document.querySelector('.spotlight');
  if (!root) return;

  var slides = [].slice.call(root.querySelectorAll('.spotlight-slide'));
  var dots = [].slice.call(root.querySelectorAll('.spotlight-dot'));
  var prevBtn = root.querySelector('.spotlight-prev');
  var nextBtn = root.querySelector('.spotlight-next');
  var current = 0;
  var AUTO_MS = 6000;
  var timer = null;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach(function (s, i) {
      s.classList.toggle('is-active', i === current);
    });
    dots.forEach(function (d, i) {
      d.classList.toggle('is-active', i === current);
      d.setAttribute('aria-current', i === current ? 'true' : 'false');
    });
  }

  function next() { show(current + 1); }
  function prev() { show(current - 1); }

  function startAuto() {
    if (reduceMotion) return;
    stopAuto();
    timer = setInterval(next, AUTO_MS);
  }
  function stopAuto() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  if (nextBtn) nextBtn.addEventListener('click', function () { next(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', function () { prev(); startAuto(); });

  dots.forEach(function (d, i) {
    d.addEventListener('click', function () { show(i); startAuto(); });
  });

  // Pause on hover / keyboard focus, resume on leave
  root.addEventListener('mouseenter', stopAuto);
  root.addEventListener('mouseleave', startAuto);
  root.addEventListener('focusin', stopAuto);
  root.addEventListener('focusout', startAuto);

  // Keyboard arrow-key navigation when the carousel has focus
  root.setAttribute('tabindex', '0');
  root.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { next(); startAuto(); }
    if (e.key === 'ArrowLeft') { prev(); startAuto(); }
  });

  // Lightbox (click a slide image to view full size)
  var lightbox = document.querySelector('.spotlight-lightbox');
  var lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  var lightboxClose = lightbox ? lightbox.querySelector('.spotlight-lightbox-close') : null;

  slides.forEach(function (s) {
    var img = s.querySelector('img');
    if (!img || !lightbox) return;
    img.addEventListener('click', function () {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('is-open');
      stopAuto();
    });
  });

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightboxImg.src = '';
    startAuto();
  }
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) closeLightbox();
  });

  show(0);
  startAuto();
})();
