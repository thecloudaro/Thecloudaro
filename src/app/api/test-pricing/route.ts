import { NextRequest, NextResponse } from 'next/server';
import { hostingPlanProductIds } from '@/config/hosting-plans';

/**
 * Test endpoint to fetch shared hosting packages costs
 * Simple endpoint - just fetches and returns raw data
 */
export async function GET(req: NextRequest) {
  try {
    const apiToken = process.env.UPMIND_API_TOKEN;

    if (!apiToken) {
      return NextResponse.json({
        error: 'UPMIND_API_TOKEN not configured',
      }, { status: 500 });
    }

    // Get all shared hosting package IDs
    const essentialProductId = hostingPlanProductIds.Essential;
    const proProductId = hostingPlanProductIds.Pro;
    const supremeProductId = hostingPlanProductIds.Supreme;

    // Helper function to fetch costs for a product
    const fetchProductCosts = async (productId: string, planName: string) => {
      const costsEndpoint = `https://api.upmind.io/api/admin/products/${productId}/costs`;
      
      try {
        const response = await fetch(costsEndpoint, {
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
          } catch (parseError) {
            errorText = await response.text();
          }
        } else {
          errorText = await response.text();
        }

        return {
          planName,
          productId,
          status,
          success: response.ok,
          data: data, // Return raw data
          error: errorText ? errorText.substring(0, 500) : null,
        };
      } catch (error) {
        return {
          planName,
          productId,
          status: 0,
          success: false,
          data: null,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    };

    // Fetch costs for all three shared hosting packages
    const [essentialCosts, proCosts, supremeCosts] = await Promise.all([
      fetchProductCosts(essentialProductId, 'Essential'),
      fetchProductCosts(proProductId, 'Pro'),
      fetchProductCosts(supremeProductId, 'Supreme'),
    ]);

    return NextResponse.json({
      config: {
        hasToken: !!apiToken,
        endpoint: 'GET /api/admin/products/{product_id}/costs',
        plans: {
          Essential: essentialProductId,
          Pro: proProductId,
          Supreme: supremeProductId,
        },
      },
      plans: {
        Essential: essentialCosts,
        Pro: proCosts,
        Supreme: supremeCosts,
      },
    });
  } catch (error) {
    console.error('❌ Error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
