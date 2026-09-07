import React, { useState, useReducer } from "react";
import { cartReducer, initialCartState } from "../cart/cartReducer";

/**
 * Exercise 4: Convert a component with three related useState calls to useReducer,
 * and compare the two versions.
 * 
 * ============================================================================
 * VERSION 1 (useState - Problematic with coupled states):
 * ============================================================================
 * Problems with 3 related useState calls:
 * 1. "Related values drift apart": Multiple setters (setItems, setCount, setTotal)
 *    must be kept in sync on every handler path (add, remove, reset).
 * 2. If a developer forgets one setter in a new handler, state becomes inconsistent.
 * 3. Logic is scattered across multiple inline event handlers.
 * 4. Derived values (like total) stored in state can go out of sync.
 */
export function CartStateExample() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

  const handleAdd = (dish) => {
    // 3 separate setters must be called correctly together:
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

/**
 * ============================================================================
 * VERSION 2 (useReducer - Clean, predictable & pure):
 * ============================================================================
 * Benefits of useReducer:
 * 1. Single source of truth: State transitions happen via dispatched actions.
 * 2. Handlers only describe *what happened* (`dispatch({ type: 'add', dish })`),
 *    while the pure reducer decides *how state changes*.
 * 3. Total is derived on each render (`items.reduce(...)`), never going out of sync.
 * 4. Easy to test the reducer in isolation without mounting React components.
 */
export function CartReducerExample() {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // Derived state: calculated dynamically on every render
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
