/**
 * SSL certificate products — Upmind product UUIDs from admin catalogue URLs
 * (`/admin/catalogue/product/{uuid}/...`), in display order (13 items).
 */
export const sslCatalogProductIds: readonly string[] = [
  '2e071d93-1d5e-4686-5e2b-046028758396',
  '0381d780-e72d-4d6d-9edf-2413569926e5',
  '93e8d569-d072-4516-851f-64e853121607',
  'd5308768-251d-4805-166c-747e390921e6',
  '2e071d93-1d5e-4608-71ea-046028758396',
  '196e02e5-136d-4290-101c-9429807875d3',
  '052d137e-08d2-4190-106a-0495163789e6',
  '61e50989-73d2-4725-02db-745e610832d7',
  '80d1639e-237d-4359-e59c-24610589e572',
  '0381d780-e72d-4d6d-066f-2413569926e5',
  '93e8d569-d072-4516-d13a-64e853121607',
  '5983e230-6e75-4010-815b-d4981d210d76',
  '7831d635-0d82-4970-876f-049e176259e0',
] as const;

/** Optional labels for ordering / debugging; UI uses Upmind product name from API. */
export const sslCatalogLabels: readonly string[] = [
  'Positive SSL',
  'Positive SSL Wildcard',
  'Positive SSL Multi-Domain',
  'RapidSSL',
  'RapidSSL Wildcard',
  'Perfect DV SSL',
  'Perfect DV Wildcard SSL',
  'Perfect DV Multi-Domain SSL',
  'Perfect OV SSL',
  'Perfect OV Wildcard SSL',
  'Perfect OV Multi-Domain SSL',
  'Basic EV SSL',
  'Basic EV Multi-Domain SSL',
] as const;
