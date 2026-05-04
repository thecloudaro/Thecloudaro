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
        <Heading title="Let your domain <br/>
        lead the way" />
      </div>

      <div className="lg:w-1/2 lg:pl-8">
        <Paragraph text="Next, choose what you need to bring your website to your customers, and add more as you grow." />
      </div>
    </motion.div>
  );
};

export default HeaderSection;
