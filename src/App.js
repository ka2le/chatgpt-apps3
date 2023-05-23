import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import theme from './styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import GridComponent from './components/GridComponent';
import PatternGenerator from './components/PatternGenerator';

function App() {
  return (
    <ThemeProvider theme={theme}>
      
        <Router>
          <Routes>
            <Route path="/" element={<GridComponent />} />
            <Route path="/pattern-generator" element={<PatternGenerator />} />
          </Routes>
        </Router>
      
    </ThemeProvider>
  );
}

export default App;
