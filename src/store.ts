// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import productReducer from './features/products/productSlice'; // Uncomment when created

const savedAuth = localStorage.getItem('auth');
const parsedAuth = savedAuth ? JSON.parse(savedAuth) : null;
const savedProducts = localStorage.getItem('products');
const parsedProducts = savedProducts ? JSON.parse(savedProducts) : [];

const preloadedState = {
  auth: {
    user: parsedAuth?.user || null,
    token: parsedAuth?.token || null,
    isAuthenticated: !!parsedAuth?.token,
    loading: false,
    error: null,
    rehydrated: false,
  },
    product: {
    products: parsedProducts,
    loading: false,
    error: null,
  }
};

console.log('🧠 Preloaded Auth State:', preloadedState);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer, 
  },
    preloadedState, // ✅ pass preloaded state here

});

// Type helpers (optional but recommended)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

