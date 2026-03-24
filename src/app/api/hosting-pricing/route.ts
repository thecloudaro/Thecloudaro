import { NextRequest, NextResponse } from 'next/server';

interface PricingResponse {
  monthly?: number | null;
  yearly?: number | null;
  biyearly?: number | null;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const idsParam = searchParams.get('ids');

    let productIdsByPlan: Record<string, string> = {};

    if (idsParam) {
      try {
        const parsed = JSON.parse(idsParam);

        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          productIdsByPlan = Object.fromEntries(
            Object.entries(parsed).filter(
              ([key, value]) =>
                key.trim().length > 0 &&
                typeof value === 'string' &&
                value.trim().length > 0
            )
          ) as Record<string, string>;
        }
      } catch {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid ids query param. Expected JSON object of planName -> productId',
            pricing: null,
          },
          { status: 400 }
        );
      }
    } else {
      // Backward compatibility for callers that still send fixed params.
      const essentialProductId = searchParams.get('essential');
      const proProductId = searchParams.get('pro');
      const supremeProductId = searchParams.get('supreme');

      productIdsByPlan = {
        ...(essentialProductId ? { Essential: essentialProductId } : {}),
        ...(proProductId ? { Pro: proProductId } : {}),
        ...(supremeProductId ? { Supreme: supremeProductId } : {}),
      };
    }

    const planEntries = Object.entries(productIdsByPlan);
    if (planEntries.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            'At least one product ID is required. Pass ids=<json> or legacy essential/pro/supreme params.',
          pricing: null,
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

    // Fetch each requested product directly by ID. This avoids product-list
    // pagination issues where some IDs are not present in page 1.
    const products = await Promise.all(
      planEntries.map(([, productId]) => fetchProductById(productId))
    );

    const getProductPricing = (productId: string, label: string): PricingResponse => {
      const product = products.find((p: any) => 
        p.id === productId || 
        p.product_id === productId || 
        p.uuid === productId ||
        String(p.id) === String(productId) ||
        String(p.product_id) === String(productId) ||
        String(p.uuid) === String(productId)
      );

      if (!product) {
        console.warn(`[HostingPricing] No product found for ${label} (${productId})`);
        return { monthly: null, yearly: null, biyearly: null };
      }

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

      if (!subscriptionTerms || !Array.isArray(subscriptionTerms) || subscriptionTerms.length === 0) {
        console.warn(
          `[HostingPricing] No subscription_terms array for ${label} (${productId}). prices shape:`,
          JSON.stringify(product.prices)?.slice(0, 300)
        );

        // Fallback: try single price on product as yearly price
        const singlePrice =
          product.price ??
          product.amount ??
          product.register_price ??
          product.registration_price ??
          (product.prices && typeof product.prices === 'object' && !Array.isArray(product.prices)
            ? (product.prices.price ?? null)
            : null);

        let n: number | null = null;
        if (typeof singlePrice === 'number') {
          n = singlePrice;
        } else if (typeof singlePrice === 'string' && singlePrice.trim() !== '') {
          const parsed = parseFloat(singlePrice);
          if (!Number.isNaN(parsed) && parsed > 0) n = parsed;
        }

        if (n != null && n > 0) {
          return {
            monthly: n / 12,
            yearly: n,
            biyearly: n * 2,
          };
        }

        return { monthly: null, yearly: null, biyearly: null };
      }

      const usdTerms = subscriptionTerms.filter((term: any) => 
        term.currency_code === 'USD' || term.currency_code === 'usd'
      );
      const terms =
        usdTerms.length > 0
          ? usdTerms
          : subscriptionTerms;

      let monthly = extractPrice(terms, 1, 1);
      let yearly = extractPrice(terms, 12, 1);
      let biyearly = extractPrice(terms, 24, 2);

      // If no direct match for our target periods but we DO have terms,
      // fall back to using the first term as a base yearly price
      if (monthly == null && yearly == null && biyearly == null && terms.length > 0) {
        const base = getAmountFromTerm(terms[0]);
        if (base != null && base > 0) {
          yearly = base;
          monthly = base / 12;
          biyearly = base * 2;
          console.warn(
            `[HostingPricing] Fallback pricing for ${label} (${productId}) using first term as yearly:`,
            { yearly, monthly, biyearly }
          );
        }
      }

      return {
        monthly,
        yearly,
        biyearly,
      };
    };

    return NextResponse.json({
      success: true,
      pricing: Object.fromEntries(
        planEntries.map(([planName, productId]) => [
          planName,
          getProductPricing(productId, planName),
        ])
      ) as Record<string, PricingResponse>,
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
    )
      return true;

    if (
      targetYears != null &&
      (t.billing_cycle_years === targetYears ||
        t.billing_cycle === targetYears)
    )
      return true;

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

  const n = typeof raw === "number" ? raw : parseFloat(String(raw));
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
  const n = typeof raw === "number" ? raw : parseFloat(String(raw));
  return Number.isNaN(n) ? null : n;
}
