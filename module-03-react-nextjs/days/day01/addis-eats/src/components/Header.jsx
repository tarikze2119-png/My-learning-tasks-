import React from "react";
import ThemeToggle from "./ThemeToggle";
import { useCart } from "../cart/CartProvider";

/**
 * Header component displaying branding, ThemeToggle, and Cart Badge with derived total
 */
export default function Header({ onOpenCart }) {
  const { itemCount, total } = useCart();

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo-section">
          <span className="brand-icon">🍲</span>
          <div>
            <h1 className="brand-name">Addis Eats</h1>
            <p className="brand-tagline">Authentic Ethiopian Cuisine</p>
          </div>
        </div>

        <div className="header-actions">
          <ThemeToggle />

          <button 
            className="cart-badge-btn" 
            onClick={onOpenCart}
            aria-label="Open shopping cart"
          >
            <span className="cart-icon">🛒</span>
            <span className="cart-badge-count">{itemCount}</span>
            <span className="cart-badge-total">{total} ETB</span>
          </button>
        </div>
      </div>
    </header>
  );
}