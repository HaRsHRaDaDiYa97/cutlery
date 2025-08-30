import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "../api";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
    tagTypes: ["Category"],
    endpoints: (builder) => ({

        getCategories: builder.query({
            query: () => "get_categories.php",
            providesTags: ["Category"],
        }),

        addCategory: builder.mutation({
            query: (formData) => ({
                url: "save_category.php",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Category"],
        }),


        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `delete_category.php?id=${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Category"],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApi;
