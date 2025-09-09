
import React, { useState, useEffect } from "react";
import { FiHeart } from "react-icons/fi";
import { useSelector } from "react-redux";
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "../features/wishlistApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, imageUrl, category, title, price, salePrice, wishlistData }) => {
  // --- All your existing logic remains unchanged ---
  const userId = useSelector((state) => state.auth.user?.id);
  const [isWished, setIsWished] = useState(false);
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

const navigate = useNavigate();


  useEffect(() => {
    if (wishlistData && Array.isArray(wishlistData)) {
      const found = wishlistData.some((item) => Number(item.product_id) === Number(id));
      setIsWished(found);
    }
  }, [wishlistData, id]);

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
      navigate('/login');
      return;
    }
    if (!id) return;

    try {
      if (!isWished) {
        await addToWishlist({ user_id: Number(userId), product_id: Number(id) }).unwrap();
        toast.success("Added to wishlist ❤️");
        setIsWished(true);
      } else {
        await removeFromWishlist({ user_id: Number(userId), product_id: Number(id) }).unwrap();
        toast("Removed from wishlist", { icon: "💔" });
        setIsWished(false);
      }
    } catch (err) {
      console.error("Wishlist API error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };
  // --- End of logic section ---

  return (
    // Added 'group' class for better hover effects
    <div className="group bg-white rounded-lg shadow-md overflow-hidden relative hover:shadow-xl transition-shadow duration-300">
      
      {/* --- IMAGE CONTAINER: Changed to use aspect ratio for perfect responsiveness --- */}
      <div className="relative overflow-hidden aspect-square">
        <img 
          src={imageUrl} 
          alt={title} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        
        {/* Wishlist Button remains in its responsive position */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg opacity-80 group-hover:opacity-100 transition-opacity"
          aria-label="Add to Wishlist"
        >
          <FiHeart
            className={`w-5 h-5 transition-all ${
              isWished ? "fill-red-500 stroke-red-500" : "stroke-gray-900"
            }`}
          />
        </button>
        
        {/* Sale badge also remains perfectly positioned */}
        {onSale && (
            <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            -{discountPercent}% OFF
            </span>
        )}
      </div>

      {/* --- CONTENT SECTION: No changes needed here, it's already responsive --- */}
      <div className="p-4">
        <p className="text-gray-500 text-xs mb-1 uppercase tracking-wider">{category}</p>
        <h3 className="text-gray-900 font-semibold text-base truncate" title={title}>
          {title}
        </h3>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-black font-bold text-lg">
            ₹{onSale ? numericSalePrice.toFixed(2) : numericPrice.toFixed(2)}
          </span>

          {onSale && (
            <span className="text-gray-400 line-through text-sm">
              ₹{numericPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;