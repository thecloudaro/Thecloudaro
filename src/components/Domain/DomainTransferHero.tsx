"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { ArrowUpLeft, LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface DomainTransferHeroProps {
  showHeader?: boolean;
  headerPlaceholder?: string;
  bulkTransferLabel?: string;
  transferButtonLabel?: string;
  heroTitle: string;
  heroSubtitle?: string;
  features: Feature[];
  onTransfer?: (domain: string) => void;
  onBulkTransfer?: () => void;
}

const DomainTransferHero = ({
  showHeader = true,
  headerPlaceholder = "Type your domain to transfer...",
  bulkTransferLabel = "Bulk Transfer",
  transferButtonLabel = "Transfer",
  heroTitle,
  heroSubtitle,
  features,
  onTransfer,
  onBulkTransfer,
}: DomainTransferHeroProps) => {
  const [domainInput, setDomainInput] = useState("");

  const handleTransfer = () => {
    if (onTransfer && domainInput.trim()) {
      onTransfer(domainInput.trim());
    }
  };

  return (
    <section className={`${showHeader ? 'min-h-screen' : ''} bg-[#1A1A1A] flex flex-col`}>
      {/* Header Section */}
      {showHeader && (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4">
          {/* Domain Input */}
          <div className="flex-1 w-full sm:w-auto flex items-center relative">
            <ArrowUpLeft className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none z-10" />
            <Input
              type="text"
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              placeholder={headerPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 text-white placeholder:text-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleTransfer();
                }
              }}
            />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onBulkTransfer}
              className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors whitespace-nowrap"
            >
              <ArrowUpLeft className="w-4 h-4" />
              <span className="text-sm sm:text-base">{bulkTransferLabel}</span>
            </button>
            <button
              onClick={handleTransfer}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
            >
              {transferButtonLabel}
            </button>
          </div>
        </div>
      </div>
      )}

      {/* Hero Section */}
      <div className={`${showHeader ? 'flex-1 flex flex-col justify-center' : ''} items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20`}>
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            {heroTitle}
          </motion.h1>
          {heroSubtitle && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
          >
            {heroSubtitle}
          </motion.p>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center"
                >
                  {/* Icon Container */}
                  <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DomainTransferHero;
