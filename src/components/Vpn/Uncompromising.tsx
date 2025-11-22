"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const Uncompromising = () => {
  const features = [
    {
      icon: "/vpn/WorldClass.svg",
      title: "World-class encryption",
      description: "Protect your data with robust encryption<br/>trusted by security experts worldwide."
    },
    {
      icon: "/vpn/ZeroLog.svg",
      title: "Zero-log policy",
      description: "Browse with confidence, knowing we never<br/>store or monitor your online activity."
    },
    {
      icon: "/vpn/KillSwitch.svg",
      title: "Kill Switch protection",
      description: "Stay secure, even if your VPN<br/>connection drops unexpectedly."
    },
    {
      icon: "/vpn/DNS.svg",
      title: "DNS leak prevention",
      description: "Keep your browsing history and identity<br/>hidden from prying eyes."
    }
  ];

  return (
    <section
      className="relative w-full py-12 sm:py-16"
      style={{ backgroundColor: 'rgb(var(--vpn-section-bg))' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center space-y-4 sm:space-y-5 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <ContentHeading
              title="Uncompromising security"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight mx-auto text-white mb-3 sm:mb-4"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <ContentDescription
              text="Secure your online world with FastVPN's advanced protection, designed for your safety."
              size="lg"
              className="text-white/80"
            />
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 + index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-5">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 64px, 80px"
                />
              </div>

              {/* Title */}
              <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <ContentDescription
                size="md"
                className="text-white/70"
              >
                {feature.description.split(/<br\s*\/?>/i).map((line, index, arr) => (
                  <React.Fragment key={index}>
                    {line}
                    {index !== arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </ContentDescription>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Uncompromising;

