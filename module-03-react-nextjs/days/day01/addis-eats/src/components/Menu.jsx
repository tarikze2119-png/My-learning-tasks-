import React, { useState, useMemo, useCallback } from "react";
import { useFetch } from "../hooks/useFetch";
import { useCart } from "../cart/CartProvider";
import DishList from "./DishList";

const CATEGORIES = ["All", "Vegetarian", "Meat", "Traditional"];

export default function Menu() {
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const fetchUrl = `/data/dishes.json?category=${encodeURIComponent(category)}`;
  const { data: dishes, loading, error } = useFetch(fetchUrl);

  const { dispatch } = useCart();

  const handleAddToOrder = useCallback(
    (dish) => {
      dispatch({ type: "add", dish });
    },
    [dispatch]
  );

  const shownDishes = useMemo(() => {
    if (!dishes) return [];

    if (sortBy === "price-asc") {
      return [...dishes].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      return [...dishes].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      return [...dishes].sort((a, b) => b.rating - a.rating);
    }

    return dishes;
  }, [dishes, sortBy]);

  return (
    <section className="menu-section">
      <div className="section-header-row">
        <div>
          <h2 className="section-title">🥘 Traditional Addis Menu</h2>
          <p className="section-subtitle">Freshly prepared with authentic Ethiopian spices</p>
        </div>
      </div>

      <div className="menu-controls">
        
        <div className="category-filters" role="tablist" aria-label="Menu categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
              role="tab"
              aria-selected={category === cat}
            >
              {cat === "All" ? "🍲 All Dishes" : cat === "Vegetarian" ? "🥗 Vegetarian" : cat === "Meat" ? "🥩 Meat Dishes" : "🏺 Traditional"}
            </button>
          ))}
        </div>

        <div className="sort-controls">
          <label htmlFor="sort-select">Sort by: </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="default">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated ⭐</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="loading-state" role="status" aria-live="polite">
          <div className="spinner"></div>
          <p>Fetching {category === "All" ? "all dishes" : `${category} menu`} from Addis kitchen...</p>
        </div>
      )}

      {error && !loading && (
        <div className="error-state" role="alert">
          <p>⚠️ Unable to load menu: {error}</p>
          <button className="btn-retry" onClick={() => setCategory((c) => c)}>Retry</button>
        </div>
      )}

      {!loading && !error && (
        <DishList dishes={shownDishes} onAdd={handleAddToOrder} />
      )}
    </section>
  );
}
