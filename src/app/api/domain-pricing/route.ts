import { NextRequest, NextResponse } from "next/server";

interface PricingInfo {
  register: number;
  renew: number;
  transfer: number;
  currency: string;
}

// Simple in-app pricing map used by both the hero search
// and the domain pricing experience. This can later be
// replaced with live data from Upmind.
const PRICING_BY_TLD: Record<string, PricingInfo> = {
  ".com": { register: 8.88, renew: 9.98, transfer: 8.88, currency: "USD" },
  ".org": { register: 11.88, renew: 12.98, transfer: 11.88, currency: "USD" },
  ".net": { register: 12.98, renew: 12.98, transfer: 12.98, currency: "USD" },
  ".co": { register: 29.98, renew: 29.98, transfer: 29.98, currency: "USD" },
  ".io": { register: 39.98, renew: 39.98, transfer: 39.98, currency: "USD" },
  ".app": { register: 19.98, renew: 19.98, transfer: 19.98, currency: "USD" },
};

function extractTld(domain: string): string | null {
  const trimmed = domain.trim().toLowerCase();
  const lastDotIndex = trimmed.lastIndexOf(".");

  if (lastDotIndex === -1 || lastDotIndex === trimmed.length - 1) {
    return null;
  }

  return trimmed.slice(lastDotIndex);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body.domain !== "string") {
      return NextResponse.json(
        { error: "A valid 'domain' string is required in the request body." },
        { status: 400 }
      );
    }

    const domain = body.domain.trim();
    const tld = extractTld(domain);

    if (!tld) {
      return NextResponse.json(
        { error: "Unable to determine TLD from domain. Please include a TLD like .com or .net." },
        { status: 400 }
      );
    }

    const pricing = PRICING_BY_TLD[tld];

    if (!pricing) {
      return NextResponse.json(
        { error: `No pricing configured for TLD '${tld}'.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      domain,
      tld,
      registerPrice: pricing.register,
      renewPrice: pricing.renew,
      transferPrice: pricing.transfer,
      currency: pricing.currency,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error while looking up domain pricing.";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

