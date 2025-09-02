import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { FiMenu } from "react-icons/fi";

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar wrapper */}
      <div>
        {/* Mobile Sidebar (slide-in) */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <AdminSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={closeSidebar} />
        </div>

        {/* Desktop Sidebar (always visible) */}
        <div className="hidden md:block h-screen  md:w-64 md:shrink-0">
          <AdminSidebar isSidebarOpen={true} />
        </div>
      </div>

      {/* Backdrop for mobile */}
      <div
        onClick={closeSidebar}
        className={`fixed inset-0 z-30 bg-black/50 md:hidden transition-opacity duration-300 ease-in-out ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      ></div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header with menu button */}
        <header className="flex items-center bg-white shadow px-4 py-3 md:hidden">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 focus:outline-none"
          >
            <FiMenu className="h-6 w-6" />
          </button>
          <h1 className="ml-3 text-lg font-semibold text-gray-800">
            Admin Panel
          </h1>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
