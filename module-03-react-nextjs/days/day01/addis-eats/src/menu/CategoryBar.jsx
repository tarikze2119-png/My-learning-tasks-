import React from "react";
import { useSearchParams } from "react-router-dom";

const CATEGORIES = ["All", "Meat", "Vegetarian", "Traditional"];

export function CategoryBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";

  const handleSelect = (category) => {
    if (category === "All") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <div className="category-bar-wrapper" role="toolbar" aria-label="Menu Category Filter">
      <span className="category-label">Filter:</span>
      <div className="category-chips">
        {CATEGORIES.map((cat) => {
          const isActive =
            cat.toLowerCase() === currentCategory.toLowerCase();
          return (
            <button
              key={cat}
              type="button"
              className={`category-chip ${isActive ? "active" : ""}`}
              onClick={() => handleSelect(cat)}
              aria-pressed={isActive}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryBar;
