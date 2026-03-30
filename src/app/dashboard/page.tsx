'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const redirectToUpmindDashboard = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const accessTokenFromQuery = urlParams.get('access_token');
      const clientIdFromQuery = urlParams.get('client_id');
      const actorIdFromQuery = urlParams.get('actor_id');

      // Check if user is logged in (prefer query params if provided)
      const accessToken =
        accessTokenFromQuery ?? localStorage.getItem('access_token');
      const clientId =
        clientIdFromQuery ??
        actorIdFromQuery ??
        localStorage.getItem('client_id') ??
        localStorage.getItem('actor_id');

      // Persist tokens for this browser session so user won't be forced
      // back to /login on subsequent redirects.
      if (accessTokenFromQuery) {
        localStorage.setItem('access_token', accessTokenFromQuery);
      }
      if (clientIdFromQuery) {
        localStorage.setItem('client_id', clientIdFromQuery);
      }
      if (actorIdFromQuery) {
        localStorage.setItem('actor_id', actorIdFromQuery);
      }
      if (clientId) {
        localStorage.setItem('client_id', clientId);
      }

      if (!accessToken) {
        // Redirect to login if not authenticated
        router.push('/login');
        return;
      }

      // Direct redirect to Upmind client dashboard.
      // IMPORTANT: tokens are not always URL-safe -> encode them.
      const upmindClientUrl = 'https://my.thecloudaro.com/dashboard';
      const params = new URLSearchParams();
      params.set('access_token', accessToken);
      if (clientId) {
        params.set('client_id', clientId);
        // Compatibility fallback for setups expecting actor_id naming.
        params.set('actor_id', clientId);
      }
      const qs = params.toString();
      // Replace current history entry so browser back returns to website
      // instead of this bridge page.
      window.location.replace(`${upmindClientUrl}/?${qs}`);
    };

    redirectToUpmindDashboard();
  }, [router]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[hsl(var(--customer-bg))] text-[hsl(var(--customer-text))]">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Error</h1>
          <p className="text-[rgb(var(--dashboard-error-text))]">{error}</p>
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="mt-4 rounded-lg px-4 py-2 text-[rgb(var(--dashboard-cta-text))] transition-colors bg-[rgb(var(--dashboard-cta-bg))] hover:bg-[rgb(var(--dashboard-cta-hover))]"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[hsl(var(--customer-bg))] text-[hsl(var(--customer-text))]">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-[rgb(var(--dashboard-spinner-border))]" />
      </div>
    </div>
  );
};

export default DashboardPage;
