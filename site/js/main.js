// ===== Hero carousel (page d'accueil) — glissement droite vers gauche =====
(function () {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dots button');
  if (!slides.length) return;

  let current = 0;
  const total = slides.length;
  const TRANSITION_MS = 1000;

  function show(index) {
    const next = (index + total) % total;
    if (next === current) return;

    const outgoing = slides[current];
    const incoming = slides[next];

    outgoing.classList.remove('active');
    outgoing.classList.add('exit');
    incoming.classList.add('active');

    dots[current] && dots[current].classList.remove('active');
    dots[next] && dots[next].classList.add('active');

    // une fois sortie à gauche, on replace la diapo hors-champ à droite
    // sans transition visible, prête pour le prochain tour
    setTimeout(() => {
      outgoing.classList.add('no-transition');
      outgoing.classList.remove('exit');
      void outgoing.offsetWidth; // force reflow
      outgoing.classList.remove('no-transition');
    }, TRANSITION_MS);

    current = next;
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));

  setInterval(() => show(current + 1), 6000);
})();

// ===== Menu mobile (hamburger) =====
(function () {
  const openBtns = document.querySelectorAll('[data-menu-open]');
  const closeBtns = document.querySelectorAll('[data-menu-close]');
  const menu = document.querySelector('.mobile-nav');
  if (!menu) return;

  openBtns.forEach(btn => btn.addEventListener('click', () => menu.classList.add('open')));
  closeBtns.forEach(btn => btn.addEventListener('click', () => menu.classList.remove('open')));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
})();

// ===== Sous-navigation de rubrique (surbrillance au défilement) =====
(function () {
  const subnav = document.querySelector('.page-subnav');
  if (!subnav) return;

  const links = [...subnav.querySelectorAll('a')];
  const sections = links
    .filter(a => a.getAttribute('href').startsWith('#'))
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  // Liens vers d'autres pages (pas des ancres) : pas de suivi au défilement,
  // l'état actif est déjà fixé statiquement dans le HTML.
  if (!sections.length) return;

  function setActive(id) {
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
  }

  function updateOnScroll() {
    const triggerLine = subnav.getBoundingClientRect().bottom + 10;
    let currentId = sections[0].id;
    for (const sec of sections) {
      if (sec.getBoundingClientRect().top <= triggerLine) currentId = sec.id;
    }
    setActive(currentId);
  }

  window.addEventListener('scroll', updateOnScroll, { passive: true });
  window.addEventListener('resize', updateOnScroll);
  updateOnScroll();

  links.forEach(a => a.addEventListener('click', () => setTimeout(updateOnScroll, 300)));
})();

// ===== Formulaires (démo sans back-end) =====
document.addEventListener('submit', function (e) {
  if (e.target.matches('.reg-form, .contact-form')) {
    e.preventDefault();
    alert("Merci ! Votre formulaire a bien été pris en compte. Notre équipe vous recontactera prochainement.");
    e.target.reset();
  }
});
