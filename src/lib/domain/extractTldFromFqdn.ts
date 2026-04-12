/**
 * Public suffix–style TLD for pricing / catalogue lookups (e.g. `.net`, `.co.uk`).
 */
export function extractTldFromFqdn(fqdn: string): string | null {
  const d = fqdn.trim().toLowerCase();
  if (!d.includes(".")) return null;
  const parts = d.split(".").filter(Boolean);
  if (parts.length < 2) return null;
  const lastTwo = parts.slice(-2).join(".");
  const multi = new Set([
    "co.uk",
    "com.au",
    "co.nz",
    "org.uk",
    "com.pk",
    "net.pk",
    "co.za",
    "com.sg",
  ]);
  if (parts.length >= 3 && multi.has(lastTwo)) {
    return "." + lastTwo;
  }
  return "." + parts[parts.length - 1];
}
