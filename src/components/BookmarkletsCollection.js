import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Link, List, ListItem, ListItemText } from '@mui/material';

const BookmarkletsCollection = () => {
    const [bookmarklets, setBookmarklets] = useState([]);

    useEffect(() => {
        const files = [
            {
                name: "GPT Enhancer Run Code Button  - Bookmarklet",
                path: 'bookmarklets/gptEnhanceJsButton.js',
                description: "Add a button that allows running of chatGPT-generated javascript directly in the chat",
            },
            {
                name: "Movable Bubble Demo - Bookmarklet",
                path: 'bookmarklets/bubbleBase.js',
                description: "Just a demo of what can be done, will be used as base for other functions",
            },
            {
                name: "Run Js Bubble  - Bookmarklet",
                path: 'bookmarklets/runJsBubble.js',
                description: "A bubble that runs js from clipboard on any page",
            },
            {
                name: "Paste reminders Bubble  - Bookmarklet",
                path: 'bookmarklets/PasteReindersBubble.js',
                description: "A bubble that allows automatic pasting of a list of stored reminders to keep chatgpt on track",
            },
        ];
    
        Promise.all(files.map(file => 
            fetch(file.path)
                .then(response => response.text())
                .then(data => ({ ...file, script: data }))
        )).then(bookmarklets => setBookmarklets(bookmarklets));
    }, []);
    

    return (
                <Paper style={{ minHeight: '100vh', padding: 0 }}>
                    <List>
                        {bookmarklets.map((bookmarklet, index) => (
                            <ListItem key={index}>
                                <ListItemText 
                                    primary={
                                        <Typography variant="h6">
                                            <Link href={bookmarklet.script}>{bookmarklet.name}</Link>
                                        </Typography>
                                    } 
                                    secondary={bookmarklet.description} 
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
    );
};

export default BookmarkletsCollection;
