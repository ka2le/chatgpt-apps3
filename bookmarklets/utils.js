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


function RunTheApp(TheApp, render){
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

window.bookmarkletUtils = {
    downloadIcon: `<svg stroke="currentColor" fill="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 15l-8-8h16l-8 8z"/></svg>`,

};