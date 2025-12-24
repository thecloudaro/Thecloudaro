"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ChatButton from "@/components/HomeSection/ChatButton";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const KnowledgeHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="relative min-h-[80vh] sm:min-h-[85vh] md:min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/BgPics/bg4.jpg"
          alt="Knowledge Base Background"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Dark overlay for better text contrast */}
        <div 
          className="absolute inset-0 bg-gradient-to-b"
          style={{
            background: `linear-gradient(to bottom, rgba(var(--knowledge-hero-overlay-from)), rgba(var(--knowledge-hero-overlay-via)), rgba(var(--knowledge-hero-overlay-to)))`
          }}
        />
        
        {/* Abstract geometric shapes - Blue/Purple gradients */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Bottom left geometric shape - Responsive sizing */}
          <div 
            className="absolute bottom-0 left-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-gradient-to-tr transform rotate-45 -translate-x-1/4 translate-y-1/4 blur-2xl sm:blur-3xl"
            style={{
              background: `linear-gradient(to top right, rgba(var(--knowledge-hero-shape-blue-500)), rgba(var(--knowledge-hero-shape-blue-400)), transparent)`
            }}
          />
          {/* Bottom right geometric shape - Responsive sizing */}
          <div 
            className="absolute bottom-0 right-0 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] bg-gradient-to-tl transform -rotate-45 translate-x-1/4 translate-y-1/4 blur-2xl sm:blur-3xl"
            style={{
              background: `linear-gradient(to top left, rgba(var(--knowledge-hero-shape-purple-500)), rgba(var(--knowledge-hero-shape-purple-400)), transparent)`
            }}
          />
          {/* Center geometric accent - Responsive sizing */}
          <div 
            className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-[200px] h-[150px] sm:w-[300px] sm:h-[200px] md:w-[400px] md:h-[300px] bg-gradient-to-t blur-xl sm:blur-2xl"
            style={{
              background: `linear-gradient(to top, rgba(var(--knowledge-hero-shape-blue-400)), rgba(var(--knowledge-hero-shape-purple-400-15)), transparent)`
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 text-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-3 sm:mb-4 md:mb-5 lg:mb-6"
        >
          <ContentHeading
            title="Knowledge Base"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl !text-[rgb(var(--knowledge-hero-title-text))]"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-5 sm:mb-6 md:mb-8 lg:mb-10 max-w-2xl mx-auto px-2"
        >
          <ContentDescription
            text="Find the self-help resources you need right here."
            size="md"
            className="!text-sm sm:!text-base md:!text-lg lg:!text-xl !text-[rgba(var(--knowledge-hero-subtitle-text))]"
          />
        </motion.div>

        {/* Search Bar */}
        <motion.form
          onSubmit={handleSearch}
          className="w-full max-w-xl sm:max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="relative">
            <div 
              className="flex items-center backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-2.5 transition-colors"
              style={{
                backgroundColor: 'rgba(var(--knowledge-hero-search-bg))',
                borderColor: 'rgba(var(--knowledge-hero-search-border))',
                borderWidth: '1px',
                borderStyle: 'solid'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(var(--knowledge-hero-search-border-hover))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(var(--knowledge-hero-search-border))';
              }}
            >
              {/* Search Icon */}
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-3 md:mr-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
                style={{ color: 'rgb(var(--knowledge-hero-search-icon))' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {/* Search Input */}
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search all articles"
                className="flex-1 bg-transparent text-sm sm:text-base md:text-lg focus:outline-none h-3 sm:h-4 md:h-5 knowledge-hero-search-input"
                aria-label="Search all articles"
                style={{
                  color: 'rgb(var(--knowledge-hero-search-input-text))'
                }}
              />
            </div>
          </div>
        </motion.form>
      </div>

      {/* Chat Button */}
      <ChatButton onClick={() => console.log("Chat opened")} isLoaded={isLoaded} delay={1.2} />
    </div>
  );
};

export default KnowledgeHero;

