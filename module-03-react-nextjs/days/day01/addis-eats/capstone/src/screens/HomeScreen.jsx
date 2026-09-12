import React from "react";
import { Link } from "react-router-dom";

export function HomeScreen() {
  return (
    <div>
      <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: "12px", padding: "2.5rem", textAlign: "center" }}>
        <h1 style={{ color: "#0369a1", marginBottom: "0.75rem" }}>Accessible Healthcare in Addis Ababa</h1>
        <p style={{ color: "#475569", maxWidth: "600px", margin: "0 auto 1.5rem" }}>
          Schedule specialist consultations, track medical prescriptions, and view diagnostic laboratory results online.
        </p>
        <Link to="/doctors" style={{ background: "#0284c7", color: "white", padding: "0.75rem 1.5rem", borderRadius: "8px", textDecoration: "none", fontWeight: "bold" }}>
          Find a Doctor &rarr;
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginTop: "2.5rem" }}>
        <div style={{ border: "1px solid #e2e8f0", padding: "1.5rem", borderRadius: "8px" }}>
          <h3>🩺 General Practice</h3>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Routine health checks & chronic care.</p>
        </div>
        <div style={{ border: "1px solid #e2e8f0", padding: "1.5rem", borderRadius: "8px" }}>
          <h3>❤️ Cardiology</h3>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Heart specialists and ECG tests.</p>
        </div>
        <div style={{ border: "1px solid #e2e8f0", padding: "1.5rem", borderRadius: "8px" }}>
          <h3>🧪 Diagnostic Lab</h3>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Same-day blood & pathology reports.</p>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
