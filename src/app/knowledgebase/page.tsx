"use client";

import KnowledgeHero from "@/components/KnowledgeBase/KnowledgeHero";
import KnowledgeCategories from "@/components/KnowledgeBase/KnowledgeCategories";
import RecentArticles from "@/components/KnowledgeBase/RecentArticles";

export default function KnowledgeBasePage() {
  return (
    <div className="min-h-screen">
      <KnowledgeHero />
      
      {/* Diagonal Section Divider */}
      <div className="relative w-full -mt-20">
        <svg className="w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M0,120L1200,5L1200,120L0,120Z" 
            fill="rgb(var(--knowledge-categories-bg))" 
            opacity="1" 
          />
        </svg>
      </div>
      
      <KnowledgeCategories />
      <RecentArticles />
    </div>
  );
}

