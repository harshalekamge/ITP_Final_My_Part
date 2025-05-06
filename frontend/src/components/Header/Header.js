import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Import the CSS file

const Header = () => {
  return (
    <header className="header">

      
      <nav className="nav-links">
        <ul>
          <li><Link to="/uuserview">Home</Link></li>
          <li><Link to="/">KnowledgeHub</Link></li>
          <li><Link to="/userview">Our Products</Link></li>
          <li><Link to="/plastic-info">PlastiBot</Link></li>  
        </ul>
      </nav>
    </header>
  );
};

export default Header;
