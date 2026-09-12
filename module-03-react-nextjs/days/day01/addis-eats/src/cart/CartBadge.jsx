import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "./cartStore";

/**
 * CartBadge Component
 * Subscribes to only the cart item count using a narrow selector.
 * Clicking it navigates to /cart.
 */
export function CartBadge() {
  const count = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + (item.quantity || 1), 0)
  );
  const total = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
  );

  return (
    <Link to="/cart" className="cart-badge-btn" aria-label={`View shopping cart, ${count} items`}>
      <span className="cart-icon" aria-hidden="true">🛒</span>
      <span className="cart-badge-count">{count}</span>
      {count > 0 && (
        <span className="cart-badge-total">{total} ETB</span>
      )}
    </Link>
  );
}

export default CartBadge;
