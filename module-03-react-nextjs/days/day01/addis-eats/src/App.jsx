import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./auth/AuthContext";
import Layout from "./Layout";
import Home from "./home/Home";
import Menu from "./menu/Menu";
import CartPage from "./cart/CartPage";
import LoginPage from "./auth/LoginPage";
import RequireAuth from "./auth/RequireAuth";
import NotFound from "./ui/NotFound";
import Skeleton from "./ui/Skeleton";
import ErrorBoundary from "./ui/ErrorBoundary";
import "./css/style.css";

// Lazy-loaded routes for code splitting (Day 34)
const DishDetail = lazy(() => import("./menu/DishDetail"));
const Checkout = lazy(() => import("./checkout/Checkout"));
const OrderReceipt = lazy(() => import("./checkout/OrderReceipt"));

/**
 * Addis Eats — Full Frontend Application (Day 35 Mini-Project)
 *
 * Implements complete 2-week React curriculum architecture:
 * 1. Client-Side Routing with React Router v6 & Nested Layouts
 * 2. Dynamic parameter routing (/menu/:id) and URL query params (?category=...)
 * 3. State management via Zustand store with persistence across page refreshes
 * 4. AuthContext with custom guarded hook & protected routes (RequireAuth)
 * 5. Controlled multi-field checkout with pure validation, touched tracking, & ARIA accessibility
 * 6. ErrorBoundary layers, Route code splitting with React.lazy + Suspense, and Modal Portals
 */
function App() {
  return (
    <ErrorBoundary
      fallback={
        <div className="fatal-error-screen" role="alert">
          <h1>Addis Eats System Notice</h1>
          <p>The application encountered an unrecoverable error. Please refresh the page.</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Reload Application
          </button>
        </div>
      }
    >
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Suspense
              fallback={
                <div style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
                  <Skeleton height="350px" count={2} />
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Layout />}>
                  {/* Index route: Landing page */}
                  <Route index element={<Home />} />

                  {/* Menu catalog with category filter in query string */}
                  <Route path="menu" element={<Menu />} />

                  {/* Dynamic dish detail route */}
                  <Route path="menu/:id" element={<DishDetail />} />

                  {/* Dedicated Cart Screen */}
                  <Route path="cart" element={<CartPage />} />

                  {/* Protected Checkout route */}
                  <Route
                    path="checkout"
                    element={
                      <RequireAuth>
                        <Checkout />
                      </RequireAuth>
                    }
                  />

                  {/* Order Receipt confirmation route */}
                  <Route path="orders/:id" element={<OrderReceipt />} />

                  {/* Authentication login screen */}
                  <Route path="login" element={<LoginPage />} />

                  {/* Catch-all 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
