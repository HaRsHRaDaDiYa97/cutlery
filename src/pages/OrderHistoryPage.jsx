import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { API_BASE } from "../api";
import { useSelector } from "react-redux";
import OrdersHelmet from "../seo_helmet/OrdersHelmet";

const StatusBadge = ({ status }) => {
  const baseClasses = "rounded-full px-2.5 py-0.5 text-xs font-medium";
  const statusClasses = {
    paid: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    failed: "bg-red-100 text-red-800",
    refunded: "bg-blue-100 text-blue-800",
  };
  return (
    <span
      className={`${baseClasses} ${statusClasses[status] || "bg-gray-100 text-gray-800"}`}
    >
      {status}
    </span>
  );
};

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [openOrderId, setOpenOrderId] = useState(null);

const user = useSelector((state) => state.auth.user);
const userId = user?.id; // or user?.user_id depending on your backend


  useEffect(() => {
   fetch(`${API_BASE}/get_orders.php?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setOrders(data.orders || []);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (

<>

<OrdersHelmet />

    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200 pb-6 mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">My Orders</h1>
          <p className="mt-2 text-lg text-gray-600">
            Track your recent orders, see details, and check status.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16 px-6 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200">
            <FiShoppingBag size={48} className="mx-auto text-gray-400" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">No Orders Yet</h2>
            <p className="mt-2 text-base text-gray-600">
              You haven’t placed any orders yet. Let’s change that!
            </p>
            <Link
              to="/products"
              className="mt-6 inline-block rounded-md bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.order_id}
                className="rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                {/* Collapsible Header */}
                <button
                  onClick={() =>
                    setOpenOrderId(openOrderId === order.order_id ? null : order.order_id)
                  }
                  className="w-full p-4 sm:p-6 text-left"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Order number</p>
                      <p className="mt-1 text-gray-600">#{order.order_id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Date placed</p>
                      <p className="mt-1 text-gray-600">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Total amount</p>
                      <p className="mt-1 font-semibold text-gray-900">₹{order.amount}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <StatusBadge status={order.status} />
                      {openOrderId === order.order_id ? (
                        <FiChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <FiChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Collapsible Body */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openOrderId === order.order_id ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="border-t border-gray-200 p-4 sm:p-6 space-y-4">
                    {/* Customer Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Customer Name</p>
                        <p className="text-gray-700">{order.name} {order.lastname}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Email</p>
                        <p className="text-gray-700 truncate">{order.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Mobile</p>
                        <p className="text-gray-700">{order.mobile}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Shipping Address</p>
                        <p className="text-gray-700">
                          {order.address}, {order.city}, {order.state} - {order.pincode}
                        </p>
                      </div>
                    </div>

                    {/* Product Items */}
                    <ul className="divide-y divide-gray-200">
                      {order.items.map((item) => (
                        <li key={item.order_item_id} className="flex py-6">
                          <img
                            src={`${API_BASE}/${item.image}`}
                            alt={item.name}
                            className="h-24 w-24 flex-none rounded-lg object-cover"
                          />
                          <div className="ml-4 flex flex-auto flex-col">
                            <div>
                              <h4 className="font-medium text-gray-900">{item.name}</h4>
                              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            </div>
                            <div className="mt-auto">
                              <p className="font-medium text-gray-900">₹{item.price}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

</>

  );
}
