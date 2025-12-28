"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const SpacemailSecurity = () => {
  const features = [
    {
      title: "Powerful encryption",
      description: "Your email storage is encrypted so all messages are guarded from malicious third parties."
    },
    {
      title: "Jellyfish anti-spam",
      description: "Get total protection from spam, malware, and more with this smart, self-learning spam filtration service."
    },
    {
      title: "Password protected email",
      description: "Boost privacy by setting passwords for sensitive emails so only the intended recipient can open them."
    }
  ];

  return (
    <section 
      className="py-16 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-security-spacemail"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6 ml-4 sm:ml-6 md:ml-8 lg:ml-12"
          >
            {/* Tagline with Icon */}
            <div className="flex items-center gap-2">
              <Mail 
                className="w-5 h-5 text-security-spacemail-tagline" 
              />
              <span 
                className="text-sm sm:text-base font-medium uppercase tracking-wide text-security-spacemail-tagline"
              >
                Business Email
              </span>
            </div>

            {/* Main Heading */}
            <ContentHeading
              title="Business Email"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-security-spacemail-heading text-left"
            />

            {/* Main Description */}
            <ContentDescription
              text="Effortless professional email that keeps your communications safe."
              className="text-base sm:text-lg md:text-xl text-security-spacemail-description text-left max-w-2xl"
            />

            {/* Feature List */}
            <div className="space-y-4 sm:space-y-6 pt-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <h3 
                    className="text-lg sm:text-xl md:text-2xl font-bold text-security-spacemail-feature-title"
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="text-sm sm:text-base md:text-lg text-security-spacemail-feature-description"
                  >
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Call to Action Link */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4"
            >
              <Link
                href="/business-email"
                className="inline-flex items-center gap-2 group font-medium text-base sm:text-lg text-security-spacemail-link"
              >
                <span>More about Business Email</span>
                <ArrowRight 
                  className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" 
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full h-[600px] sm:h-[700px] md:h-[800px]">
              <Image
                src="https://thecloudaro-cdn.com/security-ui/assets/spacemail-dark.77ee62aa0ab75bf46e9f.svg"
                alt="Spacemail Security"
                fill
                className="object-contain scale-125 sm:scale-150 md:scale-[1.75] lg:scale-[2]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SpacemailSecurity;

