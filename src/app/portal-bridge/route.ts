import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  UPMIND_HANDOFF_COOKIES,
  escapeHtmlAttr,
  getPortalLoginPath,
  getPortalOrigin,
  getPortalPostLoginRedirect,
} from '@/lib/upmind/portalHandoffServer';
import { buildClientPortalSsoUrl } from '@/lib/upmind/clientPortalSso';

function clearHandoffCookies(): string[] {
  const secure = process.env.NODE_ENV === 'production';
  const base = `Path=/; Max-Age=0; HttpOnly; SameSite=Lax${secure ? '; Secure' : ''}`;
  return [
    `${UPMIND_HANDOFF_COOKIES.accessToken}=; ${base}`,
    `${UPMIND_HANDOFF_COOKIES.clientId}=; ${base}`,
    `${UPMIND_HANDOFF_COOKIES.actorId}=; ${base}`,
  ];
}

/**
 * Auto‑POST to Upmind client `/login` with OAuth fields (and optional `redirect`).
 * Falls back to GET redirect with query params if cookies are missing.
 */
export async function GET(req: NextRequest) {
  const jar = await cookies();
  const rawAt = jar.get(UPMIND_HANDOFF_COOKIES.accessToken)?.value;
  const accessToken = rawAt ? decodeURIComponent(rawAt) : '';

  const clear = clearHandoffCookies();

  if (!accessToken) {
    const dest = new URL('/login', req.url);
    const res = NextResponse.redirect(dest);
    clear.forEach((c) => res.headers.append('Set-Cookie', c));
    return res;
  }

  const rawCid = jar.get(UPMIND_HANDOFF_COOKIES.clientId)?.value;
  const rawAid = jar.get(UPMIND_HANDOFF_COOKIES.actorId)?.value;
  const clientId = rawCid ? decodeURIComponent(rawCid) : '';
  const actorId = rawAid ? decodeURIComponent(rawAid) : '';

  const portalOrigin = getPortalOrigin();
  const loginPath = getPortalLoginPath();
  const postUrl = `${portalOrigin}${loginPath}`;
  const redirectAfter = getPortalPostLoginRedirect();

  const atEsc = escapeHtmlAttr(accessToken);
  const cidEsc = escapeHtmlAttr(clientId);
  const aidEsc = escapeHtmlAttr(actorId);
  const redEsc = escapeHtmlAttr(redirectAfter);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Signing you in…</title>
</head>
<body>
  <p style="font-family:system-ui,sans-serif;text-align:center;margin-top:2rem;color:#444">Opening your client area…</p>
  <form id="upmind-sso" method="post" action="${escapeHtmlAttr(postUrl)}">
    <input type="hidden" name="access_token" value="${atEsc}" />
    <input type="hidden" name="token_type" value="Bearer" />
    ${clientId ? `<input type="hidden" name="client_id" value="${cidEsc}" />` : ''}
    ${actorId ? `<input type="hidden" name="actor_id" value="${aidEsc}" />` : ''}
    <input type="hidden" name="redirect" value="${redEsc}" />
  </form>
  <script>document.getElementById("upmind-sso").submit();</script>
  <noscript>
    <p style="text-align:center"><a href="${escapeHtmlAttr(
      buildClientPortalSsoUrl({
        accessToken,
        clientId: clientId || null,
        actorId: actorId || null,
      })
    )}">Continue to client area</a></p>
  </noscript>
</body>
</html>`;

  const res = new NextResponse(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
  clear.forEach((c) => res.headers.append('Set-Cookie', c));
  return res;
}
