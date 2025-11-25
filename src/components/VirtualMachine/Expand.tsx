'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ContentHeading from '@/components/ui/content-heading';
import ContentDescription from '@/components/ui/content-description';
import { virtualMachineStyles } from '@/lib/virtualMachineUtils';

const Expand = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: virtualMachineStyles.sectionBg }}>
      <div className="relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          {/* Top Heading Section - Centered */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 sm:mb-8"
            >
              <ContentHeading
                title="Expand your VM capabilities"
                className="text-center !text-[2.5rem] sm:!text-[3.35rem] md:!text-[4.05rem] lg:!text-[4rem] font-bold leading-[1.08] !text-[rgb(var(--virtual-machine-hero-text))]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <ContentDescription
                size="lg"
                className="max-w-5xl mx-auto text-center text-lg sm:text-xl"
              >
                <span style={{ color: virtualMachineStyles.heroText85 }}>
                  Get high-performance block storage that keeps your data portable, persistent, and cost-<br/> effective.
                </span>
              </ContentDescription>
            </motion.div>
          </div>

          {/* Bottom Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col"
            >
              <div className="mb-6 sm:mb-8">
                <ContentHeading
                  title="Flexible block storage, built for your VMs"
                  className="!text-[2rem] sm:!text-[2.5rem] md:!text-[3rem] lg:!text-[3rem] font-bold leading-[1.2] !text-[rgb(var(--virtual-machine-hero-text))]"
                />
              </div>
              <div className="mb-6 sm:mb-8">
                <ContentDescription
                  size="lg"
                  className="text-lg sm:text-xl"
                >
                  <span style={{ color: virtualMachineStyles.heroText85 }}>
                    Extend your VM capacity with reliable cloud block storage. Choose the size you need, attach or detach between PAYG or prepaid VMs, and resize as your workloads grow.
                  </span>
                </ContentDescription>
              </div>
              <div className="inline-flex items-center">
                <a
                  href="#"
                  className="transition-all text-lg sm:text-xl font-medium no-underline hover:underline"
                  style={{ 
                    color: virtualMachineStyles.linkBlue,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = 'underline';
                    e.currentTarget.style.textDecorationColor = virtualMachineStyles.linkBlue;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = 'none';
                  }}
                >
                  Get Volumes
                </a>
                <span className="ml-2 text-lg sm:text-xl" style={{ color: virtualMachineStyles.linkBlue }}>
                  →
                </span>
              </div>
            </motion.div>

            {/* Right Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative w-full h-[280px] sm:h-[350px] lg:h-[420px] xl:h-[500px]"
            >
              <Image
                src="/VirtualMachine/FlexibleBlock.svg"
                alt="Expand your VM capabilities"
                fill
                className="object-contain object-center"
                priority
                quality={90}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expand;

