"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Lock, User, Key, ArrowRight } from "lucide-react";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const Safeguarded = () => {
  const features = [
    {
      icon: Lock,
      title: "DNSSEC authentication",
      description: "You get an extra layer of security for your<br/>DNS, ensuring fraudulent sites can't<br/>pretend to be you."
    },
    {
      icon: Shield,
      title: "DNS DDoS prevention",
      description: "Filters out malicious traffic when<br/>attackers try to flood your site, keeping<br/>the DNS working."
    },
    {
      icon: User,
      title: "Free domain privacy",
      description: "Your registration info will be kept private<br/>and won't go up on WHOIS, a public<br/>directory of domain owners."
    },
    {
      icon: Key,
      title: "Free SSL-protected redirects",
      description: "Your custom URL redirects are SSL-<br/>protected for enhanced security and data<br/>integrity."
    }
  ];

  return (
    <section 
      className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
      style={{ backgroundColor: 'rgb(var(--security-safeguarded-bg))' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <ContentHeading
            title="Safeguarded domains"
            className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl !text-[rgb(var(--security-safeguarded-heading-text))]"
          />
          <ContentDescription
            text="Your domain is the centerpiece of your digital life, and we've<br/>got what you need to keep it attack proof."
            size="lg"
            className="!text-[rgb(var(--security-safeguarded-description-text))]"
          />
        </motion.div>

        {/* Feature Cards - 4 cards in 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-6 sm:gap-y-8 md:gap-y-10 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              {/* Card - Only contains icon with animations */}
              <div
                className="relative rounded-lg p-6 sm:p-7 md:p-8 overflow-hidden mb-4 sm:mb-5"
                style={{ 
                  backgroundColor: 'rgb(var(--security-safeguarded-card-bg))',
                  width: '100%',
                  minHeight: '220px',
                  maxWidth: '380px'
                }}
              >
                {/* Background Pattern with Animation */}
                <motion.div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(var(--security-safeguarded-card-pattern)) 1px, transparent 0)`,
                    backgroundSize: '20px 20px'
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'linear'
                  }}
                />

                {/* Animated Pulsing Circles - Behind icon */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-28 h-28 rounded-full"
                  style={{
                    backgroundColor: 'rgba(var(--security-safeguarded-icon-glow))',
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.15, 0.25, 0.15],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
                <motion.div
                  className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full"
                  style={{
                    backgroundColor: 'rgba(var(--security-safeguarded-icon-glow))',
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5
                  }}
                />

                {/* Icon with Glow Animation */}
                <div className="relative z-10 flex justify-center items-center h-full">
                  <motion.div 
                    className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full"
                    style={{
                      backgroundColor: 'rgba(var(--security-safeguarded-icon-glow))',
                    }}
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(var(--security-safeguarded-icon-glow))',
                        '0 0 35px rgba(var(--security-safeguarded-icon-glow))',
                        '0 0 20px rgba(var(--security-safeguarded-icon-glow))'
                      ],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    <feature.icon 
                      className="w-8 h-8 sm:w-9 sm:h-9"
                      style={{ color: 'rgb(var(--security-safeguarded-icon-green))' }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Title - Outside card, bottom */}
              <h3 
                className="text-base sm:text-lg md:text-2xl font-bold mb-2 sm:mb-3"
                style={{ color: 'rgb(var(--security-safeguarded-card-title-text))' }}
              >
                {feature.title}
              </h3>

              {/* Description - Outside card, bottom */}
              <p 
                className="text-xs sm:text-sm md:text-lg leading-relaxed"
                style={{ color: 'rgb(var(--security-safeguarded-card-description-text))' }}
              >
                {feature.description.split(/<br\s*\/?>/i).map((line, index, arr) => (
                  <React.Fragment key={index}>
                    {line}
                    {index !== arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 sm:mt-16 md:mt-20"
        >
          <Link
            href="/domain"
            className="inline-flex items-center gap-2 text-base sm:text-lg md:text-md font-medium hover:gap-3 transition-all duration-300"
            style={{ color: 'rgb(var(--security-safeguarded-link-blue))' }}
          >
            Register your secure domain
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Safeguarded;

