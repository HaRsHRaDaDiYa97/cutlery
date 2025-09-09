
import { useEffect, useState } from "react";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import { FiHeart, FiPlus, FiMinus } from "react-icons/fi";
import { toast } from "react-toastify";
import { useGetProductQuery } from "../features/productApi";
import { useAddToWishlistMutation, useGetWishlistQuery, useRemoveFromWishlistMutation } from "../features/wishlistApi";
import { useSelector } from "react-redux";
import { useAddToCartMutation, useGetCartQuery } from "../features/cartApi";
import Loader from "../components/Loader";
import { lazy, Suspense } from "react";
import ProductHelmet from "../seo_helmet/ProductHelmet";

const ReviewSection = lazy(() => import("../components/ReviewSection"));


export default function ProductDetail() {


  const [isInCart, setIsInCart] = useState(false);

  const { id } = useParams();
  const userId = useSelector((state) => state.auth.user?.id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWished, setIsWished] = useState(false);

  // ✅ API hooks
  const { data: product, isLoading, isError } = useGetProductQuery(id);
  const { data: cartData } = useGetCartQuery(userId, { skip: !userId });
  const { data: wishlistData } = useGetWishlistQuery(userId, { skip: !userId });

  const [addToCart] = useAddToCartMutation();
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();


const navigate = useNavigate();

  useEffect(() => {
    if (!product || !Array.isArray(cartData?.items)) return;

    const found = cartData.items.some(
      (item) => Number(item.product_id) === Number(product.id)
    );
    setIsInCart(found);
  }, [product, cartData]);


  // ✅ Sync isWished when wishlistData or product changes
  useEffect(() => {
    if (!product || !Array.isArray(wishlistData)) return;
    const found = wishlistData.some(
      (item) => Number(item.product_id) === Number(product.id)
    );
    setIsWished(found);
  }, [wishlistData, product]);




  // ✅ Scroll to top on product change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // ✅ Handlers
  const handleAddToCart = async () => {
    if (!userId) {
      toast.error("Please login to add items to cart");
      navigate('/login');
      return;
    }
    try {
      const res = await addToCart({
        user_id: userId,
        product_id: product.id,
        quantity,
      }).unwrap();
      toast.success(res.message || "✅ Product added to cart!");
      setIsInCart(true);
    } catch (err) {
      console.error("Add to Cart API error:", err);
      toast.error("❌ Failed to add to cart");
    }
  };

  const handleWishlist = async () => {
    if (!userId) {
      toast.error("Please login to use wishlist");
      navigate('/login');
      return;
    }
    try {
      if (!isWished) {
        await addToWishlist({ user_id: userId, product_id: product.id }).unwrap();
        setIsWished(true);
        toast.success("❤️ Added to wishlist");
      } else {
        await removeFromWishlist({ user_id: userId, product_id: product.id }).unwrap();
        setIsWished(false);
        toast("💔 Removed from wishlist");
      }
    } catch (err) {
      console.error("Wishlist API error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => {
      const newQty = prev + amount;
      if (newQty < 1) return 1;
      if (newQty > product.stock) return product.stock;
      return newQty;
    });
  };

  const handleBuyNow = () => {
    window.location.href = "/cart"; // or navigate("/checkout") if using react-router
  };

  // ✅ UI states
  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError) return <div className="text-center text-red-600">Failed to load product</div>;
  if (!product) return null;

  const onSale =
    product.sale_price && parseFloat(product.sale_price) < parseFloat(product.price);
  const discountPercent = onSale
    ? Math.round(((product.price - product.sale_price) / product.price) * 100)
    : 0;

  return (

<>


  {/* SEO Helmet */}
    <ProductHelmet product={product} />

    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-6">
        <RouterLink to="/" className="hover:underline">Home</RouterLink> &gt;
        <RouterLink
          to={`/category/${product.category?.toLowerCase()}`}
          className="hover:underline"
        >
          {" "}{product.category}{" "}
        </RouterLink> &gt;
        <span className="font-medium text-gray-700">{product.name}</span>
      </nav>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Product Images */}
        <div className="flex flex-col md:flex-row gap-6 lg:sticky lg:top-20 lg:max-h-[80vh] lg:overflow-y-auto">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-3 md:w-24 order-2 md:order-1">
            {product.images?.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImageIndex(i)}
                className={`border rounded-lg overflow-hidden transition-all duration-200 ${i === activeImageIndex ? "border-gray-900  ring-gray-900" : "border-gray-200"
                  }`}
              >
                <img
                  src={img.image_url}
                  alt={`Thumbnail ${i}`}
                  loading="lazy"
                  className="w-full h-22 object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 order-1 md:order-2 relative  lg:sticky lg:top-20 lg:max-h-[80vh] lg:overflow-y-auto">

            {onSale && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                SALE
              </div>
            )}
            <img
              src={product.images?.[activeImageIndex]?.image_url}
              alt={product.name}
              loading="lazy"
              className="w-full h-[400px] md:h-[500px] lg:h-[550px] object-cover rounded-lg border"
            />
          </div>
        </div>

        {/* Right: Product Info */}
        <div>
          {/* Title */}
          <h1 className="text-3xl capitalize lg:text-4xl font-bold text-gray-900">{product.name}</h1>

          {/* Price */}
          <div className="mt-4 flex items-center gap-3">
            <span className={`text-3xl font-bold ${onSale ? "text-red-600" : "text-gray-900"}`}>
              ₹{onSale ? Number(product.sale_price).toFixed(2) : Number(product.price).toFixed(2)}
            </span>
            {onSale && (
              <>
                <span className="text-lg text-gray-500 line-through">
                  ₹{Number(product.price).toFixed(2)}
                </span>
                <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-md">
                  {discountPercent}% OFF
                </span>
              </>
            )}
          </div>

          {/* Stock */}
          <div className="mt-3 text-sm font-semibold">
            {product.stock > 0 ? (
              <span className="text-green-600">In Stock ({product.stock} available)</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </div>

          {/* Description */}
          <div className="mt-6 border-t pt-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600 whitespace-pre-line leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-8 space-y-4">
            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <label className="font-semibold">Quantity:</label>
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  <FiMinus />
                </button>
                <span className="px-4 py-1.5 font-semibold">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4">
              {product.stock > 0 ? (
                !isInCart ? (
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gray-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors duration-300"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-500 transition-colors duration-300"
                  >
                    Buy Now
                  </button>
                )
              ) : (
                <button
                  disabled
                  className="flex-1 bg-gray-400 text-white font-bold py-3 px-6 rounded-lg cursor-not-allowed"
                >
                  Out of Stock
                </button>
              )}

              <button
                onClick={handleWishlist}
                className="p-3 border rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-300"
              >
                <FiHeart
                  className={`w-6 h-6 ${isWished ? "fill-red-500 stroke-red-500" : ""}`}
                />
              </button>

            </div>
          </div>
        </div>
      </div>



      {/* 🔹 Review Section */}
      <div className="mt-12">
        <Suspense fallback={<Loader />}>
          <ReviewSection productId={product.id} />
        </Suspense>
      </div>


    </div>


</>

  );
}
