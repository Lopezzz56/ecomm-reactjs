import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { JSX } from 'react';

export default function PublicRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, rehydrated } = useSelector((state: any) => state.auth);

  if (!rehydrated) return <div>Loading...</div>;
  return isAuthenticated ? <Navigate to="/home" /> : children;
}
