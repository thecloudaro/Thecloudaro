"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const YourPrivacy = () => {

  return (
    <section 
      className="relative min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] lg:min-h-[55vh] flex items-center overflow-hidden"
      style={{ backgroundColor: 'rgb(var(--vpn-section-bg))' }}
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-8 sm:py-10 md:py-12 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] flex items-center justify-center order-2 lg:order-1"
          >
            <div className="relative w-full h-full">
              <Image
                src="/vpn/YourPrivacy.png"
                alt="Your privacy, our priority"
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
            className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left order-1 lg:order-2"
          >
            <ContentHeading
              title="Your privacy, our<br/>priority"
              className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl text-white"
            />

            <ContentDescription
              size="lg"
              className="max-w-2xl text-white/80"
            >
              Enjoy complete online freedom, knowing
              <br />
              your data is secure.
            </ContentDescription>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default YourPrivacy;

