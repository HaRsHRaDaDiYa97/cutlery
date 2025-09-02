
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useGetWishlistQuery } from "../features/wishlistApi";
import ProductCard from "../components/ProductCard";
import { API_BASE } from "../api";

// A simple spinner component for loading states
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
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const WishlistPage = () => {
  // --- All your existing logic remains unchanged ---
  const userId = useSelector((state) => state.auth.user?.id);

  const {
    data: wishlistData = [],
    isLoading,
    isError,
  } = useGetWishlistQuery(userId, {
    skip: !userId,
  });

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!wishlistData.length) {
        setProducts([]); // Clear products if wishlist is empty
        return;
      }

      setLoadingProducts(true);
      try {
        const responses = await Promise.all(
          wishlistData.map((w) =>
            fetch(`${API_BASE}/get_product.php?id=${w.product_id}`).then(
              (res) => res.json()
            )
          )
        );
        setProducts(responses.filter(p => p)); // Filter out any null/error responses
      } catch (err) {
        console.error("Error fetching wishlist products:", err);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [wishlistData]);
  // --- End of logic section ---

  // Centered container for various states (Login, Loading, Error)
  const StateDisplay = ({ icon, title, message, children }) => (
    <div className="flex min-h-[60vh] items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
          {icon}
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-800">{title}</h2>
        <p className="mt-2 text-gray-600">{message}</p>
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );

  if (!userId) {
    return (
      <StateDisplay
        icon={<AiOutlineHeart className="h-6 w-6 text-gray-500" />}
        title="View Your Wishlist"
        message="Please log in to see the items you've saved."
      />
    );
  }

  if (isLoading || loadingProducts) {
    return (
      <StateDisplay
        icon={<Spinner />}
        title="Loading Your Wishlist..."
        message="We're fetching your favorite items."
      />
    );
  }

  if (isError) {
    return (
      <StateDisplay
        icon={<AiOutlineHeart className="h-6 w-6 text-red-500" />}
        title="Something Went Wrong"
        message="We couldn't load your wishlist. Please try again later."
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
        {/* Page Header */}
        <div className="border-b border-gray-200 pb-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            My Wishlist
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {wishlistData.length} item(s) saved
          </p>
        </div>

        {/* Empty State */}
        {wishlistData.length === 0 ? (
          <div className="text-center py-20 px-6 rounded-lg bg-gray-50">
            <AiOutlineHeart
              size={48}
              className="mx-auto text-gray-400"
              aria-hidden="true"
            />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Your wishlist is currently empty
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Looks like you haven't added anything yet. Let's find something
              you'll love!
            </p>
            <Link
              to="/products"
              className="mt-6 inline-block rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => {
              if (!product) return null; // Safety check for failed fetches

              const primaryImage =
                product.images?.find((img) => img.is_primary === 1)?.image_url ||
                product.images?.[0]?.image_url ||
                ""; // Default placeholder if needed

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
        )}
      </div>
    </div>
  );
};

export default WishlistPage;