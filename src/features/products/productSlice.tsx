import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import type { Product } from '../../components/UpdateProduct';

const BASE_URL = 'https://dummyjson.com/products';

// 📥 Create a new product
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData: any, thunkAPI) => {
    try {
      // If no ID (assume it's local), assign a new unique ID
      const localData = localStorage.getItem('products');
      const localProducts = localData ? JSON.parse(localData) : [];

      const maxLocalId = localProducts.reduce(
        (max: number, p: any) => (p.id > max ? p.id : max),
        999 // starting base for local IDs
      );

      const newProduct = {
        ...productData,
        id: maxLocalId + 1,
      };

      const updatedProducts = [...localProducts, newProduct];
      localStorage.setItem('products', JSON.stringify(updatedProducts));

      return newProduct;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// Search products by query
export const searchProducts = createAsyncThunk(
// 🔍 Unified search (API + localStorage)
  'products/searchProductsUnified',
  async (query: string, thunkAPI) => {
    try {
      // 1. Fetch from API
      const apiRes = await axios.get(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
      const apiProducts = apiRes.data.products;

      // 2. Fetch from localStorage
      const localData = localStorage.getItem('products');
      const localProducts = localData ? JSON.parse(localData) : [];

      // 3. Filter local products by query
      const filteredLocal = localProducts.filter((product: any) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );

      // 4. Merge & deduplicate (based on ID)
      const merged = [...apiProducts, ...filteredLocal];
      const uniqueProducts = Array.from(
        new Map(merged.map((p: any) => [p.id, p])).values()
      );

      return uniqueProducts;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// 📤 Update an existing product
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, updates }: { id: number; updates: any }, thunkAPI) => {
    try {
      const localData = localStorage.getItem('products');
      let localProducts = localData ? JSON.parse(localData) : [];

      const index = localProducts.findIndex((p: any) => p.id === id);
      if (index !== -1) {
        localProducts[index] = { ...localProducts[index], ...updates };
      } else {
        // fallback: create the product if it doesn't exist
        localProducts.push({ id, ...updates });
      }

      saveProductsToLocalStorage(localProducts);
      return localProducts.find((p: any) => p.id === id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// 🗑 Delete a product
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: number, thunkAPI) => {
    try {
      // Remove from local products
      const localData = localStorage.getItem('products');
      let localProducts = localData ? JSON.parse(localData) : [];
      localProducts = localProducts.filter((p: any) => p.id !== id);
      saveProductsToLocalStorage(localProducts);

      // Track deleted IDs
      const deletedIdsRaw = localStorage.getItem('deletedProductIds');
      const deletedIds = deletedIdsRaw ? JSON.parse(deletedIdsRaw) : [];
      if (!deletedIds.includes(id)) {
        deletedIds.push(id);
        localStorage.setItem('deletedProductIds', JSON.stringify(deletedIds));
      }

      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// 🔧 Helper
const saveProductsToLocalStorage = (products: any[]) => {
  try {
    localStorage.setItem('products', JSON.stringify(products));
    console.log('📦 Products saved to localStorage:', products);
  } catch (err) {
    console.error('❌ Failed to save products to localStorage:', err);
  }
};

// 📦 Fetch all products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    try {
      const apiRes = await axios.get(BASE_URL);
      const localData = localStorage.getItem('products');
      const deletedRaw = localStorage.getItem('deletedProductIds');

      const localProducts = localData ? JSON.parse(localData) : [];
      const deletedIds = deletedRaw ? JSON.parse(deletedRaw) : [];

      const merged = [...apiRes.data.products, ...localProducts];
      const uniqueProducts = Array.from(
        new Map(merged.map(p => [p.id, p])).values()
      );

      // 🧹 Filter out deleted products
      const visibleProducts = uniqueProducts.filter(p => !deletedIds.includes(p.id));

      return visibleProducts;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number, thunkAPI) => {
    try {
      const localData = localStorage.getItem('products');
      const localProducts = localData ? JSON.parse(localData) : [];
      const localProduct = localProducts.find((p: any) => p.id === id);

      if (localProduct) {
        console.log('📦 Fetched from localStorage:', localProduct);
        return localProduct;
      }

      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);




// 🧩 Initial state
const initialState = {
  products: [] as any[],
  loading: false,
  error: null as string | null,
};

// 🔧 Slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
            console.log('📦 Products fetched:', action.payload);

      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchProductById.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(fetchProductById.fulfilled, (state, action) => {
  state.loading = false;
  const index = state.products.findIndex(p => p.id === action.payload.id);
  if (index !== -1) {
    state.products[index] = action.payload;
  } else {
    state.products.push(action.payload);
  }
})
.addCase(fetchProductById.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload as string;
})
 
      // Create
        .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        saveProductsToLocalStorage(state.products); 
            console.log('✅ Product created:', action.payload);

        })
    .addCase(createProduct.pending, () => {
    console.log('📤 Creating product...');
    })

    .addCase(createProduct.rejected, (_, action) => {
    console.error('❌ Failed to create product:', action.payload);
    })


      // Update
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        } else {
          state.products.push(action.payload);
        }
      })


      // Delete
.addCase(deleteProduct.fulfilled, (state, action) => {
  state.products = state.products.filter(p => p.id !== action.payload);

  const localData = localStorage.getItem('products');
  let localProducts = localData ? JSON.parse(localData) : [];
  localProducts = localProducts.filter((p: any) => p.id !== action.payload);
  saveProductsToLocalStorage(localProducts);

  console.log(`🗑 Product deleted: ID ${action.payload}`);
})
      
    // Search Products
    .addCase(searchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(searchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
          console.log('🔍 Search results:', action.payload);

    })
    .addCase(searchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
        console.error('❌ Unified search failed:', action.payload);

    })


  },
});

export default productSlice.reducer;
