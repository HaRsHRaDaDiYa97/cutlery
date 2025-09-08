// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { AiOutlineHeart } from "react-icons/ai";
// import { useSelector } from "react-redux";
// import { useGetWishlistQuery } from "../features/wishlistApi";
// import ProductCard from "../components/ProductCard";
// import { API_BASE } from "../api";

// // Spinner Component
// const Spinner = () => (
//   <svg
//     className="animate-spin h-8 w-8 text-gray-600"
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//   >
//     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//   </svg>
// );

// const WishlistPage = () => {
//   const userId = useSelector((state) => state.auth.user?.id);

//   const { data: wishlistData = [], isLoading, isError } = useGetWishlistQuery(userId, {
//     skip: !userId,
//   });

//   const [products, setProducts] = useState([]);
//   const [loadingProducts, setLoadingProducts] = useState(false);

//   // ✅ Only fetch products when wishlistData changes meaningfully
//   useEffect(() => {
//     if (!wishlistData.length) {
//       setProducts([]);
//       return;
//     }

//     const fetchProducts = async () => {
//       setLoadingProducts(true);
//       try {
//         const responses = await Promise.all(
//           wishlistData.map(async (w) => {
//             try {
//               const res = await fetch(`${API_BASE}/get_product.php?id=${w.product_id}`);
//               if (!res.ok) return null;
//               return await res.json();
//             } catch {
//               return null;
//             }
//           })
//         );
//         // ✅ Only update state if array is different
//         setProducts((prev) => {
//           const filtered = responses.filter((p) => p);
//           const prevIds = prev.map((p) => p.id).join(",");
//           const newIds = filtered.map((p) => p.id).join(",");
//           if (prevIds !== newIds) return filtered;
//           return prev; // prevent unnecessary setState
//         });
//       } catch (err) {
//         console.error("Error fetching wishlist products:", err);
//       } finally {
//         setLoadingProducts(false);
//       }
//     };

//     fetchProducts();
//   }, [wishlistData]);

//   // --- State Display Component ---
//   const StateDisplay = ({ icon, title, message, children }) => (
//     <div className="flex min-h-[60vh] items-center justify-center bg-gray-50">
//       <div className="text-center p-8">
//         <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
//           {icon}
//         </div>
//         <h2 className="mt-4 text-xl font-semibold text-gray-800">{title}</h2>
//         <p className="mt-2 text-gray-600">{message}</p>
//         {children && <div className="mt-6">{children}</div>}
//       </div>
//     </div>
//   );

//   if (!userId)
//     return (
//     <StateDisplay
//   icon={<AiOutlineHeart className="h-6 w-6 text-gray-500" />}
//   title="View Your Wishlist"
//   message={
//     <div className="flex flex-col items-center gap-3">
//       <p>Please log in to see the items you've saved.</p>
//       <Link
//         to="/login"
//         className="rounded-md bg-black px-4 py-2 text-white font-semibold shadow-sm transition hover:bg-gray-800"
//       >
//         Login
//       </Link>
//     </div>
//   }
// />
//     );

//   if (isLoading || loadingProducts)
//     return (
//       <StateDisplay
//         icon={<Spinner />}
//         title="Loading Your Wishlist..."
//         message="We're fetching your favorite items."
//       />
//     );

//   if (isError)
//     return (
//       <StateDisplay
//         icon={<AiOutlineHeart className="h-6 w-6 text-red-500" />}
//         title="Something Went Wrong"
//         message="We couldn't load your wishlist. Please try again later."
//       />
//     );

//   if (!products.length)
//     return (
//       <StateDisplay
//         icon={<AiOutlineHeart className="h-12 w-12 text-gray-400" />}
//         title="Your wishlist is empty"
//         message="Looks like you haven't added anything yet."
//       >
//         <Link
//           to="/products"
//           className="mt-6 inline-block rounded-md bg-black px-6 py-3 text-white hover:bg-gray-800"
//         >
//           Browse Products
//         </Link>
//       </StateDisplay>
//     );

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6">
//         <div className="border-b border-gray-200 pb-4 mb-8">
//           <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">My Wishlist</h1>
//           <p className="mt-2 text-sm text-gray-500">{wishlistData.length} item(s) saved</p>
//         </div>

