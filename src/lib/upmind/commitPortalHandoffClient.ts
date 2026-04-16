import { buildClientPortalSsoUrl } from '@/lib/upmind/clientPortalSso';

export type PortalHandoffPayload = {
  access_token: string;
  client_id?: string | null;
  actor_id?: string | null;
};

/**
 * Server sets short‑lived httpOnly cookies → `/portal-bridge` POSTs into Upmind.
 * If token is too large for cookies, falls back to GET SSO URL (query/hash).
 */
export async function commitPortalHandoffThenRedirect(payload: PortalHandoffPayload): Promise<void> {
  const forcePostBridge =
    process.env.NEXT_PUBLIC_UPMIND_SSO_USE_POST_BRIDGE === '1' ||
    process.env.NEXT_PUBLIC_UPMIND_SSO_USE_POST_BRIDGE === 'true';

  /**
   * Default strategy: direct SSO URL to Upmind dashboard.
   * Some branded portals ignore `/login` POST token fields and show login form again.
   * Keep old POST bridge available only when explicitly forced by env.
   */
  if (!forcePostBridge) {
    window.location.replace(
      buildClientPortalSsoUrl({
        accessToken: payload.access_token,
        clientId: payload.client_id ?? null,
        actorId: payload.actor_id ?? null,
      })
    );
    return;
  }

  const res = await fetch('/api/auth/upmind-handoff', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_token: payload.access_token,
      client_id: payload.client_id ?? undefined,
      actor_id: payload.actor_id ?? undefined,
    }),
  });

  const data = (await res.json().catch(() => ({}))) as {
    useQueryFallback?: boolean;
    error?: string;
  };

  if (res.status === 413 || data.useQueryFallback) {
    window.location.replace(
      buildClientPortalSsoUrl({
        accessToken: payload.access_token,
        clientId: payload.client_id ?? null,
        actorId: payload.actor_id ?? null,
      })
    );
    return;
  }

  if (!res.ok) {
    throw new Error(data.error || 'Could not prepare client portal sign-in.');
  }

  window.location.assign('/portal-bridge');
}
