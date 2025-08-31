import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../api";
import ProductCard from "../components/ProductCard";
import { useGetProductsByCategorySlugQuery } from "../features/productApi";
import FilterSidebar from "../components/FilterSidebar";
import { useSelector } from "react-redux";
import { useGetWishlistQuery } from "../features/wishlistApi";

const CategoryPage = () => {

const { slug } = useParams();
  const [filters, setFilters] = useState({
    availability: [],
    price: { min: 0, max: 100000 },
    categories: [],
  });
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);


const userId = useSelector((state) => state.auth.user?.id);


  const { data: wishlistData, error,  isFetching } = useGetWishlistQuery(userId, {
    skip: !userId, // ✅ skip API call if not logged in
  });




  // RTK Query
  const { data: fetchedProducts, isLoading, isError } =
    useGetProductsByCategorySlugQuery(slug);

  // Update state when fetchedProducts changes
  useEffect(() => {
    if (Array.isArray(fetchedProducts)) {
      setAllProducts(fetchedProducts);
      setProducts(fetchedProducts);
    } else {
      setAllProducts([]);
      setProducts([]);
    }
  }, [fetchedProducts]);

  // Apply filters
  useEffect(() => {
    const filtered = allProducts.filter((p) => {
      const availabilityMatch =
        filters.availability.length === 0 ||
        (filters.availability.includes("in-stock") && p.stock > 0) ||
        (filters.availability.includes("out-of-stock") && p.stock === 0);

      const effectivePrice = p.sale_price ? Number(p.sale_price) : Number(p.price);
      const priceMatch = effectivePrice >= filters.price.min && effectivePrice <= filters.price.max;

      return availabilityMatch && priceMatch;
    });
    setProducts(filtered);
  }, [filters, allProducts]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Failed to load products.</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>{" "}
        &gt;{" "}
        <span className="font-medium text-gray-700">{slug}</span>
      </nav>

      {/* Category Title */}
      <h1 className="text-3xl text-center font-bold text-gray-900 mb-8">
        {slug.charAt(0).toUpperCase() + slug.slice(1)} Products
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <FilterSidebar filters={filters} setFilters={setFilters} />

        {/* Products */}
        <main className="w-full lg:w-3/4">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`}>
                  <ProductCard
                    key={p.id}
                    id={p.id}          // ✅ important!
                   imageUrl={
                      p.image_url ? `${API_BASE}/${p.image_url}` : "/placeholder.png"
                    }
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
            <p className="text-gray-500">No products match the selected filters.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
