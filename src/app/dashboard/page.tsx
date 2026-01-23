'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const redirectToUpmindDashboard = async () => {
      // Check if user is logged in
      const accessToken = localStorage.getItem('access_token');
      const clientId = localStorage.getItem('client_id');

      if (!accessToken || !clientId) {
        // Redirect to login if not authenticated
        router.push('/login');
        return;
      }

      try {
        // Generate SSO token and get dashboard URL
        const response = await fetch('/api/dashboard-sso', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            access_token: accessToken,
            client_id: clientId,
          }),
        });

        const data = await response.json();

        if (response.ok && data.dashboard_url) {
          // Redirect to Upmind client dashboard with SSO token
          window.location.href = data.dashboard_url;
        } else {
          // Fallback: Direct redirect if SSO fails to dashboard
          const upmindClientUrl = 'https://my.thecloudaro.com/dashboard/';
          window.location.href = `${upmindClientUrl}?access_token=${accessToken}&client_id=${clientId}`;
        }
      } catch (err) {
        console.error('Dashboard redirect error:', err);
        // Fallback: Direct redirect on error to dashboard
        const accessToken = localStorage.getItem('access_token');
        const upmindClientUrl = 'https://my.thecloudaro.com/dashboard/';
        if (accessToken) {
          window.location.href = `${upmindClientUrl}?access_token=${accessToken}&client_id=${clientId}`;
        } else {
          setError('Failed to redirect to dashboard');
          setLoading(false);
        }
      }
    };

    redirectToUpmindDashboard();
  }, [router]);

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
