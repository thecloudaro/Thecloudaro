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
    const extractPricing = (product: any): PricingResponse => {
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
      }

      if (!subscriptionTerms || !Array.isArray(subscriptionTerms)) {
        return {};
      }

      // Filter to USD only
      const usdTerms = subscriptionTerms.filter((term: any) => 
        term.currency_code === 'USD' || term.currency_code === 'usd'
      );

      if (usdTerms.length === 0) {
        return {};
      }

      // Extract pricing for 1-5 years (12, 24, 36, 48, 60 months)
      const pricing: PricingResponse = {};
      for (let years = 1; years <= 5; years++) {
        const months = years * 12;
        const price = extractPrice(usdTerms, months);
        if (price !== null) {
          pricing[String(years)] = price;
        }
      }

      return pricing;
    };

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
        pricing: extractPricing(product),
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
 * Helper function to extract price by billing_cycle_months from subscription_terms
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

  const price = term.amount ?? term.price ?? term.recurring_price ?? term.cost;
  
  if (price === undefined || price === null) {
    return null;
  }

  return typeof price === 'number' ? price : parseFloat(String(price));
}
