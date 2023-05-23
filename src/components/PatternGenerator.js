import React, { useEffect, useRef } from 'react';
import { ReactSVG } from 'react-svg';

function PatternGenerator() {
    const patternRef = useRef(null);
    useEffect(() => {
        const pattern = patternRef.current;

        if (pattern) {
            const svgNamespace = "http://www.w3.org/2000/svg";
            const pattern = document.getElementById("pattern");
            const downloadButton = document.getElementById("downloadButton");

            // Shape
            function createCircleShape() {
                const gradient = document.createElementNS(svgNamespace, "linearGradient");
                gradient.setAttribute("id", "circle-gradient");
                gradient.setAttribute("x1", "0%");
                gradient.setAttribute("y1", "100%");
                gradient.setAttribute("x2", "0%");
                gradient.setAttribute("y2", "0%");

                const stops = [
                    { offset: "0%", color: "rgba(0, 0, 255, 0)" },
                    { offset: "50%", color: "rgba(0, 0, 255, 0.2)" },
                    { offset: "100%", color: "rgba(0, 0, 255, 0.6)" },
                ];

                for (const stop of stops) {
                    const stopElement = document.createElementNS(svgNamespace, "stop");
                    stopElement.setAttribute("offset", stop.offset);
                    stopElement.setAttribute("style", `stop-color:${stop.color};`);
                    gradient.appendChild(stopElement);
                }

                return gradient;
            }

            function createJaggedArrowShape() {
                const arrow = document.createElementNS(svgNamespace, "path");
                arrow.setAttribute("id", "jagged-arrow");
                arrow.setAttribute("d", "M0,0 Q5,5 10,0 L7,5 Q5,10 3,5 Z");
                arrow.setAttribute("fill", "rgba(245,223,103, 0.5)");
                return arrow;
            }

            // Shape
            function createWaveShape() {
                const wave = document.createElementNS(svgNamespace, "path");
                wave.setAttribute("id", "wave");
                wave.setAttribute("d", "M0,1 Q1.5,3 3,1 Q4.5,-1 6,1 Q7.5,3 9,1 Q10.5,-1 12,1");
                wave.setAttribute("stroke", "rgba(239,204,237, 0.5)");
                wave.setAttribute("stroke-width", "0.4");
                wave.setAttribute("fill", "none");
                return wave;
            }

            function createLightningBoltShape() {
                const bolt = document.createElementNS(svgNamespace, "path");
                bolt.setAttribute("id", "lightning-bolt");
                bolt.setAttribute("d", "M0,0 L6,10 L4,6 L10,6 L2,20 L6,10 Z");
                bolt.setAttribute("fill", "rgba(220,171,137, 0.5)");
                return bolt;
            }

            const boltScale = 0.34;
            function createRandomLightningBoltsPattern(rows, cols, jitter) {
                const fragment = document.createDocumentFragment();
                const cellWidth = 100 / cols;
                const cellHeight = 100 / rows;

                for (let row = 0; row < rows; row++) {
                    for (let col = 0; col < cols; col++) {
                        const bolt = document.createElementNS(svgNamespace, "use");
                        const x = col * cellWidth + cellWidth / 2 + (Math.random() * jitter - jitter / 2);
                        const y = row * cellHeight + cellHeight / 2 + (Math.random() * jitter - jitter / 2);
                        bolt.setAttribute("href", "#lightning-bolt");

                        bolt.setAttribute("transform", `scale(${boltScale},${boltScale}) translate(${x / boltScale}, ${y / boltScale})`);

                        bolt.setAttribute("x", x);
                        bolt.setAttribute("y", y);

                        fragment.appendChild(bolt);
                    }
                }

                return fragment;
            }


            // Pattern
            function createRandomWavePattern(rows, cols, jitter) {
                const fragment = document.createDocumentFragment();
                const cellWidth = 100 / cols;
                const cellHeight = 100 / rows;

                for (let row = 0; row < rows; row++) {
                    for (let col = 0; col < cols; col++) {
                        const wave = document.createElementNS(svgNamespace, "use");
                        const x = col * cellWidth + cellWidth / 2 + (Math.random() * jitter - jitter / 2);
                        const y = row * cellHeight + cellHeight / 2 + (Math.random() * jitter - jitter / 2);

                        const rotation = Math.random() * 10 - 5; // random rotation between -5 and 5 degrees
                        const scaleX = Math.random() > 0.5 ? -1 : 1; // randomly mirror some waves
                        const scaleY = 1;
                        const scale = 0.5 + Math.random() * 0.5; // random scale between 0.5 and 1

                        wave.setAttribute("href", "#wave");
                        wave.setAttribute("transform", `translate(${x}, ${y}) rotate(${rotation}) scale(${scaleX * scale}, ${scaleY * scale})`);

                        fragment.appendChild(wave);
                    }
                }

                return fragment;
            }



            // ... (previous code)
            const arrowScale = 0.34;
            function createRandomArrowsPattern(rows, cols, jitter) {
                const fragment = document.createDocumentFragment();
                const cellWidth = 100 / cols;
                const cellHeight = 100 / rows;

                for (let row = 0; row < rows; row++) {
                    for (let col = 0; col < cols; col++) {
                        const arrow = document.createElementNS(svgNamespace, "use");
                        const x = col * cellWidth + cellWidth / 2 + (Math.random() * jitter - jitter / 2);
                        const y = row * cellHeight + cellHeight / 2 + (Math.random() * jitter - jitter / 2);
                        arrow.setAttribute("href", "#jagged-arrow");


                        arrow.setAttribute("transform", `scale(${arrowScale},${arrowScale}) translate(${x / arrowScale}, ${y / arrowScale})`);

                        arrow.setAttribute("x", x);
                        arrow.setAttribute("y", y);

                        fragment.appendChild(arrow);
                    }
                }

                return fragment;
            }

            // Pattern
            function createRandomCirclesPattern(rows, cols, jitter) {
                const fragment = document.createDocumentFragment();
                const cellWidth = 100 / cols;
                const cellHeight = 100 / rows;

                for (let row = 0; row < rows; row++) {
                    for (let col = 0; col < cols; col++) {
                        const circle = document.createElementNS(svgNamespace, "circle");
                        const cx = col * cellWidth + cellWidth / 2 + (Math.random() * jitter - jitter / 2);
                        const cy = row * cellHeight + cellHeight / 2 + (Math.random() * jitter - jitter / 2);
                        circle.setAttribute("cx", cx);
                        circle.setAttribute("cy", cy);
                        circle.setAttribute("r", 3);
                        circle.setAttribute("fill", "url(#circle-gradient)");
                        fragment.appendChild(circle);
                    }
                }

                return fragment;
            }

            function generatePattern(createShape, createPattern) {
                const defs = document.createElementNS(svgNamespace, "defs");
                defs.appendChild(createShape());
                pattern.appendChild(defs);

                const patternElements = createPattern();
                pattern.appendChild(patternElements);
            }

            // Utility
            async function downloadPng() {
                const serializer = new XMLSerializer();
                const svgData = serializer.serializeToString(pattern);
                const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
                const svgUrl = URL.createObjectURL(svgBlob);

                const img = new Image();
                img.src = svgUrl;
                await new Promise((resolve) => (img.onload = resolve));

                const canvas = document.createElement("canvas");
                canvas.width = pattern.clientWidth;
                canvas.height = pattern.clientHeight;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                const pngUrl = canvas.toDataURL("image/png");

                const link = document.createElement("a");
                link.href = pngUrl;
                link.download = "pattern.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            // Initialize pattern
            //generatePattern(createCircleShape, () => createRandomCirclesPattern(11, 11, 5)); // 25 rows, 25 columns, jitter of 4 units
            //generatePattern(createJaggedArrowShape, () => createRandomArrowsPattern(21, 21, 5)); // 25 rows, 25 columns, jitter of 4 units
            //generatePattern(createWaveShape, () => createRandomWavePattern(15, 7, 1));
            generatePattern(createLightningBoltShape, () => createRandomLightningBoltsPattern(15, 12, 7));






            // Set up download button
            downloadButton.addEventListener("click", downloadPng);
        }

    }, []);

    return (
        <div>
            <svg ref={patternRef} id="pattern" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="1500" height="1500"></svg>
            <button id="downloadButton">Download PNG</button>
        </div>
    );
}

export default PatternGenerator;
