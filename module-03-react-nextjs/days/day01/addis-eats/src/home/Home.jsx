import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../cart/cartStore";

/**
 * Home Component (/ route)
 * Landing screen introducing Addis Eats, featuring quick specials and direct links to the full menu.
 */
export function Home() {
  const count = useCartStore((s) => s.getCount ? s.getCount() : s.items.length);

  return (
    <div className="home-page-container">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">Addis Ababa Premier Food Delivery 🇪🇹</div>
          <h1 className="hero-title">
            Authentic Ethiopian Taste, Delivered Fresh to Your Door.
          </h1>
          <p className="hero-description">
            From bubbling pots of Shiro Tegabino in Bole to sizzling Shekla Tibs in Kazanchis,
            experience the heritage and flavors of Ethiopia with fast TeleBirr checkout.
          </p>

          <div className="hero-actions">
            <Link to="/menu" className="btn btn-primary btn-lg">
              Explore Full Menu &rarr;
            </Link>
            <Link to="/menu?category=Vegetarian" className="btn btn-secondary btn-lg">
              Vegetarian & Fasting
            </Link>
          </div>
        </div>
      </section>

      <section className="featured-highlights-section">
        <h2 className="section-title">Today's House Specials</h2>
        <div className="highlights-grid">
          <div className="highlight-card">
            <div className="highlight-icon">🍗</div>
            <h3>Doro Wot Feast</h3>
            <p>Traditional slow-cooked holiday chicken with boiled organic egg & spiced butter.</p>
            <span className="highlight-price">240 ETB</span>
            <Link to="/menu/1" className="link-dish-detail">
              View Special &rarr;
            </Link>
          </div>

          <div className="highlight-card">
            <div className="highlight-icon">🥗</div>
            <h3>Special Beyaynetu</h3>
            <p>10 distinct fasting vegan stews arranged over fresh whole-grain teff injera.</p>
            <span className="highlight-price">180 ETB</span>
            <Link to="/menu/2" className="link-dish-detail">
              View Special &rarr;
            </Link>
          </div>

          <div className="highlight-card">
            <div className="highlight-icon">🥩</div>
            <h3>Special Kitfo</h3>
            <p>Prime minced lean beef with homemade ayib cheese, collard greens, and kocho.</p>
            <span className="highlight-price">280 ETB</span>
            <Link to="/menu/6" className="link-dish-detail">
              View Special &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="how-it-works-section">
        <h2 className="section-title">Why Order with Addis Eats?</h2>
        <div className="perks-grid">
          <div className="perk-item">
            <span className="perk-num">01</span>
            <h4>Fast Delivery</h4>
            <p>Average 25-minute delivery across Bole, Kazanchis, Megenagna & Piassa.</p>
          </div>
          <div className="perk-item">
            <span className="perk-num">02</span>
            <h4>TeleBirr Integrated</h4>
            <p>Pay securely with instant TeleBirr verification and no hidden fees.</p>
          </div>
          <div className="perk-item">
            <span className="perk-num">03</span>
            <h4>Live Order Tracking</h4>
            <p>Follow your meal from the kitchen stove to your doorstep in real-time.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
