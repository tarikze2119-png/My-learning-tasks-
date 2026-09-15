import React from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import { useAuth } from "./auth/useAuth";
import { useTheme } from "./context/ThemeContext";
import CartBadge from "./cart/CartBadge";
import ErrorBoundary from "./ui/ErrorBoundary";

export function Layout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-layout">
      <header className="site-header">
        <div className="header-container">
          <Link to="/" className="logo-section">
            <span className="brand-icon" aria-hidden="true">🍲</span>
            <div>
              <h1 className="brand-name">Addis Eats</h1>
              <p className="brand-tagline">Ethiopian Comfort Food</p>
            </div>
          </Link>

          <nav className="header-nav" aria-label="Main Navigation">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Menu
            </NavLink>
          </nav>

          <div className="header-actions">
            {user ? (
              <div className="user-profile-badge">
                <span className="user-greeting">Selam, {user.name}</span>
                <button
                  type="button"
                  className="btn-text-logout"
                  onClick={logout}
                  aria-label="Log out of Addis Eats"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `btn btn-secondary btn-sm ${isActive ? "active" : ""}`
                }
              >
                Sign In
              </NavLink>
            )}

            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            <CartBadge />
          </div>
        </div>
      </header>

      <main className="main-content">
        <ErrorBoundary
          fallback={
            <div className="error-boundary-box" role="alert">
              <h3>Something went wrong rendering this screen</h3>
              <p>Please return to the home screen or refresh.</p>
              <Link to="/" className="btn btn-primary">
                Return Home
              </Link>
            </div>
          }
        >
          <Outlet />
        </ErrorBoundary>
      </main>

      <footer className="site-footer">
        <div className="footer-container">
          <p>© 2026 Addis Eats Inc. · Authentic Taste of Addis Ababa</p>
          <p className="footer-theme-indicator">Current Mode: {theme}</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
