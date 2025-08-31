// src/features/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/cutlery-backend/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "signup.php",
        method: "POST",
        body: { action: "signup", ...data },
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "login.php",
        method: "POST",
        body: { action: "login", ...data },
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "verify_otp.php",
        method: "POST",
        body: { action: "verifyOtp", ...data },
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: "auth.php?action=profile",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useVerifyOtpMutation,
  useGetProfileQuery,
} = authApi;
