javascript: (function () {

    /* SECTION IMPORTS */
    function loadScript(url, callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onreadystatechange = callback;
        script.onload = callback;
        head.appendChild(script);
    }
    /* END SECTION IMPORTS */
    /* SECTION LIBRARY LOADERS */
    var preactCDN = 'https://unpkg.com/preact@latest/dist/preact.umd.js';
    var preactHooksCDN = 'https://unpkg.com/preact@latest/hooks/dist/hooks.umd.js';
    var htmCDN = 'https://unpkg.com/htm@latest/dist/htm.umd.js';

    loadScript(preactCDN, function () {
        console.log('Preact has been loaded!');
        loadScript(htmCDN, function () {
            console.log('HTM has been loaded!');
            loadScript(preactHooksCDN, function () {
                initApp();
            });
        });
    });

    /* END SECTION LIBRARY LOADERS */


    function initApp() {
        /* SECTION INIT PREACT AND HTM, useState and useEffect */
        var h = preact.h;
        var render = preact.render;
        var html = htm.bind(h);
        var useState = preactHooks.useState;
        var useEffect = preactHooks.useEffect;
        /* END SECTION INIT PREACT AND HTM */


        var buttonStyle = {
        };
        /* END SECTION STYLES */

        /* SECTION COMPONENTS */
        function decodeHtmlEntities(text) {
            var textArea = document.createElement('textarea');
            textArea.innerHTML = text;
            return textArea.value;
        }

        function addButtonsToExistingSpans() {
            var spans = document.querySelectorAll('button:not([data-js-button])');
            spans.forEach(function (span) {
                if (span.innerText.includes('Copy code')) {
                    span.setAttribute('data-js-button', 'true');
                    var newInnerText = span.innerText.replace("Copy code", 'Copy');
                    span.setAttribute("innerHtml", newInnerText);
                    var runJsButton = document.createElement('div');
                    render(html`<${RunJsButton} spanElement=${span}/>`, runJsButton);
                    span.parentElement.insertBefore(runJsButton, span.nextSibling);
                    var toggleEditableButton = document.createElement('div');
                    render(html`<${ToggleEditableButton} spanElement=${span}/>`, toggleEditableButton);
                    span.parentElement.insertBefore(toggleEditableButton, runJsButton);
                }
            });
        }
        
        function addStyling(){
            var gap2 = document.querySelectorAll('.gap-2');
            gap2.forEach(function (gap) {
                gap.style.gap = "0px"
            });
        }

        function addObserver() {
            var observer = new MutationObserver(function (mutationsList, observer) {
                for (var mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        addButtonsToExistingSpans();
                    }
                }
            });
            observer.observe(document, { attributes: false, childList: true, subtree: true });
            return function () {
                observer.disconnect();
            }
        }

        function RunJsButton(props) {
            function runJs() {
                var grandParentElement = props.spanElement.parentElement.parentElement;
                var codeElement = grandParentElement.querySelector('code');
                if (!codeElement) {
                    alert('No related code element found');
                    return;
                }
                var code = codeElement.innerHTML;
                console.log("code");
                console.log(code);
                var cleanCode = code.replace(/<span class="hljs[^"]*">|<\/span>/g, '');
                cleanCode = decodeHtmlEntities(cleanCode);
                console.log(cleanCode);
                try {
                    var newFunction = new Function(cleanCode);
                    console.log("cleanCode");
                    console.log(cleanCode);
                    newFunction();
                } catch (e) {
                    alert('Failed to execute function: ' + e.message);
                }
            }
            return html`
                <button 
                    style=${buttonStyle} 
                    class="flex ml-auto gap-2"
                    onClick=${runJs}><svg stroke="currentColor" fill="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polygon points="8 5 16 12 8 19 8 5"/></svg>Run</button>
            `;
        }

        function ToggleEditableButton(props) {
            function toggleEditable() {
                var grandParentElement = props.spanElement.parentElement.parentElement;
                var codeElement = grandParentElement.querySelector('code');
                if (!codeElement) {
                    alert('No related code element found');
                    return;
                }
                if (codeElement.hasAttribute('contentEditable')) {
                    if (codeElement.getAttribute('contentEditable') == 'true') {
                        codeElement.setAttribute('contentEditable', 'false');
                    } else {
                        codeElement.setAttribute('contentEditable', 'true');
                    }
                } else {
                    var code = codeElement.innerHTML;
                    var cleanCode = code.replace(/<span class="hljs[^"]*">|<\/span>/g, '');
                    codeElement.setAttribute('contentEditable', 'true');
                    codeElement.setAttribute('innerHtml', cleanCode);
                }
            }
            return html`
                <button 
                    style=${buttonStyle} 
                    class="flex ml-auto gap-2"
                    onClick=${toggleEditable}><svg fill="currentColor" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>Edit</button>
            `;
        }

        function TheApp() {
            useEffect(function () {
                addButtonsToExistingSpans();
                addObserver();
                addStyling();
            }, []);
            return html`${RunJsButton} <${ToggleEditableButton}`;
            
        };


        /* END SECTION COMPONENTS */

        /* SECTION CLEANUP */
        var rootId = 'my-bookmarklet-root';
        var existingRoot = document.getElementById(rootId);
        if (existingRoot) {
            existingRoot.remove();
        }
        /* END SECTION CLEANUP */

        /* SECTION ADD CODE */
        var appRoot = document.createElement('div');
        appRoot.id = rootId;
        document.body.appendChild(appRoot);
        /* END SECTION ADD CODE */

        /* SECTION RENDER */
        render(html`<${TheApp} />`, appRoot);
        /* END SECTION RENDER */
    };

})();
