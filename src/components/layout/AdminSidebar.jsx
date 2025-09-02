import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiTag,
  FiFileText,
  FiUsers,
  FiStar,
  FiMail ,
  FiX,
} from "react-icons/fi";

const AdminSidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const menuItems = [
   { icon: <FiHome />, name: "Dashboard", path: "/admin" },
  { icon: <FiBox />, name: "Products", path: "/admin/products" },
  { icon: <FiTag />, name: "Categories", path: "/admin/categories" },
  { icon: <FiFileText />, name: "Orders", path: "/admin/orders" },
  { icon: <FiUsers />, name: "Customers", path: "/admin/customers" },
  { icon: <FiStar />, name: "Reviews", path: "/admin/reviews" },
  { icon: <FiMail />, name: "Messages", path: "/admin/messages" },

  ];

  return (
    <aside
      className={`flex flex-col h-full bg-gray-800 text-white w-64 py-6 transition-transform duration-300 ease-in-out`}
    >
      {/* Logo + Close button (mobile only) */}
      <div className="flex items-center justify-between px-4">
        <a href="/admin" className="flex items-center space-x-2">
          <FiBox className="w-8 h-8" />
          <span className="text-2xl font-extrabold">ADMIN</span>
        </a>

        {/* Close button only visible on mobile */}
        {toggleSidebar && (
          <button
            onClick={toggleSidebar}
            className="md:hidden text-white hover:text-red-400"
          >
            <FiX className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end
            onClick={toggleSidebar} // auto-close on mobile
            className={({ isActive }) =>
              `flex items-center space-x-3 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
