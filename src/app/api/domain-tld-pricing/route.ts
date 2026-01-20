import { NextRequest, NextResponse } from "next/server";

interface TldPricing {
  tld: string;
  registerPrice: number | null;
  renewPrice: number | null;
  transferPrice: number | null;
  currency: string;
}

// Fallback pricing map used when Upmind is not configured or
// when the upstream request fails. Mirrors the existing table.
const FALLBACK_PRICING: Record<string, TldPricing> = {
  ".com": { tld: ".com", registerPrice: 8.88, renewPrice: 9.98, transferPrice: 8.88, currency: "USD" },
  ".org": { tld: ".org", registerPrice: 11.88, renewPrice: 12.98, transferPrice: 11.88, currency: "USD" },
  ".net": { tld: ".net", registerPrice: 12.98, renewPrice: 12.98, transferPrice: 12.98, currency: "USD" },
  ".co": { tld: ".co", registerPrice: 29.98, renewPrice: 29.98, transferPrice: 29.98, currency: "USD" },
  ".io": { tld: ".io", registerPrice: 39.98, renewPrice: 39.98, transferPrice: 39.98, currency: "USD" },
  ".app": { tld: ".app", registerPrice: 19.98, renewPrice: 19.98, transferPrice: 19.98, currency: "USD" },
};

function parseTldsParam(searchParams: URLSearchParams): string[] {
  const tldsParam = searchParams.get("tlds");
  if (!tldsParam) {
    return [".com", ".org"];
  }

  return tldsParam
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => (t.startsWith(".") ? t : `.${t}`));
}

function mapFallbackTlds(tlds: string[]): TldPricing[] {
  return tlds
    .map((tld) => FALLBACK_PRICING[tld])
    .filter((item): item is TldPricing => !!item);
}

// Best-effort mapper for the Upmind TLD response.
// The exact shape can vary, so this function tries a few
// common patterns and falls back to nulls when unknown.
function extractPricingFromUpmind(data: any, tld: string): TldPricing {
  const currency = "USD";

  const root = data?.data ?? data;
  const pricesArray =
    root?.prices && Array.isArray(root.prices)
      ? root.prices
      : root?.prices?.prices && Array.isArray(root.prices.prices)
      ? root.prices.prices
      : null;

  const firstPrice = pricesArray?.[0] ?? root?.prices ?? null;

  const getPrice = (...keys: string[]): number | null => {
    if (!firstPrice) return null;
    for (const key of keys) {
      const value = firstPrice[key];
      if (value !== undefined && value !== null) {
        const num = typeof value === "number" ? value : parseFloat(String(value));
        if (!Number.isNaN(num)) return num;
      }
    }
    return null;
  };

  const registerPrice = getPrice("register_price", "registration_price", "price", "amount");
  const renewPrice = getPrice("renew_price", "renewal_price", "renew");
  const transferPrice = getPrice("transfer_price", "transfer");

  return {
    tld,
    registerPrice,
    renewPrice,
    transferPrice,
    currency,
  };
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const tlds = parseTldsParam(url.searchParams);

    const apiToken = process.env.UPMIND_API_TOKEN;
    if (!apiToken) {
      // No Upmind token configured – return fallback data
      return NextResponse.json({
        source: "fallback",
        tlds: mapFallbackTlds(tlds),
      });
    }

    const endpointBase =
      "https://api.upmind.io/api/admin/modules/web_hosting/domains/tlds";

    const results: TldPricing[] = [];

    for (const tld of tlds) {
      const endpoint = `${endpointBase}?tld=${encodeURIComponent(tld)}`;

      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${apiToken}`,
          },
        });

        if (!response.ok) {
          // If Upmind returns an error for this TLD, fall back for this TLD only
          const fallback = FALLBACK_PRICING[tld];
          if (fallback) {
            results.push(fallback);
          }
          continue;
        }

        const data = await response.json();
        results.push(extractPricingFromUpmind(data, tld));
      } catch {
        const fallback = FALLBACK_PRICING[tld];
        if (fallback) {
          results.push(fallback);
        }
      }
    }

    return NextResponse.json({
      source: "upmind",
      tlds: results,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error while fetching TLD pricing.";

    // On any unexpected error, respond with fallback data for the default TLDs
    return NextResponse.json(
      {
        source: "fallback",
        error: message,
        tlds: mapFallbackTlds([".com", ".org"]),
      },
      { status: 500 }
    );
  }
}

