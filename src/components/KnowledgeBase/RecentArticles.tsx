"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ContentHeading from "@/components/ui/content-heading";

interface Article {
  id: string;
  title: string;
  category: string;
  href: string;
}

const articles: Article[] = [
  {
    id: "1",
    title: "How to create a website and publish it on The Cloud Aro Web Hosting",
    category: "WEB HOSTING",
    href: "/knowledgebase/article/1",
  },
  {
    id: "2",
    title: "How to create and access an FTP account",
    category: "WEB HOSTING",
    href: "/knowledgebase/article/2",
  },
  {
    id: "3",
    title: "How to deal with a hacked WordPress website",
    category: "WEB HOSTING",
    href: "/knowledgebase/article/3",
  },
  {
    id: "4",
    title: "How to Use the Spacemail App on iOS and Android",
    category: "SPACEMAIL",
    href: "/knowledgebase/article/4",
  },
  {
    id: "5",
    title: "How to Set Up a Contact Form with Spacemail (Step-by-Step Guide)",
    category: "SPACEMAIL",
    href: "/knowledgebase/article/5",
  },
];

const RecentArticles = () => {
  return (
    <section
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: 'rgb(var(--knowledge-recent-articles-bg))' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <ContentHeading
            title="Recent articles"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl !text-[rgb(var(--knowledge-recent-articles-heading-text))]"
          />
        </motion.div>

        {/* Articles List */}
        <div className="space-y-0 mb-8 sm:mb-10 md:mb-12">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={article.href}>
                <div
                  className="py-4 sm:py-5 md:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 transition-colors cursor-pointer group"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  {/* Article Title */}
                  <h3
                    className="text-sm sm:text-base md:text-lg font-normal flex-1 text-left"
                    style={{ color: 'rgb(var(--knowledge-recent-articles-title-text))' }}
                  >
                    {article.title}
                  </h3>

                  {/* Category and Arrow */}
                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <span
                      className="text-xs sm:text-sm font-medium uppercase tracking-wide"
                      style={{ color: 'rgb(var(--knowledge-recent-articles-show-more-text))' }}
                    >
                      {article.category}
                    </span>
                    <ArrowRight
                      className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                      style={{ color: 'rgb(var(--knowledge-recent-articles-show-more-text))' }}
                    />
                  </div>
                </div>
              </Link>

              {/* Divider Line */}
              {index < articles.length - 1 && (
                <div
                  className="w-full h-px"
                  style={{
                    backgroundColor: 'rgba(var(--knowledge-recent-articles-divider))',
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Show more link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Link
            href="/knowledgebase/articles"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-medium transition-colors group"
            style={{ color: 'rgb(var(--knowledge-recent-articles-show-more-text))' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            <span>Show more</span>
            <ArrowRight
              className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1"
              style={{ color: 'rgb(var(--knowledge-recent-articles-show-more-text))' }}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RecentArticles;

