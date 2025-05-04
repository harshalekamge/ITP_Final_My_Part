import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Import the CSS file

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/dashboard" className="profile-section">
        <img src="/images/IMG-20250302-WA0033.jpg" alt="Profile" className="profile-image" />
        <span className="profile-name">Harsha- IT23173972 </span>
        </Link>
        <div className="logo">CardApp</div>
      </div>
      
      <nav className="nav-links">
        <ul>
          <li><Link to="/uuserview">Home</Link></li>
          <li><Link to="/">KnowledgeHub</Link></li>
          <li><Link to="/userview">Our Products</Link></li>
          <li><Link to="/news">News</Link></li>  
          <li><Link to="/articles">Articles</Link></li>  
          <li><Link to="/events">Events</Link></li>  
          <li><Link to="/gallery">Gallery</Link></li>  
          <li><Link to="/about">Community Forum</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>

      <div className="search-bar">
        <input type="text" placeholder="Search ..." />
      </div>
    </header>
  );
};

export default Header;
