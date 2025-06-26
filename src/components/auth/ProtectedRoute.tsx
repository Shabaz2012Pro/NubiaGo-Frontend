import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import LoadingSpinner from '../molecules/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  requiredRole?: string;
  fallback?: string;
  loadingComponent?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireAdmin = false,
  requiredRole,
  fallback = '/auth',
  loadingComponent
}) => {
  const { user, isLoading, error } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return loadingComponent || <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-state">Error: {error}</div>;
  }

  if (requireAuth && !user) {
    return <Navigate to={fallback} state={{ from: location }} replace />;
  }

  if (requireAdmin && (!user || user.role !== 'admin')) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (requiredRole && (!user || user.role !== requiredRole)) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;