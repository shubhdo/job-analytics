import React from 'react';
import './App.css';
import JobList from './JobList';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './Header';
import DataVisualization from './DataVisualization';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ac4b6e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <Router>
        <div>
          <Header />
            <Routes>
              <Route path="/" element={<JobList />} />
              <Route path="/jobs" element={<JobList />} />
              <Route path="/stats" element={<DataVisualization />} />
            </Routes>
        </div>
      </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
