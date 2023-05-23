import React from 'react';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PatternIcon from '@mui/icons-material/Pattern'; // Import the icon for the pattern generator
import GridItem from './GridItem';
import backgroundImage from '../images/background.png';

function GridComponent() {
    const gridItems = [];

    // Fill the rest of the grid with empty items
    while (gridItems.length < 16) {
        gridItems.push({  link: '#',  });
    }
    gridItems.push(  { icon: PatternIcon, link: '/pattern-generator', title: 'Patterns' })
    while (gridItems.length < 24) {
        gridItems.push({ icon: FavoriteIcon, link: '#', title:"Empty" });
    }
    return (
        <>
            <div className="App" style={{  height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
                <Grid container spacing={1} style={{ height: '100%',marginTop: '40px', alignItems: 'stretch' }}>
                    {gridItems.map((item, index) => (
                        <Grid key={index} item xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <GridItem icon={item.icon} link={item.link} title={item.title ?? ""} />
                        </Grid>
                    ))}

                </Grid>
            </div>
        </>
    );
}

export default GridComponent;
