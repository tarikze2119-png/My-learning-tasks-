import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

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

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

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

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * (item.quantity || 1),
          0
        );
      },

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
