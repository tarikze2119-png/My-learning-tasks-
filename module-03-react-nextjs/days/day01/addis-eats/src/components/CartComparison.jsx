import React, { useState, useReducer } from "react";
import { cartReducer, initialCartState } from "../cart/cartReducer";

export function CartStateExample() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

  const handleAdd = (dish) => {
    
    setItems((prev) => [...prev, dish]);
    setTotal((prev) => prev + dish.price);
    setCount((prev) => prev + 1);
  };

  const handleClear = () => {
    setItems([]);
    setTotal(0);
    setCount(0);
  };

  return (
    <div className="comparison-box useState-box">
      <h4>Version A: 3 useState calls</h4>
      <p>Items count: {count} | Total: {total} ETB</p>
      <button onClick={() => handleAdd({ id: 1, name: "Sample", price: 100 })}>
        Add Item
      </button>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
}

export function CartReducerExample() {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const total = state.items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const count = state.items.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <div className="comparison-box useReducer-box">
      <h4>Version B: Converted to useReducer</h4>
      <p>Items count: {count} | Total: {total} ETB</p>
      <button onClick={() => dispatch({ type: "add", dish: { id: 1, name: "Sample", price: 100 } })}>
        Add Item
      </button>
      <button onClick={() => dispatch({ type: "clear" })}>Clear</button>
    </div>
  );
}

export default function CartComparison() {
  return (
    <section className="cart-comparison-section">
      <h3>🔍 Exercise 4: useState vs useReducer Comparison</h3>
      <div className="comparison-grid">
        <CartStateExample />
        <CartReducerExample />
      </div>
    </section>
  );
}
