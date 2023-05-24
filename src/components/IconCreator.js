import React, { useRef, useState } from 'react';
import { Grid, Paper, TextField, Button } from '@mui/material';
import { Canvg } from 'canvg';

const IconCreator = () => {
    const [svg, setSvg] = useState(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="8" r="2" />
      <circle cx="12" cy="16" r="2" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="16" cy="12" r="2" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
    `);
    const downloadLinkRef = useRef();

    const handleSvgChange = (event) => {
        setSvg(event.target.value);
    };


    const handleDownload = (format) => {
        const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = downloadLinkRef.current;
        link.href = url;
        link.download = `icon.${format}`;
        link.click();
    };

    const handleDownloadPng = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
        const svgUrl = URL.createObjectURL(svgBlob);
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
            const pngUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = pngUrl;
            link.download = "icon.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
        img.src = svgUrl;
    };


    const handleDownloadSvg = () => {
        handleDownload('svg');
    };

    return (
        <Grid container spacing={0} style={{ height: '100%', margin: 0, padding: 0 }}>
            <Grid item xs={12} md={3} style={{ height: '33vh', padding: 0 }}>
                <Paper style={{ height: '100%', boxSizing: 'border-box', padding: "1em" }}>
                    <TextField
                        fullWidth
                        multiline
                        rows={9}
                        value={svg}
                        onChange={handleSvgChange}
                        variant="standard"

                        InputProps={{
                            disableUnderline: true,
                        }}
                        style={{ height: '100%' }}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} style={{ height: '44vh', padding: 0 }}>
                <Paper style={{ height: '100%' }}>
                <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            overflow: 'auto',
            height: '100%',
        }}>
            <img src={`data:image/svg+xml,${encodeURIComponent(svg)}`} style={{ 
                maxWidth: '100%', 
                maxHeight: '100%', 
                objectFit: 'contain',
            }} />
        </div>
                </Paper>
            </Grid>
            <Grid item xs={12} md={2} style={{ height: '23vh', padding: 0 }}>
                <Paper style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0px 1em' }}>
                    <Button variant="contained" onClick={handleDownloadPng} style={{ height: '45%', marginBottom: '5%' }}>
                        Download PNG
                    </Button>
                    <Button variant="contained" onClick={handleDownloadSvg} style={{ height: '45%', marginBottom: '5%' }}>
                        Download SVG
                    </Button>
                </Paper>
            </Grid>
            <a ref={downloadLinkRef} style={{ display: 'none' }} />
        </Grid>
    );
};

export default IconCreator;
