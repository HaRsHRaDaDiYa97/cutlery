// src/features/reviewApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "../api"; // Example: "http://localhost/cutlery-backend/api"

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    // Add Review
    addReview: builder.mutation({
      query: (reviewData) => ({
        url: "review.php",
        method: "POST",
        body: { action: "add", ...reviewData },
      }),
      invalidatesTags: (result, error, { product_id }) => [
        { type: "Reviews", id: product_id },
      ],
    }),


  deleteReview: builder.mutation({
      query: (review_id) => ({
        url: "review.php",
        method: "POST",
        body: { action: "delete", review_id },
      }),
      invalidatesTags: ["Reviews"],
    }),

    // Get Product Reviews
    getProductReviews: builder.query({
      query: (productId) =>
        `review.php?action=product&product_id=${productId}`,
      providesTags: (result, error, productId) => [
        { type: "Reviews", id: productId },
      ],
    }),

    // Get All Reviews (Admin)
    getAllReviews: builder.query({
      query: () => "review.php?action=all",
      providesTags: ["Reviews"],
    }),
  }),
});

export const {
  useAddReviewMutation,
  useDeleteReviewMutation,
  useGetProductReviewsQuery,
  useGetAllReviewsQuery,
} = reviewApi;
