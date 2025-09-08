
import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_BASE } from "../api";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import { useSelector } from "react-redux";
import { useGetWishlistQuery } from "../features/wishlistApi";
import { FiChevronRight, FiSearch, FiFilter, FiX, FiInbox } from "react-icons/fi";
import Pagination from "../components/Pagination";

// small debounce hook to avoid spamming API on search typing
function useDebounced(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export default function CategoryPage() {
  const { slug } = useParams();

  // filters aligned with Products.jsx
  const [filters, setFilters] = useState({
    availability: [],
    price: { min: 0, max: 100000 },
    categories: [], // (not used in category page, but harmless)
  });
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useDebounced(searchQuery, 300);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  const userId = useSelector((state) => state.auth.user?.id);
  const { data: wishlistData } = useGetWishlistQuery(userId, { skip: !userId });

  const title = useMemo(() => {
    if (!slug) return "Products";
    return `${slug.charAt(0).toUpperCase()}${slug.slice(1)} Products`;
  }, [slug]);

  const fetchProducts = async (pageNum) => {
    try {
      const params = new URLSearchParams({
        category_slug: slug,
        page: pageNum,
        limit: itemsPerPage,
      });

      if (debouncedSearch) params.append("search", debouncedSearch);
      if (filters.availability.length > 0)
        params.append("availability", filters.availability.join(","));
      if (filters.price.min !== 0) params.append("minPrice", filters.price.min);
      if (filters.price.max !== 100000) params.append("maxPrice", filters.price.max);

      const res = await fetch(`${API_BASE}/category_slug.php?${params.toString()}`);
      const data = await res.json();

      setProducts(Array.isArray(data.products) ? data.products : []);
      setTotal(Number.isFinite(data.total) ? data.total : 0);
    } catch (err) {
      console.error("Fetch error:", err);
      setProducts([]);
      setTotal(0);
    }
  };


  // fetch on page/filters/search/slug changes
  useEffect(() => {
    fetchProducts(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedSearch, filters, slug]);

  // reset to page 1 when filters/search/slug change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filters, slug]);

  const totalPages = Math.ceil(total / itemsPerPage);
  const handleApplyFilters = () => setIsFilterOpen(false);

  return (
    <div className="bg-white min-h-screen relative">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 mb-8">
          <nav className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-700">Home</Link>
            <FiChevronRight className="mx-2 h-4 w-4" />
            <span className="font-medium text-gray-800">
              {slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Products"}
            </span>
          </nav>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>
        </div>

       {/* Mobile Filter Button (sticky after title scrolls) */}
       <div className="lg:hidden sticky top-20 z-30 bg-transparent  py-2 mb-4">
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
          {/* Sidebar (desktop) */}
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
            {products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {products.map((p) => (
                    <Link key={p.id} to={`/product/${p.id}`}>
                      <ProductCard
                        id={p.id}
                        imageUrl={p.image || "/placeholder.png"}
                        category={p.category}
                        title={p.name}
                        price={p.price}
                        salePrice={p.sale_price}
                        wishlistData={wishlistData}
                      />
                    </Link>
                  ))}
                </div>

                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={(p) => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setPage(p);
                  }}
                />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-20 px-6 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200">
                <FiInbox size={48} className="mx-auto text-gray-400" />
                <h2 className="mt-4 text-xl font-semibold text-gray-900">
                  No Products Found
                </h2>
                <p className="mt-2 text-base text-gray-600">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Drawer (filters) */}
      <div className={`fixed inset-0 z-50 ${isFilterOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-300 ${isFilterOpen ? "opacity-50" : "opacity-0"}`}
          onClick={() => setIsFilterOpen(false)}
        />
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
            onClick={() => setIsFilterOpen(false)}
            className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
