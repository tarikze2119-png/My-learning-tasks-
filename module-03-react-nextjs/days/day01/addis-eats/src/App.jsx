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

const DishDetail = lazy(() => import("./menu/DishDetail"));
const Checkout = lazy(() => import("./checkout/Checkout"));
const OrderReceipt = lazy(() => import("./checkout/OrderReceipt"));

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
                  
                  <Route index element={<Home />} />

                  <Route path="menu" element={<Menu />} />

                  <Route path="menu/:id" element={<DishDetail />} />

                  <Route path="cart" element={<CartPage />} />

                  <Route
                    path="checkout"
                    element={
                      <RequireAuth>
                        <Checkout />
                      </RequireAuth>
                    }
                  />

                  <Route path="orders/:id" element={<OrderReceipt />} />

                  <Route path="login" element={<LoginPage />} />

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
