import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import backgroundImage from './images/background.png';


import theme from './styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import GridComponent from './components/GridComponent';
import PatternGenerator from './components/PatternGenerator';
import PageTemplate from './components/PageTemplate';
import IconCreator from './components/IconCreator'; // Import the new component
import Instructions from './components/Instructions';
import PusslePreview from './components/PusslePreview';
import PDFViewerPage from './components/PDFViewerPage';
import RPGCharacter from './components/RPGCharacter';
import BookmarkletsCollection from './components/BookmarkletsCollection';



function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{  height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <HashRouter>
          <Routes>
          
            <Route path="/" element={<GridComponent />} />
            <Route path="/pattern-generator" element={<PatternGenerator />} />
            <Route path="/icon-creator" element={<IconCreator/>} />
            <Route path="/page-template" element={<PageTemplate/>} />
            <Route path="/instructions" element={<Instructions/>} />
            <Route path="/pussle-preview" element={<PusslePreview/>} />
            <Route path="/pdf-view" element={<PDFViewerPage/>} />
            <Route path="/rpg-page" element={<RPGCharacter/>} />
            <Route path="/bookmarklets" element={<BookmarkletsCollection/>} />
            
          </Routes>
        </HashRouter>
        </div>
      
    </ThemeProvider>
  );
}

export default App;
