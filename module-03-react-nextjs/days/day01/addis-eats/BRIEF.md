# Addis Eats — Full Frontend Mini-Project Brief (Day 35)

## 1. Project Overview & Scope
**Addis Eats** is a full-featured, single-page web application for ordering authentic Ethiopian food in Addis Ababa. It demonstrates two weeks of progressive React architecture (Days 26 to 34) synthesized into a resilient, accessible, and performant product.

---

## 2. Component Hierarchy & Ownership Tree

```text
App (ErrorBoundary, ThemeProvider, AuthProvider, BrowserRouter, Suspense)
└── Layout (Persistent Shell)
    ├── Header (Brand, Navigation NavLinks, User Session Badge, ThemeToggle, CartBadge)
    │   └── CartBadge (Subscribes to Zustand Cart Count & Total)
    ├── <Outlet /> (Dynamic view rendering without unmounting Header/Footer)
    │   ├── Home (Landing page, Hero, Daily Specials, Direct Menu links)
    │   ├── Menu (CategoryBar with URL query string, useFetch, DishList, QuickView Modal)
    │   │   ├── CategoryBar (useSearchParams sync for ?category=...)
    │   │   ├── DishList (List rendering with stable keys, empty-state branch)
    │   │   │   └── DishCard (Spicy badge, +Add to Order, QuickView button, Detail Link)
    │   │   └── Modal (createPortal into #modal-root, Escape key listener, focus trap)
    │   ├── DishDetail (/menu/:id dynamic route, useParams, quantity stepper, add-to-cart)
    │   ├── CartPage (/cart route, order lines, quantity controls, VAT calculation, clear action)
    │   ├── RequireAuth (Guard wrapper checking session & loading state)
    │   │   └── Checkout (/checkout route, 4-field state, touched tracking, live validation, TeleBirr)
    │   ├── OrderReceipt (/orders/:id confirmation screen)
    │   ├── LoginPage (/login route, phone sign-in, redirect to intended destination)
    │   └── NotFound (* catch-all route for unmapped URLs)
    └── Footer (Copyright, theme indicator)
```

---

## 3. State Placement & Architectural Decision Matrix

| State Concern | Storage Mechanism | Rationale |
| :--- | :--- | :--- |
| **Category Filter** | URL Search Query (`useSearchParams`) | Shareable, bookmarkable, and persists across page reloads. |
| **Dish Catalog** | Component Server Fetch (`useFetch`) | Derived server state with loading, error, and abortable cleanup. |
| **Shopping Cart** | Global Store (`Zustand` with `persist`) | Shared across 4 routes (`Header`, `Menu`, `CartPage`, `Checkout`), surviving browser reloads without full-tree re-renders. |
| **User Authentication** | React Context (`AuthContext` + guarded `useAuth`) | Rarely changes; consumed at high levels (`RequireAuth`, `Header`, `LoginPage`). |
| **Checkout Form** | Local Component State (`useState` single object) | Ephemeral to the checkout screen; isolated to prevent global re-renders. |
| **QuickView Modal** | Local Component State (`useState`) | Controlled by the Menu screen; rendered into `#modal-root` via `createPortal`. |

---

## 4. Verification of the 6 Failure Paths

1. **Slow Network (Slow 3G Simulation)**:
   * Displays animated skeleton placeholders without jarring layout shifts or white screens.
2. **Failed API / Network Interruption**:
   * Displays clear inline error banners with retry triggers (`btn-retry`).
3. **Empty Filter Results**:
   * Friendly early-return note (*"No dishes found matching your selection"*) instead of blank space.
4. **Nonsense / Unmapped URL**:
   * Catch-all `*` route catches invalid paths and renders a helpful 404 page with navigation options.
5. **Direct Navigation to Protected `/checkout` while Logged Out**:
   * `RequireAuth` intercepts, preserves `location.pathname` in router state, redirects to `/login`, and returns user to `/checkout` once authenticated.
6. **Cold Browser Refresh on Any Route**:
   * Every screen loads independently from URL parameters without crashes. Cart items and auth tokens remain intact via persistence.

---

## 5. Definition of Done Checklist

- [x] Works for a stranger without instruction or manual intervention.
- [x] All 6 form states handled (*pristine, dirty, invalid, submitting, failed, succeeded*).
- [x] Clean browser console without React key warnings, prop errors, or unmounted state warnings.
- [x] Clean, semantic Git commit history following conventional commits.
- [x] Passes production build (`npm run build`) with verified route code-splitting.
