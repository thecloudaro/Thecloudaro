'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ContentHeading from '@/components/ui/content-heading';
import ContentDescription from '@/components/ui/content-description';
import { virtualMachineStyles } from '@/lib/virtualMachineUtils';

const PushYour = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: virtualMachineStyles.sectionBg }}>
      <div className="relative z-10 flex min-h-[65vh] flex-col">
        <div className="flex flex-1 items-start">
          <div className="mx-auto flex w-full max-w-7xl flex-col pl-0 sm:pl-0 lg:pl-0 pr-4 sm:pr-6 lg:pr-8 pt-16 sm:pt-20 lg:flex-row lg:items-center lg:gap-4 lg:pt-24">
            {/* Left Side - Text Content */}
            <div className="max-w-3xl space-y-4 lg:max-w-2xl pl-2 sm:pl-4 lg:pl-20 mt-16">
              <ContentHeading
                title="Push your<br/>possibilities"
                className="text-left !text-[2.5rem] sm:!text-[3.35rem] md:!text-[4.05rem] lg:!text-[3.5rem] font-bold leading-[1.08] !text-[rgb(var(--virtual-machine-hero-text))]"
              />

              <ContentDescription
                size="lg"
                className="max-w-2xl text-left text-lg sm:text-xl"
              >
                <span style={{ color: virtualMachineStyles.heroText85 }}>
                  Get the performance and scalability<br/> you need, exactly when you need it.
                </span>
              </ContentDescription>
            </div>

            {/* Right Side - Image */}
            <div className="flex-1 relative w-full lg:w-auto h-[350px] sm:h-[450px] lg:h-[520px] xl:h-[620px] pl-16">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full h-full"
              >
                <Image
                  src="/VirtualMachine/Push.svg"
                  alt="Push Your Possibilities"
                  fill
                  className="object-contain object-center"
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

export default PushYour;

