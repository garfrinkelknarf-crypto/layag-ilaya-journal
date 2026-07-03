// Layag Ilaya Research Journal — site navigation behavior
(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    menu.setAttribute('hidden', '');
  }

  function openMenu() {
    toggle.setAttribute('aria-expanded', 'true');
    menu.removeAttribute('hidden');
  }

  toggle.addEventListener('click', function () {
    var expanded = toggle.getAttribute('aria-expanded') === 'true';
    if (expanded) { closeMenu(); } else { openMenu(); }
  });

  // Close the mobile menu after a link is chosen
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { closeMenu(); }
  });

  // Close if the viewport grows past the mobile breakpoint
  var mq = window.matchMedia('(min-width: 860px)');
  function handleBreakpoint(e) { if (e.matches) { closeMenu(); } }
  if (mq.addEventListener) { mq.addEventListener('change', handleBreakpoint); }
  else if (mq.addListener) { mq.addListener(handleBreakpoint); }

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });
})();
