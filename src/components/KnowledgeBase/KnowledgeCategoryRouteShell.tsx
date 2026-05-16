"use client";

import { useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import KnowledgeCategoryArticles from "@/components/KnowledgeBase/KnowledgeCategoryArticles";
import KnowledgeCategoryArticleListView from "@/components/KnowledgeBase/KnowledgeCategoryArticleListView";
import type { KnowledgeCategoryArticleListItem } from "@/components/KnowledgeBase/KnowledgeCategoryArticleListView";
import type { KnowledgeArticlePageData } from "@/lib/knowledge-article-content-data";
import { KNOWLEDGE_CATEGORY_HASH_SYNC_EVENT } from "@/lib/knowledge-category-hash-sync";

export interface KnowledgeCategoryArticleEntry {
  anchorId: string;
  title: string;
  data: KnowledgeArticlePageData;
}

interface KnowledgeCategoryRouteShellProps {
  categoryTitle: string;
  /** e.g. `/knowledgebase/dns` — list view (no hash) */
  articlesIndexHref: string;
  listItems: KnowledgeCategoryArticleListItem[];
  articleEntries: KnowledgeCategoryArticleEntry[];
}

const ARTICLE_HASH = /^#article-\d+$/i;

function subscribeHash(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("hashchange", onStoreChange);
  window.addEventListener("popstate", onStoreChange);
  window.addEventListener(KNOWLEDGE_CATEGORY_HASH_SYNC_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("hashchange", onStoreChange);
    window.removeEventListener("popstate", onStoreChange);
    window.removeEventListener(KNOWLEDGE_CATEGORY_HASH_SYNC_EVENT, onStoreChange);
  };
}

function getHashSnapshot(): string {
  if (typeof window === "undefined") return "";
  return window.location.hash;
}

function getServerHashSnapshot(): string {
  return "";
}

/**
 * `/knowledgebase/{slug}` → article link list (same UI as “See all”).  
 * `/knowledgebase/{slug}#article-N` → full reader. Browser **Back** from hash clears hash → list again.
 */
export default function KnowledgeCategoryRouteShell({
  categoryTitle,
  articlesIndexHref,
  listItems,
  articleEntries,
}: KnowledgeCategoryRouteShellProps) {
  const router = useRouter();
  const hash = useSyncExternalStore(subscribeHash, getHashSnapshot, getServerHashSnapshot);

  const showArticleReader = ARTICLE_HASH.test(hash);

  if (showArticleReader) {
    return (
      <KnowledgeCategoryArticles
        categoryTitle={categoryTitle}
        articles={articleEntries}
        articlesIndexHref={articlesIndexHref}
      />
    );
  }

  return (
    <section
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: "rgb(var(--knowledge-categories-bg))" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <KnowledgeCategoryArticleListView
          categoryTitle={categoryTitle}
          total={listItems.length}
          articles={listItems}
          onClose={() => router.push("/knowledgebase")}
        />
      </div>
    </section>
  );
}
