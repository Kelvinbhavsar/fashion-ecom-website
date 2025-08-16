import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import KrishnaHome from './pages/krishna-home';
import AdminDashboard from './pages/admin-dashboard';
import AdminProductManagement from './pages/admin-product-management';
import ShoppingCartCheckout from './pages/shopping-cart-checkout';
import ProductDetailView from './pages/product-detail-view';
import OrderManagementDashboard from './pages/order-management-dashboard';
import CustomerProductCatalog from './pages/customer-product-catalog';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<KrishnaHome />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-product-management" element={<AdminProductManagement />} />
        <Route path="/shopping-cart-checkout" element={<ShoppingCartCheckout />} />
        <Route path="/product-detail-view" element={<ProductDetailView />} />
        <Route path="/order-management-dashboard" element={<OrderManagementDashboard />} />
        <Route path="/customer-product-catalog" element={<CustomerProductCatalog />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;