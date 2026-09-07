# 🍲 Addis Eats — React & Next.js Module 3 (Day 30)

An authentic Ethiopian food ordering web application bringing together core React fundamentals from Days 26 to 30: **Components & Props**, **State & Events**, **Custom Hooks (`useFetch`)**, **Global Context (`useContext`)**, **State Management (`useReducer`)**, and **Performance Optimization (`useMemo`, `useCallback`, `React.memo`)**.

---

## 🚀 Features

- **🌐 Custom `useFetch` Hook**: Handles dynamic URL query params, network loading states, error handling, and `AbortController` cancellation cleanup on unmount/re-fetch.
- **🔄 Pure `cartReducer`**: Implements immutable state transitions for `"add"`, `"decrease"`, `"remove"`, and `"clear"` actions.
- **📦 Global `CartProvider`**: Wraps the reducer, computes derived `total` and `itemCount` on every render, and provides state and actions across the app with zero prop drilling.
- **⚡ Memoization & Profiling**:
  - `useMemo` on `CartContext` provider value prevents unnecessary app-wide cascade re-renders.
  - `useCallback` provides a stable handler reference to `React.memo`-wrapped `DishList` and `DishCard` components.
  - `useMemo` caches filtered and sorted dish lists.
- **🌓 Theme Context**: Supports persistent Light and Dark themes via `ThemeContext` and `localStorage`.
- **🛒 Checkout Drawer**: Interactive slide-out cart overlay allowing item quantity changes, item removal, and order placement.

---

## 📁 Project Structure

```
src/
├── cart/
│   ├── cartReducer.js       # Pure state reducer (add, remove, decrease, clear)
│   ├── cartReducer.test.js  # Direct unit tests for reducer without React
│   └── CartProvider.jsx     # Context provider with useReducer & useMemo
├── components/
│   ├── CartComparison.jsx   # Architectural comparison: useState vs useReducer
│   ├── CheckoutPanel.jsx    # Checkout drawer reading CartContext
│   ├── DishCard.jsx         # Individual dish card wrapped in React.memo
│   ├── DishList.jsx         # Memoized dish grid
│   ├── FeaturedPromos.jsx   # Second component utilizing useFetch
│   ├── Footer.jsx           # Application footer showing active theme
│   ├── Header.jsx           # Top navigation bar with ThemeToggle & Cart Badge
│   ├── Menu.jsx             # Category-driven menu with useFetch, useMemo & useCallback
│   └── ThemeToggle.jsx      # Theme toggle button reading ThemeContext
├── context/
│   └── ThemeContext.jsx     # Theme context & provider
├── hooks/
│   └── useFetch.js          # Reusable custom hook with AbortController
├── css/
│   └── style.css            # Responsive styles & theme variables
├── App.jsx                  # Root component
└── main.jsx                 # Application entry point
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Unit Tests (Direct Reducer Check)
```bash
node src/cart/cartReducer.test.js
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## 🧠 Day 30 Review Questions & Answers

### 1. What problem does context solve, and what does it cost you in return?
- **Problem solved**: Prop drilling. It allows deeply nested components to read data directly without threading props through intermediary components that don't care about the value.
- **Cost**: Every consumer subscribed to the context re-renders whenever the context value changes, regardless of how deep they are in the component tree or which part of the context value they use.

### 2. Where does the state actually live when you use context — and why does that matter?
- **Where it lives**: State lives inside a component (e.g., inside `CartProvider` using `useState` or `useReducer`), NOT inside the context itself. Context is merely a delivery channel.
- **Why it matters**: Context does not manage state; the parent provider component does. When the provider's state updates, the provider re-renders and pushes the new value down the channel.

### 3. What makes a reducer a pure function, and what does that let you do with it?
- **Purity characteristics**: Given the same arguments `(state, action)`, it always returns the exact same new state object. It never mutates arguments and produces zero side effects (no API requests, no timer setups, no DOM mutations).
- **What it enables**: Reducers can be tested in complete isolation using plain JavaScript objects without needing React, jsdom, or mounting components.

### 4. Give two signs that a component should move from `useState` to `useReducer`.
1. Multiple state values always change together (e.g., `items`, `total`, `count`) where updating one without the others leads to inconsistent/drifted state.
2. The next state calculation depends intricately on previous state or involves complex branch logic (`add`, `remove`, `clear`, `reset`).

### 5. Why does `useCallback` do nothing useful unless the child is wrapped in `React.memo`?
- Without `React.memo`, a child component re-renders whenever its parent re-renders by default, regardless of whether its props changed. `useCallback` only preserves function reference equality; that equality is only checked if the child component is explicitly wrapped in `React.memo`.

### 6. Two components call the same custom hook — do they share state?
- **No.** Each call to a custom hook creates an independent instance of state and effects, identical to calling `useState` or `useEffect` separately in each component. To share state between components, the hook must be used inside a Context Provider and distributed via `useContext`.
