function getGrandParentElement(element) {
    return element.parentElement.parentElement;
}

function getCodeElement(grandParentElement) {
    return grandParentElement.querySelector('code');
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