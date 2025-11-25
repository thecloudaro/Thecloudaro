'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ContentHeading from '@/components/ui/content-heading';
import ContentDescription from '@/components/ui/content-description';
import { virtualMachineStyles } from '@/lib/virtualMachineUtils';

const TakeEffortless = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: virtualMachineStyles.sectionBg }}>
      <div className="relative z-10 flex min-h-[65vh] flex-col">
        <div className="flex flex-1 items-start">
          <div className="mx-auto flex w-full max-w-7xl flex-col px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-12 sm:pt-16 md:pt-20 lg:flex-row lg:items-center lg:gap-16 lg:pt-24">
            {/* Left Side - Image */}
            <div className="flex-1 relative w-full lg:w-auto h-[350px] sm:h-[450px] lg:h-[520px] xl:h-[620px]">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full h-full"
              >
                <Image
                  src="/VirtualMachine/Take.svg"
                  alt="Take Effortless Control"
                  fill
                  className="object-contain object-center"
                  priority
                  quality={90}
                />
              </motion.div>
            </div>

            {/* Right Side - Text Content */}
            <div className="max-w-3xl space-y-4 lg:max-w-2xl mt-8 sm:mt-12 md:mt-16">
              <ContentHeading
                title="Take effortless<br/>control"
                className="text-left !text-[2.5rem] sm:!text-[3.35rem] md:!text-[4.05rem] lg:!text-[3.5rem] font-bold leading-[1.08] !text-[rgb(var(--virtual-machine-hero-text))]"
              />

              <ContentDescription
                size="lg"
                className="max-w-2xl text-left text-lg sm:text-xl"
              >
                <span style={{ color: virtualMachineStyles.heroText85 }}>
                  Stay on top of all your web applications<br/>with Starlight™, which brings easier<br/>management.
                </span>
              </ContentDescription>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TakeEffortless;

