
import React from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiTrash2, FiEdit, FiInbox } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "../features/categoryApi";

// --- REUSABLE COMPONENTS FOR DIFFERENT STATES ---

const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <svg className="animate-spin h-8 w-8 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        <p>Loading categories...</p>
    </div>
);

const ErrorDisplay = ({ message }) => (
    <div className="flex justify-center items-center h-64 text-red-600">
        <p className="text-lg">{message}</p>
    </div>
);

const EmptyState = () => (
    <div className="text-center py-16 px-6 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200">
        <FiInbox size={48} className="mx-auto text-gray-400" />
        <h2 className="mt-4 text-xl font-semibold text-gray-900">No Categories Found</h2>
        <p className="mt-2 text-base text-gray-600">Get started by adding a new product category.</p>
        <Link to="/admin/add-category" className="mt-6 inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800">
            <FiPlus className="-ml-0.5 mr-1.5 h-5 w-5" />
            Add Category
        </Link>
    </div>
);

const AdminCategories = () => {
  // --- All your existing logic remains unchanged ---
  const { data, isLoading, isError, refetch } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteCategory(id).unwrap();
      toast.success("Category deleted successfully!");
      refetch();
    } catch (err) {
      toast.error("Failed to delete category.");
      console.error(err);
    }
  };
  // --- End of logic section ---

  if (isLoading) return <div className="p-6 sm:p-10"><LoadingSpinner /></div>;
  if (isError) return <div className="p-6 sm:p-10"><ErrorDisplay message="Failed to load categories." /></div>;

  const categories = data?.categories || [];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Categories</h1>
            <p className="mt-1 text-sm text-gray-500">Manage your product categories. You can add, edit, or delete them.</p>
          </div>
          {categories.length > 0 && (
             <Link to="/admin/add-category" className="mt-4 sm:mt-0 flex-shrink-0 flex items-center bg-black text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-gray-800 transition-colors">
                <FiPlus className="mr-2 h-5 w-5" /> Add Category
             </Link>
          )}
        </div>

        {/* Content Area */}
        {categories.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* --- DESKTOP TABLE (HIDDEN ON MOBILE) --- */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</th>
                    <th scope="col" className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Name & Slug</th>
                    <th scope="col" className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        {cat.image ? <img src={cat.image} alt={cat.name} className="h-12 w-12 rounded-md object-cover" /> : <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-400">No Image</div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{cat.name}</div>
                        <div className="text-sm text-gray-500">{cat.slug}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button onClick={() => handleDelete(cat.id)} className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors" title="Delete category">
                          <FiTrash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* --- MOBILE CARD LIST (HIDDEN ON DESKTOP) --- */}
            <div className="block md:hidden border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {categories.map((cat) => (
                  <li key={cat.id} className="p-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            {cat.image ? <img src={cat.image} alt={cat.name} loading="lazy" className="h-16 w-16 rounded-lg object-cover" /> : <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-400">No Image</div>}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">{cat.name}</p>
                            <p className="text-sm text-gray-500 truncate">{cat.slug}</p>
                        </div>
                        <div className="flex items-center">
                            <button onClick={() => handleDelete(cat.id)} className="p-2 text-gray-500 hover:text-red-600" title="Delete category">
                                <FiTrash2 size={20} />
                            </button>
                        </div>
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

export default AdminCategories;