import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// NOTE: Using the Resend sandbox recipient email that your account allows.
// If you later verify your own domain in Resend, you can change this.
const FEATURE_REQUEST_TO_EMAIL = "thecloudaro3@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, email, name } = body as {
      title?: string;
      description?: string;
      email?: string;
      name?: string;
    };

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Email service not configured. Add RESEND_API_KEY to environment." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const subject = title
      ? `Feature Request: ${String(title).slice(0, 60)}`
      : "New Feature Request";
    const html = `
      <h2>New Feature Request</h2>
      <p><strong>From:</strong> ${name ? `${String(name)} ` : ""}${email ? `&lt;${String(email)}&gt;` : "—"}</p>
      ${email ? `<p><strong>Reply to:</strong> ${String(email)}</p>` : ""}
      ${title ? `<p><strong>Title:</strong> ${String(title)}</p>` : ""}
      <p><strong>Description:</strong></p>
      <pre style="white-space: pre-wrap; font-family: inherit;">${description ? String(description) : "—"}</pre>
    `;

    const { data, error } = await resend.emails.send({
      from: "Feature Requests <onboarding@resend.dev>",
      to: FEATURE_REQUEST_TO_EMAIL,
      replyTo: email || undefined,
      subject,
      html,
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send feature request.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
