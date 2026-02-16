import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/knowledge-hub", label: "Knowledge Hub" },
  { to: "/userview", label: "Our Products" },
  { to: "/plastic-info", label: "PlastiBot" },
];

const Header = () => {
  return (
    <header className="header">
      <nav className="nav-links" aria-label="Main navigation">
        <ul>
          {navItems.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link-active" : "nav-link"
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
