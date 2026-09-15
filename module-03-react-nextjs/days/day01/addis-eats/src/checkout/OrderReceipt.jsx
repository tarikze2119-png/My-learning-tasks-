import React from "react";
import { useLocation, Link, useParams } from "react-router-dom";

export function OrderReceipt() {
  const { id } = useParams();
  const location = useLocation();
  const orderData = location.state?.order;

  return (
    <div className="receipt-page-container">
      <div className="receipt-card">
        <div className="receipt-success-icon">🎉</div>
        <h2>Order Confirmed!</h2>
        <p className="receipt-subtitle">
          Thank you! Your order <strong>#{id}</strong> has been received by Addis Eats kitchen.
        </p>

        {orderData && (
          <div className="receipt-details">
            <div className="receipt-row">
              <span>Customer Name:</span>
              <strong>{orderData.name}</strong>
            </div>
            <div className="receipt-row">
              <span>TeleBirr Contact:</span>
              <strong>{orderData.phone}</strong>
            </div>
            <div className="receipt-row">
              <span>Delivery Neighborhood:</span>
              <strong>{orderData.area}</strong>
            </div>
            {orderData.notes && (
              <div className="receipt-row">
                <span>Instructions:</span>
                <span>{orderData.notes}</span>
              </div>
            )}
            <div className="receipt-row receipt-total-row">
              <span>Amount Paid via TeleBirr:</span>
              <strong>{orderData.total} ETB</strong>
            </div>
          </div>
        )}

        <div className="receipt-actions">
          <Link to="/menu" className="btn btn-primary">
            Order More Food
          </Link>
          <Link to="/" className="btn btn-secondary">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderReceipt;
