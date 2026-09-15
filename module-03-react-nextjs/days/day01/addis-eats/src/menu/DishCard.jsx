import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../cart/cartStore";

export const DishCard = React.memo(function DishCard({ dish, onQuickView }) {
  const addItem = useCartStore((s) => s.addItem);

  if (!dish) return null;

  return (
    <div className="dish-card">
      <div className="dish-card-header">
        <span className="dish-category-tag">{dish.category}</span>
        {dish.spicy && (
          <span className="spicy-badge" title="Spicy Ethiopian Dish">
            🌶️ Spicy
          </span>
        )}
      </div>

      <div className="dish-card-body">
        <h3 className="dish-title">
          <Link to={`/menu/${dish.id}`} className="dish-title-link">
            {dish.name}
          </Link>
        </h3>
        <p className="dish-desc">{dish.description}</p>
      </div>

      <div className="dish-card-footer">
        <div className="dish-price-tag">
          <span className="price-amount">{dish.price}</span>
          <span className="price-currency">ETB</span>
        </div>

        <div className="dish-card-actions">
          {onQuickView && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => onQuickView(dish)}
              aria-label={`Quick view modal for ${dish.name}`}
            >
              Quick View
            </button>
          )}

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => addItem(dish)}
            aria-label={`Add ${dish.name} to order`}
          >
            + Add to Order
          </button>
        </div>
      </div>
    </div>
  );
});

export default DishCard;
