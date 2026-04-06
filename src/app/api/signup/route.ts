import { NextRequest, NextResponse } from 'next/server';
import { SIGNUP_PASSWORD_RED_HINT } from '@/lib/signupPasswordPolicy';

interface UpmindRegisterResponse {
  status?: string;
  success?: boolean;
  data?: unknown;
  error?: {
    message: string;
    code?: number;
    data?: Record<string, string[]>;
  };
  message?: string;
}

/** Upmind often returns error.message "API request invalid!" — real reasons live in error.data. */
function formatUpmindSignupError(responseData: UpmindRegisterResponse): string {
  const top = responseData.error?.message || responseData.message;
  const fieldErrors = responseData.error?.data;
  if (fieldErrors && typeof fieldErrors === 'object') {
    const entries = Object.entries(fieldErrors);
    const hasPassword = entries.some(([k]) => k === 'password');

    const nonPasswordLines = entries
      .filter(([k]) => k !== 'password')
      .flatMap(([key, msgs]) =>
        Array.isArray(msgs)
          ? msgs.map((m) => `${key.replace(/_/g, ' ')}: ${m}`)
          : [`${key}: ${String(msgs)}`]
      );

    if (hasPassword) {
      const parts = [
        ...nonPasswordLines,
        ...(nonPasswordLines.length ? [''] : []),
        SIGNUP_PASSWORD_RED_HINT,
      ];
      return parts.join('\n');
    }

    const lines = entries.flatMap(([key, msgs]) =>
      Array.isArray(msgs)
        ? msgs.map((m) => `${key.replace(/_/g, ' ')}: ${m}`)
        : [`${key}: ${String(msgs)}`]
    );
    if (lines.length) return lines.join('\n');
  }
  return top || 'Signup failed';
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

    if (!response.ok || responseData.status === 'error') {
      const status =
        responseData.error?.code && Number.isFinite(Number(responseData.error.code))
          ? Number(responseData.error.code)
          : response.status || 422;
      return NextResponse.json(
        { error: formatUpmindSignupError(responseData) },
        { status: status >= 400 && status < 600 ? status : 422 }
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
