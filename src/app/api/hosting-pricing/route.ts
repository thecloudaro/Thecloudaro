import { NextRequest, NextResponse } from 'next/server';

interface PricingResponse {
  monthly?: number | null;
  yearly?: number | null;
  biyearly?: number | null;
}

interface ProductPricingResponse {
  Essential: PricingResponse;
  Pro: PricingResponse;
  Supreme: PricingResponse;
}

/**
 * Fetch hosting plan pricing from Upmind API
 * Uses official endpoint: https://api.upmind.io/api/admin/products?with=prices,costs
 * Fetches all products and filters by product IDs
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const essentialProductId = searchParams.get('essential');
    const proProductId = searchParams.get('pro');
    const supremeProductId = searchParams.get('supreme');

    // Validate required parameters
    if (!essentialProductId || !proProductId || !supremeProductId) {
      return NextResponse.json(
        { 
          success: false,
          error: 'All three product IDs are required (essential, pro, supreme)',
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
          error: 'UPMIND_API_TOKEN environment variable is not set. Please set it in your .env.local file.',
          pricing: null
        },
        { status: 500 }
      );
    }

    // Fetch all products with pricing from Upmind API
    const endpoint = 'https://api.upmind.io/api/admin/products?with=prices,costs';
    
    console.log('🚀 Fetching all products with pricing from:', endpoint);

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
      console.error('❌ Upmind API error:', response.status, errorText);
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
    // Response structure could be: { data: [...] } or direct array [...]
    const products = data.data || data.products || data;
    
    if (!Array.isArray(products)) {
      console.error('❌ Invalid response structure. Expected array of products.');
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

    console.log(`✅ Found ${products.length} products in response`);

    // Function to find product by ID and extract pricing
    const getProductPricing = (productId: string, planName: string): PricingResponse => {
      // Find product by ID (could be in id, product_id, or uuid field)
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
        return { monthly: null, yearly: null, biyearly: null };
      }

      console.log(`✅ [${planName}] Found product:`, product.id || product.product_id || product.uuid);

      // Try different pricing structures
      // 1. Check prices.subscription_terms or prices array
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
        // If costs array is available, try to use it
        subscriptionTerms = product.costs;
      }

      if (!subscriptionTerms || !Array.isArray(subscriptionTerms)) {
        console.warn(`⚠️ [${planName}] No subscription_terms found. Product keys:`, Object.keys(product));
        if (product.prices) {
          console.log(`   prices structure:`, typeof product.prices, Array.isArray(product.prices) ? 'array' : Object.keys(product.prices || {}));
        }
        return { monthly: null, yearly: null, biyearly: null };
      }

      // Extract pricing from subscription_terms
      const pricing: PricingResponse = {
        monthly: extractPrice(subscriptionTerms, 1),
        yearly: extractPrice(subscriptionTerms, 12),
        biyearly: extractPrice(subscriptionTerms, 24),
      };

      console.log(`✅ [${planName}] Pricing extracted:`, pricing);
      return pricing;
    };

    // Get pricing for all three plans
    const essentialPricing = getProductPricing(essentialProductId, 'Essential');
    const proPricing = getProductPricing(proProductId, 'Pro');
    const supremePricing = getProductPricing(supremeProductId, 'Supreme');

    const result: { success: boolean; pricing: ProductPricingResponse } = {
      success: true,
      pricing: {
        Essential: essentialPricing,
        Pro: proPricing,
        Supreme: supremePricing,
      },
    };

    console.log('📊 Final pricing result:', JSON.stringify(result, null, 2));
    return NextResponse.json(result);
  } catch (error) {
    console.error('❌ Hosting pricing API error:', error);
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
 * Helper function to extract price by period_months from subscription_terms
 * Maps: 1 month -> monthly, 12 months -> yearly, 24 months -> biyearly
 */
function extractPrice(
  subscriptionTerms: Array<{ 
    period_months?: number; 
    months?: number; 
    period?: number;
    amount?: number; 
    price?: number;
    recurring_price?: number;
    cost?: number;
  }>,
  targetMonths: number
): number | null {
  const term = subscriptionTerms.find(
    (t) => 
      (t.period_months === targetMonths) || 
      (t.months === targetMonths) ||
      (t.period === targetMonths)
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
