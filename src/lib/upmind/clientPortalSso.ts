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
 * Some builds read query; others read hash.
 * Default mode is `both` so either parser can pick the token.
 * Override with NEXT_PUBLIC_UPMIND_SSO_MODE = query | hash | both
 * (legacy flag NEXT_PUBLIC_UPMIND_SSO_USE_HASH still works).
 * Path override: NEXT_PUBLIC_UPMIND_SSO_PATH (default `/login`).
 */
export function buildClientPortalSsoUrl(input: ClientPortalSsoInput): string {
  const origin = getUpmindClientPortalOrigin();
  const rawPath = process.env.NEXT_PUBLIC_UPMIND_SSO_PATH?.trim() || '/login';
  const path = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  const postLoginRedirect =
    process.env.NEXT_PUBLIC_UPMIND_SSO_REDIRECT?.trim() || '/dashboard';
  const modeFromEnv = (process.env.NEXT_PUBLIC_UPMIND_SSO_MODE || '').trim().toLowerCase();
  const legacyUseHash =
    process.env.NEXT_PUBLIC_UPMIND_SSO_USE_HASH === '1' ||
    process.env.NEXT_PUBLIC_UPMIND_SSO_USE_HASH === 'true';
  const ssoMode: 'query' | 'hash' | 'both' =
    modeFromEnv === 'query' || modeFromEnv === 'hash' || modeFromEnv === 'both'
      ? (modeFromEnv as 'query' | 'hash' | 'both')
      : legacyUseHash
        ? 'hash'
        : 'both';

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
  hp.set('redirect', postLoginRedirect);

  const base = `${origin}${path}`;

  if (ssoMode === 'hash') return `${base}#${hp.toString()}`;

  const url = new URL(base);
  hp.forEach((v, k) => url.searchParams.set(k, v));

  if (ssoMode === 'both') {
    url.hash = hp.toString();
  }

  return url.toString();
}
