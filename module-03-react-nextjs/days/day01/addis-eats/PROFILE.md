# Addis Eats — Performance & Profiling Report

## 1. Profiler Observations

* **Cart Badge Optimization**:
  * *Before*: Subscribing to the entire cart store caused the top header to re-render whenever any cart mutation occurred.
  * *After*: Subscribing through narrow selectors (`useCartStore(s => s.items.length)`) restricts re-renders strictly to badge count updates.
* **Menu Rendering Optimization**:
  * *Before*: Filtering array on every single parent re-render created new array references each tick.
  * *After*: Derived dishes are wrapped in `useMemo(() => dishes.filter(...), [dishes, category])`, ensuring stable references and skipping expensive calculations when category is unchanged.
* **Code Splitting & Bundle Measurements**:
  * Routes (`DishDetail`, `Checkout`, `OrderReceipt`) are dynamically imported with `React.lazy()` and wrapped in `<Suspense fallback={<Skeleton />}>`.
  * Production chunk distribution:
    * Main vendor & shell: `~255 kB`
    * Checkout bundle: `6.85 kB`
    * Dish detail bundle: `3.58 kB`
    * Receipt confirmation: `1.60 kB`
