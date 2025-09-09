import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Reusable Star icon
const StarIcon = ({ className }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ReviewSection = ({ productId }) => {
  const user = useSelector((state) => state.auth.user);

  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const limit = 5; // reviews per page

  // Fetch reviews from backend
  const fetchReviews = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost/cutlery-backend/api/review.php?action=product&product_id=${productId}&page=${pageNumber}&limit=${limit}`
      );

      if (res.data.success) {
        // Append new reviews
        setReviews((prev) =>
          pageNumber === 1 ? res.data.reviews : [...prev, ...res.data.reviews]
        );
        setTotal(res.data.total);
      } else {
        toast.error("Failed to fetch reviews");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(1); // initial load
  }, [productId]);

  const loadMoreReviews = () => {
    const nextPage = page + 1;
    fetchReviews(nextPage);
    setPage(nextPage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("⚠️ Please login to leave a review");
      navigate('/login');
      return;
    }

    if (!comment.trim()) return toast.error("⚠️ Comment cannot be empty");

    setSubmitting(true);
    try {
      await axios.post("http://localhost/cutlery-backend/api/review.php", {
        action: "add",
        user_id: user.id,
        product_id: productId,
        rating,
        comment,
      });
      toast.success("✅ Review added successfully!");
      setComment("");
      setRating(5);
      fetchReviews(1); // reload first page
      setPage(1);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to add review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white py-8">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
          Customer Reviews
        </h2>

        {/* Review Form */}
        <div className="mb-10">
          <form
            onSubmit={handleSubmit}
            className="p-6 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-0">
                Share your thoughts
              </h3>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <StarIcon
                      className={`h-7 w-7 transition-colors duration-150 ${star <= (hoverRating || rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                        }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us what you thought about this product..."
              rows={4}
              required
              className="w-full px-4 py-3 mb-4 sm:mb-6 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black resize-none transition duration-200 sm:text-sm"
            />

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-2 text-base font-medium text-white shadow-sm transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        </div>

        {/* Reviews List */}
        {loading && <p className="text-center text-gray-500 py-4">Loading reviews...</p>}

        {!loading && reviews.length === 0 && (
          <div className="text-center py-10 px-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900">No reviews yet</h3>
            <p className="mt-1 text-sm text-gray-500">Be the first to share your thoughts!</p>
          </div>
        )}

        {!loading && reviews.length > 0 && (
          <div className="space-y-8">
            {reviews.map((review) => (
              <div key={review.id} className="flex space-x-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-500">
                    <span className="text-lg font-medium leading-none text-white">
                      {review.user_name.charAt(0).toUpperCase()}
                    </span>
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{review.user_name}</h4>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-5 w-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(review.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="mt-3 space-y-4 text-base text-gray-600">
                    <p>{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Load More Button */}
            {reviews.length < total && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={loadMoreReviews}
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                >
                  Load More Reviews
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
