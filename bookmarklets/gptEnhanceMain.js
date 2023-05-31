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
    var bookmarkletUtils = 'http://localhost:3000/chatgpt-apps3/bookmarklets/utils.js?' + new Date().getTime(); /* 'https://ka2le.github.io/chatgpt-apps3/bookmarklets/utils.js?v7';*/
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
        function insertTextInPrompt(text){
            var textarea = document.getElementById("prompt-textarea");
            textarea.value += text;
        }
        function insertBookmarkletDevCorrections(){
            insertTextInPrompt(`\nAdditional considerations:\nAlways do comments like /*COMMENT*/ never //Comment  \nNever use arrow functions =>`)
        }
        
        function ToolBar() {
            return html`
        <div 
            id="toolBar">
            <button
            onclick="${insertBookmarkletDevCorrections}"
            >Corrections</button>
            <button>Button2</button>
            <button>Button2</button>
            </div>
    `;
        }

        function ToolWindow() {
            return html`
        <div 
            style=${toolWindowStyle} 
            id="toolWindow"
            class="group gpt-enhancer w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 dark:bg-gray-800">
            <h1>Toolwindow <span>toolWindow</span></h1>
            <div>Hej</div>
            <textarea 
            class="flex flex-col w-full py-[10px] flex-grow md:py-4 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-xl shadow-xs dark:shadow-xs"
            style=""></textarea><button>Button1</button>
        </div>
    `;
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

        function RunJsButton(props) {
            function runJsWrapper() {
                var theCleanCode = getCleanCode(props.spanElement);
                runJs(theCleanCode);
            }
            return html`
            <button 
                style=${buttonStyle} 
                class="flex ml-auto gap-2"
                onClick=${runJsWrapper}>${html([utilVars?.runIcon])}Run</button>
        `;
        }

        function DownloadSVGButton(props) {
            function downloadSVGWrapper() {
                var theCleanCode = getCleanCode(props.spanElement);
                downloadSVG(theCleanCode);
            }
            return html`
            <button 
                style=${buttonStyle} 
                class="flex ml-auto gap-2"
                onClick=${downloadSVGWrapper}>${html([utilVars?.downloadIcon])}Download</button>
        `;
        }

        function ToggleEditableButton(props) {
            function toggleEditableWrapper(){
                toggleEditable(props);
            }
            
            return html`
            <button 
                style=${buttonStyle} 
                class="flex ml-auto gap-2"
                onClick=${toggleEditableWrapper}>${html([utilVars?.editIcon])}Edit</button>
        `;
        }

        function TheApp() {
            const [haveRemoved, setHaveRemoved] = useState(false);
            useEffect(function () {
                removeElementsByClass("gpt-enhancer", haveRemoved,setHaveRemoved);
                addButtonsToExistingSpans();
                addToolWindow(ToolWindow, render,html  );
                replaceWithToolBar(ToolBar, render,html);
                addObserver([
                    function () { addButtonsToExistingSpans(); },
                    function () { moveToolWindow(ToolWindow, render,html ); },
                    function () { replaceWithToolBar(ToolBar, render,html); },
                ]);
                addStyling();
            }, [haveRemoved]);
            return html``;

        };
        /* END SECTION COMPONENTS */

        RunTheApp(TheApp, render, html);
    };

})();
