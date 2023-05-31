javascript:(function () {

    function loadScript(url, callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onreadystatechange = callback;
        script.onload = callback;
        head.appendChild(script);
    }

    var preactCDN = 'https://unpkg.com/preact@latest/dist/preact.umd.js';
    var preactHooksCDN = 'https://unpkg.com/preact@latest/hooks/dist/hooks.umd.js';
    var htmCDN = 'https://unpkg.com/htm@latest/dist/htm.umd.js';

    loadScript(preactCDN, function () {
        loadScript(htmCDN, function () {
            loadScript(preactHooksCDN, function () {
                initApp();
            });
        });
    });

    function initApp() {
        var h = preact.h;
        var render = preact.render;
        var html = htm.bind(h);
        var useState = preactHooks.useState;
        var useEffect = preactHooks.useEffect;

        var bubblesBaseStyle = {
            width: '40px',
            height: '40px',
            padding: "2px 5px",
            zIndex: 10000,
            borderRadius: "100%",
            backgroundColor: "rgb(32,33,35)",
            border: "1px solid white",
        };
        var mainBubbles = {
            ...bubblesBaseStyle,
            position: 'fixed',
            top: '20px',
            left: '20px',
            '-webkit-user-drag': 'none',
            '-webkit-tap-highlight-color': 'transparent',
            'touch-action': 'none',
        };

        function Bubble({ onButtonClick }) {
            const [pos, setPos] = useState({ x: 20, y: 20 });
            const [dragging, setDragging] = useState(false);
            function updatePositionMouse(e) {
                if (dragging) {
                    setPos({
                        x: e.clientX - 20,
                        y: e.clientY - 20
                    });
                }
            }
            function updatePositionTouch(e) {
                if (dragging) {
                    setPos({
                        x: e.touches[0].clientX - 20,
                        y: e.touches[0].clientY - 20
                    });
                }
            }
            useEffect(function f1() {
                window.addEventListener('mousemove', updatePositionMouse);
                window.addEventListener('mouseup', () => setDragging(false));
                window.addEventListener('touchmove', updatePositionTouch);
                window.addEventListener('touchend', () => setDragging(false));

                return function r1() {
                    window.removeEventListener('mousemove', updatePositionMouse);
                    window.removeEventListener('mouseup', () => setDragging(false));
                    window.removeEventListener('touchmove', updatePositionTouch);
                    window.removeEventListener('touchend', () => setDragging(false));
                }
            }, [dragging]);

            let style = { ...mainBubbles, left: `${pos.x}px`, top: `${pos.y}px` };

            return html`
                <button 
                    style=${style} 
                    onmousedown=${() => setDragging(true)}
                    ontouchstart=${() => setDragging(true)}
                    onClick=${onButtonClick}>P</div>
            `;
        };

        function TheApp() {
            function pasteReminder() {
                const reminders = [
                    "Always write comments like /*COMMENT*/ never //Comment",
                    /* Add more reminders here*/
                ];
            
                const reminderText = "\n\nRemember to keep the following additional instructions in mind:\n\n" + reminders.join("\n");
            
                const textArea = document.getElementById("prompt-textarea");
            
                if (textArea) {
                    textArea.value += reminderText;
                } else {
                    console.error("Textarea with id 'prompt-textarea' not found.");
                }
            };

            return html`<div>${html`<${Bubble} onButtonClick=${pasteReminder} />`}</div>`;
        };

        var rootId = 'my-bookmarklet-root';
        var existingRoot = document.getElementById(rootId);
        if (existingRoot) {
            existingRoot.remove();
        }

        var appRoot = document.createElement('div');
        appRoot.id = rootId;
        document.body.appendChild(appRoot);

        render(html`<${TheApp} />`, appRoot);
    };

})();
