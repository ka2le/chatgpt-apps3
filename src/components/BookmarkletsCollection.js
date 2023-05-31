import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Link, List, ListItem, ListItemText, Button } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const BookmarkletsCollection = () => {
    const [bookmarklets, setBookmarklets] = useState([]);

    useEffect(() => {
        const files = [
            {
                name: "GPT Enhancer MAIN  - Bookmarklet",
                path: 'bookmarklets/gptEnhanceMain.js',
                description: "Add a button that allows running of chatGPT-generated javascript directly in the chat and edit the code directyly in the code box, and eventually much more",
            },
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
    
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    }
    return (
                <Paper style={{ minHeight: '100vh', padding: 0 }}>
                    <List>
                        {bookmarklets.map((bookmarklet, index) => (
                           <ListItem key={index}>
                           <ListItemText 
                               primary={
                                   <Typography variant="h6">
                                       <Link href={bookmarklet.script}>{bookmarklet.name}</Link>
                                       <Button 
                                           style={{ marginLeft: 10 }}
                                           variant="outlined" 
                                           size="small"
                                           startIcon={<FileCopyIcon />}
                                           onClick={() => copyToClipboard(bookmarklet.script)}
                                       >
                                           Copy Code
                                       </Button>
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
