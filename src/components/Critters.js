import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Grid, Paper, TextField, Button } from '@mui/material';
import html2canvas from 'html2canvas';
import { Resizable } from 'react-resizable';
import Draggable from 'react-draggable';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { position } from 'polished';



const REFERENCE_HEIGHT = 1300;
const REFERENCE_WIDTH = 1100;


const Critters = () => {

    return (<CritterCollage />
    );
};

const CritterCollage = () => {

    const savedValues = null; 
    const collageRef = useRef(null);
    const getSavedValues = () => {
        const saved = localStorage.getItem('critterCollagePositionsAndSizes');
        return saved ? JSON.parse(saved) : null;
    };

    const [defaultPositionAndSizes] = useMemo(() => generateDefaultMapping(), []);
    const [positionsAndSizes, setPositionsAndSizes] = useState(getSavedValues() || defaultPositionAndSizes); 
    const [,defaultMappingArray] = generateDefaultMapping();
    const critters = useMemo(() => {
        const importAll = (r) => r.keys().map(r);
        return importAll(require.context('../images/critters', false, /\.png$/));
    }, []);

    useEffect(() => {
        // Update localStorage whenever positionsAndSizes changes
        localStorage.setItem('critterCollagePositionsAndSizes', JSON.stringify(positionsAndSizes));
    }, [positionsAndSizes]);

    const updatePositionAndSize = (index, position, size) => {
        const updatedPositionsAndSizes = [...positionsAndSizes];
        updatedPositionsAndSizes[index] = { ...updatedPositionsAndSizes[index], ...position, ...size };
        setPositionsAndSizes(updatedPositionsAndSizes);
    };


    const downloadCollage = async () => {
        const collageElement = collageRef.current;
        if (collageElement) {
            const canvas = await html2canvas(collageElement, { scale: 2 });
            const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            const link = document.createElement('a');
            link.download = 'collage.png';
            link.href = image;
            link.click();
        }
    };

    const downloadPositions = () => {
        const blob = new Blob([JSON.stringify(positionsAndSizes)], { type: "application/json" });
        saveAs(blob, "positionsAndSizes.json");
    };

    const defaultPosition = { x: 0, y: 0, width: 300, height: 300 };

    return (
        <>
            <button onClick={downloadCollage}>Download Collage</button>
            <button onClick={downloadPositions}>Download Positions</button>
            <div ref={collageRef} style={{ width: '5600px', backgroundColor: "white", border: "1px solid black", height: '4200px', position: 'relative' }}>
                {defaultMappingArray.map(({ critterIndex, positionIndex }, mapIndex) => {
                    const src = critters[critterIndex];
                    if (!src) return null;
                    const { x, y, width, height } = positionsAndSizes[positionIndex] || defaultPosition;



                    return (
                        <Draggable
                            key={mapIndex}
                            defaultPosition={{ x, y }}
                            onStop={(e, data) => updatePositionAndSize(positionIndex, { x: data.x, y: data.y })}
                        >
                            <div style={{ width: width, height: height, position: 'absolute' }}>
                                {/* <span   style={{fontSize:"50px", position:'absolute'}}>{critterIndex}</span> */}
                                <ImageComponent
                                    src={src}
                                    defaultWidth={width}
                                    defaultHeight={height}
                                    critterIndex={critterIndex}
                                />
                            </div>
                        </Draggable>
                    );
                })}
            </div>
        </>
    );

};




const ImageComponent = ({ src, defaultWidth, defaultHeight, critterIndex }) => {
    const [imageDimensions, setImageDimensions] = useState({ width: defaultWidth, height: defaultHeight });

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
        };
        img.src = src;
    }, [src]);

    const widthScale = imageDimensions.width / REFERENCE_WIDTH;
    const heightScale = imageDimensions.height / REFERENCE_HEIGHT;

    return (
        <img
            src={src}
            alt={`Critter ${critterIndex}`}
            style={{
                maxWidth: defaultWidth * widthScale,
                maxHeight: defaultHeight * heightScale,
                objectFit: 'contain',
            }}
        />
    );
};

const  generateOneToOneMapping =() => {
    const mappingArray =[]
    for(var i; i<500, i++;){
        mappingArray.push({ critterIndex: i, positionIndex: i });
    }
    
    return mappingArray
}

function generateDefaultMapping() {
    const positionsAndSizes = [];
    const mappingArray = [];
    const gridWidth = 5600;
    const gridHeight = 4200;
    const rowCount = 12; // Calculated based on the dimensions
    const colCount = 28; // Calculated based on the dimensions
    const positionWidth = gridWidth / colCount;
    const positionHeight = gridHeight / rowCount;

    let index = 0;
    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            if (index < 450) {
                positionsAndSizes.push({
                    x: col * positionWidth,
                    y: row * positionHeight +gridHeight,
                    width: positionWidth *1.2 ,
                    height: positionHeight*1.2 
                });
                mappingArray.push({ critterIndex: index, positionIndex: index });
                index++;
            }
        }
    }

    console.error('### Positions and Sizes:', positionsAndSizes);
    console.error('### Mapping Array:', mappingArray);
    return [positionsAndSizes, mappingArray]
}


