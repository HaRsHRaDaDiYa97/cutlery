import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import Header from '../Header';

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar isSidebarOpen={isSidebarOpen} />
      
      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div 
          onClick={toggleSidebar} 
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
        ></div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {/* Outlet is where your page components (like ProductList) will be rendered */}
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;