import { extractTldFromFqdn } from "@/lib/domain/extractTldFromFqdn";

export type DomainTransferInsight =
  | { ok: false; error: string }
  | {
      ok: true;
      domain: string;
      /** Registry/catalogue signal: taken names are typical transfer-in candidates. */
      eligibleForTransfer: boolean;
      detail: string;
      transferPrice: number | null;
      currency: string;
      productId: string | null;
      billingCycleMonths: number | null;
    };

type DomainSearchRow = {
  name?: string;
  available?: boolean;
  productId?: string;
  billingCycleMonths?: number;
};

/**
 * Single round-trip for transfer UX: catalogue row (product + availability) + TLD transfer price.
 * Uses full FQDN for `/api/domain-search` so the API’s TLD stripping matches the exact row.
 */
export async function fetchDomainTransferInsight(
  fqdn: string
): Promise<DomainTransferInsight> {
  const d = fqdn.trim().toLowerCase();
  if (!d.includes(".")) {
    return { ok: false, error: "Enter a full domain name (e.g. example.com)." };
  }

  const tld = extractTldFromFqdn(d);
  if (!tld) {
    return { ok: false, error: "Could not read the domain extension (TLD)." };
  }

  const insightTimeoutMs = 55_000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), insightTimeoutMs);

  try {
    const [searchRes, pricingRes] = await Promise.all([
      fetch(`/api/domain-search?term=${encodeURIComponent(d)}`, {
        cache: "no-store",
        signal: controller.signal,
      }),
      fetch(`/api/domain-tld-pricing?tlds=${encodeURIComponent(tld)}`, {
        cache: "no-store",
        signal: controller.signal,
      }),
    ]);

    const searchData = (await searchRes.json().catch(() => ({}))) as {
      success?: boolean;
      error?: string;
      domains?: DomainSearchRow[];
    };

    if (!searchRes.ok || searchData.success === false) {
      return {
        ok: false,
        error:
          searchData.error ||
          `Catalogue lookup failed (${searchRes.status}). Check UPMIND_API_TOKEN.`,
      };
    }

    const list = Array.isArray(searchData.domains) ? searchData.domains : [];
    const exact = list.find(
      (row) => String(row?.name || "").toLowerCase() === d
    );

    const pricingData = (await pricingRes.json().catch(() => ({}))) as {
      success?: boolean;
      tlds?: Array<{ tld: string; transferPrice: number; currency: string }>;
    };

    let transferPrice: number | null = null;
    let currency = "USD";
    if (pricingRes.ok && pricingData.success && Array.isArray(pricingData.tlds)) {
      const row = pricingData.tlds.find(
        (t) => String(t.tld || "").toLowerCase() === tld.toLowerCase()
      );
      if (row) {
        transferPrice =
          typeof row.transferPrice === "number" && row.transferPrice > 0
            ? row.transferPrice
            : null;
        currency = (row.currency || "USD").toUpperCase();
      }
    }

    const eligibleForTransfer = Boolean(exact && exact.available === false);

    const detail = eligibleForTransfer
      ? "Good news — this name is not available as a new registration, which usually means it is already registered and eligible for transfer-in (subject to registrar rules)."
      : exact && exact.available === true
        ? "This name looks available to register. If you already own it elsewhere, your registrar’s status may differ — contact support if you expected a transfer."
        : "We could not match this exact domain in our catalogue. Check spelling or try another extension.";

    return {
      ok: true,
      domain: d,
      eligibleForTransfer,
      detail,
      transferPrice,
      currency,
      productId: exact?.productId != null ? String(exact.productId) : null,
      billingCycleMonths:
        typeof exact?.billingCycleMonths === "number" &&
        exact.billingCycleMonths > 0
          ? exact.billingCycleMonths
          : null,
    };
  } catch (e) {
    if (e instanceof Error && e.name === "AbortError") {
      return {
        ok: false,
        error:
          "Catalogue check timed out. The server may be busy — try again in a moment.",
      };
    }
    return { ok: false, error: "Network error while checking this domain." };
  } finally {
    clearTimeout(timeoutId);
  }
}
