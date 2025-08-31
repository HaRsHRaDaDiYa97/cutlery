// src/pages/Products.js
import React, { useEffect, useState } from "react";
import { API_BASE } from "../api";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import { useGetWishlistQuery } from "../features/wishlistApi";
import { useSelector } from "react-redux";

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    availability: [],
    price: { min: 0, max: 100000 },
    categories: [], // now categories are strings
  });

  const userId = useSelector((state) => state.auth.user?.id);


  const { data: wishlistData, error, isLoading, isFetching } = useGetWishlistQuery(userId, {
    skip: !userId, // ✅ skip API call if not logged in
  });

  
  useEffect(() => {
    fetch(`${API_BASE}/get_products.php`)
      .then((r) => r.json())
      .then((data) => {

        if (Array.isArray(data)) {
          setAllProducts(data);
          setProducts(data);
        } else {
          setAllProducts([]);
          setProducts([]);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Apply filters whenever filters or allProducts change
  useEffect(() => {
    const filtered = allProducts.filter((p) => {
      // Availability filter
      const availabilityMatch =
        filters.availability.length === 0 ||
        (filters.availability.includes("in-stock") && p.stock > 0) ||
        (filters.availability.includes("out-of-stock") && p.stock === 0);

      // Price filter (use sale_price if available, else price)
      const effectivePrice = p.sale_price
        ? Number(p.sale_price)
        : Number(p.price);
      const priceMatch =
        effectivePrice >= filters.price.min &&
        effectivePrice <= filters.price.max;

      // Category filter (string comparison now)
      // Inside filter logic:
      const categoryMatch =
        filters.categories.length === 0 ||
        filters.categories.includes(p.category); // ✅ backend provides category name


      return availabilityMatch && priceMatch && categoryMatch;
    });
    setProducts(filtered);
  }, [filters, allProducts]);

  return (
    <div className="min-h-screen container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>{" "}
        &gt;{" "}
        <span className="font-medium text-gray-700">Products</span>
      </nav>

      <h1 className="text-3xl text-center font-bold text-gray-900 mb-8">Our Products</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar */}
        <FilterSidebar filters={filters} setFilters={setFilters} />

        {/* Right Content */}
        <main className="w-full lg:w-3/4">
          {Array.isArray(products) && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`}>
                  <ProductCard
                    key={p.id}
                    id={p.id}          // ✅ important!
                    imageUrl={p.image}
                    category={p.category}
                    title={p.name}
                    price={p.price}
                    salePrice={p.sale_price}
                    wishlistData={wishlistData}
                  />


                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No products found</p>
          )}
        </main>
      </div>
    </div>

  );
}
