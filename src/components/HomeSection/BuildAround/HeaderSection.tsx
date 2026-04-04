"use client";

import { motion } from "framer-motion";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import { useRevealOnceInView } from "@/hooks/useRevealOnceInView";

const HeaderSection = () => {
  const { ref, revealed } = useRevealOnceInView();

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-12 sm:mb-16 md:mb-20 gap-6 sm:gap-8"
    >
      <div className="lg:w-1/2">
        <Heading title="Build around <br/>
        your domain" />
      </div>

      <div className="lg:w-1/2 lg:pl-8">
        <Paragraph text="Choose and connect exactly what<br/>you need to take your domain and<br/>website to the world." />
      </div>
    </motion.div>
  );
};

export default HeaderSection;
