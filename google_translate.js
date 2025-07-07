function loadGoogleTranslate() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);
}

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'it,en',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

document.addEventListener('DOMContentLoaded', loadGoogleTranslate);