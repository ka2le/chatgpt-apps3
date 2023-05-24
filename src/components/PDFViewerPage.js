import React, { useState, useRef, useEffect } from 'react';
import { Grid, Paper, Button, Box } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import PdfFile from '../files/harmony.pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewerPage = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [pageWidth, setPageWidth] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            setPageWidth(containerRef.current.getBoundingClientRect().width);
        }
    }, [containerRef]);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setIsLoading(false);
    }

    const handlePrevClick = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };

    const handleNextClick = () => {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
        }
    };

    const handleDownloadClick = () => {
        const confirmDownload = window.confirm("Are you sure you want to download this PDF?");
        if (confirmDownload) {
            window.open(PdfFile, '_blank');
        }
    };

    return (
        <Grid container spacing={0} style={{ height: '100%', margin: 0, padding: 0 }}>

            <Grid item xs={12} md={8} style={{ height: '80vh', padding: 0 }}>
                <Paper style={{ height: '100%', backgroundColor:"rgb(241,231,211)" }} ref={containerRef}>
                    <div style={{ width: '100%', backgroundColor:"rgb(241,231,211)", height: '100%', overflow: 'auto' }}>
                        <Document file={PdfFile} onLoadSuccess={onDocumentLoadSuccess} onLoadStart={() => setIsLoading(true)}>
                            <Page pageNumber={pageNumber} width={pageWidth} renderTextLayer={false} renderAnnotationLayer={false} />
                        </Document>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} style={{ height: '20vh', padding: 0 }}>
                <Paper style={{ height: '100%', backgroundColor:"rgb(241,231,211)", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%',  margin:"none" }}>
                        <Button variant="outlined" onClick={handlePrevClick} style={{ width: '45%', margin:"0.5em" }} disabled={pageNumber === 1 || isLoading}>
                            Previous
                        </Button>
                        <Button variant="outlined" onClick={handleNextClick} style={{ width: '45%', margin:"0.5em" }} disabled={pageNumber === numPages || isLoading}>
                            Next
                        </Button>
                    </Box>
                    <Button variant="outlined" onClick={handleDownloadClick} style={{ width: '90%', margin:"1em" }} disabled={isLoading}>
                        Download PDF
                    </Button>
                </Paper>
            </Grid>

        </Grid>
    );
};

export default PDFViewerPage;
