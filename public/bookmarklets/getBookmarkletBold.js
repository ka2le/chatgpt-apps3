javascript:(function() {
    console.log("GET BOOKMARKLET: /*version-number*/");
    var head = document.getElementsByTagName('head')[0];
    var mainUrl = 'http://localhost:3001/chatgpt-apps3/bookmarklets/min/bold.min.js?' + new Date().getTime();
    var fallbackUrl = 'http://localhost:3000/chatgpt-apps3/bookmarklets/min/bold.min.js?' + new Date().getTime();
    var scriptId = 'myBookmarkletScript';

    /* Create the main script element */
    var element = document.createElement('script');
    element.id = scriptId;
    element.src = mainUrl;
    element.onload = function() {
        console.log('Main script loaded successfully');
    };
    element.onerror = function() {
        console.log('Failed to load main script, trying fallback');
        loadFallback();
    };
    head.appendChild(element);
    /* Load the fallback script if the main script fails */
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

    /* Load the main script */
    function loadMainScript(scriptContent) {
        var newElement = document.createElement('script');
        newElement.id = scriptId;
        newElement.innerHTML = scriptContent;
        newElement.onload = function() {
            console.log('Script updated successfully');
        };
        newElement.onerror = function() {
            console.log('Failed to load updated script');
        };
        head.appendChild(newElement);
    }

})();
