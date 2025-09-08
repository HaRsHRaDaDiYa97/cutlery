import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "../api";

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
  tagTypes: ["Wishlist"],
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: (userId) => `wishlist.php?user_id=${Number(userId)}`,
      providesTags: ["Wishlist"],
    }),

    addToWishlist: builder.mutation({
      query: ({ user_id, product_id }) => ({
        url: "wishlist.php",
        method: "POST",
        body: { user_id: Number(user_id), product_id: Number(product_id) },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Wishlist"],
    }),

    removeFromWishlist: builder.mutation({
      query: ({ user_id, product_id }) => ({
        url: `wishlist.php?user_id=${Number(user_id)}&product_id=${Number(product_id)}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;
