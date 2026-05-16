"use client";

import KnowledgeCategoryRouteShell from "@/components/KnowledgeBase/KnowledgeCategoryRouteShell";
import type { KnowledgeCategoryArticleEntry } from "@/components/KnowledgeBase/KnowledgeCategoryRouteShell";
import type { KnowledgeCategoryArticleListItem } from "@/components/KnowledgeBase/KnowledgeCategoryArticleListView";

export interface KnowledgeCategoryPageClientProps {
  categoryTitle: string;
  articlesIndexHref: string;
  listItems: KnowledgeCategoryArticleListItem[];
  articleEntries: KnowledgeCategoryArticleEntry[];
}

export default function KnowledgeCategoryPageClient({
  categoryTitle,
  articlesIndexHref,
  listItems,
  articleEntries,
}: KnowledgeCategoryPageClientProps) {
  return (
    <KnowledgeCategoryRouteShell
      categoryTitle={categoryTitle}
      articlesIndexHref={articlesIndexHref}
      listItems={listItems}
      articleEntries={articleEntries}
    />
  );
}
