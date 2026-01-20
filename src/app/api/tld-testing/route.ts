import { NextRequest, NextResponse } from 'next/server';

/**
 * Test endpoint for TLD (Top Level Domain) pricing
 * Supports both GET and POST requests
 * GET: Uses query parameters in URL
 * POST: Sends data in request body
 */
export async function GET(req: NextRequest) {
  try {
    const apiToken = process.env.UPMIND_API_TOKEN;

    if (!apiToken) {
      return NextResponse.json({
        error: 'UPMIND_API_TOKEN not configured',
      }, { status: 500 });
    }

    // TLD endpoint with query parameters
    const tldEndpoint = 'https://api.upmind.io/api/admin/modules/web_hosting/domains/tlds?tld=.org&late_renew_days=10&redemption_period_days=10&prices.price=15&prices.billing_cycle_months=12&max_reg_period_years=5&prices.currency_id=d15196e0-2e51-36d4-2ec9-429807875d30&registrar=realtime-register&prices.billing_cycle_years=1';

    console.log('🧪 Testing TLD endpoint (GET):', tldEndpoint);

    try {
      const response = await fetch(tldEndpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiToken}`,
        },
      });

      const status = response.status;
      let data = null;
      let errorText = '';

      if (response.ok) {
        try {
          data = await response.json();
          console.log('✅ TLD data received successfully');
        } catch (parseError) {
          errorText = await response.text();
          console.error('❌ JSON parse error:', parseError);
        }
      } else {
        errorText = await response.text();
        console.error(`❌ API error (${status}):`, errorText.substring(0, 500));
      }

      return NextResponse.json({
        config: {
          hasToken: !!apiToken,
          endpoint: tldEndpoint,
          method: 'GET',
        },
        response: {
          status,
          success: response.ok,
          hasData: !!data,
          error: errorText ? errorText.substring(0, 500) : null,
        },
        data: data, // Raw data from API
      });
    } catch (error) {
      console.error('❌ Fetch error:', error);
      return NextResponse.json({
        config: {
          hasToken: !!apiToken,
          endpoint: tldEndpoint,
        },
        error: error instanceof Error ? error.message : 'Unknown error',
        errorDetails: error instanceof Error ? error.stack : undefined,
      }, { status: 500 });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('❌ Route error:', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * POST request handler for TLD endpoint
 * Sends data in request body instead of query parameters
 */
export async function POST(req: NextRequest) {
  try {
    const apiToken = process.env.UPMIND_API_TOKEN;

    if (!apiToken) {
      return NextResponse.json({
        error: 'UPMIND_API_TOKEN not configured',
      }, { status: 500 });
    }

    // Base endpoint (without query parameters)
    const tldEndpoint = 'https://api.upmind.io/api/admin/modules/web_hosting/domains/tlds';

    // Get data from request body
    let requestBody;
    try {
      requestBody = await req.json();
    } catch {
      return NextResponse.json({
        error: 'Invalid JSON in request body',
      }, { status: 400 });
    }

    // Check if requestBody has single TLD or multiple TLDs (bulk)
    const isBulkRequest = Array.isArray(requestBody.tlds) || Array.isArray(requestBody);
    
    // If single TLD object, convert to array for consistent processing
    let tldsArray = [];
    if (isBulkRequest) {
      tldsArray = Array.isArray(requestBody.tlds) ? requestBody.tlds : requestBody;
    } else {
      // Single TLD request - wrap in array
      tldsArray = [requestBody];
    }

    console.log('🧪 Testing TLD endpoint (POST):', tldEndpoint);
    console.log(`📦 Processing ${tldsArray.length} TLD(s)`);

    // Process all TLDs (bulk or single)
    const results = await Promise.all(
      tldsArray.map(async (tldData: any) => {
        // Extract TLD value (could be string or object)
        const tld = typeof tldData === 'string' ? tldData : (tldData.tld || tldData);
        
        // Prepare request body for this TLD
        const tldRequestBody = typeof tldData === 'string' ? {
          tld: tldData,
          late_renew_days: requestBody.late_renew_days || 10,
          redemption_period_days: requestBody.redemption_period_days || 10,
          prices: {
            price: requestBody.prices?.price || 15,
            billing_cycle_months: requestBody.prices?.billing_cycle_months || 12,
            currency_id: requestBody.prices?.currency_id || 'd15196e0-2e51-36d4-2ec9-429807875d30',
            billing_cycle_years: requestBody.prices?.billing_cycle_years || 1,
            pricelist_id: requestBody.prices?.pricelist_id || requestBody.pricelist_id, // Add pricelist_id
          },
          max_reg_period_years: requestBody.max_reg_period_years || 5,
          registrar: requestBody.registrar || 'realtime-register',
        } : {
          ...tldData,
          // Ensure prices object has pricelist_id
          prices: {
            ...tldData.prices,
            pricelist_id: tldData.prices?.pricelist_id || tldData.pricelist_id || requestBody.prices?.pricelist_id || requestBody.pricelist_id,
          },
        };

        try {
          const response = await fetch(tldEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${apiToken}`,
            },
            body: JSON.stringify(tldRequestBody),
          });

          const status = response.status;
          let data = null;
          let errorText = '';

          if (response.ok) {
            try {
              data = await response.json();
              console.log(`✅ TLD ${tld} added successfully`);
            } catch (parseError) {
              errorText = await response.text();
              console.error(`❌ JSON parse error for ${tld}:`, parseError);
            }
          } else {
            errorText = await response.text();
            console.error(`❌ API error for ${tld} (${status}):`, errorText.substring(0, 200));
          }

          return {
            tld,
            status,
            success: response.ok,
            data,
            error: errorText ? errorText.substring(0, 500) : null,
            requestBody: tldRequestBody,
          };
        } catch (error) {
          return {
            tld,
            status: 0,
            success: false,
            data: null,
            error: error instanceof Error ? error.message : 'Unknown error',
            requestBody: tldRequestBody,
          };
        }
      })
    );

    // Summary of results
    const successCount = results.filter(r => r.success).length;
    const failedCount = results.filter(r => !r.success).length;

    console.log(`📊 Bulk TLD processing complete: ${successCount} successful, ${failedCount} failed`);

    return NextResponse.json({
      config: {
        hasToken: !!apiToken,
        endpoint: tldEndpoint,
        method: 'POST',
        isBulkRequest,
        totalTlds: tldsArray.length,
      },
      summary: {
        total: tldsArray.length,
        successful: successCount,
        failed: failedCount,
      },
      results: results, // Array of results for each TLD
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('❌ Route error:', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
  