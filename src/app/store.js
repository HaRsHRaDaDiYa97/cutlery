// src/app/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { categoryApi } from "../features/categoryApi";
import { productApi } from "../features/productApi";
import { authApi } from "../features/authApi";
import { wishlistApi } from "../features/wishlistApi";
import authReducer from "./slice/authSlice";

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // ✅ only persist auth state
};

const rootReducer = combineReducers({
  [categoryApi.reducerPath]: categoryApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [wishlistApi.reducerPath]: wishlistApi.reducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist needs this off
    }).concat(
      categoryApi.middleware,
      productApi.middleware,
      wishlistApi.middleware,
      authApi.middleware
    ),
});

export const persistor = persistStore(store);
