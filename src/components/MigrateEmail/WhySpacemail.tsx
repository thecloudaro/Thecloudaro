"use client";

import { motion } from "framer-motion";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import { Mail, Shield, Clock } from "lucide-react";
import { migrateEmailStyles } from "@/lib/migrateEmailUtils";

const WhySpacemail = () => {
  const features = [
    {
      icon: Mail,
      title: "Look professional",
      description: "Create yourname@yoursite.com so clients know you're the real deal."
    },
    {
      icon: Shield,
      title: "Feel confident",
      description: "Benefit from advanced security measures that protect all your sensitive information."
    },
    {
      icon: Clock,
      title: "Save time",
      description: "Let our advanced email and anti-spam filters free up your time."
    }
  ];

  return (
    <section className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-20 sm:pb-24 md:pb-28 lg:pb-32" style={{ backgroundColor: migrateEmailStyles.bg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        {/* Heading and Description */}
        <div className="text-center max-w-5xl mx-auto mb-16 sm:mb-20 md:mb-24 lg:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 sm:space-y-6"
          >
            <ContentHeading
              title="Why Spacemail?"
              className="!text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl xl:!text-7xl !text-[rgb(var(--migrate-email-simple-text-white))]"
            />
            
            <ContentDescription
              size="xl"
              className="!text-[rgba(var(--migrate-email-hero-text-85))]"
            >
              Email designed with business in mind.
            </ContentDescription>
          </motion.div>
        </div>

        {/* Three Feature Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
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
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                    <IconComponent 
                      className="w-full h-full" 
                      style={{ color: migrateEmailStyles.textWhite }}
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 
                  className="text-xl sm:text-2xl font-bold mb-4"
                  style={{ color: migrateEmailStyles.textWhite }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p 
                  className="text-md sm:text-lg leading-relaxed"
                  style={{ color: migrateEmailStyles.text85 }}
                >
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

export default WhySpacemail;

