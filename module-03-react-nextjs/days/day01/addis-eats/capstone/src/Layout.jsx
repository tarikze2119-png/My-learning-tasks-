import React from "react";
import { NavLink, Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "system-ui, sans-serif" }}>
      <header style={{ borderBottom: "1px solid #e2e8f0", padding: "1rem 2rem", background: "#ffffff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#0284c7", fontWeight: "bold", fontSize: "1.25rem" }}>
          🏥 EthioMed Portal
        </Link>
        <nav style={{ display: "flex", gap: "1rem" }}>
          <NavLink to="/" style={({ isActive }) => ({ color: isActive ? "#0284c7" : "#64748b", fontWeight: 600, textDecoration: "none" })} end>
            Home
          </NavLink>
          <NavLink to="/doctors" style={({ isActive }) => ({ color: isActive ? "#0284c7" : "#64748b", fontWeight: 600, textDecoration: "none" })}>
            Doctors
          </NavLink>
          <NavLink to="/book" style={({ isActive }) => ({ color: isActive ? "#0284c7" : "#64748b", fontWeight: 600, textDecoration: "none" })}>
            Book
          </NavLink>
          <NavLink to="/results" style={({ isActive }) => ({ color: isActive ? "#0284c7" : "#64748b", fontWeight: 600, textDecoration: "none" })}>
            Lab Results
          </NavLink>
        </nav>
      </header>

      <main style={{ flex: 1, padding: "2rem", maxWidth: "1000px", margin: "0 auto", width: "100%" }}>
        <Outlet />
      </main>

      <footer style={{ borderTop: "1px solid #e2e8f0", padding: "1.5rem", textAlign: "center", color: "#94a3b8", fontSize: "0.875rem" }}>
        © 2026 EthioMed Healthcare Systems · Addis Ababa, Ethiopia
      </footer>
    </div>
  );
}

export default Layout;
