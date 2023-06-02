javascript: (function () {
    console.log("GPT MAIN: /*version-number*/");
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
                window.useRef = preactHooks.useRef;
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

        function sendOverAllText() {
            var text = document.getElementById("overAllText").value;
            sendText(text);
        }


        function TextArea({ id, style = "", value = "", class: className = "" }) {
            return html`
                <textarea id="${id}" style="${style}" class="${className}">
                    ${value}
                </textarea>
            `;
        }

        function insertCheckboxes() {
            /* Get all ordered lists in the document */
            var mainElement = document.getElementsByTagName('main')[0];
            var orderedLists = mainElement.getElementsByTagName('ol');

            for (var i = 0; i < orderedLists.length; i++) {
                var listItems = orderedLists[i].getElementsByTagName('li');
                for (var j = 0; j < listItems.length; j++) {

                    /* If this list item already has a checkbox, skip this iteration */
                    if (listItems[j].classList.contains('has-checkbox')) {
                        continue;
                    }

                    var checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    var listItemNumber = j + 1;
                    var listItemText = listItems[j].innerHTML.replace(/<[^>]*>?/gm, '');
                    /*  checkbox.onclick = (function (num, text) {
                          return function () {
                              insertIntoTextarea(num, text);
                          };
                      })(listItemNumber, listItemText);*/
                    checkbox.dataset.listText = "Option " + listItemNumber + ": " + listItemText;
                    listItems[j].style.display = 'flex';
                    listItems[j].style.alignItems = 'center';
                    listItems[j].insertBefore(checkbox, listItems[j].firstChild);

                    /* Add a class to this list item to indicate that a checkbox has been added */
                    listItems[j].classList.add('has-checkbox');
                }
            }
        }


        function insertIntoTextarea(listItemNumber, listItemText) {
            var textarea = document.getElementById('prompt-textarea');
            textarea.value += listItemNumber + '. ' + listItemText + '\n';
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

        function Ability({ name, scores = [] }) {
            return html`
                <div style="${utilVars.abilityStyle}" class="ability">
                    <span>${name}</span>
                    <${Checkbox} id="${name}Checkbox" />
                    <${Dropdown} id="${name}Dropdown" options=${scores} />
                </div>
            `;
        }
        /*const abilities = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
        const scores = [-2, -1, 0, 1, 2, 3, 4, 5];*/

        function DnDStatBlock({ abilities, style = "", scores = [] }) {
            return html`
                <div style="${style}" class="statBlock">
                    ${abilities.map(function (ability) { return html`<${Ability} name=${ability} scores=${scores} />` })}
                </div>
            `;
        }

        function addDndStatBlock() {
           /* var dndStatBlock = html`<${DnDStatBlock} abilities=${abilities} scores=${scores} />`;
            addToToolWindow(dndStatBlock);*/
        }

        function addToToolWindow(element) {
            var existingToolWindow = document.getElementById('toolWindow');
            if (existingToolWindow != null) {
                render(element, existingToolWindow);
            }

        }

        function InputBox(id, value = "") {
            return html`
                <input type="text" id="${id}" style="${utilVars.inputBoxStyle}" value="${value}">
            `;
        }


        function insertBookmarkletDevCorrections() {
            insertTextInPrompt(`\nWhen giving the answer, keep this in mind:\nAlways do comments in the code like /*COMMENT HERE*/ never do // like //COMMENT HERE  \nNever use arrow functions =>`);
        }

        function insertRollDie() {
            var randomValue = Math.floor(Math.random() * 20) + 1;
            insertTextInPrompt(`Result: ${randomValue + 4} (${randomValue + 4} Roll + 1 INT +3 Proficiency)`);
        }
        function runRoolwindowJs() {
            var code = document.getElementById("codeBox").value;
            console.log(code);
            runJs(code);
        }

        function getLastListCheckboxes() {
            var mainElement = document.getElementsByTagName('main')[0];
            var orderedLists = mainElement.getElementsByTagName('ol');
            console.log(orderedLists);
            if (orderedLists.length > 0) {
                var checkboxes = orderedLists[orderedLists.length - 1].getElementsByTagName('input');
                console.log(checkboxes);
                return checkboxes;
            }
            return [];
        }

        function getFirstCheckedText(checkboxes) {
            for (var j = 0; j < checkboxes.length; j++) {
                if (checkboxes[j].checked) {
                    console.log(checkboxes[j]);
                    return checkboxes[j].dataset.listText;
                }
            }
            return "";
        }

        function buildDndText() {
            var randomValue = Math.floor(Math.random() * 20) + 1;
            var optionText = getFirstCheckedText(getLastListCheckboxes());
            console.log(optionText);
            var ResultText = `${optionText} \nResult: ${randomValue + 4} (${randomValue + 4} Roll + 1 INT +3 Proficiency)`;
            replaceInsertText(ResultText);
        }

        function replaceInsertText(newText) {
            var textarea = document.getElementById("prompt-textarea");
            var currentText = textarea.value;
            console.log(currentText);

            var regex = /\[.*?\]/s;
            console.log(regex);
            console.log(currentText.match(regex));
            if (currentText.match(regex)) {
                textarea.value = currentText.replace(regex, '[' + newText + ']');
            } else {
                textarea.value = currentText + '[' + newText + ']';
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

        function copyGPTAnswer() {
            const container = document.querySelector('main > .flex-1.overflow-hidden');
            if (container) {
                const groupElements = container.querySelectorAll('.group.w-full');
                if (groupElements.length > 0) {
                    const gptPost = groupElements[groupElements.length - 1].innerHTML;
                    document.getElementById("overAllAnswers").innerHTML += gptPost;

                }
            }
        }

        function Overlay({ isOverlayOpen, toggleOverlay }) {

            return html`
                <div id="overAll" style=${utilVars.overlayStyle} style="display: ${isOverlayOpen ? 'block' : 'none'}">
                <${TextArea} id="overAllText"/>
                ${Button("Send Message", sendOverAllText)}
                ${Button("Toggle Overlay", toggleOverlay)}
                <div id="overAllAnswers"></div>
                </div>
            `;
        }
        function addOverlay(Overlay) {
            console.log("addingOVerlay");
            render(html`<${Overlay} />`, document.getElementById("gpt-enhancer-root"));
        }
        function findOverlayContainerDOM() {
            return document.getElementById("gpt-enhancer-root");
        }


        function toggleOverAll() {
            var overAll = document.getElementById("overAll");
            console.log(overAll.style.display);
            if (overAll.style.display == "block") {
                overAll.style.display = "none";
            } else {
                overAll.style.display = "block";
            }
        }
        function ToggleOverAllButton() {
            return html`${Button("ToggleOverAll", toggleOverAll)}`;
        }
        function ToolBar({ toggleOverlay }) {
            return html`
        <div 
            id="toolBar" >
            ${Button("Correction", insertBookmarkletDevCorrections)}
            ${Button("RollD20", insertRollDie)}
            ${Button("RollD20_V2", buildDndText)}
            ${Button("RunJS", runRoolwindowJs)}
            ${Button("Toggle Overlay", toggleOverlay)}
            ${Button("SendTest", function () { sendText("Tell me something interesting") })}
            
            </div>
    `;
        }
        function replaceWithToolBar(ToolBar) {
            var toolBar = document.createElement('div');
            render(html`<${ToolBar} />`, toolBar);
            const parentElement = document.querySelector('.absolute.bottom-0');
            if (parentElement) {
                const childElements = parentElement.querySelectorAll('div.text-center');
                if (childElements.length > 0) {
                    const lastChildElement = childElements[childElements.length - 1];
                    lastChildElement.style.display = "none";
                    lastChildElement.appendChild(toolBar);
                }
            }
        }

        function findToolBarContainerDOM() {
            const parentElement = document.querySelector('.absolute.bottom-0');
            if (parentElement) {
                return childElement = parentElement.querySelectorAll('div.text-center')[0];
            }
            return null;
        }

        function useComponentContainer(Component, findContainerFunction, props, triggerRender) {
            const containerRef = useRef(null);

            useEffect(() => {
                containerRef.current = findContainerFunction();
                if (containerRef.current) {
                    containerRef.current.innerHTML = '';
                    render(html`<${Component} ${{ ...props }} />`, containerRef.current);
                }
            }, [props, triggerRender]);

            return containerRef;
        }


        function TheApp() {
            const [haveRemoved, setHaveRemoved] = useState(false);
            const [isOverlayOpen, setIsOverlayOpen] = useState(false);
            const [dndText, setDndText] = useState("");

            const toggleOverlay = () => {
                setIsOverlayOpen(!isOverlayOpen);
            }
            const appProps = {
                toggleOverlay,
                isOverlayOpen,
                haveRemoved,
                setHaveRemoved,
            };
            const [triggerRender, setTriggerRender] = useState(false);
            useComponentContainer(Overlay, findOverlayContainerDOM, appProps, triggerRender);
            useComponentContainer(ToolBar, findToolBarContainerDOM, appProps, triggerRender);

            useEffect(function () {
                removeElementsByClass("gpt-enhancer", haveRemoved, setHaveRemoved);
                addButtonsToExistingSpans();
                addToolWindow(ToolWindow, render, html);
                addDndStatBlock();
                insertCheckboxes();
                addObserver([
                    function () { addButtonsToExistingSpans(); },
                    function () { insertCheckboxes(); },
                    /*function () { copyGPTAnswer(); },*/
                    function () { moveToolWindow(ToolWindow, render, html); },
                    function () { setTriggerRender(function(prevState){ return !prevState});  },

                ]);
                addStyling();
            }, [haveRemoved]);
            return html``;

        };
        /* END SECTION COMPONENTS */
        function RunTheApp(TheApp) {
            var rootId = 'gpt-enhancer-root';
            var existingRoot = document.getElementById(rootId);
            if (existingRoot) {
                existingRoot.remove();
            }
            var appRoot = document.createElement('div');
            appRoot.id = rootId;
            document.body.appendChild(appRoot);
            render(html`<${TheApp} />`, appRoot);
        }



        RunTheApp(TheApp);
    };

})();
