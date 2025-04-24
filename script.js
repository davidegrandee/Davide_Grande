function toggleContent(id) {
    const content = document.getElementById(id);
    const arrow = content.previousElementSibling.querySelector('.arrow');
  
    content.classList.toggle('show');
    arrow.textContent = content.classList.contains('show') ? '▲' : '▼';
  }
  
  // Dark Mode Toggle
  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById('darkModeToggle');
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  
    // Newsletter form handler
    const form = document.getElementById('newsletter-form');
    const successMsg = document.querySelector('.success-message');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      successMsg.style.display = 'block';
      form.reset();
    });
  });  