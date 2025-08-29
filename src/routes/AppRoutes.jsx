import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import AdminAddProduct from "../pages/AdminAddProduct";
import CategoryPage from "../pages/CategoryPage";
import Products from "../pages/products";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} /> {/* Add this new route */}
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/admin/add-product" element={<AdminAddProduct />} />
    </Routes>
  );
}

export default AppRoutes;