//         <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
//           {products.map((product) => {
//             if (!product) return null;
//             const primaryImage = product.images?.find((img) => img.is_primary === 1)?.image_url || product.images?.[0]?.image_url || "";
//             return (
//               <Link key={product.id} to={`/product/${product.id}`} className="group">
//                 <ProductCard
//                   id={product.id}
//                   imageUrl={primaryImage}
//                   category={product.category}
//                   title={product.name}
//                   price={product.price}
//                   salePrice={product.sale_price}
//                   wishlistData={wishlistData}
//                 />
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WishlistPage;






import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useGetWishlistQuery } from "../features/wishlistApi";
import ProductCard from "../components/ProductCard";
import { API_BASE } from "../api";

// Spinner Component
const Spinner = () => (
  <svg
    className="animate-spin h-8 w-8 text-gray-600"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 
         5.373 0 12h4zm2 5.291A7.962 
         7.962 0 014 12H0c0 3.042 
         1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// --- Reusable State Display Component ---
const StateDisplay = ({ icon, title, message, children }) => (
  <div className="flex min-h-[60vh] items-center justify-center bg-gray-50">
    <div className="text-center p-8">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
        {icon}
      </div>
      <h2 className="mt-4 text-xl font-semibold text-gray-800">{title}</h2>
      <div className="mt-2 text-gray-600">{message}</div>
      {children && <div className="mt-6">{children}</div>}
    </div>
  </div>
);

const WishlistPage = () => {
  const userId = useSelector((state) => state.auth.user?.id);

  const {
    data: wishlistData = [],
    isLoading,
    isError,
  } = useGetWishlistQuery(userId, { skip: !userId });

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

useEffect(() => {
  // If user logs out or no wishlist, clear once and stop
  if (!userId || !wishlistData?.length) {
    if (products.length > 0) setProducts([]); // only clear if not already empty
    return;
  }

   const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const responses = await Promise.all(
        wishlistData.map(async (w) => {
          try {
            const res = await fetch(`${API_BASE}/get_product.php?id=${w.product_id}`);
            if (!res.ok) return null;
            return await res.json();
          } catch {
            return null;
          }
        })
      );

      const filtered = responses.filter((p) => p);

      setProducts((prev) => {
        const prevIds = prev.map((p) => p.id).join(",");
        const newIds = filtered.map((p) => p.id).join(",");
        return prevIds !== newIds ? filtered : prev;
      });
    } catch (err) {
      console.error("Error fetching wishlist products:", err);
    } finally {
      setLoadingProducts(false);
    }
  };

  fetchProducts();
}, [wishlistData, userId]);

  // --- UI States ---
  if (!userId)
    return (
      <StateDisplay
        icon={<AiOutlineHeart className="h-6 w-6 text-gray-500" />}
        title="View Your Wishlist"
        message="Please log in to see the items you've saved."
      >
        <Link
          to="/login"
          className="rounded-md bg-black px-4 py-2 text-white font-semibold shadow-sm transition hover:bg-gray-800"
        >
          Login
        </Link>
      </StateDisplay>
    );

  if (isLoading || loadingProducts)
    return (
      <StateDisplay
        icon={<Spinner />}
        title="Loading Your Wishlist..."
        message="We're fetching your favorite items."
      />
    );

  if (isError)
    return (
      <StateDisplay
        icon={<AiOutlineHeart className="h-6 w-6 text-red-500" />}
        title="Something Went Wrong"
        message="We couldn't load your wishlist. Please try again later."
      />
    );

  if (!products.length)
    return (
      <StateDisplay
        icon={<AiOutlineHeart className="h-12 w-12 text-gray-400" />}
        title="Your wishlist is empty"
        message="Looks like you haven't added anything yet."
      >
        <Link
          to="/products"
          className="mt-6 inline-block rounded-md bg-black px-6 py-3 text-white hover:bg-gray-800"
        >
          Browse Products
        </Link>
      </StateDisplay>
    );

  // --- Render Products ---
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="border-b border-gray-200 pb-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            My Wishlist
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {wishlistData.length} item(s) saved
          </p>
        </div>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => {
            if (!product) return null;

            const primaryImage =
              product.images?.find((img) => img.is_primary === 1)?.image_url ||
              product.images?.[0]?.image_url ||
              "";

            return (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group"
              >
                <ProductCard
                  id={product.id}
                  imageUrl={primaryImage}
                  category={product.category}
                  title={product.name}
                  price={product.price}
                  salePrice={product.sale_price}
                  wishlistData={wishlistData}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
