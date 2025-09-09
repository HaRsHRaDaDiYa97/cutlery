import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import CategoryPage from "../pages/CategoryPage";

// Lazy load all other pages
const Products = lazy(() => import("../pages/products"));
const LoginForm = lazy(() => import("../pages/LoginForm"));
const SignupForm = lazy(() => import("../pages/SignupForm"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const Cart = lazy(() => import("../pages/Cart"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const AboutUsPage = lazy(() => import("../pages/AboutUsPage"));
const AccountPage = lazy(() => import("../pages/AccountPage"));
const OrderHistoryPage = lazy(() => import("../pages/OrderHistoryPage"));
const Checkout = lazy(() => import("../pages/Checkout"));
const VerifyOtpForm = lazy(() => import("../components/VerifyOtpForm"));
const TermsOfServicePage = lazy(() => import("../pages/policy/TermsOfServicePage"));
const ShippingPolicyPage = lazy(() => import("../pages/policy/ShippingPolicyPage"));
const RefundPolicyPage = lazy(() => import("../pages/policy/RefundPolicyPage"));
const PrivacyPolicyPage = lazy(() => import("../pages/policy/PrivacyPolicyPage"));

// Lazy load admin components
const AdminLayout = lazy(() => import("../components/layout/AdminLayout"));
const AdminDashboard = lazy(() => import("../admin/AdminDashboard"));
const AdminProductList = lazy(() => import("../admin/AdminProductList"));
const AdminEditProduct = lazy(() => import("../admin/AdminEditProduct"));
const AdminAddProduct = lazy(() => import("../admin/AdminAddProduct"));
const AdminCategories = lazy(() => import("../admin/AdminCategories"));
const AdminAddCategory = lazy(() => import("../admin/AdminAddCategory"));
const AdminReview = lazy(() => import("../admin/AdminReview"));
const AdminOrders = lazy(() => import("../admin/AdminOrders"));
const AdminContact = lazy(() => import("../admin/AdminContact"));

import ProtectedAdminRoute from "../components/ProtectedAdminRoute";
import Loader from "../components/Loader";

function AppRoutes() {
  return (
    <Suspense fallback={ <Loader/> }>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/orders" element={<OrderHistoryPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/verify-otp" element={<VerifyOtpForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/shipping" element={<ShippingPolicyPage />} />
        <Route path="/refund" element={<RefundPolicyPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProductList />} />
            <Route path="add-product" element={<AdminAddProduct />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="reviews" element={<AdminReview />} />
            <Route path="add-category" element={<AdminAddCategory />} />
            <Route path="messages" element={<AdminContact />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="edit-product/:id" element={<AdminEditProduct />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
