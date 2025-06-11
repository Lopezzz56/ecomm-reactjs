import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/LoginPage';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import Layout from './Layout';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import { setRehydrated } from './features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import CategoryPage from './components/CategoryPage';
import AddProductForm from './pages/AddProductPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRehydrated());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Public Route */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Private Routes inside Layout */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="home" element={<HomePage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="category/:categoryName" element={<CategoryPage />} />
        <Route path="add-product" element={<AddProductForm />} />

        <Route index element={<Navigate to="dashboard" />} />
      </Route>

      {/* 404 fallback */}
      <Route path="*" element={<p>404 Not Found</p>} />
    </Routes>
  );
}

export default App;
