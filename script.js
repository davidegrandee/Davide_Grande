// Toggle project sections
function toggleContent(id) {
    const content = document.getElementById(id);
    const arrow = content.previousElementSibling.querySelector('.arrow');

    if (content && arrow) {
        content.classList.toggle('hidden');
        arrow.textContent = content.classList.contains('hidden') ? '▼' : '▲';
    } else {
        console.error(`Element with ID "${id}" or arrow not found.`);
    }
}

// Newsletter subscription
function setupNewsletterSubscription() {
    const form = document.getElementById('newsletter-form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const successMessage = document.querySelector('.success-message');
            if (successMessage) {
                successMessage.style.display = 'block';
            } else {
                console.error("Success message element not found.");
            }
        });
    } else {
        console.warn("Newsletter form not found.");
    }
}

// Dynamic Portfolio
function renderPortfolio() {
    const portfolioContainer = document.getElementById('portfolio-container');
    if (portfolioContainer) {
        portfolioItems.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('portfolio-item');
            div.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <a href="${item.link}" target="_blank">View Details</a>
            `;
            portfolioContainer.appendChild(div);
        });
    } else {
        console.warn("Portfolio container not found.");
    }
}

// Google Translate Widget Initialization
function loadGoogleTranslate() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);
}

// Google Translate Initialization Function
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'it,en', // Specifica le lingue desiderate
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

// Call the function to load the Google Translate Widget
document.addEventListener('DOMContentLoaded', loadGoogleTranslate);