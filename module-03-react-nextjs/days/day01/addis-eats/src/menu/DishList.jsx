import React from "react";
import DishCard from "./DishCard";

/**
 * DishList Component
 * Renders an array of dishes using unique stable keys.
 * Handles empty results cleanly with an early-return friendly note.
 */
export function DishList({ dishes, onQuickView }) {
  if (!dishes || dishes.length === 0) {
    return (
      <div className="empty-dish-state" role="status">
        <p>No dishes found matching your selection.</p>
        <small>Try selecting a different category from the filter above.</small>
      </div>
    );
  }

  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <DishCard
          key={dish.id}
          dish={dish}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
}

export default DishList;
