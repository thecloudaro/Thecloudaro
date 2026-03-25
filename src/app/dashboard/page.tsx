'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const DashboardPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const redirectToUpmindDashboard = async () => {
      const accessTokenFromQuery = searchParams.get('access_token');
      const clientIdFromQuery = searchParams.get('client_id');

      // Check if user is logged in (prefer query params if provided)
      const accessToken =
        accessTokenFromQuery ?? localStorage.getItem('access_token');
      const clientId =
        clientIdFromQuery ?? localStorage.getItem('client_id');

      // Persist tokens for this browser session so user won't be forced
      // back to /login on subsequent redirects.
      if (accessTokenFromQuery) {
        localStorage.setItem('access_token', accessTokenFromQuery);
      }
      if (clientIdFromQuery) {
        localStorage.setItem('client_id', clientIdFromQuery);
      }

      if (!accessToken || !clientId) {
        // Redirect to login if not authenticated
        router.push('/login');
        return;
      }

      // Direct redirect to Upmind client dashboard.
      // IMPORTANT: tokens are not always URL-safe -> encode them.
      const upmindClientUrl = 'https://my.thecloudaro.com/dashboard';
      const qs = `access_token=${encodeURIComponent(
        accessToken
      )}&client_id=${encodeURIComponent(clientId)}`;
      window.location.href = `${upmindClientUrl}/?${qs}`;
    };

    redirectToUpmindDashboard();
  }, [router, searchParams]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--customer-bg))] text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => router.push('/login')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--customer-bg))] text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-lg">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
};

export default DashboardPage;
