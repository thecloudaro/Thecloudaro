"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ContentHeading from "@/components/ui/content-heading";

const BuiltIn = () => {
  return (
    <section 
      className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-security-builtin"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <ContentHeading
            title="Built-in security<br/>everywhere"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-security-builtin-heading"
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-10 sm:mt-12 md:mt-16 mx-auto w-full max-w-5xl"
          >
            <div className="relative w-full min-h-[200px] sm:min-h-[260px] md:min-h-[300px]">
              <Image
                src="/Security/Security.png"
                alt="Built-in security — secure browsing and encrypted data"
                fill
                className="object-contain object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 90vw, 1024px"
                priority={false}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BuiltIn;

