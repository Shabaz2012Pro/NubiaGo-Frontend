import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import LoadingScreen from '../molecules/LoadingScreen';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in but not admin
    if (isAuthenticated && user && user.role !== 'admin') {
      // Log the unauthorized access attempt
      console.warn('Unauthorized admin access attempt:', user.email);
    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return <LoadingScreen isLoading={true} text="Verifying credentials..." />;
  }

  if (!isAuthenticated || !user) {
    // Redirect to admin login
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (user.role !== 'admin') {
    // Redirect to home if user is not an admin
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;