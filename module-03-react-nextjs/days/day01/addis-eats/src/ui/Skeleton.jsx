import React from "react";

export function Skeleton({ height = "120px", count = 1 }) {
  return (
    <div className="skeleton-container" aria-busy="true" aria-label="Content loading">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="skeleton-box"
          style={{ height, marginBottom: count > 1 ? "1rem" : 0 }}
        />
      ))}
    </div>
  );
}

export default Skeleton;
