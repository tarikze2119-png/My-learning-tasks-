import React from "react";
import { useParams, Link } from "react-router-dom";

export function DoctorDetailScreen() {
  const { id } = useParams();

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", border: "1px solid #e2e8f0", padding: "2rem", borderRadius: "12px", background: "#ffffff" }}>
      <Link to="/doctors" style={{ color: "#0284c7", textDecoration: "none", fontSize: "0.9rem" }}>&larr; Back to Doctors</Link>
      <h2 style={{ marginTop: "1rem" }}>Doctor Profile: {id}</h2>
      <p style={{ color: "#64748b" }}>Senior Consultant with over 10 years experience serving clinics in Addis Ababa.</p>
      
      <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "8px", margin: "1.5rem 0" }}>
        <p><strong>Available Days:</strong> Mon, Wed, Fri (9:00 AM - 4:00 PM)</p>
        <p><strong>Consultation Fee:</strong> 500 ETB (Payable via TeleBirr)</p>
      </div>

      <Link to="/book" style={{ display: "block", textAlign: "center", background: "#0284c7", color: "white", padding: "0.75rem", borderRadius: "8px", textDecoration: "none", fontWeight: "bold" }}>
        Book Consultation Now
      </Link>
    </div>
  );
}

export default DoctorDetailScreen;
