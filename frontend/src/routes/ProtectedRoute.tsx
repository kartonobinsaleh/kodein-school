import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const location = useLocation(); // Force re-check on every navigation
  const { isAuthenticated, user, logout } = useAuthStore();
  const token = localStorage.getItem('token');

  // If session mismatch (store says logged in but token is gone)
  // we must force logout to clear the store and avoid redirect loops
  if (isAuthenticated && !token) {
    logout();
    return <Navigate to="/login" replace />;
  }

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
