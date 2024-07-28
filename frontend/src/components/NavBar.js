// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <div className="navbar">
        <div className="logo">Lakshya Gour</div>
        <ul className="nav-links">
          <li><Link to="/" className="navbar-link">Dashboard</Link></li>
          <li><Link to="/monte-carlo" className="navbar-link">MonteCarloSimulator</Link></li>
        </ul>
        <button className="sign-in-btn"><Link to="/auth">Sign-In</Link></button>
    </div>
  );
}

export default NavBar;
