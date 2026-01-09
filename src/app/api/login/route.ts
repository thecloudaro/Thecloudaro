import { NextRequest, NextResponse } from 'next/server';

interface UpmindLoginResponse {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  actor_id?: string;
  actor_type?: string;
  second_factor_required?: boolean;
  error?: {
    message: string;
  };
  message?: string;
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

    // 🔹 Successful login
    return NextResponse.json(
      {
        access_token: responseData.access_token,
        refresh_token: responseData.refresh_token,
        expires_in: responseData.expires_in,
        client_id: responseData.actor_id,
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
