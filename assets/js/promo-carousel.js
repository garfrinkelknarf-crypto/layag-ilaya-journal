// Promo video carousel — Updates page (manual navigation only)
(function () {
  'use strict';

  var root = document.querySelector('.promo-carousel');
  if (!root) return;

  var slides = [].slice.call(root.querySelectorAll('.promo-slide'));
  var dots = [].slice.call(root.querySelectorAll('.promo-dot'));
  var prevBtn = root.querySelector('.promo-prev');
  var nextBtn = root.querySelector('.promo-next');
  var counter = root.querySelector('.promo-counter');
  var current = 0;

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach(function (s, i) {
      s.classList.toggle('is-active', i === current);
    });
    dots.forEach(function (d, i) {
      d.classList.toggle('is-active', i === current);
      d.setAttribute('aria-current', i === current ? 'true' : 'false');
    });
    if (counter) counter.textContent = (current + 1) + ' of ' + slides.length;
  }

  if (nextBtn) nextBtn.addEventListener('click', function () { show(current + 1); });
  if (prevBtn) prevBtn.addEventListener('click', function () { show(current - 1); });
  dots.forEach(function (d, i) {
    d.addEventListener('click', function () { show(i); });
  });

  // Note: unlike an image carousel, this one embeds cross-origin video iframes
  // that cover most of the visible area. Clicking the container to focus it
  // (for arrow-key navigation) would instead focus INSIDE the iframe, not this
  // component. So keyboard navigation here relies on the naturally-focusable
  // prev/next buttons themselves (Tab to reach them, Enter/Space to activate) --
  // standard button behavior the browser already provides, no extra JS needed.

  show(0);
})();
