'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ContentHeading from '@/components/ui/content-heading';
import ContentDescription from '@/components/ui/content-description';
import { virtualMachineStyles, createHoverHandler } from '@/lib/virtualMachineUtils';

const VirtualHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const buttonHoverHandler = createHoverHandler({
    backgroundColor: virtualMachineStyles.buttonHoverBg,
  });

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: virtualMachineStyles.heroBg }}>
      <div className="relative z-10 flex min-h-[65vh] flex-col">
        <div className="flex flex-1 items-start">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 sm:gap-10 md:gap-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-12 sm:pt-16 md:pt-20 lg:flex-row lg:items-start lg:gap-16 lg:pt-24">
            {/* Left Side - Text Content */}
            <div className="max-w-3xl space-y-4 sm:space-y-6 lg:max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-[0.35em]" style={{ color: virtualMachineStyles.heroText70 }}>
                STARLIGHT™
              </span>

              <ContentHeading
                title="Next-gen Virtual Machines"
                className="text-left !text-[2.5rem] sm:!text-[3.35rem] md:!text-[4.05rem] lg:!text-[5rem] font-bold leading-[1.08] !text-[rgb(var(--virtual-machine-hero-text))]"
              />

              <ContentDescription
                size="lg"
                className="max-w-4xl text-left text-lg sm:text-xl"
              >
                <span style={{ color: virtualMachineStyles.heroText85 }}>
                  Select a virtual private server (VPS) with more power, flexibility, simplicity, and possibility.
                </span>
              </ContentDescription>

              <div className="mt-8">
                <button 
                  className="rounded-full px-6 py-2.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: virtualMachineStyles.buttonBg,
                    color: virtualMachineStyles.buttonText,
                  }}
                  {...buttonHoverHandler}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = virtualMachineStyles.buttonBg;
                  }}
                >
                  Find your VM
                </button>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="flex-1 relative w-full lg:w-auto h-[400px] sm:h-[500px] lg:h-[700px] xl:h-[800px] self-start -mt-8 lg:-mt-12">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full h-full"
              >
                <Image
                  src="/VirtualMachine/virtualHero.svg"
                  alt="Virtual Machine"
                  fill
                  className="object-contain object-top"
                  priority
                  quality={90}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualHero;

