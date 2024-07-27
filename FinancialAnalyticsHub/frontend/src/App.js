import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar';
import MainContainer from './Components/MainContainer';

function App() {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <div className="main-content">
          <MainContainer />
        </div>
      </div>
    </Router>
  );
}

export default App;
