// Intro splash: show once per session + smooth scroll
document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  const btn = document.getElementById('intro-enter');
  if (intro) {
    if (sessionStorage.getItem('introSeen') === '1') {
      intro.remove();
    } else {
      document.body.classList.add('intro-lock');
      const closeIntro = () => {
        sessionStorage.setItem('introSeen', '1');
        intro.classList.add('is-hidden');
        document.body.classList.remove('intro-lock');
        setTimeout(() => intro.remove(), 600);
      };
      btn && btn.addEventListener('click', closeIntro);
      document.addEventListener('keydown', e => {
        if (['Enter', 'Escape', ' '].includes(e.key)) closeIntro();
      });
      intro.addEventListener('click', e => { if (e.target.id === 'intro') closeIntro(); });
    }
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ===== Mobile drawer menu =====
  const burger = document.querySelector('.hamburger');
  const drawer = document.getElementById('mobile-menu');
  const backdrop = document.querySelector('.backdrop');
  const closeBtn = document.querySelector('.close-drawer');

  const openDrawer = () => {
    drawer.classList.add('open');
    backdrop.hidden = false;
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    const first = drawer.querySelector('a'); first && first.focus();
  };
  const closeDrawer = () => {
    drawer.classList.remove('open');
    backdrop.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    burger.focus();
  };

  burger && burger.addEventListener('click', openDrawer);
  closeBtn && closeBtn.addEventListener('click', closeDrawer);
  backdrop && backdrop.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer(); });
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
});

/* ===== Visit counter (CountAPI) ===== */
const COUNTAPI_NS = 'davidegrandee.github.io';
const COUNTAPI_KEY = 'Davide_Grande';
(function updateVisitCounter(){
  const el = document.getElementById('visit-count');
  if (!el) return;
  fetch(`https://api.countapi.xyz/hit/${COUNTAPI_NS}/${COUNTAPI_KEY}`)
    .then(r => r.json())
    .then(d => { if (d && typeof d.value === 'number') el.textContent = d.value.toLocaleString('it-IT'); })
    .catch(() => { el.textContent = '—'; });
})();