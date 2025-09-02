// src/pages/AdminReview.jsx
import React from "react";
import { toast } from "react-toastify";
import {
  useGetAllReviewsQuery,
  useDeleteReviewMutation,
} from "../features/reviewApi";

const AdminReview = () => {
  const { data: reviews, isLoading, error } = useGetAllReviewsQuery();
  const [deleteReview] = useDeleteReviewMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteReview(id).unwrap();
        toast.success("Review deleted successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete review.");
      }
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading reviews...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>Failed to load reviews</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
          Reviews List
        </h1>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-700 uppercase text-sm font-semibold">
              <tr>
                <th className="px-6 py-3">No</th>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Rating</th>
                <th className="px-6 py-3">Comment</th>
                <th className="px-6 py-3">Created At</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {reviews?.length > 0 ? (
                reviews.map((review, index) => (
                  <tr key={review.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4 text-gray-800 font-medium">
                      {review.product_name}
                    </td>

                    <td className="px-6 py-4 text-gray-700">{review.user_name}</td>

                    <td className="px-6 py-4 text-yellow-500">
                      {"⭐".repeat(review.rating)}
                    </td>

                    <td className="px-6 py-4 text-gray-700">{review.comment}</td>

                    <td className="px-6 py-4 text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-6 text-center text-gray-500"
                  >
                    No reviews found.
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

export default AdminReview;
