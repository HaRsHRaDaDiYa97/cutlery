import React from 'react';
import { FiMenu, FiUser, FiSearch } from 'react-icons/fi';

const AdminHeader = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Hamburger Menu for Mobile */}
      <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none md:hidden">
        <FiMenu className="h-6 w-6" />
      </button>

      {/* Search Bar (Optional) */}
      <div className="relative hidden md:block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </span>
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* User Profile */}
      <div className="flex items-center space-x-4">
        <span className="font-medium">Michael Richard</span>
        <img
          className="h-10 w-10 rounded-full object-cover"
          src="https://via.placeholder.com/40"
          alt="User avatar"
        />
      </div>
    </header>
  );
};

export default AdminHeader;