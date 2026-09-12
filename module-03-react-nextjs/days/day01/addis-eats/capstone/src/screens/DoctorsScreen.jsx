import React from "react";
import { Link } from "react-router-dom";

export function DoctorsScreen() {
  const doctors = [
    { id: "dr-almaz", name: "Dr. Almaz Tefera", specialty: "Cardiology", fee: "500 ETB", clinic: "Bole Medhanealem Clinic" },
    { id: "dr-dawit", name: "Dr. Dawit Kebede", specialty: "Pediatrics", fee: "450 ETB", clinic: "Kazanchis Family Health" },
    { id: "dr-helen", name: "Dr. Helen Tadesse", specialty: "General Practice", fee: "350 ETB", clinic: "Sarbet Community Hospital" },
  ];

  return (
    <div>
      <h2>Specialist Doctors & Clinicians</h2>
      <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>Select a specialist to view credentials and schedule an appointment.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {doctors.map((doc) => (
          <div key={doc.id} style={{ border: "1px solid #e2e8f0", padding: "1.25rem", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ margin: 0 }}>{doc.name}</h3>
              <p style={{ margin: "0.25rem 0", color: "#0284c7", fontWeight: 600 }}>{doc.specialty}</p>
              <small style={{ color: "#64748b" }}>{doc.clinic} · {doc.fee}</small>
            </div>
            <Link to={`/doctors/${doc.id}`} style={{ background: "#0284c7", color: "white", padding: "0.5rem 1rem", borderRadius: "6px", textDecoration: "none", fontSize: "0.875rem" }}>
              View Profile &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorsScreen;
