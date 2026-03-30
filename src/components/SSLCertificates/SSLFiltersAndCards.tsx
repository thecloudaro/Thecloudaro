"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type ValidationType = "All" | "DV" | "OV" | "EV";
type DomainType = "All" | "Single" | "Multi" | "Wildcard";
type ProviderType = "All" | "Digicert" | "GeoTrust" | "Sectigo" | "Thawte" | "PerfectSSL";
type Duration = "1" | "2" | "3" | "4" | "5";

interface SSLProduct {
  id: string;
  name: string;
  validation: string;
  domains: string;
  provider: string;
  pricing: {
    [duration: string]: number | null;
  };
}

interface SSLFiltersAndCardsProps {}

// Fallback products to ensure we always show at least 5 cards
const FALLBACK_PRODUCTS: SSLProduct[] = [
  {
    id: "fallback-dv-single-1",
    name: "Standard DV SSL",
    validation: "DV",
    domains: "Single",
    provider: "PerfectSSL",
    pricing: {
      "1": 19.99,
      "2": 34.99,
      "3": 47.99,
    },
  },
  {
    id: "fallback-dv-wildcard-1",
    name: "Wildcard DV SSL",
    validation: "DV",
    domains: "Wildcard",
    provider: "PerfectSSL",
    pricing: {
      "1": 79.99,
      "2": 139.99,
      "3": 189.99,
    },
  },
  {
    id: "fallback-ov-single-1",
    name: "Business OV SSL",
    validation: "OV",
    domains: "Single",
    provider: "PerfectSSL",
    pricing: {
      "1": 49.99,
      "2": 89.99,
      "3": 119.99,
    },
  },
  {
    id: "fallback-ov-multi-1",
    name: "Multi‑Domain OV SSL",
    validation: "OV",
    domains: "Multi",
    provider: "PerfectSSL",
    pricing: {
      "1": 99.99,
      "2": 179.99,
      "3": 239.99,
    },
  },
  {
    id: "fallback-ev-single-1",
    name: "Advanced EV SSL",
    validation: "EV",
    domains: "Single",
    provider: "PerfectSSL",
    pricing: {
      "1": 129.99,
      "2": 229.99,
      "3": 309.99,
    },
  },
];

