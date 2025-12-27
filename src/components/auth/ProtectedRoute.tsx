import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";

/**
 * Protected Route Component
 * 
 * Wraps routes that require authentication and/or specific roles.
 * 
 * SECURITY NOTE:
 * This component provides client-side route protection for UX purposes.
 * All protected data and actions MUST be secured server-side.
 * Never rely solely on client-side route protection for security.
 * 
 * Usage:
 * <Route path="/admin" element={
 *   <ProtectedRoute requiredRoles={["owner", "manager", "staff"]}>
 *     <AdminLayout />
 *   </ProtectedRoute>
 * } />
 */

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles,
  redirectTo = "/auth",
}) => {
  const { isAuthenticated, isLoading, hasRole } = useAuth();
  const location = useLocation();

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Save the attempted URL for redirect after login
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role requirements
  if (requiredRoles && requiredRoles.length > 0) {
    if (!hasRole(requiredRoles)) {
      // User is authenticated but doesn't have required role
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <h1 className="font-display text-3xl font-medium mb-4">Access Denied</h1>
            <p className="text-muted-foreground mb-6">
              You don't have permission to access this area.
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground text-sm font-medium tracking-wider hover:bg-primary/90 transition-colors"
            >
              Return Home
            </a>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};

/**
 * Hook for checking if current route requires auth
 * Useful for components that need conditional rendering based on route protection
 */
export const useRequireAuth = (requiredRoles?: UserRole[]): {
  isAuthorized: boolean;
  isLoading: boolean;
} => {
  const { isAuthenticated, isLoading, hasRole } = useAuth();

  if (isLoading) {
    return { isAuthorized: false, isLoading: true };
  }

  if (!isAuthenticated) {
    return { isAuthorized: false, isLoading: false };
  }

  if (requiredRoles && requiredRoles.length > 0) {
    return { isAuthorized: hasRole(requiredRoles), isLoading: false };
  }

  return { isAuthorized: true, isLoading: false };
};
