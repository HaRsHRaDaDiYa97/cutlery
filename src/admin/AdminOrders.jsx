import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { API_BASE } from "../api";

const StatusBadge = ({ status }) => {
  const baseClasses = "rounded-full px-2.5 py-0.5 text-xs font-medium";
  const statusClasses = {
    paid: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    failed: "bg-red-100 text-red-800",
    refunded: "bg-blue-100 text-blue-800",
  };
  return (
    <span className={`${baseClasses} ${statusClasses[status] || "bg-gray-100 text-gray-800"}`}>
      {status}
    </span>
  );
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [openOrderId, setOpenOrderId] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/get_orders.php`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setOrders(data.orders || []);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-16 px-6 rounded-lg bg-white border border-dashed border-gray-300">
            <h2 className="mt-4 text-xl font-semibold text-gray-900">No Orders Found</h2>
            <p className="mt-2 text-base text-gray-600">
              Once customers start placing orders, they will appear here.
            </p>
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
                  className="w-full p-4 sm:p-6 text-left transition-colors hover:bg-gray-50"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Order #</p>
                      <p className="mt-1 text-gray-600">{order.order_id}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900">Full Name</p>
                      <p className="mt-1 text-gray-600">{order.name} {order.lastname}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900">Amount</p>
                      <p className="mt-1 font-semibold text-gray-900">₹{order.amount}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900">Status</p>
                      <div className="mt-1">
                        <StatusBadge status={order.status} />
                      </div>
                    </div>

                    <div className="flex justify-end">
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
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openOrderId === order.order_id ? "max-h-[2000px]" : "max-h-0"
                  }`}
                >
                  <div className="border-t border-gray-200 p-4 sm:p-6 space-y-6">
                    {/* Customer Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Customer Name & Email</p>
                        <p className="text-gray-700">{order.name} {order.lastname}</p>
                        <p className="text-gray-700">{order.email}</p>
                        <p className="text-gray-700">Mobile: {order.mobile}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Address</p>
                        <p className="text-gray-700">
                          {order.address}, {order.city}, {order.state} - {order.pincode}
                        </p>
                        <p className="mt-2 text-sm font-medium text-gray-900">Payment Details</p>
                        <p className="text-gray-700">Payment ID: {order.payment_id || "N/A"}</p>
                        <p className="text-gray-700">Razorpay Order: {order.razorpay_order_id}</p>
                      </div>
                    </div>

                    {/* Product Items */}
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">Products</p>
                      <ul className="divide-y divide-gray-200">
                        {order.items.map((item) => (
                          <li key={item.order_item_id} className="flex py-4 sm:py-6">
                            <img
                              src={`${API_BASE}/${item.image}`}
                              alt={item.name}
                              className="h-24 w-24 flex-none rounded-lg object-cover"
                            />
                            <div className="ml-4 flex flex-auto flex-col justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900">{item.name}</h4>
                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                              </div>
                              <div className="mt-2 font-medium text-gray-900">₹{item.price}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="mt-4 text-sm text-gray-500">
                      Placed on {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
