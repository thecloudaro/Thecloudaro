import { NextRequest, NextResponse } from 'next/server';
import {
  buildSyntheticTermsFromModuleRow,
  extractSubscriptionTerms,
  fetchSubscriptionTermsForProduct,
  getAmountFromTerm,
  normalizeUpmindListPayload,
  pickPreferredDomainPriceTerm,
} from '@/lib/upmind/pricingTerms';

interface DomainSearchResult {
  name: string;
  available: boolean;
  price: number;
  currency: string;
  originalPrice?: number;
  popular?: boolean;
  premium?: boolean;
  tld: string;
}

interface DomainSearchResponse {
  success: boolean;
  domains?: DomainSearchResult[];
  error?: string;
}

/**
 * Search domain names with TLDs from Upmind API
 * Fetches domain products from category: 5196e02e-5136-d426-837b-9429807875d3
 * Uses category products endpoint: /api/admin/catalogue/category/{categoryId}/products
 * Falls back to TLDs endpoint if category endpoint fails
 */
export async function GET(req: NextRequest) {
  // Immediate logging to verify route is being called
  console.log('🚀🚀🚀 [Domain Search] API route called! 🚀🚀🚀');
  console.log('🚀 [Domain Search] Request URL:', req.url);
  console.log('🚀 [Domain Search] Request method:', req.method);
  console.log('🚀 [Domain Search] Timestamp:', new Date().toISOString());
  
  try {
    const { searchParams } = new URL(req.url);
    const searchTerm = searchParams.get('term');
    
    console.log('🚀 [Domain Search] Search term from query:', searchTerm);

    // Search term is optional - if not provided, show all available domains
    // We'll process it later after fetching domains
    console.log('✅ [Domain Search] Search term received:', searchTerm || '(empty - will show all domains)');

    // Validate API token
    const apiToken = process.env.UPMIND_API_TOKEN;
    if (!apiToken) {
      return NextResponse.json(
        {
          success: false,
          error: 'UPMIND_API_TOKEN is not set. Locally: add to .env.local. On Vercel: Project → Settings → Environment Variables → add UPMIND_API_TOKEN → Redeploy.',
          domains: []
        },
        { status: 500 }
      );
    }

    // Optional: set UPMIND_DOMAIN_CATEGORY_ID in .env to your Store catalogue → Domains category UUID.
    const domainCategoryId =
      process.env.UPMIND_DOMAIN_CATEGORY_ID?.trim() ||
      '5196e02e-5136-d426-837b-9429807875d3';
    
    // First, try to fetch domain products from category endpoint (this will get the 3 configured domains)
    const categoryProductsEndpoint = `https://api.upmind.io/api/admin/catalogue/category/${domainCategoryId}/products?with=prices,costs`;
    
    console.log('🚀 [Domain Search] Fetching domain products from category:', categoryProductsEndpoint);

    const categoryResponse = await fetch(categoryProductsEndpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    let tldsList: any[] = [];

    const fetchTldsFromModule = async (): Promise<any[]> => {
      const tldsEndpoint = 'https://api.upmind.io/api/admin/modules/web_hosting/domains/tlds';
      const tldsResponse = await fetch(tldsEndpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!tldsResponse.ok) {
        const tldsErrorText = await tldsResponse.text();
        console.error('❌ [Domain Search] TLDs endpoint failed:', tldsResponse.status, tldsErrorText);
        return [];
      }
      const tldsData = await tldsResponse.json();
      return normalizeUpmindListPayload(tldsData);
    };

    const fetchAllProducts = async (): Promise<any[]> => {
      const productsEndpoint = 'https://api.upmind.io/api/admin/products?with=prices,costs';
      const productsResponse = await fetch(productsEndpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!productsResponse.ok) {
        const errorText = await productsResponse.text();
        console.error('❌ [Domain Search] Products API error:', productsResponse.status, errorText);
        return [];
      }
      const productsData = await productsResponse.json();
      return normalizeUpmindListPayload(productsData);
    };

    if (categoryResponse.ok) {
      const categoryData = await categoryResponse.json();
      tldsList = normalizeUpmindListPayload(categoryData);
      console.log(`✅ [Domain Search] Found ${tldsList.length} domain products from category endpoint`);

      if (tldsList.length > 0) {
        console.log(
          `📦 [Domain Search] Sample product structure (first item):`,
          JSON.stringify(tldsList[0], null, 2).substring(0, 1000)
        );
      } else {
        console.warn(
          `⚠️ [Domain Search] Category list empty after normalize. Raw keys:`,
          categoryData && typeof categoryData === 'object' ? Object.keys(categoryData as object) : []
        );
      }
    } else {
      const errorText = await categoryResponse.text();
      console.error('❌ [Domain Search] Category products endpoint error:', categoryResponse.status, errorText);
    }

    if (tldsList.length === 0) {
      console.warn('⚠️ [Domain Search] Falling back to TLDs module endpoint…');
      tldsList = await fetchTldsFromModule();
      console.log(`✅ [Domain Search] TLDs module returned ${tldsList.length} rows`);
    }

    if (tldsList.length === 0) {
      console.warn('⚠️ [Domain Search] Falling back to admin products list…');
      tldsList = await fetchAllProducts();
      if (tldsList.length === 0) {
        return NextResponse.json(
          {
            success: false,
            error: 'Upmind returned no domain/TLD products. Check catalogue category, TLD module, and API token scopes.',
            domains: [],
          },
          { status: 502 }
        );
      }
      console.log(`✅ [Domain Search] Using ${tldsList.length} products from admin/products`);
    }
    
    // If no TLDs/products found, return empty
    if (!tldsList || tldsList.length === 0) {
      console.warn('⚠️ [Domain Search] No TLDs/products found in response');
      return NextResponse.json({
        success: true,
        domains: [],
      });
    }

    // Popular TLDs to mark as popular
    const popularTlds = ['.com', '.net', '.org', '.io', '.co'];
    
    // Extract domain names and pricing from TLDs
    const domainResults: DomainSearchResult[] = [];
    
    // Process search term - if not provided, use "example" to show all available domains
    let cleanSearchTerm = (searchTerm ? searchTerm.trim() : 'example').toLowerCase();
    
    // If user searched for just a TLD (starts with dot), use "example" as default
    if (cleanSearchTerm.startsWith('.')) {
      console.log(`⚠️ [Domain Search] User searched for TLD only: ${cleanSearchTerm}. Using "example" as domain name.`);
      cleanSearchTerm = 'example';
    }
    
    // Remove any existing TLD from search term (e.g., "example.com" -> "example")
    const tldMatch = cleanSearchTerm.match(/^(.+?)(\.[a-z0-9]+)+$/i);
    if (tldMatch) {
      cleanSearchTerm = tldMatch[1];
      console.log(`ℹ️ [Domain Search] Extracted domain name from search: "${cleanSearchTerm}"`);
    }

    console.log(`🔍 [Domain Search] Processing ${tldsList.length} TLDs with search term: "${cleanSearchTerm}"`);

    // Process each TLD item to extract domain information
    let processedCount = 0;
    let skippedCount = 0;
    
    for (const tldItem of tldsList) {
      processedCount++;
      // Extract TLD from TLD item
      // TLD item structure: { tld: '.com', name: '.com', ... } or product structure
      let tld = '';
      
      // Extract TLD from product item
      // Products from category endpoint will have names like ".shop", ".com", ".xyz"
      if (tldItem.tld) {
        tld = String(tldItem.tld).toLowerCase();
      } else if (tldItem.name) {
        // Product name might be ".shop", ".com", etc.
        const nameStr = String(tldItem.name).toLowerCase().trim();
        if (nameStr.startsWith('.')) {
          tld = nameStr;
        } else {
          tld = nameStr;
        }
      } else {
        // Try to extract TLD from various product fields
        const productName = String(tldItem.name || tldItem.title || tldItem.product_name || tldItem.label || '').toLowerCase().trim();
        const productDescription = String(tldItem.description || '').toLowerCase();
        
        // Check if product name starts with dot (e.g., ".shop", ".com")
        if (productName.startsWith('.')) {
          tld = productName;
        } else {
          // Try to match TLD pattern in name or description
          const tldMatch = productName.match(/\.([a-z0-9]+)/i) || productDescription.match(/\.([a-z0-9]+)/i);
          if (tldMatch) {
            tld = `.${tldMatch[1].toLowerCase()}`;
          } else {
            tld = String(tldItem.tld || tldItem.domain_extension || tldItem.extension || tldItem.suffix || '').toLowerCase();
          }
        }
      }

      // Ensure TLD starts with dot
      if (tld && !tld.startsWith('.')) {
        tld = `.${tld}`;
      }

      // Skip if no valid TLD found
      if (!tld || !tld.startsWith('.')) {
        skippedCount++;
        if (skippedCount <= 3) {
          // Only log first few skipped items to avoid spam
          console.log(`⚠️ [Domain Search] Skipping item ${processedCount} - no valid TLD found. Item keys:`, Object.keys(tldItem));
        }
        continue;
      }
      
      // Limit logging to first 10 TLDs to avoid console spam
      if (domainResults.length < 10) {
        console.log(`🔍 [Domain Search] Processing TLD ${processedCount}/${tldsList.length}: ${tld}`);
      }

      let prices = extractSubscriptionTerms(tldItem);

      if (!prices?.length && tldItem.price != null) {
        const raw = tldItem.price;
        const n = typeof raw === 'number' ? raw : parseFloat(String(raw));
        if (!Number.isNaN(n) && n > 0) {
          prices = [
            {
              price: n,
              currency_code: (tldItem as any).currency_code || (tldItem as any).currency || 'USD',
              billing_cycle_months: 12,
            },
          ];
        }
      }

      if (!prices?.length && ((tldItem as any).register_price || (tldItem as any).registration_price)) {
        const reg = (tldItem as any).register_price || (tldItem as any).registration_price;
        const n = typeof reg === 'number' ? reg : parseFloat(String(reg));
        if (!Number.isNaN(n) && n > 0) {
          prices = [
            {
              price: n,
              currency_code: (tldItem as any).currency_code || 'USD',
              billing_cycle_months: 12,
              register_price: reg,
              renew_price: (tldItem as any).renew_price || (tldItem as any).renewal_price || reg,
              transfer_price: (tldItem as any).transfer_price || reg,
            },
          ];
        }
      }

      // TLD list rows are often stubs: full subscription terms live on the catalogue product.
      if (!prices?.length && tldItem.id) {
        const fromProduct = await fetchSubscriptionTermsForProduct(String(tldItem.id), apiToken);
        if (fromProduct?.length) prices = fromProduct;
      }
      if (!prices?.length) {
        const syn = buildSyntheticTermsFromModuleRow(tldItem as Record<string, unknown>);
        if (syn?.length) prices = syn;
      }

      if (!prices?.length) {
        if (skippedCount <= 3) {
          console.log(`⚠️ [Domain Search] No pricing found for TLD ${tld}. Item keys:`, Object.keys(tldItem));
        }
        skippedCount++;
        continue;
      }

      if (domainResults.length < 5) {
        console.log(`💰 [Domain Search] ${prices.length} pricing row(s) for TLD ${tld}`);
      }

      const usdYearlyPrice = pickPreferredDomainPriceTerm(prices);
      if (!usdYearlyPrice) {
        skippedCount++;
        continue;
      }

      const baseAmount = getAmountFromTerm(usdYearlyPrice);
      if (baseAmount == null || baseAmount <= 0) {
        skippedCount++;
        continue;
      }

      const currency =
        usdYearlyPrice.currency_code || usdYearlyPrice.currency || 'USD';

      const domainName = `${cleanSearchTerm}${tld}`;

      const isPremium = baseAmount > 50;
      const isPopular = popularTlds.includes(tld);

      const regRaw =
        usdYearlyPrice.register_price ??
        usdYearlyPrice.registration_price ??
        baseAmount;
      const registerPrice =
        typeof regRaw === 'number' ? regRaw : parseFloat(String(regRaw));
      if (!registerPrice || registerPrice <= 0) {
        skippedCount++;
        continue;
      }

      const originalRaw =
        usdYearlyPrice.original_price ?? usdYearlyPrice.price_discounted ?? null;
      const originalPrice =
        originalRaw != null
          ? typeof originalRaw === 'number'
            ? originalRaw
            : parseFloat(String(originalRaw))
          : null;

      domainResults.push({
        name: domainName,
        available: true, // TODO: Implement actual availability check via Upmind API
        price: typeof registerPrice === 'number' ? registerPrice : parseFloat(String(registerPrice)),
        currency: currency, // Use currency from price object
        originalPrice:
          originalPrice != null &&
          Number.isFinite(originalPrice) &&
          originalPrice > registerPrice
            ? originalPrice
            : undefined,
        popular: isPopular,
        premium: isPremium,
        tld: tld,
      });
    }

    // Sort results: popular first, then by price
    domainResults.sort((a, b) => {
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return a.price - b.price;
    });

    // Cap so the response stays reasonable for the UI (full TLD catalogue can be large)
    const limitedResults = domainResults.slice(0, 200);

    console.log(`✅ [Domain Search] Generated ${limitedResults.length} domain results for "${cleanSearchTerm}"`);
    console.log(`📊 [Domain Search] Processing summary:`, {
      totalTlds: tldsList.length,
      processed: processedCount,
      skipped: skippedCount,
      resultsGenerated: domainResults.length,
      finalResults: limitedResults.length
    });
    
    if (limitedResults.length > 0) {
      console.log(`📊 [Domain Search] Sample results:`, limitedResults.slice(0, 3).map(d => ({ name: d.name, price: d.price, tld: d.tld })));
    } else {
      console.warn(`⚠️ [Domain Search] No priced domain results from Upmind; returning empty list.`);
      if (tldsList.length > 0) {
        console.warn(`⚠️ [Domain Search] First TLD item structure:`, JSON.stringify(tldsList[0], null, 2).substring(0, 1000));
      }
    }

    return NextResponse.json({
      success: true,
      domains: limitedResults,
    });
  } catch (error) {
    console.error('❌ [Domain Search] API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown server error';
    
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        domains: []
      },
      { status: 500 }
    );
  }

}
