/* ============================================================
   AIR COMPRIMÉ NORMANDIE — main.js
   Navbar scroll · Menu mobile · Accordéon · Reveal · Compteurs · Form
   Vanilla JS — zéro dépendance
   ============================================================ */
(function () {
  'use strict';

  /* ─── 1. Header : ombre au scroll ─────────────────────────── */
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 12); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── 2. Menu mobile ──────────────────────────────────────── */
  var burger = document.querySelector('.burger');
  var menu   = document.querySelector('.mobile-menu');
  var body   = document.body;

  function closeMenu() {
    if (!burger || !menu) return;
    burger.classList.remove('is-open');
    menu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');
  }
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      body.classList.toggle('menu-open', open);
    });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) closeMenu();
    });
  }

  /* ─── 3. Accordéons (sous-menus mobile) ───────────────────── */
  document.querySelectorAll('.m-accordion__head').forEach(function (head) {
    head.addEventListener('click', function (e) {
      e.preventDefault();
      head.closest('.m-accordion').classList.toggle('is-open');
    });
  });

  /* ─── 4. Reveal au scroll ─────────────────────────────────── */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ─── 5. Compteurs animés ─────────────────────────────────── */
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '', start = 0, dur = 1400, t0 = null;
        function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / dur, 1);
          el.textContent = Math.floor(p * (target - start) + start) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ─── 6. Formulaire devis (validation + envoi) ────────────── */
  var form = document.querySelector('#devis-form');
  if (form) {
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var btn = form.querySelector('button[type="submit"]');
      var action = form.getAttribute('action') || '';
      var data = new FormData(form);

      function show(ok, msg) {
        if (!status) return;
        status.className = 'form-status ' + (ok ? 'is-ok' : 'is-err');
        status.textContent = msg;
      }

      // Si un endpoint (Formspree) est configuré, on envoie en AJAX. Sinon, démo.
      if (action && action.indexOf('VOTRE_ID') === -1 && /^https?:/.test(action)) {
        if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Envoi…'; }
        fetch(action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          .then(function (r) {
            if (r.ok) { form.reset(); show(true, 'Merci ! Votre demande a bien été envoyée. Nous vous recontactons rapidement.'); }
            else { show(false, 'Une erreur est survenue. Contactez-nous au 02 31 82 31 55.'); }
          })
          .catch(function () { show(false, 'Erreur réseau. Réessayez ou appelez le 02 31 82 31 55.'); })
          .finally(function () { if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label; } });
      } else {
        form.reset();
        show(true, 'Merci ! Votre demande a bien été enregistrée. (Démo — configurez l’endpoint d’envoi pour la mise en production.)');
      }
    });
  }

  /* ─── 7. Année dynamique footer ───────────────────────────── */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
