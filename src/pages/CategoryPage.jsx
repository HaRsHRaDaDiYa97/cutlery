// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import { API_BASE } from "../api";
// import ProductCard from "../components/ProductCard";
// import { useGetProductsByCategorySlugQuery } from "../features/productApi";
// import FilterSidebar from "../components/FilterSidebar";
// import { useSelector } from "react-redux";
// import { useGetWishlistQuery } from "../features/wishlistApi";

// const CategoryPage = () => {

// const { slug } = useParams();
//   const [filters, setFilters] = useState({
//     availability: [],
//     price: { min: 0, max: 100000 },
//     categories: [],
//   });
//   const [products, setProducts] = useState([]);
//   const [allProducts, setAllProducts] = useState([]);


// const userId = useSelector((state) => state.auth.user?.id);


//   const { data: wishlistData, error,  isFetching } = useGetWishlistQuery(userId, {
//     skip: !userId, // ✅ skip API call if not logged in
//   });




//   // RTK Query
//   const { data: fetchedProducts, isLoading, isError } =
//     useGetProductsByCategorySlugQuery(slug);

//   // Update state when fetchedProducts changes
//   useEffect(() => {
//     if (Array.isArray(fetchedProducts)) {
//       setAllProducts(fetchedProducts);
//       setProducts(fetchedProducts);
//     } else {
//       setAllProducts([]);
//       setProducts([]);
//     }
//   }, [fetchedProducts]);

//   // Apply filters
//   useEffect(() => {
//     const filtered = allProducts.filter((p) => {
//       const availabilityMatch =
//         filters.availability.length === 0 ||
//         (filters.availability.includes("in-stock") && p.stock > 0) ||
//         (filters.availability.includes("out-of-stock") && p.stock === 0);

//       const effectivePrice = p.sale_price ? Number(p.sale_price) : Number(p.price);
//       const priceMatch = effectivePrice >= filters.price.min && effectivePrice <= filters.price.max;

//       return availabilityMatch && priceMatch;
//     });
//     setProducts(filtered);
//   }, [filters, allProducts]);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-red-600">Failed to load products.</p>
//       </div>
//     );
//   }


//   return (
//     <div className="min-h-screen container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Breadcrumb */}
//       <nav className="text-sm text-gray-500 mb-4">
//         <Link to="/" className="hover:underline">
//           Home
//         </Link>{" "}
//         &gt;{" "}
//         <span className="font-medium text-gray-700">{slug}</span>
//       </nav>

//       {/* Category Title */}
//       <h1 className="text-3xl text-center font-bold text-gray-900 mb-8">
//         {slug.charAt(0).toUpperCase() + slug.slice(1)} Products
//       </h1>

//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Filters */}
//         <FilterSidebar filters={filters} setFilters={setFilters} />

//         {/* Products */}
//         <main className="w-full lg:w-3/4">
//           {products.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {products.map((p) => (
//                 <Link key={p.id} to={`/product/${p.id}`}>
//                   <ProductCard
//                     key={p.id}
//                     id={p.id}          // ✅ important!
//                    imageUrl={
//                       p.image_url ? `${API_BASE}/${p.image_url}` : "/placeholder.png"
//                     }
//                     category={p.category}
//                     title={p.name}
//                     price={p.price}
//                     salePrice={p.sale_price}
//                     wishlistData={wishlistData}
//                   />
//                 </Link>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500">No products match the selected filters.</p>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;






import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_BASE } from "../api";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import { useSelector } from "react-redux";
import { useGetWishlistQuery } from "../features/wishlistApi";
import { useGetProductsByCategorySlugQuery } from "../features/productApi";
import { FiFilter, FiX } from "react-icons/fi";

const CategoryPage = () => {
  const { slug } = useParams();

  const [filters, setFilters] = useState({
    availability: [],
    price: { min: 0, max: 100000 },
    categories: [],
  });

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const userId = useSelector((state) => state.auth.user?.id);
  const { data: wishlistData } = useGetWishlistQuery(userId, { skip: !userId });

  const { data: fetchedProducts, isLoading, isError } =
    useGetProductsByCategorySlugQuery(slug);

  useEffect(() => {
    if (Array.isArray(fetchedProducts)) {
      setAllProducts(fetchedProducts);
      setProducts(fetchedProducts);
    } else {
      setAllProducts([]);
      setProducts([]);
    }
  }, [fetchedProducts]);

  useEffect(() => {
    const filtered = allProducts.filter((p) => {
      const availabilityMatch =
        filters.availability.length === 0 ||
        (filters.availability.includes("in-stock") && p.stock > 0) ||
        (filters.availability.includes("out-of-stock") && p.stock === 0);

      const effectivePrice = p.sale_price ? Number(p.sale_price) : Number(p.price);
      const priceMatch =
        effectivePrice >= filters.price.min && effectivePrice <= filters.price.max;

      return availabilityMatch && priceMatch;
    });
    setProducts(filtered);
  }, [filters, allProducts]);

  const handleApplyFilters = () => setIsFilterOpen(false);

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
        <Link to="/" className="hover:underline">Home</Link> &gt;{" "}
        <span className="font-medium text-gray-700">{slug}</span>
      </nav>

      {/* Category Title */}
      <h1 className="text-3xl text-center font-bold text-gray-900 mb-8">
        {slug.charAt(0).toUpperCase() + slug.slice(1)} Products
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* --- Mobile Filter Button --- */}
        <div className="lg:hidden flex justify-end mb-4">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 rounded-md bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800"
          >
            <FiFilter size={18} />
            Filter
          </button>
        </div>

        {/* Desktop Filters */}
        <aside className="hidden lg:block lg:w-64 lg:flex-shrink-0">
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>
        </aside>

        {/* Products */}
        <main className="w-full lg:w-3/4">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`}>
                  <ProductCard
                    id={p.id}
                    imageUrl={p.image_url ? `${API_BASE}/${p.image_url}` : "/placeholder.png"}
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

      {/* --- Mobile Filter Drawer --- */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 ${isFilterOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-300 ${isFilterOpen ? "opacity-50" : "opacity-0"}`}
          onClick={() => setIsFilterOpen(false)}
        ></div>

        {/* Drawer */}
        <div
          className={`relative ml-auto w-80 bg-white h-full p-6 shadow-lg overflow-y-auto transform transition-transform duration-300 ease-in-out ${isFilterOpen ? "translate-x-0" : "translate-x-full"}`}
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
  );
};

export default CategoryPage;
