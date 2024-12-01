function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'fr',
        includedLanguages: 'en,fr,es,it,nl,pl,pt,tr',
    }, 'google_translate_element');
    
    setTimeout(function() {
        // Set the default language to Spanish
        var selectElement = document.querySelector('#google_translate_element select');
        var el = document.querySelector("#google_translate_element div"), child = el.firstChild, nextChild;

        while (child) {
            nextChild = child.nextSibling;
            if (child.nodeType == 3) {
                el.removeChild(child);
                document.querySelector("#google_translate_element div span").remove();
            }
            child = nextChild;
        }

        // selectElement.value = 'fr';
        // selectElement.dispatchEvent(new Event('change'));
    }, 100);
}