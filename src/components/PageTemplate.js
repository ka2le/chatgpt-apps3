import React, { useRef, useState } from 'react';
import { Grid, Paper, TextField, Button } from '@mui/material';

const PageTemplate = () => {

    const handleButton1Click = () => {
        // handle action here
    };

    const handleTextFieldChange = (event) => {
        // handle text field change here
    };

    return (
        <Grid container spacing={0} style={{ height: '100%', margin: 0, padding: 0 }}>
            <Grid item xs={12} md={3} style={{ height: '33vh', padding: 0 }}>
                <Paper style={{ height: '100%', boxSizing: 'border-box', padding: "1em" }}>
                    <TextField
                        fullWidth
                        multiline
                        rows={9}
                        onChange={handleTextFieldChange}
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                        }}
                        style={{ height: '100%' }}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} style={{ height: '54vh', padding: 0 }}>
                <Paper style={{ height: '100%' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'auto',
                        height: '100%',
                    }}>

                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12} md={2} style={{ height: '13vh', padding: 0 }}>
                <Paper style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>
                    <Button variant="contained" onClick={handleButton1Click} style={{ height: '45%', margin:"1em" }}>
                        Button 1
                    </Button>
                </Paper>
            </Grid>

        </Grid>
    );
};

export default PageTemplate;
