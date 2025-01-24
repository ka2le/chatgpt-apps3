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
import SensorWindowIcon from '@mui/icons-material/SensorWindow';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import StarsIcon from '@mui/icons-material/Stars';
import PetsIcon from '@mui/icons-material/Pets';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FortIcon from '@mui/icons-material/Fort';

function GridComponent() {
    const gridItems = [];

    // Fill the rest of the grid with empty items
    
    while (gridItems.length < 8) {
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
    gridItems.push({ icon: SensorWindowIcon, link: '/singularity-cards', title: 'Singularity Cards' });
    gridItems.push({ icon: SensorWindowIcon, link: '/singularity-cards2', title: 'Singularity Cards 2' });
    gridItems.push({ icon: ScoreboardIcon, link: '/score-keeper', title: 'Score Keeper' });
    gridItems.push({ icon: StarsIcon, link: '/singularity-sprint', title: 'Singularity Sprint' });
    gridItems.push({ icon: PetsIcon, link: '/critters', title: 'Critters' });
    gridItems.push({ icon: AutoAwesomeIcon, link: '/stars-book', title: 'Sagan Om Stjärnorna' }); 
    gridItems.push({ icon: FortIcon, link: '/monster-poker-cards', title: 'Monster Poker' }); 
    while (gridItems.length < 22) {
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
