import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useGetWishlistQuery } from "../features/wishlistApi";
import ProductCard from "../components/ProductCard";
import { API_BASE } from "../api";

const WishlistPage = () => {
  const userId = useSelector((state) => state.auth.user?.id);

  const { data: wishlistData = [], isLoading, isError } = useGetWishlistQuery(userId, {
    skip: !userId,
  });



  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // 🔹 Fetch products for wishlist
  useEffect(() => {
    const fetchProducts = async () => {
      if (!wishlistData.length) return;

      setLoadingProducts(true);
      try {
        const responses = await Promise.all(
          wishlistData.map((w) =>
            fetch(`${API_BASE}/get_product.php?id=${w.product_id}`).then((res) =>
              res.json()
            )
          )
        );
        setProducts(responses);
      } catch (err) {
        console.error("Error fetching wishlist products:", err);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [wishlistData]);




  // 🔹 User not logged in
  if (!userId) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <p className="text-lg text-gray-700">Please log in to view your wishlist.</p>
      </div>
    );
  }

  // 🔹 Loading states
  if (isLoading || loadingProducts) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <p className="text-gray-500">Loading your wishlist...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <p className="text-red-500">Failed to load wishlist. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto px-4 py-10">
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <AiOutlineHeart className="text-red-500" size={24} /> My Wishlist
        </h1>
        <p className="text-gray-600">{wishlistData.length} item(s)</p>
      </div>

      {/* Empty State */}
      {wishlistData.length === 0 ? (
        <div className="text-center py-20">
          <AiOutlineHeart size={50} className="mx-auto text-gray-400" />
          <p className="mt-4 text-lg text-gray-600">Your wishlist is empty.</p>
          <Link
            to="/products"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-2 text-white shadow hover:bg-blue-700 transition"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        /* Wishlist Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
  // get primary image (or first fallback)
  const primaryImage = product.images?.find(img => img.is_primary === 1)?.image_url 
                       || product.images?.[0]?.image_url 
                       || "";

  return (
    <Link key={product.id} to={`/product/${product.id}`}>
      <ProductCard
        id={product.id}
        imageUrl={primaryImage} // ✅ fixed
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
      )}
    </div>
  );
};

export default WishlistPage;



