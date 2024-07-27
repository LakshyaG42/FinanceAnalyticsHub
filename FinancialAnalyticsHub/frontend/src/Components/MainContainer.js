import React from 'react';
import './MainContainer.css';
import { Routes, Route } from 'react-router-dom';
import MonteCarloSimulator from '../Pages/MonteCarloSimulator';

function MainContainer() {
  return (
    <div className="main-container">
      <div className="content-card">
        <Routes>
          <Route path="/montecarlo" element={<MonteCarloSimulator />} />
        </Routes>
      </div>
    </div>
  );
}

export default MainContainer;
