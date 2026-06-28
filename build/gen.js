/* ============================================================
   Générateur statique ACN — assemble header/footer partagés
   + contenu par page. Sortie = fichiers .html servis tels quels.
   Usage : node build/gen.js
   ============================================================ */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const SITE = 'https://ace-site-one.vercel.app';

/* ─── Navigation (active = slug) ──────────────────────────── */
function header(active) {
  const a = (s) => (active === s ? ' is-active' : '');
  return `
  <header class="header">
    <div class="container nav">
      <a href="/" class="nav__logo" aria-label="Accueil — Air Comprimé Normandie">
        <img src="/assets/img/logo-acn.png" alt="Air Comprimé Normandie" width="115" height="46">
      </a>
      <nav class="nav__menu" aria-label="Navigation principale">
        <div class="nav__item${a('accueil')}"><a href="/" class="nav__link">Accueil</a></div>
        <div class="nav__item${a('services')}"><a href="/nos-services" class="nav__link">Nos services</a></div>
        <div class="nav__item${a('partenaires')}">
          <a href="/nos-partenaires" class="nav__link">Nos partenaires
            <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </a>
          <div class="dropdown">
            <a href="/partenaires-compresseurs">Partenaires compresseurs<small>MAC3, RENNER, ABAC, MULTIAIR</small></a>
            <a href="/partenaires-autres">Partenaires autres spécialités<small>Huiles &amp; consommables premium</small></a>
          </div>
        </div>
        <div class="nav__item${a('blog')}">
          <a href="/blog" class="nav__link">Blog
            <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </a>
          <div class="dropdown">
            <a href="/blog#expertise">La minute expertise<small>Conseils techniques air comprimé</small></a>
            <a href="/blog#terrain">Le regard terrain<small>Retours d'expérience</small></a>
          </div>
        </div>
        <div class="nav__item${a('apropos')}"><a href="/qui-sommes-nous" class="nav__link">Qui sommes-nous&nbsp;?</a></div>
      </nav>
      <div class="nav__cta">
        <a href="tel:0231823155" class="btn btn--outline" aria-label="Appeler le 02 31 82 31 55">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          02 31 82 31 55
        </a>
        <a href="/devis" class="btn btn--primary">Devis en ligne</a>
      </div>
      <button class="burger" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span><span></span></button>
    </div>
  </header>

  <div class="mobile-menu" id="mobile-menu">
    <a href="/" class="m-link">Accueil</a>
    <a href="/nos-services" class="m-link">Nos services</a>
    <div class="m-accordion">
      <a href="/nos-partenaires" class="m-link m-accordion__head">Nos partenaires
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg></a>
      <div class="m-accordion__body m-sub">
        <a href="/partenaires-compresseurs">Partenaires compresseurs</a>
        <a href="/partenaires-autres">Partenaires autres spécialités</a>
      </div>
    </div>
    <div class="m-accordion">
      <a href="/blog" class="m-link m-accordion__head">Blog
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg></a>
      <div class="m-accordion__body m-sub">
        <a href="/blog#expertise">La minute expertise</a>
        <a href="/blog#terrain">Le regard terrain</a>
      </div>
    </div>
    <a href="/qui-sommes-nous" class="m-link">Qui sommes-nous&nbsp;?</a>
    <a href="/devis" class="btn btn--primary btn--block btn--lg">Devis en ligne</a>
    <a href="tel:0231823155" class="btn btn--outline btn--block">02 31 82 31 55</a>
  </div>`;
}

const footer = `
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div>
          <span class="footer__logo"><img src="/assets/img/logo-acn.png" alt="Air Comprimé Normandie"></span>
          <p>Expert en compresseurs d'air et réseaux de fluides industriels. Vente, installation, maintenance et optimisation en Normandie &amp; Ille-et-Vilaine.</p>
        </div>
        <div>
          <h4>Navigation</h4>
          <div class="footer__links">
            <a href="/">Accueil</a><a href="/nos-services">Nos services</a><a href="/nos-partenaires">Nos partenaires</a>
            <a href="/blog">Blog</a><a href="/qui-sommes-nous">Qui sommes-nous&nbsp;?</a><a href="/devis">Devis en ligne</a>
          </div>
        </div>
        <div>
          <h4>Partenaires</h4>
          <div class="footer__links">
            <a href="/partenaires-compresseurs">Compresseurs</a><a href="/partenaires-autres">Autres spécialités</a>
            <a href="https://www.mac3.fr/" target="_blank" rel="noopener">MAC3</a>
            <a href="https://www.renner-kompressoren.de/fr/produits/" target="_blank" rel="noopener">RENNER</a>
            <a href="https://www.abacaircompressors.com/fr-fr" target="_blank" rel="noopener">ABAC</a>
          </div>
        </div>
        <div>
          <h4>Contact</h4>
          <ul class="footer__contact">
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><span>ZAC de la Suisse Normande, 4 Allée de Cindais, 14320 Saint-André-sur-Orne</span></li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg><a href="tel:0231823155">02 31 82 31 55</a></li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><a href="mailto:agence@acnormandie.fr">agence@acnormandie.fr</a></li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span>Lun – Ven : 8h-12h / 13h30-17h</span></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© <span data-year>2026</span> Air Comprimé Normandie — Tous droits réservés.</span>
        <span><a href="/mentions-legales">Mentions légales</a> · <a href="/nos-partenaires">Partenaires</a></span>
      </div>
    </div>
  </footer>
  <script src="/assets/js/main.js?v=20260627h" defer></script>`;

