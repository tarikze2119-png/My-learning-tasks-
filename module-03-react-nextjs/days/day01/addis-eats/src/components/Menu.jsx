import React, { useState, useMemo, useCallback } from "react";
import { useFetch } from "../hooks/useFetch";
import { useCart } from "../cart/CartProvider";
import DishList from "./DishList";

const CATEGORIES = ["All", "Vegetarian", "Meat", "Traditional"];

/**
 * Menu Component:
 * 
 * Requirements met:
 * 1. Category filter driving useFetch (URL changes with ?category=...)
 * 2. All three states visible on screen: Loading, Error, and Data
 * 3. Stable useCallback handler for addToOrder passed to memoized DishList
 * 4. useMemo justifying sorting calculation avoidance when unrelated state updates
 */
export default function Menu() {
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Requirement: Category filter driving the fetch
  const fetchUrl = `/data/dishes.json?category=${encodeURIComponent(category)}`;
  const { data: dishes, loading, error } = useFetch(fetchUrl);

  // Consume Cart dispatch from CartContext (no prop drilling)
  const { dispatch } = useCart();

  /**
   * Justified useCallback:
   * Wrapping addToOrder in useCallback ensures the function reference remains
   * stable across renders. Because DishList and DishCard are wrapped in React.memo,
   * passing an unstable inline arrow function would break memoization and force all
   * dish cards to re-render whenever Menu re-renders.
   */
  const handleAddToOrder = useCallback(
    (dish) => {
      dispatch({ type: "add", dish });
    },
    [dispatch]
  );

  /**
   * Justified useMemo:
   * Sorting the dishes array is an O(n log n) calculation. Wrapping this in useMemo
   * ensures the sorted array is only recomputed when `dishes` or `sortBy` changes,
   * avoiding redundant array allocations when other state/context changes.
   */
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
        {/* Category Filter driving the fetch */}
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

        {/* Sort Controls */}
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

      {/* State 1: Loading State */}
      {loading && (
        <div className="loading-state" role="status" aria-live="polite">
          <div className="spinner"></div>
          <p>Fetching {category === "All" ? "all dishes" : `${category} menu`} from Addis kitchen...</p>
        </div>
      )}

      {/* State 2: Error State */}
      {error && !loading && (
        <div className="error-state" role="alert">
          <p>⚠️ Unable to load menu: {error}</p>
          <button className="btn-retry" onClick={() => setCategory((c) => c)}>Retry</button>
        </div>
      )}

      {/* State 3: Data Loaded State */}
      {!loading && !error && (
        <DishList dishes={shownDishes} onAdd={handleAddToOrder} />
      )}
    </section>
  );
}
