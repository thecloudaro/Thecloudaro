"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ContentDescription from "@/components/ui/content-description";

const Free = () => {
  const features = [
    {
      id: "1",
      icon: "/Migrate/Free.png",
      title: "Free 'n' easy",
      description: "Get everything moved over — no fees,<br/>no fuss.",
    },
    {
      id: "2",
      icon: "/Migrate/Auto.png",
      title: "Auto-switch",
      description: "Enjoy a set-and-go experience without stress or mess.",
    },
    {
      id: "3",
      icon: "/Migrate/Always.png",
      title: "Always live",
      description: "Keep your visitors happy with zero downtime.",
    },
  ];

  return (
    <div 
      className="w-full py-8 sm:py-10 md:py-12 lg:py-14"
      style={{ backgroundColor: '#17181a' }}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 sm:gap-20 md:gap-24 lg:gap-28 xl:gap-40">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="mb-4 w-15 h-15 sm:w-16 sm:h-16 md:w-20 md:h-20 relative">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  fill
                  className="object-contain"
                  priority={index < 3}
                  unoptimized
                />
              </div>

              {/* Title */}
              <ContentDescription
                text={feature.title}
                size="md"
                className="!text-base sm:!text-lg md:!text-xl !text-white font-semibold mb-2"
              />

              {/* Description */}
              <ContentDescription
                text={feature.description}
                size="sm"
                className="!text-sm sm:!text-base !text-gray-400"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Free;

