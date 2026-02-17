import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/recycle-centers", label: "Recycle Centers" },
  { to: "/userview", label: "Our Products" },
  { to: "/knowledge-hub", label: "Knowledge Hub" },
  { to: "/plastic-info", label: "PlastiBot" },
  { to: "/eco-footprint", label: "Eco Calculator" },
];

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
          {isAuthenticated ? (
            <li>
              <button type="button" className="auth-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : (
            <li>
              <NavLink
                to="/admin/login"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link-active" : "nav-link"
                }
              >
                Admin Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
