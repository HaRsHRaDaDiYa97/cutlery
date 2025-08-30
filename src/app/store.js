import { configureStore } from "@reduxjs/toolkit";
import { categoryApi } from "../features/categoryApi";
import { productApi } from "../features/productApi";

export const store = configureStore({
  reducer: {
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoryApi.middleware,
      productApi.middleware,
     
    ),
});
