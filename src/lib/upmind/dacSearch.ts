/**
 * Upmind Domain Availability Checker (DAC) — merges catalogue search with real availability.
 * @see https://apidocs.upmind.com/modules/web_hosting — GET /api/modules/web_hosting/domains/search
 */

function normalizeTldKey(t: unknown): string {
  let s = String(t ?? '')
    .toLowerCase()
    .trim();
  if (!s) return '';
  if (!s.startsWith('.')) s = `.${s}`;
  return s;
}

function extractDacRows(payload: unknown): unknown[] {
  if (payload == null) return [];
  if (Array.isArray(payload)) return payload;
  if (typeof payload !== 'object') return [];
  const o = payload as Record<string, unknown>;
  if (Array.isArray(o.data)) return o.data;
  const inner = o.data;
  if (inner && typeof inner === 'object' && Array.isArray((inner as Record<string, unknown>).data)) {
    return (inner as { data: unknown[] }).data;
  }
  return [];
}

export type DacAvailabilityResult =
  | { ok: true; byTld: Map<string, boolean> }
  | { ok: false; byTld: Map<string, boolean>; status?: number };

const DAC_URLS = [
  'https://api.upmind.io/api/modules/web_hosting/domains/search',
  'https://api.upmind.io/api/admin/modules/web_hosting/domains/search',
] as const;

/**
 * Returns availability per TLD for a given SLD (label only, no dot).
 */
export async function fetchDomainAvailabilityByTld(
  sld: string,
  apiToken: string
): Promise<DacAvailabilityResult> {
  const label = sld.trim().toLowerCase();
  if (!label) {
    return { ok: true, byTld: new Map() };
  }

  let lastStatus: number | undefined;

  for (const base of DAC_URLS) {
    const url = new URL(base);
    url.searchParams.set('sld', label);
    url.searchParams.set('no_cache', '1');

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        Accept: 'application/json',
      },
    });

    lastStatus = res.status;

    if (res.status === 404) {
      continue;
    }

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error(
        '[DAC] domains/search failed:',
        res.status,
        text.slice(0, 300)
      );
      return { ok: false, byTld: new Map(), status: res.status };
    }

    let json: unknown;
    try {
      json = await res.json();
    } catch {
      return { ok: false, byTld: new Map(), status: res.status };
    }

    const rows = extractDacRows(json);
    const byTld = new Map<string, boolean>();

    for (const row of rows) {
      if (!row || typeof row !== 'object') continue;
      const r = row as Record<string, unknown>;
      const tldKey = normalizeTldKey(r.tld);
      if (!tldKey) continue;
      const avail = Boolean(r.domain_available);
      byTld.set(tldKey, byTld.has(tldKey) ? byTld.get(tldKey)! || avail : avail);
    }

    return { ok: true, byTld };
  }

  console.error('[DAC] domains/search: no working endpoint (last status', lastStatus, ')');
  return { ok: false, byTld: new Map(), status: lastStatus };
}
