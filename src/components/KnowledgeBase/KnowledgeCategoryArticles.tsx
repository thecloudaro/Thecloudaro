"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import ContentDescription from "@/components/ui/content-description";
import type {
  KnowledgeArticleContentBlock,
  KnowledgeArticlePageData,
  KnowledgeArticleSection,
} from "@/lib/knowledge-article-content-data";
import { KNOWLEDGE_CATEGORY_HASH_SYNC_EVENT } from "@/lib/knowledge-category-hash-sync";

const SCROLL_OFFSET_PX = 100;

function scrollToAnchor(anchorId: string, behavior: ScrollBehavior = "smooth") {
  const el = document.getElementById(anchorId);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET_PX;
  window.scrollTo({ top: Math.max(0, top), behavior });
  if (typeof window.history.replaceState === "function") {
    window.history.replaceState(null, "", `#${anchorId}`);
  }
}

interface ArticleEntry {
  anchorId: string;
  title: string;
  data: KnowledgeArticlePageData;
}

interface KnowledgeCategoryArticlesProps {
  categoryTitle: string;
  articles: ArticleEntry[];
  /** Same route without hash, e.g. `/knowledgebase/dns` — “All articles” / back to link list */
  articlesIndexHref: string;
}

const KnowledgeCategoryArticles: React.FC<KnowledgeCategoryArticlesProps> = ({
  categoryTitle,
  articles,
  articlesIndexHref,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeArticle, setActiveArticle] = useState<string>(articles[0]?.anchorId ?? "");
  const [indicatorTop, setIndicatorTop] = useState(0);
  const [whiteLineHeight, setWhiteLineHeight] = useState(0);
  const [whiteLineTop, setWhiteLineTop] = useState(0);
  const articleRefs = useRef<Record<string, HTMLElement | null>>({});
  const sidebarItemRefs = useRef<Record<string, HTMLElement | null>>({});
  const sidebarListRef = useRef<HTMLUListElement | null>(null);

  const itemIds = useMemo(() => articles.map((a) => a.anchorId), [articles]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const applyHashFromLocation = useCallback(() => {
    const raw = typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : "";
    if (raw && itemIds.includes(raw)) {
      requestAnimationFrame(() => {
        scrollToAnchor(raw, "instant");
        setActiveArticle(raw);
      });
    }
  }, [itemIds]);

  useEffect(() => {
    applyHashFromLocation();
    window.addEventListener("hashchange", applyHashFromLocation);
    return () => window.removeEventListener("hashchange", applyHashFromLocation);
  }, [applyHashFromLocation]);

  useEffect(() => {
    if (!isLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        visible.sort((a, b) => {
          if (Math.abs(b.intersectionRatio - a.intersectionRatio) > 0.08) {
            return b.intersectionRatio - a.intersectionRatio;
          }
          return a.boundingClientRect.top - b.boundingClientRect.top;
        });
        const id = visible[0].target.getAttribute("data-article-id");
        if (id) setActiveArticle(id);
      },
      {
        root: null,
        rootMargin: "-110px 0px -45% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    const t = setTimeout(() => {
      itemIds.forEach((id) => {
        const node = articleRefs.current[id];
        if (node) observer.observe(node);
      });
    }, 80);

    return () => {
      clearTimeout(t);
      itemIds.forEach((id) => {
        const node = articleRefs.current[id];
        if (node) observer.unobserve(node);
      });
    };
  }, [isLoaded, itemIds]);

  useEffect(() => {
    const el = sidebarItemRefs.current[activeArticle];
    if (el && sidebarListRef.current) {
      setIndicatorTop(el.offsetTop - sidebarListRef.current.offsetTop);
    }
  }, [activeArticle]);

  useEffect(() => {
    if (!sidebarListRef.current || !isLoaded || itemIds.length === 0) return;

    const measure = () => {
      if (!sidebarListRef.current) return;
      const first = sidebarItemRefs.current[itemIds[0]];
      const last = sidebarItemRefs.current[itemIds[itemIds.length - 1]];
      if (first && last) {
        const firstTop = first.offsetTop - sidebarListRef.current.offsetTop;
        const lastTop = last.offsetTop - sidebarListRef.current.offsetTop;
        setWhiteLineTop(firstTop + first.offsetHeight / 2 - 1);
        setWhiteLineHeight(lastTop - firstTop + last.offsetHeight);
      }
    };

    const t = setTimeout(measure, 150);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [isLoaded, itemIds]);

  const renderBlock = (block: KnowledgeArticleContentBlock, keyPrefix: string, index: number) => {
    if (block.type === "paragraph") {
      return (
        <p
          key={`${keyPrefix}-p-${index}`}
          className="text-xs leading-relaxed text-[rgb(var(--policy-text-white))]"
        >
          {block.text.split("\n").map((line, lineIndex) => (
            <span key={lineIndex}>
              {line}
              <br />
            </span>
          ))}
        </p>
      );
    }
    if (block.type === "list") {
      return (
        <ul
          key={`${keyPrefix}-ul-${index}`}
          className="list-disc list-inside text-xs leading-relaxed text-[rgb(var(--policy-text-white))]"
        >
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex}>{item}</li>
          ))}
        </ul>
      );
    }
    if (block.type === "image") {
      return (
        <figure key={`${keyPrefix}-fig-${index}`} className="my-4 sm:my-6 space-y-2">
          <div className="relative w-full aspect-[16/10] max-h-[min(420px,55vh)] overflow-hidden rounded-lg border border-[rgba(var(--policy-sidebar-track))] bg-black/20">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              className="object-contain p-2 sm:p-3"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>
          {block.caption ? (
            <figcaption className="text-xs text-[rgb(var(--policy-text-muted))]">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    }
    return null;
  };

  const renderSection = (section: KnowledgeArticleSection, keyPrefix: string) => (
    <div
      key={`${keyPrefix}__${section.id}`}
      className="space-y-4 sm:space-y-6 mt-8 sm:mt-10 first:mt-0"
    >
      <ContentDescription
        text={section.title}
        size="md"
        className="text-base sm:text-lg md:text-xl text-left !text-[rgb(var(--policy-text-white))] font-bold"
      />
      <div className="space-y-3 sm:space-y-4">
        {section.blocks.map((block, index) =>
          renderBlock(block, `${keyPrefix}__${section.id}`, index),
        )}
      </div>
      {section.subsections?.map((sub) => renderSection(sub, keyPrefix))}
    </div>
  );

  return (
    <div className="relative w-full min-h-screen pt-20 bg-[rgb(var(--policy-bg))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 sm:gap-16 md:gap-20 lg:gap-40">
          <div className="lg:col-span-2 lg:pr-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.28, delay: 0.05 }}
              className="space-y-6 sm:space-y-8"
            >
              <div className="text-xs text-[rgb(var(--policy-text-muted))]">
                <Link href="/knowledgebase" className="hover:underline">
                  Knowledge base
                </Link>
                <span className="mx-2">›</span>
                <span>{categoryTitle}</span>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    router.replace(articlesIndexHref);
                    window.scrollTo({ top: 0, behavior: "instant" });
                    window.dispatchEvent(new Event(KNOWLEDGE_CATEGORY_HASH_SYNC_EVENT));
                  }}
                  className="inline-flex items-center gap-2 rounded-md py-1.5 text-xs font-medium text-[rgb(var(--policy-sidebar-indicator))] transition-colors hover:text-[rgb(var(--policy-text-white))] hover:underline sm:text-sm"
                >
                  <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
                  All articles
                </button>
              </div>
              <ContentDescription
                text={`${categoryTitle} — articles`}
                size="xl"
                className="text-lg sm:text-xl md:text-2xl lg:text-4xl text-left !text-[rgb(var(--policy-text-white))] font-bold leading-tight"
              />
              <p className="text-xs text-[rgb(var(--policy-text-muted))]">
                {articles.length} article{articles.length === 1 ? "" : "s"} on this page. Use the list on the right
                or a shared link with <code className="rounded bg-white/10 px-1">#article-1</code> to jump to a topic.
              </p>
            </motion.div>

            <div className="mt-10 sm:mt-12 space-y-16 sm:space-y-20">
              {articles.map((article) => (
                <article
                  key={article.anchorId}
                  id={article.anchorId}
                  data-article-id={article.anchorId}
                  ref={(el) => {
                    articleRefs.current[article.anchorId] = el;
                  }}
                  className="scroll-mt-[100px] border-t border-[rgba(var(--policy-sidebar-track))] pt-12 sm:pt-14 first:border-t-0 first:pt-0"
                >
                  <ContentDescription
                    text={article.data.title}
                    size="lg"
                    className="text-left !text-[rgb(var(--policy-text-white))] font-bold text-base sm:text-lg md:text-xl"
                  />
                  <p className="mt-2 text-xs text-[rgb(var(--policy-text-muted))]">
                    Last updated: {article.data.lastUpdated}
                  </p>
                  <div className="mt-4 space-y-4 text-xs leading-relaxed text-[rgb(var(--policy-text-white))]">
                    {article.data.intro.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  {article.data.sections.map((section) =>
                    renderSection(section, article.anchorId),
                  )}
                </article>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.28, delay: 0.08 }}
              className="lg:sticky lg:top-20"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[rgb(var(--policy-text-muted))]">
                Articles in this category
              </p>
              <div className="relative pr-1">
                <div className="relative">
                  {whiteLineHeight > 0 && (
                    <div
                      className="absolute left-0 w-0.5"
                      style={{
                        backgroundColor: "rgba(var(--policy-sidebar-track))",
                        top: `${whiteLineTop}px`,
                        height: `${whiteLineHeight}px`,
                        zIndex: 1,
                      }}
                    />
                  )}
                  <motion.div
                    className="absolute left-0 w-1 h-6 sm:h-8 rounded-full z-10"
                    style={{ backgroundColor: "rgb(var(--policy-sidebar-indicator))" }}
                    animate={{ top: indicatorTop }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                  <ul ref={sidebarListRef} className="space-y-2 sm:space-y-3 relative pl-2">
                    {articles.map((article, index) => {
                      const isActive = activeArticle === article.anchorId;
                      return (
                        <li
                          key={article.anchorId}
                          ref={(el) => {
                            sidebarItemRefs.current[article.anchorId] = el;
                          }}
                          className="flex items-start"
                        >
                          <button
                            type="button"
                            onClick={() => scrollToAnchor(article.anchorId, "smooth")}
                            className={`text-xs hover:underline block text-left w-full pl-3 text-[rgb(var(--policy-text-white))] transition-all leading-snug ${
                              isActive ? "font-bold" : ""
                            }`}
                          >
                            <span className="text-[rgb(var(--policy-text-muted))] mr-1.5 tabular-nums">
                              {index + 1}.
                            </span>
                            {article.title}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-[10px] leading-relaxed text-[rgb(var(--policy-text-muted))] sm:text-xs">
                Tip: open{" "}
                <code className="rounded bg-white/10 px-1">
                  {pathname}#article-1
                </code>{" "}
                (change the number) to deep-link any topic.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeCategoryArticles;
