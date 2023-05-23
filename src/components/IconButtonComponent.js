import React from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';

function IconButtonComponent() {
  return (
    <Box sx={{ width: '60px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor:"rgb(255,240,237)", borderRadius: '20px' }}>
      <IconButton color="primary" aria-label="add to favorites">
        <FavoriteIcon fontSize="large" />
      </IconButton>
    </Box>
  );
}

export default IconButtonComponent;
