import React from "react";
import { useCart } from "../cart/CartProvider";

/**
 * CartDrawer: Reads cart state and dispatches transitions via useCart (useContext)
 */
export default function CartDrawer({ isOpen, onClose }) {
  const { items, total, itemCount, addItem, decreaseItem, removeItem, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3>🛒 Your Order ({itemCount} {itemCount === 1 ? "item" : "items"})</h3>
          <button className="btn-close" onClick={onClose}>&times;</button>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <span>Add some delicious Ethiopian dishes to get started!</span>
          </div>
        ) : (
          <>
            <ul className="cart-items-list">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-price">{item.price} ETB each</span>
                  </div>

                  <div className="cart-item-controls">
                    <button 
                      className="btn-qty" 
                      onClick={() => decreaseItem(item.id)}
                      title="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="item-quantity">{item.quantity || 1}</span>
                    <button 
                      className="btn-qty" 
                      onClick={() => addItem(item)}
                      title="Increase quantity"
                    >
                      +
                    </button>
                    <button 
                      className="btn-remove" 
                      onClick={() => removeItem(item.id)}
                      title="Remove item"
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-summary">
              <div className="summary-row total-row">
                <span>Total Amount:</span>
                <strong>{total} ETB</strong>
              </div>

              <div className="cart-actions">
                <button className="btn-clear" onClick={clearCart}>
                  Clear Cart
                </button>
                <button 
                  className="btn-checkout" 
                  onClick={() => alert(`🎉 Order placed successfully! Total: ${total} ETB`)}
                >
                  Confirm & Pay ({total} ETB)
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
