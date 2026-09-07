import React, { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./cart/CartProvider";
import Header from "./components/Header";
import FeaturedPromos from "./components/FeaturedPromos";
import Menu from "./components/Menu";
import CheckoutPanel from "./components/CheckoutPanel";
import CartComparison from "./components/CartComparison";
import Footer from "./components/Footer";
import "./css/style.css";

/**
 * Addis Eats — Week 1 Project Assembled
 * 
 * Bringing together Days 26 to 30:
 * - Components and props (DishList, DishCard, Header, Footer, FeaturedPromos)
 * - State & events (category filter, sort by, theme toggle)
 * - API-driven menu via custom useFetch hook (loading, error, data states)
 * - Cart state managed by pure cartReducer and shared via CartProvider (useContext)
 * - Performance memoization (useMemo, useCallback, React.memo)
 */
function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <ThemeProvider>
      <CartProvider>
        <div className="app-layout">
          {/* Header reading CartContext for badge count & total without prop drilling */}
          <Header onOpenCart={() => setIsCheckoutOpen(true)} />

          <main className="main-content">
            {/* Component 2 using useFetch */}
            <FeaturedPromos />

            {/* Main Menu: Category filter driving useFetch, all 3 states, useMemo & useCallback */}
            <Menu />

            {/* Architectural comparison: useState vs useReducer */}
            <CartComparison />
          </main>

          {/* Checkout Panel reading CartContext with useContext without prop drilling */}
          <CheckoutPanel
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
          />

          <Footer />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
