"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Link2, ArrowRight } from "lucide-react";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const WebHostingSecurity = () => {
  const features = [
    {
      title: "Free SSL certificate",
      description: "Encrypts the connection between user browsers and your site's server, shielding the private data."
    },
    {
      title: "Virus and malware monitoring",
      description: "Real-time servers continually scan your site's server for malicious activity to stop it in its tracks."
    },
    {
      title: "Firewall protection",
      description: "Strict firewall rules track and control incoming and outgoing site traffic, preventing cyber attacks."
    }
  ];

  return (
    <section 
      className="pt-4 sm:pt-6 md:pt-8 lg:pt-10 pb-16 sm:pb-24 md:pb-32 lg:pb-40 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-security-webhosting"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-full h-[600px] sm:h-[700px] md:h-[800px]">
              <Image
                src="https://spaceship-cdn.com/security-ui/assets/shared-hosting-dark.f1375bcd72e714d50740.svg"
                alt="Web Hosting Security"
                fill
                className="object-contain scale-125 sm:scale-150 md:scale-[1.75] lg:scale-[2]"
              />
            </div>
          </motion.div>

          {/* Right Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Tagline with Icon */}
            <div className="flex items-center gap-2">
              <Link2 
                className="w-5 h-5 text-security-webhosting-tagline" 
              />
              <span 
                className="text-sm sm:text-base font-medium uppercase tracking-wide text-security-webhosting-tagline"
              >
                WEB HOSTING
              </span>
            </div>

            {/* Main Heading */}
            <ContentHeading
              title="Web Hosting"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-security-webhosting-heading text-left"
            />

            {/* Main Description */}
            <ContentDescription
              text="Fast, stable, and scalable with powerful protection included."
              className="text-base sm:text-lg md:text-xl text-security-webhosting-description text-left max-w-2xl"
            />

            {/* Feature List */}
            <div className="space-y-6 sm:space-y-8 pt-4">
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
                    className="text-lg sm:text-xl md:text-2xl font-bold text-security-webhosting-feature-title"
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="text-sm sm:text-base md:text-lg text-security-webhosting-feature-description"
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
                href="/web-hosting"
                className="inline-flex items-center gap-2 group font-medium text-base sm:text-lg text-security-webhosting-link"
              >
                <span>More about Web Hosting</span>
                <ArrowRight 
                  className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" 
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WebHostingSecurity;

