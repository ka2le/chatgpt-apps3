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
import MysteryGame from './components/mysteryGame/MysteryGame';
import Character1 from './components/mysteryGame/Character1';
import SimplePokerContainer from './components/SimplePoker';
import ArTest from './components/ArTest';
import SingularityCards from './components/SingularityCards';
import ScoreKeeper from './components/ScoreKeeper';
import { SingularityGameContainer } from './components/SingularityGame/SingularityGameContainer';
import Critters from './components/Critters';
import StarsBook from './components/StarsBook';



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
            <Route path="/mystery-game" element={<MysteryGame/>} />
            <Route path="/mystery-game/character1" element={<Character1/>} />
            <Route path="/simple-poker-ai" element={<SimplePokerContainer/>} />
            <Route path="/ar-test" element={<ArTest/>} />
            <Route path="/singularity-cards" element={<SingularityCards/>} />
            <Route path="/score-keeper" element={<ScoreKeeper/>} />
            <Route path="/singularity-sprint" element={<SingularityGameContainer/>} />
            <Route path="/critters" element={<Critters/>} />
            <Route path="/stars-book" element={<StarsBook/>} />
            
          </Routes>
        </HashRouter>
         </div> 
      
    </ThemeProvider>
  );
}

export default App;
