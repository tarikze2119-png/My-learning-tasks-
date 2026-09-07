import React from "react";
import { useFetch } from "../hooks/useFetch";

/**
 * Component 2 using useFetch: Demonstrates reusability of useFetch hook across components
 */
export default function FeaturedPromos() {
  const { data: promos, loading, error } = useFetch("/data/promos.json");

  if (loading) {
    return <div className="promo-skeleton">Loading daily specials...</div>;
  }

  if (error) {
    return <div className="promo-error">Notice: Specials unavailable ({error})</div>;
  }

  if (!promos || promos.length === 0) {
    return null;
  }

  return (
    <section className="promos-container">
      <h3 className="section-title">✨ Today's Featured Offers</h3>
      <div className="promos-grid">
        {promos.map((promo) => (
          <div key={promo.id} className="promo-card">
            <span className="promo-tag">{promo.tag}</span>
            <h4>{promo.title}</h4>
            <p>{promo.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
