import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const GridItem = ({ icon: Icon, link, title }) => {
    if (!Icon && !title) {
        return null;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{
                width: '60px', height: '60px', display: 'flex', justifyContent: 'center',
                alignItems: 'center', backgroundColor: "rgb(255,240,237)", borderRadius: '20px'
            }}>
                <Link to={link}>
                    <IconButton color="primary" aria-label="add to favorites">
                        <Icon fontSize="large"  />
                    </IconButton>
                </Link>
            </Box>
            <Typography variant="body2" color="textSecondary" component="p" style={{ textAlign: 'center', width: '80px' }}>
                {title}
            </Typography>
        </div>
    );
};

export default GridItem;
