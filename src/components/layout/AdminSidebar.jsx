import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid, FiBox, FiTag, FiFileText, FiUsers, FiBarChart2, FiSettings, FiShoppingCart } from 'react-icons/fi';

const AdminSidebar = ({ isSidebarOpen }) => {
  const menuItems = [
    { icon: <FiGrid />, name: 'Dashboard', path: '/admin' },
    { icon: <FiShoppingCart />, name: 'Online Store', path: '/admin/store' },
    { icon: <FiBox />, name: 'Products', path: '/admin/products' },
    { icon: <FiTag />, name: 'Categories', path: '/admin/categories' },
    { icon: <FiFileText />, name: 'Orders', path: '/admin/orders' },
    { icon: <FiUsers />, name: 'Customers', path: '/admin/customers' },
    { icon: <FiBarChart2 />, name: 'Reports', path: '/admin/reports' },
    { icon: <FiSettings />, name: 'Settings', path: '/admin/settings' },
  ];

  return (
    <aside 
      className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-64 space-y-6 py-7 px-2 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-30`}
    >
      <a href="/admin" className="text-white flex items-center space-x-2 px-4">
        <FiBox className="w-8 h-8" />
        <span className="text-2xl font-extrabold">ADMIN</span>
      </a>

      <nav>
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end // Use 'end' for the Dashboard link to avoid it being active on all child routes
            className={({ isActive }) => 
              `flex items-center space-x-3 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
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