/**
 * Knowledge base article content (Policy page pattern: structured sections + blocks).
 * Lookup key: `${categorySlug}-${articleSlug}` e.g. `dns-article-1`.
 *
 * All articles for a category render on one page: `/knowledgebase/{slug}#article-{n}`.
 */

export const KNOWLEDGE_CATEGORIES = [
  { id: "dns", slug: "dns", title: "DNS", articleCount: 3, href: "/knowledgebase/dns" },
  { id: "domains", slug: "domains", title: "Domains", articleCount: 15, href: "/knowledgebase/domains" },
  { id: "easywp", slug: "easywp", title: "EasyWP", articleCount: 14, href: "/knowledgebase/easywp" },
  {
    id: "business-mail",
    slug: "business-mail",
    title: "Business mail",
    articleCount: 59,
    href: "/knowledgebase/business-mail",
  },
  {
    id: "starlight-hyperlift",
    slug: "starlight-hyperlift",
    title: "Starlight Hyperlift",
    articleCount: 3,
    href: "/knowledgebase/starlight-hyperlift",
  },
  {
    id: "virtual-machines",
    slug: "virtual-machines",
    title: "Virtual Machines",
    articleCount: 12,
    href: "/knowledgebase/virtual-machines",
  },
  { id: "vpn", slug: "vpn", title: "VPN", articleCount: 21, href: "/knowledgebase/vpn" },
  {
    id: "web-hosting",
    slug: "web-hosting",
    title: "Web Hosting",
    articleCount: 16,
    href: "/knowledgebase/web-hosting",
  },
] as const;

/** Old `/knowledgebase/{slug}` segments → current category `slug` in `KNOWLEDGE_CATEGORIES`. */
export const KNOWLEDGE_CATEGORY_SLUG_ALIASES: Readonly<Record<string, string>> = {
  spacemail: "business-mail",
};

export function resolveKnowledgeCategorySlug(slug: string): string {
  const key = slug.trim().toLowerCase();
  return KNOWLEDGE_CATEGORY_SLUG_ALIASES[key] ?? key;
}

export type KnowledgeCategoryMeta = (typeof KNOWLEDGE_CATEGORIES)[number];

export type KnowledgeArticleContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
    };

export interface KnowledgeArticleSection {
  id: string;
  title: string;
  blocks: KnowledgeArticleContentBlock[];
  subsections?: KnowledgeArticleSection[];
}

export interface KnowledgeArticlePageData {
  title: string;
  lastUpdated: string;
  /** Shown in breadcrumb (e.g. "DNS") */
  breadcrumbCategory: string;
  intro: string[];
  sections: KnowledgeArticleSection[];
}

export function buildKnowledgeArticleSlugKey(
  categorySlug: string,
  articleSlug: string,
): string {
  return `${categorySlug.toLowerCase()}-${articleSlug.toLowerCase()}`;
}

function defaultArticle(
  categorySlug: string,
  articleSlug: string,
  categoryLabel: string,
): KnowledgeArticlePageData {
  return {
    title: `${categoryLabel} — ${articleSlug.replace(/-/g, " ")}`,
    lastUpdated: "16-May-2026",
    breadcrumbCategory: categoryLabel,
    intro: [
      "This is placeholder copy until the final article is published. The layout matches the legal policy pages and supports text, lists, and inline figures from `/public`.",
    ],
    sections: [
      {
        id: "summary",
        title: "1. Summary",
        blocks: [
          {
            type: "paragraph",
            text:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer feugiat scelerisque sem, a condimentum enim vulputate sed.\n\nAliquam erat volutpat. Donec vehicula ligula id nibh finibus, vel fermentum nisi pulvinar.",
          },
          {
            type: "list",
            items: [
              "Example bullet one for this topic.",
              "Example bullet two with extra context.",
              "Example bullet three linking concepts together.",
            ],
          },
        ],
      },
      {
        id: "diagram",
        title: "2. Reference illustration",
        blocks: [
          {
            type: "paragraph",
            text: "Below is an example image pulled from the site `public` folder (same pattern as other marketing assets).",
          },
          {
            type: "image",
            src: "/3d3.png",
            alt: "Abstract 3D illustration used as a documentation example",
            caption: "Figure A — example asset from `/public/3d3.png`.",
          },
          {
            type: "paragraph",
            text: "You can replace this block in `knowledge-article-content-data.ts` with real screenshots or diagrams as content is finalized.",
          },
        ],
      },
    ],
  };
}

