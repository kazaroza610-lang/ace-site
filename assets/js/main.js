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
    /* Ferme le menu au clic sur un lien, SAUF les têtes d'accordéon (elles ne font
       qu'ouvrir/fermer leur sous-menu, géré au point 3 ci-dessous). */
    menu.querySelectorAll('a:not(.m-accordion__head)').forEach(function (a) { a.addEventListener('click', closeMenu); });
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

  /* ─── 3b. Dropdowns desktop — support tactile (tablette) ───── */
  var isTouch = matchMedia('(hover: none)').matches;
  if (isTouch) {
    document.querySelectorAll('.nav__item').forEach(function (item) {
      var dropdown = item.querySelector('.dropdown');
      if (!dropdown) return;
      var link = item.querySelector('.nav__link');
      link.addEventListener('click', function (e) {
        if (!item.classList.contains('is-open')) {
          e.preventDefault();
          document.querySelectorAll('.nav__item.is-open').forEach(function (i) { if (i !== item) i.classList.remove('is-open'); });
          item.classList.add('is-open');
        }
      });
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav__item')) {
        document.querySelectorAll('.nav__item.is-open').forEach(function (i) { i.classList.remove('is-open'); });
      }
    });
  }

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

  /* ─── 7b. Préchargement à l'intention (survol/contact tactile) ──
     Précharge la page cible dès que l'utilisateur montre l'intention d'y aller,
     pour une navigation perçue comme instantanée — sans rien télécharger
     pour les pages jamais survolées (économie de données mobiles). */
  var prefetched = {};
  function prefetchLink(href) {
    if (prefetched[href]) return;
    prefetched[href] = true;
    var link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  }
  document.querySelectorAll('a[href^="/"]').forEach(function (a) {
    var href = a.getAttribute('href').split('#')[0];
    if (!href || href === window.location.pathname) return;
    a.addEventListener('mouseenter', function () { prefetchLink(href); }, { passive: true });
    a.addEventListener('touchstart', function () { prefetchLink(href); }, { passive: true });
  });

  /* ─── 8. Défilement fiable vers une ancre (#expertise, #terrain…) ─
     behavior:'instant' (et non 'smooth'/'auto') : un saut immédiat ne dépend pas
     de requestAnimationFrame, donc ne peut pas rester bloqué si les animations
     sont retardées (onglet en arrière-plan, prefers-reduced-motion, mobile lent). */
  if (window.location.hash) {
    var target = document.getElementById(window.location.hash.slice(1));
    if (target) {
      setTimeout(function () { target.scrollIntoView({ behavior: 'instant', block: 'start' }); }, 0);
    }
  }
})();
