/**
 * Build my.thecloudaro (Upmind client) URLs for domain "Buy Now".
 * Uses /order/product by default so users land on configured domain product
 * (instead of empty basket screen). Optional rapid order can be enabled by env.
 */

const DEFAULT_ORIGIN = 'https://my.thecloudaro.com';

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
