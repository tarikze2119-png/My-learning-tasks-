import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchDishById } from "../api/dishes";
import { useCartStore } from "../cart/cartStore";
import { Spinner } from "../ui/Spinner";

/**
 * DishDetail Component (/menu/:id dynamic route)
 * As taught on Day 31: reads URL params with useParams, fetches specific dish details,
 * and handles loading, error, and not-found states gracefully.
 */
export function DishDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);

  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    fetchDishById(id, ctrl.signal)
      .then((data) => {
        setDish(data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message || "Could not load dish details");
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => ctrl.abort();
  }, [id]);

  if (loading) {
    return (
      <div className="dish-detail-container">
        <Spinner label="Loading dish details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="dish-detail-container error-state" role="alert">
        <h3>Error Loading Dish</h3>
        <p>{error}</p>
        <Link to="/menu" className="btn btn-secondary">
          &larr; Back to Menu
        </Link>
      </div>
    );
  }

  if (!dish) {
    return (
      <div className="dish-detail-container not-found-state">
        <h2>Dish Not Found</h2>
        <p>No dish exists with identifier "{id}".</p>
        <Link to="/menu" className="btn btn-primary">
          Return to Menu
        </Link>
      </div>
    );
  }

  const handleAddMultiple = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(dish);
    }
  };

  return (
    <div className="dish-detail-page">
      <nav className="breadcrumb-nav" aria-label="Breadcrumbs">
        <Link to="/menu">&larr; Back to Menu</Link>
        <span> / </span>
        <span>{dish.name}</span>
      </nav>

      <div className="dish-detail-card">
        <div className="dish-detail-header">
          <div>
            <span className="dish-category-tag">{dish.category}</span>
            {dish.spicy && <span className="spicy-badge">🌶️ Authentic Spicy</span>}
            <h1 className="dish-detail-title">{dish.name}</h1>
          </div>
          <div className="dish-rating-badge">
            ★ {dish.rating || 4.8} / 5.0
          </div>
        </div>

        <p className="dish-detail-description">{dish.description}</p>

        <div className="dish-detail-specs">
          <div className="spec-item">
            <span className="spec-label">Price per portion</span>
            <span className="spec-value price-highlight">{dish.price} ETB</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Preparation Time</span>
            <span className="spec-value">15–25 mins</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Packaging</span>
            <span className="spec-value">Thermal insulated box + extra injera</span>
          </div>
        </div>

        <div className="dish-detail-order-bar">
          <div className="quantity-stepper">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="qty-value">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-add-detail"
            onClick={handleAddMultiple}
          >
            Add {quantity} to Order ({dish.price * quantity} ETB)
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              handleAddMultiple();
              navigate("/cart");
            }}
          >
            Order & View Cart &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

export default DishDetail;
