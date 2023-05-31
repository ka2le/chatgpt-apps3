javascript:(function(){
    var head = document.getElementsByTagName('head')[0];
    var element = document.createElement('script');
    element.id = 'myBookmarkletScript';
    var mainUrl = 'http://localhost:3000/chatgpt-apps3/bookmarklets/gptEnhanceMain.js?' + new Date().getTime();
    var fallbackUrl = 'https://ka2le.github.io/chatgpt-apps3/bookmarklets/gptEnhanceMain.js?' + new Date().getTime();
    element.onerror = function () {
        /* If the main URL fails, try the fallback URL */
        element.src = fallbackUrl;
        element.onerror = null;
        head.appendChild(element);
    };
    element.src = mainUrl;
    document.body.appendChild(element);
})();
