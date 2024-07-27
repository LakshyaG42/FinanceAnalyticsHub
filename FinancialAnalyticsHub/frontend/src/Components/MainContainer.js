import React from 'react';
import './MainContainer.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import MonteCarloSimulator from '../pages/MonteCarloSimulator';
import NavBar from './NavBar';

function MainContainer() {
  return (
    <div className="main-container">
      <NavBar />
      <div className="content-card">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/monte-carlo" element={<MonteCarloSimulator />} />
        </Routes>
      </div>
    </div>
  );
}

export default MainContainer;
