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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const essentialProductId = searchParams.get('essential');
    const proProductId = searchParams.get('pro');
    const supremeProductId = searchParams.get('supreme');

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

    const apiToken = process.env.UPMIND_API_TOKEN;
    if (!apiToken) {
      return NextResponse.json(
        { 
          success: false,
          error: 'UPMIND_API_TOKEN environment variable is not set',
          pricing: null
        },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.upmind.io/api/admin/products?with=prices,costs', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { 
          success: false,
          error: `Upmind API returned ${response.status}`,
          pricing: null
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    const products = data.data || data.products || data;
    
    if (!Array.isArray(products)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid response structure from Upmind API',
          pricing: null
        },
        { status: 500 }
      );
    }

    const getProductPricing = (productId: string): PricingResponse => {
      const product = products.find((p: any) => 
        p.id === productId || 
        p.product_id === productId || 
        p.uuid === productId ||
        String(p.id) === String(productId) ||
        String(p.product_id) === String(productId) ||
        String(p.uuid) === String(productId)
      );

      if (!product) {
        return { monthly: null, yearly: null, biyearly: null };
      }

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
        return { monthly: null, yearly: null, biyearly: null };
      }

      const usdTerms = subscriptionTerms.filter((term: any) => 
        term.currency_code === 'USD' || term.currency_code === 'usd'
      );

      if (usdTerms.length === 0) {
        return { monthly: null, yearly: null, biyearly: null };
      }

      return {
        monthly: extractPrice(usdTerms, 1),
        yearly: extractPrice(usdTerms, 12),
        biyearly: extractPrice(usdTerms, 24),
      };
    };

    return NextResponse.json({
      success: true,
      pricing: {
        Essential: getProductPricing(essentialProductId),
        Pro: getProductPricing(proProductId),
        Supreme: getProductPricing(supremeProductId),
      },
    });
  } catch (error) {
    console.error('Hosting pricing API error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown server error',
        pricing: null
      },
      { status: 500 }
    );
  }
}

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
