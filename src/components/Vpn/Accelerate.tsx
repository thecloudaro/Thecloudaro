"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Smartphone, 
  Globe, 
  Infinity, 
  Zap, 
  Network, 
  Shield 
} from "lucide-react";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const Accelerate = () => {
  const features = [
    {
      Icon: Smartphone,
      title: "Connects every device",
      description: "Safeguard your online world, no matter how many connections you have."
    },
    {
      Icon: Globe,
      title: "Unlock global content",
      description: "Watch Hollywood movies and live sports from anywhere, no matter where you are."
    },
    {
      Icon: Infinity,
      title: "Unlimited bandwidth",
      description: "Stream, download, and browse without data caps or speed limits."
    },
    {
      Icon: Zap,
      title: "Connect effortlessly",
      description: "Set up and manage your VPN seamlessly on any device with our user-friendly app."
    },
    {
      Icon: Network,
      title: "Optimized P2P servers",
      description: "Download and share files securely with our specialized P2P-friendly servers."
    },
    {
      Icon: Shield,
      title: "Protect your future",
      description: "Influence our development and shape our product for the better."
    }
  ];

  return (
    <section
      className="relative w-full pt-12 sm:pt-24 pb-12 sm:pb-16"
      style={{ backgroundColor: 'rgb(var(--vpn-section-bg))' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center space-y-4 sm:space-y-5 mb-16 sm:mb-20 md:mb-24 lg:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <ContentHeading
              title="Accelerate your online<br/>journey"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl leading-tight tracking-tight mx-auto text-white mb-3 sm:mb-4"
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
              size="lg"
              className="text-white/80"
            >
              {"Discover what makes FastVPN your ultimate digital<br/>companion.".split(/<br\s*\/?>/i).map((line, index, arr) => (
                <React.Fragment key={index}>
                  {line}
                  {index !== arr.length - 1 && <br />}
                </React.Fragment>
              ))}
            </ContentDescription>
          </motion.div>
        </div>

        {/* Features Grid - 2 rows, 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14 sm:gap-x-16 sm:gap-y-16 lg:gap-x-20 lg:gap-y-20 mb-12 sm:mb-16">
          {features.map(({ Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 + index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              {/* Icon */}
              <Icon 
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white mb-5 sm:mb-6" 
                strokeWidth={1.8} 
              />

              {/* Title */}
              <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4">
                {title}
              </h3>

              {/* Description */}
              <ContentDescription
                size="md"
                className="text-white/70"
              >
                {description}
              </ContentDescription>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          className="flex justify-center mt-8 sm:mt-10 md:mt-12"
        >
          <div className="relative w-full max-w-[200px] sm:max-w-[240px] h-10 sm:h-12 md:h-14 mt-24">
            <Image
              src="/vpn/VpnTrust.svg"
              alt="VPN Trust Initiative Member"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 200px, 240px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Accelerate;

