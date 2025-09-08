// // src/features/cartApi.js
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const cartApi = createApi({
//   reducerPath: 'cartApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost/cutlery-backend/api/',
//     prepareHeaders: (headers, { getState }) => {
//       // 🔑 if you use JWT/session, attach it here
//       const token = getState()?.auth?.token;
//       if (token) headers.set('Authorization', `Bearer ${token}`);
//       return headers;
//     },
//   }),
//   tagTypes: ['Cart'],
//   endpoints: (builder) => ({
//     // ------- GET CART -------
//     getCart: builder.query({
//       query: (userId) => `cart.php?user_id=${userId}`,
//       providesTags: (result) => [{ type: 'Cart', id: 'LIST' }],
//     }),

//     // ------- ADD ITEM -------
//     addToCart: builder.mutation({
//       query: ({ user_id, product_id, quantity = 1 }) => ({
//         url: 'cart.php',
//         method: 'POST',
//         body: { user_id, product_id, quantity },
//       }),
//       invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
//     }),

//     // ------- UPDATE ITEM -------
//     updateCartItem: builder.mutation({
//       query: ({ user_id, product_id, quantity }) => ({
//         url: 'cart.php',
//         method: 'PATCH',
//         body: { user_id, product_id, quantity },
//       }),
//       invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
//     }),

//     // ------- REMOVE ITEM -------
//     removeFromCart: builder.mutation({
//       query: ({ user_id, product_id, cart_id }) => ({
//         url: 'cart.php',
//         method: 'DELETE',
//         body: { user_id, product_id, cart_id }, // backend accepts either cart_id OR product_id
//       }),
//       invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
//     }),






    
//   }),
// });

// export const {
//   useGetCartQuery,
//   useAddToCartMutation,
//   useUpdateCartItemMutation,
//   useRemoveFromCartMutation,
// } = cartApi;







// src/features/cartApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost/cutlery-backend/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    // ------- GET CART -------
    getCart: builder.query({
      query: (userId) => `cart.php?user_id=${userId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.items.map((item) => ({ type: 'Cart', id: item.id })),
              { type: 'Cart', id: 'LIST' },
            ]
          : [{ type: 'Cart', id: 'LIST' }],
    }),

    // ------- ADD ITEM -------
    addToCart: builder.mutation({
      query: ({ user_id, product_id, quantity = 1 }) => ({
        url: 'cart.php',
        method: 'POST',
        body: { user_id, product_id, quantity },
      }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
    }),

    // ------- UPDATE ITEM -------
    updateCartItem: builder.mutation({
      query: ({ user_id, product_id, quantity }) => ({
        url: 'cart.php',
        method: 'PATCH',
        body: { user_id, product_id, quantity },
      }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
    }),

    // ------- REMOVE ITEM -------
    removeFromCart: builder.mutation({
      query: ({ user_id, product_id, cart_id }) => ({
        url: 'cart.php',
        method: 'DELETE',
        body: { user_id, product_id, cart_id },
      }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
} = cartApi;