/* ─── Page hero réutilisable ──────────────────────────────── */
function pageHero(crumb, title, intro) {
  return `
    <section class="page-hero">
      <div class="container page-hero__inner reveal">
        <div class="breadcrumb"><a href="/">Accueil</a> / ${crumb}</div>
        <h1>${title}</h1>
        ${intro ? `<p>${intro}</p>` : ''}
      </div>
    </section>`;
}

/* ─── Document complet ────────────────────────────────────── */
function doc({ slug, active, title, desc, canonical, ogImg, main }) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <link rel="canonical" href="${SITE}${canonical}">
  <link rel="icon" type="image/png" href="/assets/img/favicon-acn.png">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="fr_FR">
  <meta property="og:site_name" content="Air Comprimé Normandie">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:image" content="${SITE}${ogImg || '/assets/img/hero-services.jpg'}">
  <meta property="og:url" content="${SITE}${canonical}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap">
  <link rel="stylesheet" href="/assets/css/style.css?v=20260627h">
</head>
<body>
${header(active)}
  <main>
${main}
  </main>
${footer}
</body>
</html>
`;
}

const ctaBand = (text, btn = 'Obtenir un devis', href = '/devis') => `
    <section class="section section--tight">
      <div class="container">
        <div class="cta-band reveal">
          <h2>Un projet ou une intervention&nbsp;?</h2>
          <p>${text}</p>
          <a href="${href}" class="btn btn--light btn--lg">${btn}</a>
        </div>
      </div>
    </section>`;

const pages = [];

/* ════════════ QUI SOMMES-NOUS ════════════ */
pages.push({
  file: 'qui-sommes-nous.html', slug: 'qui-sommes-nous', active: 'apropos',
  title: 'Qui sommes-nous ? — Air Comprimé Normandie',
  desc: "Spécialistes des compresseurs d'air et des réseaux de fluides en Normandie et Ille-et-Vilaine. Nos missions, nos valeurs et nos zones d'intervention.",
  canonical: '/qui-sommes-nous', ogImg: '/assets/img/service-conseil.jpg',
  main: `${pageHero('Qui sommes-nous&nbsp;?', 'Qui sommes-nous&nbsp;?',
    "Depuis plus de 10 ans, nous accompagnons les professionnels de l'industrie, de l'artisanat et du tertiaire dans la gestion de leurs systèmes d'air comprimé et de fluides.")}

    <section class="section">
      <div class="container">
        <div class="section-head section-head--center reveal">
          <span class="eyebrow">Notre expertise</span>
          <h2>Quatre domaines, une seule exigence</h2>
          <p class="lead">Une maîtrise complète de l'air comprimé et des fluides industriels, de la conception à la maintenance.</p>
        </div>
        <div class="badge-grid">
          <div class="badge-card reveal">
            <div class="badge-card__media"><img src="/assets/img/service-traitement-air.jpg" alt="Compresseurs d'air" loading="lazy"></div>
            <span>Compresseurs d'air</span>
          </div>
          <div class="badge-card reveal">
            <div class="badge-card__media"><img src="/assets/img/hero-services.jpg" alt="Réseaux d'air comprimé" loading="lazy"></div>
            <span>Réseaux d'air comprimé</span>
          </div>
          <div class="badge-card reveal">
            <div class="badge-card__media"><img src="/assets/img/service-fluides.jpg" alt="Réseaux de fluides industriels" loading="lazy"></div>
            <span>Réseaux de fluides industriels</span>
          </div>
          <div class="badge-card reveal">
            <div class="badge-card__media"><img src="/assets/img/service-maintenance.jpg" alt="Installation, maintenance et SAV toutes marques" loading="lazy"></div>
            <span>Installation, maintenance et SAV toutes marques</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container">
        <div class="split">
          <div class="split__body reveal">
            <div class="section-icon"><img src="/assets/img/icons/cible.png" alt=""></div>
            <span class="eyebrow">Présentation de l'entreprise</span>
            <h2>L'expertise technique et la proximité</h2>
            <p>Spécialistes des compresseurs d'air et des réseaux de fluides, nous intervenons à chaque étape de vos projets : vente, location, installation, maintenance, dépannage et service après-vente.</p>
            <p>Nous mettons notre expertise technique et notre proximité au service de nos clients afin de leur garantir des installations fiables et performantes. Nous sommes également distributeur et partenaire de marques de compresseurs, ainsi que de marques d'autres spécialités.</p>
          </div>
          <div class="split__media reveal">
            <img src="/assets/img/service-conseil.jpg" alt="Bureau d'études et conception technique ACN" loading="lazy" width="1024" height="683">
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="split split--reverse">
          <div class="split__body reveal">
            <div class="section-icon"><img src="/assets/img/icons/diamant.png" alt=""></div>
            <span class="eyebrow">Nos missions</span>
            <h2>Ce que nous faisons pour vous</h2>
            <ul class="check-list" style="gap:.8rem">
              <li>Conseiller et accompagner nos clients dans leurs projets.</li>
              <li>Installer et mettre en service des équipements performants.</li>
              <li>Assurer la maintenance et le dépannage de compresseurs toutes marques.</li>
              <li>Optimiser les installations pour améliorer leur efficacité et leur fiabilité.</li>
              <li>Garantir la continuité de l'activité grâce à un service réactif et de proximité.</li>
            </ul>
          </div>
          <div class="split__media reveal">
            <img src="/assets/img/service-maintenance.jpg" alt="Technicien ACN assurant la maintenance d'un compresseur" loading="lazy" width="1024" height="683">
          </div>
        </div>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container">
        <div class="section-head section-head--center reveal">
          <div class="section-icon section-icon--lg" style="margin-inline:auto"><img src="/assets/img/icons/personne.png" alt=""></div>
          <span class="eyebrow">Nos valeurs</span>
          <h2>Les engagements qui nous guident</h2>
        </div>
        <div class="grid grid--3">
          <div class="card reveal"><div class="card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div><h3>Réactivité</h3><p>Intervenir rapidement lorsque nos clients en ont besoin.</p></div>
          <div class="card reveal"><div class="card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div><h3>Disponibilité</h3><p>Être à l'écoute et apporter des solutions adaptées.</p></div>
          <div class="card reveal"><div class="card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div><h3>Qualité</h3><p>Réaliser des prestations fiables et soignées.</p></div>
          <div class="card reveal"><div class="card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg></div><h3>Expertise</h3><p>Mettre nos compétences techniques au service de chaque projet.</p></div>
          <div class="card reveal"><div class="card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg></div><h3>Confiance</h3><p>Construire des relations durables fondées sur le professionnalisme et le respect de nos engagements.</p></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head section-head--center reveal">
          <span class="eyebrow">Pourquoi choisir ACN&nbsp;?</span>
          <h2>Vos atouts à nos côtés</h2>
        </div>
        <div class="trust-strip">
          <div class="trust-item reveal"><img src="/assets/img/illus/why-1.png" alt="Plus de 10 ans d'expérience" loading="lazy"></div>
          <div class="trust-item reveal"><img src="/assets/img/illus/why-2.png" alt="Techniciens itinérants" loading="lazy"></div>
          <div class="trust-item reveal"><img src="/assets/img/illus/why-3.png" alt="Normandie & Est Bretagne" loading="lazy"></div>
          <div class="trust-item reveal"><img src="/assets/img/illus/why-4.png" alt="Maintenance toutes marques" loading="lazy"></div>
          <div class="trust-item reveal"><img src="/assets/img/illus/why-5.png" alt="Proximité et réactivité" loading="lazy"></div>
        </div>
      </div>
    </section>

    <section class="section section--navy">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">Nos zones d'intervention</span>
          <h2>La Normandie &amp; l'est de la Bretagne</h2>
        </div>
        <div class="split">
          <div class="split__body reveal">
            <p>Nous sommes situés à Saint-André-sur-Orne (14) et nous intervenons sur toute la Normandie ainsi qu'à l'est de la Bretagne, notamment en Ille-et-Vilaine. Nos techniciens sont itinérants et interviennent rapidement sans passage systématique par l'agence, grâce à nos points d'ancrage fixes.</p>
            <div class="tag-row mt-sm">
              <span class="tag">Grand-Celland (50)</span>
              <span class="tag">Parfouru-sur-Odon (14)</span>
              <span class="tag">Chênedollé (14)</span>
              <span class="tag">Morteaux-Coulibœuf (14)</span>
            </div>
          </div>
          <div class="split__media reveal">
            <img src="/assets/img/service-fluides.jpg" alt="Réseaux d'air comprimé et de fluides couvrant la Normandie" loading="lazy" width="1024" height="683">
          </div>
        </div>
      </div>
    </section>

    ${ctaBand("Nos équipes vous accompagnent dans l'installation, la maintenance et l'optimisation de vos réseaux industriels.")}`
});

/* ════════════ NOS PARTENAIRES ════════════ */
pages.push({
  file: 'nos-partenaires.html', slug: 'nos-partenaires', active: 'partenaires',
  title: 'Nos partenaires — Air Comprimé Normandie',
  desc: "ACN est distributeur officiel de MAC3, RENNER, ABAC et MULTIAIR, et partenaire de marques d'huiles premium (Q8Oils, Yacco, Avia).",
  canonical: '/nos-partenaires',
  main: `${pageHero('Nos partenaires', 'Nos partenaires',
    "ACN est distributeur officiel de marques de référence telles que MAC3, RENNER, ABAC et MULTIAIR, ainsi que de nombreuses autres marques spécialisées dans leurs domaines respectifs. Grâce à ces partenariats, nous proposons une offre complète de solutions industrielles, accompagnée d'un service global comprenant le conseil technique, la vente, la mise en service et la maintenance des équipements.")}

    <section class="section">
      <div class="container">
        <div class="grid grid--2">
          <article class="service-card reveal">
            <div class="service-card__body" style="padding:2rem">
              <span class="eyebrow">Compresseurs</span>
              <h3>Partenaires en compresseurs</h3>
              <p>Distributeur officiel des plus grandes marques de compresseurs d'air industriels et de chantier.</p>
              <div class="logo-strip" style="justify-content:flex-start;gap:1.8rem;margin:1.2rem 0">
                <img src="/assets/img/partners/mac3.png" alt="MAC3"><img src="/assets/img/partners/renner.png" alt="RENNER">
                <img src="/assets/img/partners/abac.png" alt="ABAC"><img src="/assets/img/partners/multiair.png" alt="MULTIAIR">
              </div>
              <a href="/partenaires-compresseurs" class="btn btn--primary">Voir les partenaires compresseurs</a>
            </div>
          </article>
          <article class="service-card reveal">
            <div class="service-card__body" style="padding:2rem">
              <span class="eyebrow">Autres spécialités</span>
              <h3>Partenaires autres spécialités</h3>
              <p>Huiles et consommables haut de gamme pour protéger et prolonger la durée de vie de vos équipements.</p>
              <div class="logo-strip" style="justify-content:flex-start;gap:1.8rem;margin:1.2rem 0">
                <img src="/assets/img/partners/q8oils.png" alt="Q8Oils"><img src="/assets/img/partners/yacco.svg" alt="Yacco">
                <img src="/assets/img/partners/avia.png" alt="Avia">
              </div>
              <a href="/partenaires-autres" class="btn btn--primary">Voir les autres partenaires</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container">
        <div class="section-head section-head--center reveal"><span class="eyebrow">Ils nous font confiance</span><h2>Nos marques partenaires</h2></div>
        <div class="logo-strip reveal">
          <img src="/assets/img/partners/mac3.png" alt="MAC3"><img src="/assets/img/partners/renner.png" alt="RENNER">
          <img src="/assets/img/partners/abac.png" alt="ABAC"><img src="/assets/img/partners/multiair.png" alt="MULTIAIR">
          <img src="/assets/img/partners/q8oils.png" alt="Q8Oils"><img src="/assets/img/partners/yacco.svg" alt="Yacco">
          <img src="/assets/img/partners/avia.png" alt="Avia">
        </div>
      </div>
    </section>

    ${ctaBand("Nos équipes vous accompagnent dans le choix, l'installation et la maintenance de vos équipements.")}`
});

/* ════════════ PARTENAIRES COMPRESSEURS ════════════ */
const compresseurs = [
  ['MAC3', 'mac3.png', 'https://www.mac3.fr/', 'Compresseurs à vis, bi-étagés et compresseurs de chantier MSH Macfarmer. Fabricant de référence.'],
  ['RENNER', 'renner.png', 'https://www.renner-kompressoren.de/fr/produits/', 'Compresseurs à vis et à pistons de fabrication allemande, robustes et performants.'],
  ['ABAC', 'abac.png', 'https://www.abacaircompressors.com/fr-fr', 'Solutions complètes d\'air comprimé pour l\'industrie, l\'artisanat et l\'atelier.'],
  ['MULTIAIR', 'multiair.png', 'https://blog.multiairfrance.store/', 'Compresseurs et équipements d\'air comprimé pour tous les besoins professionnels.'],
];
pages.push({
  file: 'partenaires-compresseurs.html', slug: 'partenaires-compresseurs', active: 'partenaires',
  title: 'Partenaires en compresseurs — MAC3, RENNER, ABAC, MULTIAIR | ACN',
  desc: "Distributeur officiel MAC3, RENNER, ABAC et MULTIAIR. Vente, mise en service et maintenance de compresseurs d'air industriels.",
  canonical: '/partenaires-compresseurs',
  main: `${pageHero('<a href="/nos-partenaires">Nos partenaires</a> / Compresseurs', 'Partenaires en compresseurs',
    'Distributeur officiel des grandes marques de compresseurs d\'air. Conseil technique, vente, mise en service et maintenance.')}

    <section class="section">
      <div class="container">
        <div class="logo-grid">
          ${compresseurs.map(([n, img, url, txt]) => `
          <div class="logo-card reveal">
            <div class="logo-card__media"><img src="/assets/img/partners/${img}" alt="${n}"></div>
            <h3>${n}</h3>
            <p>${txt}</p>
            <a href="${url}" target="_blank" rel="noopener" class="btn btn--outline">Site officiel
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>`).join('')}
        </div>
      </div>
    </section>

    ${ctaBand("Besoin d'un conseil sur le choix d'un compresseur ? Nos équipes vous guident vers la solution adaptée.")}`
});

/* ════════════ PARTENAIRES AUTRES ════════════ */
const autres = [
  ['Q8Oils', 'q8oils.png', 'https://www.q8oils.com/', 'Lubrifiants et huiles industrielles haut de gamme pour compresseurs et équipements.'],
  ['Yacco', 'yacco.svg', 'https://www.yacco.com/', 'Lubrifiants français de haute qualité, expertise reconnue depuis plus d\'un siècle.'],
  ['Avia', 'avia.png', 'https://avia-international.com/', 'Huiles et lubrifiants techniques pour applications industrielles exigeantes.'],
];
pages.push({
  file: 'partenaires-autres.html', slug: 'partenaires-autres', active: 'partenaires',
  title: 'Partenaires autres spécialités — Huiles premium Q8Oils, Yacco, Avia | ACN',
  desc: "Huiles et consommables haut de gamme (Q8Oils, Yacco, Avia) pour protéger et prolonger la durée de vie de vos compresseurs.",
  canonical: '/partenaires-autres',
  main: `${pageHero('<a href="/nos-partenaires">Nos partenaires</a> / Autres spécialités', 'Partenaires autres spécialités',
    'Pour protéger vos équipements et garantir leur longévité, nous utilisons des huiles et consommables haut de gamme issus de marques de référence.')}

    <section class="section">
      <div class="container">
        <div class="logo-grid" style="grid-template-columns:repeat(3,1fr)">
          ${autres.map(([n, img, url, txt]) => `
          <div class="logo-card reveal">
            <div class="logo-card__media"><img src="/assets/img/partners/${img}" alt="${n}"></div>
            <h3>${n}</h3>
            <p>${txt}</p>
            <a href="${url}" target="_blank" rel="noopener" class="btn btn--outline">Site officiel
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>`).join('')}
        </div>
        <div class="card mt-lg reveal" style="background:var(--bg-soft);border:none">
          <p style="margin:0"><strong style="color:var(--navy)">Des consommables choisis pour leur performance.</strong> Le choix de l'huile est déterminant pour la durée de vie d'un compresseur. Nous sélectionnons des lubrifiants premium adaptés à chaque type d'équipement afin de réduire l'usure, limiter la consommation et fiabiliser vos installations.</p>
        </div>
      </div>
    </section>

    ${ctaBand("Une question sur les consommables adaptés à votre matériel ? Contactez nos experts.")}`
});

/* ════════════ BLOG ════════════ */
const articlesExpertise = [
  ['article-pertes-de-charge', 'Réduire les pertes de charge de votre réseau d\'air comprimé', "Coudes, diamètres sous-dimensionnés, fuites… Les pertes de charge font grimper votre facture énergétique. Voici comment les identifier et les corriger."],
  ['article-secheur-air', 'Sécheur frigorifique ou à adsorption : lequel choisir&nbsp;?', "La qualité de l'air comprimé est cruciale pour vos process. Comparatif des deux grandes familles de sécheurs et de leurs usages."],
];
const articlesTerrain = [
  ['article-maintenance-preventive', 'Pourquoi un contrat de maintenance évite les arrêts de production', "Retour d'expérience : comment la maintenance préventive d'un parc de compresseurs a supprimé les pannes critiques d'un site industriel."],
  ['article-fuites-reseau', 'Chasse aux fuites : 20&nbsp;% d\'air comprimé récupéré sur site', "Sur le terrain, les fuites représentent souvent le premier poste de gaspillage. Récit d'une campagne de détection et de ses économies."],
];
function blogCards(list) {
  return list.map(([slug, title, excerpt]) => `
        <article class="blog-card reveal">
          <div class="blog-card__body">
            <span class="blog-cat">Air comprimé</span>
            <h3>${title}</h3>
            <p>${excerpt}</p>
            <a href="/${slug}" class="blog-card__more">Lire l'article
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>
        </article>`).join('');
}
pages.push({
  file: 'blog.html', slug: 'blog', active: 'blog',
  title: 'Blog — Conseils & retours d\'expérience | Air Comprimé Normandie',
  desc: "La minute expertise et le regard terrain : nos conseils techniques et retours d'expérience sur l'air comprimé industriel.",
  canonical: '/blog',
  main: `${pageHero('Blog', 'Le blog ACN',
    'Conseils techniques et retours d\'expérience sur l\'air comprimé industriel, les réseaux de fluides et l\'optimisation énergétique.')}

    <section class="section" id="expertise">
      <div class="container">
        <div class="section-head reveal"><span class="eyebrow">La minute expertise</span><h2>Conseils techniques</h2></div>
        <div class="grid grid--2">${blogCards(articlesExpertise)}</div>
      </div>
    </section>

    <section class="section section--soft" id="terrain">
      <div class="container">
        <div class="section-head reveal"><span class="eyebrow">Le regard terrain</span><h2>Retours d'expérience</h2></div>
        <div class="grid grid--2">${blogCards(articlesTerrain)}</div>
      </div>
    </section>

    ${ctaBand("Une problématique sur votre installation ? Parlons-en avec nos experts.")}`
});

/* ════════════ ARTICLES ════════════ */
const articleBody = {
  'article-pertes-de-charge': {
    cat: 'La minute expertise', crumbCat: 'expertise',
    title: 'Réduire les pertes de charge de votre réseau d\'air comprimé',
    intro: "Les pertes de charge représentent l'un des premiers postes de gaspillage énergétique d'une installation d'air comprimé. Voici les bonnes pratiques pour les maîtriser.",
    html: `
        <p>Dans un réseau d'air comprimé, chaque bar perdu entre le compresseur et le point d'utilisation se traduit par une surconsommation d'énergie. On estime qu'une baisse de pression de 1&nbsp;bar peut entraîner jusqu'à 7&nbsp;% de consommation électrique supplémentaire au niveau du compresseur.</p>
        <h2>D'où viennent les pertes de charge&nbsp;?</h2>
        <ul>
          <li>Des canalisations sous-dimensionnées par rapport au débit réel ;</li>
          <li>Un excès de coudes, de raccords et de changements de direction ;</li>
          <li>Des filtres et sécheurs encrassés ou mal entretenus ;</li>
          <li>Des fuites sur le réseau, souvent invisibles mais coûteuses.</li>
        </ul>
        <h2>Nos recommandations</h2>
        <p>Un dimensionnement correct du réseau, l'utilisation de tubes aluminium ou inox à faible rugosité, la mise en boucle du réseau et un entretien régulier des organes de traitement permettent de réduire significativement ces pertes. Un audit de site reste la meilleure façon d'identifier les points d'amélioration prioritaires.</p>
        <p>Chez ACN, nous réalisons l'étude, le dimensionnement et la mise en conformité de vos réseaux pour garantir performance et efficacité énergétique.</p>`
  },
  'article-secheur-air': {
    cat: 'La minute expertise', crumbCat: 'expertise',
    title: 'Sécheur frigorifique ou à adsorption : lequel choisir ?',
    intro: "L'humidité présente dans l'air comprimé peut endommager vos outils et altérer vos process. Le choix du sécheur est donc déterminant.",
    html: `
        <p>L'air comprimé contient toujours de la vapeur d'eau qui se condense en refroidissant. Sans traitement, cette eau provoque corrosion, gel des canalisations et dégradation des équipements. Deux grandes familles de sécheurs répondent à ce besoin.</p>
        <h2>Le sécheur frigorifique</h2>
        <p>Le plus répandu. Il refroidit l'air pour condenser l'eau, qui est ensuite évacuée. Il assure un point de rosée d'environ +3&nbsp;°C, suffisant pour la majorité des applications industrielles courantes, avec une consommation énergétique maîtrisée.</p>
        <h2>Le sécheur à adsorption</h2>
        <p>Il fait passer l'air à travers un matériau dessiccant qui capte l'humidité, atteignant des points de rosée très bas (jusqu'à -40&nbsp;°C ou -70&nbsp;°C). Indispensable pour les applications sensibles : agroalimentaire, pharmaceutique, électronique, ou réseaux exposés au gel.</p>
        <h2>Notre conseil</h2>
        <p>Le choix dépend de la qualité d'air requise par vos applications et des conditions d'installation. Nos techniciens vous accompagnent dans le dimensionnement, l'installation et la maintenance de la solution la plus adaptée.</p>`
  },
  'article-maintenance-preventive': {
    cat: 'Le regard terrain', crumbCat: 'terrain',
    title: 'Pourquoi un contrat de maintenance évite les arrêts de production',
    intro: "Retour d'expérience sur un site industriel où la maintenance préventive a supprimé les pannes critiques et sécurisé la production.",
    html: `
        <p>Sur le terrain, l'arrêt imprévu d'un compresseur signifie souvent l'arrêt de toute une ligne de production. Le coût d'une panne dépasse largement celui de la pièce défaillante : c'est l'immobilisation qui pèse le plus lourd.</p>
        <h2>Le constat de départ</h2>
        <p>Un site industriel nous a sollicités après plusieurs arrêts non planifiés de son parc de compresseurs. Les interventions étaient systématiquement curatives, dans l'urgence, avec des délais d'approvisionnement de pièces aggravant l'immobilisation.</p>
        <h2>La mise en place d'un suivi préventif</h2>
        <ul>
          <li>Visites planifiées avec remplacement programmé des consommables ;</li>
          <li>Contrôle des points critiques (filtration, lubrification, températures) ;</li>
          <li>Suivi des heures de fonctionnement et anticipation des pièces d'usure.</li>
        </ul>
        <h2>Le résultat</h2>
        <p>En une année, les arrêts non planifiés ont été quasiment supprimés. La maintenance préventive a transformé une dépense subie en investissement maîtrisé, avec une production sécurisée et des budgets prévisibles.</p>`
  },
  'article-fuites-reseau': {
    cat: 'Le regard terrain', crumbCat: 'terrain',
    title: 'Chasse aux fuites : 20 % d\'air comprimé récupéré sur site',
    intro: "Les fuites sont souvent le premier poste de gaspillage d'un réseau d'air comprimé. Récit d'une campagne de détection et de ses économies.",
    html: `
        <p>Dans de nombreuses installations, 20 à 30&nbsp;% de l'air comprimé produit est perdu à cause des fuites. Invisibles et silencieuses sous la pression sonore d'un atelier, elles fonctionnent pourtant 24h/24, même à l'arrêt de la production.</p>
        <h2>Détecter l'invisible</h2>
        <p>À l'aide d'un détecteur à ultrasons, nous avons parcouru l'ensemble du réseau d'un site : raccords, vannes, flexibles, purgeurs. Chaque fuite a été localisée, étiquetée et chiffrée en perte de débit et en coût annuel.</p>
        <h2>Corriger et mesurer</h2>
        <p>Après réparation des points identifiés, la pression de service a pu être abaissée tout en maintenant les performances aux points d'utilisation. Le compresseur fonctionne moins, consomme moins et s'use moins.</p>
        <h2>Un gain durable</h2>
        <p>Au total, près de 20&nbsp;% de l'air comprimé était gaspillé. La campagne de détection s'est rentabilisée en quelques mois. Une chasse aux fuites régulière fait partie des actions les plus rentables sur un réseau d'air comprimé.</p>`
  },
};
Object.entries(articleBody).forEach(([slug, a]) => {
  pages.push({
    file: slug + '.html', slug, active: 'blog',
    title: a.title.replace(/&nbsp;/g, ' ') + ' — Blog ACN',
    desc: a.intro.replace(/&nbsp;/g, ' ').slice(0, 155),
    canonical: '/' + slug,
    main: `${pageHero(`<a href="/blog">Blog</a> / ${a.cat}`, a.title, a.intro)}
    <section class="section">
      <div class="container">
        <article class="article reveal">
          <span class="blog-cat">${a.cat}</span>
          ${a.html}
          <div class="mt-lg"><a href="/blog" class="btn btn--outline">← Retour au blog</a> <a href="/devis" class="btn btn--primary">Demander un devis</a></div>
        </article>
      </div>
    </section>`
  });
});

