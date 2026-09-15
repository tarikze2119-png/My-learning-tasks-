import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useCartStore } from "../cart/cartStore";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import Skeleton from "../ui/Skeleton";
import Modal from "../ui/Modal";
import ErrorBoundary from "../ui/ErrorBoundary";

export function Menu() {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";

  const { data: dishes, loading, error, refetch } = useFetch("/data/dishes.json");

  const [quickViewDish, setQuickViewDish] = useState(null);
  const addItem = useCartStore((s) => s.addItem);

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
