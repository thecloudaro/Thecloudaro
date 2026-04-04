/**
 * Build my.thecloudaro (Upmind client) URLs for domain "Buy Now".
 * Uses /order/basket/ — rapid /order/_ is not enabled on all portals and can 404.
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
 * Client cart/checkout: https://my.thecloudaro.com/order/basket/
 * Query params help Upmind pre-fill domain + product where supported.
 */
export function buildDomainBuyUrl(input: DomainBuyUrlInput): string {
  const origin = clientOrigin();
  const base = `${origin}/order/basket/`;
  const u = new URL(base);

  const domain = input.domainName.trim().toLowerCase();
  if (domain) {
    u.searchParams.set('domain', domain);
  }
  if (input.productId) {
    u.searchParams.set('pid', input.productId);
  }
  const months =
    typeof input.billingCycleMonths === 'number' &&
    input.billingCycleMonths > 0
      ? input.billingCycleMonths
      : null;
  if (months != null) {
    u.searchParams.set('billing_cycle_months', String(months));
  }

  return u.toString();
}
