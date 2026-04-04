import { getUpmindClientPortalOrigin } from '@/lib/upmind/domainCheckoutUrl';

export type LoginTokensPayload = {
  access_token: string;
  client_id?: string | null;
  actor_id?: string | null;
};

/** Query string for this site’s `/dashboard` bridge (only defined params). */
export function buildWebsiteDashboardBridgeQuery(data: LoginTokensPayload): string {
  const p = new URLSearchParams();
  p.set('access_token', data.access_token);
  if (data.client_id) p.set('client_id', data.client_id);
  if (data.actor_id) p.set('actor_id', data.actor_id);
  return p.toString();
}

export type ClientPortalSsoInput = {
  accessToken: string;
  clientId?: string | null;
  actorId?: string | null;
};

/**
 * Full URL to open the Upmind client area with OAuth-style params.
 * Some builds read query; others read the hash — toggle with NEXT_PUBLIC_UPMIND_SSO_USE_HASH=true.
 * Path override: NEXT_PUBLIC_UPMIND_SSO_PATH (default `/dashboard`).
 */
export function buildClientPortalSsoUrl(input: ClientPortalSsoInput): string {
  const origin = getUpmindClientPortalOrigin();
  const rawPath = process.env.NEXT_PUBLIC_UPMIND_SSO_PATH?.trim() || '/dashboard';
  const path = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  const useHash =
    process.env.NEXT_PUBLIC_UPMIND_SSO_USE_HASH === '1' ||
    process.env.NEXT_PUBLIC_UPMIND_SSO_USE_HASH === 'true';

  const hp = new URLSearchParams();
  hp.set('access_token', input.accessToken);
  hp.set('token_type', 'Bearer');
  const cid = input.clientId?.trim();
  const aid = (input.actorId?.trim() || cid) ?? '';
  if (cid) {
    hp.set('client_id', cid);
  }
  if (aid) {
    hp.set('actor_id', aid);
  }

  const base = `${origin}${path}`;
  if (useHash) {
    return `${base}#${hp.toString()}`;
  }
  const url = new URL(base);
  hp.forEach((v, k) => url.searchParams.set(k, v));
  return url.toString();
}
