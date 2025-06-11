import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { JSX } from 'react';

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, rehydrated } = useSelector((state: any) => state.auth);
  // ⏳ Don't decide routing until hydration is complete
  if (!rehydrated) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" />;
}