const SSLFiltersAndCards = ({}: SSLFiltersAndCardsProps) => {
  const [validationFilter, setValidationFilter] = useState<ValidationType>("All");
  const [domainFilter, setDomainFilter] = useState<DomainType>("All");
  const [providerFilter, setProviderFilter] = useState<ProviderType>("All");
  const [selectedDuration, setSelectedDuration] = useState<Duration>("1");
  const [products, setProducts] = useState<SSLProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch SSL products from API
  useEffect(() => {
    const fetchSSLProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/ssl-pricing');
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch SSL products');
        }

        // Convert products object to array – show all fetched from Upmind (e.g. 13 SSL cards)
        const productsArray: SSLProduct[] = Object.entries(data.products || {}).map(
          ([id, product]: [string, any]) => ({
            id,
            name: product.name,
            validation: product.validation,
            domains: product.domains,
            provider: product.provider || "Other",
            pricing: product.pricing || {},
          })
        );

        console.log(`✅ [SSLFiltersAndCards] Received ${productsArray.length} SSL products from API`);
        console.log(`📋 [SSLFiltersAndCards] Product names:`, productsArray.map(p => p.name).join(', '));

        // Use API results only; fallbacks only when API returned no products (e.g. error/empty)
        if (productsArray.length > 0) {
          setProducts(productsArray);
        } else {
          console.warn('⚠️ [SSLFiltersAndCards] No products from API, using fallbacks');
          setProducts(FALLBACK_PRODUCTS);
        }
      } catch (err) {
        console.error('Error fetching SSL products:', err);
        setError(err instanceof Error ? err.message : 'Failed to load SSL products');
      } finally {
        setLoading(false);
      }
    };

    fetchSSLProducts();
  }, []);

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesValidation =
        validationFilter === "All" || product.validation === validationFilter;
      const matchesDomain =
        domainFilter === "All" || product.domains === domainFilter;
      const matchesProvider =
        providerFilter === "All" ||
        (product.provider &&
          product.provider.toLowerCase() === providerFilter.toLowerCase());

      return matchesValidation && matchesDomain && matchesProvider;
    });
  }, [products, validationFilter, domainFilter, providerFilter]);

  // Get price for selected duration
  const getPrice = (product: SSLProduct): number | null => {
    return product.pricing[selectedDuration] || null;
  };

  // Format price
  const formatPrice = (price: number | null): string => {
    if (price === null) return "N/A";
    return `$${price.toFixed(2)}`;
  };

  // Calculate discount (if applicable - comparing 1 year vs multi-year)
  const getDiscount = (product: SSLProduct): string | null => {
    const oneYearPrice = product.pricing["1"];
    const currentPrice = product.pricing[selectedDuration];
    
    if (!oneYearPrice || !currentPrice || selectedDuration === "1") {
      return null;
    }

    const totalOneYear = oneYearPrice * parseInt(selectedDuration);
    if (totalOneYear <= currentPrice) {
      return null;
    }

    const discount = ((totalOneYear - currentPrice) / totalOneYear) * 100;
    return `${Math.round(discount)}% OFF`;
  };

  return (
    <section className="relative py-14 sm:py-16 lg:py-20 bg-[rgb(var(--ssl-bg-page))]">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Filters Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            {/* Validation Filter */}
            <div className="relative">
              <label className="sr-only" htmlFor="validation-filter">
                Validation Type
              </label>
              <select
                id="validation-filter"
                value={validationFilter}
                onChange={(e) => setValidationFilter(e.target.value as ValidationType)}
                className="appearance-none rounded-lg border border-[rgb(var(--ssl-border-strong))] bg-[rgb(var(--ssl-bg-elevated))] px-4 py-2.5 pr-10 text-sm text-[rgb(var(--ssl-text-primary))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ssl-focus-ring))] focus:border-transparent transition-all"
              >
                <option value="All">All Validation</option>
                <option value="DV">DV</option>
                <option value="OV">OV</option>
                <option value="EV">EV</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-[rgb(var(--ssl-text-muted))]"
              />
            </div>

            {/* Domain Filter */}
            <div className="relative">
              <label className="sr-only" htmlFor="domain-filter">
                Domain Type
              </label>
              <select
                id="domain-filter"
                value={domainFilter}
                onChange={(e) => setDomainFilter(e.target.value as DomainType)}
                className="appearance-none rounded-lg border border-[rgb(var(--ssl-border-strong))] bg-[rgb(var(--ssl-bg-elevated))] px-4 py-2.5 pr-10 text-sm text-[rgb(var(--ssl-text-primary))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ssl-focus-ring))] focus:border-transparent transition-all"
              >
                <option value="All">All Domains</option>
                <option value="Single">Single</option>
                <option value="Multi">Multi</option>
                <option value="Wildcard">Wildcard</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-[rgb(var(--ssl-text-muted))]"
              />
            </div>

            {/* Provider Filter */}
            <div className="relative">
              <label className="sr-only" htmlFor="provider-filter">
                SSL Provider
              </label>
              <select
                id="provider-filter"
                value={providerFilter}
                onChange={(e) => setProviderFilter(e.target.value as ProviderType)}
                className="appearance-none rounded-lg border border-[rgb(var(--ssl-border-strong))] bg-[rgb(var(--ssl-bg-elevated))] px-4 py-2.5 pr-10 text-sm text-[rgb(var(--ssl-text-primary))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ssl-focus-ring))] focus:border-transparent transition-all"
              >
                <option value="All">All providers</option>
                <option value="Digicert">Digicert</option>
                <option value="GeoTrust">GeoTrust</option>
                <option value="Sectigo">Sectigo</option>
                <option value="Thawte">Thawte</option>
                <option value="PerfectSSL">PerfectSSL</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-[rgb(var(--ssl-text-muted))]"
              />
            </div>
          </div>

          {/* Duration Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-[rgb(var(--ssl-text-muted))] mr-2">Duration:</span>
            {(["1", "2", "3", "4", "5"] as Duration[]).map((duration) => (
              <button
                key={duration}
                onClick={() => setSelectedDuration(duration)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedDuration === duration
                    ? "bg-[rgb(var(--ssl-accent))] text-[rgb(var(--ssl-on-accent))] shadow-lg shadow-[0_0_20px_rgba(var(--ssl-shadow-accent))]"
                    : "bg-[rgb(var(--ssl-duration-muted-bg))] text-[rgb(var(--ssl-duration-muted-text))] hover:bg-[rgb(var(--ssl-duration-muted-hover-bg))] border border-[rgb(var(--ssl-border-strong))]"
                }`}
                aria-pressed={selectedDuration === duration}
              >
                {duration} {duration === "1" ? "Year" : "Years"}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-[rgb(var(--ssl-text-muted))]">Loading SSL certificates...</div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-[rgb(var(--ssl-error-text))]">Error: {error}</div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <>
            {filteredProducts.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-[rgb(var(--ssl-text-muted))]">
                  No SSL certificates found matching your filters.
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, idx) => {
                  const price = getPrice(product);
                  const discount = getDiscount(product);

                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="relative rounded-xl border border-[rgb(var(--ssl-border))] bg-[rgba(var(--ssl-card-surface))] p-6 hover:border-[rgb(var(--ssl-card-border-hover))] transition-all duration-300 hover:shadow-xl hover:shadow-[0_0_40px_rgba(var(--ssl-shadow-accent-soft))]"
                    >
                      {/* Badge */}
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-lg font-semibold text-[rgb(var(--ssl-text-primary))]">
                            {product.name}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            <span className="inline-flex rounded-full bg-[rgba(var(--ssl-badge-dv-bg))] px-2.5 py-1 text-xs font-medium text-[rgb(var(--ssl-badge-dv-text))]">
                              {product.validation}
                            </span>
                            <span className="inline-flex rounded-full bg-[rgba(var(--ssl-badge-domain-bg))] px-2.5 py-1 text-xs font-medium text-[rgb(var(--ssl-badge-domain-text))]">
                              {product.domains}
                            </span>
                          </div>
                        </div>
                        {discount && (
                          <span className="inline-flex rounded-full bg-[rgba(var(--ssl-badge-discount-bg))] px-2.5 py-1 text-xs font-medium text-[rgb(var(--ssl-badge-discount-text))]">
                            {discount}
                          </span>
                        )}
                      </div>

                      {/* Price */}
                      <div className="mb-6">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-[rgb(var(--ssl-text-primary))]">
                            {formatPrice(price)}
                          </span>
                          <span className="text-sm text-[rgb(var(--ssl-text-muted))]">
                            / {selectedDuration} {selectedDuration === "1" ? "year" : "years"}
                          </span>
                        </div>
                        {selectedDuration !== "1" && product.pricing["1"] && (
                          <p className="mt-1 text-xs text-[rgb(var(--ssl-text-subtle))]">
                            ${(product.pricing["1"] * parseInt(selectedDuration)).toFixed(2)} if purchased separately
                          </p>
                        )}
                      </div>

                      {/* Features */}
                      <ul className="mb-6 space-y-2 text-sm text-[rgb(var(--ssl-text-secondary))]">
                        <li className="flex items-center gap-2">
                          <span className="text-[rgb(var(--ssl-feature-check))]">✓</span>
                          <span>{product.validation} Validation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-[rgb(var(--ssl-feature-check))]">✓</span>
                          <span>
                            {product.domains === "Single"
                              ? "Single Domain"
                              : product.domains === "Multi"
                              ? "Multiple Domains"
                              : "Wildcard Domain"}
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-[rgb(var(--ssl-feature-check))]">✓</span>
                          <span>{selectedDuration} Year Validity</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-[rgb(var(--ssl-feature-check))]">✓</span>
                          <span>Free Reissuance</span>
                        </li>
                      </ul>

                      {/* Buy Now Button - same style for all cards (no product-specific styling) */}
                      <button
                        className="w-full rounded-lg bg-[rgb(var(--ssl-accent))] px-4 py-3 text-sm font-semibold text-[rgb(var(--ssl-on-accent))] transition-all duration-200 hover:bg-[rgb(var(--ssl-accent-hover))] hover:shadow-lg hover:shadow-[0_0_24px_rgba(var(--ssl-shadow-accent))] disabled:bg-[rgb(var(--ssl-accent))] disabled:opacity-70 disabled:cursor-not-allowed"
                        disabled={price === null}
                      >
                        Buy Now
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default SSLFiltersAndCards;
