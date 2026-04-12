/**
 * Build my.thecloudaro (Upmind client) URLs for domain "Buy Now".
 * Uses /order/product by default so users land on configured domain product
 * (instead of empty basket screen). Optional rapid order can be enabled by env.
 */

const DEFAULT_ORIGIN = 'https://my.thecloudaro.com';

/** Optional `key=value&key2=value2` merged onto transfer URLs (discover keys via Upmind provision fields / Network tab). */
function mergeExtraTransferQuery(u: URL): void {
  const raw = process.env.NEXT_PUBLIC_UPMIND_TRANSFER_EXTRA_QUERY?.trim();
  if (!raw) return;
  try {
    const sp = new URLSearchParams(raw);
    sp.forEach((v, k) => {
      u.searchParams.set(k, v);
    });
  } catch {
    /* ignore malformed env */
  }
}

/** Optional JSON object merged into rapid-order `fields` for transfer (string values only). */
function mergeExtraTransferFields(
  fields: Record<string, string>
): void {
  const raw = process.env.NEXT_PUBLIC_UPMIND_TRANSFER_FIELDS_JSON?.trim();
  if (!raw) return;
  try {
    const o = JSON.parse(raw) as Record<string, unknown>;
    for (const [k, v] of Object.entries(o)) {
      if (v != null) fields[k] = String(v);
    }
  } catch {
    /* ignore */
  }
}

function clientOrigin(): string {
  const explicit = process.env.NEXT_PUBLIC_UPMIND_CLIENT_ORIGIN?.trim();
  if (explicit) return explicit.replace(/\/$/, '');

  const orderConfig = process.env.NEXT_PUBLIC_UPMIND_ORDER_CONFIG_URL?.trim();
  if (orderConfig) {
    try {
      return new URL(orderConfig).origin;
    } catch {
      /* ignore */
    }
  }

  return DEFAULT_ORIGIN;
}

/** Public origin for Upmind client portal (SSO / order links). */
export function getUpmindClientPortalOrigin(): string {
  return clientOrigin();
}

export interface DomainBuyUrlInput {
  /** Full hostname e.g. example.com */
  domainName: string;
  /** Upmind catalogue product UUID for this TLD */
  productId?: string | null;
  /** Matches selected subscription term (passed if portal reads it on basket) */
  billingCycleMonths?: number | null;
}

/**
 * Default checkout journey:
 *   https://my.thecloudaro.com/order/product?pid=...&domain_name=example.com
 *
 * Optional rapid order (experimental):
 *   set NEXT_PUBLIC_UPMIND_USE_RAPID_ORDER=true
 *   https://my.thecloudaro.com/order/_?product={...}&fields={...}
 */
export function buildDomainBuyUrl(input: DomainBuyUrlInput): string {
  const origin = clientOrigin();
  const domain = input.domainName.trim().toLowerCase();
  const months =
    typeof input.billingCycleMonths === 'number' &&
    input.billingCycleMonths > 0
      ? input.billingCycleMonths
      : null;

  const useRapidOrder =
    process.env.NEXT_PUBLIC_UPMIND_USE_RAPID_ORDER === '1' ||
    process.env.NEXT_PUBLIC_UPMIND_USE_RAPID_ORDER === 'true';

  if (useRapidOrder && input.productId && domain) {
    const u = new URL(`${origin}/order/_`);
    const product = {
      product_id: input.productId,
      quantity: 1,
      ...(months != null ? { billing_cycle_months: months } : {}),
    };
    const fields = {
      domain_name: domain,
    };
    u.searchParams.set('product', JSON.stringify(product));
    u.searchParams.set('fields', JSON.stringify(fields));
    return u.toString();
  }

  // Stable default route supported across most portals.
  const u = new URL(`${origin}/order/product`);
  if (input.productId) u.searchParams.set('pid', input.productId);
  if (domain) u.searchParams.set('domain_name', domain);
  if (months != null) u.searchParams.set('billing_cycle_months', String(months));

  return u.toString();
}

