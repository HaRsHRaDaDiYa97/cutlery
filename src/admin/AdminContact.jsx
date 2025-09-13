import React, { useEffect, useState } from "react";
import { FiInbox, FiMail, FiPhone, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { API_BASE } from "../api";

// --- REUSABLE COMPONENTS FOR DIFFERENT STATES ---
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center h-64 text-gray-500">
    <svg
      className="animate-spin h-8 w-8 mb-4"
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
    <p>Loading messages...</p>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-16 px-6 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200">
    <FiInbox size={48} className="mx-auto text-gray-400" />
    <h2 className="mt-4 text-xl font-semibold text-gray-900">
      No Messages Found
    </h2>
    <p className="mt-2 text-base text-gray-600">
      When a user submits a message through the contact form, it will appear
      here.
    </p>
  </div>
);

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);


  // --- Fetch contacts ---
  const fetchContacts = () => {
    fetch(`${API_BASE}/contact.php`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setContacts(data);
        } else {
          console.error("Invalid contacts API response:", data);
          toast.error("Failed to load contacts ❌");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching contacts:", err);
        toast.error("Error fetching contacts ❌");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // --- Delete contact ---
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    fetch(`${API_BASE}/contact.php`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setContacts((prev) => prev.filter((c) => String(c.id) !== String(id)));
          toast.success("Message deleted successfully ✅");
        } else {
          toast.error(data.error || "Failed to delete message ❌");
        }
      })
      .catch((err) => {
        console.error("Error deleting message:", err);
        toast.error("Error deleting message ❌");
      });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  if (loading) {
    return (
      <div className="p-6 sm:p-10">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Contact Messages
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Review and manage messages submitted through your website's contact
            form.
          </p>
        </div>

        {/* Content Area */}
        {contacts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* --- DESKTOP TABLE --- */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Sender
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {contacts.map((c, idx) => (
                    <tr
                      key={c.id ?? idx}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {String(c.name ?? "Unknown")}
                        </div>
                        <div className="text-sm text-gray-500">
                          {String(c.email ?? "No email")}
                        </div>
                        <div className="text-sm text-gray-500">
                          {c.phone ? String(c.phone) : "No phone"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-700 max-w-lg truncate">
                          {String(c.message ?? "No message")}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(c.created_at)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="text-red-600 hover:text-red-800 flex items-center gap-1"
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* --- MOBILE CARD LIST --- */}
            <div className="block md:hidden border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {contacts.map((c, idx) => (
                  <li key={c.id ?? idx} className="p-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900 truncate">
                          {String(c.name ?? "Unknown")}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(c.created_at)}
                        </p>
                      </div>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <p className="flex items-center">
                          <FiMail className="mr-2 h-4 w-4 text-gray-400" />{" "}
                          {String(c.email ?? "No email")}
                        </p>
                        {c.phone && (
                          <p className="flex items-center">
                            <FiPhone className="mr-2 h-4 w-4 text-gray-400" />{" "}
                            {String(c.phone)}
                          </p>
                        )}
                      </div>
                      <p className="mt-3 text-sm text-gray-800 bg-gray-50 p-3 rounded-md">
                        {String(c.message ?? "No message")}
                      </p>

                      {/* Delete button */}
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="mt-3 text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContact;