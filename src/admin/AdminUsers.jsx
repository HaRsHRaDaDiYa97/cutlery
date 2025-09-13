import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp, FiTrash2, FiUsers } from "react-icons/fi";
import { toast } from "react-toastify";
import { API_BASE } from "../api";


export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [openUserId, setOpenUserId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    fetch(`${API_BASE}/user_admin.php`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.users || []);
        } else {
          toast.error("Failed to load users");
        }
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        toast.error("Error fetching users");
      });
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`${API_BASE}/user_admin.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("User deleted successfully");
        loadUsers();
      } else {
        toast.error(data.message || "Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Users</h1>

        {/* Total User Count */}
        <div className="mb-8">
          <div className="bg-white shadow rounded-xl p-6 flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600">Total Users</p>
              <h2 className="text-4xl font-bold text-gray-900">{users.length}</h2>
            </div>
            <FiUsers className="w-12 h-12 text-indigo-500" />
          </div>
        </div>

        {users.length === 0 ? (
          <div className="text-center py-16 px-6 rounded-lg bg-white border border-dashed border-gray-300">
            <h2 className="mt-4 text-xl font-semibold text-gray-900">No Users Found</h2>
            <p className="mt-2 text-base text-gray-600">
              Once customers register, they will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                {/* Collapsible Header */}
                <button
                  onClick={() =>
                    setOpenUserId(openUserId === user.id ? null : user.id)
                  }
                  className="w-full p-4 sm:p-6 text-left transition-colors hover:bg-gray-50"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">User ID</p>
                      <p className="mt-1 text-gray-600">{user.id}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900">Full Name</p>
                      <p className="mt-1 text-gray-600">
                        {user.name} {user.lastname}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900">Mobile</p>
                      <p className="mt-1 text-gray-600">{user.mobile}</p>
                    </div>

                    <div className="flex justify-end">
                      {openUserId === user.id ? (
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
                    openUserId === user.id ? "max-h-[2000px]" : "max-h-0"
                  }`}
                >
                  <div className="border-t border-gray-200 p-4 sm:p-6 space-y-6">
                    {/* User Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Full Details</p>
                        <p className="text-gray-700">
                          {user.name} {user.lastname}
                        </p>
                       <p className="text-gray-700 truncate max-w-xs">Email: {user.email}</p>

                        <p className="text-gray-700">Mobile: {user.mobile}</p>
                        <p className="text-gray-700">Role: {user.role}</p>
                        <p className="text-gray-700">Provider: {user.provider}</p>
                        <p className="text-gray-700">
                          Verified: {user.verified === "1" ? "Yes" : "No"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Address</p>
                        <p className="text-gray-700">
                          {user.address}, {user.city}, {user.state} - {user.pincode}
                        </p>
                        <p className="mt-2 text-sm font-medium text-gray-900">
                          Created At
                        </p>
                        <p className="text-gray-700">
                          {new Date(user.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <div className="flex justify-end">
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700"
                      >
                        <FiTrash2 className="mr-2 h-4 w-4" />
                        Delete User
                      </button>
                    </div>
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
