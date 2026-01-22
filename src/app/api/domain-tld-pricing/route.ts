import { NextRequest, NextResponse } from 'next/server';

interface TldPricing {
  tld: string;
  registerPrice: number;
  renewPrice: number;
  transferPrice: number;
  currency: string;
}

interface DomainTldPricingResponse {
  success: boolean;
  tlds?: TldPricing[];
  error?: string;
}

/**
 * Fetch domain TLD pricing from Upmind API
 * Uses product ID: 61e50989-73d2-4757-001a-745e610832d7
 * Fetches domain names/TLDs from product details endpoint
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tldsParam = searchParams.get('tlds'); // Optional: comma-separated TLDs to filter

    // Validate API token
    const apiToken = process.env.UPMIND_API_TOKEN;
    if (!apiToken) {
      return NextResponse.json(
        { 
          success: false,
          error: 'UPMIND_API_TOKEN environment variable is not set. Please set it in your .env.local file.',
          tlds: []
        },
        { status: 500 }
      );
    }

    // Domain product ID from Upmind
    const domainProductId = '61e50989-73d2-4757-001a-745e610832d7';

    // Fetch product details from Upmind API
    // Using product details endpoint: /api/admin/products/{productId}
    const productDetailsEndpoint = `https://api.upmind.io/api/admin/products/${domainProductId}?with=prices,costs`;
    
    console.log('🚀 [Domain TLD Pricing] Fetching product details from:', productDetailsEndpoint);

    const response = await fetch(productDetailsEndpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [Domain TLD Pricing] Upmind API error:', response.status, errorText);
      return NextResponse.json(
        { 
          success: false,
          error: `Upmind API returned ${response.status}: ${errorText.substring(0, 200)}`,
          tlds: []
        },
        { status: response.status }
      );
    }

    const productData = await response.json();
    
    // Extract product from response (could be direct object or nested in data)
    const domainProduct = productData.data || productData.product || productData;

    if (!domainProduct) {
      console.error('❌ [Domain TLD Pricing] Invalid response structure. Product not found.');
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid response structure from Upmind API - product not found',
          tlds: []
        },
        { status: 500 }
      );
    }

    console.log(`✅ [Domain TLD Pricing] Found domain product:`, domainProduct.id || domainProduct.product_id || domainProduct.uuid);
    console.log(`📦 [Domain TLD Pricing] Domain product structure:`, JSON.stringify(domainProduct, null, 2).substring(0, 2000));

    // Fetch TLDs from Upmind TLDs endpoint
    // GET /api/admin/modules/web_hosting/domains/tlds returns all configured TLDs
    const tldsEndpoint = 'https://api.upmind.io/api/admin/modules/web_hosting/domains/tlds';
    
    console.log('🚀 [Domain TLD Pricing] Fetching TLDs from:', tldsEndpoint);

    const tldsResponse = await fetch(tldsEndpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!tldsResponse.ok) {
      const errorText = await tldsResponse.text();
      console.error('❌ [Domain TLD Pricing] TLDs API error:', tldsResponse.status, errorText);
      return NextResponse.json(
        { 
          success: false,
          error: `Upmind TLDs API returned ${tldsResponse.status}: ${errorText.substring(0, 200)}`,
          tlds: []
        },
        { status: tldsResponse.status }
      );
    }

    const tldsData = await tldsResponse.json();
    const tldsList = Array.isArray(tldsData) ? tldsData : (tldsData.data || tldsData.tlds || []);

    console.log(`✅ [Domain TLD Pricing] Found ${tldsList.length} TLDs from Upmind`);

    // Filter TLDs if tlds param provided
    const requestedTlds = tldsParam ? tldsParam.split(',').map(t => t.trim().toLowerCase()) : null;

    // Extract pricing for each TLD
    const tldPricingList: TldPricing[] = [];

    for (const tldItem of tldsList) {
      const tld = String(tldItem.tld || tldItem.name || '').toLowerCase();
      
      if (!tld || !tld.startsWith('.')) continue;
      
      // Filter if specific TLDs requested
      if (requestedTlds && !requestedTlds.includes(tld)) continue;

      // Extract pricing from TLD item
      // Upmind TLD structure: prices array with currency_code and billing_cycle_months
      const prices = tldItem.prices || tldItem.pricing || [];
      
      if (!Array.isArray(prices) || prices.length === 0) {
        console.warn(`⚠️ [Domain TLD Pricing] No pricing array found for ${tld}`);
        continue;
      }

      // Find USD pricing for 12 months (yearly) - domain pricing is typically yearly
      const usdYearlyPrice = prices.find((p: any) => 
        (p.currency_code === 'USD' || p.currency_code === 'usd') && 
        (p.billing_cycle_months === 12 || p.billing_cycle_years === 1 || p.billing_cycle === 12)
      );

      if (!usdYearlyPrice) {
        console.warn(`⚠️ [Domain TLD Pricing] No USD yearly pricing found for ${tld}. Available:`, 
          prices.map((p: any) => ({ currency: p.currency_code, cycle: p.billing_cycle_months || p.billing_cycle_years })));
        continue;
      }

      const price = usdYearlyPrice.price || usdYearlyPrice.amount || usdYearlyPrice.cost || null;

      if (!price || price <= 0) {
        console.warn(`⚠️ [Domain TLD Pricing] Invalid price for ${tld}:`, price);
        continue;
      }

      // For domain pricing, register/renew/transfer may be the same or different
      // Check if separate prices are provided, otherwise use the same price
      const registerPrice = usdYearlyPrice.register_price || usdYearlyPrice.registration_price || price;
      const renewPrice = usdYearlyPrice.renew_price || usdYearlyPrice.renewal_price || price;
      const transferPrice = usdYearlyPrice.transfer_price || price;

      tldPricingList.push({
        tld,
        registerPrice: typeof registerPrice === 'number' ? registerPrice : parseFloat(String(registerPrice)),
        renewPrice: typeof renewPrice === 'number' ? renewPrice : parseFloat(String(renewPrice)),
        transferPrice: typeof transferPrice === 'number' ? transferPrice : parseFloat(String(transferPrice)),
        currency: 'USD',
      });

      console.log(`✅ [Domain TLD Pricing] Extracted pricing for ${tld}: register=$${registerPrice}, renew=$${renewPrice}, transfer=$${transferPrice}`);
    }

    console.log(`✅ [Domain TLD Pricing] Extracted pricing for ${tldPricingList.length} TLDs`);

    return NextResponse.json({
      success: true,
      tlds: tldPricingList,
    });
  } catch (error) {
    console.error('❌ [Domain TLD Pricing] API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown server error';
    
    return NextResponse.json(
      { 
        success: false,
        error: errorMessage,
        tlds: []
      },
      { status: 500 }
    );
  }
}
