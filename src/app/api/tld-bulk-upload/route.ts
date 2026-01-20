import { NextRequest, NextResponse } from 'next/server';

/**
 * Bulk TLD upload endpoint
 * Accepts CSV or JSON file with TLDs
 * CSV Format: tld,price,billing_cycle_months (header row required)
 * JSON Format: Array of TLD objects or simple array of TLD strings
 */
export async function POST(req: NextRequest) {
  try {
    const apiToken = process.env.UPMIND_API_TOKEN;

    if (!apiToken) {
      return NextResponse.json({
        error: 'UPMIND_API_TOKEN not configured',
      }, { status: 500 });
    }

    // Get request body
    const contentType = req.headers.get('content-type') || '';
    
    let tldsData: any[] = [];
    let defaultSettings = {
      late_renew_days: 10,
      redemption_period_days: 10,
      prices: {
        price: 15,
        billing_cycle_months: 12,
        currency_id: 'd15196e0-2e51-36d4-2ec9-429807875d30',
        billing_cycle_years: 1,
        pricelist_id: {
          pricelist_id: '', // Will be required - actual pricelist ID
          currency_id: 'd15196e0-2e51-36d4-2ec9-429807875d30', // Currency ID for pricelist
        },
      },
      max_reg_period_years: 5,
      registrar: 'realtime-register',
    };

    // Parse request body
    if (contentType.includes('application/json')) {
      const body = await req.json();
      
      // Merge settings properly (deep merge for nested objects like prices.pricelist_id)
      if (body.settings) {
        defaultSettings = {
          ...defaultSettings,
          ...body.settings,
          prices: {
            ...defaultSettings.prices,
            ...body.settings.prices,
            // Ensure pricelist_id is an object if provided
            pricelist_id: body.settings.prices?.pricelist_id 
              ? (typeof body.settings.prices.pricelist_id === 'object' 
                  ? body.settings.prices.pricelist_id 
                  : {
                      pricelist_id: body.settings.prices.pricelist_id,
                      currency_id: body.settings.prices.currency_id || defaultSettings.prices.currency_id,
                    })
              : defaultSettings.prices.pricelist_id,
          },
        };
      }
      
      // If body has tlds array
      if (Array.isArray(body.tlds)) {
        tldsData = body.tlds;
      }
      // If body is array of TLDs
      else if (Array.isArray(body)) {
        tldsData = body;
      }
      // If body has settings and tlds
      else if (body.tlds) {
        tldsData = body.tlds;
      }
      // If single TLD object
      else {
        tldsData = [body];
      }
    }
    // CSV format (text/csv or text/plain)
    else if (contentType.includes('text/csv') || contentType.includes('text/plain')) {
      const csvText = await req.text();
      const lines = csvText.split('\n').filter(line => line.trim());
      
      // Parse CSV (simple parser)
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      const tldIndex = headers.findIndex(h => h === 'tld' || h === 'domain');
      const priceIndex = headers.findIndex(h => h === 'price');
      const cycleIndex = headers.findIndex(h => h.includes('cycle') || h.includes('months'));
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        if (values[tldIndex]) {
          tldsData.push({
            tld: values[tldIndex].startsWith('.') ? values[tldIndex] : `.${values[tldIndex]}`,
            prices: {
              price: priceIndex >= 0 ? parseFloat(values[priceIndex]) || defaultSettings.prices.price : defaultSettings.prices.price,
              billing_cycle_months: cycleIndex >= 0 ? parseInt(values[cycleIndex]) || defaultSettings.prices.billing_cycle_months : defaultSettings.prices.billing_cycle_months,
              currency_id: defaultSettings.prices.currency_id,
              billing_cycle_years: defaultSettings.prices.billing_cycle_years,
              pricelist_id: defaultSettings.prices.pricelist_id, // Object with pricelist_id and currency_id
            },
            late_renew_days: defaultSettings.late_renew_days,
            redemption_period_days: defaultSettings.redemption_period_days,
            max_reg_period_years: defaultSettings.max_reg_period_years,
            registrar: defaultSettings.registrar,
          });
        }
      }
    }
    // Simple text format (one TLD per line)
    else {
      const text = await req.text();
      const lines = text.split('\n').filter(line => line.trim());
      tldsData = lines.map(line => {
        const tld = line.trim();
        return {
          tld: tld.startsWith('.') ? tld : `.${tld}`,
          ...defaultSettings,
        };
      });
    }

    if (tldsData.length === 0) {
      return NextResponse.json({
        error: 'No TLDs found in request. Please provide TLDs in JSON array, CSV format, or text format (one per line)',
      }, { status: 400 });
    }

    console.log(`📦 Processing ${tldsData.length} TLD(s) for bulk upload`);

    const tldEndpoint = 'https://api.upmind.io/api/admin/modules/web_hosting/domains/tlds';

    // Process TLDs in batches (to avoid overwhelming the API)
    const batchSize = 10; // Process 10 at a time
    const results: any[] = [];

    for (let i = 0; i < tldsData.length; i += batchSize) {
      const batch = tldsData.slice(i, i + batchSize);
      console.log(`🔄 Processing batch ${Math.floor(i / batchSize) + 1} (${batch.length} TLDs)...`);

      const batchResults = await Promise.all(
        batch.map(async (tldData: any) => {
          const tld = typeof tldData === 'string' ? tldData : (tldData.tld || tldData);
          
          // Handle pricelist_id - can be string or object
          let pricelistIdValue = defaultSettings.prices.pricelist_id;
          if (typeof tldData === 'object' && tldData.prices?.pricelist_id) {
            // If pricelist_id is already an object, use it
            if (typeof tldData.prices.pricelist_id === 'object') {
              pricelistIdValue = tldData.prices.pricelist_id;
            } else {
              // If it's a string, convert to object
              pricelistIdValue = {
                pricelist_id: tldData.prices.pricelist_id,
                currency_id: tldData.prices.currency_id || defaultSettings.prices.currency_id,
              };
            }
          } else if (typeof tldData === 'object' && tldData.pricelist_id) {
            // If pricelist_id is at top level
            if (typeof tldData.pricelist_id === 'object') {
              pricelistIdValue = tldData.pricelist_id;
            } else {
              pricelistIdValue = {
                pricelist_id: tldData.pricelist_id,
                currency_id: tldData.currency_id || defaultSettings.prices.currency_id,
              };
            }
          }

          const tldRequestBody = typeof tldData === 'string' ? {
            tld: tldData.startsWith('.') ? tldData : `.${tldData}`,
            late_renew_days: defaultSettings.late_renew_days,
            redemption_period_days: defaultSettings.redemption_period_days,
            prices: {
              price: defaultSettings.prices.price,
              billing_cycle_months: defaultSettings.prices.billing_cycle_months,
              currency_id: defaultSettings.prices.currency_id,
              billing_cycle_years: defaultSettings.prices.billing_cycle_years,
              pricelist_id: pricelistIdValue, // Object with pricelist_id and currency_id
            },
            max_reg_period_years: defaultSettings.max_reg_period_years,
            registrar: defaultSettings.registrar,
          } : {
            ...tldData,
            tld: tldData.tld?.startsWith('.') ? tldData.tld : `.${tldData.tld}`,
            late_renew_days: tldData.late_renew_days || defaultSettings.late_renew_days,
            redemption_period_days: tldData.redemption_period_days || defaultSettings.redemption_period_days,
            max_reg_period_years: tldData.max_reg_period_years || defaultSettings.max_reg_period_years,
            registrar: tldData.registrar || defaultSettings.registrar,
            prices: {
              price: tldData.prices?.price || defaultSettings.prices.price,
              billing_cycle_months: tldData.prices?.billing_cycle_months || defaultSettings.prices.billing_cycle_months,
              currency_id: defaultSettings.prices.currency_id,
              billing_cycle_years: tldData.prices?.billing_cycle_years || defaultSettings.prices.billing_cycle_years,
              pricelist_id: pricelistIdValue, // Object with pricelist_id and currency_id
            },
          };

          // Log request body for debugging
          console.log(`📤 [${tld}] Request body:`, JSON.stringify(tldRequestBody, null, 2));

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
              } catch {
                errorText = await response.text();
              }
            } else {
              errorText = await response.text();
            }

            return {
              tld,
              status,
              success: response.ok,
              data,
              error: errorText ? errorText.substring(0, 300) : null,
            };
          } catch (error) {
            return {
              tld,
              status: 0,
              success: false,
              error: error instanceof Error ? error.message : 'Unknown error',
            };
          }
        })
      );

      results.push(...batchResults);
      
      // Small delay between batches to avoid rate limiting
      if (i + batchSize < tldsData.length) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
      }
    }

    const successCount = results.filter(r => r.success).length;
    const failedCount = results.filter(r => !r.success).length;

    console.log(`✅ Bulk upload complete: ${successCount} successful, ${failedCount} failed`);

    return NextResponse.json({
      config: {
        hasToken: !!apiToken,
        endpoint: tldEndpoint,
        method: 'POST',
        totalTlds: tldsData.length,
        batchSize,
      },
      summary: {
        total: tldsData.length,
        successful: successCount,
        failed: failedCount,
      },
      results: results,
      failedTlds: results.filter(r => !r.success).map(r => r.tld),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('❌ Route error:', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