/** Curated examples (images mid-body). */
export const knowledgeArticlesBySlug: Record<string, KnowledgeArticlePageData> = {
  "dns-article-1": {
    title: "Understanding DNS records (example)",
    lastUpdated: "16-May-2026",
    breadcrumbCategory: "DNS",
    intro: [
      "This example article demonstrates how knowledge content is stored in TypeScript data, rendered with the same theme as the Privacy Policy page, and how images can appear between paragraphs.",
      "Replace this copy with production documentation when ready.",
    ],
    sections: [
      {
        id: "what-is-dns",
        title: "1. What is DNS?",
        blocks: [
          {
            type: "paragraph",
            text:
              "The Domain Name System maps human-readable hostnames to addresses and other records. In practice, customers manage A, AAAA, CNAME, MX, and TXT records to connect domains to hosting, email, and verification flows.",
          },
        ],
        subsections: [
          {
            id: "why-it-matters",
            title: "1.1 Why it matters for hosting",
            blocks: [
              {
                type: "paragraph",
                text:
                  "Correct DNS is required for visitors to reach your site and for mail to route reliably. Propagation delays can make changes appear slowly across the internet.",
              },
              {
                type: "list",
                items: [
                  "Lower TTL before planned changes (when supported).",
                  "Avoid chaining CNAMEs where an A record is clearer.",
                  "Keep MX records aligned with your mail provider.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "visual-overview",
        title: "2. Visual overview",
        blocks: [
          {
            type: "paragraph",
            text: "The following figure is loaded from `/public` (no remote URL). Use wide diagrams here; the layout scales down on mobile.",
          },
          {
            type: "image",
            src: "/Home/WebHosting.png",
            alt: "Web hosting illustration from marketing assets",
            caption: "Example figure — `/public/Home/WebHosting.png`.",
          },
          {
            type: "paragraph",
            text: "After the image, normal paragraphs continue so authors can place figures anywhere in the flow.",
          },
        ],
      },
      {
        id: "checklist",
        title: "3. Quick checklist",
        blocks: [
          {
            type: "list",
            items: [
              "Confirm apex vs www behavior.",
              "Validate SPF/DKIM/DMARC with your mail product.",
              "Test from an external resolver after changes.",
            ],
          },
          {
            type: "image",
            src: "/logo/icon.png",
            alt: "Site icon example",
            caption: "Smaller inline branding example — `/public/logo/icon.png`.",
          },
        ],
      },
    ],
  },
  "web-hosting-article-1": {
    title: "Getting started with shared hosting (example)",
    lastUpdated: "16-May-2026",
    breadcrumbCategory: "Web Hosting",
    intro: [
      "Example walkthrough content. Mid-article imagery shows how documentation can mix prose and screenshots.",
    ],
    sections: [
      {
        id: "before-you-begin",
        title: "1. Before you begin",
        blocks: [
          {
            type: "paragraph",
            text: "Gather your domain, plan confirmation email, and any migration backups. This section is plain text only.",
          },
        ],
      },
      {
        id: "control-panel",
        title: "2. Control panel tour",
        blocks: [
          {
            type: "paragraph",
            text: "Below is a second public asset used as a stand-in for a real control panel screenshot.",
          },
          {
            type: "image",
            src: "/Home/WordPress.png",
            alt: "WordPress product illustration placeholder",
            caption: "Placeholder visual — swap for a real screenshot in data.",
          },
          {
            type: "paragraph",
            text: "Additional paragraphs can follow immediately after figures without breaking the reading flow.",
          },
        ],
      },
    ],
  },
};

const CATEGORY_LABEL: Record<string, string> = {
  dns: "DNS",
  domains: "Domains",
  easywp: "EasyWP",
  "business-mail": "Business mail",
  "starlight-hyperlift": "Starlight Hyperlift",
  "virtual-machines": "Virtual Machines",
  vpn: "VPN",
  "web-hosting": "Web Hosting",
};

export function getKnowledgeArticlePage(
  categorySlug: string,
  articleSlug: string,
): KnowledgeArticlePageData {
  const canonical = resolveKnowledgeCategorySlug(categorySlug);
  const key = buildKnowledgeArticleSlugKey(canonical, articleSlug);
  const curated = knowledgeArticlesBySlug[key];
  if (curated) return curated;
  const label =
    CATEGORY_LABEL[canonical.toLowerCase()] ??
    canonical.replace(/-/g, " ");
  return defaultArticle(canonical, articleSlug, label);
}

export function isKnownKnowledgeCategory(categorySlug: string): boolean {
  const canonical = resolveKnowledgeCategorySlug(categorySlug);
  return KNOWLEDGE_CATEGORIES.some((c) => c.slug.toLowerCase() === canonical);
}

export function getCategoryMeta(
  categorySlug: string,
): KnowledgeCategoryMeta | undefined {
  const canonical = resolveKnowledgeCategorySlug(categorySlug);
  return KNOWLEDGE_CATEGORIES.find((c) => c.slug.toLowerCase() === canonical);
}

/** One entry per article on the category page (anchor id = `article-1`, …). */
export function getArticlesListForCategory(categorySlug: string): Array<{
  anchorId: string;
  title: string;
  data: KnowledgeArticlePageData;
}> {
  const meta = getCategoryMeta(categorySlug);
  if (!meta) return [];
  return Array.from({ length: meta.articleCount }, (_, i) => {
    const articleSlug = `article-${i + 1}`;
    const data = getKnowledgeArticlePage(meta.slug, articleSlug);
    return { anchorId: articleSlug, title: data.title, data };
  });
}
