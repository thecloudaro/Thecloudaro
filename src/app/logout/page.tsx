'use client';

import { useEffect } from 'react';

const LogoutPage = () => {
  useEffect(() => {
    // Clear all authentication tokens from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('client_id');

      // Redirect to homepage - use window.location for reliable cross-domain redirect
      window.location.href = '/';
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--customer-bg))] text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-lg">Logging out...</p>
      </div>
    </div>
  );
};

export default LogoutPage;
