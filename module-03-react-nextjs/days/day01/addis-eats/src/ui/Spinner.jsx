import React from "react";

export function Spinner({ label = "Loading..." }) {
  return (
    <div className="spinner-wrapper" role="status" aria-live="polite">
      <div className="spinner"></div>
      <p className="spinner-text">{label}</p>
    </div>
  );
}

export default Spinner;
