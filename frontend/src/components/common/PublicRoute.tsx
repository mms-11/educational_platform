import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts';
import { ReactNode } from 'react';

interface PublicRouteProps {
  children: ReactNode;
}

/**
 * PublicRoute Component
 * Redirects to dashboard if user is already authenticated
 */
export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Carregando...</div>
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};
