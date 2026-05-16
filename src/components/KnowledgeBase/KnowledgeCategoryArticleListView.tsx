"use client";

import { ArrowLeft, X } from "lucide-react";
import { KNOWLEDGE_CATEGORY_HASH_SYNC_EVENT } from "@/lib/knowledge-category-hash-sync";

export interface KnowledgeCategoryArticleListItem {
  id: string;
  title: string;
  href: string;
}

interface KnowledgeCategoryArticleListViewProps {
  categoryTitle: string;
  total: number;
  articles: KnowledgeCategoryArticleListItem[];
  onClose: () => void;
}

const cardSurfaceStyle: React.CSSProperties = {
  backgroundColor: "rgb(var(--knowledge-categories-card-bg))",
  border: "1px solid rgba(var(--knowledge-categories-card-border))",
};

function notifyHashSync() {
  window.dispatchEvent(new Event(KNOWLEDGE_CATEGORY_HASH_SYNC_EVENT));
}

/**
 * Native `<a href>` so in-page `#article-*` updates `location.hash` reliably (Next `Link` often skips hashchange).
 * Sync event wakes {@link KnowledgeCategoryRouteShell} `useSyncExternalStore` subscriber.
 */
function ArticleListRow({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center justify-between gap-4 py-3.5 transition-colors hover:bg-white/5 sm:py-4 -mx-4 px-4 sm:-mx-5 sm:px-5 md:-mx-6 md:px-6"
      onClick={(e) => {
        if (e.defaultPrevented) return;
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        queueMicrotask(() => notifyHashSync());
      }}
    >
      <span
        className="text-sm font-semibold leading-snug sm:text-[15px]"
        style={{ color: "rgb(var(--knowledge-categories-title-text))" }}
      >
        {title}
      </span>
      <span
        className="shrink-0 text-lg transition-transform group-hover:translate-x-0.5"
        style={{ color: "rgb(var(--knowledge-categories-link-text))" }}
        aria-hidden
      >
        →
      </span>
    </a>
  );
}

/**
 * Full-width article list inside the same `max-w-7xl` band as the category grid,
 * using the same card surface tokens as {@link KnowledgeCategories} cards.
 */
const KnowledgeCategoryArticleListView: React.FC<KnowledgeCategoryArticleListViewProps> = ({
  categoryTitle,
  total,
  articles,
  onClose,
}) => {
  return (
    <div className="flex w-full flex-col">
      <div className="mb-4 flex w-full justify-start">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium transition-colors hover:bg-white/5 sm:text-sm"
          style={{ color: "rgb(var(--knowledge-categories-link-text))" }}
        >
          <ArrowLeft className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
          All categories
        </button>
      </div>

      <div
        role="region"
        aria-labelledby="knowledge-article-list-heading"
        className="relative w-full flex flex-col overflow-hidden rounded-lg shadow-lg max-h-[min(85vh,1200px)] sm:max-h-[85vh]"
        style={cardSurfaceStyle}
      >
        <div className="flex items-start justify-between gap-3 px-4 pt-4 pb-2 sm:px-5 sm:pt-5 md:px-6">
          <h2
            id="knowledge-article-list-heading"
            className="pr-10 text-sm font-semibold sm:text-base md:text-lg"
            style={{ color: "rgb(var(--knowledge-categories-title-text))" }}
          >
            {categoryTitle}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-2 top-2 rounded-md p-2 transition-colors hover:bg-white/10 sm:right-3 sm:top-3 md:right-4 md:top-4"
            style={{ color: "rgba(var(--knowledge-categories-count-text))" }}
            aria-label="Back to categories"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className="border-b px-4 sm:px-5 md:px-6"
          style={{ borderColor: "rgba(var(--knowledge-categories-card-border))" }}
        >
          <div className="inline-flex flex-col">
            <div className="flex items-center gap-2 pb-2">
              <span
                className="text-sm font-medium sm:text-base"
                style={{ color: "rgb(var(--knowledge-categories-title-text))" }}
              >
                All
              </span>
              <span
                className="inline-flex h-6 min-w-[1.375rem] items-center justify-center rounded-full px-1.5 text-xs font-medium"
                style={{
                  backgroundColor: "rgba(var(--knowledge-categories-card-border))",
                  color: "rgb(var(--knowledge-categories-title-text))",
                }}
              >
                {total}
              </span>
            </div>
            <div
              className="h-0.5 w-full max-w-[4.5rem] rounded-full"
              style={{ backgroundColor: "rgb(var(--knowledge-categories-link-text))" }}
              aria-hidden
            />
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto knowledge-scrollbar-themed px-4 sm:px-5 md:px-6">
          <ul
            className="border-t"
            style={{
              borderColor: "rgba(var(--knowledge-categories-card-border))",
            }}
          >
            {articles.map((article, index) => (
              <li
                key={article.id}
                className={index === 0 ? "" : "border-t"}
                style={
                  index === 0
                    ? undefined
                    : { borderColor: "rgba(var(--knowledge-categories-card-border))" }
                }
              >
                <ArticleListRow href={article.href} title={article.title} />
              </li>
            ))}
          </ul>
        </div>

        <div
          className="px-4 py-3 text-right text-xs sm:px-5 sm:text-sm md:px-6"
          style={{ color: "rgba(var(--knowledge-categories-count-text))" }}
        >
          {total} of {total} items
        </div>
      </div>
    </div>
  );
};

export default KnowledgeCategoryArticleListView;
