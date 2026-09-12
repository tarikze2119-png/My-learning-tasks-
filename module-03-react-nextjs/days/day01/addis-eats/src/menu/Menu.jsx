import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useCartStore } from "../cart/cartStore";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import Skeleton from "../ui/Skeleton";
import Modal from "../ui/Modal";
import ErrorBoundary from "../ui/ErrorBoundary";

/**
 * Menu Component (/menu route)
 * Assembles:
 * - URL state with useSearchParams for bookmarkable category filters
 * - useFetch custom hook with loading, error, and data states
 * - useMemo to derive filtered dishes without unnecessary re-computations
 * - Portal Modal for quick dish inspections
 */
export function Menu() {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";

  // Data fetching via custom hook
  const { data: dishes, loading, error, refetch } = useFetch("/data/dishes.json");

  // Quick View Modal state
  const [quickViewDish, setQuickViewDish] = useState(null);
  const addItem = useCartStore((s) => s.addItem);

  // Derived filtered dishes via useMemo
  const filteredDishes = useMemo(() => {
    if (!dishes) return [];
    if (currentCategory === "All" || !currentCategory) return dishes;
    return dishes.filter(
      (d) => d.category.toLowerCase() === currentCategory.toLowerCase()
    );
  }, [dishes, currentCategory]);

  return (
    <div className="menu-page-container">
      <div className="menu-page-header">
        <div>
          <h2>Addis Eats Menu</h2>
          <p className="menu-subtitle">
            Authentic Ethiopian dishes prepared fresh daily in Bole, Addis Ababa.
          </p>
        </div>
        <CategoryBar />
      </div>

      <ErrorBoundary
        fallback={
          <div className="error-state" role="alert">
            <h3>Failed to render dishes</h3>
            <p>There was a problem displaying the menu list.</p>
            <button className="btn btn-primary btn-retry" onClick={refetch}>
              Retry Loading
            </button>
          </div>
        }
      >
        {loading && <Skeleton count={4} height="200px" />}

        {error && !loading && (
          <div className="error-state" role="alert">
            <h3>Could not load menu</h3>
            <p>{error}</p>
            <button className="btn btn-primary btn-retry" onClick={refetch}>
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <DishList
            dishes={filteredDishes}
            onQuickView={(dish) => setQuickViewDish(dish)}
          />
        )}
      </ErrorBoundary>

      {/* Quick View Portal Modal */}
      <Modal
        isOpen={Boolean(quickViewDish)}
        onClose={() => setQuickViewDish(null)}
        title={quickViewDish?.name}
      >
        {quickViewDish && (
          <div className="quickview-content">
            <div className="quickview-tags">
              <span className="dish-category-tag">{quickViewDish.category}</span>
              {quickViewDish.spicy && (
                <span className="spicy-badge">🌶️ Authentic Spicy</span>
              )}
            </div>
            <p className="quickview-desc">{quickViewDish.description}</p>
            <div className="quickview-footer">
              <span className="quickview-price">{quickViewDish.price} ETB</span>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  addItem(quickViewDish);
                  setQuickViewDish(null);
                }}
              >
                + Add to Order
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Menu;
