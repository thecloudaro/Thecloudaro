import { getUpmindClientPortalOrigin } from '@/lib/upmind/domainCheckoutUrl';

/** httpOnly cookie names — short TTL, same-site only. */
export const UPMIND_HANDOFF_COOKIES = {
  accessToken: 'upmind_handoff_at',
  clientId: 'upmind_handoff_cid',
  actorId: 'upmind_handoff_aid',
} as const;

/** ~4KB browser limit — stay under with margin. */
export const UPMIND_HANDOFF_MAX_TOKEN_CHARS = 3600;

export function getPortalLoginPath(): string {
  const p = process.env.UPMIND_SSO_POST_PATH?.trim() || '/login';
  return p.startsWith('/') ? p : `/${p}`;
}

export function getPortalPostLoginRedirect(): string {
  return process.env.UPMIND_SSO_POST_REDIRECT?.trim() || '/dashboard';
}

export function getPortalOrigin(): string {
  return getUpmindClientPortalOrigin();
}

export function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;');
}
