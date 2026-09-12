import React from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * NotFound Component (catch-all route `*`)
 * Renders when an unmapped URL is entered, preventing white screens.
 */
export function NotFound() {
  const location = useLocation();

  return (
    <div className="not-found-container" role="alert">
      <div className="not-found-code">404</div>
      <h2>Page Not Found</h2>
      <p>
        The page at <code>{location.pathname}</code> does not exist on Addis Eats.
      </p>
      <div className="not-found-actions">
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
        <Link to="/menu" className="btn btn-secondary">
          Explore Menu
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
