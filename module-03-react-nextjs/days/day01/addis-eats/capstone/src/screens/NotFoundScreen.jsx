import React from "react";
import { Link } from "react-router-dom";

export function NotFoundScreen() {
  return (
    <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
      <h1 style={{ fontSize: "4rem", color: "#0284c7", margin: 0 }}>404</h1>
      <h2>EthioMed Route Not Found</h2>
      <p style={{ color: "#64748b" }}>The medical portal page you requested does not exist.</p>
      <Link to="/" style={{ color: "#0284c7", fontWeight: "bold", textDecoration: "none" }}>&larr; Return to Dashboard</Link>
    </div>
  );
}

export default NotFoundScreen;
