// // src/pages/AdminProductList.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
// import { toast } from "react-toastify";
// import {
//   useGetProductsQuery,
//   useDeleteProductMutation,
// } from "../features/productApi";

// const AdminProductList = () => {
//   const { data: products, isLoading, error } = useGetProductsQuery();
//   const [deleteProduct] = useDeleteProductMutation();

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await deleteProduct(id).unwrap();
//         toast.success("Product deleted successfully!");
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to delete product.");
//       }
//     }
//   };

// console.log(products);
    

//   if (isLoading)
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-600 text-lg">Loading products...</p>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-500">
//         <p>Failed to load products</p>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 sm:p-10">
//       <div className="max-w-7xl mx-auto">
//         {/* Page Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
//           <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-0">
//             Product List
//           </h1>
//           <Link
//             to="/admin/add-product"
//             className="flex items-center bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow hover:bg-blue-700 transition"
//           >
//             <FiPlus className="mr-2" /> Add Product
//           </Link>
//         </div>

//         {/* Product Table */}
//         <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//           <table className="w-full text-left border-collapse">
//             <thead className="bg-gray-50 text-gray-700 uppercase text-sm font-semibold">
//               <tr>
//                 <th className="px-6 py-3">No</th>
//                 <th className="px-6 py-3">Product</th>
//                 <th className="px-6 py-3">Category</th>
//                 <th className="px-6 py-3">Price</th>
//                 <th className="px-6 py-3">Stock</th>
//                 <th className="px-6 py-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {products?.length > 0 ? (
//                 products.map((product, index) => (
//                   <tr key={product.id} className="hover:bg-gray-50 transition">
//                     <td className="px-6 py-4 font-medium text-gray-700">{index + 1}</td>

//                     <td className="px-6 py-4 flex items-center space-x-3">
//                       <div className="w-14 h-14 rounded-lg overflow-hidden shadow-sm">
//                         <img
//                           src={product.image || "/placeholder.png"}
//                           alt={product.name}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <span className="font-medium text-gray-800">{product.name}</span>
//                     </td>

//                     <td className="px-6 py-4 text-gray-600">{product.category}</td>
//                     <td className="px-6 py-4 text-gray-800 font-medium">
//                       {product.price} {product.currency || "₹"}
//                     </td>
//                     <td className="px-6 py-4 text-gray-600">{product.stock}</td>

//                     <td className="px-6 py-4 flex items-center space-x-2">
//                       <Link
//                         to={`/admin/edit-product/${product.id}`}
//                         className="flex items-center justify-center px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition text-sm"
//                         title="Edit product"
//                       >
//                         <FiEdit2 className="mr-1" /> Edit
//                       </Link>
//                       <button
//                         onClick={() => handleDelete(product.id)}
//                         className="flex items-center justify-center px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition text-sm"
//                         title="Delete product"
//                       >
//                         <FiTrash2 className="mr-1" /> Delete
//                       </button>
//                     </td>

//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-6 text-center text-gray-500">
//                     No products found.
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

// export default AdminProductList;









import React from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiEdit2, FiTrash2, FiInbox } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../features/productApi";

// --- REUSABLE COMPONENTS ---
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
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 
        3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <p>Loading products...</p>
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
    <h2 className="mt-4 text-xl font-semibold text-gray-900">
      No Products Found
    </h2>
    <p className="mt-2 text-base text-gray-600">
      Get started by adding your first product.
    </p>
    <Link
      to="/admin/add-product"
      className="mt-6 inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
    >
      <FiPlus className="-ml-0.5 mr-1.5 h-5 w-5" />
      Add Product
    </Link>
  </div>
);

const AdminProductList = () => {
  const { data, isLoading, error, refetch } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
        toast.success("Product deleted successfully!");
        refetch();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete product.");
      }
    }
  };

  const products = data || [];

  if (isLoading)
    return (
      <div className="p-6 sm:p-10">
        <LoadingSpinner />
      </div>
    );
  if (error)
    return (
      <div className="p-6 sm:p-10">
        <ErrorDisplay message="Failed to load products" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Products
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              A list of all the products in your store including their name,
              price, and stock.
            </p>
          </div>
          {products.length > 0 && (
            <Link
              to="/admin/add-product"
              className="mt-4 sm:mt-0 flex-shrink-0 flex items-center bg-black text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-gray-800 transition-colors"
            >
              <FiPlus className="mr-2 h-5 w-5" /> Add Product
            </Link>
          )}
        </div>

        {/* Content Area */}
        {products.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-4">
                          <img
                            className="h-12 w-12 rounded-md object-cover"
                            src={product.image || "/placeholder.png"}
                            alt={product.name}
                          />
                          <div>
                            <div className="font-medium text-gray-900">
                              {product.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          ₹{product.price}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.stock} in stock
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Link
                          to={`/admin/edit-product/${product.id}`}
                          className="inline-flex items-center justify-center p-2 text-gray-500 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
                          title="Edit product"
                        >
                          <FiEdit2 size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="inline-flex cursor-pointer items-center justify-center p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors"
                          title="Delete product"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List */}
            <div className="block md:hidden border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {products.map((product) => (
                  <li key={product.id} className="p-4">
                    <div className="flex items-start space-x-4">
                      <img
                        className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                        src={product.image || "/placeholder.png"}
                        alt={product.name}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {product.category}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-gray-800">
                          ₹{product.price}{" "}
                          <span className="font-normal text-gray-500">
                            ({product.stock} in stock)
                          </span>
                        </p>
                        {/* Actions aligned bottom right */}
                        <div className="mt-3 flex space-x-3">
                          <Link
                            to={`/admin/edit-product/${product.id}`}
                            className="inline-flex items-center justify-center p-2 text-gray-500 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
                            title="Edit product"
                          >
                            <FiEdit2 size={20} />
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="inline-flex cursor-pointer items-center justify-center p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors"
                            title="Delete product"
                          >
                            <FiTrash2 size={20} />
                          </button>
                        </div>
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

export default AdminProductList;
