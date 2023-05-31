javascript:(function(){
    function reloadScript() {
        console.log("Reloading");
        var oldScript = document.getElementById('myBookmarkletScript');
        var newScript = document.createElement('script');
        newScript.id = 'myBookmarklet';
        newScript.src = 'http://localhost:3000/chatgpt-apps3/bookmarklets/gptEnhanceMain.js?' + new Date().getTime();
        oldScript.parentNode.replaceChild(newScript, oldScript);
    }

    var element = document.createElement('script');
    element.id = 'myBookmarkletScript';
    element.src = 'http://localhost:3000/chatgpt-apps3/bookmarklets/gptEnhanceMain.js?' + new Date().getTime();
    document.body.appendChild(element);

    var reloadInterval = 60000;  
    /*setInterval(reloadScript, reloadInterval);*/
})();
