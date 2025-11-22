"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const Private = () => {
  return (
    <section 
      className="flex items-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24"
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
            <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
              <Image
                src="/DomainNamePrivacy/Private.svg"
                alt="Private Domain Privacy"
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
              title="Private, not public"
              className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
            />
            <ContentDescription 
              text="Your details stay off the WHOIS public directory, where every domain owner has their name, address, and contact info listed."
              size="md"
              className="max-w-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Private;

