'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ContentHeading from '@/components/ui/content-heading';
import ContentDescription from '@/components/ui/content-description';
import { virtualMachineStyles } from '@/lib/virtualMachineUtils';

const Configure = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedBilling, setSelectedBilling] = useState('pay-as-you-go');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const billingOptions = [
    { id: 'monthly', label: 'Monthly' },
    { id: 'quarterly', label: 'Quarterly' },
    { id: 'yearly', label: 'Yearly' },
    { id: 'pay-as-you-go', label: 'Pay-as-you-go' }
  ];


  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: virtualMachineStyles.sectionBg }}>
      <div className="relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading Section */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 sm:mb-8"
            >
              <ContentHeading
                title="Configure your plan"
                className="text-center !text-[2.5rem] sm:!text-[3.35rem] md:!text-[4.05rem] lg:!text-[4.5rem] font-bold leading-[1.08] !text-[rgb(var(--virtual-machine-hero-text))]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-8 sm:mb-10"
            >
              <ContentDescription
                size="lg"
                className="max-w-3xl mx-auto text-center text-lg sm:text-xl"
              >
                <span style={{ color: virtualMachineStyles.heroText85 }}>
                  Select only what suits your needs.
                </span>
              </ContentDescription>
            </motion.div>

            {/* Billing Options */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center mb-12 sm:mb-16 lg:mb-20"
            >
              <div 
                className="inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-full"
                style={{ backgroundColor: virtualMachineStyles.billingContainerBg }}
              >
                {billingOptions.map((option) => {
                  const isSelected = selectedBilling === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setSelectedBilling(option.id)}
                      className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                      style={{
                        backgroundColor: isSelected 
                          ? virtualMachineStyles.billingSelectedBg 
                          : 'transparent',
                        color: virtualMachineStyles.billingText,
                      }}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Configuration Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="overflow-x-auto"
          >
            <div className="min-w-full max-w-7xl mx-auto">
              {/* Table Header */}
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 items-start pb-4 mb-2">
                <div className="text-left min-w-0 pl-0">
                  <p className="text-sm font-medium" style={{ color: virtualMachineStyles.cardTextGray }}>Configuration</p>
                </div>
                <div className="text-left min-w-0">
                  <p className="text-sm font-medium" style={{ color: virtualMachineStyles.cardTextGray }}>Cores</p>
                </div>
                <div className="text-left min-w-0">
                  <p className="text-sm font-medium" style={{ color: virtualMachineStyles.cardTextGray }}>RAM</p>
                </div>
                <div className="text-left min-w-0">
                  <p className="text-sm font-medium" style={{ color: virtualMachineStyles.cardTextGray }}>Storage</p>
                </div>
                <div className="text-left min-w-0">
                  <p className="text-sm font-medium" style={{ color: virtualMachineStyles.cardTextGray }}>Bandwidth</p>
                </div>
                <div className="text-left min-w-0">
                  <p className="text-sm font-medium" style={{ color: virtualMachineStyles.cardTextGray }}>Hourly</p>
                </div>
                <div className="text-left min-w-0">
                  <p className="text-sm font-medium" style={{ color: virtualMachineStyles.cardTextGray }}>Monthly</p>
                </div>
                <div className="text-left flex-shrink-0 pr-0">
                  {/* Empty for button column */}
                </div>
              </div>

              {/* Table Rows */}
              <div className="space-y-0">
                {/* Standard 1 - Row 1 (with background) */}
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 items-center p-5 rounded-lg border" style={{ backgroundColor: virtualMachineStyles.tableRowBg, borderColor: virtualMachineStyles.borderColor }}>
                <div className="text-left min-w-0">
                  <p className="text-sm font-semibold whitespace-nowrap" style={{ color: virtualMachineStyles.cardText }}>Standard 1</p>
                </div>
                <div className="text-left min-w-0">
                  <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>2</p>
                  <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>cores</p>
                </div>
                <div className="text-left min-w-0">
                  <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>4</p>
                  <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>GiB</p>
                </div>
                <div className="text-left min-w-0">
                  <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>80</p>
                  <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>GiB</p>
                </div>
                <div className="text-left min-w-0">
                  <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>2</p>
                  <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>TiB</p>
                </div>
                <div className="text-left min-w-0">
                  <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>
                    <span className="text-xs font-normal" style={{ color: virtualMachineStyles.cardTextGray }}>$</span>0.007
                  </p>
                  <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>/hr</p>
                </div>
                <div className="text-left min-w-0">
                  <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>
                    <span className="text-xs font-normal" style={{ color: virtualMachineStyles.cardTextGray }}>$</span>4.90
                  </p>
                  <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>/mo</p>
                </div>
                  <div className="text-left flex-shrink-0">
                    <button className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:opacity-80 flex-shrink-0" style={{ backgroundColor: virtualMachineStyles.cardButtonBg }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke={virtualMachineStyles.cardButtonText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Standard 2 - Row 2 (no background) */}
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 items-center p-5 rounded-lg border" style={{ borderColor: virtualMachineStyles.borderColor }}>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-semibold whitespace-nowrap" style={{ color: virtualMachineStyles.cardText }}>Standard 2</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>3</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>cores</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>6</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>GiB</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>120</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>GiB</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>3</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>TiB</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>
                      <span className="text-xs font-normal" style={{ color: virtualMachineStyles.cardTextGray }}>$</span>0.018
                    </p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>/hr</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>
                      <span className="text-xs font-normal" style={{ color: virtualMachineStyles.cardTextGray }}>$</span>12.95
                    </p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>/mo</p>
                  </div>
                  <div className="text-left flex-shrink-0">
                    <button className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:opacity-80 flex-shrink-0" style={{ backgroundColor: virtualMachineStyles.cardButtonBg }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke={virtualMachineStyles.cardButtonText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Standard 3 - Row 3 (with background) */}
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 items-center p-5 rounded-lg border" style={{ backgroundColor: virtualMachineStyles.tableRowBg, borderColor: virtualMachineStyles.borderColor }}>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-semibold whitespace-nowrap" style={{ color: virtualMachineStyles.cardText }}>Standard 3</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>4</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>cores</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>8</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>GiB</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>160</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>GiB</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>4</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>TiB</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>
                      <span className="text-xs font-normal" style={{ color: virtualMachineStyles.cardTextGray }}>$</span>0.036
                    </p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>/hr</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>
                      <span className="text-xs font-normal" style={{ color: virtualMachineStyles.cardTextGray }}>$</span>25.89
                    </p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>/mo</p>
                  </div>
                  <div className="text-left flex-shrink-0">
                    <button className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:opacity-80 flex-shrink-0" style={{ backgroundColor: virtualMachineStyles.cardButtonBg }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke={virtualMachineStyles.cardButtonText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Standard 4 - Row 4 (no background) */}
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 items-center p-5 rounded-lg border" style={{ borderColor: virtualMachineStyles.borderColor }}>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-semibold whitespace-nowrap" style={{ color: virtualMachineStyles.cardText }}>Standard 4</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>8</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>cores</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>16</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>GiB</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>320</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>GiB</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>6</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>TiB</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>
                      <span className="text-xs font-normal" style={{ color: virtualMachineStyles.cardTextGray }}>$</span>0.073
                    </p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>/hr</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>
                      <span className="text-xs font-normal" style={{ color: virtualMachineStyles.cardTextGray }}>$</span>52.90
                    </p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>/mo</p>
                  </div>
                  <div className="text-left flex-shrink-0">
                    <button className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:opacity-80 flex-shrink-0" style={{ backgroundColor: virtualMachineStyles.cardButtonBg }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke={virtualMachineStyles.cardButtonText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* CPU-optimized 1 - Row 5 (with background) */}
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 items-center p-5 rounded-lg border" style={{ backgroundColor: virtualMachineStyles.tableRowBg, borderColor: virtualMachineStyles.borderColor }}>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-semibold whitespace-nowrap" style={{ color: virtualMachineStyles.cardText }}>CPU-optimized 1</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>2</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>cores</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>2</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>GiB</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>25</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>GiB</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>4</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>TiB</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>
                      <span className="text-xs font-normal" style={{ color: virtualMachineStyles.cardTextGray }}>$</span>0.011
                    </p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>/hr</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>
                      <span className="text-xs font-normal" style={{ color: virtualMachineStyles.cardTextGray }}>$</span>7.91
                    </p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>/mo</p>
                  </div>
                  <div className="text-left flex-shrink-0">
                    <button className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:opacity-80 flex-shrink-0" style={{ backgroundColor: virtualMachineStyles.cardButtonBg }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke={virtualMachineStyles.cardButtonText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* CPU-optimized 2 - Row 6 (no background) */}
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 items-center p-5 rounded-lg border" style={{ borderColor: virtualMachineStyles.borderColor }}>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-semibold whitespace-nowrap" style={{ color: virtualMachineStyles.cardText }}>CPU-optimized 2</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>4</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>cores</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>4</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>GiB</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>60</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>GiB</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>5</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>TiB</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>
                      <span className="text-xs font-normal" style={{ color: virtualMachineStyles.cardTextGray }}>$</span>0.022
                    </p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>/hr</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>
                      <span className="text-xs font-normal" style={{ color: virtualMachineStyles.cardTextGray }}>$</span>15.89
                    </p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>/mo</p>
                  </div>
                  <div className="text-left flex-shrink-0">
                    <button className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:opacity-80 flex-shrink-0" style={{ backgroundColor: virtualMachineStyles.cardButtonBg }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke={virtualMachineStyles.cardButtonText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* CPU-optimized 3 - Row 7 (with background) */}
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 items-center p-5 rounded-lg border" style={{ backgroundColor: virtualMachineStyles.tableRowBg, borderColor: virtualMachineStyles.borderColor }}>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-semibold whitespace-nowrap" style={{ color: virtualMachineStyles.cardText }}>CPU-optimized 3</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>8</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>cores</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>8</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>GiB</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>100</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>GiB</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>6</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>TiB</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>
                      <span className="text-xs font-normal" style={{ color: virtualMachineStyles.cardTextGray }}>$</span>0.043
                    </p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>/hr</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>
                      <span className="text-xs font-normal" style={{ color: virtualMachineStyles.cardTextGray }}>$</span>30.90
                    </p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>/mo</p>
                  </div>
                  <div className="text-left flex-shrink-0">
                    <button className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:opacity-80 flex-shrink-0" style={{ backgroundColor: virtualMachineStyles.cardButtonBg }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke={virtualMachineStyles.cardButtonText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Memory-optimized 1 - Row 8 (no background) */}
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 items-center p-5 rounded-lg border" style={{ borderColor: virtualMachineStyles.borderColor }}>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-semibold whitespace-nowrap" style={{ color: virtualMachineStyles.cardText }}>Memory-optimized 1</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>2</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>cores</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>8</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>GiB</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>50</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>GiB</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>4</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>TiB</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>
                      <span className="text-xs font-normal" style={{ color: virtualMachineStyles.cardTextGray }}>$</span>0.032
                    </p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>/hr</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>
                      <span className="text-xs font-normal" style={{ color: virtualMachineStyles.cardTextGray }}>$</span>22.89
                    </p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>/mo</p>
                  </div>
                  <div className="text-left flex-shrink-0">
                    <button className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:opacity-80 flex-shrink-0" style={{ backgroundColor: virtualMachineStyles.cardButtonBg }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke={virtualMachineStyles.cardButtonText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Memory-optimized 2 - Row 9 (with background) */}
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 items-center p-5 rounded-lg border" style={{ backgroundColor: virtualMachineStyles.tableRowBg, borderColor: virtualMachineStyles.borderColor }}>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-semibold whitespace-nowrap" style={{ color: virtualMachineStyles.cardText }}>Memory-optimized 2</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>4</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>cores</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>16</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>GiB</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>100</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>GiB</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>6</p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>TiB</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>
                      <span className="text-xs font-normal" style={{ color: virtualMachineStyles.cardTextGray }}>$</span>0.062
                    </p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>/hr</p>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: virtualMachineStyles.cardText }}>
                      <span className="text-xs font-normal" style={{ color: virtualMachineStyles.cardTextGray }}>$</span>44.89
                    </p>
                    <p className="text-xs" style={{ color: virtualMachineStyles.cardTextGray }}>/mo</p>
                  </div>
                  <div className="text-left flex-shrink-0">
                    <button className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:opacity-80 flex-shrink-0" style={{ backgroundColor: virtualMachineStyles.cardButtonBg }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke={virtualMachineStyles.cardButtonText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Configure;

