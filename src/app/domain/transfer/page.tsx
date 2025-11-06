"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import TransferPricing from "@/components/Transfer/TransferPricing";
import TransferHeroFeatures from "@/components/Transfer/TransferHeroFeatures";
import TransferInstructions from "@/components/Transfer/TransferInstructions";
import TransferUnlock from "@/components/Transfer/TransferUnlock";
import TransferStart from "@/components/Transfer/TransferStart";
import TransferFAQ from "@/components/Transfer/TransferFAQ";
import TransferGetMore from "@/components/Transfer/TransferGetMore";
import InsideTransferManager from "@/components/Transfer/InsideTransferManager";
import TransferFrequentlyAskedQuestions from "@/components/Transfer/TransferFrequentlyAskedQuestions";
import SectionHeading from "@/components/ui/section-heading";

const DomainTransferPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (term: string) => {
    if (!term.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen text-gray-300 overflow-hidden" style={{ backgroundColor: '#2d2e2e' }}>
      {/* Radial gradient overlays to match reference (stronger from bottom) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(130% 90% at 50% 115%, hsl(var(--gradient-teal) / 0.34) 0%, rgba(0,0,0,0) 64%),
            radial-gradient(90% 70% at 50% 40%, hsl(var(--gradient-teal) / 0.10) 0%, rgba(0,0,0,0) 58%),
            radial-gradient(85% 65% at 85% 108%, hsl(var(--gradient-teal) / 0.20) 0%, rgba(0,0,0,0) 66%),
            radial-gradient(85% 65% at 15% 108%, hsl(var(--gradient-teal) / 0.20) 0%, rgba(0,0,0,0) 66%),
            radial-gradient(120% 80% at 50% -10%, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0) 75%)
          `
        }}
      />
      {/* Mid-page intersecting arcs made with radial gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute z-0 inset-0"
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.9) 45%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.9) 45%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0) 100%)',
          background: `
            radial-gradient(60% 60% at 30% 38%, hsl(var(--gradient-teal) / 0.20) 0%, rgba(0,0,0,0) 65%),
            radial-gradient(60% 60% at 70% 36%, hsl(var(--gradient-teal) / 0.22) 0%, rgba(0,0,0,0) 65%)
          `,
          mixBlendMode: 'screen'
        }}
      />
      {/* Animated glow orbs in mid area for subtle movement */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-0 rounded-full blur-3xl"
        style={{
          width: 300,
          height: 300,
          left: '18%',
          top: '45%',
          background: 'radial-gradient(circle, hsl(var(--gradient-teal) / 0.25) 0%, rgba(0,0,0,0) 60%)'
        }}
        animate={{ x: [0, 12, -10, 0], y: [0, -10, 8, 0], opacity: [0.5, 0.7, 0.55, 0.6] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-0 rounded-full blur-3xl"
        style={{
          width: 360,
          height: 360,
          right: '14%',
          top: '52%',
          background: 'radial-gradient(circle, hsl(var(--gradient-teal) / 0.20) 0%, rgba(0,0,0,0) 65%)'
        }}
        animate={{ x: [0, -10, 12, 0], y: [0, 8, -10, 0], opacity: [0.45, 0.65, 0.5, 0.55] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Content wrapper above gradient */}
      <div className="relative z-10">
        <Navbar hideBanner />
        {/* Breadcrumb under navbar (aligned to logo) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 text-sm text-gray-400">
            <span className="opacity-80">Domains</span>
            <span className="mx-2">›</span>
            <span className="text-gray-200">Transfer</span>
          </div>
        </div>
        {/* Hero Section */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pt-20 sm:pt-24 md:pt-28 lg:pt-32 xl:pt-36 pb-4">
          <div className="max-w-7xl mx-auto">
            <div className="relative text-center mb-12">
              {/* Center glow behind the main heading */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-2 -z-10 w-[520px] h-[520px] rounded-full blur-3xl opacity-80"
                style={{
                  background: 'radial-gradient(circle, hsl(var(--gradient-teal) / 0.28) 0%, rgba(0,0,0,0) 62%)'
                }}
              />
              <SectionHeading
                heading={
                  <>
                    Transfer your domain to
                    <span className="block mt-1">The Cloud Aro</span>
                  </>
                }
                description="Effortless transfers and next-level domain management."
                headingTag="h1"
                headingClassName="text-[3rem] sm:text-[3rem] md:text-[3.75rem] font-bold text-white mb-4 leading-tight"
                descriptionClassName="text-white text-xl sm:text-2xl md:text-3xl max-w-4xl mx-auto"
              />
            </div>

            {/* Search Section */}
            <div className="max-w-2xl mx-auto w-full">
              <div className="relative w-full mb-4 sm:mb-6 md:mb-8">
                <div className="flex items-stretch bg-hero-search-bg backdrop-blur-md rounded-full p-1.5 sm:p-2 border border-hero-search-border shadow-lg" style={{ backgroundColor: '#1b1d1c' }}>
                  <div className="flex items-center flex-1 px-3 sm:px-4">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                      placeholder="Type your domain to transfer..."
                      className="flex-1 bg-transparent text-hero-text placeholder-hero-text-muted text-sm sm:text-base focus:outline-none"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSearch(searchTerm)}
                    disabled={isSearching}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium text-sm sm:text-base transition disabled:opacity-50"
                  >
                    {isSearching ? "Searching..." : "Transfer"}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Diagonal Section Divider */}
        <div className="relative">
          <svg className="w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,120L1200,5L1200,120L0,120Z" 
                  fill="#1b1d1c" 
                  opacity="1" />
          </svg>
        </div>
        {/* Transfer Pricing Section */}
        <div style={{ backgroundColor: '#1b1d1c', position: 'relative' }}>
          <TransferPricing />
        </div>

        {/* Transfer Hero Features Section */}
        <TransferHeroFeatures />

        {/* Transfer Instructions Section */}
        <TransferInstructions />

        {/* Transfer Unlock Section */}
        <TransferUnlock />

        {/* Transfer Start Section */}
        <TransferStart />

        {/* Transfer FAQ Section */}
        <TransferFAQ />

        {/* Get More With Spaceship Section */}
        <TransferGetMore />

        {/* Inside Transfer Manager Section */}
        <InsideTransferManager />

        {/* Frequently Asked Questions Section */}
        <TransferFrequentlyAskedQuestions />
      </div>
    </div>
  );
};

export default DomainTransferPage;
