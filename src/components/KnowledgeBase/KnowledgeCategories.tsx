"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CategoryCard {
  id: string;
  title: string;
  articleCount: number;
  href: string;
}

const categories: CategoryCard[] = [
  { id: "1", title: "DNS", articleCount: 3, href: "/knowledgebase/dns" },
  { id: "2", title: "Domains", articleCount: 15, href: "/knowledgebase/domains" },
  { id: "3", title: "EasyWP", articleCount: 14, href: "/knowledgebase/easywp" },
  { id: "4", title: "Spacemail", articleCount: 59, href: "/knowledgebase/spacemail" },
  { id: "5", title: "Starlight Hyperlift", articleCount: 3, href: "/knowledgebase/starlight-hyperlift" },
  { id: "6", title: "Virtual Machines", articleCount: 12, href: "/knowledgebase/virtual-machines" },
  { id: "7", title: "VPN", articleCount: 21, href: "/knowledgebase/vpn" },
  { id: "8", title: "Web Hosting", articleCount: 16, href: "/knowledgebase/web-hosting" },
];

const KnowledgeCategories = () => {
  return (
    <section 
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: 'rgb(var(--knowledge-categories-bg))' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={category.href}>
                <div
                  className="h-full p-4 sm:p-5 rounded-lg transition-all cursor-pointer flex flex-col"
                  style={{
                    backgroundColor: 'rgb(var(--knowledge-categories-card-bg))',
                    border: `1px solid rgba(var(--knowledge-categories-card-border))`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(var(--knowledge-categories-card-border-hover))';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(var(--knowledge-categories-card-border))';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Title */}
                  <h3
                    className="text-base sm:text-lg font-bold mb-2 sm:mb-3"
                    style={{ color: 'rgb(var(--knowledge-categories-title-text))' }}
                  >
                    {category.title}
                  </h3>

                  {/* Article Count */}
                  <p
                    className="text-xs sm:text-sm mb-4 sm:mb-5 flex-1"
                    style={{ color: 'rgba(var(--knowledge-categories-count-text))' }}
                  >
                    {category.articleCount} articles
                  </p>

                  {/* Divider Line */}
                  <div
                    className="w-full mb-3 sm:mb-4"
                    style={{
                      borderTop: `1px solid rgba(var(--knowledge-categories-card-border))`,
                    }}
                  />

                  {/* See all link */}
                  <div className="flex items-center gap-2 mt-auto">
                    <span
                      className="text-xs sm:text-sm font-medium"
                      style={{ color: 'rgb(var(--knowledge-categories-link-text))' }}
                    >
                      See all
                    </span>
                    <ArrowRight
                      className="w-3 h-3 sm:w-4 sm:h-4"
                      style={{ color: 'rgb(var(--knowledge-categories-link-text))' }}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowledgeCategories;

