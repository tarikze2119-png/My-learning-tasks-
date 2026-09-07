import React, { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./cart/CartProvider";
import Header from "./components/Header";
import FeaturedPromos from "./components/FeaturedPromos";
import Menu from "./components/Menu";
import CartDrawer from "./components/CartDrawer";
import CartComparison from "./components/CartComparison";
import Footer from "./components/Footer";
import "./css/style.css";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <ThemeProvider>
      <CartProvider>
        <div className="app-layout">
          <Header onOpenCart={() => setIsCartOpen(true)} />
          <main className="main-content">
            <FeaturedPromos />
            <Menu />
            <CartComparison />
          </main>
          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          <Footer />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
