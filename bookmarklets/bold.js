javascript: (function () {
    console.log("BOLD+ MAIN: /*version-number*/");
    function loadScript(url, fallbackUrl, callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.onerror = function () {
            if (fallbackUrl) {
                var fallbackScript = document.createElement('script');
                fallbackScript.type = 'text/javascript';
                fallbackScript.src = fallbackUrl;
                fallbackScript.onreadystatechange = callback;
                fallbackScript.onload = callback;
                head.appendChild(fallbackScript);
            }
        };
        script.src = url;
        script.onreadystatechange = callback;
        script.onload = callback;
        head.appendChild(script);
    }

    var preactCDN = 'https://unpkg.com/preact@latest/dist/preact.umd.js';
    var preactHooksCDN = 'https://unpkg.com/preact@latest/hooks/dist/hooks.umd.js';
    var htmCDN = 'https://unpkg.com/htm@latest/dist/htm.umd.js';
    loadScript(preactCDN, null, function () {
        loadScript(htmCDN, null, function () {
            loadScript(preactHooksCDN, null, function () {
                window.h = preact.h;
                window.render = preact.render;
                window.html = htm.bind(h);
                window.useState = preactHooks.useState;
                window.useEffect = preactHooks.useEffect;
                window.useRef = preactHooks.useRef;
                window.useMemo = preactHooks.useMemo;
                window.useCallback = preactHooks.useCallback;
                initApp(window.render, window.html, window.useState, window.useEffect, window.useRef, window.useMemo, window.useCallback);
            });
        });
    });


    function initApp(render, html, useState, useEffect, useRef, useMemo, useCallback) {



        function BoldUrl(props) {
            return html`
          
                <a class="boldAdd" href="http://localhost:3000/products/products/edit?id=106221" style="
                line-height: 3; 
                    " target="_blank">✎Edit in Bold</a>
            `;
        }
        function TheApp() {
            const [haveRemoved, setHaveRemoved] = useState(false);
            const props = {
            };
            let inputElement = document.querySelector('input[name="products_model"]').parentElement;
            let newDiv = document.createElement("div");
            newDiv.className = "small-6 columns boldAdd";
            inputElement.parentNode.insertBefore(newDiv, inputElement.nextSibling);
            render(html`<${BoldUrl} ...${props} />`, newDiv);
            useEffect(function () {
                removeElementsByClass("boldAdd", haveRemoved, setHaveRemoved);
              

            }, []);

            return html``;
        };


        function removeExistingRoot(rootId) {
            var existingRoot = document.getElementById(rootId);
            if (existingRoot) {
                existingRoot.remove();
            }
            const elements = document.getElementsByClassName(".boldAdd");
            while (elements.length > 0) {
                if (elements[0].parentNode) { elements[0].parentNode.removeChild(elements[0]); }
            }
        }

        function removeElementsByClass(className, haveRemoved, setHaveRemoved) {
            if (haveRemoved) {
                return "";
            } else {
                const elements = document.getElementsByClassName(className);
                console.log("Removing");
                console.log(elements);
                while (elements.length > 0) {
                    if (elements[0].parentNode) { elements[0].parentNode.removeChild(elements[0]); }
                }
                setHaveRemoved(true);
            }
        }
        function RunTheApp(TheApp) {
            var rootId = 'boldAdd';
            removeExistingRoot(rootId);
            var appRoot = document.createElement('div');
            appRoot.id = rootId;
            document.body.appendChild(appRoot);
            render(html`<${TheApp} />`, appRoot);
        }


        RunTheApp(TheApp);
    };

})();
