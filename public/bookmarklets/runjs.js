javascript:(function() {
    var div = document.createElement('div');
    div.style.position = 'sticky';
    div.style.top = '0px';
    div.style.left = '0px';
    div.style.width = '100%';
    div.style.height = '110px';
    div.style.backgroundColor = 'darkgrey';
    div.style.zIndex = '9999';

    var textarea = document.createElement('textarea');
    textarea.id = 'fn-textarea123';
    textarea.style.color = "black";
    div.appendChild(textarea);

    // Paste Button
    var pasteBtn = document.createElement('button');
    pasteBtn.innerText = 'Paste Function';
    pasteBtn.onclick = async function() {
        const text = await navigator.clipboard.readText();
        textarea.value = text;
    };
    div.appendChild(pasteBtn);

    // Execute Button
    var execBtn = document.createElement('button');
    execBtn.innerText = 'Run Function';
    execBtn.onclick = function() {
        try {
            const newFunction = new Function(textarea.value);
            newFunction();
        } catch(e) {
            alert('Failed to execute function: ' + e.message);
        }
    };
    div.appendChild(execBtn);

    document.body.insertBefore(div, document.body.firstChild);
})();
