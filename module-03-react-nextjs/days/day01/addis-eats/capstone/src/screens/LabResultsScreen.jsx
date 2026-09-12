import React from "react";

export function LabResultsScreen() {
  const sampleResults = [
    { id: "LAB-8821", test: "Complete Blood Count (CBC)", date: "2026-09-10", status: "Ready", doctor: "Dr. Almaz Tefera" },
    { id: "LAB-8790", test: "Lipid Panel & Cholesterol", date: "2026-09-08", status: "Reviewed", doctor: "Dr. Helen Tadesse" },
    { id: "LAB-8902", test: "HbA1c Glucose Test", date: "2026-09-12", status: "In Processing", doctor: "Dr. Dawit Kebede" },
  ];

  return (
    <div>
      <h2>Patient Diagnostic Records & Lab Results</h2>
      <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>Secure access to laboratory test summaries and medical evaluations.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {sampleResults.map((res) => (
          <div key={res.id} style={{ border: "1px solid #e2e8f0", padding: "1.25rem", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff" }}>
            <div>
              <span style={{ fontSize: "0.75rem", background: "#e0f2fe", color: "#0369a1", padding: "0.2rem 0.5rem", borderRadius: "4px", fontWeight: 700 }}>{res.id}</span>
              <h3 style={{ margin: "0.4rem 0 0.2rem" }}>{res.test}</h3>
              <small style={{ color: "#64748b" }}>Requested by: {res.doctor} · Date: {res.date}</small>
            </div>
            <div>
              <span style={{ padding: "0.3rem 0.8rem", borderRadius: "999px", fontSize: "0.85rem", fontWeight: 600, background: res.status === "Ready" ? "#dcfce7" : res.status === "Reviewed" ? "#f1f5f9" : "#fef3c7", color: res.status === "Ready" ? "#166534" : "#475569" }}>
                {res.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LabResultsScreen;
