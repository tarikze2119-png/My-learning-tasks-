import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

/**
 * LoginPage Component (/login route)
 * As taught on Day 31 slide 24: captures credentials, signs user in, and navigates
 * back to the intended destination (location.state.from) with { replace: true }.
 */
export function LoginPage() {
  const { login, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname ?? "/menu";

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanPhone = phone.trim();
    const isValid = /^(?:\+251|0)9\d{8}$/.test(cleanPhone);

    if (!isValid) {
      setError("Please enter a valid Ethiopian TeleBirr phone number (e.g. 0911223344 or +251911223344)");
      return;
    }

    login(cleanPhone, name.trim() || "Addis Foodie");
    navigate(from, { replace: true });
  };

  if (user) {
    return (
      <div className="auth-card">
        <h2>You are currently signed in</h2>
        <p>Logged in as: <strong>{user.name}</strong> ({user.phone})</p>
        <button
          className="btn btn-primary"
          style={{ marginTop: "1rem" }}
          onClick={() => navigate(from, { replace: true })}
        >
          Continue to {from}
        </button>
      </div>
    );
  }

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <h2>Sign In to Addis Eats</h2>
        <p className="auth-subtitle">
          Enter your TeleBirr registered phone number to proceed with your order.
        </p>

        {error && (
          <div className="auth-error-banner" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="login-name">Full Name</label>
            <input
              id="login-name"
              type="text"
              className="form-control"
              placeholder="e.g. Almaz Bekele"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-phone">
              TeleBirr Phone Number <span className="req-asterisk">*</span>
            </label>
            <input
              id="login-phone"
              type="tel"
              className="form-control"
              placeholder="09... or +2519..."
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (error) setError("");
              }}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Sign In & Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