/* ════════════ DEVIS ════════════ */
pages.push({
  file: 'devis.html', slug: 'devis', active: 'devis',
  title: 'Devis en ligne — Air Comprimé Normandie',
  desc: "Demandez votre devis gratuit pour l'installation, la maintenance, le dépannage ou l'optimisation de vos équipements d'air comprimé.",
  canonical: '/devis',
  main: `${pageHero('Devis en ligne', 'Devis en ligne',
    'Décrivez votre besoin : nos équipes vous recontactent rapidement avec une proposition adaptée.')}

    <section class="section">
      <div class="container">
        <div class="contact-grid">
          <div class="reveal">
            <div class="form-card">
              <form id="devis-form" action="https://formspree.io/f/VOTRE_ID_FORMSPREE" method="POST" novalidate>
                <div class="form-grid">
                  <div class="field"><label for="nom">Nom <span class="req">*</span></label><input id="nom" name="nom" type="text" required></div>
                  <div class="field"><label for="prenom">Prénom <span class="req">*</span></label><input id="prenom" name="prenom" type="text" required></div>
                  <div class="field field--full"><label for="entreprise">Entreprise</label><input id="entreprise" name="entreprise" type="text"></div>
                  <div class="field"><label for="email">Email <span class="req">*</span></label><input id="email" name="email" type="email" required></div>
                  <div class="field"><label for="tel">Téléphone <span class="req">*</span></label><input id="tel" name="telephone" type="tel" required></div>
                  <div class="field field--full">
                    <label for="type">Type de demande <span class="req">*</span></label>
                    <select id="type" name="type_demande" required>
                      <option value="" selected disabled>Sélectionnez…</option>
                      <option>Installation</option><option>Maintenance</option><option>Dépannage</option>
                      <option>Optimisation</option><option>Conseil</option><option>Autre</option>
                    </select>
                  </div>
                  <div class="field field--full"><label for="message">Description du projet <span class="req">*</span></label><textarea id="message" name="message" required placeholder="Décrivez votre besoin, votre matériel, le contexte du site…"></textarea></div>
                </div>
                <button type="submit" class="btn btn--primary btn--lg btn--block">Envoyer ma demande</button>
                <div class="form-status" role="status" aria-live="polite"></div>
                <p class="form-note">* Champs obligatoires. Vos informations restent confidentielles et ne servent qu'à traiter votre demande.</p>
              </form>
            </div>
          </div>
          <div class="info-list reveal">
            <div class="info-item">
              <div class="info-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
              <div><h4>Adresse</h4><p>ZAC de la Suisse Normande<br>4 Allée de Cindais, 14320 Saint-André-sur-Orne</p></div>
            </div>
            <div class="info-item">
              <div class="info-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
              <div><h4>Téléphone</h4><p><a href="tel:0231823155">02 31 82 31 55</a></p></div>
            </div>
            <div class="info-item">
              <div class="info-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
              <div><h4>Email</h4><p><a href="mailto:agence@acnormandie.fr">agence@acnormandie.fr</a></p></div>
            </div>
            <div class="info-item">
              <div class="info-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
              <div><h4>Horaires</h4><p>Du lundi au vendredi<br>8h00 – 12h00 / 13h30 – 17h00</p></div>
            </div>
            <div class="map-embed">
              <iframe src="https://www.google.com/maps?q=4+All%C3%A9e+de+Cindais,+14320+Saint-Andr%C3%A9-sur-Orne&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Localisation ACN"></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>`
});

