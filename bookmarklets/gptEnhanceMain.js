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
                    initApp(window.render, window.html, window.useState, window.useEffect, window.useRef, window.useMemo);
                });
            });
        });
    });


    function initApp(render, html, useState, useEffect, useRef, useMemo) {
        var toolWindowStyle = {
            minHeight: "100px",
        };
        /* SECTION COMPONENTS */






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










        function insertRollDie(setText) {
            var randomValue = Math.floor(Math.random() * 20) + 1;
            setText(`Result: ${randomValue + 4} (${randomValue + 4} Roll + 1 INT +3 Proficiency)`);
        }
        function runRoolwindowJs() {
            var code = document.getElementById("codeBox").value;
            console.log(code);
            runJs(code);
        }

        function getLastListCheckboxes() {
            var mainElement = document.getElementsByTagName('main')[0];
            var orderedLists = mainElement.getElementsByTagName('ol');
            if (orderedLists.length > 0) {
                var checkboxes = orderedLists[orderedLists.length - 1].getElementsByTagName('input');
                return checkboxes;
            }
            return [];
        }

        function getFirstCheckedText(checkboxes) {
            for (var j = 0; j < checkboxes.length; j++) {
                if (checkboxes[j].checked) {
                    return checkboxes[j].dataset.listText;
                }
            }
            return "";
        }

        function buildDndText(setText, abilities) {
            var randomValue = Math.floor(Math.random() * 20) + 1;
            var optionText = getFirstCheckedText(getLastListCheckboxes());
            let currentAbility;
            abilities.forEach(ability => {
                if (optionText.includes("(" + ability + ")")) {
                    currentAbility = ability;
                }
            });
            const abilityScore = parseInt(document.getElementById(currentAbility + "Dropdown")?.value ?? 0);
            const abilityText = (currentAbility != null ? (abilityScore > -1 ? " + " + abilityScore + " " + currentAbility : abilityScore + " " + currentAbility) : "");
            const resultNumber = randomValue + parseInt(abilityScore);
            setText(`${optionText} Result: ${resultNumber} (${randomValue} Roll ${abilityText})`);
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


        function DnDStatBlock(props) {
            return html`
              <div class="statBlock">
                ${props.standardAbilities.map((ability) => html`<${Ability} ability=${ability} ...${props} />`)}
              </div>
            `;
        }
        function Ability({ ability, ...props }) {
            /*<${Checkbox} id="${ability}Checkbox" /> */
            return html`
              <div style="${utilVars.abilityStyle}" class="ability">
                <span>${ability} </span>
                <${Dropdown} name="${ability}" options=${props.standardScoreOptions} value=${props.abilityScores[ability]} setValue=${props.setAbilityScores} />
              </div>
            `;
        }

        function Dropdown({ name , options = [], value, setValue }) {
            const handleChange = (event) => {
                setValue(prevValues => ({ ...prevValues, [name]: event.target.value }));
            };

            return html`
              <select class="gpt-enhancer" id="${name}Dropdown" style="${utilVars.dropdownStyle}" value="${value}" onchange="${handleChange}">
                ${options.map((option) => html`<option value="${option}">${option}</option>`)}
              </select>
            `;
        }
        function Dropdown2({ name , options = [], value, setValue }) {
            const handleChange = (event) => {
                setValue( event.target.value );
            };

            return html`
              <select class="gpt-enhancer" id="${name}Dropdown" style="${utilVars.dropdownStyle}" value="${value}" onchange="${handleChange}">
                ${options.map((option) => html`<option value="${option}">${option}</option>`)}
              </select>
            `;
        }



        /*MAIN COMPONENTS*/


        function DndToolBarContent(props) {
            if (props.mode == "DND" || props.mode == "ALL") {
                return html`
            <${DnDStatBlock} ...${props} />
            ${Button("Roll D20", function () { buildDndText(props.setAdditionalText, props.standardAbilities) })}            
            ${Button("Correction", function () { props.addToAddtionalText(`\nRemember that a poor Result below 10 should have negative consequenses and below 5 should be really bad. Also remember to always advance the story and offer interesting options. The options should always contain one related ability in paranthesis like (STR)`) })}
            `;
            }
            return "";
        }
        function Resultstreaming() {
            return html`
            <div class="results-streaming">
            Result
            </div>
        `;
        }
        function DefaultToolBarContent(props) {
            if (props.mode == "CODE" || props.mode == "ALL") {
                return html`
                ${Button("Toolwindow", function () { props.toggleToolWindow() })}
                ${Button("RunJS", runRoolwindowJs)}
                ${Button("Toggle Overlay", function () { props.toggleOverlay() })}
                ${Button("Correction", function () { props.addToAddtionalText(`When giving the answer, keep this in mind:\nI am using Preact and Htm in this Bookmarklet code. The main app i the function TheApp and i want to keep most states in that parent \nAlways do comments in the code like /*COMMENT HERE*/ never do // like //COMMENT HERE  `) })}
                ${Button("SendTest", function () { props.sendText("Tell me something interesting") })}
                `;
            }
        }

        function ToolBar(props) {
            return html`
                <div 
                    id="toolBar" class="gpt-enhancer">
                    <${DndToolBarContent} ...${props} />
                    <${DefaultToolBarContent} ...${props} />
                    ${Button("Settings", function(){props.setIsPopupOpen(true); })}
                </div>
            `;
        }
        function ToolWindow(props) {
            return html`
                <div 
                style=${{
                    display: props.isToolWindowVisible ? 'block' : 'none',
                    ...utilVars.toolWindowStyle
                }}
                    id="toolWindow"
                    class="gpt-enhancer group  w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 dark:bg-gray-800">
                    <div><h2>toolWindow</h2></div>
                    <${TextArea}
                        id="codeBox"
                        class="flex flex-col w-full py-[10px] flex-grow md:py-4 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-xl shadow-xs dark:shadow-xs"
                        style=""
                    />${Button("RunJS", runRoolwindowJs)}
                </div>
            `;
        }
        function Overlay(props) {
            const [textAreaValue, setTextAreaValue] = useState();
            function sendOverlayText() {
                props.sendText(textAreaValue);
            }

            return html`
                <div class="gpt-enhancer" id="overAll" style=${{
                    display: props.isOverlayOpen ? 'block' : 'none',
                    ...utilVars.overlayStyle
                }}>
                <${TextArea} id="overAllText" value=${textAreaValue} onChange=${(e) => setTextAreaValue(e.target.value)}/>
                ${Button("Send Message", sendOverlayText)}
                ${Button("Toggle Overlay", function () { props.toggleOverlay() })}
                <div id="overAllAnswers"></div>
                </div>
            `;
        }
        function Popup(props) {

            return html`
                <div class="gpt-enhancer" id="enhancerPopup" style=${{
                    display: props.isPopupOpen ? 'block' : 'none',
                    ...utilVars.popupStyle
                }}>
                
                ${Button("Send Message", function(){console.log("Test");})}
                Mode:<${Dropdown2} ability="${"mode"}" options=${["DND", "ALL", "CODE"]} value=${props.mode} setValue=${props.setMode} />
                ${Button("X", function(){props.setIsPopupOpen(false)}, { float:"right"})}

                <div id="overAllAnswers"></div>
                </div>
            `;
        }

        /*END MAIN COMPONENTS*/
        function TheApp() {
            const [haveRemoved, setHaveRemoved] = useState(false);
            /*MODES DND, CODE, ALL */
            const [mode, setMode] = useState("ALL");
            const [isOverlayOpen, setIsOverlayOpen] = useState(false);
            const [isPopupOpen, setIsPopupOpen] = useState(false);
            const [isToolWindowVisible, setIsToolWindowVisible] = useState(mode == "DND" ? false : true);
            const [additionalText, setAdditionalText] = useState("");
            const textAreaRef = useRef(null);
            const sendButtonRef = useRef(null);
            const standardAbilities = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
            const standardScoreOptions = [-2, -1, 0, 1, 2, 3, 4, 5];
            const [abilityScores, setAbilityScores] = useState({
                STR: 0,
                DEX: 0,
                CON: 0,
                INT: 0,
                WIS: 0,
                CHA: 0,
            });
            const insertTextInPrompt = (text) => {
                if (textAreaRef.current) {
                    var currentText = textAreaRef.current.value
                    var cleanedCurrentText = currentText.replace(/\[.*?\]/s, '');
                    textAreaRef.current.value = cleanedCurrentText + "[" + text + "]";
                    textAreaRef.current.dispatchEvent(new Event('input', { bubbles: true }));
                }
            };
            const sendText = (text) => {
                console.log("Sending" + text);
                insertTextInPrompt(text);
                pressSend();
            };
            const pressSend = () => {
                if (sendButtonRef.current && sendButtonRef.current.tagName === 'BUTTON') {
                    sendButtonRef.current.disabled = false;
                    sendButtonRef.current.click();
                }
            };
            const addToAddtionalText = (text) => {
                setAdditionalText(additionalText + text);
            };
            useEffect(() => {
                insertTextInPrompt(additionalText)
            }, [additionalText])

            const toggleOverlay = () => {
                setIsOverlayOpen(!isOverlayOpen);
            }
           
            const toggleToolWindow = () => {
                setIsToolWindowVisible(!isToolWindowVisible);
            }
            const handleClick = () => {
                // Handle button click event
                console.log('Button clicked!');
            };

            const attachEventListener = () => {
                if (sendButtonRef.current) {
                    sendButtonRef.current.addEventListener('click', handleClick);
                }
            };
            const [triggerRender, setTriggerRender] = useState(false);
            const appProps = useMemo(() => ({
                standardAbilities,
                standardScoreOptions,
                toggleOverlay,
                isOverlayOpen,
                isPopupOpen,
                setIsPopupOpen,
                toggleToolWindow,
                isToolWindowVisible,
                setAdditionalText,
                mode,
                setMode,
                addToAddtionalText,
                haveRemoved,
                setHaveRemoved,
                triggerRender,
                textAreaRef,
                sendButtonRef,
                insertTextInPrompt,
                sendText,
                pressSend,
                abilityScores,
                setAbilityScores,
            }), [toggleOverlay, isOverlayOpen, haveRemoved, setHaveRemoved, triggerRender, isToolWindowVisible, setIsToolWindowVisible, textAreaRef, sendButtonRef, abilityScores,isPopupOpen]);

            const toolBarRef = useComponentContainer(ToolBar, findToolBarContainerDOM, appProps);
            const overlayRef = useComponentContainer(Overlay, findOverlayContainerDOM, appProps);
            const popupRef = useComponentContainer(Popup, findOverlayContainerDOM, appProps);
            useEffect(() => {
                textAreaRef.current = document.getElementById("prompt-textarea");
                sendButtonRef.current = document.getElementById("prompt-textarea").nextElementSibling;
            }, []);

            useEffect(function () {

                removeElementsByClass("gpt-enhancer", haveRemoved, setHaveRemoved);
                addButtonsToExistingSpans();
                insertCheckboxes();
                attachEventListener();
                addClassObserver([
                    function () { console.log("Callbak from Class Observer function running"); },
                    function () { insertCheckboxes(); },
                    function () { addButtonsToExistingSpans(); },
                    function () { addStyling(); },
                    function () { setTriggerRender(prevState => !prevState); },
                ]);
                addObserver([
                    function () { addButtonsToExistingSpans(); },
                    function () { insertCheckboxes(); },
                    function () { console.log("Callbak function running"); },
                    function () { addStyling(); },
                    /*function () { copyGPTAnswer(); },*/
                    function () { setTriggerRender(prevState => !prevState); },

                ]);
                addStyling();
            }, [haveRemoved, setTriggerRender, triggerRender]);



            // To start checking:


            return html`<${ToolWindow} ...${appProps} />`;
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
