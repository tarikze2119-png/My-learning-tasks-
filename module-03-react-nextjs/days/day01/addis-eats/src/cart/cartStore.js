import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Zustand Cart Store with LocalStorage Persistence
 * Features:
 * - Direct action dispatching without boilerplate action creators
 * - LocalStorage persistence via middleware
 * - Clean immutable updates
 */
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      // Add a dish or increment its quantity if already present
      addItem: (dish) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === dish.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === dish.id
                  ? { ...item, quantity: (item.quantity || 1) + 1 }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, { ...dish, quantity: 1 }],
          };
        }),

      // Remove a dish entirely
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      // Update quantity
      updateQuantity: (id, delta) =>
        set((state) => ({
          items: state.items
            .map((item) => {
              if (item.id === id) {
                const newQty = (item.quantity || 1) + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
              }
              return item;
            })
            .filter(Boolean),
        })),

      // Clear the entire cart
      clearCart: () => set({ items: [] }),

      // Helper getter for total ETB
      getTotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * (item.quantity || 1),
          0
        );
      },

      // Helper getter for total item count
      getCount: () => {
        return get().items.reduce(
          (sum, item) => sum + (item.quantity || 1),
          0
        );
      },
    }),
    {
      name: "addis-eats-cart-store",
    }
  )
);
