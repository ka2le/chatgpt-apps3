import React, { useRef, useState } from 'react';
import { Grid, Paper, TextField, Checkbox, FormControlLabel, Button, InputLabel } from '@mui/material';

import puzzleImg from '../images/italian-landscape.jpg';
import puzzleOverlay from '../images/jigsaw.svg';

const PusslePreview = () => {
    const [showGrid, setShowGrid] = useState(false);

    const [uploadedImg, setUploadedImg] = useState(null);
    const [needsRotation, setNeedsRotation] = useState(false);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.getElementById('imageCanvas');
                    canvas.width = 5850;
                    canvas.height = 8192;
                    
                    const ctx = canvas.getContext('2d');
                    // Check if rotation is needed
                    if (img.width > img.height) {
                        // Rotate and draw the image
                        ctx.rotate(90 * Math.PI / 180);
                        ctx.drawImage(img, 0, -5850, 8192, 5850);
                    } else {
                        // Draw the image without rotation
                        ctx.drawImage(img, 0, 0, 5850, 8192);
                    }
    
                    // Convert canvas to image URL
                    const newImageUrl = canvas.toDataURL('image/jpeg');
                    setUploadedImg(newImageUrl);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };
    



    const generateSvgGrid = (width, height, rows, cols) => {
        const svgWidth = width;
        const svgHeight = height;
        const cellWidth = svgWidth / cols;
        const cellHeight = svgHeight / rows;

        let paths = [];
        for (let i = 0; i <= cols; i++) {
            let x = i * cellWidth;
            paths.push(`M ${x} 0 V ${svgHeight}`);
        }
        for (let i = 0; i <= rows; i++) {
            let y = i * cellHeight;
            paths.push(`M 0 ${y} H ${svgWidth}`);
        }

        return `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">
            <path d="${paths.join(' ')}" stroke="black" fill="transparent" />
        </svg>`;
    };


    const handleCheckboxChange = (event) => {
        setShowGrid(event.target.checked);
    };

    return (
        <Grid container spacing={0} style={{ height: '100%', margin: 0, padding: 0 }}>

            <Grid item xs={12} md={4} style={{ height: '74vh', padding: 0 }}>
                <Paper style={{ height: '100%' }}>
                    <div style={{
                        display: 'flex',

                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'auto',
                        height: '100%',
                        position: 'relative', // Added to position the grid overlay
                    }}>
                        <img src={uploadedImg || puzzleImg} style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            height: '100%',
                            width: '100%',
                            minWidth: "100%",
                            minHeight: "100%",
                            top: "1em",
                            objectFit: 'contain',
                            transformOrigin: 'center',
                            position: 'absolute',
                        }} />
                        {showGrid && (
                            <div style={{
                                position: 'absolute',

                                left: 0,
                                width: '100vw',
                                height: 'calc(100vw * 8192 / 5850)', // 
                                backgroundImage: `url(${puzzleOverlay})`,
                                backgroundSize: 'cover', // Ensure the grid covers the entire image
                                opacity: 1,
                            }} />
                        )}
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12} md={2} style={{ height: '26vh', padding: 0 }}>
                <Paper style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={showGrid}
                                onChange={handleCheckboxChange}
                                name="showGrid"
                                color="primary"
                            />

                        }
                        label="Show Grid"
                        style={{ margin: "1em" }}
                    />
                     <InputLabel htmlFor="upload-image-button">
                        <input
                            accept="image/*"
                            id="upload-image-button"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleImageUpload}
                        />
                        <Button
                            component="span"
                            variant="contained"
                            style={{ margin: "1em" }}
                        >
                            Upload Image
                        </Button>
                    </InputLabel>
                </Paper>
             

            </Grid>
            <canvas id="imageCanvas" style={{ display: 'none' }}></canvas>


        </Grid>
    );
};

export default PusslePreview;
