javascript: (function () {
    console.log("GPT MAIN: /*version-number*/");
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
                window.useMemo = preactHooks.useMemo;
                loadScript(bookmarkletUtils, bookmarkletUtilsFallback, function () {
                    initApp( window.render, window.html, window.useState, window.useEffect, window.useRef,  window.useMemo);
                });
            });
        });
    });


    function initApp( render, html, useState, useEffect, useRef, useMemo) {
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
                    if (listItems[j].classList.contains('has-checkbox')) {
                        continue;
                    }
                    var checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    var listItemNumber = j + 1;
                    var listItemText = listItems[j].innerHTML.replace(/<[^>]*>?/gm, '');
                    checkbox.dataset.listText = "Option " + listItemNumber + ": " + listItemText;
                    listItems[j].style.display = 'flex';
                    listItems[j].style.alignItems = 'center';
                    listItems[j].insertBefore(checkbox, listItems[j].firstChild);
                    listItems[j].classList.add('has-checkbox');
                }
            }
        }


        function insertIntoTextarea(listItemNumber, listItemText) {
            var textarea = document.getElementById('prompt-textarea');
            textarea.value += listItemNumber + '. ' + listItemText + '\n';
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
        const abilities = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
        const scores = [-2, -1, 0, 1, 2, 3, 4, 5];

        function DnDStatBlock({ abilities, style = "", scores = [] }) {
            return html`
                <div style="${style}" class="statBlock">
                    ${abilities.map(function (ability) { return html`<${Ability} name=${ability} scores=${scores} />` })}
                </div>
            `;
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
            var regex = "/\[.*?\]/s";
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
                    var runJsButton = document.createElement('div');
                    render(html`<${RunJsButton} spanElement=${button}/>`, runJsButton);
                    addElement(button.parentElement, runJsButton, button.nextSibling);
                    var downloadSVGButton = document.createElement('div');
                    render(html`<${DownloadSVGButton} spanElement=${button}/>`, downloadSVGButton);
                    addElement(button.parentElement, downloadSVGButton, button.nextSibling);
                    var toggleEditableButton = document.createElement('div');
                    render(html`<${ToggleEditableButton} spanElement=${button}/>`, toggleEditableButton);
                    addElement(button.parentElement, toggleEditableButton, button.nextSibling);
                }
            });
        }

        function copyGPTAnswer() {
            var container = document.querySelector('main > .flex-1.overflow-hidden');
            if (container) {
                var groupElements = container.querySelectorAll('.group.w-full');
                if (groupElements.length > 0) {
                    var gptPost = groupElements[groupElements.length - 1].innerHTML;
                    document.getElementById("overAllAnswers").innerHTML += gptPost;

                }
            }
        }


       
         /*CONTAINER FIND AND INSERT FUNCTION*/ 
         function findOverlayContainerDOM() {
            return document.getElementById("__next");
        }
         function findToolBarContainerDOM() {
            const parentElement = document.querySelector('.absolute.bottom-0');
            if (parentElement) {
                return childElement = parentElement.querySelectorAll('div.text-center')[0];
            }
            return null;
        }

        function useComponentContainer(Component, findContainerFunction, props) {
            const containerRef = useRef(null);
        
            useEffect(() => {
                containerRef.current = findContainerFunction ? findContainerFunction() : getDefaultContainerDOM();
                if (containerRef.current) {
                    render(html`<${Component} props=${props} />`, containerRef.current);
                }
            }, [props]);
        
            return containerRef;
        }
        function getDefaultContainerDOM() {
            let element = document.getElementById('__NEXT_DATA__');
            if (!element) {
                element = document.createElement('div');
                element.id = 'gpt-enhancer-root';
                document.body.appendChild(element);
            }
            return element;
        }

        function moveComponent(containerRef, newContainerFunction) {
            useEffect(() => {
                const newContainer = newContainerFunction();
                if (newContainer && containerRef.current) {
                    newContainer.appendChild(containerRef.current);
                }
            }, [containerRef]);
        }
        /*END CONTAINER FIND AND INSERT FUNCTION*/ 

        /*MAIN COMPONENTS*/ 
        function Overlay(props) {
            console.log("Updating Overlay");
            console.log(props);
            console.log(props.props.isOverlayOpen);
            return html`
                <div id="overAll" style=${{
                    display: props.props.isOverlayOpen ? 'block' : 'none',
                    ...utilVars.overlayStyle
                }}>
                <${TextArea} id="overAllText"/>
                ${Button("Send Message", sendOverAllText)}
                ${Button("Toggle Overlay", function () { props.props.toggleOverlay() })}
                <div id="overAllAnswers"></div>
                </div>
            `;
        }

       

        function ToolBar(props) {
            return html`
        <div 
            id="toolBar" >
            ${Button("Correction", insertBookmarkletDevCorrections)}
            ${Button("RollD20", insertRollDie)}
            ${Button("RollD20_V2", buildDndText)}
            ${Button("RunJS", runRoolwindowJs)}
            ${Button("Toggle Overlay", function () { props.props.toggleOverlay() })}
            ${Button("Toolwindow", function () { props.props.toggleToolWindow() })}
            ${Button("SendTest", function () { sendText("Tell me something interesting") })}
            
            </div>
    `;
        }
        function ToolWindow(props) {
            return html`
                <div 
                style=${{
                    display: props.props.isToolWindowVisible ? 'block' : 'none',
                    ...utilVars.toolWindowStyle
                }}
                    id="toolWindow"
                    class="group gpt-enhancer w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 dark:bg-gray-800">
                    <${DnDStatBlock} abilities=${abilities} scores=${scores} /><br></br>
                    <div><h2>toolWindow</h2></div>
                    <${TextArea}
                        id="codeBox"
                        class="flex flex-col w-full py-[10px] flex-grow md:py-4 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-xl shadow-xs dark:shadow-xs"
                        style=""
                    />${Button("RunJS", runRoolwindowJs)}
                </div>
            `;
        }
        /*END MAIN COMPONENTS*/ 

       

       

        function TheApp() {
            const [haveRemoved, setHaveRemoved] = useState(false);
            const [isOverlayOpen, setIsOverlayOpen] = useState(false);
            const [isToolWindowVisible, setIsToolWindowVisible] = useState(false);
            const [dndText, setDndText] = useState("");
            const toggleOverlay = () => {
                setIsOverlayOpen(!isOverlayOpen);
            }
            const toggleToolWindow = () => {
                setIsToolWindowVisible(!isToolWindowVisible);
            }
            const [triggerRender, setTriggerRender] = useState(false);
            const appProps = useMemo(() => ({
                toggleOverlay,
                isOverlayOpen,
                toggleToolWindow,
                isToolWindowVisible,
                haveRemoved,
                setHaveRemoved,
                triggerRender,
            }), [toggleOverlay, isOverlayOpen, haveRemoved, setHaveRemoved, triggerRender, isToolWindowVisible, setIsToolWindowVisible]);
            const toolBarRef = useComponentContainer(ToolBar, findToolBarContainerDOM, appProps);
            const overlayRef = useComponentContainer(Overlay, findOverlayContainerDOM, appProps);
            
            useEffect(function () {
                removeElementsByClass("gpt-enhancer", haveRemoved, setHaveRemoved);
                addButtonsToExistingSpans();
                insertCheckboxes();
                addObserver([
                    function () { addButtonsToExistingSpans(); },
                    function () { insertCheckboxes(); },
                    function () { addStyling(); },
                    /*function () { copyGPTAnswer(); },*/
                    function () { setTriggerRender(prevState => !prevState); },

                ]);
                addStyling();
            }, [haveRemoved, setTriggerRender,triggerRender]);
            return html`<${ToolWindow} props=${appProps} />`;
        };
        /* END SECTION COMPONENTS */
        function removeExistingRoot(rootId) {
            var existingRoot = document.getElementById(rootId);
            if (existingRoot) {
                existingRoot.remove();
            }
        }

        function RunTheApp(TheApp) {
            var rootId = 'gpt-enhancer-root';
            removeExistingRoot(rootId);
            var appRoot = document.createElement('div');
            appRoot.id = rootId;
            document.body.appendChild(appRoot);
            render(html`<${TheApp} />`, appRoot);
        }



        RunTheApp(TheApp);
    };

})();
