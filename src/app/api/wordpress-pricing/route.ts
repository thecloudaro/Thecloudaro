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

    // Fetch all products with pricing from Upmind API
    const endpoint = 'https://api.upmind.io/api/admin/products?with=prices,costs';
    
    console.log('🚀 [WordPress Pricing] Fetching all products with pricing from:', endpoint);

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
      console.error('❌ [WordPress Pricing] Upmind API error:', response.status, errorText);
      return NextResponse.json(
        { 
          success: false,
          error: `Upmind API returned ${response.status}: ${errorText.substring(0, 200)}`,
          pricing: null
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Extract products array from response
    const products = data.data || data.products || data;
    
    if (!Array.isArray(products)) {
      console.error('❌ [WordPress Pricing] Invalid response structure. Expected array of products.');
      console.error('Response keys:', Object.keys(data));
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid response structure from Upmind API',
          pricing: null
        },
        { status: 500 }
      );
    }

    console.log(`✅ [WordPress Pricing] Found ${products.length} products in response`);

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
      let subscriptionTerms = null;
      
      if (product.prices?.subscription_terms) {
        subscriptionTerms = product.prices.subscription_terms;
      } else if (product.prices && Array.isArray(product.prices)) {
        subscriptionTerms = product.prices;
      } else if (product.subscription_terms) {
        subscriptionTerms = product.subscription_terms;
      } else if (product.billing?.subscription_terms) {
        subscriptionTerms = product.billing.subscription_terms;
      } else if (product.billing?.prices?.subscription_terms) {
        subscriptionTerms = product.billing.prices.subscription_terms;
      } else if (product.costs && Array.isArray(product.costs)) {
        subscriptionTerms = product.costs;
      }

      if (!subscriptionTerms || !Array.isArray(subscriptionTerms)) {
        console.warn(`⚠️ [${planName}] No subscription_terms found. Product keys:`, Object.keys(product));
        return { monthly: null, yearly: null };
      }

      // Filter subscription terms to USD only
      const allCurrencies = [...new Set(subscriptionTerms.map((t: any) => t.currency_code))];
      console.log(`💰 [${planName}] Available currencies in subscription_terms:`, allCurrencies);

      const usdTerms = subscriptionTerms.filter((term: any) => 
        term.currency_code === 'USD' || term.currency_code === 'usd'
      );

      if (usdTerms.length === 0) {
        console.warn(`⚠️ [${planName}] No USD pricing found in subscription_terms. Available currencies:`, allCurrencies);
        return { monthly: null, yearly: null };
      }

      console.log(`✅ [${planName}] Filtered to ${usdTerms.length} USD subscription terms:`, 
        usdTerms.map((t: any) => ({
          billing_cycle_months: t.billing_cycle_months,
          price: t.price,
          price_formatted: t.price_formatted,
          currency_code: t.currency_code
        }))
      );

      // Extract pricing from USD-only subscription_terms
      const pricing: PricingResponse = {
        monthly: extractPrice(usdTerms, 1),
        yearly: extractPrice(usdTerms, 12),
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
    amount?: number;
    price?: number;
    recurring_price?: number;
    cost?: number;
  }>,
  targetMonths: number
): number | null {
  const term = subscriptionTerms.find(
    (t) => 
      t.billing_cycle_months === targetMonths ||
      t.period_months === targetMonths || 
      t.months === targetMonths ||
      t.period === targetMonths
  );
  
  if (!term) {
    return null;
  }

  // Try multiple price fields: amount, price, recurring_price, cost
  const price = term.amount ?? term.price ?? term.recurring_price ?? term.cost;
  
  if (price === undefined || price === null) {
    return null;
  }

  return typeof price === 'number' ? price : parseFloat(String(price));
}
