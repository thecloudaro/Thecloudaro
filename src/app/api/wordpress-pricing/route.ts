import { NextRequest, NextResponse } from 'next/server';

interface PricingResponse {
  monthly?: number | null;
  yearly?: number | null;
}

interface WordPressPricingResponse {
  Starter: PricingResponse;
  Turbo: PricingResponse;
  Supersonic: PricingResponse;
}

/**
 * Fetch WordPress hosting plan pricing from Upmind API
 * Uses official endpoint: https://api.upmind.io/api/admin/products?with=prices,costs
 * Fetches all products and filters by product IDs
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const starterProductId = searchParams.get('starter');
    const turboProductId = searchParams.get('turbo');
    const supersonicProductId = searchParams.get('supersonic');

    // Validate required parameters
    if (!starterProductId || !turboProductId || !supersonicProductId) {
      return NextResponse.json(
        { 
          success: false,
          error: 'All three product IDs are required (starter, turbo, supersonic)',
          pricing: null
        },
        { status: 400 }
      );
    }

    // Validate API token
    const apiToken = process.env.UPMIND_API_TOKEN;
    if (!apiToken) {
      return NextResponse.json(
        { 
          success: false,
          error: 'UPMIND_API_TOKEN is not set. Locally: add to .env.local. On Vercel: Project → Settings → Environment Variables → add UPMIND_API_TOKEN → Redeploy.',
          pricing: null
        },
        { status: 500 }
      );
    }

    const fetchProductById = async (productId: string) => {
      const endpoint = `https://api.upmind.io/api/admin/products/${encodeURIComponent(
        productId
      )}?with=prices,costs`;
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
        throw new Error(
          `Failed to fetch product ${productId}. Upmind API returned ${response.status}. ${errorText.slice(
            0,
            200
          )}`
        );
      }

      const data = await response.json();
      const product = data?.data ?? data?.product ?? data;
      if (!product || typeof product !== 'object') {
        throw new Error(`Invalid product response structure for ${productId}`);
      }
      return product;
    };

    const [starterProduct, turboProduct, supersonicProduct] = await Promise.all([
      fetchProductById(starterProductId),
      fetchProductById(turboProductId),
      fetchProductById(supersonicProductId),
    ]);

    const products = [starterProduct, turboProduct, supersonicProduct];


    // Function to find product by ID and extract pricing
    const getProductPricing = (productId: string, planName: string): PricingResponse => {
      // Find product by ID
      const product = products.find((p: any) => 
        p.id === productId || 
        p.product_id === productId || 
        p.uuid === productId ||
        String(p.id) === String(productId) ||
        String(p.product_id) === String(productId) ||
        String(p.uuid) === String(productId)
      );

      if (!product) {
        console.warn(`⚠️ [${planName}] Product not found with ID: ${productId}`);
        return { monthly: null, yearly: null };
      }

      console.log(`✅ [${planName}] Found product:`, product.id || product.product_id || product.uuid);

      // Try different pricing structures
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

      // Nested pricelist support (e.g. prices["The Cloud Aro (Default)"].subscription_terms)
      if (!subscriptionTerms && product.prices && typeof product.prices === 'object' && !Array.isArray(product.prices)) {
        const pricesObj = product.prices;
        for (const key of Object.keys(pricesObj)) {
          const val = (pricesObj as any)[key];
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

      if (!subscriptionTerms || !Array.isArray(subscriptionTerms) || subscriptionTerms.length === 0) {
        console.warn(
          `⚠️ [${planName}] No subscription_terms array found. prices shape:`,
          JSON.stringify(product.prices)?.slice(0, 300)
        );

        // Fallback: try single price on product as yearly price
        const singlePrice =
          (product as any).price ??
          (product as any).amount ??
          (product as any).register_price ??
          (product as any).registration_price ??
          (product.prices && typeof product.prices === 'object' && !Array.isArray(product.prices)
            ? ((product.prices as any).price ?? null)
            : null);

        let n: number | null = null;
        if (typeof singlePrice === 'number') {
          n = singlePrice;
        } else if (typeof singlePrice === 'string' && singlePrice.trim() !== '') {
          const parsed = parseFloat(singlePrice);
          if (!Number.isNaN(parsed) && parsed > 0) n = parsed;
        }

        if (n != null && n > 0) {
          const fallback: PricingResponse = {
            monthly: n / 12,
            yearly: n,
          };
          console.warn(`⚠️ [${planName}] Using fallback single price as yearly`, fallback);
          return fallback;
        }

        return { monthly: null, yearly: null };
      }

      // Prefer USD terms if available, otherwise use all
      const usdTerms = subscriptionTerms.filter((term: any) => 
        term.currency_code === 'USD' || term.currency_code === 'usd'
      );
      const terms = usdTerms.length > 0 ? usdTerms : subscriptionTerms;

      const allCurrencies = [...new Set(subscriptionTerms.map((t: any) => t.currency_code))];
      console.log(`💰 [${planName}] Available currencies in subscription_terms:`, allCurrencies);

      // Extract pricing from chosen subscription_terms
      let monthly = extractPrice(terms, 1);
      let yearly = extractPrice(terms, 12, 1);

      // If both missing but we have terms, fall back to first term as yearly
      if (monthly == null && yearly == null && terms.length > 0) {
        const base = getAmountFromTerm(terms[0]);
        if (base != null && base > 0) {
          yearly = base;
          monthly = base / 12;
          console.warn(
            `⚠️ [${planName}] Fallback pricing using first term as yearly`,
            { yearly, monthly }
          );
        }
      }

      const pricing: PricingResponse = {
        monthly,
        yearly,
      };

      console.log(`✅ [${planName}] Pricing extracted:`, pricing);
      return pricing;
    };

    // Get pricing for all three plans
    const starterPricing = getProductPricing(starterProductId, 'Starter');
    const turboPricing = getProductPricing(turboProductId, 'Turbo');
    const supersonicPricing = getProductPricing(supersonicProductId, 'Supersonic');

    const result: { success: boolean; pricing: WordPressPricingResponse } = {
      success: true,
      pricing: {
        Starter: starterPricing,
        Turbo: turboPricing,
        Supersonic: supersonicPricing,
      },
    };

    console.log('📊 [WordPress Pricing] Final pricing result:', JSON.stringify(result, null, 2));
    return NextResponse.json(result);
  } catch (error) {
    console.error('❌ [WordPress Pricing] API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown server error';
    
    return NextResponse.json(
      { 
        success: false,
        error: errorMessage,
        pricing: null
      },
      { status: 500 }
    );
  }
}

/**
 * Helper function to extract price by billing_cycle_months from subscription_terms
 * Maps: 1 month -> monthly, 12 months -> yearly
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
    recurring_amount?: number;
    sale_price?: number;
    amount_cents?: number;
    cost?: number;
  }>,
  targetMonths: number,
  targetYears?: number
): number | null {
  const term = subscriptionTerms.find((t: any) => {
    if (
      t.billing_cycle_months === targetMonths ||
      t.period_months === targetMonths || 
      t.months === targetMonths ||
      t.period === targetMonths
    ) {
      return true;
    }

    if (
      targetYears != null &&
      (t.billing_cycle_years === targetYears ||
        t.billing_cycle === targetYears)
    ) {
      return true;
    }

    return false;
  });
  
  if (!term) {
    return null;
  }

  const raw =
    term.amount ??
    term.price ??
    term.recurring_price ??
    term.recurring_amount ??
    term.sale_price ??
    (term.amount_cents != null ? term.amount_cents / 100 : undefined) ??
    term.cost;
  
  if (raw == null) return null;

  const n = typeof raw === 'number' ? raw : parseFloat(String(raw));
  if (Number.isNaN(n)) return null;
  return n;
}

function getAmountFromTerm(term: any): number | null {
  if (!term) return null;
  const raw =
    term.amount ??
    term.price ??
    term.recurring_price ??
    term.recurring_amount ??
    term.sale_price ??
    (term.amount_cents != null ? term.amount_cents / 100 : undefined) ??
    term.cost;

  if (raw == null) return null;
  const n = typeof raw === 'number' ? raw : parseFloat(String(raw));
  return Number.isNaN(n) ? null : n;
}
