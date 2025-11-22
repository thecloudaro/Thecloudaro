"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const Accelerate = () => {
  return (
    <section 
      className="flex items-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24"
      style={{ backgroundColor: 'rgb(var(--cdn-section-bg))' }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16 lg:ml-8 xl:ml-24">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-3/5 flex items-center justify-center"
          >
            <div className="relative w-full min-w-[380px] h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[650px]">
              <Image
                src="/cdn/Accelerate.svg"
                alt="Accelerate your site"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-4/5 flex flex-col justify-center items-center lg:items-start text-center lg:text-left lg:pl-8"
          >
            <ContentHeading 
              title="Accelerate your site"
              className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl"
            />
            <ContentDescription 
              size="lg"
              className="max-w-5xl text-white"
            >
              Storing content across a global CDN instead of one
              <br />
              hosting server speeds delivery and protects
              <br />
              against traffic surges.
            </ContentDescription>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Accelerate;