export interface DomainTransferUrlInput {
  domainName: string;
  authCode?: string;
  /** Resolved from `/api/domain-search` for this FQDN, or omit and set env default. */
  productId?: string | null;
  billingCycleMonths?: number | null;
}

/**
 * Transfer checkout must include a real catalogue **product_id** (`pid`), same as registration.
 * Opening `/order/product` without `pid` does not add a line item — Upmind often sends users to an empty basket.
 *
 * Precedence for product id:
 * 1. `NEXT_PUBLIC_UPMIND_DOMAIN_TRANSFER_PRODUCT_ID` (use when transfer is a separate product in Upmind)
 * 2. `input.productId` (e.g. resolved from domain-search for that TLD)
 *
 * Optional: `NEXT_PUBLIC_UPMIND_USE_RAPID_ORDER_FOR_TRANSFER=true` with rapid order `/order/_` (see Upmind docs).
 */
export function buildDomainTransferUrl(input: DomainTransferUrlInput): string {
  const origin = clientOrigin();
  const domain = input.domainName.trim().toLowerCase();
  const authCode = input.authCode?.trim();

  const transferProductId =
    process.env.NEXT_PUBLIC_UPMIND_DOMAIN_TRANSFER_PRODUCT_ID?.trim() ||
    (input.productId && String(input.productId).trim()) ||
    "";

  const monthsFromEnv = parseInt(
    process.env.NEXT_PUBLIC_UPMIND_DOMAIN_TRANSFER_BILLING_MONTHS || "12",
    10
  );
  const monthsDefault =
    Number.isFinite(monthsFromEnv) && monthsFromEnv > 0 ? monthsFromEnv : 12;
  const months =
    typeof input.billingCycleMonths === "number" &&
    input.billingCycleMonths > 0
      ? input.billingCycleMonths
      : monthsDefault;

  /* Do not tie to `NEXT_PUBLIC_UPMIND_USE_RAPID_ORDER` (registration); wrong payload fails silently per Upmind docs. */
  const useRapidOrder =
    process.env.NEXT_PUBLIC_UPMIND_USE_RAPID_ORDER_FOR_TRANSFER === "1" ||
    process.env.NEXT_PUBLIC_UPMIND_USE_RAPID_ORDER_FOR_TRANSFER === "true";

  const authFieldKey =
    process.env.NEXT_PUBLIC_UPMIND_TRANSFER_AUTH_FIELD_KEY?.trim() ||
    "auth_code";

  /** Configure product / cart step (default Upmind: `/order/product`). Override if your storefront uses e.g. `/checkout` with `pid`. */
  const orderProductPath = (() => {
    const p =
      process.env.NEXT_PUBLIC_UPMIND_TRANSFER_ORDER_PATH?.trim() ||
      "/order/product";
    return p.startsWith("/") ? p : `/${p}`;
  })();

  if (transferProductId) {
    if (useRapidOrder) {
      const u = new URL(`${origin}/order/_`);
      const product: Record<string, unknown> = {
        product_id: transferProductId,
        quantity: 1,
        billing_cycle_months: months,
      };
      const fields: Record<string, string> = { domain_name: domain };
      if (authCode) fields[authFieldKey] = authCode;
      mergeExtraTransferFields(fields);
      u.searchParams.set("product", JSON.stringify(product));
      u.searchParams.set("fields", JSON.stringify(fields));
      mergeExtraTransferQuery(u);
      return u.toString();
    }

    const u = new URL(`${origin}${orderProductPath}`);
    u.searchParams.set("pid", transferProductId);
    if (domain) u.searchParams.set("domain_name", domain);
    u.searchParams.set("billing_cycle_months", String(months));
    if (authCode) u.searchParams.set("auth_code", authCode);
    mergeExtraTransferQuery(u);
    return u.toString();
  }

  /* Last resort: same broken behaviour as before — prefer setting env or resolving productId */
  const u = new URL(`${origin}${orderProductPath}`);
  if (domain) u.searchParams.set("domain_name", domain);
  return u.toString();
}
