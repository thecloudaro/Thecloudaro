/**
 * Normalize Upmind product / TLD payloads to a flat subscription_terms array.
 * Matches shapes handled in api/ssl-pricing (nested pricelist, billing, etc.).
 */
export function extractSubscriptionTerms(item: unknown): any[] | null {
  if (!item || typeof item !== "object") return null;
  const o = item as Record<string, unknown>;

  const p = o.prices as Record<string, unknown> | undefined;
  if (p?.subscription_terms && Array.isArray(p.subscription_terms)) {
    return p.subscription_terms as any[];
  }
  if (Array.isArray(o.prices)) return o.prices as any[];
  if (Array.isArray(o.subscription_terms)) return o.subscription_terms as any[];
  const billing = o.billing as Record<string, unknown> | undefined;
  if (billing?.subscription_terms && Array.isArray(billing.subscription_terms)) {
    return billing.subscription_terms as any[];
  }
  const bp = billing?.prices as Record<string, unknown> | undefined;
  if (bp?.subscription_terms && Array.isArray(bp.subscription_terms)) {
    return bp.subscription_terms as any[];
  }
  if (Array.isArray(o.costs)) return o.costs as any[];
  if (Array.isArray(o.pricing)) return o.pricing as any[];

  if (p && typeof p === "object" && !Array.isArray(p)) {
    for (const key of Object.keys(p)) {
      const val = p[key] as Record<string, unknown> | unknown[] | null | undefined;
      if (val && typeof val === "object" && !Array.isArray(val)) {
        const st = (val as Record<string, unknown>).subscription_terms;
        if (Array.isArray(st)) return st as any[];
      }
      if (Array.isArray(val)) return val as any[];
    }
  }

  return null;
}

export function getAmountFromTerm(term: any): number | null {
  if (!term) return null;
  const raw =
    term.amount ??
    term.price ??
    term.recurring_price ??
    term.cost ??
    term.recurring_amount ??
    term.sale_price ??
    (term.amount_cents != null ? term.amount_cents / 100 : null);
  if (raw == null) return null;
  const n = typeof raw === "number" ? raw : parseFloat(String(raw));
  return Number.isNaN(n) ? null : n;
}

/** Prefer yearly USD; then any USD; then first term with a positive amount. */
export function pickPreferredDomainPriceTerm(terms: any[]): any | null {
  if (!terms?.length) return null;

  const isYearly = (t: any) =>
    t.billing_cycle_months === 12 ||
    t.billing_cycle_years === 1 ||
    t.billing_cycle === 12 ||
    t.period_months === 12 ||
    t.months === 12 ||
    t.period === 12;

  const isUsd = (t: any) =>
    t.currency_code === "USD" || t.currency_code === "usd" || t.currency === "USD";

  let hit = terms.find((t) => isUsd(t) && isYearly(t));
  if (hit) return hit;

  hit = terms.find((t) => isUsd(t));
  if (hit) return hit;

  for (const t of terms) {
    const a = getAmountFromTerm(t);
    if (a != null && a > 0) return t;
  }

  return terms[0];
}

export function normalizeUpmindListPayload(data: unknown): any[] {
  if (Array.isArray(data)) return data;
  if (!data || typeof data !== "object") return [];
  const d = data as Record<string, unknown>;
  if (Array.isArray(d.data)) return d.data as any[];
  if (Array.isArray(d.products)) return d.products as any[];
  if (Array.isArray(d.items)) return d.items as any[];
  const inner = d.data as Record<string, unknown> | undefined;
  if (inner && Array.isArray(inner.products)) return inner.products as any[];
  if (inner && Array.isArray(inner.data)) return inner.data as any[];
  return [];
}

/**
 * TLD module list rows often omit nested `prices.subscription_terms`; billing lives on the product.
 * Fetch full product to get the same terms as Admin → Product billing.
 */
export async function fetchSubscriptionTermsForProduct(
  productId: string,
  apiToken: string
): Promise<any[] | null> {
  const endpoint = `https://api.upmind.io/api/admin/products/${encodeURIComponent(productId)}?with=prices,costs`;
  const res = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) return null;
  const data = await res.json();
  const product =
    (data as { data?: unknown }).data ??
    (data as { product?: unknown }).product ??
    data;
  if (!product || typeof product !== "object") return null;
  return extractSubscriptionTerms(product);
}

/**
 * When list row has no nested terms, Upmind may still expose manual/display price on the row.
 */
export function buildSyntheticTermsFromModuleRow(o: Record<string, unknown>): any[] | null {
  const manual =
    o.manual_price ??
    o.manual_recurring_price ??
    o.recurring_price ??
    null;
  const display = o.display_price;
  const monthsRaw = o.billing_cycle_months;
  const months =
    typeof monthsRaw === "number" && monthsRaw > 0 ? monthsRaw : 12;

  let price: number | null = null;
  if (manual != null && String(manual).trim() !== "") {
    const n = typeof manual === "number" ? manual : parseFloat(String(manual));
    if (!Number.isNaN(n) && n > 0) price = n;
  }
  if (price == null && display != null) {
    const s = String(display).replace(/[^0-9.]/g, "");
    const n = parseFloat(s);
    if (!Number.isNaN(n) && n > 0) price = n;
  }
  if (price == null && o.price != null) {
    const n = typeof o.price === "number" ? o.price : parseFloat(String(o.price));
    if (!Number.isNaN(n) && n > 0) price = n;
  }

  if (price == null || price <= 0) return null;

  const cc =
    (typeof o.currency_code === "string" && o.currency_code) ||
    (typeof o.currency === "string" && o.currency) ||
    "USD";

  return [{ price, currency_code: cc, billing_cycle_months: months }];
}
