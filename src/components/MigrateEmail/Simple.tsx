"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { migrateEmailStyles } from "@/lib/migrateEmailUtils";

const Simple = () => {
  const features = [
    {
      icon: "/MigrationEmail/simple.svg",
      title: "Simple",
      description: "Move your emails in a few clicks using our bespoke email migration tool."
    },
    {
      icon: "/MigrationEmail/quick.svg",
      title: "Quick",
      description: "Save time compared to migrating your emails manually."
    },
    {
      icon: "/MigrationEmail/secure.svg",
      title: "Secure",
      description: "Your emails are protected throughout the transfer process."
    }
  ];

  return (
    <section className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-16 sm:pb-20 md:pb-24 lg:pb-24" style={{ backgroundColor: migrateEmailStyles.bg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        {/* Three Feature Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center"
            >
              {/* Icon */}
              <div className="relative mb-6 flex justify-center">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={96}
                    height={96}
                    className="w-full h-full object-contain"
                    priority
                    unoptimized
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: migrateEmailStyles.textWhite }}>
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: migrateEmailStyles.text85 }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Simple;

