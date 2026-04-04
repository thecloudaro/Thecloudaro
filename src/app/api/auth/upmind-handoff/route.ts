import { NextRequest, NextResponse } from 'next/server';
import {
  UPMIND_HANDOFF_COOKIES,
  UPMIND_HANDOFF_MAX_TOKEN_CHARS,
} from '@/lib/upmind/portalHandoffServer';

/**
 * Stores short‑lived httpOnly cookies so /portal-bridge can render a same‑origin
 * auto‑POST form to Upmind client login (some portals accept body params but ignore query).
 */
function originMatchesHost(origin: string | null, host: string | null): boolean {
  if (!origin || !host) return true;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  const host = req.headers.get('host');
  if (!originMatchesHost(origin, host)) {
    return NextResponse.json({ success: false, error: 'Invalid origin' }, { status: 403 });
  }

  let body: {
    access_token?: string;
    client_id?: string;
    actor_id?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const accessToken = typeof body.access_token === 'string' ? body.access_token.trim() : '';
  if (!accessToken) {
    return NextResponse.json({ success: false, error: 'access_token required' }, { status: 400 });
  }

  if (accessToken.length > UPMIND_HANDOFF_MAX_TOKEN_CHARS) {
    return NextResponse.json(
      { success: false, error: 'TOKEN_TOO_LARGE', useQueryFallback: true },
      { status: 413 }
    );
  }

  const clientId = typeof body.client_id === 'string' ? body.client_id.trim() : '';
  const actorId = typeof body.actor_id === 'string' ? body.actor_id.trim() : '';

  const secure = process.env.NODE_ENV === 'production';
  const maxAge = 300;
  const base = `Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax${secure ? '; Secure' : ''}`;

  const res = NextResponse.json({ success: true });
  res.headers.append(
    'Set-Cookie',
    `${UPMIND_HANDOFF_COOKIES.accessToken}=${encodeURIComponent(accessToken)}; ${base}`
  );
  if (clientId) {
    res.headers.append(
      'Set-Cookie',
      `${UPMIND_HANDOFF_COOKIES.clientId}=${encodeURIComponent(clientId)}; ${base}`
    );
  }
  if (actorId) {
    res.headers.append(
      'Set-Cookie',
      `${UPMIND_HANDOFF_COOKIES.actorId}=${encodeURIComponent(actorId)}; ${base}`
    );
  }

  return res;
}
