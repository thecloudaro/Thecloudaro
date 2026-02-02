import { NextRequest, NextResponse } from 'next/server';

interface PricingResponse {
  [duration: string]: number | null; // e.g., "1": 29.99, "2": 54.99, etc.
}

interface SSLPricingResponse {
  [productId: string]: {
    name: string;
    validation: string; // DV, OV, EV
    domains: string; // Single, Multi, Wildcard
    pricing: PricingResponse;
  };
}

/**
 * Fetch SSL certificate products pricing from Upmind API
 * Uses official endpoint: https://api.upmind.io/api/admin/products?with=prices,costs
 * Fetches all products and filters for SSL certificates
 */
export async function GET(req: NextRequest) {
  try {
    // Validate API token
    const apiToken = process.env.UPMIND_API_TOKEN;
    if (!apiToken) {
      return NextResponse.json(
        { 
          success: false,
          error: 'UPMIND_API_TOKEN is not set. Locally: add to .env.local. On Vercel: Project → Settings → Environment Variables → add UPMIND_API_TOKEN → Redeploy.',
          products: []
        },
        { status: 500 }
      );
    }

    // Fetch all products with pricing from Upmind API
    const endpoint = 'https://api.upmind.io/api/admin/products?with=prices,costs';
    
    console.log('🚀 [SSL Pricing] Fetching all products with pricing from:', endpoint);

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [SSL Pricing] Upmind API error:', response.status, errorText);
      return NextResponse.json(
        { 
          success: false,
          error: `Upmind API returned ${response.status}: ${errorText.substring(0, 200)}`,
          products: []
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Extract products array from response
    const products = data.data || data.products || data;
    
    if (!Array.isArray(products)) {
      console.error('❌ [SSL Pricing] Invalid response structure. Expected array of products.');
      console.error('Response keys:', Object.keys(data));
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid response structure from Upmind API',
          products: []
        },
        { status: 500 }
      );
    }

    console.log(`✅ [SSL Pricing] Found ${products.length} products in response`);

    // Filter for SSL certificate products (by name/keywords)
    const sslKeywords = ['ssl', 'certificate', 'tls', 'https'];
    const sslProducts = products.filter((product: any) => {
      const name = (product.name || product.product_name || '').toLowerCase();
      const description = (product.description || '').toLowerCase();
      return sslKeywords.some(keyword => 
        name.includes(keyword) || description.includes(keyword)
      );
    });

    console.log(`✅ [SSL Pricing] Found ${sslProducts.length} SSL-related products`);

    // Function to extract pricing for different durations (1-5 years)
    const extractPricing = (product: any, productName: string): PricingResponse => {
      let subscriptionTerms: any[] | null = null;

      if (product.prices?.subscription_terms && Array.isArray(product.prices.subscription_terms)) {
        subscriptionTerms = product.prices.subscription_terms;
      } else if (product.prices && Array.isArray(product.prices)) {
        subscriptionTerms = product.prices;
      } else if (product.subscription_terms && Array.isArray(product.subscription_terms)) {
        subscriptionTerms = product.subscription_terms;
      } else if (product.billing?.subscription_terms && Array.isArray(product.billing.subscription_terms)) {
        subscriptionTerms = product.billing.subscription_terms;
      } else if (product.billing?.prices?.subscription_terms && Array.isArray(product.billing.prices.subscription_terms)) {
        subscriptionTerms = product.billing.prices.subscription_terms;
      } else if (product.costs && Array.isArray(product.costs)) {
        subscriptionTerms = product.costs;
      }

      // Upmind Product Billing: subscription terms can be nested under pricelist (e.g. "The Cloud Aro (Default)")
      if (!subscriptionTerms && product.prices && typeof product.prices === 'object' && !Array.isArray(product.prices)) {
        const pricesObj = product.prices;
        for (const key of Object.keys(pricesObj)) {
          const val = pricesObj[key];
          if (val && typeof val === 'object' && Array.isArray(val.subscription_terms)) {
            subscriptionTerms = val.subscription_terms;
            break;
          }
          if (val && typeof val === 'object' && Array.isArray(val)) {
            subscriptionTerms = val;
            break;
          }
        }
      }

      if (subscriptionTerms && subscriptionTerms.length > 0) {
        const usdTerms = subscriptionTerms.filter((term: any) =>
          (term.currency_code === 'USD' || term.currency_code === 'usd')
        );
        const anyTerms = usdTerms.length > 0 ? usdTerms : subscriptionTerms;

        if (anyTerms.length > 0) {
          const pricing: PricingResponse = {};
          for (let years = 1; years <= 5; years++) {
            const months = years * 12;
            const price = extractPrice(anyTerms, months, years);
            if (price !== null) {
              pricing[String(years)] = price;
            }
          }
          if (Object.keys(pricing).length > 0) return pricing;
          // One more try: use first term as 1-year price (annual cost in Upmind)
          const firstPrice = getAmountFromTerm(anyTerms[0]);
          if (firstPrice != null && firstPrice > 0) return { '1': firstPrice };
        }
      }

      // product.prices as object (e.g. { "12": { price: 29.99 }, "annual": 29.99 })
      const pricesObj = product.prices;
      if (pricesObj && typeof pricesObj === 'object' && !Array.isArray(pricesObj)) {
        const byYear: PricingResponse = {};
        for (let y = 1; y <= 5; y++) {
          const key = String(y * 12);
          const val = pricesObj[key] ?? pricesObj[String(y)] ?? (y === 1 ? (pricesObj.annual ?? pricesObj.yearly ?? pricesObj.recurring) : undefined);
          let num: number | null = null;
          if (val != null) {
            if (typeof val === 'number') num = val;
            else if (typeof val === 'object' && val !== null) num = (val as any).price ?? (val as any).amount ?? (val as any).recurring_price ?? null;
            else num = parseFloat(String(val));
          }
          if (typeof num === 'number' && !Number.isNaN(num) && num > 0) byYear[String(y)] = num;
        }
        if (Object.keys(byYear).length > 0) return byYear;
      }

      // Fallback: single price on product (common for SSL - 1 year price)
      const singlePrice =
        product.price ?? product.amount ?? product.register_price ?? product.registration_price;
      if (typeof singlePrice === 'number' && singlePrice > 0) {
        return { '1': singlePrice };
      }
      if (typeof singlePrice === 'string' && parseFloat(singlePrice) > 0) {
        return { '1': parseFloat(singlePrice) };
      }
      if (product.prices?.price != null) {
        const p = product.prices.price;
        const n = typeof p === 'number' ? p : parseFloat(String(p));
        if (!Number.isNaN(n) && n > 0) return { '1': n };
      }

      // Debug: log pricing-related shape so we can add support
      console.warn(`⚠️ [SSL Pricing] No pricing for "${productName}". product.prices:`, JSON.stringify(product.prices)?.slice(0, 500));
      console.warn(`⚠️ [SSL Pricing] product.costs:`, Array.isArray(product.costs) ? product.costs.length : product.costs);
      return {};
    };

    function getAmountFromTerm(term: any): number | null {
      if (!term) return null;
      const raw = term.amount ?? term.price ?? term.recurring_price ?? term.cost ?? term.recurring_amount ?? term.sale_price ?? (term.amount_cents != null ? term.amount_cents / 100 : null);
      if (raw == null) return null;
      const n = typeof raw === 'number' ? raw : parseFloat(String(raw));
      return Number.isNaN(n) ? null : n;
    }

    // Process SSL products
    const result: SSLPricingResponse = {};
    
    sslProducts.forEach((product: any) => {
      const productId = product.id || product.product_id || product.uuid;
      const productName = product.name || product.product_name || 'SSL Certificate';
      
      // Try to infer validation type and domain type from name
      const nameLower = productName.toLowerCase();
      let validation = 'DV';
      let domains = 'Single';
      
      if (nameLower.includes('ev') || nameLower.includes('extended')) {
        validation = 'EV';
      } else if (nameLower.includes('ov') || nameLower.includes('organization')) {
        validation = 'OV';
      }
      
      if (nameLower.includes('wildcard') || nameLower.includes('multi')) {
        domains = 'Wildcard';
      } else if (nameLower.includes('multi') || nameLower.includes('san')) {
        domains = 'Multi';
      }

      result[productId] = {
        name: productName,
        validation,
        domains,
        pricing: extractPricing(product, productName),
      };
    });

    console.log('📊 [SSL Pricing] Final result:', JSON.stringify(result, null, 2));
    
    return NextResponse.json({
      success: true,
      products: result,
    });
  } catch (error) {
    console.error('❌ [SSL Pricing] API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown server error';
    
    return NextResponse.json(
      { 
        success: false,
        error: errorMessage,
        products: []
      },
      { status: 500 }
    );
  }
}

/**
 * Helper: extract price by billing_cycle_months or billing_cycle_years from subscription_terms
 */
function extractPrice(
  subscriptionTerms: Array<{
    period_months?: number;
    months?: number;
    period?: number;
    billing_cycle_months?: number;
    billing_cycle_years?: number;
    billing_cycle?: number;
    amount?: number;
    price?: number;
    recurring_price?: number;
    cost?: number;
  }>,
  targetMonths: number,
  targetYears?: number
): number | null {
  const term = subscriptionTerms.find((t: any) => {
    if (t.billing_cycle_months === targetMonths || t.period_months === targetMonths ||
        t.months === targetMonths || t.period === targetMonths || t.billing_period_months === targetMonths) return true;
    if (targetYears != null && (t.billing_cycle_years === targetYears || t.billing_cycle === targetYears)) return true;
    return false;
  });

  if (!term) return null;

  const t = term as any;
  const price = t.amount ?? t.price ?? t.recurring_price ?? t.cost ?? t.recurring_amount ?? t.sale_price ?? (t.amount_cents != null ? t.amount_cents / 100 : undefined);
  if (price === undefined || price === null) return null;
  return typeof price === 'number' ? price : parseFloat(String(price));
}
