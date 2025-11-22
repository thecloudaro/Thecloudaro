"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const Pushing = () => {
  return (
    <section
      className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden bg-customer-bg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Side - Abstract Graphic */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px] flex items-center justify-center order-2 lg:order-1"
          >
            <div className="relative w-full h-full">
              <Image
                src="/about/Pushing.svg"
                alt="Pushing what's possible"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col justify-center items-start text-left order-1 lg:order-2"
          >
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="mb-4 sm:mb-6"
            >
              <ContentHeading
                title="Pushing what's<br/>possible"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl text-white font-bold leading-tight tracking-tight text-left"
              />
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="max-w-2xl"
            >
              <ContentDescription
                text="We're here to take digital technology further, and then<br/>
                put it in your hands. Everyone should have the<br/>
                freedom to get their vision online. That doesn't mean<br/>
                we use 'the latest innovations'. It means we build<br/>
                innovation from scratch! From behind the scenes and<br/>
                onto your screens, we go further so you go further."
                size="md"
                className="text-white/90 text-left"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pushing;

