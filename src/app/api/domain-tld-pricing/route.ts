import { NextRequest, NextResponse } from 'next/server';
import {
  buildSyntheticTermsFromModuleRow,
  extractSubscriptionTerms,
  fetchSubscriptionTermsForProduct,
  getAmountFromTerm,
  normalizeUpmindListPayload,
  pickPreferredDomainPriceTerm,
} from '@/lib/upmind/pricingTerms';

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
 * Fetch domain TLD pricing from Upmind API.
 * Uses GET /api/admin/modules/web_hosting/domains/tlds (per-TLD prices).
 * A legacy hardcoded product UUID was removed — it caused 404 "Product not found!" when that product
 * no longer existed in the store; TLD rows do not depend on that call.
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
          error: 'UPMIND_API_TOKEN is not set. Locally: add to .env.local. On Vercel: Project → Settings → Environment Variables → add UPMIND_API_TOKEN → Redeploy.',
          tlds: []
        },
        { status: 500 }
      );
    }

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
    const tldsList = normalizeUpmindListPayload(tldsData);

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

      let prices = extractSubscriptionTerms(tldItem);
      if (!prices?.length && Array.isArray((tldItem as any).prices)) {
        prices = (tldItem as any).prices;
      }
      if (!prices?.length && Array.isArray((tldItem as any).pricing)) {
        prices = (tldItem as any).pricing;
      }

      if (!prices?.length && tldItem.id) {
        const fromProduct = await fetchSubscriptionTermsForProduct(String(tldItem.id), apiToken);
        if (fromProduct?.length) prices = fromProduct;
      }
      if (!prices?.length) {
        const syn = buildSyntheticTermsFromModuleRow(tldItem as Record<string, unknown>);
        if (syn?.length) prices = syn;
      }

      if (!prices?.length) {
        console.warn(`⚠️ [Domain TLD Pricing] No pricing rows for ${tld}`);
        continue;
      }

      const term = pickPreferredDomainPriceTerm(prices);
      if (!term) {
        console.warn(`⚠️ [Domain TLD Pricing] Could not pick a price term for ${tld}`);
        continue;
      }

      const base = getAmountFromTerm(term);
      if (base == null || base <= 0) {
        console.warn(`⚠️ [Domain TLD Pricing] Invalid amount for ${tld}:`, base);
        continue;
      }

      const cur = String(term.currency_code || term.currency || 'USD').toUpperCase();

      const num = (v: unknown, fallback: number) => {
        if (v == null) return fallback;
        const n = typeof v === 'number' ? v : parseFloat(String(v));
        return Number.isNaN(n) || n <= 0 ? fallback : n;
      };

      const registerPrice = num(
        term.register_price ?? term.registration_price,
        base
      );
      const renewPrice = num(term.renew_price ?? term.renewal_price, base);
      const transferPrice = num(term.transfer_price, base);

      tldPricingList.push({
        tld,
        registerPrice,
        renewPrice,
        transferPrice,
        currency: cur,
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
