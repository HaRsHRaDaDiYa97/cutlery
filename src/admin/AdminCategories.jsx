import React from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "../features/categoryApi";

const AdminCategories = () => {
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

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 text-lg">Loading categories...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-600 text-lg">Failed to load categories.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-10">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-0">
            Categories
          </h1>
          <Link
            to="/admin/add-category"
            className="flex items-center bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow hover:bg-blue-700 transition"
          >
            <FiPlus className="mr-2" /> Add Category
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-50 text-blue-800 uppercase text-sm font-semibold">
              <tr>
                <th className="px-6 py-3">No.</th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Slug</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data?.categories?.length > 0 ? (
                data.categories.map((cat, index) => (
                  <tr
                    key={cat.id}
                    className="hover:bg-blue-50 transition duration-200"
                  >
                    <td className="px-6 py-4 text-gray-600 font-medium">{index + 1}</td>

                    {/* Image */}
                    <td className="px-6 py-4">
                      {cat.image ? (
                        <div className="w-16 h-16 overflow-hidden rounded-lg shadow-sm">
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-full object-cover transform transition duration-300 hover:scale-110"
                          />
                        </div>
                      ) : (
                        <span className="text-gray-400">No image</span>
                      )}
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-800">{cat.name}</td>
                    <td className="px-6 py-4 text-gray-600">{cat.slug}</td>

                    {/* Actions */}
                    <td className="px-6 py-4 flex justify-center space-x-3">
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="flex cursor-pointer items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                        title="Delete category"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
