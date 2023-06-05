console.log("UTILS : /*version-number*/");




function getGrandParentElement(element) {
    return element.parentElement.parentElement;
}

function getCodeElement(grandParentElement) {
    return grandParentElement.querySelector('code');
}
function decodeHtmlEntities(text) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

function getCleanCode(props) {
    console.log(props);
    var grandParentElement = getGrandParentElement(props);
    console.log(grandParentElement);
    var codeElement = getCodeElement(grandParentElement);
    console.log(codeElement);
    if (!codeElement) {
        handleNoCodeElement();
        return;
    }
    var allCode = codeElement.innerHTML;
    console.log(allCode);
    var theCleanCode = allCode.replace(/<span class="hljs[^"]*">|<\/span>/g, '');
    console.log(theCleanCode);
    return decodeHtmlEntities(theCleanCode);
}

function handleNoCodeElement() {
    alert('No related code element found');
}

function checkCodeBoxType(button, codeboxText) {
    var nextSibling = button.nextElementSibling;
    var previousSibling = button.previousElementSibling;
    if ((nextSibling && nextSibling.tagName.toLowerCase() === 'span' && nextSibling.innerHTML.toLowerCase().includes(codeboxText)) ||
        (previousSibling && previousSibling.tagName.toLowerCase() === 'span' && previousSibling.innerHTML.toLowerCase().includes(codeboxText))) {
        return true;
    } else {
        return false;
    }
}

function addElement(parent, element, beforeNode) {
    element.classList.add('gpt-enhancer');
    if (beforeNode) {
        parent.insertBefore(element, beforeNode);
    } else {
        parent.appendChild(element);
    }
}

function addStyling() {
    var abilityOptions = document.querySelectorAll('.ability option');
    abilityOptions.forEach(function (abilityOption) {
        abilityOption.style.backgroundColor = "rgb(52,53,65)";
    });

    /*var overAllChilds = document.querySelectorAll('#overAll');
    overAllChilds.forEach(function (overAllChild) {
        overAllChild.style.color = "black";
    });*/
    var toolbarReplacedText = document.querySelectorAll('.absolute.bottom-0 > .text-center > span');
    toolbarReplacedText.forEach(function (node) {
        node.style.display = "none";
    });

}


function runJs(theCleanCode) {
    try {
        var newFunction = new Function(theCleanCode);
        newFunction();
    } catch (e) {
        alert('Failed to execute function: ' + e.message);
    }
}

