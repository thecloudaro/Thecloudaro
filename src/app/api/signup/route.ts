import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, username } = body;

    // Basic validation
    if (!firstName || !lastName || !email || !username) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Upmind API endpoint
    const apiUrl = `${process.env.NEXT_PUBLIC_UPMIND_API_URL}/customers`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.UPMIND_API_KEY}`,
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        username,
      }),
    });

    // Read response as text first
    const text = await response.text();
    console.log('Upmind raw response:', text); // Debug log

    // Try to parse JSON safely
    let data;
    try {
      data = JSON.parse(text);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_err: unknown) {
      // Agar JSON parse nahi ho paya to error return karo
      return NextResponse.json(
        { error: 'Invalid response from Upmind API', raw: text },
        { status: response.status }
      );
    }

    if (!response.ok) {
      return NextResponse.json({ error: data?.error || 'Upmind API error', raw: text }, { status: response.status });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
