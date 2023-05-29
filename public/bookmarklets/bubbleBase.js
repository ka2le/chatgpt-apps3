javascript: (function () {

    /* SECTION IMPORTS */
    function loadScript(url, callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onreadystatechange = callback;
        script.onload = callback;
        head.appendChild(script);
    }
    /* END SECTION IMPORTS */
    /* SECTION LIBRARY LOADERS */
    var preactCDN = 'https://unpkg.com/preact@latest/dist/preact.umd.js';
    var preactHooksCDN = 'https://unpkg.com/preact@latest/hooks/dist/hooks.umd.js';
    var htmCDN = 'https://unpkg.com/htm@latest/dist/htm.umd.js';

    loadScript(preactCDN, function () {
        console.log('Preact has been loaded!');
        loadScript(htmCDN, function () {
            console.log('HTM has been loaded!');
            loadScript(preactHooksCDN, function () {
                initApp();
            });
        });
    });

    /* END SECTION LIBRARY LOADERS */


    function initApp() {
        /* SECTION INIT PREACT AND HTM, useState and useEffect */
        var h = preact.h;
        var render = preact.render;
        var html = htm.bind(h);
        var useState = preactHooks.useState;
        var useEffect = preactHooks.useEffect;
        /* END SECTION INIT PREACT AND HTM */

        /* SECTION STYLES */
        var bubblesBaseStyle = {
            width: '40px',
            height: '40px',
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
            /* Mobile specific styles */
            '-webkit-user-drag': 'none',
            '-webkit-tap-highlight-color': 'transparent',
            'touch-action': 'none',
        };
        /* END SECTION STYLES */

        /* SECTION COMPONENTS */
        function Bubble() {
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
        
            function updatePositionTouch (e) {
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
                <div 
                    style=${style} 
                    onmousedown=${() => setDragging(true)}
                    ontouchstart=${() => setDragging(true)}
                ></div>
            `;
        };

        function TheApp() {
            return html`<div>${html`<${Bubble} />`}</div>`;
        };
        /* END SECTION COMPONENTS */

        /* SECTION CLEANUP */
        var rootId = 'my-bookmarklet-root';
        var existingRoot = document.getElementById(rootId);
        if (existingRoot) {
            existingRoot.remove();
        }
        /* END SECTION CLEANUP */

        /* SECTION ADD CODE */
        var appRoot = document.createElement('div');
        appRoot.id = rootId;
        document.body.appendChild(appRoot);
        /* END SECTION ADD CODE */

        /* SECTION RENDER */
        render(html`<${TheApp} />`, appRoot);
        /* END SECTION RENDER */
    };

})();
