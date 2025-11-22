"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, CheckCircle } from "lucide-react";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const YourTrusted = () => {
  const features = [
    {
      Icon: MessageCircle,
      title: "Your voice matters",
      description: "Help shape our future by sharing your ideas and suggestions."
    },
    {
      Icon: CheckCircle,
      title: "30-day money-back guarantee",
      description: "Try FastVPN risk-free - trusted by users worldwide."
    }
  ];

  return (
    <section
      className="relative min-h-[50vh] md:min-h-[55vh] lg:min-h-[60vh] overflow-hidden"
    >
      {/* Top 60% - Gradient Background (Teal) */}
      <div
        className="absolute top-0 left-0 right-0 h-[60%]"
        style={{
          background: `linear-gradient(to bottom, rgba(var(--vpn-your-trusted-gradient-teal-1)) 0%, rgba(var(--vpn-your-trusted-gradient-teal-2)) 20%, rgba(var(--vpn-your-trusted-gradient-teal-3)) 40%, rgba(var(--vpn-your-trusted-gradient-teal-2)) 60%, rgba(var(--vpn-your-trusted-gradient-teal-1)) 80%, rgba(var(--vpn-your-trusted-gradient-teal-4)) 100%)`
        }}
      />

      {/* Bottom 40% - Solid Background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40%]"
        style={{ backgroundColor: 'rgb(var(--vpn-section-bg))' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-6 sm:py-8 md:py-10">
        <div className="flex flex-col items-center text-center">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-4 sm:mb-6 mt-12 sm:mt-16 md:mt-20 lg:mt-24"
          >
            <ContentHeading
              title="Your trusted online<br/>security app"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-3 sm:mb-4"
            />
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="mb-8 sm:mb-10 md:mb-12 max-w-3xl"
          >
            <ContentDescription
              text="Enjoy peace of mind knowing your online activities are secure."
              size="lg"
              className="text-white/80"
            />
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {features.map(({ Icon, title, description }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="rounded-lg px-6 sm:px-8 pt-6 sm:pt-8 pb-4 sm:pb-5 border"
                  style={{
                    backgroundColor: 'rgb(var(--vpn-your-trusted-card-bg))',
                    borderColor: 'rgb(var(--vpn-your-trusted-card-border))'
                  }}
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <Icon
                      className="w-8 h-8 sm:w-9 sm:h-9 text-white"
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3">
                    {title}
                  </h3>

                  {/* Description */}
                  <ContentDescription
                    size="sm"
                    className="text-white/70"
                  >
                    {description}
                  </ContentDescription>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            className="mt-8 sm:mt-10 md:mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300"
              style={{
                backgroundColor: 'rgb(var(--vpn-your-trusted-button-bg))',
                color: 'rgb(var(--vpn-your-trusted-button-text))'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(var(--vpn-your-trusted-button-hover))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(var(--vpn-your-trusted-button-bg))';
              }}
            >
              Get FastVPN today
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default YourTrusted;

