javascript:(function(){
    console.log("55");
    var head = document.getElementsByTagName('head')[0];
    var element = document.createElement('script');
    element.id = 'myBookmarkletScript';
    var mainUrl = 'http://localhost:3000/chatgpt-apps3/bookmarklets/gptEnhanceMain.min.js?' + new Date().getTime();
    var fallbackUrl = 'https://ka2le.github.io/chatgpt-apps3/bookmarklets/gptEnhanceMain..min.js?' + new Date().getTime();
    element.src = mainUrl;
    element.onload = function() {
        console.log('Main script loaded successfully');
    };
    element.onerror = function() {
        console.log('Failed to load main script, trying fallback');
        loadFallback();
    };
    head.appendChild(element);

    function loadFallback() {
        var fallbackElement = document.createElement('script');
        fallbackElement.id = 'myBookmarkletFallbackScript';
        fallbackElement.src = fallbackUrl;
        fallbackElement.onload = function() {
            console.log('Fallback script loaded successfully');
        };
        fallbackElement.onerror = function() {
            console.log('Failed to load fallback script');
        };
        head.appendChild(fallbackElement);
    }
})();
