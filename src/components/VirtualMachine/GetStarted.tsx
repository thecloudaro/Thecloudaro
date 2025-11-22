'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ContentHeading from '@/components/ui/content-heading';
import ContentDescription from '@/components/ui/content-description';
import { virtualMachineStyles } from '@/lib/virtualMachineUtils';

const GetStarted = () => {
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
    <section className="relative overflow-hidden">
      {/* Background Image Section - Half Page */}
      <div className="relative min-h-[60vh] flex items-center pb-32 sm:pb-40 lg:pb-48">
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image
            src="/VirtualMachine/GetStartedBg.jpeg"
            alt="Background"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 w-full">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl text-center space-y-6"
          >
            {/* Starlight Text */}
            <div className="flex items-center justify-center mb-4">
              <span 
                className="text-3xl font-normal"
                style={{ color: virtualMachineStyles.textDeepGray }}
              >
                starlight
              </span>
            </div>

            <div className="flex justify-center w-full">
              <ContentHeading
                title="Get started with your Virtual Machine"
                className="text-center !text-[2.5rem] sm:!text-[3.35rem] md:!text-[4.05rem] lg:!text-[4.5rem] font-bold leading-[1.08] !text-[rgb(var(--virtual-machine-text-deep-gray))] whitespace-nowrap"
              />
            </div>

            <ContentDescription
              size="xl"
              className="max-w-4xl mx-auto text-center text-lg sm:text-xl"
            >
              <span style={{ color: virtualMachineStyles.textGray }}>
                First choose your virtual private server configuration.
              </span>
            </ContentDescription>

            {/* Billing Options */}
            <div 
              className="inline-flex flex-wrap items-center justify-center gap-3 mt-8 px-4 py-2 rounded-full"
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
        </div>
      </div>

      {/* Pricing Cards Section - Half on background, half on page */}
      <div className="relative -mt-8 sm:-mt-12 lg:-mt-16 pb-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-5xl mx-auto">
              {/* Standard Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="rounded-md p-8 min-h-[450px] flex flex-col"
                style={{ backgroundColor: virtualMachineStyles.cardBg }}
              >
                <h3 className="text-xl font-bold mb-4 text-center" style={{ color: virtualMachineStyles.cardText }}>
                  Standard
                </h3>
                <p className="text-sm mb-6 leading-relaxed flex-grow text-center" style={{ color: virtualMachineStyles.cardTextGray }}>
                  Small to medium-sized websites, blogs, or projects. Development and testing environments, and applications with balanced CPU and memory usage.
                </p>
                <div className="mb-6 text-center">
                  <p className="text-sm mb-1.5" style={{ color: virtualMachineStyles.cardTextGray }}>
                    Starts from:
                  </p>
                  <p className="text-lg font-bold mb-1.5" style={{ color: virtualMachineStyles.cardText }}>
                    <span className="text-base font-normal">$</span><span className="text-2xl">0</span>.007/hr
                  </p>
                  <p className="text-sm" style={{ color: virtualMachineStyles.cardTextGray }}>
                    Estimated:
                  </p>
                  <p className="text-lg font-bold" style={{ color: virtualMachineStyles.cardText }}>
                    <span className="text-base font-normal">$</span>4.90/mo
                  </p>
                </div>
                <div className="border-t pt-4 mt-auto" style={{ borderColor: virtualMachineStyles.borderColor }}>
                  <button
                    className="w-full rounded-full px-4 py-2.5 text-xs font-medium transition-all duration-200"
                    style={{
                      backgroundColor: virtualMachineStyles.cardButtonBg,
                      color: virtualMachineStyles.cardButtonText,
                    }}
                  >
                    Configure virtual server
                  </button>
                </div>
              </motion.div>

              {/* CPU-optimized Card - Positioned higher */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="rounded-md p-8 min-h-[480px] flex flex-col relative -mt-8 sm:-mt-12 lg:-mt-16"
                style={{ backgroundColor: virtualMachineStyles.cardBg }}
              >
                <span
                  className="text-xs font-semibold mb-1 text-center"
                  style={{
                    color: virtualMachineStyles.popularBadgeText,
                  }}
                >
                  MOST POPULAR
                </span>
                <h3 className="text-xl font-bold mb-4 mt-1 text-center" style={{ color: virtualMachineStyles.cardText }}>
                  CPU-optimized
                </h3>
                <p className="text-sm mb-6 leading-relaxed flex-grow text-center" style={{ color: virtualMachineStyles.cardTextGray }}>
                  For making more of your CPU: Media streaming, gaming servers, real-time data analytics, and hosting VPN servers.
                </p>
                <div className="mb-6 text-center">
                  <p className="text-sm mb-1.5" style={{ color: virtualMachineStyles.cardTextGray }}>
                    Starts from:
                  </p>
                  <p className="text-lg font-bold mb-1.5" style={{ color: virtualMachineStyles.cardText }}>
                    <span className="text-base font-normal">$</span><span className="text-2xl">0</span>.011/hr
                  </p>
                  <p className="text-sm" style={{ color: virtualMachineStyles.cardTextGray }}>
                    Estimated:
                  </p>
                  <p className="text-lg font-bold" style={{ color: virtualMachineStyles.cardText }}>
                    <span className="text-base font-normal">$</span>7.91/mo
                  </p>
                </div>
                <div className="border-t pt-4 mt-auto" style={{ borderColor: virtualMachineStyles.borderColor }}>
                  <button
                    className="w-full rounded-full px-4 py-2.5 text-xs font-medium transition-all duration-200"
                    style={{
                      backgroundColor: virtualMachineStyles.cardButtonBg,
                      color: virtualMachineStyles.cardButtonText,
                    }}
                  >
                    Configure virtual server
                  </button>
                </div>
              </motion.div>

              {/* Memory-optimized Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="rounded-md p-8 min-h-[450px] flex flex-col"
                style={{ backgroundColor: virtualMachineStyles.cardBg }}
              >
                <h3 className="text-xl font-bold mb-4 text-center" style={{ color: virtualMachineStyles.cardText }}>
                  Memory-optimized
                </h3>
                <p className="text-sm mb-6 leading-relaxed flex-grow text-center" style={{ color: virtualMachineStyles.cardTextGray }}>
                  For making more of your RAM: High-performance databases, processing large datasets, and in-memory caches.
                </p>
                <div className="mb-6 text-center">
                  <p className="text-sm mb-1.5" style={{ color: virtualMachineStyles.cardTextGray }}>
                    Starts from:
                  </p>
                  <p className="text-lg font-bold mb-1.5" style={{ color: virtualMachineStyles.cardText }}>
                    <span className="text-base font-normal">$</span><span className="text-2xl">0</span>.032/hr
                  </p>
                  <p className="text-sm" style={{ color: virtualMachineStyles.cardTextGray }}>
                    Estimated:
                  </p>
                  <p className="text-lg font-bold" style={{ color: virtualMachineStyles.cardText }}>
                    <span className="text-base font-normal">$</span>22.89/mo
                  </p>
                </div>
                <div className="border-t pt-4 mt-auto" style={{ borderColor: virtualMachineStyles.borderColor }}>
                  <button
                    className="w-full rounded-full px-4 py-2.5 text-xs font-medium transition-all duration-200"
                    style={{
                      backgroundColor: virtualMachineStyles.cardButtonBg,
                      color: virtualMachineStyles.cardButtonText,
                    }}
                  >
                    Configure virtual server
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Check all configurations button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex justify-center mt-8"
            >
              <button
                className="px-6 py-3 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: virtualMachineStyles.cardBg,
                  color: virtualMachineStyles.cardText,
                }}
              >
                Check all configurations
              </button>
            </motion.div>
          </div>
        </div>
    </section>
  );
};

export default GetStarted;

