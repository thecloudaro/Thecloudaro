"use client";

import { useState } from "react";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const Freedom = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<"desktop" | "mobile" | "extension">("desktop");

  const platforms = [
    {
      id: "desktop" as const,
      name: "Desktop",
      description: "Safeguard your laptop with our robust security protocols<br/>and optimized speeds.",
      image: "/vpn/Desktop.png"
    },
    {
      id: "mobile" as const,
      name: "Mobile",
      description: "Protect your phone's security with our easy-to-use app.",
      image: "/vpn/Mobile.png"
    },
    {
      id: "extension" as const,
      name: "Extension",
      description: "Enjoy hassle-free protection and freedom.",
      image: "/vpn/Extension.png"
    }
  ];

  const currentPlatform = platforms.find(p => p.id === selectedPlatform) || platforms[0];

  return (
    <section
      className="relative w-full py-24"
      style={{ backgroundColor: 'rgb(var(--vpn-section-bg))' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-36">
        {/* Top Section - Heading and Description */}
        <div className="text-center space-y-8">
          <ContentHeading
            title="Freedom in your hands"
            className="text-5xl sm:text-[4.5rem] md:text-[6rem] xl:text-[4.5rem] leading-tight tracking-tight mx-auto text-white"
          />
          <ContentDescription
            text="Instantly secure your online world, no matter how you connect."
            size="xl"
            className="max-w-5xl mx-auto text-white/80"
          />
        </div>

        {/* Bottom Section - Platform Selection and Image */}
        <div className="grid gap-10 lg:gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-start">
          {/* Left Side - Platform Options */}
          <div className="flex items-start gap-8 mt-8">
            <div className="flex flex-col gap-3 pt-2 mt-40">
              {platforms.map((platform) => (
                <span
                  key={platform.id}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    selectedPlatform === platform.id ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>

            <div className="space-y-4 max-w-xl mt-4">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedPlatform === platform.id ? "opacity-100" : "opacity-50 hover:opacity-75"
                  }`}
                  onClick={() => setSelectedPlatform(platform.id)}
                >
                  <h3
                    className={`font-semibold leading-tight mb-2 transition-colors ${
                      selectedPlatform === platform.id 
                        ? "text-2xl text-white" 
                        : "text-xl text-gray-400"
                    }`}
                  >
                    {platform.name}
                  </h3>
                  {selectedPlatform === platform.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      <ContentDescription
                        size="sm"
                        className="text-white/70 leading-7"
                      >
                        {platform.description.split(/<br\s*\/?>/i).map((line, index, arr) => (
                          <React.Fragment key={index}>
                            {line}
                            {index !== arr.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </ContentDescription>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative w-full h-full">
            <div 
              className="w-full overflow-hidden border"
              style={{
                borderColor: 'rgb(var(--vpn-freedom-border))',
                backgroundColor: 'rgb(var(--vpn-freedom-image-bg))'
              }}
            >
              <motion.div
                key={selectedPlatform}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full"
              >
                <Image
                  src={currentPlatform.image}
                  alt={`${currentPlatform.name} VPN application`}
                  width={960}
                  height={720}
                  className="w-full h-auto"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Freedom;