/* ════════════ MENTIONS LÉGALES ════════════ */
pages.push({
  file: 'mentions-legales.html', slug: 'mentions-legales', active: '',
  title: 'Mentions légales — Air Comprimé Normandie',
  desc: "Mentions légales du site Air Comprimé Normandie (ACN), Saint-André-sur-Orne.",
  canonical: '/mentions-legales',
  main: `${pageHero('Mentions légales', 'Mentions légales', '')}
    <section class="section">
      <div class="container">
        <article class="article reveal">
          <h2>Éditeur du site</h2>
          <p><strong>Air Comprimé Normandie (ACN)</strong><br>
          ZAC de la Suisse Normande — 4 Allée de Cindais, 14320 Saint-André-sur-Orne, Calvados<br>
          Téléphone : <a href="tel:0231823155">02 31 82 31 55</a><br>
          Email : <a href="mailto:agence@acnormandie.fr">agence@acnormandie.fr</a></p>
          <h2>Hébergement</h2>
          <p>Ce site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.</p>
          <h2>Propriété intellectuelle</h2>
          <p>L'ensemble des contenus (textes, images, logo) présents sur ce site est la propriété d'Air Comprimé Normandie ou de ses partenaires, sauf mention contraire. Les logos des marques partenaires (MAC3, RENNER, ABAC, MULTIAIR, Q8Oils, Yacco, Avia) demeurent la propriété de leurs détenteurs respectifs.</p>
          <h2>Données personnelles</h2>
          <p>Les informations transmises via le formulaire de devis sont utilisées uniquement pour traiter votre demande et ne sont jamais cédées à des tiers. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données en nous contactant à l'adresse ci-dessus.</p>
          <div class="mt-lg"><a href="/" class="btn btn--outline">← Retour à l'accueil</a></div>
        </article>
      </div>
    </section>`
});

/* ─── Écriture ────────────────────────────────────────────── */
let n = 0;
pages.forEach((p) => {
  fs.writeFileSync(path.join(ROOT, p.file), doc(p));
  n++;
  console.log('  ✓', p.file);
});
console.log(`\n${n} pages générées.`);
