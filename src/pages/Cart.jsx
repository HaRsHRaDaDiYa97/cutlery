// // src/pages/Cart.jsx
// import React from "react";
// import { useSelector } from "react-redux";
// import {
//     useGetCartQuery,
//     useUpdateCartItemMutation,
//     useRemoveFromCartMutation,
// } from "../features/cartApi";
// import { FiTrash2 } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import { API_BASE } from "../api";

// const Cart = () => {
//     const userId = useSelector((state) => state.auth.user?.id);

//     const { data: cartData, isLoading } = useGetCartQuery(userId, {
//         skip: !userId,
//     });
//     const [updateCartItem] = useUpdateCartItemMutation();
//     const [removeFromCart] = useRemoveFromCartMutation();





//     if (!userId) {
//         return (
//             <div className="container mx-auto p-6 text-center">
//                 <p className="text-lg">Please <Link to="/login" className="text-blue-600 underline">log in</Link> to view your cart.</p>
//             </div>
//         );
//     }

//     if (isLoading) {
//         return (
//             <div className="container mx-auto p-6 text-center">
//                 <p className="text-lg">Loading your cart...</p>
//             </div>
//         );
//     }

//     const handleQuantityChange = (item, newQty) => {
//         if (newQty < 1) return;
//         updateCartItem({
//             user_id: userId,
//             product_id: item.product_id,
//             quantity: newQty,
//         });
//     };

//     const handleRemove = (item) => {
//         removeFromCart({ user_id: userId, cart_id: item.cart_id });
//     };

//     return (
//         <div className="min-h-screen container mx-auto p-4 md:p-8">
//             <h1 className="text-2xl md:text-3xl font-bold mb-6">Shopping Cart</h1>

//             {cartData?.items?.length === 0 ? (
//                 <div className="text-center py-10">
//                     <p className="text-gray-600 text-lg">Your cart is empty.</p>
//                     <Link
//                         to="/products"
//                         className="mt-4 inline-block bg-gray-900 text-white py-2 px-6 rounded-lg font-medium hover:bg-gray-700 transition"
//                     >
//                         Shop Now
//                     </Link>
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     {/* Cart Items */}
//                     <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-4 md:p-6">
//                         {cartData.items.map((item) => {
//                             const unitPrice =
//                                 item.sale_price && item.sale_price !== "0.00"
//                                     ? parseFloat(item.sale_price)
//                                     : parseFloat(item.price);
//                             const itemTotal = unitPrice * item.quantity;

//                             return (
//                                 <Link
//                                     key={item.cart_id}  // ✅ key moved here
//                                     to={`/product/${item.product_id}`}
//                                 >
//                                     <div
//                                         key={item.cart_id}
//                                         className="flex flex-col md:flex-row items-center gap-4 border-b py-4 last:border-0"
//                                     >
//                                         {/* Product Image */}
//                                         <img
//                                             src={`${API_BASE}/${item.image_url}`}
//                                             alt={item.name}
//                                             className="w-24 h-24 object-cover rounded-md"
//                                         />

//                                         {/* Details */}
//                                         <div className="flex-1 text-center md:text-left">
//                                             <h2 className="font-semibold text-lg">{item.name}</h2>
//                                             <p className="text-gray-500">
//                                                 ₹{unitPrice.toFixed(2)} x {item.quantity}
//                                             </p>
//                                             <p className="font-bold text-gray-800">
//                                                 ₹{itemTotal.toFixed(2)}
//                                             </p>
//                                         </div>

//                                         {/* Quantity Controls */}
//                                         <div className="flex items-center gap-2">
//                                             <button
//                                                 onClick={() =>
//                                                     handleQuantityChange(item, item.quantity - 1)
//                                                 }
//                                                 className="px-2 py-1 border rounded-md hover:bg-gray-100"
//                                             >
//                                                 -
//                                             </button>
//                                             <span className="px-3">{item.quantity}</span>
//                                             <button
//                                                 onClick={() =>
//                                                     handleQuantityChange(item, item.quantity + 1)
//                                                 }
//                                                 className="px-2 py-1 border rounded-md hover:bg-gray-100"
//                                             >
//                                                 +
//                                             </button>
//                                         </div>

//                                         {/* Remove Button */}
//                                         <button
//                                             onClick={() => handleRemove(item)}
//                                             className="text-red-500 hover:text-red-700 ml-4"
//                                         >
//                                             <FiTrash2 size={20} />
//                                         </button>
//                                     </div>
//                                 </Link>
//                             );
//                         })}
//                     </div>

//                     {/* Order Summary */}
//                     <div className="bg-white rounded-2xl shadow-md p-6">
//                         <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//                         <div className="flex justify-between mb-2">
//                             <span>Subtotal</span>
//                             <span>₹{cartData.subtotal.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-between mb-2">
//                             <span>Items</span>
//                             <span>{cartData.count}</span>
//                         </div>
//                         <div className="border-t pt-2 flex justify-between font-semibold text-lg">
//                             <span>Total</span>
//                             <span>₹{cartData.subtotal.toFixed(2)} {cartData.currency}</span>
//                         </div>

//                         <Link
//                             to="/checkout"
//                             className="mt-6 block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-500 transition"
//                         >
//                             Proceed to Checkout
//                         </Link>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Cart;









