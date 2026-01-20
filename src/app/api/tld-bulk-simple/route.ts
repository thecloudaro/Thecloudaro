import { NextRequest, NextResponse } from 'next/server';

/**
 * Simple Bulk TLD Upload
 * Just send array of TLD strings, everything else is default
 * Example: { "tlds": [".org", ".com", ".net"], "pricelist_id": "your-id", "currency_id": "your-currency-id" }
 */
export async function POST(req: NextRequest) {
  try {
    const apiToken = process.env.UPMIND_API_TOKEN;

    if (!apiToken) {
      return NextResponse.json({
        error: 'UPMIND_API_TOKEN not configured',
      }, { status: 500 });
    }

    const body = await req.json();
    
    // Simple format: just tlds array and pricelist_id
    const tlds = body.tlds || [];
    const pricelistId = body.pricelist_id || '';
    const currencyId = body.currency_id || 'd15196e0-2e51-36d4-2ec9-429807875d30';

    if (tlds.length === 0) {
      return NextResponse.json({
        error: 'Please provide tlds array. Example: { "tlds": [".org", ".com"], "pricelist_id": "your-id" }',
      }, { status: 400 });
    }

    if (!pricelistId) {
      return NextResponse.json({
        error: 'pricelist_id is required. Example: { "tlds": [".org"], "pricelist_id": "your-pricelist-id" }',
      }, { status: 400 });
    }

    const tldEndpoint = 'https://api.upmind.io/api/admin/modules/web_hosting/domains/tlds';

    // Default settings
    const defaultRequest = {
      late_renew_days: 10,
      redemption_period_days: 10,
      prices: {
        price: 15,
        billing_cycle_months: 12,
        currency_id: currencyId,
        billing_cycle_years: 1,
        pricelist_id: {
          pricelist_id: pricelistId,
          currency_id: currencyId,
        },
      },
      max_reg_period_years: 5,
      registrar: 'realtime-register',
    };

    console.log(`📦 Processing ${tlds.length} TLD(s)`);

    // Process in batches of 10
    const batchSize = 10;
    const results: any[] = [];

    for (let i = 0; i < tlds.length; i += batchSize) {
      const batch = tlds.slice(i, i + batchSize);
      console.log(`🔄 Batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(tlds.length / batchSize)}`);

      const batchResults = await Promise.all(
        batch.map(async (tld: string) => {
          const tldFormatted = tld.startsWith('.') ? tld : `.${tld}`;
          const requestBody = {
            ...defaultRequest,
            tld: tldFormatted,
          };

          try {
            const response = await fetch(tldEndpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${apiToken}`,
              },
              body: JSON.stringify(requestBody),
            });

            const status = response.status;
            let data = null;
            let errorText = '';

            if (response.ok) {
              try {
                data = await response.json();
              } catch {
                errorText = await response.text();
              }
            } else {
              errorText = await response.text();
            }

            return {
              tld: tldFormatted,
              status,
              success: response.ok,
              error: errorText ? errorText.substring(0, 200) : null,
            };
          } catch (error) {
            return {
              tld: tldFormatted,
              status: 0,
              success: false,
              error: error instanceof Error ? error.message : 'Unknown error',
            };
          }
        })
      );

      results.push(...batchResults);
      
      // Delay between batches
      if (i + batchSize < tlds.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    const successCount = results.filter(r => r.success).length;
    const failedCount = results.filter(r => !r.success).length;

    return NextResponse.json({
      summary: {
        total: tlds.length,
        successful: successCount,
        failed: failedCount,
      },
      results: results,
      failed: results.filter(r => !r.success).map(r => r.tld),
    });
  } catch (err: unknown) {
    return NextResponse.json({
      error: err instanceof Error ? err.message : 'Unknown error',
    }, { status: 500 });
  }
}
