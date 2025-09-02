import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "../api";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "get_products.php",
            providesTags: ["Product"],
        }),
        getProduct: builder.query({
            query: (id) => `get_product.php?id=${id}`,
            providesTags: ["Product"],
        }),

        getProductsByIds: builder.query({
            query: (ids) => `get_products_by_ids.php?ids=${ids.join(",")}`,
            providesTags: ["Product"],
        }),


        getProductsByCategorySlug: builder.query({
            query: (slug) => `category_slug.php?category_slug=${slug}`,
            providesTags: ["Product"],
        }),
        addProduct: builder.mutation({
            query: (formData) => ({
                url: "add_product.php",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Product"],
        }),
        updateProduct: builder.mutation({
            query: (formData) => ({
                url: "update_product.php", // send directly, no ?id=...
                method: "POST",
                body: formData, // FormData must include id
            }),
            invalidatesTags: ["Product"],
        }),


        deleteProduct: builder.mutation({
            query: (id) => ({
                url: "delete_product.php",
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            }),
            invalidatesTags: ["Product"],
        }),

    }),
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useGetProductsByCategorySlugQuery, // ✅ hook added
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductsByIdsQuery,
} = productApi;
