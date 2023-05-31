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
    var bookmarkletUtils = 'https://ka2le.github.io/chatgpt-apps3/bookmarklets/utils.js?v1';



    loadScript(preactCDN, function () {
        console.log('Preact has been loaded!');
        loadScript(htmCDN, function () {
            console.log('HTM has been loaded!');
            loadScript(preactHooksCDN, function () {
                loadScript(bookmarkletUtils, function () {
                    initApp();
                });
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
            margin: "0 5px",
        };
        var toolWindowStyle = {
            minHeight: "100px",

        };
        /* END SECTION STYLES */

        /* SECTION COMPONENTS */

        function ToolBar() {
            return html`
        <div 
            id="toolBar">
            <button>Button1</button>
            <button>Button2</button>
            <button>Button2</button>
            </div>
    `;
        }
        function replaceWithToolBar() {
            var toolBar = document.createElement('div');
            render(html`<${ToolBar} />`, toolBar);
            const parentElement = document.querySelector('.absolute.bottom-0');
            if (parentElement) {
                const childElements = parentElement.querySelectorAll('div.text-center');
                if (childElements.length > 0) {
                    const lastChildElement = childElements[childElements.length - 1];
                    lastChildElement.innerHTML = '';
                    lastChildElement.appendChild(toolBar);
                }
            }
        }

        function ToolWindow() {
            return html`
        <div 
            style=${toolWindowStyle} 
            id="toolWindow"
            class="group gpt-enhancer w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 dark:bg-gray-800">
            <h1>Toolwindow <span>toolWindow</span></h1>
            <div>Hej</div>
            <textarea style="color:black"></textarea><button>Button1</button>
        </div>
    `;
        }
        function moveToolWindow() {
            const toolWindow = document.getElementById('toolWindow');
            if (!toolWindow) {
                console.log("Tool Window does not exist");
                return;
            }
            const container = document.querySelector('main > .flex-1.overflow-hidden');
            if (container) {
                const groupElements = container.querySelectorAll('.group.w-full');
                let beforeThis;
                if (groupElements.length > 1) {
                    beforeThis = groupElements[groupElements.length - 2];
                } else if (groupElements.length === 1) {
                    beforeThis = groupElements[0];
                } 
                if (beforeThis && beforeThis.previousElementSibling !== toolWindow) {
                    beforeThis.parentNode.insertBefore(toolWindow, beforeThis);
                } else if (!beforeThis && container.lastChild !== toolWindow) {
                    container.appendChild(toolWindow);
                }
            }
        }
        
        
        function addToolWindow() {
            const existingToolWindow = document.getElementById('toolWindow');
            if (existingToolWindow) {
                console.log("Tool Window already exists");
                return;
            }
            var toolWindow = document.createElement('div');
            render(html`<${ToolWindow} />`, toolWindow);
            const container = document.querySelector('main > .flex-1.overflow-hidden');

            if (container) {
                const groupElements = container.querySelectorAll('.group.w-full');
                if (groupElements.length > 1) {
                    const beforeThis = groupElements[groupElements.length - 2];
                    beforeThis.parentNode.insertBefore(toolWindow, beforeThis);
                } else if (groupElements.length === 1) {
                    const beforeThis = groupElements[0];
                    beforeThis.parentNode.insertBefore(toolWindow, beforeThis);
                } else {

                    container.appendChild(toolWindow);
                }
            }
        }

        function addButtonsToExistingSpans() {
            var buttons = document.querySelectorAll('button:not([gpt-enhancer-modified])');
            buttons.forEach(function (button) {
                if (button.innerText.includes('Copy code')) {
                    button.setAttribute('gpt-enhancer-modified', 'true');
                    var newInnerText = button.innerText.replace("Copy code", 'Copy');
                    button.setAttribute("innerHtml", newInnerText);
                    /* if (checkCodeBoxType(button, "javascript")) {*/
                    var runJsButton = document.createElement('div');
                    render(html`<${RunJsButton} spanElement=${button}/>`, runJsButton);
                    addElement(button.parentElement, runJsButton, button.nextSibling);
                    /*} 
                    if (checkCodeBoxType(button, "html") || checkCodeBoxType(button, "svg")) {*/
                    var downloadSVGButton = document.createElement('div');
                    render(html`<${DownloadSVGButton} spanElement=${button}/>`, downloadSVGButton);
                    addElement(button.parentElement, downloadSVGButton, button.nextSibling);
                    /*}*/
                    var toggleEditableButton = document.createElement('div');
                    render(html`<${ToggleEditableButton} spanElement=${button}/>`, toggleEditableButton);
                    addElement(button.parentElement, toggleEditableButton, button.nextSibling);
                }
            });
        }


        function addObserver(callbacks) {
            var observer = new MutationObserver(function (mutationsList, observer) {
                observer.disconnect();
                
                for (var mutation of mutationsList) {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        for (let i = 0; i < mutation.addedNodes.length; i++) {
                            if (mutation.addedNodes[i].nodeType === Node.ELEMENT_NODE && 
                                mutation.addedNodes[i].classList.contains('group') &&
                                mutation.addedNodes[i].classList.contains('w-full')) {
                                for (let callback of callbacks) {
                                    callback();
                                }
                                break;
                            }
                        }
                    }
                }
                observer.observe(document, { attributes: false, childList: true, subtree: true });
            });
        
            observer.observe(document, { attributes: false, childList: true, subtree: true });
            
            return function () {
                observer.disconnect();
            }
        }

        function RunJsButton(props) {
            function runJsWrapper() {
                var theCleanCode = getCleanCode(props.spanElement);
                runJs(theCleanCode);
            }
            return html`
            <button 
                style=${buttonStyle} 
                class="flex ml-auto gap-2"
                onClick=${runJsWrapper}><svg stroke="currentColor" fill="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polygon points="8 5 16 12 8 19 8 5"/></svg>Run</button>
        `;
        }

        function DownloadSVGButton(props) {
            function downloadSVGWrapper() {
                var theCleanCode = getCleanCode(props);
                downloadSVG(theCleanCode);
            }
            return html`
            <button 
                style=${buttonStyle} 
                class="flex ml-auto gap-2"
                onClick=${downloadSVGWrapper}>${bookmarkletUtils.downloadIcon}Download</button>
        `;
        }

        function ToggleEditableButton(props) {
            function toggleEditable() {
                var grandParentElement = props.spanElement.parentElement.parentElement;
                var codeElement = grandParentElement.querySelector('code');

                if (codeElement.hasAttribute('contentEditable')) {
                    if (codeElement.getAttribute('contentEditable') == 'true') {
                        codeElement.setAttribute('contentEditable', 'false');
                    } else {
                        codeElement.setAttribute('contentEditable', 'true');
                    }
                } else {
                    var cleanCode = getCleanCode(props);
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
            const [haveRemoved, setHaveRemoved] = useState(false);
            function removeElementsByClass(className) {
                if (haveRemoved) {
                    return "";
                } else {
                    const elements = document.getElementsByClassName(className);
                    while (elements.length > 0) {
                        elements[0].parentNode.removeChild(elements[0]);
                    }
                    var elements2 = document.querySelectorAll('[gpt-enhancer-modified]');
                    for (var i = 0; i < elements2.length; i++) {
                        elements2[i].removeAttribute('gpt-enhancer-modified');
                    }
                    setHaveRemoved(true);
                }

            }

            useEffect(function () {
                removeElementsByClass("gpt-enhancer");
                addButtonsToExistingSpans();
                addToolWindow();
                replaceWithToolBar();
                addObserver([
                    function() {  addButtonsToExistingSpans(); },
                    function() { moveToolWindow();  },
                ]);
                addStyling();
            }, [haveRemoved]);
            return html``;

        };
        /* END SECTION COMPONENTS */

        RunTheApp(TheApp, render, html);
    };

})();
