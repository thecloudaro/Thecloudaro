"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import { ArrowDown, Gauge, Shield } from "lucide-react";

const TransferHeroFeatures = () => {
  const features = [
    {
      icon: ArrowDown,
      title: "Simple",
      description: "Transfer hassle-free with simplicity at every stage."
    },
    {
      icon: Gauge,
      title: "Swift",
      description: "Save time with automatic steps and minimal input."
    },
    {
      icon: Shield,
      title: "Secure",
      description: "Keep details safe with top-tier security on all transfers."
    }
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-transfer-hero-features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Heading and Description */}
        <div className="mb-20 sm:mb-24 md:mb-28 lg:mb-32">
          <SectionHeading
            heading="Effortless domain name transfer"
            description="Easy, fast, and safe transfers with free privacy protection."
            headingTag="h2"
            headingClassName="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-center text-transfer-hero-features-heading"
            descriptionClassName="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-center text-transfer-hero-features-description"
          />
        </div>

        {/* Three Feature Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                {/* Teal-green glowing 3D-style circular icon */}
                <div className="relative mb-6 flex justify-center">
                  <div className="relative">
                    {/* Glow effect */}
                    <div
                      className="absolute inset-0 rounded-full blur-xl opacity-60"
                      style={{
                        background: 'radial-gradient(circle, hsl(var(--gradient-teal)) 0%, transparent 70%)',
                        transform: 'scale(1.2)'
                      }}
                    />
                    {/* Main icon container with gradient */}
                    <div
                      className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--gradient-teal)) 0%, hsl(var(--gradient-dark-teal)) 100%)',
                        boxShadow: '0 0 30px hsl(var(--gradient-teal) / 0.5), inset 0 0 20px hsl(var(--gradient-teal) / 0.3)'
                      }}
                    >
                      <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-transfer-hero-features-icon" />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-transfer-hero-features-title">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-base sm:text-lg leading-relaxed text-transfer-hero-features-description">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TransferHeroFeatures;

