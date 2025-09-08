import React from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../features/productApi";
import { useGetCategoriesQuery } from "../features/categoryApi";
import { useGetAllReviewsQuery } from "../features/reviewApi";
import { FiPackage, FiGrid, FiMessageSquare, FiStar, FiInbox } from "react-icons/fi";

// A reusable component for the main statistic cards
const StatCard = ({ title, value, icon, isLoading }) => (
  <div className="flex items-center p-6 bg-white rounded-lg shadow-md">
    <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-black text-white">
      {icon}
    </div>
    <div className="ml-4">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      {isLoading ? (
        <div className="mt-1 h-8 w-12 bg-gray-200 rounded animate-pulse"></div>
      ) : (
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      )}
    </div>
  </div>
);

const AdminDashboard = () => {
  // --- All your existing logic remains unchanged ---
  const { data: productsData, isLoading: productsLoading } = useGetProductsQuery();
  const { data: categoryData, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const { data: reviewsData, isLoading: reviewsLoading } = useGetAllReviewsQuery();

const products = productsData?.products || [];

  const categories = categoryData?.categories || [];
  const reviews = reviewsData || [];
  const isLoading = productsLoading || categoriesLoading || reviewsLoading;
  // --- End of logic section ---



  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome Back, Admin
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Here's a summary of your store's activity. Today is {today}.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Products" value={products.length} icon={<FiPackage size={28} />} isLoading={isLoading} />
          <StatCard title="Total Categories" value={categories.length} icon={<FiGrid size={28} />} isLoading={isLoading} />
          <StatCard title="Total Reviews" value={reviews.length} icon={<FiMessageSquare size={28} />} isLoading={isLoading} />
        </div>

        {/* Recent Reviews Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Reviews</h2>
            <Link to="/admin/reviews" className="text-sm font-medium text-black hover:underline">
              View all
            </Link>
          </div>
          
          {isLoading ? (
             <div className="p-6 text-center text-gray-500">Loading reviews...</div>
          ) : reviews.length === 0 ? (
             <div className="p-12 text-center">
                <FiInbox size={40} className="mx-auto text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No Reviews Yet</h3>
                <p className="mt-1 text-sm text-gray-500">When customers leave reviews, they will appear here.</p>
             </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                    <th scope="col" className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                    <th scope="col" className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Rating</th>
                    <th scope="col" className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Comment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reviews.slice(0, 5).map((review) => (
                    <tr key={review.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">{review.product_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{review.user_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FiStar key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-sm truncate">{review.comment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;