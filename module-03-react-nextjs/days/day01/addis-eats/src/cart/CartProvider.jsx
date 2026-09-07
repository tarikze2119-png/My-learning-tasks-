import React, { createContext, useContext, useReducer, useMemo } from "react";
import { cartReducer, initialCartState } from "./cartReducer";

// 1. Create the Cart Context
export const CartContext = createContext(null);

/**
 * Exercise 5 & 6: CartProvider Component
 * 
 * Manages cart state with useReducer, computes derived total,
 * and provides items, dispatch, and helper functions down the React component tree.
 */
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // Derived state: calculated on every render from items list so it never goes out of sync
  const total = state.items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const itemCount = state.items.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  /**
   * ============================================================================
   * Exercise 6: Memoisation with useMemo
   * ============================================================================
   * EXPLANATION OF WHAT useMemo PREVENTS HERE:
   * 
   * In JavaScript, object literals `{ items, dispatch, total, ... }` evaluate to
   * a brand new object reference in memory on EVERY render of CartProvider.
   * 
   * Without `useMemo`:
   * Every time CartProvider or any of its ancestors re-renders (for instance,
   * if parent state changes or theme updates), a new context object reference is created.
   * React checks `prevContextValue === nextContextValue` using referential equality (Object.is).
   * Because `{}` !== `{}`, EVERY component that calls `useContext(CartContext)` across the
   * entire application is forced to re-render, even if the cart items and total didn't change!
   * 
   * With `useMemo`:
   * React caches the context value object reference. It only creates a new reference
   * when `state.items` or `total` actually changes. This prevents wasteful cascade
   * re-renders in consumer components (like Header badge, DishList, Menu, etc.)
   * when unrelated state in parent components changes.
   * ============================================================================
   */
  const contextValue = useMemo(() => {
    return {
      items: state.items,
      dispatch,
      total,
      itemCount,
      // Helper actions for convenience
      addItem: (dish) => dispatch({ type: "add", dish }),
      removeItem: (id) => dispatch({ type: "remove", id }),
      decreaseItem: (id) => dispatch({ type: "decrease", id }),
      clearCart: () => dispatch({ type: "clear" }),
    };
  }, [state.items, total, itemCount]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * Custom hook to safely consume CartContext
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
