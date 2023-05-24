import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import backgroundImage from './images/background.png';


import theme from './styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import GridComponent from './components/GridComponent';
import PatternGenerator from './components/PatternGenerator';
import PageTemplate from './components/PageTemplate';
import IconCreator from './components/IconCreator'; // Import the new component
import Instructions from './components/Instructions';
import PusslePreview from './components/PusslePreview';
import PdfView from './components/PdfView';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{  height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
        <Router basename="/chatgpt-apps3" >
          <Routes>
          
            <Route path="/" element={<GridComponent />} />
            <Route path="/pattern-generator" element={<PatternGenerator />} />
            <Route path="/icon-creator" element={<IconCreator/>} />
            <Route path="/page-template" element={<PageTemplate/>} />
            <Route path="/instructions" element={<Instructions/>} />
            <Route path="/pussle-preview" element={<PusslePreview/>} />
            <Route path="/pdf-view" element={<PdfView/>} />
            
          </Routes>
        </Router>
        </div>
      
    </ThemeProvider>
  );
}

export default App;
