import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(118,159,188)',
        },
        text: {
            primary: 'rgb(48, 81, 102)', // Set the primary text color to the primary color
            secondary: "black"
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 'unset',
                    background: 'rgba(255,255,255,0.9)',
                },
            },
        },
    },
});

export default theme;