const ProcessImages = () => {
    const critters_white_background = useMemo(() => {
        const importAll = (r) => r.keys().map(r);
        return importAll(require.context('../images/critters_white', false, /\.png$/));
    }, []);

    return (
        <Grid container spacing={0} style={{ height: '100%', margin: 0, padding: 0 }}>
            <Grid item xs={12} md={3} style={{ height: '79vh', padding: 0 }}>
                <Paper style={{ height: '100%', boxSizing: 'border-box', padding: "1em" }}>
                    <ImageProcessor images={critters_white_background} />
                </Paper>
            </Grid>



        </Grid>
    );
}
const ImageProcessor = ({ images }) => {
    const [processedImages, setProcessedImages] = useState([]);

    useEffect(() => {
        setProcessedImages([])
        images.forEach((imageSrc, index) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = imageSrc;
            img.onload = () => processImage(img, index);
        });
    }, []);

    const updateProcessedImages = (prev, newImageSrc, index) => {
        const newImages = [...prev];
        newImages[index] = newImageSrc;
        return newImages;
    };



    const processImage = (img, index) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const calculateOpacity = (r, g, b) => {
            // Calculate the perceived brightness
            let brightness = (r * 0.299 + g * 0.587 + b * 0.114);
            let threshold = 240; // Threshold for almost white
            let maxOpacity = 255;

            if (brightness > threshold) {
                // Scale opacity based on how close the brightness is to 255 (pure white)
                return maxOpacity - ((brightness - threshold) / (255 - threshold)) * maxOpacity;
            }

            return maxOpacity; // Fully opaque if below threshold
        };

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
            let opacity = calculateOpacity(imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]);
            imageData.data[i + 3] = opacity;
        }
        ctx.putImageData(imageData, 0, 0);

        // Determine crop boundaries and crop the canvas
        let { top, bottom } = findCropBoundaries(imageData);
        let croppedCanvas = cropCanvas(canvas, top, bottom);

        croppedCanvas.toBlob(blob => {
            const newImageSrc = URL.createObjectURL(blob);
            setProcessedImages(prev => updateProcessedImages(prev, newImageSrc, index));
        });
    };


    const cropCanvas = (canvas, top, bottom) => {
        let newCanvas = document.createElement('canvas');
        let ctx = newCanvas.getContext('2d');
        newCanvas.width = canvas.width;
        newCanvas.height = bottom - top + 1;
        ctx.drawImage(canvas, 0, top, canvas.width, bottom - top + 1, 0, 0, canvas.width, bottom - top + 1);
        return newCanvas;
    };

    const findCropBoundaries = (imageData) => {
        let top = 0;
        let bottom = imageData.height;
        const alphaThreshold = 128; // You can adjust this threshold

        for (let y = 0; y < imageData.height; y++) {
            let rowIsTransparent = true;
            for (let x = 0; x < imageData.width; x++) {
                let index = (y * imageData.width + x) * 4;
                if (imageData.data[index + 3] > alphaThreshold) { // Check alpha channel against threshold
                    rowIsTransparent = false;
                    break;
                }
            }
            if (!rowIsTransparent) {
                top = y;
                break;
            }
        }

        for (let y = imageData.height - 1; y >= top; y--) {
            let rowIsTransparent = true;
            for (let x = 0; x < imageData.width; x++) {
                let index = (y * imageData.width + x) * 4;
                if (imageData.data[index + 3] > alphaThreshold) {
                    rowIsTransparent = false;
                    break;
                }
            }
            if (!rowIsTransparent) {
                bottom = y;
                break;
            }
        }

        return { top, bottom };
    };



    const downloadAllImages = async () => {
        const zip = new JSZip();
        for (const [index, src] of processedImages.entries()) {
            const response = await fetch(src);
            const blob = await response.blob();
            zip.file(`c_${index}00.png`, blob);
        }

        zip.generateAsync({ type: 'blob' })
            .then((content) => {
                saveAs(content, 'processed_images.zip');
            });
    };

    return (
        <div>
            <button style={{ fontSize: "100px" }} onClick={downloadAllImages}>Download All</button>
            {processedImages.map((src, index) => (
                <div key={index}>
                    <img src={src} alt={`C ${index}`} />
                    <a href={src} download={`c_${index}.png`}>Download</a>
                </div>
            ))}
        </div>
    );
};

export default Critters;


