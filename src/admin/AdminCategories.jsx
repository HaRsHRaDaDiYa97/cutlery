
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FiPlus, FiTrash2 } from "react-icons/fi";
// import { API_BASE } from "../api";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AdminCategories = () => {
//   const [categories, setCategories] = useState([]);

//   // Fetch categories from backend
//   const fetchCategories = async () => {
//     try {
//       const res = await fetch(`${API_BASE}/get_categories.php`);
//       const data = await res.json();
//       if (data.success) {
//         setCategories(data.categories);
//       } else {
//         toast.error("Failed to fetch categories.");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong while fetching categories.");
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // Delete category
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this category?")) return;

//     try {
//       const res = await fetch(`${API_BASE}/delete_category.php?id=${id}`, {
//         method: "DELETE",
//       });
//       const data = await res.json();
//       if (data.success) {
//         toast.success(data.message || "Category deleted successfully");
//         fetchCategories();
//       } else {
//         toast.error("Failed to delete category.");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong while deleting category.");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       {/* Toast Container */}
//       <ToastContainer position="top-right" autoClose={3000} />

//       <div className="max-w-7xl mx-auto">
//         {/* Page Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
//           <Link
//             to="/admin/add-category"
//             className="flex items-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700"
//           >
//             <FiPlus className="mr-2" /> Add Category
//           </Link>
//         </div>

//         {/* Categories Table */}
//         <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white">
//           <table className="w-full text-left text-gray-700">
//             <thead className="bg-gray-50 uppercase text-sm font-medium">
//               <tr>
//                 <th className="px-6 py-3">ID</th>
//                 <th className="px-6 py-3">Name</th>
//                 <th className="px-6 py-3">Slug</th>
//                 <th className="px-6 py-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {categories.length > 0 ? (
//                 categories.map((cat) => (
//                   <tr key={cat.id} className="border-b hover:bg-gray-50">
//                     <td className="px-6 py-4">{cat.id}</td>
//                     <td className="px-6 py-4 font-medium">{cat.name}</td>
//                     <td className="px-6 py-4">{cat.slug}</td>
//                     <td className="px-6 py-4 flex space-x-3">
//                       <button
//                         onClick={() => handleDelete(cat.id)}
//                         className="text-red-600 hover:text-red-800 cursor-pointer"
//                       >
//                         <FiTrash2 size={18} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" className="text-center py-4 text-gray-500">
//                     No categories found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminCategories;






import React from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "../features/categoryApi";

const AdminCategories = () => {
  const { data, isLoading, isError, refetch  } = useGetCategoriesQuery();
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

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError) return <p className="p-6 text-red-600">Failed to load categories.</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
          <Link
            to="/admin/add-category"
            className="flex items-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            <FiPlus className="mr-2" /> Add Category
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white">
          <table className="w-full text-left text-gray-700">
            <thead className="bg-gray-50 uppercase text-sm font-medium">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Slug</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.categories?.length > 0 ? (
                data.categories.map((cat) => (
                  <tr key={cat.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{cat.id}</td>
                    <td className="px-6 py-4 font-medium">{cat.name}</td>
                    <td className="px-6 py-4">{cat.slug}</td>
                    <td className="px-6 py-4 flex space-x-3">
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
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
