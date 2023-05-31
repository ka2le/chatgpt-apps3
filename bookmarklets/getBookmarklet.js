javascript:(function(){
    function reloadScript() {
        var oldScript = document.getElementById('myBookmarklet');
        var newScript = document.createElement('script');
        newScript.id = 'myBookmarklet';
        newScript.src = 'http://localhost:3000/chatgpt-apps3/bookmarklets/gptEnhanceMain.js?' + new Date().getTime();
        oldScript.parentNode.replaceChild(newScript, oldScript);
    }

    var element = document.createElement('script');
    element.id = 'myBookmarklet';
    element.src = 'http://localhost:3000/chatgpt-apps3/bookmarklets/gptEnhanceMain.js?' + new Date().getTime();
    document.body.appendChild(element);

    var reloadInterval = 60000;  
    setInterval(reloadScript, reloadInterval);
})();
