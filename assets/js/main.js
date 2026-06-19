/* ============================================================
   AIR COMPRIMÉ NORMANDIE — main.js
   Menu mobile · Navbar scroll · Animations IntersectionObserver
   Vanilla JS — zéro dépendance externe
   ============================================================ */

(function () {
  'use strict';

  /* ─── 1. MENU MOBILE (hamburger + overlay) ───────────────── */
  var burger     = document.querySelector('.navbar__burger');
  var mobileMenu = document.querySelector('.mobile-menu');
  var body       = document.body;

  function closeMenu() {
    if (!burger || !mobileMenu) return;
    burger.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');
  }

  function toggleMenu() {
    if (!burger || !mobileMenu) return;
    var isOpen = mobileMenu.classList.toggle('is-open');
    burger.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    body.classList.toggle('menu-open', isOpen);
  }

  if (burger && mobileMenu) {
    burger.addEventListener('click', toggleMenu);

    // Fermer en cliquant sur un lien du menu
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Fermer avec la touche Échap
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  /* ─── 2. NAVBAR — ombre au scroll ────────────────────────── */
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    var onScroll = function () {
      navbar.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── 3. ANIMATIONS AU SCROLL (IntersectionObserver) ─────── */
  var animated = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window && animated.length) {
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    animated.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback : si pas de support, tout rendre visible
    animated.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ─── 4. COMPTEURS ANIMÉS (au scroll) ────────────────────── */
  var counters = document.querySelectorAll('[data-count]');

  function animateCounter(el) {
    var target   = parseFloat(el.getAttribute('data-count'));
    var suffix   = el.getAttribute('data-suffix') || '';
    var duration = 1900;
    var start    = null;

    function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var value = Math.round(easeOutCubic(progress) * target);
      el.textContent = value + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window && counters.length) {
    var counterObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(function (el) {
      el.textContent = '0' + (el.getAttribute('data-suffix') || '');
      counterObserver.observe(el);
    });
  } else {
    counters.forEach(function (el) {
      el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || '');
    });
  }

  /* ─── 5. ANNÉE DYNAMIQUE (footer) ────────────────────────── */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  /* ─── 6. FORMULAIRE CONTACT (Formspree + fetch) ──────────── */
  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('form-status');
    var submitBtn = form.querySelector('button[type="submit"]');

    var setStatus = function (msg, type) {
      if (!status) return;
      status.textContent = msg;
      status.className = 'form__status' + (type ? ' form__status--' + type : '');
    };

    var get = function (name) {
      var el = form.elements[name];
      return el ? el.value.trim() : '';
    };

    // Repli mailto si l'endpoint Formspree n'est pas encore configuré
    var mailtoFallback = function () {
      var subject = '[Site ACN] ' + (get('sujet') || 'Demande de devis')
        + (get('nom') ? ' — ' + get('nom') : '');
      var lines = [
        'Nom : ' + get('nom'),
        'Entreprise : ' + (get('entreprise') || '—'),
        'Email : ' + get('email'),
        'Téléphone : ' + (get('telephone') || '—'),
        'Sujet : ' + (get('sujet') || 'Demande de devis'),
        '', 'Message :', get('message')
      ];
      window.location.href = 'mailto:contact@aircomprimenormandie.fr'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(lines.join('\n'));
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var action = form.getAttribute('action') || '';
      if (action.indexOf('VOTRE_ID_FORMSPREE') !== -1 || action.indexOf('formspree.io') === -1) {
        // Endpoint non configuré → on bascule sur l'email
        setStatus('Ouverture de votre messagerie…', '');
        mailtoFallback();
        return;
      }

      if (submitBtn) { submitBtn.disabled = true; }
      setStatus('Envoi en cours…', '');

      fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          form.reset();
          setStatus('Merci ! Votre demande a bien été envoyée. Nous vous répondons sous 24h.', 'success');
        } else {
          response.json().then(function (data) {
            var msg = (data && data.errors && data.errors.length)
              ? data.errors.map(function (er) { return er.message; }).join(', ')
              : 'Une erreur est survenue. Réessayez ou appelez-nous au 02 31 82 31 55.';
            setStatus(msg, 'error');
          }).catch(function () {
            setStatus('Une erreur est survenue. Réessayez ou appelez-nous au 02 31 82 31 55.', 'error');
          });
        }
      }).catch(function () {
        setStatus('Connexion impossible. Réessayez ou appelez-nous au 02 31 82 31 55.', 'error');
      }).then(function () {
        if (submitBtn) { submitBtn.disabled = false; }
      });
    });
  }

})();
