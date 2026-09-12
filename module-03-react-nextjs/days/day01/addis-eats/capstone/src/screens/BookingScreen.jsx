import React, { useState } from "react";

export function BookingScreen() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "3rem", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px" }}>
        <h2>✅ Appointment Confirmed!</h2>
        <p>Your booking details have been registered. You will receive an SMS reminder via TeleBirr.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "550px", margin: "0 auto", border: "1px solid #e2e8f0", padding: "2rem", borderRadius: "12px", background: "#ffffff" }}>
      <h2>Schedule a Clinic Visit</h2>
      <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>Enter your details to schedule your medical consultation.</p>

      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Patient Full Name</label>
          <input type="text" placeholder="e.g. Sara Yohannes" required style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>TeleBirr Phone Number</label>
          <input type="tel" placeholder="09..." required style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Preferred Clinic Branch</label>
          <select style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
            <option>Bole Branch (Medhanealem)</option>
            <option>Kazanchis Health Hub</option>
            <option>Sarbet Medical Wing</option>
          </select>
        </div>

        <button type="submit" style={{ width: "100%", background: "#0284c7", color: "white", padding: "0.75rem", borderRadius: "8px", border: "none", fontWeight: "bold", cursor: "pointer" }}>
          Confirm & Pay Consultation (500 ETB)
        </button>
      </form>
    </div>
  );
}

export default BookingScreen;
