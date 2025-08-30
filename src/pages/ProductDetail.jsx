import { useEffect, useState } from "react";
import { API_BASE } from "../api";
import { useParams, Link as RouterLink } from "react-router-dom";
import { FiHeart, FiPlus, FiMinus } from "react-icons/fi";
import { toast } from "react-toastify";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWished, setIsWished] = useState(false);

  const userId = 1; // TODO: Replace with logged-in user ID

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_BASE}/get_product.php?id=${id}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data);
        setActiveImageIndex(0);
      })
      .catch(() => toast.error("❌ Failed to load product"));
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="text-xl font-medium">Loading...</div>
      </div>
    );
  }

  const onSale =
    product.sale_price && parseFloat(product.sale_price) < parseFloat(product.price);

  let discountPercent = 0;
  if (onSale) {
    discountPercent = Math.round(
      ((product.price - product.sale_price) / product.price) * 100
    );
  }

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => {
      const newQuantity = prev + amount;
      if (newQuantity < 1) return 1;
      if (newQuantity > product.stock) return product.stock;
      return newQuantity;
    });
  };

  // 👉 Add to Cart
  const handleAddToCart = () => {
    fetch(`${API_BASE}/add_to_cart.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        product_id: product.id,
        quantity: quantity,
      }),
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.success) {
          toast.success("✅ Product added to cart!");
        } else {
          toast.error("❌ Failed to add to cart");
        }
      })
      .catch(() => toast.error("❌ Error adding to cart"));
  };

  // 👉 Add to Wishlist
  const handleWishlist = () => {
    fetch(`${API_BASE}/add_to_wishlist.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        product_id: product.id,
      }),
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.success) {
          setIsWished(true);
          toast.success("❤️ Added to wishlist");
        } else {
          toast.error("❌ Failed to add to wishlist");
        }
      })
      .catch(() => toast.error("❌ Error adding to wishlist"));
  };

  return (
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
        <div className="flex flex-col md:flex-row gap-6">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-3 md:w-24 order-2 md:order-1">
            {product.images?.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImageIndex(i)}
                className={`border rounded-lg overflow-hidden transition-all duration-200 ${
                  i === activeImageIndex ? "border-gray-900  ring-gray-900" : "border-gray-200"
                }`}
              >
                <img
                  src={img.image_url}
                  alt={`Thumbnail ${i}`}
                  className="w-full h-22 object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 relative order-1 md:order-2">
            {onSale && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                SALE
              </div>
            )}
            <img
              src={product.images?.[activeImageIndex]?.image_url}
              alt={product.name}
              className="w-full h-[400px] md:h-[500px] lg:h-[550px] object-cover rounded-lg border"
            />
          </div>
        </div>

        {/* Right: Product Info */}
        <div>
          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{product.name}</h1>

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
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gray-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors duration-300"
              >
                Add to Cart
              </button>
              <button
                onClick={handleWishlist}
                className="p-3 border rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-300"
              >
                <FiHeart className={`w-6 h-6 ${isWished ? "fill-red-500 stroke-red-500" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
