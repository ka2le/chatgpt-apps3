import React from 'react';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PatternIcon from '@mui/icons-material/Pattern'; // Import the icon for the pattern generator
import GridItem from './GridItem';
import backgroundImage from '../images/background.png';
import GridOnIcon from '@mui/icons-material/GridOn';
import WebIcon from '@mui/icons-material/Web';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import ExtensionIcon from '@mui/icons-material/Extension';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff';
import HubIcon from '@mui/icons-material/Hub';
import ViewInArIcon from '@mui/icons-material/ViewInAr';

function GridComponent() {
    const gridItems = [];

    // Fill the rest of the grid with empty items
    while (gridItems.length < 12) {
        gridItems.push({  link: '#',  });
    }
    while (gridItems.length < 12) {
        gridItems.push({ icon: FavoriteIcon, link: '#', title:"Empty" });
    }
    gridItems.push(  { icon: PatternIcon, link: '/pattern-generator', title: 'Patterns' })
    gridItems.push({ icon: GridOnIcon, link: '/icon-creator', title: 'SVG getter' });
    gridItems.push({ icon: WebIcon, link: '/page-template', title: 'Template' });
    gridItems.push({ icon: SpeakerNotesIcon, link: '/instructions', title: 'GPT-Promt' });
    gridItems.push({ icon: ExtensionIcon, link: '/pussle-preview', title: 'View Puzzle' });
    gridItems.push({ icon: AutoStoriesIcon, link: '/pdf-view', title: 'Story' });
    gridItems.push({ icon: SwitchAccountIcon, link: '/rpg-page', title: 'RPG' });
    gridItems.push({ icon: CollectionsBookmarkIcon, link: '/bookmarklets', title: 'Bookmarklets' });
    gridItems.push({ icon: FaceRetouchingOffIcon, link: '/mystery-game', title: 'Mystery Game' });
    gridItems.push({ icon: HubIcon, link: '/simple-poker-ai', title: 'Ai Nerual Net Simple Game' });
    gridItems.push({ icon: ViewInArIcon, link: '/ar-test', title: 'AR Cards' });
    while (gridItems.length < 24) {
        gridItems.push({ icon: FavoriteIcon, link: '#', title:"Empty" });
    }
    return (
        <>
            
                <Grid container spacing={1} style={{ height: '100%',marginTop: '40px', alignItems: 'stretch' }}>
                    {gridItems.map((item, index) => (
                        <Grid key={index} item xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <GridItem icon={item.icon} link={item.link} title={item.title ?? ""} />
                        </Grid>
                    ))}

                </Grid>
        </>
    );
}

export default GridComponent;
