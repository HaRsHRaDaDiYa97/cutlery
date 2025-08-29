// src/components/ProductCard.js

import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";

const ProductCard = ({ imageUrl, category, title, price, salePrice }) => {
  const [isWished, setIsWished] = useState(false);

  // ✅ Normalize prices to numbers
  const numericPrice = Number(price);
  const numericSalePrice = salePrice ? Number(salePrice) : null;

  // ✅ Check if product is on sale
  const onSale =
    numericSalePrice !== null && numericSalePrice < numericPrice;

  // ✅ Calculate discount percentage
  const discountPercent = onSale
    ? Math.round(((numericPrice - numericSalePrice) / numericPrice) * 100)
    : 0;

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWished(!isWished);
    console.log("Wishlist toggled!");
  };

  return (
    <div className="group relative block overflow-hidden rounded-lg border border-gray-200/80 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        {/* Sale Badge */}
        {onSale && (
          <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            SALE
          </div>
        )}

        {/* Wishlist Button - Always Visible */}
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

        {/* Product Image */}
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-56 object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-gray-500 mb-1">{category}</p>

        {/* Title */}
        <h3
          className="text-base font-semibold text-gray-800 group-hover:text-black truncate"
          title={title}
        >
          {title}
        </h3>

        {/* Pricing */}
        <div className="mt-2 flex items-baseline gap-2">
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
