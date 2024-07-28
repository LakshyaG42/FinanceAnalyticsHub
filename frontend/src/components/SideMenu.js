import React from 'react';
import { Link } from 'react-router-dom';
import './SideMenu.css';

function SideMenu({ isOpen, onClose }) {
  return (
    <div className={`side-menu ${isOpen ? 'open' : ''}`}>
      <button className="close-menu" onClick={onClose}>×</button>
      <Link to="/montecarlo" className="nav-bar-item">Monte Carlo Simulator</Link>
    </div>
  );
}

export default SideMenu;
