import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import CategoryPage from "../pages/CategoryPage";
import Products from "../pages/products";
import AdminLayout from "../components/layout/AdminLayout";
import AdminProductList from "../admin/AdminProductList";
import AdminEditProduct from "../admin/AdminEditProduct";
import AdminAddProduct from "../admin/AdminAddProduct";
import AdminCategories from "../admin/AdminCategories";
import AdminAddCategory from "../admin/AdminAddCategory";
import LoginForm from "../pages/LoginForm";
import SignupForm from "../pages/SignupForm";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart";
import AdminReview from "../admin/AdminReview";
import AdminDashboard from "../admin/AdminDashboard";
import ContactPage from "../pages/ContactPage";
import AboutUsPage from "../pages/AboutUsPage";
import { AdminContact } from "../admin/AdminContact";
import AccountPage from "../pages/AccountPage";
import OrderHistoryPage from "../pages/OrderHistoryPage";
import Checkout from "../pages/Checkout";
import AdminOrders from "../admin/AdminOrders";
import VerifyOtpForm from "../components/VerifyOtpForm";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:slug" element={<CategoryPage />} /> {/* Add this new route */}
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="verify-otp" element={<VerifyOtpForm />} />
            <Route path="signup" element={<SignupForm />} />

            <Route path="/admin" element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="products" element={<AdminProductList />} />
                <Route path="add-product" element={<AdminAddProduct />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="reviews" element={<AdminReview />} />
                <Route path="add-category" element={<AdminAddCategory />} />
                <Route path="messages" element={<AdminContact />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="edit-product/:id" element={<AdminEditProduct />} />
            </Route>


        </Routes>
    );
}

export default AppRoutes;