import React from "react";
import { useSelector } from "react-redux";
import {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
} from "../features/cartApi";
import { FiTrash2, FiShoppingCart, FiMinus, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { API_BASE } from "../api";

// A reusable spinner for loading states
const Spinner = () => (
    <svg className="animate-spin h-8 w-8 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

// A reusable component for displaying different page states (Login, Empty, Loading)
const StateDisplay = ({ icon, title, message, children }) => (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center p-8 bg-white rounded-lg shadow-sm max-w-md mx-auto">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            {icon}
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">{title}</h2>
          <p className="mt-2 text-gray-600">{message}</p>
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </div>
);


const Cart = () => {
    // --- All your existing logic remains unchanged ---
    const userId = useSelector((state) => state.auth.user?.id);

    const { data: cartData, isLoading } = useGetCartQuery(userId, {
        skip: !userId,
    });
    const [updateCartItem, { isLoading: isUpdating }] = useUpdateCartItemMutation();
    const [removeFromCart] = useRemoveFromCartMutation();

    const handleQuantityChange = (item, newQty) => {
        if (newQty < 1 || isUpdating) return;
        updateCartItem({
            user_id: userId,
            product_id: item.product_id,
            quantity: newQty,
        });
    };

    const handleRemove = (e, item) => {
        e.preventDefault(); // Prevent Link navigation when clicking the remove button
        removeFromCart({ user_id: userId, cart_id: item.cart_id });
    };
    // --- End of logic section ---

    // Render states: Not Logged In & Loading
    if (!userId) {
        return (
            <StateDisplay
                icon={<FiShoppingCart className="h-6 w-6 text-gray-500" />}
                title="Your Cart Awaits"
                message="Please log in to view and manage the items in your cart."
            >
                <Link to="/login" className="inline-block rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-gray-800 cursor-pointer">
                    Login
                </Link>
            </StateDisplay>
        );
    }

    if (isLoading) {
        return <StateDisplay icon={<Spinner />} title="Loading Cart" message="Please wait while we fetch your items." />;
    }

    // Render state: Empty Cart
    if (!cartData || cartData?.items?.length === 0) {
        return (
            <StateDisplay
                icon={<FiShoppingCart className="h-6 w-6 text-gray-500" />}
                title="Your cart is empty"
                message="Looks like you haven't added anything to your cart yet."
            >
                <Link to="/products" className="inline-block rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-gray-800 cursor-pointer">
                    Start Shopping
                </Link>
            </StateDisplay>
        );
    }

    return (
        <div className="bg-gray-100">
            <main className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
                <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    {/* Cart Items List */}
                    <section aria-labelledby="cart-heading" className="lg:col-span-7">
                        <h2 id="cart-heading" className="sr-only">Items in your shopping cart</h2>
                        <ul role="list" className="divide-y divide-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
                            {cartData.items.map((item) => {
                                const unitPrice = item.sale_price && item.sale_price !== "0.00" ? parseFloat(item.sale_price) : parseFloat(item.price);
                                return (
                                    <li key={item.cart_id} className="p-4 sm:p-6">
                                        <div className="flex items-center sm:items-start">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={`${API_BASE}/${item.image_url}`}
                                                    alt={item.name}
                                                    className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                                                />
                                            </div>
                                            <div className="ml-4 flex-1 flex flex-col justify-between">
                                                {/* Top Part: Title and Remove Button */}
                                                <div className="flex justify-between">
                                                    <div>
                                                        <h3 className="text-base font-medium text-gray-900">
                                                            <Link to={`/product/${item.product_id}`} className="hover:text-gray-700">
                                                                {item.name}
                                                            </Link>
                                                        </h3>
                                                        <p className="mt-1 text-sm text-gray-600">Unit Price: ₹{unitPrice.toFixed(2)}</p>
                                                    </div>
                                                    <button type="button" onClick={(e) => handleRemove(e, item)} className="p-2 -m-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                                                        <span className="sr-only">Remove</span>
                                                        <FiTrash2 className="h-5 w-5" aria-hidden="true" />
                                                    </button>
                                                </div>
                                                {/* Bottom Part: Quantity and Total Price */}
                                                <div className="mt-4 flex items-end justify-between">
                                                     {/* --- REDESIGNED QUANTITY STEPPER --- */}
                                                    <div className="flex items-center" style={{ opacity: isUpdating ? 0.5 : 1 }}>
                                                        <button type="button" onClick={() => handleQuantityChange(item, item.quantity - 1)} className="p-2 h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer focus:outline-none">
                                                            <FiMinus />
                                                        </button>
                                                        <span className="px-4 font-medium text-gray-900 select-none">{item.quantity}</span>
                                                        <button type="button" onClick={() => handleQuantityChange(item, item.quantity + 1)} className="p-2 h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer focus:outline-none">
                                                            <FiPlus />
                                                        </button>
                                                    </div>
                                                    <p className="text-base font-medium text-gray-900">
                                                        ₹{(unitPrice * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>

                    {/* Order Summary Section */}
                    <section aria-labelledby="summary-heading" className="sticky top-20 mt-16 rounded-lg bg-white shadow-sm lg:mt-0 lg:col-span-5 p-6">
                        <h2 id="summary-heading" className="text-lg font-bold text-gray-900">Order Summary</h2>
                        <dl className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Subtotal ({cartData.count} items)</dt>
                                <dd className="text-sm font-medium text-gray-900">₹{cartData.subtotal.toFixed(2)}</dd>
                            </div>
                            <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                                <dt className="text-base font-semibold text-gray-900">Order Total</dt>
                                <dd className="text-base font-semibold text-gray-900">₹{cartData.subtotal.toFixed(2)}</dd>
                            </div>
                        </dl>
                        <div className="mt-6">
                            <Link to="/checkout" className="w-full flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-gray-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
                                Proceed to Checkout
                            </Link>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Cart;