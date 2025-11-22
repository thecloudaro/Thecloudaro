"use client";

import React from "react";
import { motion } from "framer-motion";
import ContentHeading from "@/components/ui/content-heading";

const BuiltIn = () => {
  return (
    <section 
      className="py-24 sm:py-32 md:py-40 lg:py-48 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24"
      style={{ backgroundColor: 'rgb(var(--security-builtin-bg))' }}
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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl !text-[rgb(var(--security-builtin-heading-text))]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default BuiltIn;

