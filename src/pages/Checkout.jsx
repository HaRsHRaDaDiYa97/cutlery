
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiShoppingCart } from "react-icons/fi";
import { API_BASE } from "../api";

import { cartApi } from "../features/cartApi"; // ✅ import cartApi


const Checkout = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;
  const location = useLocation();
  const navigate = useNavigate();
  const cartData = location.state?.cartData;
  const [isProcessing, setIsProcessing] = useState(false);

 const dispatch = useDispatch(); // ✅ define dispatch

  const [formData, setFormData] = useState({
    name: "", lastname: "", mobile: "", email: "", address: "",
    city: "", state: "", pincode: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "", lastname: user.lastname || "",
        mobile: user.mobile || "", email: user.email || "",
        address: user.address || "", city: user.city || "",
        state: user.state || "", pincode: user.pincode || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    // Check all required fields
  const requiredFields = [
    "name",
    "lastname",
    "mobile",
    "email",
    "address",
    "city",
    "state",
    "pincode",
  ];

  for (const field of requiredFields) {
    if (!formData[field]?.trim()) {
      toast.error(`Please fill out the ${field} field.`);
      return;
    }
  }

  // Optional: validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    toast.error("Please enter a valid email address.");
    return;
  }

  // Optional: validate mobile number (10 digits)
  const mobileRegex = /^\d{10}$/;
  if (!mobileRegex.test(formData.mobile)) {
    toast.error("Please enter a valid 10-digit mobile number.");
    return;
  }

  // Optional: validate pincode (6 digits)
  const pincodeRegex = /^\d{6}$/;
  if (!pincodeRegex.test(formData.pincode)) {
    toast.error("Please enter a valid 6-digit postal code.");
    return;
  }


    setIsProcessing(true);
    try {
      const res = await axios.post("http://localhost/cutlery-backend/api/create_order.php", {
        user_id: userId, amount: Math.round(cartData.subtotal),
        ...formData, items: cartData.items,
      }, { headers: { "Content-Type": "application/json" } });

      const order = res.data;
      if (!order.success) {
        toast.error("Order creation failed: " + order.error);
        setIsProcessing(false);
        return;
      }

      const options = {
        key: "rzp_test_RECMjyRF0o9vji",
        order_id: order.order_id, amount: order.amount, currency: order.currency,
        name: "DIVA JEWELLER", description: "Order Payment",
        handler: async function (response) {
          await axios.post("http://localhost/cutlery-backend/api/verify_payment.php", { ...response, user_id: userId });


// 🔑 force cart re-fetch
    dispatch(cartApi.util.invalidateTags([{ type: "Cart", id: "LIST" }]));

          toast.success("Payment Successful! Redirecting...");
          navigate("/orders");
        },
        prefill: {
          name: formData.name + " " + formData.lastname,
          email: formData.email, contact: formData.mobile,
        },
        theme: { color: "#111827" },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          }
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err.response?.data || err.message);
      toast.error("Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  if (!userId) {
    navigate("/login");
    return <div className="p-4 text-center">Redirecting to login...</div>;
  }
  if (!cartData || !cartData.items || cartData.items.length === 0) {
    return (
      <div className="p-4 text-center">
        <p>Your cart is empty.</p>
        <Link to="/products" className="text-black underline">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 sm:text-4xl">Checkout</h1>
        <form className="mt-12 grid lg:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN */}
          <section className="lg:col-span-7 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact & Shipping Information</h2>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
              {/* First Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">First Name</label>
                <input type="text" name="name" id="name"
                  value={formData.name} onChange={handleChange}
                  className="mt-2 block w-full rounded-xl border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:ring-black sm:text-sm" />
              </div>
              {/* Last Name */}
              <div>
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" name="lastname" id="lastname"
                  value={formData.lastname} onChange={handleChange}
                  className="mt-2 block w-full rounded-xl border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:ring-black sm:text-sm" />
              </div>
              {/* Email */}
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" name="email" id="email"
                  value={formData.email} onChange={handleChange}
                  className="mt-2 block w-full rounded-xl border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:ring-black sm:text-sm" />
              </div>
              {/* Mobile */}
              <div className="sm:col-span-2">
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <input type="tel" name="mobile" id="mobile"
                  value={formData.mobile} onChange={handleChange}
                  className="mt-2 block w-full rounded-xl border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:ring-black sm:text-sm" />
              </div>
              {/* Address */}
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <textarea name="address" id="address"
                  value={formData.address} onChange={handleChange}
                  rows={3}
                  className="mt-2 block w-full rounded-xl border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:ring-black sm:text-sm"></textarea>
              </div>
              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input type="text" name="city" id="city"
                  value={formData.city} onChange={handleChange}
                  className="mt-2 block w-full rounded-xl border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:ring-black sm:text-sm" />
              </div>
              {/* State */}
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
                <input type="text" name="state" id="state"
                  value={formData.state} onChange={handleChange}
                  className="mt-2 block w-full rounded-xl border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:ring-black sm:text-sm" />
              </div>
              {/* Pincode */}
              <div>
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                <input type="text" name="pincode" id="pincode"
                  value={formData.pincode} onChange={handleChange}
                  className="mt-2 block w-full rounded-xl border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:ring-black sm:text-sm" />
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN */}
        <section className="lg:col-span-5 bg-white rounded-xl shadow-md p-6">
  <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
  <ul className="mt-6 divide-y divide-gray-200 border-t border-b">
    {cartData.items.map((item) => (
      <li key={item.product_id} className="flex py-6 items-center gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
           src={`${API_BASE}/${item.image_url}`}
            alt={item.name}
            className="h-24 w-24 rounded-lg object-cover shadow-sm"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-1 justify-between items-start">
          <div>
            <h4 className="text-sm font-medium text-gray-800">{item.name}</h4>
            <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>

            {/* Price with discount display */}
            <div className="mt-1 text-sm">
              {item.sale_price && Number(item.sale_price) < Number(item.price) ? (
                <p>
                  <span className="font-semibold text-gray-900">
                    ₹{Number(item.sale_price).toFixed(2)}
                  </span>{" "}
                  <span className="line-through text-gray-500 text-xs">
                    ₹{Number(item.price).toFixed(2)}
                  </span>
                </p>
              ) : (
                <p className="font-semibold text-gray-900">
                  ₹{Number(item.price).toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </div>
      </li>
    ))}
  </ul>

  {/* Totals */}
  <dl className="mt-6 space-y-4">
    <div className="flex justify-between text-sm text-gray-600">
      <dt>Subtotal</dt>
      <dd className="font-medium text-gray-900">
        ₹{cartData.subtotal.toFixed(2)}
      </dd>
    </div>
    <div className="flex justify-between text-sm text-gray-600">
      <dt>Shipping</dt>
      <dd className="font-medium text-gray-900">Free</dd>
    </div>
    <div className="flex justify-between border-t border-gray-200 pt-4 text-base font-semibold text-gray-900">
      <dt>Order Total</dt>
      <dd>₹{cartData.subtotal.toFixed(2)}</dd>
    </div>
  </dl>

  {/* Pay Button */}
  <div className="mt-6">
    <button
      type="button"
      onClick={handlePayment}
      disabled={isProcessing}
      className="w-full rounded-xl bg-black px-6 py-3 text-base font-medium text-white shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {isProcessing
        ? "Processing..."
        : `Pay ₹${cartData.subtotal.toFixed(2)}`}
    </button>
  </div>
</section>

        </form>
      </div>
    </div>
  );
};

export default Checkout;
