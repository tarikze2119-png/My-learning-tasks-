import React from "react";

const DishCard = React.memo(function DishCard({ dish, onAdd }) {
  return (
    <div className="dish-card">
      <div className="dish-card-header">
        <span className="dish-category-tag">{dish.category}</span>
        {dish.popular && <span className="popular-badge">⭐ Popular</span>}
      </div>

      <h3 className="dish-title">{dish.name}</h3>
      <p className="dish-desc">{dish.description}</p>

      <div className="dish-footer">
        <span className="dish-price">{dish.price} <small>ETB</small></span>
        <button 
          className="btn-add-to-cart"
          onClick={() => onAdd(dish)}
          aria-label={`Add ${dish.name} to cart`}
        >
          + Add to Order
        </button>
      </div>
    </div>
  );
});

export default DishCard;
