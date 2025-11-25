"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserCheck, ShieldCheck, KeyRound, MessageSquare } from "lucide-react";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const Protected = () => {
  const features = [
    {
      icon: UserCheck,
      title: "Suspicious login monitoring",
      description: "You will get a verification email when there's a potentially suspicious login, like from a new device."
    },
    {
      icon: ShieldCheck,
      title: "Two-factor authentication",
      description: "Two forms of verification are required at every login, adding another layer of account protection."
    },
    {
      icon: KeyRound,
      title: "Bye-bye passwords",
      description: "No more forgetting complicated passwords. Logging in is easier and safer than ever with Passkeys."
    },
    {
      icon: MessageSquare,
      title: "Social engineering prevention",
      description: "Limited front-line Customer Support access to your private info and product settings protects everyone."
    }
  ];

  return (
    <section 
      className="relative min-h-[80vh] sm:min-h-screen overflow-hidden flex flex-col"
    >
      {/* Top 60% - Gradient Background */}
      <div 
        className="relative"
        style={{ 
          minHeight: '50vh',
          height: 'auto',
          background: 'linear-gradient(to bottom, transparent, rgba(var(--security-protected-gradient-green)))'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-8 sm:pb-12 h-full flex items-start">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 sm:mb-20 md:mb-24 lg:mb-32 w-full"
          >
            <ContentHeading
              title="Protected accounts"
              className="mb-8 sm:mb-10 md:mb-12 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl !text-[rgb(var(--security-protected-heading-text))]"
            />
            <ContentDescription
              text="Strong security features ensure your account stays protected<br/>at all times."
              size="lg"
              className="mb-8 sm:mb-10 md:mb-12 !text-[rgb(var(--security-protected-description-text))]"
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom 40% - Solid Background with Cards */}
      <div 
        className="relative"
        style={{ 
          minHeight: 'auto',
          backgroundColor: 'rgb(var(--security-protected-bg))'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-12 sm:pb-16 md:pb-20 -mt-12 sm:-mt-16 md:-mt-20 lg:-mt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 sm:gap-y-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                {/* Card - Smaller size */}
                <div
                  className="relative rounded-lg p-3 sm:p-4 md:p-5 overflow-hidden w-full max-w-md mx-auto flex flex-col"
                  style={{ 
                    backgroundColor: 'rgb(var(--security-protected-card-bg))',
                    height: '220px',
                    width: '100%'
                  }}
                >
                  {/* Icon - Smaller */}
                  <div className="flex justify-center mb-2 sm:mb-3">
                    <feature.icon 
                      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
                      style={{ color: 'rgb(var(--security-protected-icon-color))' }}
                    />
                  </div>

                  {/* Title - Smaller */}
                  <h3 
                    className="text-sm sm:text-base md:text-lg font-bold mb-2"
                    style={{ color: 'rgb(var(--security-protected-card-title-text))' }}
                  >
                    {feature.title}
                  </h3>

                  {/* Description - Smaller */}
                  <p 
                    className="text-xs sm:text-sm leading-relaxed flex-1 overflow-hidden"
                    style={{ color: 'rgb(var(--security-protected-card-description-text))' }}
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Button - Below cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12 sm:mt-16 md:mt-20"
          >
            <button
              className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full font-medium text-xs sm:text-xs md:text-sm transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: 'rgb(var(--security-protected-button-bg))',
                color: 'rgb(var(--security-protected-button-text))'
              }}
            >
              Open your secure account
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Protected;

