import React from "react";
import { useSelector } from "react-redux";
import {
    useGetCartQuery,
    useUpdateCartItemMutation,
    useRemoveFromCartMutation,
} from "../features/cartApi";
import { FiTrash2, FiShoppingCart, FiMinus, FiPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE } from "../api";
import CartHelmet from "../seo_helmet/CartHelmet";

// Spinner for loading states
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
            d="M4 12a8 8 0 018-8V0C5.373 
            0 0 5.373 0 12h4zm2 5.291A7.962 
            7.962 0 014 12H0c0 3.042 1.135 
            5.824 3 7.938l3-2.647z"
        ></path>
    </svg>
);

// Reusable display component
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
    const userId = useSelector((state) => state.auth.user?.id);

    const { data: cartData, isLoading, refetch } = useGetCartQuery(userId, {
        skip: !userId,
    });
    const [updateCartItem, { isLoading: isUpdating }] = useUpdateCartItemMutation();
    const [removeFromCart] = useRemoveFromCartMutation();



// Inside Cart component
const navigate = useNavigate();

   const handleQuantityChange = async (item, newQty) => {
    if (newQty < 1 || isUpdating) return;
    if (newQty > item.stock) return;

    try {
        await updateCartItem({
            user_id: userId,
            product_id: item.product_id,
            quantity: newQty,
        }).unwrap();
        // Refetch after update completes
        refetch();
    } catch (err) {
        console.error("Failed to update cart:", err);
    }
};

const handleRemove = async (e, item) => {
    e.preventDefault();
    try {
        await removeFromCart({ user_id: userId, cart_id: item.cart_id }).unwrap();
        // Refetch after removal
        refetch();
    } catch (err) {
        console.error("Failed to remove item:", err);
    }
};


    // Not logged in
    if (!userId) {
        return (
            <StateDisplay
                icon={<FiShoppingCart className="h-6 w-6 text-gray-500" />}
                title="Your Cart Awaits"
                message="Please log in to view and manage the items in your cart."
            >
                <Link
                    to="/login"
                    className="inline-block rounded-md bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
                >
                    Login
                </Link>
            </StateDisplay>
        );
    }

    // Loading
    if (isLoading) {
        return (
            <StateDisplay
                icon={<Spinner />}
                title="Loading Cart"
                message="Please wait while we fetch your items."
            />
        );
    }

    // Empty cart
    if (!cartData || cartData?.items?.length === 0) {
        return (
            <StateDisplay
                icon={<FiShoppingCart className="h-6 w-6 text-gray-500" />}
                title="Your cart is empty"
                message="Looks like you haven't added anything yet."
            >
                <Link
                    to="/products"
                    className="inline-block rounded-md bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
                >
                    Start Shopping
                </Link>
            </StateDisplay>
        );
    }

    return (


<>

<CartHelmet />

        <div className="bg-gray-100">
            <main className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Shopping Cart
                </h1>

                <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    {/* Cart Items */}
                    <section
                        aria-labelledby="cart-heading"
                        className="lg:col-span-7"
                    >
                        <h2 id="cart-heading" className="sr-only">
                            Items in your cart
                        </h2>
                        <ul className="divide-y divide-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
                            {cartData.items.map((item) => {
                                const unitPrice =
                                    item.sale_price && item.sale_price !== "0.00"
                                        ? parseFloat(item.sale_price)
                                        : parseFloat(item.price);
                                return (
                                    <li key={item.cart_id} className="p-4 sm:p-6">
                                        <div className="flex items-center sm:items-start">
                                            <img
                                                src={`${API_BASE}/${item.image_url}`}
                                                alt={item.name}
                                                className="h-24 w-24 rounded-md object-cover sm:h-32 sm:w-32"
                                            />

                                            <div className="ml-4 flex-1 flex flex-col justify-between">
                                                {/* Product title + remove */}
                                                <div className="flex justify-between">
                                                    <div>
                                                        <h3 className="text-base font-medium text-gray-900">
                                                            <Link
                                                                to={`/product/${item.product_id}`}
                                                                className="hover:text-gray-700"
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        </h3>
                                                        <p className="mt-1 text-sm text-gray-600">
                                                            Unit Price: ₹{unitPrice.toFixed(2)}
                                                        </p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={(e) =>
                                                            handleRemove(e, item)
                                                        }
                                                        className="p-2 -m-2 text-gray-400 hover:text-red-500"
                                                    >
                                                        <span className="sr-only">Remove</span>
                                                        <FiTrash2 className="h-5 w-5" />
                                                    </button>
                                                </div>

                                                {/* Quantity stepper + total */}
                                                <div className="mt-4">
                                                    <div
                                                        className="flex items-center"
                                                        style={{
                                                            opacity: isUpdating ? 0.5 : 1,
                                                        }}
                                                    >
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleQuantityChange(
                                                                    item,
                                                                    item.quantity - 1
                                                                )
                                                            }
                                                            disabled={item.quantity <= 1}
                                                            className="p-2 h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:bg-gray-200 disabled:text-gray-400"
                                                        >
                                                            <FiMinus />
                                                        </button>
                                                        <span className="px-4 font-medium text-gray-900 select-none">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleQuantityChange(
                                                                    item,
                                                                    item.quantity + 1
                                                                )
                                                            }
                                                            disabled={item.quantity >= item.stock}
                                                            className={`p-2 h-8 w-8 flex items-center justify-center rounded-full ${item.quantity >= item.stock
                                                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                                }`}
                                                        >
                                                            <FiPlus />
                                                        </button>
                                                    </div>

                                                    {/* Stock warning */}
                                                    {item.stock - item.quantity > 0 && (
                                                        <p className="text-xs text-red-500 mt-1">
                                                            Only {item.stock - item.quantity}{" "}
                                                            {item.stock - item.quantity === 1 ? "item" : "items"} left in stock
                                                        </p>
                                                    )}



                                                    {/* Total */}
                                                    <p className="mt-2 text-base font-medium text-gray-900">
                                                        ₹
                                                        {(
                                                            unitPrice * item.quantity
                                                        ).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>

                    {/* Order Summary */}
                    <section className="sticky top-20 mt-16 rounded-lg bg-white shadow-sm lg:mt-0 lg:col-span-5 p-6">
                        <h2 className="text-lg font-bold text-gray-900">
                            Order Summary
                        </h2>
                        <dl className="mt-6 space-y-4">
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-600">
                                    Subtotal ({cartData.count} items)
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">
                                    ₹{cartData.subtotal.toFixed(2)}
                                </dd>
                            </div>
                            <div className="border-t border-gray-200 pt-4 flex justify-between">
                                <dt className="text-base font-semibold text-gray-900">
                                    Order Total
                                </dt>
                                <dd className="text-base font-semibold text-gray-900">
                                    ₹{cartData.subtotal.toFixed(2)}
                                </dd>
                            </div>
                        </dl>
                        <div className="mt-6">
                            <button
                                onClick={() => navigate("/checkout", { state: { cartData } })}
                                className="w-full flex items-center justify-center rounded-md bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </section>
                </div>
            </main>
        </div>

</>

    );
};

export default Cart;
