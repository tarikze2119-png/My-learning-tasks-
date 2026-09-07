import React from "react";
import { useCart } from "../cart/CartProvider";

/**
 * CheckoutPanel Component
 * 
 * Requirement: "A checkout panel that reads the cart with useContext — no prop drilling."
 * Directly consumes CartContext using the useCart() hook.
 */
export default function CheckoutPanel({ isOpen, onClose }) {
  const { items, total, itemCount, addItem, decreaseItem, removeItem, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="cart-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3>🛒 Addis Eats Checkout ({itemCount} {itemCount === 1 ? "item" : "items"})</h3>
          <button className="btn-close" onClick={onClose} aria-label="Close cart">&times;</button>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart">
            <span style={{ fontSize: "3rem" }}>🍽️</span>
            <p>Your order basket is currently empty.</p>
            <span>Select items from our authentic Ethiopian menu to place an order.</span>
          </div>
        ) : (
          <>
            <ul className="cart-items-list">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-price">{item.price} ETB &times; {item.quantity || 1} = {(item.price * (item.quantity || 1))} ETB</span>
                  </div>

                  <div className="cart-item-controls">
                    <button 
                      className="btn-qty" 
                      onClick={() => decreaseItem(item.id)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="item-quantity">{item.quantity || 1}</span>
                    <button 
                      className="btn-qty" 
                      onClick={() => addItem(item)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    <button 
                      className="btn-remove" 
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-summary">
              <div className="summary-row total-row">
                <span>Total Due:</span>
                <strong className="total-highlight">{total} ETB</strong>
              </div>

              <div className="cart-actions">
                <button className="btn-clear" onClick={clearCart}>
                  Clear Cart
                </button>
                <button 
                  className="btn-checkout" 
                  onClick={() => {
                    alert(`✅ Thank you! Your Addis Eats order of ${total} ETB is confirmed.`);
                    clearCart();
                    onClose();
                  }}
                >
                  Confirm &amp; Order ({total} ETB)
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
