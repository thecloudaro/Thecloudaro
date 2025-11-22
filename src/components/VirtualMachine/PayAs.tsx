'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ContentHeading from '@/components/ui/content-heading';
import ContentDescription from '@/components/ui/content-description';
import { virtualMachineStyles } from '@/lib/virtualMachineUtils';
import Image from 'next/image';

const PayAs = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

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
                title="Pay-as-you-go billing"
                className="text-center !text-[2.5rem] sm:!text-[3.35rem] md:!text-[4.05rem] lg:!text-[3.5rem] font-bold leading-[1.08] !text-[rgb(var(--virtual-machine-hero-text))]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <ContentDescription
                size="lg"
                className="max-w-3xl mx-auto text-center text-lg sm:text-xl"
              >
                <span style={{ color: virtualMachineStyles.heroText85 }}>
                  Take control of all your payments with PAYG.
                </span>
              </ContentDescription>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative w-full h-[200px] sm:h-[250px] lg:h-[320px]"
            >
              <Image
                src="/VirtualMachine/Pay.svg"
                alt="Pay-as-you-go billing"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col"
            >
              <div className="mb-6 sm:mb-8">
                <ContentHeading
                  title="Bills for time used"
                  className="!text-[2rem] sm:!text-[2.5rem] md:!text-[3rem] lg:!text-[3rem] font-bold leading-[1.2] !text-[rgb(var(--virtual-machine-hero-text))]"
                />
              </div>
              <div>
                <ContentDescription
                  size="lg"
                  className="text-lg sm:text-xl"
                >
                  <span style={{ color: virtualMachineStyles.heroText85 }}>
                    Just pay for the time you use your VM.
                  </span>
                </ContentDescription>
              </div>
            </motion.div>
          </div>

          {/* Second Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mt-16 sm:mt-20 lg:mt-24">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col"
            >
              <div className="mb-6 sm:mb-8">
                <ContentHeading
                  title="Costs that stay low"
                  className="!text-[2rem] sm:!text-[2.5rem] md:!text-[3rem] lg:!text-[3rem] font-bold leading-[1.2] !text-[rgb(var(--virtual-machine-hero-text))]"
                />
              </div>
              <div>
                <ContentDescription
                  size="lg"
                  className="text-lg sm:text-xl"
                >
                  <span style={{ color: virtualMachineStyles.heroText85 }}>
                    Keep things simple with monthly post-paid bills.
                  </span>
                </ContentDescription>
              </div>
            </motion.div>

            {/* Right Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="relative w-full h-[200px] sm:h-[250px] lg:h-[320px]"
            >
              <Image
                src="/VirtualMachine/Costs.svg"
                alt="Costs that stay low"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PayAs;

