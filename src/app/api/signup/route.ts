import { NextRequest, NextResponse } from 'next/server';

interface UpmindRegisterResponse {
  success?: boolean;
  data?: any; // The structure of 'data' is not clear from the code, so leaving as any for now.
  error?: {
    message: string;
  };
  message?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { firstname, lastname, email, password, password_confirmation } = await req.json();

    // 🔐 Validate required fields
    if (!firstname || !lastname || !email || !password || !password_confirmation) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 422 }
      );
    }

    // ✅ Upmind public client register endpoint
    const response = await fetch(
      'https://api.upmind.io/api/clients/register?lang=en-US',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'https://my.thecloudaro.com', // important for brand mapping
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          password_confirmation,
        }),
      }
    );

    const responseText = await response.text();

    let responseData: UpmindRegisterResponse = {};
    try {
      responseData = responseText ? JSON.parse(responseText) : {};
    } catch {
      return NextResponse.json(
        { error: 'Invalid response from Upmind' },
        { status: 502 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: responseData.error?.message || responseData.message || 'Signup failed' },
        { status: response.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: responseData,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    let message = 'Server error';
    if (err instanceof Error) message = err.message;

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
