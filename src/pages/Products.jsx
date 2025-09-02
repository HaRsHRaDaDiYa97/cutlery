
// import React, { useEffect, useState } from "react";
// import { API_BASE } from "../api";
// import { Link } from "react-router-dom";
// import ProductCard from "../components/ProductCard";
// import FilterSidebar from "../components/FilterSidebar";
// import { useGetWishlistQuery } from "../features/wishlistApi";
// import { useSelector } from "react-redux";

// export default function Products() {
//   const [allProducts, setAllProducts] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState(""); // ✅ search state
//   const [filters, setFilters] = useState({
//     availability: [],
//     price: { min: 0, max: 100000 },
//     categories: [], // categories are strings
//   });

//   const userId = useSelector((state) => state.auth.user?.id);

//   const { data: wishlistData } = useGetWishlistQuery(userId, {
//     skip: !userId, // skip API call if not logged in
//   });

//   // Fetch all products from backend
//   useEffect(() => {
//     fetch(`${API_BASE}/get_products.php`)
//       .then((r) => r.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setAllProducts(data);
//           setProducts(data);
//         } else {
//           setAllProducts([]);
//           setProducts([]);
//         }
//       })
//       .catch((err) => console.error("Fetch error:", err));
//   }, []);

//   // Apply filters and search whenever filters, searchQuery, or allProducts change
//   useEffect(() => {
//     const filtered = allProducts.filter((p) => {
//       // Availability filter
//       const availabilityMatch =
//         filters.availability.length === 0 ||
//         (filters.availability.includes("in-stock") && p.stock > 0) ||
//         (filters.availability.includes("out-of-stock") && p.stock === 0);

//       // Price filter
//       const effectivePrice = p.sale_price ? Number(p.sale_price) : Number(p.price);
//       const priceMatch =
//         effectivePrice >= filters.price.min &&
//         effectivePrice <= filters.price.max;

//       // Category filter
//       const categoryMatch =
//         filters.categories.length === 0 || filters.categories.includes(p.category);

//       // Search filter (name or description)
//       const searchMatch =
//         searchQuery.trim() === "" ||
//         p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));

//       return availabilityMatch && priceMatch && categoryMatch && searchMatch;
//     });

//     setProducts(filtered);
//   }, [filters, allProducts, searchQuery]);

//   return (
//     <div className="min-h-screen container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Breadcrumbs */}
//       <nav className="text-sm text-gray-500 mb-4">
//         <Link to="/" className="hover:underline">
//           Home
//         </Link>{" "}
//         &gt;{" "}
//         <span className="font-medium text-gray-700">Products</span>
//       </nav>

//       <h1 className="text-3xl text-center font-bold text-gray-900 mb-6">Our Products</h1>

//       {/* Search Bar */}
//       <div className="mb-6 flex justify-center">
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="border p-2 rounded-md w-full max-w-md"
//         />
//       </div>

//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Left Sidebar */}
//         <FilterSidebar filters={filters} setFilters={setFilters} />

//         {/* Right Content */}
//         <main className="w-full lg:w-3/4">
//           {Array.isArray(products) && products.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {products.map((p) => (
//                 <Link key={p.id} to={`/product/${p.id}`}>
//                   <ProductCard
//                     id={p.id}
//                     imageUrl={p.image}
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
//             <p className="text-gray-500">No products found</p>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }









// import React, { useEffect, useState } from "react";
// import { API_BASE } from "../api";
// import { Link } from "react-router-dom";
// import ProductCard from "../components/ProductCard";
// import FilterSidebar from "../components/FilterSidebar";
// import { useGetWishlistQuery } from "../features/wishlistApi";
// import { useSelector } from "react-redux";
// import { FiChevronRight, FiSearch, FiInbox } from "react-icons/fi";

// export default function Products() {
//   // --- All your existing logic remains unchanged ---
//   const [allProducts, setAllProducts] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filters, setFilters] = useState({
//     availability: [],
//     price: { min: 0, max: 100000 },
//     categories: [],
//   });
//   const userId = useSelector((state) => state.auth.user?.id);
//   const { data: wishlistData } = useGetWishlistQuery(userId, {
//     skip: !userId,
//   });

//   useEffect(() => {
//     fetch(`${API_BASE}/get_products.php`)
//       .then((r) => r.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setAllProducts(data);
//           setProducts(data);
//         } else {
//           setAllProducts([]);
//           setProducts([]);
//         }
//       })
//       .catch((err) => console.error("Fetch error:", err));
//   }, []);

//   useEffect(() => {
//     const filtered = allProducts.filter((p) => {
//       const availabilityMatch =
//         filters.availability.length === 0 ||
//         (filters.availability.includes("in-stock") && p.stock > 0) ||
//         (filters.availability.includes("out-of-stock") && p.stock === 0);
//       const effectivePrice = p.sale_price ? Number(p.sale_price) : Number(p.price);
//       const priceMatch =
//         effectivePrice >= filters.price.min && effectivePrice <= filters.price.max;
//       const categoryMatch =
//         filters.categories.length === 0 || filters.categories.includes(p.category);
//       const searchMatch =
//         searchQuery.trim() === "" ||
//         p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
//       return availabilityMatch && priceMatch && categoryMatch && searchMatch;
//     });
//     setProducts(filtered);
//   }, [filters, allProducts, searchQuery]);
//   // --- End of logic section ---

