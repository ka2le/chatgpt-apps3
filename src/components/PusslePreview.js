import React, { useRef, useState } from 'react';
import { Grid, Paper, TextField, Checkbox, FormControlLabel } from '@mui/material';
import puzzleImg from '../images/italian-landscape.jpg';
import puzzleOverlay from '../images/jigsaw.svg';

const PusslePreview = () => {
    const [showGrid, setShowGrid] = useState(false);


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
                        <img src={`${puzzleImg}`} style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                            position: 'absolute',
                            top:"1em",
                        }} />
                        {showGrid && (
                            <div style={{
                                position: 'absolute',
                                top: "1em",
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
                <Paper style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>
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
                </Paper>
            </Grid>

        </Grid>
    );
};

export default PusslePreview;
