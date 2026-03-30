import { NextRequest, NextResponse } from "next/server";
import {
  extractSubscriptionTerms,
  getAmountFromTerm,
  normalizeUpmindListPayload,
  pickPreferredDomainPriceTerm,
} from "@/lib/upmind/pricingTerms";

interface PricingInfo {
  register: number;
  renew: number;
  transfer: number;
  currency: string;
}

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

function normalizeTldKey(tld: string): string {
  const x = tld.trim().toLowerCase();
  return x.startsWith(".") ? x : `.${x}`;
}

async function pricingFromUpmindTlds(
  apiToken: string,
  wantTld: string
): Promise<PricingInfo | null> {
  const tldsEndpoint =
    "https://api.upmind.io/api/admin/modules/web_hosting/domains/tlds";
  const res = await fetch(tldsEndpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) return null;

  const data = await res.json();
  const list = normalizeUpmindListPayload(data);
  const target = normalizeTldKey(wantTld);

  const row = list.find((item: any) => {
    const t = normalizeTldKey(String(item.tld || item.name || ""));
    return t === target;
  });
  if (!row) return null;

  let terms = extractSubscriptionTerms(row);
  if (!terms?.length && Array.isArray((row as any).prices)) {
    terms = (row as any).prices;
  }
  if (!terms?.length && Array.isArray((row as any).pricing)) {
    terms = (row as any).pricing;
  }
  if (!terms?.length) return null;

  const term = pickPreferredDomainPriceTerm(terms);
  if (!term) return null;

  const base = getAmountFromTerm(term);
  if (base == null || base <= 0) return null;

  const cur = String(term.currency_code || term.currency || "USD").toUpperCase();

  const num = (v: unknown, fallback: number) => {
    if (v == null) return fallback;
    const n = typeof v === "number" ? v : parseFloat(String(v));
    return Number.isNaN(n) || n <= 0 ? fallback : n;
  };

  return {
    register: num(term.register_price ?? term.registration_price, base),
    renew: num(term.renew_price ?? term.renewal_price, base),
    transfer: num(term.transfer_price, base),
    currency: cur,
  };
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
        {
          error:
            "Unable to determine TLD from domain. Please include a TLD like .com or .net.",
        },
        { status: 400 }
      );
    }

    const apiToken = process.env.UPMIND_API_TOKEN;
    let pricing: PricingInfo | null = null;
    let source: "upmind" | "static" = "static";

    if (apiToken) {
      try {
        pricing = await pricingFromUpmindTlds(apiToken, tld);
        if (pricing) source = "upmind";
      } catch {
        pricing = null;
      }
    }

    if (!pricing) {
      pricing = PRICING_BY_TLD[tld] ?? null;
      source = pricing ? "static" : "static";
    }

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
      source,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unexpected server error while looking up domain pricing.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
