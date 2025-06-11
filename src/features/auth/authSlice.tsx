import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 📦 Async thunk for logging in
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
      });
      console.log('🔁 Response from API:', response.data);

      // ✅ DummyJSON returns a token if login is successful
      return response.data;
    } catch (error: any) {
    console.error('❌ Login error:', error);

      // ❌ Handle error — return custom message or error.response.data
      return thunkAPI.rejectWithValue('Invalid username or password');
    }
  }
);

// 🧩 Initial state for auth
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null as string | null,
  rehydrated: false,
};

// 🧠 Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('auth'); // 🧹 clear storage
    },
    setRehydrated: (state) => {
    state.rehydrated = true;
  }
  },
  extraReducers: (builder) => {
    builder
      // 🟡 Login - pending
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // ✅ Login - fulfilled
.addCase(loginUser.fulfilled, (state, action) => {
  state.loading = false;
  state.user = action.payload;
  state.token = action.payload.accessToken;
  state.isAuthenticated = true;

  console.log('✅ Login successful - payload:', action.payload);

  const authData = {
    user: action.payload,
    token: action.payload.accessToken,
  };

  console.log('📦 Saving to localStorage:', authData);
  localStorage.setItem('auth', JSON.stringify(authData));
})

      // ❌ Login - rejected
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, setRehydrated } = authSlice.actions;
export default authSlice.reducer;
