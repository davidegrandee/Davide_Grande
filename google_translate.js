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
document.addEventListener('DOMContentLoaded', () => {
    loadGoogleTranslate();
    setupNewsletterSubscription();
});