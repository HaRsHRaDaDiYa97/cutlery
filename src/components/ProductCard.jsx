

import React, { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { useSelector } from "react-redux";
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "../features/wishlistApi";
import { toast } from "react-toastify";

const ProductCard = ({ id, imageUrl, category, title, price, salePrice, wishlistData }) => {
  const userId = useSelector((state) => state.auth.user?.id);
  const [isWished, setIsWished] = useState(false);

  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  // ✅ check if product is already in wishlistData
  useEffect(() => {
    if (wishlistData && Array.isArray(wishlistData)) {
      const found = wishlistData.some((item) => Number(item.product_id) === Number(id));
      setIsWished(found);
    }
  }, [wishlistData, id]);

  // ✅ Normalize prices
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
        setIsWished(true); // update UI instantly
      } else {
        await removeFromWishlist({ user_id: userId, product_id: id }).unwrap();
        toast("Removed from wishlist", { icon: "💔" });
        setIsWished(false);
      }
    } catch (err) {
      console.error("Wishlist API error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative hover:shadow-lg transition">
      {onSale && (
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
          SALE
        </span>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistClick}
        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
        aria-label="Add to Wishlist"
      >
        <FiHeart
          className={`w-5 h-5 transition-colors ${
            isWished ? "fill-red-500 stroke-red-500" : "stroke-gray-900"
          }`}
        />
      </button>

      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />

      <div className="p-4">
        <p className="text-gray-500 text-xs mb-1">{category}</p>
        <h3 className="text-gray-800 font-semibold text-sm truncate" title={title}>
          {title}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-red-600 font-bold text-lg">
            ₹{onSale ? numericSalePrice.toFixed(2) : numericPrice.toFixed(2)}
          </span>

          {onSale && (
            <>
              <span className="text-gray-400 line-through text-sm">
                ₹{numericPrice.toFixed(2)}
              </span>
              <span className="text-green-600 text-xs font-bold bg-green-100 px-2 py-0.5 rounded">
                {discountPercent}% OFF
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
