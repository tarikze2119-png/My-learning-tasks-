import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "./cartStore";

/**
 * CartPage Component (/cart route)
 * Shows current order lines, quantity adjustments, tax calculations, and clear/checkout actions.
 */
export function CartPage() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const tax = Math.round(subtotal * 0.15);
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="cart-page-container empty-state-box">
        <div className="empty-cart-graphic">🍽️</div>
        <h2>Your Cart is Empty</h2>
        <p>You haven't added any delicious Ethiopian dishes to your order yet.</p>
        <Link to="/menu" className="btn btn-primary" style={{ display: "inline-block", marginTop: "1rem" }}>
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <div className="cart-page-header">
        <h2>Your Food Order ({items.reduce((acc, i) => acc + (i.quantity || 1), 0)} items)</h2>
        <button
          type="button"
          className="btn-clear-cart"
          onClick={clearCart}
          aria-label="Clear all items from cart"
        >
          Clear Cart
        </button>
      </div>

      <div className="cart-grid">
        <div className="cart-items-list">
          {items.map((item) => (
            <div key={item.id} className="cart-item-row">
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p className="cart-item-unit-price">{item.price} ETB each</p>
                {item.spicy && <span className="spicy-badge-small">🌶️ Spicy</span>}
              </div>

              <div className="cart-item-controls">
                <div className="quantity-stepper">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, -1)}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    -
                  </button>
                  <span className="qty-value">{item.quantity || 1}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, 1)}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                </div>

                <span className="cart-item-subtotal">
                  {item.price * (item.quantity || 1)} ETB
                </span>

                <button
                  type="button"
                  className="cart-remove-btn"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  &times;
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary-card">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{subtotal} ETB</span>
          </div>
          <div className="summary-row">
            <span>VAT (15%)</span>
            <span>{tax} ETB</span>
          </div>
          <div className="summary-row summary-total">
            <span>Total Payable</span>
            <span>{total} ETB</span>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-checkout-action"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout ({total} ETB)
          </button>
          <Link to="/menu" className="link-continue-shopping">
            &larr; Add more dishes
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
