// // src/components/ProductCard.js
// import React, { useState } from "react";
// import { FiHeart } from "react-icons/fi";
// import { useSelector } from "react-redux";
// import {
//   useAddToWishlistMutation,
//   useRemoveFromWishlistMutation,
// } from "../features/wishlistApi";
// import { toast } from "react-toastify";

// const ProductCard = ({ id, imageUrl, category, title, price, salePrice }) => {
//   const [isWished, setIsWished] = useState(false);

//   const userId = useSelector((state) => state.auth.user?.id); // adjust if your store shape differs
//   const [addToWishlist] = useAddToWishlistMutation();
//   const [removeFromWishlist] = useRemoveFromWishlistMutation();

//   const numericPrice = Number(price);
//   const numericSalePrice = salePrice ? Number(salePrice) : null;
//   const onSale = numericSalePrice !== null && numericSalePrice < numericPrice;
//   const discountPercent = onSale
//     ? Math.round(((numericPrice - numericSalePrice) / numericPrice) * 100)
//     : 0;

//   const handleWishlistClick = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (!userId) {
//       toast.error("Please login to use wishlist");
//       return;
//     }

//     if (!id) {
//       console.error("❌ Missing product id:", { id, title });
//       return;
//     }

//     try {
//       if (!isWished) {
//         await addToWishlist({ user_id: userId, product_id: id }).unwrap();
//         toast.success("Added to wishlist ❤️");
//       } else {
//         await removeFromWishlist({ user_id: userId, product_id: id }).unwrap();
//         toast("Removed from wishlist", { icon: "💔" });
//       }
//       setIsWished(!isWished);
//     } catch (err) {
//       console.error("Wishlist API error:", err);
//       toast.error("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="group relative block overflow-hidden rounded-2xl border border-gray-200/70 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white">
//       <div className="relative">
//         {/* Sale Badge */}
//         {onSale && (
//           <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow">
//             {discountPercent}% OFF
//           </div>
//         )}

//         {/* Wishlist Button */}
//         <button
//           onClick={handleWishlistClick}
//           className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full text-gray-700 shadow hover:bg-gray-100 transition"
//           aria-label="Add to Wishlist"
//         >
//           <FiHeart
//             className={`w-5 h-5 transition-colors ${
//               isWished ? "fill-red-500 stroke-red-500" : "stroke-gray-900"
//             }`}
//           />
//         </button>

//         {/* Product Image */}
//         <img
//           src={imageUrl}
//           alt={title}
//           className="w-full h-56 object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105"
//         />
//       </div>

//       <div className="p-4">
//         {/* Category */}
//         <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
//           {category}
//         </p>

//         {/* Title */}
//         <h3
//           className="text-base font-semibold text-gray-800 group-hover:text-black truncate"
//           title={title}
//         >
//           {title}
//         </h3>

//         {/* Pricing */}
//         <div className="mt-2 flex items-baseline gap-2">
//           <span
//             className={`text-lg font-bold ${
//               onSale ? "text-red-600" : "text-gray-900"
//             }`}
//           >
//             ₹{onSale ? numericSalePrice.toFixed(2) : numericPrice.toFixed(2)}
//           </span>

//           {onSale && (
//             <>
//               <span className="text-sm text-gray-500 line-through">
//                 ₹{numericPrice.toFixed(2)}
//               </span>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;







// src/components/ProductCard.js
import React, { useState } from "react";
import { FiHeart, FiEye, FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "../features/wishlistApi";
import { toast } from "react-toastify";

const ProductCard = ({ id, imageUrl, category, title, price, salePrice }) => {
  const [isWished, setIsWished] = useState(false);

  const userId = useSelector((state) => state.auth.user?.id);
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const numericPrice = Number(price);
  const numericSalePrice = salePrice ? Number(salePrice) : null;
  const onSale = numericSalePrice !== null && numericSalePrice < numericPrice;
  const discountPercent = onSale
    ? Math.round(((numericPrice - numericSalePrice) / numericPrice) * 100)
    : 0;

  const handleWishlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) {
      toast.error("Please login to use wishlist");
      return;
    }

    if (!id) {
      console.error("❌ Missing product id:", { id, title });
      return;
    }

    try {
      if (!isWished) {
        await addToWishlist({ user_id: userId, product_id: id }).unwrap();
        toast.success("Added to wishlist ❤️");
      } else {
        await removeFromWishlist({ user_id: userId, product_id: id }).unwrap();
        toast("Removed from wishlist", { icon: "💔" });
      }
      setIsWished(!isWished);
    } catch (err) {
      console.error("Wishlist API error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="group relative block overflow-hidden rounded-2xl border border-gray-200/70 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white">
      <div className="relative">
        {/* ✅ Sale Badge */}
        {onSale && (
          <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow">
            {discountPercent}% OFF
          </div>
        )}

        {/* ✅ Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full text-gray-700 shadow hover:bg-gray-100 transition"
          aria-label="Add to Wishlist"
        >
          <FiHeart
            className={`w-5 h-5 transition-colors ${
              isWished ? "fill-red-500 stroke-red-500" : "stroke-gray-900"
            }`}
          />
        </button>

        {/* ✅ Product Image */}
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-64 object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105"
        />

        {/* ✅ Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
          <button className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition">
            <FiEye className="w-5 h-5 text-gray-700" />
          </button>
          <button className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition">
            <FiShoppingCart className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* ✅ Product Info */}
      <div className="p-4">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
          {category}
        </p>

        <h3
          className="text-base font-semibold text-gray-800 group-hover:text-black truncate"
          title={title}
        >
          {title}
        </h3>

        {/* ✅ Pricing */}
        <div className="mt-2 flex items-center gap-2">
          <span
            className={`text-lg font-bold ${
              onSale ? "text-red-600" : "text-gray-900"
            }`}
          >
            ₹{onSale ? numericSalePrice.toFixed(2) : numericPrice.toFixed(2)}
          </span>

          {onSale && (
            <>
              <span className="text-sm text-gray-500 line-through">
                ₹{numericPrice.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded-md">
                Save {discountPercent}%
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
