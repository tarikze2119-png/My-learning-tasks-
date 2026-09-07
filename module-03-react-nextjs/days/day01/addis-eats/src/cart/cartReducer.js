/**
 * cartReducer.js - Pure function: (state, action) => nextState
 * 
 * Rules of a Reducer:
 * 1. Pure function: Same input state and action always returns the same output.
 * 2. Never mutates previous state or action objects.
 * 3. Does not perform side effects (no network calls, no timers, no storage).
 * 4. Testable directly without React or the DOM.
 */

export const initialCartState = {
  items: []
};

export function cartReducer(state = initialCartState, action) {
  switch (action.type) {
    case "add": {
      if (!action.dish) {
        throw new Error("Action 'add' requires a dish payload");
      }
      const existingItem = state.items.find((item) => item.id === action.dish.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.dish.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.dish, quantity: 1 }],
      };
    }

    case "remove": {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };
    }

    case "decrease": {
      const existingItem = state.items.find((item) => item.id === action.id);
      if (!existingItem) return state;

      if (existingItem.quantity > 1) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };
    }

    case "clear": {
      return {
        ...state,
        items: [],
      };
    }

    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
}
