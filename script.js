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

// Translation System
const translations = {
    en: {
        welcome: "Welcome to my website!",
        description: "This is a description of the website."
    },
    it: {
        welcome: "Benvenuto nel mio sito web!",
        description: "Questa è una descrizione del sito web."
    }
};

function translatePage(language) {
    if (translations[language]) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[language][key]) {
                element.textContent = translations[language][key];
            } else {
                console.warn(`Translation key "${key}" not found for language "${language}".`);
            }
        });
    } else {
        console.error(`Language "${language}" not supported.`);
    }
}

// Google Translate API Integration
async function translateText(text, targetLanguage) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                q: text,
                target: targetLanguage
            })
        });

        if (response.ok) {
            const data = await response.json();
            return data.data.translations[0].translatedText;
        } else {
            console.error("Failed to fetch translation:", response.statusText);
        }
    } catch (error) {
        console.error("Error during translation API call:", error);
    }
}

// Example usage of Google Translate API
async function exampleTranslation() {
    const translatedText = await translateText('Welcome to my website!', 'it');
    if (translatedText) {
        console.log(translatedText); // Output: "Benvenuto nel mio sito web!"
    }
}

// Initialization Function
function initializeApp() {
    console.log("Initializing app...");
    renderPortfolio();
    setupNewsletterSubscription();

    // Example: Translate the page to Italian
    // translatePage('it');

    // Example: Test Google Translate API
    // exampleTranslation();
}

// Run initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Modal Popup for Portfolio Details
function setupPortfolioModals() {
    const portfolioItems = document.querySelectorAll('.portfolio-item a');
    const modal = document.createElement('div');
    modal.id = 'portfolio-modal';
    modal.style.display = 'none';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h3 id="modal-title"></h3>
            <p id="modal-description"></p>
        </div>`;
    document.body.appendChild(modal);

    const closeModal = () => {
        modal.style.display = 'none';
    };

    modal.querySelector('.close').addEventListener('click', closeModal);

    portfolioItems.forEach((item, index) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const title = item.closest('.portfolio-item').querySelector('h3').textContent;
            const description = item.closest('.portfolio-item').querySelector('p').textContent;

            modal.querySelector('#modal-title').textContent = title;
            modal.querySelector('#modal-description').textContent = description;

            modal.style.display = 'block';
        });
    });

    // Close the modal when clicking outside the content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

// Call this function in the `initializeApp` function
// setupPortfolioModals();

// Smooth Scroll to Sections
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function initializeApp() {
    console.log("Initializing app...");
    renderPortfolio();
    setupNewsletterSubscription();
    setupPortfolioModals();
    setupSmoothScroll();
    setupDarkModeToggle();
    setupFormValidation();

    // Example: Set up countdown timer for an event
    const eventDate = new Date();
    eventDate.setDate(eventDate.getDate() + 7);
    setupCountdownTimer(eventDate);
}