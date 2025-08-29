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
});
