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
    /* var gap2 = document.querySelectorAll('.gap-2');
        gap2.forEach(function (gap) {
            gap.style.gap = "0px"
        });*/
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


function RunTheApp(TheApp, render, html){
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




function addObserver(callbacks) {
    var observer = new MutationObserver(function (mutationsList, observer) {
        observer.disconnect();
        for (var mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    if (mutation.addedNodes[i].nodeType === Node.ELEMENT_NODE &&
                        (mutation.addedNodes[i].classList.contains('group') && mutation.addedNodes[i].classList.contains('w-full'))
                        || mutation.target instanceof HTMLTitleElement) {

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

function moveToolWindow(ToolWindow) {
    const toolWindow = document.getElementById('toolWindow');
    if (!toolWindow) {
        console.log("Tool Window does not exist");
        addToolWindow(ToolWindow);
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
function addToolWindow(ToolWindow, render) {
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

function addObserver(callbacks) {
    var observer = new MutationObserver(function (mutationsList, observer) {
        observer.disconnect();
        for (var mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    if (mutation.addedNodes[i].nodeType === Node.ELEMENT_NODE &&
                        (mutation.addedNodes[i].classList.contains('group') && mutation.addedNodes[i].classList.contains('w-full'))
                        || mutation.target instanceof HTMLTitleElement) {

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

var utilVars = {
    downloadIcon: `<svg stroke="currentColor" fill="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 15l-8-8h16l-8 8z"/></svg>`,
    runIcon: `<svg stroke="currentColor" fill="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polygon points="8 5 16 12 8 19 8 5"/></svg>`,
    editIcon: `<svg fill="currentColor" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>`,
};