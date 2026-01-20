import { NextRequest, NextResponse } from 'next/server';

/**
 * Helper endpoint to find pricelist_id
 * Tests multiple Upmind API endpoints to find pricelist information
 */
export async function GET(req: NextRequest) {
  try {
    const apiToken = process.env.UPMIND_API_TOKEN;

    if (!apiToken) {
      return NextResponse.json({
        error: 'UPMIND_API_TOKEN not configured',
      }, { status: 500 });
    }

    const endpoints = [
      'https://api.upmind.io/api/admin/pricelists',
      'https://api.upmind.io/api/admin/price-lists',
      'https://api.upmind.io/api/admin/pricing/pricelists',
      'https://api.upmind.io/api/admin/products?with=prices', // To check if pricelist_id is in products
    ];

    console.log('🔍 Searching for pricelist_id...');

    const results = await Promise.all(
      endpoints.map(async (endpoint) => {
        try {
          const response = await fetch(endpoint, {
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
            } catch {
              errorText = await response.text();
            }
          } else {
            errorText = await response.text();
          }

          return {
            endpoint,
            status,
            success: response.ok,
            hasData: !!data,
            dataKeys: data ? (Array.isArray(data) ? `array[${data.length}]` : Object.keys(data).slice(0, 10)) : [],
            dataSample: data ? JSON.stringify(data, null, 2).substring(0, 1000) : null,
            error: errorText ? errorText.substring(0, 200) : null,
          };
        } catch (error) {
          return {
            endpoint,
            status: 0,
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          };
        }
      })
    );

    return NextResponse.json({
      config: {
        hasToken: !!apiToken,
        testedEndpoints: endpoints.length,
      },
      results: results,
      instructions: {
        step1: 'Check the successful endpoints above',
        step2: 'Look for pricelist_id or price_list_id in the response',
        step3: 'If found in products endpoint, check prices.pricelist_id or product.pricelist_id',
        step4: 'Copy the pricelist_id and use it in your TLD POST request',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('❌ Route error:', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
