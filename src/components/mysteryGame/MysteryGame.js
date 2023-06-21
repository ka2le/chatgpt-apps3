import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Link, List, ListItem, ListItemText, Button } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const MysteryGame = () => {
    const charachters = [
        {
            name: `Summary`,
            path: '/chatgpt-apps3/mystery/summary.txt',
            description: `A murder has been committed in a remote and small Italian village during the annual Truffle Hunting Competition. Lorenzo Bucatini, born in the village, now famous around the world, assisting michelin star chefs with their truffles has been murdered during the truffle hunt in the forest. The backdrop is enchanting, with rolling hills, lush greenery, and snow-capped peaks in the distance. The village's landscapes are adorned with wildflower fields and a vineyard infamous for its disappointing wines. Truffle swines and dogs, essential partners in truffle hunting, navigate the intricate underground networks of fungi beneath the forest floor.

            The annual Truffle Hunting Festival is an event that attracts truffle aficionados from all corners. 
             `,
        },
        {
            name: `Enzo 'Ez' Bianchi`,
            path: '/chatgpt-apps3/mystery/character1.txt',
            description: `Enzo "Ez" Bianchi is a tech-savvy, fast-talking inventor from Milan, known for his coding prowess and the development of a ground-breaking gadget that could revolutionize the truffle hunting industry. Although publicly confident and eager to showcase his invention's potential, privately he grapples with its shortcomings and the pressure to prove his worth, creating a complex, intelligent character who navigates both the digital and real worlds with ease.`,
        },
        {
            name: ` Benedetto "Benny" Capello`,
            path: '/chatgpt-apps3/mystery/character2.txt',
            description: `Benedetto "Benny" Capello, known as the "Rhyming Poet," is a charismatic, optimistic, and flamboyant poet from Rome who leads a bohemian lifestyle, drawing inspiration from his travels and interactions for his unique rhyming poetry. Open about his financial struggles, love for truffle hunting competitions, and connections with various people, Benny believes his true wealth lies in his experiences and the people he meets, often sharing anecdotes and observations from his journey.`,
        },
    ];



    return (
        <Paper style={{ minHeight: '100vh', padding: 0 }}>
            <List>
                {charachters.map((charachter, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={
                                <Typography variant="h6">
                                    <Link href={charachter.path}>{charachter.name}</Link>
                                </Typography>
                            }
                            secondary={charachter.description}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default MysteryGame
