function alertButtonContent() {
    var textarea = document.getElementById('myNewTextarea');

    if (textarea !== null) {
        alert(textarea.value);
    }
}

var textarea = document.getElementById('prompt-textarea');

if (textarea !== null) {
    var parentElement = textarea.parentElement;
    if (parentElement !== null) {
        // Clone and insert
        var clone = parentElement.cloneNode(true);
        clone.id = "myCloneId";
        parentElement.parentNode.insertBefore(clone, parentElement);

        // Now setting static ids and onclick event
        var clonedParent = document.getElementById('myCloneId');
        var clonedTextarea = clonedParent.getElementsByTagName('textarea')[0];
        var clonedButton = clonedParent.getElementsByTagName('button')[0];

        if (clonedTextarea && clonedButton) {
            clonedTextarea.id = 'myNewTextarea';

            // Create new button and copy properties from cloned button
            var newButton = document.createElement('button');
            newButton.innerHTML = clonedButton.innerHTML;
            newButton.className = clonedButton.className;
            newButton.onclick = alertButtonContent;

            // Insert the new button next to the cloned button
            clonedButton.parentNode.insertBefore(newButton, clonedButton.nextSibling);
        }
    }
}
