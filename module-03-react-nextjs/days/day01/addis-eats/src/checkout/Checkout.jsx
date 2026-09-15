import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCartStore } from "../cart/cartStore";
import { useAuth } from "../auth/useAuth";
import { placeOrder } from "../api/orders";
import validate, { DELIVERY_AREAS } from "./validate";
import Field from "./Field";

export function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const tax = Math.round(subtotal * 0.15);
  const total = subtotal + tax;

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    area: "Bole",
    notes: "",
  });

  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const errors = validate(form);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (serverError) setServerError(null);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    setTouched({
      name: true,
      phone: true,
      area: true,
      notes: true,
    });

    if (!isValid) {
      
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        document.getElementById(`field-${firstErrorField}`)?.focus();
      }
      return;
    }

    if (items.length === 0) {
      setServerError("Your cart is empty. Please add items before placing an order.");
      return;
    }

    if (submitting) return;

    setSubmitting(true);
    setServerError(null);

    try {
      const orderPayload = {
        ...form,
        items,
        total,
        orderedBy: user?.phone || form.phone,
      };

      const completedOrder = await placeOrder(orderPayload);
      clearCart();
      navigate(`/orders/${completedOrder.id}`, {
        replace: true,
        state: { order: completedOrder },
      });
    } catch (err) {
      console.error("Order submission failed:", err);
      
      setServerError(
        err.message || "Payment or delivery service temporarily unavailable. Please retry."
      );
      
      document.getElementById("checkout-server-error")?.focus();
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="checkout-page-container empty-state-box">
        <h2>Your Cart is Empty</h2>
        <p>Please add dishes to your cart before proceeding to checkout.</p>
        <Link to="/menu" className="btn btn-primary" style={{ marginTop: "1rem" }}>
          Go to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page-container">
      <div className="checkout-header">
        <h2>Complete Your Delivery Order</h2>
        <p className="checkout-subtitle">
          Secure checkout for delivery in Addis Ababa via TeleBirr.
        </p>
      </div>

      {serverError && (
        <div
          id="checkout-server-error"
          className="error-state"
          role="alert"
          tabIndex={-1}
          style={{ marginBottom: "1.5rem" }}
        >
          <strong>Submission Failed:</strong> {serverError}
        </div>
      )}

      {hasAttemptedSubmit && !isValid && (
        <div className="form-summary-alert" role="alert">
          <h4>Please review {Object.keys(errors).length} field(s) before submitting:</h4>
          <ul>
            {Object.entries(errors).map(([fieldKey, errorMsg]) => (
              <li key={fieldKey}>
                <a href={`#field-${fieldKey}`}>{errorMsg}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="checkout-grid">
        <form onSubmit={handleSubmit} className="checkout-form-card" noValidate>
          <h3>1. Delivery Details</h3>

          <Field
            id="field-name"
            name="name"
            label="Recipient Full Name"
            placeholder="e.g. Dawit Haile"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            touched={touched.name}
            required
          />

          <Field
            id="field-phone"
            name="phone"
            type="tel"
            label="TeleBirr Phone Number"
            placeholder="0911223344 or +251911223344"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.phone}
            touched={touched.phone}
            helpText="We will send a TeleBirr payment prompt to this phone."
            required
          />

          <Field
            id="field-area"
            name="area"
            label="Delivery Neighborhood"
            value={form.area}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.area}
            touched={touched.area}
            options={DELIVERY_AREAS}
            required
          />

          <Field
            id="field-notes"
            name="notes"
            label="Special Delivery Instructions"
            placeholder="e.g. Near Edna Mall, 3rd gate (optional)"
            value={form.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.notes}
            touched={touched.notes}
            isTextarea
          />

          <div className="form-submit-section">
            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={submitting}
            >
              {submitting
                ? "Processing TeleBirr Order..."
                : `Pay ${total} ETB with TeleBirr`}
            </button>
          </div>
        </form>

        <div className="checkout-summary-card">
          <h3>Order Review</h3>
          <div className="checkout-items-preview">
            {items.map((item) => (
              <div key={item.id} className="preview-row">
                <span>
                  {item.quantity || 1}x {item.name}
                </span>
                <span>{item.price * (item.quantity || 1)} ETB</span>
              </div>
            ))}
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{subtotal} ETB</span>
          </div>
          <div className="summary-row">
            <span>Tax (15% VAT)</span>
            <span>{tax} ETB</span>
          </div>
          <div className="summary-row summary-total">
            <span>Total Payable</span>
            <span>{total} ETB</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
