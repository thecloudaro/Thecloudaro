"use client";

import { motion } from "framer-motion";
import ContentDescription from "@/components/ui/content-description";

const Primary = () => {
  return (
    <section 
      className="relative min-h-screen lg:min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden bg-customer-bg"
    >

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="flex flex-col text-center max-w-4xl mx-auto mt-16 sm:mt-20 md:mt-24 lg:mt-32">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 sm:mb-8"
          >
            <ContentDescription
              text="The Cloud Aro's primary mission is to redefine speed and simplicity so everyone, everywhere can do more, make more, and be more online."
              size="lg"
              className="text-2xl sm:text-2xl md:text-3xl lg:text-3xl text-[rgb(var(--about-text-white))] font-bold leading-tight text-center"
            />
          </motion.div>

          {/* First Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="mb-6 sm:mb-8"
          >
            <ContentDescription
              text="Why? Because it's people that really power the internet — your vision,<br/>
              ideas, and ambitions. You deserve an easier, faster, better way to get<br/>
              where you want to be online, no matter how close or far away it seems."
              size="md"
              className="text-[rgba(var(--about-text-white-90))] text-center"
            />
          </motion.div>

          {/* Closing Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <ContentDescription
              text="Welcome to (your) The Cloud Aro..."
              size="md"
              className="text-[rgba(var(--about-text-white-90))] text-center"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Primary;