//   return (
//     <div className="bg-white min-h-screen">
//       <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 ">
//         {/* Page Header */}
//         <div className="border-b border-gray-200 pb-6 mb-8">
//           {/* Breadcrumbs */}
//           <nav className="flex items-center text-sm text-gray-500">
//             <Link to="/" className="hover:text-gray-700">Home</Link>
//             <FiChevronRight className="mx-2 h-4 w-4" />
//             <span className="font-medium text-gray-800">Products</span>
//           </nav>
//           <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">
//             All Products
//           </h1>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-x-8 gap-y-10">
//           {/* Left Sidebar (Filters) */}
//           <aside className="lg:w-64 lg:flex-shrink-0">
//             {/* --- REDESIGNED SEARCH BAR --- */}
//             <div className="mb-6 relative">
//               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                 <FiSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
//               </div>
//               <input
//                 type="search"
//                 name="search"
//                 id="search"
//                 placeholder="Search products..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="block w-full rounded-md border-gray-300 bg-gray-50 py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-black focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
//               />
//             </div>
//             <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
//               <FilterSidebar filters={filters} setFilters={setFilters} />
//             </div>
//           </aside>

//           {/* Right Content (Product Grid) */}
//           <main className="flex-1">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-medium text-gray-900">
//                 Showing {products.length} {products.length === 1 ? 'Result' : 'Results'}
//               </h2>
//               {/* Future-proofing: A sort dropdown could go here */}
//             </div>

//             {Array.isArray(products) && products.length > 0 ? (
//               <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
//                 {products.map((p) => {
//                   // Find the primary image or fallback to the first one
//                   const primaryImage = p.images?.find(img => img.is_primary)?.image_url || p.images?.[0]?.image_url || p.image;

//                   return (
//                     <Link key={p.id} to={`/product/${p.id}`}>
//                       <ProductCard
//                         id={p.id}
//                         imageUrl={primaryImage}
//                         category={p.category}
//                         title={p.name}
//                         price={p.price}
//                         salePrice={p.sale_price}
//                         wishlistData={wishlistData}
//                       />
//                     </Link>
//                   )
//                 })}
//               </div>
//             ) : (
//               // --- REDESIGNED EMPTY STATE ---
//               <div className="flex flex-col items-center justify-center text-center py-20 px-6 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200">
//                 <FiInbox
//                   size={48}
//                   className="mx-auto text-gray-400"
//                   aria-hidden="true"
//                 />
//                 <h2 className="mt-4 text-xl font-semibold text-gray-900">
//                   No Products Found
//                 </h2>
//                 <p className="mt-2 text-base text-gray-600">
//                   Try adjusting your search or filter criteria to find what you're looking for.
//                 </p>
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }









import React, { useEffect, useState } from "react";
import { API_BASE } from "../api";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import { useGetWishlistQuery } from "../features/wishlistApi";
import { useSelector } from "react-redux";
import { FiChevronRight, FiSearch, FiInbox, FiFilter, FiX } from "react-icons/fi";

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    availability: [],
    price: { min: 0, max: 100000 },
    categories: [],
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Mobile filter drawer state

  const userId = useSelector((state) => state.auth.user?.id);
  const { data: wishlistData } = useGetWishlistQuery(userId, {
    skip: !userId,
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

  useEffect(() => {
    const filtered = allProducts.filter((p) => {
      const availabilityMatch =
        filters.availability.length === 0 ||
        (filters.availability.includes("in-stock") && p.stock > 0) ||
        (filters.availability.includes("out-of-stock") && p.stock === 0);

      const effectivePrice = p.sale_price ? Number(p.sale_price) : Number(p.price);
      const priceMatch =
        effectivePrice >= filters.price.min && effectivePrice <= filters.price.max;

      const categoryMatch =
        filters.categories.length === 0 || filters.categories.includes(p.category);

      const searchMatch =
        searchQuery.trim() === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));

      return availabilityMatch && priceMatch && categoryMatch && searchMatch;
    });
    setProducts(filtered);
  }, [filters, allProducts, searchQuery]);

  // Handle Apply button in mobile filter drawer
  const handleApplyFilters = () => {
    setIsFilterOpen(false);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 ">
        {/* Page Header */}
        <div className="border-b border-gray-200 pb-6 mb-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-700">Home</Link>
            <FiChevronRight className="mx-2 h-4 w-4" />
            <span className="font-medium text-gray-800">Products</span>
          </nav>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">
            All Products
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-x-8 gap-y-10">
          {/* Left Sidebar (Filters) */}
          <aside className="lg:w-64 lg:flex-shrink-0">
            {/* --- Mobile Filter Button --- */}
            <div className="lg:hidden mb-4 flex justify-end">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-2 rounded-md bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800"
              >
                <FiFilter size={18} />
                Filter
              </button>
            </div>

            {/* --- Search Bar --- */}
            <div className="mb-6 relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FiSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-md border-gray-300 bg-gray-50 py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-black focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:block p-6 bg-gray-50 rounded-lg border border-gray-200">
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </div>
          </aside>

          {/* Right Content (Product Grid) */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                Showing {products.length} {products.length === 1 ? 'Result' : 'Results'}
              </h2>
            </div>

            {Array.isArray(products) && products.length > 0 ? (
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                {products.map((p) => {
                  const primaryImage = p.images?.find(img => img.is_primary)?.image_url || p.images?.[0]?.image_url || p.image;
                  return (
                    <Link key={p.id} to={`/product/${p.id}`}>
                      <ProductCard
                        id={p.id}
                        imageUrl={primaryImage}
                        category={p.category}
                        title={p.name}
                        price={p.price}
                        salePrice={p.sale_price}
                        wishlistData={wishlistData}
                      />
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-20 px-6 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200">
                <FiInbox size={48} className="mx-auto text-gray-400" aria-hidden="true" />
                <h2 className="mt-4 text-xl font-semibold text-gray-900">No Products Found</h2>
                <p className="mt-2 text-base text-gray-600">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

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
}
