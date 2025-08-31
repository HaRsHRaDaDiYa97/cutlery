// src/pages/AdminProductList.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../features/productApi";

const AdminProductList = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
        toast.success("Product deleted successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete product.");
      }
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading products...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>Failed to load products</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-0">
            Product List
          </h1>
          <Link
            to="/admin/add-product"
            className="flex items-center bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow hover:bg-blue-700 transition"
          >
            <FiPlus className="mr-2" /> Add Product
          </Link>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-700 uppercase text-sm font-semibold">
              <tr>
                <th className="px-6 py-3">No</th>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products?.length > 0 ? (
                products.map((product, index) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-700">{index + 1}</td>

                    <td className="px-6 py-4 flex items-center space-x-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden shadow-sm">
                        <img
                          src={product.image || "/placeholder.png"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium text-gray-800">{product.name}</span>
                    </td>

                    <td className="px-6 py-4 text-gray-600">{product.category}</td>
                    <td className="px-6 py-4 text-gray-800 font-medium">
                      {product.price} {product.currency || "₹"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{product.stock}</td>

                    <td className="px-6 py-4 flex items-center space-x-2">
                      <Link
                        to={`/admin/edit-product/${product.id}`}
                        className="flex items-center justify-center px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition text-sm"
                        title="Edit product"
                      >
                        <FiEdit2 className="mr-1" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="flex items-center justify-center px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition text-sm"
                        title="Delete product"
                      >
                        <FiTrash2 className="mr-1" /> Delete
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-6 text-center text-gray-500">
                    No products found.
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

export default AdminProductList;
