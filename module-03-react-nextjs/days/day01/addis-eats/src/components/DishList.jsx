import React from "react";
import DishCard from "./DishCard";

const DishList = React.memo(function DishList({ dishes, onAdd }) {
  if (!dishes || dishes.length === 0) {
    return (
      <div className="no-dishes-state">
        <p>No dishes found in this category.</p>
      </div>
    );
  }

  return (
    <div className="dishes-grid">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} onAdd={onAdd} />
      ))}
    </div>
  );
});

export default DishList;
