import { NextRequest, NextResponse } from 'next/server';

/**
 * Generate SSO token for Upmind client dashboard
 * This endpoint creates an SSO token that allows the user to access their Upmind client dashboard
 */
export async function POST(req: NextRequest) {
  try {
    const { access_token, client_id } = await req.json();

    if (!access_token || !client_id) {
      return NextResponse.json(
        { error: 'Access token and client ID are required' },
        { status: 400 }
      );
    }

    // Upmind client dashboard URL - redirect to /dashboard
    const upmindClientUrl = 'https://my.thecloudaro.com/dashboard';

    // Try to generate SSO token using Upmind API
    // Upmind typically has an SSO endpoint that accepts access_token
    try {
      // Option 1: Call Upmind SSO endpoint (if available)
      // This is the typical Upmind SSO flow
      const ssoResponse = await fetch(
        'https://api.upmind.io/api/clients/sso?lang=en-US',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${access_token}`,
            'Origin': 'https://my.thecloudaro.com',
          },
          body: JSON.stringify({
            client_id: client_id,
          }),
        }
      );

      if (ssoResponse.ok) {
        const ssoData = await ssoResponse.json();
        
        // If SSO token is returned, use it
        if (ssoData.sso_token || ssoData.token) {
          const ssoToken = ssoData.sso_token || ssoData.token;
          return NextResponse.json({
            success: true,
            dashboard_url: `${upmindClientUrl}?sso_token=${ssoToken}`,
            sso_token: ssoToken,
          });
        }
      }
    } catch (ssoError) {
      console.log('SSO endpoint not available, using direct redirect');
    }

    // Option 2: If SSO endpoint doesn't exist, redirect with access token
    // Some Upmind setups allow passing token as query parameter
    return NextResponse.json({
      success: true,
      dashboard_url: `${upmindClientUrl}?access_token=${access_token}`,
      access_token: access_token,
    });
  } catch (err: unknown) {
    console.error('Dashboard SSO error:', err);
    let message = 'Server error';
    if (err instanceof Error) message = err.message;

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
