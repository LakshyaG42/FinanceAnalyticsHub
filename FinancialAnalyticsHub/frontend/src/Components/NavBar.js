import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/montecarlo" className="navbar-link">Monte Carlo Simulator</Link>
        <button className="signin-button">Sign In</button>
      </div>
    </div>
  );
}

export default NavBar;
