import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import CategoryPage from "../pages/CategoryPage";
import Products from "../pages/products";
import AdminLayout from "../components/layout/AdminLayout";
import AdminProductList from "../admin/AdminProductList";
import AdminEditProduct from "../admin/AdminEditProduct ";
import AdminAddProduct from "../admin/AdminAddProduct";
import AdminCategories from "../admin/AdminCategories";
import AdminAddCategory from "../admin/AdminAddCategory";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:slug" element={<CategoryPage />} /> {/* Add this new route */}
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />


            <Route path="/admin" element={<AdminLayout />}>
                <Route path="products" element={<AdminProductList />} />
                <Route path="add-product" element={<AdminAddProduct />} />
                 <Route path="categories" element={<AdminCategories />} />
                  <Route path="add-category" element={<AdminAddCategory />} />
                <Route path="edit-product/:id" element={<AdminEditProduct />} />
            </Route>


        </Routes>
    );
}

export default AppRoutes;