function downloadSVG(cleanCode) {
    const blob = new Blob([cleanCode], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const format = "svg";
    link.download = `icon.${format}`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}




function addObserver(callbacks) {
    var observer = new MutationObserver(function (mutationsList, observer) {
        observer.disconnect();
        for (var mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    if (mutation.addedNodes[i].nodeType === Node.ELEMENT_NODE &&
                        (mutation.addedNodes[i].classList.contains('group') && mutation.addedNodes[i].classList.contains('w-full')) || mutation.target instanceof HTMLTitleElement) {

                        for (var j = 0; j < callbacks.length; j++) {
                            callbacks[j]();
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
        style=${utilVars?.buttonStyle} 
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
        style=${utilVars?.buttonStyle} 
        class="flex ml-auto gap-2"
        onClick=${downloadSVGWrapper}>${html([utilVars?.downloadIcon])}Download</button>
`;
}

function ToggleEditableButton(props) {
    function toggleEditableWrapper() {
        toggleEditable(props);
    }

    return html`
    <button 
        style=${utilVars?.buttonStyle} 
        class="flex ml-auto gap-2"
        onClick=${toggleEditableWrapper}>${html([utilVars?.editIcon])}Edit</button>
`;
}

function moveToolWindow(ToolWindow) {
    const toolWindow = document.getElementById('toolWindow');
    if (!toolWindow) {
        /*console.log("Tool Window does not exist");*/
        addToolWindow(ToolWindow, render, html);
        return;
    }
    const container = document.querySelector('main > .flex-1.overflow-hidden');
    if (container) {
        const groupElements = container.querySelectorAll('.group.w-full');
        let beforeThis;
        if (groupElements.length > 0) {
            beforeThis = groupElements[groupElements.length - 1];
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



function replaceWithToolBar(ToolBar) {
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
function removeElementsByClass(className, haveRemoved, setHaveRemoved) {
    if (haveRemoved) {
        return "";
    } else {
        const elements = document.getElementsByClassName(className);
        while (elements.length > 0) {
            
            if (elements[0].parentNode) { elements[0].parentNode.removeChild(elements[0]); }

        }
        var elements2 = document.querySelectorAll('[gpt-enhancer-modified]');
        for (var i = 0; i < elements2.length; i++) {
            elements2[i].removeAttribute('gpt-enhancer-modified');
        }
        setHaveRemoved(true);
    }
}

function toggleEditable(props) {
    var grandParentElement = props.spanElement.parentElement.parentElement;
    var codeElement = grandParentElement.querySelector('code');

    if (codeElement.hasAttribute('contentEditable')) {
        if (codeElement.getAttribute('contentEditable') == 'true') {
            codeElement.setAttribute('contentEditable', 'false');
        } else {
            codeElement.setAttribute('contentEditable', 'true');
        }
    } else {
        var cleanCode = getCleanCode(props.spanElement);
        codeElement.setAttribute('contentEditable', 'true');
        codeElement.setAttribute('innerHtml', cleanCode);
    }
}
function addObserver(callbacks) {
    var observer = new MutationObserver(function (mutationsList, observer) {
        /*observer.disconnect();*/
        let shouldRunCallBacks = false;
        for (var mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    if (mutation.addedNodes[i].nodeType === Node.ELEMENT_NODE &&
                        (mutation.addedNodes[i].classList.contains('result-streaming'))) {
                            console.log("New results-streaming")
                            shouldRunCallBacks = true;
                    }
                }
            }
        }
        if(shouldRunCallBacks){
            console.log("Running CallBacks")
            for (var j = 0; j < callbacks.length; j++) {
                callbacks[j]();
            }
        }
    });
    observer.observe(document, { attributes: false, childList: true, subtree: true });
    return function () {
        observer.disconnect();
    }
}



function addClassObserver(callbacks) {
    const targetNode = document.querySelector('main');
    console.log("Adding class Observer with "+ targetNode.classList + "as the selected wathcer");

    const config = { attributes: true, childList: true, subtree: true, attributeFilter: ['class'],  attributeOldValue: true, };

    const callback = function (mutationsList, observer) {
        let shouldRunCallBacks = false;
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const targetElement = mutation.target;
                const oldClassState = mutation.oldValue && mutation.oldValue.split(' ').includes('result-streaming');
                const newClassState = targetElement.classList.contains('result-streaming');

                if (!oldClassState && newClassState) {
                    console.log('A node has gained the class "result-streaming".');
                }
                else if (oldClassState && !newClassState) {
                    console.log('A node has lost the class "result-streaming".');
                    shouldRunCallBacks = true;
                }
            }
        }
        if(shouldRunCallBacks){
            console.log("Running CallBacks")
            for (var j = 0; j < callbacks.length; j++) {
                callbacks[j]();
            }
        }
    };

    const observer = new MutationObserver(callback);

    observer.observe(targetNode, config);
}


/*Helper Components */

function Button(title, onClickFunction, customStyle={}) {

    return html`
        <button class="gpt-enhancer" style="${{...utilVars.buttonStyle, ...customStyle}}" onclick=${onClickFunction}>
            ${title}
        </button>
    `;
}
function Checkbox({ id, checked = false }) {
    return html`
        <input class="gpt-enhancer" type="checkbox" id="${id}" style="${utilVars.checkboxStyle}" ${checked ? 'checked' : ''} />
    `;
}





/*END Helper Components */


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
            render(html`<${Component} ...${props} />`, containerRef.current);
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

 /*CUSTOM HOOKS*/
 function useTextArea() {
    const textAreaRef = useRef(null);
    const [additionalText, setAdditionalText] = useState("");
    useEffect(() => {
        textAreaRef.current = document.getElementById("prompt-textarea");
    }, []);
    const insertTextInPrompt = useCallback((text) => {
        if (textAreaRef.current) {
            var currentText = textAreaRef.current.value;
            var cleanedCurrentText = currentText.replace(/\[.*?\]/s, '');
            textAreaRef.current.value = cleanedCurrentText + "[" + text + "]";
            textAreaRef.current.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }, []);

    const addAdditionalText = useCallback((text) => {
        setAdditionalText(prevText => prevText + text);
    }, []);

    useEffect(() => {
        insertTextInPrompt(additionalText);
    }, [additionalText, insertTextInPrompt]);

    return {
        insertTextInPrompt,
        textAreaRef,
        addAdditionalText,
        setAdditionalText
    };
}

function useSendButton() {
    const sendButtonRef = useRef(null);
    const pressSend = useCallback(() => {
        if (sendButtonRef.current && sendButtonRef.current.tagName === 'BUTTON') {
            sendButtonRef.current.disabled = false;
            sendButtonRef.current.click();
        }
    }, []);

    const sendText = useCallback((text, insertTextInPrompt) => {
        console.log("Sending" + text);
        insertTextInPrompt(text);
        pressSend();
    }, [pressSend]);

    useEffect(() => {
        sendButtonRef.current = document.getElementById("prompt-textarea").nextElementSibling;
    }, []);
    const handleClick = () => {
        console.log('Button clicked!');
    };
    const sendButtonClickListener = () => {
        if (sendButtonRef.current) {
            sendButtonRef.current.addEventListener('click', handleClick);
        }
    };

    return {
        sendButtonRef,
        sendText,
        pressSend,
        sendButtonClickListener,
    };
}

function useContainerVisibility(initialMode = "ALL") {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isToolWindowVisible, setIsToolWindowVisible] = useState(initialMode == "DND" ? false : true);

    const toggleOverlay = useCallback(() => {
        setIsOverlayOpen(prevIsOverlayOpen => !prevIsOverlayOpen);
    }, []);

    const toggleToolWindow = useCallback(() => {
        setIsToolWindowVisible(prevIsToolWindowVisible => !prevIsToolWindowVisible);
    }, []);

    return {
        isOverlayOpen,
        setIsOverlayOpen,
        isPopupOpen,
        setIsPopupOpen,
        isToolWindowVisible,
        setIsToolWindowVisible,
        toggleOverlay,
        toggleToolWindow
    };
}


/*END CUSTOM HOOKS*/

var utilVars = {
    buttonStyle: {
        margin: "0 5px",
    },


    textareaStyle: {},
    dropdownStyle: {
        boxShadow: 'initial',
        WebkitAppearance: 'initial',
        appearance: 'initial',
        backgroundColor: 'initial',
        borderColor: 'initial',
        borderRadius: 'initial',
        borderWidth: 'initial',
        fontSize: 'initial',
        lineHeight: 'initial',
        padding: 'initial',
        border: "none",
    },
    checkboxStyle: {},
    inputBoxStyle: {},
    abilityStyle: {
        float: "left",
        margin: "0 4px"
    },
    overlayStyle: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgb(241,231,211)',
        zIndex: '9999',
    },
    popupStyle: {
        position: 'fixed',
        padding: "10px",
        top: 'calc(15vh)',
        left: 'calc(15vw)',
        width: '70vw',
        height: '70vh',
        backgroundColor: 'rgb(32,33,35)',
        border:"1px solid rgba(68,70,84,0.7)",
        borderRadius: "10px",
        zIndex: '9999',
    },
    statBlockStyle: {},
    downloadIcon: `<svg stroke="currentColor" fill="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 15l-8-8h16l-8 8z"/></svg>`,
    runIcon: `<svg stroke="currentColor" fill="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polygon points="8 5 16 12 8 19 8 5"/></svg>`,
    editIcon: `<svg fill="currentColor" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>`,
};