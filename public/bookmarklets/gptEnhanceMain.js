javascript: (function () {
    console.log("gptEnchanceMain 1.22");
    /*Version 1.0*/
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
    var bookmarkletUtils = 'http://localhost:3000/chatgpt-apps3/bookmarklets/min/utils.min.js?' + new Date().getTime();
    var bookmarkletUtilsFallback = 'https://ka2le.github.io/chatgpt-apps3/bookmarklets/min/utils.min.js?' + new Date().getTime();
    loadScript(preactCDN, null, function () {
        loadScript(htmCDN, null, function () {
            loadScript(preactHooksCDN, null, function () {
                window.h = preact.h;
                window.render = preact.render;
                window.html = htm.bind(h);
                window.useState = preactHooks.useState;
                window.useEffect = preactHooks.useEffect;
                loadScript(bookmarkletUtils, bookmarkletUtilsFallback, function () {
                    initApp(window.h, window.render, window.html, window.useState, window.useEffect);
                });
            });
        });
    });


    function initApp(h, render, html, useState, useEffect) {
        var toolWindowStyle = {
            minHeight: "100px",
        };
        /* SECTION COMPONENTS */
        function Checkbox({ id,  checked = false }) {
            return html`
                <input type="checkbox" id="${id}" style="${utilVars.checkboxStyle}" ${checked ? 'checked' : ''} />
            `;
        }
        
        function Dropdown({ id,  options = [] }) {
            return html`
                <select id="${id}" style="${utilVars.dropdownStyle}">
                    ${options.map((option) => html`<option value="${option}">${option}</option>`)}
                </select>
            `;
        }
        
        function Ability({ name,  scores = [] }) {
            return html`
                <div style="${utilVars.abilityStyle}" class="ability">
                    <span>${name}</span>
                    <${Checkbox} id="${name}Checkbox" />
                    <${Dropdown} id="${name}Dropdown" options=${scores} />
                </div>
            `;
        }
        const abilities = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
        const scores = [-2,-1,0,1,2,3,4,5];
        
        function DnDStatBlock({ abilities, style = "", scores = [] }) {
            return html`
                <div style="${style}" class="statBlock">
                    ${abilities.map(function(ability){ return html`<${Ability} name=${ability} scores=${scores} />`})}
                </div>
            `;
        }
        
        function addDndStatBlock() {
            var dndStatBlock = html`<${DnDStatBlock} abilities=${abilities} scores=${scores} />`;
            addToToolWindow(dndStatBlock);
        }
        
        function addToToolWindow(element) {
            const existingToolWindow = document.getElementById('toolWindow');
            render(element, existingToolWindow);
        }
        
        function InputBox(id, value = "") {
            return html`
                <input type="text" id="${id}" style="${utilVars.inputBoxStyle}" value="${value}">
            `;
        }


        function insertBookmarkletDevCorrections() {
            insertTextInPrompt(`\nWhen giving the answer, keep this in mind:\nAlways do comments in the code like /*COMMENT HERE*/ never do // like //COMMENT HERE  \nNever use arrow functions =>`)
        }

        function insertRollDie() {
            var randomValue = Math.floor(Math.random() * 20) + 1;
            insertTextInPrompt(`Result: ${randomValue + 4} (${randomValue + 4} Roll + 1 INT +3 Proficiency)`)
        }
        function runRoolwindowJs() {
            var code = document.getElementById("codeBox").value;
            console.log(code);
            runJs(code)
        }
        function ToolBar() {
            return html`
        <div 
            id="toolBar" >
            ${Button("Correction", insertBookmarkletDevCorrections)}
            ${Button("RollD20", insertRollDie)}
            ${Button("RunJS", runRoolwindowJs)}
            </div>
    `;
        }
        function TextArea({ id, style = "", value = "", class: className = "" }) {
            return html`
                <textarea id="${id}" style="${style}" class="${className}">
                    ${value}
                </textarea>
            `;
        }
        
        function ToolWindow() {
            return html`
                <div 
                    style=${toolWindowStyle} 
                    id="toolWindow"
                    class="group gpt-enhancer w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 dark:bg-gray-800">
                    <div><h2>toolWindow</h2></div>
                    <${TextArea}
                        id="codeBox"
                        class="flex flex-col w-full py-[10px] flex-grow md:py-4 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-xl shadow-xs dark:shadow-xs"
                        style=""
                    />${Button("RunJS", runRoolwindowJs)}
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



        function TheApp() {
            const [haveRemoved, setHaveRemoved] = useState(false);
            useEffect(function () {
                removeElementsByClass("gpt-enhancer", haveRemoved, setHaveRemoved);
                addButtonsToExistingSpans();
                addToolWindow(ToolWindow, render, html);
                replaceWithToolBar(ToolBar, render, html);
                addDndStatBlock();
                addObserver([
                    function () { addButtonsToExistingSpans(); },
                    function () { moveToolWindow(ToolWindow, render, html); },
                    function () { replaceWithToolBar(ToolBar, render, html); },
                ]);
                addStyling();
            }, [haveRemoved]);
            return html``;

        };
        /* END SECTION COMPONENTS */

        RunTheApp(TheApp);
    };

})();
