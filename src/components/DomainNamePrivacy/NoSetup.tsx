"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const NoSetup = () => {
  return (
    <section 
      className="flex items-center py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24"
      style={{ backgroundColor: 'rgb(var(--domain-name-privacy-private-bg))' }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex items-center justify-center"
          >
            <div className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] lg:h-[550px]">
              <Image
                src="/DomainNamePrivacy/NoSetup.svg"
                alt="No Setup Needed"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col justify-center items-start text-left"
          >
            <ContentHeading 
              title="No setup needed"
              className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
            />
            <ContentDescription 
              text="Domain privacy is free for life with nearly all our domains, and simply gets added automatically when you register yours."
              size="md"
              className="max-w-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NoSetup;

