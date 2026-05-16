"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { KNOWLEDGE_CATEGORIES } from "@/lib/knowledge-article-content-data";

interface CategoryCard {
  id: string;
  title: string;
  articleCount: number;
  href: string;
}

const categories: CategoryCard[] = KNOWLEDGE_CATEGORIES.map((c) => ({
  id: c.id,
  title: c.title,
  articleCount: c.articleCount,
  href: c.href,
}));

const KnowledgeCategories = () => {
  return (
    <section
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: "rgb(var(--knowledge-categories-bg))" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.22, delay: Math.min(index * 0.04, 0.24) }}
            >
              <div
                className="h-full p-4 sm:p-5 rounded-lg transition-all flex flex-col"
                style={{
                  backgroundColor: "rgb(var(--knowledge-categories-card-bg))",
                  border: `1px solid rgba(var(--knowledge-categories-card-border))`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(var(--knowledge-categories-card-border-hover))";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(var(--knowledge-categories-card-border))";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Link href={category.href} prefetch className="block flex-1 min-h-0">
                  <h3
                    className="text-base sm:text-lg font-bold mb-2 sm:mb-3"
                    style={{ color: "rgb(var(--knowledge-categories-title-text))" }}
                  >
                    {category.title}
                  </h3>
                  <p
                    className="text-xs sm:text-sm mb-4 sm:mb-5"
                    style={{ color: "rgba(var(--knowledge-categories-count-text))" }}
                  >
                    {category.articleCount} articles
                  </p>
                </Link>

                <div
                  className="w-full mb-3 sm:mb-4"
                  style={{
                    borderTop: `1px solid rgba(var(--knowledge-categories-card-border))`,
                  }}
                />

                <Link
                  href={category.href}
                  prefetch
                  className="mt-auto flex items-center gap-2 rounded-md py-1 -mx-1 px-1 text-left transition-colors hover:bg-white/5"
                >
                  <span
                    className="text-xs sm:text-sm font-medium"
                    style={{ color: "rgb(var(--knowledge-categories-link-text))" }}
                  >
                    See all
                  </span>
                  <ArrowRight
                    className="w-3 h-3 sm:w-4 sm:h-4 shrink-0"
                    style={{ color: "rgb(var(--knowledge-categories-link-text))" }}
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowledgeCategories;
