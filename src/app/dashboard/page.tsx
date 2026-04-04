'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { commitPortalHandoffThenRedirect } from '@/lib/upmind/commitPortalHandoffClient';

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

      const accessToken =
        accessTokenFromQuery ?? localStorage.getItem('access_token');
      const storedClientId = localStorage.getItem('client_id');
      const storedActorId = localStorage.getItem('actor_id');

      const clientId =
        clientIdFromQuery ?? storedClientId ?? actorIdFromQuery ?? storedActorId;
      const actorId =
        actorIdFromQuery ?? storedActorId ?? clientIdFromQuery ?? storedClientId ?? clientId;

      if (accessTokenFromQuery) {
        localStorage.setItem('access_token', accessTokenFromQuery);
      }
      if (clientIdFromQuery) {
        localStorage.setItem('client_id', clientIdFromQuery);
      }
      if (actorIdFromQuery) {
        localStorage.setItem('actor_id', actorIdFromQuery);
      }
      if (clientId && !storedClientId && !clientIdFromQuery) {
        localStorage.setItem('client_id', clientId);
      }

      if (!accessToken) {
        router.push('/login');
        return;
      }

      try {
        await commitPortalHandoffThenRedirect({
          access_token: accessToken,
          client_id: clientId || null,
          actor_id: actorId || null,
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Redirect failed');
        setLoading(false);
      }
    };

    void redirectToUpmindDashboard();
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
