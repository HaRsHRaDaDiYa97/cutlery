
import React, { useEffect, useState } from "react";
import { API_BASE } from "../api";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import { useGetWishlistQuery } from "../features/wishlistApi";
import { useSelector } from "react-redux";
import { FiChevronRight, FiSearch, FiInbox, FiFilter, FiX } from "react-icons/fi";
import Pagination from "../components/Pagination";
import ProductsHelmet from "../seo_helmet/ProductsHelmet";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filters, setFilters] = useState({
    availability: [],
    price: { min: 0, max: 100000 },
    categories: [],
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 9;
  const userId = useSelector((state) => state.auth.user?.id);
 
 
  const { data: wishlistData } = useGetWishlistQuery(userId, { skip: !userId });

const wishlistItems = Array.isArray(wishlistData?.wishlist)
  ? wishlistData.wishlist
  : Array.isArray(wishlistData)
  ? wishlistData
  : [];



  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchProducts = async (pageNum, reset = false) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pageNum,
        limit: itemsPerPage,
      });

      if (debouncedSearch) params.append("search", debouncedSearch);
      if (filters.availability.length) params.append("availability", filters.availability.join(","));
      if (filters.price.min !== 0) params.append("minPrice", filters.price.min);
      if (filters.price.max !== 100000) params.append("maxPrice", filters.price.max);
      if (filters.categories.length) params.append("categories", filters.categories.join(","));

      const res = await fetch(`${API_BASE}/get_products.php?${params}`);
      const data = await res.json();

      setProducts(data.products || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page, filters, debouncedSearch]);

  // Reset to page 1 when filters/search change
  useEffect(() => {
    setPage(1);
  }, [filters, debouncedSearch]);

  const totalPages = Math.ceil(total / itemsPerPage);
  const handleApplyFilters = () => setIsFilterOpen(false);

  return (

<>

<ProductsHelmet />


    <div className="bg-white min-h-screen relative">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 mb-8">
          <nav className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-700">Home</Link>
            <FiChevronRight className="mx-2 h-4 w-4" />
            <span className="font-medium text-gray-800">Products</span>
          </nav>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">
            All Products
          </h1>          
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden sticky top-20 z-30 py-2 mb-4 ">
          <div className="flex justify-end">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 rounded-md bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800"
            >
              <FiFilter size={18} /> Filter
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-x-8 gap-y-10">
          {/* Sidebar */}
          <aside className="lg:w-64 lg:flex-shrink-0">
            {/* Search */}
            <div className="mb-6 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-md border-gray-300 bg-gray-50 py-2 pl-10 pr-3 text-sm focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Filters (desktop sticky) */}
            <div className="hidden lg:block lg:sticky lg:top-20 lg:max-h-[80vh] lg:overflow-y-auto p-6 bg-gray-50 rounded-lg border border-gray-200">
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </div>
          </aside>

          {/* Products */}
          <main className="flex-1">
            {loading ? (
              <p className="text-center py-10">Loading products...</p>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((p) => (
                    <Link key={p.id} to={`/product/${p.id}`}>
                      <ProductCard
                        id={p.id}
                        imageUrl={p.image}
                        category={p.category}
                        title={p.name}
                        price={p.price}
                        salePrice={p.sale_price}
                       wishlistData={wishlistItems} // ✅ always array
                      />
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={(p) => setPage(p)}
                />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-20 px-6 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200">
                <FiInbox size={48} className="mx-auto text-gray-400" />
                <h2 className="mt-4 text-xl font-semibold text-gray-900">No Products Found</h2>
                <p className="mt-2 text-base text-gray-600">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-50 ${isFilterOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-300 ${isFilterOpen ? "opacity-50" : "opacity-0"}`}
          onClick={() => setIsFilterOpen(false)}
        ></div>
        <div
          className={`relative ml-auto w-80 bg-white h-full p-6 shadow-lg overflow-y-auto transform transition-transform duration-300 ${isFilterOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button onClick={() => setIsFilterOpen(false)}>
              <FiX size={24} />
            </button>
          </div>
          <FilterSidebar filters={filters} setFilters={setFilters} />
          <button
            onClick={handleApplyFilters}
            className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>

</>

  );
}
