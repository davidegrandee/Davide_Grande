function setupNewsletterSubscription() {
    const form = document.getElementById('newsletter-form');
    if (form) {
        form.addEventListener('submit', async function (event) {
            event.preventDefault();
            const emailInput = form.querySelector('input[name="email"]');
            const successMessage = document.querySelector('.success-message');

            try {
                const response = await fetch('https://your-backend-url.com/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: emailInput.value }),
                });

                if (response.ok) {
                    successMessage.style.display = 'block';
                    emailInput.value = ''; // Resetta il campo email
                } else if (response.status === 409) {
                    alert('Sei già iscritto alla newsletter!');
                } else {
                    alert('Errore durante l\'iscrizione. Riprova.');
                }
            } catch (err) {
                console.error('Errore:', err);
                alert('Errore durante l\'iscrizione. Riprova.');
            }
        });
    } else {
        console.warn("Newsletter form not found.");
    }
}