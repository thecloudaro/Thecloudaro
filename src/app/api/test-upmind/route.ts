import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_UPMIND_BASE_URL}/admin/clients`,
      {
        headers: {
          Authorization: `Bearer ${process.env.UPMIND_API_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch Upmind data" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: unknown) {
    let message = 'Server error';
    if (err instanceof Error) message = err.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
