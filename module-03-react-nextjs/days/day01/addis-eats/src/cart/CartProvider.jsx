import React, { createContext, useContext, useReducer, useMemo } from "react";
import { cartReducer, initialCartState } from "./cartReducer";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const total = state.items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const itemCount = state.items.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const contextValue = useMemo(() => {
    return {
      items: state.items,
      dispatch,
      total,
      itemCount,
      
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

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
