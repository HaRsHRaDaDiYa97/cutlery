import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FiPackage,
  FiMapPin,
  FiHeart,
  FiShield,
  FiLogOut,
  FiChevronRight,
  FiEdit,
} from "react-icons/fi";
import axios from "axios";
import { logout, setCredentials } from "../app/slice/authSlice";
import { toast } from "react-toastify";
import AccountHelmet from "../seo_helmet/AccountHelmet";

// Reusable Card Component
const AccountCard = ({ to, icon, title, children }) => (
  <Link
    to={to}
    className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-black hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
  >
    <div className="flex items-start justify-between">
      <div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 transition-colors group-hover:bg-black">
          {React.cloneElement(icon, {
            className:
              "h-6 w-6 text-gray-700 transition-colors group-hover:text-white",
          })}
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">{children}</p>
      </div>
      <FiChevronRight className="h-6 w-6 text-gray-400 transition-transform group-hover:translate-x-1" />
    </div>
  </Link>
);

export default function AccountPage() {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    lastname: user?.lastname || "",
    mobile: user?.mobile || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    pincode: user?.pincode || "",
  });

  const [loading, setLoading] = useState(false);
 // ✅ FIX: redirect in useEffect instead of render
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null; // wait until navigate happens
  }


  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : "A";

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/login");
  };


  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost/cutlery-backend/api/update_profile.php",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.status === "success") {
        toast.success(res.data.message);
        // Update Redux store with new user info
        dispatch(setCredentials({ user: { ...user, ...formData }, token }));
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("⚠️ Error updating profile.");
    } finally {
      setLoading(false);
    }
  };
  return (

<>

<AccountHelmet />

    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            My Account
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Welcome back, {user.name || "Valued Customer"}!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Left Column: Profile Summary */}
          <aside className="lg:col-span-1">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-black text-white">
                <span className="text-4xl font-bold">{userInitial}</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-gray-900">
                {user.name} {user.lastname}
              </h2>
              <p className="mt-1 text-sm text-gray-500">{user.email}</p>

              <button
                onClick={handleLogout}
                className="mt-6 flex cursor-pointer w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                <FiLogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </aside>

          {/* Right Column */}
          <main className="lg:col-span-2 space-y-8">
            {/* Profile Update Form */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-900 mb-4">
                <FiEdit /> Update Profile
              </h3>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                {/* First Name */}
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="mb-1 text-sm font-medium text-gray-700"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your first name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:ring-black"
                  />
                </div>

                {/* Last Name */}
                <div className="flex flex-col">
                  <label
                    htmlFor="lastname"
                    className="mb-1 text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastname"
                    type="text"
                    name="lastname"
                    placeholder="Enter your last name"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:ring-black"
                  />
                </div>

                {/* Mobile */}
                <div className="flex flex-col">
                  <label
                    htmlFor="mobile"
                    className="mb-1 text-sm font-medium text-gray-700"
                  >
                    Mobile Number
                  </label>
                  <input
                    id="mobile"
                    type="tel"
                    name="mobile"
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    maxLength={10} // extra safety at UI level
                    className="w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:ring-black"
                  />
                </div>

                {/* Address */}
                <div className="flex flex-col">
                  <label
                    htmlFor="address"
                    className="mb-1 text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:ring-black"
                  />
                </div>

                {/* City */}
                <div className="flex flex-col">
                  <label
                    htmlFor="city"
                    className="mb-1 text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:ring-black"
                  />
                </div>

                {/* State */}
                <div className="flex flex-col">
                  <label
                    htmlFor="state"
                    className="mb-1 text-sm font-medium text-gray-700"
                  >
                    State
                  </label>
                  <input
                    id="state"
                    type="text"
                    name="state"
                    placeholder="Enter your state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:ring-black"
                  />
                </div>

                {/* Pincode */}
                <div className="flex flex-col">
                  <label
                    htmlFor="pincode"
                    className="mb-1 text-sm font-medium text-gray-700"
                  >
                    Pincode
                  </label>
                  <input
                    id="pincode"
                    type="text"
                    name="pincode"
                    placeholder="Enter your pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    maxLength={6} 
                    className="w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:ring-black"
                  />
                </div>

                {/* Submit Button */}
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full cursor-pointer rounded-md bg-black px-4 py-2 text-white font-semibold shadow-sm transition hover:bg-gray-800 disabled:opacity-50"
                  >
                    {loading ? "Updating..." : "Update Profile"}
                  </button>
                </div>
              </form>

            </div>

            {/* Navigation Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <AccountCard to="/orders" icon={<FiPackage />} title="Order History">
                View your past orders and track their status.
              </AccountCard>
             
              <AccountCard to="/wishlist" icon={<FiHeart />} title="My Wishlist">
                View and manage your saved items.
              </AccountCard>
             
            </div>
          </main>
        </div>
      </div>
    </div>

</>

  );
}
