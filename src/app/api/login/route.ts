import { NextRequest, NextResponse } from 'next/server';

interface UpmindLoginResponse {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  client_id?: string;
  actor_id?: string;
  actor_type?: string;
  second_factor_required?: boolean;
  error?: {
    message: string;
  };
  message?: string;
}

type ResolvedClientContext = {
  clientId: string | null;
  actorId: string | null;
};

function pickString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const v = value.trim();
  return v.length ? v : null;
}

function resolveClientContextFromPayload(payload: unknown): ResolvedClientContext {
  if (!payload || typeof payload !== 'object') return { clientId: null, actorId: null };
  const o = payload as Record<string, unknown>;

  const directClientId =
    pickString(o.client_id) ??
    pickString((o.client as Record<string, unknown> | undefined)?.id) ??
    pickString(o.clientId);

  const directActorId =
    pickString(o.actor_id) ??
    pickString((o.actor as Record<string, unknown> | undefined)?.id) ??
    pickString(o.actorId) ??
    directClientId;

  return {
    clientId: directClientId ?? directActorId,
    actorId: directActorId ?? directClientId,
  };
}

async function resolveClientContextWithAccessToken(
  accessToken: string
): Promise<ResolvedClientContext> {
  const endpoints = [
    'https://api.upmind.io/api/client',
    'https://api.upmind.io/api/clients/me',
    'https://api.upmind.io/api/me',
    'https://api.upmind.io/api/auth/me',
  ];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          Origin: 'https://my.thecloudaro.com',
        },
      });

      if (!res.ok) continue;
      const body = (await res.json().catch(() => null)) as unknown;
      const resolved = resolveClientContextFromPayload(body);
      if (resolved.clientId || resolved.actorId) return resolved;
    } catch {
      // try next endpoint
    }
  }

  return { clientId: null, actorId: null };
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }

    // 🔹 Upmind OAuth login endpoint
    const response = await fetch(
      'https://api.upmind.io/oauth/access_token?lang=en-US',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'https://my.thecloudaro.com', // important for brand mapping
        },
        body: JSON.stringify({
          grant_type: 'password',                  // fixed for OAuth password grant
          client_id: process.env.UPMIND_CLIENT_ID, // Admin panel se OAuth client ID
          client_secret: process.env.UPMIND_CLIENT_SECRET, // Admin panel se OAuth client secret
          username,                                // email from form
          password,
        }),
      }
    );

    const responseText = await response.text();

    let responseData: UpmindLoginResponse = {};
    try {
      responseData = responseText ? JSON.parse(responseText) : {};
    } catch {
      return NextResponse.json(
        { message: 'Invalid response from Upmind' },
        { status: 502 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { message: responseData.error?.message || responseData.message || 'Login failed' },
        { status: response.status }
      );
    }

    let resolvedClientId = responseData.client_id ?? responseData.actor_id ?? null;
    let resolvedActorId = responseData.actor_id ?? resolvedClientId;

    // Old accounts sometimes return token without explicit client/actor IDs.
    if (!resolvedClientId && responseData.access_token) {
      const recovered = await resolveClientContextWithAccessToken(responseData.access_token);
      resolvedClientId = recovered.clientId;
      resolvedActorId = recovered.actorId;
    }

    // 🔹 Successful login
    return NextResponse.json(
      {
        access_token: responseData.access_token,
        refresh_token: responseData.refresh_token,
        expires_in: responseData.expires_in,
        client_id: resolvedClientId,
        actor_id: resolvedActorId,
        actor_type: responseData.actor_type,
        second_factor_required: responseData.second_factor_required,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error(err);
    let message = 'Server error';
    if (err instanceof Error) message = err.message;

    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}
