import { notFound, permanentRedirect } from "next/navigation";
import KnowledgeCategoryPageClient from "@/components/KnowledgeBase/KnowledgeCategoryPageClient";
import {
  getArticlesListForCategory,
  getCategoryMeta,
  isKnownKnowledgeCategory,
  resolveKnowledgeCategorySlug,
} from "@/lib/knowledge-article-content-data";

type PageProps = {
  params: Promise<{ category: string }>;
};

function redirectIfLegacyKnowledgeCategorySlug(segment: string) {
  const normalized = segment.trim().toLowerCase();
  const canonical = resolveKnowledgeCategorySlug(segment);
  if (normalized !== canonical) {
    permanentRedirect(`/knowledgebase/${canonical}`);
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  redirectIfLegacyKnowledgeCategorySlug(category);
  const meta = getCategoryMeta(category);
  if (!meta) {
    return { title: "Knowledge base" };
  }
  return {
    title: `${meta.title} | Knowledge base`,
    description: `Help articles for ${meta.title}.`,
  };
}

export default async function KnowledgeCategoryPage({ params }: PageProps) {
  const { category } = await params;
  redirectIfLegacyKnowledgeCategorySlug(category);
  if (!isKnownKnowledgeCategory(category)) {
    notFound();
  }
  const meta = getCategoryMeta(category);
  if (!meta) {
    notFound();
  }
  const articleEntries = getArticlesListForCategory(meta.slug);
  const listItems = articleEntries.map((e) => ({
    id: e.anchorId,
    title: e.title,
    href: `${meta.href}#${e.anchorId}`,
  }));

  return (
    <KnowledgeCategoryPageClient
      categoryTitle={meta.title}
      articlesIndexHref={meta.href}
      listItems={listItems}
      articleEntries={articleEntries}
    />
  );
}
