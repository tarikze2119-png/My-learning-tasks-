import React, { useState, useMemo, useCallback } from "react";
import { useFetch } from "../hooks/useFetch";
import { useCart } from "../cart/CartProvider";
import DishList from "./DishList";

const CATEGORIES = ["All", "Vegetarian", "Meat", "Traditional"];

/**
 * Menu.jsx — Assembles the full week of React:
 * - Day 26 & 27: Components & Props
 * - Day 28: State & Event handling (category filter, sort)
 * - Day 29: Side-effects / Fetching via custom hook (useFetch)
 * - Day 30: Context (useCart), useReducer dispatch, useMemo for filtering/sorting, useCallback for stable handler
 */
export default function Menu() {
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // 1. Fetch menu data using our custom hook
  const { data: dishes, loading, error } = useFetch("/data/dishes.json");

  // 2. Consume Cart dispatch from CartContext
  const { dispatch } = useCart();

  /**
   * 3. useCallback: Stable handler function for memoized child components (DishList & DishCard).
   * Prevents creating a new function reference on every Menu re-render, allowing React.memo
   * in DishList and DishCard to skip unnecessary re-renders.
   */
  const handleAddToOrder = useCallback(
    (dish) => {
      dispatch({ type: "add", dish });
    },
    [dispatch]
  );

  /**
   * 4. useMemo: Caches filtered and sorted dishes calculation.
   * Only recomputes when `dishes`, `category`, or `sortBy` changes.
   */
  const shownDishes = useMemo(() => {
    if (!dishes) return [];

    let filtered = category === "All"
      ? dishes
      : dishes.filter((d) => d.category === category);

    if (sortBy === "price-asc") {
      return [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      return [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      return [...filtered].sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [dishes, category, sortBy]);

  return (
    <section className="menu-section">
      <div className="menu-controls">
        <div className="category-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
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
            <option value="default">Featured / Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading our traditional Addis kitchen menu...</p>
        </div>
      )}

      {error && (
        <div className="error-state">
          <p>⚠️ Error loading menu: {error}</p>
        </div>
      )}

      {!loading && !error && (
        <DishList dishes={shownDishes} onAdd={handleAddToOrder} />
      )}
    </section>
  );
}
