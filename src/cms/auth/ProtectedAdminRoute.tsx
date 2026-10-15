import React from 'react';
import { useAuth } from './AuthContext';
import { AdminLoginScreen } from './AdminLoginScreen';
import { CmsStudio } from '../components/CmsStudio';

interface ProtectedAdminRouteProps {
  onNavigateHome: () => void;
}

export const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ onNavigateHome }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="w-full flex-1 min-h-screen flex items-center justify-center bg-[#F4F8FB]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-3 border-[#0EA5E9] border-t-transparent animate-spin" />
          <span className="text-xs font-bold text-[#1E3A5F]">Verifying Admin Session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLoginScreen onReturnToHome={onNavigateHome} />;
  }

  return <CmsStudio onExitAdmin={onNavigateHome} />;
};
