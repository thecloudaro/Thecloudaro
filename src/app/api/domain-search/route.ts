import { NextRequest, NextResponse } from 'next/server';

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

    // Domain category ID from Upmind (where .shop, .com, .xyz are configured)
    const domainCategoryId = '5196e02e-5136-d426-837b-9429807875d3';
    
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

    if (categoryResponse.ok) {
      const categoryData = await categoryResponse.json();
      tldsList = Array.isArray(categoryData) 
        ? categoryData 
        : (categoryData.data || categoryData.products || categoryData.items || []);
      console.log(`✅ [Domain Search] Found ${tldsList.length} domain products from category endpoint`);
      
      // Log sample product structure for debugging
      if (tldsList.length > 0) {
        console.log(`📦 [Domain Search] Sample product structure (first item):`, JSON.stringify(tldsList[0], null, 2).substring(0, 1000));
      } else {
        console.warn(`⚠️ [Domain Search] Products list is empty after parsing. Raw response:`, JSON.stringify(categoryData, null, 2).substring(0, 500));
      }
    } else {
      const errorText = await categoryResponse.text();
      console.error('❌ [Domain Search] Category products endpoint error:', categoryResponse.status, errorText);
      console.warn('⚠️ [Domain Search] Category endpoint failed, trying TLDs endpoint as fallback...');
      
      // Fallback: Try TLDs endpoint
      const tldsEndpoint = 'https://api.upmind.io/api/admin/modules/web_hosting/domains/tlds';
      
      console.log('🚀 [Domain Search] Fetching TLDs from:', tldsEndpoint);

      const tldsResponse = await fetch(tldsEndpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (tldsResponse.ok) {
        const tldsData = await tldsResponse.json();
        tldsList = Array.isArray(tldsData) ? tldsData : (tldsData.data || tldsData.tlds || tldsData.items || []);
        console.log(`✅ [Domain Search] Found ${tldsList.length} TLDs from TLDs endpoint`);
      } else {
        const tldsErrorText = await tldsResponse.text();
        console.error('❌ [Domain Search] TLDs endpoint also failed:', tldsResponse.status, tldsErrorText);
        
        // Fallback: Try to fetch all products and filter for domain products
        const productsEndpoint = 'https://api.upmind.io/api/admin/products?with=prices,costs';
        
        console.log('🚀 [Domain Search] Fetching products from:', productsEndpoint);

        const productsResponse = await fetch(productsEndpoint, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (productsResponse.ok) {
          const productsData = await productsResponse.json();
          const productsList = Array.isArray(productsData) 
            ? productsData 
            : (productsData.data || productsData.products || productsData.items || []);

          console.log(`✅ [Domain Search] Found ${productsList.length} products from Upmind`);
          
          // Filter for domain-related products (you can adjust this filter based on your product structure)
          // For now, we'll process all products and extract TLDs
          tldsList = productsList;
        } else {
          const errorText = await productsResponse.text();
          console.error('❌ [Domain Search] Products API error:', productsResponse.status, errorText);
          return NextResponse.json(
            {
              success: false,
              error: `Upmind API returned ${productsResponse.status}. Please check your API configuration.`,
              domains: []
            },
            { status: productsResponse.status }
          );
        }
      }
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

      // Extract pricing from TLD item
      // TLD item structure: { prices: [...], pricing: [...] } or product structure
      let prices = null;
      
      // Try multiple pricing structures
      if (tldItem.prices && Array.isArray(tldItem.prices)) {
        prices = tldItem.prices;
      } else if (tldItem.pricing && Array.isArray(tldItem.pricing)) {
        prices = tldItem.pricing;
      } else if (tldItem.prices?.subscription_terms && Array.isArray(tldItem.prices.subscription_terms)) {
        prices = tldItem.prices.subscription_terms;
      } else if (tldItem.subscription_terms && Array.isArray(tldItem.subscription_terms)) {
        prices = tldItem.subscription_terms;
      } else if (tldItem.billing?.subscription_terms && Array.isArray(tldItem.billing.subscription_terms)) {
        prices = tldItem.billing.subscription_terms;
      } else if (tldItem.costs && Array.isArray(tldItem.costs)) {
        prices = tldItem.costs;
      } else if (tldItem.price && typeof tldItem.price === 'number') {
        // If direct price field exists, create a mock pricing entry
        prices = [{
          price: tldItem.price,
          currency_code: tldItem.currency || 'USD',
          billing_cycle_months: 12
        }];
      } else if (tldItem.register_price || tldItem.registration_price) {
        // If register_price exists directly
        prices = [{
          price: tldItem.register_price || tldItem.registration_price,
          currency_code: tldItem.currency_code || 'USD',
          billing_cycle_months: 12,
          register_price: tldItem.register_price || tldItem.registration_price,
          renew_price: tldItem.renew_price || tldItem.renewal_price || tldItem.register_price || tldItem.registration_price,
          transfer_price: tldItem.transfer_price || tldItem.register_price || tldItem.registration_price
        }];
      }

      if (!prices || !Array.isArray(prices) || prices.length === 0) {
        console.log(`⚠️ [Domain Search] No pricing found for TLD ${tld}. Item keys:`, Object.keys(tldItem));
        continue;
      }
      
      console.log(`💰 [Domain Search] Found ${prices.length} pricing entries for TLD ${tld}`);

      // Find USD pricing for 12 months (yearly) - domain pricing is typically yearly
      // Also try to find any USD pricing if yearly not found
      let usdYearlyPrice = prices.find((p: any) =>
        (p.currency_code === 'USD' || p.currency_code === 'usd') &&
        (p.billing_cycle_months === 12 || p.billing_cycle_years === 1 || p.billing_cycle === 12 || p.period_months === 12 || p.period === 12)
      );
      
      // If no yearly price found, try to get any USD price
      if (!usdYearlyPrice) {
        usdYearlyPrice = prices.find((p: any) =>
          p.currency_code === 'USD' || p.currency_code === 'usd'
        );
      }
      
      // If still no USD price, try any price (we'll convert later if needed)
      if (!usdYearlyPrice && prices.length > 0) {
        usdYearlyPrice = prices[0]; // Use first available price
        console.log(`⚠️ [Domain Search] No USD pricing for ${tld}, using first available:`, usdYearlyPrice.currency_code);
      }

      if (!usdYearlyPrice) {
        skippedCount++;
        if (skippedCount <= 5) {
          const availableCurrencies = prices.map((p: any) => p.currency_code || 'unknown').filter((v: any, i: number, arr: any[]) => arr.indexOf(v) === i);
          console.log(`⚠️ [Domain Search] No pricing found for TLD ${tld}. Available currencies:`, availableCurrencies);
        }
        continue;
      }
      
      // Limit success logs
      if (domainResults.length < 5) {
        console.log(`✅ [Domain Search] Found pricing for TLD ${tld}:`, {
          price: usdYearlyPrice.price,
          billing_cycle_months: usdYearlyPrice.billing_cycle_months,
          currency: usdYearlyPrice.currency_code
        });
      }

      const price = usdYearlyPrice.price || usdYearlyPrice.amount || usdYearlyPrice.cost || null;

      if (!price || price <= 0) {
        skippedCount++;
        continue;
      }
      
      // Get currency from price object
      const currency = usdYearlyPrice.currency_code || 'USD';

      // Construct domain name
      const domainName = `${cleanSearchTerm}${tld}`;
      
      // Premium domains are typically those with higher prices
      const isPremium = price > 50;
      const isPopular = popularTlds.includes(tld);
      
      // Calculate original price (if there's a discount, otherwise same as price)
      const originalPrice = usdYearlyPrice.original_price || usdYearlyPrice.price_discounted || null;
      const registerPrice = usdYearlyPrice.register_price || usdYearlyPrice.registration_price || usdYearlyPrice.price || price;

      domainResults.push({
        name: domainName,
        available: true, // TODO: Implement actual availability check via Upmind API
        price: typeof registerPrice === 'number' ? registerPrice : parseFloat(String(registerPrice)),
        currency: currency, // Use currency from price object
        originalPrice: originalPrice && originalPrice > registerPrice ? (typeof originalPrice === 'number' ? originalPrice : parseFloat(String(originalPrice))) : undefined,
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

    // Limit to top 20 results
    const limitedResults = domainResults.slice(0, 20);

    console.log(`✅ [Domain Search] Generated ${limitedResults.length} domain results for "${cleanSearchTerm}"`);
    console.log(`📊 [Domain Search] Processing summary:`, {
      totalTlds: tldsList.length,
      processed: processedCount,
      skipped: skippedCount,
      resultsGenerated: domainResults.length,
      finalResults: limitedResults.length
    });
    
    // If no results generated from pricing, build results only from Store catalogue (tldsList)
    if (limitedResults.length === 0 && tldsList.length > 0) {
      console.warn(`⚠️ [Domain Search] No domain results from pricing. Using Store catalogue TLDs only.`);
      const defaultPrice = 10.99;

      for (const tldItem of tldsList) {
        let tld = '';
        if (tldItem.tld) {
          tld = String(tldItem.tld).toLowerCase();
        } else if (tldItem.name) {
          const nameStr = String(tldItem.name).toLowerCase().trim();
          tld = nameStr.startsWith('.') ? nameStr : `.${nameStr}`;
        } else {
          const productName = String(tldItem.name || tldItem.title || tldItem.product_name || '').toLowerCase().trim();
          if (productName.startsWith('.')) tld = productName;
          else if (productName) tld = `.${productName}`;
        }
        if (!tld || !tld.startsWith('.')) continue;

        limitedResults.push({
          name: `${cleanSearchTerm}${tld}`,
          available: true,
          price: defaultPrice,
          currency: 'USD',
          popular: popularTlds.includes(tld),
          premium: false,
          tld,
        });
      }
      console.log(`✅ [Domain Search] Created ${limitedResults.length} results from Store catalogue only`);
    } else if (limitedResults.length > 0) {
      console.log(`📊 [Domain Search] Sample results:`, limitedResults.slice(0, 3).map(d => ({ name: d.name, price: d.price, tld: d.tld })));
    } else {
      console.warn(`⚠️ [Domain Search] No TLDs available to process!`);
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
