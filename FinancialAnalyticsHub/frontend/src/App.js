import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/NavBar';
import MainContainer from './components/MainContainer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
          <MainContainer />
      </div>
    </Router>
  );
}

export default App;
